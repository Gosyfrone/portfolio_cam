#!/bin/sh
# Transcode les vidéos sources (design/RESSOURCES) en MP4 web légers + poster.
FF=/c/ffmpeg/bin/ffmpeg
enc() { # src dest scale
  $FF -y -v error -i "$1" -vf "scale=$3,fps=30" -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p \
    -c:a aac -b:a 96k -ac 2 -movflags +faststart "$2.mp4" &&
  $FF -y -v error -ss 3 -i "$2.mp4" -frames:v 1 -q:v 3 "$2.jpg" && echo "ok $2"
}
R=design/RESSOURCES
enc "$R/SOLEM/Teaser Gamme V2 V.mp4" public/videos/solem/teaser-gamme 720:-2
enc "$R/SOLEM/Paysalia.mp4" public/videos/solem/paysalia -2:720
enc "$R/SOLEM/RESIDENTIEL.mp4" public/videos/solem/residentiel -2:720
enc "$R/SOLEM/Connected AG Made Easy_EN_.mp4" public/videos/solem/connected-ag -2:720
enc "$R/SOLEM/Installation_produit BT EN.mp4" public/videos/solem/installation-bt -2:720
enc "$R/SOLEM/Product Install BL EN.mp4" public/videos/solem/installation-bl -2:720



# Sharly Shaper : captures d'écran d'Instagram, on ne garde que le téléphone.
# Le son est normalisé : la séquence 02 est enregistrée ~16 dB plus bas que les autres.
for n in 01 02 03; do
  o=public/videos/sharly-shaper/sequence-$n
  $FF -y -v error -i "$R/SHARLY SHAPER/Séquence $n.mp4" -vf "crop=498:1080:710:0,fps=30" \
    -af "loudnorm=I=-14:TP=-1:LRA=11" -ar 48000 \
    -c:v libx264 -preset slow -crf 25 -pix_fmt yuv420p -c:a aac -b:a 96k -ac 2 -movflags +faststart $o.mp4 &&
  $FF -y -v error -ss 1 -i $o.mp4 -frames:v 1 -q:v 3 $o.jpg && echo "ok $o"
done

# Fonds muets en boucle : home (Domaine de la Gineste) et bandeau « VIDÉOS » de SOLEM.
bg() { # src dest crf
  $FF -y -v error -i "$1" -vf "scale=1600:-2,fps=25" -c:v libx264 -preset slow -crf $3 -maxrate 3M -bufsize 6M \
    -pix_fmt yuv420p -an -movflags +faststart "$2.mp4" && echo "ok $2"
}
bg "$R/home/Video_accueil.mp4" public/videos/home/accueil 31
bg "$R/SOLEM/Video-piscine.mp4" public/videos/solem/piscine 30
$FF -y -v error -ss 2 -i public/videos/solem/piscine.mp4 -frames:v 1 -q:v 3 public/videos/solem/piscine.jpg

# Home mobile : version verticale du même plan, choisie côté client (VideoFond).
$FF -y -v error -i "$R/home/Video-home-site-responsive .mp4" -vf "scale=720:-2,fps=25" -c:v libx264 -preset slow -crf 30 \
  -maxrate 2M -bufsize 4M -pix_fmt yuv420p -an -movflags +faststart public/videos/home/accueil-mobile.mp4
for v in accueil accueil-mobile; do
  $FF -y -v error -i public/videos/home/$v.mp4 -frames:v 1 -q:v 3 public/videos/home/$v.jpg
done
