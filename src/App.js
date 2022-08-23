import React, { useEffect, useContext } from 'react';
import requestAPI from './services/resquestAPI';
import Search from './components/Search';
import Table from './components/Table';
import Filters from './components/Filters';
import MyContext from './context/MyContext';

function App() {
  const {
    setOriginalData,
    handleFilterList,
    action,
    planetsList,
    clickToDeleteFilter,
    setPlanetsList,
    originalData,
    getNewColunmData,
    allFilters: { filterByNumericValues },
    filterName: { filterByName: { name: contextName } } } = useContext(MyContext);

  useEffect(() => {
    const getPlanets = async () => {
      const data = await requestAPI();
      setOriginalData(data);
      setPlanetsList(data);
    };
    getPlanets();
  }, []);

  useEffect(() => {
    if (filterByNumericValues.length > 0) {
      if (action === 'filtrar') handleFilterList(planetsList);
      if (action === 'deletar') handleFilterList(originalData);
    } else {
      setPlanetsList(originalData);
    }
    getNewColunmData();
  }, [filterByNumericValues]);

  return (
    <>
      <Search />
      <Filters />
      <div>
        { filterByNumericValues.length > 0 && <h3>Filtrando por:</h3> }
        <ul>
          { filterByNumericValues.length > 0
            && filterByNumericValues.map((item, i) => (
              <li key={ i } data-testid="filter">
                <p>{`${item.column} ${item.comparison}  ${item.value}`}</p>
                <button
                  type="button"
                  onClick={ () => clickToDeleteFilter(item) }
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
