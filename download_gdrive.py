#!/usr/bin/env python3
import os
import sys
import gdown

folders = {
    'people': 'https://drive.google.com/drive/folders/1nSf9iIfQrfriXpzmL72PHKl7HmQf8J3I',
    'smell-good': 'https://drive.google.com/drive/folders/13THlXskvVU8YeeLg9nvrp3npNQzcs7CX',
    'wildlife': 'https://drive.google.com/drive/folders/1SpMKbzXd-s3WP_WDIlXmWhHKKBF7e3mF',
}

base_path = '/home/ubuntu/.openclaw/workspace/projects/sumsur-site/public/photos'

for folder_name, url in folders.items():
    folder_path = os.path.join(base_path, folder_name)
    os.makedirs(folder_path, exist_ok=True)
    print(f"\n=== Downloading {folder_name} ===")
    try:
        gdown.download_folder(url, output=folder_path, quiet=False, use_cookies=False, remaining_ok=True)
        files = [f for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f))]
        print(f"✓ Downloaded {len(files)} files to {folder_name}/")
    except Exception as e:
        print(f"✗ Error downloading {folder_name}: {e}")
        continue

print("\n=== Final Summary ===")
for folder_name in ['bw', 'cities', 'nature', 'people', 'smell-good', 'wildlife']:
    folder_path = os.path.join(base_path, folder_name)
    if os.path.exists(folder_path):
        files = [f for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f)) and not f.startswith('.')]
        print(f"{folder_name}: {len(files)} files")
