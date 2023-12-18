const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors()); //enable Access-Control-Origin from all sources using cors package

const port = 5000;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://admin-saahan:admin@cluster0.worg8xy.mongodb.net/gymusersDB"
  );
}

const gymuserSchema = new mongoose.Schema({
  uid: String,
  email: String,
  fname: String,
  lname: String,
  phoneNumber: String,
  plan: String,
  bills: Array,
  billNotifications: Number,
  accountType: String,
});

const gymUsers = mongoose.model("gymusers", gymuserSchema);

app.post("/api/signup", (req, res) => {
  let userDataObj = new gymUsers({
    uid: req.body.uid,
    email: req.body.email.toLowerCase(),
    fname: req.body.fname,
    lname: req.body.lname,
    phoneNumber: req.body.phoneNumber,
    accountType: req.body.accountType,
    plan: "",
    bills: [],
    billNotifications: 0,
  });

  userDataObj.save();
});

app.get("/api/userdetails", (req, res) => {
  let user = req.query.user;
  gymUsers.find({ uid: user }).then((docs) => {
    res.send(docs);
  });
});

app.get("/api/memberdetails", (req, res) => {
  gymUsers.find({ accountType: "member" }).then((docs) => {
    res.send(docs);
  });
});

app.get("/api/userlist", (req, res) => {
  gymUsers.find({ accountType: "user" }).then((docs) => {
    res.send(docs);
  });
});

app.put("/api/allotmembership", (req, res) => {
  let userID = req.body.uid;
  gymUsers
    .findOneAndUpdate({ uid: userID }, { accountType: "member" })
    .then((docs) => {
      res.send(docs);
    });
});

app.put("/api/cancelmembership", (req, res) => {
  let userID = req.body.uid;
  gymUsers
    .findOneAndUpdate({ uid: userID }, { accountType: "user" })
    .then((docs) => {
      res.send(docs);
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
