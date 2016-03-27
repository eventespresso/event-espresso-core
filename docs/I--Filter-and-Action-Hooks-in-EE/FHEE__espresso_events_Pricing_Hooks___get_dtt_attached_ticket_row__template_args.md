# FHEE__espresso_events_Pricing_Hooks___get_dtt_attached_ticket_row__template_args

This filter allows one to modify the template args for the template used to generate the advanced editor for a date-time in the ticket and date-time editor used when editing events.

`FHEE__espresso_events_Pricing_Hooks___get_dtt_attached_ticket_row__template_args`

**Found In**: `caffeinated/admin/new/pricing/espresso_events_Pricing_Hooks.class.php`

## Example Usage:

```php
function ee_test_get_dtt_attached_ticket_row_template_args( $template_args, $dttrow, $dtt, $datetime_tickets, $all_tickets, $default, $creating_event ) {
	if ( ! $creating_event ) {
		return $template_args;
	}
	$template_args['DTT_description'] = 'this is a default description for all date times';
	return $template_args;
}
add_filter( 'FHEE__espresso_events_Pricing_Hooks___get_dtt_attached_ticket_row__template_args', 'ee_test_get_dtt_attached_ticket_row_template_args', 10, 7 );
```

In the example above, the default description for a date time has been changed when creating a new event.