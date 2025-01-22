const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/vibez_db", {
//  useNewUrlParser: true,
//  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
 console.log("Mongoose connected to local MongoDB");
});
mongoose.connection.on("error", (err) => {
 console.error(`Mongoose connection error: ${err}`);
});
mongoose.connection.on("disconnected", () => {
 console.log("Mongoose disconnected");
});
module.exports = mongoose.connection;
