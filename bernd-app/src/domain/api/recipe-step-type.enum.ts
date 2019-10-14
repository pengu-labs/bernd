export enum RecipeStepType {
  MIX = 'MIX',
  WAIT = 'WAIT',
  BAKE = 'BAKE'
}

export function recipeStepTypeLabel(type: RecipeStepType): string {
  switch (type) {
    case RecipeStepType.MIX:
      return 'Mix';
    case RecipeStepType.WAIT:
      return 'Wait';
    case RecipeStepType.BAKE:
      return 'Bake';
    default:
      return 'Unknown';
  }
}

export const stepTypeOptions = [
  { value: RecipeStepType.MIX, label: recipeStepTypeLabel(RecipeStepType.MIX) },
  {
    value: RecipeStepType.WAIT,
    label: recipeStepTypeLabel(RecipeStepType.WAIT)
  },
  {
    value: RecipeStepType.BAKE,
    label: recipeStepTypeLabel(RecipeStepType.BAKE)
  }
];
