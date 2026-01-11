import os
import requests

files_to_download = {
    "js/5e246a10319df8547016.wasm": "https://clashball.io/5e246a10319df8547016.wasm",
    "site.webmanifest": "https://clashball.io/site.webmanifest"  # still 404 if missing
}

for local_path, url in files_to_download.items():
    os.makedirs(os.path.dirname(local_path), exist_ok=True)
    try:
        resp = requests.get(url)
        resp.raise_for_status()
        with open(local_path, "wb") as f:
            f.write(resp.content)
        print(f"Downloaded {url} -> {local_path}")
    except requests.HTTPError as e:
        print(f"Failed to download {url}: {e}")
