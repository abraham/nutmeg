Nutmeg
====

Build, test, and publish vanilla Web Components with a little spice

[![Version Status](https://img.shields.io/npm/v/@nutmeg/cli.svg?style=flat&label=version&colorB=4bc524)](https://npmjs.com/package/@nutmeg/cli)
[![macOS Build Status](https://img.shields.io/circleci/project/github/abraham/nutmeg-cli.svg?style=flat&label=macos)](https://circleci.com/gh/abraham/nutmeg-cli)
[![Linux Build Status](https://img.shields.io/travis/abraham/nutmeg-cli.svg?style=flat&label=linux)](https://travis-ci.org/abraham/nutmeg-cli)
[![Windows Build Status](https://img.shields.io/appveyor/ci/abraham/nutmeg-cli.svg?style=flat&label=windows)](https://ci.appveyor.com/project/abraham/nutmeg-cli)
[![Dependency Status](https://david-dm.org/abraham/nutmeg-cli.svg?style=flat)](https://david-dm.org/abraham/nutmeg-cli)


🚧  **Nutmeg is an experimental tool and is not recommended for production use.**

👌 Overview
----

Nutmeg is here to help you build, test, and publish Web Components in minutes.

By default you get the following:

- Custom Elements v1
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

Properties can be created as `string`, `boolean`, `number`, `object`, and as arrays by adding `[]` to the end.

```
nutmeg new grilled-cheese quantity:number pickles:boolean cheese:string[]
```

🚧  Property tests are currently only created for primitive types such as `string`, `boolean`, and `number`.


This will create a `hello-world` directory, stub out a base Web Component, and install the default dependencies.

You can now serve the component for development on http://localhost:8080.

```
npm run serve
```

With `serve` running you can make edits to the component and see the changes take effect without manually reloading the development page.

🔬 Test
----

Running the tests from within `hello-world`.

```
npm run test
```

🗞️ Publish
----

Publishing to NPM is easy but make sure you are logged in first with `npm login`. Be sure to fill out `package.json` values like author and update the name in `readme.md` if you change it.

```
npm publish
```

👋 Example
----

[Example Web Component](https://github.com/abraham/nutmeg-hello-world) built using `nutmeg hello-world name:string`.

✅ TODO
----

- [ ] [Update test emoji](https://emojipedia.org/test-tube/)
- [ ] Website
- [ ] Add more examples
- - [ ] External dependencies
- - [ ] Event API
- - [ ] Style API
- - [ ] Integrate with CI
- - [ ] Testing
- - [ ] Add/remove event listeners

👔 License
----

Nutmeg is released under an MIT license.
