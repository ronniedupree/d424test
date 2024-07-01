import React from 'react';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import RecipeListData from './recipe-list-data';

describe('RecipeListData component', () => {
  test('Recipe List data loads correctly', () => {
    const mockRecipe = {
      id: '3',
      title: 'Old Recipe',
      category: 'Some Category:',
      image_url: 'newPic.png',
      meal_type: 'Fake Meal Type',
      ingredients: ['Water', 'Pasta'],
      created_at: { seconds: 1325476980 },
    };

    render(<RecipeListData recipe={mockRecipe} />);

    expect(screen.getByText('Old Recipe')).toBeInTheDocument();
    expect(screen.getByText('Some Category:')).toBeInTheDocument();
    expect(screen.getByText('Date Created:')).toBeInTheDocument();
    expect(screen.getByText('01/01/2012, 08:03:00 PM')).toBeInTheDocument();
    expect(screen.getByText('Water')).toBeInTheDocument();
    expect(screen.getByText('Pasta')).toBeInTheDocument();
    expect(screen.getByText('Meal Type:')).toBeInTheDocument();
    expect(screen.getByText('Fake Meal Type')).toBeInTheDocument();
  });
});
