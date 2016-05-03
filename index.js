var express = require("express");
var app = express();
var ejsLayouts = require("express-ejs-layouts");
var bodyParser = require("body-parser");
var db = require("./models");
var Hashids = require("hashids"),
hashids = new Hashids("super secret hash");
var count = 0;

app.use(bodyParser.urlencoded({extended:false}));
app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(express.static(__dirname + "/static"));

app.get("/", function(req, res) {
	res.render("index");
});

app.get("/links", function(req, res) {
	db.link.findAll({order: "count DESC"}).then(function(rows) {
		res.render("links", {rows});
	});
});

app.post("/links", function(req, res) {
	var link = req.body.link;
	db.link.findOrCreate({
		where: {url: link}
	}).spread(function(row) {
		var hashName = hashids.encode(row.id);
		row.updateAttributes({
			hash: hashName,
			count: 0
		});
		res.redirect("/links/" + row.id);
	});
	
});

app.get("/links/:id",function(req, res) {
	var id = req.params.id;
	db.link.findById(id).then(function(row) {
		res.render("show", {row});
	})
});

app.get("/:hash",function(req, res) {
	var hash = req.params.hash;
	db.link.find({where: {hash: hash}}).then(function(row) {
		row.updateAttributes({count: count++});
		res.redirect(row.url);		
	});
});


app.listen(3000, function() {
	console.log("Listening to port 3000");
});