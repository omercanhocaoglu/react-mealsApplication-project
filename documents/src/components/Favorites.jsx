import React from 'react';
import { useGlobalContext } from './Context';

function Favorites () {
  const { favorites, selectMeal, removeFromFavorites } = useGlobalContext();

  return (
    <div>
        <section className="favorites">
          <div className="favorites-content">

            <h5> Favorites </h5>
            <div className="favorites-container">
              { favorites.map( favorites => (
                <div key={favorites.idMeal} className='favorite-item'>

                  <img onClick={ () => selectMeal( favorites.idMeal, true ) } 
                    src={favorites.strMealThumb} alt="photo" className='favorites-img img' />
                  <button className='remove-btn' onClick={ () => removeFromFavorites(favorites.idMeal) } > Remove </button>
                
                </div>
              ) ) }
            </div>

          </div>
        </section>
    </div>
  )
};

export default Favorites;