<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');

function espresso_default_price_types_activation_sql( $SQL ) {
	$SQL = "INSERT INTO " . ESP_PRICE_TYPE . " 
				( PRT_ID, PRT_name, PBT_ID, PRT_is_member, PRT_is_percent, PRT_is_global, PRT_order, PRT_deleted ) VALUES
				(1, 'Default Event Price', 1, 0, 0, 1, 0, 0),
				(2, 'Event Price', 1, 0, 0, 0, 0, 0),
				(3, 'Default Member % Discount', 2, 1, 1, 1, 10, 0),
				(4, 'Default Early Bird % Discount', 2, 0, 1, 1, 20, 0),
				(5, 'Default Surcharge', 3, 0, 0, 1, 30, 0),
				(6, 'Regional Tax', 4, 0, 1, 1, 40, 0),
				(7, 'Federal Tax', 4, 0, 1, 1, 50, 0);";
	return $SQL;
}
add_filter( 'filter_hook_espresso_default_price_types_activation_sql', 'espresso_default_price_types_activation_sql', 10, 1 );


function espresso_default_prices_activation_sql( $SQL ) {
	$SQL = "INSERT INTO " . ESP_PRICE_TABLE . "
				(PRC_ID, PRT_ID, EVT_ID, PRC_amount, PRC_name, PRC_desc, PRC_use_dates, PRC_start_date, PRC_end_date, PRC_is_active, PRC_overrides, PRC_order, PRC_deleted ) VALUES
				(1, 1, 0, '10.00', 'General Admission', 'Regular price for all Events. Example content - delete if you want to', 0, NULL, NULL, 1, NULL, 0, 0),
				(2, 3, 0, '20', 'Members Discount', 'Members receive a 20% discount off of the regular price. Example content - delete if you want to', 0, NULL, NULL, 1, NULL, 10, 0),
				(3, 4, 0, '10', 'Early Bird Discount', 'Sign up early and receive an additional 10% discount off of the regular price. Example content - delete if you want to',  1, NULL, NULL, 1, NULL, 20, 0),
				(4, 5, 0, '7.50', 'Service Fee', 'Covers administrative expenses. Example content - delete if you want to', 0, NULL, NULL, 1, NULL, 30, 0)
				(5, 6, 0, '7.00', 'Local Sales Tax', 'Locally imposed tax. Example content - delete if you want to', 0, NULL, NULL, 1, NULL, 40, 0),
				(6, 7, 0, '15.00', 'Sales Tax', 'Federally imposed tax. Example content - delete if you want to', 0, NULL, NULL, 1, NULL, 50, 0);";
	return $SQL;
}
add_filter( 'filter_hook_espresso_default_prices_activation_sql', 'espresso_default_prices_activation_sql', 10, 1 );