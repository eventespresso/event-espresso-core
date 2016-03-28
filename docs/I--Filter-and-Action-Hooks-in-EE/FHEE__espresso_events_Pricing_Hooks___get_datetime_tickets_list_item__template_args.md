# FHEE__espresso_events_Pricing_Hooks___get_datetime_tickets_list_item__template_args

This filters the template arguments used for dynamic content in the template for ticket list items representing tickets attached to a date-time.

`FHEE__espresso_events_Pricing_Hooks___get_datetime_tickets_list_item__template_args`

**Found in**: `caffeinated/admin/new/pricing/espresso_events_Pricing_Hooks.class.php`

## Usage Example:

```php
function ee_test_get_datetime_tickets_list_item_template_args( $template_args, $dttrow, $tktrow, $dtt, $ticket, $datetime_tickets, $default, $creating_event ) {
	if ( ! $creating_event ) {
		return $template_args;
	}

	$template_args['TKT_name'] = $default && empty( $ticket ) ? 'TKTNAME' : 'Lightsaber Games';
	return $template_args;

}
add_filter( 'FHEE__espresso_events_Pricing_Hooks___get_datetime_tickets_list_item__template_args', 'ee_test_get_datetime_tickets_list_item_template_args', 10, 8 );
```

In this example the filter is being used to change the name of the default ticket attached to the date-time as 'Light Saber Games' when the event is a new event (while preserving the needed key for the html skeleton used by the js for adding new tickets).