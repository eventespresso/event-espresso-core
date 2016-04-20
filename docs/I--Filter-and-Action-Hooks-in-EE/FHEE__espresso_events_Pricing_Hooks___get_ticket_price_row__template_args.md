# FHEE__espresso_events_Pricing_Hooks___get_ticket_price_row__template_args

This filters the template variables used as dynamic content for the template generating price rows for tickets in the ticket editor while editing an event.

`FHEE__espresso_events_Pricing_Hooks___get_ticket_price_row__template_args`

**Found in:** `caffeinated/admin/new/pricing/espresso_events_Pricing_Hooks.class.php`

## Usage Example:

```php
function ee_test_price_row_args( $template_args, $tktrow, $prcrow, $price, $default, $ticket, $show_trash, $show_create, $is_creating_event ) {
	if ( ! $is_creating_event ) {
		return $template_args;
	}
	$template_args['price_currency_symbol'] = 'Alliance Credit';
	return $template_args;
}
add_filter( 'FHEE__espresso_events_Pricing_Hooks___get_ticket_price_row__template_args', 'ee_test_price_row_args', 10,  9 );
```

In this example we're just changing what gets used as the currency symbol when the price rows are generated (in this case we're using text for the currency symbol).