TermSelectControl
=======

A React component for adding a select input for choosing a term from a list of options


## Usage Overview

```jsx
<TermSelectControl 
    selectedTerm={ 'two' } 
    terms={
        [ 
            { slug: 'one', name: 'One'  }, 
            { slug: 'two', name: 'Two' }, 
            { slug: 'three', name: 'Three' }, 
        ]
    } 
    label={ 'Select one to three' } 
    noSelectionLabel={ 'please make a selection' } 
    onChange={ 
        ( value ) => setAttributes( { selectedTerm: value } ) 
    } 
/> 
```

## Props

### selectedTerm

The previously selected value for the input

- Type: `string`
- Required: No

### terms

The options that will populate the select input.
 
- Type: `Array`
- Required: No

Each element of the array should be an object with the following properties:

 * **slug** a unique identifier for the option
    * Type: `String`
    * Required: Yes
 * **name** the text that will be displayed for the option
    * Type: `String`
    * Required: Yes
 * **children** an array of additional options
    * Type: `Array`
    * Required: No
    
### label

The text to be used for the input's corresponding label

- Type: `String`
- Required: Yes
    
### noSelectionLabel

The text to be displayed for the first option if no option has been set as the selected value

- Type: `String`
- Required: No
- Default: "Please make a selection"

### onChange

The  function called when a change of value is detected. Used for saving the value for the "selectedTerm" attribute.

- Type: `Function`
- Required: Yes


## Usage within a Block's edit callback

This is assuming the `TermSelectControl ` component will be utilized within an `InspectorControls` component

### Step 1
Import the following external dependencies:

```jsx
import { __ } from '@eventespresso/i18n';
import { TermSelectControl  } from '@eventespresso/components';
import { PanelBody } from '@wordpress/components';
import { InspectorControls } from '@wordpress/editor';
```

### Step 2
Add a "limit" attribute:

```jsx
attributes: {
    selectedTerm: {
        type: 'string',
    },
},
```

### Step 3
Wrap the TermSelectControl component within the InspectorControls and PanelBody components
 (currently shown within a block's edit() function)

```jsx
edit: ( ( { attributes, setAttributes } ) => {
    const { selectedTerm } = attributes; 
    const terms = [ 
        { slug: 'one', name: 'One'  }, 
        { slug: 'two', name: 'Two' }, 
        { slug: 'three', name: 'Three' }, 
    ]; 
    const label = __( 'Select one to three', 'event_espresso' ); 
    return (
        <InspectorControls>
            <PanelBody>
                <TermSelectControl 
                    selectedTerm={ selectedTerm } 
                    terms={ terms } 
                    label={ label }
                    onChange={ 
                        ( value ) => setAttributes( { selectedTerm: value } ) 
                    } 
                />
            </PanelBody>
        </InspectorControls>
    );
})
```