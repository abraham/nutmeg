import { Seed, property, html, TemplateResult } from '../src/seed';

export class TestElement extends Seed {
  // Attributes
  @property({ type: Boolean }) public boolean: boolean | undefined;
  @property() public booleanDefault: boolean = true;
  @property({ type: Boolean }) public multiWordAttribute: boolean | undefined;
  @property() public multiWordAttributeDefault: boolean = false;
  @property({ type: Number }) public number: number | undefined;
  @property() public numberDefault: number = 0;
  @property({ type: String }) public string: string | undefined;
  @property() public stringDefault: string = 'default';

  // Properties
  @property() public multiWordProperty: boolean[] | undefined;
  @property() public multiWordPropertyDefault: boolean[] = [false];
  @property() public object: object | undefined;
  @property() public objectDefault: {} = { default: true };
  @property() public stringArray: string[] | undefined;
  @property() public stringArrayDefault: string[] = ['default'];

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
          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0 ,0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);
        }

        .content {
          background-color: var(--test-element-background-color, #FAFAFA);
          color: #212121;
          padding: 16px;
        }
      </style>
    `;
  }

  /** HTML Template for the component. */
  public get template(): TemplateResult {
    return html`
      <div class="content">
        Welcome to &lt;test-element&gt;

        <ul>
          <li>string: ${this.string}</li>
          <li>number: ${this.number}</li>
          <li>boolean: ${this.boolean}</li>
          <li>stringArray: ${this.stringArray}</li>
          <li>object: ${this.object}</li>
          <li>stringDefault: ${this.stringDefault}</li>
          <li>numberDefault: ${this.numberDefault}</li>
          <li>booleanDefault: ${this.booleanDefault}</li>
          <li>stringArrayDefault: ${this.stringArrayDefault}</li>
          <li>objectDefault: ${this.objectDefault}</li>
        </ul>

        <div id="money">money</div>
        <div class="monies">monies</div>
        <div class="monies">monies</div>

        <slot></slot>
      </div>
    `;
  }
}

window.customElements.define('test-element', TestElement);
