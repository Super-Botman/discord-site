/*******************************************/
/*     this app are created by Botman      */ 
/* discord : My name is Super Botman#6621  */
/* github : Super-Botman                   */
/*******************************************/

const express = require('express');
const Discord = require('discord.js');
const fs = require('fs');
const mongoose = require('mongoose');
const mongodb = require('mongodb');

/**************************/
/* Variables for the code */ 
/**************************/

const Schema = mongoose.Schema;
const app = express();
const client = new Discord.Client();
const messageSchema = new Schema({
  content: String,
  author: String,
  id_msg: Number
});
const messageModel = mongoose.model('message', messageSchema)
const MongoClient = require('mongodb').MongoClient;
const { rootCertificates } = require('tls');
const url = 'mongodb://root:root@localhost:27017';
const dbName = 'messages';
const options = { useUnifiedTopology: true }
let db

/************************/
/* Connection to the db */ 
/************************/

MongoClient.connect(url ,options,function (err, client) {
  console.log("Connected successfully to server");
  db = client.db(dbName);
});

/****************************/
/* start of the discord bot */ 
/****************************/

client.on('ready', () => {
  console.log(`${client.user.tag} est lancer il est partit écumer les océans de discord!`);
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
      console.log("connected to DB.")
      messageData.save().then(result => {
        console.log('Message ajouté avec succès !');
        mongoose.connection.close()
      })
    })
    .catch(err => console.log(err));
})

/*********************/
/* website launcher */ 
/********************/

app.get('/', function (req, res) {
  db.collection('messages').find({}).toArray(function (err, docs) {
    if (err) {
      console.log(err)
      throw err
    }
    res.status(200).json(docs)
  })
});

app.listen(3000, function () {
  console.log('app listening on port 3000!');
});

/*********************/
/* login of the bot  */ 
/*********************/

client.login('ODM5OTE4NjMyNDE4NjcyNjUw.YJQpLg.VTAdPVQ3tt8oV3B4vMwW1ud8v0A')