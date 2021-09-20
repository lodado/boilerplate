import Component from './component.js';

class App {
  constructor() {
    const $app = document.querySelector('#app');
    new Component($app);
  }
}

new App(document.querySelector('#app'));
