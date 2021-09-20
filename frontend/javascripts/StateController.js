class StateController {
  #cursor = undefined;
  state;
  #observers = new Set();

  constructor() {
    this.state = {
      a: 10,
      b: 10,
    };
  }

  observe(callback) {
    this.#cursor = callback;
    callback();
    this.#cursor = null;
  }

  observable(obj) {
    Object.keys(obj).forEach((key) => {
      let _value = obj[key];
      const observers = new Set();

      Object.defineProperty(obj, key, {
        get() {
          if (this.#cursor) observers.add(this.#cursor);
          return _value;
        },

        set(value) {
          _value = value;
          observers.forEach((fn) => fn());
        },
      });
    });

    return obj;
  }
}

const instance = new StateController();

export default instance;
