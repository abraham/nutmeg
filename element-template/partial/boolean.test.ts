  describe('#<%= name %>', () => {
    beforeEach(() => {
      component = fixture.load(fixturePath)[FIXTURES.DEFAULT];
    });

    describe('as property', () => {
      describe('when true', () => {
        beforeEach(() => {
          component.<%= name %> = true;
        });

        it('is gettable', () => {
          expect(component.<%= name %>).to.be.true;
        });

        it('is reflected to attribute', () => {
          expect(component.hasAttribute('<%= name %>')).to.be.true;
        });

        it('is rendered in shadowRoot', () => {
          expect(component.shadowRoot.querySelector('.content').innerText).to.include(`<%= name %>: true`);
        });
      });

      describe('when false', () => {
        beforeEach(() => {
          component.<%= name %> = false;
        });

        it('is gettable', () => {
          expect(component.<%= name %>).to.be.false
        });

        it('is not reflected to attribute', () => {
          expect(component.hasAttribute('<%= name %>')).to.be.false;
        });

        it('is rendered in shadowRoot', () => {
          expect(component.shadowRoot.querySelector('.content').innerText).to.include(`<%= name %>: false`);
        });
      });
    });

    describe('as attribute', () => {
      describe('when true', () => {
        beforeEach(() => {
          component.setAttribute('<%= name %>', '');
        });

        it('is gettable', () => {
          expect(component.<%= name %>).to.be.true;
        });

        it('is reflected to attribute', () => {
          expect(component.hasAttribute('<%= name %>')).to.be.true;
        });

        it('is rendered in shadowRoot', () => {
          expect(component.shadowRoot.querySelector('.content').innerText).to.include(`<%= name %>: true`);
        });
      });

      describe('when false', () => {
        beforeEach(() => {
          component.removeAttribute('<%= name %>');
        });

        it('is gettable', () => {
          expect(component.<%= name %>).to.be.false
        });

        it('is not reflected to attribute', () => {
          expect(component.hasAttribute('<%= name %>')).to.be.false;
        });

        it('is rendered in shadowRoot', () => {
          expect(component.shadowRoot.querySelector('.content').innerText).to.include(`<%= name %>: false`);
        });
      });
    });
  });
