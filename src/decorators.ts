import 'reflect-metadata';

import { Seed } from './seed';
import { attributeNameFromProperty, propertyNameFromAttribute, privatePropertyName } from './utils';

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

function observe(target: HTMLElement, name: string, type: any) {
  if (!alreadyObserved(target, name, type)) {
    (<any>target).constructor[observeType(type)].push(name);
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
    if (value === null || value === undefined || value === false) {
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

export function Property() {
  return function(target: HTMLElement, name: string) {
    const type = Reflect.getMetadata('design:type', target, name);
    observe(target, name, type);

    Object.defineProperty(target, name, {
      configurable: true,
      enumerable: true,
      get: getter(name, type),
      set: setter(name, type),
    });
  }
}
