var mongoXlsx = require('mongo-xlsx');
var jsonfile = require('jsonfile')
var mongoose = require('mongoose');
var _ = require('lodash');
var data = require("../../Web-Scrapper/webScrapper/bund_de.json");

/* Generate automatic model for processing (A static model should be used) */
var model = mongoXlsx.buildDynamicModel(data);

/* Generate Excel */
mongoXlsx.mongoData2Xlsx(data, model, function(err, data) {
  console.log('File saved at:', data.fullPath); 
});