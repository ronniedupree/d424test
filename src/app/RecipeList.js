// RecipeList.js
import React from 'react';
import RecipeReport from './RecipeReport';

const RecipeList = ({ recipes }) => {
  return (
    <div className='recipe-card'>
      {recipes.map(recipe => (
        <RecipeReport key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList;
