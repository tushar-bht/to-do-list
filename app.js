const express = require("express");
const app = express();
const date = require(__dirname + "/date");
var Date = date.data();
var mongoose = require("mongoose");
var _ = require("lodash");
mongoose.connect(
  "mongodb+srv://admin-tushar:tushar123@cluster0-luq90.mongodb.net/myproject",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

console.log(Date);

//server work.........................
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.listen(3000, function () {
  console.log("server started at port 3000");
});
var items = [];
var item;
var witems = [];
var work;

//database work...............
const schema = mongoose.Schema({
  taskNo: { type: Number },
  task: { type: String },
});
const taskList = mongoose.model("taskList", schema);
const task1 = new taskList({
  taskNo: 1,
  task: "wake up",
});
//task1.save();

items.forEach(function (info) {
  const newTask = new taskList({
    taskNo: 2,
    task: "hey tushar",
  });
});
var donut = {
  taskNo: 2,
  task: "tushar",
};
//data for routing parameters
const schema2 = mongoose.Schema({
  name: String,
  tasks: [String],
});
const list2 = mongoose.model("list2", schema2);

//routing of the servers..............
app.get("/", function (req, res) {
  taskList.find(function (err, data) {
    if (err) console.log(err);
    else {
      res.render("index", { title: Date, tasks: data });
    }
  });
});
app.post("/", function (req, res) {
  item = req.body.task;
  console.log(item);
  const newTask = new taskList({
    taskNo: 2,
    task: item,
  });
  newTask.save();

  res.redirect("/");
});
app.get("/about", function (req, res) {
  res.render("about");
});
app.get("/work", function (req, res) {
  var work = "work";
  res.render("index", { title: work, tasks: witems });
});
app.post("/work", function (req, res) {
  work = req.body.task;
  witems.push(work);
  res.redirect("/work");
});
app.post("/delete", function (req, res) {
  var remove = req.body.del;
  console.log(remove);
  taskList.deleteOne({ _id: remove }, function (err) {
    if (err) console.log(err);
  });

  res.redirect("/");
});
var arrA = ["hey", "tushr", "trying"];
app.get("/custom/:newRoute", function (req, res) {
  route = _.capitalize(req.params.newRoute);

  list2.findOne({ name: route }, function (err, data) {
    if (!data) {
      console.log("doesnt exits");
      const entry = new list2({
        name: route,
      });
      entry.save();
      console.log("entry created successfully");
      res.redirect("/custom/" + route);
    } else if (data) {
      console.log("exist");
      res.render("newRoute.ejs", { title: route, task: data.tasks });
    }
  });
});
///post route.................
app.post("/custom/:newRoute", function (req, res) {
  const data = req.body.data;

  var store = [];
  const name = req.params.newRoute;

  //console.log(data);
  list2.findOne({ name: name }, function (err, op) {
    if (err) console.log(err);
    else {
      console.log(op.tasks);
      op.tasks.push(data);
      op.save(); //i forgot to save the list...........
      //op.tasks = op.tasks.push(data);
      /*  op.tasks.forEach((element) => {
        console.log(element);
        store.push(element);
      });*/
    }
    store.push(data);

    console.log("final value  " + store);
    /*list2.updateOne({ name: name }, { $set: { tasks: store } }, function (
      err,
      success
    ) {
      if (err) console.log(err);
      else {
        console.log("successfull operation");
      }
    });*/
  });

  res.redirect("/custom/" + name);
});
app.post("/custom/:name/delete", function (req, res) {
  const deleteElement = req.body.del;
  const name = req.params.name;
  console.log(deleteElement, name);
  list2.findOne({ name: name }, function (err, data) {
    if (err) console.timeLog(err);
    else {
      console.log(data.tasks);
      var modifiedArray = data.tasks.remove(deleteElement);
      list2.findOneAndUpdate(
        { name: name },
        { $set: { tasks: modifiedArray } },
        function (err, rply) {
          if (err) console.log(err);
          else console.log(modifiedArray);
        }
      );
    }
  });
  res.redirect("/custom/" + name);
});
