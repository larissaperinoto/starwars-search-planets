const requestAPI = async () => {
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const { results } = await fetch(endpoint).then((response) => response.json());
  results.forEach((key) => delete key.residents);
  return results;
};

export default requestAPI;
