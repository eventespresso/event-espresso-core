# Build Process for Javascript and CSS

## Getting Started

Our build process is Node.js based.  You will need to have [Node.js installed](https://node.js.org/en/).  You should be running a Node version matching the [current active LTS release](https://github.com/nodejs/Release#release-schedule) or newer in order to use the build process.  You can check your Node.js version by typing `node -v` in the Terminal prompt.

You will also need the latest release of [npm installed](https://npmjs.org). Npm is a separate project from Node.js and is updated frequently. If you've just installed Node.js which includes a version of npm within the installation you most likely will need to also update your npm install.  To update npm, type this into your terminal:

```bash
npm install npm@latest -g
```

Finally, we use webpack for assembling and building javascript and css files.  The folder structure for our javascript and css is:

```md
.\path\to\your\wordpress-install\wp-content\plugins\event-espresso-core\
├── assets
    └── dist
        ... built files with `.dist.js` or `.dist.css` extensions
    └── src
        .babelrc //this contains specific babel configuration for the files in this tree.
        ... folders and files containing all src js and css files.
├── .babelrc  //root babel configuration
├── package.json //npm configuration
├── package-lock.json
├── webpack.common.js //main webpack configuration
├── webpack.dev.js //development environment webpack configuration
├── webpack.prod.js //production environment webpack configuration
```

If you are developing javascript that is for WordPress editor blocks or components that should compile to the `wp.element.createElement` method for jsx then make sure the root directory for your blocks contains this in its `.babelrc`:

```json
{
  "presets" : [ "@wordpress/default" ]
}
```

Otherwise the default `.babelrc` configuration will be used.

## Scripts

There are currently three scripts that are available for aiding in development of EE javascript/css.

### watch

Execute by:

```bash
npm run watch
```

This will build the js/css using the development environment configuration (for easier debugging etc).

If you are running npm in a virtual machine with synced files between the host and the vm, there is a known issue where webpack watch might not pick up changes to files.  If you encounter that, then you can try running this command:

```bash
npm run watch-poll
```

This will use a polling mechanism for the watch process instead of the default.

### build

Execute by:

```bash
npm run build
```

This will build the js/css using the build environment configuration (including source maps) which results in smaller minified files for distribution.

## Automation

Our [Grunt WordPress Plugin Buildmachine](https://github.com/eventespresso/grunt-wp-plugin-buildmachine) will automatically execute the build script whenever a release of Event Espresso is being built, so there's no need to worry about running `npm run build` unless you need to test that the build process is working as expected.

