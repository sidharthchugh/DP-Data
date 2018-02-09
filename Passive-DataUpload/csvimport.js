var ElasticsearchCSV = require('elasticsearch-csv');

// create an instance of the importer with options
var esCSV = new ElasticsearchCSV({
    es: { index: 'elastic_digital', type: 'operations', host: '46.101.124.85:9200' },
    csv: { filePath: 'bi.csv', headers: true }
});

esCSV.import()
    .then(function (response) {
        // Elasticsearch response for the bulk insert
        console.log(response);
    }, function (err) {
        // throw error
        throw err;
    });
