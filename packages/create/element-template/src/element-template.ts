import { LitSeed, property, html, TemplateResult } from '@nutmeg/seed/lit';

export class <%= name %> extends LitSeed {
<% properties.properties.forEach((property) => {
  if (property.primitive) {
    const ctor = { boolean: 'Boolean', number: 'Number', string: 'String' }[property.type];
    print(`  @property({ type: ${ctor} }) public ${property.name}: ${property.type} = ${property.tmplValue};\n`);
  } else {
    print(`  @property() public ${property.name}: ${property.type} | undefined;\n`);
  }
}); %>
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
