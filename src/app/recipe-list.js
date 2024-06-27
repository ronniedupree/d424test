// recipe-list.js
import React from 'react';
import RecipeListData from './recipe-list-data';

const RecipeList = ({ recipes }) => {
  return (
    <div className='recipe-card'>
      {recipes
          .map(recipe => (
        <RecipeListData key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList;
