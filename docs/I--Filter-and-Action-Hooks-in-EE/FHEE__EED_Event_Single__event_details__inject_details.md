# FHEE__EED_Event_Single__event_details__inject_details

This filter controls whether Event Espresso inserts its event details (description, datetimes, ticket selector and venue) into `the_content` of a single event page. Return `false` to skip the insertion for the given post. The filter must return a boolean.

`FHEE__EED_Event_Single__event_details__inject_details`

## Usage Example:

```php
// skip insertion for one specific event
function my_skip_event_details(bool $inject, WP_Post $post): bool
{
    return $post->ID === 123 ? false : $inject;
}
add_filter('FHEE__EED_Event_Single__event_details__inject_details', 'my_skip_event_details', 10, 2);

// skip insertion for every event during the current request
add_filter('FHEE__EED_Event_Single__event_details__inject_details', '__return_false');
```
