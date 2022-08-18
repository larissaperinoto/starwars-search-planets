import React, { useEffect, useContext } from 'react';
import Search from './components/Search';
import Table from './components/Table';
import Filters from './components/Filters';
import Header from './components/Header';
import MyContext from './context/MyContext';

function App() {
  const {
    getPlanetsList,
    handleFilterList,
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
    console.log('atualiza');
    if (filterByNumericValues.length > 0) {
      handleFilterList();
    }
  }, [filterByNumericValues]);

  return (
    <>
      <Header />
      <Search />
      <Filters />
      <div>
        { filterByNumericValues.length > 0 && <h3>Filtrando por:</h3> }
        <ul>
          { filterByNumericValues.length > 0
            && filterByNumericValues.map((item, i) => (
              <li key={ i }>
                <p>{`${item.column} ${item.comparison}  ${item.value}`}</p>
                <button
                  type="button"
                  data-testid="filter"
                >
                  X
                </button>
              </li>
            ))}
        </ul>
      </div>
      <Table
        planetsList={ contextName
          ? planetsList.filter((obj) => obj.name.includes(contextName)) : planetsList }
      />
    </>
  );
}

export default App;
