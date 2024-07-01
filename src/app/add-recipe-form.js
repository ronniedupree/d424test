// add-recipe-form.js
import React, { useState } from "react";

// The AddRecipeForm component accepts three props:
// 1. addDoc: A function to add a document to a Firestore collection.
// 2. colRef: A reference to the Firestore collection where the document will be added.
// 3. serverTimestamp: A function to generate a timestamp on the server side.
const AddRecipeForm = ({ addDoc, colRef, serverTimestamp }) => {

  // useState hooks to manage form data, messages, and message type (success or error).
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    image_url: "",
    meal_type: "",
    ingredients: ""
  });

  const [message, setMessage] = useState(""); // State for storing message.
  const [messageType, setMessageType] = useState(""); // State for storing message type.

  // The handleChange function is invoked on every input change.
  // It updates the formData state with the new values.
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from the input event.
    setFormData({
      ...formData, // Spread the existing formData state.
      [name]: value, // Update the specific field that changed.
    });
  };

  // The handleSubmit function handles the form submission.
  // It contains validation logic and adds a new recipe document to Firestore.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior.

    // Destructuring fields from formData for validation.
    const { title, category, image_url, meal_type, ingredients } = formData;

    // Validation for all required fields.
    if (!title || !category || !image_url || !meal_type || !ingredients) {
      setMessage("Please fill in all required fields."); // Set error message.
      setMessageType("danger"); // Set message type to danger (error).
      return;
    }

    // Validation for URL format.
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlPattern.test(image_url)) {
      setMessage("Please enter a valid image URL."); // Set error message.
      setMessageType("danger"); // Set message type to danger (error).
      return;
    }

    // Validation for ingredients list.
    const ingredientsList = ingredients.split(",").map((ingredient) => ingredient.trim());
    if (ingredientsList.some((ingredient) => !ingredient)) {
      setMessage("Please enter a valid list of ingredients separated by commas."); // Set error message.
      setMessageType("danger"); // Set message type to danger (error).
      return;
    }

    try {
      // Add the new recipe document to Firestore.
      await addDoc(colRef, {
        ...formData, // Spread the current form data.
        ingredients: ingredientsList, // Store the ingredients as a list.
        updated_at: serverTimestamp(), // Timestamp for updated_at.
        created_at: serverTimestamp(), // Timestamp for created_at.
      });

      setMessage("Recipe successfully added!"); // Set success message.
      setMessageType("success"); // Set message type to success.

      // Reset the form fields.
      setFormData({
        title: "",
        category: "",
        image_url: "",
        meal_type: "",
        ingredients: "",
      });
    } catch (error) {
      setMessage(`Error: ${error}`); // Set error message.
      setMessageType("danger"); // Set message type to danger (error).
    }
  };

  // The component's return statement contains the form layout.
  return (
      <React.Fragment>
        <h1 className="add-recipe-title">Add Recipe</h1>
        <form
            onSubmit={handleSubmit} // Form submission handler.
            className="add-recipe-form flex flex-col items-start justify-center gap-4 p-4"
        >
          <div>
            <label>
              Title
              <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Title"
                  required
              />
            </label>
            <label>
              Category
              <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Category"
                  required
              />
            </label>
          </div>
          <div>
            <label>
              Ingredients (comma-separated)
              <input
                  type="text"
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleChange}
                  placeholder="Ingredients"
                  required
              />
            </label>
            <label>
              Image URL (via www.pexels.com)
              <input
                  type="text"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  placeholder="Image Url"
                  required
              />
            </label>
          </div>
          <div>
            <label>
              Meal Type
              <input
                  type="text"
                  name="meal_type"
                  value={formData.meal_type}
                  onChange={handleChange}
                  placeholder="Meal Type"
                  required
              />
            </label>
          </div>
          <button type="submit" className="confirm">Add Recipe</button>
          <div className={`banner-message ${messageType}`}>
            <p>{message}</p>
          </div>
        </form>
      </React.Fragment>
  );
};

export default AddRecipeForm;
