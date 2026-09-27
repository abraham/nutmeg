import { LitElement, html, svg } from 'lit';
import type { TemplateResult } from 'lit';
import { property as litProperty } from 'lit/decorators.js';
import { attributeNameFromProperty, propertyNameFromAttribute } from './utils';

// `context.metadata` (used below for `observedProperties` bookkeeping) is
// only populated by the class-decorator evaluation when `Symbol.metadata`
// exists; it's not yet a native built-in in current JS engines (Node 22/V8),
// so polyfill it with the minimal, standard, engine-agnostic approach.
(Symbol as unknown as { metadata: symbol }).metadata ??=
  Symbol('Symbol.metadata');

const primitiveTypes = [Boolean, Number, String];
const observedPropertiesKey = 'nutmegObservedProperties';

interface SeedMetadata {
  [observedPropertiesKey]?: string[];
}

function isPrimitive(type: unknown): boolean {
  return primitiveTypes.includes(type as BooleanConstructor);
}

/** Track `name` as a complex property needing a one-time JSON attribute upgrade. */
function observeComplexProperty(
  metadata: DecoratorMetadata,
  name: string,
): void {
  const target = metadata as SeedMetadata;
  // Own-property check so subclasses don't mutate their parent's array.
  if (!Object.prototype.hasOwnProperty.call(target, observedPropertiesKey)) {
    target[observedPropertiesKey] = [...(target[observedPropertiesKey] || [])];
  }
  (target[observedPropertiesKey] as string[]).push(name);
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
 * Lit's reactive property system and TC39 standard decorators. Must be
 * applied to an `accessor` class field — Lit's own standard-decorator
 * support only implements the `accessor`/`setter` decorator locations, not
 * plain fields (throws `Unsupported decorator location` otherwise).
 * Primitive types (`Boolean`/`Number`/`String`) are declared explicitly
 * and reflect to a kebab-case attribute exactly like the legacy decorator.
 * All other types opt out of Lit's attribute handling and instead get a
 * one-time JSON upgrade from a matching attribute, performed by
 * `Seed#connectedCallback`, tracked via `context.metadata`.
 */
export function property(options?: { type?: unknown }) {
  return function <C extends Seed, V>(
    value: ClassAccessorDecoratorTarget<C, V>,
    context: ClassAccessorDecoratorContext<C, V>,
  ): ClassAccessorDecoratorResult<C, V> {
    const name = context.name as string;
    const type = options && options.type;

    if (type && isPrimitive(type)) {
      return litProperty({
        attribute: attributeNameFromProperty(name),
        converter: primitiveConverter(type),
        reflect: true,
      })(value, context);
    }

    observeComplexProperty(context.metadata, name);
    return litProperty({ attribute: false })(value, context);
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
    const metadata = (this.constructor as typeof Seed)[Symbol.metadata] as
      SeedMetadata | null | undefined;
    const observedProperties =
      (metadata && metadata[observedPropertiesKey]) || [];
    observedProperties.forEach((name) => {
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

export {
  attributeNameFromProperty,
  html,
  Seed,
  propertyNameFromAttribute,
  svg,
};
export type { TemplateResult };
