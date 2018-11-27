# DEPENDENCIES
# This needs FFMPEG (for video), ImageMagick (for images), and netpbm (for images) to run.
# On a Mac, you can install these with:
# brew install ffmpeg
# brew install imagemagick
# brew install netpbm

# TO USE, RUN THIS COMMAND:
# sh dither.sh input-file.mov

# Make a nicely named variable from the first argument
INPUT=$1
# Adjust gamma of output (1-2, 2 = very bright)
GAMMA=1.2
# Target framerate
RATE=12
# The height of the output video, in pixels
SIZE=320

# Make temporary directory to put frames in
mkdir frames

# Export frames as .png images at the given size
#                              Scale down, stay pixelated     auto-levels             pixel format (for browser compat)
ffmpeg -i $INPUT -r $RATE -vf "scale=-2:$SIZE:flags=neighbor, pp=al, eq=gamma=$GAMMA, format=yuv420p" -f image2 frames/img%5d.png

cd frames

# For each frame:
for i in *.png; do
    # Convert to grayscale,                  Dither               Write to PNG
    convert $i -grayscale Rec709Luma pgm:- | pamditherbw -floyd | pnmtopng > p$i;
    # convert $i -grayscale Rec709Luma pgm:- | pamditherbw -floyd | convert - -fuzz 50% -fill '#000000' -opaque "#C62529" pam:- | pnmtopng > p$i;
done;

# GOOD!
ffmpeg -i pimg%5d.png -i ../$INPUT -map 0:0? -map 1:1? -preset veryslow -codec:a libfdk_aac -b:a 128k -codec:v h264 -pix_fmt yuv420p -b:v 7M -maxrate 26M -bufsize 0.5M -r $RATE -tune stillimage -sws_flags neighbor ../dithered-$INPUT.mp4

# No artifacts, but starts to show some gray pixels. Maybe thats ok.
# 3.6MB
# ffmpeg -i pimg%5d.png -i ../$INPUT -map 0:0? -map 1:1? -preset veryslow -codec:a libfdk_aac -b:a 128k -codec:v h264 -pix_fmt yuv420p -b:v 7M -maxrate 24M -bufsize 0.5M -r $RATE -tune stillimage -sws_flags neighbor ../dithered-$INPUT.mp4

# ffmpeg -i pimg%5d.png -i ../$INPUT -map 0:0? -map 1:1? -preset veryslow -codec:a libfdk_aac -b:a 128k -codec:v h264 -pix_fmt yuv420p -b:v 7M -maxrate 24M -bufsize 0.2M -r $RATE -tune stillimage -sws_flags neighbor ../dithered-$INPUT.mp4

# Delete frame files
cd ..
rm -rf frames
