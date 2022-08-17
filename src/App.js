import React, { useEffect, useState, useContext } from 'react';
import Search from './components/Search';
import Table from './components/Table';
import MyContext from './context/MyContext';

function App() {
  const [planetsList, setPlanetsList] = useState([]);
  const { filter: { filterByName: { name: contextName } } } = useContext(MyContext);

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
    <>
      <Search />
      <Table
        planetsList={ contextName
          ? planetsList.filter((obj) => obj.name.includes(contextName)) : planetsList }
      />
    </>
  );
}

export default App;
