const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Person {
    name: String
    height: Float
    mass: Float
    gender: String
    homeworld: String
  }


  type Query {
    people: [Person]
  }
`;

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

  const resolvers = {
    Query: {
      people: () => people,
    },
  };