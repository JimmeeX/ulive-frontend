class Search extends HTMLElement {
  constructor() {
    super();
    this._placeholder = 'Please enter text';
    this._value = 'UTS';
    this._input;
    this._searchBtn;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          font-size: 1.25rem;
          display: flex;
          align-items: center;
        }

        input[type='text'] {
          padding: 0px;
          height: 50px;
          width: 80%;
          border: none;
          border-radius: 50px 0 0 50px;
          font-size: inherit;

          text-align: center;
        }

        button {
          margin: -10px;
          height: 50px;
          width: 20%;
          background-color: #4bb2ff;
          color: white;

          font-size: inherit;

          border: none;
          border-radius: 0 50px 50px 0;

          cursor: pointer;
        }

        button:hover {
          filter: brightness(110%);
        }

        input:focus,
        button:focus {
          outline: none;
        }
      </style>
      <input
        type="text"
        placeholder="${this._placeholder}"
      />
      <button>Search</button>
    `;
  }

  connectedCallback() {
    this._placeholder = this.getAttribute('placeholder');
    this._value = this.getAttribute('value');

    this._searchBtn = this.shadowRoot.querySelector('button');
    this._searchBtn.addEventListener('click', this._onSearch.bind(this));

    this._input = this.shadowRoot.querySelector("input[type='text']");
    this._render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name, oldValue, newValue);
    if (oldValue === newValue) return;
    switch (name) {
      case 'value':
        this._value = newValue;
        break;
      case 'placeholder':
        this._placeholder = newValue;
        break;
      default:
        break;
    }
    this._render();
  }

  static get observedAttributes() {
    return ['value', 'placeholder'];
  }

  _onSearch() {
    console.log(this._input.value);
    const e = new CustomEvent('search', {
      detail: { input: this._input.value },
    });
    this.dispatchEvent(e);
  }

  _render() {
    if (this._input) {
      this._input.setAttribute('placeholder', this._placeholder);
      this._input.setAttribute('value', this._value);
    }
  }
}

customElements.define('ulive-search', Search);
