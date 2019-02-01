Components are various react components and supporting code that is exposed for usage in Event Espresso core and extensions.  Some components have a dependency
on various WordPress components but in most cases this does not mean they are restricted to use only in the editor.

| Component Type | Description |
| --------- | ---------------- |
| [Query](./query/README.md)  | These are components that are used for various query attributes (where "query" typically means arguments included on a REST request).
| [General UI](./ui/README.md) |  These are components that are more generic in nature.
| [Form](./form/README.md) | These are components that are related to form/import ui.

## General Usage for Components
All components described in the docs can be utilized one of two ways:

Via `eejs.components` global

```jsx
const { AttendeeListItem, DatetimeSelect } = eejs.components
```
Or via `@eventespresso/components`
```jsx
import { AttendeeListItem, DatetimeSelect } from '@eventespresso/components'
```
Note: this package isn't published yet so you'll need to point to it via your build process. For example, if you use webpack you can register this as an external via:

```js
module.exports = {
    externals: {
        '@eventespresso/components': 'eejs.components',
    }
}
```

You will need to ensure that the eventespresso components bundle is a dependency for your implemented code.  You could do something like this:

```php
use EventEspresso\core\domain\services\assets\CoreAssetManager;

wp_register_script(
    'my-script',
    'https://url-to-my-script.com'
    array( CoreAssetManager::JS_HANDLE_EE_COMPONENTS ),
    $version_string,
    true
);
```