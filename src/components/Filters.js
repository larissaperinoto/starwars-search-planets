import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Filters() {
  const { handleNumericFilters,
    numericFilters,
    applyFilters } = useContext(MyContext);
  const inputValue = numericFilters.filterByNumericValues[0].value;
  return (
    <form>
      <select
        data-testid="column-filter"
        name="column"
        onChange={ handleNumericFilters }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
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
        value={ inputValue }
        onChange={ handleNumericFilters }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ applyFilters }
      >
        Filter
      </button>
    </form>
  );
}

export default Filters;
