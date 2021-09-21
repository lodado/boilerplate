class StateController {
  #cursor = undefined;
  state;
  #observers = new Set();

  constructor() {
    this.state = {
      a: 10,
      b: 20,
    };

    this.state1 = {
      c: 30,
      d: 40,
    };

    this.observers = new Set();

    this.currentCallback = -1;
  }

  debounceFrame = (callback) => {
    let currentCallback = -1;
    return () => {
      cancelAnimationFrame(currentCallback);
      currentCallback = requestAnimationFrame(callback);
    };
  };

  observe(callback) {
    this.#cursor = this.debounceFrame(callback);
    callback();
    this.#cursor = null;
  }

  observable(obj) {
    const that = this;

    const observer = that.observers[JSON.stringify(obj)] || [];
    //key값 duck typing

    Object.keys(obj).map((key) => {
      let _value = obj[key];

      Object.defineProperty(obj, key, {
        get() {
          if (that.#cursor) observer.push(that.#cursor);
          return _value;
        },

        set(value) {
          if (_value === value) return;
          if (JSON.stringify(_value) === JSON.stringify(value)) return;

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
