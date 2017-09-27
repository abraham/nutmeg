// TODO: Move test file to TypeScript.

import '@webcomponents/webcomponentsjs/webcomponents-lite';
// import 'mocha';
// import { expect } from 'chai';
// import 'karma-fixture';

import { <%= name %> } from '../src/<%= tag %>';

describe('<<%= tag %>>', () => {
  let component;
  let defaultValue = 'Some value';

  before(() => {
    fixture.setBase('test/fixture')
  });

  afterEach(() => {
    fixture.cleanup()
  });

<% attributes.forEach((attribute) => {
print(`  describe('#${attribute.name}', () => {
    beforeEach(() => {
      component = fixture.load('${tag}.fixture.html')[${attributes.indexOf(attribute) + 2}];
    });

    describe('as property', () => {
      it('is settable', () => {
        component.${attribute.name} = defaultValue;
        expect(component.${attribute.name}).equal(defaultValue);
      });

      it('is reflected to attribute', () => {
        component.${attribute.name} = defaultValue;
        expect(component.getAttribute('${attribute.name}')).equal(defaultValue);
      });

      it('is rendered in shadowRoot', () => {
        component.${attribute.name} = defaultValue;
        expect(component.shadowRoot.querySelector('.content').innerText).to.include(\`${attribute.name}: \${defaultValue}\`);
      });
    });
  });

  describe('as attribute', () => {
    beforeEach(() => {
      component = fixture.load('${tag}.fixture.html')[${attributes.indexOf(attribute) + 2}];
    });

    it('${attribute.name} is rendered', () => {
      expect(component.shadowRoot.querySelector('.content').innerText).to.include(\`${attribute.name}: \${defaultValue}\`);
    });
  });
`);
}) %>
  describe('with slot', () => {
    beforeEach(() => {
      component = fixture.load('<%= tag %>.fixture.html')[0];
    });

    it('name is rendered', () => {
      // Firefox has different output so testing for inclusion instead of exact match.
      const slot = component.shadowRoot.querySelector('slot');
      expect(slot.assignedNodes()[0].wholeText).to.include(defaultValue);
      // TODO: Switch to simpler test when Firefox is no longer polyfilled.
      // expect(component.innerText).equal('Cat');
    });
  });

  describe('--<%= tag %>-background-color', () => {
    describe('with default', () => {
      beforeEach(() => {
        component = fixture.load('<%= tag %>.fixture.html')[0];
      });

      it('is set', () => {
        expect(getComputedStyle(component.shadowRoot.querySelector('.content')).backgroundColor).equal('rgb(250, 250, 250)');
      });
    });

    describe('with outside value', () => {
      beforeEach(() => {
        component = fixture.load('<%= tag %>.fixture.html')[1].querySelector('<%= tag %>');
      });

      it('is set blue', () => {
        expect(getComputedStyle(component.shadowRoot.querySelector('.content')).backgroundColor).equal('rgb(3, 169, 244)');
      });
    });
  });
});
