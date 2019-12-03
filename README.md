# appsync-blog-react-graphql

A blog App using various technology stacks like AWS AppSync, React, GraphQL & MongoDB

##set up and run server

```
$ cd server/
npm install
node app or (nodemon app if nodemon is installed globally)
```

## sample GraphQL queries as below

go to http://localhost:3000/graphql

```
mutation createUser {
  createUser(name: "Tom", age:55, profession: "Acting"){
    id
    name
  }
}

mutation updateUser {
	updateUser(id: "5de630672e0eb225baf829dd", name: "Tom", age: 43, profession: "Swimming"){
    name
    profession
  }
}

mutation removeUser{
  removeUser(id: "5de64a677b89c21dbbf656f5"){
    id
    name
  }
}

mutation createPost {
  createPost(comment: "GRANDStack is Awesome",
    userId: "5de630672e0eb225baf829dd"){
    id
    comment
  }
}

mutation updatePost {
	updatePost(id: "5de63df90d11d52c70c5c568", comment: "GRANDStack is really Awesome!!"){
    comment
  }
}

mutation removePost{
  removePost(id: "5de64e2f7b89c21dbbf656f6"){
    id
    comment
  }
}

mutation createHobby {
  createHobby(title: "Running",
    description: "Runnning can be helpful for health",
    userId: "5de62ffc6b217d250d834a4f"){
    id
    title
    description
  }
}

mutation updateHobby {
	updateHobby(id: "5de63e910d11d52c70c5c569",
    title: "Daily Running",
    description: "Runnning can be helpful for health, really!!"){
    title
    description
    user{
      name
      posts{
        comment
      }
      hobbies{
        title
        description
      }
    }
  }
}
mutation removeHobby{
  removeHobby(id: "5de64e927b89c21dbbf656f7"){
    title
    description
  }
}


query getAllUsers{
  users{
    id
    name
    profession
    posts{
      comment
      user{
        id
        name
      }
    }
    hobbies{
      title
      description
      user{
        id
        name
      }
    }
  }
}

query findUserById{
  user(id:"5de62fb76b217d250d834a4e"){
    id
    name
    profession
    posts{
      comment
      user{
        id
        name
      }
    }
    hobbies{
      title
      description
      user{
        id
        name
      }
    }
  }
}

query getAllPosts{
  posts{
    id
    comment
  }
}

query getPostById{
  post(id:"5de632d6711d2d2634c0cd2a"){
    id
    comment
    user{
      id
      name
      posts{
        comment
      }
    }
  }
}

query getAllHobbiess{
  hobbies{
    id
    title
    description
  }
}

query findHobbyById{
  hobby(id: "5de631ed711d2d2634c0cd29"){
    id
    title
    description
  }
}

```
