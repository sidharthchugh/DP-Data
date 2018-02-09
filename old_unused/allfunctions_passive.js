db.profiles.find({companyStatus: "Passive"}).snapshot().forEach(
  function (a) {
    // update document, using its own properties
     a.companyName = { type: "string", typeValues: a.companyName };
     a.slogan = { type: "string", typeValues: a.slogan };
     a.companyDescription = { type: "textArea", typeValues: a.companyDescription };
     a.organizationType = { type: "dropdown", typeValues: a.organizationType };
     a.businessType = { type: "dropdownMultiple", typeValues: [ { label: a.businessType, value: a.businessType, className: ""} ]};
     a.legalForm = { type: "string", typeValues: a.legalForm };
     a.industry = { type: "dropdown", typeValues: a.industry };
     a.sector = { type: "dropdown", typeValues: a.sector };
     a.subSector = { type: "dropdownMultiple", typeValues: [ { label: a.subSector, value: a.subSector, className: ""} ]};
     a.headquarters = { type: "string", typeValues: a.headquarters };
     a.country = { type: "string", typeValues: a.country };
     a.zipCode = { type: "string", typeValues: a.zipCode };
     a.streetAddress = { type: "string", typeValues: a.streetAddress };
     a.yearEstablished = { type: "string", typeValues: a.yearEstablished };
     a.ftes = { type: "dropdown", typeValues: a.ftes };
     a.mission = { type: "textArea", typeValues: a.mission };
     a.vision = { type: "textArea", typeValues: a.vision };
     a.companyCulture = { type: "textArea", typeValues: a.companyCulture };
     a.othercompanyAttributes = { type: "multiSelect", typeValues: [ { label: a.othercompanyAttributes, value: a.othercompanyAttributes, className: ""} ]};
     a.teamMember = [ {  teamMemberPosition: { type:"string", typeValues: "" } , teamMemberName : { type:"string", typeValues: "" } } ];
     a.investors = [ {  investorsName: { type:"string", typeValues: a.investors }  } ];
     a.suppliers = [ {  suppliersName: { type:"string", typeValues: a.suppliers }  } ];
     a.daughterCompanies = [ {  daughterCompaniesName: { type:"string", typeValues: a.daughterCompanies }  } ];
     a.holdingCompanies = [ {  holdingCompaniesName: { type:"string", typeValues: a.holdingCompanies }  } ];
     a.otherBusinessRelationships = [ {  otherBusinessRelationshipsType: { type:"string", typeValues: "" } , otherBusinessRelationshipsName : { type:"string", typeValues: "" } } ];
     a.keyActivities = { type: "textArea", typeValues: a.keyActivities };
     a.keyResources = { type: "textArea", typeValues: a.keyResources };
     a.keyPartnership = { type: "textArea", typeValues: a.keyPartnership };
     a.costStructure = { type: "textArea", typeValues: a.costStructure };
     a.valueProposition = { type: "textArea", typeValues: a.valueProposition };
     a.customerRelationships = { type: "textArea", typeValues: a.customerRelationships };
     a.customerSegments = { type: "multiSelect", typeValues: [ { label: a.customerSegments, value: a.customerSegments, className: ""} ]};
     a.channels = { type: "multiSelect", typeValues: [ { label: a.channels, value: a.channels, className: ""} ]};
     a.revenueStreams = { type: "multiSelect", typeValues: [ { label: a.revenueStreams, value: a.revenueStreams, className: ""} ]};
     a.technologies = { type: "multiSelect", typeValues: [ { label: a.technologies, value: a.technologies, className: ""} ]};
     a.standardsCertifications = { type: "multiSelect", typeValues: [ { label: a.standardsCertifications, value: a.standardsCertifications, className: ""} ]};
     a.revenue = [ {  name: { type:"string", typeValues: a.revenue }  } ];
     a.investmentStage = [ {  name: { type:"dropdown", typeValues: a.investmentStage }  } ];
     a.totalFundingObtain = [ {  name: { type:"string", typeValues: a.totalFundingObtain }  } ];
     a.valueChain =  [ { valueChainPosition : { type:"dropdown", typeValues: "" } , valueChainLevel : { type:"dropdown", typeValues: "" } } ];
     a.supportFunction =  [ { supportFunctions : { type:"dropdown", typeValues: "" } , supportFunctionLevel : { type:"dropdown", typeValues: "" } } ];
     a.companyWebsite = { type: "string", typeValues: a.companyWebsite };
     a.phone = { type: "string", typeValues: a.phone };
     a.email = { type: "string", typeValues: a.email };
     a.facebook = { type: "string", typeValues: a.facebook };
     a.linkedIn = { type: "string", typeValues: a.linkedIn };
     a.twitter = { type: "string", typeValues: a.twitter };
     a.otherWebPresense =  [ { name : { type:"string", typeValues: a.otherWebPresense } } ];
     a.references = [ {  projectName: { type:"string", typeValues: "" } , projectDescription : { type:"textArea", typeValues: "" } , projectPartners: [ {  projectPartnersRole: { type:"string", typeValues: "" } , projectPartnersName : { type:"string", typeValues: "" } } ] }];
     a.dimensionName = { type: "string", typeValues: a.dimensionName };
     a.dimensionScore = { type: "string", typeValues: a.dimensionScore };

     // save the updated document
     db.profiles.save(a);
  }
)


  
db.profiles.find({companyStatus: "Passive"}).forEach(function(locMultipleValueSeparator) {

    var myString = locMultipleValueSeparator.locations;
     
    var stringArr = myString.toString().split(';') ;
    
       if(stringArr.length == 1) {
     locMultipleValueSeparator.locations = { type: "multiSelectAutoSuggest", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""}  ]};
     } else if(stringArr.length == 2) {
     locMultipleValueSeparator.locations = { type: "multiSelectAutoSuggest", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} ]};
     } else if (stringArr.length == 3) {
      locMultipleValueSeparator.locations = { type: "multiSelectAutoSuggest", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} ]};
     } else if (stringArr.length == 4) {
      locMultipleValueSeparator.locations = { type: "multiSelectAutoSuggest", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} ]};
     } else if (stringArr.length == 5) {
      locMultipleValueSeparator.locations = { type: "multiSelectAutoSuggest", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} , { label: stringArr[4], value: stringArr[4], className: ""} ]};
     } else if (stringArr.length == 6) {
      locMultipleValueSeparator.locations = { type: "multiSelectAutoSuggest", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} , { label: stringArr[4], value: stringArr[4], className: ""} , { label: stringArr[5], value: stringArr[5], className: ""} ]};
     } else if (stringArr.length == 7) {
      locMultipleValueSeparator.locations = { type: "multiSelectAutoSuggest", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} , { label: stringArr[4], value: stringArr[4], className: ""} , { label: stringArr[5], value: stringArr[5], className: ""}, { label: stringArr[6], value: stringArr[6], className: ""} ]};
     } else if (stringArr.length == 8) {
      locMultipleValueSeparator.locations = { type: "multiSelectAutoSuggest", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} , { label: stringArr[4], value: stringArr[4], className: ""} , { label: stringArr[5], value: stringArr[5], className: ""} , { label: stringArr[6], value: stringArr[6], className: ""} , { label: stringArr[7], value: stringArr[7], className: ""} ]};
     } else if (stringArr.length == 9) {
      locMultipleValueSeparator.locations = { type: "multiSelectAutoSuggest", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} , { label: stringArr[4], value: stringArr[4], className: ""} , { label: stringArr[5], value: stringArr[5], className: ""} , { label: stringArr[6], value: stringArr[6], className: ""} , { label: stringArr[7], value: stringArr[7], className: ""} , { label: stringArr[8], value: stringArr[8], className: ""} ]};
     } else if (stringArr.length > 9) {
      locMultipleValueSeparator.locations = { type: "multiSelectAutoSuggest", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} , { label: stringArr[4], value: stringArr[4], className: ""} , { label: stringArr[5], value: stringArr[5], className: ""} , { label: stringArr[6], value: stringArr[6], className: ""} , { label: stringArr[7], value: stringArr[7], className: ""} , { label: stringArr[8], value: stringArr[8], className: ""} , { label: stringArr[9], value: stringArr[9], className: ""} ]};
     }
     db.profiles.save(locMultipleValueSeparator);
   // print(locMultipleValueSeparator.locations)
    
  });


db.profiles.find({companyStatus: "Passive"}).forEach(function(langMultipleValueSeparator) {

    var myString = langMultipleValueSeparator.languages;
     
    var stringArr = myString.toString().split(';') ;
    
       if(stringArr.length == 1) {
     langMultipleValueSeparator.languages = { type: "multiSelectAutoSuggest", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""}  ]};
     } else if(stringArr.length == 2) {
     langMultipleValueSeparator.languages = { type: "multiSelectAutoSuggest", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} ]};
     } else if (stringArr.length == 3) {
      langMultipleValueSeparator.languages = { type: "multiSelectAutoSuggest", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} ]};
     } else if (stringArr.length == 4) {
      langMultipleValueSeparator.languages = { type: "multiSelectAutoSuggest", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} ]};
     } else if (stringArr.length == 5) {
      langMultipleValueSeparator.languages = { type: "multiSelectAutoSuggest", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} , { label: stringArr[4], value: stringArr[4], className: ""} ]};
     } else if (stringArr.length == 6) {
      langMultipleValueSeparator.languages = { type: "multiSelectAutoSuggest", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} , { label: stringArr[4], value: stringArr[4], className: ""} , { label: stringArr[5], value: stringArr[5], className: ""} ]};
     } else if (stringArr.length == 7) {
      langMultipleValueSeparator.languages = { type: "multiSelectAutoSuggest", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} , { label: stringArr[4], value: stringArr[4], className: ""} , { label: stringArr[5], value: stringArr[5], className: ""}, { label: stringArr[6], value: stringArr[6], className: ""} ]};
     } else if (stringArr.length == 8) {
      langMultipleValueSeparator.languages = { type: "multiSelectAutoSuggest", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} , { label: stringArr[4], value: stringArr[4], className: ""} , { label: stringArr[5], value: stringArr[5], className: ""} , { label: stringArr[6], value: stringArr[6], className: ""} , { label: stringArr[7], value: stringArr[7], className: ""} ]};
     } else if (stringArr.length == 9) {
      langMultipleValueSeparator.languages = { type: "multiSelectAutoSuggest", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} , { label: stringArr[4], value: stringArr[4], className: ""} , { label: stringArr[5], value: stringArr[5], className: ""} , { label: stringArr[6], value: stringArr[6], className: ""} , { label: stringArr[7], value: stringArr[7], className: ""} , { label: stringArr[8], value: stringArr[8], className: ""} ]};
     } else if (stringArr.length > 9) {
      langMultipleValueSeparator.languages = { type: "multiSelectAutoSuggest", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} , { label: stringArr[4], value: stringArr[4], className: ""} , { label: stringArr[5], value: stringArr[5], className: ""} , { label: stringArr[6], value: stringArr[6], className: ""} , { label: stringArr[7], value: stringArr[7], className: ""} , { label: stringArr[8], value: stringArr[8], className: ""} , { label: stringArr[9], value: stringArr[9], className: ""} ]};
     }
    
      db.profiles.save(langMultipleValueSeparator);
   // print(multipleValueSeparator.languages)
    
  });



    db.profiles.find({companyStatus: "Passive"}).forEach(function(customersMultipleValueSeparator) {

    var myString = customersMultipleValueSeparator.customers;
     
    var stringArr = myString.toString().split(';') ;
    
       if(stringArr.length == 1) {
     customersMultipleValueSeparator.customers = [ { customerName : { type:"string", typeValues: stringArr[0] } }  ];
     } else if(stringArr.length == 2) {
     customersMultipleValueSeparator.customers = [ { customerName : { type:"string", typeValues: stringArr[0] } } , { customerName : { type:"string", typeValues: stringArr[1] } } ] ;
     } else if (stringArr.length == 3) {
      customersMultipleValueSeparator.customers = [ { customerName : { type:"string", typeValues: stringArr[0] } } , { customerName : { type:"string", typeValues: stringArr[1] } } , { customerName : { type:"string", typeValues: stringArr[2] } } ] ;
     } else if (stringArr.length == 4) {
      customersMultipleValueSeparator.customers = [ { customerName : { type:"string", typeValues: stringArr[0] } } , { customerName : { type:"string", typeValues: stringArr[1] } } , { customerName : { type:"string", typeValues: stringArr[2] } } , { customerName : { type:"string", typeValues: stringArr[3] } } ]
     } else if (stringArr.length == 5) {
      customersMultipleValueSeparator.customers = [ { customerName : { type:"string", typeValues: stringArr[0] } } , { customerName : { type:"string", typeValues: stringArr[1] } } , { customerName : { type:"string", typeValues: stringArr[2] } } , { customerName : { type:"string", typeValues: stringArr[3] } } , { customerName : { type:"string", typeValues: stringArr[4] } } ]
     } else if (stringArr.length == 6) {
      customersMultipleValueSeparator.customers = [ { customerName : { type:"string", typeValues: stringArr[0] } } , { customerName : { type:"string", typeValues: stringArr[1] } } , { customerName : { type:"string", typeValues: stringArr[2] } } , { customerName : { type:"string", typeValues: stringArr[3] } } , { customerName : { type:"string", typeValues: stringArr[4] } } , { customerName : { type:"string", typeValues: stringArr[5] } } ]
     } else if (stringArr.length == 7) {
      customersMultipleValueSeparator.customers = [ { customerName : { type:"string", typeValues: stringArr[0] } } , { customerName : { type:"string", typeValues: stringArr[1] } } , { customerName : { type:"string", typeValues: stringArr[2] } } , { customerName : { type:"string", typeValues: stringArr[3] } } , { customerName : { type:"string", typeValues: stringArr[4] } } , { customerName : { type:"string", typeValues: stringArr[5] } } , { customerName : { type:"string", typeValues: stringArr[6] } }  ]
     } else if (stringArr.length == 8) {
      customersMultipleValueSeparator.customers = [ { customerName : { type:"string", typeValues: stringArr[0] } } , { customerName : { type:"string", typeValues: stringArr[1] } } , { customerName : { type:"string", typeValues: stringArr[2] } } , { customerName : { type:"string", typeValues: stringArr[3] } } , { customerName : { type:"string", typeValues: stringArr[4] } } , { customerName : { type:"string", typeValues: stringArr[5] } } , { customerName : { type:"string", typeValues: stringArr[6] } } , { customerName : { type:"string", typeValues: stringArr[7] } }  ]
     } else if (stringArr.length == 9) {
      customersMultipleValueSeparator.customers = [ { customerName : { type:"string", typeValues: stringArr[0] } } , { customerName : { type:"string", typeValues: stringArr[1] } } , { customerName : { type:"string", typeValues: stringArr[2] } } , { customerName : { type:"string", typeValues: stringArr[3] } } , { customerName : { type:"string", typeValues: stringArr[4] } } , { customerName : { type:"string", typeValues: stringArr[5] } } , { customerName : { type:"string", typeValues: stringArr[6] } } , { customerName : { type:"string", typeValues: stringArr[7] } } , { customerName : { type:"string", typeValues: stringArr[8] } }]
     } else if (stringArr.length > 9) {
      customersMultipleValueSeparator.customers = [ { customerName : { type:"string", typeValues: stringArr[0] } } , { customerName : { type:"string", typeValues: stringArr[1] } } , { customerName : { type:"string", typeValues: stringArr[2] } } , { customerName : { type:"string", typeValues: stringArr[3] } } , { customerName : { type:"string", typeValues: stringArr[4] } } , { customerName : { type:"string", typeValues: stringArr[5] } } , { customerName : { type:"string", typeValues: stringArr[6] } } , { customerName : { type:"string", typeValues: stringArr[7] } } , { customerName : { type:"string", typeValues: stringArr[8] } } , { customerName : { type:"string", typeValues: stringArr[9] } } ]
     }
     db.profiles.save(customersMultipleValueSeparator);
   // print(sourceMultipleValueSeparator.passiveProfileSource)
    
  });

   db.profiles.find({companyStatus: "Passive"}).forEach(function(strategicPartnersMultipleValueSeparator) {

    var myString = strategicPartnersMultipleValueSeparator.strategicPartners;
     
    var stringArr = myString.toString().split(';') ;
    
       if(stringArr.length == 1) {
     strategicPartnersMultipleValueSeparator.strategicPartners = [ { strategicPartnersName : { type:"string", typeValues: stringArr[0] } }  ];
     } else if(stringArr.length == 2) {
     strategicPartnersMultipleValueSeparator.strategicPartners = [ { strategicPartnersName : { type:"string", typeValues: stringArr[0] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[1] } } ] ;
     } else if (stringArr.length == 3) {
      strategicPartnersMultipleValueSeparator.strategicPartners = [ { strategicPartnersName : { type:"string", typeValues: stringArr[0] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[1] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[2] } } ] ;
     } else if (stringArr.length == 4) {
      strategicPartnersMultipleValueSeparator.strategicPartners = [ { strategicPartnersName : { type:"string", typeValues: stringArr[0] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[1] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[2] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[3] } } ]
     } else if (stringArr.length == 5) {
      strategicPartnersMultipleValueSeparator.strategicPartners = [ { strategicPartnersName : { type:"string", typeValues: stringArr[0] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[1] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[2] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[3] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[4] } } ]
     } else if (stringArr.length == 6) {
      strategicPartnersMultipleValueSeparator.strategicPartners = [ { strategicPartnersName : { type:"string", typeValues: stringArr[0] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[1] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[2] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[3] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[4] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[5] } } ]
     } else if (stringArr.length == 7) {
      strategicPartnersMultipleValueSeparator.strategicPartners = [ { strategicPartnersName : { type:"string", typeValues: stringArr[0] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[1] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[2] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[3] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[4] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[5] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[6] } } ]
     } else if (stringArr.length == 8) {
      strategicPartnersMultipleValueSeparator.strategicPartners = [ { strategicPartnersName : { type:"string", typeValues: stringArr[0] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[1] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[2] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[3] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[4] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[5] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[6] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[7] } } ]
     } else if (stringArr.length == 9) {
      strategicPartnersMultipleValueSeparator.strategicPartners = [ { strategicPartnersName : { type:"string", typeValues: stringArr[0] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[1] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[2] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[3] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[4] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[5] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[6] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[7] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[8] } }]
     } else if (stringArr.length > 9) {
      strategicPartnersMultipleValueSeparator.strategicPartners = [ { strategicPartnersName : { type:"string", typeValues: stringArr[0] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[1] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[2] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[3] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[4] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[5] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[6] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[7] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[8] } } , { strategicPartnersName : { type:"string", typeValues: stringArr[9] } } ]
     }
     db.profiles.save(strategicPartnersMultipleValueSeparator);
   // print(sourceMultipleValueSeparator.passiveProfileSource)
    
  });



 db.profiles.find({companyStatus: "Passive"}).forEach(function(product1TechMultipleValueSeparator) {

    var myString = product1TechMultipleValueSeparator.product1.productTechnologies;
     
    var stringArr = myString.toString().split(';') ;
    
       if(stringArr.length == 1) {
     product1TechMultipleValueSeparator.product1.productTechnologies = { type: "multiSelect", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""}  ]};
     } else if(stringArr.length == 2) {
     product1TechMultipleValueSeparator.product1.productTechnologies = { type: "multiSelect", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} ]};
     } else if (stringArr.length == 3) {
      product1TechMultipleValueSeparator.product1.productTechnologies = { type: "multiSelect", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} ]};
     } else if (stringArr.length == 4) {
      product1TechMultipleValueSeparator.product1.productTechnologies = { type: "multiSelect", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} ]};
     } else if (stringArr.length == 5) {
      product1TechMultipleValueSeparator.product1.productTechnologies = { type: "multiSelect", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} , { label: stringArr[4], value: stringArr[4], className: ""} ]};
     } else if (stringArr.length == 6) {
      product1TechMultipleValueSeparator.product1.productTechnologies = { type: "multiSelect", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} , { label: stringArr[4], value: stringArr[4], className: ""} , { label: stringArr[5], value: stringArr[5], className: ""} ]};
     } else if (stringArr.length == 7) {
      product1TechMultipleValueSeparator.product1.productTechnologies = { type: "multiSelect", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} , { label: stringArr[4], value: stringArr[4], className: ""} , { label: stringArr[5], value: stringArr[5], className: ""}, { label: stringArr[6], value: stringArr[6], className: ""} ]};
     } else if (stringArr.length == 8) {
      product1TechMultipleValueSeparator.product1.productTechnologies = { type: "multiSelect", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} , { label: stringArr[4], value: stringArr[4], className: ""} , { label: stringArr[5], value: stringArr[5], className: ""} , { label: stringArr[6], value: stringArr[6], className: ""} , { label: stringArr[7], value: stringArr[7], className: ""} ]};
     } else if (stringArr.length == 9) {
      product1TechMultipleValueSeparator.product1.productTechnologies = { type: "multiSelect", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} , { label: stringArr[4], value: stringArr[4], className: ""} , { label: stringArr[5], value: stringArr[5], className: ""} , { label: stringArr[6], value: stringArr[6], className: ""} , { label: stringArr[7], value: stringArr[7], className: ""} , { label: stringArr[8], value: stringArr[8], className: ""} ]};
     } else if (stringArr.length > 9) {
      product1TechMultipleValueSeparator.product1.productTechnologies = { type: "multiSelect", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} , { label: stringArr[4], value: stringArr[4], className: ""} , { label: stringArr[5], value: stringArr[5], className: ""} , { label: stringArr[6], value: stringArr[6], className: ""} , { label: stringArr[7], value: stringArr[7], className: ""} , { label: stringArr[8], value: stringArr[8], className: ""} , { label: stringArr[9], value: stringArr[9], className: ""} ]};
     }
     db.profiles.save(product1TechMultipleValueSeparator);
   // print(product1TechMultipleValueSeparator.productTechnologies)
    
  });
  
  
    
  db.profiles.find({companyStatus: "Passive"}).forEach(function(product1CategoryMultipleValueSeparator) {

    var myString = product1CategoryMultipleValueSeparator.product1.productCategory;
     
    var stringArr = myString.toString().split(';') ;
    
       if(stringArr.length == 1) {
     product1CategoryMultipleValueSeparator.product1.productCategory = { type: "multiSelect", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""}  ]};
     } else if(stringArr.length == 2) {
     product1CategoryMultipleValueSeparator.product1.productCategory = { type: "multiSelect", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} ]};
     } else if (stringArr.length == 3) {
      product1CategoryMultipleValueSeparator.product1.productCategory = { type: "multiSelect", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} ]};
     } else if (stringArr.length == 4) {
     product1CategoryMultipleValueSeparator.product1.productCategory = { type: "multiSelect", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} ]};
     } else if (stringArr.length == 5) {
      product1CategoryMultipleValueSeparator.product1.productCategory = { type: "multiSelect", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} , { label: stringArr[4], value: stringArr[4], className: ""} ]};
     } else if (stringArr.length == 6) {
      product1CategoryMultipleValueSeparator.product1.productCategory = { type: "multiSelect", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} , { label: stringArr[4], value: stringArr[4], className: ""} , { label: stringArr[5], value: stringArr[5], className: ""} ]};
     } else if (stringArr.length == 7) {
      product1CategoryMultipleValueSeparator.product1.productCategory = { type: "multiSelect", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} , { label: stringArr[4], value: stringArr[4], className: ""} , { label: stringArr[5], value: stringArr[5], className: ""}, { label: stringArr[6], value: stringArr[6], className: ""} ]};
     } else if (stringArr.length == 8) {
      product1CategoryMultipleValueSeparator.product1.productCategory = { type: "multiSelect", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} , { label: stringArr[4], value: stringArr[4], className: ""} , { label: stringArr[5], value: stringArr[5], className: ""} , { label: stringArr[6], value: stringArr[6], className: ""} , { label: stringArr[7], value: stringArr[7], className: ""} ]};
     } else if (stringArr.length == 9) {
      product1CategoryMultipleValueSeparator.product1.productCategory = { type: "multiSelect", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} , { label: stringArr[4], value: stringArr[4], className: ""} , { label: stringArr[5], value: stringArr[5], className: ""} , { label: stringArr[6], value: stringArr[6], className: ""} , { label: stringArr[7], value: stringArr[7], className: ""} , { label: stringArr[8], value: stringArr[8], className: ""} ]};
     } else if (stringArr.length > 9) {
      product1CategoryMultipleValueSeparator.product1.productCategory = { type: "multiSelect", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} , { label: stringArr[4], value: stringArr[4], className: ""} , { label: stringArr[5], value: stringArr[5], className: ""} , { label: stringArr[6], value: stringArr[6], className: ""} , { label: stringArr[7], value: stringArr[7], className: ""} , { label: stringArr[8], value: stringArr[8], className: ""} , { label: stringArr[9], value: stringArr[9], className: ""} ]};
     }
     db.profiles.save(product1CategoryMultipleValueSeparator);

    
  });
  
  
  
   db.profiles.find({companyStatus: "Passive"}).forEach(function(product2TechMultipleValueSeparator) {

    var myString = product2TechMultipleValueSeparator.product2.productTechnologies;
     
    var stringArr = myString.toString().split(';') ;
    
       if(stringArr.length == 1) {
     product2TechMultipleValueSeparator.product2.productTechnologies = { type: "multiSelect", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""}  ]};
     } else if(stringArr.length == 2) {
     product2TechMultipleValueSeparator.product2.productTechnologies = { type: "multiSelect", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} ]};
     } else if (stringArr.length == 3) {
      product2TechMultipleValueSeparator.product2.productTechnologies = { type: "multiSelect", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} ]};
     } else if (stringArr.length == 4) {
      product2TechMultipleValueSeparator.product2.productTechnologies = { type: "multiSelect", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} ]};
     } else if (stringArr.length == 5) {
      product2TechMultipleValueSeparator.product2.productTechnologies = { type: "multiSelect", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} , { label: stringArr[4], value: stringArr[4], className: ""} ]};
     } else if (stringArr.length == 6) {
      product2TechMultipleValueSeparator.product2.productTechnologies = { type: "multiSelect", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} , { label: stringArr[4], value: stringArr[4], className: ""} , { label: stringArr[5], value: stringArr[5], className: ""} ]};
     } else if (stringArr.length == 7) {
      product2TechMultipleValueSeparator.product2.productTechnologies = { type: "multiSelect", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} , { label: stringArr[4], value: stringArr[4], className: ""} , { label: stringArr[5], value: stringArr[5], className: ""}, { label: stringArr[6], value: stringArr[6], className: ""} ]};
     } else if (stringArr.length == 8) {
      product2TechMultipleValueSeparator.product2.productTechnologies = { type: "multiSelect", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} , { label: stringArr[4], value: stringArr[4], className: ""} , { label: stringArr[5], value: stringArr[5], className: ""} , { label: stringArr[6], value: stringArr[6], className: ""} , { label: stringArr[7], value: stringArr[7], className: ""} ]};
     } else if (stringArr.length == 9) {
      product2TechMultipleValueSeparator.product2.productTechnologies = { type: "multiSelect", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} , { label: stringArr[4], value: stringArr[4], className: ""} , { label: stringArr[5], value: stringArr[5], className: ""} , { label: stringArr[6], value: stringArr[6], className: ""} , { label: stringArr[7], value: stringArr[7], className: ""} , { label: stringArr[8], value: stringArr[8], className: ""} ]};
     } else if (stringArr.length > 9) {
      product2TechMultipleValueSeparator.product2.productTechnologies = { type: "multiSelect", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} , { label: stringArr[4], value: stringArr[4], className: ""} , { label: stringArr[5], value: stringArr[5], className: ""} , { label: stringArr[6], value: stringArr[6], className: ""} , { label: stringArr[7], value: stringArr[7], className: ""} , { label: stringArr[8], value: stringArr[8], className: ""} , { label: stringArr[9], value: stringArr[9], className: ""} ]};
     }
     db.profiles.save(product2TechMultipleValueSeparator);
   
    
  });
  
  
    db.profiles.find({companyStatus: "Passive"}).forEach(function(product2CategoryMultipleValueSeparator) {

    var myString = product2CategoryMultipleValueSeparator.product2.productCategory;
     
   var stringArr = myString.toString().split(';') ;
    
       if(stringArr.length == 1) {
     product2CategoryMultipleValueSeparator.product2.productCategory = { type: "multiSelect", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""}  ]};
     } else if(stringArr.length == 2) {
     product2CategoryMultipleValueSeparator.product2.productCategory = { type: "multiSelect", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} ]};
     } else if (stringArr.length == 3) {
      product2CategoryMultipleValueSeparator.product2.productCategory = { type: "multiSelect", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} ]};
     } else if (stringArr.length == 4) {
     product2CategoryMultipleValueSeparator.product2.productCategory = { type: "multiSelect", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} ]};
     } else if (stringArr.length == 5) {
      product2CategoryMultipleValueSeparator.product2.productCategory = { type: "multiSelect", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} , { label: stringArr[4], value: stringArr[4], className: ""} ]};
     } else if (stringArr.length == 6) {
      product2CategoryMultipleValueSeparator.product2.productCategory = { type: "multiSelect", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} , { label: stringArr[4], value: stringArr[4], className: ""} , { label: stringArr[5], value: stringArr[5], className: ""} ]};
     } else if (stringArr.length == 7) {
      product2CategoryMultipleValueSeparator.product2.productCategory = { type: "multiSelect", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} , { label: stringArr[4], value: stringArr[4], className: ""} , { label: stringArr[5], value: stringArr[5], className: ""}, { label: stringArr[6], value: stringArr[6], className: ""} ]};
     } else if (stringArr.length == 8) {
      product2CategoryMultipleValueSeparator.product2.productCategory = { type: "multiSelect", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} , { label: stringArr[4], value: stringArr[4], className: ""} , { label: stringArr[5], value: stringArr[5], className: ""} , { label: stringArr[6], value: stringArr[6], className: ""} , { label: stringArr[7], value: stringArr[7], className: ""} ]};
     } else if (stringArr.length == 9) {
      product2CategoryMultipleValueSeparator.product2.productCategory = { type: "multiSelect", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} , { label: stringArr[4], value: stringArr[4], className: ""} , { label: stringArr[5], value: stringArr[5], className: ""} , { label: stringArr[6], value: stringArr[6], className: ""} , { label: stringArr[7], value: stringArr[7], className: ""} , { label: stringArr[8], value: stringArr[8], className: ""} ]};
     } else if (stringArr.length > 9) {
      product2CategoryMultipleValueSeparator.product2.productCategory = { type: "multiSelect", typeValues: [ { label: stringArr[0], value: stringArr[0], className: ""} , { label: stringArr[1], value: stringArr[1], className: ""} , { label: stringArr[2], value: stringArr[2], className: ""} , { label: stringArr[3], value: stringArr[3], className: ""} , { label: stringArr[4], value: stringArr[4], className: ""} , { label: stringArr[5], value: stringArr[5], className: ""} , { label: stringArr[6], value: stringArr[6], className: ""} , { label: stringArr[7], value: stringArr[7], className: ""} , { label: stringArr[8], value: stringArr[8], className: ""} , { label: stringArr[9], value: stringArr[9], className: ""} ]};
     }
     db.profiles.save(product2CategoryMultipleValueSeparator);

    
  });
  
  
  

db.profiles.find({companyStatus: "Passive"}).snapshot().forEach(
  function (fproduct1) {
    
    var a = fproduct1.product1.productId ;
    var b = fproduct1.product1.productCategory ;
    var c = fproduct1.product1.productTechnologies ;
    // update document, using its own properties
    fproduct1.product1 =  { 
    
     _id: ObjectId(),  
     productId:  a ,
     productName: { type:"string", typeValues: fproduct1.product1.productName },
     technologyField: { type: "dropdownMultiple", typeValues: [ { label: fproduct1.product1.technologyField, value: fproduct1.product1.technologyField, className: ""} ]},
     productClass: { type:"dropdown", typeValues: fproduct1.product1.productClass },
     productCategory: b ,
     productSolution: { type:"textArea", typeValues: fproduct1.product1.productSolution }, 
     businessObjective: { type: "dropdownMultiple", typeValues: [ { label: fproduct1.product1.businessObjective, value: fproduct1.product1.businessObjective, className: ""} ]},
     problemSolved:  { type:"textArea", typeValues: fproduct1.product1.problemSolved },
     applicationIndustry: { type: "dropdownMultiple", typeValues: [ { label: fproduct1.product1.applicationIndustry, value: fproduct1.product1.applicationIndustry, className: ""} ]},
     applicationSector: { type: "dropdownMultiple", typeValues: [ { label: fproduct1.product1.applicationSector, value: fproduct1.product1.applicationSector, className: ""} ]},
     applicationSubSector: { type: "dropdownMultiple", typeValues: [ { label: fproduct1.product1.applicationSubSector, value: fproduct1.product1.applicationSubSector, className: ""} ]},
     applicationValueChain: { type: "dropdownMultiple", typeValues: [ { label: fproduct1.product1.applicationValueChain, value: fproduct1.product1.applicationValueChain, className: ""} ]},
     applicationBusinessType: { type: "dropdownMultiple", typeValues: [ { label: fproduct1.product1.applicationBusinessType, value: fproduct1.product1.applicationBusinessType, className: ""} ]},
     applicationKeyActivities: { type: "multiSelect", typeValues: [ { label: fproduct1.product1.applicationKeyActivities, value: fproduct1.product1.applicationKeyActivities, className: ""} ]},
     applicationKeyResources: { type: "multiSelect", typeValues: [ { label: fproduct1.product1.applicationKeyResources, value: fproduct1.product1.applicationKeyResources, className: ""} ]},
     applicationCostStructure: { type: "multiSelect", typeValues: [ { label: fproduct1.product1.applicationCostStructure, value: fproduct1.product1.applicationCostStructure, className: ""} ]},
     digitilizationScope: { type: "dropdownMultiple", typeValues: [ { label: fproduct1.product1.digitilizationScope, value: fproduct1.product1.digitilizationScope, className: ""} ]},
     applicationValueProposition: { type:"textArea", typeValues: fproduct1.product1.applicationValueProposition },
     uniqueSellingPoints: { type:"textArea", typeValues: fproduct1.product1.uniqueSellingPoints },
     productTechnologies: c ,
     compatibileTechnologies: { type: "multiSelect", typeValues: [ { label: fproduct1.product1.compatibileTechnologies, value: fproduct1.product1.compatibileTechnologies, className: ""} ]},
     requirements: { type: "multiSelect", typeValues: [ { label: fproduct1.product1.requirements, value: fproduct1.product1.requirements, className: ""} ]},
     patents: { type: "multiSelect", typeValues: [ { label: fproduct1.product1.patents, value: fproduct1.product1.patents, className: ""} ]},
     pricingIndication: { type: "multiSelect", typeValues: [ { label: fproduct1.product1.pricingIndication, value: fproduct1.product1.pricingIndication, className: ""} ]},
     capacityIndication: { type: "multiSelect", typeValues: [ { label: fproduct1.product1.capacityIndication, value: fproduct1.product1.capacityIndication, className: ""} ]},
     delivery: { type: "multiSelect", typeValues: [ { label: fproduct1.product1.delivery, value: fproduct1.product1.delivery, className: ""} ]},
     integration: { type: "multiSelect", typeValues: [ { label: fproduct1.product1.integration, value: fproduct1.product1.integration, className: ""} ]},
     maintenance: { type: "multiSelect", typeValues: [ { label: fproduct1.product1.maintenance, value: fproduct1.product1.maintenance, className: ""} ]},
     geographicalMarkets: { type: "multiSelectAutoSuggest", typeValues: [ { label: fproduct1.product1.geographicalMarkets, value: fproduct1.product1.geographicalMarkets, className: ""} ]},
     industryStandards: { type: "multiSelect", typeValues: [ { label: fproduct1.product1.industryStandards, value: fproduct1.product1.industryStandards, className: ""} ]},
     dataSecurity: { type:"textArea", typeValues: fproduct1.product1.dataSecurity },
     segmentsDescription: { type:"textArea", typeValues: fproduct1.product1.segmentsDescription },
     regulatoryCondition: { type:"textArea", typeValues: fproduct1.product1.regulatoryCondition },
     productRisk: { type:"textArea", typeValues: fproduct1.product1.productRisk },
     otherProductAttributes: { type: "multiSelect", typeValues: [ { label: fproduct1.product1.otherProductAttributes, value: fproduct1.product1.otherProductAttributes, className: ""} ]}
     
     } ;

    // save the updated document
    db.profiles.save(fproduct1);
  }
)




db.profiles.find({companyStatus: "Passive"}).snapshot().forEach(
  function (fproduct2) {
    var a = fproduct2.product2.productId ;
    var b = fproduct2.product2.productCategory ;
    var c = fproduct2.product2.productTechnologies ;
    // update document, using its own properties
    fproduct2.product2 =  { 
     
     _id: ObjectId(), 
     productId:  a,
     productName: { type:"string", typeValues: fproduct2.product2.productName },
     productClass: { type:"dropdown", typeValues: fproduct2.product2.productClass },
     technologyField: { type: "dropdownMultiple", typeValues: [ { label: fproduct2.product2.technologyField, value: fproduct2.product2.technologyField, className: ""} ]},
     productCategory: b,
     productSolution: { type:"textArea", typeValues: fproduct2.product2.productSolution }, 
     businessObjective: { type: "dropdownMultiple", typeValues: [ { label: fproduct2.product2.businessObjective, value: fproduct2.product2.businessObjective, className: ""} ]},
     problemSolved:  { type:"textArea", typeValues: fproduct2.product2.problemSolved },
     applicationIndustry: { type: "dropdownMultiple", typeValues: [ { label: fproduct2.product2.applicationIndustry, value: fproduct2.product2.applicationIndustry, className: ""} ]},
     applicationSector: { type: "dropdownMultiple", typeValues: [ { label: fproduct2.product2.applicationSector, value: fproduct2.product2.applicationSector, className: ""} ]},
     applicationSubSector: { type: "dropdownMultiple", typeValues: [ { label: fproduct2.product2.applicationSubSector, value: fproduct2.product2.applicationSubSector, className: ""} ]},
     applicationValueChain: { type: "dropdownMultiple", typeValues: [ { label: fproduct2.product2.applicationValueChain, value: fproduct2.product2.applicationValueChain, className: ""} ]},
     applicationBusinessType: { type: "dropdownMultiple", typeValues: [ { label: fproduct2.product2.applicationBusinessType, value: fproduct2.product2.applicationBusinessType, className: ""} ]},
     applicationKeyActivities: { type: "multiSelect", typeValues: [ { label: fproduct2.product2.keyActivities, value: fproduct2.product2.keyActivities, className: ""} ]},
     applicationKeyResources: { type: "multiSelect", typeValues: [ { label: fproduct2.product2.keyResources, value: fproduct2.product2.keyResources, className: ""} ]},
     applicationCostStructure: { type: "multiSelect", typeValues: [ { label: fproduct2.product2.costStructure, value: fproduct2.product2.costStructure, className: ""} ]},
     digitilizationScope: { type: "dropdownMultiple", typeValues: [ { label: fproduct2.product2.digitilizationScope, value: fproduct2.product2.digitilizationScope, className: ""} ]},
     applicationValueProposition: { type:"textArea", typeValues: fproduct2.product2.valueProposition },
     uniqueSellingPoints: { type:"textArea", typeValues: fproduct2.product2.uniqueSellingPoints },
     productTechnologies: c,
     compatibileTechnologies: { type: "multiSelect", typeValues: [ { label: fproduct2.product2.compatibileTechnologies, value: fproduct2.product2.compatibileTechnologies, className: ""} ]},
     requirements: { type: "multiSelect", typeValues: [ { label: fproduct2.product2.requirements, value: fproduct2.product2.requirements, className: ""} ]},
     patents: { type: "multiSelect", typeValues: [ { label: fproduct2.product2.patents, value: fproduct2.product2.patents, className: ""} ]},
     pricingIndication: { type: "multiSelect", typeValues: [ { label: fproduct2.product2.pricingIndication, value: fproduct2.product2.pricingIndication, className: ""} ]},
     capacityIndication: { type: "multiSelect", typeValues: [ { label: fproduct2.product2.capacityIndication, value: fproduct2.product2.capacityIndication, className: ""} ]},
     delivery: { type: "multiSelect", typeValues: [ { label: fproduct2.product2.delivery, value: fproduct2.product2.delivery, className: ""} ]},
     integration: { type: "multiSelect", typeValues: [ { label: fproduct2.product2.integration, value: fproduct2.product2.integration, className: ""} ]},
     maintenance: { type: "multiSelect", typeValues: [ { label: fproduct2.product2.maintenance, value: fproduct2.product2.maintenance, className: ""} ]},
     geographicalMarkets: { type: "multiSelectAutoSuggest", typeValues: [ { label: fproduct2.product2.geographicalMarkets, value: fproduct2.product2.geographicalMarkets, className: ""} ]},
     industryStandards: { type: "multiSelect", typeValues: [ { label: fproduct2.product2.industryStandards, value: fproduct2.product2.industryStandards, className: ""} ]},
     dataSecurity: { type:"textArea", typeValues: fproduct2.product2.dataSecurity },
     segmentsDescription: { type:"textArea", typeValues: fproduct2.product2.segmentsDescription },
     regulatoryCondition: { type:"textArea", typeValues: fproduct2.product2.regulatoryCondition },
     productRisk: { type:"textArea", typeValues: fproduct2.product2.productRisk },
     otherProductAttributes: { type: "multiSelect", typeValues: [ { label: fproduct2.product2.otherProductAttributes, value: fproduct2.product2.otherProductAttributes, className: ""} ]}
     
     } ;

    // save the updated document
    db.profiles.save(fproduct2);
  }
)


db.profiles.find({companyStatus: "Passive"}).forEach( function(productArray) {
    productArray.products = [productArray.product1, productArray.product2];
    db.profiles.save(productArray);
  });

db.profiles.update({companyStatus: "Passive"},{$unset: {product1:1}},{multi: true});
db.profiles.update({companyStatus: "Passive"},{$unset: {product2:1}},{multi: true});

db.profiles.update( { "products.productId": ""},{$pull:{"products":{"productId":""}}},{multi: true});
  