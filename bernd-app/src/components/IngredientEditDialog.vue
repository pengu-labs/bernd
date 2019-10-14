<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="text-h6">Ingredient</div>
      </q-card-section>
      <q-card-section>
        <q-form class="q-gutter-md" ref="form">
          <q-input
            outlined
            v-model="ingredient.name"
            label="Name"
            :rules="[Validator.required]"
          />
          <q-select
            outlined
            v-model="ingredient.type"
            :options="typeOptions"
            emit-value
            label="Type"
            :rules="[Validator.required]"
          />
          <q-input
            outlined
            type="number"
            v-model="ingredient.quantity"
            label="Quantity"
            :rules="[Validator.required]"
          />
          <q-select
            outlined
            v-model="ingredient.unit"
            :options="unitOptions"
            emit-value
            label="Unit"
            :rules="[Validator.required]"
          />
        </q-form>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat color="primary" label="Cancel" @click="onCancelClick" />
        <q-btn
          v-if="editMode"
          flat
          color="primary"
          label="Remove"
          @click="onRemove"
        />
        <q-btn flat color="primary" label="Save" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { QDialog, QForm } from 'quasar';

import {
  RecipeIngredient,
  RecipeIngredientType,
  recipeIngredientTypeOptions,
  unitOptions
} from 'src/domain/api';
import { Validator } from 'src/domain/form';

@Component
export default class IngredientEditDialog extends Vue {
  @Prop({
    default: () => ({
      type: RecipeIngredientType.INGREDIENT
    })
  })
  ingredient?: RecipeIngredient;
  @Prop()
  editMode?: boolean;

  typeOptions = recipeIngredientTypeOptions;
  unitOptions = unitOptions;
  Validator = Validator;

  show() {
    (this.$refs.dialog as QDialog).show();
  }

  hide() {
    (this.$refs.dialog as QDialog).hide();
  }

  onDialogHide() {
    this.$emit('hide');
  }

  onOKClick() {
    const form = this.$refs.form as QForm;
    form.validate().then(success => {
      if (success) {
        this.$emit('ok', this.ingredient);
        this.hide();
      } else {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          message: 'Invalid input!'
        });
      }
    });
  }

  onRemove() {
    this.$emit('ok');
    this.hide();
  }

  onCancelClick() {
    // we just need to hide dialog
    this.hide();
  }
}
</script>
