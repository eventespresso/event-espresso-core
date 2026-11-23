# FHEE__EED_Events_Archive__event_details__inject_details

This filter controls whether Event Espresso inserts its event details (description, datetimes, ticket selector and venue) into `the_content` of each event in the events archive and event lists (including the `[ESPRESSO_EVENTS]` shortcode). It is evaluated per post, so returning `false` for one event leaves the others unchanged. The filter must return a boolean. It can be evaluated more than once for the same post (for example when the theme uses `get_the_excerpt()`), so callbacks must be free of side effects.

`FHEE__EED_Events_Archive__event_details__inject_details`

## Usage Example:

```php
// skip insertion for events that have a custom layout
function my_skip_archive_event_details(bool $inject, WP_Post $post): bool
{
    return get_post_meta($post->ID, 'my_custom_layout', true) ? false : $inject;
}
add_filter('FHEE__EED_Events_Archive__event_details__inject_details', 'my_skip_archive_event_details', 10, 2);

// skip insertion for every event during the current request
add_filter('FHEE__EED_Events_Archive__event_details__inject_details', '__return_false');
```
