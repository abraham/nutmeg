    it('is rendered', () => {
      <% if (!['number', 'string', 'boolean'].includes(type)) { print('// '); } %>expect(component.$('.content').innerText).to.include('<%= name %>: <%= value %>');
    });
