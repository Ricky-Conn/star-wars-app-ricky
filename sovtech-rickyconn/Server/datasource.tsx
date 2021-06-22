const { RESTDataSource } = require('apollo-datasource-rest');

class StarWarsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://swapi.dev/api/';
  }

  async getAllPeople() {
    return this.get('people');
  }

  async getAPage(pageNum) {
    const result = await this.get('page', {
      pageNum
    });

    return result[0];
  }
};