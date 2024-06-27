// recipe-card.js
"use client";
import React, { useState } from "react";

const RecipeCard = ({
  doc,
  updateDoc,
  colRef,
  recipe,
  activeRecipe = true,
  handleGoHome,
  serverTimestamp,
  deleteDoc,
}) => {
  const [edit, setEdit] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [formData, setFormData] = useState({
    title: recipe?.title,
    category: recipe?.category,
    image_url: recipe?.image_url,
    meal_type: recipe?.meal_type,
    ingredients: recipe?.ingredients?.join(", "), // Comma-separated list of ingredients
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Trim whitespace
    });
  };

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
    const ingredientsArray = ingredients
      .split(",")
      .map((ingredient) => ingredient.trim());
    if (ingredientsArray.some((ingredient) => !ingredient)) {
      setMessage(
        "Please enter a valid list of ingredients separated by commas."
      );
      setMessageType("danger");
      return;
    }

    // Validate form fields
    try {
      const docRef = doc(colRef, recipe?.id);
      await updateDoc(docRef, {
        title: formData.title,
        category: formData.category,
        image_url: formData.image_url,
        meal_type: formData.meal_type,
        updated_at: serverTimestamp(),
        ingredients: formData.ingredients
          .split(",")
          .map((ingredient) => ingredient.trim()),
      });
      setMessage("Recipe updated successfully!");
      setMessageType("success");
      handleGoHome();
    } catch (error) {
      console.error("Error updating document: ", error);
      setMessage(`Error updating recipe: ${error}`);
      setMessageType("danger");
    }
  };

  const handleDelete = async () => {
    try {
      // Construct a reference to the document to be deleted
      const docRef = doc(colRef, recipe.id);
      
      // Delete the document from Firestore
      await deleteDoc(docRef);
      
      // Display a success message
      setMessage("Recipe deleted successfully!");
      setMessageType("success");
      handleGoHome();
    } catch (error) {
      // Display an error message if deletion fails
      console.error("Error deleting document: ", error);
      setMessage(`Error deleting recipe: ${error}`);
      setMessageType("danger");
    }
  };

  return (
    <React.Fragment>
      <div className={`banner-message ${messageType}`}>
        <p>{message}</p>
      </div>
      <div className="recipe">
        {!edit && (
          <img src={recipe?.image_url} alt="text" width={100} height={100} />
        )}
        <form className="form" onSubmit={handleSubmit}>
          <h1 className="text-center text-5xl font-bold pb-8 mb-8 uppercase">
            {recipe?.title}
          </h1>
          <div className="md:flex md:items-center md:justify-between p-2">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="title"
            >
              Title:
            </label>
            <input
              className={`w-96 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight ${
                edit
                  ? "focus:outline-none focus:bg-white focus:border-purple-500"
                  : "bg-gray-200"
              }`}
              autoFocus
              id="title"
              name="title"
              type="text"
              readOnly={!edit}
              onChange={handleChange}
              value={edit ? formData.title : recipe?.title}
            />
          </div>
          <div className="md:flex md:items-center md:justify-between p-2">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="category"
            >
              Category:
            </label>
            <input
              className={`w-96 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight ${
                edit
                  ? "focus:outline-none focus:bg-white focus:border-purple-500"
                  : "bg-gray-200"
              }`}
              id="category"
              name="category"
              type="text"
              readOnly={!edit}
              onChange={handleChange}
              value={edit ? formData.category : recipe?.category}
            />
          </div>
          <div className="md:flex md:items-center md:justify-between p-2">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="ingredients"
            >
              Ingredients:
            </label>
            <input
              className={`w-96 appearance-none border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight ${
                edit
                  ? "focus:outline-none focus:bg-white focus:border-purple-500"
                  : "bg-gray-200"
              }`}
              id="ingredients"
              name="ingredients"
              type="text"
              readOnly={!edit}
              onChange={handleChange}
              value={edit ? formData.ingredients : recipe?.ingredients}
            />
          </div>
          <div className="md:flex md:items-center md:justify-between p-2">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="meal_type"
            >
              Meal Type:
            </label>
            <input
              className={`w-96 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight ${
                edit
                  ? "focus:outline-none focus:bg-white focus:border-purple-500"
                  : "bg-gray-200"
              }`}
              id="meal_type"
              name="meal_type"
              type="text"
              readOnly={!edit}
              onChange={handleChange}
              value={edit ? formData.meal_type : recipe?.meal_type}
            />
          </div>
          {edit && (
            <div className="md:flex md:items-center md:justify-between p-2">
              <label
                className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0"
                htmlFor="image_url"
              >
                Image URL <br /> (use pics from
                <br />
                <a href="https://www.pexels.com/" target="_blank">
                  https://www.pexels.com/
                </a>
                ):
              </label>
              <input
                className={`w-96 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight ${
                  edit
                    ? "focus:outline-none focus:bg-white focus:border-purple-500"
                    : "bg-gray-200"
                }`}
                id="image_url"
                name="image_url"
                type="text"
                readOnly={!edit}
                onChange={handleChange}
                value={edit ? formData.image_url : recipe?.image_url}
              />
            </div>
          )}
          <div className="md:flex md:items-center md:justify-between p-2">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="updated_at"
            >
              Last Updated at:
            </label>
            <input
              className={`w-96 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight ${
                edit
                  ? "focus:outline-none focus:bg-white focus:border-purple-500"
                  : "bg-gray-200"
              }`}
              id="updated_at"
              name="updated_at"
              type="text"
              readOnly={!edit}
              value={secondsToDate(recipe?.updated_at?.seconds)}
            />
          </div>
          {edit && (
              <React.Fragment>
                <button className="confirm" type="submit">
                  Save Recipe
                </button>
                <button
                    className={edit ? "danger" : ""}
                    onClick={() => setEdit(!edit)}
                >
                  {edit ? "Cancel" : "Edit Recipe"}
                </button>
              </React.Fragment>
          )}
        </form>
      </div>
      {activeRecipe && (
          <div>
            {!edit && <button className="warning" onClick={() => setEdit(!edit)}>Edit Recipe</button>}
            {!edit && <button className="danger" onClick={handleDelete}>Delete Recipe</button>}
        </div>
      )}
    </React.Fragment>
  );
};

export default RecipeCard;
