export interface Ingredient {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  created_at?: string;
  updated_at?: string;
}

export type FilterType = "all" | "saved";

