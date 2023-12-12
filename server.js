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
  email: String,
  fname: String,
  lname: String,
  phoneNumber: String,
  plan: String,
  bills: Array,
  billNotifications: Number,
});

const gymUsers = mongoose.model("gymusers", gymuserSchema);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
