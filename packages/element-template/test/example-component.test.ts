import { beforeEach, describe, expect, it } from 'vitest';

import { ExampleComponent } from '../src/example-component';

describe('<example-component>', () => {
  let component: ExampleComponent;

  describe('without properties', () => {
    beforeEach(async () => {
      component = fixture('<example-component></example-component>');
      await component.updateComplete;
    });

    it('renders default', () => {
      expect(component.$('.content').innerText).toContain(
        'Welcome to <example-component>',
      );
    });
  });

  describe('exampleNumber', () => {
    beforeEach(async () => {
      component = fixture(
        '<example-component example-number="42"></example-component>',
      );
      await component.updateComplete;
    });

    it('is rendered', () => {
      expect(component.$('.content').innerText).toContain('exampleNumber: 42');
    });
  });

  describe('exampleString', () => {
    beforeEach(async () => {
      component = fixture(
        '<example-component example-string="Pickle"></example-component>',
      );
      await component.updateComplete;
    });

    it('is rendered', () => {
      expect(component.$('.content').innerText).toContain(
        'exampleString: Pickle',
      );
    });
  });

  describe('exampleBoolean', () => {
    beforeEach(async () => {
      component = fixture(
        '<example-component example-boolean></example-component>',
      );
      await component.updateComplete;
    });

    it('is rendered', () => {
      expect(component.$('.content').innerText).toContain(
        'exampleBoolean: true',
      );
    });
  });

  describe('exampleProperty', () => {
    beforeEach(async () => {
      component = fixture('<example-component></example-component>');
      /** Set typical complex property. */
      component.exampleProperty = ['a', 'b'];
      await component.updateComplete;
    });

    it('is set', () => {
      expect(component.exampleProperty).toEqual(['a', 'b']);
    });
  });

  describe('slot', () => {
    beforeEach(async () => {
      component = fixture(
        '<example-component>slot content</example-component>',
      );
      await component.updateComplete;
    });

    it('is rendered', () => {
      expect(component.innerText).toBe('slot content');
    });
  });

  describe('--example-component-background-color', () => {
    describe('with default', () => {
      beforeEach(async () => {
        component = fixture('<example-component></example-component>');
        await component.updateComplete;
      });

      it('is set', () => {
        expect(getComputedStyle(component.$('.content')).backgroundColor).toBe(
          'rgb(255, 255, 255)',
        );
      });
    });

    describe('with outside value', () => {
      beforeEach(async () => {
        component = fixture(`
          <div>
            <style>
              example-component.blue {
                --example-component-background-color: #03A9F4;
              }
            </style>
            <example-component class="blue"></example-component>
          </div>
        `).querySelector('example-component') as ExampleComponent;
        await component.updateComplete;
      });

      it('is set', () => {
        expect(getComputedStyle(component.$('.content')).backgroundColor).toBe(
          'rgb(3, 169, 244)',
        );
      });
    });
  });
});

function fixture(tag: string): ExampleComponent {
  function fixtureContainer(): HTMLElement {
    let div = document.createElement('div');
    div.classList.add('fixture');
    return div;
  }
  let fixture =
    document.body.querySelector('.fixture') ||
    document.body.appendChild(fixtureContainer());
  fixture.innerHTML = tag;
  return fixture.children[0] as ExampleComponent;
}
