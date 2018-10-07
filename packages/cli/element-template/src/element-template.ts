import { Seed, property, html, TemplateResult } from '@nutmeg/seed';

export class <%= name %> extends Seed {
<% properties.properties.forEach((property) => {
  if (property.primitive) {
    print(`  @property() public ${property.name}: ${property.type} = ${property.tmplValue};\n`);
  } else {
    print(`  @property() public ${property.name}: ${property.type} | undefined;\n`);
  }
}); %>
  constructor() {
    super();
  }

  /** The component instance has been inserted into the DOM. */
  public connectedCallback() {
    super.connectedCallback();
  }

  /** The component instance has been removed from the DOM. */
  public disconnectedCallback() {
    super.disconnectedCallback();
  }

  /** Watch for changes to these attributes. */
  public static get observedAttributes(): string[] {
    return super.observedAttributes;
  }

  /** Rerender when the observed attributes change. */
  public attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  /** Styling for the component. */
  public get styles(): TemplateResult {
    return html`
      <style>
        :host {
          border: 1px solid #000000;
          border-radius: 8px;
        }

        * {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
        }

        .content {
          background-color: var(--<%= tag %>-background-color, #FFFFFF);
          color: #000000;
          padding: 16px;
        }
      </style>
    `;
  }

  /** HTML Template for the component. */
  public get template(): TemplateResult {
    return html`
      <div class="content">
        Welcome to &lt;<%= tag %>&gt;

        <ul><% properties.primitive.forEach((property) => {
              print(`\n          <li>${property.name}: \${this.${property.name}}</li>`);
            }); %>
        </ul>

        <slot></slot>
      </div>
    `;
  }
}

window.customElements.define('<%= tag %>', <%= name %>);
