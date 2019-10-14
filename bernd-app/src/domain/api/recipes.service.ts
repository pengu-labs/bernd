import { Notify } from 'quasar';

import client from 'src/boot/feathers';
import { Recipe } from './recipe.interface';
import { PaginatedResult } from './paginated-result.interface';

export function addRecipe(recipe: Recipe) {
  try {
    return client.service('recipes').create(recipe);
  } catch {
    Notify.create({
      color: 'red-5',
      textColor: 'white',
      icon: 'error',
      message: 'Could not create recipe!'
    });
  }
}

export function updateRecipe(recipe: Recipe) {
  try {
    return client.service('recipes').update(recipe._id, recipe);
  } catch {
    Notify.create({
      color: 'red-5',
      textColor: 'white',
      icon: 'error',
      message: 'Could not update recipe!'
    });
  }
}

export function getRecipe(id: string) {
  try {
    return client.service('recipes').get(id);
  } catch {
    Notify.create({
      color: 'red-5',
      textColor: 'white',
      icon: 'error',
      message: 'Could not find recipe!'
    });
  }
}

export function removeRecipe(id: string) {
  try {
    return client.service('recipes').remove(id);
  } catch {
    Notify.create({
      color: 'red-5',
      textColor: 'white',
      icon: 'error',
      message: 'Could not remove recipe!'
    });
  }
}

export function listRecipes(): Promise<PaginatedResult<Recipe>> {
  try {
    return client.service('recipes').find();
  } catch {
    Notify.create({
      color: 'red-5',
      textColor: 'white',
      icon: 'error',
      message: 'Could not fetch recipes!'
    });
    return Promise.resolve({ data: [], limit: 0, skip: 0, total: 0 });
  }
}
