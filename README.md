# Nutmeg


Build, test, and publish vanilla Web Components with a little spice

[![Version Status](https://img.shields.io/npm/v/@nutmeg/cli.svg?style=flat&label=version&colorB=4bc524)](https://npmjs.com/package/@nutmeg/cli)
[![macOS Build Status](https://img.shields.io/circleci/project/github/abraham/nutmeg-cli.svg?style=flat&label=macos)](https://circleci.com/gh/abraham/nutmeg-cli)
[![Linux Build Status](https://img.shields.io/travis/abraham/nutmeg-cli.svg?style=flat&label=linux)](https://travis-ci.org/abraham/nutmeg-cli)
[![Windows Build Status](https://img.shields.io/appveyor/ci/abraham/nutmeg-cli.svg?style=flat&label=windows)](https://ci.appveyor.com/project/abraham/nutmeg-cli)
[![Dependency Status](https://david-dm.org/abraham/nutmeg-cli.svg?style=flat)](https://david-dm.org/abraham/nutmeg-cli)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fabraham%2Fnutmeg-cli.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fabraham%2Fnutmeg-cli?ref=badge_shield)


🚧  **Nutmeg is an experimental tool and is not recommended for production use.**

## 👌 Overview

Nutmeg is here to help you build, test, and publish Web Components in minutes.

By default you get the following:

- Custom Elements v1
- Shadow DOM v1
- TypeScript
- lit-html
- Webpack
- Karma test runner with headless browser launchers
- Git
- MIT license
- Web Component best practices

## 📌 Install


Installing is simple via NPM.

```bash
npm install --global @nutmeg/cli
```

Or with Yarn

```bash
yarn global add @nutmeg/cli
```

_Note: If it's available, Yarn will be used by default for installing dependencies._

## 🌱 Build

Once Nutmeg is installed you can generate a new Web Component with `nutmeg new <element-name> [property:type...]`.

```bash
nutmeg new hello-world name:string
```

This will create a `hello-world` directory, stub out a base Web Component class `HelloWorld` that extends the Nutmeg `Seed` base class, and install the default dependencies.

### 🏡 Properties

Properties must be valid TypeScript types. For example `string`, `boolean`, `number`, `string[]`, `Element`.

```bash
nutmeg new grilled-cheese quantity:number pickles:boolean cheese:string[]
```

Properties are the public API of your Web Component and external code can set/get them.

```javascript
export class GrilledCheese extends Seed {
  @Property() public bread: string;
  @Property() public cheese: string[];
  @Property() public pickles: boolean;
  @Property() public quantity: number;
  ...
}
```

The `@Property()` decorator provides some nice features out of the box. There are two kinds of properties.

- Primitive: `boolean`, `string`, and `number`.
- Complex: any types that are not primitive.

#### ✍️ Automatic rendering

Any properties decorated with `@Property` will automatically render when set. If you need to manually render

#### 📟 Primitive properties are reflected to the DOM

- **boolean**: `grilledCheese.pickle = true;` => `<grilled-cheese pickle></grilled-cheese>`
- **number**: `grilledCheese.quantity = 5;` => `<grilled-cheese count="5"></grilled-cheese>`
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

### 🍽️ Serve

You can now serve the component for development on http://localhost:8080 by running:

```bash
npm run serve
```

With `serve` running you can make edits to the component and see the changes take effect automatically without manually refreshing.

## 🔬 Test

Running the tests from within `hello-world`.

```bash
npm run test
```

## 🗞️ Publish

Publishing to NPM is easy but make sure you are logged in first with `npm login`. Be sure to fill out `package.json` values like author and update the name in `readme.md` if you change it.

```bash
npm publish
```

## 😎 Best practices

Out of the box many of the [Google Web Fundamentals Custom Element Best Practices](https://developers.google.com/web/fundamentals/web-components/best-practices#place-any-children-the-element-creates-into-its-shadow-root) are handled automatically.

## 🔍 Example

[Example Web Component](https://github.com/abraham/nutmeg-hello-world) built using `nutmeg hello-world name:string`.

## 👔 License

Nutmeg is released under an MIT license.


[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fabraham%2Fnutmeg-cli.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fabraham%2Fnutmeg-cli?ref=badge_large)