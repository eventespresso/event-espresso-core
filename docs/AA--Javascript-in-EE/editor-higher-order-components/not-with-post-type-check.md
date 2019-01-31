# `eejs.editorHocs.NotWithPostTypeCheck`

This higher order component renders it's own children only if the current editor post type is not one of the given values in the `excludedPostTypeSlugs` prop.

## Handled Props

| Prop                    | Type    | Description                                                                                                                                      |
| ----------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------|
| `postType`              | string  | This is passed through via the `withSelect` hoc retrieving the current editor post type from the `core/editor` `getEditedPostAttribute` selector.|
| `children`              | Array   | The components/jsx contained within this component. If the post type is not one of the excluded types provided, then the children are rendered.  |
| `excludedPostTypeSlugs` | string\|Array | A single post type slug or an array of pos type slugs for which the children will be hidden.                                                                                                                                                  |

## Example

The below will show in the editor context if the post type for the loaded entity in the editor is NOT `page`.  Any other post type will result in `<div>Hello World</div>` being rendered.
```jsx
const { NotWithPostTypeCheck } = eejs.editorHocs;
const HideOnPages = () => {
  return ( 
    <NotWithPostTypeCheck excludedPostTypeSlugs= { 'page ' }>
      <div>Hello World</div>
    </NotWithPostTypeCheck>
};
```