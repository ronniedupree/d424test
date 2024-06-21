// RecipeCard.test.js
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { expect, describe, test } from '@jest/globals';

import RecipeCard from "./RecipeCard";

describe("RecipeCard component", () => {
  const mockRecipe = {
    id: "1",
    title: "Test Recipe",
    category: "Test Category",
    image_url: "test_image.jpg",
    meal_type: "Test Meal Type",
    ingredients: ["Ingredient 1", "Ingredient 2"],
    updated_at: { seconds: 1615475660 },
  };

  test("renders recipe details correctly", () => {
    render(<RecipeCard recipe={mockRecipe} />);
    expect(screen.getByDisplayValue("Test Recipe")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Ingredient 1,Ingredient 2")).toBeInTheDocument();
  });

  test("allows editing recipe details", () => {
    render(<RecipeCard recipe={mockRecipe} />);
    fireEvent.click(screen.getByRole("button", { name: "Edit" }));
    fireEvent.change(screen.getByLabelText("Title:"), {
      target: { value: "New Title" },
    });
    fireEvent.change(screen.getByLabelText("Category:"), {
      target: { value: "New Category" },
    });
    fireEvent.click(screen.getByText("Save"));
    expect(screen.getByDisplayValue("New Title")).toBeInTheDocument();
    expect(screen.getByDisplayValue("New Category")).toBeInTheDocument();
  });

});
