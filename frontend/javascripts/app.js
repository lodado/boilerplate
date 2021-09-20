import Component from './component.js';
import StateController from './StateController.js';
import storetest from './storetest.js';

class App {
  constructor() {
    const store = StateController.state;

    const $app = document.querySelector('#app');
    new storetest($app, store);
  }
}

new App(document.querySelector('#app'));
