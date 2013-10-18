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
	// erg_url_link for a previously saved registration
	private $_reg_url_link = '';
	// array of tempate paths
	private $_templates = array();
	// info for each of the reg steps
	private static $_reg_steps = array();
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
		// configure the reg steps array
		EED_Single_Page_Checkout::setup_reg_steps_array();
		// set routing
		EE_Config::register_route( 'register', 'EED_Single_Page_Checkout', 'run' );
		foreach ( self::$_reg_steps as $reg_step => $reg_step_details ) {
			EE_Config::register_route( $reg_step, 'EED_Single_Page_Checkout', $reg_step_details['process_func'] );
		}
	}



	/**
	 * 	set_hooks_admin - for hooking into EE Admin Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks_admin() {
		add_action( 'wp_loaded', array( 'EED_Single_Page_Checkout', 'set_definitions' ), 2 );
		// configure the reg steps array
		EED_Single_Page_Checkout::setup_reg_steps_array();
		// set ajax hooks
		foreach ( self::$_reg_steps as $reg_step => $reg_step_details ) {
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
	 * 	ajax_process_registration_steps
	 */
	public function process_attendee_information() {
		$SPCO = EED_Single_Page_Checkout::instance();
		$SPCO->init();
		$SPCO->_process_attendee_information();
	}
	
	
	public function process_payment_options() {
		$SPCO = EED_Single_Page_Checkout::instance();
		$SPCO->init();
		$SPCO->_process_payment_options();
	}
	
	
	public function process_registration_confirmation() {
		$SPCO = EED_Single_Page_Checkout::instance();
		$SPCO->init();
		$SPCO->_process_registration_confirmation();
	}





	/**
	 * 	init - initial module setup
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function init() {
		// load classes
		$this->EE->load_core( 'Cart' );
		$this->EE->load_model( 'Gateways' );
		$this->EE->LIB->EEM_Gateways->set_ajax( $this->EE->REQ->ajax );
		
		//taxes
//		$this->EE->load_class( 'Cost_Calculator' );
//		$this->EE->load_class( 'Taxes', array(), FALSE, FALSE, TRUE );
		$this->set_templates();
		$this->_reg_page_base_url = get_permalink( $this->EE->CFG->core->reg_page_id );
		// grab what step we're on
		$this->_current_step = $this->EE->REQ->is_set( 'step' ) ? absint( $this->EE->REQ->get( 'step' )) : 'attendee_information';
		// returning from the thank you page ?
		$this->_reg_url_link = $this->EE->REQ->is_set( 'e_reg_url_link' ) ? $this->EE->REQ->get( 'e_reg_url_link' ) : FALSE;		
		// if reg_url_link is present in the request, then we are only being sent back to SPCO to retry the payment 
		if ( $this->_reg_url_link ) {
			// let's get that transaction data
			$this->_transaction = $this->EE->load_model( 'Transaction' )->get_transaction_from_reg_url_link();
			// grab session data from saved TXN record
			$session = $transaction->session_data();
			// unset some values that we don't want to be changed in the real session
			unset( $session['id'] );
			unset( $session['user_id'] );
			unset( $session['ip_address'] );
			unset( $session['user_agent'] );
			unset( $session['init_access'] );
			unset( $session['last_access'] );
			unset( $session['gateway_data'] );
			$session['transaction'] = $transaction;
			$this->EE->SSN->set_session_data( $session );
			$this->EE->CART->empty_cart();
		} 

		$this->_transaction = $this->EE->SSN->get_session_data( 'transaction' );
		if ( ! $this->_transaction instanceof EE_Transaction ) {
			$this->_transaction = $this->_initialize_transaction();
		}
		$this->_initialize_registrations();
		$this->EE->SSN->set_session_data( array( 'transaction' => $this->_transaction ));			
		
		//d( $this->_transaction );
		
		// make sure reg steps array is setup
		if ( empty( self::$_reg_steps )) {
			EED_Single_Page_Checkout::setup_reg_steps_array();
		}

		add_action( 'wp_enqueue_scripts', array( 'EED_Single_Page_Checkout', 'translate_js_strings' ), 1 );
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
		add_filter( 'espresso_filter_hook_calculate_taxes', array( 'EE_Taxes', 'calculate_taxes' ));
		
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
		EE_Registry::$i18n_js_strings['reg_step_error'] = __('An error occured! This registration step could not be completed. Please refresh the page and try again.', 'event_espresso');
		EE_Registry::$i18n_js_strings['answer_required_questions'] = __('You need to answer all required questions before you can proceed.', 'event_espresso');
		EE_Registry::$i18n_js_strings['enter_valid_email'] = __('You must enter a valid email address.', 'event_espresso');
		EE_Registry::$i18n_js_strings['valid_email_and_questions'] = __('You must enter a valid email address and answer all other required questions before you can proceed.', 'event_espresso');
	}



	/**
	 * 		wp_enqueue_scripts
	 *
	 * 		@access 		public
	 * 		@return 		void
	 */
	public static function wp_enqueue_scripts() {
		wp_register_style( 'single_page_checkout', SPCO_ASSETS_URL . 'single_page_checkout.css' );
		wp_enqueue_style( 'single_page_checkout' );
		wp_register_script( 'single_page_checkout', SPCO_ASSETS_URL . 'single_page_checkout.js', array('espresso_core'), '', TRUE );
		wp_enqueue_script( 'single_page_checkout' );
		wp_localize_script( 'single_page_checkout', 'eei18n', EE_Registry::$i18n_js_strings );
	}



	/**
	 * 	generates a new EE_Transaction object and adds related EE_Registration objects for each ticket in the cart
	 *
	 * 	@access private
	 * 	@return 	EE_Transaction object
	 */
	private function _initialize_transaction() {
		// grab cart total
		$TXN_total = $this->EE->CART->get_cart_grand_total();
		// create new TXN
		$transaction = EE_Transaction::new_instance( array( 
				'TXN_timestamp' => current_time('mysql'),
				'TXN_total' => $TXN_total, 
				'TXN_paid' => 0, 
				'STS_ID' => $TXN_total > 0 ? 'TIN' : 'TCM',
				'TXN_tax_data' => $this->EE->CART->get_applied_taxes()
		));
		return $transaction;
	}


	/**
	 * 	adds related EE_Registration objects for each ticket in the cart to the current EE_Transaction object
	 *
	 * 	@access private
	 * 	@return 	void
	 */
	private function _initialize_registrations() {
		
		if ( $this->_transaction instanceof EE_Transaction ) {
			// now let's add the cart items to the $transaction
			if ( count( $this->EE->CART ) ) {
				foreach ( $this->EE->CART as $item ) {
					// grab the related event object for this ticket
					$event = $item->ticket->get_first_related( 'Datetime' )->get_first_related( 'Event' );
					//do the following for each ticket of this type they selected
					for ( $att_nmbr = 1; $att_nmbr <= $item->qty(); $att_nmbr++ ) {
						// now create a new registration for the ticket				
				 		$registration = EE_Registration::new_instance( array( 
							'EVT_ID' => $event->ID(),
							'TXN_ID' => $this->_transaction->ID(),
							'TKT_ID' => $item->ticket->ID(),
							'STS_ID' => $this->EE->CFG->registration->default_STS_ID,
							'REG_date' => $this->_transaction->datetime(),
							'REG_final_price' => $item->ticket->price(),
							'REG_session' => $this->EE->SSN->id(),
							'REG_count' => $att_nmbr,
							'REG_group_size' => $item->qty(),
							'REG_url_link'	=> $att_nmbr . '-' . $item->line_item_ID()
						));
						$registration->_add_relation_to( $event, 'Event' );
						$registration->_add_relation_to( $item->ticket(), 'Ticket' );
						$this->_transaction->_add_relation_to( $registration, 'Registration' );
					}
				}
			}	
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
		
		$this->EE->load_helper( 'Form_Fields' );
		$this->EE->load_class( 'Question_Form_Input', array(), FALSE, FALSE, TRUE );
		$this->EE->load_helper( 'Template' );

		$template_args = array();
		$template_args['css_class'] = '';
		$template_args['confirmation_data'] = '';

		// has gateway been set by no-js user?
		if ( $this->EE->REQ->is_set( 'payment' )) {
			$payment = sanitize_text_field( $this->EE->REQ->get( 'payment' ));
		}
		if ( ! empty( $payment )) {			
			if ($this->EE->LIB->EEM_Gateways->selected_gateway() != $payment ) {
				$this->EE->LIB->EEM_Gateways->set_selected_gateway( $payment );
			} else {
				$this->EE->LIB->EEM_Gateways->unset_selected_gateway( $payment );
			}
		}
		$template_args['selected_gateway'] = $this->EE->LIB->EEM_Gateways->selected_gateway();
		$this->EE->LIB->EEM_Gateways->set_form_url($this->_reg_page_base_url);
		if (empty($session_data['billing_info'])) {
			$this->EE->SSN->set_session_data(array('fill' => TRUE), 'billing_info');
		}

		$event_queue = array();
		$cart_line_items = '';
		$total_items = 0;

//		$additional_event_registration_info = new stdClass();
//		$additional_event_registration_info = apply_filters( 'FHEE_additional_event_registration_info_init', $additional_event_registration_info );

		$additional_event_attendees = array();
		$events_requiring_pre_approval = array();
		$events_that_use_coupon_codes = array();
		$events_that_use_groupon_codes = array();
		$template_args['reg_page_discounts_dv_class'] = 'hidden';
		
		$template_args['whats_in_the_cart'] = '';

		$event_queue['title'] = __('Registrations', 'event_espresso');
		$attendee_headings = array();
		$additional_attendees = array();
		$additional_attendee_forms = TRUE;
		//$target_inputs = '';
		//d( $this->_transaction );
		if ( $this->_transaction instanceof EE_Transaction && $this->_transaction->registrations() !== NULL ) {

			$event_queue['has_items'] = TRUE;
			$attendee_questions = array();
			$prev_event = NULL;
			
			foreach ( $this->_transaction->registrations() as $registration ) {
				
				$total_items++;
				$line_item_ID = $registration->reg_url_link();	
				$cart_line_items = '#spco-line-item-' . $line_item_ID;					
				$event_queue['items'][ $line_item_ID ]['ticket'] = $registration->ticket();
				$event_queue['items'][ $line_item_ID ]['event'] = $registration->event();

				$Question_Groups = $this->EE->load_model( 'Question_Group' )->get_all( array( array( 'Event.EVT_ID' => $registration->event()->ID() )));
				foreach ( $Question_Groups as $Question_Group ) {
					$Questions = $Question_Group->get_many_related( 'Question' );
					foreach ( $Questions as $Question ) {
						$answer = EE_Answer::new_instance ( array( 
							'QST_ID'=> $Question->ID(),
							'REG_ID'=> $registration->ID()
						 ));
						$answer->_add_relation_to( $Question, 'Question' );
						$registration->_add_relation_to( $answer, 'Answer' );
					}
				}

				$additional_attendee_reg_info = $registration->event()->additional_attendee_reg_info() ? absint( $registration->event()->additional_attendee_reg_info() ) : 1;

				$question_meta = array(
						'EVT_ID' => $registration->event()->ID(),
						'att_nmbr' => $registration->count(),
						'ticket_id' => $registration->ticket()->ID(),
						'input_name' =>  '[' . $line_item_ID . ']',
						'input_id' => $line_item_ID,
						'input_class' => 'ee-reg-page-questions' . $template_args['css_class'],
						'additional_attendee_reg_info' => $additional_attendee_reg_info,
				);
				//printr( $question_meta, '$question_meta  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

				add_filter( 'FHEE_form_field_label_html', array( $this, 'reg_form_form_field_label_wrap' ), 10, 1 );
				add_filter( 'FHEE_form_field_input_html', array( $this, 'reg_form_form_field_input__wrap' ), 10, 1 );
				
				$attendee_questions = EEH_Form_Fields::generate_question_groups_html2( $Question_Groups, $question_meta, 'div' );

				// show this attendee form?
				if ( empty( $attendee_questions )) {
					$additional_attendee_forms = FALSE;
					$attendee_questions .= '<p>' . __('This event does not require registration information for additional attendees.', 'event_espresso') . '</p>';
					$attendee_questions .= '
						<input
								type="hidden"
								id="' . $line_item_ID . '-additional_attendee_reg_info"
								name="qstn[' . $line_item_ID . '][additional_attendee_reg_info]"
								value="'.$additional_attendee_reg_info.'"
						/>' . "\n";
				}
				$event_queue['items'][ $line_item_ID ]['attendee_questions'] = $attendee_questions;



				// is this the primarary registrant ?
				if ( $total_items == 1 && $registration->count() == 1 ) {
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
					if ( $registration->ticket()->ID() != $prev_event || $total_items == 2 ) {
						$additional_event_attendees[ $registration->ticket()->ID() ][ $line_item_ID ]['event_hdr'] = $item_name;
						$prev_event = $registration->ticket()->ID();
					} else {
						// no heading
						$additional_event_attendees[ $registration->ticket()->ID() ][ $line_item_ID ]['event_hdr'] = FALSE;
					}
				}
			} 

			$event_queue['total_items'] = $total_items;
			$event_queue['sub_total'] = EEH_Template::format_currency( $this->EE->CART->get_cart_total_before_tax() );
			
			$this->EE->SSN->set_session_data( array( 'transaction' => $this->_transaction ));
//			d( $this->EE->SSN );
			$txn = $this->EE->SSN->get_session_data( 'transaction' );
//			d( $txn );
			
		} else {
			// empty
			$event_queue['has_items'] = FALSE;
		}

		$event_queue['empty_msg'] = __( 'Their appears to be nothing in your Event Queue.', 'event_espresso' );
		$grand_total = $this->EE->CART->get_cart_grand_total();


		// PRE APPROVAL
		$template_args['events_requiring_pre_approval'] = '';
		//  do we have any events that require it ?
//		if (!empty($events_requiring_pre_approval)) {
//
//			// echo printr( $events_requiring_pre_approval, '$events_requiring_pre_approval' );
//			// cycle through array of events requiring pre approval
//			foreach ($events_requiring_pre_approval as $cart_type => $cart_contents) {
//				foreach ($cart_contents as $items) {
//					foreach ($items as $line_item_id => $item) {
//						// we will subtract events that require pre-approval from the event queue totals since these will not be getting purchased right now
//						//$total_items = $total_items - $item['qty'];
//						$grand_total = $grand_total - $item['ticket_price'];
//						$template_args['events_requiring_pre_approval'] .= '<li>' . $item['name'] . '</li>';
//					}
//				}
//			}
//			$template_args['events_requiring_pre_approval'] = rtrim($template_args['events_requiring_pre_approval'], ', ');
//		}


		//  GOT COUPONS ?
		$template_args['events_that_use_coupon_codes'] = '';
		$template_args['use_coupon_codes'] = FALSE;

		// Groupons ?
		$template_args['events_that_use_groupon_codes'] = '';
		$template_args['use_groupon_codes'] = FALSE;


		$template_args['spco_reg_page_ajax_coupons_url'] = add_query_arg( array( 'ee' => 'apply_coupon' ), $this->_reg_page_base_url );

		//$template_args['target_inputs'] = rtrim($target_inputs, '&&');

		$template_args['print_copy_info'] = $additional_attendee_forms || $x > 2 ? TRUE : FALSE;
		
//		d($additional_event_attendees);
		$template_args['additional_event_attendees'] = $additional_event_attendees;

		$template_args['total_items'] = $total_items;		

		$template_args['payment_required'] = $grand_total > 0 ? TRUE : FALSE;
		$template_args['sub_total'] = EEH_Template::format_currency( $grand_total );

		$template_args['taxes'] = EE_Taxes::calculate_taxes( $grand_total );
		$grand_total = apply_filters( 'espresso_filter_hook_grand_total_after_taxes', $grand_total );

		$template_args['grand_total'] = EEH_Template::format_currency( $grand_total );

//	d( $event_queue );
		$template_args['event_queue'] = $event_queue;
		$template_args['images_dir_url'] = EVENT_ESPRESSO_PLUGINFULLURL . 'images/';
		$template_args['reg_url_link'] = $this->_reg_url_link;

		$template_args['return_url'] = add_query_arg( array('ee' => 'event_queue'), $this->_reg_page_base_url );
		$template_args['update_url'] = add_query_arg( array('ee' => 'update_event_queue'), $this->_reg_page_base_url );
		$template_args['register_url'] = add_query_arg( array('ee' => 'register'), $this->_reg_page_base_url );
		$template_args['event_queue_url'] = add_query_arg( array('ee' => 'event_queue'), $this->_reg_page_base_url );


		//Recaptcha
		$recaptcha = '';
		if ( $this->EE->CFG->registration->use_captcha && ( empty($_REQUEST['edit_details']) || $_REQUEST['edit_details'] != 'true') && !is_user_logged_in()) {

			if (!function_exists('recaptcha_get_html')) {
				$this->EE->load_file( EVENT_ESPRESSO_PLUGINFULLPATH . 'tpc', 'recaptchalib', '' );
			}

			// the error code from reCAPTCHA, if any
			$error = null;
			$recaptcha .= '
<script type="text/javascript">
/* <! [CDATA [ */
	var RecaptchaOptions = { theme : "' . $this->EE->CFG->registration->recaptcha_theme . '", lang : "' . $this->EE->CFG->registration->recaptcha_language . '" };
/*  ] ]>  */
</script>
<p class="reg-page-form-field-wrap-pg" id="spc-captcha">
	' . __('Anti-Spam Measure: Please enter the following phrase', 'event_espresso') . '
	' . recaptcha_get_html( $this->EE->CFG->registration->recaptcha_publickey, $error, is_ssl() ? true : false ) . '
';
			$recaptcha .= '
</p>
';
		}
		//End use captcha

		$confirm_n_pay = sprintf( 
			__('YES!%1$sFinalize%1$sRegistration%1$s%2$s%1$sProceed%1$sto%1$sPayment', 'event_espresso'),
			'&nbsp;',  // %1$s
			'&amp;'	// %2$s
		);
		$confirm = sprintf( 
			__('YES!%1$sFinalize%1$sRegistration%1$s', 'event_espresso'),
			'&nbsp;'  // %1$s
		);
		$confirmation_btn_text = $grand_total > 0 ? $confirm_n_pay : $confirm;

		//$template_args['confirmation_data'] = $this->display_data_for_confirmation();
		$registration_steps = '';
		$step_nmbr = 1;
		// set pointer to first step
		reset( self::$_reg_steps );
		// loop through steps
		while ( $reg_step_details = current( self::$_reg_steps )) {
			$reg_step = key( self::$_reg_steps );
			$edit_lnk_class = $this->_current_step == $reg_step ? '' : ' hidden';
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
					'step' => $this->_current_step, 
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
			//d( $step_args );
			$registration_steps .= EEH_Template::display_template( $this->_templates[ $reg_step_details['template'] ], $step_args, TRUE);
			// pass step info to js
			EE_Registry::$i18n_js_strings[ 'reg_step_' . $step_nmbr ] = $reg_step_details['display_func'];	
			EE_Registry::$i18n_js_strings[ 'reg_steps' ][ $step_nmbr ] = $reg_step_details['display_func'];	
			// next step	
			$next = next( self::$_reg_steps );
			// pass next step info to js
			EE_Registry::$i18n_js_strings[ 'after_' . $reg_step_details['display_func'] ] = $next['display_func'];
			$step_nmbr++;

		}

		$wrapper_args = array( 
			'step' => $this->_current_step,
			'empty_cart' => $total_items < 1 ? TRUE : FALSE,
			'reg_steps' => self::$_reg_steps,
			'registration_steps' => $registration_steps
		);
		//d( $wrapper_args );
		$this->EE->REQ->add_output( EEH_Template::display_template( $this->_templates['registration_page_wrapper'], $wrapper_args, TRUE ));
	}






	/**
	 * 	reg_form_form_field_label_wrap
	 *
	 * 	@access 	public
	 * 	@param 	string 	$label
	 * 	@return 		string
	 */
	public function reg_form_form_field_label_wrap( $label ) {
		return '<p class="reg-page-form-field-wrap-pg">' . $label;		
	}




	/**
	 * 	reg_form_form_field_input__wrap
	 *
	 * 	@access 	public
	 * 	@param 	string 	$label
	 * 	@return 		string
	 */
	public function reg_form_form_field_input__wrap( $input ) {
		return $input . '</p>';		
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
		
//		printr( $this->_transaction, '$this->_transaction <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//		die();

		// don't need these so get rid of them so they don't get processed
//		unset($_POST['action']);
//		unset($_REQUEST['espresso_ajax']);

		// empty container
		$valid_data = array();
		
		if ( $this->EE->REQ->is_set( 'qstn' )) {
			// loop through post data and sanitize all elements
			array_walk_recursive( $this->EE->REQ->get( 'qstn' ), array( $this, 'sanitize_text_field_for_array_walk' ));
			$valid_data = apply_filters( 'FHEE__EE_Single_Page_Checkout__process_attendee_information__REQ', $this->EE->REQ->get( 'qstn' ));			
		}

		// if we don't have any $valid_data then something went TERRIBLY WRONG !!! AHHHHHHHH!!!!!!!
		if ( ! empty( $valid_data )) {
//			printr( $valid_data, '$valid_data  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		
			if ( isset( $valid_data['custom_questions'] )) {
				$custom_questions = $valid_data['custom_questions'];
				$this->EE->SSN->set_session_data(array('custom_questions'=>$custom_questions), 'session_data');
				unset( $valid_data['custom_questions'] );
			}
			
			if ( isset( $valid_data['primary_attendee'] )) {
				$primary_attendee =  ! empty( $valid_data['primary_attendee'] ) ? $valid_data['primary_attendee'] : FALSE;
				unset( $valid_data['primary_attendee'] );
			}
			
			$this->EE->load_helper( 'Template' );
			
			// now loop through our array of valid post data
			foreach ( $valid_data as $att_line_item => $attendee_form ) {
				foreach ( $attendee_form as $form_input => $input_value ) {
					
					$att_line_item = explode( '-', $att_line_item );
					$att_nmbr = $att_line_item[0];
					$line_item_id = isset( $att_line_item[1] ) ? $att_line_item[1] : NULL;
					
					foreach ( $this->_transaction->registrations()  as $registration ) {
//							printr( $registration, '$registration  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//						if ( $registration->reg_url_link() == $line_item_id && $line_item_id !== NULL ) {
							$answers = $registration->answers();
							printr( $answers, '$answers  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
							
//						}
					}
					// add ticket price to the array
					$attendees[$line_item_id][$event_id]['attendees'][$att_nmbr]['price_paid'] = EEH_Template::format_currency( $tckt_price / 100, TRUE );
					// now add all other post data that was generated by attendee questions
					$attendees[$line_item_id][$event_id]['attendees'][$att_nmbr][$form_input] = $input_value;
					unset($attendees[$line_item_id][$event_id]['attendees'][$att_nmbr]['line_item_id']);
					
					if ( $form_input == 'fname'  && empty( $input_value )) {
							// required value
							EE_Error::add_error( __( 'First Name is a required value.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );											
					} elseif ( $form_input == 'lname' && empty( $input_value )) {
							// required value
							EE_Error::add_error( __( 'Last Name is a required value.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );											
					} elseif ( $form_input == 'email' ) {
						if ( empty( $input_value )) {
							// required value
							EE_Error::add_error( __( 'Email Address is a required value.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );											
						} else {
							// clean the email address
							$valid_email = sanitize_email( $input_value );
							// check if it matches
							if ( $input_value != $valid_email ) {
								// whoops!!!
								EE_Error::add_error( __( 'Please enter a valid email address.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );	
							}
						}
					} 
					// store a bit of data about the primary attendee
					if ($form_input == 'primary_attendee' && $input_value == 1) {										
						//$primary_attendee['registration_id'] = $registration_id;
						$primary_attendee['fname'] = $valid_data[$event_id][$att_nmbr][$event_date][$event_time][$tckt_price]['fname'];
						$primary_attendee['lname'] = $valid_data['qstn'][$event_id][$att_nmbr][$event_date][$event_time][$tckt_price]['lname'];
						$primary_attendee['email'] = $valid_data['qstn'][$event_id][$att_nmbr][$event_date][$event_time][$tckt_price]['email'];
						$this->EE->SSN->set_session_data(array('primary_attendee' => $primary_attendee), 'session_data');
					} else if ( $form_input == 'additional_attendee_reg_info' && $input_value == 1 ) {
						// we need to copy basic info from primary attendee
						$attendees[$line_item_id][$event_id]['attendees'][$att_nmbr]['fname'] = $attendees[$line_item_id][$event_id]['attendees'][1]['fname'];
						$attendees[$line_item_id][$event_id]['attendees'][$att_nmbr]['lname'] = $attendees[$line_item_id][$event_id]['attendees'][1]['lname'];
						$attendees[$line_item_id][$event_id]['attendees'][$att_nmbr]['email'] = $attendees[$line_item_id][$event_id]['attendees'][1]['email'];
						unset($attendees[$line_item_id][$event_id]['attendees'][$att_nmbr]['additional_attendee_reg_info']);
					}
				}
			}
		
			//printr( $attendees, '$attendees  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//			printr( $this->EE, '$this->EE  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

			// now we'll save our data to the session by doing... MORE LOOPING !!!
			foreach ($attendees as $line_item_id => $line_item) {
				foreach ($line_item as $event_id => $attendees_data) {
					$this->EE->CART->set_line_item_details($attendees_data, $line_item_id);
				}
			}

			$notices = EE_Error::get_notices( FALSE, FALSE, TRUE );
			$error_msg = isset( $notices['errors'] ) ? $notices['errors'] : FALSE;
			//echo '<h4>$error_msg : ' . $error_msg . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';

			if (!$error_msg) {
				$success_msg .= __('Attendee information submitted successfully.', 'event_espresso');
			}

		} else {
			$success_msg = FALSE;
			$error_msg = __('An error occured! No valid question responses were received.', 'event_espresso');
		}
		
		//do action in case a plugin wants to do something with the data submitted in step 1.
		//passes EE_Single_Page_Checkout, and it's posted data
		do_action('AHEE__EE_Single_Page_Checkout__process_registration_step_1__end',$this,$valid_data);

		if ($this->send_ajax_response($success_msg, $error_msg)) {
			$reg_page_step_2_url = add_query_arg(array('ee' => 'register', 'step' => '2'), $this->_reg_page_base_url);
			wp_safe_redirect($reg_page_step_2_url);
			exit();
		} else {
			$args = $this->_process_return_to_reg_step_query_args( array('ee' => 'register', 'step' => '1', 'errors' => urlencode( $error_msg )));
			$reg_page_step_1_url = add_query_arg( $args, $this->_reg_page_base_url );
			wp_safe_redirect($reg_page_step_1_url);
			exit();
		}
	}





	/**
	 * 		_process_return_to_reg_step_1_query_args
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
		$args = array_merge( $_POST, $args );
		return $args;
	}





	/**
	 * 		process_registration_step_2
	 *
	 * 		@access 		public
	 * 		@return 		void
	 */
	public function process_registration_step_2() {

		do_action('AHEE_log', __FILE__, __FUNCTION__, '');

		$success_msg = FALSE;
		$error_msg = FALSE;

		// don't need these so get rid of them'
		unset($_POST['action']);
//		printr( $_POST, '$_POST  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

		if (isset($_POST['reg-page-no-payment-required']) && absint($_POST['reg-page-no-payment-required']) == 1) {
			
			// FREE EVENT !!! YEAH : )
			if ($this->EE->SSN->set_session_data(array('billing_info' => 'no payment required'), $section = 'session_data')) {
				$msg = __( 'Registration Step 2 completed.', 'event_espresso' );
				EE_Error::add_success( $msg, __FILE__, __FUNCTION__, __LINE__ );	
			} 

		} else { 
			
			// PAID EVENT !!!  BOO  : (
			$this->EE->LIB->EEM_Gateways->process_gateway_selection();
			
			//grab notices
			$notices = EE_Error::get_notices(FALSE);
			$success_msg = isset( $notices['success'] ) ? $notices['success'] : '';
			$error_msg = isset( $notices['errors'] ) ? $notices['errors'] : '';

			if ($this->send_ajax_response( $success_msg, $error_msg, '_send_reg_step_2_ajax_response' )) {
				$reg_page_step_3_url = add_query_arg(array('ee' => 'register', 'step' => '3'), $this->_reg_page_base_url);
				wp_safe_redirect($reg_page_step_3_url);
				exit();
			} else {
				$reg_page_step_2_url = add_query_arg(array('ee' => 'register', 'step' => '2'), $this->_reg_page_base_url);
				wp_safe_redirect($reg_page_step_2_url);
				exit();
			}
		}
	}






	/**
	 * 		send reg step 2 ajax response
	 *
	 * 		@access 		private
	 * 		@param 		string 		$success_msg
	 * 		@return 		JSON
	 */
	private function _send_reg_step_2_ajax_response( $args, $success_msg) {

		// Sidney is watching me...   { : \
		do_action('AHEE_log', __FILE__, __FUNCTION__, '');

		$confirmation_page = $this->display_data_for_confirmation();
		$response_data = array(
				'success' => $success_msg,
				'return_data' => array('reg-page-confirmation-dv' => $confirmation_page)
		);

		echo json_encode($response_data);
		// to be... or...
		die();
	}






	/**
	 * 		display session info for confirmation
	 *
	 * 		@access 		public
	 * 		@return 		string
	 */
	public function display_data_for_confirmation() {
		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		do_action('AHEE_log', __FILE__, __FUNCTION__, '');
		$this->EE->load_helper( 'Template' );

		$session_data = $this->EE->SSN->get_session_data();
		//printr( $session_data, '$session_data  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		$billing_info = $session_data['billing_info'];
		$reg_info = $session_data['cart']['REG'];
		$template_args = array();

		if ( isset( $reg_info['items'] )) {

			$exclude_attendee_info = array('registration_id', 'price_paid', 'primary_attendee');
			$states = EEM_State::instance()->get_all( array( 
				array(
					'Country.CNT_active'=>true,
					'STA_active'=>true
				)));
			
			foreach ($reg_info['items'] as $line_item_id => $event) {
	
				$template_args['events'][$line_item_id]['name'] = stripslashes( trim( $event['name'] ));
				$template_args['events'][$line_item_id]['date'] = $event['options']['date'];
				$template_args['events'][$line_item_id]['time'] = date('g:i a', strtotime($event['options']['time']));
				$template_args['events'][$line_item_id]['ticket_price'] = stripslashes( trim( $event['options']['ticket_desc'] )) . ': ' . EEH_Template::format_currency( $event['ticket_price'] );
	
				foreach ($event['attendees'] as $att_nmbr => $attendee) {
					// if attendee has no name, then use primary attendee's details
					$attendee = isset( $attendee['fname'] ) && $att_nmbr > 1 ? $attendee : $event['attendees'][1];
					//reset price paid to original in case it was different
					$attendee['price_paid'] = $event['attendees'][$att_nmbr]['price_paid'];

//					echo '<h4>$att_nmbr : ' . $att_nmbr . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//					printr( $attendee, '$attendee  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
	
					$template_args['events'][$line_item_id]['attendees'][$att_nmbr]['name'] = stripslashes( trim( $attendee['fname'] . ' ' . $attendee['lname'] ));
					$extra_att_details = array();
	
					foreach ($attendee as $key => $value) {
						switch ($key) {
	
							case 'fname' :
							case 'lname' :
								break;
	
							case 'state' :
								if (!in_array($key, $exclude_attendee_info) /*&& !is_numeric($key)*/ && $value != '') {
									if ( isset( $states[ $value ] )) {
										array_push( $extra_att_details, $states[ $value ]->get( 'STA_abbrev' ) );
									} else {
										array_push( $extra_att_details, $value );
									}									
								}
								break;
	
							default:
								if (!in_array($key, $exclude_attendee_info) /*&& !is_numeric($key)*/ && $value != '') {
									array_push($extra_att_details, $value);
								}
						}
					}
	
					if (!empty($extra_att_details)) {
						$template_args['events'][$line_item_id]['attendees'][$att_nmbr]['extra_att_detail'] = '<br/><span class="small-text lt-grey-text">' . implode(', ', $extra_att_details) . '</span>';
					} else {
						$template_args['events'][$line_item_id]['attendees'][$att_nmbr]['extra_att_detail'] = '<br/><span class="small-text lt-grey-text">' . __('no attendee details submitted', 'event_espresso') . '</span>';
					}

				}
			}
		}

		if ($billing_info == 'no payment required') {
			$ouput = '<h3>' . __('No payment required.<br/>Please click "Confirm Registration" below to complete the registration process.', 'event_espresso') . '</h3>';
		} else {
			// get billing info fields
			$template_args['billing'] = $this->EE->LIB->EEM_Gateways->set_billing_info_for_confirmation( $billing_info );
			$total = $session_data['_cart_grand_total_amount'];

			// add taxes
			if (isset($session_data['tax_totals'])) {
				foreach ($session_data['tax_totals'] as $taxes) {
					$total = $total + $taxes;
				}
			}
			
			$template_args['billing'][ __('total due', 'event_espresso') ] = EEH_Template::format_currency( $total );

			$ouput = EEH_Template::display_template($this->_templates['confirmation_page'], $template_args, TRUE);
		}		
		return $ouput;		
	}






	/**
	 * 		process_registration_step_3
	 *
	 * 		@access 		public
	 * 		@return 		void
	 */
	public function process_registration_step_3() {
		// Sidney is watching me...   { : \
		do_action('AHEE_log', __FILE__, __FUNCTION__, '');

		$success_msg = FALSE;
		$error_msg = FALSE;
		$continue_reg = TRUE;
		$txn_details = array();

		// check recaptcha
		if ( $this->EE->CFG->registration->use_captcha && ! is_user_logged_in() ) {
			if ( ! function_exists( 'recaptcha_check_answer' )) {
				$this->EE->load_file( EVENT_ESPRESSO_PLUGINFULLPATH . DS . 'tpc', 'recaptchalib', '' );
				$response = recaptcha_check_answer(
						$this->EE->CFG->registration->recaptcha_privatekey, 
						$_SERVER["REMOTE_ADDR"], 
						$_POST["recaptcha_challenge_field"], 
						$_POST["recaptcha_response_field"]
				);
			}
			// ohhh soo sorry... it appears you can't read gibberish chicken scratches !!!
			if ( ! $response->is_valid ) {
				$continue_reg = FALSE;
				$error_msg = __('Sorry, but you did not enter the correct anti-spam phrase.<br/>Please refresh the ReCaptcha (the top button of the three), and try again.', 'event_espresso');
			}
		}
		
		if ($continue_reg) {

			do_action('AHEE_begin_reg');

			// load and instantiate models
			$this->EE->load_model( 'Registration' );
			$this->EE->load_model( 'Transaction' );
			
			// if reg_url_link is present in the request, then we are only being sent back to SPCO to retry the payment 
			if ( $this->EE->REQ->is_set( 'e_reg_url_link' ) && $this->EE->REQ->get( 'e_reg_url_link' ) != FALSE ) {
				$transaction = $this->EE->LIB->EEM_Transaction->get_transaction_from_reg_url_link();
				//printr( $transaction, '$transaction  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
				// grab session data from saved TXN record
				$session = $transaction->session_data();
				$saved_registrations = $session['registration'];
				$process_registrations = 'none';
			} else {
				// grab session data
				$session = $this->EE->SSN->get_session_data();
				//check for existing transaction in the session
				$transaction = isset( $session['transaction'] ) && ! empty( $session['transaction'] ) ? $session['transaction'] : FALSE;
				$process_registrations = $transaction ? 'dump_and_resave' : 'save';
			}
			

			if ( ! $transaction ) {

				$grand_total = $session['_cart_grand_total_amount'];
				// add taxes
				if (isset($session['tax_totals'])) {
					foreach ($session['tax_totals'] as $taxes) {
						$grand_total += $taxes;
					}
				}
				// totals over 0 initially get set to Incomlete, whereas Free Events get set to complete
				$txn_status = $grand_total > 0 ? 'TIN' : 'TCM';

				$transaction = EE_Transaction::new_instance( 
					array(
						'TXN_timestamp' =>  current_time('mysql'),
						'TXN_total' => $grand_total, 
						'TXN_paid' => 0, 
						'STS_ID' => $txn_status, 
						'TXN_details' => NULL, 
						'TXN_session_data' => $session, 
						'TXN_hash_salt' => NULL, 
						'TXN_tax_data' => array(
							'tax_totals'=>$session['tax_totals'],
							'taxes'=>$session['taxes']
						) 
					)
				);
				$transaction->save();
			}
			
			switch ( $process_registrations ) {
				case 'dump_and_resave' :
					//delete existing registrations on this transaction, because they may have been edited and we're going to re-save them 
					$this->EE->LIB->EEM_Registration->delete( array( array( 'TXN_ID'=>$transaction->ID() )));
				case 'save' :
					$saved_registrations = self::save_registration_items( $session['cart']['REG']['items'], $transaction );
					//remove the session from the transaction before saving it to the session... otherwise we'll have a recursive relationship! bad!!
					$transaction->set_txn_session_data(NULL);
					// save registrations and transaction to the session
					$this->EE->SSN->set_session_data( array( 'registration' => $saved_registrations, 'transaction' => $transaction ), 'session_data');
					// save the session to the db
					$this->EE->SSN->update_espresso_session();			
					break;
				case 'none' :
					//not updating registrations or anything, just going to possibly revisit the payment options
			}
			
//			printr( $this->EE->SSN, '$this->EE->SSN  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

			// attempt to perform transaction via payment gateway
			do_action('AHEE__EE_Single_Page_Checkout__process_registration_step_3__before_gateway', $this );
			$response = $this->EE->LIB->EEM_Gateways->process_reg_step_3();
			$this->_thank_you_page_url = $response['forward_url'];
			if ( isset( $response['msg']['success'] )) {
				$success_msg = $response['msg']['success'];
			} else {
				$error_msg = $response['msg']['error'];
			}
			
			// if this is a new registration AND... we're counting all registrations with successful TXNs, OR it's a free event
			if ( $process_registrations == 'save' && (( $this->EE->CFG->registration->pending_counts_reg_limit && $success_msg !== FALSE ) || $transaction->status() == 'TCM' )) {
				// step 1 - count registrations
				$reg_count = 0;
				foreach ( $saved_registrations as $event_registrations ) {
					foreach ( $event_registrations as $event_registration ) {
						//$event_registration
						d($event_registration);
					}					
				}
				
			}

		}
		
		do_action('AHEE__EE_Single_Page_Checkout__process_registration_step_3__end', $this);
		
		//$session = $this->EE->SSN->get_session_data();
		//printr( $session, '$session data ( ' . __FUNCTION__ . ' on line: ' .  __LINE__ . ' )' ); 
		//die();
		if ($this->send_ajax_response($success_msg, $error_msg, '_send_reg_step_3_ajax_response')) {
			wp_safe_redirect($this->_thank_you_page_url);
			exit();
		} else {
			$reg_page_step_3_url = add_query_arg(array('ee' => 'register', 'step' => '3'), $this->_reg_page_base_url);
			wp_safe_redirect($reg_page_step_3_url);
			exit();
		}
	}





	
	/**
	 * 		save_registration_items
	 *
	 * 		@access 		public
	 * 		@param 		array 		$reg_items
	 * 		@return 		void
	 */
	static public function save_registration_items( $reg_items = array(), EE_Transaction $transaction ) {
		
		if( empty( $reg_items )) {
			EE_Error::add_error( __( 'No registration items were received.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );	
			return array();			
		}

		// grab session data
		$session = EE_Registry::instance()->SSN->get_session_data();
		// get some class would ya !
		EE_Registry::instance()->load_class( 'Answer', FALSE, FALSE, TRUE, TRUE );
		EE_Registry::instance()->load_class( 'Registration', FALSE, FALSE, TRUE, TRUE );
		EE_Registry::instance()->load_model( 'Question' );
		$ATT = EE_Registry::instance()->load_model( 'Attendee' );
		
		$saved_registrations = array();
		$reg_count = 0;
		$total_registrations = $session['cart']['REG']['total_items'];

		// cycle through items in session			
		foreach ($reg_items as $line_item_id => $event) {

			// cycle through attendees
			foreach ($event['attendees'] as $att_nmbr => $attendee) {
				
				$reg_count++;
				// if attendee has no name, then use primary attendee's details
				$attendee = isset( $attendee['fname'] ) && $att_nmbr > 1 ? $attendee : $event['attendees'][1];
				
				// grab main attendee details
				$ATT_fname = isset($attendee['fname']) ? $attendee['fname'] : '';
				$ATT_lname = isset($attendee['lname']) ? $attendee['lname'] : '';
				$ATT_email = isset($attendee['email']) ? $attendee['email'] : '';
				// create array for query where statement
				$where_cols_n_values = array('ATT_fname' => $ATT_fname, 'ATT_lname' => $ATT_lname, 'ATT_email' => $ATT_email);
				$existing_attendee = $ATT->find_existing_attendee( $where_cols_n_values );
				// do we already have an existing record for this attendee ?
				if ( $existing_attendee = apply_filters('FHEE_EE_Single_Page_Checkout__save_registration_items__find_existing_attendee', $existing_attendee, $line_item_id, $event, $att_nmbr,$attendee )) {
					$ATT_ID = $existing_attendee->ID();
					$att[$att_nmbr] = $existing_attendee;
				} else {
					// create attendee
					$att[$att_nmbr] = EE_Attendee::new_instance(
						array(
							'ATT_fname' => $ATT_fname,
							'ATT_lname' => $ATT_lname,
							'ATT_address' => isset($attendee[4]) ? $attendee[4] : NULL,		// address
							'ATT_address2' => isset($attendee[5]) ? $attendee[5] : NULL,		// address2
							'ATT_city' => isset($attendee[6]) ? $attendee[6] : NULL,		// city
							'STA_ID' => isset($attendee[7]) ? $attendee[7] : NULL,		// state
							'CNT_ISO' => isset($attendee[8]) ? $attendee[8] : NULL,		// country
							'ATT_zip' => isset($attendee[9]) ? $attendee[9] : NULL,		// zip
							'ATT_email' => $ATT_email,		// address
							'ATT_phone' => isset($attendee[10]) ? $attendee[10] : NULL,		// phone
							'ATT_social' => NULL		// social
						)
					);
					
					//add attendee to db
					$att_results = $att[$att_nmbr]->save();
					$ATT_ID = $att[$att_nmbr]->ID();
					do_action('AHEE__EE_Single_Page_Checkout__process_registration_step_3__after_attendee_save',$att_nmbr,$att[$att_nmbr]);
				}				
				
				// add attendee object to attendee info in session
				$session['cart']['REG']['items'][$line_item_id]['attendees'][$att_nmbr]['att_obj'] = base64_encode( serialize( $att[$att_nmbr] ));

				$TKT_ID = $event['options']['ticket_id'];
				$DTT_ID = $event['options']['dtt_id'];

				$session_snip =  substr( $session['id'], 0, 3 ) . substr( $session['id'], -3 );				
				$new_reg_code = $transaction->ID() . '-' . $DTT_ID . $TKT_ID . $att_nmbr . '-' . $session_snip . ( absint( date( 'i' ) / 2 ));				
				$new_reg_code = apply_filters( 'FHEE_new_registration_code', $new_reg_code );
				
				if ( has_filter( 'FHEE_new_registration_code' ) ) {
					$prev_reg_code = $new_reg_code;
				} else {
					$prev_reg_code = '%-' . $DTT_ID . $TKT_ID . $att_nmbr . '-' . $session_snip . ( absint( date( 'i' ) / 2 )) . '%';
				}					

				// now create a new registration for the attendee
				$new_reg = EE_Registration::new_instance(
					// REG_ID, EVT_ID, ATT_ID, TXN_ID, TKT_ID, STS_ID, REG_date, REG_final_price, REG_session, REG_code, REG_url_link, REG_count, REG_group_size, REG_att_is_going
					array(	
						'EVT_ID' => $event['id'],
						'ATT_ID' => $ATT_ID,
						'TXN_ID' => $transaction->ID(),
						'TKT_ID' => $TKT_ID,
						'STS_ID' => EE_Registry::instance()->CFG->registration->default_STS_ID,
						'REG_date' => current_time('timestamp'),
						'REG_final_price' => $attendee['price_paid'],
						'REG_session' => $session['id'],
						'REG_code' => $new_reg_code,
						'REG_url_link' => md5( $new_reg_code ),
						'REG_count' => $att_nmbr,
						'REG_group_size' => count($event['attendees']),
						'REG_att_is_going' => FALSE
					)
				);

				$saved_registrations[$line_item_id][$att_nmbr] = $new_reg;
				//printr( $reg[$line_item_id], '$reg[$line_item_id] ( ' . __FUNCTION__ . ' on line: ' .  __LINE__ . ' )' );die();

				$reg_results = $saved_registrations[$line_item_id][$att_nmbr]->save();
				$REG_ID = $saved_registrations[$line_item_id][$att_nmbr]->ID();
				
				// increment tickets sold
				

				// add attendee object to attendee info in session
//				$session['cart']['REG']['items'][$line_item_id]['attendees'][$att_nmbr]['reg_obj'] = base64_encode( serialize( $saved_registrations[$line_item_id][$att_nmbr] ));
				$session['cart']['REG']['items'][$line_item_id]['attendees'][$att_nmbr]['reg_obj'] = $saved_registrations[$line_item_id][$att_nmbr];

				// add registration id to session for the primary attendee
				if (isset($attendee['primary_attendee']) && $attendee['primary_attendee'] == 1) {
					$primary_attendee = $session['primary_attendee'];
					$primary_attendee['registration_id'] = $new_reg_code;
					EE_Registry::instance()->SSN->set_session_data(array('primary_attendee' => $primary_attendee), 'session_data');
				}
				
				EE_Registry::instance()->SSN->set_session_data( $session['cart'] );
				// save attendee question answerss
				$exclude = array( 'price_paid', 'primary_attendee', 'att_obj', 'reg_obj', 'additional_attendee_reg_info' );
//				printr( $reg_items, '$reg_items  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
				
				foreach ( $reg_items[ $line_item_id ]['attendees'][ $att_nmbr ] as $QST_ID => $answer ) {
					if ( ! in_array( $QST_ID, $exclude ) && ! empty( $answer )) {
						// convert system string QST_IDs like 'fname' to their numeric equivalents
						if(! is_int($QST_ID) && ! intval($QST_ID)){
							$QST_ID = EEM_Question::instance()->get_Question_ID_from_system_string($QST_ID);//array_key_exists( $QST_ID, $system_IDs ) ? $system_IDs[ $QST_ID ] : $QST_ID;
						}
						$ans = EE_Answer::new_instance(
								array(
									'REG_ID'=>$REG_ID, 
									'QST_ID'=>$QST_ID, 
									'ANS_value'=>$answer));//use model object because it handles validation
						$ans->save();
					}
				}
			}
		}
		return $saved_registrations;
	}





	
	/**
	 * 		_process_attendee_questions
	 *
	 * 		@access 		private
	 * 		@param 		string 		$success_msg
	 * 		@return 		void
	 */
/*	private function _process_attendee_questions( $REG_ID, $line_item_id = FALSE, $att_nmbr = 1 ) {
			
		if ( empty( $line_item_id )) {
			EE_Error::add_error( __( 'An error occured. Can not save attendee questions because no line item ID was received.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			return false;
		}
			
		global, $wpdb;

		// grab session data
		$session = $this->EE->SSN->get_session_data();
		$reg_items = $session['cart']['REG']['items'];
		$exclude = array( 'price_paid', 'primary_attendee', 'att_obj', 'reg_obj' );
		
		foreach ( $reg_items[ $line_item_id ]['attendees'][ $att_nmbr ] as $QST_ID => $answer ) {
			if ( ! in_array( $QST_ID, $exclude ) && ! empty( $answer )) {
				EEM_Answer::instance()->insert( array( 'REG_ID' =>$REG_ID, 'QST_ID' =>$QST_ID, 'ANS_value' =>sanitize_text_field( $answer )));
			}
		}

	}*/





	
	/**
	 * 		send reg step 3 ajax response
	 *
	 * 		@access 		private
	 * 		@param 		string 		$success_msg
	 * 		@return 		JSON
	 */
	private function _send_reg_step_3_ajax_response($args, $success_msg) {

		// Sidney is watching me...   { : \
		do_action('AHEE_log', __FILE__, __FUNCTION__, '');
		$response_data = array(
				'success' => $success_msg,
				'return_data' => array('redirect-to-thank-you-page' => $this->_thank_you_page_url)
		);

		echo json_encode($response_data);
		// to be... or...
		die();
	}

	
	
	/**
	 *   handle ajax message responses
	 *
	 *   @access public
	 *   @return void
	 */
	public function send_ajax_response($success_msg = FALSE, $error_msg = FALSE, $callback = FALSE, $callback_param = FALSE) {

		$valid_callback = FALSE;
		// check for valid callback function
		if ($callback != FALSE && $callback != '' && !function_exists($callback)) {
			$valid_callback = TRUE;
		}
//		echo '<h4>$success_msg : ' . $success_msg . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		echo '<h4>$error_msg : ' . $error_msg . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		echo '<h4>$this->EE->REQ->ajax : ' . $this->EE->REQ->ajax . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
		if ($success_msg) {
			// if this is an ajax request AND a callback function exists
			if ( $this->EE->REQ->ajax  && $valid_callback) {
				// send data through to the callback function
				$this->$callback( $callback_param, $success_msg );
			} elseif ( $this->EE->REQ->ajax ) {
				// just send the ajax
				echo json_encode( array( 'success' => $success_msg ));
				// to be... or...
				die();
			} else {
				// not ajax
				EE_Error::add_success( $success_msg, __FILE__, __FUNCTION__, __LINE__ );
				// return true to advance to next step
				return TRUE;
			}
		} elseif ($error_msg) {

			if ( $this->EE->REQ->ajax ) {
				echo json_encode( array( 'error' => $error_msg ));
				die();
			} else {
				EE_Error::add_error( $error_msg, __FILE__, __FUNCTION__, __LINE__ );
				// return false to return to retry step
				return FALSE;
			}
		}
	}







}




// End of file EED_Single_Page_Checkout.module.php
// Location: /modules/single_page_checkout/EED_Single_Page_Checkout.module.php