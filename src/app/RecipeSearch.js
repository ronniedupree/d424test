// RecipeSearch.js
import React, { useState } from "react";

const RecipeSearch = ({ onSearch, recipes, setActiveRecipe }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Delay execution of onSearch by 500 milliseconds
    setTimeout(() => {
      onSearch(value);
    }, 100);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <React.Fragment>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          autoFocus
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search for recipe. i.e.: Carbonara"
        />
        <button type="submit">Search</button>
        {recipes.length > 0 && (
          <div className="flex flex-col items-start recipes-search">
            {recipes?.map((recipe, index) => (
              <p type="button" key={index} onClick={() => setActiveRecipe(recipe)}>
                {recipe.title}
              </p>
            ))}
          </div>
        )}
      </form>
    </React.Fragment>
  );
};

export default RecipeSearch;
