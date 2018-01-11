import 'mocha';
import { expect } from 'chai';

describe('<<%= tag %>>', () => {
  let component;

  describe('without properties', () => {
    beforeEach(() => {
      component = fixture('<<%= tag %>></<%= tag %>>');
    });

    it('renders default', () => {
      expect(component.$('.content').innerText).to.include('Welcome to <<%= tag %>>');
    });
  });

  <% properties.properties.forEach((property) => {
    print("\n" + partial(`property.ts`, { property: property, tag: tag}));
  }) %>

  describe('slot', () => {
    beforeEach(() => {
      component = fixture('<<%= tag %>>slot content</<%= tag %>>');
    });

    it('is rendered', () => {
      // Firefox has different output so testing for inclusion instead of exact match.
      expect(component.$('slot').assignedNodes()[0].wholeText).to.include('slot content');
      // TODO: Switch to simpler test when Firefox is no longer polyfilled.
      // expect(component.innerText).equal('slot content');
    });
  });

  describe('--<%= tag %>-background-color', () => {
    describe('with default', () => {
      beforeEach(() => {
        component = fixture('<<%= tag %>></<%= tag %>>');
      });

      it('is set', () => {
        expect(getComputedStyle(component.$('.content')).backgroundColor).equal('rgb(250, 250, 250)');
      });
    });

    describe('with outside value', () => {
      beforeEach(() => {
        component = fixture(`
          <div>
            <style>
              <%= tag %>.blue {
                --<%= tag %>-background-color: #03A9F4;
              }
            </style>
            <<%= tag %> class="blue"></<%= tag %>>
          </div>
        `).querySelector('<%= tag %>');
      });

      it('is set', () => {
        expect(getComputedStyle(component.$('.content')).backgroundColor).equal('rgb(3, 169, 244)');
      });
    });
  });
});

function fixture(tag: string): HTMLElement {
  function fixtureContainer(): HTMLElement {
    let div = document.createElement('div');
    div.classList.add('fixture');
    return div;
  }
  let fixture = document.body.querySelector('.fixture') || document.body.appendChild(fixtureContainer());
  fixture.innerHTML = tag;
  return fixture.children[0] as HTMLElement;
}
