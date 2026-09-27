import { beforeEach, describe, expect, it } from 'vitest';

import { TestElement } from './test-element';

describe('TestElement', () => {
  let component: TestElement;

  describe('renders', () => {
    beforeEach(async () => {
      component = fixture('<test-element></test-element>');
      await component.updateComplete;
    });

    it('renders default', () => {
      expect(component.$('.content')!.innerText).toContain(
        'Welcome to <test-element>',
      );
    });
  });

  describe('observedAttributes', () => {
    it('is set', () => {
      const expected = [
        'boolean-default',
        'boolean',
        'multi-word-attribute-default',
        'multi-word-attribute',
        'number-default',
        'number',
        'string-default',
        'string',
      ];
      expect([...TestElement.observedAttributes].sort()).toEqual(
        expected.sort(),
      );
    });
  });

  describe('observedProperties', () => {
    it('is set', () => {
      const expected = [
        'multiWordPropertyDefault',
        'multiWordProperty',
        'objectDefault',
        'object',
        'stringArrayDefault',
        'stringArray',
      ];
      const metadata = (
        TestElement as unknown as {
          [Symbol.metadata]: { nutmegObservedProperties: string[] };
        }
      )[Symbol.metadata];
      expect([...metadata.nutmegObservedProperties].sort()).toEqual(
        expected.sort(),
      );
    });
  });

  describe('slot', () => {
    beforeEach(async () => {
      component = fixture('<test-element>slot content</test-element>');
      await component.updateComplete;
    });

    it('is rendered', () => {
      const text = (
        component.$('slot') as HTMLSlotElement
      ).assignedNodes()[0] as Text;
      expect(text.wholeText.trim()).toBe('slot content');
    });
  });

  describe('multi word attribute', () => {
    describe('without default', () => {
      describe('when defined', () => {
        beforeEach(async () => {
          component = fixture(
            '<test-element multi-word-attribute></test-element>',
          );
          await component.updateComplete;
        });

        it('is case converted', () => {
          expect(component.multiWordAttribute).toBe(true);
        });
      });

      describe('when set', () => {
        beforeEach(async () => {
          component = fixture('<test-element></test-element>');
          component.multiWordAttribute = true;
          await component.updateComplete;
        });

        it('is case converted', () => {
          expect(component.hasAttribute('multi-word-attribute')).toBe(true);
        });
      });
    });

    describe('with default', () => {
      describe('when defined', () => {
        beforeEach(async () => {
          component = fixture(
            '<test-element multi-word-attribute-default></test-element>',
          );
          await component.updateComplete;
        });

        it('is case converted', () => {
          expect(component.multiWordAttributeDefault).toBe(true);
        });
      });

      describe('when set', () => {
        beforeEach(async () => {
          component = fixture('<test-element></test-element>');
          component.multiWordAttributeDefault = true;
          await component.updateComplete;
        });

        it('is case converted', () => {
          expect(component.hasAttribute('multi-word-attribute-default')).toBe(
            true,
          );
        });
      });
    });
  });

  describe('multi word property', () => {
    describe('without default', () => {
      describe('when defined', () => {
        beforeEach(async () => {
          component = fixture(
            '<test-element multi-word-property="[true]"></test-element>',
          );
          await component.updateComplete;
        });

        it('is case converted', () => {
          expect(component.multiWordProperty).toEqual([true]);
        });
      });

      describe('when set', () => {
        beforeEach(async () => {
          component = fixture('<test-element></test-element>');
          component.multiWordProperty = [true];
          await component.updateComplete;
        });

        it('is not reflected', () => {
          expect(component.hasAttribute('multi-word-property')).toBe(false);
        });
      });
    });

    describe('with default', () => {
      describe('when defined', () => {
        beforeEach(async () => {
          component = fixture(
            '<test-element multi-word-property-default="[true]"></test-element>',
          );
          await component.updateComplete;
        });

        it('is case converted', () => {
          expect(component.multiWordPropertyDefault).toEqual([true]);
        });
      });

      describe('when set', () => {
        beforeEach(async () => {
          component = fixture('<test-element></test-element>');
          component.multiWordPropertyDefault = [true];
          await component.updateComplete;
        });

        it('is not reflected', () => {
          expect(component.hasAttribute('multi-word-property-default')).toBe(
            false,
          );
        });
      });
    });
  });

  describe('attributes', () => {
    describe('as a string', () => {
      describe('without default', () => {
        describe('when defined', () => {
          beforeEach(async () => {
            component = fixture(
              '<test-element string="awesome"></test-element>',
            );
            await component.updateComplete;
          });

          it('is gettable', () => {
            expect(component.string).toBe('awesome');
          });

          it('is rendered in shadowRoot', () => {
            expect(component.$('.content')!.innerText).toContain(
              'string: awesome',
            );
          });
        });

        describe('when set', () => {
          beforeEach(async () => {
            component = fixture(
              '<test-element string="awesome"></test-element>',
            );
            component.string = 'sauce';
            await component.updateComplete;
          });

          it('is gettable', () => {
            expect(component.string).toBe('sauce');
          });

          it('is reflected to attribute', () => {
            expect(component.getAttribute('string')).toBe('sauce');
          });

          it('is rendered in shadowRoot', () => {
            expect(component.$('.content')!.innerText).toContain(
              'string: sauce',
            );
          });

          describe('with nothing', () => {
            beforeEach(async () => {
              component.string = '';
              await component.updateComplete;
            });

            it('is removed', () => {
              expect(component.hasAttribute('string')).toBe(false);
            });
          });
        });
      });

      describe('with default', () => {
        describe('as default', () => {
          beforeEach(async () => {
            component = fixture('<test-element></test-element>');
            await component.updateComplete;
          });

          it('is gettable', () => {
            expect(component.stringDefault).toBe('default');
          });

          it('is rendered in shadowRoot', () => {
            expect(component.$('.content')!.innerText).toContain(
              'stringDefault: default',
            );
          });
        });

        describe('when defined', () => {
          beforeEach(async () => {
            component = fixture(
              '<test-element string-default="awesome"></test-element>',
            );
            await component.updateComplete;
          });

          it('is gettable', () => {
            expect(component.stringDefault).toBe('awesome');
          });

          it('is rendered in shadowRoot', () => {
            expect(component.$('.content')!.innerText).toContain(
              'stringDefault: awesome',
            );
          });
        });

        describe('when set', () => {
          beforeEach(async () => {
            component = fixture(
              '<test-element string-default="awesome"></test-element>',
            );
            component.stringDefault = 'sauce';
            await component.updateComplete;
          });

          it('is gettable', () => {
            expect(component.stringDefault).toBe('sauce');
          });

          it('is reflected to attribute', () => {
            expect(component.getAttribute('string-default')).toBe('sauce');
          });

          it('is rendered in shadowRoot', () => {
            expect(component.$('.content')!.innerText).toContain(
              'stringDefault: sauce',
            );
          });
        });
      });
    });

    describe('as a number', () => {
      describe('without default', () => {
        describe('when defined', () => {
          beforeEach(async () => {
            component = fixture('<test-element number="13"></test-element>');
            await component.updateComplete;
          });

          it('is gettable', () => {
            expect(component.number).toBe(13);
          });

          it('is rendered in shadowRoot', () => {
            expect(component.$('.content')!.innerText).toContain('number: 13');
          });
        });

        describe('when set', () => {
          beforeEach(async () => {
            component = fixture('<test-element number="13"></test-element>');
            component.number = 42;
            await component.updateComplete;
          });

          it('is gettable', () => {
            expect(component.number).toBe(42);
          });

          it('is reflected to attribute', () => {
            expect(component.getAttribute('number')).toBe('42');
          });

          it('is rendered in shadowRoot', () => {
            expect(component.$('.content')!.innerText).toContain('number: 42');
          });
        });
      });

      describe('with default', () => {
        describe('when defined', () => {
          beforeEach(async () => {
            component = fixture(
              '<test-element number-default="13"></test-element>',
            );
            await component.updateComplete;
          });

          it('is gettable', () => {
            expect(component.numberDefault).toBe(13);
          });

          it('is rendered in shadowRoot', () => {
            expect(component.$('.content')!.innerText).toContain(
              'numberDefault: 13',
            );
          });
        });

        describe('when set', () => {
          beforeEach(async () => {
            component = fixture(
              '<test-element number-default="13"></test-element>',
            );
            component.numberDefault = 42;
            await component.updateComplete;
          });

          it('is gettable', () => {
            expect(component.numberDefault).toBe(42);
          });

          it('is reflected to attribute', () => {
            expect(component.getAttribute('number-default')).toBe('42');
          });

          it('is rendered in shadowRoot', () => {
            expect(component.$('.content')!.innerText).toContain(
              'numberDefault: 42',
            );
          });
        });
      });
    });

    describe('as a boolean', () => {
      describe('without default', () => {
        describe('when defined', () => {
          beforeEach(async () => {
            component = fixture('<test-element boolean></test-element>');
            await component.updateComplete;
          });

          it('is gettable', () => {
            expect(component.boolean).toBe(true);
          });

          it('is rendered in shadowRoot', () => {
            expect(component.$('.content')!.innerText).toContain(
              'boolean: true',
            );
          });
        });

        describe('when set', () => {
          beforeEach(async () => {
            component = fixture('<test-element boolean></test-element>');
            component.boolean = false;
            await component.updateComplete;
          });

          it('is gettable', () => {
            expect(component.boolean).toBe(false);
          });

          it('is reflected to attribute', () => {
            expect(component.hasAttribute('boolean')).toBe(false);
          });

          it('is rendered in shadowRoot', () => {
            expect(component.$('.content')!.innerText).toContain(
              'boolean: false',
            );
          });
        });
      });
    });

    describe('with default', () => {
      describe('when defined', () => {
        beforeEach(async () => {
          component = fixture('<test-element boolean-default></test-element>');
          await component.updateComplete;
        });

        it('is gettable', () => {
          expect(component.booleanDefault).toBe(true);
        });

        it('is rendered in shadowRoot', () => {
          expect(component.$('.content')!.innerText).toContain(
            'booleanDefault: true',
          );
        });
      });

      describe('when set', () => {
        beforeEach(async () => {
          component = fixture('<test-element boolean-default></test-element>');
          component.booleanDefault = false;
          await component.updateComplete;
        });

        it('is gettable', () => {
          expect(component.booleanDefault).toBe(false);
        });

        it('is reflected to attribute', () => {
          expect(component.hasAttribute('boolean-default')).toBe(false);
        });

        it('is rendered in shadowRoot', () => {
          expect(component.$('.content')!.innerText).toContain(
            'booleanDefault: false',
          );
        });
      });
    });
  });

  describe('properties', () => {
    describe('as an array', () => {
      describe('without default', () => {
        describe('when defined', () => {
          beforeEach(async () => {
            component = fixture(
              '<test-element string-array=\'["a","b"]\'></test-element>',
            );
            await component.updateComplete;
          });

          it('is gettable', () => {
            expect(component.stringArray).toEqual(['a', 'b']);
          });

          it('attribute is removed', () => {
            expect(component.hasAttribute('string-array')).toBe(false);
          });

          it('is rendered in shadowRoot', () => {
            expect(component.$('.content')!.innerText).toContain(
              'stringArray: ab',
            );
          });
        });

        describe('when set', () => {
          beforeEach(async () => {
            component = fixture(
              '<test-element string-array=\'["a","b"]\'></test-element>',
            );
            component.stringArray = ['c', 'd'];
            await component.updateComplete;
          });

          it('is gettable', () => {
            expect(component.stringArray).toEqual(['c', 'd']);
          });

          it('is reflected to attribute', () => {
            expect(component.hasAttribute('string-array')).toBe(false);
          });

          it('is rendered in shadowRoot', () => {
            expect(component.$('.content')!.innerText).toContain(
              'stringArray: cd',
            );
          });
        });
      });

      describe('with default', () => {
        describe('when defined', () => {
          beforeEach(async () => {
            component = fixture(
              '<test-element string-array-default=\'["a","b"]\'></test-element>',
            );
            await component.updateComplete;
          });

          it('is gettable', () => {
            expect(component.stringArrayDefault).toEqual(['a', 'b']);
          });

          it('attribute is removed', () => {
            expect(component.hasAttribute('string-array-default')).toBe(false);
          });

          it('is rendered in shadowRoot', () => {
            expect(component.$('.content')!.innerText).toContain(
              'stringArrayDefault: ab',
            );
          });
        });

        describe('when set', () => {
          beforeEach(async () => {
            component = fixture(
              '<test-element string-array-default=\'["a","b"]\'></test-element>',
            );
            component.stringArrayDefault = ['c', 'd'];
            await component.updateComplete;
          });

          it('is gettable', () => {
            expect(component.stringArrayDefault).toEqual(['c', 'd']);
          });

          it('is not reflected to attribute', () => {
            expect(component.hasAttribute('string-array-default')).toBe(false);
          });

          it('is rendered in shadowRoot', () => {
            expect(component.$('.content')!.innerText).toContain(
              'stringArrayDefault: cd',
            );
          });
        });
      });
    });

    describe('as an object', () => {
      describe('without default', () => {
        describe('when defined', () => {
          beforeEach(async () => {
            component = fixture(
              '<test-element object=\'{"a":"b"}\'></test-element>',
            );
            await component.updateComplete;
          });

          it('is gettable', () => {
            expect(component.object).toEqual({ a: 'b' });
          });

          it('attribute is removed', () => {
            expect(component.hasAttribute('object')).toBe(false);
          });

          it('is rendered in shadowRoot', () => {
            expect(component.$('.content')!.innerText).toContain(
              'object: [object Object]',
            );
          });
        });

        describe('when set', () => {
          beforeEach(async () => {
            component = fixture(
              '<test-element object=\'{"a":"b"}\'></test-element>',
            );
            component.object = { c: 'd' };
            await component.updateComplete;
          });

          it('is gettable', () => {
            expect(component.object).toEqual({ c: 'd' });
          });

          it('is reflected to attribute', () => {
            expect(component.hasAttribute('object')).toBe(false);
          });

          it('is rendered in shadowRoot', () => {
            expect(component.$('.content')!.innerText).toContain(
              'object: [object Object]',
            );
          });
        });
      });

      describe('with default', () => {
        describe('when defined', () => {
          beforeEach(async () => {
            component = fixture(
              '<test-element object-default=\'{"a":"b"}\'></test-element>',
            );
            await component.updateComplete;
          });

          it('is gettable', () => {
            expect(component.objectDefault).toEqual({ a: 'b' });
          });

          it('attribute is removed', () => {
            expect(component.hasAttribute('object-default')).toBe(false);
          });

          it('is rendered in shadowRoot', () => {
            expect(component.$('.content')!.innerText).toContain(
              'objectDefault: [object Object]',
            );
          });
        });

        describe('when set', () => {
          beforeEach(async () => {
            component = fixture(
              '<test-element object-default=\'{"a":"b"}\'></test-element>',
            );
            component.objectDefault = { c: 'd' };
            await component.updateComplete;
          });

          it('is gettable', () => {
            expect(component.objectDefault).toEqual({ c: 'd' });
          });

          it('is not reflected to attribute', () => {
            expect(component.hasAttribute('object-default')).toBe(false);
            expect(component.hasAttribute('objectDefault')).toBe(false);
          });

          it('is rendered in shadowRoot', () => {
            expect(component.$('.content')!.innerText).toContain(
              'objectDefault: [object Object]',
            );
          });
        });
      });
    });
  });

  describe('$', () => {
    beforeEach(async () => {
      component = fixture('<test-element></test-element>');
      await component.updateComplete;
    });

    it('selects a single element', () => {
      expect(component.$('#money')!.innerText).toBe('money');
    });
  });

  describe('$$', () => {
    beforeEach(async () => {
      component = fixture('<test-element></test-element>');
      await component.updateComplete;
    });

    it('selects several elements', () => {
      expect(component.$$('.monies').length).toBe(2);
      expect(component.$$('.monies')[0].innerText).toBe('monies');
    });
  });

  describe('--test-element-background-color', () => {
    describe('with default', () => {
      beforeEach(async () => {
        component = fixture('<test-element></test-element>');
        await component.updateComplete;
      });

      it('is set', () => {
        expect(getComputedStyle(component.$('.content')!).backgroundColor).toBe(
          'rgb(250, 250, 250)',
        );
      });
    });

    describe('with outside value', () => {
      beforeEach(async () => {
        component = fixture(`
          <div>
            <style>
              test-element.blue {
                --test-element-background-color: #03A9F4;
              }
            </style>
            <test-element class="blue"></test-element>
          </div>
        `).querySelector('test-element') as TestElement;
        await component.updateComplete;
      });

      it('is set blue', () => {
        expect(getComputedStyle(component.$('.content')!).backgroundColor).toBe(
          'rgb(3, 169, 244)',
        );
      });
    });
  });
});

function fixture(tag: string): TestElement {
  function fixtureContainer(): HTMLElement {
    const div = document.createElement('div');
    div.classList.add('fixture');
    return div;
  }
  const fixture =
    document.body.querySelector('.fixture') ||
    document.body.appendChild(fixtureContainer());
  fixture.innerHTML = tag;
  return fixture.children[0] as TestElement;
}
