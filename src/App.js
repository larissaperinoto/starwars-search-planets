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
    allFilters: { filterByNumericValues },
    filterName: { filterByName: { name: contextName } } } = useContext(MyContext);

  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';

  useEffect(() => {
    const getPlanets = async () => {
      const { results } = await fetch(endpoint).then((response) => response.json());
      results.forEach((key) => delete key.residents);
      getPlanetsList(results);
    };
    getPlanets();
  }, []);

  useEffect(() => {
    if (filterByNumericValues.length > 0) {
      let newResult = '';
      filterByNumericValues.forEach(({ comparison, column, value }) => {
        newResult = planetsList.filter((obj) => {
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
      });
      getPlanetsList(newResult);
    }
  }, [filterByNumericValues]);

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
