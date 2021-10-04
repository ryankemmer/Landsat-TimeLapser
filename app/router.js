var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const ee = require('@google/earthengine');
const { v4: uuidv4 } = require('uuid');
const axios = require("axios");
const eeService = require('./eeService')

//create map

router.post('/createmap', async (req, res) => {
  
  let group = Object.keys(req.body);
  group = JSON.parse(group)

  email = group[0]
  lat = group[1]
  lon = group[2]
  bbox = group[3]
  points = group[4]

  res.send({bbox,points})

})

// NEW VIDEO
router.post('/getVideoURL', async (req, res) => {
	
  var today = new Date(req.body.end);

  var dd = ('0' + today.getDate()).slice(-2)
  var mm = ('0' + (today.getMonth()+1)).slice(-2)
  var yyyy = today.getFullYear();

  var currDateStr = yyyy + '-' + mm + '-' + dd

  var yearAgo = new Date(req.body.start);

  dd = ('0' + yearAgo.getDate()).slice(-2)
  mm = ('0' + (yearAgo.getMonth()+1)).slice(-2)
  yyyy = yearAgo.getFullYear();

  var currDateMinusYear = yyyy + '-' + mm + '-' + dd

  const db = dbService.getDbServiceInstance();
  const userObj = await db.getUser(email);
  var userbbox = userObj.bbox

  var points = userObj.points

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
    .filterDate(currDateMinusYear, currDateStr)
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
