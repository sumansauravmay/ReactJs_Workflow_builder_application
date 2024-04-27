const express = require("express");
const csvParser = require("csv-parser");
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { dragdtamodel } = require("../models/dragdata.models");
const csvdata = express.Router();

csvdata.post("/upload", upload.single("csvFile"), async (req, res) => {
  try {
    if (!req.file) {
      console.log(req.body);
      return res.status(400).send("No file uploaded.");
    }
    const id = req.body.workflow_id;
    console.log(id)

    const csvFilePath = req.file.path;
    const jsonArray = [];

    fs.createReadStream(csvFilePath)
      .pipe(csvParser({header:true}))
      .on("data", (data) => jsonArray.push(data))
      .on("end", async () => {
        const dataToSave = {
          id: id,
          csvdat: jsonArray,
        };

        const newData = new dragdtamodel(dataToSave);

        await newData.save();

        res.json(dataToSave);
      });
  } catch (error) {
    console.error("Error saving data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the file." });
  }
});

module.exports = { csvdata };
