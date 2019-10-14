import { RecipeStep } from './recipe-step.interface';

export interface Recipe {
  _id?: string;
  name: string;
  steps: RecipeStep[];
}
