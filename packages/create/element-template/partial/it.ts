    it('is rendered', () => {
      <% if (!['number', 'string', 'boolean'].includes(type)) { print('// '); } %>expect(component.$('.content').innerText).toContain('<%= name %>: <%= value %>');
    });
