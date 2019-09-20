<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { UserMixin } from 'src/domain/api';

@Component
export default class App extends mixins(UserMixin) {
  created() {
    this.reAuthenticate()
  }
}
</script>
