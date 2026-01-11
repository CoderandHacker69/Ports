import os
import requests

# List of asset URLs from your logs
asset_urls = [
    "https://clashball.io/assets/SKM_Player_01.glb",
    "https://clashball.io/assets/T_Outfit_Football_COL.png",
    "https://clashball.io/assets/ball-indicator-arrow.png",
    "https://clashball.io/assets/circle.png",
    "https://clashball.io/assets/T_Outfit_Dragon_COL.png",
    "https://clashball.io/assets/T_Outfit_Football_DECAL.png",
    "https://clashball.io/assets/spark.png",
    "https://clashball.io/assets/T_Player_Skin_01_COL.png",
    "https://clashball.io/assets/fx/fx-slash-2.png",
    "https://clashball.io/assets/dot.png",
    "https://clashball.io/assets/T_Outfit_SuperHero_Outfit_COL.png",
    "https://clashball.io/assets/Sprite_KO.png",
    "https://clashball.io/assets/T_Player_Outfit_01_DECAL.png",
    "https://clashball.io/assets/T_Outfit_Dragon_DECAL.png",
    "https://clashball.io/assets/fx/fx-slash-3.png",
    "https://clashball.io/assets/fx/fx-slash-1.png",
    "https://clashball.io/assets/T_Outfit_SuperHero_Skin_DECAL.png",
    "https://clashball.io/assets/fx/fx-slash-4.png",
    "https://clashball.io/assets/fx/FX_HitBall_SpriteSheet.png",
    "https://clashball.io/assets/T_Player_Outfit_01_COL.png",
    "https://clashball.io/assets/target-indicator.png",
    "https://clashball.io/assets/T_Outfit_Samurai_COL.png",
    "https://clashball.io/assets/T_Outfit_SuperHero_Skin_COL.png",
    "https://clashball.io/assets/target-indicator-arrow.png",
    "https://clashball.io/assets/T_Outfit_SuperHero_Outfit_DECAL.png",
    "https://clashball.io/assets/Sprite_HitPlayer.png",
    "https://clashball.io/assets/T_Player_Skin_01_DECAL.png",
    "https://clashball.io/assets/T_Outfit_Samurai_DECAL.png",
    "https://clashball.io/assets/SM_Waiting.glb",
    "https://clashball.io/assets/SM_Cloud.glb",
    "https://clashball.io/assets/player-hair/SM_Player_Hair_MenManga.glb",
    "https://clashball.io/assets/player-hair/SM_Player_Hair_GirlManga.glb",
    "https://clashball.io/assets/player-hair/SM_Player_Hair_Football.glb",
    "https://clashball.io/assets/player-hair/SM_Player_Hair_Viking.glb",
    "https://clashball.io/assets/player-faces/SM_Face_00.glb",
    "https://clashball.io/assets/weapons/SM_Sword_Escalibur.glb",
    "https://clashball.io/assets/player-faces/SM_Face_01.glb",
    "https://clashball.io/assets/weapons/SM_Sword_Pirate.glb",
    "https://clashball.io/assets/weapons/SM_Sword_LargeSword.glb",
    "https://clashball.io/assets/weapons/SM_BasicSword_01.glb",
    "https://clashball.io/assets/player-faces/SM_Face_04.glb",
    "https://clashball.io/assets/fx/FX_Geo_Slash.glb",
    "https://clashball.io/assets/player-faces/SM_Face_03.glb",
    "https://clashball.io/assets/weapons/SM_Sword_Katana.glb",
    "https://clashball.io/assets/ball-halo.glb",
    "https://clashball.io/assets/player-faces/SM_Face_02.glb"
    # Add more if you find more URLs in the logs
]

# Folder to save assets
base_dir = "assets"

for url in asset_urls:
    # Determine the local path
    relative_path = url.split("clashball.io/")[1]  # removes domain
    local_path = os.path.join(base_dir, relative_path)
    
    # Make sure the folder exists
    os.makedirs(os.path.dirname(local_path), exist_ok=True)
    
    # Download the file
    try:
        print(f"Downloading {url} ...")
        response = requests.get(url, stream=True)
        if response.status_code == 200:
            with open(local_path, "wb") as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
        else:
            print(f"Failed to download {url} - Status code: {response.status_code}")
    except Exception as e:
        print(f"Error downloading {url}: {e}")

print("All downloads attempted.")
