class StateController {
  #cursor = undefined;
  state;
  #observers = new Set();

  constructor() {
    this.state = {
      a: 10,
      b: 20,
    };
  }

  observe(callback) {
    this.#cursor = callback;
    this.#cursor();
    this.#cursor = null;
  }

  observable(obj) {

    const that = this;

    Object.keys(obj).map((key) => {
      let _value = obj[key];
      const observers = new Set();

      Object.defineProperty(obj, key, {
        get() {

          if (that.#cursor)
            observers.add(that.#cursor);

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
