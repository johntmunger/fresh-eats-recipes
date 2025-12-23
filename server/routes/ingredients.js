import express from 'express';
import { getDatabase } from '../db/init.js';

const router = express.Router();

/**
 * GET /api/ingredients
 * Fetch all ingredients
 */
router.get('/', (req, res) => {
  try {
    const db = getDatabase();
    const ingredients = db.prepare('SELECT * FROM ingredients ORDER BY created_at DESC').all();
    
    res.json(ingredients);
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    res.status(500).json({ error: 'Failed to fetch ingredients' });
  }
});

/**
 * POST /api/ingredients
 * Create a new ingredient
 */
router.post('/', (req, res) => {
  try {
    const { name } = req.body;
    
    // Validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({ error: 'Ingredient name is required' });
    }
    
    const db = getDatabase();
    const stmt = db.prepare('INSERT INTO ingredients (name) VALUES (?)');
    const result = stmt.run(name.trim());
    
    // Fetch the newly created ingredient
    const newIngredient = db.prepare('SELECT * FROM ingredients WHERE id = ?').get(result.lastInsertRowid);
    
    res.status(201).json(newIngredient);
  } catch (error) {
    console.error('Error creating ingredient:', error);
    res.status(500).json({ error: 'Failed to create ingredient' });
  }
});

/**
 * PUT /api/ingredients/:id
 * Update an ingredient name
 */
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    const db = getDatabase();
    
    // Check if ingredient exists
    const existingIngredient = db.prepare('SELECT * FROM ingredients WHERE id = ?').get(id);
    if (!existingIngredient) {
      return res.status(404).json({ error: 'Ingredient not found' });
    }
    
    // Validate name
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({ error: 'Invalid ingredient name' });
    }
    
    const stmt = db.prepare('UPDATE ingredients SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
    stmt.run(name.trim(), id);
    
    // Fetch updated ingredient
    const updatedIngredient = db.prepare('SELECT * FROM ingredients WHERE id = ?').get(id);
    
    res.json(updatedIngredient);
  } catch (error) {
    console.error('Error updating ingredient:', error);
    res.status(500).json({ error: 'Failed to update ingredient' });
  }
});

/**
 * DELETE /api/ingredients/:id
 * Delete an ingredient
 */
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    const db = getDatabase();
    
    // Check if ingredient exists
    const existingIngredient = db.prepare('SELECT * FROM ingredients WHERE id = ?').get(id);
    if (!existingIngredient) {
      return res.status(404).json({ error: 'Ingredient not found' });
    }
    
    const stmt = db.prepare('DELETE FROM ingredients WHERE id = ?');
    stmt.run(id);
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting ingredient:', error);
    res.status(500).json({ error: 'Failed to delete ingredient' });
  }
});

export default router;

