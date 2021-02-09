const { Router } = require("express");
const recordRouter = Router();
const { getAllRecords, addRecord, updateRecord, deleteRecord } = require("../controllers/posts");
const { auth } = require('../middleware/')

recordRouter.get("/records", getAllRecords);
recordRouter.record("/records/", auth, addRecord);
recordRouter.patch("/records/:id", auth, updateRecord);
recordRouter.delete("/records/:id", auth, deleteRecord);

module.exports = {
  recordRouter,
};

