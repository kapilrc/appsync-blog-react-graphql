const express = require("express");
const graphqlHTTP = require("express-graphql");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const schema = require("./schema/schema");
const testschema = require("./schema/types_schema");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());

mongoose.connect(process.env.CONNECTIONSTRING);
mongoose.connection.once("open", () => {
  console.log("Yeah!, connected to DB");
});

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`started listening on port ${PORT}`);
});
