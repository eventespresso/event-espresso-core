# QueryLimit

A React component for adding a numeric Range Control input for setting the number of items returned by a query.


## Usage Overview

```jsx
<QueryLimit
    limit={ 25 }
    label={ 'Number of items returned' }
    min={ 1 }
    max={ 50 }
    onLimitChange={
        ( value ) => onChangeCallback( { limit: value } )
    }
/>
```

## Props
This component also passes through any additional props provided to it onto the `<RangeControl />` component.

### limit

The initial value for the limit attribute

- Type: `Number`
- Required: No
- Default: 10

### label

The text to be used for the input's corresponding label

- Type: `String`
- Required: No
- Default: "Limit"

### min

The lowest value allowed for the range control

- Type: `Number`
- Required: No
- Default: 1

### max

The highest value allowed for the range control

- Type: `Number`
- Required: No
- Default: 100

### onLimitChange

The  function called when a change of value is detected. Used for saving the value for the "limit" attribute.

- Type: `Function`
- Required: Yes


## Usage within a Block's edit callback

This is assuming the `QueryLimit` component will be utilized within an `InspectorControls` component

### Step 1
Import the following external dependencies:

```jsx
import { __ } from '@eventespresso/i18n';
import { QueryLimit } from '@eventespresso/components';
import { PanelBody } from '@wordpress/components';
import { InspectorControls } from '@wordpress/editor';
```

### Step 2
Add a "limit" attribute:

```jsx
attributes: {
    limit: {
        type: 'number',
        default: 5,
        },
},
```

### Step 3
Wrap the QueryLimit component within the InspectorControls and PanelBody components
 (currently shown within a block's edit() function)

```jsx
edit: ( ( { attributes, setAttributes } ) => {
    const { limit } = attributes;
    return (
        <InspectorControls>
            <PanelBody>
                <QueryLimit
                    limit={ limit }
                    onLimitChange={
                        ( value ) => setAttributes( { limit: value } )
                    }
                />
            </PanelBody>
        </InspectorControls>
    );
})
```
