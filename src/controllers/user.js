const { User } = require("../models/User");

//add new user
exports.addUser = async (req, res) => {
    try {
      const user = new User(req.body);
      
      const token = await user.generateAuthToken();
      
      const savedUser = await user.save();
      
  
      res.status(201).send({ savedUser, token });
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).send({ message: "User already exists" });
      } else {
        res.status(500).send({ message: "Could not connect" });
      }
    }
};

//show users profile
exports.getMyProfile = async (req, res) => {
    res.status(200).send(req.user);
};

//login user
exports.login = async (req, res) => {
    try {
      const user = await User.findByCredentials(req.body.email, req.body.password);
      const token = user.generateAuthToken();
      res.status(200).send({ user, token, message: "Succesfully logged in"  });
    } catch (error) {
      res.status(400).send({ message: "Unable to Login" });
    }
};

//logout user
exports.logout = async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter((tokenObj) => {
        return tokenObj.token !== req.token;
      });
      await req.user.save();
      res.status(200).send({ message: "Successfully logged out" });
    } catch (error) {
      res.status(500).send({ message: "Unable to log you out" });
    }
};

//update users details (personal detail only)
exports.updateUserById = async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
      console.log(user);
  
      res.status(200).send(user);
    } catch (error) {
      res.status(404).send({ message: "User not found" });
    }
};

//delete user
exports.deleteUser = async (req, res) => {
    try {
      await req.user.remove();
      res.status(200).send(user);
    } catch (error) {
      res.status(404).send({ message: "User not found" });
    }
};


  