import Component from './component.js';
import StateController from './StateController.js';

class App {
  constructor() {
    const store = StateController.state;

    const $app = document.querySelector('#app');
    new Component($app, store);
  }
}

new App(document.querySelector('#app'));
