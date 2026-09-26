import { LitElement, html, svg } from 'lit';
import type { TemplateResult } from 'lit';
import { property as litProperty } from 'lit/decorators.js';
import { attributeNameFromProperty, propertyNameFromAttribute } from './utils';

const primitiveTypes = [Boolean, Number, String];

function isPrimitive(type: unknown): boolean {
  return primitiveTypes.includes(type as BooleanConstructor);
}

interface ObservedPropertiesConstructor {
  observedProperties: string[];
}

/** Track `name` as a complex property needing a one-time JSON attribute upgrade. */
function observeComplexProperty(target: Seed, name: string): void {
  const ctor = target.constructor as unknown as ObservedPropertiesConstructor;
  // Own-property check so subclasses don't mutate their parent's array.
  if (!Object.prototype.hasOwnProperty.call(ctor, 'observedProperties')) {
    ctor.observedProperties = [...(ctor.observedProperties || [])];
  }
  if (!ctor.observedProperties.includes(name)) {
    ctor.observedProperties.push(name);
  }
}

/** Mirrors the legacy setter: null/undefined/false/'' remove the attribute. */
function primitiveConverter(type: unknown) {
  return {
    toAttribute(value: unknown): string | null {
      if (
        value === null ||
        value === undefined ||
        value === false ||
        value === ''
      ) {
        return null;
      }
      return String(value);
    },
    fromAttribute(value: string | null): unknown {
      switch (type) {
        case Boolean:
          return value !== null;
        case Number:
          return value === null ? null : Number(value);
        default:
          return value;
      }
    },
  };
}

/**
 * Drop-in replacement for the legacy `@property()` decorator, backed by
 * Lit's reactive property system. Primitive types (`Boolean`/`Number`/
 * `String`) are declared explicitly (no `reflect-metadata` type inference)
 * and reflect to a kebab-case attribute exactly like the legacy decorator.
 * All other types opt out of Lit's attribute handling and instead get a
 * one-time JSON upgrade from a matching attribute, performed by
 * `Seed#connectedCallback`.
 */
export function property(options?: { type?: unknown }) {
  return function (target: Seed, name: string): void {
    const type = options && options.type;

    if (type && isPrimitive(type)) {
      litProperty({
        attribute: attributeNameFromProperty(name),
        converter: primitiveConverter(type),
        reflect: true,
      })(target, name);
      return;
    }

    observeComplexProperty(target, name);
    litProperty({ attribute: false })(target, name);
  };
}

/** Extending classes are expected to define `template` and `styles`. */
interface Seed {
  template: TemplateResult;
  styles: TemplateResult;
}

/**
 * LitElement-backed replacement for the legacy `Seed` base class. Preserves
 * `$`/`$$`, the `styles`/`template` getter contract, and the one-time JSON
 * attribute upgrade for complex properties, while delegating rendering and
 * primitive attribute reflection to Lit.
 */
class Seed extends LitElement {
  public static observedProperties: string[] = [];

  public connectedCallback(): void {
    super.connectedCallback();
    this.upgradePropertyAttributes();
  }

  /** Helper to query the rendered shadowRoot with querySelector. `this.$('tag.class')` */
  public $(selectors: string): HTMLElement {
    return this.renderRoot.querySelector<HTMLElement>(selectors) as HTMLElement;
  }

  /** Helper to query the rendered shadowRoot with querySelectorAll. `this.$$('tag.class')` */
  public $$(selectors: string): NodeListOf<HTMLElement> {
    return this.renderRoot.querySelectorAll<HTMLElement>(selectors);
  }

  /** Combine the component's styles and template, matching the legacy `Seed` wrapper. */
  protected render(): TemplateResult {
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
      ${this.styles} ${this.template}
      <!-- Built, tested, and published with Nutmeg. https://nutmeg.tools -->
    `;
  }

  /** Perform a one-time upgrade of complex properties from JSON encoded attributes. */
  private upgradePropertyAttributes(): void {
    const ctor = this.constructor as unknown as ObservedPropertiesConstructor;
    ctor.observedProperties.forEach((name) => {
      const attribute = attributeNameFromProperty(name);
      if (this.hasAttribute(attribute)) {
        const value = this.getAttribute(attribute) as string;
        (this as unknown as { [key: string]: unknown })[name] =
          JSON.parse(value);
        this.removeAttribute(attribute);
      }
    });
  }
}

export { attributeNameFromProperty, html, Seed, propertyNameFromAttribute, svg };
export type { TemplateResult };
