const express = require("express");
// here is the my controlers
const { registerNewUser, authenticateUser } = require("../controlers/user.controler");

// here is the my middelwares
const validateRegisterBody = require("../middelware/validateRegisterBody");
const chackAuth = require("../middelware/chackAuth");
const authorizeRole = require("../middelware/checkRoleAccess");
const {roles} = require("../uttils/constant");
const { getAllUsers } = require("../controlers/admin.controler");

const userRouter = express.Router()

// register a new user
userRouter.post("/register" ,validateRegisterBody, registerNewUser)

// login user after success full registertion
userRouter.post("/login" , authenticateUser)



module.exports = userRouter
