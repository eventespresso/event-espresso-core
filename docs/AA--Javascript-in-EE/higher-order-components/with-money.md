# `withMoney`
This Higher Order Component allows implementors to wrap a provided Component so that designated props are converted to [`Money` value objects](../value-objects/money.md).

The usefulness of this applies to when you have a Component that works with `Money` value objects but you don't want client code to have to worry about generating those from primitives to use the component.  It also then becomes much more predictable to create leaf components that explicitly require `Money` value objects for props related to money.

## Arguments
### `propNameMap`
If provided, this is expected to be an array or a function.

If an array, this should be a simple array of prop names for values which should get converted to `Money` value objects.  The Money value objects will use `eejs.valueObjects.SiteCurrency` as the currency.

**Example:**
```js
const EnhancedComponent = withMoney( [ propA, propB ] )( MyComponent );
// implementation of EnhancedCompoennt
<EnhancedComponent propA={ 1.25 } propB= { 2.30 } propC= { 'some string ' } />
// this will result with propA and propB being converted to `Money` value objects within the context of `MyComponent`.
```
If provided as a `function` then it's up to the implementation to define how the props are mapped to Money objects.  The function will receive the `props` from and a `Money` constructor for the function to use to generate `Money` instances. The expected return value from the function is an object with each converted `props` as a key (and values are the converted values) and a `new` key labelled `convertedValues` that is an array of `just` the converted values as primitives.  If this is not present an error will be thrown.  This is necessary for doing _shallow equality_ checks which in turn is used to determined whether to re-render or not.

**Example:**
```js
import { SiteCurrency } from '@eventespresso/vo';
import { forEach } from 'lodash';
import { withMoney } from '@eventespresso/higher-order-components'
import { myComponentUsingMoney } from '../components';
const propMapFunction = ( props, Money ) => {
  const newProps = {};
  newProps.convertedValues = [];
  forEach( props,  ( propVal, propKey ) => {
    if ( propKey  === 'propA' || propKey === 'propB' ) {
      newProps[ propKey ] = new Money( propVal, SiteCurrency );
      newProps.convertedValues.push( propVal );
    }
  } );
}
export default withMoney( propMapFunction )( myComponentUsingMoney );

// then somewhere that this component is implemented  in another file, propA and propB
// would be converted to Money instances but not propC
<EnhancedComponent propA={ 1.25 } propB={ 125.6 } propC={ 'some string ' } />
```
## Usage

Note: If this HOC is being used in an ee core component then please import it directly as opposed to using the package name.  This ensures that the built component bundle will have the necessary code from the HOC in the bundle.

This component is exposed two ways:

**`eejs.hocs` global**

```js
const { withMoney } = eejs.hocs;
```

**`@eventespresso/higher-order-components` package**

```js
import { withMoney } from '@eventespresso/higher-order-components';
```

Note: this package isn't published yet so you'll need to point to it via your build process. For example, if you use webpack you can register this as an external via:

```js
module.exports = {
    externals: {
        '@eventespresso/higher-order-components': 'eejs.hocs',
    }
}
```

You will also need to ensure that the `eventespresso-hoc` Components script handle is a dependency for your implemented code. You could do something like this:

```php
use EventEspresso\core\domain\services\assets\CoreAssetManager;

wp_register_script(
    'my-script',
    'https://url-to-my-script.com'
    array( CoreAssetManager::JS_HANDLE_HOCS ),
    $version_string,
    true
);
```

You can implement the HOC by doing something similar to the examples given earlier in this doc.
