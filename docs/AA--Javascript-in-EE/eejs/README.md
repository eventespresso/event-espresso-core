# The `eejs` Module

This module is exposed via the [`eejs-core` dependency](eejs-core-dependency.md).  Any javascript loaded with that as a dependency has access to anything on the `window.eejs` global.

You can use any of the properties of `eejs` in your webpack builds by making the `eejs-core` script handle a dependency for your loaded javascript and then doing something like this in your own js:

```js
import { data, routes } from '@eventespresso/eejs'
```

Then in your webpack configuration you'd just need to define `@eventespresso/eejs` as an external that points to the `eejs` global.  So something like:

```js
const config = {
   externals: {
       '@eventespresso/eejs': 'eejs'
   }
}
```

Currently the following things are exposed:

| module                                                     |                                                            description                                                                                                             |
| -----------------------------------------------------------| -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [`data`](./data.md)                                        |                                                            An object referencing arbitrary data that can be passed from the server to the client for use in other javascript       |
| [exceptions](./exceptions.md)                              |                                                            Custom exception classes are exposed as properties on `eejs`                                                            |
| [configuration](./configuration.md)                        |                                                            Various configuration objects are exposed as properties on `eejs` for things like currency, server locale, and timezone.|
| [`components`](../components/README.md)                    |                                                            This exposes all the public react components for use in react apps/gutenberg blocks.                                    |
| [`editorHocs`](../editor-higher-order-components/README.md)|                                                            Higher order react components usable in a gutenberg editor context.                                                     |
| [`helpers`](./helpers.md)                                  |                                                            Various helper type functions.                                                                                          |
| [`i18n`](./i18n.md)                                        |                                                            A javascript string localization utility (effectively a wrapper/shim around wp.i18n)                                    |
| [`middelwares`](./middlewares/README.md)                          |                                                            Exposes various middleware classes implemented in libraries using them.                                                 |
| [`model`](./model/README.md)                                      |                                                            Various functions and objects used within the Event Espresso data model.
| [`routes`](./routes.md)                                                           |         Exposes various functions and objects used for Event Espresso route data.                                                                                                                                                                           |
| [`validators`](./validators.md)                                                           |           Exposes various validation utility functions.                                                                                                                                                                         |
| [`valueObjects`](../value-objects/README.md) | Various value object classes (`DateTime`, `Money` etc). |
| [`vendor`](./vendor.md)                                                           | Various third-party libraries (`redux`, `moment-timezone` etc)                                                                                                                                                                                    |