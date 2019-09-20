<template>
  <q-page class="flex flex-center column">
    <h1 class="text-h4">Register Account</h1>
    <q-form @submit="onSubmit" class="registration-form">
      <q-input
        outlined
        v-model="registration.name"
        label="Name"
        lazy-rules
        :rules="[Validator.required]"
      />
      <q-input
        outlined
        type="email"
        v-model="registration.email"
        label="Email"
        :rules="[Validator.required]"
      />
      <q-input
        outlined
        type="password"
        v-model="registration.password"
        label="Password"
        :rules="[Validator.required]"
      />
      <q-input
        outlined
        type="password"
        v-model="registration.passwordConfirm"
        label="Repeat Password"
        :rules="[Validator.required, validatePassword]"
      />
      <q-toggle
        v-model="registration.accept"
        label="Accept terms & conditions"
      />

      <q-btn
        class="full-width"
        label="Register"
        type="submit"
        color="primary"
      />
    </q-form>
  </q-page>
</template>

<style lang="scss">
.registration-form {
  .q-field,
  .q-toggle {
    margin-bottom: 1em;
  }
}
</style>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';

import { Validator } from 'src/domain/form';
import { UserMixin } from 'src/domain/api';

@Component
export default class Registration extends mixins(UserMixin) {
  registration = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    accept: false
  };
  Validator = Validator;

  validatePassword(value: string) {
    return (
      (!!value && this.registration.password === value) ||
      'Passwords do not match!'
    );
  }

  onSubmit() {
    if (!this.registration.accept) {
      this.$q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'error',
        message: 'You must accept the terms & conditions'
      });
      return;
    }

    this.registerUser({
      name: this.registration.name,
      email: this.registration.email,
      password: this.registration.password
    });
  }
}
</script>
