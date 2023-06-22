import React from 'react';
import { useGlobalContext, } from './Context';
import { BiLike } from "react-icons/bi";

function Meals () {
    const { meals, loading, noData, selectMeal, addToFavorites } = useGlobalContext();
  
    return (
    <div>
        <div>
            <h1 className='text-center'> The Meals App </h1>
            <h3 className='text-center'> Meals List ({meals.length}) </h3>
            <h4 className='text-center'> {loading ? "Loading..." : "" } </h4> 
            <h4 className="text-center"> {noData ? "No meals matched. Please try again" : "" } </h4>
            
            <div className='section-center'>

              { meals.map( singleMeal => (
                <div key={singleMeal.idMeal}>
                  <article className='single-meal'>
                    
                    <img src={singleMeal.strMealThumb} alt="meal-photo" className='img' 
                    onClick={ () => selectMeal( singleMeal.idMeal )} />
                    <footer>
                      <h5> {singleMeal.strMeal} </h5>
                      <button className='like-btn' onClick={ () => addToFavorites(singleMeal.idMeal) }> <BiLike /> </button>
                    </footer>
                  
                  </article>
                </div>
              ) ) } 
            
            </div>
      </div>
    </div>
  )
};

export default Meals;