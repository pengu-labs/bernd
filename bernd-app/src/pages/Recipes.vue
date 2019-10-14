<template>
  <q-page class="flex flex-center column">
    <h1 class="text-h4">Recipes</h1>
    <q-btn label="New Recipe" type="submit" color="primary" to="recipes/new" />
    <RecipeList :recipes="recipes"></RecipeList>
  </q-page>
</template>

<style lang="scss"></style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import RecipeList from '../components/RecipeList.vue';
import { listRecipes, PaginatedResult, Recipe } from 'src/domain/api';

@Component({
  components: { RecipeList }
})
export default class Recipes extends Vue {
  recipes: PaginatedResult<Recipe> = { data: [] };

  async created() {
    this.recipes = await listRecipes();
  }
}
</script>
