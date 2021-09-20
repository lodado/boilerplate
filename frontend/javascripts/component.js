import StateController from './StateController.js';

export default class Component {
  $target;
  state;
  props;
  Difunc;

  constructor($target, props, Difunc = undefined) {
    this.$target = $target;
    this.props = props;
    this.Difunc = Difunc;

    this.setup();
  }

  setup() {

    this.state = StateController.observable(this.props);

    StateController.observe(() => {
      this.render();
      this.setEvent();
      this.mount.bind();
    });
  }

  //state 설정
  initState() {
    return this.props;
  }

  //insert view
  template() {
    return '';
  }

  render() {
    this.$target.innerHTML = this.template();
  }

  setEvent() {}

  mount() {}

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
