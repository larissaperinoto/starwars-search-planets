import React, { useState } from 'react';
import PropTypes from 'prop-types';
import initialColumnData from '../services/columnData';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [planetsList, setPlanetsList] = useState([]);

  const [action, setAction] = useState('');

  const [originalData, setOriginalData] = useState([]);

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

  const [order, setOrder] = useState({ column: 'population', sort: 'ASC' });

  const [colunmData, setColunmData] = useState(initialColumnData);

  const getNewColunmData = () => {
    const selected = allFilters.filterByNumericValues.map((obj) => obj.column);
    const newColumnData = colunmData.filter((item) => !selected.includes(item));
    setColunmData(newColumnData);
  };

  const clickToFilter = () => {
    setAllFilters({
      filterByNumericValues: [...allFilters.filterByNumericValues, numericFilters],
    });
    setAction('filtrar');
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

  const handleFilterList = (list) => {
    console.log('filtrou');
    console.log(list);
    const { filterByNumericValues } = allFilters;
    console.log(filterByNumericValues);
    filterByNumericValues.forEach(({ comparison, column, value }) => {
      const newResult = list.filter((obj) => {
        console.log(column, comparison, value);
        if (comparison === 'maior que') return obj[column] > Number(value);
        if (comparison === 'menor que') return obj[column] < Number(value);
        if (comparison === 'igual a') return obj[column] === value;
        return list;
      });
      console.log(newResult);
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
    setAction('deletar');
  };

  const clickToDeleteAllFilters = () => {
    setAllFilters({
      filterByNumericValues: [],
    });
  };

  const handleOrderChange = ({ target: { name, value } }) => {
    setOrder({ ...order, [name]: value });
  };

  const clickToOrderList = () => {
    // const { sort, column } = order;

    /* console.log(sort, column);
    if (sort === 'ASC') {
      const ascPlanetsList = planetsList.sort((a, b) => {
        if (Number(a[column]) < Number(b[column])) return -1;
        if (Number(a[column]) > Number(b[column])) return 1;
        if (a[column] === 'unknow') return -1;
        return 0;
      });
      setPlanetsList(ascPlanetsList);
    }

    if (sort === 'DESC') {
      const ascPlanetsList = planetsList.sort((a, b) => {
        if (Number(a[column]) > Number(b[column])) return -1;
        if (Number(a[column]) < Number(b[column])) return 1;
        if (a[column] === 'unknow') return -1;
        return 0;
      });
      setPlanetsList(ascPlanetsList);
    } */
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
        getNewColunmData,
        handleOrderChange,
        clickToOrderList,
        action } }
    >
      {children}
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.objectOf().isRequired,
};

export default MyProvider;
