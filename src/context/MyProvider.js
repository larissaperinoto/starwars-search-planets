import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [filterName, setFilterName] = useState({
    filterByName: {
      name: '',
    } });

  const [numericFilters, setNumericFilters] = useState({
    filterByNumericValues: [
      {
        column: 'population',
        comparison: 'maior que',
        value: 0,
      },
    ],
  });

  const [filter, setFilter] = useState(false);

  const [planetsList, setPlanetsList] = useState([]);

  const getPlanetsList = (planets) => {
    setPlanetsList(planets);
  };

  const applyFilters = () => {
    setFilter(!filter);
  };

  const handleChange = ({ target: { value } }) => {
    setFilterName({
      filterByName: {
        name: value,
      } });
  };

  const handleNumericFilters = ({ target: { name, value } }) => {
    setNumericFilters({
      filterByNumericValues: [
        {
          ...numericFilters.filterByNumericValues[0],
          [name]: value,
        },
      ],
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
        filter,
        planetsList,
        getPlanetsList } }
    >
      {children}
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.objectOf().isRequired,
};

export default MyProvider;
