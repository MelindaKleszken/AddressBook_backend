const {Router} = require('express');
const { getMyProfile, addUser, updateUserById, deleteUser, login, logout} = require("../controllers/user");
const {hashPassword, auth} = require('../middleware');
const userRouter = Router();

//route for signup
userRouter.route("/users").post(hashPassword, addUser);

//route for login
userRouter.route("/users/login").post(auth, login);

//route for logout
userRouter.route("/users/logout").post(auth, logout);

//route for myProfile page, updateUser, deleteUser
userRouter.route("/users/myprofile").get(auth, getMyProfile).patch(auth, hashPassword, updateUserById).delete(auth, deleteUser);

module.exports = {
    userRouter,
};