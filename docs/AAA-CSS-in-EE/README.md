# CSS in Event Espresso

Currently in Event Espresso there is a mix of what we'll call "legacy" css files (assets that are standalone edited files located through the codebase) and "built" css files (assets built using the [webpack build system](../AA--Javascript-in-EE/build-process.md)).  In this document, we're going to address the css assets built with the webpack build system. Over time, legacy styles will be moved over to this build process.

## Global stylesheets

Currently the build system generates a global stylesheet for common elements used in multiple places throughout the application (buttons, colors etc).  The built file is `ee-core-default-theme.{hash}.dist.css` and is available on the `CoreAssetsManager::CSS_HANDLE_CORE_CSS_DEFAULT` handle.  This means that you can enqueue this built css file by listing it as a dependency for your own css:

```php
use EventEspresso\core\domain\services\assets\CoreAssetManager;
add_action( 'wp_enqueue_scripts', 'myStyles' );
function myStyles() {
  wp_register_style(
       'my-style', 'path-to-my/stylesheet.css',
      [CoreAssetManager::CSS_HANDLE_CORE_CSS_DEFAULT],
     '1.0'
  );
}
```

Alternatively, if you are using the classes from this stylesheet in a react component, you may also be utilizing the [ee components library](../AA--Javascript-in-EE/components/README.md).  the `CoreAssetManager::CSS_HANDLE_COMPONENTS` already has the default core css as a dependency so you can safely list it only as a dependency.

As a part of the build process, a demo html file is created that highlights all the available classes and gives a visual example outlining its usage.  You can view this file [here](https://htmlpreview.github.io/?https://raw.githubusercontent.com/eventespresso/event-espresso-core/master/assets/src/components/ui/styles/themes/default/demo/index.html)

## Developing

Currently the source files for all the CSS is found in [`assets/src/components/ui/styles`](../../assets/src/components/ui/styles/).  As preparation for possible themeing down the road here's how the files are organized:

### `styles/root/*.css`
This contains all the default stylesheets that are imported as a part of the build process for the final theme stylesheet.  The root stylesheets provide the fallbacks when a css variable (see next section) isn't defined in a theme.

All the files in this folder are automatically built using the [css-builder script](#css-builder-script)

### `styles/themes/default/`

Each sub-folder in the `themes` represents a "theme".  Currently there is only the `default` theme.  The most important file in this folder will be the `config.js` file.  In this file is the configuration for the [css-builder-script](#css-builder-script) which will build the `*-variables.css` files for the various elements in the global stylesheet along with the `index.js` file which webpack uses to build the css.

When making modifications for a theme you will most often modify the configuration file and the [css-builder-script](#css-builder-script) will take care of generating the css and demo files from that.  However, for a theme you can still manually override specific styles defined in the `styles/root` folder by simply creating manually any named stylesheet in the `styles/themes/{themeName}` (in this case `styles/themes/default`) and the Css Builder script will import that after the global styles in the generated file thus overriding anything in the global sheet.  While not enforced, it's recommended you put your overrides in a similarly named file as the root stylesheet (eg. `buttons.css`).

### CSS-Builder Script

This script was created to make it much easier/quicker to maintain the global stylesheets from a configuration file in the theme folder (eg. `styles/themes/default`).  Currently, it only builds styles for the default global theme but future iterations will make it possible to quickly generate a new theme stylesheet. It can be invoked by executing the following command from the `event-espresso-core` root folder:

```bash
npm run build:css
```
(Note: `npm run watch` will automatically start this script and watch for any changes in the files being monitored for css builds being run).

When this script is run the following actions occur:

- The config file for the theme is read.
- The `root` folder stylesheets are generated (if they aren't already or there are changes in the `styles/themes/defaults/config.js`).
- The `*-variables.css` files are created in the theme folder.
- The demo is built for the theme.
- The `index.js` is built for the theme for webpack to use in generating the final built css file.

For adding new css templates for the builder to use (and/or parsing new configs), the `css-builder` script is located in the [`bin/css-builder`](../../bin/css-builder/) folder.
