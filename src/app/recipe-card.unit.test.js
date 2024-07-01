import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RecipeCard from "./recipe-card";
import { describe, test } from "@jest/globals";
import expect from "expect";

describe("RecipeCard component", () => {
  const mockRecipe = {
    id: "1",
    title: "New Recipe",
    category: "Test Category",
    image_url: "pic.png",
    meal_type: "Test Meal Type",
    ingredients: ["Potato", "Apple"],
    updated_at: { seconds: 1325476980 },
  };

  test("Recipe Details load correctly", () => {
    render(<RecipeCard recipe={mockRecipe} />);

    expect(screen.getByDisplayValue("New Recipe")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Potato,Apple")).toBeInTheDocument();
    expect(screen.getByDisplayValue("01/01/2012, 08:03:00 PM")).toBeInTheDocument();
  });

  test("Editing Recipe Details is enabled", () => {
    render(<RecipeCard recipe={mockRecipe} />);

    fireEvent.click(screen.getByRole("button", { name: "Edit Recipe" }));
    fireEvent.change(screen.getByLabelText("Title:"), { target: { value: "New Title" },});
    fireEvent.change(screen.getByLabelText("Category:"), { target: { value: "New Category" },});
    fireEvent.click(screen.getByText("Save Recipe"));
    expect(screen.getByDisplayValue("New Title")).toBeInTheDocument();
    expect(screen.getByDisplayValue("New Category")).toBeInTheDocument();
  });

});
