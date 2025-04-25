const mongoose = require("mongoose");

// Flexible schema that can accommodate any CSV data structure
const csvDataSchema = new mongoose.Schema(
  {
    // Using a mixed schema type to allow any structure
    // This is important because CSV files can have various columns/structures
    _id: mongoose.Schema.Types.Mixed,
    DocumentNo: mongoose.Schema.Types.Mixed,
    "Entry Date": mongoose.Schema.Types.Mixed,
    "User name": mongoose.Schema.Types.Mixed,
    "Customer ID-Name": mongoose.Schema.Types.Mixed,
    "Key Account Number-Name": mongoose.Schema.Types.Mixed,
    "Amount In AED": mongoose.Schema.Types.Mixed,
    Amount: mongoose.Schema.Types.Mixed,
    Analysis: mongoose.Schema.Types.Mixed,
  },
  { strict: false, collection: "csv_data_1" }
);

module.exports = mongoose.model("CsvData", csvDataSchema);
