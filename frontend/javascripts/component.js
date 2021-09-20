export default class Component {
  $target;
  state;
  props;

  constructor($target, prop) {
    this.$target = $target;
    this.props = prop;

    this.setup();
    this.setEvent();
    this.render();
  }

  setup() {}

  template() {
    return '';
  }

  render() {
    this.$target.innerHTML = this.template();
    this.setEvent();
    this.mount();
  }

  setEvent() {}

  mount() {}

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  //버블링 사용
  addEvent(eventType, selector, callback) {
    const children = [...this.$target.querySelectorAll(selector)];

    const isTarget = (target) =>
      children.includes(target) || target.closest(selector);

    this.$target.addEventListener(eventType, (event) => {
      if (!isTarget(event.target)) return false;

      callback(event);
    });
  }
}
