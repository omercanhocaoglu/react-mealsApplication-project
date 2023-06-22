import React from 'react';
import { useGlobalContext } from './Context';

function Modal () {
  const { selectedMeal, closeModal } = useGlobalContext();

  return (
    <div>
      <aside className='modal-overlay'>
        <div className="modal-container">
          <img src={selectedMeal.strMealThumb} alt="meal-photo" className='img modal-img' />
          
          <div className='modal-content'>
            
            <h4> { selectedMeal.strMeal } </h4>
            <p> Cooking Instructions </p>
            <p> {selectedMeal.strInstructions} </p>
            <a href={ selectedMeal.strSource } target="_blank"> Original Source </a>
            <button className='btn btn-hipster close-btn' onClick={closeModal}> Close </button>
          
          </div>
        </div>
      </aside>
    </div>
  )
};

export default Modal;