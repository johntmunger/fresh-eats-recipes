import type { Ingredient, Recipe } from "../types/ingredient";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Generic fetch wrapper with error handling
 */
async function fetchWithErrorHandling<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
      throw new ApiError(response.status, errorData.error || `HTTP ${response.status}`);
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return null as T;
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    // Network error or other issues
    throw new ApiError(0, error instanceof Error ? error.message : "Network error");
  }
}

/**
 * Fetch all ingredients from the server
 */
export async function fetchIngredients(): Promise<Ingredient[]> {
  return fetchWithErrorHandling<Ingredient[]>(`${API_BASE_URL}/ingredients`);
}

/**
 * Create a new ingredient on the server
 */
export async function createIngredient(name: string): Promise<Ingredient> {
  return fetchWithErrorHandling<Ingredient>(`${API_BASE_URL}/ingredients`, {
    method: "POST",
    body: JSON.stringify({ name }),
  });
}

/**
 * Update an ingredient on the server
 */
export async function updateIngredient(id: number, name: string): Promise<Ingredient> {
  return fetchWithErrorHandling<Ingredient>(`${API_BASE_URL}/ingredients/${id}`, {
    method: "PUT",
    body: JSON.stringify({ name }),
  });
}

/**
 * Delete an ingredient from the server
 */
export async function deleteIngredient(id: number): Promise<void> {
  return fetchWithErrorHandling<void>(`${API_BASE_URL}/ingredients/${id}`, {
    method: "DELETE",
  });
}

/**
 * Fetch all recipes from the server
 */
export async function fetchRecipes(): Promise<Recipe[]> {
  return fetchWithErrorHandling<Recipe[]>(`${API_BASE_URL}/recipes`);
}

/**
 * Create a new recipe on the server
 */
export async function createRecipe(name: string, ingredients: string[]): Promise<Recipe> {
  return fetchWithErrorHandling<Recipe>(`${API_BASE_URL}/recipes`, {
    method: "POST",
    body: JSON.stringify({ name, ingredients }),
  });
}

/**
 * Update a recipe name on the server
 */
export async function updateRecipe(id: number, name: string): Promise<Recipe> {
  return fetchWithErrorHandling<Recipe>(`${API_BASE_URL}/recipes/${id}`, {
    method: "PUT",
    body: JSON.stringify({ name }),
  });
}

/**
 * Delete a recipe from the server
 */
export async function deleteRecipe(id: number): Promise<void> {
  return fetchWithErrorHandling<void>(`${API_BASE_URL}/recipes/${id}`, {
    method: "DELETE",
  });
}

/**
 * Check server health
 */
export async function checkHealth(): Promise<{ status: string; message: string }> {
  return fetchWithErrorHandling(`${API_BASE_URL}/health`);
}
