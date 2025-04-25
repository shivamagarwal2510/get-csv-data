require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const CsvData = require("./models/csvData");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    // List all collections to verify
    mongoose.connection.db.listCollections().toArray((err, collections) => {
      if (err) {
        console.error("Error listing collections:", err);
      } else {
        console.log(
          "Available collections:",
          collections.map((c) => c.name)
        );
      }
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// GET endpoint to retrieve all CSV data
app.get("/api/csv-data", async (req, res) => {
  try {
    console.log("Attempting to fetch data from collection: csv_data");

    // Check if we can access the collection directly
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log(
      "Available collections:",
      collections.map((c) => c.name)
    );

    const data = await CsvData.find({});
    console.log(`Found ${data.length} documents`);

    // If no data found, try accessing the collection directly
    if (data.length === 0) {
      console.log("No data found using model, trying direct collection access");
      const db = mongoose.connection.db;
      const directData = await db
        .collection("csv_data")
        .find({})
        .limit(5)
        .toArray();
      console.log(`Direct query found ${directData.length} documents`);

      if (directData.length > 0) {
        return res.json({
          success: true,
          message: "Data found using direct collection access",
          count: directData.length,
          data: directData,
        });
      }

      // Check for the collection csv_data_1 based on the screenshot
      const alternativeData = await db
        .collection("csv_data_1")
        .find({})
        .limit(5)
        .toArray();
      console.log(
        `Alternative query (csv_data_1) found ${alternativeData.length} documents`
      );

      if (alternativeData.length > 0) {
        return res.json({
          success: true,
          message: "Data found in csv_data_1 collection instead",
          count: alternativeData.length,
          data: alternativeData,
        });
      }
    }

    res.json({ success: true, count: data.length, data });
  } catch (error) {
    console.error("Error fetching CSV data:", error);
    res
      .status(500)
      .json({ success: false, error: "Server error", message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
