<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * Single Page Checkout (SPCO)
 *
 * @package			Event Espresso
 * @subpackage	/modules/single_page_checkout/
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EED_Single_Page_Checkout  extends EED_Module {

	// ensures that SPCO only runs once
	private static $_run = FALSE;
	// base url for the site's registration checkout page - additional url params will be added to this
	private $_reg_page_base_url = '';
	// thank you page URL
	private $_thank_you_page_url = '';
	// where we are in the reg process
	private $_current_step = '';
	// where we are going next in the reg process
	private $_next_step = '';
	// erg_url_link for a previously saved registration
	private $_reg_url_link = '';
	// whether returning to edit attendee information or to retry a payment
	private $_revisit = FALSE;
	// whether the primary registrant is returning to edit attendee information or to retry a payment
	private $_primary_revisit = FALSE;
	// is registration allowed to progress or halted for some reason such as failing to pass recaptcha?
	private $_continue_reg = TRUE;
	// array of template paths
	private $_templates = array();
	// info for each of the reg steps
	private static $_reg_steps = array();




	/**
	 * 	$_cart - the current cart object
	 * 	@access private
	 *	@var EE_CART $_cart
	 */
	private $_cart = NULL;

	/**
	 * 	$_transaction - the current transaction object
	 * 	@access private
	 *	@var EE_Transaction $_transaction
	 */
	private $_transaction = NULL;



	/**
	 * @return EED_Single_Page_Checkout
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
		EED_Single_Page_Checkout::set_definitions();
		add_filter( 'FHEE_load_EE_messages', '__return_true');
		// configure the reg steps array
		EED_Single_Page_Checkout::setup_reg_steps_array();
		// set routing
		EE_Config::register_route( '_register', 'EED_Single_Page_Checkout', 'run' );
		foreach ( self::$_reg_steps as $reg_step => $reg_step_details ) {
			EE_Config::register_route( $reg_step, 'EED_Single_Page_Checkout', $reg_step_details['process_func'] );
		}
		//EE_Config::register_route( 'finalize_registration', 'EED_Single_Page_Checkout', 'finalize_registration' );
		// add powered by EE msg
		add_action( 'AHEE__SPCO__reg_form_footer', array( 'EED_Single_Page_Checkout', 'display_registration_footer' ));
	}



	/**
	 * 	set_hooks_admin - for hooking into EE Admin Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks_admin() {
		EED_Single_Page_Checkout::set_definitions();
		// configure the reg steps array
		EED_Single_Page_Checkout::setup_reg_steps_array();
		// set ajax hooks
		foreach ( self::$_reg_steps as $reg_step_details ) {
			add_action( 'wp_ajax_espresso_' . $reg_step_details['process_func'], array( 'EED_Single_Page_Checkout', $reg_step_details['process_func'] ));
			add_action( 'wp_ajax_nopriv_espresso_' . $reg_step_details['process_func'], array( 'EED_Single_Page_Checkout', $reg_step_details['process_func'] ));
		}
	}



	/**
	 * 	set_definitions
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_definitions() {
		define( 'SPCO_ASSETS_URL', plugin_dir_url( __FILE__ ) . 'assets' . DS );
		define( 'SPCO_TEMPLATES_PATH', str_replace( '\\', DS, plugin_dir_path( __FILE__ )) . 'templates' . DS );
	}



	/**
	 * 	setup_reg_steps_array
	 *
	 *  @access 	private
	 *  @return 	array
	 */
	private static function setup_reg_steps_array() {

		self::$_reg_steps = array(
			'attendee_information' => array(
				'name' =>  sprintf( __('Attendee%sInformation', 'event_espresso'), '&nbsp;' ),
				'display_func' => 'attendee_information',
				'process_func' => 'process_attendee_information',
				'template' => 'registration_page_attendee_information'
			),
			'registration_confirmation' => array(
				'name' => sprintf( __('Registration%sConfirmation', 'event_espresso'), '&nbsp;' ),
				'display_func' => 'registration_confirmation',
				'process_func' => 'process_registration_confirmation',
				'template' => 'registration_page_confirmation'
			),
			'payment_options' => array(
				'name' => sprintf( __('Payment%sOptions', 'event_espresso'), '&nbsp;' ),
				'display_func' => 'payment_options',
				'process_func' => 'process_payment_options',
				'template' => 'registration_page_payment_options'
			)
		);
		EE_Registry::instance()->CFG->registration->skip_reg_confirmation = TRUE;

		// skip the registration_confirmation page ?
		if ( isset( EE_Registry::instance()->CFG->registration->skip_reg_confirmation ) && EE_Registry::instance()->CFG->registration->skip_reg_confirmation ) {
			unset( self::$_reg_steps['registration_confirmation'] );
		} else if ( isset( EE_Registry::instance()->CFG->registration->reg_confirmation_last ) && EE_Registry::instance()->CFG->registration->reg_confirmation_last ) {
			// nah, don't skip it... just make it the last step'
			ksort( self::$_reg_steps );
		}

		// finally, filter the array for good luck
		self::$_reg_steps = apply_filters( 'FHEE__Single_Page_Checkout__setup_reg_steps_array__reg_steps', self::$_reg_steps );

	}



	/**
	 * 	get next step from setup_reg_steps_array
	 *
	 *  @access 	private
	 *  @return 	array
	 */
	private function _get_next_reg_step() {
		$next = next( self::$_reg_steps );
		prev( self::$_reg_steps );
		return $next;
	}



	/**
	 * 	set next step
	 *
	 *  @access 	private
	 *  @return 	void
	 */
	private function _set_next_step() {
		// set pointer to start of array
		reset( self::$_reg_steps );
		$current_step = str_replace( 'process_', '', $this->_current_step );
		// if there is more than one step
		if ( count( self::$_reg_steps ) > 1 && $this->_current_step != 'finalize_registration' ) {
			// advance to the current step and set pointer
			while ( key( self::$_reg_steps ) != $current_step && key( self::$_reg_steps ) != '' ) {
				next( self::$_reg_steps );
			}
		}
		// advance one more spot ( if it exists )
		$this->_next_step = next( self::$_reg_steps ) ? key( self::$_reg_steps ) : 'finalize_registration';
		// then back to current step to reset
		prev( self::$_reg_steps );
	}




	/**
	 * 	ajax_process_registration_steps
	 */
	public static function process_attendee_information() {
		$SPCO = EED_Single_Page_Checkout::instance();
		if ( $SPCO instanceof EED_Single_Page_Checkout ) {
			$SPCO->_current_step = 'attendee_information';
			$SPCO->init();
			$SPCO->_process_attendee_information();
		}
	}


	public static function process_payment_options() {
		$SPCO = EED_Single_Page_Checkout::instance();
		if ( $SPCO instanceof EED_Single_Page_Checkout ) {
			$SPCO->_current_step = 'payment_options';
			$SPCO->init();
			$SPCO->_process_payment_options();
		}
	}


	public static function process_registration_confirmation() {
//		$SPCO = EED_Single_Page_Checkout::instance();
//		if ( $SPCO instanceof EED_Single_Page_Checkout ) {
//			$SPCO->_current_step = 'registration_confirmation';
//			$SPCO->init();
//			$SPCO->_process_registration_confirmation();
//		}
	}



	/**
	 *    nocache_headers_nginx
	 *
	 * @access    public
	 * @param $headers
	 * @return    array
	 */
	public static function nocache_headers_nginx ( $headers ) {
		$headers['X-Accel-Expires'] = 0;
		return $headers;
	}



	/**
	 * 	nocache_headers
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function nocache_headers() {
		nocache_headers();
	}




	/**
	 * 	init - initial module setup
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function init() {
		 // add no cache headers
		 add_action( 'wp_head' , array( 'EED_Single_Page_Checkout', 'nocache_headers' ), 10 );
		 // plus a little extra for nginx
		 add_filter( 'nocache_headers' , array( 'EED_Single_Page_Checkout', 'nocache_headers_nginx' ), 10, 1 );
		 // prevent browsers from prefetching of the rel='next' link, because it may contain content that interferes with the registration process
		 remove_action('wp_head', 'adjacent_posts_rel_link_wp_head');
		// load classes
		if ( ! isset( EE_Registry::instance()->REQ )) {
			EE_Registry::instance()->load_core( 'Request_Handler' );
		}
		EE_Registry::instance()->REQ->set_espresso_page( TRUE );
//		printr( EE_Registry::instance()->REQ, 'EE_Registry::instance()->REQ  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		// make sure reg steps array is setup
		if ( empty( self::$_reg_steps )) {
			EED_Single_Page_Checkout::setup_reg_steps_array();
		}
		$this->_continue_reg = apply_filters( 'FHEE__EED_Single_Page_Checkout__init___continue_reg', TRUE );
		$this->set_templates();
		$this->_reg_page_base_url = get_permalink( EE_Registry::instance()->CFG->core->reg_page_id );
		// grab what step we're on
		$this->_current_step = ! empty( $this->_current_step )  ? $this->_current_step : 'attendee_information';
		$this->_current_step = EE_Registry::instance()->REQ->is_set( 'step' ) ? EE_Registry::instance()->REQ->get( 'step' ) : $this->_current_step;
		// returning from the thank you page ?
		$this->_reg_url_link = EE_Registry::instance()->REQ->is_set( 'e_reg_url_link' ) ? EE_Registry::instance()->REQ->get( 'e_reg_url_link' ) : FALSE;
		// if reg_url_link is present in the request, then we are only being sent back to SPCO to retry the payment
		if ( $this->_reg_url_link ) {
			// are we returning to the page to edit attendee info or retry a payment?
			$this->_revisit = EE_Registry::instance()->REQ->is_set( 'revisit' ) && EE_Registry::instance()->REQ->get( 'revisit' ) == 1 ? TRUE : FALSE;
			if ( $this->_revisit ) {
				// remove all other pages from the reg steps array except the one required by the revisit
				self::$_reg_steps = array_intersect_key( self::$_reg_steps, array( $this->_current_step => TRUE ));
			}
			// let's get that transaction data
			$this->_transaction = EE_Registry::instance()->load_model( 'Transaction' )->get_transaction_from_reg_url_link();
//			printr( $this->_transaction, 'transaction_from_reg_url_link  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//			d( $this->_transaction );
			// verify transaction
			if ( $this->_transaction instanceof EE_Transaction ) {
//				d( $this->_transaction );
				// and get the cart that was used in the original txn
				$this->_cart = EE_Cart::get_cart_from_txn( $this->_transaction );
//				if (  $this->_transaction instanceof EE_Transaction && $this->_revisit ) {
					$registrations = $this->_transaction->registrations( array(), TRUE );
					usort( $registrations, array( 'EED_Single_Page_Checkout', 'sort_registrations_by_REG_count' ));
					foreach ( $registrations as $registration ) {
						//d( $registration );
						// verify registration
						if ( $registration instanceof EE_Registration ) {
							// we display all attendee info for the primary registrant
							if ( $this->_reg_url_link == $registration->reg_url_link() && $registration->is_primary_registrant() ) {
								$this->_primary_revisit = TRUE;
								break;
							} else if ( $this->_reg_url_link != $registration->reg_url_link() ) {
								// but hide info if it doesn't belong to you
								$this->_transaction->clear_cache( 'Registration', $registration->ID() );
							}
						}
					}
//				}
			} else {
				EE_Error::add_error( __( 'Your Registration and Transaction information could not be retrieved from the db.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__);
			}

		} else {
			$this->_transaction = EE_Registry::instance()->SSN->get_session_data( 'transaction' );
//			printr( $this->_transaction, '$this->_transaction <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
			$this->_cart = EE_Registry::instance()->load_core( 'Cart' );
//			printr( $this->_transaction->registrations(), '$this->_transaction->registrations()  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		}

		// verify cart
		if ( ! $this->_cart instanceof EE_Cart ) {
			$this->_cart = EE_Registry::instance()->load_core( 'Cart' );
		}
		// verify transaction
		if ( $this->_transaction instanceof EE_Transaction ) {
			//printr( $this->_transaction->registrations(), '$transaction->registrations() <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
			$ID = $this->_transaction->ID();
			if ( ! $this->_revisit && $ID ) {
				// but if this transaction has already been saved to the db earlier in the same session (ie: it's not a revisit)... then let's pull that
				if ( ! $this->_transaction = EEM_Transaction::instance()->get_one_by_ID( $ID )) {
					EE_Error::add_error( __( 'The Transaction could not be retrieved from the db when attempting to process your registration information', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__);
					return;
				}
			}
		} elseif ( ! $this->_revisit ) {
			$this->_initialize_transaction();
		} else {

		}
		// and verify registrations have been set (first check cached REGs)
		if ( $this->_transaction instanceof EE_Transaction && $this->_transaction->registrations( array(), TRUE ) == NULL ) {
			// then check the db
			if ( $this->_transaction->registrations() == NULL ) {
				$this->_initialize_registrations();
			}
		}

		// don't need payment options for a completed transaction (note: if we ever implement donations, then this will need overriding)
		if ( $this->_transaction->is_completed() || $this->_transaction->is_overpaid() ) {
			unset( self::$_reg_steps['payment_options'] );
		}

		// and the next step
		$this->_set_next_step();
		// load css and js
		add_action( 'wp_enqueue_scripts', array( 'EED_Single_Page_Checkout', 'load_css' ), 10 );
		add_action( 'wp_enqueue_scripts', array( 'EED_Single_Page_Checkout', 'load_js' ), 10 );

	}



	/**
	 * sorts registrations by REG_count
	 *
	 * @access public
	 * @param EE_Registration $reg_A
	 * @param EE_Registration $reg_B
	 * @return array()
	 */
	public static function sort_registrations_by_REG_count( EE_Registration $reg_A, EE_Registration $reg_B ) {
		// this shouldn't ever happen within the same TXN, but oh well
		if ( $reg_A->count() == $reg_B->count() ) {
			return 0;
		}
		return ( $reg_A->count() > $reg_B->count() ) ? 1 : -1;
	}



	/**
	 * The purpose of this method is to just initialize SPCO for manual admin registration handling
	 *
	 * Note, it is fully expected that eventually things will be abstracted a bit more conveniently for the Admin usage of SPCO but this is a quick and dirty method to get things implemented with as much DRY as possible.
	 *
	 * @access public
	 * @return void
	 */
	public function init_for_admin() {
		// load classes
		EE_Registry::instance()->load_model( 'Gateways' );
		$this->_cart = EE_Registry::instance()->load_core( 'Cart' );

		if ( empty( EE_Registry::instance()->REQ ) ) {
			EE_Registry::instance()->load_core( 'Request_Handler' );
		}
		$this->_current_step = 'attendee_information';
		$this->_transaction = EE_Registry::instance()->SSN->get_session_data( 'transaction' );
		// verify transaction
		if ( $this->_transaction instanceof EE_Transaction ) {
			// but if this transaction has already been saved to the db... then let's pull that
			$ID = $this->_transaction->ID();
			if ( $ID ) {
				if ( ! $this->_transaction = EEM_Transaction::instance()->get_one_by_ID( $ID )) {
					EE_Error::add_error( __( 'The Transaction could not be retrieved from the db when attempting to process your registration information', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__);
					return;
				}
			}
		} else {
			$this->_initialize_transaction();
		}
		// and verify registrations have been set (first check cached REGs)
		if ( $this->_transaction->registrations( array(), TRUE ) == NULL ) {
			// then check the db
			if ( $this->_transaction->registrations() == NULL ) {
				$this->_initialize_registrations();
			}
		}
		if ( ! defined('SPCO_TEMPLATES_PATH' )) {
			self::set_definitions();
		}

		$this->set_templates();

	}



	/**
	 *    run
	 *
	 * @access    public
	 * @param WP $WP
	 * @return    void
	 */
	public function run( $WP ) {
		if ( ! EED_Single_Page_Checkout::$_run ) {
			$this->init();
			if ( $this->_transaction instanceof EE_Transaction ) {
				// convert AJAX requests if JS is disabled
				if ( ! EE_Registry::instance()->REQ->ajax && ( strpos( $this->_current_step, 'process_' ) !== FALSE )) {
					$process_method = '_' . $this->_current_step;
					call_user_func( array( $this, $process_method ));
				} else if ( $this->_current_step == 'finalize_registration' ) {
					$this->_process_finalize_registration();
				} else {
					$this->registration_checkout();
				}
			}
			EED_Single_Page_Checkout::$_run = TRUE;
		}
	}



	/**
	 * 		set templates
	 *
	 * 		@access 		public
	 * 		@return 		void
	 */
	public function set_templates() {
		$this->_templates['registration_page_wrapper'] = SPCO_TEMPLATES_PATH . 'registration_page_wrapper.template.php';
		$this->_templates['registration_page_attendee_information'] = SPCO_TEMPLATES_PATH . 'registration_page_attendee_information.template.php';
		$this->_templates['registration_page_payment_options'] = SPCO_TEMPLATES_PATH . 'registration_page_payment_options.template.php';
		$this->_templates['registration_page_confirmation'] = SPCO_TEMPLATES_PATH . 'registration_page_confirmation.template.php';
		$this->_templates['confirmation_page'] = SPCO_TEMPLATES_PATH . 'confirmation_page.template.php';
//		 EE_Config::register_view( 'single_page_checkout', 0, $this->_templates['registration_page_wrapper'] );
	}



	/**
	 * 		translate_js_strings
	 *
	 * 		@access 		public
	 * 		@return 		void
	 */
	public static function translate_js_strings() {
		EE_Registry::$i18n_js_strings['invalid_coupon'] = __('We\'re sorry but that coupon code does not appear to be valid. If this is incorrect, please contact the site administrator.', 'event_espresso');
		EE_Registry::$i18n_js_strings['required_field'] = __(' is a required question.', 'event_espresso');
		EE_Registry::$i18n_js_strings['required_multi_field'] = __(' is a required question. Please enter a value for at least one of the options.', 'event_espresso');
		EE_Registry::$i18n_js_strings['reg_step_error'] = __('This registration step could not be completed. Please refresh the page and try again.', 'event_espresso');
		EE_Registry::$i18n_js_strings['answer_required_questions'] = __('Please answer all required questions before proceeding.', 'event_espresso');
		EE_Registry::$i18n_js_strings['attendee_info_copied'] = __('The attendee information was successfully copied.<br/>Please ensure the rest of the registration form is completed before proceeding.', 'event_espresso');
		EE_Registry::$i18n_js_strings['enter_valid_email'] = __('You must enter a valid email address.', 'event_espresso');
		EE_Registry::$i18n_js_strings['valid_email_and_questions'] = __('You must enter a valid email address and answer all other required questions before you can proceed.', 'event_espresso');
		EE_Registry::$i18n_js_strings['no_payment_method'] = __( 'Please select a method of payment in order to continue.', 'event_espresso' );
		EE_Registry::$i18n_js_strings['process_registration'] = __( 'Please wait while we process your registration.<br />Do not refresh the page or navigate away while this is happening.<br/> Thank you for your patience.', 'event_espresso' );
		EE_Registry::$i18n_js_strings['language'] = get_bloginfo( 'language' );
		EE_Registry::$i18n_js_strings['EESID'] = EE_Registry::instance()->SSN->id();
	}



	/**
	 * 	load_css
	 *
	 * 	@access 		public
	 * 	@return 		void
	 */
	public static function load_css() {
		wp_register_style( 'single_page_checkout', SPCO_ASSETS_URL . 'single_page_checkout.css', array(), EVENT_ESPRESSO_VERSION );
		wp_enqueue_style( 'single_page_checkout' );
	}


	/**
	 * 	load_js
	 *
	 * 	@access 		public
	 * 	@return 		void
	 */
	public static function load_js() {
		EED_Single_Page_Checkout::translate_js_strings();
		wp_enqueue_script( 'underscore' );
		wp_register_script( 'single_page_checkout', SPCO_ASSETS_URL . 'single_page_checkout.js', array('espresso_core', 'underscore'), EVENT_ESPRESSO_VERSION, TRUE );
		wp_enqueue_script( 'single_page_checkout' );
		wp_localize_script( 'single_page_checkout', 'eei18n', EE_Registry::$i18n_js_strings );
	}



	/**
	 * 	generates a new EE_Transaction object and adds it to the $_transaction property.
	 *
	 * 	@access private
	 * 	@return void
	 */
	private function _initialize_transaction() {
		try {
			// create new TXN
			$this->_transaction = EE_Transaction::new_instance( array(
				'TXN_timestamp' => current_time('timestamp'),
				'TXN_total' => $this->_cart->get_cart_grand_total(),
				'TXN_paid' => 0,
				'STS_ID' => EEM_Transaction::failed_status_code,
			));
		} catch( Exception $e ) {
			EE_Error::add_error( $e->getMessage(), __FILE__, __FUNCTION__, __LINE__);
		}
	}


	/**
	 * 	adds related EE_Registration objects for each ticket in the cart to the current EE_Transaction object
	 *
	 * 	@access private
	 * 	@return 	void
	 */
	private function _initialize_registrations() {
		if ( $this->_transaction instanceof EE_Transaction ) {
			$att_nmbr = 0;
			$total_items = $this->_cart->all_ticket_quantity_count();
			// now let's add the cart items to the $transaction
			foreach ( $this->_cart->get_tickets() as $item ) {
				// grab the related ticket object for this line_item
				$ticket = $item->ticket();
				if ( ! $ticket instanceof EE_Ticket ){
					EE_Error::add_error(sprintf(__("Line item %s did not contain a valid ticket", "event_espresso"),$item->ID()), __FILE__, __FUNCTION__, __LINE__ );
					break;
				}
				$first_datetime = $ticket->get_first_related( 'Datetime' );
				if ( ! $first_datetime instanceof EE_Datetime ){
					EE_Error::add_error(sprintf(__("The ticket (%s) is not associated with any valid datetimes.", "event_espresso"),$ticket->name()), __FILE__, __FUNCTION__, __LINE__ );
					continue;
				}
				$event = $first_datetime->get_first_related( 'Event' );
				if ( ! $event instanceof EE_Event ){
					EE_Error::add_error(sprintf(__("The ticket (%s) is not associated with a valid event.", "event_espresso"),$ticket->name()),__FILE__,__FUNCTION__,__LINE__ );
					continue;
				}
				//do the following for each ticket of this type they selected
				for ( $x = 1; $x <= $item->quantity(); $x++ ) {
					$att_nmbr++;
					$reg_url_link = $att_nmbr . '-' . $item->code();
					// grab the default reg status for the event
					$registration_status = $event->default_registration_status();
					// if it's set to "Approved", then temporarily downgrade it to "Pending Payment", so that reg limits and/or ticket sales are not skewed in case the reg process is aborted
					$registration_status = $registration_status == EEM_Registration::status_id_approved ? EEM_Registration::status_id_pending_payment : $registration_status;
					try {
						// now create a new registration for the ticket
						$registration = EE_Registration::new_instance( array(
							'EVT_ID' => $event->ID(),
							'TXN_ID' => $this->_transaction->ID(),
							'TKT_ID' => $ticket->ID(),
							'STS_ID' => $registration_status,
							'REG_date' => $this->_transaction->datetime(),
							'REG_final_price' => $ticket->price(),
							'REG_session' => EE_Registry::instance()->SSN->id(),
							'REG_count' => $att_nmbr,
							'REG_group_size' => $total_items,
							'REG_url_link'	=> $reg_url_link
						));
						// now create relations between various objects
						$registration->_add_relation_to( $event, 'Event', array(), $event->ID() );
						$registration->_add_relation_to( $item->ticket(), 'Ticket', array(), $item->ticket()->ID() );
						$this->_transaction->_add_relation_to( $registration, 'Registration', array(), $reg_url_link );
					// if something failed...
					} catch( Exception $e ) {
						EE_Error::add_error( $e->getMessage(), __FILE__, __FUNCTION__, __LINE__);
						return;
					}
				}
			}
			EE_Registry::instance()->SSN->set_session_data( array( 'transaction' => $this->_transaction ));
			EE_Registry::instance()->SSN->update();

//			echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		}
		return;

	}



	/**
	 *        load and display the Registration Single Page Checkout
	 *
	 * @access 	public
	 * @param 	bool $from_admin
	 * @return 	string
	 */
	public function registration_checkout( $from_admin = FALSE ) {

		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		//d($this->_cart);
		EE_Registry::instance()->load_helper( 'Form_Fields' );
		EE_Registry::instance()->load_helper( 'Template' );
		EE_Registry::instance()->load_class( 'Question_Form_Input', array(), FALSE, FALSE, TRUE );

		$event_queue = array();
		$total_items = 0;
		$ticket_count = array();
		$payment_required = FALSE;

		$sold_out_events = array();
		$events_requiring_pre_approval = array();
		$additional_event_attendees = array();
//		$events_that_use_coupon_codes = array();
//		$events_that_use_groupon_codes = array();

		$template_args = array(
			'css_class' => '',
			'confirmation_data' => '',
			'reg_page_discounts_dv_class' => 'hidden',
			'additional_attendee_reg_info' => NULL,
			'whats_in_the_cart' => '',
			'prmy_att_input_name' => NULL
		);

		$event_queue['title'] = __('Registrations', 'event_espresso');
		$additional_attendee_forms = FALSE;

		$registrations  =  $this->_transaction->registrations( array(), TRUE );
		// grab the saved registrations from the transaction
		if ( $this->_transaction instanceof EE_Transaction && $registrations !== NULL ) {

			//d( $this->_transaction );
			$event_queue['has_items'] = TRUE;
			$prev_event = NULL;

			foreach ( $registrations as $registration ) {

				if (( $registration->event()->is_sold_out() || $registration->event()->is_sold_out( TRUE )) && ! $this->_reg_url_link == $registration->reg_url_link() ) {
					// add event to list of events that are sold out
					$sold_out_events[ $registration->event()->ID() ] = '<li><span class="dashicons dashicons-marker ee-icon-size-16 pink-text"></span>' . $registration->event()->name() . '</li>';
				}
				$payment_required  = $registration->status_ID() == EEM_Registration::status_id_pending_payment || $registration->status_ID() == EEM_Registration::status_id_approved ? TRUE : $payment_required;
				if ( ! $payment_required && ! $this->_reg_url_link == $registration->reg_url_link() ) {
					// add event to list of events with pre-approval reg status
					$events_requiring_pre_approval[ $registration->event()->ID() ] = '<li><span class="dashicons dashicons-marker ee-icon-size-16 orange-text"></span>' . $registration->event()->name() . '</li>';
				}

				$total_items ++;
				$ticket_count[ $registration->ticket()->ID() ] = isset( $ticket_count[ $registration->ticket()->ID() ] ) ? $ticket_count[ $registration->ticket()->ID() ] + 1 : 1;
				$line_item_ID = $registration->reg_url_link();
				$event_queue['items'][ $line_item_ID ]['ticket'] = $registration->ticket();
				$event_queue['items'][ $line_item_ID ]['event'] = $registration->event();
				$event_queue['items'][ $line_item_ID ]['reg_count'] = $registration->count();

				// do we need to generate data regarding attendees and reg form questions?
				if ( strpos( $this->_current_step, 'attendee_information' ) !== FALSE ) {

					$question_meta = array(
						'EVT_ID' => $registration->event()->ID(),
						'att_nmbr' => $registration->count(),
						'ticket_id' => $registration->ticket()->ID(),
						'input_name' =>  '[' . $line_item_ID . ']',
						'input_id' => $line_item_ID,
						'input_class' => 'ee-reg-page-questions' . $template_args['css_class']
					);

					$Question_Groups = EE_Registry::instance()->load_model( 'Question_Group' )->get_all( array(
						array(
							'Event.EVT_ID' => $registration->event()->ID(),
							'Event_Question_Group.EQG_primary' => $registration->count() == 1 ? TRUE : FALSE
						),
						'order_by'=>array( 'QSG_order'=>'ASC' )
					));

					foreach ( $Question_Groups as $QSG_ID => $Question_Group ) {
						$where = array( 'QST_deleted' => 0 );
						if ( ! $from_admin ) {
							$where['QST_admin_only'] = 0;
						}
						$Questions = $Question_Group->get_many_related( 'Question', array( $where, 'order_by'=>array( 'Question_Group_Question.QGQ_order' =>'ASC' )));
						foreach ( $Questions as $Question ) {
							if( $Question instanceof EE_Question ){
								// if this question was for an attendee detail, then check for that answer
								$answer_value = EEM_Answer::instance()->get_attendee_property_answer_value( $registration, $Question->ID() );
								$answer =  $this->_reg_url_link || ! $answer_value  ? EEM_Answer::instance()->get_one( array( array( 'QST_ID'=>$Question->ID(), 'REG_ID'=>$registration->ID() ))) : NULL;
								// if NOT returning to edit an existing registration OR if this question is for an attendee property OR we still don't have an EE_Answer object
								if( ! $this->_reg_url_link || $answer_value || ! $answer instanceof EE_Answer ) {
									// create an EE_Answer object for storing everything in
									$answer = EE_Answer::new_instance ( array(
										'QST_ID'=> $Question->ID(),
										'REG_ID'=> $registration->ID()
									));
								}

								if( $answer instanceof EE_Answer ){
									if ( ! empty( $answer_value )) {
										$answer->set( 'ANS_value', $answer_value );
									}
									$question_meta['attendee'][ $Question->is_system_question() ? $Question->system_ID() : $Question->ID() ] = $answer->value();
									$answer->cache( 'Question', $Question );
									$answer_cache_id =$Question->system_ID() != NULL ? $Question->system_ID() . '-' . $line_item_ID : $Question->ID() . '-' . $line_item_ID;
									//								echo '<h4>$answer_cache_id : ' . $answer_cache_id . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
									$registration->cache( 'Answer', $answer, $answer_cache_id );
								}
								$Question_Groups[ $QSG_ID ]->cache( 'Question', $Question );
							}
						}
					}
					//					printr( $registration, '$registration  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

					add_filter( 'FHEE__EEH_Form_Fields__label_html', array( 'EED_Single_Page_Checkout', 'reg_form_form_field_label_wrap' ), 10, 2 );
					add_filter( 'FHEE__EEH_Form_Fields__input_html', array( 'EED_Single_Page_Checkout', 'reg_form_form_field_input__wrap' ), 10, 2 );
					$attendee_questions = EEH_Form_Fields::generate_question_groups_html2( $Question_Groups, $question_meta, $from_admin, 'div' );

					// show this attendee form?
					if ( empty( $attendee_questions )) {
						$event_queue['items'][ $line_item_ID ]['additional_attendee_reg_info'] = "\n" . '<input type="hidden" id="' . $line_item_ID . '-additional_attendee_reg_info" name="qstn[' . $line_item_ID . '][additional_attendee_reg_info]" value="0" />' . "\n";
					} else {
						$additional_attendee_forms = $registration->count() == 1 ? FALSE : TRUE;
						$event_queue['items'][ $line_item_ID ]['additional_attendee_reg_info'] = '';
					}
					$event_queue['items'][ $line_item_ID ]['attendee_questions'] = $attendee_questions;



					// is this the primary registrant ?
					if ( $registration->count() == 1 ) {
						// grab line item from primary attendee
						$template_args['prmy_att_input_name'] =  $line_item_ID;
					} else {

						// for all  attendees other than the primary attendee
						$additional_event_attendees[ $registration->ticket()->ID() ][ $line_item_ID ] = array(
							'ticket' => $registration->ticket()->name(),
							'att_nmbr' => $registration->count(),
							'input_id' => $line_item_ID,
							'input_name' =>  '[' . $line_item_ID . ']'
						);

						$item_name = $registration->ticket()->name();
						$item_name .= $registration->ticket()->description() != '' ? ' - ' . $registration->ticket()->description() : '';

						// if this is a new ticket OR if this is the very first additional attendee after the primary attendee
						if ( $registration->ticket()->ID() != $prev_event || $registration->count() == 2 ) {
							$additional_event_attendees[ $registration->ticket()->ID() ][ $line_item_ID ]['event_hdr'] = $item_name;
							$prev_event = $registration->ticket()->ID();
						} else {
							// no heading
							$additional_event_attendees[ $registration->ticket()->ID() ][ $line_item_ID ]['event_hdr'] = FALSE;
						}
					}
				}

			}

			if ( ! $this->_reg_url_link ) {
				EE_Registry::instance()->SSN->set_session_data( array( 'transaction' => $this->_transaction ));
			}
//				echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
//				EE_Registry::instance()->SSN->update();
//				d( $this->_transaction );
//				d( $this->_cart );

		} else {
			// empty
			$event_queue['has_items'] = FALSE;
		}
		// sold_out_events
		$template_args['sold_out_events'] = implode( $sold_out_events );
		$template_args['sold_out_events_msg'] = apply_filters( 'FHEE__Single_Page_Checkout__registration_checkout__sold_out_events_msg', __('It appears that the event you were about to make a payment for has sold out since you first registered. If you have already made a partial payment towards this event, please contact the event administrator for a refund.', 'event_espresso') );
		// events_requiring_pre_approval
		$template_args['events_requiring_pre_approval'] = implode( $events_requiring_pre_approval );
		$template_args['events_requiring_pre_approval_msg'] = apply_filters( 'FHEE__Single_Page_Checkout__registration_checkout__sold_out_events_msg', __('The following events do not require payment at this time and will not be billed during this transaction. Billing will only occur after the attendee has been approved by the event organizer. You will be notified when your registration has been processed. If this is a free event, then no billing will occur.', 'event_espresso') );

		//  GOT COUPONS ?
		$template_args['events_that_use_coupon_codes'] = '';
		$template_args['use_coupon_codes'] = FALSE;

		// Groupons ?
		$template_args['events_that_use_groupon_codes'] = '';
		$template_args['use_groupon_codes'] = FALSE;


		$template_args['spco_reg_page_ajax_coupons_url'] = add_query_arg( array( 'ee' => 'apply_coupon' ), $this->_reg_page_base_url );
//		$template_args['print_copy_info'] = $additional_attendee_forms || $total_items > 2 ? TRUE : FALSE;
		$template_args['total_items'] = $total_items;
		$template_args['ticket_count'] = $ticket_count;
		$template_args['print_copy_info'] = $additional_attendee_forms;

//		d($additional_event_attendees);
		$template_args['additional_event_attendees'] = $additional_event_attendees;
		// total monies paid to date
		$total_payments = 0;
		// the original total
		$cart_total_before_tax = $this->_cart->get_cart_total_before_tax();
		// get cart total
		$grand_total = $this->_cart->get_cart_grand_total();
		$template_args['grand_total'] = apply_filters( 'FHEE__EED_Single_Page_Checkout__registration_checkout__grand_total', $grand_total );
		// check if monies are potentially owing
		$template_args['payment_required'] = $cart_total_before_tax > 0 ? $payment_required : FALSE;
		// not a free event?
		if ( $template_args['payment_required'] ) {
			//check for any previous payments
			if ( $template_args['payments'] = $this->_transaction->approved_payments() ) {
				foreach ( $template_args['payments'] as $payment ) {
					if ( $payment instanceof EE_Payment ) {
						// increment total payments
						$total_payments += $payment->amount();
					}
				}
				$template_args['pay_date_frmt'] = get_option('date_format') . ' ' . get_option('time_format');
			}
		} else {
			//unset( self::$_reg_steps['payment_options'] );
			EE_Registry::instance()->SSN->set_session_data( array( 'billing_info' => 'no payment required' ));
			$template_args['payments'] = array();
		}

		$template_args['sub_total'] = $cart_total_before_tax;
		$template_args['taxes'] = $this->_cart->get_taxes_line_item()->children();

		// what's left to pay?
		$amount_owing = $grand_total - $total_payments;
		$template_args['amount_owing'] = apply_filters( 'FHEE__EED_Single_Page_Checkout__registration_checkout__amount_owing', $amount_owing );

		//$template_args['grand_total'] = $template_args['amount_owing'] !== FALSE ? $amount_owing : $grand_total;

		$template_args['total_items'] = $event_queue['total_items'] = $total_items;
//	d( $event_queue );
		$template_args['event_queue'] = $event_queue;
		$template_args['images_dir_url'] = EE_GLOBAL_ASSETS_URL . 'images/';
		$template_args['reg_url_link'] = $this->_reg_url_link;

		$template_args['return_url'] = add_query_arg( array('ee' => 'event_queue'), $this->_reg_page_base_url );
		$template_args['update_url'] = add_query_arg( array('ee' => 'update_event_queue'), $this->_reg_page_base_url );
		$template_args['register_url'] = add_query_arg( array('ee' => '_register'), $this->_reg_page_base_url );
		$template_args['event_queue_url'] = add_query_arg( array('ee' => 'event_queue'), $this->_reg_page_base_url );

		$template_args['confirmation_data'] = $this->_current_step == 'registration_confirmation' ? $this->_registration_confirmation() : '';

		$step_or_revisit = __('Step ', 'event_espresso');

		if ( $this->_revisit && $this->_current_step == 'attendee_information' ) {
			// Update Registration Details
			$confirmation_btn_text = sprintf( __('Update%1$sRegistration%1$sDetails', 'event_espresso'), '&nbsp;' );
			$confirmation_btn_text = apply_filters( 'FHEE__EED_Single_Page_Checkout__registration_checkout__button_text__update_registration_details', $confirmation_btn_text );
			$step_or_revisit = __('Edit', 'event_espresso');
		} else if ( $this->_revisit && $this->_current_step == 'payment_options' ) {
			// Process Payment
			$confirmation_btn_text = sprintf( __('Process%1$sPayment', 'event_espresso'), '&nbsp;' );
			$confirmation_btn_text = apply_filters( 'FHEE__EED_Single_Page_Checkout__registration_checkout__button_text__process_payment', $confirmation_btn_text );
			$step_or_revisit = '';
		} else {
			// Finalize Registration
			$confirmation_btn_text = sprintf( __('Finalize%1$sRegistration', 'event_espresso'), '&nbsp;' );
			$confirmation_btn_text = apply_filters( 'FHEE__EED_Single_Page_Checkout__registration_checkout__button_text__finalize_registration', $confirmation_btn_text );
		}
		// grand total less than paid but greater than zero ?
		if ( $grand_total < $this->_transaction->paid() && $grand_total > 0 && $this->_next_step == 'payment_options' ) {
			// owing money
			$proceed_to_payment_btn_text = sprintf(
				// & Proceed to Payment
				__('%1$s%2$s%1$sProceed%1$sto%1$sPayment', 'event_espresso'),
				'&nbsp;',  // %1$s
				'&amp;'	// %2$s
			);
			$confirmation_btn_text .=  apply_filters( 'FHEE__EED_Single_Page_Checkout__registration_checkout__button_text__and_proceed_to_payment', $proceed_to_payment_btn_text );
		}
		add_action( 'AHEE__SPCO_after_reg_step_form', array( $this, 'add_extra_finalize_registration_inputs' ), 10, 2 );

		$template_args['from_admin'] = $from_admin;

		//if in admin we exit at this point and display the questions template
		if ( $from_admin ) {
			//some custom template args
			$template_args['step_dv_class'] = '';
			$template_args['revisit'] =$this->_revisit;
			return EEH_Template::display_template( $this->_templates['registration_page_attendee_information'], $template_args, TRUE );
		}

		$proceed_to_btn_text = sprintf( __('Proceed%1$sto%1$s', 'event_espresso'), '&nbsp;' );
		$proceed_to_btn_text = apply_filters( 'FHEE__EED_Single_Page_Checkout__registration_checkout__button_text__proceed_to', $proceed_to_btn_text );

		$registration_steps = '';
		$step_nmbr = 1;
		// set pointer to first step
		reset( self::$_reg_steps );
		// loop through steps
		while ( $reg_step_details = current( self::$_reg_steps )) {
			$reg_step = key( self::$_reg_steps );
//			echo '<br/><h4>$reg_step : ' . $reg_step . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//			echo '<h4>$this->_current_step : ' . $this->_current_step . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
			$edit_lnk_class = $this->_current_step == $reg_step ? ' hidden' : '';
			$edit_lnk_url = add_query_arg( array( 'ee' => '_register', 'step' => $reg_step_details['display_func'] ), $this->_reg_page_base_url );
			$step_dv_class = $this->_current_step == $reg_step ? '' : ' hidden';
			$reg_step_form_url = add_query_arg( array( 'ee' => '_register', 'step' => $reg_step_details['process_func'] ), $this->_reg_page_base_url );
			$next = $this->_get_next_reg_step();
			//d( $next );
			$next_step = $next ? $next['display_func'] : 'finalize_registration';
			$next_step_text = $next ? $proceed_to_btn_text . $next['name'] : $confirmation_btn_text;

			$step_args = array_merge(
				$template_args,
				array(
					'step' => $reg_step,
					'step_nmbr' => $this->_revisit !== FALSE ? $step_or_revisit : $step_or_revisit . $step_nmbr . ' - ',
					'edit_lnk_class' => $edit_lnk_class,
					'edit_lnk_url' => $edit_lnk_url,
					'step_dv_class' => $step_dv_class,
					'reg_step_form_url' => $reg_step_form_url,
					'reg_step_ajax_action' => $reg_step_details['process_func'],
					'next_step' => $next_step,
					'next_step_text' => $next_step_text,
					'revisit' => $this->_revisit
				)
			);

			if ( $reg_step == 'payment_options' ) {

				EE_Registry::instance()->load_model( 'Gateways' );
				// has gateway been set by no-js user?
				if ( EE_Registry::instance()->REQ->is_set( 'payment' )) {
					if ( $payment = sanitize_text_field( EE_Registry::instance()->REQ->get( 'payment' ))) {
//						d( $payment );
						if ( EE_Registry::instance()->LIB->EEM_Gateways->selected_gateway() != $payment ) {
							EE_Registry::instance()->LIB->EEM_Gateways->set_selected_gateway( $payment );
						} else {
							EE_Registry::instance()->LIB->EEM_Gateways->unset_selected_gateway( $payment );
						}
					}
				}
				$step_args['selected_gateway'] = EE_Registry::instance()->LIB->EEM_Gateways->selected_gateway();

			} else  {
				$step_args['selected_gateway'] = '';
			}
//			printr( $step_args, '$step_args  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

//			d( $step_args );
			$registration_steps .= EEH_Template::locate_template( $this->_templates[ $reg_step_details[ 'template' ] ], $step_args, TRUE, TRUE );
			// pass step info to js
			EE_Registry::$i18n_js_strings[ 'reg_steps' ][] = $reg_step_details['display_func'];
			next( self::$_reg_steps );
			$step_nmbr++;

		}

		EE_Registry::$i18n_js_strings[ 'reg_steps' ][] = 'finalize_registration';

		$wrapper_args = array(
			'step' => $this->_current_step,
			'empty_cart' => $total_items < 1 ? TRUE : FALSE,
			'reg_steps' => self::$_reg_steps,
			'registration_steps' => $registration_steps,
			'revisit' => $this->_revisit,
			'empty_msg' => apply_filters( 'FHEE__Single_Page_Checkout__registration_checkout__empty_msg', __( 'You need to select at least one event before you can proceed with the registration process.', 'event_espresso' ) )
		);
//		d( $wrapper_args );
		EE_Registry::instance()->REQ->add_output( EEH_Template::locate_template( $this->_templates[ 'registration_page_wrapper' ], $wrapper_args, TRUE, TRUE ));

	}



	/**
	 * this generates the output for the registration form for manual registrations via the admin
	 *
	 * @access public
	 * @return string
	 */
	public function registration_checkout_for_admin() {

		$this->_reg_url_link = FALSE;
		$this->_revisit = FALSE;
		$this->init_for_admin();

		//do native registration_checkout
		return $this->registration_checkout( TRUE );
	}



	/**
	 *    add_extra_finalize_registration_inputs
	 *
	 * @access    public
	 * @param $current_step
	 * @param $next_step
	 * @internal  param string $label
	 * @return        string
	 */
	public function add_extra_finalize_registration_inputs( $current_step, $next_step ) {
		if ( $next_step == 'finalize_registration' ) {
			echo '<div id="spco-extra-finalize_registration-inputs-dv"></div>';
		}
	}





	/**
	 * 	reg_form_form_field_label_wrap
	 *
	 * 	@access 	public
	 * 	@param 	string 	$label
	 * 	@return 	string
	 */
	public static function reg_form_form_field_label_wrap( $label ) {
		return '<div class="reg-page-form-field-wrap-pg">' . $label;
	}




	/**
	 * 	reg_form_form_field_input__wrap
	 *
	 * 	@access 	public
	 * 	@param 	string 	$input
	 * 	@param 	string 	$label
	 * 	@return 	string
	 */
	public static function reg_form_form_field_input__wrap( $input, $label ) {
		return $input . '</div>';
	}



	/**
	 * 	_process_attendee_information
	 *
	 * 	@access 	private
	 * @return mixed
	 */
	private function _process_attendee_information() {

		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		$success = TRUE;
		// empty container
		$valid_data = array();

		if ( EE_Registry::instance()->REQ->is_set( 'qstn' )) {
			$valid_data = apply_filters( 'FHEE__EE_Single_Page_Checkout__process_attendee_information__REQ', EE_Registry::instance()->REQ->get( 'qstn' ) );
			// loop through post data and sanitize all elements
			array_walk_recursive( $valid_data, array(  EE_Registry::instance()->REQ, 'sanitize_text_field_for_array_walk' ));
		}
		// if we don't have any $valid_data then something went TERRIBLY WRONG !!! AHHHHHHHH!!!!!!!
		if ( ! empty( $valid_data )) {

			if ( isset( $valid_data['custom_questions'] )) {
				if ( ! $this->_reg_url_link ) {
					EE_Registry::instance()->SSN->set_session_data( array( 'custom_questions' =>$valid_data['custom_questions'] ));
				}
				unset( $valid_data['custom_questions'] );
			}

			$primary_attendee = array();
			$primary_attendee_obj = NULL;
			$primary_attendee['line_item_id'] = NULL;
			if ( isset( $valid_data['primary_attendee'] )) {
				$primary_attendee['line_item_id'] =  ! empty( $valid_data['primary_attendee'] ) ? $valid_data['primary_attendee'] : FALSE;
				unset( $valid_data['primary_attendee'] );
			}

//			printr( $valid_data, '$valid_data  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//			printr( $this->_transaction, '$this->_transaction  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

			// attendee counter
			$att_nmbr = 0;
			if ( $this->_continue_reg ) {
				if ( $this->_transaction instanceof EE_Transaction && $this->_continue_reg ) {
					$registrations = $this->_transaction->registrations( array(), TRUE );
					if ( ! empty( $registrations )) {
						EE_Registry::instance()->load_model( 'Attendee' );
						$primary_attendee_obj = NULL;
						// grab the saved registrations from the transaction
						foreach ( $registrations  as $registration ) {
							// verify EE_Registration object
							if ( $registration instanceof EE_Registration ) {
								// if event is sold out but this is NOT a revisit
								if ( $this->_revisit  || ( ! $this->_revisit && ! ( $registration->event()->is_sold_out() || $registration->event()->is_sold_out( TRUE )))) {
									// EITHER a) first time thru SPCO so process ALL registrations
									// OR b) primary registrant is editing info, so process ALL registrations
									// OR b) another registrant is editing info, so ONLY process their registration
									if ( ! $this->_revisit || $this->_primary_revisit || ( $this->_revisit && $this->_reg_url_link == $registration->reg_url_link() )) {
										// reg_url_link / line item ID exists ?
										if ( $line_item_id = $registration->reg_url_link() ) {
	//										echo '<h5 style="color:#2EA2CC;">$line_item_id : <span style="color:#E76700">' . $line_item_id . '</span><br/><span style="font-size:9px;font-weight:normal;color:#666">' . __FILE__ . '</span>    <b style="font-size:10px;color:#333">  ' . __LINE__ . ' </b></h5>';
											// Houston, we have a registration!
											$att_nmbr++;
											// grab related answer objects
											$answers = $registration->answers();
	//										printr( $answers, '$answers  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
											$attendee_data = array();
											// do we need to copy basic info from primary attendee ?
											$copy_primary = isset( $valid_data[ $line_item_id ]['additional_attendee_reg_info'] ) && absint( $valid_data[ $line_item_id ]['additional_attendee_reg_info'] ) === 0 ? TRUE  : FALSE;
	//										echo '<h5 style="color:#2EA2CC;">$copy_primary : <span style="color:#E76700">' . $copy_primary . '</span><br/><span style="font-size:9px;font-weight:normal;color:#666">' . __FILE__ . '</span>    <b style="font-size:10px;color:#333">  ' . __LINE__ . ' </b></h5>';
											unset( $valid_data[ $line_item_id ]['additional_attendee_reg_info'] );
											if ( isset( $valid_data[ $line_item_id ] )) {
												// filter form input data for this registration
												$valid_data[ $line_item_id ] = apply_filters( 'FHEE__EE_Single_Page_Checkout__process_attendee_information__valid_data_line_item', $valid_data[ $line_item_id ] );
		//									printr( $valid_data[ $line_item_id ], '$valid_data[ $line_item_id ]  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
												// now loop through our array of valid post data && process attendee reg forms
												foreach ( $valid_data[ $line_item_id ] as $form_input => $input_value ) {
													// check for critical inputs
													if ( empty( $input_value )) {

														switch( $form_input ) {
															case 'fname' :
																EE_Error::add_error( __( 'First Name is a required value.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
																$success = FALSE;
															break;
															case 'lname' :
																EE_Error::add_error( __( 'Last Name is a required value.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
																$success = FALSE;
															break;
															case 'email' :
																EE_Error::add_error( __( 'Email Address is a required value.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
																$success = FALSE;
															break;
														}

													} elseif ( $form_input == 'email' ) {
														// clean the email address
														$valid_email = sanitize_email( $input_value );
														// check if it matches
														if ( $input_value != $valid_email ) {
															// whoops!!!
															EE_Error::add_error( __( 'Please enter a valid email address.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
															$success = FALSE;
														}
													}

													// store a bit of data about the primary attendee
													if ( $att_nmbr == 1 && $line_item_id == $primary_attendee['line_item_id'] && ! empty( $input_value )) {
														$primary_attendee[ $form_input ] = $input_value;
													} else if ( $copy_primary && isset( $primary_attendee[ $form_input ] ) && $input_value == NULL ) {
														$input_value = $primary_attendee[ $form_input ];
													}

													// $answer_cache_id is the key used to find the EE_Answer we want
													$answer_cache_id = $this->_reg_url_link ? $form_input : $form_input . '-' . $line_item_id;
													$answer_is_obj = isset( $answers[ $answer_cache_id ] ) && $answers[ $answer_cache_id ] instanceof EE_Answer ? TRUE : FALSE;

													//rename a couple of form_inputs
													switch( $form_input ) {
														case 'state' :
															$form_input = 'STA_ID';
															$attendee_property = TRUE;
														break;
														case 'country' :
															$form_input = 'CNT_ISO';
															$attendee_property = TRUE;
														break;
														default :
															$attendee_property = EEM_Attendee::instance()->has_field('ATT_' . $form_input) ? TRUE : FALSE;
															$form_input = $attendee_property ? 'ATT_' . $form_input : $form_input;
													}

//		echo '<h4>$answer_cache_id : ' . $answer_cache_id . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		echo '<h4>attendee_property: ' . $attendee_property . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		echo '<h4>$answer_is_obj : ' . $answer_is_obj . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		echo '<h4>' . $form_input . ': ' . ( is_array( $input_value ) ? implode( ', ', $input_value ) : $input_value ) . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
													$saved = FALSE;
													// if this form input has a corresponding attendee property
													if ( $attendee_property ) {
														$attendee_data[ $form_input ] = $input_value;
														if (  $answer_is_obj ) {
															// and delete the corresponding answer since we won't be storing this data in that object
															$registration->_remove_relation_to( $answers[ $answer_cache_id ], 'Answer' );
														}
														$saved = TRUE;
													} elseif ( $answer_is_obj ) {
														// save this data to the answer object
														$answers[ $answer_cache_id ]->set_value( $input_value );
														$saved = TRUE;
													} else {
														foreach ( $answers as $answer ) {
															if ( $answer  instanceof EE_Answer && $answer->question_ID() == $answer_cache_id ) {
																$answer->set_value( $input_value );
																$saved = TRUE;
															}
														}

													}
													if ( ! $saved )  {
														EE_Error::add_error( sprintf( __( 'Unable to save registration form data for the form input: %s', 'event_espresso' ), $form_input ), __FILE__, __FUNCTION__, __LINE__ );
														$success = FALSE;
													}

												}  // end of foreach ( $valid_data[ $line_item_id ] as $form_input => $input_value )

											} /*else {
												EE_Error::add_error( sprintf( __( 'It appears that no form data, or invalid data, for attendee #%s was received while attempting to process the registration form.', 'event_espresso' ), $att_nmbr ), __FILE__, __FUNCTION__, __LINE__ );
												$success = FALSE;
											}*/
//											printr( $attendee_data, '$attendee_data  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//											printr( $answers, '$answers  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

											// this registration does not require additional attendee information ?
											if ( $copy_primary && $att_nmbr > 1 ) {
		//										echo '<h1>$copy_primary && $att_nmbr > 1  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h1>';
												// add relation to new attendee
												$registration->_add_relation_to( $primary_attendee_obj, 'Attendee' );
												$registration->set_attendee_id( $primary_attendee_obj->ID() );
												$registration->update_cache_after_object_save( 'Attendee', $primary_attendee_obj );
		//										echo '$copy_primary attendee: '. $primary_attendee_obj->ID() . '<br/>';
											} else {
												// does this attendee already exist in the db ? we're searching using a combination of first name, last name, AND email address
												$ATT_fname = isset( $attendee_data['ATT_fname'] ) && ! empty( $attendee_data['ATT_fname'] ) ? $attendee_data['ATT_fname'] : '';
												$ATT_lname = isset( $attendee_data['ATT_lname'] ) && ! empty( $attendee_data['ATT_lname'] ) ? $attendee_data['ATT_lname'] : '';
												$ATT_email = isset( $attendee_data['ATT_email'] ) && ! empty( $attendee_data['ATT_email'] ) ? $attendee_data['ATT_email'] : '';
												// but only if those have values
												if ( $ATT_fname && $ATT_lname && $ATT_email ) {
													$existing_attendee = EE_Registry::instance()->LIB->EEM_Attendee->find_existing_attendee( array(
														'ATT_fname' => $ATT_fname,
														'ATT_lname' => $ATT_lname,
														'ATT_email' => $ATT_email
													));
												} else {
													$existing_attendee = NULL;
												}
		//										printr( $existing_attendee, '$existing_attendee  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
												$existing_attendee = apply_filters( 'FHEE_EE_Single_Page_Checkout__save_registration_items__find_existing_attendee', $existing_attendee, $registration );
												// did we find an already existing record for this attendee ?
												if ( $existing_attendee instanceof EE_Attendee ) {
	//												echo '<h1>$existing_attendee instanceof EE_Attendee  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h1>';
													// update attendee data in case it has changed since last time they registered for an event
													// first remove fname, lname, and email from attendee data
													unset( $attendee_data['ATT_fname'] );
													unset( $attendee_data['ATT_lname'] );
													unset( $attendee_data['ATT_email'] );
													// now loop thru what's left and add to attendee CPT
													foreach ( $attendee_data as $property_name => $property_value ) {
														if ( EEM_Attendee::instance()->has_field($property_name)) {
															$existing_attendee->set( $property_name, $property_value );
														}
													}
													// better save that now
													$existing_attendee->save();
													// add relation to existing attendee
													$registration->_add_relation_to( $existing_attendee, 'Attendee' );
													$registration->set_attendee_id( $existing_attendee->ID() );
													$registration->update_cache_after_object_save( 'Attendee', $existing_attendee );

											} else {
												// ensure critical details are set for additional attendees
												if ( $att_nmbr > 1 ) {
													$critical_attendee_details = array(
														'ATT_fname',
														'ATT_lname',
														'ATT_email'
	//													'ATT_address',
	//													'ATT_address2',
	//													'ATT_city',
	//													'STA_ID',
	//													'CNT_ISO',
	//													'ATT_zip',
	//													'ATT_phone',
													);
													$critical_attendee_details = apply_filters( 'FHEE__EE_Single_Page_Checkout__process_attendee_information__critical_attendee_details', $critical_attendee_details );
													foreach ( $critical_attendee_details as $critical_attendee_detail ) {
														if ( ! isset( $attendee_data[ $critical_attendee_detail ] ) || empty( $attendee_data[ $critical_attendee_detail ] )) {
															$attendee_data[ $critical_attendee_detail ] = $primary_attendee_obj->get( $critical_attendee_detail );
														}
														}

													}
													// set author to event creator
													$attendee_data['ATT_author'] = $registration->event()->wp_user();
													// create new attendee object
													$new_attendee = EE_Attendee::new_instance( $attendee_data );
													$new_attendee->save();
	//												echo '<h1>$new_attendee  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h1>';
													// add relation to new attendee
													$registration->_add_relation_to( $new_attendee, 'Attendee' );
													$registration->set_attendee_id( $new_attendee->ID() );
													$registration->update_cache_after_object_save( 'Attendee', $new_attendee );

												}

												// who's the man ?
												if ( $att_nmbr == 1 ) {
													$primary_attendee_obj = $registration->get_first_related( 'Attendee' );
	//												printr( $primary_attendee_obj, '$primary_attendee_obj  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
												}
											}


										} else {
											EE_Error::add_error( __( 'An invalid or missing line item ID was encountered while attempting to process the registration form.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
											$success = FALSE;
											// remove malformed data
											unset( $valid_data[ $line_item_id ] );
										}

										if ( ! $registration->attendee() instanceof EE_Attendee ) {
											EE_Error::add_error( sprintf( __( 'Registration %s has an invalid or missing Attendee object.', 'event_espresso' ), $line_item_id ), __FILE__, __FUNCTION__, __LINE__ );
											$success = FALSE;
										}

	//									printr( $registration->attendee(), '$registration->attendee()  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

									} // end of if ( ! $this->_revisit || $this->_primary_revisit || ( $this->_revisit && $this->_reg_url_link == $registration->reg_url_link() )) {

								} else {
									EE_Error::add_error( apply_filters( 'FHEE__Single_Page_Checkout___process_attendee_information__sold_out_events_msg', __( 'It appears that the event you are attempting to register for has just sold out. If you have already made a partial payment towards this event, please contact the event administrator for a refund.', 'event_espresso' )), __FILE__, __FUNCTION__, __LINE__);
									$success = FALSE;
								}

							// end of if ( $registration instanceof EE_Registration )
							} else {
								EE_Error::add_error( __( 'An invalid Registration object was discovered when attempting to process your registration information.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__);
								$success = FALSE;
							}

//							printr( $registration, '$registration  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

						} // end of foreach ( $this->_transaction->registrations()  as $registration )

						if ( ! $this->_reg_url_link ) {
							EE_Registry::instance()->SSN->set_session_data( array( 'transaction' => $this->_transaction ));
						}

					} else {
						EE_Error::add_error( __( 'Your form data could not be applied to any valid registrations.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
						$success = FALSE;
					}

				} else {
					EE_Error::add_error( __( 'A valid transaction could not be initiated for processing your registrations.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
					$success = FALSE;
				}

			}

		} else {
			EE_Error::add_error( __('No valid question responses were received.', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
			$success = FALSE;
		}

		// grab any errors
		if ( $success ) {
			EE_Error::add_success( __('Attendee information submitted successfully.', 'event_espresso' ));
		}

		//this might be called while in admin and if it is then we don't want to do our normal steps.
		if ( is_admin() && ! EE_Registry::instance()->REQ->front_ajax ) {
			return $success;
		}

		//do action in case a plugin wants to do something with the data submitted in step 1.
		//passes EE_Single_Page_Checkout, and it's posted data
		do_action( 'AHEE__EE_Single_Page_Checkout__process_attendee_information__end', $this, $valid_data );
//		printr( $registration->answers(), '$registration->answers()  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//		die();
		$this->go_to_next_step( __FUNCTION__ );
		return TRUE;
	}



	/**
	 * 	_save_all_registration_information
	 * 	simply loops through the current transaction and saves all data for each registration
	 *
	 * 	@access private
	 * 	@return 	bool
	 */
	private function _save_all_registration_information() {
//		echo '<br/><h5 style="color:#2EA2CC;">'. __CLASS__ . '<span style="font-weight:normal;color:#0074A2"> -> </span>' . __FUNCTION__ . '() <br/><span style="font-size:9px;font-weight:normal;color:#666">' . __FILE__ . '</span>    <b style="font-size:10px;color:#333">  ' . __LINE__ . ' </b></h5>';
		// verify the transaction
		if ( $this->_transaction instanceof EE_Transaction ) {
			$this->_transaction->save();
			// grab the saved registrations from the transaction
			foreach ( $this->_transaction->registrations( array(), TRUE ) as $line_item_id => $registration ) {  //
//				printr( $registration, '$registration  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
				// verify object
				if ( $registration instanceof EE_Registration ) {
					// if the event's default_registration_status is set to "Approved", then make sure it's set as such
					if( $registration->event()->default_registration_status() == EEM_Registration::status_id_approved ) {
						$registration->set_status( EEM_Registration::status_id_approved );
					}
					// if this is a revisit OR first visit and event is NOT sold out
					if ( $this->_revisit  || ( ! $this->_revisit && ! ( $registration->event()->is_sold_out() || $registration->event()->is_sold_out( TRUE )))) {
						// EITHER a) first time thru SPCO so process ALL registrations
						// OR b) primary registrant is editing info, so process ALL registrations
						// OR b) another registrant is editing info, so ONLY process their registration
						if ( ! $this->_revisit || $this->_primary_revisit || ( $this->_revisit && $this->_reg_url_link == $registration->reg_url_link() )) {
							//set TXN ID
							if ( ! $registration->transaction_ID() ) {
								$registration->set_transaction_id( $this->_transaction->ID() );
							}
							// verify and save the attendee
							$attendee = $registration->attendee();
							if ( $attendee ) {
								if ( $attendee instanceof EE_Attendee ) {
	//								printr( $attendee, '$attendee  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
									$attendee->save();
//									echo '<h5 style="color:#2EA2CC;">$attendee->ID() : <span style="color:#E76700">' . $attendee->ID() . '</span><br/><span style="font-size:9px;font-weight:normal;color:#666">' . __FILE__ . '</span>    <b style="font-size:10px;color:#333">  ' . __LINE__ . ' </b></h5>';
									$registration->set_attendee_id( $attendee->ID() );
									if ( ! $registration->update_cache_after_object_save( 'Attendee', $attendee )) {
										EE_Error::add_error( __( 'The newly saved Attendee object could not be cached on the registration.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__);
										return FALSE;
									}
								} else {
									EE_Error::add_error( __( 'An invalid Attendee object was discovered when attempting to save your registration information.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__);
									return FALSE;
								}
							} else {
								EE_Error::add_error( __( 'No Attendee object was found when attempting to save your registration information.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__);
								return FALSE;
							}
							// save so that REG has ID
							$registration->save();
//							echo '<h5 style="color:#2EA2CC;">$registration->ID() : <span style="color:#E76700">' . $registration->ID() . '</span><br/><span style="font-size:9px;font-weight:normal;color:#666">' . __FILE__ . '</span>    <b style="font-size:10px;color:#333">  ' . __LINE__ . ' </b></h5>';
							// now save the answers
							foreach ( $registration->answers() as $cache_key => $answer ) {
//								echo '<h5 style="color:#2EA2CC;">$cache_key : <span style="color:#E76700">' . $cache_key . '</span><br/><span style="font-size:9px;font-weight:normal;color:#666">' . __FILE__ . '</span>    <b style="font-size:10px;color:#333">  ' . __LINE__ . ' </b></h5>';
//								echo '<h5 style="color:#2EA2CC;">$answer->question()->display_text() : <span style="color:#E76700">' . $answer->question()->display_text()  . '</span><br/><span style="font-size:9px;font-weight:normal;color:#666">' . __FILE__ . '</span>    <b style="font-size:10px;color:#333">  ' . __LINE__ . ' </b></h5>';
//								echo '<h5 style="color:#2EA2CC;">$answer->value() : <span style="color:#E76700">' . $answer->value()  . '</span><br/><span style="font-size:9px;font-weight:normal;color:#666">' . __FILE__ . '</span>    <b style="font-size:10px;color:#333">  ' . __LINE__ . ' </b></h5>';
								// verify object
								if ( $answer instanceof EE_Answer ) {
//									printr( $answer, '$answer  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
									$answer->set_registration( $registration->ID() );
									$answer->save();
//									echo '<h5 style="color:#2EA2CC;">$answer->ID() : <span style="color:#E76700">' . $answer->ID()  . '</span><br/><span style="font-size:9px;font-weight:normal;color:#666">' . __FILE__ . '</span>    <b style="font-size:10px;color:#333">  ' . __LINE__ . ' </b></h5>';
									if ( ! $registration->update_cache_after_object_save( 'Answer', $answer, $cache_key )) {
										EE_Error::add_error( __( 'The newly saved Answer object could not be cached on the registration.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__);
										return FALSE;
									}
								} else {
									EE_Error::add_error( __( 'An invalid Answer object was discovered when attempting to save your registration information.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__);
									return FALSE;
								}
							}
							if ( ! $this->_transaction->update_cache_after_object_save( 'Registration', $registration, $line_item_id )) {
								EE_Error::add_error( __( 'The newly saved Registration object could not be cached on the Transaction.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__);
								return FALSE;
							}
						}
					} else {
						EE_Error::add_error( apply_filters( 'FHEE__Single_Page_Checkout___save_all_registration_information__sold_out_events_msg', __( 'It appears that the event you are attempting to register for has just sold out. If you have already made a partial payment towards this event, please contact the event administrator for a refund.', 'event_espresso' )), __FILE__, __FUNCTION__, __LINE__);
						return FALSE;
					}

				} else {
					EE_Error::add_error( __( 'An invalid Registration object was discovered when attempting to save your registration information.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__);
					return FALSE;
				}
			}
		} else {
			EE_Error::add_error( __( 'A valid Transaction was not found when attempting to save your registration information.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__);
			return FALSE;
		}
		return TRUE;
	}



	/**
	 *    _finalize_attendee_information
	 *    this is the final step after a user  revisits the site to edit their attendee information
	 *    this gets called AFTER the _process_attendee_information() method above
	 *
	 * @access   private
	 * @return    void (redirect)
	 */
	private function _finalize_attendee_information() {

		if ( $this->_transaction instanceof EE_Transaction && $this->_continue_reg ) {
			// save everything
			$this->_save_all_registration_information();
			//grab notices
			$notices = EE_Error::get_notices(FALSE);
			// if it's all good...
			if ( ! isset( $notices['errors'] ) || empty( $notices['errors'] )) {
				$this->_thank_you_page_url = add_query_arg( array( 'e_reg_url_link' => $this->_reg_url_link ), get_permalink( EE_Registry::instance()->CFG->core->thank_you_page_id ));
				$response_data = array(
					'success' => isset( $notices['success'] ) ? $notices['success'] : '',
					'return_data' => array( 'redirect-to-thank-you-page' => $this->_thank_you_page_url )
				);
				$response_data = apply_filters( 'FHEE__EE_Single_Page_Checkout__JSON_response', $response_data );
				if ( EE_Registry::instance()->REQ->front_ajax ) {
					echo json_encode( $response_data );
					die();
				} else {
					wp_safe_redirect( $this->_thank_you_page_url );
					exit();
				}
			}
		}
		$this->go_to_next_step( __FUNCTION__ );
	}



	/**
	 * This processes the registration form from the admin and returns either the true or false depending on the success of the process.
	 *
	 * Note that this method handles not only validating the registration form but also saving to the database all the data in the session.
	 *
	 * @access  public
	 * @return mixed bool|int (either false on fail OR TXN id on success)
	 */
	public function process_registration_from_admin() {
		//nonce check was done in admin so no need to do here.
		//first lets validate the registration form
		$this->init_for_admin();
		//if failure in processing attendee info then let's get out early
		if ( ! $this->_process_attendee_information() ) {
			return FALSE;
		}
		// same deal when saving everything
		if ( ! $this->_save_all_registration_information() ) {
			return FALSE;
		}
		//all is good so let's continue with finalizing the registration.
		EE_Registry::instance()->SSN->set_session_data( array( 'transaction', NULL ));
		$this->_transaction->set_txn_session_data( EE_Registry::instance()->SSN->get_session_data() );
		$this->_cart->get_grand_total()->save_this_and_descendants_to_txn( $this->_transaction->ID() );
		//is this free event?
		if ( $this->_cart->get_grand_total()->total() == EEH_Template::format_currency( 0, TRUE ) ) {
			$this->_transaction->set_status( EEM_Transaction::complete_status_code );
		} else {
			$this->_transaction->set_status( EEM_Transaction::incomplete_status_code );
		}
		$this->_transaction->finalize( TRUE );
		EE_Registry::instance()->SSN->clear_session( __CLASS__, __FUNCTION__ );
		return $this->_transaction->ID();
	}






	/**
	 * 	process_payment_options
	 *
	 * 	@access private
	 * 	@return 	void
	 */
	private function _process_payment_options() {

		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		if ( $this->_continue_reg ) {
			$success = TRUE;
			if ( $this->_transaction instanceof EE_Transaction ) {
				// grab the saved registrations from the transaction
				foreach ( $this->_transaction->registrations( array(), TRUE ) as $registration ) {
					// verify object
					if ( $registration instanceof EE_Registration ) {
						// if event is sold out but this is NOT a revisit
						if ( ! ( $this->_revisit  || ( ! $this->_revisit && ! ( $registration->event()->is_sold_out() || $registration->event()->is_sold_out( TRUE ))))) {
							$success = FALSE;
						}
					} else {
						$success = FALSE;
					}
				}
			} else {
				$success = FALSE;
			}

			if ( $success ) {
				if ( EE_Registry::instance()->REQ->is_set('selected_gateway') && EE_Registry::instance()->REQ->get('selected_gateway') == 'payments_closed' ) {
					// requires pre-approval
					$success_msg = __( 'no payment required at this time.', 'event_espresso' );
					EE_Error::add_success( $success_msg, __FILE__, __FUNCTION__, __LINE__ );
				} else if ( $this->_transaction->total() > 0 ) {
					// PAID EVENT !!!  BOO  : (
					EE_Registry::instance()->load_model( 'Gateways' )->process_gateway_selection();
				} else if (  ! $this->_reg_url_link ) {
					// FREE EVENT !!! YEAH : )
					$success_msg = __( 'no payment required.', 'event_espresso' );
					EE_Error::add_success( $success_msg, __FILE__, __FUNCTION__, __LINE__ );
				}
			} else {
				EE_Error::add_error( apply_filters( 'FHEE__Single_Page_Checkout___process_payment_options__sold_out_events_msg', __( 'It appears that the event you are attempting to register for has just sold out. If you have already made a partial payment towards this event, please contact the event administrator for a refund.', 'event_espresso' )), __FILE__, __FUNCTION__, __LINE__);
			}
		}

		$this->go_to_next_step( __FUNCTION__ );

	}



	/**
	 *    _finalize_payment_options
	 *    this is the final step after a user  revisits the site to retry a payment
	 *
	 * @access   private
	 * @return    void (redirect)
	 */
	private function _finalize_payment_options() {

		if ( $this->_continue_reg ) {

			$this->_transaction->save();
			$this->_cart->get_grand_total()->save_this_and_descendants_to_txn( $this->_transaction->ID() );

			do_action ('AHEE__EE_Single_Page_Checkout__process_finalize_registration__before_gateway', $this->_transaction );
			// attempt to perform transaction via payment gateway
			$response = EE_Registry::instance()->load_model( 'Gateways' )->process_payment_start( $this->_cart->get_grand_total(), $this->_transaction );
			$this->_thank_you_page_url = add_query_arg( array( 'e_reg_url_link' => $this->_reg_url_link ), get_permalink( EE_Registry::instance()->CFG->core->thank_you_page_id ));

			if ( isset( $response['msg']['success'] )) {
				$response_data = array(
					'success' => $response['msg']['success'],
					'return_data' => array( 'redirect-to-thank-you-page' => $this->_thank_you_page_url )
				);
				$response_data = apply_filters( 'FHEE__EE_Single_Page_Checkout__JSON_response', $response_data );
				if ( EE_Registry::instance()->REQ->front_ajax ) {
					echo json_encode( $response_data );
					die();
				} else {
					wp_safe_redirect( $this->_thank_you_page_url );
					exit();
				}
			} else {
				EE_Error::add_error( $response['msg']['error'],__FILE__,__FUNCTION__,__LINE__);
			}
		}
		$this->go_to_next_step( __FUNCTION__ ); //, $callback = FALSE, $callback_param = FALSE
	}





	/**
	 * 	_process_finalize_registration
	 *
	 * 	@access private
	 * 	@return 	void
	 */
	private function _process_finalize_registration() {

		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );

		// save everything
		if ( $this->_continue_reg && $this->_save_all_registration_information() ) {
//			echo '<h2 style="color:#E76700;">_process_finalize_registration<br/><span style="font-size:9px;font-weight:normal;color:#666">' . __FILE__ . '</span>    <b style="font-size:10px;color:#333">  ' . __LINE__ . ' </b></h2>';
			// save TXN data to the cart
			$this->_cart->get_grand_total()->save_this_and_descendants_to_txn( $this->_transaction->ID() );

			do_action( 'AHEE__EE_Single_Page_Checkout__process_finalize_registration__before_gateway', $this->_transaction );

			// if Default REG Status is set to REQUIRES APPROVAL... then payments are NOT allowed
			if ( EE_Registry::instance()->REQ->is_set('selected_gateway') && EE_Registry::instance()->REQ->get('selected_gateway') == 'payments_closed' ) {
//				echo '<h2 style="color:#E76700;">payments_closed<br/><span style="font-size:9px;font-weight:normal;color:#666">' . __FILE__ . '</span>    <b style="font-size:10px;color:#333">  ' . __LINE__ . ' </b></h2>';
				// set TXN Status to Open
				$this->_transaction->set_status( EEM_Transaction::incomplete_status_code );
				$this->_transaction->save();
				$this->_transaction->finalize();
				$notices = EE_Error::get_notices(FALSE);
				$response = array(
					'msg' => array(
						'success' => isset( $notices['success'] ) ? $notices['success'] : '',
						'errors' => isset( $notices['errors'] ) ? $notices['errors'] : '',
					)
				);
				$this->_thank_you_page_url = add_query_arg(
					array( 'e_reg_url_link' => $this->_transaction->primary_registration()->reg_url_link() ),
					get_permalink( EE_Registry::instance()->CFG->core->thank_you_page_id )
				);

			// Default REG Status is set to PENDING PAYMENT OR APPROVED, and payments are allowed
			} else {
				// attempt to perform transaction via payment gateway
				$response = EE_Registry::instance()->load_model( 'Gateways' )->process_payment_start( $this->_cart->get_grand_total(), $this->_transaction );
				$this->_thank_you_page_url = $response['forward_url'];
			}

			if ( isset( $response['msg']['success'] )) {
				$response_data = array(
					'success' => $response['msg']['success'],
					'return_data' => array( 'redirect-to-thank-you-page' => $this->_thank_you_page_url )
				);
				$response_data = apply_filters( 'FHEE__EE_Single_Page_Checkout__JSON_response', $response_data );
//				printr( $response_data, '$response_data  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//				echo '<h4>thank_you_page_url : ' . $this->_thank_you_page_url . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';

				if ( EE_Registry::instance()->REQ->front_ajax ) {
					echo json_encode( $response_data );
					die();
				} else {
					wp_safe_redirect( $this->_thank_you_page_url );
					exit();
				}

			} else {
				EE_Error::add_error( $response['msg']['error'], __FILE__, __FUNCTION__, __LINE__ );
			}
//			printr( $response, '$response  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		}

		$this->go_to_next_step( __FUNCTION__ );

	}





	/**
	 * 	display_registration_footer
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public static function display_registration_footer() {
		if ( apply_filters( 'FHEE__EE_Front__Controller__show_reg_footer', EE_Registry::instance()->CFG->admin->show_reg_footer ) ) {
			EE_Registry::instance()->CFG->admin->affiliate_id = ! empty( EE_Registry::instance()->CFG->admin->affiliate_id ) ? EE_Registry::instance()->CFG->admin->affiliate_id : 'default';
			$url = add_query_arg( array( 'ap_id' => EE_Registry::instance()->CFG->admin->affiliate_id ), 'http://eventespresso.com/' );
			$url = apply_filters( 'FHEE__EE_Front_Controller__registration_footer__url', $url );
			echo apply_filters( 'FHEE__EE_Front_Controller__display_registration_footer','<div id="espresso-registration-footer-dv"><a href="' . $url . '" title="Event Registration Powered by Event Espresso" target="_blank">Event Registration and Ticketing</a> Powered by <a href="' . $url . '" title="Event Espresso - Event Registration and Management System for WordPress" target="_blank">Event Espresso</a></div>' );
		}
	}



	/**
	 *        _process_return_to_reg_step_query_args
	 *
	 * @access 	private
	 * @param 	$args
	 * @return 	array
	 */
	private function _process_return_to_reg_step_query_args( $args ) {
		$remove = array( 'ajax_action', 'espresso_ajax', 'noheader', 'spco-go-to-next-step-sbmt-btn' );
		foreach ( $_POST as $key => $value ) {
			if ( in_array( $key, $remove )) {
				unset( $_POST[ $key ] );
			}
		}
		return array_merge( $_POST, $args );
	}



	/**
	 *   handle ajax message responses and redirects
	 *
	 * @access public
	 * @param string $prev_step
	 * @param bool   $callback
	 * @param bool   $callback_param
	 * @return void
	 */
	public function go_to_next_step( $prev_step = '', $callback = FALSE, $callback_param = FALSE ) {

		$no_errors = TRUE;
		switch ( $this->_next_step ) {
			case 'registration_confirmation' :
				$callback = '_go_to_registration_confirmation_ajax_response';
			break;
			case 'finalize_registration' :
				$callback = $this->_revisit ? '_finalize_' . $this->_current_step : '_process_finalize_registration';
			break;
		}

		$notices = EE_Error::get_notices(FALSE);
		$success_msg = isset( $notices['success'] ) ? $notices['success'] : FALSE;
		$error_msg = isset( $notices['errors'] ) ? $notices['errors'] : FALSE;

		if ( $prev_step == $callback && ! $error_msg ) {
			$error_msg = __('A recursive loop was detected and the registration process was halted.', 'event_espresso');
			EE_Error::add_error( $error_msg, __FILE__, __FUNCTION__, __LINE__ );
		}

		// check for valid callback function
		$valid_callback = $callback !== FALSE && $callback != '' && method_exists( $this, $callback ) ? TRUE : FALSE;

		if ( $success_msg && ! $error_msg ) {
			// if this is an ajax request AND a callback function exists
			if ( EE_Registry::instance()->REQ->ajax  && $valid_callback ) {
				// send data through to the callback function
				$this->$callback( $callback_param, $success_msg );
			} elseif ( EE_Registry::instance()->REQ->ajax ) {
				// just send the ajax
				$json_response = apply_filters( 'FHEE__EE_Single_Page_Checkout__JSON_response', array( 'success' => $success_msg ));
				echo json_encode( $json_response );
				die();
			} else {
				// not ajax, so return TRUE to advance to next step
				$no_errors = TRUE;
			}
		} elseif ( $error_msg ) {

			if ( EE_Registry::instance()->REQ->ajax ) {
				$json_response = apply_filters( 'FHEE__EE_Single_Page_Checkout__JSON_response', array( 'error' => $error_msg ));
				echo json_encode( $json_response );
				die();
			} else {
				// not ajax, so return FALSE to repeat the current step while displaying the error notice
				$no_errors = FALSE;
			}
		}
		// store notices in a transient
		EE_Error::get_notices( FALSE, TRUE, TRUE );
		// no errors, means progress to next step, but if next step is empty, then redirect to thank you page. errors means return to page we came from
		$next_step = $no_errors ? $this->_next_step : str_replace( 'process_', '', $this->_current_step );
		if ( $next_step ) {
			$args = $this->_process_return_to_reg_step_query_args( array( 'ee' => '_register', 'step' => $next_step ));
			$redirect = add_query_arg( $args, $this->_reg_page_base_url );
		} else {
			$redirect = $this->_thank_you_page_url;
		}
//		echo '<h4>$prev_step : ' . $prev_step . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		echo '<h4>$this->_current_step : ' . $this->_current_step . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		echo '<h4>$this->_next_step : ' . $this->_next_step . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		echo '<h4>$valid_callback : ' . $valid_callback . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		echo '<h4>$callback : ' . $callback . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		echo '<h4>$success_msg : ' . $success_msg . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		echo '<h4>$error_msg : ' . $error_msg . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		echo '<h4>EE_Registry::instance()->REQ->ajax : ' . EE_Registry::instance()->REQ->ajax . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		echo '<h4>$this->_revisit : ' . $this->_revisit . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		echo '<h4>$no_errors : ' . $no_errors . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		echo '<h4>$next_step : ' . $next_step . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		echo '<h4>$redirect : ' . $redirect . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		printr( EE_Registry::instance()->REQ, 'EE_Registry::instance()->REQ  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

		wp_safe_redirect( $redirect );
		exit();
	}








}




// End of file EED_Single_Page_Checkout.module.php
// Location: /modules/single_page_checkout/EED_Single_Page_Checkout.module.php
