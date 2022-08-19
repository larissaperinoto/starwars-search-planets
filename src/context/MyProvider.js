import React, { useState } from 'react';
import PropTypes from 'prop-types';
import initialColumnData from '../services/columnData';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [planetsList, setPlanetsList] = useState([]);

  const [action, setAction] = useState('');

  const [originalData, setOriginalData] = useState([]);

  const [orderList, setOrderList] = useState([]);

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
    const { filterByNumericValues } = allFilters;
    filterByNumericValues.forEach(({ comparison, column, value }) => {
      const newResult = list.filter((obj) => {
        if (comparison === 'maior que') return obj[column] > Number(value);
        if (comparison === 'menor que') return obj[column] < Number(value);
        if (comparison === 'igual a') return obj[column] === value;
        return list;
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
    setAction('deletar');
  };

  const clickToDeleteAllFilters = () => {
    setAllFilters({
      filterByNumericValues: [],
    });
  };

  const [order, setOrder] = useState({ column: 'population', sort: 'ASC' });

  const handleOrderChange = ({ target: { name, value } }) => {
    setOrder({ ...order, [name]: value });
  };

  const orderAscendent = ({ column }) => {
    const menor = -1;
    const ascPlanetsList = planetsList.sort((a, b) => {
      if (Number(a[column]) < Number(b[column])) return menor;
      if (Number(a[column]) > Number(b[column])) return 1;
      return 0;
    });
    console.log('hora de mudar');
    setOrderList([
      ...ascPlanetsList.filter((obj) => obj[column] !== 'unknown'),
      ...ascPlanetsList.filter((obj) => obj[column] === 'unknown'),
    ]);
  };

  const orderDescentent = () => {
    setOrderList([
      ...orderList.filter((obj) => obj[order.column] === 'unknown').reverse(),
      ...orderList.filter((obj) => obj[order.column] !== 'unknown').reverse(),
    ]);
    setAction('lista descendente');
  };

  const clickToOrderList = () => {
    setAction('ordenar');
    if (order.sort === 'ASC') {
      orderAscendent(order);
    } else {
      orderAscendent(order);
      setAction('DESC');
    }
  };

  console.log(planetsList);

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
        action,
        order,
        clickToOrderList,
        orderList,
        orderDescentent } }
    >
      {children}
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyProvider;
