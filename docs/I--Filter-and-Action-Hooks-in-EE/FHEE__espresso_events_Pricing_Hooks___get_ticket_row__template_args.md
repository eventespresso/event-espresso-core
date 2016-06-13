# FHEE__espresso_events_Pricing_Hooks___get_ticket_row__template_args

This filter allows one to modify the template arguments used when generating the dynamic content for the main ticket row in the ticket editor displayed in the event editor.

`FHEE__espresso_events_Pricing_Hooks___get_ticket_row__template_args`

**Found in**: `caffeinated/admin/new/pricing/espresso_events_Pricing_Hooks.class.php`

## Usage Example:

```php
function ee_test_get_ticket_row_template_args( $template_args, $tkt_row, $ticket, $ticket_datetimes, $all_dtts, $default, $all_tickets, $creating_event ) {
	if ( ! $creating_event ) {
		return $template_args;
	}

	$template_args['TKT_name'] = 'Lightsaber Games';
	$template_args['TKT_qty'] = 100;
	$template_args['TKT_description'] = 'Join in the LightSaber Games!';
	return $template_args;
}
add_filter( 'FHEE__espresso_events_Pricing_Hooks___get_ticket_row__template_args', 'ee_test_get_ticket_row_template_args', 10, 8 );
```

In this example, the filter is being used to change the default ticket name, quantity and description when a brand new event is created (note this particular example would affect ALL default tickets being loaded with a new event).