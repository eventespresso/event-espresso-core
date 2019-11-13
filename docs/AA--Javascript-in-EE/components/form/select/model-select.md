# `<ModelSelect />` and `<ModelEnhancedSelect />`

ModelSelect is a component that exposed the [`react-select`](https://deploy-preview-2289--react-select.netlify.com/home) component for displaying provided EE model data for selection. While it can be used on its own, its intended to be utilized within more concrete "wrapper" components specific to a model (eg `EventSelect`) that are generated using [`createModelSelect`](./create-model-select.md).  There are actually 2 components exposed for `ModelSelect`:  a standalone component, `<ModelSelect />` and a `withSelect` Higher Order Component wrapped default export which is exposed as `<ModelEnhancedSelect />`

The HOC automatically takes care of populating the select options as directed from provided props and via subscription to the related `@eventespresso/lists` store.

## `ModelSelect` Props

### selectConfiguration

This is an object that can contain any values set by components higher in the tree that you want to pass down to the `react-select` component.  You can read about all the possible values that can be passed down via [this document](https://deploy-preview-2289--react-select.netlify.com/props).

The following options in this object are generated and set in the ModelSelect component:

| Prop | Purpose |
|------|---------|
`name` | This is automatically set to be a unique name for the select component. It can be overridden.
`options` | This is derived from the incoming array of EE model entity objects.
`value` | This is derived from the incoming `defaultValue` value on the incoming `selectConfiguration` prop.


- Type: `Object`
- Required: No
- Default:
```js
{
    name: uniqueId( 'model-select-' ),
    isClearable: true,
    isLoading: true,
    placeholder: 'Select...'
}
```

### modelEntities

This is expected to be an `Array` of model entity objects for the model corresponding to the value in the `modelName` prop.  

- Type: `Array`
- Required: No
- Default: `[]`

### modelName

This informs what model the incoming modelEntities are for.  This should correspond to the canonical modelName for models as respresented in the EE Rest schema (i.e. Events are `event`, Datetimes are `datetime`).

- Type: `String`
- Required: No
- Default: `''`

### mapOptionsCallback

This should be a function that converts incoming modelEntities into an array of option objects usable by the react-select component.  By default, this is the built-in [`buildOptions`](../../../../../assets/ZZZ/components/form/model/base/build-options.js) callback and that can be used as a reference for how any custom function should behave.

- Type: `Function`
- Required: No
- Default: `buildOptions`

### optionsEntityMap:

If null, this is ignored and the default map found in [build-options.js](../../../../../src/components/form/select/build-options.js) is used.  When provided, it is expected to be an object that helps inform how the `mapOptionsCallback` should map entity objects to the `value`, and `label` pairs in the final array of option objects. The map should be shaped like this:

```js
const map = {
    $modelName: {
        label: 'model-field-to-use-for-label'
        value: 'model-field-to-use-for-value'
    }
}
```

**Example:**
```js
const map = {
    event: {
        label: 'EVT_name',
        value: 'EVT_ID',
    }
};

```

- Type: `Object`
- Required: No
- Default: `null`

### label

If provided, a `<label>` will be prepended before the Select element using the text provided by the value on this property.  It will be linked (via the label `for` attribute) to the select input via the `selectConfiguration.name` property.

- Type: `String`
- Required: No
- Default: `''`


## `ModelEnhancedSelect` Props

Along with receiving any props noted for `ModelSelect`.  The enhanced component should also receive the following props:

### modelName

This informs what model the REST request should be done against.  This should correspond to the canonical modelName for models as represented in the EE Rest schema (i.e. Events are `event`, Datetimes are `datetime`).

- Type: `String`
- Required: No
- Default: `''`

### queryData

This is only used by the `ModelEnhancedSelect` HOC (but is passed through the main component).  `queryData` would contain any information required for REST request retrieving entities for the named model (described via `modelName`).

- Type: `Object`
- Required: No
- Default: `{ limit: 100, order: 'desc' }`

### getQueryString

This is another item only used by the `ModelEnhancedSelect` HOC (but is passed through the main component).  `getQueryString` should be a function the returns a query string to append to the REST request endpoint for the given model (described via `modelName`).

- Type: `Function`
- Required: No
- Default: `() => ''`


## Usage

Note: if you plan on exposing something wrapping this component as a component itself on `eejs.components` (this will be the case if you are adding your new component to the `components` folder), then import these components directly via relative path.

These components can be utilized one of two ways:

**Via `eejs.components` global**

```js
const { ModelSelect, ModelEnhancedSelect } = eejs.components;
```

**Via `@eventespresso/components` package**

```js
import { ModelSelect, ModelEnhancedSelect } from '@eventespresso/components'
```

**Note**: this package isn't published yet so you'll need to point to it via your build process. For example, if you use webpack you can register this as an external via:

```js
module.exports = {
    externals: {
        '@eventespresso/components': 'eejs.components',
    }
}
```

You will need to ensure that the event espresso components bundle is a dependency for your implemented code.  You could do something like this:

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
