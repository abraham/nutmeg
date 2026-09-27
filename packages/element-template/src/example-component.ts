import { Seed, property, html } from '@nutmeg/seed';
import type { TemplateResult } from '@nutmeg/seed';

export class ExampleComponent extends Seed {
  @property({ type: Number }) accessor exampleNumber: number = 42;
  @property({ type: String }) accessor exampleString: string = 'Pickle';
  @property({ type: Boolean }) accessor exampleBoolean: boolean = true;
  @property() accessor exampleProperty: string[] = ['default'];

  /** Styling for the component. */
  public get styles(): TemplateResult {
    return html`
      <style>
        :host {
          border: 1px solid #000000;
          border-radius: 8px;
        }

        * {
          font-family:
            -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans,
            Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
        }

        .content {
          background-color: var(--example-component-background-color, #ffffff);
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
        Welcome to &lt;example-component&gt;

        <ul>
          <li>exampleNumber: ${this.exampleNumber}</li>
          <li>exampleString: ${this.exampleString}</li>
          <li>exampleBoolean: ${this.exampleBoolean}</li>
        </ul>

        <slot></slot>
      </div>
    `;
  }
}

window.customElements.define('example-component', ExampleComponent);
