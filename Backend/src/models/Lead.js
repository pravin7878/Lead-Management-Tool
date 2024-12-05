const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    leadName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String },
    status: {
      type: String,
      enum: ["new", "in-progress", "converted", "closed"],
      default: "new",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default : null
    },
    nextFollowUpDate: { type: Date },
    nextFollowUpTime: { type: String }, // HH:mm format
    leadSource: {
      type: String,
      enum: ["online", "referral", "walk-in", "other"],
    },
    conversionDate: { type: Date },
    leadNotes: { type: String },
    customerType: { type: String, enum: ["retail", "wholesale", "other"] },
    purchaseHistory: [
      {
        productName: { type: String },
        purchaseDate: { type: Date },
        amount: { type: Number },
      },
    ],
    medicalNeeds: { type: String },
    createdBy : { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Lead = mongoose.model("Lead", leadSchema);

module.exports = Lead;
