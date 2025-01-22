const mongoose = require("mongoose");

mongoose.connect(
  'mongodb+srv://dbUser:dbUserPassword@cluster0.86ovs.mongodb.net/'
);

module.exports = mongoose.connection;
