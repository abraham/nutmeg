import 'mocha';
import { expect } from 'chai';
import { TestElement } from './test-element';

declare global {
  interface Window {
    ShadyCSS?: {
      nativeShadow: boolean;
    };
  }
}

describe('TestElement', () => {
  let component: TestElement;

  describe('renders', () => {
    beforeEach(() => {
      component = fixture('<test-element></test-element>');
    });

    it('renders default', () => {
      expect(component.$('.content').innerText).to.include('Welcome to <test-element>');
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
      expect(TestElement.observedAttributes.sort()).to.eql(expected.sort());
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
      expect(TestElement.observedProperties.sort()).to.eql(expected.sort());
    });
  });

  describe('slot', () => {
    beforeEach(() => {
      component = fixture('<test-element>slot content</test-element>');
    });

    it('is rendered', () => {
      const text = (component.$('slot') as HTMLSlotElement).assignedNodes()[0] as Text;
      expect(text.wholeText.trim()).to.eq('slot content');
    });
  });

  describe('multi word attribute', () => {
    describe('without default', () => {
      describe('when defined', () => {
        beforeEach(() => {
          component = fixture('<test-element multi-word-attribute></test-element>');
        });

        it('is case converted', () => {
          expect(component.multiWordAttribute).to.be.true;
        });
      });

      describe('when set', () => {
        beforeEach(() => {
          component = fixture('<test-element></test-element>');
          component.multiWordAttribute = true;
        });

        it('is case converted', () => {
          expect(component.hasAttribute('multi-word-attribute')).to.be.true;
        });
      });
    });

    describe('with default', () => {
      describe('when defined', () => {
        beforeEach(() => {
          component = fixture('<test-element multi-word-attribute-default></test-element>');
        });

        it('is case converted', () => {
          expect(component.multiWordAttributeDefault).to.be.true;
        });
      });

      describe('when set', () => {
        beforeEach(() => {
          component = fixture('<test-element></test-element>');
          component.multiWordAttributeDefault = true;
        });

        it('is case converted', () => {
          expect(component.hasAttribute('multi-word-attribute-default')).to.be.true;
        });
      });
    });
  });

  describe('multi word property', () => {
    describe('without default', () => {
      describe('when defined', () => {
        beforeEach(() => {
          component = fixture('<test-element multi-word-property="[true]"></test-element>');
        });

        it('is case converted', () => {
          expect(component.multiWordProperty).to.eql([true]);
        });
      });

      describe('when set', () => {
        beforeEach(() => {
          component = fixture('<test-element></test-element>');
          component.multiWordProperty = [true];
        });

        it('is not reflected', () => {
          expect(component.hasAttribute('multi-word-property')).to.be.false;
        });
      });
    });

    describe('with default', () => {
      describe('when defined', () => {
        beforeEach(() => {
          component = fixture('<test-element multi-word-property-default="[true]"></test-element>');
        });

        it('is case converted', () => {
          expect(component.multiWordPropertyDefault).to.eql([true]);
        });
      });

      describe('when set', () => {
        beforeEach(() => {
          component = fixture('<test-element></test-element>');
          component.multiWordPropertyDefault = [true];
        });

        it('is not reflected', () => {
          expect(component.hasAttribute('multi-word-property-default')).to.be.false;
        });
      });
    });
  });

  describe('attributes', () => {
    describe('as a string', () => {
      describe('without default', () => {
        describe('when defined', () => {
          beforeEach(() => {
            component = fixture('<test-element string="awesome"></test-element>');
          });

          it('is gettable', () => {
            expect(component.string).equal('awesome');
          });

          it('is rendered in shadowRoot', () => {
            expect(component.$('.content').innerText).to.include('string: awesome');
          });
        });

        describe('when set', () => {
          beforeEach(() => {
            component = fixture('<test-element string="awesome"></test-element>');
            component.string = 'sauce';
          });

          it('is gettable', () => {
            expect(component.string).equal('sauce');
          });

          it('is reflected to attribute', () => {
            expect(component.getAttribute('string')).equal('sauce');
          });

          it('is rendered in shadowRoot', () => {
            expect(component.$('.content').innerText).to.include('string: sauce');
          });

          describe('with nothing', () => {
            beforeEach(() => {
              component.string = '';
            });

            it('is removed', () => {
              expect(component.hasAttribute('string')).to.be.false;
            });
          });
        });
      });

      describe('with default', () => {
        describe('as default', () => {
          beforeEach(() => {
            component = fixture('<test-element></test-element>');
          });

          it('is gettable', () => {
            expect(component.stringDefault).equal('default');
          });

          it('is rendered in shadowRoot', () => {
            expect(component.$('.content').innerText).to.include('stringDefault: default');
          });
        });

        describe('when defined', () => {
          beforeEach(() => {
            component = fixture('<test-element string-default="awesome"></test-element>');
          });

          it('is gettable', () => {
            expect(component.stringDefault).equal('awesome');
          });

          it('is rendered in shadowRoot', () => {
            expect(component.$('.content').innerText).to.include('stringDefault: awesome');
          });
        });

        describe('when set', () => {
          beforeEach(() => {
            component = fixture('<test-element string-default="awesome"></test-element>');
            component.stringDefault = 'sauce';
          });

          it('is gettable', () => {
            expect(component.stringDefault).equal('sauce');
          });

          it('is reflected to attribute', () => {
            expect(component.getAttribute('string-default')).equal('sauce');
          });

          it('is rendered in shadowRoot', () => {
            expect(component.$('.content').innerText).to.include('stringDefault: sauce');
          });
        });
      });
    });

    describe('as a number', () => {
      describe('without default', () => {
        describe('when defined', () => {
          beforeEach(() => {
            component = fixture('<test-element number="13"></test-element>');
          });

          it('is gettable', () => {
            expect(component.number).equal(13);
          });

          it('is rendered in shadowRoot', () => {
            expect(component.$('.content').innerText).to.include('number: 13');
          });
        });

        describe('when set', () => {
          beforeEach(() => {
            component = fixture('<test-element number="13"></test-element>');
            component.number = 42;
          });

          it('is gettable', () => {
            expect(component.number).equal(42);
          });

          it('is reflected to attribute', () => {
            expect(component.getAttribute('number')).equal('42');
          });

          it('is rendered in shadowRoot', () => {
            expect(component.$('.content').innerText).to.include('number: 42');
          });
        });
      });

      describe('with default', () => {
        describe('when defined', () => {
          beforeEach(() => {
            component = fixture('<test-element number-default="13"></test-element>');
          });

          it('is gettable', () => {
            expect(component.numberDefault).equal(13);
          });

          it('is rendered in shadowRoot', () => {
            expect(component.$('.content').innerText).to.include('numberDefault: 13');
          });
        });

        describe('when set', () => {
          beforeEach(() => {
            component = fixture('<test-element number-default="13"></test-element>');
            component.numberDefault = 42;
          });

          it('is gettable', () => {
            expect(component.numberDefault).equal(42);
          });

          it('is reflected to attribute', () => {
            expect(component.getAttribute('number-default')).equal('42');
          });

          it('is rendered in shadowRoot', () => {
            expect(component.$('.content').innerText).to.include('numberDefault: 42');
          });
        });
      });
    });

    describe('as a boolean', () => {
      describe('without default', () => {
        describe('when defined', () => {
          beforeEach(() => {
            component = fixture('<test-element boolean></test-element>');
          });

          it('is gettable', () => {
            expect(component.boolean).to.be.true;
          });

          it('is rendered in shadowRoot', () => {
            expect(component.$('.content').innerText).to.include('boolean: true');
          });
        });

        describe('when set', () => {
          beforeEach(() => {
            component = fixture('<test-element boolean></test-element>');
            component.boolean = false;
          });

          it('is gettable', () => {
            expect(component.boolean).to.be.false;
          });

          it('is reflected to attribute', () => {
            expect(component.hasAttribute('boolean')).to.be.false;
          });

          it('is rendered in shadowRoot', () => {
            expect(component.$('.content').innerText).to.include('boolean: false');
          });
        });
      });
    });

    describe('with default', () => {
      describe('when defined', () => {
        beforeEach(() => {
          component = fixture('<test-element boolean-default></test-element>');
        });

        it('is gettable', () => {
          expect(component.booleanDefault).to.be.true;
        });

        it('is rendered in shadowRoot', () => {
          expect(component.$('.content').innerText).to.include('booleanDefault: true');
        });
      });

      describe('when set', () => {
        beforeEach(() => {
          component = fixture('<test-element boolean-default></test-element>');
          component.booleanDefault = false;
        });

        it('is gettable', () => {
          expect(component.booleanDefault).to.be.false;
        });

        it('is reflected to attribute', () => {
          expect(component.hasAttribute('boolean-default')).to.be.false;
        });

        it('is rendered in shadowRoot', () => {
          expect(component.$('.content').innerText).to.include('booleanDefault: false');
        });
      });
    });
  });

  describe('properties', () => {
    describe('as an array', () => {
      describe('without default', () => {
        describe('when defined', () => {
          beforeEach(() => {
            component = fixture('<test-element string-array=\'["a","b"]\'></test-element>');
          });

          it('is gettable', () => {
            expect(component.stringArray).to.eql(['a', 'b']);
          });

          it('attribute is removed', () => {
            expect(component.hasAttribute('string-array')).to.be.false;
          });

          it('is rendered in shadowRoot', () => {
            expect(component.$('.content').innerText).to.include('stringArray: ab');
          });
        });

        describe('when set', () => {
          beforeEach(() => {
            component = fixture('<test-element string-array=\'["a","b"]\'></test-element>');
            component.stringArray = ['c', 'd'];
          });

          it('is gettable', () => {
            expect(component.stringArray).to.eql(['c', 'd']);
          });

          it('is reflected to attribute', () => {
            expect(component.hasAttribute('string-array')).equal(false);
          });

          it('is rendered in shadowRoot', () => {
            expect(component.$('.content').innerText).to.include('stringArray: cd');
          });
        });
      });

      describe('with default', () => {
        describe('when defined', () => {
          beforeEach(() => {
            component = fixture('<test-element string-array-default=\'["a","b"]\'></test-element>');
          });

          it('is gettable', () => {
            expect(component.stringArrayDefault).to.eql(['a', 'b']);
          });

          it('attribute is removed', () => {
            expect(component.hasAttribute('string-array-default')).to.be.false;
          });

          it('is rendered in shadowRoot', () => {
            expect(component.$('.content').innerText).to.include('stringArrayDefault: ab');
          });
        });

        describe('when set', () => {
          beforeEach(() => {
            component = fixture('<test-element string-array-default=\'["a","b"]\'></test-element>');
            component.stringArrayDefault = ['c', 'd'];
          });

          it('is gettable', () => {
            expect(component.stringArrayDefault).to.eql(['c', 'd']);
          });

          it('is not reflected to attribute', () => {
            expect(component.hasAttribute('string-array-default')).equal(false);
          });

          it('is rendered in shadowRoot', () => {
            expect(component.$('.content').innerText).to.include('stringArrayDefault: cd');
          });
        });
      });
    });

    describe('as an object', () => {
      describe('without default', () => {
        describe('when defined', () => {
          beforeEach(() => {
            component = fixture('<test-element object=\'{"a":"b"}\'></test-element>');
          });

          it('is gettable', () => {
            expect(component.object).to.eql({a: 'b'});
          });

          it('attribute is removed', () => {
            expect(component.hasAttribute('object')).to.be.false;
          });

          it('is rendered in shadowRoot', () => {
            expect(component.$('.content').innerText).to.include('object: [object Object]');
          });
        });

        describe('when set', () => {
          beforeEach(() => {
            component = fixture('<test-element object=\'{"a":"b"}\'></test-element>');
            component.object = {c: 'd'};
          });

          it('is gettable', () => {
            expect(component.object).to.eql({c: 'd'});
          });

          it('is reflected to attribute', () => {
            expect(component.hasAttribute('object')).to.be.false;
          });

          it('is rendered in shadowRoot', () => {
            expect(component.$('.content').innerText).to.include('object: [object Object]');
          });
        });
      });

      describe('with default', () => {
        describe('when defined', () => {
          beforeEach(() => {
            component = fixture('<test-element object-default=\'{"a":"b"}\'></test-element>');
          });

          it('is gettable', () => {
            expect(component.objectDefault).to.eql({a: 'b'});
          });

          it('attribute is removed', () => {
            expect(component.hasAttribute('object-default')).to.be.false;
          });

          it('is rendered in shadowRoot', () => {
            expect(component.$('.content').innerText).to.include('objectDefault: [object Object]');
          });
        });

        describe('when set', () => {
          beforeEach(() => {
            component = fixture('<test-element object-default=\'{"a":"b"}\'></test-element>');
            component.objectDefault = {c: 'd'};
          });

          it('is gettable', () => {
            expect(component.objectDefault).to.eql({c: 'd'});
          });

          it('is not reflected to attribute', () => {
            expect(component.hasAttribute('object-default')).to.be.false;
            expect(component.hasAttribute('objectDefault')).to.be.false;
          });

          it('is rendered in shadowRoot', () => {
            expect(component.$('.content').innerText).to.include('objectDefault: [object Object]');
          });
        });
      });
    });
  });

  describe('$', () => {
    beforeEach(() => {
      component = fixture('<test-element></test-element>');
    });

    it('selects a single element', () => {
      expect(component.$('#money').innerText).to.eq('money');
    });
  });

  describe('$$', () => {
    beforeEach(() => {
      component = fixture('<test-element></test-element>');
    });

    it('selects several elements', () => {
      expect(component.$$('.monies').length).to.eq(2);
      expect(component.$$('.monies')[0].innerText).to.eq('monies');
    });
  });

  describe('--test-element-background-color', () => {
    describe('with default', () => {
      beforeEach(() => {
        component = fixture('<test-element></test-element>');
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
              test-element.blue {
                --test-element-background-color: #03A9F4;
              }
            </style>
            <test-element class="blue"></test-element>
          </div>
        `).querySelector('test-element') as TestElement;
      });

      it('is set blue', () => {
        expect(getComputedStyle(component.$('.content')).backgroundColor).equal('rgb(3, 169, 244)');
      });
    });
  });

  describe('shady dom', () => {
    beforeEach(() => {
      component = fixture('<test-element></test-element>');
    });

    it('has classes set if polyfilled', () => {
      const polyfilled = !window.ShadyCSS.nativeShadow;
      expect(component.$('div').classList.contains('style-scope')).to.be.eq(polyfilled);
      expect(component.$('div').classList.contains('test-element')).to.be.eq(polyfilled);
    });
  });
});

function fixture(tag: string): TestElement {
  function fixtureContainer(): HTMLElement {
    let div = document.createElement('div');
    div.classList.add('fixture');
    return div;
  }
  let fixture = document.body.querySelector('.fixture') || document.body.appendChild(fixtureContainer());
  fixture.innerHTML = tag;
  return fixture.children[0] as TestElement;
}
