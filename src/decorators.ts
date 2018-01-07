import { Element } from './element';
import 'reflect-metadata';

const primitiveTypes = [Boolean, Number, String];

function shouldObserveProperty(target: HTMLElement, key: string, type: any) {
  return !primitiveTypes.includes(type) && !(<any>target).constructor['observedProperties'].includes(key);
}

export function Property() {
  return function(target: HTMLElement, key: string) {
    const type = Reflect.getMetadata('design:type', target, key);
    if (shouldObserveProperty(target, key, type)) {
      (<any>target).constructor['observedProperties'].push(key);
    }

    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: true,
      get(this: Element) {
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
      },
      set(this: Element, value) {
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
      },
    });
  }
}
