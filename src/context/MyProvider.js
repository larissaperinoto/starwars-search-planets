import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [filterName, setFilterName] = useState({
    filterByName: {
      name: '',
    } });

  const [numericFilters, setNumericFilters] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const [allFilters, setAllFilters] = useState({
    filterByNumericValues: [],
  });

  const [planetsList, setPlanetsList] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  const initialColumnData = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const [colunmData, setColunmData] = useState(initialColumnData);

  const getNewColunmData = () => {
    console.log('select');
    console.log(allFilters);
    const selected = allFilters.filterByNumericValues.map((obj) => obj.column);
    const newColumnData = colunmData.filter((item) => !selected.includes(item));
    setColunmData(newColumnData);
  };

  const clickToFilter = () => {
    setAllFilters({
      filterByNumericValues: [...allFilters.filterByNumericValues, numericFilters],
    });
  };

  const handleChange = ({ target: { value } }) => {
    setFilterName({
      filterByName: {
        name: value,
      } });
  };

  const handleNumericFilters = ({ target: { name, value } }) => {
    setNumericFilters({
      ...numericFilters,
      [name]: value,
    });
  };

  const handleFilterList = () => {
    const { filterByNumericValues } = allFilters;
    filterByNumericValues.forEach(({ comparison, column, value }) => {
      const newResult = planetsList.filter((obj) => {
        if (comparison === 'maior que') return obj[column] > Number(value);
        if (comparison === 'menor que') return obj[column] < Number(value);
        if (comparison === 'igual a') return obj[column] === value;
        return planetsList;
      });
      setPlanetsList(newResult);
    });
    getNewColunmData();
  };

  const clickToDeleteFilter = (filterObj) => {
    const newAllFilters = allFilters.filterByNumericValues
      .filter((obj) => obj !== filterObj);
    setAllFilters({
      filterByNumericValues: [...newAllFilters],
    });
    handleFilterList();
  };

  const clickToDeleteAllFilters = () => {
    setAllFilters({
      filterByNumericValues: [],
    });
  };

  return (
    <MyContext.Provider
      value={ {
        filterName,
        handleChange,
        numericFilters,
        handleNumericFilters,
        handleFilterList,
        clickToFilter,
        planetsList,
        setOriginalData,
        allFilters,
        colunmData,
        clickToDeleteFilter,
        clickToDeleteAllFilters,
        setPlanetsList,
        originalData,
        getNewColunmData } }
    >
      {children}
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.objectOf().isRequired,
};

export default MyProvider;
