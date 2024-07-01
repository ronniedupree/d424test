// Import necessary modules and hooks from React and Firebase
"use client";
import React, { useEffect, useState } from "react";
import db from "./firebaseConfig"; // Import Firebase configuration
import { addDoc, getDocs, doc, updateDoc, collection, deleteDoc, serverTimestamp } from "firebase/firestore"; // Import Firestore functions

// Import custom components
import RecipeList from "./recipe-list";
import RecipeSearch from "./recipe-search";
import AddRecipeForm from "./add-recipe-form";
import RecipeCard from "./recipe-card";

// Reference to the "recipes" collection in Firestore
const colRef = collection(db.db, "recipes");

// Function to fetch data from Firestore
async function fetchDataFromFirestore() {
  try {
    // Get all documents from the "recipes" collection
    const querySnapshot = await getDocs(colRef);
    const data = [];

    // Iterate through each document and add it to the data array
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    // Return the array of recipe data
    return data;
  } catch (error) {
    // Log and re-throw any errors encountered during fetching
    console.error("Error fetching recipes:", error);
    throw error;
  }
}

// Main component function
export default function Home() {
  // State hooks for managing various states
  const [recipes, setRecipes] = useState([]); // All recipes
  const [recipesSearch, setRecipesSearch] = useState([]); // Searched recipes
  const [isRecipesOpen, setIsRecipesOpen] = useState(false); // Whether the recipe list is open
  const [activeRecipe, setActiveRecipe] = useState({}); // Active selected recipe
  const [showActiveRecipe, setShowActiveRecipe] = useState(false); // Whether to show the active recipe card
  const [showAddRecipeForm, setShowAddRecipeForm] = useState(false); // Whether to show the add recipe form

  // Function to fetch and set recipe data
  const fetchRecipes = async () => {
    // Fetch data from Firestore
    const data = await fetchDataFromFirestore();
    // Update state with fetched recipes
    setRecipes(data);
  };

  // useEffect hook to fetch recipes whenever certain states change
  useEffect(() => {
    fetchRecipes();
  }, [activeRecipe, showActiveRecipe, showAddRecipeForm]);

  // Function to handle selection of an active recipe
  const handleActiveRecipe = (recipe) => {
    setActiveRecipe(recipe);
  };

  // useEffect hook to check if an active recipe is selected
  useEffect(() => {
    setShowActiveRecipe(Object.keys(activeRecipe).length !== 0);
  }, [activeRecipe]);

  // Function to handle search based on title
  const handleSearch = async (title) => {
    if (title && title.length >= 3) {
      try {
        // Get all documents from the "recipes" collection
        const querySnapshot = await getDocs(colRef);

        // Array to store search results
        const searchRecipes = [];
        querySnapshot.forEach((doc) => {
          const recipeData = doc.data();
          // Include recipe if title contains the search term
          if (recipeData.title.toLowerCase().includes(title.toLowerCase())) {
            recipeData.id = doc.id; // Add document ID to recipe data
            searchRecipes.push(recipeData); // Add to search results
          }
        });

        setRecipesSearch(searchRecipes); // Update search results state
      } catch (error) {
        console.error("Error searching for recipes:", error);
        return [];
      }
    } else {
      setRecipesSearch([]); // Clear search results if the search term is too short
    }
  };

  // Function to reset states and go to home view
  const handleGoHome = () => {
    setRecipesSearch([]);
    setActiveRecipe({});
    setIsRecipesOpen(false);
    setShowAddRecipeForm(false);
  };

  // Function to open the recipe list view
  const openRecipeList = () => {
    setRecipesSearch([]);
    setActiveRecipe({});
    setIsRecipesOpen(true);
    setShowAddRecipeForm(false);
  };

  // Function to open the add recipe form view
  const openAddForm = () => {
    setRecipesSearch([]);
    setActiveRecipe({});
    setIsRecipesOpen(false);
    setShowAddRecipeForm(true);
  };

  // JSX content of the component
  return (
      <React.Fragment>
        <nav className="sticky">
          <ul>
            {/* Navigation item to go home */}
            <li onClick={handleGoHome}>Home</li>
          </ul>
          <ul>
            {/* Navigation item to open recipe list */}
            <li onClick={openRecipeList}>Recipes List</li>
          </ul>
          {/* Button to open add recipe form */}
          <button onClick={openAddForm}>Add Recipe</button>
        </nav>
        {/* Home view with hero section and recipe search */}
        {!isRecipesOpen && !showActiveRecipe && !showAddRecipeForm && (
            <div className="hero">
              <div className="hero-copy">
                <h1>Save your favorite recipes!</h1>
                <p>
                  Search for a recipe. For example: Chocolate Chip Cookies. After searching,
                  clicking on one <br/> of the dropdown items. You will then be
                  able to edit and delete a recipe.
                  <br/>
                  <br/>
                  You can view a list of all saved recipes in the Recipe List.
                </p>
              </div>
              <RecipeSearch
                  onSearch={handleSearch}
                  recipes={recipesSearch}
                  setActiveRecipe={handleActiveRecipe}
              />
            </div>
        )}
        {/* Recipe card view */}
        {!isRecipesOpen && showActiveRecipe && (
            <div className={`recipe-card ${showActiveRecipe ? "active" : ""}`}>
              <RecipeCard
                  colRef={colRef}
                  doc={doc}
                  updateDoc={updateDoc}
                  recipe={activeRecipe}
                  activeRecipe={showActiveRecipe}
                  handleGoHome={handleGoHome}
                  serverTimestamp={serverTimestamp}
                  deleteDoc={deleteDoc}
              />
            </div>
        )}
        {/* Recipe list view */}
        {isRecipesOpen && !showAddRecipeForm && (
            <React.Fragment>
              <h1 className="recipe-title">Recipes List</h1>
              <RecipeList recipes={recipes}/>
            </React.Fragment>
        )}
        {/* Add recipe form view */}
        {showAddRecipeForm && !isRecipesOpen && !showActiveRecipe && (
            <AddRecipeForm
                addDoc={addDoc}
                colRef={colRef}
                serverTimestamp={serverTimestamp}
            />
        )}
      </React.Fragment>
  );
}
