# QueryLimit

A React component for adding a WordPress Range Control input for setting a query's limit clause

### Step 1
Import the following external dependencies:

```
import { __ } from '@eventespresso/i18n';
import { QueryLimit } from '@eventespresso/components';
import { PanelBody } from '@wordpress/components';
import { InspectorControls } from '@wordpress/editor';
```

### Step 2
Add a "limit" attribute:

```
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

```
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
}),
```
