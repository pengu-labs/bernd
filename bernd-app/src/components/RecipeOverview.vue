<template>
  <q-list dense bordered padding>
    <q-item-label header>Ingredients</q-item-label>
    <q-item v-for="(ingredient, index) of ingredients" :key="index">
      <q-item-section>
        {{ ingredient.quantity }} {{ unitLabel(ingredient.unit) }}
        {{ ingredient.name }}
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import { Recipe, RecipeIngredient, unitLabel } from 'src/domain/api';

@Component
export default class RecipeOverview extends Vue {
  @Prop()
  recipe?: Recipe;

  unitLabel = unitLabel;

  get ingredients(): RecipeIngredient[] {
    if (this.recipe) {
      return this.recipe.steps.reduce(
        (acc, step) => {
          return [...acc, ...step.sources];
        },
        [] as RecipeIngredient[]
      );
    }

    return [];
  }
}
</script>
