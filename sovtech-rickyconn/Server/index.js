var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
const { ApolloServer, gql } = require('apollo-server');
 

var schema = buildSchema(`
    type Person {
    name: String
    height: Float
    mass: Float
    gender: String
    homeworld: String
    }

    type Query {
        getPerson(personNum: Int!): [Person]
    }
`);
 
var root = {
    getPerson: ({personNum}) => {
        if(personNum <= 1 && personNum >= 0)
        {
            return [people[personNum]];
        }else
        {
            return people
        }
    }
};

const people = [
    {
      name: 'Ricky',
      height: 123,
      mass: 35,
      gender: 'Male',
      homeworld: 'Earth',
    },
    {
        name: 'Elon',
        height: 200,
        mass: 180,
        gender: 'N/A',
        homeworld: 'Mars',
    },
  ];
 
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');