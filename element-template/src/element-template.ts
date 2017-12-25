import { html, render, TemplateResult } from 'lit-html';

export default class <%= name %> extends HTMLElement {
<% attributes.filter(attr => richTypes.includes(attr.type) || attr.type.endsWith('[]')).forEach((attr) => {
    print(`  public ${attr.name}: ${attr.type} = ${attr.type.endsWith('[]') ? '[]' : '{}'};\n`);
}); %>
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  /** The element instance has been inserted into the DOM. */
  connectedCallback() {
    this.upgradeProperties();
    this.render();
  }

  /** The element instance has been removed from the DOM. */
  disconnectedCallback() {
  }

  /** Watch for changes to these attributes. */
  static get observedAttributes(): string[] {
    return [<% print(observedAttributes.map(word => `'${word}'`).join(', ')) %>];
  }

  /** Rerender when the observed attributes change. */
  attributeChangedCallback(_name: string, _oldValue: any, _newValue: any) {
    this.render();
  }

  /** Rerender the element. */
  render() {
    render(this.template, this.shadowRoot as ShadowRoot);
  }

  /** Support lazy properties https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties */
  private upgradeProperties() {
    (<any>this).constructor['observedAttributes'].forEach((prop: string) => {
      if (this.hasOwnProperty(prop)) {
        let value = (<any>this)[prop];
        delete (<any>this)[prop];
        (<any>this)[prop] = value;
      }
    });
  }
<% attributes.filter(attr => primitiveTypes.includes(attr.type))
             .forEach((attr) => {
  print("\n" + partial(`${attr.type}.property.ts`, attr));
}) %>
  /** Styling for the element. */
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

  /** HTML Template for the element. */
  private get template(): TemplateResult {
    return html`
      ${this.styles}
      <div class="content">
        Welcome to &lt;<%= tag %>&gt;

        <ul><% attributes.filter(attr => primitiveTypes.includes(attr.type))
                         .forEach((attr) => {
              print(`\n          <li>${attr.name}: \${this.${attr.name} === null ? 'N/A' : this.${attr.name}}</li>`);
            }); %>
        </ul>

        <slot></slot>
      </div>
    `;
  }
}

window.customElements.define('<%= tag %>', <%= name %>);
