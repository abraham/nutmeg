import { html, render, TemplateResult } from 'lit-html';

export class <%= name %> extends HTMLElement {
<% attributes.filter(attr => richTypes.includes(attr.type) || attr.type.endsWith('[]')).forEach((attribute) => {
    print(`  public ${attribute.name}: ${attribute.type};\n`);
}); %>
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes(): string[] {
    return ['<% print(`${observedAttributes.join("', '")}`) %>'];
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
  }

  attributeChangedCallback(_name: string, _oldValue: any, _newValue: any) {
    this.render();
  }
<% attributes.filter(attr => primitiveTypes.includes(attr.type)).forEach((attribute) => {
  switch(attribute.type) {
    case 'number':
      print(`\n  get ${attribute.name}(): ${attribute.type} {
    if (this.hasAttribute('${attribute.name}')) {
      return Number(this.getAttribute('${attribute.name}'));
    } else {
      return null;
    }
  }

  set ${attribute.name}(value: ${attribute.type}) {
    if (value) {
      this.setAttribute('${attribute.name}', String(value));
    } else {
      this.removeAttribute('${attribute.name}');
    }
  }`);
    break;
    case 'string':
      print(`\n  get ${attribute.name}(): ${attribute.type} {
    return this.getAttribute('${attribute.name}');
  }

  set ${attribute.name}(value: ${attribute.type}) {
    if (value) {
      this.setAttribute('${attribute.name}', value);
    } else {
      this.removeAttribute('${attribute.name}');
    }
  }`);
    break;
    case 'boolean':
      print(`\n  get ${attribute.name}(): ${attribute.type} {
    return this.hasAttribute('${attribute.name}');
  }

  set ${attribute.name}(value: ${attribute.type}) {
    if (value) {
      this.setAttribute('${attribute.name}', '');
    } else {
      this.removeAttribute('${attribute.name}');
    }
  }`);
    break;
  }
}); %>

  private get styles(): TemplateResult {
    return html`
      <style>
        :host {
          display: block;
          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0 ,0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);
        }

        :host([hidden]) {
          display: none;
        }

        .content {
          background-color: var(--<%= tag %>-background-color, #FAFAFA);
          color: #212121;
          padding: 16px;
        }
      </style>
    `;
  }

  private get template(): TemplateResult {
    return html`
      ${this.styles}
      <div class="content">
        Welcome to &lt;<%= tag %>&gt;

        <ul><% attributes.forEach((attribute) => { print(`\n          <li>${attribute.name}: \${this.${attribute.name} === null ? 'N/A' : this.${attribute.name}}</li>`); }); %>
        </ul>

        <slot></slot>
      </div>
    `;
  }

  render() {
    render(this.template, this.shadowRoot);
  }
}

window.customElements.define('<%= tag %>', <%= name %>);
