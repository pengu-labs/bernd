<template>
  <div class="q-mt-lg q-gutter-md flex">
    <q-card
      v-for="recipe of recipes.data"
      :key="recipe._id"
      class="recipe-entry cursor-pointer"
      @click="$router.push({ name: 'recipe', params: { id: recipe._id } })"
    >
      <q-item>
        <q-item-section>
          <q-item-label>{{ recipe.name }}</q-item-label>
        </q-item-section>
      </q-item>

      <img src="statics/default-recipe.jpg" />
    </q-card>
  </div>
</template>

<style lang="scss">
.recipe-entry {
  max-width: 15em;
  flex: 1;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import { Recipe, PaginatedResult } from 'src/domain/api';

@Component
export default class RecipeList extends Vue {
  @Prop()
  recipes?: PaginatedResult<Recipe>;
}
</script>
