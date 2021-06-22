const { RESTDataSource } = require('apollo-datasource-rest');

class StarWarsAPI extends RESTDataSource {
    constructor() {
      super();
      this.baseURL = 'https://swapi.dev/api/';
    }
  
    async getAllPeople() {
      const results = await this.get('people');
    //   console.log(results.results)
      return [results.results];
    }
  
    async getAPage(pageNum) {
      const result = await this.get('page', {
        pageNum
      });
  
      return result[0];
    }
  };

const starWarsAPI = new StarWarsAPI()
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
    people(pageNum: Int!): [Person]
  }
`;

const resolvers = {
    Query: {
      people: async (root, { pageNum }, { dataSources }) => {
          const people = await dataSources.starWarsAPI.getAllPeople()
          console.log(pageNum)
          console.log(people[0])
          return people[0]
      }
    },
  };
  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      starWarsAPI: new StarWarsAPI()
    })
  });
  
  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
  });