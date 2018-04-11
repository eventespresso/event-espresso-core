## Javascript Coding Style/Standards

For the most part, Event Espresso is following the WordPress coding standards for javascript in the new build process. There are a few exceptions, notably we do not follow the yoda conditionals rule.

To assist with implementing and following our standards, our build process makes use of [eslint](https://eslint.org/) and the [WordPress eslint configuration](https://github.com/WordPress-Coding-Standards/eslint-plugin-wordpress).

## NPM scripts

To assist with linting and fixing any coding style problems, we have two npm scripts that can be used:

```bash
npm run lint
```

and

```bash
npm run lint:fix
```

The former will go through all js files in the `assets` folder and root path and report on any eslint rule violations.  The latter will automatically fix any rule violations for things that can be automatically fixed.

## Setting up in PhpStorm

If you use PhpStorm the following steps will assist you with setting up your environment for using our javascript styles:

- Go to `Languages & Frameworks > Javascript > Code Quality Tools > ESLint` and make sure the checkbox labelled `Enable` is checked.  The default options _should_ work unless you've already modified it.
- Enable `.editorconfig` support if you haven't already.  You can do this by installing the `EditorConfig` PhpStorm plugin and then go to `Editor > Code Style` and click the `EditorConfig` checkbox.  This will make sure line indentation and spacing is setup correctly.
- Import the `EE-Code-Styles.xml` configuration from our [project configuration](https://github.com/eventespresso/project-configuration/tree/master/phpstorm/code-styles
) repository.

Once the above steps have been done, you can now use the context menu for automatically fixing es-lint violations.  You should also get on-the-fly feedback when you are writing javascript in the watched folders. 