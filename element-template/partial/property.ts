  describe('<%= property.name %>', () => {
    beforeEach(() => {
      <%= partial('fixture.ts', { tag: tag, property: property }) %>    });

<%= partial(`it.ts`, property) %>  });
