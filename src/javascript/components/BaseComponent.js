/* eslint-disable no-empty-function */
import StateController from '@Components/StateController';
import BackgroundTemplate from '@Components/common/BackgroundTemplate';

const defaultOption = { option: {}, props: {}, divTag: {} };

/**
 * 기본 template에 추가적으로 event, 자식 Component를 달 수 있는 class Component
 * @param {$parent} 부모 Element
 * @param {props} Object DI(Dependency injection)용 Object(optional)
 * @param {divTag} Object html attribute를 위에서 주입받음(optional)
 * */
export default class BaseComponent {
  constructor($parent, { option, props, divTag } = defaultOption) {
    const attribute = {
      tag: 'div',
      className: undefined,
      ...divTag,
    };
    this.$parent = $parent;
    this.props = props;
    this.attribute = attribute;
    this.option = option;
    this.StateController = StateController;
    this.startRendering();
  }

  setState(newState) {
    this.StateController.setState(newState);
  }

  getState(key = undefined) {
    return this.StateController.getState(key);
  }

  setAttribute() {
    // ex) this.attribute = {id, className, tag};
    // this.observableState = undefined;
  }

  template() {
    return '';
  }

  setEvent() {}

  mount() {}

  setMountEvent() {}

  async getFetchData() {}

  assemblyTemplate() {
    if (this.option?.noBackground) {
      return this.template();
    }

    return BackgroundTemplate({ ...this.attribute, template: this.template() });
  }

  #render() {
    const template = this.assemblyTemplate();

    if (this.$key) {
      this.$key.outerHTML = template;
    } else {
      this.$parent.insertAdjacentHTML('beforeend', template);
    }

    const { id } = this.attribute;
    this.$key = this.$parent.querySelector(`#${id}`);
  }

  #renderSequence() {
    this.#render();
    this.setEvent();
    this.mount();
    this.setMountEvent();
  }

  #observableRenderSequence() {
    this.observableState = this.StateController.subscribe(this.observableState);
    this.StateController.subscribeRendering(() => {
      this.#renderSequence();
    });
  }

  startRendering() {
    this.setAttribute();

    if (this.observableState) {
      this.#observableRenderSequence();
    } else {
      this.#renderSequence();
    }

    this.getFetchData();
  }
}
