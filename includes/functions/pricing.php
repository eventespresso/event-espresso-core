<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
do_action('AHEE_log', __FILE__, ' FILE LOADED', '' );

//Functions that deal with pricing should be placed here

function event_espresso_paid_status_icon($payment_status = '') {
	do_action('AHEE_log', __FILE__, __FUNCTION__, '' );
	switch ($payment_status) {
		case 'Checkedin':
			echo '<img class="espresso-paid-status-icon-img" align="absmiddle" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/accept.png" width="16" height="16" alt="' . __('Checked-in', 'event_espresso') . '" title="' . __('Checked-in', 'event_espresso') . '" />';
			break;
		case 'NotCheckedin':
			echo '<img class="espresso-paid-status-icon-img" align="absmiddle" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/exclamation.png" width="16" height="16" alt="' . __('Not Checked-in', 'event_espresso') . '" title="' . __('Not Checked-in', 'event_espresso') . '" />';
			break;
		case 'Active':
			echo '<img class="espresso-paid-status-icon-img" align="absmiddle" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/accept.png" width="16" height="16" alt="' . __('Active', 'event_espresso') . '" title="' . __('Active', 'event_espresso') . '" />';
			break;
		case 'Inactive':
			echo '<img class="espresso-paid-status-icon-img" align="absmiddle" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/exclamation.png" width="16" height="16" alt="' . __('Inactive', 'event_espresso') . '" title="' . __('Inactive', 'event_espresso') . '" />';
			break;
//		case 'Checkedin':
//			echo '<img align="absmiddle" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/accept.png" width="16" height="16" alt="' . __('Checked-in', 'event_espresso') . '" title="' . __('Checked-in', 'event_espresso') . '" />';
//			break;
//		case 'NotCheckedin':
//			echo '<img align="absmiddle" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/exclamation.png" width="16" height="16" alt="' . __('Not Checked-in', 'event_espresso') . '" title="' . __('Not Checked-in', 'event_espresso') . '" />';
//			break;
		case 'Approved':
			echo '<img class="espresso-paid-status-icon-img" align="absmiddle" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/accept.png" width="16" height="16" alt="' . __('Completed', 'event_espresso') . '" title="' . __('Completed', 'event_espresso') . '" />';
			break;

		case 'Pending':
			echo '<img class="espresso-paid-status-icon-img" align="absmiddle" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/error.png" width="16" height="16" alt="' . __('Pending', 'event_espresso') . '" title="' . __('Pending', 'event_espresso') . '" />';
			break;
		case 'Declined':
			echo '<img class="espresso-paid-status-icon-img" align="absmiddle" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/exclamation.png" width="16" height="16" alt="' . __('Payment Declined', 'event_espresso') . '" title="' . __('Payment Declined', 'event_espresso') . '" />';
			break;
		default:
			echo '<img class="espresso-paid-status-icon-img" align="absmiddle" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/exclamation.png" width="16" height="16" alt="' . __('Incomplete', 'event_espresso') . '" title="' . __('Incomplete', 'event_espresso') . '" />';
			break;
	}
}

//Retturns the first price assocaited with an event. If an event has more that one price, you can pass the number of the second price.
if (!function_exists('espresso_return_price')) {

	function espresso_return_single_price($event_id, $number = 0) {
		global $wpdb, $org_options;
		do_action('AHEE_log', __FILE__, __FUNCTION__, '');
		$number = $number == 0 ? '0,1' : $number . ',' . $number;

		$results = $wpdb->get_results("SELECT id, event_cost, surcharge FROM " . EVENTS_PRICES_TABLE . " WHERE event_id='" . $event_id . "' ORDER BY id ASC LIMIT " . $number);
		if ($wpdb->num_rows > 0) {
			foreach ($results as $result) {
				if ($result->event_cost > 0.00) {
					$event_cost = $result->surcharge > 0.00 && $result->event_cost > 0.00 ? $result->event_cost + number_format($result->event_cost * $result->surcharge / 100, 2, '.', '') : $result->event_cost;

// Addition for Early Registration discount
					if (early_discount_amount($event_id, $event_cost) != false) {
						$early_price_data = array();
						$early_price_data = early_discount_amount($event_id, $event_cost);
						$event_cost = $early_price_data['event_price'];
					}
				} else {
					$event_cost = '0.00';
				}
			}
		} else {
			$event_cost = '0.00';
		}

		return $event_cost;
	}

}

/*
  Returns the final price of an event
 *
 * @params int $price_id
 * @params int $event_id
 */
if (!function_exists('event_espresso_get_final_price')) {

	function event_espresso_get_final_price($price_id, $event_id = 0) {
		global $wpdb, $org_options;
		do_action('AHEE_log', __FILE__, __FUNCTION__, '');
		$results = $wpdb->get_results("SELECT id, event_cost, surcharge, surcharge_type FROM " . EVENTS_PRICES_TABLE . " WHERE id='" . $price_id . "' ORDER BY id ASC LIMIT 1");
		$event_cost = 0.00;
		foreach ($results as $result) {
			if ($wpdb->num_rows >= 1) {
				if ($result->event_cost > 0.00) {

					$surcharge = number_format($result->surcharge, 2, '.', ''); //by default it's 0.  if flat rate, will just be formatted and atted to the total
					if ($result->surcharge > 0 && $result->surcharge_type == 'pct') { //if >0 and is percent, calculate surcharg amount to be added to total
						$surcharge = number_format($result->event_cost * $result->surcharge / 100, 2, '.', '');
					}

					$event_cost = $result->event_cost;

// Addition for Early Registration discount
					if (early_discount_amount($event_id, $event_cost) != false) {
						$early_price_data = array();
						$early_price_data = early_discount_amount($event_id, $event_cost);
						$event_cost = $early_price_data['event_price'];
					}
				} else {
					$event_cost = 0.00;
				}
			} else if ($wpdb->num_rows == 0) {
				$event_cost = 0.00;
			}
		}
		if (empty($surcharge))
			$surcharge = 0;
		$event_cost = $event_cost + $surcharge;
		return empty($event_cost) ? 0 : $event_cost;
	}

}


//Get the early bird pricing
if (!function_exists('early_discount_amount')) {

	function early_discount_amount($event_id, $event_cost, $early_bird_message = '') {
		global $wpdb, $org_options;
		do_action('AHEE_log', __FILE__, __FUNCTION__, '');
//$early_bird_message = ' ' . __('Early Pricing','event_espresso');
		$eventdata = $wpdb->get_results("SELECT early_disc, early_disc_date, early_disc_percentage FROM " . EVENTS_DETAIL_TABLE . " WHERE id='" . $event_id . "' LIMIT 1");
		if ((strlen($eventdata[0]->early_disc) > 0) && (strtotime($eventdata[0]->early_disc_date) > strtotime(date("Y-m-d")))) {
			$early_price_display = $eventdata[0]->early_disc_percentage ? $eventdata[0]->early_disc . '%' : $org_options['currency_symbol'] . $eventdata[0]->early_disc;
			if ($eventdata[0]->early_disc_percentage) {
				$pdisc = $eventdata[0]->early_disc / 100;
				$event_cost = $event_cost - ($event_cost * $pdisc);
			} else {
// Use max function to prevent negative cost when discount exceeds price.
				$event_cost = max(0, $event_cost - $eventdata[0]->early_disc);
			}
//$extra = " " . $early_bird_message;
			$early_price_data = array('event_price' => $event_cost, 'early_disc' => $early_price_display);
			return $early_price_data;
		} else {
			return false;
		}
	}

}

function espresso_price_selection($event, $attendee) {
	do_action('AHEE_log', __FILE__, __FUNCTION__, '' );
	global $org_options;
	$prices = $event->get_prices();
	$multiple_quantity = !($event->get_number_of_available_spaces() == 1 || !$event->is_allow_multiple());
	$multiple_prices = count($prices) > 1;
	if ($attendee == 'additional') {
		$attendee .= '[]';
	}
	$html = '';
	if ($multiple_prices && !$multiple_quantity) {
		$html .='<label for="price_select">' . __('Choose an Option: ', 'event_espresso') . '</label>';
		$html .= '<select name="price|' . $event->get_id() . '" id="price_select">';
	}
	foreach ($prices as $price) {
		if ($price['surcharge'] > 0 && $price['event_cost'] > 0.00) {
			$surcharge_text = !empty($org_options['surcharge_text']) ? $org_options['surcharge_text'] : __('Surcharge', 'event_espresso');
			$surcharge = " + {$org_options['currency_symbol']}{$price['surcharge']} " . $surcharge_text;
			if ($price['surcharge_type'] == 'pct') {
				$surcharge = " + {$price['surcharge']}% " . $surcharge_text;
			}
		} else {
			$surcharge = '';
		}
		if (!empty($price['early_member_price'])) {
			$price['event_cost'] = $price['early_member_price'];
			$early_bird_message = __(' Early Pricing', 'event_espresso');
		} else {
			$early_bird_message = '';
		}
		if (!$multiple_quantity) {
			if (!$multiple_prices) {
				$html .= '<span class="event_price_label">' . __('Price:', 'event_espresso') . '</span> <span class="event_price_value">' . $org_options['currency_symbol'] . number_format($price['event_cost'], 2, '.', '') . $early_bird_message . $surcharge . '</span>';
				$html .= '<input type="hidden" name="quantity|' . $price['id'] . '|' . $event->get_id() . '|' . $attendee . '" value="1">';
			} else {
				$html .= '<option value="' . $price['id'] . '">' . $price['price_type'] . ' (' . $org_options['currency_symbol'] . number_format($price['event_cost'], 2) . $early_bird_message . ') ' . $surcharge . ' </option>';
			}
		} else {
			if ($attendee == 'primary') {
				$min = 1;
			} else {
				$min = 0;
			}
			$max = min($event->get_additional_limit(), $event->get_number_of_available_spaces());
			$html .='<label for="quantity_select">' . __('Choose number of tickets for ', 'event_espresso') . $price['price_type'] . ': ' . $org_options['currency_symbol'] . number_format($price['event_cost'], 2, '.', '') . $early_bird_message . $surcharge . '</label>';
			$html .= '<select name="quantity|' . $price['id'] . '|' . $event->get_id() . '|' . $attendee . '" id="quantity_select">';
			for ($i = $min; $i <= $max; $i++) {
				$html .= '<option value="' . $i . '">' . $i . '</option>';
			}
			$html .= '</select>';
		}
	}
	if ($multiple_prices && !$multiple_quantity) {
		$html .= '</select>';
	}
	return $html;
}

//Creates dropdowns if multiple prices are associated with an event
if (!function_exists('event_espresso_price_dropdown')) {

	/**
	 * returns html for price option dropdown
	 *
	 * @param type int $event_id
	 * @param type array $atts
	 * for example:
	 * ('show_label'=>TRUE,
	 *  'option_name'=>'price_option',
	 *  'label'=>'my_label',
	 *  'current_value'=>2)
	 * @return string
	 */
	function event_espresso_price_dropdown($event_id, $atts = array()) {
		do_action('AHEE_log', __FILE__, __FUNCTION__, '' );
		global $org_options;
		if (!empty($atts)) {
			extract($atts);
		}

		$show_label = !empty($show_label) ? $show_label : TRUE;
		$option_name = !empty($option_name) ? $option_name : 'price_option';
		$label = !empty($label) ? $label : __('Choose an Option: ', 'event_espresso');

		require_once(EE_MODELS . 'EEM_Event_Price.model.php');
		$EP = EEM_Event_Price::instance();
		$prices = $EP->get_final_event_prices($event_id);
		$html = '';

//If more than one price was added to an event, we need to create a drop down to select the price.
		if (count($prices) > 1) {

//Create the label for the drop down
			$html .= $show_label ? '<label for="' . $option_name . '">' . $label . '</label>' : '';

//Create a dropdown of prices
			$html .= '<select name="' . $option_name . '" id="price_option-' . $event_id . '">';

			if (is_admin())
				$html .= '<option value="">None</option>';

			foreach ($prices as $price) {

//If the price id was passed to this function, we need need to select that price.
				if (!empty($current_value)
								&& $current_value === $price->ID()) {
					$selected = 'selected="selected" ';
				} else {
					$selected = '';
				}

//Create the drop down options
				$html .= '<option ' . $selected . ' value="' . $price->ID() . '">' . $price->name() . ' (' . $org_options['currency_symbol'] . number_format($price->amount(), 2) . ') </option>';
			}

//If a single price was added to an event, then create the price display and hidden fields to hold the additional information.
		} else if (count($prices) == 1) {
			$price = array_shift($prices);
			$html .= '<span class="event_price_label">' . __('Price:', 'event_espresso') . '</span> <span class="event_price_value">' . $org_options['currency_symbol'] . number_format($price->amount(), 2, '.', '') . '</span>';

//Create hidden fields to pass additional information to the add_attendees_to_db function
			$html .= '<input type="hidden" name="' . $option_name . '" value="' . $price->ID() . '">';

//If no prices are found, display the free event message
		} else if (count($prices) == 0) {
			$html .= '<span class="free_event">' . __('Free Event', 'event_espresso') . '</span>';
		}

		return $html;
	}

}

//This function gets the first price id associated with an event and displays a hidden field.
function espresso_hidden_price_id($event_id) {
	global $wpdb, $org_options;
	do_action('AHEE_log', __FILE__, __FUNCTION__, '');
	$wpdb->get_results("SELECT id FROM " . EVENTS_PRICES_TABLE . " WHERE event_id='" . $event_id . "' LIMIT 0,1 ");
	$num_rows = $wpdb->num_rows;
	if ($num_rows > 0) {
		return '<input type="hidden" name="price_id" id="price_id-' . $wpdb->last_result[0]->id . '" value="' . $wpdb->last_result[0]->id . '">';
	} else {
		return '<div style="display:none">' . __('No prices id results.', 'event_espresso') . '</div>';
	}
}

//This function returns the first price id associated with an event
function espresso_get_price_id($event_id) {
	global $wpdb, $org_options;
	do_action('AHEE_log', __FILE__, __FUNCTION__, '');
	$wpdb->get_results("SELECT id FROM " . EVENTS_PRICES_TABLE . " WHERE event_id='" . $event_id . "' LIMIT 0,1 ");
	$num_rows = $wpdb->num_rows;
	if ($num_rows > 0) {
		return $wpdb->last_result[0]->id;
	} else {
		return 0;
	}
}

if (!function_exists('espresso_payment_type')) {

	function espresso_payment_type($type) {
		do_action('AHEE_log', __FILE__, __FUNCTION__, '' );
		switch ($type) {
			case 'web_accept':
			case 'cart':
				return __('PayPal', 'event_espresso');
				break;
			case 'EW':
				return __('eWay', 'event_espresso');
				break;
			case 'CC':
			case 'PPP':
			case 'auth_capture':
			case 'FD':
				return __('CC', 'event_espresso');
				break;
			case 'INV':
				return __('Invoice', 'event_espresso');
				break;
			case 'OFFLINE':
				return __('Offline payment', 'event_espresso');
				break;
			default:
				return __($type, 'event_espresso');
				break;
		}
	}

}




