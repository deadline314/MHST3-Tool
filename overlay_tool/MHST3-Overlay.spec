# -*- mode: python ; coding: utf-8 -*-


a = Analysis(
    ['C:\\Users\\stanl\\Github\\MHST3-Tool\\overlay_tool\\main.py'],
    pathex=[],
    binaries=[],
    datas=[('C:\\Users\\stanl\\Github\\MHST3-Tool\\overlay_tool\\monsters.json', '.'), ('C:\\Users\\stanl\\Github\\MHST3-Tool\\overlay_tool\\logo.png', '.'), ('C:\\Users\\stanl\\AppData\\Local\\Packages\\PythonSoftwareFoundation.Python.3.11_qbz5n2kfra8p0\\LocalCache\\local-packages\\Python311\\site-packages\\rapidocr', 'rapidocr'), ('C:\\Users\\stanl\\AppData\\Local\\Packages\\PythonSoftwareFoundation.Python.3.11_qbz5n2kfra8p0\\LocalCache\\local-packages\\Python311\\site-packages\\onnxruntime', 'onnxruntime'), ('C:\\Users\\stanl\\AppData\\Local\\Packages\\PythonSoftwareFoundation.Python.3.11_qbz5n2kfra8p0\\LocalCache\\local-packages\\Python311\\site-packages\\pypinyin', 'pypinyin'), ('C:\\Users\\stanl\\Github\\MHST3-Tool\\overlay_tool\\config.json', '.')],
    hiddenimports=['omegaconf', 'yaml', 'pypinyin'],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
    optimize=0,
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.datas,
    [],
    name='MHST3-Overlay',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=False,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
    icon=['C:\\Users\\stanl\\Github\\MHST3-Tool\\overlay_tool\\logo.ico'],
)
