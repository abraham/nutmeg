import { html, svg, TemplateResult } from 'lit-html';
import { render } from 'lit-html/lib/shady-render';
import { property } from './decorators';
import { attributeNameFromProperty, propertyNameFromAttribute } from './utils';

/** Extending classes are expected to define `template` and `styles`. */
interface Seed {
  template: TemplateResult;
  styles: TemplateResult;
  shadowRoot: ShadowRoot;
}

class Seed extends HTMLElement {
  private _connected = false;
  public _ignoredDefaultAttributes: { [index: string]: boolean } = {};
  public static observedProperties: string[] = [];
  public static observedAttributes: string[] = [];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  /** The component instance has been inserted into the DOM. */
  public connectedCallback() {
    this._connected = true;
    this.upgradeProperties();
    this.upgradePropertyAttributes();
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
      render(this._template, this.shadowRoot, { scopeName: this.tagName.toLowerCase() });
    }
  }

  /** Helper to query the rendered shadowRoot with querySelector. `this.$('tag.class')` */
  public $(selectors: string): HTMLElement {
    return this.shadowRoot.querySelector(selectors) as HTMLElement;
  }

  /** Helper to query the rendered shadowRoot with querySelectorAll. `this.$$('tag.class')` */
  public $$(selectors: string): NodeListOf<HTMLElement> {
    return this.shadowRoot.querySelectorAll(selectors);
  }

  /** Combine the components styles and template. */
  private get _template(): TemplateResult {
    return html`
    <style>
      :host {
        display: block;
        overflow: hidden;
      }

      :host([hidden]) {
        display: none;
      }
    </style>
    ${this.styles}
    ${this.template}
    <!-- Built, tested, and published with Nutmeg. https://nutmeg.tools -->
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
  private upgradePropertyAttributes() {
    const instance = <any>this;
    (instance).constructor['observedProperties'].forEach((prop: string) => {
      const attribute = attributeNameFromProperty(prop);
      if (instance.hasAttribute(attribute)) {
        (instance)[prop] = JSON.parse(instance.getAttribute(attribute));
        instance.removeAttribute(attribute);
      }
    });
  }

  /** Assume TypeScript is setting a default value and it should be ignored because of a user set value. */
  public _ignoreDefaultValue(name: string): boolean {
    return !this._connected && !this._ignoredDefaultAttributes[name] && this.hasAttribute(attributeNameFromProperty(name));
  }
}

export { attributeNameFromProperty, html, property, propertyNameFromAttribute, Seed, svg, TemplateResult };
