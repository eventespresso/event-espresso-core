# FHEE__EED_Venues_Archive__venue_details__inject_details

This filter controls whether Event Espresso inserts its venue details (categories, phone, website, description and location map) into `the_content` and `the_excerpt` of each venue in the venues archive. It is evaluated per post, so returning `false` for one venue leaves the others unchanged. The filter must return a boolean. It can be evaluated more than once for the same post (once for `the_excerpt` and once for `the_content`), so callbacks must be free of side effects.

`FHEE__EED_Venues_Archive__venue_details__inject_details`

## Usage Example:

```php
// skip insertion for venues that have a custom layout
function my_skip_archive_venue_details(bool $inject, WP_Post $post): bool
{
    return get_post_meta($post->ID, 'my_custom_layout', true) ? false : $inject;
}
add_filter('FHEE__EED_Venues_Archive__venue_details__inject_details', 'my_skip_archive_venue_details', 10, 2);

// skip insertion for every venue during the current request
add_filter('FHEE__EED_Venues_Archive__venue_details__inject_details', '__return_false');
```
