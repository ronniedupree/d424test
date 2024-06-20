// AddRecipeForm.js
import React, { useState } from "react";

const AddRecipeForm = ({ addDoc, colRef, serverTimestamp }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    image_url: "",
    meal_type: "",
    ingredients: "", // Comma-separated list of ingredients
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Trim whitespace
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const { title, category, image_url, meal_type, ingredients } = formData;
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

    // Validate ingredients format
    const ingredientsArray = ingredients.split(",").map((ingredient) => ingredient.trim());
    if (ingredientsArray.some((ingredient) => !ingredient)) {
      setMessage("Please enter a valid list of ingredients separated by commas.");
      setMessageType("danger");
      return;
    }

    try {
      await addDoc((colRef), {
        ...formData,
        ingredients: ingredientsArray,
        updated_at: serverTimestamp(),
        created_at: serverTimestamp(),
      });

      setMessage("Recipe added successfully!");
      setMessageType("success");

      // Reset form data
      setFormData({
        title: "",
        category: "",
        image_url: "",
        meal_type: "",
        ingredients: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      setMessage(`Error adding recipe: ${error}`);
      setMessageType("danger");
    }
  };

  return (
    <React.Fragment>
      <div className={`banner-message ${messageType}`}>
        <p>{message}</p>
      </div>
      <h1 className="add-recipe-title">Add Recipe:</h1>
      <form
        onSubmit={handleSubmit}
        className="add-recipe-form flex flex-col items-start justify-center gap-4 p-4"
      >
        <div>
          <label>
            Title:
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
            Category:
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
            Ingredients (Comma-separated):
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
            Image URL (use pictures from www.pexels.com)
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
            Meal Type:
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
        <button type="submit">Add Recipe</button>
      </form>
    </React.Fragment>
  );
};

export default AddRecipeForm;
