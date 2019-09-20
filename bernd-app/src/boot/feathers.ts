import Vue from 'vue';
import feathers from '@feathersjs/client';
import auth from '@feathersjs/authentication-client';
import rest from '@feathersjs/rest-client';

const client = feathers();
const restClient = rest(process.env.API);
client.configure(auth()).configure(restClient.fetch(window.fetch));

Vue.prototype.$feathers = client;

export default client
