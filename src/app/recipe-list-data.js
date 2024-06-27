// recipe-list-data.js
import React from "react";

const RecipeListData = ({ recipe }) => {
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

  return (
    <React.Fragment>
      <div className="recipes">
        <div>
          <p>
            <span>{recipe.title}</span>
          </p>
          <p>
            Category: <span>{recipe.category}</span>
          </p>
          <p>
            Meal Type: <span>{recipe.meal_type}</span>
          </p>
          <div>
            Ingredients:
            <ul>
              {recipe?.ingredients?.map((ingredient, index) => (
                  <li key={index}>
                    <span>{ingredient}</span>
                  </li>
              ))}
            </ul>
          </div>
          <br/>
          <p style={{color: "maroon"}}>
            Date Created:{" "}
            <span>{secondsToDate(recipe?.created_at?.seconds)}</span>
          </p>
        </div>
        <img src={recipe.image_url} alt="text" width={100} height={100}/>
      </div>
    </React.Fragment>
  );
};

export default RecipeListData;
