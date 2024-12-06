const Lead = require("../models/Lead");

// this will create new lead
const createLead = async (req, res, next) => {
  const leadData = req.body;
  try {
    const lead = new Lead({ ...leadData, createdBy: req.user.userId });
    const savedLead = await lead.save();
    res
      .status(201)
      .json({ message: "new lead created success", lead: savedLead });
  } catch (error) {
    next(error);
  }
};

// this will get all leads
const getLeads = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "nextFollowUpDate",
      order = "asc",
      status,
      assignedTo,
      leadSource,
      search,
      leadName,
    } = req.query;

    // Filter object
    const filter = {};
    if (status) filter.status = status;
    if (assignedTo) filter.assignedTo = assignedTo;
    if (leadSource) filter.leadSource = leadSource;
    if (leadName) filter.leadName = leadName;

    // Search functionality
    if (search) {
      filter.$or = [
        { leadName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { contactNumber: { $regex: search, $options: "i" } },
      ];
    }

    // Sorting object
    const sort = {};
    sort[sortBy] = order === "desc" ? -1 : 1;

    // Pagination
    const skip = (page - 1) * limit;

    // Fetch leads with applied filters, sorting, and pagination
    let leads;
    let totalLeads;

    // if current user is admin show the all leads

console.log("filters" , filter);
console.log("sort" , sort);
console.log("skip" , skip);


    if (req.user.role === "admin") {
      leads = await Lead.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(Number(limit));

      // Total count for pagination
      totalLeads = await Lead.countDocuments(filter);
    }

    // else show only self created leads
    else {
      leads = await Lead.find({ ...filter, createdBy: req.user.userId })
        .sort(sort)
        .skip(skip)
        .limit(Number(limit));
      totalLeads = await Lead.countDocuments({
        ...filter,
        createdBy: req.user.userId,
      });
    }

    res.json({
      totalLeads,
      totalPages: Math.ceil(totalLeads / limit),
      currentPage: Number(page),
      leads,
    });
  } catch (error) {
    next(error);
  }
};

// edid lead
const editLead = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.leadId);
    if (!lead)
      return res
        .status(404)
        .json({ message: "invalid lead id,Lead not found" });
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.leadId,
      req.body,
      { new: true }
    );
    res.json({ message: "lead is update success", updatedLead });
  } catch (error) {
    next(error);
  }
};

// delete lead
const deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.leadId);
    if (!lead)
      return res
        .status(404)
        .json({ message: "invalid lead id,Lead not found" });
       await Lead.findByIdAndDelete(
      req.params.leadId,
    );
    res.json({ message: "lead is deleted success"});
  } catch (error) {
    next(error);
  }
};

module.exports = { createLead, getLeads, editLead, deleteLead };
