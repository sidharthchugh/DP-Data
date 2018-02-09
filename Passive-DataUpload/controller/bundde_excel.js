var mongoXlsx = require('mongo-xlsx');
var jsonfile = require('jsonfile')
var mongoose = require('mongoose');
var _ = require('lodash');
var data = require("../../Web-Scrapper/profiles.json");

var newData = data.filter((thing, index, self) => self.findIndex((t) => {
  if (t.companyName === thing.companyName) {
   if(t.sector !== thing.sector) {
     t.sector = t.sector + '; ' + thing.sector;
   }
	 return t;
  }; 
}) === index)


var cleansing = newData.map(t => {
   if(t.contactName.includes('Dipl.') || t.companyName.includes('Dr.') || t.companyName === 'MBA, B.Eng.' || t.companyName === 'Prof.' || t.companyName === 'Assistant Vice President' || t.companyName === 'MSc  Eng' || t.companyName === 'Dip. Eng.' || t.companyName === 'Dipl. Ing.' || t.companyName === 'Dipl. Ing.' || t.companyName === 'Prof.' || t.companyName === 'MSc  Eng' || t.companyName.includes('Manager') || t.companyName === 'Manager' || t.companyName.includes('Engineer')) {
     return t.contactName = '';
   }
   return t;
})

/* Generate automatic model for processing (A static model should be used) */
var model = mongoXlsx.buildDynamicModel(cleansing);

/* Generate Excel */
mongoXlsx.mongoData2Xlsx(cleansing, model, function(err, data) {
  console.log('File saved at:', data.fullPath); 
});