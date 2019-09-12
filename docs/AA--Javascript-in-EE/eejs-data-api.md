# The `eejs.data` Api.

> Note: the eejs.data API [does not work with WP 4.9 and lower](eejs-core-dependency.md)

One common problem encountered with WordPress development is transferring arbitrary data from php (the server) to javascript (client).  WordPress natively has [`wp_localize_script`](https://developer.wordpress.org/reference/functions/wp_localize_script/) to assist with that and it usually is sufficient.  However, one caveat with `wp_localize_script` is you need to define a reference to the js object that will hold that arbitrary data and attach it to the script needing it.  This creates some potential issues such as:

- Greater chance of collisions between other scripts that register a data object named the same.
- Greater chance of setting the same data across multiple inline js objects.
- Somewhat complicates importing and using that data in any js build process.

To help with some of these issues, Event Espresso has developed an api for registering data to a global object.  This api is represented in two contexts: php, and js.

## PHP Context

The `eejs.data` api is interfaced with via `EventEspresso\core\services\assets\Registry` by:

1. Adding arbitrary data via the `Registry::addData` and `Registry::pushData` methods.
2. Registering `eejs-core` as a dependency for your registered javascript file that consumes that arbitrary data.

Let's break this down:

### 1. Adding arbitrary data via the `Registry::addData` and `Registry::pushData` methods.

Anytime you have data you want to pass along to your javascript you have two ways of doing so:

#### `Registry::addData($key, $value)`

Receives a string to act as the `$key` for retrieving the data, and a `$value` which can be an array or a string.

**Note:** If you attempt to add data with a `$key` that has already been used, an `InvalidArgumentException` will be thrown because only one value for the key may be used. This is to help prevent collisions of registered data (and disallows completely overwriting an existing data set).  It's _super important_ that your key be something unique.

A common pattern is to register all your data for your use-case on one key and have an associative array for the value.  For example, you could pass information for dynamic labels used in a js package by doing something like:

```php
use EventEspresso\core\services\assets\Registry;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * Note: Registry should be injected as a dependency on any class you are using, but for this example we're using the
 * EE loader factory to make sure we're getting the already constructed Registry instance.
 **/
$registry = LoaderFactory::getLoader()->getShared('EventEspresso\core\services\assets\Registry');

$registry->addData(
    'myAddonDataNeededForXFactorPackage',
    array(
        'apiKey' => 'qq7-1-039844',
        'xFactorSignupLabel' => htmlspecialchars(
                __('Git me signed up!'),
                ENT_NO_QUOTES
            )
    )
);
```

But what if you want to add data to a key that has already been registered?  As long as the value for that key is an array you can...

#### `Registry::pushData($key, $value)`

With this method, you can push a string or array to an existing key as long as the value for that key is already an array.  However the one thing to remember with this method, is to prevent overwriting existing associative array keys that may already exist in the data set attached to that key, the new value will be appended to the array.  So as an example:

```php
use EventEspresso\core\services\assets\Registry;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * Note: Registry should be injected as a dependency on any class you are using, but for this example we're using the
 * EE loader factory to make sure we're getting the already constructed Registry instance.
 **/
$registry = LoaderFactory::getLoader()->getShared('EventEspresso\core\services\assets\Registry');

$registry->addData(
    'myAddonDataNeededForXFactorPackage',
    array(
        'apiKey' => 'qq7-1-039844',
        'xFactorSignupLabel' => htmlspecialchars(
                __('Git me signed up!'),
                ENT_NO_QUOTES
            )
    )
);

//sometime later in the code

$registry->pushData(
    'myAddonDataNeededForXFactorPackage',
    array(
        'totalPrice' => 15
    )
);

var_dump($registry->getData('myAddonDataNeededForXFactorPackage');
// prints
// [
//     'apiKey' => 'qq7-1-039844',
//     'xFactorSignupLabel' => 'Git me signed up!',
//     0 => [
//         'totalPrice' => 15
//     ]
// ]
```

Using this method then means things will be a little more difficult to extract on the js side.

### 2. Registering `eejs-core` as a dependency for your registered javascript file that consumes that arbitrary data.

If you want to use any data that has been registered, then you need to ensure that you make `eejs-core` a dependency for your js file.  So you'd do something like this:

```js
wp_register_script(
    'my-script',
    $url_to_my_js,
    array('eejs-core'),
    null,
    true
);
```

That's it!  However, **it's very important you remember** that you must always _add_ your data using the api _before_ calling `wp_enqueue_script('my-script')`.  Anything added "after" enqueuing your script will not get output for your js.

So now that we've looked at the php side of things, how do we handle the js side of things?

## Javascript Context

Now that you have your data registered via php, it's time to take a look at how you access that data in your javascript file.  There's a few ways of doing this.  If you are using the build process within EventEspresso core, you can import the `eejs` global via a registered external package named `@eventespresso/eejs`.  So given the examples above, we could access the registered data by doing something like this:

```jsxharmony
import { data } from '@eventespresso/eejs';

{ apiKey = '', xFactorSignupLabel = '' } = data.myAddonDataNeededForXFactorPackage;

//use `apiKey` and `xFactorSignupLabel` in the code.
```

Just remember to account for the data values not being set however!

Another way to access the data if you are not using a build process is to simply retrieve it via the eejs global:

```js
var data = eejs.data || {},
    myAddonDataNeededForXFactorPackage = data.myAddonDataNeededForXFactorPackage || {},
    apiKey = myAddonDataNeededForXFactorPackage.apiKey || '',
    xFactorSignupLabel = myAddonDataNeededForXFactorPackage.xFactorSignuplabel || '';

//use the new variables later in the code.
```

## Anything else?

You can read more about the `eejs` global module in [this document](./eejs/README.md).
