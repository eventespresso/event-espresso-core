## About Value Objects
Value objects are a way to represent a _value_ that is not based on identity.  Two value objects are equal when they have the same value, not necessarily being the same _object_. Value objects are _immutable_ and thus any "mutations" on a given value object results in the creation of a _new_ object.

## Usage

All value objects in EE javascript are available via the `@eventespresso/vo` package (for ee core).  EE core builds these into the `eejs` global on the `valueObjects` property.  So there's a couple ways to implement in your code.  In both the below cases, you still need to register the built value object bundle as a dependency.  In WordPress contexts, the value object bundle has a script handle of `EventEspresso\core\domain\services\assets\CoreAssetManager::JS_HANDLE_VALUE_OBJECTS`, so you could register it as a dependency for your script using something like:

```php
use EventEspresso\core\domain\services\assets\CoreAssetManager;
wp_register_script(
  'my-script-handle',
  $url_to_my_js_file,
  array(CoreAssetManager::JS_HANDLE_VALUE_OBJECTS),
  true
);
```

### 1. Via Webpack Build

In  your webpack configuration you need to define `@eventespresso/vo` as an external like so:

```js
module.exports = {
  externals: {
    '@eventespresso/vo': 'eejs.valueObjects'
  }
}
```
Then anywhere in your ESNext javascript you can utilize the value objects simply by:

```js
import { Money } from '@eventespresso/vo';
```

### 2. Via eejs global

Alternatively, you can just use the `eejs` global directly in your javascript doing something like:

```js
const { Money } = eejs.valueObjects
```

## Available Value Objects
EE javascript currently implements the following value objects:

| Name | Description |
| ------- | ------------------- |
[Money](money.md) | Represents an amount of money.
[Currency](currency.md) | Represents a description of currency.
[Label](label.md) | Represents singular and plural versions for a string.
[DateTime](datetime.md) | Represents an instance in time.
[ServerDateTime](datetime.md) | Same as DateTime, except it automatically handles timezone/offset and locale set by server.
[Duration](duration.md) | Represents a duration of time.