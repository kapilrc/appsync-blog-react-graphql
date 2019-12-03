const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLSchema
} = graphql;

// Scalar types
/*
  String
  Int
  Float
  Boolean
  ID
*/

const PersonType = new GraphQLObjectType({
  name: "Person",
  description: "Represents a Person Type",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    isMarried: { type: new GraphQLNonNull(GraphQLBoolean) },
    gpa: { type: new GraphQLNonNull(GraphQLFloat) } //great point average
  })
});

// RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Description",
  fields: {
    person: {
      type: PersonType,
      resolve(parent, args) {
        let personObj = {
          name: "James",
          age: 35,
          isMarried: true,
          gpa: 4.2
        };
        return personObj;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
