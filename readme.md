Nutmeg
====

Build vanilla Web Components with a little spice.

🚧  **Nutmeg is an experimental tool and is not recommended for production use.**

👌 Overview
----

Nutmeg is here to help you build, test and publish Web Components in minutes.

By default you get the following:

- Web Component v1
- Shadow DOM v1
- TypeScript
- lit-html
- Webpack
- Karma test runner with browser launchers
- Git
- MIT license

🔽 Install
----

Installing is simple via NPM.

```
npm i -g @nutmeg/cli
```

🌱 Build
----

Once Nutmeg is installed you can generate a new Web Component with `nutmeg new`.

```
nutmeg new hello-world name:string
```

This will create a `hello-world` directory, stub out a base Web Component, and install the default dependencies.

You can now serve the component for development on http://localhost:8080.

```
npm run serve
```

🔬 Test
----

Running the tests from within `hello-world`.

```
npm run test
```

🗞️ Publish
----

Publishing to NPM is easy but make sure you are logged in first with `npm login`. Be sure to fill out `package.json` values like author, etc.

```
npm publish
```

👋 Example
----

[Example Web Component](https://github.com/abraham/nutmeg-hello-world) built using `nutmeg hello-world name:string`.

✅ TODO
----

- [ ] Update test emoji https://emojipedia.org/test-tube/
- [ ] Add CLI tests
- [ ] Website
- [ ] Explore upgrade paths for components
- [ ] Optimize builds
- [ ] Add more examples
 - [ ] External dependencies
 - [ ] Event API
 - [ ] Style API
 - [ ] Integrate with CI
 - [ ] Testing

👔 License
----

Nutmeg is released under an MIT license.
