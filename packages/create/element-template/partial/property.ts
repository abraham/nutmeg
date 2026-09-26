  describe('<%= property.name %>', () => {
    beforeEach(async () => {
      <%= partial('fixture.ts', { tag: tag, property: property }) %>    });

<%= partial(`it.ts`, property) %>  });
