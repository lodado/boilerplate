import Component from './component.js';

export default class test extends Component {
  template() {
    const { a, b } = this.props;

    return `
      <input id="stateA" value="${a}" size="5" />
      <input id="stateB" value="${b}" size="5" />
      <p>a + b = ${a + b}</p>
    `;
  }

  setEvent() {
    const { $target, props } = this;

    $target
      .querySelector('#stateA')
      .addEventListener('change', ({ target }) => {
        props.a = Number(target.value);
      });

    $target
      .querySelector('#stateB')
      .addEventListener('change', ({ target }) => {
        props.b = Number(target.value);
      });
  }
}
