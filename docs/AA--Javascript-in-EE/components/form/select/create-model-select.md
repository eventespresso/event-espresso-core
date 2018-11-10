# `createModelSelect`
This function is used for creating a concrete model select component (wrapping [ModelSelect](model-select.md)).  

It returns a `ModelSelectComponent` constructor.

## Arguments
`createModelSelect( modelName, defaultProps = {}, propTypes = {} )`
Name | Description |
----------- | --------------- |
`modelName` | This should be the canonical name for the model (i.e. `event`, `datetime`, `message_template` etc)
`defaultProps` | The default props object to be assigned as default Props for the component.
`propType` | The prop types definition object to be assigned to the component.

## props
The generated `ModelSelectComponent` component receives and passes through all the props usable by the [`<ModelEnhancedSelect />`](model-select.md) component.

Along with those it receieves the following common props for interacting with selects:

### selected
This is expected to be whatever the selected value for the select input is. 
- Type: `string` or `number`
- Required: No
- Default: none

### onSelect
Expected to be a function that will be called when an option is selected.
- Type: `function`
- Required: No
- Default: none

### label
If provided, used as the label text for the select input.
- Type: `string`
- Required: No
- Default: none

## Usage

**Note**: If you plan on exposing something wrapping this component as a component itself on `eejs.components` (this will be the case if you are adding your new component to the Event Espresso `assets/src/components` folder), then import this function directly via relative path.

This function can be utilized one of two ways:

**Via `eejs.components` global**

```
const { createModelSelect } = eejs.components;
```

**Via `@eventespresso/components` package**

```js
import { createModelSelect } from '@eventespresso/components';
```

**Note:** Currently this package is only Note: this package isn't published yet so you'll need to point to it via your build process. For example, if you use webpack you can register this as an external via:

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
    array( CoreAssetManager::JS_HANDLE_COMPONENTS ),
    $version_string,
    true
);
```
