const express = require("express")
const chackAuth = require("../middelware/chackAuth")
const { createLead, getLeads, editLead, deleteLead } = require("../controlers/lead.controler")
const authorizeRole = require("../middelware/checkRoleAccess")

const leadRouter = express.Router()

// after login any one can create lead
leadRouter.post("/" ,chackAuth , createLead )

// after login can get leads but based on roll if admin show all leads else self created leads
leadRouter.get("/" ,chackAuth, getLeads)

// edit lead (only admin can edit lead)
leadRouter.patch("/:leadId" , chackAuth , authorizeRole("admin") ,editLead )

// delete lead (only admin can delete lead)
leadRouter.delete("/:leadId" , chackAuth , authorizeRole("admin") ,deleteLead )

module.exports = leadRouter