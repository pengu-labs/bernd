<template>
  <q-list class="q-mt-md">
    <q-item-label header>Ingredients</q-item-label>
    <q-item
      v-for="(ingredient, index) of list"
      :key="ingredient.name"
      clickable
      @click="editSource(ingredient, index)"
    >
      <q-item-section>{{ ingredient.name }}</q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import { RecipeIngredient } from 'src/domain/api';
import IngredientEditDialog from './IngredientEditDialog.vue';

@Component
export default class IngredientList extends Vue {
  @Prop({ default: [] })
  ingredients?: RecipeIngredient[];

  list?: RecipeIngredient[] = this.ingredients;

  addSource() {
    this.$q
      .dialog({ component: IngredientEditDialog, editMode: false } as any)
      .onOk((ingredient: RecipeIngredient) => {
        if (this.list) {
          this.list = [...this.list, ingredient];
          this.$emit('update:ingredients', this.list);
        }
      });
  }

  editSource(source: RecipeIngredient, index: number) {
    this.$q
      .dialog({
        component: IngredientEditDialog,
        editMode: true,
        ingredient: { ...source }
      } as any)
      .onOk((ingredient: RecipeIngredient) => {
        if (this.list == null) {
          return;
        }

        if (ingredient == null) {
          Vue.delete(this.list, index);
        } else {
          this.list = this.list.map((source, i) =>
            i === index ? ingredient : source
          );
        }
        this.$emit('update:ingredients', this.list);
      });
  }
}
</script>
