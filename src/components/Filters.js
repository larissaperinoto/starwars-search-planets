import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
import initialColumnData from '../services/columnData';

function Filters() {
  const { handleNumericFilters,
    numericFilters: { value },
    clickToOrderList,
    handleOrderChange,
    clickToFilter,
    clickToDeleteAllFilters,
    colunmData } = useContext(MyContext);

  return (
    <form>
      <select
        data-testid="column-filter"
        name="column"
        onChange={ handleNumericFilters }
      >
        { colunmData
          .map((item, i) => (
            <option key={ i } value={ item }>{ item }</option>
          ))}
      </select>

      <select
        data-testid="comparison-filter"
        name="comparison"
        onChange={ handleNumericFilters }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        type="number"
        data-testid="value-filter"
        name="value"
        value={ value }
        onChange={ handleNumericFilters }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ clickToFilter }
      >
        Filter
      </button>

      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ clickToDeleteAllFilters }
      >
        Remover todas filtragens
      </button>

      <select
        data-testid="column-sort"
        name="column"
        onChange={ handleOrderChange }
      >
        { initialColumnData.map((item, i) => (
          <option key={ i }>{item}</option>
        ))}
      </select>

      <label htmlFor="column-sort-input-asc">
        Ascendente
        <input
          type="radio"
          id="column-sort-input-asc"
          data-testid="column-sort-input-asc"
          name="sort"
          value="ASC"
          onChange={ handleOrderChange }
        />
      </label>
      <label htmlFor="column-sort-input-asc">
        Descendente
        <input
          type="radio"
          id="column-sort-input-desc"
          data-testid="column-sort-input-desc"
          value="DESC"
          name="sort"
          onChange={ handleOrderChange }
        />
      </label>

      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ clickToOrderList }
      >
        Ordenar
      </button>
    </form>
  );
}

export default Filters;
