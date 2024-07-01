// recipe-card.js
"use client"; // This directive designates the file as a React component that runs on the client side
import React, { useState } from "react"; // Import necessary modules from React

const RecipeCard = ({
                      doc, // Firestore document reference function
                      updateDoc, // Function to update document in Firestore
                      colRef, // Firestore collection reference
                      recipe, // Recipe data
                      activeRecipe = true, // Boolean to determine if the recipe is active
                      handleGoHome, // Function to navigate to the home page
                      serverTimestamp, // Function to get the server timestamp
                      deleteDoc, // Function to delete document from Firestore
                    }) => {
  // Initialize state variables for edit mode, message, and message type
  const [edit, setEdit] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Initialize state variable for form data, pre-populated with recipe details
  const [formData, setFormData] = useState({
    title: recipe?.title,
    category: recipe?.category,
    image_url: recipe?.image_url,
    meal_type: recipe?.meal_type,
    ingredients: recipe?.ingredients?.join(", "), // Comma-separated list of ingredients
  });

  // Handle changes in form input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Update the corresponding field in formData
    });
  };

  // Convert Firestore timestamp (seconds) to a human-readable date string
  const secondsToDate = (seconds) => {
    const milliseconds = seconds * 1000; // Convert seconds to milliseconds
    const date = new Date(milliseconds); // Create a Date object

    // Date format options
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // Use 12-hour clock with AM/PM
    };

    // Return formatted date string
    return date.toLocaleString(undefined, options);
  };

  // Handle form submission for updating the recipe
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Destructure form data
    const { title, category, image_url, meal_type, ingredients } = formData;

    // Validate required fields
    if (!title || !category || !image_url || !meal_type || !ingredients) {
      setMessage("Please fill in all required fields.");
      setMessageType("danger");
      return;
    }

    // Validate image URL format
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlPattern.test(image_url)) {
      setMessage("Please enter a valid image URL.");
      setMessageType("danger");
      return;
    }

    // Convert comma-separated ingredients to an array and validate
    const ingredientsArray = ingredients
        .split(",")
        .map((ingredient) => ingredient.trim());
    if (ingredientsArray.some((ingredient) => !ingredient)) {
      setMessage("Please enter a valid list of ingredients separated by commas.");
      setMessageType("danger");
      return;
    }

    // Try updating the recipe document in Firestore
    try {
      const docRef = doc(colRef, recipe?.id); // Get document reference
      await updateDoc(docRef, {
        title: formData.title,
        category: formData.category,
        image_url: formData.image_url,
        meal_type: formData.meal_type,
        updated_at: serverTimestamp(), // Get server timestamp for updated_at field
        ingredients: formData.ingredients.split(",").map((ingredient) => ingredient.trim()), // Convert ingredients to array
      });
      setMessage("Recipe updated successfully!"); // Set success message
      setMessageType("success");
      handleGoHome(); // Navigate to home page
    } catch (error) {
      console.error("Error updating document: ", error); // Log error to console
      setMessage(`Error updating recipe: ${error}`); // Set error message
      setMessageType("danger");
    }
  };

  // Handle deletion of the recipe document from Firestore
  const handleDelete = async () => {
    try {
      const docRef = doc(colRef, recipe.id); // Get document reference
      await deleteDoc(docRef); // Delete document from Firestore
      setMessage("Recipe deleted successfully!"); // Set success message
      setMessageType("success");
      handleGoHome(); // Navigate to home page
    } catch (error) {
      console.error("Error deleting document: ", error); // Log error to console
      setMessage(`Error deleting recipe: ${error}`); // Set error message
      setMessageType("danger");
    }
  };

  // Render the Recipe Card UI
  return (
      <React.Fragment>
        {/* Display message banner */}
        <div className={`banner-message ${messageType}`}>
          <p>{message}</p>
        </div>

        {/* Recipe display */}
        <div className="recipe">
          {/* Display recipe image if not in edit mode */}
          {!edit && (
              <img src={recipe?.image_url} alt="Recipe" width={100} height={100} />
          )}

          {/* Form for displaying and editing recipe details */}
          <form className="form" onSubmit={handleSubmit}>
            <h1 className="text-center text-5xl font-bold pb-8 mb-8 uppercase">
              {recipe?.title}
            </h1>

            {/* Title input field */}
            <div className="md:flex md:items-center md:justify-between p-2">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="title">
                Title:
              </label>
              <input
                  className={`w-96 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight ${
                      edit ? "focus:outline-none focus:bg-white focus:border-purple-500" : "bg-gray-200"
                  }`}
                  autoFocus
                  id="title"
                  name="title"
                  type="text"
                  readOnly={!edit} // Read-only if not in edit mode
                  onChange={handleChange}
                  value={edit ? formData.title : recipe?.title} // Show formData if in edit mode, otherwise show recipe data
              />
            </div>

            {/* Category input field */}
            <div className="md:flex md:items-center md:justify-between p-2">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="category">
                Category:
              </label>
              <input
                  className={`w-96 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight ${
                      edit ? "focus:outline-none focus:bg-white focus:border-purple-500" : "bg-gray-200"
                  }`}
                  id="category"
                  name="category"
                  type="text"
                  readOnly={!edit} // Read-only if not in edit mode
                  onChange={handleChange}
                  value={edit ? formData.category : recipe?.category} // Show formData if in edit mode, otherwise show recipe data
              />
            </div>

            {/* Ingredients input field */}
            <div className="md:flex md:items-center md:justify-between p-2">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="ingredients">
                Ingredients:
              </label>
              <input
                  className={`w-96 appearance-none border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight ${
                      edit ? "focus:outline-none focus:bg-white focus:border-purple-500" : "bg-gray-200"
                  }`}
                  id="ingredients"
                  name="ingredients"
                  type="text"
                  readOnly={!edit} // Read-only if not in edit mode
                  onChange={handleChange}
                  value={edit ? formData.ingredients : recipe?.ingredients} // Show formData if in edit mode, otherwise show recipe data
              />
            </div>

            {/* Meal type input field */}
            <div className="md:flex md:items-center md:justify-between p-2">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="meal_type">
                Meal Type:
              </label>
              <input
                  className={`w-96 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight ${
                      edit ? "focus:outline-none focus:bg-white focus:border-purple-500" : "bg-gray-200"
                  }`}
                  id="meal_type"
                  name="meal_type"
                  type="text"
                  readOnly={!edit} // Read-only if not in edit mode
                  onChange={handleChange}
                  value={edit ? formData.meal_type : recipe?.meal_type} // Show formData if in edit mode, otherwise show recipe data
              />
            </div>

            {/* Image URL input field (only in edit mode) */}
            {edit && (
                <div className="md:flex md:items-center md:justify-between p-2">
                  <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0" htmlFor="image_url">
                    Image URL
                    <br />
                    (<i><a href="https://www.pexels.com/" target="_blank">https://www.pexels.com/</a></i>)
                  </label>
                  <input
                      className={`w-96 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight ${
                          edit ? "focus:outline-none focus:bg-white focus:border-purple-500" : "bg-gray-200"
                      }`}
                      id="image_url"
                      name="image_url"
                      type="text"
                      readOnly={!edit} // Read-only if not in edit mode
                      onChange={handleChange}
                      value={edit ? formData.image_url : recipe?.image_url} // Show formData if in edit mode, otherwise show recipe data
                  />
                </div>
            )}

            {/* Last updated date input field */}
            <div className="md:flex md:items-center md:justify-between p-2">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="updated_at">
                Last Updated at:
              </label>
              <input
                  className={`w-96 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight ${
                      edit ? "focus:outline-none focus:bg-white focus:border-purple-500" : "bg-gray-200"
                  }`}
                  id="updated_at"
                  name="updated_at"
                  type="text"
                  readOnly={!edit} // Always read-only
                  value={secondsToDate(recipe?.updated_at?.seconds)} // Convert and display update timestamp
              />
            </div>

            {/* Save and Cancel buttons (only in edit mode) */}
            {edit && (
                <React.Fragment>
                  <button className="confirm" type="submit">Save Recipe</button>
                  <button className={edit ? "danger" : ""} onClick={() => setEdit(!edit)}>{edit ? "Cancel" : "Edit Recipe"}</button>
                </React.Fragment>
            )}
          </form>
        </div>

        {/* Edit and Delete buttons (only if recipe is active) */}
        {activeRecipe && (
            <div>
              {!edit && <button className="warning" onClick={() => setEdit(!edit)}>Edit Recipe</button>}
              {!edit && <button className="danger" onClick={handleDelete}>Delete Recipe</button>}
            </div>
        )}
      </React.Fragment>
  );
};

export default RecipeCard; // Export the RecipeCard component
