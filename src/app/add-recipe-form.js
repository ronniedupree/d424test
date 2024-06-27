// add-recipe-form.js
import React, { useState } from "react";

const AddRecipeForm = ({ addDoc, colRef, serverTimestamp }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    image_url: "",
    meal_type: "",
    ingredients: ""
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for all required fields
    const { title, category, image_url, meal_type, ingredients } = formData;
    if (!title || !category || !image_url || !meal_type || !ingredients) {
      setMessage("Please fill in all required fields.");
      setMessageType("danger");
      return;
    }

    // Validation for URL
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlPattern.test(image_url)) {
      setMessage("Please enter a valid image URL.");
      setMessageType("danger");
      return;
    }

    // Validation for ingredients list
    const ingredientsList = ingredients.split(",").map((ingredient) => ingredient.trim());
    if (ingredientsList.some((ingredient) => !ingredient)) {
      setMessage("Please enter a valid list of ingredients separated by commas.");
      setMessageType("danger");
      return;
    }

    try {
      await addDoc((colRef), {
        ...formData,
        ingredients: ingredientsList,
        updated_at: serverTimestamp(),
        created_at: serverTimestamp(),
      });

      setMessage("Recipe successfully added!");
      setMessageType("success");

      // Reset the form data
      setFormData({
        title: "",
        category: "",
        image_url: "",
        meal_type: "",
        ingredients: "",
      });
    } catch (error) {
      setMessage(`Error: ${error}`);
      setMessageType("danger");
    }
  };

  return (
    <React.Fragment>
      <h1 className="add-recipe-title">Add Recipe</h1>
      <form
          onSubmit={handleSubmit}
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
