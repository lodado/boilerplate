import Component from './component.js';
import StateController from './StateController.js';
import storetest from './storetest.js';
import storetest1 from './storetest1.js';

class App {
  constructor() {
    const store = StateController.state;

    const $body = document.querySelector('body');

    new storetest($body, store);
    new storetest1($body, store);
  }
}

new App();
