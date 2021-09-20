import StateController from './StateController.js';

export default class Component {
  $target;
  state;
  props;
  Difunc;

  constructor($target, props, position, Difunc = undefined) {
    this.$target = $target;
    this.props = props;
    this.Difunc = Difunc;
    this.position = position;

    this.setup();
  }

  setup() {
    this.state = StateController.observable(this.props);

    StateController.observe(() => {
      this.render();
      this.setEvent();
      this.mount();
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

  myTemplate() {
    const backGround = Object.entries(this.position)
      .map((k, v) => `${k[0]}=${k[1]}`)
      .join(' ');

    return `<div ${backGround}>${this.template()}</div>`;
  }

  render() {
    const nowTarget = this.$target.querySelector(`#${this.position.id}`);

    if (nowTarget) {
      nowTarget.insertAdjacentHTML('beforebegin', this.myTemplate());
      nowTarget.outerHTML = '';
    } else this.$target.insertAdjacentHTML('beforeend', this.myTemplate());
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
