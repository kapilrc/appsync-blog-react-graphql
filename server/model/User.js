const mongoose = require("mongoose");
const MSchema = mongoose.Schema;

// UserType from GQL schema
// id: { type: GraphQLID },
// name: { type: GraphQLString },
// age: { type: GraphQLInt },
// profession: { type: GraphQLString }

const userSchema = new MSchema({
  name: String,
  age: Number,
  profession: String
});

module.exports = mongoose.model("User", userSchema);
