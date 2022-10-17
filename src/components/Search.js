import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Search() {
  const { filterName: { filterByName: { name } }, handleChange } = useContext(MyContext);
  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        placeholder="Search"
        value={ name }
        onChange={ handleChange }
        className="input-search"
      />
    </div>
  );
}

export default Search;
