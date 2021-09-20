import Component from './component.js';

export default class test extends Component {
  template() {
    const { a, b } = this.state;

    return `
      <input id="stateA" value="${this.state.a}" size="5" />
      <input id="stateB" value="${this.state.b}" size="5" />
      <p>a + b = ${a + b}</p>
    `;
  }

  setEvent() {
    const { $target, state } = this;

    $target
      .querySelector('#stateA')
      .addEventListener('change', ({ target }) => {
        state.a = Number(target.value);
      });

    $target
      .querySelector('#stateB')
      .addEventListener('change', ({ target }) => {
        state.b = Number(target.value);
      });
  }
}
