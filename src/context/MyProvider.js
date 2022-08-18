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

  const getPlanetsList = (planets) => {
    setPlanetsList(planets);
  };

  const applyFilters = () => {
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

  return (
    <MyContext.Provider
      value={ {
        filterName,
        handleChange,
        numericFilters,
        handleNumericFilters,
        applyFilters,
        planetsList,
        getPlanetsList,
        allFilters } }
    >
      {children}
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.objectOf().isRequired,
};

export default MyProvider;
