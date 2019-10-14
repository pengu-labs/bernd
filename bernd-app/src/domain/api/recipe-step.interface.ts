import { RecipeIngredient } from './recipe-ingredient.interface';
import { RecipeStepType } from './recipe-step-type.enum';

export interface RecipeStep {
  index: number;
  type: RecipeStepType;
  description?: string;
  sources: RecipeIngredient[];
  artifacts: RecipeIngredient[];
}

export function newRecipeStep(steps: RecipeStep[]) {
  return {
    index: steps.length,
    type: RecipeStepType.MIX,
    sources: [],
    artifacts: []
  };
}
