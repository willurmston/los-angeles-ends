# Los Angeles Ends

## Content

Content for each song is stored in js files in `/content`. Everything is combined by `require`-ing the files in `/content/index.js`. To edit content, start a development server by running `npm run dev` and going to `localhost:8080`.

## Preact App

All of the components of the site are in `/src/components/`. To follow the structure of the app, start with `app.js` and poke around from there.

## dither.sh

This is the bash script that dithers videos. To use it:

1. Install the dependencies (listed at the top of the file)
2. Put your video file in the same directory as the script
3. Run `sh dither.sh my-input-video-file.mp4`

You can tweak the `GAMMA` value in the script to adjust for the brightness of videos

## CLI Commands

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# test the production build locally
npm run serve
```

I used preact-cli to set up this project. For detailed explanation on how things work, checkout the [CLI Readme](https://github.com/developit/preact-cli/blob/master/README.md).
