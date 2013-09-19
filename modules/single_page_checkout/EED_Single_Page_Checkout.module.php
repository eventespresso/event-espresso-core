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
	// thank you page
	private $_thank_you_page_url = '';

	private $_templates = array();



 
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
		// routing
		EE_Config::register_route( 'register', 'EED_Single_Page_Checkout', 'run' );
		EE_Config::register_route( 'process_reg_step_1', 'EED_Single_Page_Checkout', 'process_reg_step_1' );
		EE_Config::register_route( 'process_reg_step_2', 'EED_Single_Page_Checkout', 'process_reg_step_2' );
		EE_Config::register_route( 'process_reg_step_3', 'EED_Single_Page_Checkout', 'process_reg_step_3' );
		// hooks
		add_action( 'wp_loaded', array( 'EED_Single_Page_Checkout', 'set_definitions' ), 2 );
	}



	/**
	 * 	set_hooks_admin - for hooking into EE Admin Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks_admin() {
		add_action( 'wp_loaded', array( 'EED_Single_Page_Checkout', 'set_definitions' ), 2 );
		// AJAX
		add_action('wp_ajax_espresso_process_registration_step_1', array( 'EED_Single_Page_Checkout', 'process_reg_step_1'));
		add_action('wp_ajax_espresso_process_registration_step_2', array( 'EED_Single_Page_Checkout', 'process_reg_step_2'));
		add_action('wp_ajax_espresso_process_registration_step_3', array( 'EED_Single_Page_Checkout', 'process_reg_step_3'));
		// no priv AJAX
		add_action('wp_ajax_nopriv_espresso_process_registration_step_1', array( 'EED_Single_Page_Checkout', 'process_reg_step_1'));
		add_action('wp_ajax_nopriv_espresso_process_registration_step_2', array( 'EED_Single_Page_Checkout', 'process_reg_step_2'));
		add_action('wp_ajax_nopriv_espresso_process_registration_step_3', array( 'EED_Single_Page_Checkout', 'process_reg_step_3'));
	}



	/**
	 * 	ajax_process_registration_steps
	 */
	public static function 	process_reg_step_1() {
		$SPCO = EED_Single_Page_Checkout::instance();
		$SPCO->init();
		$SPCO->process_registration_step_1();
	}
	
	
	public static function 	process_reg_step_2() {
		$SPCO = EED_Single_Page_Checkout::instance();
		$SPCO->init();
		$SPCO->process_registration_step_2();
	}
	
	
	public static function process_reg_step_3() {
		$SPCO = EED_Single_Page_Checkout::instance();
		$SPCO->init();
		$SPCO->process_registration_step_3();
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
		$this->EE->load_class( 'Cost_Calculator' );
		$this->EE->load_class( 'Taxes', array(), FALSE, FALSE, TRUE );
		$this->set_templates();
		$this->_reg_page_base_url = get_permalink( $this->EE->CFG->core->reg_page_id );		
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
		//printr( $this->EE->CART, '$this->EE->CART  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
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
		$this->_templates['registration_page_step_1'] = SPCO_TEMPLATES_PATH . 'registration_page_step_1.template.php';
		$this->_templates['registration_page_step_2'] = SPCO_TEMPLATES_PATH . 'registration_page_step_2.template.php';
		$this->_templates['registration_page_step_3'] = SPCO_TEMPLATES_PATH . 'registration_page_step_3.template.php';
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

		//$template_args['currency_symbol'] = $this->EE->CFG->currency->sign;

		$template_args['css_class'] = '';
		$template_args['confirmation_data'] = '';

		// grab what step we're on
		$step = $this->EE->REQ->is_set( 'step' ) ? absint( $this->EE->REQ->get( 'step' )) : 1;
		$reg_url_link = $this->EE->REQ->is_set( 'e_reg_url_link' ) ? $this->EE->REQ->get( 'e_reg_url_link' ) : FALSE;
		// if reg_url_link is present in the request, then we are only being sent back to SPCO to retry the payment 
		if ( $reg_url_link ) {
			$this->EE->load_model( 'Transaction' );
			$transaction = $this->EE->LIB->EEM_Transaction->get_transaction_from_reg_url_link();
			// grab session data from saved TXN record
			$session = $transaction->session_data();
			// unset some values that we don't want changing'
			unset( $session['id'] );
			unset( $session['user_id'] );
			unset( $session['ip_address'] );
			unset( $session['user_agent'] );
			unset( $session['init_access'] );
			unset( $session['last_access'] );
			unset( $session['gateway_data'] );
			$session['transaction'] = $transaction;
			$this->EE->SSN->set_session_data( $session, 'session_data' );
			$this->EE->CART->reset_cart();

		}

		// use step to change css classes for displaying how far along the reg process we have gotten
		switch ($step) {

			case 1:
				$template_args['step_display_dv_1_class'] = 'active-step';
				$template_args['step_display_dv_2_class'] = 'inactive-step';
				$template_args['step_display_dv_3_class'] = 'inactive-step';
				$template_args['step_1_dv_class'] = '';
				$template_args['step_1_edit_lnk_class'] = 'hidden';
				$template_args['step_2_dv_class'] = 'hidden';
				$template_args['step_2_edit_lnk_class'] = 'hidden';
				$template_args['step_3_dv_class'] = 'hidden';
				$template_args['step_3_edit_lnk_class'] = 'hidden';
				break;

			case 2:
				$template_args['step_display_dv_1_class'] = 'inactive-step';
				$template_args['step_display_dv_2_class'] = 'active-step';
				$template_args['step_display_dv_3_class'] = 'inactive-step';
				$template_args['step_1_dv_class'] = 'hidden';
				$template_args['step_1_edit_lnk_class'] = '';
				$template_args['step_2_dv_class'] = '';
				$template_args['step_2_edit_lnk_class'] = 'hidden';
				$template_args['step_3_dv_class'] = 'hidden';
				$template_args['step_3_edit_lnk_class'] = 'hidden';
				break;

			case 3:
				$template_args['step_display_dv_1_class'] = 'inactive-step';
				$template_args['step_display_dv_2_class'] = 'inactive-step';
				$template_args['step_display_dv_3_class'] = 'active-step';
				$template_args['step_1_dv_class'] = 'hidden';
				$template_args['step_1_edit_lnk_class'] = '';
				$template_args['step_2_dv_class'] = 'hidden';
				$template_args['step_2_edit_lnk_class'] = '';
				$template_args['step_3_dv_class'] = '';
				$template_args['step_3_edit_lnk_class'] = 'hidden';

				$template_args['confirmation_data'] = $this->display_data_for_confirmation();

				break;
		}

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
		// printr(  $template_args, '$template_args' );
		// printr(  $_REQUEST, '$_REQUEST' );
		// printr(  $_POST, '$_POST' );
		// die();



		$grand_total = 0;
		$total_items = 0;

		$event_queue = array();
		$step_1_line_items = '';

//		$additional_event_registration_info = new stdClass();
//		$additional_event_registration_info = apply_filters( 'FHEE_additional_event_registration_info_init', $additional_event_registration_info );

		$events_requiring_pre_approval = array();
		$events_that_use_coupon_codes = array();
		$events_that_use_groupon_codes = array();
		$template_args['reg_page_discounts_dv_class'] = 'hidden';


		$template_args['whats_in_the_cart'] = '';

		$cart_types = $this->EE->CART->get_cart_types();

		foreach ($cart_types as $cart_type) {

			$cart_contents = $this->EE->CART->whats_in_the_cart($cart_type);
			//printr( $cart_contents, '$cart_contents  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

			$event_queue[$cart_type]['title'] = __('Registrations', 'event_espresso');
			$attendee_headings = array();
			$additional_attendees = array();
			$additional_attendee_forms = TRUE;
			$target_inputs = '';
			if ($cart_contents['total_items'] !== 0) {

				$event_queue[$cart_type]['has_items'] = TRUE;

				$x = 1;
				$counter = 1;
				
				foreach ($cart_contents['items'] as $item) {
					//printr( $item, '$item  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
					$step_1_line_items .= '#mer-reg-page-line-item-' . $item['id'];					
					$event_queue[$cart_type]['items'][$item['line_item_id']]['id'] = $item['id'];
					$event_queue[$cart_type]['items'][$item['line_item_id']]['name'] = stripslashes( $item['name'] );
					$event_queue[$cart_type]['items'][$item['line_item_id']]['ticket_desc'] = stripslashes( $item['options']['ticket_desc'] );
					$event_queue[$cart_type]['items'][$item['line_item_id']]['ticket'] = $item['ticket'];
					$event_queue[$cart_type]['items'][$item['line_item_id']]['qty'] = $item['qty'];
					$event_queue[$cart_type]['items'][$item['line_item_id']]['line_total'] = EEH_Template::format_currency( $item['line_total'], TRUE );

					// get additional event registration details not currently in the sesion/cart
					//$event_reg_details = $this->_get_event_reg_details($item['id']);
					//echo printr($event_reg_details);

					//$event_reg_details->question_groups = maybe_unserialize($event_reg_details->question_groups);
					//$event_reg_details->event_meta = maybe_unserialize($event_reg_details->event_meta);

//					 echo '<h2>require pre approval : ' . $event_reg_details->require_pre_approval . '</h2>';
//					 echo '<h2>use coupon code : ' . $event_reg_details->use_coupon_code . '</h2>';
//					 echo '<h2>use groupon code : ' . $event_reg_details->use_groupon_code . '</h2>';

//					if ($event_reg_details->require_pre_approval == 1) {
//						$events_requiring_pre_approval[$cart_type]['items'][$item['line_item_id']] = array('id' => $item['id'], 'name' => $item['name'], 'ticket' => $item['ticket'], 'qty' => $item['qty']);
//					}

//					if ($event_reg_details->use_coupon_code) {
//						$events_that_use_coupon_codes[$cart_type]['items'][$item['line_item_id']] = array('id' => $item['id'], 'name' => $item['name'], 'ticket' => $item['ticket'], 'qty' => $item['qty']);
//					}
//
//					if (defined('EVENTS_GROUPON_CODES_TABLE') && $event_reg_details->use_groupon_code) {
//						$events_that_use_groupon_codes[$cart_type]['items'][$item['line_item_id']] = array('id' => $item['id'], 'name' => $item['name'], 'ticket' => $item['ticket'], 'qty' => $item['qty']);
//					}

					// $additional_event_registration_info = apply_filters( 'FHEE_additional_event_registration_info', $additional_event_registration_info );
					// $event_queue[$cart_type]['items'][ $item['line_item_id'] ]['extra_reg_info'] = $additional_event_registration_info;

					$questions_and_groups = $this->EE->load_model( 'Question_Group' )->get_all( array(
						array(
							'Event.EVT_ID' => $item['id']
						)
					));
//					printr( $questions_and_groups, '$questions_and_groups  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );


					$attendee_questions = array();
					
					$price_id = $item['ticket'] * 100;
					$tckt_date = $item['options']['date'];
					$find = array("\xC2\xA0", "\x20", "&#160;", "&nbsp;", ' ');
					$tckt_date = str_replace($find, '_', $tckt_date);

					$tckt_time = $item['options']['time'] * 100;

					// foreach ticket being purchased
					for ($att_nmbr = 1; $att_nmbr <= $item['qty']; $att_nmbr++) {

						$input_id = $item['id'] . '-' . $att_nmbr . '-' . $tckt_date . '-' . $tckt_time . '-' . $price_id;
						$input_name = '[' . $item['id'] . '][' . $att_nmbr . '][' . $tckt_date . '][' . $tckt_time . '][' . $price_id . ']';

						//echo '<h4>$input_id : ' . $input_id . '  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';
						//echo '<h4>$input_name : ' . $input_name . '  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';					
						$additional_attendee_reg_info = 1;
						if ( isset( $item['options']['event_meta'] )) {
							$event_meta =unserialize( base64_decode( $item['options']['event_meta'] ));
							$additional_attendee_reg_info = isset( $event_meta['additional_attendee_reg_info'] ) ? absint( $event_meta['additional_attendee_reg_info'] ) : 1;
						}

					
//					echo '<h4>$att_nmbr : ' . $att_nmbr . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//					echo '<h4>$additional_attendee_reg_info : ' . $additional_attendee_reg_info . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';

						$question_meta = array(
								'EVT_ID' => $item['id'],
								'att_nmbr' => $att_nmbr,
								'price_id' => $price_id,
								'ticket_id' => $item['ticket_id'],
								'date' => $tckt_date,
								'time' => $tckt_time,
								'input_name' => $input_name,
								'input_id' => $input_id,
								'input_class' => 'ee-reg-page-questions' . $template_args['css_class'],
								'additional_attendee_reg_info' => $additional_attendee_reg_info,
								'attendee' => isset( $item['attendees'] ) && isset( $item['attendees'][ $att_nmbr ] ) ? $item['attendees'][ $att_nmbr ] : FALSE
						);
						//printr( $question_meta, '$question_meta  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

						add_filter( 'FHEE_form_field_label_html', array( $this, 'reg_form_form_field_label_wrap' ), 10, 1 );
						add_filter( 'FHEE_form_field_input_html', array( $this, 'reg_form_form_field_input__wrap' ), 10, 1 );
						
						$att_questions = EEH_Form_Fields::generate_question_groups_html2( $questions_and_groups, $question_meta, 'div' );

						// show this attendee form?
						if ( empty( $att_questions )) {
							$additional_attendee_forms = FALSE;
							$att_questions .= '<p>' . __('This event does not require registration information for additional attendees.', 'event_espresso') . '</p>';
							$att_questions .= '
								<input
										type="hidden"
										id="' . $input_id . '-additional_attendee_reg_info"
										name="qstn' . $input_name . '[additional_attendee_reg_info]"
										value="'.$additional_attendee_reg_info.'"
								/>' . "\n";
						}

						$att_questions .= '
							<input
									type="hidden"
									id="' . $input_id . '-line_item_id"
									name="qstn' . $input_name . '[line_item_id]"
									value="' . $item['line_item_id'] . '"
							/>' . "\n";



						// add to array
						$attendee_questions[$item['line_item_id']][$att_nmbr] = $att_questions;
						//fieldset legend
						$attendee_headings[$item['line_item_id']][$att_nmbr] = __('Attendee #', 'event_espresso') . $att_nmbr;

						// for all  attendees other than the primary attendee
						if ($counter != 1) {

							$additional_attendees[$item['line_item_id']][$att_nmbr] = array(
									'event_id' => $item['id'],
									'event_name' => $item['name'],
									'att_nmbr' => $att_nmbr,
									'input_id' => $input_id,
									'input_name' => $input_name
							);
							$target_inputs .= $input_id . '&&';
							
							$item_name = $item['name'] . ' - ' . stripslashes( $item['options']['ticket_desc'] );

							if ($att_nmbr == 1) {
								// if this is the first attendee for an event then display a heading
								$additional_attendees[$item['line_item_id']][$att_nmbr]['event_hdr'] = $item_name;
							} elseif ($att_nmbr == 2 && $x == 1) {
								// OR the very first additional attendee after the primary attendee
								$additional_attendees[$item['line_item_id']][$att_nmbr]['event_hdr'] = $item_name;
							} else {
								// no heading
								$additional_attendees[$item['line_item_id']][$att_nmbr]['event_hdr'] = FALSE;
							}
						} else {

							// grab line item from primary attendee
							$prim_att_line_item = $item['line_item_id'];
							$template_args['prmy_att_input_name'] = $input_name;
						}

						// delete empty attendee placeholder
						unset($additional_attendees[$item['line_item_id']][0]);

						$counter++;
					}


					$event_queue[$cart_type]['items'][$item['line_item_id']]['attendee_headings'] = $attendee_headings;
					$event_queue[$cart_type]['items'][$item['line_item_id']]['attendee_questions'] = $attendee_questions;

					$x++;
				} // end foreach ( $cart_contents['items'] as $item )
				// delete empty placeholder data for primary attendee
				unset($additional_attendees[$prim_att_line_item][1]);
				//echo printr( $additional_attendees );

				$event_queue[$cart_type]['total_items'] = $cart_contents['total_items'];
				$event_queue[$cart_type]['sub_total'] = EEH_Template::format_currency( $cart_contents['sub_total'] );
			} else {
				// empty
				$event_queue[$cart_type]['has_items'] = FALSE;
			}

			$event_queue[$cart_type]['empty_msg'] = $cart_contents['empty_msg'];
			$total_items = $total_items + $cart_contents['total_items'];
			$grand_total = $grand_total + $cart_contents['sub_total'];
		}
		
		//printr( $event_queue, '$event_queue  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

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
//						$grand_total = $grand_total - $item['ticket'];
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


		$template_args['mer_reg_page_ajax_coupons_url'] = add_query_arg(array('ee' => 'apply_coupon'), $this->_reg_page_base_url);
		$template_args['step_1_line_items'] = $step_1_line_items;

		$template_args['target_inputs'] = rtrim($target_inputs, '&&');

		$template_args['print_copy_info'] = $additional_attendee_forms || $x > 2 ? TRUE : FALSE;
		$template_args['additional_attendees'] = $additional_attendees;

		$template_args['total_items'] = $total_items;
		$template_args['empty_cart'] = $total_items < 1 ? TRUE : FALSE;

		$template_args['payment_required'] = $grand_total > 0 ? TRUE : FALSE;
		$template_args['sub_total'] = EEH_Template::format_currency( $grand_total );

		$template_args['taxes'] = EE_Taxes::calculate_taxes( $grand_total );
		$grand_total = apply_filters( 'espresso_filter_hook_grand_total_after_taxes', $grand_total );

		$template_args['grand_total'] = EEH_Template::format_currency( $grand_total );
		$confirm_n_pay = sprintf( 
			__('YES!%1$sConfirm%1$sRegistration%1$s%2$s%1$sProceed%1$sto%1$sPayment', 'event_espresso'),
			'&nbsp;',  // %1$s
			'&amp;'	// %2$s
		);
		$confirm = sprintf( 
			__('YES!%1$sConfirm%1$sRegistration%1$s', 'event_espresso'),
			'&nbsp;'  // %1$s
		);
		$template_args['confirmation_btn_text'] = $grand_total > 0 ? $confirm_n_pay : $confirm;

		$template_args['event_queue'] = $event_queue;
		$template_args['nmbr_of_carts'] = count($event_queue);
		$template_args['images_dir_url'] = EVENT_ESPRESSO_PLUGINFULLURL . 'images/';
		$template_args['reg_url_link'] = $reg_url_link;

		$template_args['return_url'] = add_query_arg( array('ee' => 'event_queue'), $this->_reg_page_base_url );
		$template_args['update_url'] = add_query_arg( array('ee' => 'update_event_queue'), $this->_reg_page_base_url );
		$template_args['event_queue_url'] = add_query_arg( array('ee' => 'event_queue'), $this->_reg_page_base_url );
		$template_args['register_url'] = add_query_arg( array('ee' => 'register'), $this->_reg_page_base_url );
		// steps
		$template_args['reg_page_step_1_url'] = add_query_arg( array('ee' => 'register', 'step' => 1), $this->_reg_page_base_url );
		$template_args['reg_page_goto_step_2_url'] = add_query_arg( array('ee' => 'process_reg_step_1'), $this->_reg_page_base_url );
		$template_args['reg_page_goto_step_3_url'] = add_query_arg( array('ee' => 'process_reg_step_2'), $this->_reg_page_base_url );
		$template_args['reg_page_complete_reg_url'] = add_query_arg( array('ee' => 'process_reg_step_3'), $this->_reg_page_base_url );
		if ( $reg_url_link ) {
			$template_args['reg_page_step_1_url'] = add_query_arg( array( 'e_reg_url_link' => $reg_url_link ), $template_args['reg_page_step_1_url'] );
			$template_args['reg_page_goto_step_2_url'] = add_query_arg( array( 'e_reg_url_link' => $reg_url_link ), $template_args['reg_page_goto_step_2_url'] );
			$template_args['reg_page_goto_step_3_url'] = add_query_arg( array( 'e_reg_url_link' => $reg_url_link ), $template_args['reg_page_goto_step_3_url'] );
			$template_args['reg_page_complete_reg_url'] = add_query_arg( array( 'e_reg_url_link' => $reg_url_link ), $template_args['reg_page_complete_reg_url'] );			
		}
		//echo "reg page complet url:".$template_args['reg_page_complete_reg_url'];

		//Recaptcha
		$template_args['recaptcha'] = '';
		if ( $this->EE->CFG->registration->use_captcha && ( empty($_REQUEST['edit_details']) || $_REQUEST['edit_details'] != 'true') && !is_user_logged_in()) {

			if (!function_exists('recaptcha_get_html')) {
				$this->EE->load_file( EVENT_ESPRESSO_PLUGINFULLPATH . 'tpc', 'recaptchalib', '' );
			}

			// the error code from reCAPTCHA, if any
			$error = null;
			$template_args['recaptcha'] .= '
<script type="text/javascript">
/* <! [CDATA [ */
	var RecaptchaOptions = { theme : "' . $this->EE->CFG->registration->recaptcha_theme . '", lang : "' . $this->EE->CFG->registration->recaptcha_language . '" };
/*  ] ]>  */
</script>
<p class="reg-page-form-field-wrap-pg" id="spc-captcha">
	' . __('Anti-Spam Measure: Please enter the following phrase', 'event_espresso') . '
	' . recaptcha_get_html( $this->EE->CFG->registration->recaptcha_publickey, $error, is_ssl() ? true : false ) . '
';
			$template_args['recaptcha'] .= '
</p>
';
		}
		//End use captcha


		$registration_page_step_1 = espresso_display_template($this->_templates['registration_page_step_1'], $template_args, TRUE);
		$registration_page_step_2 = espresso_display_template($this->_templates['registration_page_step_2'], $template_args, TRUE);
		$registration_page_step_3 = espresso_display_template($this->_templates['registration_page_step_3'], $template_args, TRUE);

		$template_args['registration_steps'] = $registration_page_step_1 . $registration_page_step_2 . $registration_page_step_3;

		//printr( $this->EE->SSN->get_session_data(), '$this->EE->SSN  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		
		$this->EE->REQ->add_output( espresso_display_template( $this->_templates['registration_page_wrapper'], $template_args, TRUE ));
	}






	/**
	 * 		reg_form_form_field_label_wrap
	 *
	 * 		@access 		public
	 * 		@param 		string 		$label
	 * 		@return 		string
	 */
	public function reg_form_form_field_label_wrap( $label ) {
		return '<p class="reg-page-form-field-wrap-pg">' . $label;		
	}




	/**
	 * 		reg_form_form_field_input__wrap
	 *
	 * 		@access 		public
	 * 		@param 		string 		$label
	 * 		@return 		string
	 */
	public function reg_form_form_field_input__wrap( $input ) {
		return $input . '</p>';		
	}




	function sanitize_text_field_for_array_walk( &$item, &$key ) {
	   $item = sanitize_text_field( $item );
	}


	/**
	 * 		process_registration_step_1
	 *
	 * 		@access 		public
	 * 		@param 		string 		$event_id
	 * 		@return 		int
	 */
	public function process_registration_step_1() {
		do_action('AHEE_log', __FILE__, __FUNCTION__, '');

		$success_msg = FALSE;
		$error_msg = FALSE;

		// don't need these so get rid of them so they don't get processed
		unset($_POST['action']);
		unset($_REQUEST['espresso_ajax']);

		// some empty containers
		$attendees = array();
		$primary_attendee = array();
		$valid_data = array();

		// loop through post data and sanitize all elements
		array_walk_recursive( $_POST, array( $this, 'sanitize_text_field_for_array_walk' ));
		$valid_data = $_POST;
		$valid_data = apply_filters( 'FHEE__EE_Single_Page_Checkout__process_registration_step_1__valid_data', $valid_data );
//		printr( $valid_data, '$valid_data  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//		printr( $this->EE->SSN, '$this->EE->SSN  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

		// if we don't have a qstn field then something went TERRIBLY WRONG !!! AHHHHHHHH!!!!!!!
		if (isset($valid_data['qstn'])) {
		
			if (isset($valid_data['qstn']['custom_questions'])) {
				$custom_questions = $valid_data['qstn']['custom_questions'];
				$this->EE->SSN->set_session_data(array('custom_questions'=>$custom_questions), 'session_data');
//				printr( $valid_data['qstn']['custom_questions'], 'custom_questions  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
				unset($valid_data['qstn']['custom_questions']);
			}
			
			$this->EE->load_helper( 'Template' );
			
			// now loop through our array of valid post data
			foreach ($valid_data['qstn'] as $event_id => $event_data) {
				// continue to drill down through the array and set paramaters
				foreach ($event_data as $att_nmbr => $att_event_data) {
					foreach ($att_event_data as $event_date => $event_details) {
						foreach ($event_details as $event_time => $tckt_details) {
							foreach ($tckt_details as $tckt_price => $att_details) {
								foreach ($att_details as $form_input => $input_value) {
									$line_item_id = $att_details['line_item_id'];
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
										$primary_attendee['line_item_id'] = $line_item_id;
										//$primary_attendee['registration_id'] = $registration_id;
										$primary_attendee['fname'] = $valid_data['qstn'][$event_id][$att_nmbr][$event_date][$event_time][$tckt_price]['fname'];
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
						}
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
		$remove = array( 'ajax_action', 'espresso_ajax', 'noheader', 'mer-reg-page-go-to-step-2-sbmt-btn' );
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
				$template_args['events'][$line_item_id]['ticket-price'] = stripslashes( trim( $event['options']['ticket_desc'] )) . ': ' . EEH_Template::format_currency( $event['ticket'] );
	
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

			$ouput = espresso_display_template($this->_templates['confirmation_page'], $template_args, TRUE);
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
			do_action('AHEE__EE_Single_Page_Checkout__process_registration_step_3__before_gateway', $this);
			$response = $this->EE->LIB->EEM_Gateways->process_reg_step_3();
			$this->_thank_you_page_url = $response['forward_url'];
			if(isset($response['msg']['success'])){
				$success_msg = $response['msg']['success'];
			}else{
				$error_msg = $response['msg']['error'];
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
				// do we already have an existing record for this attendee ?
				if ( $existing_attendee = apply_filters('FHEE_EE_Single_Page_Checkout__save_registration_items__find_existing_attendee',$ATT->find_existing_attendee( $where_cols_n_values ),$line_item_id,$event,$att_nmbr,$attendee)) {
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
				$price_paid = $attendee['price_paid'];

				$session_snip =  substr( $session['id'], 0, 3 ) . substr( $session['id'], -3 );				
				$new_reg_code = $transaction->ID() . '-' . $event['id'] . $TKT_ID . $att_nmbr . '-' . $session_snip . ( absint( date( 'i' ) / 2 ));				
				$new_reg_code = apply_filters( 'FHEE_new_registration_code', $new_reg_code );
				
				if ( has_filter( 'FHEE_new_registration_code' ) ) {
					$prev_reg_code = $new_reg_code;
				} else {
					$prev_reg_code = '%-' . $event['id'] . $TKT_ID . $att_nmbr . '-' . $session_snip . ( absint( date( 'i' ) / 2 )) . '%';
				}					

				// now create a new registration for the attendee
				$reg_url_link=md5($new_reg_code);
				$saved_registrations[$line_item_id][$att_nmbr] = EE_Registration::new_instance(
					// REG_ID, EVT_ID, ATT_ID, TXN_ID, TKT_ID, STS_ID, REG_date, REG_final_price, REG_session, REG_code, REG_url_link, REG_count, REG_group_size, REG_att_is_going
					array(	
						'EVT_ID' => $event['id'],
						'ATT_ID' => $ATT_ID,
						'TXN_ID' => $transaction->ID(),
						'TKT_ID' => $TKT_ID,
						'STS_ID' => EE_Registry::instance()->CFG->registration->default_STS_ID,
						'REG_date' => current_time('timestamp'),
						'REG_final_price' => $price_paid,
						'REG_session' => $session['id'],
						'REG_code' => $new_reg_code,
						'REG_url_link' => $reg_url_link,
						'REG_count' => $att_nmbr,
						'REG_group_size' => count($event['attendees']),
						'REG_att_is_going' => FALSE
					)
				);
				//printr( $reg[$line_item_id], '$reg[$line_item_id] ( ' . __FUNCTION__ . ' on line: ' .  __LINE__ . ' )' );die();

				$reg_results = $saved_registrations[$line_item_id][$att_nmbr]->save();
				$REG_ID = $saved_registrations[$line_item_id][$att_nmbr]->ID();

				// add attendee object to attendee info in session
				$session['cart']['REG']['items'][$line_item_id]['attendees'][$att_nmbr]['reg_obj'] = base64_encode( serialize( $saved_registrations[$line_item_id][$att_nmbr] ));

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