# Developing Nutmeg

Please read the [contributing guidelines](https://github.com/abraham/nutmeg/blob/HEAD/CONTRIBUTING.md) and [code of conduct](https://github.com/abraham/nutmeg/blob/HEAD/CODE_OF_CONDUCT.md).

## 🔽 Install

Fork the [abraham/nutmeg](https://github.com/abraham/nutmeg) project to your own GitHub profile. Clone the fork to your local machine replacing `abraham` with your GitHub handle.

```
git clone git@github.com:abraham/nutmeg.git
```

Nutmeg is an [npm workspaces](https://docs.npmjs.com/cli/using-npm/workspaces) monorepo. npm workspaces handles installing and linking every package under `packages/*`; Lerna is used to orchestrate the root `build`/`test` scripts and for versioning/publishing. From the repo root run `npm install` once to install and link every package.

To try the CLI itself from source, run `npm install --global` from within `nutmeg/packages/cli` to make this development version available as `nutmeg`.

🚧 **Be sure to run `npm install --global @nutmeg/cli` after you are done developing to go back to stable.**

## 🌱 Code

Check out a new Git branch to start working on with `git checkout -b useful-feature`.

Run `npm run watch` from within the package you're changing (e.g. `packages/seed`, `packages/cli`) to rebuild `dist` on every save via `tsc --watch`.

### 🧪 Test

- `npm test` at the repo root runs every package's test suite.
- `packages/seed` and `packages/element-template` run their DOM tests with [Vitest browser mode](https://vitest.dev/guide/browser/) (Playwright/Chromium provider); `packages/seed` also has a plain Vitest suite for non-DOM unit tests (`npm run test:unit`).
- `packages/cli`'s `nutmeg-test` binary runs a generated component's own tests the same way, via `packages/cli/vitest.component.config.ts`.
- `packages/create`'s `npm test` (`scripts/test.ts`) is an end-to-end smoke test: it generates a component with `create-nutmeg`, builds it, and runs its tests.

### 🧹 Lint

`npm run lint` at the repo root checks formatting with Prettier and dependency version consistency with [syncpack](https://jamiemason.github.io/syncpack/). Run `npm run format` to auto-fix formatting.

## 👐 Contribute

Once you are happy with your changes commit them to Git with a short but descriptive message.

```
git commit -m 'Added useful feature'
```

Push the branch to your GitHub fork and create a [pull request](https://github.com/abraham/nutmeg/pulls) to abraham/nutmeg.

## 📁 Files

- [`packages/cli`](packages/cli) - Builds, tests, serves, and cleans generated components (`nutmeg build|test|serve|clean|watch`).
- [`packages/create`](packages/create) - The `create-nutmeg`/`npm init @nutmeg` generator; copies and customizes `packages/element-template` via `ts-morph` codemods.
- [`packages/seed`](packages/seed) - The `Seed` base class (a thin `LitElement` wrapper) and `@property()` decorator that generated components extend.
- [`packages/element-template`](packages/element-template) - The real, buildable/testable example component copied and customized by `create-nutmeg` to produce each generated Web Component, including its `.github/workflows/ci.yaml` and `.github/dependabot.yml`. This is what should get changed to affect the generated Web Components.

Within each package: `src` holds the TypeScript source, `dist` holds the compiled output, and `bin` (where present) holds the executable stubs npm registers that load the working code from `dist`.

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
