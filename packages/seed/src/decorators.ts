import { Reflection as Reflect } from '@abraham/reflection';
import { Seed } from './seed';
import { attributeNameFromProperty, privatePropertyName } from './utils';

const primitiveTypes = [Boolean, Number, String];

function isPrimitive(type: any): boolean {
  return primitiveTypes.includes(type);
}

function alreadyObserved(target: HTMLElement, name: string, type: any) {
  return (<any>target).constructor[observeType(type)].includes(name);
}

function observeType(type: any): string {
  return isPrimitive(type) ? 'observedAttributes' : 'observedProperties';
}

function observeName(prop: string, type: any): string {
  return isPrimitive(type) ? attributeNameFromProperty(prop) : prop;
}

function observe(target: HTMLElement, name: string, type: any) {
  if (!alreadyObserved(target, name, type)) {
    (<any>target).constructor[observeType(type)].push(observeName(name, type));
  }
}

function getter(name: string, type: any) {
  const attributeName = attributeNameFromProperty(name);
  return function(this: Seed) {
    switch(type) {
      case String:
        return this.getAttribute(attributeName);
      case Number:
        if (this.hasAttribute(attributeName)) {
          return Number(this.getAttribute(attributeName));
        } else {
          return null;
        }
      case Boolean:
        return this.hasAttribute(attributeName);
      default:
        return (<any>this)[privatePropertyName(name)];
    }
  }
}

function setter(name: string, type: any) {
  const attributeName = attributeNameFromProperty(name);
  return function(this: Seed, value: any) {
    if (this._ignoreDefaultValue(name) && isPrimitive(type)) {
      this._ignoredDefaultAttributes[name] = true;
      return;
    } else if (!this._ignoredDefaultAttributes[name]) {
      this._ignoredDefaultAttributes[name] = true;
    }

    if (value === null || value === undefined || value === false || value === '') {
      this.removeAttribute(attributeName);
    } else {
      switch (type) {
        case String:
          this.setAttribute(attributeName, String(value));
          break;
        case Number:
          this.setAttribute(attributeName, String(value));
          break;
        case Boolean:
          this.setAttribute(attributeName, '');
          break;
        default:
         (<any>this)[privatePropertyName(name)] = value;
      }
    }
    this.render();
  };
}

export function property(options?: { type: any }) {
  return function(target: HTMLElement, name: string) {
    const type = (options && options.type) || Reflect.getMetadata('design:type', target, name);
    observe(target, name, type);

    Object.defineProperty(target, name, {
      configurable: true,
      enumerable: true,
      get: getter(name, type),
      set: setter(name, type),
    });
  }
}
