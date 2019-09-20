import Vue from 'vue';
import { Notify, QVueGlobals } from 'quasar';

declare module 'vue/types/vue' {
  export interface Vue {
    $feathers: any
    $q: QVueGlobals;
  }
}
