#!/bin/sh
# Transcode les vidéos sources (design/RESSOURCES) en MP4 web + poster.
# Qualité privilégiée : résolution native (1080p max), cadence d'origine, CRF bas.
FF=/c/ffmpeg/bin/ffmpeg
X264="-c:v libx264 -preset slower -pix_fmt yuv420p -movflags +faststart"
enc() { # src dest scale crf
  $FF -y -v error -i "$1" -vf "scale=$3:flags=lanczos" $X264 -crf $4 \
    -c:a aac -b:a 160k -ac 2 "$2.mp4" &&
  $FF -y -v error -ss 3 -i "$2.mp4" -frames:v 1 -q:v 2 "$2.jpg" && echo "ok $2"
}
R=design/RESSOURCES
enc "$R/SOLEM/Teaser Gamme V2 V.mp4" public/videos/solem/teaser-gamme 1080:-2 20
# Source en 768x384 : on garde la résolution native, un upscale n'apporte rien.
enc "$R/SOLEM/Paysalia.mp4" public/videos/solem/paysalia iw:ih 18
enc "$R/SOLEM/RESIDENTIEL.mp4" public/videos/solem/residentiel -2:1080 20
enc "$R/SOLEM/Connected AG Made Easy_EN_.mp4" public/videos/solem/connected-ag -2:1080 20
enc "$R/SOLEM/Installation_produit BT EN.mp4" public/videos/solem/installation-bt -2:1080 20
enc "$R/SOLEM/Product Install BL EN.mp4" public/videos/solem/installation-bl -2:1080 20

# Sharly Shaper : captures d'écran d'Instagram, on ne garde que le téléphone (60 fps d'origine conservés).
# Le son est normalisé : la séquence 02 est enregistrée ~16 dB plus bas que les autres.
for n in 01 02 03; do
  o=public/videos/sharly-shaper/sequence-$n
  $FF -y -v error -i "$R/SHARLY SHAPER/Séquence $n.mp4" -vf "crop=498:1080:710:0" \
    -af "loudnorm=I=-14:TP=-1:LRA=11" -ar 48000 \
    $X264 -crf 19 -c:a aac -b:a 160k -ac 2 $o.mp4 &&
  $FF -y -v error -ss 1 -i $o.mp4 -frames:v 1 -q:v 2 $o.jpg && echo "ok $o"
done

# Fonds muets en boucle : home (Domaine de la Gineste) et bandeau « VIDÉOS » de SOLEM.
bg() { # src dest scale crf maxrate bufsize
  $FF -y -v error -i "$1" -vf "scale=$3:flags=lanczos" $X264 -crf $4 -maxrate $5 -bufsize $6 \
    -an "$2.mp4" && echo "ok $2"
}
bg "$R/home/Video_accueil.mp4" public/videos/home/accueil 1920:-2 21 8M 16M
bg "$R/SOLEM/Video-piscine.mp4" public/videos/solem/piscine 1920:-2 20 8M 16M
$FF -y -v error -ss 2 -i public/videos/solem/piscine.mp4 -frames:v 1 -q:v 2 public/videos/solem/piscine.jpg

# Home mobile : version verticale du même plan, choisie côté client (VideoFond).
bg "$R/home/Video-home-site-responsive .mp4" public/videos/home/accueil-mobile 1080:-2 22 6M 12M
for v in accueil accueil-mobile; do
  $FF -y -v error -i public/videos/home/$v.mp4 -frames:v 1 -q:v 2 public/videos/home/$v.jpg
done
