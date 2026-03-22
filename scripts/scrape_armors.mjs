import https from 'https';

const ARMOR_URLS_RAW = `
79820531|ブラキ装備
79820534|エスピナ装備
79820537|ガノスU装備
79820540|スキュラ装備
79820543|ガノス装備
79820546|ジャナフ装備
79820549|リオハート装備
79820552|エーデル装備
79820555|テンタクル装備
79820558|カガチ装備
79820561|レンジャー装備
79820564|クックU装備
79820567|ゲリョスU装備
79820570|レイア装備
79820573|ルドロス装備
79820576|ウルムー装備
79820579|クック装備
79820582|ゲリョス装備
79820585|チャタ装備
79820588|ブナハ装備
79820591|ボーン装備
79820594|ハンター装備
79820597|レザー装備
79858691|ダマスク装備
79858694|ハイメタ装備
79858697|アーティア装備
79858700|ガーディアン装備
79858703|ロワーガ装備
79858706|アスール装備
79858709|ユクモ装備
79858712|アロイ装備
79858715|ラヴィーナ装備
79858718|ベリオU装備
79858721|禍鎧装備
79858724|リオソウル装備
79858727|シュバルカ装備
79858730|メルゼ装備
79858733|ジンオウU装備
79858736|レウス装備
79858739|ベリオ装備
79858742|レックスU装備
79858745|ナルガU装備
79858748|バンギス装備
79858751|ジンオウ装備
79858754|デスガロン装備
79858757|グラビドU装備
79858760|ギエナ装備
79858763|ジャナール装備
79858766|ディアネロ装備
79858769|ルナガロ装備
79858772|ボロスU装備
79858775|ゴシャ装備
79858778|ヤツカダ装備
79858781|ゼクス装備
79858784|レダゼルト装備
79858787|ブランゴ装備
79858790|グラビド装備
79858793|ディアブロ装備
79858796|レックス装備
79858799|テンゴU装備
79858802|スキュラU装備
79858805|ディノ装備
79858808|ミツネ装備
79858811|ナルガ装備
79858814|ゴルム装備
79858817|ガルルガ装備
79858820|アジャラ装備
79858823|ガロン装備
79858826|ボロス装備
79858829|ギザミ装備
79858832|クルル装備
79858835|イソネ装備
79858838|オロミド装備
79858841|イソネU装備
79858844|フルフルU装備
79858847|ルドロスU装備
79858850|ラギアU装備
79858853|フルフル装備
79858856|アケノ装備
79858859|ラギア装備
79858862|イズチ装備
79858865|テンゴ装備
79858868|ヨツミ装備
79858871|アシラ装備
79858874|プケプケ装備
`.trim();

const ARMOR_URLS = ARMOR_URLS_RAW.split('\n').map(line => {
  const [id, name] = line.split('|');
  return { id: id.trim(), name: name.trim(), url: `https://appmedia.jp/mhst3/${id.trim()}` };
});

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function extractText(html) {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?(p|div|tr|td|th|li|h[1-6])[^>]*>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n/g, '\n')
    .trim();
}

function parseArmorPage(text, armorName) {
  const result = {
    name: armorName,
    defensePerLevel: [],
    decoration: '',
    skills: [],
    upgradeMaterials: {},
    materialDetails: {},
  };

  // Parse defense per level
  const defMatch = text.match(/防御力\nLv1\nLv2\nLv3(?:\nLv4\nLv5)?\n([\d\n]+?)(?:\n[^\d])/);
  if (defMatch) {
    result.defensePerLevel = defMatch[1].trim().split('\n').map(Number).filter(n => !isNaN(n));
  }

  // Parse decoration
  const decoMatch = text.match(/入手装飾品\n\(最大強化時\)\n(.+?)(?:\n)/);
  if (decoMatch) {
    result.decoration = decoMatch[1].trim();
  }

  // Parse skills with effects
  const skillSection = text.split('の所持スキル\n')[1];
  if (skillSection) {
    const endIdx = skillSection.indexOf('の入手方法');
    const skillText = endIdx > 0 ? skillSection.substring(0, endIdx) : skillSection.substring(0, 3000);
    const lines = skillText.split('\n').map(l => l.trim()).filter(Boolean);

    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      if (i + 1 < lines.length && lines[i + 1].includes('パッシブ')) {
        const skillName = line;
        let effect = '';
        for (let j = i + 2; j < Math.min(i + 10, lines.length); j++) {
          if (lines[j] === '効果' && j + 1 < lines.length) {
            let effectLines = [];
            for (let k = j + 1; k < Math.min(j + 5, lines.length); k++) {
              if (lines[k].includes('パッシブ')) break;
              if (lines[k].includes('の入手方法') || lines[k].includes('の所持')) break;
              if (k + 1 < lines.length && lines[k + 1].includes('パッシブ')) break;
              effectLines.push(lines[k]);
            }
            effect = effectLines.join('');
            break;
          }
        }
        result.skills.push({ name: skillName, effect });
      }
      i++;
    }
  }

  // Parse upgrade materials
  const lvIdx = text.indexOf('Lv.1\n');
  if (lvIdx > -1) {
    const endIdx = text.indexOf('素材詳細', lvIdx);
    const matText = endIdx > 0 ? text.substring(lvIdx, endIdx) : text.substring(lvIdx, lvIdx + 1000);
    const lines = matText.split('\n');
    let currentLv = 0;
    for (const line of lines) {
      const trimmed = line.trim();
      const lvMatch = trimmed.match(/^Lv\.(\d)/);
      if (lvMatch) {
        currentLv = parseInt(lvMatch[1]);
        result.upgradeMaterials[currentLv] = [];
      }
      const matMatch = trimmed.match(/^(.+?)\s*\((\d+)pts\)$/);
      if (matMatch && currentLv > 0) {
        result.upgradeMaterials[currentLv].push({
          name: matMatch[1].trim(),
          pts: parseInt(matMatch[2]),
        });
      }
    }
  }

  // Parse material details
  const detailSection = text.split('素材詳細\n')[1];
  if (detailSection) {
    const endIdx = detailSection.indexOf('モンハンストーリーズ3 関連記事');
    const detailText = endIdx > 0 ? detailSection.substring(0, endIdx) : detailSection.substring(0, 1500);
    const lines = detailText.split('\n');
    let currentMat = '';
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      const itemMatch = trimmed.match(/^\s*(.+?)\s*\((\d+)pts\)\s*$/);
      if (itemMatch) {
        if (currentMat) {
          if (!result.materialDetails[currentMat]) result.materialDetails[currentMat] = [];
          result.materialDetails[currentMat].push({
            name: itemMatch[1].trim(),
            pts: parseInt(itemMatch[2]),
          });
        }
      } else if (!trimmed.match(/\((\d+)pts\)/) && trimmed.length < 20) {
        currentMat = trimmed;
      }
    }
  }

  return result;
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  const results = {};
  const BATCH_SIZE = 5;

  for (let i = 0; i < ARMOR_URLS.length; i += BATCH_SIZE) {
    const batch = ARMOR_URLS.slice(i, i + BATCH_SIZE);
    const promises = batch.map(async (armor) => {
      try {
        const html = await fetchPage(armor.url);
        const text = extractText(html);
        const parsed = parseArmorPage(text, armor.name);
        return { name: armor.name, data: parsed };
      } catch (err) {
        process.stderr.write(`Failed to fetch ${armor.name}: ${err.message}\n`);
        return { name: armor.name, data: null };
      }
    });

    const batchResults = await Promise.all(promises);
    for (const r of batchResults) {
      if (r.data) {
        results[r.name] = r.data;
      }
    }

    process.stderr.write(`Progress: ${Math.min(i + BATCH_SIZE, ARMOR_URLS.length)}/${ARMOR_URLS.length}\n`);
    await sleep(300);
  }

  console.log(JSON.stringify(results, null, 2));
}

main().catch(console.error);
