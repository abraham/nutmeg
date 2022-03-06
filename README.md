<img src="https://nutmeg.tools/img/icon-medium.png" itemprop="image" alt="Nutmeg icon" width="0">
<img src="https://nutmeg.tools/img/logo-small.png" alt="Nutmeg logo">

Build, test, and publish vanilla Web Components with a little spice

[![Version Status](https://img.shields.io/npm/v/@nutmeg/cli.svg?style=flat&label=version&colorB=4bc524)](https://npmjs.com/package/@nutmeg/cli)
[![macOS Build Status](https://img.shields.io/circleci/project/github/abraham/nutmeg.svg?style=flat&label=macos)](https://circleci.com/gh/abraham/nutmeg)
[![Linux Build Status](https://img.shields.io/travis/abraham/nutmeg.svg?style=flat&label=linux)](https://travis-ci.org/abraham/nutmeg)
[![Windows Build Status](https://img.shields.io/appveyor/ci/abraham/nutmeg.svg?style=flat&label=windows)](https://ci.appveyor.com/project/abraham/nutmeg)
[![Dependency Status](https://david-dm.org/abraham/nutmeg.svg?path=packages/seed&style=flat)](https://david-dm.org/abraham/nutmeg)

🚧 _Nutmeg is in active development and it's APIs are still in flux._

## 👌 Overview

Nutmeg is here to help you build, test, and publish Web Components in minutes.

By default you get the following:

- Custom Elements v1
- Shadow DOM v1
- TypeScript
- lit-html
- Karma test runner with headless browser launchers
- Git
- MIT license
- Web Component best practices

## 🌱 Build

Generating a Nutmeg Web Component skeleton with [npm init](https://docs.npmjs.com/cli/init) has the API `<element-name> [property:type...]`.

```bash
npm init @nutmeg hello-world name:string
```

This will create a `hello-world` directory, stub out a base Web Component class `HelloWorld` that extends the Nutmeg `Seed` base class, and install the default dependencies. You can use either `fullName` or `full-name` for multi-word properties and `full-name` will be used for HTML attributes and `fullName` will be used in JavaScript.

<!-- ### 📌 Install

Optionally you can install the full CLI.

```bash
npm install --global @nutmeg/cli
```

Then generating a component is done with the `new` subcommand.

```bash
nutmeg new hello-world name:string
``` -->

_Note: Yarn is not supported but may work._

### 🏡 Properties

Properties must be valid TypeScript types. For example `string`, `boolean`, `number`, `string[]`, `Element`.

```bash
npm init @nutmeg grilled-cheese quantity:number pickles:boolean cheese:string[]
```

Properties are the public API of your Web Component and external code can set/get them.

```javascript
export class GrilledCheese extends Seed {
  @property() public bread: string;
  @property() public cheese: string[];
  @property() public pickles: boolean;
  @property() public quantity: number;
  ...
}
```

The `@property()` decorator provides some nice features out of the box. There are two kinds of properties.

- Primitive: `boolean`, `string`, and `number`.
- Complex: any types that are not primitive.

#### ✍️ Automatic rendering

Any properties decorated with `@property` will automatically render when set.

#### 📟 Primitive properties are reflected to the DOM

- **boolean**: `grilledCheese.pickle = true;` => `<grilled-cheese pickle></grilled-cheese>`
- **number**: `grilledCheese.quantity = 5;` => `<grilled-cheese quantity="5"></grilled-cheese>`
- **string**: `grilledCheese.bread = 'sourdough';` => `<grilled-cheese bread="sourdough"></grilled-cheese>`

#### 📱 One-time complex property loading from attributes

On instantiation of a Web Component a one-time loading and JSON parsing happens of complex properties. In the following example `cheese` has the type of `string[]`. When connected the component will have the attribute removed and the value set as a property after `JSON.parse`.

The following example:

```html
<grilled-cheese cheese="[\"sharp cheddar\"]"></grilled-cheese>
```

Yields:

```javascript
grilledCheese.cheese.includes('sharp cheddar') === true;
```

```html
<grilled-cheese></grilled-cheese>
```

#### `$` and `$$`

`$` and `$$` are shortcuts provided for quickly selecting elements within the shadowRoot.

- `$` is a shortcut for `this.shadowRoot.querySelector`.
- `$$` is a shortcut for `this.shadowRoot.querySelectorAll`.

### 🍽️ Serve

You can now serve the component for development on http://localhost:8080 by running:

```bash
npm start
```

With `start` running you can make edits to the component and see the changes take effect automatically without manually refreshing.

## 🧪 Test

Running the tests from within `hello-world`.

```bash
npm test
```

### 🔭 Continuous Integration

Components are generated with [AppVeyor](https://www.appveyor.com/), [CircleCI](https://circleci.com/), and [TravisCI](https://travis-ci.org/) pre-configured to run tests on Windows, macOS, and Linux respectively.

## 🗞️ Publish

Publishing to NPM is easy but make sure you are logged in first with `npm login`. Be sure to fill out `package.json` values like author and update the name in `readme.md` if you change it.

```bash
npm publish
```

### 📇 Dependencies

Once published, it's recommended that you set up [Renovate](https://renovateapp.com/) to keep your dependencies current. Nutmeg has already setup a default renovate config for you, you just have to [install the free GitHub app](https://github.com/apps/renovate).

## 😎 Best practices

Out of the box many of the [Google Web Fundamentals Custom Element Best Practices](https://developers.google.com/web/fundamentals/web-components/best-practices#place-any-children-the-element-creates-into-its-shadow-root) are handled automatically.

## 🔍 Examples

- [HelloWorld](https://github.com/abraham/nutmeg-hello-world) built using `nutmeg new hello-world name:string`.
- [TwitterStatus](https://github.com/abraham/twitter-status) for embedding tweets.

## 👔 License

Nutmeg is released under an MIT license.
