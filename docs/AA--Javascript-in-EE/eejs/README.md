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

| module | description                                                                                                      |
| ------ | -----------------------------------------------------------------------------------------------------------------|
| `data` | An object referencing arbitrary data that can be passed from the server to the client for use in other javascript|