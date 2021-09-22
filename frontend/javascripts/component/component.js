import StateController from '../StateController.js';

/**
 * 메뉴 항목을 추가한다.
 * @param {HtmlElement} id 부모 Element (HTML ELEMENT)
 * @param {state} Object 전역 상태 state
 * @param {props} Object 자신의 상태(지역) state
 * @param {position} Object 자신 background attribute들
 * @param {Difunc} Object DI(Dependency injection)용 함수, 변수 넣는 객체
 **/
export default class Component {
  $target;
  state = StateController.state;
  props;
  position;
  Difunc;

  backGround;
  nowTarget;

  constructor($target, props, position, Difunc = undefined) {
    this.$target = $target;
    this.props = props;
    this.position = position;
    this.Difunc = Difunc;

    this.setBackground();
    this.setup();
  }

  setBackground() {
    this.position = {};
  }

  setup() {
    this.props = StateController.observable(this.props);

    StateController.observe(() => {
      this.render();
      this.setEvent();
      this.mount();
    });
  }

  //내부 구성
  template() {
    return '';
  }

  //background
  backGroundTemplate() {
    const arr = Object.entries(this.position);

    if (arr.length <= 0) return this.template();

    if (!this.backGround) {
      this.backGround = arr
        .map((k, v) => (k[0] !== 'tag' ? `${k[0]}=${k[1]}` : ''))
        .join(' ');
    }

    return `<${this.position.tag ?? 'div'} ${
      this.backGround
    }>${this.template()}</div>`;
  }

  render() {
    this.nowTarget = this.$target.querySelector(`#${this.position.id}`);

    console.log(this.nowTarget);

    if (this.nowTarget) {
      this.nowTarget.outerHTML =  this.backGroundTemplate();
    } else
      this.$target.insertAdjacentHTML('beforeend', this.backGroundTemplate());
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
