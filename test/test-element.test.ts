import 'mocha';
import { expect } from 'chai';
import { TestElement } from './test-element';

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

  describe('multi word property', () => {
    describe('when defined', () => {
      beforeEach(() => {
        component = fixture('<test-element multi-word-property="true"></test-element>');
      });

      it('is case converted', () => {
        expect(component.multiWordProperty).to.be.true;
      });
    });

    describe('when set', () => {
      beforeEach(() => {
        component = fixture('<test-element></test-element>');
        component.multiWordProperty = true;
      });

      it('is case converted', () => {
        expect(component.hasAttribute('multi-word-property')).to.be.true;
      });
    });
  });

  describe('attributes', () => {
    describe('as a string', () => {
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
          component = fixture('<test-element one="awesome"></test-element>');
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
      });
    });

    describe('as a number', () => {
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

    describe('as a boolean', () => {
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

  describe('properties', () => {
    describe('as an array', () => {
      describe('when defined', () => {
        beforeEach(() => {
          component = fixture('<test-element stringArray=\'["a","b"]\'></test-element>');
        });

        it('is gettable', () => {
          expect(component.stringArray).to.eql(['a', 'b']);
        });

        it('attribute is removed', () => {
          expect(component.hasAttribute('stringArray')).to.be.false;
        });

        it('is rendered in shadowRoot', () => {
          expect(component.$('.content').innerText).to.include('stringArray: ab');
        });
      });

      describe('when set', () => {
        beforeEach(() => {
          component = fixture('<test-element stringArray=\'["a","b"]\'></test-element>');
          component.stringArray = ['c', 'd'];
        });

        it('is gettable', () => {
          expect(component.stringArray).to.eql(['c', 'd']);
        });

        it('is reflected to attribute', () => {
          expect(component.hasAttribute('stringArray')).equal(false);
        });

        it('is rendered in shadowRoot', () => {
          expect(component.$('.content').innerText).to.include('stringArray: cd');
        });
      });
    });

    describe('as an object', () => {
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
