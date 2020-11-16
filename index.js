const path = require('path');
const sharp = require('sharp');
const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('common'));
app.use(function (req, res) {
  const ext = req.query.ext;
  const filePath = path.join(__dirname, 'public', req.path);
  const supportedOutputFormats = ['jpeg', 'png', 'webp'];
  
  let sharpi = sharp(filePath);
  let width = parseInt(req.query.w, 10);
  let height = parseInt(req.query.h, 10);

  // width and height must be positive
  width = (typeof width == 'number' && width > 0) ? width : null;
  height = (typeof height == 'number' && height > 0) ? height : null;
  
  if (ext && supportedOutputFormats.includes(ext)) {
    const options = req.query.options;

    if (options) {
      // common
      options.quality && (options.quality = parseInt(options.quality));
      options.progressive && (options.progressive = options.progressive == 'true' ? true : false);

      // jpeg
      options.optimiseCoding && (options.optimiseCoding = options.optimiseCoding == 'true' ? true : false);
      options.optimizeCoding && (options.optimizeCoding = options.optimizeCoding == 'true' ? true : false);
      options.trellisQuantisation && (options.trellisQuantisation = options.trellisQuantisation == 'true' ? true : false);
      options.overshootDeringing && (options.overshootDeringing = options.overshootDeringing == 'true' ? true : false);
      options.optimiseScans && (options.optimiseScans = options.optimiseScans == 'true' ? true : false);
      options.optimizeScans && (options.optimizeScans = options.optimizeScans == 'true' ? true : false);
      options.quantisationTable && (options.quantisationTable = parseInt(options.quantisationTable));
      options.quantizationTable && (options.quantizationTable = parseInt(options.quantizationTable));

      // png
      options.compressionLevel && (options.compressionLevel = parseInt(options.compressionLevel));
      options.adaptiveFiltering && (options.adaptiveFiltering = options.adaptiveFiltering == 'true' ? true : false);
      options.palette && (options.palette = options.palette == 'true' ? true : false);
      options.colors && (options.colors = parseInt(options.colors));
      options.colours && (options.colours = parseInt(options.colours));
      options.dither && (options.dither = parseFloat(options.dither));
      
      // webp
      options.alphaQuality && (options.alphaQuality = parseInt(options.alphaQuality));
      options.lossless && (options.lossless = options.lossless == 'true' ? true : false);
      options.nearLossless && (options.nearLossless = options.nearLossless == 'true' ? true : false);
      options.smartSubsample && (options.smartSubsample = options.smartSubsample == 'true' ? true : false);
      options.reductionEffort && (options.reductionEffort = parseInt(options.reductionEffort));
      options.pageHeight && (options.pageHeight = parseInt(options.pageHeight));
      options.loop && (options.loop = parseInt(options.loop));

      if (options.delay && Array.isArray(options.delay)) {
        options.delay = options.delay.map(delay => parseInt(delay));
      }
    }

    console.debug('options', options);
    sharpi = sharpi.toFormat(ext, options);
  }

  sharpi.resize(width, height, {fit: (width && height) ? 'fill' : 'cover'}).toBuffer(function (err, data, info) {
    info && res.contentType(info.format);
    info && res.setHeader('content-length', info.size);

    res.end(data, 'binary');
  });
});

app.listen(3000, 'localhost', function(err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Listening on localhost:3000');
});