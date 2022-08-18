import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Filters() {
  const { handleNumericFilters,
    numericFilters: { value },
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
            <option key={ i }>{ item }</option>
          ))}
      </select>

      <select
        data-testid="comparison-filter"
        name="comparison"
        onChange={ handleNumericFilters }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
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
    </form>
  );
}

export default Filters;
