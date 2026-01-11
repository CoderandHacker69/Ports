import os
import requests

# Asset base URLs
BASE_URL_PLAYER = "https://clashball.io/assets/player-textures/"
BASE_URL_FX = "https://clashball.io/assets/fx/"

# Player textures
player_textures = [
    "T_Player_Outfit_01_COL.png",
    "T_Outfit_Football_COL.png",
    "T_Outfit_SuperHero_Outfit_COL.png",
    "T_Outfit_Football_DECAL.png",
    "T_Outfit_Dragon_COL.png",
    "T_Outfit_SuperHero_Skin_COL.png",
    "T_Player_Outfit_01_DECAL.png",
    "T_Outfit_SuperHero_Skin_DECAL.png",
    "T_Player_Skin_01_COL.png",
    "T_Outfit_Samurai_COL.png",
    "T_Outfit_SuperHero_Outfit_DECAL.png",
    "T_Player_Skin_01_DECAL.png",
    "T_Outfit_Dragon_DECAL.png",
    "T_Outfit_Samurai_DECAL.png"
]

# FX textures
fx_textures = [
    "Sprite_KO.png",
    "Sprite_HitPlayer.png"
]

def download_assets(base_url, file_list, local_dir):
    os.makedirs(local_dir, exist_ok=True)
    for file_name in file_list:
        url = base_url + file_name
        local_path = os.path.join(local_dir, file_name)
        try:
            r = requests.get(url)
            if r.status_code == 200:
                with open(local_path, "wb") as f:
                    f.write(r.content)
                print(f"Downloaded: {file_name}")
            else:
                print(f"Failed to download {file_name} - Status code: {r.status_code}")
        except Exception as e:
            print(f"Error downloading {file_name}: {e}")

# Download all player textures
download_assets(BASE_URL_PLAYER, player_textures, "assets/player-textures/")

# Download all FX textures
download_assets(BASE_URL_FX, fx_textures, "assets/fx/")
