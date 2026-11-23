# FHEE__EED_Venue_Single__venue_details__inject_details

This filter controls whether Event Espresso inserts its venue details (categories, phone, website, description and location map) into `the_content` of a single venue page. Return `false` to skip the insertion for the given post. The filter must return a boolean. A skipped post leaves Event Espresso's `the_content` callback attached, so a later venue rendered in the same request still gets its details unless the filter skips it too.

`FHEE__EED_Venue_Single__venue_details__inject_details`

## Usage Example:

```php
// skip insertion for one specific venue
function my_skip_venue_details(bool $inject, WP_Post $post): bool
{
    return $post->ID === 123 ? false : $inject;
}
add_filter('FHEE__EED_Venue_Single__venue_details__inject_details', 'my_skip_venue_details', 10, 2);

// skip insertion for every venue during the current request
add_filter('FHEE__EED_Venue_Single__venue_details__inject_details', '__return_false');
```
