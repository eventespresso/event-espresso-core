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
 */
/**
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
	 * @var \EE_Event
	 */
	protected static $_event = NULL;

	/**
	* array of datetimes and the spaces available for them
	*
	* @access private
	* @var array
	*/
	private static $_available_spaces = array();



	/**
	 * @return EED_Ticket_Selector
	 */
	public static function instance() {
		return parent::get_instance( __CLASS__ );
	}





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
		add_action( 'AHEE_event_details_before_post', array( 'EED_Ticket_Selector', 'ticket_selector_form_open' ), 10, 1 );
		add_action( 'AHEE_event_details_header_bottom', array( 'EED_Ticket_Selector', 'display_ticket_selector' ), 10, 1 );
		add_action( 'AHEE__ticket_selector_chart__template__after_ticket_selector', array( 'EED_Ticket_Selector', 'display_ticket_selector_submit' ), 10, 1 );
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
		add_action( 'wp_loaded', array( 'EED_Ticket_Selector', 'set_definitions' ), 2 );
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
	public function run( $WP ) {}



	/**
	 *    creates buttons for selecting number of attendees for an event
	 *
	 * @access 	public
	 * @param 	object $event
	 * @param 	bool 	$view_details
	 * @return 	string
	 */
	public static function display_ticket_selector( $event = NULL, $view_details = FALSE ) {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );

		//		d( $event );
		if ( $event instanceof EE_Event ) {
			self::$_event = $event;
		} else if ( $event instanceof WP_Post && isset( $event->EE_Event ) && $event->EE_Event instanceof EE_Event ) {
			self::$_event = $event->EE_Event;
		} else if ( $event instanceof WP_Post && ( ! isset( $event->EE_Event ) || ! $event->EE_Event instanceof EE_Event )) {
			$event->EE_Event = EEM_Event::instance()->instantiate_class_from_post_object( $event );
			self::$_event = $event->EE_Event;
		} else {
			$user_msg = __( 'No Event object or an invalid Event object was supplied.', 'event_espresso' );
			$dev_msg = $user_msg . __( 'In order to generate a ticket selector, please ensure you are passing either an EE_Event object or a WP_Post object of the post type "espresso_event" to the EE_Ticket_Selector class constructor.', 'event_espresso' );
			EE_Error::add_error( $user_msg . '||' . $dev_msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}

		if (( ! self::$_event->display_ticket_selector() || $view_details ) && ! is_admin() ) {
			return ! is_single() ? EED_Ticket_Selector::display_view_details_btn( self::$_event ) : '';
		}

		$template_args = array();
		$template_args['date_format'] = apply_filters( 'FHEE__EED_Ticket_Selector__display_ticket_selector__date_format', 'l F jS, Y' );
		$template_args['time_format'] = apply_filters( 'FHEE__EED_Ticket_Selector__display_ticket_selector__time_format', 'g:i a' );

		$template_args['EVT_ID'] = self::$_event->ID();
		$template_args['event'] = self::$_event;

		// is the event expired ?
		$template_args['event_is_expired'] = self::$_event->is_expired();
		if ( $template_args['event_is_expired'] ) {
			return '<p><span class="important-notice">' . __( 'We\'re sorry, but all tickets sales have ended because the event is expired.', 'event_espresso' ) . '</span></p>';
		}

		// filter the maximum qty that can appear in the Ticket Selector qty dropdowns
		$template_args['max_atndz'] = apply_filters('FHEE__EE_Ticket_Selector__display_ticket_selector__max_tickets', self::$_event->additional_limit() );
		if ( $template_args['max_atndz'] < 1 ) {
			$sales_closed_msg = __( 'We\'re sorry, but ticket sales have been closed at this time. Please check back again later.', 'event_espresso' );
			if ( current_user_can( 'edit_post', self::$_event->ID() )) {
				$sales_closed_msg .=  sprintf(
					__( '%sNote to Event Admin:%sThe "Maximum number of tickets allowed per order for this event" in the Event Registration Options has been set to "0". This effectively turns off ticket sales. %s(click to edit this event)%s', 'event_espresso' ),
					'<div class="ee-attention" style="text-align: left;"><b>',
					'</b><br />',
					$link = '<span class="edit-link"><a class="post-edit-link" href="' . get_edit_post_link( self::$_event->ID() ) . '">',
					'</a></span></div>'
				);
			}
			return '<p><span class="important-notice">' . $sales_closed_msg . '</span></p>';
		}

		// get all tickets for this event ordered by the datetime
		$template_args['tickets'] = EEM_Ticket::instance()->get_all( array(
			array( 'Datetime.EVT_ID' => self::$_event->ID() ),
			'order_by' => array( 'TKT_required' => 'DESC', 'TKT_order' => 'ASC', 'TKT_start_date' => 'ASC', 'TKT_end_date' => 'ASC' , 'Datetime.DTT_EVT_start' => 'DESC' )
		));

		$templates['ticket_selector'] = TICKET_SELECTOR_TEMPLATES_PATH . 'ticket_selector_chart.template.php';
		$templates['ticket_selector'] = apply_filters( 'FHEE__EE_Ticket_Selector__display_ticket_selector__template_path', $templates['ticket_selector'], self::$_event );

		// redirecting to another site for registration ??
		$external_url = self::$_event->external_url() !== NULL || self::$_event->external_url() !== '' ? self::$_event->external_url() : FALSE;
		// set up the form (but not for the admin)
		$ticket_selector = ! is_admin() ? EED_Ticket_Selector::ticket_selector_form_open( self::$_event->ID(), $external_url ) : '';
		// if not redirecting to another site for registration
		if ( ! $external_url ) {
			// then display the ticket selector
			$ticket_selector .= EEH_Template::locate_template( $templates['ticket_selector'], $template_args );
		} else {
			// if not we still need to trigger the display of the submit button
			add_filter( 'FHEE__EE_Ticket_Selector__display_ticket_selector_submit', '__return_true' );
			//display notice to admin that registration is external
			$ticket_selector .= ! is_admin() ? '' : __( 'Registration is at an external URL for this event.', 'event_espresso' );
		}

		// submit button and form close tag
		$ticket_selector .= ! is_admin() ? EED_Ticket_Selector::display_ticket_selector_submit( self::$_event->ID() ) : '';
		$ticket_selector .= ! is_admin() ? EED_Ticket_Selector::ticket_selector_form_close() : '';

		return $ticket_selector;
	}



	/**
	 *    ticket_selector_form_open
	 *
	 * @access 		public
	 * @param 		int 	$ID
	 * @param 		string $external_url
	 * @return 		string
	 */
	public static function ticket_selector_form_open( $ID = 0, $external_url = '' ) {
		// if redirecting, we don't need any anything else
		if ( $external_url ) {
			EE_Registry::instance()->load_helper( 'URL' );
			$html = '<form id="" method="GET" action="' . EEH_URL::refactor_url( $external_url ) . '">';
			$query_args = EEH_URL::get_query_string( $external_url );
			foreach ( $query_args as $query_arg => $value ) {
				$html .= '<input type="hidden" name="' . $query_arg . '" value="' . $value . '">';
			}
			return $html;
		}
		EE_Registry::instance()->load_helper( 'Event_View' );
		$checkout_url = EEH_Event_View::event_link_url( $ID );
		if ( ! $checkout_url ) {
			$msg = __('The URL for the Event Details page could not be retrieved.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
		}
		$checkout_url = add_query_arg( array( 'ee' => 'process_ticket_selections' ), $checkout_url );
		return '<form id="" method="POST" action="' . $checkout_url . '">' . wp_nonce_field( 'process_ticket_selections', 'process_ticket_selections_nonce', TRUE, FALSE );
	}





	/**
	 * 	display_ticket_selector_submit
	 *
	 *	@access public
	 * 	@access 		public
	 * 	@return		string
	 */
	public static function display_ticket_selector_submit() {
		if ( apply_filters( 'FHEE__EE_Ticket_Selector__display_ticket_selector_submit', FALSE ) && ! is_admin() ) {
			$btn_text = apply_filters( 'FHEE__EE_Ticket_Selector__display_ticket_selector_submit__btn_text', __('Register Now', 'event_espresso' ));
			return '<input id="ticket-selector-submit-'. self::$_event->ID() .'-btn" class="ticket-selector-submit-btn" type="submit" value="' . $btn_text . '" /><div class="clear"><br/></div>';
		}
		return '';
	}




	/**
	 * 	ticket_selector_form_close
	 *
	 *	@access public
	 * 	@access 		public
	 * 	@return		string
	 */
	public static function ticket_selector_form_close() {
		return '</form>';
	}





	/**
	 * 	display_ticket_selector_submit
	 *
	 *	@access public
	 * 	@access 		public
	 * 	@return		string
	 */
	public static function display_view_details_btn() {
		if ( ! self::$_event->get_permalink() ) {
			$msg = __('The URL for the Event Details page could not be retrieved.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
		}
		$view_details_btn = '<form id="" method="POST" action="' . self::$_event->get_permalink() . '">';
		$btn_text = apply_filters( 'FHEE__EE_Ticket_Selector__display_view_details_btn__btn_text', __('View Details', 'event_espresso' ));
		$view_details_btn .= '<input id="ticket-selector-submit-'. self::$_event->ID() .'-btn" class="ticket-selector-submit-btn" type="submit" value="' . $btn_text . '" /><div class="clear"><br/></div>';
		$view_details_btn .= '</form>';
		return $view_details_btn;
	}






	/**
	 * 	process_ticket_selections
	 *
	 *	@access public
	 * 	@access 		public
	 * 	@return		array  or FALSE
	 */
	public function process_ticket_selections() {
		do_action( 'EED_Ticket_Selector__process_ticket_selections__before' );
		// check nonce
		if ( ! is_admin() && ( ! EE_Registry::instance()->REQ->is_set( 'process_ticket_selections_nonce' ) || ! wp_verify_nonce( EE_Registry::instance()->REQ->get( 'process_ticket_selections_nonce' ), 'process_ticket_selections' ))) {
			$error_msg = sprintf( __( 'We\'re sorry but your request failed to pass a security check.%sPlease click the back button on your browser and try again.', 'event_espresso' ), '<br/>' );
			EE_Error::add_error( $error_msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
//		d( EE_Registry::instance()->REQ );
		self::$_available_spaces = array(
			'tickets' => array(),
			'datetimes' => array()
		);


		//we should really only have 1 registration in the works now (ie, no MER) so clear any previous items in the cart.
		// When MER happens this will probably need to be tweaked, possibly wrapped in a conditional checking for some constant defined in MER etc.
		EE_Registry::instance()->load_core( 'Session' );
		// unless otherwise requested, clear the session
		if ( apply_filters( 'FHEE__EE_Ticket_Selector__process_ticket_selections__clear_session', TRUE ) ) {
			EE_Registry::instance()->SSN->clear_session( __CLASS__, __FUNCTION__ );
		}
		//d( EE_Registry::instance()->SSN );

		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		// do we have an event id?
		if ( EE_Registry::instance()->REQ->is_set( 'tkt-slctr-event-id' )) {

			// validate/sanitize data
			$valid = self::_validate_post_data('add_event_to_cart');
			// d( $valid );

			//check total tickets ordered vs max number of attendees that can register
			if ( $valid['total_tickets'] > $valid['max_atndz'] ) {

				// ordering too many tickets !!!
				$singular = 'You have attempted to purchase %s ticket.';
				$plural = 'You have attempted to purchase %s tickets.';
				$limit_error_1 = sprintf( _n( $singular, $plural, $valid['total_tickets'], 'event_espresso' ), $valid['total_tickets'], $valid['total_tickets'] );

				$singular = 'The registration limit for this event is %s ticket per registration, therefore the total number of tickets you may purchase at a time can not exceed %s.';
				$plural = 'The registration limit for this event is %s tickets per registration, therefore the total number of tickets you may purchase at a time can not exceed %s.';
				$limit_error_2 = sprintf( _n( $singular, $plural, $valid['max_atndz'], 'event_espresso' ), $valid['max_atndz'], $valid['max_atndz'] );
				$error_msg = $limit_error_1 . '<br/>' . $limit_error_2;
				EE_Error::add_error( $error_msg, __FILE__, __FUNCTION__, __LINE__ );
			} else {

				// all data appears to be valid
				$tckts_slctd = FALSE;
				$success = TRUE;
				// load cart
				EE_Registry::instance()->load_core( 'Cart' );

				// cycle thru the number of data rows sent from the event listing
				for ( $x = 0; $x < $valid['rows']; $x++ ) {
					// does this row actually contain a ticket quantity?
					if ( isset( $valid['qty'][$x] ) && $valid['qty'][$x] > 0 ) {
						// YES we have a ticket quantity
						$tckts_slctd = TRUE;
						//						d( $valid['ticket_obj'][$x] );
						if ( $valid['ticket_obj'][$x] instanceof EE_Ticket ) {
							// then add ticket to cart
							$ticket_added = self::_add_ticket_to_cart( $valid['ticket_obj'][$x], $valid['qty'][$x] );
							$success = ! $ticket_added ? FALSE : $success;
						} else {
							// nothing added to cart retrieved
							$error_msg = sprintf( __( 'A valid ticket could not be retrieved for the event.%sPlease click the back button on your browser and try again.', 'event_espresso' ), '<br/>' );
							EE_Error::add_error( $error_msg, __FILE__, __FUNCTION__, __LINE__ );
						}
					}
				}
//				d( EE_Registry::instance()->CART );
//				die(); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< KILL REDIRECT HERE

				if ( $tckts_slctd ) {
					if ( $success ) {
						EE_Registry::instance()->CART->save_cart();
						EE_Registry::instance()->SSN->update();
						// just return TRUE for registrations being made from admin
						if ( is_admin() ) {
							return TRUE;
						}
						wp_safe_redirect( add_query_arg( array( 'ee'=>'_register' ), get_permalink( EE_Registry::instance()->CFG->core->reg_page_id )));
						exit();
					} else {
						// nothing added to cart
						$error_msg = __( 'No tickets were added for the event.', 'event_espresso' );
						EE_Error::add_attention( $error_msg, __FILE__, __FUNCTION__, __LINE__ );
					}

				} else {
					// no ticket quantities were selected
					$error_msg = __( 'You need to select a ticket quantity before you can proceed.', 'event_espresso' );
					EE_Error::add_error( $error_msg, __FILE__, __FUNCTION__, __LINE__ );
				}
			}
			// at this point, just return if registration is being made from admin
			if ( is_admin() ) {
				return FALSE;
			}
			if ( $valid['return_url'] ) {
				EE_Error::get_notices( FALSE, TRUE );
				wp_safe_redirect( $valid['return_url'] );
				exit();
			} elseif ( isset( $event_to_add['id'] )) {
				EE_Error::get_notices( FALSE, TRUE );
				wp_safe_redirect( get_permalink( $event_to_add['id'] ));
				exit();
			} else {
				echo EE_Error::get_notices();
			}

		} else {
			// $_POST['tkt-slctr-event-id'] was not set ?!?!?!?
			$error_msg = sprintf( __( 'An event id was not provided or was not received.%sPlease click the back button on your browser and try again.', 'event_espresso' ), '<br/>' );
			EE_Error::add_error( $error_msg, __FILE__, __FUNCTION__, __LINE__ );
		}

		return FALSE;

	}



	/**
	 *    validate_post_data
	 *
	 * @access        private
	 * @return        array  or FALSE
	 */
	private static function _validate_post_data() {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );

		// start with an empty array()
		$valid_data = array();
		//		d( $_POST );
		//if event id is valid
		$id = absint( EE_Registry::instance()->REQ->get( 'tkt-slctr-event-id' ));
		if ( $id ) {
			// grab valid id
			$valid_data['id'] = $id;
			// grab and sanitize return-url
			$valid_data['return_url'] = esc_url_raw( EE_Registry::instance()->REQ->get( 'tkt-slctr-return-url-' . $id ));
			// array of other form names
			$inputs_to_clean = array(
				'event' => 'tkt-slctr-event-',
				'max_atndz' => 'tkt-slctr-max-atndz-',
				'rows' => 'tkt-slctr-rows-',
				'qty' => 'tkt-slctr-qty-',
				'ticket_id' => 'tkt-slctr-ticket-id-',
				'ticket_obj' => 'tkt-slctr-ticket-obj-',
				'return_url' => 'tkt-slctr-return-url-',
			);
			// let's track the total number of tickets ordered.'
			$valid_data['total_tickets'] = 0;
			// cycle through $inputs_to_clean array
			foreach ( $inputs_to_clean as $what => $input_to_clean ) {
				// check for POST data
				if ( EE_Registry::instance()->REQ->is_set( $input_to_clean . $id )) {
					// grab value
					$input_value = EE_Registry::instance()->REQ->get( $input_to_clean . $id );
					switch ($what) {

						// integers
						case 'rows':
						case 'max_atndz':
							$valid_data[$what] = absint( $input_value );
							break;

						// arrays of integers
						case 'qty':
							//							d( $input_value );
							$row_qty = $input_value;
							// if qty is coming from a radio button input, then we need to assemble an array of rows
							if( ! is_array( $row_qty )) {
								// get number of rows
								$rows = EE_Registry::instance()->REQ->is_set( 'tkt-slctr-rows-' . $id ) ? absint( EE_Registry::instance()->REQ->get( 'tkt-slctr-rows-' . $id )) : 1;
								//								d( $rows );
								// explode ints by the dash
								$row_qty = explode( '-', $row_qty );
								$row = isset( $row_qty[0] ) ? ( absint( $row_qty[0] )) : 1;
								$qty = isset( $row_qty[1] ) ? absint( $row_qty[1] ) : 0;
								$row_qty = array( $row => $qty );
								//								 d( $row_qty );
								for( $x = 1; $x <= $rows; $x++ ) {
									if ( ! isset( $row_qty[$x] )) {
										$row_qty[$x] = 0;
									}
								}
							}
							ksort( $row_qty );
							//							 d( $row_qty );
							// cycle thru values
							foreach ( $row_qty as $qty ) {
								$qty = absint( $qty );
								// sanitize as integers
								$valid_data[$what][] = $qty;
								$valid_data['total_tickets'] += $qty;
							}
							break;

						// array of serialized and encoded objects
						case 'ticket_id':
							$value_array = array();
							// cycle thru values
							foreach ( $input_value as $key=>$value ) {
								// allow only numbers, letters,  spaces, commas and dashes
								$value_array[$key] = wp_strip_all_tags($value);
							}
							$valid_data[$what] = $value_array;
							break;

						case 'event':
							// grab the array
							// allow only numbers, letters,  spaces, commas and dashes
							$valid_data[$what] = unserialize( base64_decode( $input_value ));
							break;

						case 'ticket_obj':
							// ensure that $input_value is an array
							$input_value = is_array( $input_value ) ? $input_value : array( $input_value );
							// cycle thru values
							foreach ( $input_value as $row=>$value ) {
								// decode and unserialize the ticket object
								$ticket_obj = unserialize( base64_decode( $value ));
								// vat is dis? i ask for TICKET !!!
								if ( ! $ticket_obj instanceof EE_Ticket ) {
									// get ticket via the ticket id we put in the form
									$ticket_obj = EE_Registry::instance()->load_model( 'Ticket' )->get_one_by_ID( $valid_data['ticket_id'][$key] );
								}
								$valid_data[$what][] = $ticket_obj;
							}
							break;

						case 'return_url' :
							// grab and sanitize return-url
							$valid_data[$what] = esc_url_raw( $input_value );
							break;

					} 	// end switch $what
				}
			} 	// end foreach $inputs_to_clean

		} else {
			$error_msg = 'The event id provided was not valid';
			EE_Error::add_error( $error_msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}

		//		d( $valid_data );
		//		die();
		return $valid_data;
	}



	/**
	 *    adds a ticket to the cart
	 * @access   private
	 * @param EE_Ticket $ticket
	 * @param int       $qty
	 * @return TRUE on success, FALSE on fail
	 */
	private static function _add_ticket_to_cart( EE_Ticket $ticket = NULL, $qty = 1 ) {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		// get the number of spaces left for this datetime ticket
		$available_spaces = self::_ticket_datetime_availability( $ticket );
		// compare available spaces against the number of tickets being purchased
		if ( $available_spaces >= $qty ) {
			// add event to cart
			if( EE_Registry::instance()->CART->add_ticket_to_cart( $ticket, $qty )) {
				self::_recalculate_ticket_datetime_availability( $ticket, $qty );
				return TRUE;
			} else {
				return FALSE;
			}
		} else {
			// tickets can not be purchased but let's find the exact number left for the last ticket selected PRIOR to subtracting tickets
			$available_spaces = self::_ticket_datetime_availability( $ticket, TRUE );
			// greedy greedy greedy eh?
			if ( $available_spaces > 0 ) {
				// add error messaging - we're using the _n function that will generate the appropriate singular or plural message based on the number of $available_spaces
				$error_msg = sprintf(
					_n(
						'We\'re sorry, but there is only %s available space left for this event at this particular date and time.%sPlease select a different number (or different combination) of tickets.',
						 'We\'re sorry, but there are only %s available spaces left for this event at this particular date and time.%sPlease select a different number (or different combination) of tickets.',
						$available_spaces,
						'event_espresso'
					),
					$available_spaces,
					'<br />'
				);
				EE_Error::add_error( $error_msg, __FILE__, __FUNCTION__, __LINE__ );
			} else {
				$error_msg = __('We\'re sorry, but there are no available spaces left for this event at this particular date and time.', 'event_espresso');
				EE_Error::add_error( $error_msg, __FILE__, __FUNCTION__, __LINE__ );
			}
			return FALSE;
		}
	}



	/**
	 *        _ticket_datetime_availability
	 *        creates an array of tickets plus all of the datetimes available to each ticket
	 *        and tracks the spaces remaining for each of those datetimes
	 *
	 * @access 	private
	 * @param 	EE_Ticket $ticket - selected ticket
	 * @param 	bool         $get_original_ticket_spaces
	 * @return 	int
	 */
	private static function _ticket_datetime_availability( EE_Ticket $ticket, $get_original_ticket_spaces = FALSE ) {
		// if the $_available_spaces array has not been set up yet...
		if ( ! isset( self::$_available_spaces['tickets'][ $ticket->ID() ] )) {
				self::_set_initial_ticket_datetime_availability( $ticket );
		}
		$available_spaces = $ticket->qty() - $ticket->sold();
		if ( isset( self::$_available_spaces['tickets'][ $ticket->ID() ] )) {
			// loop thru tickets, which will ALSO include individual ticket records AND a total
			foreach ( self::$_available_spaces['tickets'][ $ticket->ID() ] as $DTD_ID => $spaces  ) {
				// if we want the original datetime availability BEFORE we started subtracting tickets ?
				if ( $get_original_ticket_spaces ) {
					// then grab the available spaces from the "tickets" array and compare with the above to get the lowest number
					$available_spaces = min( $available_spaces, self::$_available_spaces['tickets'][ $ticket->ID() ][ $DTD_ID ] );
				} else {
					// we want the updated ticket availability as stored in the "datetimes" array
					$available_spaces = min( $available_spaces, self::$_available_spaces['datetimes'][ $DTD_ID ] );
				}
			}
		}
		return $available_spaces;
	}



	/**
	 *    _set_initial_ticket_datetime_availability
	 *
	 * @access 	private
	 * @param 	EE_Ticket $ticket
	 * @return 	int
	 */
	private static function _set_initial_ticket_datetime_availability( EE_Ticket $ticket ) {
		// first, get all of the datetimes that are available to this ticket
		$datetimes = $ticket->get_many_related(
			'Datetime',
			array( array( 'DTT_EVT_end' => array( '>=', current_time( 'mysql' ))), 'order_by' => array( 'DTT_EVT_start' => 'ASC' ))
		);
		if ( ! empty( $datetimes )) {
			// now loop thru all of the datetimes
			foreach ( $datetimes as $datetime  ) {
				if ( $datetime instanceof EE_Datetime ) {
					// the number of spaces available for the datetime without considering individual ticket quantities
					$spaces_remaining = $datetime->spaces_remaining();
					// save the total available spaces ( the lesser of the ticket qty minus the number of tickets sold or the datetime spaces remaining) to this ticket using the datetime ID as the key
					self::$_available_spaces['tickets'][ $ticket->ID() ][ $datetime->ID() ] = min(( $ticket->qty() - $ticket->sold() ), $spaces_remaining );
					// if the remaining spaces for this datetime is already set, then compare that against the datetime spaces remaining, and take the lowest number,
					// else just take the datetime spaces remaining, and assign to the datetimes array
					self::$_available_spaces['datetimes'][ $datetime->ID() ] = isset( self::$_available_spaces['datetimes'][ $datetime->ID() ] ) ? min( self::$_available_spaces['datetimes'][ $datetime->ID() ], $spaces_remaining ) : $spaces_remaining;
				}
			}
		}
	}



	/**
	 *    _recalculate_ticket_datetime_availability
	 *
	 * @access 	private
	 * @param 	EE_Ticket $ticket
	 * @param 	int   $qty
	 * @return 	int
	 */
	private static function _recalculate_ticket_datetime_availability( EE_Ticket $ticket, $qty = 0 ) {
		if ( isset( self::$_available_spaces['tickets'][ $ticket->ID() ] )) {
			// loop thru tickets, which will ALSO include individual ticket records AND a total
			foreach ( self::$_available_spaces['tickets'][ $ticket->ID() ] as $DTD_ID => $spaces  ) {
				// subtract the qty of selected tickets from each datetime's available spaces this ticket has access to,
				self::$_available_spaces['datetimes'][ $DTD_ID ] = self::$_available_spaces['datetimes'][ $DTD_ID ] - $qty;
			}
		}
	}





	/**
	* 	load js
	*
	* 	@access 		public
	* 	@return 		void
	*/
	public static function load_tckt_slctr_assets() {
		// add some style
		if ( apply_filters( 'FHEE__EED_Ticket_Selector__load_tckt_slctr_assets', FALSE ) ) {
			wp_register_style('ticket_selector', TICKET_SELECTOR_ASSETS_URL . 'ticket_selector.css');
			wp_enqueue_style('ticket_selector');
			// make it dance
			//			wp_register_script('ticket_selector', TICKET_SELECTOR_ASSETS_URL . 'ticket_selector.js', array('jquery'), '', TRUE);
			//			wp_enqueue_script('ticket_selector');
			// loco grande
			wp_localize_script( 'ticket_selector', 'eei18n', EE_Registry::$i18n_js_strings );
		}
	}





}



// End of file EE_Ticket_Selector.class.php
// Location: /includes/classes/EE_Ticket_Selector.class.php
