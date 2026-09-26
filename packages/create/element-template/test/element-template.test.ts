import { beforeEach, describe, expect, it } from 'vitest';

import { <%= name %> } from '../src/<%= tag %>';

describe('<<%= tag %>>', () => {
  let component: <%= name %>;

  describe('without properties', () => {
    beforeEach(async () => {
      component = fixture('<<%= tag %>></<%= tag %>>');
      await component.updateComplete;
    });

    it('renders default', () => {
      expect(component.$('.content').innerText).toContain('Welcome to <<%= tag %>>');
    });
  });

  <% properties.properties.forEach((property) => {
    print("\n" + partial(`property.ts`, { property: property, tag: tag}));
  }) %>

  describe('slot', () => {
    beforeEach(async () => {
      component = fixture('<<%= tag %>>slot content</<%= tag %>>');
      await component.updateComplete;
    });

    it('is rendered', () => {
      expect(component.innerText).toBe('slot content');
    });
  });

  describe('--<%= tag %>-background-color', () => {
    describe('with default', () => {
      beforeEach(async () => {
        component = fixture('<<%= tag %>></<%= tag %>>');
        await component.updateComplete;
      });

      it('is set', () => {
        expect(getComputedStyle(component.$('.content')).backgroundColor).toBe('rgb(255, 255, 255)');
      });
    });

    describe('with outside value', () => {
      beforeEach(async () => {
        component = fixture(`
          <div>
            <style>
              <%= tag %>.blue {
                --<%= tag %>-background-color: #03A9F4;
              }
            </style>
            <<%= tag %> class="blue"></<%= tag %>>
          </div>
        `).querySelector('<%= tag %>') as <%= name %>;
        await component.updateComplete;
      });

      it('is set', () => {
        expect(getComputedStyle(component.$('.content')).backgroundColor).toBe('rgb(3, 169, 244)');
      });
    });
  });
});

function fixture(tag: string): <%= name %> {
  function fixtureContainer(): HTMLElement {
    let div = document.createElement('div');
    div.classList.add('fixture');
    return div;
  }
  let fixture = document.body.querySelector('.fixture') || document.body.appendChild(fixtureContainer());
  fixture.innerHTML = tag;
  return fixture.children[0] as <%= name %>;
}
