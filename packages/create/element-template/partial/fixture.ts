component = fixture('<<%= tag %><%
  if (property.type == 'boolean') {
    print(` ${property.attribute}`);
  } else if(['number', 'string'].includes(property.type)) {
    print(` ${property.attribute}="${property.value}"`);
  } %>></<%= tag %>>');<% if (!['number', 'string', 'boolean'].includes(property.type)) {
  print('\n      /** Set typical complex property. */\n');
  print(`      // component.${property.name} = ${property.type}`);
} %>
