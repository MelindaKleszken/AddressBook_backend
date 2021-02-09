const { Record } = require("../models/Records");

exports.getAllRecords = async (req, res) => {
  try {
    const allRecords = await Record.find({});
    res.status(200).send(allRecords);
    
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.addRecord = async (req, res) => {
  try {
    const record = new Record(req.body);
    const returnedValue = await record.save();
    res.status(201).send(returnedValue);
  } catch (error) {
    res.status(400).send(error);
    console.log("Test")
  }
};

exports.updateRecord = async (req, res) => {
  try {
    const record = await Record.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log(record);
    res.status(200).send("successfully updated");
  } catch (error) {
    res.status(404).send({ message: "Record not found" });
  }
};

exports.deleteRecord = async (req, res) => {
  try {
    const record = await Record.findByIdAndDelete(req.params.id);
    res.status(200).send(record);
  } catch (error) {
    res.status(404).send({ message: "Record not found" });
  }
};
