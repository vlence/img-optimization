const path = require('path');
const sharp = require('sharp');
const express = require('express');
const app = express();

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
    sharpi = sharpi.toFormat(ext);
  }

  sharpi.resize(width, height, {fit: (width && height) ? 'fill' : 'cover'}).toBuffer(function (err, data, info) {
    res.contentType(info.format);
    res.setHeader('content-length', info.size);

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