"use client";
import React from "react";
import { useEffect, useState } from "react";
import db from "./firebaseConfig";
import {addDoc, getDocs, doc, updateDoc, collection, deleteDoc, serverTimestamp } from "firebase/firestore";

// Components
import RecipeList from "./RecipeList";
import RecipeSearch from "./RecipeSearch";
import AddRecipeForm from "./AddRecipeForm";
import RecipeCard from "./RecipeCard";

const colRef = collection(db.db, "recipes");

async function fetchRecipesFromFirestore() {
  try {
    const querySnapshot = await getDocs(colRef);
    const data = [];

    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    return data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
}

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [recipesSearch, setRecipesSearch] = useState([]);
  const [isRecipesOpen, setIsRecipesOpen] = useState(false);
  const [activeRecipe, setActiveRecipe] = useState({});
  const [showActiveRecipe, setShowActiveRecipe] = useState(false);
  const [showAddRecipeForm, setShowAddRecipeForm] = useState(false);

  const fetchRecipes = async () => {
    const data = await fetchRecipesFromFirestore();
    setRecipes(data);
  };

  useEffect(() => {
    fetchRecipes();
  }, [activeRecipe, showActiveRecipe, showAddRecipeForm]);

  const handleActiveRecipe = (recipe) => {
    setActiveRecipe(recipe);
  };

  useEffect(() => {
    setShowActiveRecipe(Object.keys(activeRecipe).length !== 0);
  }, [activeRecipe]);

  // Search function to look for recipe titles
  const handleSearch = async (title) => {
    if (title && title.length >= 3) {
      try {
        // Execute the query to get all documents
        const querySnapshot = await getDocs(colRef);

        // Process the results
        const searchRecipes = [];
        querySnapshot.forEach((doc) => {
          // Get data from each document
          const recipeData = doc.data();
          // Check if the title contains the search term
          if (recipeData.title.toLowerCase().includes(title.toLowerCase())) {
            // Add the document ID to the recipe data
            recipeData.id = doc.id;
            // Push the recipe data to the recipes array
            searchRecipes.push(recipeData);
          }
        });

        setRecipesSearch(searchRecipes);
      } catch (error) {
        console.error("Error searching for recipes:", error);
        return [];
      }
    } else {
      setRecipesSearch([]);
    }
  };

  const handleGoHome = () => {
    setRecipesSearch([]);
    setActiveRecipe([]);
    setIsRecipesOpen(false);
    setShowAddRecipeForm(false);
  };

  const openRecipeReports = () => {
    setRecipesSearch([]);
    setActiveRecipe([]);
    setIsRecipesOpen(true);
    setShowAddRecipeForm(false);
  };
  const openAddForm = () => {
    setRecipesSearch([]);
    setActiveRecipe([]);
    setIsRecipesOpen(false);
    setShowAddRecipeForm(true);
  };

  return (
    <React.Fragment>
      <nav>
        <img
          // src="/d424test/logo.png"
          src="/logo.png"
          alt="logo"
          width={200}
          height={200}
          onClick={handleGoHome}
        />
        <ul>
          <li onClick={openRecipeReports}>Recipes Report</li>
        </ul>
        <button onClick={openAddForm}>Add a recipe</button>
      </nav>
      {!isRecipesOpen && !showActiveRecipe && !showAddRecipeForm && (
        <div className="hero">
          <div className="hero-copy">
            <h1>Your Culinary Adventure Awaits</h1>
            <p>
              Search for a recipe. For example: Carbonara. After searching,
              clicking on one <br /> of the dropdown items. You will then be
              able to edit and delete a recipe
            </p>
          </div>
          <RecipeSearch
            onSearch={handleSearch}
            recipes={recipesSearch}
            setActiveRecipe={handleActiveRecipe}
          />
        </div>
      )}
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
      {isRecipesOpen && !showAddRecipeForm && (
        <React.Fragment>
          <h1 className="recipe-title">Recipes Report: </h1>
          <RecipeList recipes={recipes} />
        </React.Fragment>
      )}
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
