const fs = require('fs')
const MongoClient = require('mongodb').MongoClient;

module.exports.generateHtml = function () {
    const {
        rootCertificates
    } = require('tls');
    const url = 'mongodb://root:root@localhost:27017';
    const dbName = 'messages';
    const options = {
        useUnifiedTopology: true
    }
    let db;
    MongoClient.connect(url, options, function (err, client) {
        console.log("Connected successfully to server");
        db = client.db(dbName);
        db.collection('messages').find({}).toArray(function (err, docs) {
            if (err) throw err
            let div = ""
            for (const message of docs) {
                let content = message.content
                let author = message.author
                div += '<div class="container">\n<div class="author">\n<h4>' + author + '</h4>\n</div>\n<div class="content">\n<p>' + content + '</p>\n</div>\n</div>\n<hr>'
            }
            fs.writeFile('./webpage/message.html', div , (err) => {
                console.log('generation finished !')
            })
    
        })
    });
}