var mongoXlsx = require('mongo-xlsx');
var jsonfile = require('jsonfile')
var mongoose = require('mongoose');
var _ = require('lodash');
var data = require("../../Web-Scrapper/webScrapper/events.json");


var cleansing = data.map(t => {
  t.companyDescription = t.companyDescription.join(',')
  if(t.facebook.includes('twitter.com')) {
      t.twitter = t.facebook
      t.facebook = ''
  }
   return t;
})

/* Generate automatic model for processing (A static model should be used) */
var model = mongoXlsx.buildDynamicModel(cleansing);

/* Generate Excel */
mongoXlsx.mongoData2Xlsx(cleansing, model, function(err, data) {
  console.log('File saved at:', data.fullPath); 
});