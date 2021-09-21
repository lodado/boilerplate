class StateController {
  #cursor = undefined;
  state;
  #observers = new Set();

  constructor() {
    this.state = {
      a: 10,
      b: 20,
    };

    this.observers = new Set();
  }

  observe(callback) {
    this.#cursor = callback;
    this.#cursor();
    this.#cursor = null;
  }

  observable(obj) {
    const that = this;

    const observer = that.observers[JSON.stringify(obj)] || [];

    console.log(that.observers);

    Object.keys(obj).map((key) => {
      let _value = obj[key];

      Object.defineProperty(obj, key, {
        get() {
          if (that.#cursor) observer.push(that.#cursor);
          return _value;
        },

        set(value) {
          _value = value;
          observer.forEach((fn) => fn());
        },
      });
    });

    that.observers[JSON.stringify(obj)] = observer;

    return obj;
  }
}

const instance = new StateController();

export default instance;
