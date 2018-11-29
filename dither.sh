# DEPENDENCIES
# This needs FFMPEG (for video), ImageMagick (for images), and netpbm (for images) to run.
# On a Mac, you can install these with:
# brew install ffmpeg
# brew install imagemagick
# brew install netpbm

# TO USE, RUN THIS COMMAND:
# sh dither.sh content/song-slug/my-input-video.mov "#65008A"


# Make a nicely named variable from the first argument
INPUT=$1
# Color that will replace black in each frame
BLACK_COLOR=$2
# Adjust gamma of output (1-2, 2 = very bright)
GAMMA=1.4
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

# OLD: Create color palette for ImageMagick
# convert xc:$BLACK_COLOR xc:"#ffe6c2" +append palette.png

# Create a color palette for FFMPEG
convert xc:$BLACK_COLOR xc:"#ffe6c2" +append \
    -interpolate Nearest -rotate "-90" -filter point -resize "16x16!"  palette.png

# For each frame:
for i in img*.png; do
    # Convert to grayscale,                  Dither               Write to PNG
    convert $i -grayscale Rec709Luma pgm:- | pamditherbw -floyd | pnmtopng > p$i;
    # OLD: Restrict colors to previously-created color palette with ImageMagick
    # convert p$i -size 1!x$SIZE palette.png -clut p$i;
done;

# FFMPEG Flag notes
# -crf (default 22) sets a constant bitrate factor (results in larger filesizes than necessary, but ensures quality level). Not what we want. we start to see artifacts above 22
# -preset (default medium) Slower values take longer but yield higher compression (same quality). Use `veryslow`.
# -pix_fmt Pixel format (`yuv420p` is best for web. Has widest browser support).
# -tune Optimizes the codec for different media. `stillimage` is optimized for unique frames

cd ..
ffmpeg -i frames/pimg%5d.png -i frames/palette.png -lavfi "paletteuse=dither=floyd_steinberg:alpha_threshold=0" -preset veryslow -codec:v h264 -pix_fmt yuv420p -b:v 20M -maxrate 30M -bufsize 1M -r $RATE -tune stillimage -sws_flags neighbor -y $INPUT.mp4

# Delete frame files
rm -rf frames
