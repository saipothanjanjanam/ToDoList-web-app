// import express
express = require("express");
// import body parser
bodyParser = require("body-parser");
// import ejs -> javascript template engine
ejs = require("ejs");
// import dateM -> external date module->
date = require(__dirname + "/" + "dateM");

// Create Web App
app = express();

// use static files
app.use(express.static("public"));

// use ejs in our app as template engine
app.set("view engine", "ejs");

// use bodyParser in our Web App
app.use(bodyParser.urlencoded({extended: true}));


// Global Variables
let workItems = ["Work", "Enjoy"];
let casualItems = ["Play", "Learn"];
let pressedBtn;

// Home Route
app.get("/", function (req, res) {
  const dateStrArr = date().split(",");

  res.render("home", {kindOfDay: dateStrArr});
});

app.post("/", function (req, res) {
  pressedBtn = req.body.btn;
  if (pressedBtn == "Clear") {
    workItems = [];
    casualItems = [];
    res.redirect("/");
  } else {
    res.redirect("/todo");
  }
});

// List/ToDo Route
app.get("/todo", function (req, res) {
  let items;
  if (pressedBtn === "Work") {
    items = workItems;
  } else {
    items = casualItems;
  }

  res.render("list", {listName : pressedBtn, listItems: items});
});

app.post("/todo", function (req, res) {
    let item = req.body.newItem;
    pressedBtn = req.body.listBtn;

    if (pressedBtn === "Casual") {
      casualItems.push(item);
    } else {
      workItems.push(item);
    }

    res.redirect("/todo");
});


// Start server on port 3000
app.listen(3000, function() {
  console.log("Server has started on port 3000");
})
