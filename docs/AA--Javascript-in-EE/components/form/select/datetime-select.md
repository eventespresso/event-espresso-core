# `<DatetimeSelect />`

DatetimeSelect exposes the [`react-select`](https://deploy-preview-2289--react-select.netlify.com/home) component and generates a select input for choosing from the provided EE Datetime model data. It is a wrapper surrounding the [`<ModelEnhancedSelect />`](model-select.md) higher order component.

The following is the shape of the component with its default props:

```jsx
<DatetimeSelect
    selectConfiguration={
        {
            loadingMessage: () => 'Retrieving Datetimes',
            noOptionsMessage: () => 'No Datetimes.',
            placeholder: 'Select Datetime...'
        }
    }
    queryData={
        {
            limit: 100,
            orderBy: 'start_date',
            order: 'DESC',
            showExpired: false
        }
    }
    getQueryString={ datetimeModel.getQueryString }
    selectLabel={ 'Select Datetime' }
    addAllOptionLabel={ 'All Datetimes' }
/>
```

The `DatetimeSelect` component also has one `state` property: `modelName`.  This is set to `datetime`.  It is passed on to `ModelEnhancedSelect` and informs what data is being queried.

## Props

Along with the below props, this component passes through any props usable by the [`<ModelEnhancedSelect />`](model-select.md) component.

### selectConfiguration

This is an object that can contain any values components higher in the tree that you want to pass down to the `react-select` component.  You can read about all the possible values that can be passed down via [this document](https://deploy-preview-2289--react-select.netlify.com/props).

- Type: `Object`
- Required: No
- Default:
```js
{
    loadingMessage: 'Retrieving Datetimes.',
    noOptionsMessage: 'No Datetimes.',
    placeholder: 'Select Datetime...'
}
```

### queryData

Contains default properties used for the Datetime model REST request.

- Type: `Object`
- Required: No
- Default: `{ limit: 100, orderBy: 'start_date', order: 'DESC', showExpired: false }`

### getQueryString

This is a function that returns the queryString used to retrieve the Datetime model data. It defaults to [datetimeModel.getQueryString](../../../../../assets/src/data/model/datetime/index.js).

- Type: `Function`
- Required: No
- Default: `datetimeModel.getQueryString`

### selectLabel

If provided, a `<label>` will be prepended before the Select element using the text provided by the value on this property.  It will be linked (via the label `for` attribute) to the select input via the `selectConfiguration.name` property.

- Type: `String`
- Required: No
- Default: `'Select Datetime'`

### addAllOptionLabel

This is used to indicate that the first option should select all datetimes and provides the text of the label for that option.  If you don't want this option you can just set this to an empty string.

- Type: `String`
- Required: No
- Default: `'All Datetimes'`

### forEventId

This is used to restrict the datetimes retrieved to those belonging to the provided event id.

- Type: `Number`
- Required: No

### selectedDatetimeId

This is used to indicate what datetime is selected as the current option value.  Internally the component will automatically pass that through as the `selectConfiguration.defaultValue`.

- Type: `Number` | `String`
- Required: No

### onDatetimeSelect

This property is used to pass through the handler for the `onChange` event (when a datetime is selected in the selector).  It should be a reference to a function.

This callback will receive two arguments with the following schema:

| Argument | Possible Types | Details |
| -------- | --------------- | ------- |
| selection | `null`, `undefined`, `Array<Object>`, `Object` | the object is in the shape of `{ value: 10, label: 'Some label'}` (essentially the data associated with the selected option) |
| action | Object | An object with the shape of `{action: <string>}` and the possible values are `select-option`, `deselect-option`, `remove-value`, `pop-value`, `set-value`, `clear`, `create-option` |


- Type: `Function`
- Required: No

## Usage

This component can be utilized one of two ways:

**Via `eejs.components` global**

```js
const { DatetimeSelect } = eejs.components;
```

**Via `@eventespresso/components` package**

```js
import { DatetimeSelect } from '@eventespresso/components'
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
