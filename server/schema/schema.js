const graphql = require("graphql");
const _ = require("lodash");

const userData = [
  {
    name: "James",
    id: "1",
    age: 34,
    profession: "Programming"
  },
  { name: "Harry", id: "2", age: 34, profession: "Swimming" },
  { name: "Porter", id: "3", age: 34, profession: "Running" }
];
const hobbyData = [
  {
    id: "1",
    title: "Swimming",
    description: "My fav hobby",
    userId: "2"
  },
  {
    id: "3",
    title: "Programming",
    description: "Using computer to make the world a better place!",
    userId: "1"
  }
];

const postsData = [
  { id: "1", comment: "Building a Mind", userId: "2" },
  { id: "2", comment: "GraphQL is Amazing", userId: "1" },
  { id: "3", comment: "How to change the world", userId: "2" }
];

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
} = graphql;

// create types
const UserType = new GraphQLObjectType({
  name: "User",
  description: "Documentation for user...",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    profession: { type: GraphQLString },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return _.filter(postsData, { userId: parent.id });
      }
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent, args) {
        return _.filter(hobbyData, { userId: parent.id });
      }
    }
  })
});

const HobbyType = new GraphQLObjectType({
  name: "Hobby",
  description: "Hobby description",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(userData, { id: parent.userId });
      }
    }
  })
});

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "Post description",
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(userData, { id: parent.userId });
      }
    }
  })
});

// RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Description",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // we resolve with data
        // get and return data from a data source
        return _.find(userData, { id: args.id });
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return userData;
      }
    },
    hobby: {
      type: HobbyType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(hobbyData, { id: args.id });
      }
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent, args) {
        return hobbyData;
      }
    },
    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(postsData, { id: args.id });
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return postsData;
      }
    }
  }
});

// Mutations
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLID },
        profession: { type: GraphQLString }
      },

      resolve(parent, args) {
        let user = {
          name: args.name,
          age: args.age,
          profession: args.profession
        };
        return user;
      }
    },
    createPost: {
      type: PostType,
      args: {
        id: { type: GraphQLID },
        comment: { type: GraphQLString },
        userId: { type: GraphQLID }
      },
      resolve(parent, args) {
        let post = {
          comment: args.comment,
          userId: args.userId
        };
        return post;
      }
    },
    createHobby: {
      type: PostType,
      args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        userId: { type: GraphQLID }
      },
      resolve(parent, args) {
        let hobby = {
          title: args.title,
          description: args.description,
          userId: args.userId
        };
        return hobby;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
