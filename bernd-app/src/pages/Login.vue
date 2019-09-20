<template>
  <q-page class="flex flex-center column">
    <h1 class="text-h4">Login</h1>
    <q-form @submit="submit" class="login-form">
      <q-input
        outlined
        type="email"
        v-model="login.email"
        label="Email"
        :rules="[Validator.required]"
      />
      <q-input
        outlined
        type="password"
        v-model="login.password"
        label="Password"
        :rules="[Validator.required]"
      />

      <q-btn class="full-width" label="Login" type="submit" color="primary" />
      <q-btn flat color="secondary" label="No Account?" to="register" />
    </q-form>
  </q-page>
</template>

<style lang="scss">
.login-form {
  .q-field {
    margin-bottom: 1em;
  }
}
</style>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';

import { Validator } from 'src/domain/form';
import { Credentials } from 'src/domain/api';
import { UserMixin } from 'src/domain/api';

@Component
export default class Login extends mixins(UserMixin) {
  login: Credentials = {
    email: '',
    password: ''
  };
  Validator = Validator;

  submit() {
    this.loginUser(this.login);
  }
}
</script>
