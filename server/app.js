const express = require("express");
const graphqlHTTP = require("express-graphql");
const dotenv = require("dotenv");

const schema = require("./schema/schema");

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema
  })
);

dotenv.config();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`started listening on port ${PORT}`);
});
