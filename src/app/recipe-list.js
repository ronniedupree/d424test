// Import the necessary libraries and components
import React from 'react';
import RecipeListData from './recipe-list-data';

const RecipeList = ({ recipes }) => {
  return (
      // Wrapper div giving a className of 'recipe-card' to potentially style the entire list
      <div className='recipe-card'>
        {recipes.map(recipe => (
            // Render a RecipeListData component for each recipe
            <RecipeListData key={recipe.id} recipe={recipe} />
        ))}
      </div>
  );
};

// Export the component as the default export of the module
export default RecipeList;
