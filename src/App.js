import React, { useEffect, useContext } from 'react';
import Search from './components/Search';
import Table from './components/Table';
import Filters from './components/Filters';
import Header from './components/Header';
import MyContext from './context/MyContext';

function App() {
  const {
    getPlanetsList,
    planetsList,
    filter,
    numericFilters,
    filterName: { filterByName: { name: contextName } } } = useContext(MyContext);

  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';

  useEffect(() => {
    const getPlanets = async () => {
      const { results } = await fetch(endpoint).then((response) => response.json());
      results.forEach((key) => delete key.residents);
      console.log(results);
      getPlanetsList(results);
    };
    getPlanets();
  }, []);

  useEffect(() => {
    if (filter) {
      console.log('filtra');
      const { comparison, value, column } = numericFilters.filterByNumericValues[0];
      const newResult = planetsList.filter((obj) => {
        let result = '';
        if (comparison === 'maior que') {
          result = obj[column] > Number(value);
        }
        if (comparison === 'menor que') {
          result = obj[column] < Number(value);
        }

        if (comparison === 'igual a') {
          result = obj[column] === value;
        }
        return result;
      });
      getPlanetsList(newResult);
    }
  }, [filter]);

  return (
    <>
      <Header />
      <Search />
      <Filters />
      <Table
        planetsList={ contextName
          ? planetsList.filter((obj) => obj.name.includes(contextName)) : planetsList }
      />
    </>
  );
}

export default App;
