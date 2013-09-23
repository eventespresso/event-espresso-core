<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package		Event Espresso
 * @ author			Seth Shoultes
 * @ copyright	(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link				http://www.eventespresso.com
 * @ version		4.0
 *
 * ------------------------------------------------------------------------
 *
 * Ticket Selector  class
 *
 * @package		Event Espresso
 * @subpackage	includes/classes/EE_Ticket_Selector.class.php
 * @author			Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EED_Ticket_Selector extends  EED_Module {

	/**
	* event that ticket selector is being generated for
	*
	* @access protected
	* @var array
	*/
	protected static $_event = NULL;



	/**
	* whether the registration is being added by an admin
	*
	* @access protected
	* @var boolean
	*/
	protected $_added_by_admin = NULL;





	/**
	 * 	set_hooks - for hooking into EE Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks() {
		// routing
		EE_Config::register_route( 'process_ticket_selections', 'EED_Ticket_Selector', 'process_ticket_selections' );
		add_action( 'wp_loaded', array( 'EED_Ticket_Selector', 'set_definitions' ), 2 );
//		add_action( 'AHEE_events_list_footer', array( 'EED_Ticket_Selector', 'display_ticket_selector' ), 10, 1 );
		add_action( 'AHEE_event_details_before_post', array( 'EED_Ticket_Selector', 'ticket_selector_form_open' ), 10, 1 );
		add_action( 'AHEE_event_details_header_bottom', array( 'EED_Ticket_Selector', 'display_ticket_selector' ), 10, 1 );
		add_action( 'AHEE_event_details_header_bottom', array( 'EED_Ticket_Selector', 'display_ticket_selector_submit' ), 11, 1 );
		add_action( 'AHEE_event_details_after_post', array( 'EED_Ticket_Selector', 'ticket_selector_form_close' ), 10 );
		add_action( 'wp_enqueue_scripts', array( 'EED_Ticket_Selector', 'load_tckt_slctr_assets' ), 10 );		
	}



	/**
	 * 	set_hooks_admin - for hooking into EE Admin Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks_admin() {
	}



	/**
	 * 	set_definitions
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_definitions() {
		define( 'TICKET_SELECTOR_ASSETS_URL', plugin_dir_url( __FILE__ ) . 'assets' . DS );
		define( 'TICKET_SELECTOR_TEMPLATES_PATH', str_replace( '\\', DS, plugin_dir_path( __FILE__ )) . 'templates' . DS );
	}


	/**
	* 	gets the ball rolling
	*
	*	@access 	public
	* 	@param	object 			$WP  
	* 	@return 	void	
	*/
	public function run( $event ) {
		
	}





	/**
	* 	creates buttons for selecting number of attendees for an event
	*
	*	@access public
	* 	@param	object 			$event  
	* 	@param	boolean 		$added_by_admin  whether the registration is being added by an admin
	* 	@return 	string	
	*/
	public static function display_ticket_selector( $event = FALSE, $added_by_admin = FALSE ) {
		do_action('AHEE_log', __FILE__, __FUNCTION__, '');		

		if ( ! $event ) {
			$user_msg = __( 'No Event was not supplied.', 'event_espresso' );
			$dev_msg = $user_msg . __( 'In order to generate a ticket selector, please ensure you are passing an event object to the EE_Ticket_Selector class constructor.', 'event_espresso' );
			EE_Error::add_error( $user_msg . '||' . $dev_msg, __FILE__, __FUNCTION__, __LINE__ );	
			return FALSE;
		}

//		EE_Registry::instance()->load_class( 'Cost_Calculator' );

		self::$_event = $event;

		$template_args = array();
		
		if ( self::$_event->EVT_allow_multiple ) {
			// make sure additional_limit is set
			if ( ! isset( self::$_event->EVT_additional_limit ) or self::$_event->EVT_additional_limit == '' ) {
				self::$_event->EVT_additional_limit = self::$_event->reg_limit;
			}
			// then make it at least 1
			self::$_event->EVT_additional_limit = ( self::$_event->EVT_additional_limit == 0 ) ? 1 : self::$_event->EVT_additional_limit;
			// let's make the max amount of attendees somebody can select a little more reasonable
			$template_args['max_atndz'] = self::$_event->EVT_additional_limit > 16 ? 16 : self::$_event->EVT_additional_limit;	
		} else {
			$template_args['max_atndz'] = 1;
		}
		
		$template_args['event_id'] = self::$_event->ID;
		$template_args['event_name'] = self::$_event->post_title;
		$template_args['require_pre_approval'] = self::$_event->EVT_require_pre_approval;
		$template_args['datetimes'] = self::$_event->datetimes;
		$template_args['datetimes'] = apply_filters( 'FHEE__EE_Ticket_Selector__display_ticket_selector__datetimes', self::$_event->datetimes, self::$_event );
		
		$templates['ticket_selector'] =  TICKET_SELECTOR_TEMPLATES_PATH . 'ticket_selector_chart.template.php';
//		$templates['ticket_selector'] =  TICKET_SELECTOR_TEMPLATES_PATH . 'ticket_selector_multi_selects.template.php';
//		$templates['ticket_selector'] =  TICKET_SELECTOR_TEMPLATES_PATH . 'ticket_selector_threaded_chart.template.php';
		$templates['ticket_selector'] =  apply_filters( 'FHEE__EE_Ticket_Selector__display_ticket_selector__template_path', $templates['ticket_selector'], self::$_event );

		EEH_Template::display_template($templates['ticket_selector'], $template_args);

	}




	
	/**
	* 	ticket_selector_form_open
	* 
	*	@access public
	* 	@access 		public
	* 	@return		string
	*/	
	public static function ticket_selector_form_open( $post ) {
		$checkout_url = add_query_arg( array( 'ee' => 'process_ticket_selections' ), get_permalink( $post->ID ));
		if ( ! $checkout_url ) {
			$msg = __('The URL for the event registration checkout page could not be retreived.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
		}
		echo '
		<form id="" method="POST" action="' . $checkout_url . '">';
	}




	
	/**
	* 	display_ticket_selector_submit
	* 
	*	@access public
	* 	@access 		public
	* 	@return		string
	*/	
	public static function display_ticket_selector_submit() {
		echo '
		<input id="" class="ee-register-button-lnk" type="submit" value="' . __('Register Now', 'event_espresso' ) . '" />
		';

	}



	
	/**
	* 	ticket_selector_form_close
	* 
	*	@access public
	* 	@access 		public
	* 	@return		string
	*/	
	public static function ticket_selector_form_close() {
		echo '
		</form>';
	}





	
	/**
	* 	process_ticket_selections
	* 
	*	@access public
	* 	@access 		public
	* 	@return		array  or FALSE
	*/	
	public function process_ticket_selections() {
		
		$return = FALSE;
		//we should really only have 1 registration in the works now (ie, no MER)
		//so clear any previosu items in the cart. When MER happens this will probably need to be tweaked, 
		//possibly wrappe din a conditional checking for some constant defined in MER etc.
		EE_Registry::instance()->load_core( 'Session' );
		EE_Registry::instance()->SSN->clear_session();
		
		do_action('AHEE_log', __FILE__, __FUNCTION__, '');
		// do we have an event id?
		if ( isset($_POST['tkt-slctr-event-id'] )) {
		
			// validate/sanitize data
			$valid = self::_validate_post_data('add_event_to_cart');
			//printr( $valid, '$valid  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		
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
				for ( $x = 0; $x < $valid['rows']; $x++ ) {
		
					// does this row actually contain a ticket quantity?
					if ( isset( $valid['qty'][$x] ) && $valid['qty'][$x] > 0 ) {		
						// YES we have a ticket quantity				
						$tckts_slctd = TRUE;
						// throw valid data into a new array
						$event_to_add = array(
								'id' => $valid['id'],
								'name' => $valid['name'],
								'ticket' => $valid['ticket'][$x],
								'ticket_id' => $valid['ticket_id'][$x],
								'ticket_obj' => $valid['ticket_obj'][$x],
								'qty' => $valid['qty'][$x],
//								'meta_keys' => $valid['meta_keys'],
//								'meta_values' => $valid['meta_values'],
								
								'options' => array(
										'date' => $valid['date'][$x],
										'time' => $valid['time'][$x],
										'dtt_id' => $valid['dtt_id'][$x],
										'ticket_desc' => $valid['ticket_desc'][$x],
//										'event_meta' => $valid['event_meta'],
										'pre_approval' => $valid['pre_approval']
								)
						);
						//printr( $event_to_add, '$event_to_add  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
						// then add event
						if ( self::_add_event_to_cart( $event_to_add )) {
							$success = TRUE;
						}
					} 
				}
				
//$cart = EE_Cart::instance()->whats_in_the_cart();
//printr( $cart, '$cart  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//die();
				if ( $tckts_slctd ) {				
					if ( $success ) {
						if ( $return ) {
							return TRUE;
						} else {
							$registration_url = add_query_arg( array( 'ee'=>'register', 'step' => 1 ), get_permalink( $this->EE->CFG->core->reg_page_id ));
							wp_safe_redirect($registration_url);
							exit();
						}
					} else {
						// nothing added to cart
						$error_msg = __( 'No tickets were added for the event.<br/>Please click the back button on your browser and try again.', 'event_espresso' );
						EE_Error::add_error( $error_msg, __FILE__, __FUNCTION__, __LINE__ );
					}

				} else {
					// no ticket quantities were selected
					$error_msg = __( 'You need to select a ticket quantity before you can proceed.<br/>Please click the back button on your browser and try again.', 'event_espresso' );
					EE_Error::add_error( $error_msg, __FILE__, __FUNCTION__, __LINE__ );
				}				
			}
//die();
			if ( isset( $_POST['tkt-slctr-return-url-'.$valid['id']] )) {
				EE_Error::get_notices( FALSE, TRUE );
				$return_url = $_POST['tkt-slctr-return-url-'.$valid['id']];
				wp_safe_redirect( $return_url );
				exit();
			} elseif ( isset( $event_to_add['id'] )) {
				EE_Error::get_notices( FALSE, TRUE );
				$return_url = get_permalink( $event_to_add['id'] );
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
	* 	validate_post_data
	* 
	* 	@access 		private
	*  	@param 		string 		$stage - where we are in the registration process
	* 	@return		array  or FALSE
	*/
	private static function _validate_post_data() {
		do_action('AHEE_log', __FILE__, __FUNCTION__, '');
		
		// start with an empty array()
		$valid_data = array();

		//if event id is valid
		if ( $id = absint( $_POST['tkt-slctr-event-id'] )) {

			$valid_data['id'] = $id;
			// grab and sanatize return-url
			$return_url = esc_url_raw($_POST['tkt-slctr-return-url-' . $id]);
			// array of other form names
			$inputs_to_clean = array(
					'name' => 'tkt-slctr-event-name-',
					'atndz' => 'tkt-slctr-max-atndz-',
					'rows' => 'tkt-slctr-rows-',
					'qty' => 'tkt-slctr-qty-',
					'ticket' => 'tkt-slctr-ticket-',
					'ticket_id' => 'tkt-slctr-ticket-id-',
					'date' => 'tkt-slctr-date-',
					'dtt_id' => 'tkt-slctr-dtt-id-',
					'time' => 'tkt-slctr-time-',
					'ticket_desc' => 'tkt-slctr-ticket-desc-',
					'ticket_obj' => 'tkt-slctr-ticket-obj-',
//					'event_meta' => 'tkt-slctr-event-meta-',
//					'meta_keys' => 'tkt-slctr-meta-keys-',
//					'meta_values' => 'tkt-slctr-meta-values-',
					'pre_approval' => 'tkt-slctr-pre-approval-'
			);
			// let's track the total number of tickets ordered.'
			$valid_data['total_tickets'] = 0;
			// cycle through $inputs_to_clean array
			foreach ($inputs_to_clean as $what => $input_to_clean) {

//				echo '<h4>what : ' . $what . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//				printr( $_POST[ $input_to_clean . $id ], '$input_to_clean  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

				switch ($what) {

					// integers
					case 'atndz':
					case 'rows':
					case 'pre_approval':
						$valid_data[$what] = absint($_POST[$input_to_clean . $id]);
						break;

					// arrays of integers
					case 'qty':
						// grab the array
						$row_qty =$_POST[$input_to_clean . $id];						
//						$ints = is_array( $_POST[$input_to_clean . $id] ) ? $_POST[$input_to_clean . $id] : array( $_POST[$input_to_clean . $id] );						
						// if qty is coming from a radio button input, then we need to assemble an array of rows
						if( ! is_array( $_POST[$input_to_clean . $id] )) {
							// get number of rows
							$rows = isset( $_POST['tkt-slctr-rows-' . $id] ) ? absint( $_POST['tkt-slctr-rows-' . $id] ) : 1;
							//echo '<h4>$rows : ' . $rows . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
							// explode ints by the dash
							$row_qty = explode( '-', $row_qty );
							$row = isset( $row_qty[0] ) ? ( absint( $row_qty[0] )+1 ) : 1;
							$qty = isset( $row_qty[1] ) ? absint( $row_qty[1] ) : 0;
							$row_qty = array( $row => $qty );
							//printr( $row_qty, '$row_qty  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
							for( $x = 1; $x <= $rows; $x++ ) {
								if ( ! isset( $row_qty[$x] )) {
									$row_qty[$x] = 0;
								}
							}
						}
						ksort( $row_qty );
						//printr( $row_qty, '$row_qty  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
						// cycle thru values
						foreach ($row_qty as $qty) {
							// sanitize as integers
							$valid_data[$what][] = absint($qty);
							$valid_data['total_tickets'] = $valid_data['total_tickets'] + absint($qty);
						}
						break;
						
					case 'dtt_id':
					case 'time':
						// grab the array
						$ints =$_POST[$input_to_clean . $id];						
						// cycle thru values
						foreach ($ints as $int) {
							switch ($what ) {
																	
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
					case 'ticket':
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
						$valid_data[$what] = sanitize_text_field( $_POST[$input_to_clean . $id] );
						break;
					case 'event_meta':
						$valid_data[$what] = $_POST[$input_to_clean . $id];
						break;

					// arrays of string
					case 'ticket_id':
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
						$valid_data[$what] = $value_array;
						break;
						
					case 'ticket_desc':
						// grab the array
						$descs = maybe_unserialize($_POST[$input_to_clean . $id]);
						// cycle thru values
						foreach ($descs as $desc) {
							// allow safe html
							$valid_data[ $what ][] = wp_kses_data( $desc );
						}
						break;
						
					case 'ticket_obj':
						// grab the array
						$values = $_POST[$input_to_clean . $id];
						// cycle thru values
						foreach ($values as $key=>$value) {
							// allow only numbers, letters,  spaces, commas and dashes
							$valid_data[$what][] = $value;
						}
						break;
						
					case 'return-url' :
						break;
						
				} 	// end switch $what
			} 	// end foreach $inputs_to_clean 
			
		} else {
			$error_msg = 'An error occured. The event id provided was not valid';
			EE_Error::add_error( $error_msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}

		//printr( $valid_data, '$valid_data  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' ); die();
		return $valid_data;
	}





	/**
	* 	adds an event to the cart
	* 	@access private
	* 	@param string - which_cart
	* 	@param array - items
	* 	@return TRUE on success, FALSE on fail
	*/
	private static function _add_event_to_cart( $event = FALSE, $qty = 1, $which_cart = 'REG' ) {
	
		do_action('AHEE_log', __FILE__, __FUNCTION__, '');
		
		EE_Registry::instance()->load_core( 'Cart' );
		// check that an event has been passed
		if (!$event or !is_array($event) or empty($event)) {
			$error_msg = 'An error occured. No event details were submitted. Could not add to cart';
//			echo "couldnt add to cart";
			EE_Error::add_error( $error_msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}

		$event['options'] = isset($event['options']) ? $event['options'] : '';

		$add_to_cart_args = array(
				'id' => $event['id'],
				'name' => $event['name'],
				'ticket' => $event['ticket'],
				'ticket_id' => $event['ticket_id'],
				'ticket_obj' => $event['ticket_obj'],
				'qty' => $event['qty'],
				'options' => $event['options'],
//				'meta_keys' => $event['meta_keys'],
//				'meta_values' => $event['meta_values']
//				'event_meta' => $event['event_meta'] 
		);

		// get the number of spaces left for this event
		$available_spaces = self::get_available_spaces( $event );
		// compare availalbe spaces against the number of tickets being purchased
//		echo "mikeecho:available spaces $available_spaces<br>";
		if ($available_spaces >= $event['qty']) {
//			echo "mikeecho:adding to cart because tehres space<br>";
			// add event to cart
			if ( EE_Registry::instance()->CART->add_to_cart($which_cart, $add_to_cart_args)) {
//				echo "mikeecho:success in adding!<br>";
				// retreive event id list
				//$events_in_cart = self::session->data('events_in_cart');
				//echo EE_Registry::instance()->CART->session->pre_r(EE_Registry::instance()->CART); die();
				// add this event to list
				EE_Registry::instance()->CART->set_events_in_cart_list($event['id']);
				// send event id list back to session
				//EE_Registry::instance()->CART->session->set_session_data( EE_Registry::instance()->CART->get_events_in_cart_list(), 'events_in_cart' );
				// add event id to list of events in cart within individual cart
				EE_Registry::instance()->CART->add_to_cart_event_id_list($which_cart, $event['id']);

				return TRUE;
			} else {
//				echo "mikeecho:failure in adding<br>";
				// error adding to cart
				return FALSE;
			}
		} else {
//			echo "mikeecho:event is full<br>";
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
	* 	get number of available spaces for event
	*
	*	@access 		public
	*	@param 		string 		$event_id
	* 	@return 		int
	*/
	public static function get_available_spaces( $event ) {
		// first get the number of attendees already registered
		$nmbr_attendees = EE_Registry::instance()->LIB->EEM_Registration->get_event_registration_count( $event['id']  );
		EE_Registry::instance()->load_model( 'Datetime' );
		// now get the reg limit for the event
		$reg_limit = EE_Registry::instance()->LIB->EEM_Datetime->get_one_by_ID( $event['options']['dtt_id'] )->get( 'DTT_reg_limit' );
		if ( $reg_limit == 0 ) {
			// infinite spaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaces
			return 1000;
		} 
		// determine how many spaces are left
		return max(( $reg_limit - $nmbr_attendees ), 0 );
	}





	/**
	* 	load js
	*
	*	@access 		public
	* 	@access 		public
	* 	@return 		void
	*/
	public static function load_tckt_slctr_assets() {
		// add some style
		wp_register_style('ticket_selector', TICKET_SELECTOR_ASSETS_URL . 'ticket_selector.css');
		wp_enqueue_style('ticket_selector');
		// make it dance
//		wp_register_script('ticket_selector', TICKET_SELECTOR_ASSETS_URL . 'ticket_selector.js', array('jquery'), '', TRUE);
//		wp_enqueue_script('ticket_selector');
		// loco grande 
		wp_localize_script( 'ticket_selector', 'eei18n', EE_Registry::$i18n_js_strings );
	}





}



// End of file EE_Ticket_Selector.class.php
// Location: /includes/classes/EE_Ticket_Selector.class.php