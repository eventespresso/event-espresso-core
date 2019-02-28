# `<AttendeeListItem />` Component
This component outputs a single list item for a given attendee model entity instance.  It can optionally display the gravatar for the attendee using [`<AvatarImage />`](../ui/image/avatar.md)
```jsx
<li><AvatarImage /><span>John Smith</span></li>
```
## Props
### `isLoading`
Used to indicate a loading state or not.
- Type: `boolean`
- Required: no
- Default: `undefined`

### `attendee`
Expected to be an attendee model instance and used to provide the attendee details for the list item.
- Type: `BaseEntity` (attendee)
- Required: yes
- Default: none

### `showGravatar`
Used to indicate whether to show the gravatar for the attendee or not. **Note:** if this is true, then you will either need the gravatar included with the `attendee` model entity (found on the `userAvatar` property) or have it included `avatarOptions` prop (exposed on `avatarOptions.avatarUrl`).  `attendee.userAvatar` is checked before and has preference over `avatarOptions.avatarUrl`.

- Type: `boolean`
- Required: no
- Default: undefined

### `avatarOptions`

An object passed through as props to the `<AvatarImage />` component.  Details on the properties of this object can be found with the image component.

- Type: `object`
- Required: no
- Default: `{}`

## See also
- [`<EventAttendeeList/>`](./event-attendee-list.md) - a component for outputting an unordered list of attendees from the given `Map` of attendee model entities.
- [`<AvatarImage />`](../ui/image/avatar.md)