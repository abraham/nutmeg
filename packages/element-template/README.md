&lt;example-component&gt;
====

Install
----

```
npm install example-component
```

Loading this component. It would be a good idea to use a specific version instead of `latest`.

```
import 'example-component';
```

Usage
----

```
<example-component></example-component>

<example-component example-number="42" example-string="Pickle" example-boolean></example-component>

<example-component>Slot content</example-component>
```

```
document.querySelector('example-component').exampleProperty = ['a', 'b'];
```

License
----

ExampleComponent is released under an MIT license.

Built, tested, and published with [Nutmeg](https://nutmeg.tools).
