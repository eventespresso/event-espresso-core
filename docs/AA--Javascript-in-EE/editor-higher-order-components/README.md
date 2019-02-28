Editor Higher Order components are components that are dependent on what is loaded in the _editor_ context.  Thus they would never be exposed in a more general context.  For this reason, these components are built to their own bundle and exposed on the script handle `CoreAssetManager:JS_HANDLE_EDITOR_HOCS`.

Javascript code can utilize these components via the `eejs` global:  `eejs.editorHocs`.

| Component                                              | Description                                                                                                                                        |
| -------------------------------------------------------| ---------------------------------------------------------------------------------------------------------------------------------------------------|
| [`NotWithPostTypeCheck`](./not-with-post-type-check.md)| A component which renders it's own children _only_ if the current editor post type is **not** one of the given `excludedPostTypeSlugs` prop values.|