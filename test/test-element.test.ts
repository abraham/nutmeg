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

  describe('attributes', () => {
    describe('as a string', () => {
      describe('when defined', () => {
        beforeEach(() => {
          component = fixture('<test-element one="awesome"></test-element>');
        });

        it('is gettable', () => {
          expect(component.one).equal('awesome');
        });

        it('is rendered in shadowRoot', () => {
          expect(component.$('.content').innerText).to.include('one: awesome');
        });
      });

      describe('when set', () => {
        beforeEach(() => {
          component = fixture('<test-element one="awesome"></test-element>');
          component.one = 'sauce';
        });

        it('is gettable', () => {
          expect(component.one).equal('sauce');
        });

        it('is reflected to attribute', () => {
          expect(component.getAttribute('one')).equal('sauce');
        });

        it('is rendered in shadowRoot', () => {
          expect(component.$('.content').innerText).to.include('one: sauce');
        });
      });
    });

    describe('as a number', () => {
      describe('when defined', () => {
        beforeEach(() => {
          component = fixture('<test-element two="13"></test-element>');
        });

        it('is gettable', () => {
          expect(component.two).equal(13);
        });

        it('is rendered in shadowRoot', () => {
          expect(component.$('.content').innerText).to.include('two: 13');
        });
      });

      describe('when set', () => {
        beforeEach(() => {
          component = fixture('<test-element two="13"></test-element>');
          component.two = 42;
        });

        it('is gettable', () => {
          expect(component.two).equal(42);
        });

        it('is reflected to attribute', () => {
          expect(component.getAttribute('two')).equal('42');
        });

        it('is rendered in shadowRoot', () => {
          expect(component.$('.content').innerText).to.include('two: 42');
        });
      });
    });

    describe('as a boolean', () => {
      describe('when defined', () => {
        beforeEach(() => {
          component = fixture('<test-element three></test-element>');
        });

        it('is gettable', () => {
          expect(component.three).to.be.true;
        });

        it('is rendered in shadowRoot', () => {
          expect(component.$('.content').innerText).to.include('three: true');
        });
      });

      describe('when set', () => {
        beforeEach(() => {
          component = fixture('<test-element three></test-element>');
          component.three = false;
        });

        it('is gettable', () => {
          expect(component.three).to.be.false;
        });

        it('is reflected to attribute', () => {
          expect(component.hasAttribute('three')).to.be.false;
        });

        it('is rendered in shadowRoot', () => {
          expect(component.$('.content').innerText).to.include('three: false');
        });
      });
    });
  });

  describe('properties', () => {
    describe('as an array', () => {
      describe('when defined', () => {
        beforeEach(() => {
          component = fixture('<test-element four=\'["a","b"]\'></test-element>');
        });

        it('is gettable', () => {
          expect(component.four).to.eql(['a', 'b']);
        });

        it('attribute is removed', () => {
          expect(component.hasAttribute('four')).to.be.false;
        });

        it('is rendered in shadowRoot', () => {
          expect(component.$('.content').innerText).to.include('four: ab');
        });
      });

      describe('when set', () => {
        beforeEach(() => {
          component = fixture('<test-element four=\'["a","b"]\'></test-element>');
          component.four = ['c', 'd'];
        });

        it('is gettable', () => {
          expect(component.four).to.eql(['c', 'd']);
        });

        it('is reflected to attribute', () => {
          expect(component.hasAttribute('four')).equal(false);
        });

        it('is rendered in shadowRoot', () => {
          expect(component.$('.content').innerText).to.include('four: cd');
        });
      });
    });

    describe('as an object', () => {
      describe('when defined', () => {
        beforeEach(() => {
          component = fixture('<test-element five=\'{"a":"b"}\'></test-element>');
        });

        it('is gettable', () => {
          expect(component.five).to.eql({a: 'b'});
        });

        it('attribute is removed', () => {
          expect(component.hasAttribute('five')).to.be.false;
        });

        it('is rendered in shadowRoot', () => {
          expect(component.$('.content').innerText).to.include('five: [object Object]');
        });
      });

      describe('when set', () => {
        beforeEach(() => {
          component = fixture('<test-element five=\'{"a":"b"}\'></test-element>');
          component.five = {c: 'd'};
        });

        it('is gettable', () => {
          expect(component.five).to.eql({c: 'd'});
        });

        it('is reflected to attribute', () => {
          expect(component.hasAttribute('five')).to.be.false;
        });

        it('is rendered in shadowRoot', () => {
          expect(component.$('.content').innerText).to.include('five: [object Object]');
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
