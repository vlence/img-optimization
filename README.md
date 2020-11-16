# img-optimization

Please do not use it for production.

## About

A simple application that does image optimization on the fly. This can be useful, for example, in websites which contain unoptimised images and would be difficult to reupload optimised images. This application uses sharp to perform the optimizations and can do the following:

- Change width and/or height of the image
- Change format of the image to jpeg, png or webp
- Apply optimisations specific to jpeg, png and webp

## Options

Pass format specfic options to apply optimisations. These options are 1:1 with sharp options.

```
/cat.png?ext=jpeg&options[quality]=1&options[progressive]=true
```

### jpeg

- `quality`. Integer 1-100 (optional, default 80).
- `progressive`. Use progressive (interlace) scan (optional, default false)
- `chromaSubsampling`. Set to '4:4:4' to prevent chroma subsampling otherwise defaults to '4:2:0' chroma subsampling (optional, default '4:2:0').
- `optimiseCoding` / `optimizeCoding`. Optimise Huffman coding tables (optional, default true)
- `trellisQuantisation`. Apply trellis quantisation (optional, default false).
- `overshootDeringing`. Apply overshoot deringing (optional, default false).
- `optimiseScans` / `optimizeScans`. Optimise progressive scans, forces progressive (optional, default false).
- `quantisationTable` / `quantizationTable`. Quantization table to use, integer 0-8 (optional, default 0).

### png

- `progressive`. Use progressive (interlace) scan (optional, default false)
- `compressionLevel`. zlib compression level, 0-9 (optional, default 9).
- `adaptiveFiltering`. Use adaptive row filtering (optional, default false).
- `palette`. Quantise to a palette-based image with alpha transparency support (optional, default false).
- `quality`. Use the lowest number of colours needed to achieve given quality, sets palette to true (optional, default 100).
- `colours` / `colors`. maximum number of palette entries, sets palette to true (optional, default 256)
- `dither`. Level of Floyd-Steinberg error diffusion, sets palette to true (optional, default 1.0)

### webp

- `quality`. Integer 1-100 (optional, default 80).
- `alphaQuality`. Quality of alpha layer, integer 0-100 (optional, default 100).
- `lossless`. Use lossless compression mode (optional, default false).
- `nearLossless`. Use near_lossless compression mode (optional, default false).
- `smartSubsample`. Use high quality chroma subsampling (optional, default false).
- `reductionEffort`. Level of CPU effort to reduce file size, integer 0-6 (optional, default 4).
- `pageHeight`. Page height for animated output.
- `loop`. Number of animation iterations, use 0 for infinite animation (optional, default 0).
- `delay`. list of delays between animation frames (in milliseconds).
  
  ```
  /cat.png?ext=webp&options[delay][]=100&options[delay][]=100
  ```