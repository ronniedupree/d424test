// recipe-list-data.js
import React from "react";

const RecipeListData = ({ recipe }) => {

  // Function to convert seconds since Unix epoch to a formatted date string
  const secondsToDate = (seconds) => {
    // Convert seconds to milliseconds by multiplying by 1000
    const milliseconds = seconds * 1000;

    // Create a new Date object using the milliseconds
    const date = new Date(milliseconds);

    // Options for formatting the date
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // Use 12-hour clock (AM/PM)
    };

    // Return the date in a readable format with AM/PM
    return date.toLocaleString(undefined, options);
  };

  // JSX code to render the recipe data
  return (
      <React.Fragment>
        <div className="recipes">
          <div>
            {/* Display the recipe title */}
            <p>
              <span>{recipe.title}</span>
            </p>

            {/* Display the recipe category */}
            <p>
              Category: <span>{recipe.category}</span>
            </p>

            {/* Display the meal type of the recipe */}
            <p>
              Meal Type: <span>{recipe.meal_type}</span>
            </p>

            {/* Display the list of ingredients */}
            <div>
              Ingredients:
              <ul>
                {/* Iterate over the ingredients array and create a list item for each ingredient */}
                {recipe?.ingredients?.map((ingredient, index) => (
                    <li key={index}>
                      <span>{ingredient}</span>
                    </li>
                ))}
              </ul>
            </div>
            <br/>
            {/* Display the date when the recipe was created */}
            <p style={{color: "maroon"}}>
              Date Created:{" "}
              <span>{secondsToDate(recipe?.created_at?.seconds)}</span>
            </p>
          </div>
          {/* Display the image of the recipe */}
          <img src={recipe.image_url} alt="Recipe Image" width={100} height={100}/>
        </div>
      </React.Fragment>
  );
};

// Export the RecipeListData component as the default export from this file
export default RecipeListData;
