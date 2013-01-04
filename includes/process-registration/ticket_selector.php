<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	3.2.P
 *
 * ------------------------------------------------------------------------
 *
 * Ticket Selector 
 *
 * @package			Event Espresso
 * @subpackage		includes/process-registration/
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
/**
 * creates buttons for selcting number of attendees for an event
 *
 * @param 		int 		$event_id
 * @return 		string	
 */
function espresso_ticket_selector($event) {
	
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	
	add_action( 'wp_footer', 'espresso_load_tckt_slctr_js' );

	$template_args = array();

	if (!isset($event->additional_limit) or $event->additional_limit == '') {
		$event->additional_limit = $event->reg_limit;
	}

	// make it at least 1
	$event->additional_limit = ( $event->additional_limit == 0 ) ? 1 : $event->additional_limit;

	// let's make the max amount of attendees somebody can select a little more reasonable
	if ($event->additional_limit > 16) {
		$max_atndz = 16;
	} else {
		$max_atndz = $event->additional_limit;
	}
	
	$template_args['event_id'] = $event->id;
	$template_args['event_name'] = $event->event_name;
	$template_args['require_pre_approval'] = $event->require_pre_approval;

	$template_args['max_atndz'] = $max_atndz;

	$template_args['dates'] = is_array($event->recurring_events) ? $event->recurring_events : $event->datetimes;
	$template_args['dates'] = espresso_format_date($template_args['dates']);

	$template_args['times'] = espresso_process_event_times($event->datetimes);
	$template_args['datetimes'] = espresso_process_event_datetimes($event->datetimes);
	$template_args['multiple_time_options'] = count($template_args['times']) > 1 ? TRUE : FALSE;
//	echo printr( $template_args['times'], 'times <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span>', 'auto' );
//	echo printr( $event->datetimes, 'event->datetimes <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span>', 'auto' );

	$template_args['prices'] = espresso_process_event_prices($event->prices, $event->currency_symbol, 'included');
	$template_args['multiple_price_options'] = count($template_args['prices']) > 1 ? TRUE : FALSE;
//	echo printr($event->prices, 'event->prices <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span>', 'auto' );
	
	// had problems with event desc not playing nice with serialize so....
	//$all_meta = array_map('wp_strip_all_tags', $event->reg_btn['all_meta']);
	//$template_args['meta'] = serialize( $all_meta );
	//$template_args['meta'] = base64_encode(serialize($all_meta));
	$template_args['meta_keys'] = empty($event->meta_keys) ? array() : $event->meta_keys;
	array_walk_recursive( $event->meta_values, 'espresso_apply_htmlentities' );
	$template_args['meta_values'] = empty($event->meta_values) ? array() : $event->meta_values;


	$template_args['currency_symbol'] = $event->currency_symbol;
	
	$templates['ticket_selector'] =  EVENT_ESPRESSO_PLUGINFULLPATH . 'templates/ticket_selector/ticket_selector_chart.template.php';
//	$templates['ticket_selector'] =  EVENT_ESPRESSO_PLUGINFULLPATH . 'templates/ticket_selector/ticket_selector_multi_selects.template.php';
//	$templates['ticket_selector'] =  EVENT_ESPRESSO_PLUGINFULLPATH . 'templates/ticket_selector/ticket_selector_threaded_chart.template.php';
	espresso_display_template($templates['ticket_selector'], $template_args);

}


function espresso_apply_htmlentities( &$item, $key ) {
	$item = htmlentities( $item, ENT_QUOTES, 'UTF-8' );
}




/**
 * 		format date for display
 *
 * 		@param  mixed 		$dates
 * 		@return 	string
 */
function espresso_format_date($datetimes) {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	// start with an empty array
	$dates = array();
	foreach ( $datetimes as $DTT_ID => $date ) {
		$frmtd = $date->start_date('D M jS');
		$dates[ $DTT_ID ] = str_replace( ' ', '&nbsp;', $frmtd );
	}
	// flip it once
	$dates = array_flip( $dates );
	// flip it twice - and the duplicates magically dissappear
	$dates = array_flip( $dates );
	return $dates;
}





/**
 * 		process event times
 *
 * 		@param array  	$times
 * 		@return array
 * 		@return string
 */
function espresso_process_event_times($times) {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	// start with an empty array
	$time_options = array();
	$tm_frmt = 'g:ia';
	foreach ($times as $DTT_ID => $time) {		
		$time_options[ $DTT_ID ] = array(
				'id' => $DTT_ID,
				'event_id' => $time->event_ID(),
				'start_time' => $time->start(),
				'formatted' => $time->end_time() ? $time->start_time($tm_frmt) . ' - ' . $time->end_time($tm_frmt) : $time->start_time($tm_frmt),
				'date' => str_replace( ' ', '&nbsp;', $time->start_date('D M jS') )	
		);
	}
	//echo printr($time_options);
	return $time_options;
}






/**
 * 		process event date times
 *
 * 		@param array  	$times
 * 		@return array
 * 		@return string
 */
function espresso_process_event_datetimes($datetimes) {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	// start with an empty array
	$datetime_options = array();
	$tm_frmt = 'g:ia';
	foreach ($datetimes as $DTT_ID => $datetime) {		
		$datetime_options[ $DTT_ID ] = array(
				'id' => $DTT_ID,
				'event_id' => $datetime->event_ID(),
				'start_date' => str_replace( ' ', '&nbsp;', $datetime->start_date('D M jS') ),
				'start_time' => $datetime->start(),
				'formatted' => $datetime->end_time() ? $datetime->start_time($tm_frmt) . ' - ' . $datetime->end_time($tm_frmt) : $datetime->start_time($tm_frmt)
		);
	}
	//echo printr( $datetime_options,'$datetime_options'  );

	return $datetime_options;
}





/**
 * 		process event prices for display
 *
 * 		@param array  	$times
 * 		@param string  	$currency_symbol
 * 		@return array
 * 		@return string
 */
function espresso_process_event_prices($prices, $currency_symbol, $surcharge_type) {

	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	// start with an empty array
	$price_options = array();

	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price_Type.model.php');
	$PRT_MDL = EEM_Price_Type::instance();

	foreach ($prices as $price) {
		//printr( $price, '$price  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span>', 'auto' );		
		
		// if not a calendar controlled price OR if it IS a calendar controlled price and the today falls between the start and end dates
		if ( ! $price->use_dates() || ( $price->use_dates() && time() > $price->start_date( FALSE ) && time() < $price->end_date( FALSE ) )) {
			// are you a member of our club???
			if ( $price->is_member() && is_user_logged_in() ) {
				// format member ticket price
				$price_option = $price->name() . ': ';
				// format ticket price
				$price_option .= $price == '0.00' ? '<span class="price-is-free">free</span>' : $currency_symbol . number_format((float) $price->final_price(), 2, '.', '');
			} else {
				// add non-member price type
				$price_option = $price->name() . ': ';
				// format ticket price
				$price_option .= $price == '0.00' ? '<span class="price-is-free">free</span>' : $currency_symbol . number_format((float) $price->final_price(), 2, '.', '');
			}
			// add this price option to the array of options
			$price_options[$price->ID()] = array('raw' => number_format((float) $price->final_price(), 2, '.', ''), 'option' => $price_option);
		}
	}

//	echo printr($price_options);

	return $price_options;
}





	
	/**
	 * 		process_ticket_selections
	 * 		@access 		public
	 * 		@return		array  or FALSE
	 */	
	function espresso_process_ticket_selections( $registration_url = FALSE, $return = FALSE ) {

		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		//echo printr($_POST, '$_POST' );
		//$event_queue_request = ( isset( $_REQUEST['e_reg'] ) && $_REQUEST['e_reg'] == 'event_queue' ) ? TRUE : FALSE;
		// do we have an event id?
		if ( isset($_POST['tkt-slctr-event-id'] )) {
		
			// validate/sanitize data
			$valid = espresso_validate_post_data('add_event_to_cart');
//			echo printr($valid, '$valid' );
		
			//check total tickets oredered vs max number of attendees that can register
			if ($valid['total_tickets'] > $valid['atndz']) {
		
				// ordering too many tickets !!!
				$singular = 'You have attempted to purchase %s ticket.';
				$plural = 'You have attempted to purchase %s tickets.';
				$limit_error_1 = sprintf(_n($singular, $plural, $valid['total_tickets'], 'event_espresso'), $valid['total_tickets'], $valid['total_tickets']);
		
				$singular = 'The registration limit for this event is %s ticket per registration, therefore the total number of tickets you may purchase at a time can not exceed %s.';
				$plural = 'The registration limit for this event is %s tickets per registration, therefore the total number of tickets you may purchase at a time can not exceed %s.';
				$limit_error_2 = sprintf(_n($singular, $plural, $valid['atndz'], 'event_espresso'), $valid['atndz'], $valid['atndz']);
				$error_msg = $limit_error_1 . '<br/>' . $limit_error_2;
				EE_Error::add_error( $error_msg, __FILE__, __FUNCTION__, __LINE__ );
				
			} else {
				
				$tckts_slctd = FALSE;
				$success = FALSE;
				// all data appears to be valid
				// cycle thru the number of data rows sent from the event listsing
				for ($x = 0; $x < $valid['rows']; $x++) {
		
					// does this row actually contain a ticket quantity?
					if ($valid['qty'][$x] > 0) {		
						// YES we have a ticket quantity				
						$tckts_slctd = TRUE;
						// throw valid data into a new array
						$event_to_add = array(
								'id' => $valid['id'],
								'name' => $valid['name'],
								'price' => $valid['price'][$x],
								'price_id' => $valid['price_id'][$x],
								'qty' => $valid['qty'][$x],
								'options' => array(
										'date' => $valid['date'][$x],
										'time' => $valid['time'][$x],
										'dtt_id' => $valid['dtt_id'][$x],
										'price_desc' => $valid['price_desc'][$x],
										'pre_approval' => $valid['pre_approval']
								),
								'meta_keys' => array_key_exists($x,$valid['meta_keys'])?($valid['meta_keys'][$x]):array(),
								'meta_values' => array_key_exists($x,$valid['meta_values'])?($valid['meta_values'][$x]):array(),
						);
						//echo printr($event_to_add);die();
						// then add event
						if ( espresso_add_event_to_cart( $event_to_add )) {
							$success = TRUE;
						}
					} 
				}

				if ( $tckts_slctd ) {				
					if ( $success ) {
						if ( $return ) {
							return TRUE;
						} else {
							if ( ! $registration_url ) {
								$registration_url = add_query_arg( array( 'e_reg'=>'register', 'step' => 1 ), espresso_get_reg_page_full_url() );
							}
							wp_safe_redirect($registration_url);
							exit();
						}
					} else {
						// nothing added to cart
						$error_msg = __( 'An error occured. No tickets were added for the event.<br/>Please click the back button on your browser and try again.', 'event_espresso' );
						EE_Error::add_error( $error_msg, __FILE__, __FUNCTION__, __LINE__ );
					}

				} else {
					// no ticket quantities were selected
					$error_msg = __( 'You need to select a ticket quantity before you can proceed.<br/>Please click the back button on your browser and try again.', 'event_espresso' );
					EE_Error::add_error( $error_msg, __FILE__, __FUNCTION__, __LINE__ );
				}				
			}

			if ( isset( $_POST['tkt-slctr-return-url-'.$valid_data['id']] )) {
				$return_url = add_query_arg( EE_Error::get_notices( FALSE, TRUE ), $_POST['tkt-slctr-return-url-'.$valid_data['id']] );
				wp_safe_redirect( $return_url );
				exit();
			} elseif ( isset( $_SERVER['HTTP_REFERER'] )) {
				$return_url = add_query_arg( EE_Error::get_notices( FALSE, TRUE ), $_SERVER['HTTP_REFERER'] );
				wp_safe_redirect( $return_url );
				exit();
			} else {
				echo EE_Error::get_notices();			
			}
			
			
		} /*else {
			// $_POST['tkt-slctr-event-id'] was not set ?!?!?!?
			$error_msg = __( 'An error occured. An event id was not provided or was not received.<br/>Please click the back button on your browser and try again.', 'event_espresso' );
			EE_Error::add_error( $error_msg, __FILE__, __FUNCTION__, __LINE__ );
			
		}	

		if ( isset( $_SERVER['HTTP_REFERER'] )) {
			$return_url = add_query_arg(  EE_Error::get_notices( FALSE, TRUE ), $_SERVER['HTTP_REFERER'] );
			wp_safe_redirect( $return_url );
			exit();
		}	*/

	}






	/**
	 * 		validate_post_data
	 * 		@access 		public
	 *    	@param 		string 		$stage - where we are in the registration process
	 * 		@return		array  or FALSE
	 */
	function espresso_validate_post_data() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		
		// start with an empty array()
		$valid_data = array();

		//if event id is valid
		if ($id = absint($_POST['tkt-slctr-event-id'])) {

			$valid_data['id'] = $id;
			// grab and sanatize return-url
			$return_url = esc_url_raw($_POST['tkt-slctr-return-url-' . $id]);
			// array of other form names
			$inputs_to_clean = array(
					'name' => 'tkt-slctr-event-name-',
					'atndz' => 'tkt-slctr-max-atndz-',
					'rows' => 'tkt-slctr-rows-',
					'qty' => 'tkt-slctr-qty-',
					'price' => 'tkt-slctr-price-',
					'price_id' => 'tkt-slctr-price-id-',
					'date' => 'tkt-slctr-date-',
					'dtt_id' => 'tkt-slctr-dtt-id-',
					'time' => 'tkt-slctr-time-',
					'price_desc' => 'tkt-slctr-price-desc-',
					'meta_keys' => 'tkt-slctr-meta-keys-',
					'meta_values' => 'tkt-slctr-meta-values-',
					'pre_approval' => 'tkt-slctr-pre-approval-'
			);
			// let's track the total number of tickets ordered.'
			$valid_data['total_tickets'] = 0;
			// cycle through $inputs_to_clean array
			foreach ($inputs_to_clean as $what => $input_to_clean) {

//							echo '<h3>' . $what . '</h3>';
//							echo printr( $_POST[ $input_to_clean . $id ] );

				switch ($what) {

					// integers
					case 'atndz':
					case 'rows':
					case 'pre_approval':
						$valid_data[$what] = absint($_POST[$input_to_clean . $id]);
						break;

					// arrays of integers
					case 'price_id':
					case 'dtt_id':
					case 'time':
					case 'qty':
						// grab the array
						$ints = $_POST[$input_to_clean . $id];
						// cycle thru values
						foreach ($ints as $int) {
							switch ($what ) {
								case 'qty' :
									// sanitize as integers
									$valid_data[$what][] = absint($int);
									$qty = absint($int);
									$valid_data['total_tickets'] = $valid_data['total_tickets'] + $qty;
									break;
									
								case 'time' :
									$time = absint($int);
									$valid_data[$what][] = date( 'g:i a', $time);
									break;
									
								default :
								// sanitize as integers
								$valid_data[$what][] = absint($int);								
							}
						}
						break;

					// floats
					case 'price':
						// grab the array
						$floats = $_POST[$input_to_clean . $id];
						// cycle thru values
						foreach ($floats as $float) {
							// sanitize as float
							$valid_var = trim(preg_replace('/[^0-9.+$]/', '', $float));
							$valid_data[$what][] = $valid_var = number_format((float) $valid_var, 2, '.', '');
						}
						break;

					// string
/*					case 'time':
						// grab the array
						$times = $_POST[$input_to_clean . $id];
						// cycle thru values
						foreach ($times as $time) {
							// sanitize as date with digits and :
							$valid_var = trim(preg_replace('/[^0-9:+$]/', '', $time));
							$valid_data[$what][] = number_format((float) $valid_var, 2, '.', '');
						}
						break;*/

					// string
					case 'date':
						// grab the array
						$dates = $_POST[$input_to_clean . $id];
						// cycle thru values
						foreach ($dates as $date) {
							// allow only numbers, letters,  spaces, commas and dashes
							$valid_var = trim(preg_replace('/[^a-zA-Z0-9,-\s\s++$]/', '', $date));
							// can it convert to a date?
							if ($valid_var = date('Y-m-d', strtotime($date))) {
								$valid_data[$what][] = $date;
							}
						}
						break;

					// string
					case 'name':
						// allow only numbers, letters,  spaces, commas and dashes
						$valid_data[$what] = wp_strip_all_tags($_POST[$input_to_clean . $id]);
						break;

					// arrays of string
					case 'meta_keys':
					case 'meta_values':
						$value_array = array();
						// grab the array
						$values = $_POST[$input_to_clean . $id];
						// cycle thru values
						foreach ($values as $key=>$value) {
							// allow only numbers, letters,  spaces, commas and dashes
							$value_array[$key] = wp_strip_all_tags($value);
						}
						$valid_data[$what][] = $value_array;
						break;
					case 'price_desc':
						// grab the array
						$descs = maybe_unserialize($_POST[$input_to_clean . $id]);
						// cycle thru values
						foreach ($descs as $desc) {
							// allow safe html
							//$allowed = array( 'span' => array( 'class' => array() ));
							//$valid_data[ $what ][] = wp_kses( $desc, $allowed );
							$valid_data[ $what ][] = wp_kses_data( $desc );
							//$valid_data[$what][] = $desc;
						}
						break;
						
						case 'return-url' :
						break;
				}
			}
		} else {
			$error_msg = 'An error occured. The event id provided was not valid';
			EE_Error::add_error( $error_msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}

		//echo printr( $valid_data, '$valid_data' );die();
		return $valid_data;
	}





	/**
	 * 			adds an event to the cart
	 * 		  	@access private
	 * 		  	@param string - which_cart
	 * 		  	@param array - items
	 * 			@return TRUE on success, FALSE on fail
	 */
	function espresso_add_event_to_cart( $event = FALSE, $qty = 1, $which_cart = 'REG' ) {
	
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		
		global $EE_Cart; 
		// check that an event has been passed
		if (!$event or !is_array($event) or empty($event)) {
			$error_msg = 'An error occured. No event details were submitted. Could not add to cart';
			EE_Error::add_error( $error_msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		// make sure cart is loaded
		if (!defined('ESPRESSO_CART')) {
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Cart.class.php');
			$EE_Cart = EE_Cart::instance();
		}

		$event['options'] = isset($event['options']) ? $event['options'] : '';

		$add_to_cart_args = array(
				'id' => $event['id'],
				'name' => $event['name'],
				'price' => $event['price'],
				'price_id' => $event['price_id'],
				'qty' => $event['qty'],
				'options' => $event['options'],
				'meta_keys' => $event['meta_keys'],
				'meta_values' => $event['meta_values']
		);

		// get the number of spaces left for this event
		$available_spaces = espresso_get_available_spaces($event['id']);

		// compare availalbe spaces against the number of tickets being purchased
		if ($available_spaces >= $event['qty']) {
			// add event to cart
			if ($EE_Cart->add_to_cart($which_cart, $add_to_cart_args)) {

				// retreive event id list
				//$events_in_cart = $this->session->data('events_in_cart');
				//echo $EE_Cart->session->pre_r($EE_Cart); die();
				// add this event to list
				$EE_Cart->set_events_in_cart_list($event['id']);
				// send event id list back to session
				//$EE_Cart->session->set_session_data( $EE_Cart->get_events_in_cart_list(), 'events_in_cart' );
				// add event id to list of events in cart within individual cart
				$EE_Cart->add_to_cart_event_id_list($which_cart, $event['id']);

				return TRUE;
			} else {
				// error adding to cart
				return FALSE;
			}
		} else {

			// event is full
			if ($available_spaces > 0) {
				// add error messaging - we're using the _n function that will generate the appropriate singular or plural message based on the number of $available_spaces
				$error_msg = sprintf(_n(
												'We\'re sorry, but there is only %s available space left for this event. Please go back and select a different number of tickets.', 'We\'re sorry, but there are only %s available spaces left for this event. Please go back and select a different number of tickets.', $available_spaces, 'event_espresso'
								), $available_spaces
				);
				EE_Error::add_error( $error_msg, __FILE__, __FUNCTION__, __LINE__ );
			} else {
				$error_msg = __('We\'re sorry, but there are no available spaces left for this event', 'event_espresso');
				EE_Error::add_error( $error_msg, __FILE__, __FUNCTION__, __LINE__ );
			}
			return FALSE;
		}
	}




	
	/**
	 * 		get number of available spaces for event
	 *
	 * 		@param 		string 		$event_id
	 * 		@return 		int
	 */
	function espresso_get_available_spaces($event_id) {

		global $wpdb;

		$nmbr_attendees = 0;
		$available_spaces = 0;

		// first get the number of attendees already registered
		$SQL = "SELECT SUM(quantity) quantity FROM " . EVENTS_ATTENDEE_TABLE . " WHERE event_id=%d AND (payment_status='Completed' OR payment_status='Pending')";

		$wpdb->get_results($wpdb->prepare($SQL, $event_id));

		if ($wpdb->num_rows > 0 && $wpdb->last_result[0]->quantity != NULL) {
			$nmbr_attendees = $wpdb->last_result[0]->quantity;
		}
		// now get the reg limit for the event
		$SQL = "SELECT reg_limit FROM " . EVENTS_DETAIL_TABLE . " WHERE id=%d";

		$reg_limit = $wpdb->get_var($wpdb->prepare($SQL, $event_id));
		//return $reg_limit;  <<< check this

		// then determine how many spaces are left
		$available_spaces = $reg_limit - $nmbr_attendees;
		$available_spaces = max( $available_spaces, 0 );
		return $available_spaces;
	}





	/**
	 * 		load js
	 *
	 * 		@access 		public
	 * 		@return 		void
	 */
	function espresso_load_tckt_slctr_js() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		wp_register_script('ticket_selector', EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/ticket_selector.js', array('jquery'), '', TRUE);
		wp_enqueue_script('ticket_selector');
	}




/* End of file ticket_selector.php */
/* Location: includes/process-registration/ticket_selector.php */