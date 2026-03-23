"""Build script - package into a single exe with all dependencies."""
import subprocess
import sys
from pathlib import Path


def _find_package_dir(package_name: str) -> str:
    import importlib
    mod = importlib.import_module(package_name)
    return str(Path(mod.__file__).parent)


def build():
    base = Path(__file__).parent

    rapidocr_dir = _find_package_dir("rapidocr")
    onnxruntime_dir = _find_package_dir("onnxruntime")
    pypinyin_dir = _find_package_dir("pypinyin")

    add_data = [
        "--add-data", f"{base / 'monsters.json'};.",
        "--add-data", f"{base / 'logo.png'};.",
        "--add-data", f"{rapidocr_dir};rapidocr",
        "--add-data", f"{onnxruntime_dir};onnxruntime",
        "--add-data", f"{pypinyin_dir};pypinyin",
    ]

    hidden_imports = [
        "--hidden-import", "omegaconf",
        "--hidden-import", "yaml",
        "--hidden-import", "pypinyin",
    ]

    config_path = base / "config.json"
    if config_path.exists():
        add_data += ["--add-data", f"{config_path};."]

    ico_path = base / "logo.ico"
    icon_arg = ["--icon", str(ico_path)] if ico_path.exists() else []

    cmd = [
        sys.executable, "-m", "PyInstaller",
        "--onefile",
        "--noconsole",
        "--name", "MHST3-Overlay",
        "--clean",
        *icon_arg,
        *add_data,
        *hidden_imports,
        str(base / "main.py"),
    ]
    print("Running:", " ".join(cmd))
    subprocess.run(cmd, check=True, cwd=str(base))
    print(f"\nBuild complete! → {base / 'dist' / 'MHST3-Overlay.exe'}")


if __name__ == "__main__":
    build()
