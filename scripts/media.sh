#!/bin/sh
# Refreshes every homepage image from the live site, then writes web-sized copies to public/media.
#
# eldapoint-group.co.uk sits behind a Cloudflare managed challenge, but its images are served by the Optimole CDN
# (mlqrzi5uqnon.i.optimole.com), which is not, so originals are fetched through it at up to 2000px wide.
# The two hero stills are the poster frames of the live hero film (Vimeo 1023305035 desktop / 1026479487 mobile).
# The film itself is domain-locked; the frames came from a save of the live page (_scrape/live/decoded, AVIF).
set -e
cd "$(dirname "$0")/.."
RAW=_scrape/img
OUT=public/media
CDN="https://mlqrzi5uqnon.i.optimole.com/w:2000/h:auto/q:90/f:jpg/https://www.eldapoint-group.co.uk/wp-content/uploads"
mkdir -p "$RAW" "$OUT"

# name  upload path  (name = the file written to public/media)
while read -r name path; do
  [ -z "$name" ] && continue
  [ -s "$RAW/$name.jpg" ] || curl -sfL -A "Mozilla/5.0" -o "$RAW/$name.jpg" "$CDN/$path"
done <<'LIST'
hq-knowsley           2024/10/Untitled-700-x-700-px.png
welder-quicklinks     2024/08/EG-quick-links-welder-img-desktop.jpg
grinder               2023/11/Eldapoint-Group-homepage-banner-desktop-placeholder.jpg
chevron-pattern       2024/05/banner-background-overlay.webp
greener-future        2024/05/our-journey-towards-a-greener-future-836-556.webp
range-modular         2024/04/prefab-modular_0007s_0002_ADS-truck-IMG_2301-edit.jpg
range-grp-housing     2024/04/renewable-energy-housing-amco-giffen-14.jpg
range-conversion      2024/10/Untitled-design-2024-10-16T161807.610.png
range-pressings       2024/04/steel-pressings-01.jpg
range-gatehouse       2024/10/Untitled-design-2024-10-25T115244.690.png
range-waste           2024/04/waste-1_fel-swl-1A-edit.jpg
cs-antarctic          2024/02/converted-containers.jpeg
cs-waste              2024/01/LP2_2604-scaled.jpg
cs-airport            2024/03/Untitled-design-33.png
cs-nightclub          2024/01/case-study-popup-nightclub-img1.jpg
cs-rail-reb           2024/03/rail-relocated-equipment.webp
cs-farditch           2024/01/DSC_4954.jpg
explore-products      2023/12/container.webp
explore-sectors       2024/01/3-948x1024-1.jpg
LIST

for f in "$RAW"/*.jpg; do
  n=$(basename "$f" .jpg)
  sips -s format jpeg -s formatOptions 82 --resampleWidth 1600 "$f" --out "$OUT/$n.jpg" >/dev/null 2>&1 || cp "$f" "$OUT/$n.jpg"
  # never upscale: keep the original when it is narrower than the target
  w=$(sips -g pixelWidth "$f" | awk '/pixelWidth/{print $2}')
  [ "$w" -lt 1600 ] && sips -s format jpeg -s formatOptions 84 "$f" --out "$OUT/$n.jpg" >/dev/null
done

D=_scrape/live/decoded
ffmpeg -loglevel error -y -i "$D/2118397267-bdcdfad3ee28ee94c34af8fa43f762527e95f1b2db0b81d6b737339e89c66091-d_1_.bin" -q:v 3 "$OUT/hero-welder.jpg"
ffmpeg -loglevel error -y -i "$D/2118396531-7b27a7003f7f0ea7153d464b35d70ec830348603de54e8c76e14097311be777e-d_1280.bin" -q:v 3 "$OUT/hero-sparks.jpg"
ffmpeg -loglevel error -y -i "$D/2118396489-5bdc3950176f7d65725fed3d97b07d884feb363a52e1b87b23abc965d7bcbc40-d_960.bin" -q:v 3 "$OUT/hero-mobile.jpg"

cp node_modules/@fontsource-variable/montserrat/files/montserrat-latin-wght-normal.woff2 public/fonts/
ls -la "$OUT"
