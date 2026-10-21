#!/bin/bash
# Збирає гайд «Мій клас»: знімки екранів → 6 карток (out/*.png) і відео з музикою (out/myclass-guide-video.mp4).
# Запуск із кореня репозиторію: bash promo/make.sh   (або bash promo/make.sh video — лише відео)
# bash promo/make.sh marathon — відео «233/233» (марафон «Наголосів», out/marathon-233.mp4)
set -e
cd "$(dirname "$0")"
export NODE_PATH=${NODE_PATH:-$(npm root -g)}
mkdir -p out work/v
# гра має відкриватися локально на :8765 (сервер із кореня репозиторію)
curl -s -o /dev/null http://localhost:8765/ || (cd .. && setsid nohup python3 -m http.server 8765 </dev/null >/dev/null 2>&1 &) ; sleep 1
if [ "$1" = "marathon" ]; then
  node capture-marathon.js
  rm -rf work/m/s6 work/m/frames && mkdir -p work/m/s6
  python3 -c "
from PIL import Image; import glob, os
for f in glob.glob('work/m/shots/*.png'):
    i = Image.open(f).convert('RGB'); i.resize((600, round(i.height * 600 / i.width)), Image.LANCZOS).save('work/m/s6/' + os.path.basename(f))"
  PROMO=m node render.js && PROMO=m python3 audio.py
  ffmpeg -y -loglevel error -framerate 30 -i work/m/frames/f%05d.jpg -i work/m/audio.wav -c:v libx264 -preset slow -crf 19 \
    -pix_fmt yuv420p -c:a aac -b:a 160k -shortest -movflags +faststart out/marathon-233.mp4
  echo "Готово: promo/out/marathon-233.mp4"; exit 0
fi
if [ "$1" != "video" ]; then node shots.js; node cards.js; fi
node capture.js
rm -rf work/v/s6 && mkdir -p work/v/s6
python3 -c "
from PIL import Image; import glob, os
for f in glob.glob('work/v/shots/*.png'):
    i = Image.open(f).convert('RGB'); i.resize((600, round(i.height * 600 / i.width)), Image.LANCZOS).save('work/v/s6/' + os.path.basename(f))"
rm -rf work/v/frames && node render.js
python3 audio.py
ffmpeg -y -loglevel error -framerate 30 -i work/v/frames/f%05d.jpg -i work/v/audio.wav -c:v libx264 -preset slow -crf 19 \
  -pix_fmt yuv420p -c:a aac -b:a 160k -shortest -movflags +faststart out/myclass-guide-video.mp4
echo "Готово: promo/out/"
