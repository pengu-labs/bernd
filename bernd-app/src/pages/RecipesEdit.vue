<template>
  <q-page padding>
    <h1 class="text-h4">
      {{ header }}
      <q-btn
        v-if="canRemove"
        flat
        color="primary"
        label="Remove"
        @click="remove()"
      />
    </h1>
    <q-stepper :flat="true" v-model="step" vertical color="primary" animated>
      <q-step
        :name="1"
        title="Name your recipe"
        icon="settings"
        :done="step > 1"
      >
        <q-input outlined v-model="recipe.name" label="Recipe Name" />

        <q-stepper-navigation>
          <q-btn @click="step = 2" color="primary" label="Continue" />
        </q-stepper-navigation>
      </q-step>

      <q-step :name="2" title="Add steps" icon="build" :done="step > 2">
        <StepList ref="stepList" :steps.sync="recipe.steps"></StepList>

        <q-stepper-navigation>
          <q-btn @click="$refs.stepList.addStep()" label="Add Step"></q-btn>
          <q-btn
            class="q-ml-sm"
            @click="step = 3"
            color="primary"
            label="Review"
          />
          <q-btn
            flat
            @click="step = 1"
            color="primary"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step :name="3" title="Review" icon="check">
        <RecipeOverview :recipe="recipe"></RecipeOverview>

        <q-stepper-navigation>
          <q-btn color="primary" label="Looks good" @click="submit()" />
          <q-btn
            flat
            @click="step = 2"
            color="primary"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import {
  Recipe,
  addRecipe,
  getRecipe,
  updateRecipe,
  removeRecipe
} from 'src/domain/api';
import RecipeOverview from '../components/RecipeOverview.vue';
import StepList from '../components/StepList.vue';

@Component({
  components: { StepList, RecipeOverview }
})
export default class RecipesEdit extends Vue {
  recipe: Recipe = { name: '', steps: [] };
  step = 1;

  get canRemove(): boolean {
    return this.recipe._id != null;
  }

  get header(): string {
    return this.$route.meta.new ? 'Create new Recipe' : 'Edit Recipe';
  }

  async created() {
    const id = this.$route.params.id;
    if (id != null) {
      this.recipe = await getRecipe(id);
    }
  }

  async remove() {
    const result = await removeRecipe(this.recipe._id as string);
    if (result != null) {
      this.$q.notify({
        color: 'green',
        textColor: 'white',
        icon: 'done',
        message: 'Recipe removed!'
      });
      await this.$router.push('/recipes');
    }
  }

  async submit() {
    const result =
      this.recipe._id == null
        ? await addRecipe(this.recipe)
        : await updateRecipe(this.recipe);

    if (result != null) {
      this.$q.notify({
        color: 'green',
        textColor: 'white',
        icon: 'done',
        message: 'Recipe saved!'
      });

      await this.$router.push('/recipes');
    }
  }
}
</script>
