

# `<EditorEventSelect />`

**EditorEventSelect** applies WordPress admin formatting to the [EventSelect](./event-select.md) component by wrapping it with the Gutenberg [BaseControl](https://github.com/WordPress/gutenberg/tree/master/packages/components/src/base-control) component. This wil override the label applied by the **EventSelect** component in favour of the one applied by the **BaseControl** component. Help text can also be specified which will be displayed after the **EventSelect** component.

The **EditorEventSelect** component accepts **all** of the properties that the the **EventSelect** component does as well as the following:

```jsx
<EditorEventSelect 
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


## See Also

- [BaseControl](https://github.com/WordPress/gutenberg/tree/master/packages/components/src/base-control) - generates labels and help text for components handling user input.
-  [`<EventSelect />`](./event-select.md)
