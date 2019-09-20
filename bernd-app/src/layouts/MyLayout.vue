<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Bernd
        </q-toolbar-title>
        <q-btn v-if="authenticated()" @click="logout()" flat label="Logout" />
        <q-btn v-if="!authenticated()" to="login" flat label="Login" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item
          v-for="route of routes()"
          v-bind:key="route.route"
          :to="route.route"
          ><q-item-section>
            {{ route.label }}
          </q-item-section></q-item
        >
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { UserMixin } from 'src/domain/api';

@Component
export default class MyLayout extends mixins(UserMixin) {
  leftDrawerOpen = false;
  publicRoutes = [{ label: 'Home', route: '/' }];
  memberRoutes = [{ label: 'Recipes', route: 'recipes' }];

  authenticated(): boolean {
    return this.$feathers.authentication.authenticated;
  }

  routes() {
    return this.authenticated() ? this.memberRoutes : this.publicRoutes;
  }
}
</script>
