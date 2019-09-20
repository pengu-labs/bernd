import Component from 'vue-class-component';
import Vue from 'vue';

import { Credentials, Registration } from './credentials.interface';

@Component
export class UserMixin extends Vue {
  async registerUser(request: Registration) {
    try {
      await this.$feathers.service('users').create(request);
      this.loginUser(request);
    } catch {
      this.$q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'error',
        message: 'Could not register!'
      });
    }
  }

  async reAuthenticate() {
    try {
      // Try to authenticate using an existing token
      await this.$feathers.reAuthenticate();
      this.goToUserArea()
    } catch {}
  }

  async loginUser(credentials: Credentials) {
    try {
      // Otherwise log in with the `local` strategy using the credentials we got
      await this.$feathers.authenticate({
        strategy: 'local',
        ...credentials
      });

      this.$q.notify({
        color: 'green',
        textColor: 'white',
        icon: 'done',
        message: 'Successfully logged in!'
      });

      this.goToUserArea()
    } catch (error) {
      this.$q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'error',
        message: 'Could not login!'
      });
    }
  }

  async logout() {
    await this.$feathers.authentication.logout();
    this.$q.notify({
      color: 'green',
      textColor: 'white',
      icon: 'done',
      message: 'Successfully logged out!'
    });
    await this.$router.push('/');
  }

  private async goToUserArea() {
    await this.$router.push('recipes');
  }
}
