  describe('#<%= name %>', () => {
    beforeEach(() => {
      component = fixture.load(fixturePath)[FIXTURES.DEFAULT];
    });

    describe('as property', () => {
      describe('when defined', () => {
        beforeEach(() => {
          component.<%= name %> = DEFAULTS.NUMBER;
        });

        it('is gettable', () => {
          expect(component.<%= name %>).equal(DEFAULTS.NUMBER);
        });

        it('is reflected to attribute', () => {
          expect(Number(component.getAttribute('<%= name %>'))).equal(DEFAULTS.NUMBER);
        });

        it('is rendered in shadowRoot', () => {
          expect(component.shadowRoot.querySelector('.content').innerText).to.include(`<%= name %>: ${DEFAULTS.NUMBER}`);
        });
      });

      describe('when undefined', () => {
        beforeEach(() => {
          component.<%= name %> = null;
        });

        it('is gettable', () => {
          expect(component.<%= name %>).equal(null);
        });

        it('is not reflected to attribute', () => {
          expect(component.hasAttribute('<%= name %>')).to.be.false;
        });

        it('is not rendered in shadowRoot', () => {
          expect(component.shadowRoot.querySelector('.content').innerText).to.not.include(`<%= name %>: ${DEFAULTS.NUMBER}`);
        });
      });
    });

    describe('as attribute', () => {
      describe('when defined', () => {
        beforeEach(() => {
          component.setAttribute('<%= name %>', DEFAULTS.NUMBER);
        });

        it('is gettable', () => {
          expect(component.<%= name %>).equal(DEFAULTS.NUMBER);
        });

        it('is reflected to attribute', () => {
          expect(Number(component.getAttribute('<%= name %>'))).equal(DEFAULTS.NUMBER);
        });

        it('is rendered in shadowRoot', () => {
          expect(component.shadowRoot.querySelector('.content').innerText).to.include(`<%= name %>: ${DEFAULTS.NUMBER}`);
        });
      });

      describe('when undefined', () => {
        beforeEach(() => {
          component.removeAttribute('<%= name %>');
        });

        it('is gettable', () => {
          expect(component.<%= name %>).equal(null);
        });

        it('is not reflected to attribute', () => {
          expect(component.hasAttribute('<%= name %>')).to.be.false;
        });

        it('is not rendered in shadowRoot', () => {
          expect(component.shadowRoot.querySelector('.content').innerText).to.not.include(`<%= name %>: ${DEFAULTS.NUMBER}`);
        });
      });
    });
  });
