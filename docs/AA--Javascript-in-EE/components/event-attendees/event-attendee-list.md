# `<EventAttendeeList />` Component
This component outputs a simple list of attendees with optional gravatar images for each attendee in following html structure (and uses the [`<AttendeeListItem />`](./attendee-list-item.md) component.

```jsx
<div id="event-attendee-list" class="event-attendees">
  <ul>
    <AttendeeListItem />
  </ul>
</div>
```

## Props
Along with the below declared props, this component will pass through any additional props to the `<AttendeeListItem />` component.
### `isLoading`
Used to indicate a loading state or not.
- Type: `boolean`
- Required: no
- Default: `false`

### `attendees`
Expected to be an `Array` of Attendee model entity instances.
- Type: `Array`
- Required: no
- Default: `[]`

### `showGravatar`
Used to flag whether to show the gravatar for the attendee or not. **Note:** if this is true, then you will either need the gravatar included with each `Attendee` model-entity in the included `attendees` map (found on the `userAvatar` property) or have it included in the passed through `avatarOptions` prop (exposed on `avatarOptions.avatarUrl`)
- Type: `boolean`
- Required: no
- Default: `false`

### `containerCssClass`
For providing a css class to add to the container wrapping the list.  The class will be added to the `event-attendees` css class already on the container.
- Type: `string`
- Required: no
- Default: `''`

### `containerId`
For providing a custom id to add to the container wrapping the list.
-Type: `string`
- Required: no
- Default: `event-attendees-list`

## See also
- [`<AttendeeListItem/>`](./attendee-list-item.md) - a component for outputting a single `<li></li>` item for a given attendee model entity.