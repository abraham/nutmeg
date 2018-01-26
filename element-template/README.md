&lt;<%= tag %>&gt;
====

Install
----

Polyfill tags if you need them. This will include ShadowDOM and Custom Elements support.

```
<script src="https://unpkg.com/@webcomponents/webcomponentsjs@latest/webcomponents-sd-ce.js"></script>
```

Loading this component. It would be a good idea to use a specific version instead of `latest`.

```
<script src="https://unpkg.com/<%= tag %>@latest/dist/<%= tag %>.min.js"></script>
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
