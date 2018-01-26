import 'mocha';
import { expect } from 'chai';

import { propertyNameFromAttribute } from './../src/utils';

describe('utils', () => {
  describe('propertyNameFromAttribute', () => {
    it('converts multi-word attributes to property name', () => {
      expect(propertyNameFromAttribute('foo-bar-baz')).to.equal('fooBarBaz');
    });

    it('leaves single word attributes alone', () => {
      expect(propertyNameFromAttribute('foo')).to.equal('foo');
    });

    it('normalizes casing', () => {
      expect(propertyNameFromAttribute('fOO-bAR')).to.equal('fooBar');
    });
  });
});
