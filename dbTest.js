var db = require("./models");

// db.link.create({url:"https://www.yahoo.com", hash: "1234"}).then(function(data) {
// 	console.log("data: " + data);
// });

// db.link.create({
// 	url: "http://poop.com",
// 	hash: "1234"
// }).then(function(link) {
// 	console.log("create object: ", link.get());
// });

db.link.findById(18).then(function(link) {
	console.log("******************findById: ", link.url);
});

// db.link.findOrCreate({
// 	where: {hash:"3453"}
// }).spread(function(link, created) {
// 	console.log("findOrCreate: ", link.get());
// });

// db.link.findAll().then(function(links) {
// 	console.log("***********All links: ", links);
// });

// db.link.find({where: {hash: "3453"}}).then(function(link) {
// 	link.url = "http://linkchanged.com";
// 	link.save().then(function() {});
// });

// db.link.find({where: {hash: "3453"}}).then(function(link) {
// 	link.updateAttributes({
// 		url: "http://foopizza.com"
// 	}).then(function() {});
// });

// db.link.find({where: {hash: "1234"}}).then(function(link) {
// 	link.destroy().then(function() {});
// });