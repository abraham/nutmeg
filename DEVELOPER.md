_Warning: this document is not yet updated for the current code organization._

# Contributing to the CLI

Please read the [contributing guidelines](https://github.com/abraham/nutmeg/blob/HEAD/CONTRIBUTING.md) and [code of conduct](https://github.com/abraham/nutmeg/blob/HEAD/CODE_OF_CONDUCT.md).

## 🔽 Install

Fork the [abraham/nutmeg](https://github.com/abraham/nutmeg) project to your own GitHub profile. Clone the fork to your local machine replacing `abraham` with your GitHub handle.

```
git clone git@github.com:abraham/nutmeg-.git
```

Within the `nutmeg` run `npm install` to install the development dependencies.

To make the development CLI available locally on your machine run `npm install --global` from within `nutmeg/packages/cli` to make this development version available as `nutmeg`.

🚧 **Be sure to run `npm install --global @nutmeg/cli` after you are done developing to go back to stable.**

## 🌱 Code

Check out a new Git branch to start working on with `git checkout -b useful-feature`.

Have `npm run watch` in a terminal window. This will watch for changes to the code and rebuild `dist` as needed. You can now make changes to the `src` and `template-element` files as desired and try out those changes.

## 👐 Contribute

Once you are happy with your changes commit them to Git with a short but descriptive message.

```
git commit -m 'Added useful feature'
```

Push the branch to your GitHub fork and create a [pull request](https://github.com/abraham/nutmeg/pulls) to abraham/nutmeg.

## 📁 Files

- `src` - TypeScript files that make up the logic of the CLI. This is where most of the work gets done.
- `dist` - Compiled ESM version of the code.
- `bin` - The executable stubs that NPM registers on the installed machine and loads the working code from `dist`.
- `element-template` - This is a directory of template files that get compiled and output as the product of running `nutmeg new hello-world`. These are what should get changed to effect the generated Web Components.

## 📰 Publish

### Prerelase

```bash
$ NPM_CONFIG_OTP=123456 npx lerna publish --canary [minor]
```

### Release

```bash
$ npx lerna version [minor]
$ NPM_CONFIG_OTP=123456 npx lerna publish from-git
```
