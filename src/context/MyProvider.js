import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [filter, setFilter] = useState({
    filterByName: {
      name: '',
    } });

  const handleChange = ({ target: { value } }) => {
    setFilter({
      filterByName: {
        name: value,
      } });
  };

  return (
    <MyContext.Provider value={ { filter, handleChange } }>
      {children}
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.objectOf().isRequired,
};

export default MyProvider;
