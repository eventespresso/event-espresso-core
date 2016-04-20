This hook filters the template args for the tax price row template that is used in the ticket editor on the event editor page.

`FHEE__espresso_events_Pricing_Hooks___get_tax_rows__template_args`

**Found in:** `caffeinated/admin/new/pricing/espresso_events_Pricing_Hooks.class.php`

## Usage Example:

```php
function ee_test_tax_row_args( $template_args, $tktrow, $ticket, $is_creating_event ) {
	if ( ! $is_creating_event ) {
		return $template_args;
	}
	$template_args['tax_label'] = 'Some Default Label';
	return $template_args;
}
add_filter( 'FHEE__espresso_events_Pricing_Hooks___get_tax_rows__template_args', 'ee_test_tax_row_args', 10,  4 );
```

In this example we're just changing the label for the tax when a new event is being created.