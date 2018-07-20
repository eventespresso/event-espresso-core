# `<HoverText />`

Returns a component that is only displayed when the wrapped child component is hovered over. Can be used for adding "popup" help text and/or descriptions for links, buttons, icons, etc.

The following outlines the shape of the Component:

```jsx
<HoverText
    hoverText={ 'Click here to edit this Event' }
    htmlId={ 'edit-event-123' }
    htmlClass={ 'edit-event' }
    description={ 'open-settings' }
    position={ HOVER_TEXT_POSITION_TOP_RIGHT }
>
    <ChildComponent />
</HoverText>
```

## Props

### htmlId

Used to automatically generate an HTML `id` attribute for the div tag that defines the hover text. The "description" property will be appended to this to generate the final value. This allows for greater variability within components since the same `id` (like `'edit-event-123'`) can be used for multiple hover text components with different purposes (like `'open-settings'`, `'close-settings'`, `'save-settings'`, etc) resulting in values like `'edit-event-123-open-settings'`, `'edit-event-123-close-settings'`, `'edit-event-123-save-settings'`, etc.

- Type: `String`
- Required: Yes

### htmlClass

Used to automatically generate an HTML `class` attribute for the div tag that defines the hover text. The "description" property will be appended to this as part of the final value which will also include the "description" property prepended with `'ee'` as well as a standalone value of `'ee-hover-text'`. For example, providing an "htmlClass" value of `'edit-event'` and a "description" property of `'save-settings'` would result in a final HTML `class` attribute value of:

 ```'edit-event-save-settings-hover-text ee-hover-text-position-top-right ee-save-settings ee-hover-text'```
 
 This allows for a lot of versatility in targeting DOM elements, such as:
 
  - all hover-text for saving event settings: `'edit-event-save-settings'`
  - all hover-text for saving settings regardless of type: `'ee-save-settings'`
  - all hover text regardless of purpose: `'ee-hover-text'`

properties:
- Type: `String`
- Required: Yes

### description

Used when automatically generating HTML `id` and `class` attributes as described above. 

- Type: `String`
- Required: Yes

### position

Where the hover text appears relative to the wrapped child component. Options are one of the following constants:

| Position Constant | Description | 
| ---------- | ----------- | 
| HOVER_TEXT_POSITION_TOP_LEFT | hover text appears **above** and to the **left** of the wrapped child component. | 
| HOVER_TEXT_POSITION_TOP_RIGHT | hover text appears **above** and to the **right** of the wrapped child component. | 
| HOVER_TEXT_POSITION_BOTTOM_LEFT | hover text appears **below** and to the **left** of the wrapped child component. | 
| HOVER_TEXT_POSITION_BOTTOM_RIGHT | hover text appears **below** and to the **right** of the wrapped child component. | 
 
- Type: `String` 
- Required: No 
- Default: `HOVER_TEXT_POSITION_TOP_RIGHT`


## Usage

Note: if you plan on exposing something wrapping this component as a component itself on `eejs.components` (this will be the case if you are adding your new component to the `components` folder), then import this component directly via relative path.

This component is exposed two ways:

**`eejs.components` global**

```js
const { HoverText } = eejs.components;
```

**`@eventespresso/components` package**

```js
import { HoverText } from '@eventespresso/components'
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
