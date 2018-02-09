var mongoelasticsearch = require('mongo-elasticsearch');
var t = new mongoelasticsearch.Transfer({
  esOpts: {
    host: 'http://46.101.124.85:9200',
    log: 'trace'
  },
  esTargetType: 'profiles',
  esTargetIndex: 'elastic_digital',
  mongoUri: 'mongodb://sidharthchugh:iQraGoevYHgcRAo3ePhHyvIh6YHuEkbou3oJVb2uVSOV15iC8P7d0uu8PiSGv8mIIxGfo3HL0AuGgzmr4R34FQ==@sidharthchugh.documents.azure.com:10255/dp-web-prod?ssl=true',
  mongoSourceCollection: 'profiles'
});

t.start().then(function(results) {
  console.log('Exiting');
  console.log(results);
  process.exit();
});