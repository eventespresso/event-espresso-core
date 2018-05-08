## i18n within Javascript

Event Espresso uses the [`@wordpress/i18n`](https://github.com/WordPress/packages/tree/master/packages/i18n) package for doing i18n within our javascript.  This package allows for usage of the following functions for localization of strings:

`__( text: string, domain: string ): string`

Retrieve the translation of text.

See: https://developer.wordpress.org/reference/functions/__/

`_x( text: string, context: string, domain: string ): string`

Retrieve translated string with gettext context.

See: https://developer.wordpress.org/reference/functions/_x/

`_n( single: string, plural: string, number: Number, domain: string ): string`

Translates and retrieves the singular or plural form based on the supplied number.

See: https://developer.wordpress.org/reference/functions/_n/

`_nx( single: string, plural: string, number: Number, context: string, domain: string ): string`

Translates and retrieves the singular or plural form based on the supplied number, with gettext context.

See: https://developer.wordpress.org/reference/functions/_nx/

`sprintf( format: string, ...args: mixed[] ): string`

Returns a formatted string.

See: http://www.diveintojavascript.com/projects/javascript-sprintf

## Usage

### Within Javascript

Within the javascript files, make sure you import the wpi18n package via:

```js
import { __ } from '@eventespresso/i18n'
```

Obviously, you'll import more than just the `__` function if you use others.  If the javascript you are adding will involve adding a new built entry record in the `webpack.common.js` config, then you also need to make sure you modify the `aliases` entry for the options object passed through to the `wpi18nExtractor` webpack plugin.  It simply needs to be a map of entry chunk name to the handle the script will be registered as php side.

### Within PHP

PHP side there is a new `EventEspresso\core\services\assets\I18nRegistry` class that exposes an api for registering a script handle for translation strings.  You can either include the `I18nRegistry` class as a depedency on any classes that register wp scripts, or you can retrieve an instance of that class from `EventEspresso\core\services\assets\Registry` if its already a dependency on your class via the `getI18nRegistry` method.

When registering any javascript references using `wp_register_script`, you can also register that handle for localized strings (assuming you are using `wp.i18n` within that javascript) by doing something like this:

```php
//assuming you've already assigned `I18nRegistry` to the `$i18n_registry` variable, and that the text_domain for the strings is 'event_espresso'
wp_register_script('ee-script-a', $script_url, array(), $registry->getJsUrl(Registry::ASSET_NAMESPACE, 'script-a'));
$i18n_registry->registerScriptI18n('script-a', 'event_espresso');
```

Behind the scenes `I18nRegistry` will take care of looking for a handle-to-translation-string map which would have been prepped by the webpack build process and using that to match up with any translations loaded php side for the locale.

## Other important things.

This document is geared towards the basics for implementing usage of the `@wordpress/i18n` package within EE core (and add-ons).  However there are some assumptions made:

- the `.pot` for the javascript is being generated as a part of the production build process.
- the translations are generated in part by the `pot-to-php` script included with the `@wordpress/i18n` which is used to generate the stand-in php file for any automated pot generation. This in turn is the source pot used for building translations via tools like glotpress.  EE core and official add-ons are setup out of the gate for that via our in house implementation of the [grunt buildmachine for WordPress plugins](https://github.com/eventespresso/grunt-wp-plugin-buildmachine).
- `wp.i18n` is imported via `@eventespresso/i18n` which is an alias for the global `eejs.i18n` property.  `eejs.i18n` in turn is wrapping `@wordpress/i18n`.  This is needed because WordPress core still doesn't have `wp.i18n` exposed natively so we need a way to ensure we exposed the `i18n` object for implementing `setLocaleData` for loading translated javascript strings on each view.