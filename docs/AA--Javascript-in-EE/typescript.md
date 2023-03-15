## Static type checking with `TypeScript`.

TypeScript compilation is integrated into build process via webpack, through TS loaders. This means that we don't have to run any additional scripts. By running usual webpack-related scripts all TS compilation will be done automatically.

Since we already have some codebase written in JS, in `tsconfig.json` the option `allowJs` has been set to `true`. This will enable us to make an incremental adoption of TypeScript.

Related external reading:

- [React & Webpack](https://www.typescriptlang.org/docs/handbook/react-&-webpack.html)
- [Migrating from JavaScript](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html)
