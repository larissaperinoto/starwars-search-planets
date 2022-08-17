import React, { useEffect, useState } from 'react';
import Table from './components/Table';

function App() {
  const [planetsList, setPlanetsList] = useState([]);

  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';

  useEffect(() => {
    const getPlanets = async () => {
      const { results } = await fetch(endpoint).then((response) => response.json());
      setPlanetsList(results);
    };
    getPlanets();
  }, []);

  planetsList.forEach((key) => delete key.residents);

  return (
    <Table planetsList={ planetsList } />
  );
}

export default App;
