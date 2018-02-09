var mongoXlsx = require('mongo-xlsx');
var jsonfile = require('jsonfile')
var mongoose = require('mongoose');
var _ = require('lodash');
var {data} = require("../models/profile.js");

function valueSeprator(values, type){
 var seprator; 
 var spiltArrays = [];
 const displayValues = {};
  var stringArr = values.toString().split(';');
    stringArr.map(function(item, index){
       seprator = { label: item, value: item, className: ""}
       spiltArrays.push(seprator);
    });
   displayValues.type = type;
   displayValues.typeValues= spiltArrays;
   return displayValues; 
}

function itemSeprator(values, nameValue, type){
 var seprator; 
 var spiltArrays = [];
  var stringArr = values.toString().split(';');
    stringArr.map(function(item){
       seprator = { [nameValue]: {typeValues: item, type: type}}
       spiltArrays.push(seprator);
    });
  return spiltArrays;
}


function multiArraySeprator(values, firstValue, secondValue, type){
if(values[firstValue] && values[secondValue]) {
     var seprator; 
     let spiltArrays = [];   
     var stringArr = values[firstValue].toString().split(';');
      var seprator2; 
     let spiltArrays2 = [];   
     var stringArr2 = values[secondValue].toString().split(';');
        stringArr.map(function(item){
           seprator = { [firstValue]: {typeValues: item, type: type}}
           spiltArrays.push(seprator);
        });

         stringArr2.map(function(item){
           seprator2 = { [secondValue]: {typeValues: item, type: type}}
           spiltArrays2.push(seprator2);
        });

     return _.merge(spiltArrays,spiltArrays2);
  }
}

function typeValues(values, type){
  var typeObject={};
  typeObject.typeValues=values;  
  typeObject.type=type;
  return typeObject;
}

function formatDate(date) {
  var monthNames = [
    "01", "02", "03",
    "04", "05", "06", "07",
    "08", "09", "10",
    "11", "12"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  var hours = date.getHours();
 // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
 // Seconds part from the timestamp
 var seconds = "0" + date.getSeconds();

  return day + '/' + monthNames[monthIndex] + '/' + year + ' '+  hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}


/* Generate automatic model for processing (A static model should be used) */
var model = mongoXlsx.buildDynamicModel(data);

/* Read Excel */
mongoXlsx.xlsx2MongoData("./Database_TCN_v10.2.xlsx", model, function(err, mongoData) {

  mongoData.forEach(function(item){

    item.createdAt=formatDate(new Date(item.createdAt*1000));
    item.updatedAt=formatDate(new Date(item.updatedAt*1000));

    item.logoURI='';
    item.useCase ? item.useCase=item.useCase: item.useCase= '';
    item.passiveProfileSource ? item.passiveProfileSource=item.passiveProfileSource: item.passiveProfileSource= '';
    item.profileUpdatedBy ? item.profileUpdatedBy=item.profileUpdatedBy: item.profileUpdatedBy= '';
    item.companyName ? item.companyName=typeValues(item.companyName,'string') : item.companyName={type:'string', typeValues: ''}
    item.slogan ? item.slogan=typeValues(item.slogan,'string') : item.slogan={type:'string', typeValues: ''};
    item.companyDescription ? item.companyDescription=typeValues(item.companyDescription,'textArea') : item.companyDescription={type:'textArea', typeValues: ''};
    item.organizationType ? item.organizationType=typeValues(item.organizationType,'dropdown') : item.organizationType={type:'dropdown', typeValues: ''};
    item.businessType ? item.businessType= valueSeprator(item.businessType, 'dropdownMultiple') : item.businessType={type:'dropdownMultiple', typeValues: []};
    item.legalForm ? item.legalForm=typeValues(item.legalForm,'string') : item.legalForm={type:'string', typeValues: ''};
    item.industry ? item.industry=typeValues(item.industry,'dropdown') : item.industry={type:'dropdown', typeValues: ''};
    item.sector ? item.sector=typeValues(item.sector,'dropdown') : item.sector={type:'dropdown', typeValues: ''};
    item.subSector ? item.subSector= valueSeprator(item.subSector, 'dropdownMultiple') : item.subSector={type:'dropdownMultiple', typeValues: []};
    item.headquarters ? item.headquarters=typeValues(item.headquarters,'string') : item.headquarters={type:'string', typeValues: ''};
    item.locations ?  item.locations=valueSeprator(item.locations, 'multiSelectAutoSuggest') : item.locations={type:'multiSelectAutoSuggest', typeValues: []};
    item.country ? item.country=valueSeprator(item.country,'dropdownMultiple') : item.country={type:'dropdownMultiple', typeValues: []};
    item.zipCode ? item.zipCode=typeValues(item.zipCode,'string') : item.zipCode={type:'string', typeValues: []};
    item.streetAddress ? item.streetAddress=typeValues(item.streetAddress,'string') : item.streetAddress={type:'string', typeValues: ''};
    item.yearEstablished ? item.yearEstablished=typeValues(item.yearEstablished,'string') : item.yearEstablished={type:'string', typeValues: ''};
    item.languages ? item.languages=valueSeprator(item.languages, 'multiSelectAutoSuggest'): item.languages={type:'multiSelectAutoSuggest', typeValues: []};
    item.ftes ? item.ftes=typeValues(item.ftes,'dropdown'): item.ftes={type:'dropdown', typeValues: ''};
    item.mission ? item.mission=typeValues(item.mission,'textArea'): item.mission={type:'string', typeValues: ''};
    item.vision ? item.vision=typeValues(item.vision,'textArea'): item.vision={type:'textArea', typeValues: ''};
    item.companyCulture ? item.companyCulture=typeValues(item.companyCulture,'textArea') : item.companyCulture={type:'textArea', typeValues: ''};
    item.othercompanyAttributes? item.othercompanyAttributes=valueSeprator(item.othercompanyAttributes, 'multiSelectAutoSuggest'): item.othercompanyAttributes={type:'multiSelectAutoSuggest', typeValues: []};
    item.teamMember ? item.teamMember= multiArraySeprator(item.teamMember, 'teamMemberPosition', 'teamMemberName',  'string'): item.teamMember=[];
    item.customers ?  item.customers=itemSeprator(item.customers, 'customerName', 'string'): item.customers=[];
    item.strategicPartners ?  item.strategicPartners=itemSeprator(item.strategicPartners, 'strategicPartnersName', 'string'): item.strategicPartners=[];
    item.investors ? item.investors=itemSeprator(item.investors, 'investorsName', 'string'): item.investors=[];
    item.suppliers? item.suppliers=itemSeprator(item.suppliers, 'suppliersName', 'string'): item.suppliers=[];
    item.daughterCompanies? item.daughterCompanies=itemSeprator(item.daughterCompanies, 'daughterCompaniesName', 'string'): item.daughterCompanies=[];
    item.holdingCompanies? item.holdingCompanies=itemSeprator(item.holdingCompanies, 'holdingCompaniesName', 'string'): item.holdingCompanies=[];
    item.otherBusinessRelationships ? item.otherBusinessRelationships= multiArraySeprator(item.otherBusinessRelationships, 'otherBusinessRelationshipsName', 'otherBusinessRelationshipsType', 'string'): item.otherBusinessRelationships=[];
    item.keyActivities ? item.keyActivities=typeValues(item.keyActivities,'textArea'): item.keyActivities={type:'textArea', typeValues: ''};
    item.keyResources ? item.keyResources=typeValues(item.keyResources,'textArea'): item.keyResources={type:'textArea', typeValues: ''};
    item.keyPartnership ? item.keyPartnership=typeValues(item.keyPartnership,'textArea'): item.keyPartnership={type:'textArea', typeValues: ''};
    item.costStructure ? item.costStructure=typeValues(item.costStructure,'textArea') : item.costStructure={type:'textArea', typeValues: ''};
    item.valueProposition ?  item.valueProposition=typeValues(item.valueProposition,'textArea'): item.valueProposition={type:'textArea', typeValues: ''};
    item.customerRelationships ? item.keyActivities=typeValues(item.customerRelationships,'textArea'): item.customerRelationships={type:'textArea', typeValues: ''};
    item.customerSegments? item.customerSegments=valueSeprator(item.subSector, 'multiSelect'): item.customerSegments={type:'multiSelect', typeValues: []};
    item.channels ?  item.channels= valueSeprator(item.channels, 'multiSelect'): item.channels={type:'multiSelect', typeValues: []};
    item.revenueStreams ? item.revenueStreams= valueSeprator(item.revenueStreams, 'multiSelect') : item.revenueStreams={type:'multiSelect', typeValues: []};
    item.technologies ?  item.technologies= valueSeprator(item.technologies, 'multiSelect'): item.technologies={type:'multiSelect', typeValues: []};
    item.standardsCertifications ? tem.standardsCertifications= valueSeprator(item.standardsCertifications, 'multiSelect'): item.standardsCertifications={type:'multiSelect', typeValues: []};
    item.revenue ?  item.revenue= item.revenue=typeValues(item.revenue,'string'): item.revenue={type:'string', typeValues: ''};
    item.investmentStage? item.investmentStage=typeValues(item.investmentStage,'dropdown'): item.investmentStage={type:'dropdown', typeValues: ''};
    item.totalFundingObtain? item.totalFundingObtain=typeValues(item.totalFundingObtain,'string'): item.totalFundingObtain={type:'string', typeValues: ''};
    item.valueChain ?  item.valueChain= multiArraySeprator(item.valueChain, 'valueChainPosition', 'valueChainLevel',  'dropdown'): item.valueChain=[];
    item.supportFunction ? item.supportFunction= multiArraySeprator(item.supportFunction, 'supportFunctions', 'supportFunctionLevel',  'dropdown'): item.supportFunction=[];
    item.companyWebsite ? item.companyWebsite=typeValues(item.companyWebsite,'string'): item.companyWebsite={type:'string', typeValues: ''};
    item.investors_list ? item.investors_list= valueSeprator(item.investors_list, ' dropdownMultiple') : item.investors_list={type:'dropdownMultiple', typeValues: []};
    item.phone ?  item.phone=typeValues(item.phone,'string'): item.phone={type:'string', typeValues: ''};
    item.companyEmail ? item.companyEmail=typeValues(item.companyEmail,'string'): item.companyEmail={type:'string', typeValues: ''};
    item.skype ? item.skype=typeValues(item.skype,'string'): item.skype={type:'string', typeValues: ''};
    item.facebook ? item.facebook=typeValues(item.facebook,'string'): item.facebook={type:'string', typeValues: ''};
    item.linkedIn ?  item.linkedIn=typeValues(item.linkedIn,'string'): item.linkedIn={type:'string', typeValues: ''};
    item.twitter ? item.twitter=typeValues(item.twitter,'string'): item.twitter={type:'string', typeValues: ''};
    item.otherWebPresense ? item.otherWebPresense=itemSeprator(item.otherWebPresense, 'otherWebPresenseName', 'string'): item.otherWebPresense=[];
    item.profileTraction ? item.profileTraction= valueSeprator(item.profileTraction, 'dropdownMultiple') : item.profileTraction={type:'dropdownMultiple', typeValues: []};
    item.statusLive ? item.statusLive=typeValues(item.statusLive,'dropdown') : item.statusLive={type:'dropdown', typeValues: ''};



    /* Products */
    if(item.products1) {
      item.products1[0].productName ?  item.products1[0].productName = typeValues(item.products1[0].productName,'string'): item.products1[0].productName={type:'string', typeValues: ''};
      item.products1[0].technologyField? item.products1[0].technologyField = valueSeprator(item.products1[0].technologyField, 'dropdownMultiple'): item.products1[0].technologyField={type:'dropdownMultiple', typeValues: []};
      item.products1[0].productClass ? item.products1[0].productClass = typeValues(item.products1[0].productClass,'dropdownMultiple'): item.products1[0].productClass={type:'dropdownMultiple', typeValues: []};
      item.products1[0].productCategory? item.products1[0].productCategory = valueSeprator(item.products1[0].productCategory, 'multiSelect'): item.products1[0].productCategory={type:'multiSelect', typeValues: []};
      item.products1[0].productSolution ? item.products1[0].productSolution = typeValues(item.products1[0].productSolution,'textArea'): item.products1[0].productSolution={type:'textArea', typeValues: ''};
      item.products1[0].businessObjective ? item.products1[0].businessObjective = valueSeprator(item.products1[0].businessObjective,'dropdownMultiple'): item.products1[0].businessObjective={type:'dropdownMultiple', typeValues: []};
      item.products1[0].problemSolved ? item.products1[0].problemSolved = typeValues(item.products1[0].problemSolved,'textArea'): item.products1[0].problemSolved={type:'textArea', typeValues: ''};
      item.products1[0].applicationIndustry ? item.products1[0].applicationIndustry = valueSeprator(item.products1[0].applicationIndustry,'dropdownMultiple'): item.products1[0].applicationIndustry={type:'dropdownMultiple', typeValues: []};
      item.products1[0].applicationSector ? item.products1[0].applicationSector = valueSeprator(item.products1[0].applicationSector,'dropdownMultiple'): item.products1[0].applicationSector={type:'dropdownMultiple', typeValues: []};
      item.products1[0].applicationSubSector ? item.products1[0].applicationSubSector = valueSeprator(item.products1[0].applicationSubSector,'dropdownMultiple'): item.products1[0].applicationSubSector={type:'dropdownMultiple', typeValues: []};
      item.products1[0].applicationValueChain ? item.products1[0].applicationValueChain = valueSeprator(item.products1[0].applicationValueChain,'dropdownMultiple'): item.products1[0].applicationValueChain={type:'dropdownMultiple', typeValues: []};
      item.products1[0].applicationBusinessType ?  item.products1[0].applicationBusinessType = valueSeprator(item.products1[0].applicationBusinessType,'dropdownMultiple'): item.products1[0].applicationBusinessType={type:'dropdownMultiple', typeValues: []};
      item.products1[0].applicationKeyActivities ? item.products1[0].applicationKeyActivities = valueSeprator(item.products1[0].applicationKeyActivities,'multiSelect'):  item.products1[0].applicationKeyActivities={type:'multiSelect', typeValues: []};
      item.products1[0].applicationKeyResources ? item.products1[0].applicationKeyResources = valueSeprator(item.products1[0].applicationKeyResources,'multiSelect'): item.products1[0].applicationKeyResources={type:'multiSelect', typeValues: []};
      item.products1[0].applicationCostStructure ? item.products1[0].applicationCostStructure = valueSeprator(item.products1[0].applicationCostStructure,'multiSelect'): item.products1[0].applicationCostStructure={type:'multiSelect', typeValues: []};
      item.products1[0].digitilizationScope ? item.products1[0].digitilizationScope = valueSeprator(item.products1[0].digitilizationScope,'dropdownMultiple'): item.products1[0].digitilizationScope={type:'dropdownMultiple', typeValues: []};
      item.products1[0].applicationValueProposition ? item.products1[0].applicationValueProposition = typeValues(item.products1[0].applicationValueProposition,'textArea'): item.products1[0].applicationValueProposition={type:'textArea', typeValues: ''};
      item.products1[0].uniqueSellingPoints ?  item.products1[0].uniqueSellingPoints = typeValues(item.products1[0].uniqueSellingPoints,'textArea'): item.products1[0].uniqueSellingPoints={type:'textArea', typeValues: ''};
      item.products1[0].productTechnologies ?  item.products1[0].productTechnologies = valueSeprator(item.products1[0].productTechnologies,'multiSelect'): item.products1[0].productTechnologies={type:'multiSelect', typeValues: []};
      item.products1[0].compatibileTechnologies ?  item.products1[0].compatibileTechnologies = valueSeprator(item.products1[0].compatibileTechnologies,'multiSelect'): item.products1[0].compatibileTechnologies={type:'multiSelect', typeValues: []};
      item.products1[0].requirements ? item.products1[0].requirements = valueSeprator(item.products1[0].requirements,'multiSelect'): item.products1[0].requirements={type:'multiSelect', typeValues: []};
      item.products1[0].patents ? item.products1[0].patents = valueSeprator(item.products1[0].patents,'multiSelect'): item.products1[0].patents={type:'multiSelect', typeValues: []};
      item.products1[0].pricingIndicationMin ? item.products1[0].pricingIndicationMin = typeValues(item.products1[0].pricingIndicationMin,'string'): item.products1[0].pricingIndicationMin={type:'string', typeValues: ''};
      item.products1[0].pricingIndicationMax ? item.products1[0].pricingIndicationMax = typeValues(item.products1[0].pricingIndicationMax,'string'): item.products1[0].pricingIndicationMax={type:'string', typeValues: ''};
      item.products1[0].capacityIndication ? item.products1[0].capacityIndication = valueSeprator(item.products1[0].capacityIndication,'multiSelect'): item.products1[0].capacityIndication={type:'multiSelect', typeValues: []};
      item.products1[0].delivery ? item.products1[0].delivery = valueSeprator(item.products1[0].delivery,'multiSelect'):item.products1[0].delivery={type:'multiSelect', typeValues: []};
      item.products1[0].integration ? item.products1[0].integration = valueSeprator(item.products1[0].integration,'multiSelect'): item.products1[0].integration={type:'multiSelect', typeValues: []};
      item.products1[0].maintenance ? item.products1[0].maintenance = valueSeprator(item.products1[0].maintenance,'multiSelect'): item.products1[0].maintenance={type:'multiSelect', typeValues: []};
      item.products1[0].geographicalMarkets? item.products1[0].geographicalMarkets = valueSeprator(item.products1[0].geographicalMarkets,'multiSelectAutoSuggest'):  item.products1[0].geographicalMarkets={type:'multiSelectAutoSuggest', typeValues: []};
      item.products1[0].industryStandards ? item.products1[0].industryStandards = valueSeprator(item.products1[0].industryStandards,'multiSelect'): item.products1[0].industryStandards={type:'multiSelect', typeValues: []};
      item.products1[0].dataSecurity ?  item.products1[0].dataSecurity = typeValues(item.products1[0].dataSecurity,'textArea'): item.products1[0].dataSecurity={type:'textArea', typeValues: ''};
      item.products1[0].segmentsDescription ? item.products1[0].segmentsDescription = typeValues(item.products1[0].segmentsDescription,'textArea'): item.products1[0].segmentsDescription={type:'textArea', typeValues: ''};
      item.products1[0].regulatoryCondition ? item.products1[0].regulatoryCondition = typeValues(item.products1[0].regulatoryCondition,'textArea'): item.products1[0].regulatoryCondition={type:'textArea', typeValues: ''};
      item.products1[0].productRisk ? item.products1[0].productRisk = typeValues(item.products1[0].productRisk,'textArea'): item.products1[0].productRisk={type:'textArea', typeValues: ''};
      item.products1[0].otherProductAttributes ? item.products1[0].otherProductAttributes = valueSeprator(item.products1[0].otherProductAttributes,'multiSelect'): item.products1[0].otherProductAttributes={type:'multiSelect', typeValues: []};
  }
  if(item.products2) {
      item.products2[0].productName ?  item.products2[0].productName = typeValues(item.products2[0].productName,'string'): item.products2[0].productName={type:'string', typeValues: ''};
      item.products2[0].technologyField? item.products2[0].technologyField = valueSeprator(item.products2[0].technologyField, 'dropdownMultiple'): item.products2[0].technologyField={type:'dropdownMultiple', typeValues: []};
      item.products2[0].productClass ? item.products2[0].productClass = typeValues(item.products2[0].productClass,'dropdownMultiple'): item.products2[0].productClass={type:'dropdownMultiple', typeValues: []};
      item.products2[0].productCategory? item.products2[0].productCategory = valueSeprator(item.products2[0].productCategory, 'multiSelect'): item.products2[0].productCategory={type:'multiSelect', typeValues: []};
      item.products2[0].productSolution ? item.products2[0].productSolution = typeValues(item.products2[0].productSolution,'textArea'): item.products2[0].productSolution={type:'textArea', typeValues: ''};
      item.products2[0].businessObjective ? item.products2[0].businessObjective = valueSeprator(item.products2[0].businessObjective,'dropdownMultiple'): item.products2[0].businessObjective={type:'dropdownMultiple', typeValues: []};
      item.products2[0].problemSolved ? item.products2[0].problemSolved = typeValues(item.products2[0].problemSolved,'textArea'): item.products2[0].problemSolved={type:'textArea', typeValues: ''};
      item.products2[0].applicationIndustry ? item.products2[0].applicationIndustry = valueSeprator(item.products2[0].applicationIndustry,'dropdownMultiple'): item.products2[0].applicationIndustry={type:'dropdownMultiple', typeValues: []};
      item.products2[0].applicationSector ? item.products2[0].applicationSector = valueSeprator(item.products2[0].applicationSector,'dropdownMultiple'): item.products2[0].applicationSector={type:'dropdownMultiple', typeValues: []};
      item.products2[0].applicationSubSector ? item.products2[0].applicationSubSector = valueSeprator(item.products2[0].applicationSubSector,'dropdownMultiple'): item.products2[0].applicationSubSector={type:'dropdownMultiple', typeValues: []};
      item.products2[0].applicationValueChain ? item.products2[0].applicationValueChain = valueSeprator(item.products2[0].applicationValueChain,'dropdownMultiple'): item.products2[0].applicationValueChain={type:'dropdownMultiple', typeValues: []};
      item.products2[0].applicationBusinessType ?  item.products2[0].applicationBusinessType = valueSeprator(item.products2[0].applicationBusinessType,'dropdownMultiple'): item.products2[0].applicationBusinessType={type:'dropdownMultiple', typeValues: []};
      item.products2[0].applicationKeyActivities ? item.products2[0].applicationKeyActivities = valueSeprator(item.products2[0].applicationKeyActivities,'multiSelect'):  item.products2[0].applicationKeyActivities={type:'multiSelect', typeValues: []};
      item.products2[0].applicationKeyResources ? item.products2[0].applicationKeyResources = valueSeprator(item.products2[0].applicationKeyResources,'multiSelect'): item.products2[0].applicationKeyResources={type:'multiSelect', typeValues: []};
      item.products2[0].applicationCostStructure ? item.products2[0].applicationCostStructure = valueSeprator(item.products2[0].applicationCostStructure,'multiSelect'): item.products2[0].applicationCostStructure={type:'multiSelect', typeValues: []};
      item.products2[0].digitilizationScope ? item.products2[0].digitilizationScope = valueSeprator(item.products2[0].digitilizationScope,'dropdownMultiple'): item.products2[0].digitilizationScope={type:'dropdownMultiple', typeValues: []};
      item.products2[0].applicationValueProposition ? item.products2[0].applicationValueProposition = typeValues(item.products2[0].applicationValueProposition,'textArea'): item.products2[0].applicationValueProposition={type:'textArea', typeValues: ''};
      item.products2[0].uniqueSellingPoints ?  item.products2[0].uniqueSellingPoints = typeValues(item.products2[0].uniqueSellingPoints,'textArea'): item.products2[0].uniqueSellingPoints={type:'textArea', typeValues: ''};
      item.products2[0].productTechnologies ?  item.products2[0].productTechnologies = valueSeprator(item.products2[0].productTechnologies,'multiSelect'): item.products2[0].productTechnologies={type:'multiSelect', typeValues: []};
      item.products2[0].compatibileTechnologies ?  item.products2[0].compatibileTechnologies = valueSeprator(item.products2[0].compatibileTechnologies,'multiSelect'): item.products2[0].compatibileTechnologies={type:'multiSelect', typeValues: []};
      item.products2[0].requirements ? item.products2[0].requirements = valueSeprator(item.products2[0].requirements,'multiSelect'): item.products2[0].requirements={type:'multiSelect', typeValues: []};
      item.products2[0].patents ? item.products2[0].patents = valueSeprator(item.products2[0].patents,'multiSelect'): item.products2[0].patents={type:'multiSelect', typeValues: []};
      item.products2[0].pricingIndicationMin ? item.products2[0].pricingIndicationMin = typeValues(item.products2[0].pricingIndicationMin,'string'): item.products2[0].pricingIndicationMin={type:'string', typeValues: ''};
      item.products2[0].pricingIndicationMax ? item.products2[0].pricingIndicationMax = typeValues(item.products2[0].pricingIndicationMax,'string'): item.products2[0].pricingIndicationMax={type:'string', typeValues: ''};
      item.products2[0].capacityIndication ? item.products2[0].capacityIndication = valueSeprator(item.products2[0].capacityIndication,'multiSelect'): item.products2[0].capacityIndication={type:'multiSelect', typeValues: []};
      item.products2[0].delivery ? item.products2[0].delivery = valueSeprator(item.products2[0].delivery,'multiSelect'):item.products2[0].delivery={type:'multiSelect', typeValues: []};
      item.products2[0].integration ? item.products2[0].integration = valueSeprator(item.products2[0].integration,'multiSelect'): item.products2[0].integration={type:'multiSelect', typeValues: []};
      item.products2[0].maintenance ? item.products2[0].maintenance = valueSeprator(item.products2[0].maintenance,'multiSelect'): item.products2[0].maintenance={type:'multiSelect', typeValues: []};
      item.products2[0].geographicalMarkets? item.products2[0].geographicalMarkets = valueSeprator(item.products2[0].geographicalMarkets,'multiSelectAutoSuggest'):  item.products2[0].geographicalMarkets={type:'multiSelectAutoSuggest', typeValues: []};
      item.products2[0].industryStandards ? item.products2[0].industryStandards = valueSeprator(item.products2[0].industryStandards,'multiSelect'): item.products2[0].industryStandards={type:'multiSelect', typeValues: []};
      item.products2[0].dataSecurity ?  item.products2[0].dataSecurity = typeValues(item.products2[0].dataSecurity,'textArea'): item.products2[0].dataSecurity={type:'textArea', typeValues: ''};
      item.products2[0].segmentsDescription ? item.products2[0].segmentsDescription = typeValues(item.products2[0].segmentsDescription,'textArea'): item.products2[0].segmentsDescription={type:'textArea', typeValues: ''};
      item.products2[0].regulatoryCondition ? item.products2[0].regulatoryCondition = typeValues(item.products2[0].regulatoryCondition,'textArea'): item.products2[0].regulatoryCondition={type:'textArea', typeValues: ''};
      item.products2[0].productRisk ? item.products2[0].productRisk = typeValues(item.products2[0].productRisk,'textArea'): item.products2[0].productRisk={type:'textArea', typeValues: ''};
      item.products2[0].otherProductAttributes ? item.products2[0].otherProductAttributes = valueSeprator(item.products2[0].otherProductAttributes,'multiSelect'): item.products2[0].otherProductAttributes={type:'multiSelect', typeValues: []};
  } 

    if(item.products1 && item.products2) {
      item.products = [...item.products1, ...item.products2];
     } else if (!item.products1 && item.products2){
        item.products = item.products2;
     } else if (item.products1 && !item.products2){
       item.products = item.products1;
     }else if(!item.products1 && !item.products2) {
         item.products = [];
     }


    delete item.products1;
    delete item.products2;

    item.projects = [];
    item.projectsApplication = [];
    item.references= [];
});
  var file = './profiles.json'
  jsonfile.writeFile(file, mongoData, function (err) {
    if(err) {
        console.error(err)
    } else {
    console.log('Data Updated to Json')
       }
  })
});
