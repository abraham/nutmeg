&lt;<%= tag %>&gt;
====

Install
----

```
npm install <%= tag %>
```

Loading this component. It would be a good idea to use a specific version instead of `latest`.

```
import '<%= tag %>';
```

Usage
----

```
<<%= tag %>></<%= tag %>>

<<%= tag %><% properties.primitive.forEach(property => {
  if (property.type == 'boolean') {
    print(` ${property.attribute}`);
  } else {
    print(` ${property.attribute}="${property.value}"`);
  }
}) %>></<%= tag %>>

<<%= tag %>>Slot content</<%= tag %>>
```

<% if (properties.complex.length > 0) {
  print('```\n');
  properties.complex.forEach(property => {
    print(`document.querySelector('<${tag}>').${property.name} = ${property.type};\n`);
  });
  print('\n```');
} %>

License
----

<%= name %> is released under an MIT license.

Built, tested, and published with [Nutmeg](https://nutmeg.tools).
