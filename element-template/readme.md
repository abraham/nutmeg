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
<% attributes.forEach(attribute => {
    print(`  <${tag} ${attribute.name}="Some value"></${tag}>\n\n`);
  }); %>  <<%= tag %>>Slot content</<%= tag %>>
```

License
----

<%= name %> is released under an MIT license.

Built, tested, and published with [Nutmeg](https://nutmeg.tools).
