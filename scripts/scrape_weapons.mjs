import https from 'https';

const WEAPON_URLS_RAW = `
79820354|蛇剣【蒼蛇】
79820351|ザンシュトウ【鶏】
79820348|ヴァルキリーブレイド
79820345|アイアンソード
79857458|イーズルブレイド
79820333|スキュラブレイダー
79820342|レイトウマグロ
79820339|ソウルオブキャット
79857461|ヨリ斬リ
79857464|エピタフプレート
79857467|フルミナントソード
79820336|フラムエルヘレヴ
79857470|ドラグロソード
79857473|シルムズブレイド
79857476|ギザミブレイド
79820330|ローゼンブレット
79857479|セイリュウトウ【鳥】
79857482|ゴルム・ブレイド
79857485|クロームレイザー
79857488|ティガノアギト
79857491|雷顎大剣ドネルヘレヴ
79857494|灼熱のブレイザー
79857497|ゴシャズバァ
79857500|炎剣リオレウス
79857503|アルシュグラディオ
79857506|禍ツ大剣【封】
79857509|冷たき月の断剣
79857512|ベルセルクソード
79857515|チェーダアルザバル
79857518|あかしまの神大剣
79857521|狐大剣ハナヤコヨヒノ
79857524|ラギアブレイド
79857527|クルーエルペイン
79857530|禍ツ太刀【封】
79857533|アルシュエンシス
79857536|デュークシンクレア
79857539|飛竜刀【楓】
79857542|グレイスショテル
79857545|レ・トニトゥラ
79857548|飛竜刀【ベリル】
79820357|ディオスソード
79857551|ダイトウ【烏】
79857554|チーズニャイフ
79857557|ショウグンカッター
79857560|D=トゥ
79857563|ヒドゥンサーベル
79857566|シルムズサーブル
79857569|デスペレイション
79820360|ガノスラッシャー
79820363|ヒドラ・トルナリア
79857572|鬼哭斬破刀
79857575|白猿薙【ドド】
79857578|青熊薙
79857581|メロウパウ
79857584|風ノ賊刀
79820366|クライブラッド
79820369|鉄刀
79820372|飛竜刀【翠】
79820375|ドラウンポール
79820378|飛雷刀キリカガチ
79820381|骨刀【狼牙】
79857587|アイスラーミナ
79857590|シミターアルナジト
79857593|王刀ライキリ
79857596|あかしまの神刀
79857599|狐刀カカルクモナキ
79857602|混沌の鎚
79857605|禍ツ槌【封】
79857608|アルシュマレオス
79857611|デュークスマイト
79857614|冷たき月の破鎚
79857617|D=スィ
79820384|ディオステイル
79857620|ゴシャベチャ
79857623|灼炎のイシャター
79857626|メロウブロウ
79857629|エムロードビート
79857632|ブリードスパンク
79857635|ブロスハンマー
79857638|シェルハンマー
79820387|ローゼンハンマー
79857641|ギザミヘッドアクス
79857644|ゴルム・ガベル
79857647|フローズンコア
79857650|カラミティーサイン
79857653|42式破甲鎚
79857656|クルルビーク
79857659|デスグラシア
79857662|フクロダタキ
79857665|工房試作品ガンハンマ
79820390|ガノヘッド
79820408|ヴェノムモンスター
79857668|天具・五鈷の槌
79857671|コーンヘッドハンマー
79820396|クラスターハンマー
79820399|ボーンハンマー
79820393|ドロスボアハンマー
79820402|チャタハンマー
79820405|クックピック
79857674|あかしまの神槌
79857677|マトラカアルグル
79857680|王鎚カミナリ
79857683|ボルテックハンマー
79820417|ヒュドロスホルン
79820411|マギアチャーム
79857686|禍ツ琵琶【封】
79857689|アルシュシビーロス
79857692|デュークグレイル
79857695|火竜笛アンビシオン
79857698|グレイスバグパイプ
79857701|レ・ブリスビッツァ
79857704|ホーン=ジャナール
79857707|ストライプドラゴング
79857710|エムロードフラップ
79857713|ゴルム・ドラム
79857716|シャミセン【烏】
79857719|赫炎の笛
79857722|荘厳なるクロスクオ
79857725|ブラッドホルン
79857728|土砂笙【戦ノ音】
79857731|63式軍楽口風琴
79857734|クルルドゥダ
79857737|セロヴィセロベルデ
79857740|セロヴィセロノワール
79820414|蛮顎竜ノ鼻歌
79857743|フルフルホルン
79857746|ドドットボロン
79857749|ドラグマ【壱式】
79857752|ヒキ音シ
79820420|ボーンホルン
79820423|クックソング
79820435|毒笛カプリ
79820432|セロヴィセロジョーヌ
79820429|セロヴィセロルージュ
79820426|ウルムーホルン
79857755|あかしまの神笛
79857758|アイスシュピール
79857761|グィロスト
79857764|龍木ノ笛【宿神】
79857767|狐鈴コトノハナクテ
79820441|ヒドラ・プラヌラ
79857770|暴徒の凶弓
79857773|ブルーブレイドボウ
79857776|禍ツ弓【封】
79857779|アルシュアルクム
79857782|デュークフレーダー
79857785|ダークフィラメント
79857788|グレイスアロー
79857791|D=シャ
79857794|レ・ペルコンス
79857797|灼炎のヴァルスター
79857800|ティガアロー
79857803|ライトニングボウ
79857806|ブロスホーンボウ
79857809|ゴルム・ボーゲン
79857812|ユミ【烏】
79857815|六花晶弓
79857818|真誠なるケアアルク
79857821|ヒドゥンボウ
79820447|龍頭琴
79857824|64式連装弓
79857827|アルクセロノワール
79820438|フラムエルアルクス
79857830|天具・光背の弓
79857833|青熊弓
79820450|鉄弓
79820453|ネコ弐九弓
79820456|スポンギア
79820444|鳥幣弓
79820459|飛雷弓イテカガチ
79820462|アルクセロジョーヌ
79820465|アルクセロルージュ
79820468|アルクセロブラン
79857836|かんなりの神弓
79857839|アイスライザー
79857842|王弓エンライ
79857845|龍弓【日輪】
79820480|ヒドラ・エフィーラ
79857848|愚欲の銃槍
79857851|禍ツ砲槍【封】
79857854|アルシュアスタ
79857857|冷たき月の銃槍
79857860|ティガバースト
79857863|レッドジェネレーター
79857866|砲モロコシ
79857869|ホワイトガンランス
79820471|ディオスガンランス
79820474|ローゼンカノーネ
79857872|赫炎の銃槍
79857875|D=ネイ
79857878|ボルボローダー
79857881|62式突撃銃槍
79857884|かまくランス
79857887|フィオレセロノワール
79857890|シルムズガリング
79820477|マリンフィッシャー
79857893|フィオレセロベルデ
79857896|ヒルバーガンランス
79857899|ヘルスティング
79820483|シェルガンバード
79820486|アイアンガンランス
79820492|ドロスハープーン
79820489|プリンセスバースト
79820495|飛雷銃槍テツカガチ
79820501|ハードヒッター
79820498|フィオレセロルージュ
79857902|デュアルトゥース
79857905|王銃槍ゴウライ
79857908|龍木ノ槍【金剛】
79857911|ラギアバースト
`.trim();

const WEAPON_URLS = WEAPON_URLS_RAW.split('\n').map(line => {
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

function parseWeaponPage(text, weaponName) {
  const result = {
    name: weaponName,
    upgradeMaterials: {},
    materialDetails: {},
    skills: [],
    statsPerLevel: [],
  };

  // Parse stats per level  
  const statsMatch = text.match(/攻撃力\nLv1\nLv2\nLv3(?:\nLv4\nLv5)?\n([\d\n]+?)(?:\n[^\d])/);
  if (statsMatch) {
    result.statsPerLevel = statsMatch[1].trim().split('\n').map(Number).filter(n => !isNaN(n));
  }

  // Parse upgrade materials section - find the Lv.1 that starts the material list
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

  // Parse skills
  const skillSection = text.split('の所持スキル\n')[1];
  if (skillSection) {
    const endIdx = skillSection.indexOf('の入手方法');
    const skillText = endIdx > 0 ? skillSection.substring(0, endIdx) : skillSection.substring(0, 3000);
    
    const WPN_TYPES = ['大剣', '太刀', 'ハンマー', '狩猟笛', '弓', 'ガンランス'];
    const TARGETS = ['自身', '相手全体', '相手単体', '味方全体', '味方単体'];
    
    const lines = skillText.split('\n').map(l => l.trim()).filter(Boolean);
    
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      
      // Check if next line contains weapon type + target + active/passive
      if (i + 1 < lines.length) {
        const nextLine = lines[i + 1];
        
        let isActiveSkill = false;
        let isPassiveSkill = false;
        let foundWpnType = '';
        let foundTarget = '';
        
        for (const wt of WPN_TYPES) {
          if (nextLine.includes(wt)) {
            foundWpnType = wt;
            break;
          }
        }
        
        if (foundWpnType) {
          if (nextLine.includes('アクティブ')) {
            isActiveSkill = true;
            for (const t of TARGETS) {
              if (nextLine.includes(t)) {
                foundTarget = t;
                break;
              }
            }
          } else if (nextLine.includes('パッシブ')) {
            isPassiveSkill = true;
          }
        }
        
        if (isActiveSkill) {
          const skillName = line;
          let stCost = 0, power = 0, dragonBreakVal = 0, effect = '';
          
          for (let j = i + 2; j < Math.min(i + 20, lines.length); j++) {
            if (lines[j] === '消費ST' && j + 1 < lines.length) {
              stCost = parseInt(lines[j + 1]) || 0;
            }
            if (lines[j] === '威力' && j + 1 < lines.length) {
              const val = lines[j + 1];
              power = val === '-' ? 0 : (parseInt(val) || 0);
            }
            if (lines[j] === '破竜力' && j + 1 < lines.length) {
              const val = lines[j + 1];
              dragonBreakVal = val === '-' ? 0 : (parseInt(val) || 0);
            }
            if (lines[j] === '効果' && j + 1 < lines.length) {
              let effectLines = [];
              for (let k = j + 1; k < Math.min(j + 5, lines.length); k++) {
                if (WPN_TYPES.some(wt => lines[k].includes(wt)) && (lines[k].includes('アクティブ') || lines[k].includes('パッシブ'))) break;
                if (lines[k] === '性能' || lines[k] === '消費ST') break;
                // Skip if it's a new skill name followed by weapon type
                if (k + 1 < lines.length && WPN_TYPES.some(wt => lines[k + 1].includes(wt))) break;
                effectLines.push(lines[k]);
              }
              effect = effectLines.join('');
              break;
            }
          }
          
          result.skills.push({
            name: skillName,
            weaponType: foundWpnType,
            target: foundTarget || '-',
            type: 'アクティブ',
            stCost,
            power,
            dragonBreak: dragonBreakVal,
            effect,
          });
        } else if (isPassiveSkill) {
          const skillName = line;
          let effect = '';
          
          for (let j = i + 2; j < Math.min(i + 10, lines.length); j++) {
            if (lines[j] === '効果' && j + 1 < lines.length) {
              let effectLines = [];
              for (let k = j + 1; k < Math.min(j + 5, lines.length); k++) {
                if (WPN_TYPES.some(wt => lines[k].includes(wt))) break;
                if (lines[k] === '性能' || lines[k] === '消費ST') break;
                if (k + 1 < lines.length && WPN_TYPES.some(wt => lines[k + 1].includes(wt))) break;
                if (lines[k].includes('の入手方法') || lines[k].includes('の所持')) break;
                effectLines.push(lines[k]);
              }
              effect = effectLines.join('');
              break;
            }
          }
          
          result.skills.push({
            name: skillName,
            weaponType: foundWpnType,
            target: '-',
            type: 'パッシブ',
            stCost: 0,
            power: 0,
            dragonBreak: 0,
            effect,
          });
        }
      }
      i++;
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
  
  for (let i = 0; i < WEAPON_URLS.length; i += BATCH_SIZE) {
    const batch = WEAPON_URLS.slice(i, i + BATCH_SIZE);
    const promises = batch.map(async (weapon) => {
      try {
        const html = await fetchPage(weapon.url);
        const text = extractText(html);
        const parsed = parseWeaponPage(text, weapon.name);
        return { name: weapon.name, data: parsed };
      } catch (err) {
        process.stderr.write(`Failed to fetch ${weapon.name}: ${err.message}\n`);
        return { name: weapon.name, data: null };
      }
    });
    
    const batchResults = await Promise.all(promises);
    for (const r of batchResults) {
      if (r.data) {
        results[r.name] = r.data;
      }
    }
    
    process.stderr.write(`Progress: ${Math.min(i + BATCH_SIZE, WEAPON_URLS.length)}/${WEAPON_URLS.length}\n`);
    await sleep(300);
  }
  
  console.log(JSON.stringify(results, null, 2));
}

main().catch(console.error);
