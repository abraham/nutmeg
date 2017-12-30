  describe('#<%= name %>', () => {
    beforeEach(() => {
      component = fixture.load(fixturePath)[FIXTURES.DEFAULT];
    });

    describe('as property', () => {
      describe('when defined', () => {
        beforeEach(() => {
          component.<%= name %> = DEFAULTS.STRING;
        });

        it('is gettable', () => {
          expect(component.<%= name %>).equal(DEFAULTS.STRING);
        });

        it('is reflected to attribute', () => {
          expect(component.getAttribute('<%= name %>')).equal(DEFAULTS.STRING);
        });

        it('is rendered in shadowRoot', () => {
          expect(component.shadowRoot.querySelector('.content').innerText).to.include(`<%= name %>: ${DEFAULTS.STRING}`);
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
          component.setAttribute('<%= name %>', DEFAULTS.STRING);
        });

        it('is gettable', () => {
          expect(component.<%= name %>).equal(DEFAULTS.STRING);
        });

        it('is reflected to attribute', () => {
          expect(component.getAttribute('<%= name %>')).equal(DEFAULTS.STRING);
        });

        it('is rendered in shadowRoot', () => {
          expect(component.shadowRoot.querySelector('.content').innerText).to.include(`<%= name %>: ${DEFAULTS.STRING}`);
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
