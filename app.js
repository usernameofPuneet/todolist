const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();


let items = ["Buy food"];
let workItems = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/", function(req,res){

    let day = date.getDay();
    
    res.render("list", {listTitle: day,newItem: items});

});


app.post("/", function(req, res){

    let item = req.body.newItem;

    if(req.body.button === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }

    console.log(req.body);

});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work", newItem:workItems}
    );
})


app.listen(3000, function(){
    console.log("server started at port 3000");
    
})