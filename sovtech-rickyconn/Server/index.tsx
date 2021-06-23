const { RESTDataSource } = require('apollo-datasource-rest');

class StarWarsAPI extends RESTDataSource {
    constructor() {
      super();
      this.baseURL = 'https://swapi.dev/api/';
    }
  
    async getAllPeople() {
      const results = await this.get('people');
      return [results.results];
    }
  
    async getPage(page) {
      const result = await this.get('people', {
        page
      });
      return result.results;
    }
  
    async findPerson(search) {
      const result = await this.get('people', {
        search
      });
      return result.results;
    }
  };

const starWarsAPI = new StarWarsAPI()
const { ApolloServer, gql } = require('apollo-server');
const typeDefs = gql`
  type Person {
    name: String
    height: String
    mass: String
    gender: String
    homeworld: String
  }
  
  type Query {
    people(pageNum: Int!): [Person]
    search(name: String!): [Person]
  }
`;

const resolvers = {
    Query: {
      people: async (root, { pageNum }, { dataSources }) => {
          const people = await dataSources.starWarsAPI.getPage(pageNum);
          return people
      },
      search: async (root, { name }, { dataSources }) => {
        const people = await dataSources.starWarsAPI.findPerson(name);
        return people
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