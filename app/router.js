var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const ee = require('@google/earthengine');
const { v4: uuidv4 } = require('uuid');
const axios = require("axios");
const eeService = require('./eeService')

// NEW VIDEO
router.post('/getVideoURL', async (req, res) => {

  console.log(req.body)
  console.log('bbox: ', req.body.bbox)
  console.log('points: ', req.body.points)
  console.log('start: ', req.body.start)
  console.log('end: ', req.body.end)
	
  //END DATE
  var endDate = new Date(req.body.end);
  var dd = ('0' + endDate.getDate()).slice(-2)
  var mm = ('0' + (endDate.getMonth()+1)).slice(-2)
  var yyyy = endDate.getFullYear();
  var finalEnd = yyyy + '-' + mm + '-' + dd

  //START DATE
  var startDate = new Date(req.body.start);
  dd = ('0' + startDate.getDate()).slice(-2)
  mm = ('0' + (startDate.getMonth()+1)).slice(-2)
  yyyy = startDate.getFullYear();
  var finalStart = yyyy + '-' + mm + '-' + dd

  //MAP POINTS
  var userbbox = group = JSON.parse(req.body.bbox)
  var points = JSON.parse(req.body.points)

  console.log(userbbox,points)

  var aoi = ee.Geometry.Polygon(
    [[points[0],points[1],points[2],points[3]]], null,
    false);

  var cloudMask = function(img) {
      var scored = ee.Algorithms.Landsat.simpleCloudScore(img);
      var mask = scored.select(['cloud']).lte(20);
      return img.updateMask(mask);
  };

  var imgCol = ee.ImageCollection('LANDSAT/LC08/C01/T1_RT')
    .filterBounds(ee.Geometry.BBox(userbbox[0],userbbox[1],userbbox[2],userbbox[3]))
    .filterDate(finalStart, finalEnd)
    .sort('system:time_start', true)
    .limit(50)

  var imgMask = imgCol.map(cloudMask)

  var lsCompList = imgMask.map(function(img) {
      // Get the list of images belonging to the given year.
      return img
        // Apply cloud mask.
        .visualize({bands:['B4', 'B3', 'B2'], gamma: 1.5})
        .resample('bicubic')
        // Set composite year as an image property.
    });
	
	
  var lsCompCol = ee.ImageCollection(lsCompList);

  // Define arguments for animation function parameters.
  var gifParams = {
    'region': aoi,
    'dimensions': 800,
    'crs': 'EPSG:3857',
    'framesPerSecond': 6
  };

  console.log(lsCompCol.getVideoThumbURL(gifParams));
  var url = lsCompCol.getVideoThumbURL(gifParams)
  res.send({url})

});

module.exports = router;
