import 'Scss/style.scss';

import SpaRouter from './SpaRouter.js';
import storetest from 'Component/storetest/';
import storetest1 from 'Component/storetest2/';

class typeClass {
  constructor(className, body, store) {
    (this.class = className), (this.body = body);
    this.store = store;
  }
}

class App extends SpaRouter {
  setRoutes() {
    this.routes = {
      '/': [new typeClass(storetest, this.$body, this.store)],
      '/search': [new typeClass(storetest1, this.$body, this.store)],
    };
  }

  addRouterEvent() {
    window.addEventListener('click', ({ target }) => {
      if (target.classList.contains('rootBtn')) {
        this.notify('/');
      }

      if (target.classList.contains('searchBtn')) {
        this.notify('/search');
      }
    });
  }
}

new App();
