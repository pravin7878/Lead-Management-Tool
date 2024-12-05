const Lead = require("../models/Lead"); // Assuming Lead model is in models folder

const validateLeadData = (req, res, next) => {
  const {
    leadName,
    contactNumber,
    email,
    status,
    assignedTo,
    nextFollowUpDate,
    nextFollowUpTime,
    leadSource,
    conversionDate,
    leadNotes,
    customerType,
    purchaseHistory,
  } = req.body;

  // Validate leadName
  if (
    !leadName ||
    typeof leadName !== "string" ||
    leadName.trim().length === 0
  ) {
    return res
      .status(400)
      .json({ error: "Lead name is required and must be a non-empty string." });
  }

  // Validate contactNumber
  if (
    !contactNumber ||
    typeof contactNumber !== "string" ||
    contactNumber.trim().length === 0
  ) {
    return res
      .status(400)
      .json({
        error: "Contact number is required and must be a non-empty string.",
      });
  }

  // Validate email
  if (!email || typeof email !== "string" || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: "A valid email is required." });
  }

  // Validate status
  const validStatuses = ["new", "in-progress", "converted", "closed"];
  if (status && !validStatuses.includes(status)) {
    return res
      .status(400)
      .json({
        error: `Invalid status. Allowed values are ${validStatuses.join(
          ", "
        )}.`,
      });
  }


  // Validate nextFollowUpDate (if provided, it should be a valid date)
  if (nextFollowUpDate && isNaN(Date.parse(nextFollowUpDate))) {
    return res
      .status(400)
      .json({ error: "Invalid date format for nextFollowUpDate." });
  }

  // Validate nextFollowUpTime (if provided, it should follow HH:mm format)
  if (
    nextFollowUpTime &&
    !/^([01]\d|2[0-3]):([0-5]\d)$/.test(nextFollowUpTime)
  ) {
    return res
      .status(400)
      .json({ error: "Invalid time format for nextFollowUpTime. Use HH:mm." });
  }

  // Validate leadSource (if provided, it should be one of the valid sources)
  const validLeadSources = ["online", "referral", "walk-in", "other"];
  if (leadSource && !validLeadSources.includes(leadSource)) {
    return res
      .status(400)
      .json({
        error: `Invalid lead source. Allowed values are ${validLeadSources.join(
          ", "
        )}.`,
      });
  }

  // Validate conversionDate (if provided, it should be a valid date)
  if (conversionDate && isNaN(Date.parse(conversionDate))) {
    return res
      .status(400)
      .json({ error: "Invalid date format for conversionDate." });
  }

  // Validate customerType (if provided, it should be one of the valid customer types)
  const validCustomerTypes = ["retail", "wholesale", "other"];
  if (customerType && !validCustomerTypes.includes(customerType)) {
    return res
      .status(400)
      .json({
        error: `Invalid customer type. Allowed values are ${validCustomerTypes.join(
          ", "
        )}.`,
      });
  }

  // Validate purchaseHistory (if provided, each item should have valid fields)
  if (purchaseHistory && Array.isArray(purchaseHistory)) {
    for (let i = 0; i < purchaseHistory.length; i++) {
      const purchase = purchaseHistory[i];
      if (
        !purchase.productName ||
        typeof purchase.productName !== "string" ||
        purchase.productName.trim().length === 0
      ) {
        return res
          .status(400)
          .json({
            error: `Product name is required in purchase history (item ${
              i + 1
            }).`,
          });
      }
      if (!purchase.purchaseDate || isNaN(Date.parse(purchase.purchaseDate))) {
        return res
          .status(400)
          .json({ error: `Invalid purchase date (item ${i + 1}).` });
      }
      if (purchase.amount && typeof purchase.amount !== "number") {
        return res
          .status(400)
          .json({
            error: `Amount should be a number in purchase history (item ${
              i + 1
            }).`,
          });
      }
    }
  }

  // If all validations pass, proceed to the next middleware
  next();
};

module.exports = validateLeadData;
