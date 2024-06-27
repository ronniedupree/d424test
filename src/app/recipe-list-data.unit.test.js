import React from 'react';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import RecipeListData from './recipe-list-data';

describe('RecipeListData component', () => {
  test('renders recipe details correctly', () => {
    // Mock recipe data
    const mockRecipe = {
      id: '1',
      title: 'Mock Recipe',
      category: 'Mock Category',
      image_url: 'https://example.com/mock-image.jpg',
      meal_type: 'Mock Meal Type',
      ingredients: ['Ingredient 1', 'Ingredient 2'],
      created_at: { seconds: 1325476980 },
    };

    // Render the component with mock recipe data
    render(<RecipeListData recipe={mockRecipe} />);

    // Assert rendered text content
    expect(screen.getByText('Mock Recipe')).toBeInTheDocument();
    expect(screen.getByText('Category:')).toBeInTheDocument();
    expect(screen.getByText('Mock Category')).toBeInTheDocument();
    expect(screen.getByText('Date Created:')).toBeInTheDocument();
    expect(screen.getByText('01/01/2012, 08:03:00 PM')).toBeInTheDocument();
    expect(screen.getByText('Ingredients:')).toBeInTheDocument();
    expect(screen.getByText('Ingredient 1')).toBeInTheDocument();
    expect(screen.getByText('Ingredient 2')).toBeInTheDocument();
    expect(screen.getByText('Meal Type:')).toBeInTheDocument();
    expect(screen.getByText('Mock Meal Type')).toBeInTheDocument();
  });
});
