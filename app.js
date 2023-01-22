const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
app.set("view engine", "ejs");

var newListItem=[],workList=[];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.post("/", function(req, res) {
    if(req.body.button==="Work") {
        workList.push(req.body.task)
        res.redirect("/work");
    } else {        
        newListItem.push(req.body.task);
        res.redirect("/");
    }
})

app.get("/", function(req, res) {
    var today = new Date();
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    var day = today.toLocaleDateString("en-US", options);
    
    res.render("lists", {listTitle: day, newItem: newListItem})
})

app.get("/work", function(req, res) {
    res.render("lists", {listTitle: "Work List", newItem: workList})
})

app.post("/work", function(req, res) {
    workList.push(req.body.task);
    res.redirect("/work");
})



app.listen("3000", function() {
    
})