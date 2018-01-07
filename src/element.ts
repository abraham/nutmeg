import { html, render } from 'lit-html/lib/lit-extended';
import { TemplateResult } from 'lit-html';
import { Property } from './decorators';

/** Extending classes are expected to define `template` and `styles`. */
interface Element {
  template: TemplateResult;
  styles: TemplateResult;
  shadowRoot: ShadowRoot;
}

class Element extends HTMLElement {
  private _connected = false;
  private static observedProperties: string[] = [];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  /** The component instance has been inserted into the DOM. */
  public connectedCallback() {
    this._connected = true;
    this.upgradeProperties();
    this.upgradeAttributes();
    this.render();
  }

  /** The component instance has been removed from the DOM. */
  public disconnectedCallback() {
    this._connected = false;
  }

  /** Rerender when the observed attributes change. */
  public attributeChangedCallback(_name: string, _oldValue: any, _newValue: any) {
    this.render();
  }

  /** Render the component. */
  public render(): void {
    if (this._connected) {
      render(this._template, this.shadowRoot as ShadowRoot);
    }
  }

  /** Helper to quickly query the rendered shadowRoot. `this.$('div.actions')` */
  public $(selectors: string): Element | null {
    return (this.shadowRoot as ShadowRoot).querySelector(selectors);
  }

  /** Combine the components styles and template. */
  private get _template(): TemplateResult {
    return html`
    <style>
      :host {
        display: block;
      }

      :host([hidden]) {
        display: none;
      }
    </style>
    ${this.styles}
    ${this.template}
    `;
  }

  /** Support lazy properties https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties */
  private upgradeProperties() {
    const instance = <any>this;
    const props = (instance).constructor['observedAttributes'].concat((instance).constructor['observedProperties']);
    props.forEach((prop: string) => {
      if (instance.hasOwnProperty(prop)) {
        let value = (instance)[prop];
        delete (instance)[prop];
        (instance)[prop] = value;
      }
    });
  }

  /** Perform a one-time upgrade of complex properties from JSON encoded attributes. */
  private upgradeAttributes() {
    const instance = <any>this;
    (instance).constructor['observedProperties'].forEach((prop: string) => {
      if (instance.hasAttribute(prop)) {
        (instance)[prop] = JSON.parse(instance.getAttribute(prop));
        instance.removeAttribute(prop);
      }
    });
  }
}

export {
  Element as Seed,
  Element,
  html,
  Property as Prop,
  Property,
  TemplateResult,
};
