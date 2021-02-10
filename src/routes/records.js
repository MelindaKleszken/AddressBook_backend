const { Router } = require("express");
const recordRouter = Router();
const { getAllRecords, addRecord, updateRecord, deleteRecord } = require("../controllers/records");
const { auth } = require('../middleware/')

// Get all records
recordRouter.get("/records/", getAllRecords);

// Add a record
recordRouter.post("/records", addRecord);

// Update a record
recordRouter.patch("/records/:id", auth, updateRecord);

// Delete a record
recordRouter.delete("/records/:id", auth, deleteRecord);

module.exports = {
  recordRouter,
};

