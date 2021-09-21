import StateController from './StateController.js';

export default class SpaRouter {
  $body;
  store;

  constructor() {
    this.$body = document.querySelector('body');
    this.store = StateController.state;

    this.stackPath = [window.location.pathname];

    this.setRoutes();

    this.notify(this.stackPath[0]);
    this.addRouterEvent();
  }

  setRoutes() {}

  addRouterEvent() {}

  notify(currentPath) {
    this.historyRouterPush(currentPath);
    this.initialRoutes(this.$body, currentPath);
  }

  render(baseElement, pathName = undefined) {
    //baseElement.innerHTML = '';

    const now = this.routes[pathName];

    now.map((ele) => {
      new ele.class(ele.body, ele.store);
    });
  }

  initialRoutes(baseElement, currentPath) {
    this.render(baseElement, currentPath);

    window.onpopstate = () => {
      const now = this.stackPath.pop();
      this.render(baseElement, now);
      this.stackPath.push(now);
    };
  }

  historyRouterPush(pathName) {
    window.history.pushState({}, pathName, window.location.origin + pathName);
  }
}
