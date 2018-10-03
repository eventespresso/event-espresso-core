# Modifying the Defaults on Creating a New Event

With filter hooks provided in Event Espresso core, it is possible to modify the defaults used when creating a new event.  Below is the content of a sample plugin that demonstrates how this is possible:

```php
<?php
/*
  Plugin Name: Testing default event filters
  Plugin URI: http://www.eventespresso.com
  Description: This is just an addon to test the default event setup filters.
  Version: 1.0
  Author: Event Espresso
  Author URI: http://www.eventespresso.com
  Copyright 2014 Event Espresso 
  **/


/** DEFAULT DATETIME EDIT ROWS **/

function ee_test_get_dtt_edit_row_args( $template_args, $dttrow, $dtt, $default, $all_dtts, $creating_event ) {
	if ( ! $creating_event ) {
		return $template_args;
	}

	$template_args['DTT_name'] = 'Empire Day';
	return $template_args;

}
add_filter( 'FHEE__espresso_events_Pricing_Hooks___get_dtt_edit_row__template_args', 'ee_test_get_dtt_edit_row_args', 10, 6 );



function ee_test_get_dtt_attached_ticket_row_template_args( $template_args, $dttrow, $dtt, $datetime_tickets, $all_tickets, $default, $creating_event ) {
	if ( ! $creating_event ) {
		return $template_args;
	}
	$template_args['DTT_description'] = 'this is a default description for all date times';
	return $template_args;
}
add_filter( 'FHEE__espresso_events_Pricing_Hooks___get_dtt_attached_ticket_row__template_args', 'ee_test_get_dtt_attached_ticket_row_template_args', 10, 7 );



function ee_test_get_datetime_tickets_list_item_template_args( $template_args, $dttrow, $tktrow, $dtt, $ticket, $datetime_tickets, $default, $creating_event ) {
	if ( ! $creating_event ) {
		return $template_args;
	}

	$template_args['TKT_name'] = $default && empty( $ticket ) ? 'TKTNAME' : 'Lightsaber Games';
	return $template_args;

}
add_filter( 'FHEE__espresso_events_Pricing_Hooks___get_datetime_tickets_list_item__template_args', 'ee_test_get_datetime_tickets_list_item_template_args', 10, 8 );



function ee_test_get_ticket_row_template_args( $template_args, $tkt_row, $ticket, $ticket_datetimes, $all_dtts, $default, $all_tickets, $creating_event ) {
	if ( ! $creating_event ) {
		return $template_args;
	}

	$template_args['TKT_name'] = 'Lightsaber Games';
	$template_args['TKT_qty_for_input'] = 10;
	$template_args['TKT_description'] = 'Join in the LightSaber Games!';
	return $template_args;
}
add_filter( 'FHEE__espresso_events_Pricing_Hooks___get_ticket_row__template_args', 'ee_test_get_ticket_row_template_args', 10, 8 );


function ee_test_get_ticket_datetime_list_item_template_args( $template_args, $dttrow, $tktrow, $dtt, $ticket, $ticket_datetimes, $default, $creating_event ) {
	if ( ! $creating_event ) {
		return $template_args;
	}

	$template_args['DTT_name'] = $default && empty( $dtt ) ? 'DTTNAME' : 'Empire Day';
	return $template_args;
}
add_filter( 'FHEE__espresso_events_Pricing_Hooks___get_ticket_datetime_list_item__template_args', 'ee_test_get_ticket_datetime_list_item_template_args', 10, 8 );
```

The following filters are in use with this example:

* [FHEE__espresso_events_Pricing_Hooks___get_dtt_edit_row__template_args](../I--Filter-and-Action-Hooks-in-EE/FHEE__espresso_events_Pricing_Hooks___get_dtt_edit_row__template_args.md)
* [FHEE__espresso_events_Pricing_Hooks___get_dtt_attached_ticket_row__template_args](../I--Filter-and-Action-Hooks-in-EE/FHEE__espresso_events_Pricing_Hooks___get_dtt_attached_ticket_row__template_args.md)
* [FHEE__espresso_events_Pricing_Hooks___get_datetime_tickets_list_item__template_args](../I--Filter-and-Action-Hooks-in-EE/FHEE__espresso_events_Pricing_Hooks___get_datetime_tickets_list_item__template_args.md)
* [FHEE__espresso_events_Pricing_Hooks___get_ticket_row__template_args](../I--Filter-and-Action-Hooks-in-EE/FHEE__espresso_events_Pricing_Hooks___get_ticket_row__template_args.md)
* [FHEE__espresso_events_Pricing_Hooks___get_ticket_datetime_list_item__template_args](../I--Filter-and-Action-Hooks-in-EE/FHEE__espresso_events_Pricing_Hooks___get_ticket_datetime_list_item__template_args.md)