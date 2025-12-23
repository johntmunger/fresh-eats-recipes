import express from 'express';
import { getDatabase } from '../db/init.js';

const router = express.Router();

/**
 * GET /api/recipes
 * Fetch all saved recipes with their ingredients
 */
router.get('/', (req, res) => {
  try {
    const db = getDatabase();
    const recipes = db.prepare('SELECT * FROM recipes ORDER BY created_at DESC').all();
    
    // Fetch ingredients for each recipe
    const recipesWithIngredients = recipes.map(recipe => {
      const ingredients = db.prepare('SELECT ingredient_name FROM recipe_ingredients WHERE recipe_id = ?').all(recipe.id);
      return {
        ...recipe,
        ingredients: ingredients.map(ing => ing.ingredient_name)
      };
    });
    
    res.json(recipesWithIngredients);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

/**
 * POST /api/recipes
 * Create a new recipe with ingredients
 */
router.post('/', (req, res) => {
  try {
    const { name, ingredients } = req.body;
    
    // Validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({ error: 'Recipe name is required' });
    }
    
    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ error: 'At least one ingredient is required' });
    }
    
    const db = getDatabase();
    
    // Check for duplicate recipe (same ingredients)
    const existingRecipes = db.prepare('SELECT * FROM recipes').all();
    const sortedNewIngredients = ingredients.map(i => i.toLowerCase().trim()).sort();
    
    for (const recipe of existingRecipes) {
      const recipeIngredients = db.prepare('SELECT ingredient_name FROM recipe_ingredients WHERE recipe_id = ?').all(recipe.id);
      const sortedRecipeIngredients = recipeIngredients.map(ing => ing.ingredient_name.toLowerCase().trim()).sort();
      
      // Check if ingredients match
      if (sortedNewIngredients.length === sortedRecipeIngredients.length &&
          sortedNewIngredients.every((ing, idx) => ing === sortedRecipeIngredients[idx])) {
        return res.status(409).json({ error: 'A recipe with these ingredients already exists' });
      }
    }
    
    // Insert recipe
    const recipeStmt = db.prepare('INSERT INTO recipes (name) VALUES (?)');
    const result = recipeStmt.run(name.trim());
    const recipeId = result.lastInsertRowid;
    
    // Insert ingredients
    const ingredientStmt = db.prepare('INSERT INTO recipe_ingredients (recipe_id, ingredient_name) VALUES (?, ?)');
    for (const ingredient of ingredients) {
      if (ingredient && ingredient.trim()) {
        ingredientStmt.run(recipeId, ingredient.trim());
      }
    }
    
    // Fetch the newly created recipe with ingredients
    const newRecipe = db.prepare('SELECT * FROM recipes WHERE id = ?').get(recipeId);
    const recipeIngredients = db.prepare('SELECT ingredient_name FROM recipe_ingredients WHERE recipe_id = ?').all(recipeId);
    
    res.status(201).json({
      ...newRecipe,
      ingredients: recipeIngredients.map(ing => ing.ingredient_name)
    });
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ error: 'Failed to create recipe' });
  }
});

/**
 * PUT /api/recipes/:id
 * Update a recipe name and/or ingredients
 */
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { name, ingredients } = req.body;
    
    const db = getDatabase();
    
    // Check if recipe exists
    const existingRecipe = db.prepare('SELECT * FROM recipes WHERE id = ?').get(id);
    if (!existingRecipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    
    // Validate name if provided
    if (name && (typeof name !== 'string' || name.trim().length === 0)) {
      return res.status(400).json({ error: 'Invalid recipe name' });
    }
    
    // Update recipe name if provided
    if (name) {
      const stmt = db.prepare('UPDATE recipes SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
      stmt.run(name.trim(), id);
    }
    
    // Update ingredients if provided
    if (ingredients && Array.isArray(ingredients)) {
      // Delete old ingredients
      db.prepare('DELETE FROM recipe_ingredients WHERE recipe_id = ?').run(id);
      
      // Insert new ingredients
      const ingredientStmt = db.prepare('INSERT INTO recipe_ingredients (recipe_id, ingredient_name) VALUES (?, ?)');
      for (const ingredient of ingredients) {
        if (ingredient && ingredient.trim()) {
          ingredientStmt.run(id, ingredient.trim());
        }
      }
      
      // Update timestamp
      db.prepare('UPDATE recipes SET updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(id);
    }
    
    // Fetch updated recipe with ingredients
    const updatedRecipe = db.prepare('SELECT * FROM recipes WHERE id = ?').get(id);
    const recipeIngredients = db.prepare('SELECT ingredient_name FROM recipe_ingredients WHERE recipe_id = ?').all(id);
    
    res.json({
      ...updatedRecipe,
      ingredients: recipeIngredients.map(ing => ing.ingredient_name)
    });
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ error: 'Failed to update recipe' });
  }
});

/**
 * DELETE /api/recipes/:id
 * Delete a recipe (cascade deletes ingredients)
 */
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    const db = getDatabase();
    
    // Check if recipe exists
    const existingRecipe = db.prepare('SELECT * FROM recipes WHERE id = ?').get(id);
    if (!existingRecipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    
    const stmt = db.prepare('DELETE FROM recipes WHERE id = ?');
    stmt.run(id);
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ error: 'Failed to delete recipe' });
  }
});

export default router;

