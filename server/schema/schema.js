const graphql = require("graphql");
const _ = require("lodash");

// import models
const User = require("../model/User");
const Hobby = require("../model/Hobby");
const Post = require("../model/Post");

// const userData = [
//   {
//     name: "James",
//     id: "1",
//     age: 34,
//     profession: "Programming"
//   },
//   { name: "Harry", id: "2", age: 34, profession: "Swimming" },
//   { name: "Porter", id: "3", age: 34, profession: "Running" }
// ];
// const hobbyData = [
//   {
//     id: "1",
//     title: "Swimming",
//     description: "My fav hobby",
//     userId: "2"
//   },
//   {
//     id: "3",
//     title: "Programming",
//     description: "Using computer to make the world a better place!",
//     userId: "1"
//   }
// ];

// const postsData = [
//   { id: "1", comment: "Building a Mind", userId: "2" },
//   { id: "2", comment: "GraphQL is Amazing", userId: "1" },
//   { id: "3", comment: "How to change the world", userId: "2" }
// ];

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql;

// create types
const UserType = new GraphQLObjectType({
  name: "User",
  description: "Documentation for user...",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    profession: { type: GraphQLString },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        // return _.filter(postsData, { userId: parent.id });
        return Post.find({ userId: parent.id });
      }
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent, args) {
        // return _.filter(hobbyData, { userId: parent.id });
        return Hobby.find({ userId: parent.id });
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
        // return _.find(userData, { id: parent.userId });
        return User.findById(parent.userId);
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
        // return _.find(userData, { id: parent.userId });
        return User.findById(parent.userId);
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
        // return _.find(userData, { id: args.id });
        return User.findById(args.id);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        // return userData;
        return User.find({});
      }
    },
    hobby: {
      type: HobbyType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(hobbyData, { id: args.id });
        return Hobby.findById(args.id);
      }
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent, args) {
        // return hobbyData;
        return Hobby.find({});
      }
    },
    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(postsData, { id: args.id });
        return Post.findById(args.id);
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        // return postsData;
        return Post.find({});
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
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLID) },
        profession: { type: GraphQLString }
      },

      resolve(parent, args) {
        let user = new User({
          name: args.name,
          age: args.age,
          profession: args.profession
        });
        // Save to our db
        user.save();
        return user;
      }
    },
    // update user
    updateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        age: { type: GraphQLID },
        profession: { type: GraphQLString }
      },
      resolve(parent, args) {
        return User.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              age: args.age,
              profession: args.profession
            }
          },
          { new: true } // send back the updated objectType
        );
      }
    },
    // Delet User
    removeUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let removedUser = User.findByIdAndRemove(args.id).exec();

        if (!removedUser) {
          console.log("cannot remove");
          throw new "Error occurred while deleting this user!"();
        } else {
          return removedUser;
        }
      }
    },
    // create a new post
    createPost: {
      type: PostType,
      args: {
        id: { type: GraphQLID },
        comment: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let post = new Post({
          comment: args.comment,
          userId: args.userId
        });
        post.save();
        return post;
      }
    },
    // Update post
    updatePost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        comment: { type: GraphQLString }
        // userId: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Post.findByIdAndUpdate(
          args.id,
          {
            $set: {
              comment: args.comment
            }
          },
          { new: true }
        );
      }
    },
    // remove Post
    removePost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let removedPost = Post.findByIdAndRemove(args.id).exec();

        if (!removedPost) {
          console.log("cannot remove");
          throw new "Error occurred while deleting this post!"();
        } else {
          return removedPost;
        }
      }
    },
    createHobby: {
      type: HobbyType,
      args: {
        id: { type: GraphQLID },
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let hobby = new Hobby({
          title: args.title,
          description: args.description,
          userId: args.userId
        });
        hobby.save();
        return hobby;
      }
    },
    // update Hobby
    updateHobby: {
      type: HobbyType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        description: { type: GraphQLString }
      },
      resolve(parent, args) {
        return Hobby.findByIdAndUpdate(
          args.id,
          {
            $set: {
              title: args.title,
              description: args.description
            }
          },
          { new: true }
        );
      }
    },
    // remove Hobby
    removeHobby: {
      type: HobbyType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let removedHobby = Hobby.findByIdAndRemove(args.id).exec();

        if (!removedHobby) {
          console.log("cannot remove");
          throw new "Error occurred while deleting this hobby!"();
        } else {
          return removedHobby;
        }
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
