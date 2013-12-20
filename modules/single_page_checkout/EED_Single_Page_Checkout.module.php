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
	// pass recaptcha?
	private $_continue_reg = TRUE;
	// array of tempate paths
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
	 *		@singleton method used to instantiate class object
	 *		@access public
	 *		@return class instance
	 */	
	public static function instance ( ) {
		// check if class object is instantiated
		if ( self::$_instance === NULL  or ! is_object( self::$_instance ) or ! ( self::$_instance instanceof EED_Single_Page_Checkout )) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}




	/**
	 * 	set_hooks - for hooking into EE Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks() {
		add_action( 'wp_loaded', array( 'EED_Single_Page_Checkout', 'set_definitions' ), 2 );
		add_filter( 'FHEE_load_EE_messages', '__return_true');
		// configure the reg steps array
		EED_Single_Page_Checkout::setup_reg_steps_array();
		// set routing
		EE_Config::register_route( 'register', 'EED_Single_Page_Checkout', 'run' );
		foreach ( self::$_reg_steps as $reg_step => $reg_step_details ) {
			EE_Config::register_route( $reg_step, 'EED_Single_Page_Checkout', $reg_step_details['process_func'] );
		}
		//EE_Config::register_route( 'finalize_registration', 'EED_Single_Page_Checkout', 'finalize_registration' );
	}



	/**
	 * 	set_hooks_admin - for hooking into EE Admin Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks_admin() {
		add_action( 'wp_loaded', array( 'EED_Single_Page_Checkout', 'set_definitions' ), 2 );
		add_filter( 'FHEE_load_EE_messages', '__return_true');
		// configure the reg steps array
		EED_Single_Page_Checkout::setup_reg_steps_array();
		// set ajax hooks
		foreach ( self::$_reg_steps as $reg_step => $reg_step_details ) {
			add_action( 'wp_ajax_espresso_' . $reg_step_details['process_func'], array( 'EED_Single_Page_Checkout', $reg_step_details['process_func'] ));
			add_action( 'wp_ajax_nopriv_espresso_' . $reg_step_details['process_func'], array( 'EED_Single_Page_Checkout', $reg_step_details['process_func'] ));
		}
//		add_action( 'wp_ajax_espresso_process_recaptcha_response', array( 'EED_Single_Page_Checkout', 'process_recaptcha_response' ));
//		add_action( 'wp_ajax_nopriv_espresso_process_recaptcha_response', array( 'EED_Single_Page_Checkout', 'process_recaptcha_response' ));
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
	 * 	get previous step from setup_reg_steps_array
	 *
	 *  @access 	private
	 *  @return 	array
	 */
	private function _get_prev_reg_step() {
		$prev = prev( self::$_reg_steps );
		next( self::$_reg_steps );
		return $prev; 
	}


	/**
	 * 	set next step
	 *
	 *  @access 	private
	 *  @return 	void
	 */
	private function _set_next_step() {
		reset( self::$_reg_steps );
		// set pointer to current step 
		while ( key( self::$_reg_steps ) != $this->_current_step ) {
			next( self::$_reg_steps );
		}
		// advance one more spot
		$this->_next_step = next( self::$_reg_steps ) ? key( self::$_reg_steps ) : 'finalize_registration';			
		// then back to current step
		prev( self::$_reg_steps );
	}




	/**
	 * 	ajax_process_registration_steps
	 */
	public static function process_attendee_information() {
//		echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		EED_Single_Page_Checkout::instance()->_current_step = 'attendee_information';
		EED_Single_Page_Checkout::instance()->init();
		EED_Single_Page_Checkout::instance()->_process_attendee_information();
	}
	
	
	public static function process_payment_options() {
//		echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		EED_Single_Page_Checkout::instance()->_current_step = 'payment_options';
		EED_Single_Page_Checkout::instance()->init();
		EED_Single_Page_Checkout::instance()->_process_payment_options();
	}
	
	
	public static function process_registration_confirmation() {
//		echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		EED_Single_Page_Checkout::instance()->_current_step = 'registration_confirmation';
		EED_Single_Page_Checkout::instance()->init();
		EED_Single_Page_Checkout::instance()->_process_registration_confirmation();
	}





	/**
	 * 	init - initial module setup
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function init() {
		// load classes
//		EE_Registry::instance()->load_model( 'Gateways' );
//		EE_Registry::instance()->load_core( 'Cart' );
//		$TXN_MDL = EE_Registry::instance()->load_model( 'Transaction' );
		if ( ! isset( EE_Registry::instance()->REQ )) {
			EE_Registry::instance()->load_core( 'Request_Handler' );
		}

		$this->_continue_reg = TRUE;
		// verify recaptcha
		if ( EE_Registry::instance()->REQ->is_set( 'recaptcha_response_field' )) {
			$this->_continue_reg = $this->process_recaptcha_response();
		}

		$this->set_templates();
		$this->_reg_page_base_url = get_permalink( EE_Registry::instance()->CFG->core->reg_page_id );
		// grab what step we're on
		$this->_current_step = ! empty( $this->_current_step )  ? $this->_current_step : 'attendee_information';
		$this->_current_step = EE_Registry::instance()->REQ->is_set( 'step' ) ? EE_Registry::instance()->REQ->get( 'step' ) : $this->_current_step;
		// and the next step
		$this->_set_next_step();
		// returning from the thank you page ?
		$this->_reg_url_link = EE_Registry::instance()->REQ->is_set( 'e_reg_url_link' ) ? EE_Registry::instance()->REQ->get( 'e_reg_url_link' ) : FALSE;		
		// if reg_url_link is present in the request, then we are only being sent back to SPCO to retry the payment 
		if ( $this->_reg_url_link ) {
			// let's get that transaction data
			$this->_transaction = EE_Registry::instance()->load_model( 'Transaction' )->get_transaction_from_reg_url_link();
			// and get the cart that was used in the original txn
			$this->_cart = EE_Cart::get_cart_from_txn( $this->_transaction );
		} else {
			$this->_transaction = EE_Registry::instance()->SSN->get_session_data( 'transaction' );
			$this->_cart = EE_Registry::instance()->load_core( 'Cart' );
		}

		// verify cart
		if ( ! $this->_cart instanceof EE_Cart ) {			
			$this->_cart = EE_Registry::instance()->load_core( 'Cart' );
		}
		// verify transaction
		if ( ! $this->_transaction instanceof EE_Transaction ) {
			$this->_initialize_transaction();
		}
		// and verify registrations have been set
		if ( $this->_transaction->registrations() == NULL ) {
			$this->_initialize_registrations();
		}
		
//		printr( $this->_transaction->registrations(), '$this->_transaction->registrations()  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//		if ( ! EE_Registry::instance()->REQ->front_ajax ) {
//			d( $this->_transaction );
//			d( $this->_cart );
//		}
		
		// make sure reg steps array is setup
		if ( empty( self::$_reg_steps )) {
			EED_Single_Page_Checkout::setup_reg_steps_array();
		}
		
		if ( $this->_transaction->is_completed() || $this->_transaction->is_overpaid() ) {
			unset( self::$_reg_steps['payment_options'] );
		}
		
		add_action( 'wp_enqueue_scripts', array( 'EED_Single_Page_Checkout', 'translate_js_strings' ), 1 );
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

		$this->_transaction = EE_Registry::instance()->SSN->get_session_data( 'transaction' );
		if ( ! $this->_transaction instanceof EE_Transaction ) {
			$this->_initialize_transaction();
		}

		//verify registrations have been set
		$registrations = $this->_transaction->registrations();
		if ( empty( $registrations )) {
			$this->_initialize_registrations();
		}
			
	}




	/**
	 * 	run
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function run( $WP ) {

		$this->init();
		// load css and js
		add_filter( 'FHEE_load_css', '__return_true' );
		add_filter( 'FHEE_load_js', '__return_true' );
		add_action( 'wp_enqueue_scripts', array( 'EED_Single_Page_Checkout', 'wp_enqueue_scripts' ), 10 );
		$this->registration_checkout();

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
		EE_Registry::$i18n_js_strings['invalid_coupon'] = __('We\'re sorry but that coupon code does not appear to be vaild. If this is incorrect, please contact the site administrator.', 'event_espresso');
		EE_Registry::$i18n_js_strings['required_field'] = __(' is a required field. Please enter a value for this field and all other required fields before preceeding.', 'event_espresso');
		EE_Registry::$i18n_js_strings['reg_step_error'] = __('This registration step could not be completed. Please refresh the page and try again.', 'event_espresso');
		EE_Registry::$i18n_js_strings['answer_required_questions'] = __('You need to answer all required questions before you can proceed.', 'event_espresso');
		EE_Registry::$i18n_js_strings['enter_valid_email'] = __('You must enter a valid email address.', 'event_espresso');
		EE_Registry::$i18n_js_strings['valid_email_and_questions'] = __('You must enter a valid email address and answer all other required questions before you can proceed.', 'event_espresso');
		EE_Registry::$i18n_js_strings['language'] = get_bloginfo( 'language' );
	}



	/**
	 * 		wp_enqueue_scripts
	 *
	 * 		@access 		public
	 * 		@return 		void
	 */
	public static function wp_enqueue_scripts() {
		wp_register_style( 'single_page_checkout', SPCO_ASSETS_URL . 'single_page_checkout.css', array(), EVENT_ESPRESSO_VERSION );
		wp_enqueue_style( 'single_page_checkout' );
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
		// create new TXN
		$this->_transaction = EE_Transaction::new_instance( array( 
				'TXN_timestamp' => current_time('mysql'),
				'TXN_total' => $this->_cart->get_cart_grand_total(), 
				'TXN_paid' => 0, 
				'STS_ID' => EEM_Transaction::incomplete_status_code,
				'TXN_tax_data' => $this->_cart->get_taxes_line_item()->children()
		));
	}


	/**
	 * 	adds related EE_Registration objects for each ticket in the cart to the current EE_Transaction object
	 *
	 * 	@access private
	 * 	@return 	void
	 */
	private function _initialize_registrations() {
		//d($this->_cart->all_ticket_quantity_count());
		if ( $this->_transaction instanceof EE_Transaction ) {
			$att_nmbr = 0;
			$total_items = $this->_cart->all_ticket_quantity_count();
			// now let's add the cart items to the $transaction
			foreach ( $this->_cart->get_tickets() as $item ) {
				// grab the related ticket object for this lient_item
				$ticket = $item->ticket();
				if ( ! $ticket instanceof EE_Ticket ){
					EE_Error::add_error(sprintf(__("Line item %s did not contain a valid ticket", "event_espresso"),$item->ID()), __FILE__, __FUNCTION__, __LINE__);
					break;
				}
				$first_datetime = $ticket->get_first_related( 'Datetime' );
				if ( ! $first_datetime instanceof EE_Datetime ){
					EE_Error::add_error(sprintf(__("The ticket (%s) is not associated with any valid datetimes.", "event_espresso"),$ticket->name()), __FILE__, __FUNCTION__, __LINE___);
					continue;
				}
				$event = $first_datetime->get_first_related( 'Event' );
				if ( ! $event instanceof EE_Event ){
					EE_Error::add_error(sprintf(__("The ticket (%s) is not associated with a valid event.", "event_espresso"),$ticket->name()),__FILE__,__FUNCTION__,__LINE__);
					continue;
				}
				//do the following for each ticket of this type they selected
				for ( $x = 1; $x <= $item->quantity(); $x++ ) {
					$att_nmbr++;
					$reg_url_link = $att_nmbr . '-' . $item->code();
					
//					// TODO: verify that $event->default_registration_status() is editable in admin event editor, then uncomment and use the following for STS_ID
//					$event_default_registration_status = $event->default_registration_status();
//					$STS_ID = ! empty( $event_default_registration_status ) ? $event_default_registration_status : EE_Registry::instance()->CFG->registration->default_STS_ID;
					// now create a new registration for the ticket				
			 		$registration = EE_Registration::new_instance( array( 
						'EVT_ID' => $event->ID(),
						'TXN_ID' => $this->_transaction->ID(),
						'TKT_ID' => $ticket->ID(),
						'STS_ID' => EE_Registry::instance()->CFG->registration->default_STS_ID,
						'REG_date' => $this->_transaction->datetime(),
						'REG_final_price' => $ticket->price(),
						'REG_session' => EE_Registry::instance()->SSN->id(),
						'REG_count' => $att_nmbr,
						'REG_group_size' => $total_items,
						'REG_url_link'	=> $reg_url_link
					));
					$registration->_add_relation_to( $event, 'Event', array(), $event->ID() );
					$registration->_add_relation_to( $item->ticket(), 'Ticket', array(), $item->ticket()->ID() );
					$this->_transaction->_add_relation_to( $registration, 'Registration', array(), $reg_url_link );
				}					
			}
			EE_Registry::instance()->SSN->set_session_data( array( 'transaction' => $this->_transaction ));
			EE_Registry::instance()->SSN->update();

//			echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		}

	}



	/**
	 * 		load and display the Registration Single Page Checkout
	 *
	 * 		@access 		public
	 * 		@return 		void
	 */
	public function registration_checkout() {

		do_action('AHEE_log', __FILE__, __FUNCTION__, '');
		//d($this->_cart);
		EE_Registry::instance()->load_helper( 'Form_Fields' );
		EE_Registry::instance()->load_helper( 'Template' );
		EE_Registry::instance()->load_class( 'Question_Form_Input', array(), FALSE, FALSE, TRUE );

		$template_args = array();
		$template_args['css_class'] = '';
		$template_args['confirmation_data'] = '';

		$event_queue = array();
		$total_items = 0;
		$ticket_count = array();

		$additional_event_attendees = array();
		$events_requiring_pre_approval = array();
		$events_that_use_coupon_codes = array();
		$events_that_use_groupon_codes = array();
		$template_args['reg_page_discounts_dv_class'] = 'hidden';
		$template_args['additional_attendee_reg_info'] = NULL;
		
		$template_args['whats_in_the_cart'] = '';

		$event_queue['title'] = __('Registrations', 'event_espresso');
		$attendee_headings = array();
		$additional_attendees = array();
		$additional_attendee_forms = FALSE;
			
		// grab the saved registrations from teh transaction				
		if ( $this->_transaction instanceof EE_Transaction && $this->_transaction->registrations() !== NULL ) {
			
			//d( $this->_transaction );
			$event_queue['has_items'] = TRUE;
			$attendee_questions = array();
			$prev_event = NULL;
			
			foreach ( $this->_transaction->registrations() as $registration ) {
				
				$line_item_ID = $registration->reg_url_link();	
				$event_queue['items'][ $line_item_ID ]['ticket'] = $registration->ticket();
				$event_queue['items'][ $line_item_ID ]['event'] = $registration->event();
				$total_items ++;
				$ticket_count[ $registration->ticket()->ID() ] = isset( $ticket_count[ $registration->ticket()->ID() ] ) ? $ticket_count[ $registration->ticket()->ID() ] + 1 : 1;

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
					$Questions = $Question_Group->get_many_related( 'Question', array( array( 'QST_admin_only' => 0, 'QST_deleted' => 0 ), 'order_by'=>array( 'QST_order' =>'ASC' )));
					foreach ( $Questions as $Question ) {
						// if this question was for an attendee detail, then check for that answer
						$answer_value = EEM_Answer::instance()->get_attendee_property_answer_value( $registration, $Question->ID() );
						if( $this->_reg_url_link || ! $answer_value ){
							$answer = EEM_Answer::instance()->get_one( array( array( 'QST_ID'=>$Question->ID(), 'REG_ID'=>$registration->ID() )));
						}
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
//					printr( $registration, '$registration  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

				add_filter( 'FHEE_form_field_label_html', array( $this, 'reg_form_form_field_label_wrap' ), 10, 1 );
				add_filter( 'FHEE_form_field_input_html', array( $this, 'reg_form_form_field_input__wrap' ), 10, 1 );
				$attendee_questions = EEH_Form_Fields::generate_question_groups_html2( $Question_Groups, $question_meta, 'div' );

				// show this attendee form?
				if ( empty( $attendee_questions )) {				
					$event_queue['items'][ $line_item_ID ]['additional_attendee_reg_info'] = '
						<input
								type="hidden"
								id="' . $line_item_ID . '-additional_attendee_reg_info"
								name="qstn[' . $line_item_ID . '][additional_attendee_reg_info]"
								value="0"
						/>' . "\n";
				} else {
					$additional_attendee_forms = $registration->count() == 1 ? FALSE : TRUE;
					$event_queue['items'][ $line_item_ID ]['additional_attendee_reg_info'] = '';
				}
				$event_queue['items'][ $line_item_ID ]['attendee_questions'] = $attendee_questions;



				// is this the primarary registrant ?
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

		$event_queue['empty_msg'] = __( 'Their appears to be nothing in your Event Queue.', 'event_espresso' );

		// PRE APPROVAL
		$template_args['events_requiring_pre_approval'] = '';

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

		$grand_total = $this->_cart->get_cart_grand_total();
		$grand_total = apply_filters( 'espresso_filter_hook_grand_total_after_taxes', $grand_total );
		$template_args['grand_total'] = EEH_Template::format_currency( $grand_total );
		
		$cart_total_before_tax = $this->_cart->get_cart_total_before_tax();
		$template_args['payment_required'] = $cart_total_before_tax > 0 ? TRUE : FALSE;
		$template_args['sub_total'] = EEH_Template::format_currency( $cart_total_before_tax );
		$template_args['taxes'] = $this->_cart->get_taxes_line_item()->children();
		
		$template_args['total_items'] = $event_queue['total_items'] = $total_items;
//	d( $event_queue );
		$template_args['event_queue'] = $event_queue;
		$template_args['images_dir_url'] = EE_GLOBAL_ASSETS_URL . 'images/';
		$template_args['reg_url_link'] = $this->_reg_url_link;

		$template_args['return_url'] = add_query_arg( array('ee' => 'event_queue'), $this->_reg_page_base_url );
		$template_args['update_url'] = add_query_arg( array('ee' => 'update_event_queue'), $this->_reg_page_base_url );
		$template_args['register_url'] = add_query_arg( array('ee' => 'register'), $this->_reg_page_base_url );
		$template_args['event_queue_url'] = add_query_arg( array('ee' => 'event_queue'), $this->_reg_page_base_url );

		$template_args['confirmation_data'] = $this->_current_step == 'registration_confirmation' ? $this->_registration_confirmation() : '';
		
		if ( $this->_reg_url_link ) {
			// YES! Save Registration Details
			$confirmation_btn_text = sprintf( __('YES!%1$sSave%1$sRegistration%1$sDetails', 'event_espresso'), '&nbsp;' );
		} else {
			// YES! Finalize Registration
			$confirmation_btn_text = sprintf( __('YES!%1$sFinalize%1$sRegistration', 'event_espresso'), '&nbsp;' );
		}		
		// grand total less than paid but greater than zero ?
		if ( $grand_total < $this->_transaction->paid() && $grand_total > 0 ) {
			// owing money
			$confirmation_btn_text = $confirmation_btn_text . sprintf( 
				// & Proceed to Payment
				__('%1$s%2$s%1$sProceed%1$sto%1$sPayment', 'event_espresso'),
				'&nbsp;',  // %1$s
				'&amp;'	// %2$s
			);
		}		
		add_action( 'AHEE__SPCO__after_reg_step_form', array( $this, 'add_extra_finalize_registration_inputs' ), 10, 2 ); 

		
		$registration_steps = '';
		$step_nmbr = 1;
		// set pointer to first step
		reset( self::$_reg_steps );
		// loop through steps
		while ( $reg_step_details = current( self::$_reg_steps )) {
			$reg_step = key( self::$_reg_steps );
			$edit_lnk_class = $this->_current_step == $reg_step ? ' hidden' : '';
			$edit_lnk_url = add_query_arg( array( 'ee' => 'register', 'step' => $reg_step_details['display_func'] ), $this->_reg_page_base_url );
			$step_dv_class = $this->_current_step == $reg_step ? '' : ' hidden';
			$reg_step_form_url = add_query_arg( array( 'ee' => 'register', 'step' => $reg_step_details['process_func'] ), $this->_reg_page_base_url );
			$next = $this->_get_next_reg_step();
			//d( $next );
			$next_step = $next ? $next['display_func'] : 'finalize_registration';
			$next_step_text = $next ? sprintf( __('Proceed%1$sto%1$s', 'event_espresso'), '&nbsp;' ) . $next['name'] : $confirmation_btn_text;
			
			$step_args = array_merge(
				$template_args, 
				array( 
					'step' => $reg_step, 
					'step_nmbr' => $step_nmbr, 
					'edit_lnk_class' => $edit_lnk_class, 
					'edit_lnk_url' => $edit_lnk_url,
					'step_dv_class' => $step_dv_class, 
					'reg_step_form_url' => $reg_step_form_url,
					'reg_step_ajax_action' => $reg_step_details['process_func'],
					'next_step' => $next_step,
					'next_step_text' => $next_step_text
				) 
			);
			
			if ( $reg_step == 'payment_options' ) {
				
				EE_Registry::instance()->load_model( 'Gateways' );
				// has gateway been set by no-js user?
				if ( EE_Registry::instance()->REQ->is_set( 'payment' )) {
					$payment = sanitize_text_field( EE_Registry::instance()->REQ->get( 'payment' ));
				}
				if ( ! empty( $payment )) {				
					if (EE_Registry::instance()->LIB->EEM_Gateways->selected_gateway() != $payment ) {
						EE_Registry::instance()->LIB->EEM_Gateways->set_selected_gateway( $payment );
					} else {
						EE_Registry::instance()->LIB->EEM_Gateways->unset_selected_gateway( $payment );
					}
				}
				$template_args['selected_gateway'] = EE_Registry::instance()->LIB->EEM_Gateways->selected_gateway();

			} else  {
				$template_args['selected_gateway'] = '';
			}
			add_action( 'AHEE__before_spco_whats_next_buttons', array( 'EED_Single_Page_Checkout', 'display_recaptcha' ), 10, 2 );	
			
			//d( $step_args );
			$registration_steps .= EEH_Template::display_template( $this->_templates[ $reg_step_details['template'] ], $step_args, TRUE);
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
			'registration_steps' => $registration_steps
		);
		//d( $wrapper_args );
		EE_Registry::instance()->REQ->add_output( EEH_Template::display_template( $this->_templates['registration_page_wrapper'], $wrapper_args, TRUE ));
	}




	/**
	 * display_recaptcha
	 *
	 * @access public
	 * @return string html
	 */
	public static function display_recaptcha( $current_step, $next_step ) {

		if ( EE_Registry::instance()->CFG->registration->use_captcha && ( empty($_REQUEST['edit_details']) || $_REQUEST['edit_details'] != 'true') && !is_user_logged_in()) {

			if (!function_exists('recaptcha_get_html')) {
				require_once( EE_THIRD_PARTY . 'recaptchalib.php' );
			}

			// the error code from reCAPTCHA, if any
			$error = null;
			echo '
<script type="text/javascript">
/* <! [CDATA [ */
var RecaptchaOptions = { theme : "' . EE_Registry::instance()->CFG->registration->recaptcha_theme . '", lang : "' . EE_Registry::instance()->CFG->registration->recaptcha_language . '" };
/*  ] ]>  */
</script>
<p class="reg-page-form-field-wrap-pg" id="spc-captcha">
' . __('Anti-Spam Measure: Please enter the following phrase', 'event_espresso') . '
' . recaptcha_get_html( EE_Registry::instance()->CFG->registration->recaptcha_publickey, $error, is_ssl() ? true : false ) . '
</p>
';
		}	
	}




	/**
	 * this generates the output for the registration form for manual registrations via the admin
	 *
	 * @access public
	 * @return string html
	 */
	public function registration_checkout_for_admin() {
		$this->init_for_admin();
		EE_Registry::instance()->load_helper( 'Form_Fields' );
		EE_Registry::instance()->load_helper( 'Template' );
		EE_Registry::instance()->load_class( 'Question_Form_Input', array(), FALSE, FALSE, TRUE );


		$template_args = array();
		$template_args['css_class'] = '';
		$template_args['confirmation_data'] = '';

		$event_queue = array();
		$total_items = 0;
		$ticket_count = array();


		$additional_event_attendees = array();
		$events_requiring_pre_approval = array();
		$events_that_use_coupon_codes = array();
		$events_that_use_groupon_codes = array();
		$template_args['reg_page_discounts_dv_class'] = 'hidden';
		$template_args['additional_attendee_reg_info'] = NULL;
		
		$template_args['whats_in_the_cart'] = '';

		$event_queue['title'] = __('Registrations', 'event_espresso');
		$attendee_headings = array();
		$additional_attendees = array();
		$additional_attendee_forms = FALSE;

		if ( $this->_transaction instanceof EE_Transaction && $this->_transaction->registrations() !== NULL ) {
				//d( $this->_transaction );
				$event_queue['has_items'] = TRUE;
				$attendee_questions = array();
				$prev_event = NULL;
				
				foreach ( $this->_transaction->registrations() as $registration ) {
					
					$line_item_ID = $registration->reg_url_link();

					$event_queue['items'][ $line_item_ID ]['ticket'] = $registration->ticket();
					$event_queue['items'][ $line_item_ID ]['event'] = $registration->event();
					$total_items += $registration->count();
					$ticket_count[ $registration->ticket()->ID() ] = isset( $ticket_count[ $registration->ticket()->ID() ] ) ? $ticket_count[ $registration->ticket()->ID() ] + 1 : 1;

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
						'order_by'=>array( 'QSG_order' => 'ASC' )
					));
					
					foreach ( $Question_Groups as $QSG_ID => $Question_Group ) {
						$Questions = $Question_Group->get_many_related( 'Question', array( 'order_by'=>array( 'QST_order'=>'ASC' )) );
						//d( $Questions );
						
						foreach ( $Questions as $Question ) {
							
							/*@var $Question EE_Question */
							$answer = EE_Answer::new_instance ( array( 
									'QST_ID'=> $Question->ID(),
									'REG_ID'=> $registration->ID()
								 ));
							$answer->cache( 'Question', $Question );
							$answer_cache_id =$Question->system_ID() != NULL ? $Question->system_ID() . '-' . $line_item_ID : $Question->ID() . '-' . $line_item_ID;
							$registration->cache( 'Answer', $answer, $answer_cache_id );
							$Question_Groups[ $QSG_ID ]->cache( 'Question', $Question );
						}		
					}

					add_filter( 'FHEE_form_field_label_html', array( $this, 'reg_form_form_field_label_wrap' ), 10, 1 );
					add_filter( 'FHEE_form_field_input_html', array( $this, 'reg_form_form_field_input__wrap' ), 10, 1 );
					
					$attendee_questions = EEH_Form_Fields::generate_question_groups_html2( $Question_Groups, $question_meta, 'div' );

					// show this attendee form?
					if ( empty( $attendee_questions )) {						
						$event_queue['items'][ $line_item_ID ]['additional_attendee_reg_info'] = '
							<input
									type="hidden"
									id="' . $line_item_ID . '-additional_attendee_reg_info"
									name="qstn[' . $line_item_ID . '][additional_attendee_reg_info]"
									value="0"
							/>' . "\n";
					} else {
						$additional_attendee_forms = $registration->count() == 1 ? FALSE : TRUE;
						$event_queue['items'][ $line_item_ID ]['additional_attendee_reg_info'] = '';
					}
					$event_queue['items'][ $line_item_ID ]['attendee_questions'] = $attendee_questions;



					// is this the primarary registrant ?
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
				
				if ( ! $this->_reg_url_link ) {
					EE_Registry::instance()->SSN->set_session_data( array( 'transaction' => $this->_transaction ));
				}
	
			} else {
				// empty
				$event_queue['has_items'] = FALSE;
			}

		$template_args['additional_event_attendees'] = $additional_event_attendees;
		$template_args['ticket_count'] = $ticket_count;
		$template_args['print_copy_info'] = $additional_attendee_forms;
		$grand_total = $this->_cart->get_cart_grand_total();
		$grand_total = apply_filters( 'espresso_filter_hook_grand_total_after_taxes', $grand_total );
		$template_args['grand_total'] = EEH_Template::format_currency( $grand_total );
		
		$cart_total_before_tax = $this->_cart->get_cart_total_before_tax();
		$template_args['payment_required'] = $cart_total_before_tax > 0 ? TRUE : FALSE;
		$template_args['sub_total'] = EEH_Template::format_currency( $cart_total_before_tax );

		
//		$template_args['taxes'] = EE_Taxes::calculate_taxes( $grand_total );
		$template_args['taxes'] = $this->_cart->get_taxes_line_item()->children();
		
		$template_args['total_items'] = $event_queue['total_items'] = $total_items;
		$template_args['event_queue'] = $event_queue;
		$template_args['images_dir_url'] = EE_GLOBAL_ASSETS_URL . 'images/';
		$template = REG_TEMPLATE_PATH . 'registration_page_registration_questions.template.php';
		return EEH_Template::display_template( $template, $template_args, TRUE );
	}






	/**
	 * 	add_extra_finalize_registration_inputs
	 *
	 * 	@access 	public
	 * 	@param 	string 	$label
	 * 	@return 		string
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
	 * 	@return 		string
	 */
	public function reg_form_form_field_label_wrap( $label ) {
		return '<div class="reg-page-form-field-wrap-pg">' . $label;		
	}




	/**
	 * 	reg_form_form_field_input__wrap
	 *
	 * 	@access 	public
	 * 	@param 	string 	$label
	 * 	@return 		string
	 */
	public function reg_form_form_field_input__wrap( $input ) {
		return $input . '</div>';		
	}




	function sanitize_text_field_for_array_walk( &$item, &$key ) {
		$item = sanitize_text_field( $item );
	}


	/**
	 * 	_process_attendee_information
	 *
	 * 	@access private
	 * 	@return 	void (redirect)
	 */
	private function _process_attendee_information() {
		do_action('AHEE_log', __FILE__, __FUNCTION__, '');

		$success_msg = FALSE;
		$error_msg = FALSE;
		// empty container
		$valid_data = array();
		
		if ( EE_Registry::instance()->REQ->is_set( 'qstn' )) {
			$valid_data = apply_filters( 'FHEE__EE_Single_Page_Checkout__process_attendee_information__REQ', EE_Registry::instance()->REQ->get( 'qstn' ));			
			// loop through post data and sanitize all elements
			array_walk_recursive( $valid_data, array( $this, 'sanitize_text_field_for_array_walk' ));
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
			$primary_attendee['line_item_id'] = NULL;
			if ( isset( $valid_data['primary_attendee'] )) {
				$primary_attendee['line_item_id'] =  ! empty( $valid_data['primary_attendee'] ) ? $valid_data['primary_attendee'] : FALSE;
				unset( $valid_data['primary_attendee'] );
			}
			
			EE_Registry::instance()->load_model( 'Attendee' );
			// attendee counter
			$att_nmbr = 0;

			if ( $this->_continue_reg ) {
				if ( $this->_transaction instanceof EE_Transaction && $this->_continue_reg ) {
					$registrations = $this->_transaction->registrations();
					if ( ! empty( $registrations )) {
						// grab the saved registrations from the transaction				
						foreach ( $this->_transaction->registrations()  as $registration ) {	
							// verify object
							if ( $registration instanceof EE_Registration ) {
								// reg_url_link / line item ID exists ?
								if ( $line_item_id = $registration->reg_url_link() ) {
									// Houston, we have a registration!
									$att_nmbr++;
									// grab related answer objects
									$answers = $registration->answers();
//									printr( $answers, '$answers  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
									$attendee_data = array();
									// do we need to copy basic info from primary attendee ?
									$copy_primary = isset( $valid_data[ $line_item_id ]['additional_attendee_reg_info'] ) && absint( $valid_data[ $line_item_id ]['additional_attendee_reg_info'] ) === 0 ? TRUE  : FALSE;
									unset( $valid_data[ $line_item_id ]['additional_attendee_reg_info'] );
									if ( isset( $valid_data[ $line_item_id ] )) {
										// now loop through our array of valid post data && process attendee reg forms
										foreach ( $valid_data[ $line_item_id ] as $form_input => $input_value ) {											
											// check for critical inputs
											if ( empty( $input_value )) {
												
												switch( $form_input ) {
													case 'fname' :
														EE_Error::add_error( __( 'First Name is a required value.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
													break;
													case 'lname' :
														EE_Error::add_error( __( 'Last Name is a required value.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
													break;
													case 'email' :
														EE_Error::add_error( __( 'Email Address is a required value.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
													break;
												}
												
											} elseif ( $form_input == 'email' ) {
												// clean the email address
												$valid_email = sanitize_email( $input_value );
												// check if it matches
												if ( $input_value != $valid_email ) {
													// whoops!!!
													EE_Error::add_error( __( 'Please enter a valid email address.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
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
//											echo '<h4>$answer_cache_id : ' . $answer_cache_id . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//											echo '<h4>$answer_is_obj : ' . $answer_is_obj . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
										
											$attendee_property = FALSE;
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
													$attendee_property = property_exists( 'EE_Attendee', '_ATT_' . $form_input ) ? TRUE : FALSE;
													$form_input = $attendee_property ? 'ATT_' . $form_input : $form_input;
											}
						
//											echo '<h4>' . $form_input . ': ' . $input_value . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//											echo '<h4>attendee_property: ' . $attendee_property . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
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
												EE_Error::add_error( __( 'Unable to save registration form data.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
											}

										}  // end of foreach ( $valid_data[ $line_item_id ] as $form_input => $input_value ) 
										
									} else {
										EE_Error::add_error( __( 'No form data or invalid data was encountered while attempting to process the registration form.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
									}

									// this registration does not require additional attendee information ?
									if ( $copy_primary && $att_nmbr > 1 ) {
										// add relation to new attendee
										$registration->_add_relation_to( $primary_attendee_obj, 'Attendee' );
	//									echo '$copy_primary attendee <br/>';
									} else {					
										// does this attendee already exist in the db ? we're searching using a combination of first name, last name, AND email address
										$existing_attendee = EE_Registry::instance()->LIB->EEM_Attendee->find_existing_attendee( array(
											'ATT_fname' => isset( $attendee_data['ATT_fname'] ) ? $attendee_data['ATT_fname'] : '',
											'ATT_lname' => isset( $attendee_data['ATT_lname'] ) ? $attendee_data['ATT_lname'] : '',
											'ATT_email' => isset( $attendee_data['ATT_email'] ) ? $attendee_data['ATT_email'] : ''
										));
										// did we find an already existing record for this attendee ?
										if ( $existing_attendee = apply_filters('FHEE_EE_Single_Page_Checkout__save_registration_items__find_existing_attendee', $existing_attendee, $registration )) {
											// update attendee data in case it has changed since last time they registered for an event
											// first remove fname, lname, and email from attendee data
											unset( $attendee_data['ATT_fname'] );
											unset( $attendee_data['ATT_lname'] );
											unset( $attendee_data['ATT_email'] );
											// now loop thru what' sleft and add to attendee CPT
											foreach ( $attendee_data as $property_name => $property_value ) {
												if ( property_exists( $existing_attendee,  '_' . $property_name )) {
													$existing_attendee->set( $property_name, $property_value );
												}												
											}
											// better save that now
											$existing_attendee->save();
											// add relation to existing attendee
											$registration->_add_relation_to( $existing_attendee, 'Attendee' );

										} else {
											// ensure critical details are set for additional attendees
											if ( $att_nmbr > 1 ) {
												$critical_attendee_details = array( 
													'ATT_fname',
													'ATT_lname',
													'ATT_email',
													'ATT_address',
													'ATT_address2',
													'ATT_city',
													'STA_ID',
													'CNT_ISO',
													'ATT_zip',
													'ATT_phone',
												);
												foreach ( $critical_attendee_details as $critical_attendee_detail ) {
													if ( ! isset( $attendee_data[ $critical_attendee_detail ] ) || empty( $attendee_data[ $critical_attendee_detail ] )) { 
														$attendee_data[ $critical_attendee_detail ] = $primary_attendee_obj->get( $critical_attendee_detail );
													}
												}

											}
											// set author to event creator
											$attendee_data['ATT_author'] = $registration->event()->wp_user();
											// add relation to new attendee
											$registration->_add_relation_to( EE_Attendee::new_instance( $attendee_data ), 'Attendee' );
										}
										
										// who's the man ?
										if ( $att_nmbr == 1 ) {
											$primary_attendee_obj = $registration->get_first_related( 'Attendee' );
										}									
									}


								} else {
									EE_Error::add_error( __( 'An invalid or missing line item ID was encountered while attempting to process the registration form.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
									// remove malformed data
									unset( $valid_data[ $line_item_id ] );
								}
								
								if ( ! $registration->attendee() instanceof EE_Attendee ) {
									EE_Error::add_error( sprintf( __( 'Registration %s has an invalid or missing Attendee object.', 'event_espresso' ), $line_item_id ), __FILE__, __FUNCTION__, __LINE__ );
								}
								
//								printr( $registration, '$registration  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

							} // end of if ( $registration instanceof EE_Registration )
							
						} // end of foreach ( $this->_transaction->registrations()  as $registration )
						
					} else {
						EE_Error::add_error( __( 'Your form data could not be applied to any valid registrations.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
					}
					
				} else {
						EE_Error::add_error( __( 'A valid transaction could not be initiated for processing your registrations.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );				
				}

			} 

			// grab any errors
			$notices = EE_Error::get_notices( FALSE, FALSE, TRUE );
			if ( ! $error_msg = isset( $notices['errors'] ) ? $notices['errors'] : FALSE ) {
				$success_msg = __('Attendee information submitted successfully.', 'event_espresso');
			}

		} else {
			$success_msg = FALSE;
			$error_msg = __('No valid question responses were received.', 'event_espresso');
		}

//echo '<h4>$success_msg : ' . $success_msg . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//echo '<h4>$error_msg : ' . $error_msg . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';

		//this might be called while in admin and if it is then we don't want to do our normal steps.
		if ( is_admin() && ! EE_Registry::instance()->REQ->front_ajax ) {
			if ( $error_msg ) {
				EE_Error::add_error($error_msg, __FILE__, __FUNCTION__, __LINE__);
				return false;
			} else {
				EE_Error::add_success($success_msg);
				return true;
			}
		}

		
		//do action in case a plugin wants to do something with the data submitted in step 1.
		//passes EE_Single_Page_Checkout, and it's posted data
		do_action('AHEE__EE_Single_Page_Checkout__process_attendee_information__end', $this, $valid_data );
		
		$this->go_to_next_step( $success_msg, $error_msg );

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
		$success = $this->_process_attendee_information();

		//if failure in processing attendee info then let's get out early
		if ( !$success )
			return false;

		//all is good so let's continue with finalizing the registration.
		$this->_transaction->save_new_cached_related_model_objs();
		EE_Registry::instance()->SSN->set_session_data( array( 'transaction', NULL ));
		$this->_transaction->set_txn_session_data( EE_Registry::instance()->SSN->get_session_data() );
		$this->_transaction->finalize();
		$this->_transaction->save();
		$this->_cart->get_grand_total()->save_this_and_descendants_to_txn( $this->_transaction->ID() );
		EE_Registry::instance()->SSN->clear_session();
		return $this->_transaction->ID();
	}






	/**
	 * 	process_payment_options
	 *
	 * 	@access private
	 * 	@return 	void
	 */
	private function _process_payment_options() {

		do_action('AHEE_log', __FILE__, __FUNCTION__, '');

		$success_msg = FALSE;
		$error_msg = FALSE;
		
		if ( $this->_continue_reg ) {
			if ( $this->_transaction->total() == 0 ) {				
				// FREE EVENT !!! YEAH : )
				if (  ! $this->_reg_url_link || EE_Registry::instance()->SSN->set_session_data( array( 'billing_info' => 'no payment required' ))) {
					$success_msg = __( 'no payment required.', 'event_espresso' );
					EE_Error::add_success( $success_msg, __FILE__, __FUNCTION__, __LINE__ );	
				} 
			} else { 			
				// PAID EVENT !!!  BOO  : (
				EE_Registry::instance()->load_model( 'Gateways' )->process_gateway_selection();
			}
		}
		
		//grab notices
		$notices = EE_Error::get_notices(FALSE);
		$success_msg = isset( $notices['success'] ) ? $notices['success'] : '';
		$error_msg = isset( $notices['errors'] ) ? $notices['errors'] : '';

		$this->go_to_next_step( $success_msg, $error_msg );

	}




	
	/**
	 * 	process_recaptcha
	 *
	 * 	@access public
	 * 	@return 	void
	 */
	public function process_recaptcha_response() {
		
		$response_data = array(
			//'success' => TRUE,
			'error' => FALSE
		);
		
		// check recaptcha
		if ( EE_Registry::instance()->CFG->registration->use_captcha && ! is_user_logged_in() ) {
			if ( ! function_exists( 'recaptcha_check_answer' )) {
				require_once( EE_THIRD_PARTY . 'recaptchalib.php' );
			}
			$response = recaptcha_check_answer(
					EE_Registry::instance()->CFG->registration->recaptcha_privatekey, 
					$_SERVER["REMOTE_ADDR"],
					EE_Registry::instance()->REQ->is_set( 'recaptcha_challenge_field' ) ? EE_Registry::instance()->REQ->get( 'recaptcha_challenge_field' ) : '',
					EE_Registry::instance()->REQ->is_set( 'recaptcha_response_field' ) ? EE_Registry::instance()->REQ->get( 'recaptcha_response_field' ) : ''
			);
			// ohhh soo sorry... it appears you can't read gibberish chicken scratches !!!
			if ( ! $response->is_valid ) {
				$response_data['success'] = FALSE;
				$response_data['recaptcha_reload'] = TRUE;
				$response_data['error'] = sprintf( __('Sorry, but you did not enter the correct anti-spam phrase.%sPlease try again with the new phrase that has been generated for you.', 'event_espresso'), '<br/>' );
				if ( EE_Registry::instance()->REQ->front_ajax ) {
					echo json_encode( $response_data );
					die();
				}
			}
		}
		if ( $response_data['error'] ) {
			EE_Error::add_error( $response_data['error'], __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		} else {
			return TRUE;
		}
	}




	
	/**
	 * 	_process_finalize_registration
	 *
	 * 	@access private
	 * 	@return 	void
	 */
	private function _process_finalize_registration() {
		
		do_action('AHEE_log', __FILE__, __FUNCTION__, '');
		
		$success_msg = FALSE;
		$error_msg = FALSE;

		if ( $this->_continue_reg ) {

			//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
			$this->_transaction->save_new_cached_related_model_objs();
			// and save the txn to the db
			$this->_transaction->save();
//			printr( $this->_transaction->registrations(), '$this->_transaction->registrations()  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
			$this->_cart->get_grand_total()->save_this_and_descendants_to_txn( $this->_transaction->ID() );

			do_action('AHEE__EE_Single_Page_Checkout__process_finalize_registration__before_gateway', $this->_transaction );
			// attempt to perform transaction via payment gateway
			$response = EE_Registry::instance()->load_model( 'Gateways' )->process_payment_start( $this->_cart->get_grand_total(), $this->_transaction, $this->_reg_url_link );
			$this->_thank_you_page_url = $response['forward_url'];
			
			if ( isset( $response['msg']['success'] )) {
				$response_data = array(
						'success' => $response['msg']['success'],
						'return_data' => array( 'redirect-to-thank-you-page' => $this->_thank_you_page_url )
				);
				if ( EE_Registry::instance()->REQ->front_ajax ) {
					echo json_encode( $response_data );
					die();
				} else {
//					printr( $response_data, '$response_data  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//					echo '<h4>$this->_thank_you_page_url : ' . $this->_thank_you_page_url . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
					wp_safe_redirect( $this->_thank_you_page_url );
					exit(); 
				}			
			
			} else {
				$error_msg = $response['msg']['error'];
			}
		} else {
			$notices = EE_Error::get_notices(FALSE);
			$success_msg = isset( $notices['success'] ) ? $notices['success'] : '';
			$error_msg = isset( $notices['errors'] ) ? $notices['errors'] : '';
		}
			

		$this->go_to_next_step( $success_msg, $error_msg );
		
	}






	/**
	 * 		_process_return_to_reg_step_query_args
	 *
	 * 		@access 	private
	 * 		@return 		void
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
	 *   @access public
	 *   @return void
	 */
	public function go_to_next_step( $success_msg = FALSE, $error_msg = FALSE, $callback = FALSE, $callback_param = FALSE ) {
		
		$no_errors = TRUE;
		switch ( $this->_next_step ) {
			case 'registration_confirmation' :
				$callback = '_go_to_registration_confirmation_ajax_response';
			break;
			case 'finalize_registration' :
				$callback = '_process_finalize_registration';
			break;
		}
		

		// check for valid callback function
		$valid_callback = $callback !== FALSE && $callback != '' && method_exists( $this, $callback ) ? TRUE : FALSE;
//		echo '<h4>$this->_next_step : ' . $this->_next_step . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		echo '<h4>$valid_callback : ' . $valid_callback . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		echo '<h4>$callback : ' . $callback . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		echo '<h4>$success_msg : ' . $success_msg . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		echo '<h4>$error_msg : ' . $error_msg . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		echo '<h4>EE_Registry::instance()->REQ->ajax : ' . EE_Registry::instance()->REQ->ajax . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
		if ( $success_msg ) {
			// if this is an ajax request AND a callback function exists
			if ( EE_Registry::instance()->REQ->ajax  && $valid_callback ) {
				// send data through to the callback function
				$this->$callback( $callback_param, $success_msg );
			} elseif ( EE_Registry::instance()->REQ->ajax ) {
				// just send the ajax
				echo json_encode( array( 'success' => $success_msg ));
				// to be... or...
				die();
			} else {
				// not ajax
				EE_Error::add_success( $success_msg, __FILE__, __FUNCTION__, __LINE__ );
				// return true to advance to next step
				$no_errors = TRUE;
			}
		} elseif ( $error_msg ) {

			if ( EE_Registry::instance()->REQ->ajax ) {
				echo json_encode( array( 'error' => $error_msg ));
				die();
			} else {
				EE_Error::add_error( $error_msg, __FILE__, __FUNCTION__, __LINE__ );
				$no_errors = FALSE;
			}
		}
		// store notices in a transient
		EE_Error::get_notices( FALSE, TRUE, TRUE );
		// no errors, means progress to next step, but if next step is empty, then redirect to thank you page. errors means return to page we came from
		if ( $next_step = $no_errors ? $this->_next_step : $this->_current_step ) {
			$args = $this->_process_return_to_reg_step_query_args( array( 'ee' => 'register', 'step' => $next_step ));
			$redirect = add_query_arg( $args, $this->_reg_page_base_url );
		} else {
			$redirect = $this->_thank_you_page_url;
		}
//		echo '<h4>$next_step : ' . $next_step . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		echo '<h4>$redirect : ' . $redirect . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
		wp_safe_redirect( $redirect );
		exit();
	}








}




// End of file EED_Single_Page_Checkout.module.php
// Location: /modules/single_page_checkout/EED_Single_Page_Checkout.module.php