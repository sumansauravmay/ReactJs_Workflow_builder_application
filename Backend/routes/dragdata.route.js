const express = require("express");
const csv = require("csv-parser");
const { dragdtamodel } = require("../models/dragdata.models");
const csvdata = express.Router();

csvdata.post("/upload", async (req, res) => {
  //   try {
  //     const { workflow_id, email, name } = req.body;
  //   } catch (err) {
  //     console.log(err);
  //   }

  const csvFilePath = "example.csv"; // Provide the path to your CSV file

  // Call the function to convert CSV to JSON
  convertCSVtoJSON(csvFilePath, (error, jsonArray) => {
    if (error) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(jsonArray); // Return the JSON data
    }
  });
});

function convertCSVtoJSON(csvFilePath, callback) {
  const jsonArray = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (row) => {
      jsonArray.push(row);
    })
    .on("end", () => {
      callback(null, jsonArray);
    })
    .on("error", (error) => {
      callback(error, null);
    });
}

// app.post('/upload', upload.single('csvFile'), (req, res) => {
//     if (!req.file) {
//       return res.status(400).send('No file uploaded.');
//     }

//     // At this point, you can access the uploaded file via req.file
//     const filePath = req.file.path;
//     console.log('Uploaded file path:', filePath);

//     // Perform further processing here, such as reading the file, parsing CSV data, etc.

//     res.send('File uploaded successfully.');
//   });

//   app.listen(3000, () => {
//     console.log('Server is running on port 3000');
//   });

module.exports = { csvdata };
