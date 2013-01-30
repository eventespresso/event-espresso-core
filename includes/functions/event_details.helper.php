<?php
/**
 * get categories
 *
 * @param 		string		$cat_identifier
 * @param 		string 		$css_class
 * @return 		array
 */
function espresso_event_list_get_category($cat_identifier = FALSE) {

	global $wpdb, $org_options;
	// error logging
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

	$category = FALSE;
//	echo '<h1>$cat_identifier : ' . $cat_identifier . '</h1>'; die();

	if ($cat_identifier) {

		$SQL = 'SELECT * FROM ' . EVENTS_CATEGORY_TABLE . ' WHERE category_identifier = %s';
		if ($categories = $wpdb->get_results($wpdb->prepare($SQL, $cat_identifier))) {
			$category = $categories[0];
		}
//		echo '<h1>$categories</h1>';
//		echo pre_arr($category);
	}

	return $category;
}

/**
 * get_venues
 *
 * @return 		array 		on success
 * @return 		FALSE 		on fail
 */
function espresso_event_list_get_venues() {

	global $wpdb;

	$SQL = 'SELECT * FROM ' . EVENTS_VENUE_TABLE . ' ORDER BY name, id ASC';
	$venues = $wpdb->get_results($SQL, OBJECT_K);
	return $venues;
}
//
///**
// * calculates early discount for an event price
// *
// * @param 		float 		$event_cost
// * @param 		float 		$early_disc
// * @param 		string 		$early_disc_percentage
// * @return 		float
// */
//function espresso_event_list_early_discount($event_cost, $early_disc, $early_disc_percentage) {
//
//	if ($early_disc_percentage) {
//		$pdisc = $early_disc / 100;
//		$event_cost = $event_cost - ($event_cost * $pdisc);
//	} else {
//		$event_cost = max(0, $event_cost - $early_disc);
//	}
//	return $event_cost;
//}
//
///**
// * get_event_prices
// *
// * @param 		int 			$event_id
// * @param 		float 		$early_disc
// * @param 		string 		$early_disc_date
// * @param 		string 		$early_disc_percentage
// * @return 		array 		on success
// * @return 		FALSE 		on fail
// */
//function espresso_event_list_get_event_prices($event_id, $early_disc, $early_disc_date, $early_disc_percentage) {
//
//	global $wpdb;
//
//	$SQL = 'SELECT * FROM ' . ESP_PRICE_TABLE . ' price';
//	$SQL .= ' JOIN ' . ESP_PRICE_TYPE . ' type ON type.PRT_ID=price.PRT_ID';
//	$SQL .= ' JOIN ' . ESP_EVENT_PRICE_TABLE . ' e_p ON e_p.PRC_ID=price.PRC_ID';
//	$SQL .= ' WHERE e_p.EVT_ID="%d"';
//	$SQL .= ' AND type.PBT_ID!=4';
//	$SQL .= ' ORDER BY type.PRT_order ASC';
//
//	if ($prices = $wpdb->get_results($wpdb->prepare($SQL, $event_id), ARRAY_A)) {
//		//echo printr( $prices );
//		if (!empty($early_disc) && !empty($early_disc_date) && strtotime($early_disc_date) > strtotime(date("Y-m-d"))) {
//
//			foreach ($prices as $price) {
//
//				$price['early_price'] = espresso_event_list_early_discount($price['event_cost'], $early_disc, $early_disc_percentage);
//
//				if ($price['event_cost'] != $price['member_price']) {
//					$price['early_member_price'] = espresso_event_list_early_discount($price['member_price'], $early_disc, $early_disc_percentage);
//				}
//
//				if ($early_disc_percentage) {
//					$price['early_display'] = $early_disc . '%';
//				} else {
//					$price['early_display'] = $early_disc;
//				}
//			}
//		}
//	}
//
//	$prices_a = array();
//
//	foreach ($prices as $price) {
//		$prices_a[$price['PRC_ID']] = $price;
//	}
//	echo printr( $prices_a );
//	return $prices_a;
//}
//
///**
// * process_event_prices
// *
// * @param 		array 		$event_prices
// * @return 		array
// */
//function espresso_event_list_process_event_prices($event_prices = array()) {
//
//	$prices = array();
//	if (!empty($event_prices)) {
//
//		// cycle through all pricing options for the event
//		foreach ($event_prices as $price) {
//
//			echo printr( $price, 'EVENT PRICE' );
//			
//			//$event_price = number_format($price['PRC_amount'], 2, '.', '');
//			$event_price = number_format($price->amount(), 2, '.', '');
//
//			//$prices[$price['PRC_ID']]['PRT_name'] = $price['PRT_name'];
//			$prices[ $price->ID() ]['PRT_name'] = $price->name();
//			$prices[ $price->ID() ]['PRC_amount'] = $event_price;
//
//			// calculate surcharges if any
//			//if ($price['surcharge'] != 0) {
//			if ( count( $price->adjustments() ) > 0 ) {
//				foreach ( $price->adjustments() as $adjustment ) {
//					//$prices[ $price->ID() ]['surcharge']
//				}
//				if ($price['surcharge_type'] == 'flat_rate') {
//					$prices[ $price->ID() ]['surcharge'] = number_format($price['surcharge'], 2, '.', '');
//				} else {
//					$prices[ $price->ID() ]['surcharge'] = number_format($price['surcharge'] * $event_price, 2, '.', '');
//				}
//			} else {
//				$prices[ $price->ID() ]['surcharge'] = 0;
//			}
//
//			$prices[ $price->ID() ]['ticket_price'] = $prices[ $price->ID() ]['event_cost'];
//			$prices[ $price->ID() ]['total'] = $prices[ $price->ID() ]['event_cost'] + $prices[ $price->ID() ]['surcharge'];
//
//			// calculate member pricing
//			if ($price['event_cost'] != $price['member_price']) {
//				$prices[ $price->ID() ]['member_pricing'] = TRUE;
//				$prices[ $price->ID() ]['member_price_type'] = $price['member_price_type'];
//				$prices[ $price->ID() ]['member_price'] = number_format($price['member_price'], 2, '.', '');
//
//
//				if ( is_user_logged_in() ) {
//					$prices[ $price->ID() ]['ticket_price'] = $prices[ $price->ID() ]['member_price'];
//					$prices[ $price->ID() ]['total'] = $prices[ $price->ID() ]['member_price'] + $prices[ $price->ID() ]['surcharge'];
//				}
//			} else {
//				$prices[ $price->ID() ]['member_pricing'] = FALSE;
//			}
//		}
//
//		return $prices;
//	} else {
//		return FALSE;
//	}
//}


//EVENT PRICE
//EE_Event_Price Object
//(
//    [_EP_adjustments:EE_Event_Price:private] => Array
//        (
//            [0] => Array
//                (
//                    [name] => Base Price
//                    [ID] => 5
//                    [amount] => 58.95
//                )
//
//            [1] => Array
//                (
//                    [name] => Service Fee
//                    [ID] => 2
//                    [is_percent] => 
//                    [adjustment] => 11
//                )
//
//        )
//
//    [_EP_amount:EE_Event_Price:private] => 69.95
//    [_EP_name:EE_Event_Price:private] => Floor Seats
//    [_EP_desc:EE_Event_Price:private] => Standing room only - no seats
//    [_EP_ID:EE_Event_Price:private] => 5





/**
 * get_recurring_events
 *
 * @param 		int 		$recurrence_id
 * @return 		array
 */
function espresso_event_list_get_recurring_events($recurrence_id = FALSE) {

	if (!$recurrence_id) {
		return FALSE;
	}

	global $wpdb;

	$SQL = 'SELECT * FROM ' . EVENT_ESPRESSO_RECURRENCE_TABLE . ' WHERE recurrence_id = %d';
	$recurring_events = $wpdb->get_results($wpdb->prepare($SQL, $recurrence_id));
	return $recurring_events;
}
