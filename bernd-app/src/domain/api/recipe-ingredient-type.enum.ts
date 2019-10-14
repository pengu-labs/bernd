export enum RecipeIngredientType {
  DOUGH = 'DOUGH',
  INGREDIENT = 'INGREDIENT',
  PASTRY = 'PASTRY'
}

export function recipeIngredientTypeLabel(type: RecipeIngredientType): string {
  switch (type) {
    case RecipeIngredientType.INGREDIENT:
      return 'Ingredient';
    case RecipeIngredientType.DOUGH:
      return 'Dough';
    case RecipeIngredientType.PASTRY:
      return 'Pastry';
  }
}

export const recipeIngredientTypeOptions = [
  { label: 'Dough', value: RecipeIngredientType.DOUGH },
  { label: 'Ingredient', value: RecipeIngredientType.INGREDIENT },
  { label: 'Pastry', value: RecipeIngredientType.PASTRY }
];
