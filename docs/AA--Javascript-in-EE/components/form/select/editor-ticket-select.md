
# `<EditorTicketSelect />`

**EditorTicketSelect** applies WordPress admin formatting to the [TicketSelect](ticket-select.md) component by wrapping it with the Gutenberg [BaseControl](https://github.com/WordPress/gutenberg/tree/master/components/base-control) component. This wil override the label applied by the **TicketSelect** component in favour of the one applied by the **BaseControl** component. Help text can also be specified which will be displayed after the **TicketSelect** component.

The **EditorTicketSelect** component accepts **all** of the properties that the the **TicketSelect** component does as well as the following:

```jsx
<EditorTicketSelect 
    className="datetime-select"
    help={ 'This text will be displayed after the select input to aid the user in understanding its purpose or effect.' }
/>
```


## Props

The component accepts the following props:

### className

The class that will be added with "components-base-control" to the classes of the wrapper div.
If no className is passed only components-base-control is used.

- Type: `String`
- Required: No

### help

If this property is added, a help text will be generated using help property as the content.

- Type: `String`
- Required: No


## Usage

Component usage is the same as the **TicketSelect** component and can be imported one of two ways:

**Via `eejs.components` global**

```js
const { EditorTicketSelect } = eejs.components;
```

**Via `@eventespresso/components` package**

```js
import { EditorTicketSelect } from '@eventespresso/components'
```


## See Also

- [BaseControl](https://github.com/WordPress/gutenberg/tree/master/components/base-control) - generates labels and help text for components handling user input.


