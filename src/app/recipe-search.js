// Import the necessary useState hook from React
import React, { useState } from "react";

// Define the RecipeSearch component
const RecipeSearch = ({ onSearch, recipes, setActiveRecipe }) => {

  const [searchTerm, setSearchTerm] = useState("");

  // Handle input field changes
  const handleChange = (e) => {
    const value = e.target.value; // Get the current value from the input field
    setSearchTerm(value); // Update the searchTerm state with the new value

    // Delay execution of onSearch by 100 milliseconds to avoid too many frequent calls
    setTimeout(() => {
      onSearch(value);
    }, 100);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
      <React.Fragment>
        <form className="search-form" onSubmit={handleSubmit}>
          {/* Input field for the search term */}
          <input
              autoFocus // Automatically focus the input field when the component renders
              type="text"
              value={searchTerm}
              onChange={handleChange}
              placeholder="ex. Chocolate Chip Cookies" // Placeholder text for the input field
          />
          {/* Submit button */}
          <button type="submit">Search</button>

          {/* Conditionally render the list of recipes if there are any */}
          {recipes.length > 0 && (
              <div className="flex flex-col items-start recipes-search">
                {recipes?.map((recipe, index) => (
                    // Render each recipe as a paragraph element
                    <p
                        type="button"
                        key={index}
                        onClick={() => setActiveRecipe(recipe)}
                    >
                      {recipe.title}
                    </p>
                ))}
              </div>
          )}
        </form>
      </React.Fragment>
  );
};

// Export the RecipeSearch component as default
export default RecipeSearch;