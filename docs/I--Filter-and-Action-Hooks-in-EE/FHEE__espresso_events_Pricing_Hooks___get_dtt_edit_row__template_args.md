# FHEE__espresso_events_Pricing_Hooks___get_dtt_edit_row__template_args

This filter provides the ability to change the values in a generated Date Time edit row displayed in the Dates and Ticket editor used in the event editor.

`FHEE__espresso_events_Pricing_Hooks___get_dtt_edit_row__template_args`

**Found In**: `caffeinated/admin/new/pricing/espresso_events_Pricing_Hooks.class.php`

## Usage Example:

```php
function ee_test_get_dtt_edit_row_args( $template_args, $dttrow, $dtt, $default, $all_dtts, $creating_event ) {
	if ( ! $creating_event ) {
		return $template_args;
	}

	$template_args['DTT_name'] = 'Empire Day';
	return $template_args;

}
add_filter( 'FHEE__espresso_events_Pricing_Hooks___get_dtt_edit_row__template_args', 'ee_test_get_dtt_edit_row_args', 10, 6 );
```

In this example, the filter is being used to change the default Date Time name on a new event to be "Empire Day" (rather than the core default which is an empty string).