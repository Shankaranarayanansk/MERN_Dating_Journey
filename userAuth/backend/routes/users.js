var express = require("express");
var router = express.Router();
const {
  hashPassword,
  hashCompare,
  createToken,
  validateToken,
  createForgetToken,
  secretKey,
} = require("../common/auth.js");

const { dbUrl } = require("../common/dbConfig");

const { UserModel } = require("../schemas/userSchema");

const mongoose = require("mongoose");

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

/* GET users listing. */
router.post("/signup", async (req, res) => {
  try {
    const {userName , email, password} = req.body;
    console.log(userName, email, password);
    const existingUser = await UserModel.findOne({ email: email }).collection({
      locale: "en_US",
    });
    if (!existingUser) {
      const hashedPassword = await hashPassword(req.body.password);
      req.body.password = hashedPassword; //hasing the password if new user
      const newUser = await UserModel.create(req.body);
      res.status(201).send({ message: "User Created Successfully" });
    } else {
      res.status(409).send({ message: "User Already Exists" });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const {email, password} = req.body;
    console.log(email, password);
    const user = await UserModel.findOne({ email: req.body.email }).collection({
      locale: "en_US",
    });
    if (user) {
      const isPasswordValid = await hashCompare(
        req.body.password,
        user.password
      );
      if (isPasswordValid) {
        const token = await createToken({ email: user.email });
        res.status(200).send({ message: "Login Successful", token: token });
      } else {
        res.status(401).send({ message: "Invalid Password" });
      }
    } else {
      res.status(404).send({ message: "User doesn't exist! Please Signup" }); //user not found
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = router;
