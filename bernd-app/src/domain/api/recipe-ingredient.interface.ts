import { Unit } from './unit.enum';
import { RecipeIngredientType } from './recipe-ingredient-type.enum';

export interface RecipeIngredient {
  name: string;
  type: RecipeIngredientType;
  unit: Unit;
  quantity: number;
}
