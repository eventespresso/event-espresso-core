# FHEE__espresso_events_Pricing_Hooks___get_ticket_datetime_list_item__template_args

This filters the list item for a datetime attached to a ticket.

`FHEE__espresso_events_Pricing_Hooks___get_ticket_datetime_list_item__template_args`

**Found In:** `caffeinated/admin/new/pricing/espresso_events_Pricing_Hooks.class.php`

## Usage Example:

```php
function ee_test_get_ticket_datetime_list_item_template_args( $template_args, $dttrow, $tktrow, $dtt, $ticket, $ticket_datetimes, $default, $creating_event ) {
	if ( ! $creating_event ) {
		return $template_args;
	}

	$template_args['DTT_name'] = $default && empty( $dtt ) ? 'DTTNAME' : 'Empire Day';
	return $template_args;
}
add_filter( 'FHEE__espresso_events_Pricing_Hooks___get_ticket_datetime_list_item__template_args', 'ee_test_get_ticket_datetime_list_item_template_args', 10, 8 );
```

In this example we're just changing the default date time name when creating an event to "Empire Day".