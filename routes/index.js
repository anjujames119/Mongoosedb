var express = require('express');
var router = express.Router();
var Contacts = require('../models/contact.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Contacts' });
});


router.get('/saveData', function(req, res, next) {
	  Contacts.saveNew(req.query)
  	.then (function(){
  res.redirect('/getAllContacts');
	})
	.catch(console.log('ERR : in resolving the promise'))


});


router.get('/getAllContacts', function(req, res, next) {
   	Contacts.getAll()
	.then (function(retVal){
  res.render('contacts', {data: retVal});
})
	.catch(console.log('ERR :: in resolving the promise'))
});


router.get('/delete',function(req,res,next){
    Contacts.deleteContact(req.query)
   .then(function(){
  	res.redirect('/getAllContacts');
  })	
  .catch(console.log('ERR:deleting data'));
});


module.exports = router;
