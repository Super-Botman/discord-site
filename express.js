/*******************************************/
/*     this app are created by Botman      */
/* discord : My name is Super Botman#6621  */
/*            github : Super-Botman                   */
/*******************************************/

const express = require('express');
const Discord = require('discord.js');
const fs = require('fs');
const mongoose = require('mongoose');
const generator = require('./generator.js');
const messageModel = require('./message.js');

/**************************/
/* Variables for the code */
/**************************/

const app = express();
const client = new Discord.Client();
const MongoClient = require('mongodb').MongoClient;
const {
  rootCertificates
} = require('tls');
const url = 'mongodb://root:root@localhost:27017';
const dbName = 'messages';
const options = {
  useUnifiedTopology: true
}
let db

/************************/
/* Connection to the db */
/************************/

MongoClient.connect(url, options, function (err, client) {
  console.log("Connected successfully to server");
  db = client.db(dbName);
});

/********************************************/
/* message for the start of the discord bot */
/********************************************/

client.on('ready', () => {
  console.log(`${client.user.tag} is ready`);
});

/*********************/
/* message collector */
/*********************/

client.on('message', message => {
  let content = message.content;
  let author = message.author.username;
  let id_msg = message.id;

  let messageData = new messageModel({
    content: content,
    author: author,
    id_msg: id_msg
  })

  mongoose.set('useUnifiedTopology', true);
  mongoose.set('useNewUrlParser', true);
  mongoose.connect("mongodb://mongoadmin:mongoadmin@127.0.0.1:27017/messages?authSource=admin")
    .then(() => {
      messageData.save().then(result => {
        mongoose.connection.close()
      })
    })
    .catch(err => console.log(err));
  generator.generateHtml()
})

/*********************/
/* website launcher */
/********************/

app.get('/', function (req, res) {
  let response 
  fs.readFile("./webpage/index.html", "utf8", function (err, donnees) {
    response = donnees
    if (err) throw err;
    res.status(200)
    res.type('html')
    res.end(response)
  })
});

app.get('/message.html', function (req, res) {
  let response 
  fs.readFile("./webpage/message.html", "utf8", function (err, donnees) {
    response = donnees
    if (err) throw err;
    res.status(200)
    res.type('html')
    res.end(response)
  })
});

app.get('/messages.js', function (req, res) {
  fs.readFile("./webpage/messages.js", "utf8", function (err, donnees) {
    response = donnees
    if (err) throw err;
    res.status(200)
    res.type('script')
    res.end(response)
  })
})

app.get('/style.css', function (req, res) {
  fs.readFile("./webpage/style.css", "utf8", function (err, donnees) {
    response = donnees
    if (err) throw err;
    res.status(200)
    res.type('text/css')
    res.end(response)
  })
})

app.get('/index.css', function (req, res) {
  fs.readFile("./webpage/index.css", "utf8", function (err, donnees) {
    response = donnees
    if (err) throw err;
    res.status(200)
    res.type('text/css')
    res.end(response)
  })
})

app.listen(3000, function () {
  console.log('app listening on port 3000!');
});

/*********************/
/* login of the bot  */
/*********************/


client.login('ODM5OTE4NjMyNDE4NjcyNjUw.YJQpLg.Bp6KXEFBdnc75pekXfoTrksCthU')