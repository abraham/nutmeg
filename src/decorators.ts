import { Seed } from './element';
import 'reflect-metadata';

const primitiveTypes = [Boolean, Number, String];

function alreadyObserved(target: HTMLElement, key: string, type: any) {
  return (<any>target).constructor[observeType(type)].includes(key);
}

function observeType(type: any): string {
  return primitiveTypes.includes(type) ? 'observedAttributes' : 'observedProperties';
}

function observe(target: HTMLElement, key: string, type: any) {
  if (!alreadyObserved(target, key, type)) {
    (<any>target).constructor[observeType(type)].push(key);
  }
}

function getter(key: string, type: any) {
  return function(this: Seed) {
    switch(type) {
      case String:
        return this.getAttribute(key);
      case Number:
        if (this.hasAttribute(key)) {
          return Number(this.getAttribute(key));
        } else {
          return null;
        }
      case Boolean:
        return this.hasAttribute(key);
      default:
        return (<any>this)[`_${key}`];
    }
  }
}

function setter(key: string, type: any) {
  return function(this: Seed, value: any) {
    if (value === null || value === undefined || value === false) {
      this.removeAttribute(key);
    } else {
      switch (type) {
        case String:
          this.setAttribute(key, String(value));
          break;
        case Number:
          this.setAttribute(key, String(value));
          break;
        case Boolean:
          this.setAttribute(key, '');
          break;
        default:
         (<any>this)[`_${key}`] = value;
      }
    }
    this.render();
  };
}

export function Property() {
  return function(target: HTMLElement, key: string) {
    const type = Reflect.getMetadata('design:type', target, key);
    observe(target, key, type);

    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: true,
      get: getter(key, type),
      set: setter(key, type),
    });
  }
}
