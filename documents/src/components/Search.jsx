import React from 'react';
import { useState } from 'react';
import { useGlobalContext } from './Context';

function Search () {
  const {setSearchTerm, fetchRandomMeal, fetchAllMeals } = useGlobalContext();
  const [ text, setText ] = useState('');
  
  const handleChange = (e) => {
    setText(e.target.value);
    // console.log(text);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if ( text ) {
      setSearchTerm(text);
      setText("");
    }
  };

  const handleRandomMeal = () => {
    setSearchTerm("");
    setText("");
    fetchRandomMeal();
  };
  
  return (
    <div>
      <header className='search-container'>
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={handleChange}  placeholder='Search Meal' className='form-input' value={text}/>
          <button type='submit'className='btn'> Search </button>
          <button onClick={handleRandomMeal} type='button'  className='btn btn-hipster'> Suprise Me! </button>
          <button type='button' className='btn' onClick={fetchAllMeals}> All Meals </button>
        </form>
      </header>  
    </div>
  )
};

export default Search;