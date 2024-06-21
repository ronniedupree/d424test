import React from 'react';
import RecipeReport from './RecipeReport';
import "@testing-library/jest-dom";
import { render, screen } from '@testing-library/react';
import {expect, describe, test} from '@jest/globals';


describe('RecipeReport component', () => {
  test('renders recipe details correctly', () => {
    // Mock recipe data
    const mockRecipe = {
      id: '1',
      title: 'Mock Recipe',
      category: 'Mock Category',
      image_url: 'https://example.com/mock-image.jpg',
      meal_type: 'Mock Meal Type',
      ingredients: ['Ingredient 1', 'Ingredient 2'],
      created_at: { seconds: 1234567890 }, 
    };

    // Render the component with mock recipe data
    render(<RecipeReport recipe={mockRecipe} />);

    // Assert rendered text content
    expect(screen.getByText('Title:')).toBeInTheDocument();
    expect(screen.getByText('Mock Recipe')).toBeInTheDocument();
    expect(screen.getByText('Category:')).toBeInTheDocument();
    expect(screen.getByText('Mock Category')).toBeInTheDocument();
    expect(screen.getByText('Date Created:')).toBeInTheDocument();
    expect(screen.getByText('Ingredients:')).toBeInTheDocument();
    expect(screen.getByText('Ingredient 1')).toBeInTheDocument();
    expect(screen.getByText('Ingredient 2')).toBeInTheDocument();
    expect(screen.getByText('Meal Type:')).toBeInTheDocument();
    expect(screen.getByText('Mock Meal Type')).toBeInTheDocument();
  });
});
