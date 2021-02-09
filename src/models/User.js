const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//create the userSchema
const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      tokens: [
        {
          token: {
            type: String,
          },
        },
      ],
    },
);


//check if users email and password in DB for login
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Unable to login");
    }
  
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      throw new Error("Unable to login");
    }
  
    return user;
};

//create a token for each signedup user, valid for a week
userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id }, process.env.SECRET, { expiresIn: "1 week" });
    this.tokens.push({ token });
    return token;
};
  
//export the userModel 
const User = mongoose.model("User", userSchema);

module.exports = {
    User,
};
  

