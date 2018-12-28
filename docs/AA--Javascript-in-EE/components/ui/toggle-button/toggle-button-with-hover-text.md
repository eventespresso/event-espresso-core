# `<ToggleButtonWithHoverText />`

Wraps the `<ToggleButton />` component and is used to trigger an action like opening or closing a container. The component appears as an icon only but acts like a button and is wrapped with the [HoverText](../hover-text/hover-text.md) component 

The following is the shape of the Component:

```jsx
<ToggleButtonWithHoverText
    hoverText={ 'click here to edit event 123' }
    hoverTextPosition={ HOVER_TEXT_POSITION_TOP_RIGHT }
    htmlId={ 'edit-event-123' }
    htmlClass={ 'edit-event' }
    description={ 'open-settings-panel' }
    toggleCallback={ editEvent }
    dashicon={ 'admin-generic' }
    tabIndex={ 123 }
/>
```

## Props

### hoverText

The text to be displayed when the toggle button component is hovered over.

- Type: `String`
- Required: Yes

### hoverTextPosition

Where the hover text appears relative to the toggle button. Options are constants found on the [HoverText](../hover-text/hover-text.md) component and are described in its documentation. 

- Type: `String`
- Required: No
- Default: `HOVER_TEXT_POSITION_TOP_RIGHT` ('top-right')

> Please Note: The `htmlId`, `htmlClass`, and `description` properties are also passed through to the HoverText component but are modified there to produce unique values.

### htmlId

Used to automatically generate an HTML `id` attribute for the div tag that defines the toggle button. The "description" property will be appended to this to generate the final value. This allows for greater variability within components since the same `id` (like `'edit-event-123'`) can be used for multiple buttons with different purposes (like `'open-settings-panel'` and `'close-settings-panel'`) resulting in values like `'edit-event-123-open-settings-panel'` and `'edit-event-123-close-settings-panel'`.

- Type: `String`
- Required: Yes

### htmlClass

Used to automatically generate an HTML `class` attribute for the div tag that defines the toggle button. The "description" property will be appended to this as part of the final value which will also include the "description" property prepended with `'ee'` as well as a standalone value of `'ee-toggle-button'`. For example, providing an "htmlClass" value of `'edit-event'` and a "description" property of `'open-settings-panel'` would result in a final HTML `class` attribute value of:

 ```'edit-event-open-settings-panel ee-open-settings-panel ee-toggle-button'```
 
 This allows for a lot of versatility in targeting DOM elements, such as:
 
  - all buttons for opening event settings panels: `'edit-event-open-settings-panel'`
  - all buttons for opening settings panels regardless of type: `'ee-open-settings-panel'`
  - all toggle buttons regardless of purpose: `'ee-toggle-button'`

properties:
- Type: `String`
- Required: Yes

### description

Used when automatically generate HTML `id` and `class` attributes as described above. 

- Type: `String`
- Required: Yes

### toggleCallback

Triggered when the toggle button is clicked or activated via key press.

- Type: `Function`
- Required: Yes

### dashicon

Denotes which icon will be used as the base for the toggle button. Please note, that only the last portion of the dashicon name is required and not the full string, as the rest will be added (ie: `dashicons dashicons-xxxxxx` only `xxxxxx` is required)

- Type: `String`
- Required: No
- Default: 'no' (results in `dashicons dashicons-no`)

### tabIndex

This determines when the component will receive focus.

- Type: `String`
- Required: No
- Default: 0

## Usage

Note: if you plan on exposing something wrapping this component as a component itself on `eejs.components` (this will be the case if you are adding your new component to the `components` folder), then import this component directly via relative path.

This component is exposed two ways:

**`eejs.components` global**

```js
const { ToggleButtonWithHoverText } = eejs.components;
```

**`@eventespresso/components` package**

```js
import { ToggleButtonWithHoverText } from '@eventespresso/components'
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
    array( CoreAssetManager::JS_HANDLE_COMPONENTS ),
    $version_string,
    true
);
```
