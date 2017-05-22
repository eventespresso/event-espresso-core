# Authentication in the eejs-api

The method to use for authentication can be passed in via the `eejs.api.init` function as a part of the options object:

```js
eejs.api.init({collections: ['events','datetimes'], authenticationMethod : 'cookie'});
```

Currently this defaults to 'cookie' and that is the only authenticationMethod supported.  Also currently, if you want authentication to take place as expected via cookie, then you must have declared `eejs-api` as a dependency for your javascript.  This will ensure that `eejs.data.eejs_api_nonce` is set for use internally by the library for setting the correct headers.

> Note: This api is in its very early stages, its expected at some time in the future once we implement other authentication methods that it will morph into a more flexible api wherein one can send in an object describing the authentication strategy to use (including specific headers etc required).  But for now the simplest authentication strategy is being used which allows this library to be used successfully on a WordPress site.
