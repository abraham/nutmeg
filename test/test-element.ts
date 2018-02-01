import { Seed, Property, html, TemplateResult } from '../src/seed';

export class TestElement extends Seed {
  @Property() public stringDefault: string = 'default';
  @Property() public numberDefault: number = 0;
  @Property() public booleanDefault: boolean = true;
  @Property() public stringArrayDefault: string[] = ['default'];
  @Property() public objectDefault: {} = { default: true };
  @Property() public multiWordAttributeDefault: boolean = false;
  @Property() public multiWordPropertyDefault: boolean = false;

  @Property() public string: string | undefined;
  @Property() public number: number | undefined;
  @Property() public boolean: boolean | undefined;
  @Property() public stringArray: string[] | undefined;
  @Property() public object: object | undefined;
  @Property() public multiWordAttribute: boolean | undefined;
  @Property() public multiWordProperty: boolean | undefined;

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
