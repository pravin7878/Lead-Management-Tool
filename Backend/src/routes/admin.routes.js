const express = require("express");
const chackAuth = require("../middelware/chackAuth");
const authorizeRole = require("../middelware/checkRoleAccess");
const { roles } = require("../uttils/constant");
const { getAllUsers, authenticateAdmin } = require("../controlers/admin.controler");
const adminRotuer = express.Router()


// login admin
adminRotuer.post("/login" , authenticateAdmin)


// get all user by admin
adminRotuer.get("/users-data" ,chackAuth , authorizeRole(roles.admin),getAllUsers )

module.exports = adminRotuer