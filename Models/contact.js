var express = require('express');
//var JSONData = require('./heros.json');
//var fs = require("fs");
var mongoose = require('mongoose');
    
let Contact= {}

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const contactDB = new Schema({
  Contact: ObjectId,
  name: String,
  phoneNo: String
  
});

const contactModel = mongoose.model('contact',contactDB);

Contact.getAll = function(){
	return new Promise (function (resolve, reject){
	//create the connection to database
	const connection = mongoose.connect('mongodb://127.0.0.1:27017/myDB');
	console.log(connection);
	
	//querying the database for results
	contactModel.find({},function(err,contactlist){
		if(err){
			console.log(err);
			console.log('ERR :: fetching data from database.');
			reject();
		}
		else{
			//console.log(result);
			//console.log(fields);
			resolve(contactlist);
		}
	    });
    });

}

Contact.saveNew = function(newData){
   // create the connection to database
   return new Promise(function(resolve,reject){
  const connection = mongoose.connect('mongodb://127.0.0.1:27017/myDB');
  console.log(connection);
	
	var saveContact =contactModel({
		name:`${newData.name}`,
		phoneNo: `${newData.phoneNo}`
	});

	//console.log(query);
	saveContact.save({},function(err,results,fields){

		if(err){
			console.log(err);
			console.log('ERR: fetching data from database');
			reject();
		}
		else{
			resolve();
		}
	});

   });
}

Contact.deleteContact = function(Contact){
	return new Promise(function ( resolve, reject){
		const connection = mongoose.connect('mongodb://127.0.0.1:27017/myDB');
		contactModel.findOneAndRemove({name:`${Contact.name}`},function(err){
			if(err){
				console.log('ERR:Deleting data');
			}
			else{
				resolve(contact);
			}
		});	
});
}

module.exports = Contact;
