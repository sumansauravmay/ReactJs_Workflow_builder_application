const mongoose = require("mongoose");

const modelSchema = mongoose.Schema({
  workflow_id: String,
  email: String,
  name: String,
});

dragdtamodel = mongoose.model("data", modelSchema);
module.exports = { dragdtamodel };
