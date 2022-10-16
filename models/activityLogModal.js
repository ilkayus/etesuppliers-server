const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema({
  activity: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const ActivityLog = mongoose.model("activityLog", activityLogSchema);
module.exports = ActivityLog;
