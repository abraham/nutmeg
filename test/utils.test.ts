import 'mocha';
import { expect } from 'chai';

import { attributeNameFromProperty, propertyNameFromAttribute, privatePropertyName } from './../src/utils';

describe('utils', () => {
  describe('propertyNameFromAttribute', () => {
    it('converts multi-word attributes to property name', () => {
      expect(propertyNameFromAttribute('foo-bar-baz')).to.equal('fooBarBaz');
    });

    it('leaves single word attributes alone', () => {
      expect(propertyNameFromAttribute('foo')).to.equal('foo');
    });

    it('normalizes case', () => {
      expect(propertyNameFromAttribute('fOO-bAR')).to.equal('fooBar');
    });

    it('ignores non dash names', () => {
      expect(propertyNameFromAttribute('fOO')).to.equal('fOO');
    });
  });

  describe('attributeNameFromProperty', () => {
    it('converts multi-word property to attribute  name', () => {
      expect(attributeNameFromProperty('fooBarBaz')).to.equal('foo-bar-baz');
    });

    it('leaves single word properties alone', () => {
      expect(attributeNameFromProperty('foo')).to.equal('foo');
    });
  });

  describe('privatePropertyName', () => {
    it('is formatted', () => {
      expect(privatePropertyName('foo')).to.equal('__foo');
    });
  });
});
