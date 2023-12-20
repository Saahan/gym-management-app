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
  notifications: Array,
  accountType: String,
});

const userdietSchema = new mongoose.Schema({
  uid: String,
  proteinAmount: String,
  breakfast: String,
  lunch: String,
  dinner: String,
  comments: String,
});

const gymUsers = mongoose.model("gymusers", gymuserSchema);
const userDiets = mongoose.model("userdiets", userdietSchema);

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
    notifications: [],
  });

  let userDietObj = new userDiets({
    uid: req.body.uid,
    breakfast: "",
    lunch: "",
    dinner: "",
    proteinAmount: "",
    comments: "",
  });

  userDataObj.save();
  userDietObj.save();
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

app.get("/api/dietdetails", (req, res) => {
  userDiets.find({ uid: req.query.uid }).then((docs) => {
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

app.put("/api/updatememberdetails", (req, res) => {
  let userData = req.body;
  //console.log(userData);
  gymUsers
    .findOneAndUpdate(
      { uid: userData.uid },
      {
        fname: userData.fname,
        lname: userData.lname,
        phoneNumber: userData.phoneNumber,
        plan: userData.plan
      }
    )
    .then((docs) => {
      res.send(docs);
    });
});

app.put("/api/updatedietdetails", (req, res) => {
  let dietData = req.body;
  //console.log(dietData);
  userDiets
    .findOneAndUpdate(
      { uid: dietData.uid },
      {
        breakfast: dietData.breakfast,
        lunch: dietData.lunch,
        dinner: dietData.dinner,
        proteinAmount: dietData.proteinAmount,
        comments: dietData.comments,
      }
    )
    .then((docs) => {
      res.send(docs);
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
