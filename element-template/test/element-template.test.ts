import 'mocha';
import { expect } from 'chai';
import 'karma-fixture';
import '@webcomponents/webcomponentsjs/webcomponents-sd-ce';

// Karma doesn't support ESModules yet
import '../dist/<%= tag %>.bundled';

describe('<<%= tag %>>', () => {
  let component;
  let fixturePath = '<%= tag %>.fixture.html';
  const FIXTURES = {
    DEFAULT: 0,
    SLOT: 1,
    STYLE: 2,
    ATTRIBUTES: 3,
    PROPERTIES: 4,
  };
  const DEFAULTS = {
    BOOLEAN: true,
    NUMBER: 42,
    STRING: 'Pickle',
    OBJECT: {
      foo: 'bar',
    },
  }

  before(() => {
    fixture.setBase('test/fixture')
  });

  afterEach(() => {
    fixture.cleanup()
  });

  describe('slot', () => {
    beforeEach(() => {
      component = fixture.load(fixturePath)[FIXTURES.SLOT];
    });

    it('is rendered', () => {
      // Firefox has different output so testing for inclusion instead of exact match.
      const slot = component.shadowRoot.querySelector('slot');
      expect(slot.assignedNodes()[0].wholeText).to.include(DEFAULTS.STRING);
      // TODO: Switch to simpler test when Firefox is no longer polyfilled.
      // expect(component.innerText).equal('Cat');
    });
  });

  describe('--<%= tag %>-background-color', () => {
    describe('with default', () => {
      beforeEach(() => {
        component = fixture.load(fixturePath)[FIXTURES.SLOT];
      });

      it('is set', () => {
        expect(getComputedStyle(component.shadowRoot.querySelector('.content')).backgroundColor).equal('rgb(250, 250, 250)');
      });
    });

    describe('with outside value', () => {
      beforeEach(() => {
        component = fixture.load(fixturePath)[FIXTURES.STYLE].querySelector('<%= tag %>');
      });

      it('is set blue', () => {
        expect(getComputedStyle(component.shadowRoot.querySelector('.content')).backgroundColor).equal('rgb(3, 169, 244)');
      });
    });
  });
<% attributes.filter(attribute => !attribute.type.endsWith('[]'))
             .filter(attribute => primitiveTypes.includes(attribute.type))
             .forEach((attribute) => {
  print("\n" + partial(`${attribute.type}.test.js`, attribute));
}) %>
});
