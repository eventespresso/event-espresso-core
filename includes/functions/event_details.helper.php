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

/**
 * get_event_times
 *
 * @param 		int 			$event_id
 * @return 		array 		on success
 * @return 		FALSE 		on fail
 */
function espresso_event_list_get_event_times($event_id) {

	global $wpdb;

	$SQL = 'SELECT * FROM ' . EVENTS_START_END_TABLE . ' WHERE event_id="%d" ORDER BY start_time ASC';

	if (!$timeslots = $wpdb->get_results($wpdb->prepare($SQL, $event_id))) {
		$time = new stdClass;
		$time->id = 1;
		$time->event_id = $event_id;
		$time->start_time = '12:00:01am';
		$time->end_time = '12:00:01pm';
		$reg_limit = 0;
		$timeslots = array($time);
	}

	return $timeslots;
}

/**
 * calculates early discount for an event price
 *
 * @param 		float 		$event_cost
 * @param 		float 		$early_disc
 * @param 		string 		$early_disc_percentage
 * @return 		float
 */
function espresso_event_list_early_discount($event_cost, $early_disc, $early_disc_percentage) {

	if ($early_disc_percentage) {
		$pdisc = $early_disc / 100;
		$event_cost = $event_cost - ($event_cost * $pdisc);
	} else {
		$event_cost = max(0, $event_cost - $early_disc);
	}
	return $event_cost;
}

/**
 * get_event_prices
 *
 * @param 		int 			$event_id
 * @param 		float 		$early_disc
 * @param 		string 		$early_disc_date
 * @param 		string 		$early_disc_percentage
 * @return 		array 		on success
 * @return 		FALSE 		on fail
 */
function espresso_event_list_get_event_prices($event_id, $early_disc, $early_disc_date, $early_disc_percentage) {

	global $wpdb;

	$SQL = 'SELECT * FROM ' . ESP_PRICE_TABLE . ' price';
	$SQL .= ' JOIN ' . ESP_PRICE_TYPE . ' type ON type.PRT_ID=price.PRT_ID';
	$SQL .= ' JOIN ' . ESP_EVENT_PRICE_TABLE . ' e_p ON e_p.PRC_ID=price.PRC_ID';
	$SQL .= ' WHERE e_p.EVT_ID="%d" ORDER BY PRT_order ASC';

	if ($prices = $wpdb->get_results($wpdb->prepare($SQL, $event_id), ARRAY_A)) {

		if (!empty($early_disc) && !empty($early_disc_date) && strtotime($early_disc_date) > strtotime(date("Y-m-d"))) {

			foreach ($prices as $price) {

				$price['early_price'] = espresso_event_list_early_discount($price['event_cost'], $early_disc, $early_disc_percentage);

				if ($price['event_cost'] != $price['member_price']) {
					$price['early_member_price'] = espresso_event_list_early_discount($price['member_price'], $early_disc, $early_disc_percentage);
				}

				if ($early_disc_percentage) {
					$price['early_display'] = $early_disc . '%';
				} else {
					$price['early_display'] = $early_disc;
				}
			}
		}
	}

	$prices_a = array();

	foreach ($prices as $price) {
		$prices_a[$price['PRC_ID']] = $price;
	}

	return $prices_a;
}

/**
 * process_event_prices
 *
 * @param 		array 		$event_prices
 * @return 		array
 */
function espresso_event_list_process_event_prices($event_prices = array()) {

	if (!empty($event_prices)) {

		// cycle through all pricing options for the event
		foreach ($event_prices as $price) {

			$event_price = number_format($price['PRC_amount'], 2, '.', '');

			$prices[$price['PRC_ID']]['PRT_name'] = $price['PRT_name'];
			$prices[$price['PRC_ID']]['PRC_amount'] = $event_price;

			// calculate surcharges if any
			if ($price['surcharge'] != 0) {
				if ($price['surcharge_type'] == 'flat_rate') {
					$prices[$price['id']]['surcharge'] = number_format($price['surcharge'], 2, '.', '');
				} else {
					$prices[$price['id']]['surcharge'] = number_format($price['surcharge'] * $event_price, 2, '.', '');
				}
			} else {
				$prices[$price['id']]['surcharge'] = 0;
			}

			$prices[$price['id']]['ticket_price'] = $prices[$price['id']]['event_cost'];
			$prices[$price['id']]['total'] = $prices[$price['id']]['event_cost'] + $prices[$price['id']]['surcharge'];

			// calculate member pricing
			if ($price['event_cost'] != $price['member_price']) {
				$prices[$price['id']]['member_pricing'] = TRUE;
				$prices[$price['id']]['member_price_type'] = $price['member_price_type'];
				$prices[$price['id']]['member_price'] = number_format($price['member_price'], 2, '.', '');


				if (is_user_logged_in()) {
					$prices[$price['id']]['ticket_price'] = $prices[$price['id']]['member_price'];
					$prices[$price['id']]['total'] = $prices[$price['id']]['member_price'] + $prices[$price['id']]['surcharge'];
				}
			} else {
				$prices[$price['id']]['member_pricing'] = FALSE;
			}
		}

		return $prices;
	} else {
		return FALSE;
	}
}

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
