import Component from './component.js';

export default class test2 extends Component {
  setBackground() {
    this.position = { id: 'test2' };
  }

  template() {
    return `<input id="stateABC" value="${this.props.c}" size="5" />;
    <p>a + b 2222= ${this.props.c + this.props.d}</p>`;
  }
}
