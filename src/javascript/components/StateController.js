class StateController {
  constructor() {
    this.listState = {
      data: [],
      cursor: 1,

      orderByAsc: true,
    };

    this.responseStatus = {};

    this.init();
  }

  init() {
    this.canAddObservableFlag = true;
    this.observer = new Set();
  }

  setState(newState) {
    this.canAddObservableFlag = false;

    Object.entries(newState).map(([key, value]) => {
      if (this.listState[key] !== undefined) this.listState[key] = value;
      if (this.responseStatus[key] !== undefined) this.responseStatus[key] = value;
    });
  }

  getState(key) {
    if (key === 'example') {
      return this.responseStatus;
    }
    return this.listState;
  }

  debounceFrame = (callback) => {
    let callbackIndex = -1;

    return () => {
      cancelAnimationFrame(callbackIndex);
      callbackIndex = requestAnimationFrame(callback);
    };
  };

  subscribeRendering = (callback) => {
    this.cursor = this.debounceFrame(callback);
    callback();
    this.cursor = null;
  };

  subscribe = (objectStore) => {
    const that = this;
    const objectName = objectStore.constructor.name;
    const newObserver = this.observer[objectName] || [];
    const setObserve = (key) => {
      let value = objectStore[key];

      Object.defineProperty(objectStore, key, {
        get() {
          if (that.canAddObservableFlag && that.cursor) {
            newObserver.push(that.cursor);
          }

          return value;
        },

        set(newValue) {
          if (typeof newValue !== 'object' && newValue === value) {
            return;
          }

          value = newValue;
          newObserver.map((observeRenderingFunction) => observeRenderingFunction());
        },
      });
    };

    Object.keys(objectStore)?.map(setObserve);
    this.observer[objectName] = newObserver;

    return objectStore;
  };
}

const StateControllerInstance = new StateController(); // 싱글톤 패턴 효과
export default StateControllerInstance;
