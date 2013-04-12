<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
do_action('action_hook_espresso_log', __FILE__, ' FILE LOADED', '' );/**
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
 * Single Page Checkout class
 *
 * @package				Event Espresso
 * @subpackage			 Single Page Checkout
 * @author					Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EE_Single_Page_Checkout {

// instance of the EE_Single_Page_Checkout object
	private static $_instance = NULL;
// base url for the site's registration page - additional url params will be added to this
	private $_reg_page_base_url = '';
// array to hold parameters for the registration button
	private $_reg_btn = array();
// url for thank you page
	private $_return_page_url = FALSE;
	private $_templates = array();
	private $_ajax = 0;
	public $cart;

	/**
	 * 		@singleton method used to instantiate class object
	 * 		@access public
	 * 		@return class instance
	 */
	public static function instance() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
// check if class object is instantiated
		if (self::$_instance === NULL or !is_object(self::$_instance) or !is_a(self::$_instance, __CLASS__)) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	/**
	 * 		private constructor to prevent direct creation
	 * 		@Constructor
	 * 		@access private
	 * 		@return void
	 */
	private function __construct() {

		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		
		if ( isset($_POST['espresso_ajax']) && $_POST['espresso_ajax'] == 1 ) {
			$this->_ajax = 1;
		} else if (  isset($_REQUEST['espresso_ajax']) && $_REQUEST['espresso_ajax'] == 1 ) {
			$this->_ajax = 1;
		} else {
			 $this->_ajax = 0;
		}		
//		echo '<h4>$this->_ajax : ' . $this->_ajax . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		printr( $_POST, '$_POST  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );						 

		if ( $this->_ajax ) {

			add_action('wp_ajax_espresso_process_registration_step_1', array(&$this, 'process_registration_step_1'));
			add_action('wp_ajax_nopriv_espresso_process_registration_step_1', array(&$this, 'process_registration_step_1'));

			add_action('wp_ajax_espresso_process_registration_step_2', array(&$this, 'process_registration_step_2'));
			add_action('wp_ajax_nopriv_espresso_process_registration_step_2', array(&$this, 'process_registration_step_2'));

			add_action('wp_ajax_espresso_process_registration_step_3', array(&$this, 'process_registration_step_3'));
			add_action('wp_ajax_nopriv_espresso_process_registration_step_3', array(&$this, 'process_registration_step_3'));
		}
	
		// load classes
		$this->load_classes();

		global $is_UI_request;
		$this->set_templates();
		
		$e_reg_pages = array( 'register', 'process_reg_step_1', 'process_reg_step_2', 'process_reg_step_3', 'event_queue' );
		if (( isset( $_REQUEST['e_reg'] ) && ( in_array($_REQUEST['e_reg'], $e_reg_pages))) || $this->_ajax ) {
		
			if ( $is_UI_request ) {
				add_action('init', array(&$this, 'translate_js_strings'), 19);
				add_action('init', array(&$this, 'load_css'), 20);
				add_action('init', array(&$this, 'load_js'), 20);
			}
			
			// hooks that happen during the regevent action and other pathing stuff
			add_action('init', array(&$this, 'set_paths_and_routing'), 30);

		}
	
	}

	/**
	 * 		load resources required during the checkout process
	 *
	 * 		@access 		public
	 * 		@return 		void
	 */
	public function load_classes() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		
		global $EE_Cart, $EEM_Gateways, $EE_Session;
		
		if (!defined('ESPRESSO_CART')) {
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Cart.class.php');
			// instantiate the class object
			$EE_Cart = EE_Cart::instance();
		}
		// make all cart properties and methods accessible via $this->cart ex: $this->cart->data();
		$this->cart = $EE_Cart;
		
		// load gateways
		if (!defined('ESPRESSO_GATEWAYS')) {
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Gateways.model.php');
			$EEM_Gateways = EEM_Gateways::instance();
		}
		$this->gateways = $EEM_Gateways;
		$this->gateways->set_ajax( $this->_ajax );
		
		//taxes
		require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Taxes.class.php' );
		add_filter( 'espresso_filter_hook_calculate_taxes', array( 'EE_Taxes', 'calculate_taxes' ));

	}

	/**
	 * 		set templates
	 *
	 * 		@access 		public
	 * 		@return 		void
	 */
	public function set_templates() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		$this->_templates['registration_page_wrapper'] = EVENT_ESPRESSO_PLUGINFULLPATH . 'templates/reg_page_checkout/registration_page_wrapper.template.php';
		$this->_templates['registration_page_step_1'] = EVENT_ESPRESSO_PLUGINFULLPATH . 'templates/reg_page_checkout/registration_page_step_1.template.php';
		$this->_templates['registration_page_step_2'] = EVENT_ESPRESSO_PLUGINFULLPATH . 'templates/reg_page_checkout/registration_page_step_2.template.php';
		$this->_templates['registration_page_step_3'] = EVENT_ESPRESSO_PLUGINFULLPATH . 'templates/reg_page_checkout/registration_page_step_3.template.php';
		$this->_templates['confirmation_page'] = EVENT_ESPRESSO_PLUGINFULLPATH . 'templates/reg_page_checkout/confirmation_page.template.php';
	}

	/**
	 * 		translate_js_strings
	 *
	 * 		@access 		public
	 * 		@return 		void
	 */
	public function translate_js_strings() {
		global $eei18n_js_strings;
		$eei18n_js_strings['invalid_coupon'] = __('We\'re sorry but that coupon code does not appear to be vaild. If this is incorrect, please contact the site administrator.', 'event_espresso');
		$eei18n_js_strings['required_field'] = __(' is a required field. Please enter a value for this field and all other required fields before preceeding.', 'event_espresso');
		$eei18n_js_strings['reg_step_error'] = __('An error occured! This registration step could not be completed. Please refresh the page and try again.', 'event_espresso');
		$eei18n_js_strings['answer_required_questions'] = __('You need to answer all required questions before you can proceed.', 'event_espresso');
		$eei18n_js_strings['enter_valid_email'] = __('You must enter a valid email address.', 'event_espresso');
		$eei18n_js_strings['valid_email_and_questions'] = __('You must enter a valid email address and answer all other required questions before you can proceed.', 'event_espresso');
	}

	/**
	 * 		load css
	 *
	 * 		@access 		public
	 * 		@return 		void
	 */
	public function load_css() {
//		if (isset($_REQUEST['e_reg']) && ( $_REQUEST['e_reg'] == 'register' && !is_admin() )) {
			do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
			wp_register_style('single_page_checkout', EVENT_ESPRESSO_PLUGINFULLURL . 'templates/reg_page_checkout/registration_page_checkout.css');
			wp_enqueue_style('single_page_checkout');
//		}
	}

	/**
	 * 		load js
	 *
	 * 		@access 		public
	 * 		@return 		void
	 */
	public function load_js() {
//		if (isset($_REQUEST['e_reg']) && ( $_REQUEST['e_reg'] == 'register' && !is_admin() )) {
			do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
			wp_register_script('single_page_checkout', EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/registration_page_checkout.js', array('jquery'), '', TRUE);
			wp_enqueue_script('single_page_checkout');
	}


	/**
	 * 		set_paths_and_routing
	 *
	 * 		@access 		public
	 * 		@return 		void
	 */
	public function set_paths_and_routing() {
		// grab some globals store them by reference
		global $org_options;

		$event_page_id = $org_options['event_page_id'];
		// get permalink for registration page
		// to ensure that it ends with a trailing slash, first we remove it (in case it is there) then add it again
		$this->_reg_page_base_url = rtrim(get_permalink($event_page_id), '/').'/';

		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, $event_page_id . '|' . $this->_reg_page_base_url);

		// set pathing based on regevent request
		if ( isset($_REQUEST['e_reg']) && ! empty( $_REQUEST['e_reg'] )) {
			
//			echo '<h4>e_reg : ' . $_REQUEST['e_reg'] . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
			
			switch ($_REQUEST['e_reg']) {

				case 'register' :
					add_action('action_hook_espresso_event_reg_checkout', array(&$this, '_event_reg_single_page_checkout'), 10, 2);
					break;


				case 'process_reg_step_1' :
					remove_all_actions('action_hook_espresso_regevent_default_action');
					remove_all_actions('action_hook_espresso_event_registration');
					$this->process_registration_step_1();
					break;


				case 'process_reg_step_2' :
					remove_all_actions('action_hook_espresso_regevent_default_action');
					remove_all_actions('action_hook_espresso_event_registration');
					$this->process_registration_step_2();
					break;


				case 'process_reg_step_3' :
					remove_all_actions('action_hook_espresso_regevent_default_action');
					remove_all_actions('action_hook_espresso_event_registration');
					$this->process_registration_step_3();
					break;


				default :
					// empty cart or else items build up indefinately
					if ( ! defined( 'MER_ACTIVE' )) {
						$this->cart->empty_cart('AJAX');
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
	public function _event_reg_single_page_checkout() {

		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
//		printr( $this->cart->whats_in_the_cart(), 'whats_in_the_cart  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

		global $org_options, $espresso_wp_user, $EE_Session;
		
		require_once( EVENT_ESPRESSO_PLUGINFULLPATH . 'helpers/EE_Form_Fields.helper.php' );

		$template_args = array();

		// retreive all success and error messages
		$notices = EE_Error::get_notices(FALSE);
		// success messages
		$template_args['success_msg'] = empty($notices['success']) ? '' : $notices['success'];
		$template_args['success_msg_class'] = empty($notices['success']) ? ' ui-helper-hidden' : ' fade-away';
		// error messages - none right?  : )
		$template_args['error_msg'] = empty($notices['errors']) ? '' : $notices['errors'];
		$template_args['error_msg_class'] = empty($notices['errors']) ? ' ui-helper-hidden' : ' fade-away';

		$template_args['currency_symbol'] = $org_options['currency_symbol'];
		$template_args['reg_page_url'] = $this->_reg_page_base_url;

		$template_args['css_class'] = ' ui-widget-content ui-corner-all';
		$template_args['confirmation_data'] = '';

		// grab what step we're on
		if (isset($_GET['step'])) {
			$step = absint($_GET['step']);
		} else {
			$step = 1;
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
				
				echo '<h1>STEP 3</h1>';

				$template_args['confirmation_data'] = $this->display_data_for_confirmation();

				break;
		}

		// has gateway been set by no-js user?
		if (isset($_GET['payment'])) {
			if ($this->gateways->selected_gateway() != $_GET['payment']) {
				$this->gateways->set_selected_gateway(sanitize_text_field($_GET['payment']));
			} else {
				$this->gateways->unset_selected_gateway(sanitize_text_field($_GET['payment']));
			}
		}
		$template_args['selected_gateway'] = $this->gateways->selected_gateway();
		$this->gateways->set_form_url($this->_reg_page_base_url);
		if (empty($session_data['billing_info'])) {
			$EE_Session->set_session_data(array('fill' => TRUE), 'billing_info');
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
//		$additional_event_registration_info = apply_filters( 'filter_hook_espresso_additional_event_registration_info_init', $additional_event_registration_info );

		$events_requiring_pre_approval = array();
		$events_that_use_coupon_codes = array();
		$events_that_use_groupon_codes = array();
		$template_args['reg_page_discounts_dv_class'] = 'hidden';


		$template_args['whats_in_the_cart'] = '';

		$cart_types = $this->cart->get_cart_types();

		foreach ($cart_types as $cart_type) {

			$cart_contents = $this->cart->whats_in_the_cart($cart_type);

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
					//echo "item in cart:";var_dump($item);
					$step_1_line_items .= '#mer-reg-page-line-item-' . $item['id'];
					
					$event_queue[$cart_type]['items'][$item['line_item']]['id'] = $item['id'];
					$event_queue[$cart_type]['items'][$item['line_item']]['name'] = stripslashes( $item['name'] );
					$event_queue[$cart_type]['items'][$item['line_item']]['price_desc'] = stripslashes( $item['options']['price_desc'] );
					$event_queue[$cart_type]['items'][$item['line_item']]['price'] = $item['price'];
					$event_queue[$cart_type]['items'][$item['line_item']]['qty'] = $item['qty'];
					$event_queue[$cart_type]['items'][$item['line_item']]['line_total'] = number_format($item['line_total'], 2, '.', '');

					// get additional event registration details not currently in the sesion/cart
					$event_reg_details = $this->_get_event_reg_details($item['id']);
					//echo printr($event_reg_details);

					//$event_reg_details->question_groups = maybe_unserialize($event_reg_details->question_groups);
					$event_reg_details->event_meta = maybe_unserialize($event_reg_details->event_meta);

//					 echo '<h2>require pre approval : ' . $event_reg_details->require_pre_approval . '</h2>';
//					 echo '<h2>use coupon code : ' . $event_reg_details->use_coupon_code . '</h2>';
//					 echo '<h2>use groupon code : ' . $event_reg_details->use_groupon_code . '</h2>';

//					if ($event_reg_details->require_pre_approval == 1) {
//						$events_requiring_pre_approval[$cart_type]['items'][$item['line_item']] = array('id' => $item['id'], 'name' => $item['name'], 'price' => $item['price'], 'qty' => $item['qty']);
//					}

//					if ($event_reg_details->use_coupon_code) {
//						$events_that_use_coupon_codes[$cart_type]['items'][$item['line_item']] = array('id' => $item['id'], 'name' => $item['name'], 'price' => $item['price'], 'qty' => $item['qty']);
//					}
//
//					if (defined('EVENTS_GROUPON_CODES_TABLE') && $event_reg_details->use_groupon_code) {
//						$events_that_use_groupon_codes[$cart_type]['items'][$item['line_item']] = array('id' => $item['id'], 'name' => $item['name'], 'price' => $item['price'], 'qty' => $item['qty']);
//					}

					// $additional_event_registration_info = apply_filters( 'filter_hook_espresso_additional_event_registration_info', $additional_event_registration_info );
					// $event_queue[$cart_type]['items'][ $item['line_item'] ]['extra_reg_info'] = $additional_event_registration_info;


					$attendee_questions = array();
					
					$price_id = $item['price'] * 100;
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
								'date' => $tckt_date,
								'time' => $tckt_time,
								'input_name' => $input_name,
								'input_id' => $input_id,
								'input_class' => 'ee-reg-page-questions' . $template_args['css_class'],
								'additional_attendee_reg_info' => $additional_attendee_reg_info
						);

						add_filter( 'filter_hook_espresso_form_field_label_html', array( $this, 'reg_form_form_field_label_wrap' ), 10, 1 );
						add_filter( 'filter_hook_espresso_form_field_input_html', array( $this, 'reg_form_form_field_input__wrap' ), 10, 1 );
						
						$questions_and_groups = EEM_Event::instance()->get_event_questions_and_groups( $question_meta );
						//echo "spco475";var_dump($questions_and_groups[1]['QSG_questions']);
						$att_questions = EE_Form_Fields::generate_question_groups_html( $questions_and_groups, 'div' );

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
									value="' . $item['line_item'] . '"
							/>' . "\n";



						// add to array
						$attendee_questions[$item['line_item']][$att_nmbr] = $att_questions;
						//fieldset legend
						$attendee_headings[$item['line_item']][$att_nmbr] = __('Attendee #', 'event_espresso') . $att_nmbr;

						// for all  attendees other than the primary attendee
						if ($counter != 1) {

							$additional_attendees[$item['line_item']][$att_nmbr] = array(
									'event_id' => $item['id'],
									'event_name' => $item['name'],
									'att_nmbr' => $att_nmbr,
									'input_id' => $input_id,
									'input_name' => $input_name
							);
							$target_inputs .= $input_id . '&&';
							
							$item_name = $item['name'] . ' - ' . stripslashes( $item['options']['price_desc'] );

							if ($att_nmbr == 1) {
								// if this is the first attendee for an event then display a heading
								$additional_attendees[$item['line_item']][$att_nmbr]['event_hdr'] = $item_name;
							} elseif ($att_nmbr == 2 && $x == 1) {
								// OR the very first additional attendee after the primary attendee
								$additional_attendees[$item['line_item']][$att_nmbr]['event_hdr'] = $item_name;
							} else {
								// no heading
								$additional_attendees[$item['line_item']][$att_nmbr]['event_hdr'] = FALSE;
							}
						} else {

							// grab line item from primary attendee
							$prim_att_line_item = $item['line_item'];
							$template_args['prmy_att_input_name'] = $input_name;
						}

						// delete empty attendee placeholder
						unset($additional_attendees[$item['line_item']][0]);

						$counter++;
					}


					$event_queue[$cart_type]['items'][$item['line_item']]['attendee_headings'] = $attendee_headings;
					$event_queue[$cart_type]['items'][$item['line_item']]['attendee_questions'] = $attendee_questions;

					$x++;
				} // end foreach ( $cart_contents['items'] as $item )
				// delete empty placeholder data for primary attendee
				unset($additional_attendees[$prim_att_line_item][1]);
				//echo printr( $additional_attendees );

				$event_queue[$cart_type]['total_items'] = $cart_contents['total_items'];
				$event_queue[$cart_type]['sub_total'] = number_format($cart_contents['sub_total'], 2, '.', '');
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
//						$grand_total = $grand_total - $item['price'];
//						$template_args['events_requiring_pre_approval'] .= '<li>' . $item['name'] . '</li>';
//					}
//				}
//			}
//			$template_args['events_requiring_pre_approval'] = rtrim($template_args['events_requiring_pre_approval'], ', ');
//		}


		//  GOT COUPONS ?
		$template_args['events_that_use_coupon_codes'] = '';
		$template_args['use_coupon_codes'] = FALSE;
		// do we have any events that use them ?
/*		if (!empty($events_that_use_coupon_codes)) {

			//echo printr( $events_that_use_coupon_codes, '$events_that_use_coupon_codes' );
			$template_args['use_coupon_codes'] = TRUE;

			// cycle through array of events that use coupon codes
			foreach ($events_that_use_coupon_codes as $cart_type => $cart_contents) {
				foreach ($cart_contents as $items) {
					foreach ($items as $line_item_id => $item) {
						// add to string of id numbers
						$template_args['events_that_use_coupon_codes'] .= $item['id'] . ',';
					}
				}
			}
			// remove last comma
			$template_args['events_that_use_coupon_codes'] = rtrim($template_args['events_that_use_coupon_codes'], ',');
		} else {
			$template_args['use_coupon_codes'] = FALSE;
		}*/


		// Groupons ?
		$template_args['events_that_use_groupon_codes'] = '';
		$template_args['use_groupon_codes'] = FALSE;
		// do we have any events that use them ?
/*		if (!empty($events_that_use_groupon_codes)) {

			//echo printr( $events_that_use_groupon_codes, '$events_that_use_groupon_codes' );
			$template_args['use_groupon_codes'] = TRUE;

			// cycle through array of events that use groupon codes
			foreach ($events_that_use_groupon_codes as $cart_type => $cart_contents) {
				foreach ($cart_contents as $items) {
					foreach ($items as $line_item_id => $item) {
						// add to string of id numbers
						$template_args['events_that_use_groupon_codes'] .= $item['id'] . ',';
					}
				}
			}
			// remove last comma
			$template_args['events_that_use_groupon_codes'] = rtrim($template_args['events_that_use_groupon_codes'], ',');
		} else {
			$template_args['use_groupon_codes'] = FALSE;
		}*/


		$template_args['mer_reg_page_ajax_coupons_url'] = add_query_arg(array('e_reg' => 'apply_coupon'), $this->_reg_page_base_url);
		$template_args['step_1_line_items'] = $step_1_line_items;

		$template_args['target_inputs'] = rtrim($target_inputs, '&&');

		$template_args['print_copy_info'] = $additional_attendee_forms || $x > 2 ? TRUE : FALSE;
		$template_args['additional_attendees'] = $additional_attendees;

		$template_args['total_items'] = $total_items;
		$template_args['empty_cart'] = $total_items < 1 ? TRUE : FALSE;

		$template_args['payment_required'] = $grand_total > 0 ? TRUE : FALSE;
		$template_args['sub_total'] = number_format( $grand_total, 2, '.', '' );

		$template_args['taxes'] = FALSE;
		$template_args['taxes'] = EE_Taxes::calculate_taxes( $grand_total );
		$grand_total = apply_filters( 'espresso_filter_hook_grand_total_after_taxes', $grand_total );

		$template_args['grand_total'] = number_format($grand_total, 2, '.', '');

		$template_args['event_queue'] = $event_queue;
		$template_args['nmbr_of_carts'] = count($event_queue);
		$template_args['images_dir_url'] = EVENT_ESPRESSO_PLUGINFULLURL . 'images/';

		$template_args['return_url'] = add_query_arg(array('e_reg' => 'event_queue'), $this->_reg_page_base_url);
		$template_args['update_url'] = add_query_arg(array('e_reg' => 'update_event_queue'), $this->_reg_page_base_url);
		$template_args['event_queue_url'] = add_query_arg(array('e_reg' => 'event_queue'), $this->_reg_page_base_url);
		$template_args['register_url'] = add_query_arg(array('e_reg' => 'register'), $this->_reg_page_base_url);
		$template_args['reg_page_step_1_url'] = add_query_arg(array('e_reg' => 'register', 'step' => 1), $this->_reg_page_base_url);
		$template_args['reg_page_goto_step_2_url'] = add_query_arg(array('e_reg' => 'process_reg_step_1'), $this->_reg_page_base_url);
		$template_args['reg_page_goto_step_3_url'] = add_query_arg(array('e_reg' => 'process_reg_step_2'), $this->_reg_page_base_url);
		$template_args['reg_page_complete_reg_url'] = add_query_arg(array('e_reg' => 'process_reg_step_3'), $this->_reg_page_base_url);
		//echo "reg page complet url:".$template_args['reg_page_complete_reg_url'];
		//Recaptcha
		$template_args['recaptcha'] = '';
		if ($org_options['use_captcha'] && (empty($_REQUEST['edit_details']) || $_REQUEST['edit_details'] != 'true') && !is_user_logged_in()) {

			if (!function_exists('recaptcha_get_html')) {
				require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'tpc/recaptchalib.php');
			}

			// the error code from reCAPTCHA, if any
			$error = null;
			$rc_theme = empty($org_options['recaptcha_theme']) ? 'clean' : $org_options['recaptcha_theme'];
			$rc_lang = empty($org_options['recaptcha_language']) ? 'en' : $org_options['recaptcha_language'];

			$template_args['recaptcha'] .= '
<script type="text/javascript">
/* <! [CDATA [ */
	var RecaptchaOptions = { theme : "' . $rc_theme . '", lang : "' . $rc_lang . '" };
/*  ] ]>  */
</script>
<p class="reg-page-form-field-wrap-pg" id="spc-captcha">
	' . __('Anti-Spam Measure: Please enter the following phrase', 'event_espresso') . '
	' . recaptcha_get_html($org_options['recaptcha_publickey'], $error, is_ssl() ? true : false) . '
';

			//	var RecaptchaOptions = { theme : "'. $org_options['recaptcha_theme'] == '' ? 'clean' : $org_options['recaptcha_theme'] .'", lang : "'. $org_options['recaptcha_language'] == '' ? 'en' : $org_options['recaptcha_l

			$template_args['recaptcha'] .= '
</p>
';
		}
		//End use captcha


		$registration_page_step_1 = espresso_display_template($this->_templates['registration_page_step_1'], $template_args, TRUE);
		$registration_page_step_2 = espresso_display_template($this->_templates['registration_page_step_2'], $template_args, TRUE);
		$registration_page_step_3 = espresso_display_template($this->_templates['registration_page_step_3'], $template_args, TRUE);

		$template_args['registration_steps'] = $registration_page_step_1 . $registration_page_step_2 . $registration_page_step_3;

//		printr( $EE_Session->get_session_data(), '$EE_Session  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

		espresso_display_template($this->_templates['registration_page_wrapper'], $template_args);
	}





	/**
	 * 		reg_form_form_field_label_wrap
	 *
	 * 		@access 		public
	 * 		@param 		string 		$label
	 * 		@return 		string
	 */
	public function reg_form_form_field_label_wrap( $label ) {
		return '<p class="reg-page-form-field-wrap-pg">' . $label ;
		
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





	/**
	 * 		get additional event details required for registration
	 *
	 * 		@access 		private
	 * 		@param 		string 		$event_id
	 * 		@return 		int
	 */
	private function _get_event_reg_details($event_id) {

		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		global $wpdb;

		$SQL = "SELECT event_code, category_id, allow_overflow, overflow_event_id, event_meta, require_pre_approval FROM " . EVENTS_DETAIL_TABLE . " WHERE id=%d";
		$event_reg_details = $wpdb->get_row($wpdb->prepare($SQL, $event_id));
		if ($event_reg_details) {
			return $event_reg_details;
		}

		return FALSE;
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
		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		global $EE_Session;

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
//		foreach ($_POST as $key => $value) {
//			if ( is_array( $value )) {
//				$valid_data[$key] = array_walk_recursive( $value, array( $this, 'sanitize_text_field_for_array_walk' ));
//			} else {
//				$valid_data[$key] = sanitize_text_field( $value );
//			}
//		}
//		printr( $EE_Session, '$EE_Session  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

		array_walk_recursive( $_POST, array( $this, 'sanitize_text_field_for_array_walk' ));
		$valid_data = $_POST;
		$valid_data = apply_filters( 'filter_hook_espresso__EE_Single_Page_Checkout__process_registration_step_1__valid_data', $valid_data );
//		printr( $valid_data, '$valid_data  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//		printr( $EE_Session, '$EE_Session  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

		// if we don't have a qstn field then something went TERRIBLY WRONG !!! AHHHHHHHH!!!!!!!
		if (isset($valid_data['qstn'])) {
		
			if (isset($valid_data['qstn']['custom_questions'])) {
				$custom_questions = $valid_data['qstn']['custom_questions'];
				$EE_Session->set_session_data(array('custom_questions'=>$custom_questions), 'session_data');
//				printr( $valid_data['qstn']['custom_questions'], 'custom_questions  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
				unset($valid_data['qstn']['custom_questions']);
			}
			
			// now loop through our array of valid post data
			foreach ($valid_data['qstn'] as $event_id => $event_data) {
				// continue to drill down through the array and set paramaters
				foreach ($event_data as $att_nmbr => $att_event_data) {
					foreach ($att_event_data as $event_date => $event_details) {
						foreach ($event_details as $event_time => $tckt_details) {
							foreach ($tckt_details as $tckt_price => $att_details) {
								foreach ($att_details as $form_input => $input_value) {
									//$input_value = htmlentities($input_value, ENT_QUOTES, 'UTF-8');
									$line_item_id = $att_details['line_item_id'];
									//$cart_contents = $this->cart->whats_in_the_cart('REG', $line_item_id);
									// add ticket price to the array
									$attendees[$line_item_id][$event_id]['attendees'][$att_nmbr]['price_paid'] = number_format($tckt_price / 100, 2, '.', '');
									// now add all other post data that was generated by attendee questions
									$attendees[$line_item_id][$event_id]['attendees'][$att_nmbr][$form_input] = $input_value;
									unset($attendees[$line_item_id][$event_id]['attendees'][$att_nmbr]['line_item_id']);
									// store a bit of data about the primary attendee
									if ($form_input == 'primary_attendee' && $input_value == 1) {
										$primary_attendee['line_item_id'] = $line_item_id;
										//$primary_attendee['registration_id'] = $registration_id;
										$primary_attendee['fname'] = $valid_data['qstn'][$event_id][$att_nmbr][$event_date][$event_time][$tckt_price]['1'];
										$primary_attendee['lname'] = $valid_data['qstn'][$event_id][$att_nmbr][$event_date][$event_time][$tckt_price]['2'];
										$primary_attendee['email'] = $valid_data['qstn'][$event_id][$att_nmbr][$event_date][$event_time][$tckt_price]['3'];
										$EE_Session->set_session_data(array('primary_attendee' => $primary_attendee), 'session_data');
									} else if ( $form_input == 'additional_attendee_reg_info' && $input_value == 1 ) {
										// we need to copy basic info from primary attendee
										$attendees[$line_item_id][$event_id]['attendees'][$att_nmbr][1] = $attendees[$line_item_id][$event_id]['attendees'][1][1];
										$attendees[$line_item_id][$event_id]['attendees'][$att_nmbr][2] = $attendees[$line_item_id][$event_id]['attendees'][1][2];
										$attendees[$line_item_id][$event_id]['attendees'][$att_nmbr][3] = $attendees[$line_item_id][$event_id]['attendees'][1][3];
									}
								}
							}
						}
					}
				}
			}

			// now we'll save our data to the session by doing... MORE LOOPING !!!
			foreach ($attendees as $line_item_id => $line_item) {
				foreach ($line_item as $event_id => $attendees_data) {
					if (!$this->cart->set_line_item_details($attendees_data, $line_item_id)) {
						$notices = EE_Error::get_notices(FALSE);
						$error_msg = $notices['errors'];
					}
				}
			}

			if (!$error_msg) {
				$success_msg .= __('Attendee information submitted successfully.', 'event_espresso');
			}
		} else {
			$success_msg = FALSE;
			$error_msg = __('An error occured! No valid question responses were received.', 'event_espresso');
		}
		//do action in case a plugin wants to do something with the data submitted in step 1.
		//passes EE_Single_Page_Checkout, and it's posted data
		do_action('action_hook_espresso__EE_Single_Page_Checkout__process_registration_step_1__end',$this,$valid_data);

		if ($this->send_ajax_response($success_msg, $error_msg)) {
			$reg_page_step_2_url = add_query_arg(array('e_reg' => 'register', 'step' => '2'), $this->_reg_page_base_url);
			wp_safe_redirect($reg_page_step_2_url);
			exit();
		} else {
			$reg_page_step_1_url = add_query_arg(array('e_reg' => 'register', 'step' => '1'), $this->_reg_page_base_url);
			wp_safe_redirect($reg_page_step_1_url);
			exit();
		}
	}





	/**
	 * 		process_registration_step_2
	 *
	 * 		@access 		public
	 * 		@return 		void
	 */
	public function process_registration_step_2() {

		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		global $EE_Session;

		$success_msg = FALSE;
		$error_msg = FALSE;

		// don't need these so get rid of them'
		unset($_POST['action']);
//		printr( $_POST, '$_POST  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

		if (isset($_POST['reg-page-no-payment-required']) && absint($_POST['reg-page-no-payment-required']) == 1) {
			// FREE EVENT !!! YEAH : )
			if ($EE_Session->set_session_data(array('billing_info' => 'no payment required'), $section = 'session_data')) {
				$msg = __( 'Registration Step 2 completed.', 'event_espresso' );
				EE_Error::add_success( $msg, __FILE__, __FUNCTION__, __LINE__ );	
			} 

		} else { 
			
			// PAID EVENT !!!  BOO  : (
			$this->gateways->process_gateway_selection();
			
			//grab notices
			$notices = EE_Error::get_notices(FALSE);
			$success_msg = isset( $notices['success'] ) ? $notices['success'] : '';
			$error_msg = isset( $notices['errors'] ) ? $notices['errors'] : '';

			if ($this->send_ajax_response( $success_msg, $error_msg, '_send_reg_step_2_ajax_response' )) {
				$reg_page_step_3_url = add_query_arg(array('e_reg' => 'register', 'step' => '3'), $this->_reg_page_base_url);
				wp_safe_redirect($reg_page_step_3_url);
				exit();
			} else {
				$reg_page_step_2_url = add_query_arg(array('e_reg' => 'register', 'step' => '2'), $this->_reg_page_base_url);
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
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

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
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		global $org_options, $EE_Session;

		$session_data = $EE_Session->get_session_data();
		//printr( $session_data, '$session_data  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		$billing_info = $session_data['billing_info'];
		$reg_info = $session_data['cart']['REG'];
		$template_args = array();
		$exclude_attendee_info = array('registration_id', 'price_paid', 'primary_attendee');

		if ( isset( $reg_info['items'] )) {
			
			foreach ($reg_info['items'] as $line_item_id => $event) {
	
				$template_args['events'][$line_item_id]['name'] = $event['name'];
				$template_args['events'][$line_item_id]['date'] = $event['options']['date'];
				$template_args['events'][$line_item_id]['time'] = date('g:i a', strtotime($event['options']['time']));
				$template_args['events'][$line_item_id]['ticket-price'] = $event['options']['price_desc'];
	
				foreach ($event['attendees'] as $att_nmbr => $attendee) {
					// if attendee has no name, then use primary attendee's details
					$attendee = isset( $attendee['1'] ) && $att_nmbr > 1 ? $attendee : $event['attendees'][1];
					//reset price paid to original in case it was different
					$attendee['price_paid'] = $event['attendees'][$att_nmbr]['price_paid'];

//					echo '<h4>$att_nmbr : ' . $att_nmbr . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//					printr( $attendee, '$attendee  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
	
					$template_args['events'][$line_item_id]['attendees'][$att_nmbr]['name'] = $attendee['1'] . ' ' . $attendee['2'];
					$extra_att_details = array();
	
					foreach ($attendee as $key => $value) {
						switch ($key) {
	
							case '1' :
							case '2' :
								break;
	
							default:
								if (!in_array($key, $exclude_attendee_info) /*&& !is_numeric($key)*/ && $value != '') {
									array_push($extra_att_details, $value);
								}
						}
					}
	
					if (!empty($extra_att_details)) {
						$template_args['events'][$line_item_id]['attendees'][$att_nmbr]['extra_att_detail'] = '<span class="small-text lt-grey-text">' . implode(', ', $extra_att_details) . '</span>';
					} else {
						$template_args['events'][$line_item_id]['attendees'][$att_nmbr]['extra_att_detail'] = '<span class="small-text lt-grey-text">' . __('no attendee details submitted', 'event_espresso') . '</span>';
					}

				}
			}
		}

		if ($billing_info == 'no payment required') {
			$ouput = '<h3>' . __('No payment required.<br/>Please click "Confirm Registration" below to complete the registration process.', 'event_espresso') . '</h3>';
		} else {
			// get billing info fields
			$template_args['billing'] = $this->gateways->set_billing_info_for_confirmation( $billing_info );
			$total = $session_data['_cart_grand_total_amount'];

			// add taxes
			// add taxes
			if (isset($session_data['tax_totals'])) {
				foreach ($session_data['tax_totals'] as $taxes) {
					$total = $total + $taxes;
				}
			}

			$template_args['billing'][ __('total due', 'event_espresso') ] = $org_options['currency_symbol'] . number_format($total, 2);

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
		global $EE_Session;
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		global $org_options;

		$success_msg = FALSE;
		$error_msg = FALSE;
		$continue_reg = TRUE;
		$txn_details = array();

		// check recaptcha
		if ($org_options['use_captcha'] && !is_user_logged_in()) {
			if (!function_exists('recaptcha_check_answer')) {
				require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'tpc/recaptchalib.php');
				$response = recaptcha_check_answer(
										$org_options['recaptcha_privatekey'], 
										$_SERVER["REMOTE_ADDR"], 
										$_POST["recaptcha_challenge_field"], 
										$_POST["recaptcha_response_field"]
								);
			}

			if (!$response->is_valid) {
				$continue_reg = FALSE;
				$error_msg = __('Sorry, but you did not enter the correct anti-spam phrase.<br/>Please refresh the ReCaptcha (the top button of the three), and try again.', 'event_espresso');
			}
		}
		global $EE_Session;
		// grab session data
		$session = $EE_Session->get_session_data();
		
		if ($continue_reg) {

			do_action('action_hook_espresso_begin_reg');

			// load and instantiate models
			require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Registration.model.php' );
			require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Transaction.model.php' );
			$REG = EEM_Registration::instance();
			$TXN = EEM_Transaction::instance();

			$reg_items = $session['cart']['REG']['items'];

			$grand_total = $session['_cart_grand_total_amount'];
			// add taxes
			if (isset($session['tax_totals'])) {
				foreach ($session['tax_totals'] as $taxes) {
					$grand_total += $taxes;
				}
			}
			// start the transaction record
			require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Transaction.class.php' );
			// totals over 0 initially get set to Incomlete, whereas Free Events get set to complete
			$txn_status = $grand_total > 0 ? 'TIN' : 'TCM';
			//check for existing transaction in the session
			$transaction_exists = array_key_exists('transaction',$session) && !empty($session['transaction']);
			if($transaction_exists){
				$transaction = $session['transaction'];
				//var_dump($transaction);
				//delete all old registrations on this transaction, because we're going to re-add them according to the updated data in the session now
				$REG->delete(array('TXN_ID'=>$transaction->ID()));
			}else{
				$transaction = new EE_Transaction( 
					time(), 
					$grand_total, 
					0, 
					$txn_status, 
					NULL, 
					$session, 
					NULL, 
					array(
						'tax_totals'=>$session['tax_totals'],
						'taxes'=>$session['taxes']
					) 
				);
				$transaction->save();
			}

			$saved_registrations = self::save_registration_items( $reg_items, $transaction );
			
			//$updated_session=$EE_Session->get_session_data();
			$transaction->set_txn_session_data( $session );
			$transaction->save();
			//remove the session from teh transaction befores saving it to teh session... otherwise we'll ahve a recursive relationship! bad!!
			$transaction->set_txn_session_data(null);
			//var_dump($EE_Session->get_session_data());
			$EE_Session->set_session_data(array( 'registration' => $saved_registrations, 'transaction' => $transaction ), 'session_data');
			$EE_Session->_update_espresso_session();
			//var_dump($)
			do_action('action_hook_espresso__EE_Single_Page_Checkout__process_registration_step_3__before_gateway', $this);
			

//			printr( $EE_Session, '$EE_Session data ( ' . __FUNCTION__ . ' on line: ' .  __LINE__ . ' )' ); 
//			die();

			// attempt to perform transaction via payment gateway
			$response = $this->gateways->process_reg_step_3();
			$this->_return_page_url = $response['forward_url'];
			$success_msg = $response['msg']['success'];
		}
		
		do_action('action_hook_espresso__EE_Single_Page_Checkout__process_registration_step_3__end', $this);
		
		//$session = $EE_Session->get_session_data();
		//printr( $session, '$session data ( ' . __FUNCTION__ . ' on line: ' .  __LINE__ . ' )' ); 
		//die();
		if ($this->send_ajax_response($success_msg, $error_msg, '_send_reg_step_3_ajax_response')) {
			wp_safe_redirect($this->_return_page_url);
			exit();
		} else {
			$reg_page_step_3_url = add_query_arg(array('e_reg' => 'register', 'step' => '3'), $this->_reg_page_base_url);
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
				EE_Error::add_error( __( 'An error occured. No registration items were received.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );	
				return array();			
		}

		global $EE_Session;
		// grab session data
		$session = $EE_Session->get_session_data();
		// get some class would ya !
		require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Registration.class.php' );
		require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Attendee.model.php' );
		$ATT = EEM_Attendee::instance();
		$saved_registrations = array();
		// cycle through items in session			
		foreach ($reg_items as $line_item_id => $event) {

			// cycle through attendees
			foreach ($event['attendees'] as $att_nmbr => $attendee) {

				// if attendee has no name, then use primary attendee's details
				$attendee = isset( $attendee['1'] ) && $att_nmbr > 1 ? $attendee : $event['attendees'][1];
				
				// grab main attendee details
				$ATT_fname = isset($attendee[1]) ? $attendee[1] : '';
				$ATT_lname = isset($attendee[2]) ? $attendee[2] : '';
				$ATT_email = isset($attendee[3]) ? $attendee[3] : '';
				// create array for query where statement
				$where_cols_n_values = array('ATT_fname' => $ATT_fname, 'ATT_lname' => $ATT_lname, 'ATT_email' => $ATT_email);
				// do we already have an existing record for this attendee ?
				if ( $existing_attendee = $ATT->find_existing_attendee( $where_cols_n_values )) {
					$ATT_ID = $existing_attendee->ID();
					$att[$att_nmbr] = $existing_attendee;
				} else {
					// create attendee
					$att[$att_nmbr] = new EE_Attendee(
													$ATT_fname,
													$ATT_lname,
													isset($attendee[4]) ? $attendee[4] : NULL,		// address
													isset($attendee[5]) ? $attendee[5] : NULL,		// address2
													isset($attendee[6]) ? $attendee[6] : NULL,		// city
													isset($attendee[7]) ? $attendee[7] : NULL,		// state
													isset($attendee[8]) ? $attendee[8] : NULL,		// country
													isset($attendee[9]) ? $attendee[9] : NULL,		// zip
													$ATT_email,		// address
													isset($attendee[10]) ? $attendee[10] : NULL,		// phone
													NULL		// social
					);
					
					//add attendee to db
					$att_results = $att[$att_nmbr]->save();
					$ATT_ID = $att[$att_nmbr]->ID();
					do_action('action_hook_espresso__EE_Single_Page_Checkout__process_registration_step_3__after_attendee_save',$att_nmbr,$att[$att_nmbr]);
				}				
				
				// add attendee object to attendee info in session
				$session['cart']['REG']['items'][$line_item_id]['attendees'][$att_nmbr]['att_obj'] = base64_encode( serialize( $att[$att_nmbr] ));

				$DTT_ID = $event['options']['dtt_id'];
				$PRC_ID = explode( ',', $event['options']['price_id'] );
				$PRC_ID = $PRC_ID[0];
				$price_paid = $attendee['price_paid'];

				$session_snip =  substr( $session['id'], 0, 3 ) . substr( $session['id'], -3 );				
				$new_reg_code = $transaction->ID() . '-' . $event['id'] . $DTT_ID . $PRC_ID . $att_nmbr . '-' . $session_snip . ( absint( date( 'i' ) / 2 ));				
				$new_reg_code = apply_filters( 'filter_hook_espresso_new_registration_code', $new_reg_code );
				
				if ( has_filter( 'filter_hook_espresso_new_registration_code' ) ) {
					$prev_reg_code = $new_reg_code;
				} else {
					$prev_reg_code = '%-' . $event['id'] . $DTT_ID . $PRC_ID . $att_nmbr . '-' . $session_snip . ( absint( date( 'i' ) / 2 )) . '%';
				}					

				$default_reg_status = isset( $org_options['default_reg_status'] ) ? $org_options['default_reg_status'] : 'RPN';

				// now create a new registration for the attendee
				$reg_url_link=md5($new_reg_code);
				$saved_registrations[$line_item_id] = new EE_Registration(
												$event['id'],
												$ATT_ID,
												$transaction->ID(),
												$DTT_ID,
												$PRC_ID,
												$default_reg_status,
												time(),
												$price_paid,
												$session['id'],
												$new_reg_code,
												$reg_url_link,
												$att_nmbr,
												count($event['attendees']),
												FALSE,
												FALSE
						);
				//printr( $reg[$line_item_id], '$reg[$line_item_id] ( ' . __FUNCTION__ . ' on line: ' .  __LINE__ . ' )' );die();

				$reg_results = $saved_registrations[$line_item_id]->save();
				$REG_ID = $saved_registrations[$line_item_id]->ID();

				// add attendee object to attendee info in session
				$session['cart']['REG']['items'][$line_item_id]['attendees'][$att_nmbr]['reg_obj'] = base64_encode( serialize( $saved_registrations[$line_item_id] ));

				// add registration id to session for the primary attendee
				if (isset($attendee['primary_attendee']) && $attendee['primary_attendee'] == 1) {
					$primary_attendee = $session['primary_attendee'];
					$primary_attendee['registration_id'] = $new_reg_code;
					$EE_Session->set_session_data(array('primary_attendee' => $primary_attendee), 'session_data');
				}
				
				$EE_Session->set_session_data( $session['cart'] );

				// save attendee question answerss
				$exclude = array( 'price_paid', 'primary_attendee', 'att_obj', 'reg_obj' );
				foreach ( $reg_items[ $line_item_id ]['attendees'][ $att_nmbr ] as $QST_ID => $answer ) {
					if ( ! in_array( $QST_ID, $exclude ) && ! empty( $answer )) {
						EEM_Answer::instance()->insert( array( 'REG_ID' =>$REG_ID, 'QST_ID' =>$QST_ID, 'ANS_value' =>sanitize_text_field( $answer )));
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
			
		global $EE_Session, $wpdb;

		// grab session data
		$session = $EE_Session->get_session_data();
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
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		$response_data = array(
				'success' => $success_msg,
				'return_data' => array('redirect-to-thank-you-page' => $this->_return_page_url)
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
		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		$valid_callback = FALSE;
		// check for valid callback function
		if ($callback != FALSE && $callback != '' && !function_exists($callback)) {
			$valid_callback = TRUE;
		}
		if ($success_msg) {

			// if this is an ajax request AND a callback function exists
			if ($this->_ajax === 1 && $valid_callback) {
				// send data through to the callback function
				$this->$callback($callback_param, $success_msg);
			} elseif ($this->_ajax === 1) {
				// just send the ajax
				echo json_encode(array('success' => $success_msg));
				// to be... or...
				die();
			} else {
				// not ajax
				EE_Error::add_success( $success_msg, __FILE__, __FUNCTION__, __LINE__ );
				// return true to advance to next step
				return TRUE;
			}
		} elseif ($error_msg) {

			if ($this->_ajax === 1) {
				echo json_encode(array('error' => $error_msg));
				die();
			} else {
				EE_Error::add_error( $error_msg, __FILE__, __FUNCTION__, __LINE__ );
				// return false to return to retry step
				return FALSE;
			}
		}
	}

}

/* End of file EE_Single_Page_Checkout.class.php */
/* Location: includes/process-registration/EE_Single_Page_Checkout.class.php */
