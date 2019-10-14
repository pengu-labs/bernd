<template>
  <q-list bordered separator>
    <q-expansion-item
      expand-separator
      v-for="(step, index) of list"
      :key="index"
      :label="stepLabel(step, index)"
      :default-opened="true"
    >
      <div class="q-pa-md">
        <q-select
          outlined
          v-model="step.type"
          :options="typeOptions"
          @input="update()"
          emit-value
          label="Type"
        />
        <IngredientList
          ref="ingredientList"
          :ingredients.sync="step.sources"
        ></IngredientList>
        <q-btn
          flat
          @click="$refs.ingredientList[index].addSource()"
          color="primary"
          label="Add Ingredient"
        />
        <q-btn
          flat
          @click="removeStep(step)"
          color="primary"
          label="Remove Step"
        />
      </div>
    </q-expansion-item>
    <q-item v-if="!list.length" clickable @click="addStep()">
      <q-item-section>Add your first step</q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import {
  newRecipeStep,
  RecipeStep,
  recipeStepTypeLabel,
  stepTypeOptions
} from 'src/domain/api';
import IngredientList from './IngredientList.vue';

@Component({ components: { IngredientList } })
export default class StepList extends Vue {
  @Prop()
  steps?: RecipeStep[];

  typeOptions = stepTypeOptions;
  list: RecipeStep[] = this.steps || [];

  addStep() {
    this.list = [...this.list, newRecipeStep(this.list)];
    this.update();
  }

  removeStep(step: RecipeStep) {
    Vue.delete(this.list, step.index);
    this.update();
  }

  stepLabel(step: RecipeStep, index: number): string {
    return `${index + 1} - ${recipeStepTypeLabel(step.type)}`;
  }

  update() {
    this.$emit('update:steps', this.list);
  }
}
</script>
