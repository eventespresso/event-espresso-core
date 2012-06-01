<?php if (!defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
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
			unset($_POST['espresso_ajax']);
		} else if (  isset($_REQUEST['espresso_ajax']) && $_REQUEST['espresso_ajax'] == 1 ) {
			$this->_ajax = 1;
			unset($_REQUEST['espresso_ajax']);
		} else {
			 $this->_ajax = 0;
		}


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
		$this->set_templates();

		add_action('init', array(&$this, 'load_css'), 20);
		add_action('init', array(&$this, 'load_js'), 20);

		// hooks that happen during the regevent action and other pathing stuff
		add_action('init', array(&$this, 'set_paths_and_routing'), 30);
	}

	/**
	 * 		load resources required during the checkout process
	 *
	 * 		@access 		public
	 * 		@return 		void
	 */
	public function load_classes() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		global $EE_Cart;
		if (!defined('ESPRESSO_CART')) {
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Cart.class.php');
			// instantiate the class object
			$EE_Cart = EE_Cart::instance();
		}
		// make all cart properties and methods accessible via $this->cart ex: $this->cart->data();
		$this->cart = $EE_Cart;
	}

	/**
	 * 		set templates
	 *
	 * 		@access 		public
	 * 		@return 		void
	 */
	public function set_templates() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		$this->_templates['confirmation_page'] = EVENT_ESPRESSO_PLUGINFULLPATH . 'templates/reg_page_checkout/confirmation_page.template.php';
		$this->_templates['registration_page_wrapper'] = EVENT_ESPRESSO_PLUGINFULLPATH . 'templates/reg_page_checkout/registration_page_wrapper.template.php';
		$this->_templates['registration_page_step_1'] = EVENT_ESPRESSO_PLUGINFULLPATH . 'templates/reg_page_checkout/registration_page_step_1.template.php';
		$this->_templates['registration_page_step_2'] = EVENT_ESPRESSO_PLUGINFULLPATH . 'templates/reg_page_checkout/registration_page_step_2.template.php';
		$this->_templates['registration_page_step_3'] = EVENT_ESPRESSO_PLUGINFULLPATH . 'templates/reg_page_checkout/registration_page_step_3.template.php';
	}

	/**
	 * 		load css
	 *
	 * 		@access 		public
	 * 		@return 		void
	 */
	public function load_css() {
		if (isset($_REQUEST['e_reg']) && ( $_REQUEST['e_reg'] == 'register' && !is_admin() )) {
			do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
			wp_register_style('single_page_checkout', EVENT_ESPRESSO_PLUGINFULLURL . 'templates/reg_page_checkout/registration_page_checkout.css');
			wp_enqueue_style('single_page_checkout');
		}
	}

	/**
	 * 		load js
	 *
	 * 		@access 		public
	 * 		@return 		void
	 */
	public function load_js() {
		if (isset($_REQUEST['e_reg']) && ( $_REQUEST['e_reg'] == 'register' && !is_admin() )) {
			do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
			wp_register_script('single_page_checkout', EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/registration_page_checkout.js', array('jquery'), '', TRUE);
			wp_enqueue_script('single_page_checkout');
			$params = array();
			// Get current page protocol
			$protocol = isset($_SERVER["HTTPS"]) ? 'https://' : 'http://';
			// Output admin-ajax.php URL with same protocol as current page
			$params['ajax_url'] = admin_url('admin-ajax.php', $protocol);
			wp_localize_script('single_page_checkout', 'event_espresso', $params);
		}
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
		$this->_reg_page_base_url = rtrim(get_permalink($event_page_id), '/');

		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, $event_page_id . '|' . $this->_reg_page_base_url);

		// set pathing based on regevent request
		if (isset($_REQUEST['e_reg']) && ( $_REQUEST['e_reg'] != '' )) {

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


				case 'registration_complete' :
					remove_all_actions('action_hook_espresso_regevent_default_action');
					remove_all_actions('action_hook_espresso_event_registration');
					//$this->registration_complete();
					$this->process_registration_payment();
					break;

				default :
					// empty cart or else items build up indefinately
					// $cart_total = $this->cart->get_cart_grand_totals();
					//	if ( $cart_total['grand_total_qty'] != 0 && ! MER_ACTIVE ){
					if (!defined('MER_ACTIVE')) {
						$this->cart->empty_cart('AJAX');
					}
			}
		} else {

		}
	}

	/**
	 * 		load and display the Registration Single Page Checkout
	 *
	 * 		@access 		public
	 * 		@return 		void
	 */
	public function _event_reg_single_page_checkout() {

		//echo '<h1>FUNCTION: '.__FUNCTION__.'  ( line no: '. __LINE__ .' )</h1>';
		//echo printr( $this->cart->whats_in_the_cart(), 'whats_in_the_cart' );

		global $org_options, $espresso_wp_user, $EE_Session;


		$template_args = array();


		// retreive all success and error messages
		$notices = espresso_get_notices(FALSE);
		// success messages
		$template_args['success_msg'] = empty($notices['success']) ? '' : $notices['success'];
		$template_args['success_msg_class'] = empty($notices['success']) ? ' ui-helper-hidden' : ' fade-away';
		// error messages - none right?  : )
		$template_args['error_msg'] = empty($notices['errors']) ? '' : $notices['errors'];
		$template_args['error_msg_class'] = empty($notices['errors']) ? ' ui-helper-hidden' : ' fade-away';

		$template_args['currency_symbol'] = $org_options['currency_symbol'];
		$template_args['reg_page_url'] = $this->_reg_page_base_url;

		$template_args['css_class'] = 'ui-widget-content ui-corner-all';
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

				$template_args['confirmation_data'] = $this->display_data_for_confirmation();

				break;
		}

		$session_data = $EE_Session->get_session_data();
		if ( empty($session_data['gateway_data'])) {
			$gateway_data['active_gateways'] = get_user_meta($espresso_wp_user, 'active_gateways', true);
			$gateway_data['payment_settings'] = get_user_meta($espresso_wp_user, 'payment_settings', true);
		} else {
			$gateway_data = $session_data['gateway_data'];
		}

		// has gateway been set by no-js user?
		if (isset($_GET['payment'])) {
			$gateway_data['selected_gateway'] = sanitize_key($_GET['payment']);
			$gateway_data['type'] = $gateway_data['payment_settings'][$gateway_data['selected_gateway']]['type'];
			$template_args['selected_gateway'] = $selected_gateway;
			$hide_other_gateways = TRUE;
		} elseif (empty($gateway_data['selected_gateway'])) {
			$gateway_data['selected_gateway'] = 'free';
			$hide_other_gateways = FALSE;
			$gateway_data['type'] = FALSE;
		}
		
		$selected_gateway = $gateway_data['selected_gateway'];

		$template_args['selected_gateway'] = $selected_gateway;
		
		// get active gateways for this event
		foreach ( $gateway_data['active_gateways'] as $gateway => $path ) {
			$gateway = sanitize_key($gateway);
			$gateways[ $gateway ]['form_url'] = add_query_arg(array('e_reg' => 'register', 'step' => 2, 'payment' => $gateway  ), $this->_reg_page_base_url);
			// set display mode for gateway form
			if ( $gateway == $selected_gateway ) {
				$gateways[ $gateway ]['css_class'] = '';
				$gateways[ $gateway ]['selected'] = TRUE;
				$gateways[ $gateway ]['css_link_class'] = '';

			} else {
				$gateways[ $gateway ]['css_class'] = 'hidden';
				$gateways[ $gateway ]['selected'] = FALSE;
				$gateways[ $gateway ]['css_link_class'] = $hide_other_gateways ? ' hidden' : '';
			}

			// if
		}
		//printr( $gateways, '$gateways' );
		$gateway_data['html_data'] = $gateways;
		$EE_Session->set_session_data($gateway_data, 'gateway_data');
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
		$additional_attendees = array();

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

			$event_queue[$cart_type]['title'] = 'Registrations';
			$attendee_headings = array();
			$additional_attendees = array();
			$target_inputs = '';

			if ($cart_contents['total_items'] !== 0) {

				$event_queue[$cart_type]['has_items'] = TRUE;

				$x = 1;
				$counter = 1;
				foreach ($cart_contents['items'] as $item) {

					$step_1_line_items .= '#mer-reg-page-line-item-' . $item['id'];

					//echo printr( $item, '$item' );
					$event_queue[$cart_type]['items'][$item['line_item']]['id'] = $item['id'];
					$event_queue[$cart_type]['items'][$item['line_item']]['name'] = $item['name'];
					$event_queue[$cart_type]['items'][$item['line_item']]['price_desc'] = $item['options']['price_desc'];
					$event_queue[$cart_type]['items'][$item['line_item']]['price'] = $item['price'];
					$event_queue[$cart_type]['items'][$item['line_item']]['qty'] = $item['qty'];
					$event_queue[$cart_type]['items'][$item['line_item']]['line_total'] = number_format($item['line_total'], 2, '.', '');

					// get additional event registration details not currently in the sesion/cart
					$event_reg_details = $this->_get_event_reg_details($item['id']);
					//echo printr($event_reg_details);

					$event_reg_details->question_groups = maybe_unserialize($event_reg_details->question_groups);
					$event_reg_details->event_meta = maybe_unserialize($event_reg_details->event_meta);

					// echo '<h2>require pre approval : ' . $event_reg_details->require_pre_approval . '</h2>';
					// echo '<h2>use coupon code : ' . $event_reg_details->use_coupon_code . '</h2>';
					// echo '<h2>use groupon code : ' . $event_reg_details->use_groupon_code . '</h2>';

					if ($event_reg_details->require_pre_approval == 1) {
						$events_requiring_pre_approval[$cart_type]['items'][$item['line_item']] = array('id' => $item['id'], 'name' => $item['name'], 'price' => $item['price'], 'qty' => $item['qty']);
					}

					if ($event_reg_details->use_coupon_code) {
						$events_that_use_coupon_codes[$cart_type]['items'][$item['line_item']] = array('id' => $item['id'], 'name' => $item['name'], 'price' => $item['price'], 'qty' => $item['qty']);
					}

					if (defined('EVENTS_GROUPON_CODES_TABLE') && $event_reg_details->use_groupon_code) {
						$events_that_use_groupon_codes[$cart_type]['items'][$item['line_item']] = array('id' => $item['id'], 'name' => $item['name'], 'price' => $item['price'], 'qty' => $item['qty']);
					}

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

						$question_meta = array(
								'attendee_number' => $att_nmbr,
								'price_id' => $price_id,
								'date' => $tckt_date,
								'time' => $tckt_time,
								'input_id' => $input_id
						);
						// grab questions
						$att_questions = event_espresso_add_question_groups(
										$event_reg_details->question_groups, '', $item['id'], TRUE, $question_meta, $template_args['css_class']
						);

						if ($att_questions != '') {
							$att_questions .= '
							<input
									type="hidden"
									id="' . $input_id . '-line_item_id"
									name="qstn' . $input_name . '[line_item_id]"
									value="' . $item['line_item'] . '"
							/>
';
						}

						// add to array
						$attendee_questions[$item['line_item']][$att_nmbr] = $att_questions;
						//$attendee_headings[ $item['line_item'] ][ $att_nmbr ] = $att_nmbr == 1 ? 'Primary Attendee' :  'Attendee Number ' . $att_nmbr;
						$attendee_headings[$item['line_item']][$att_nmbr] = 'Attendee #' . $att_nmbr;

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


							if ($att_nmbr == 1) {
								// if this is the first attendee for an event then display a heading
								$additional_attendees[$item['line_item']][$att_nmbr]['event_hdr'] = $item['name'] . ' - ' . html_entity_decode($item['options']['price_desc'], ENT_QUOTES, 'utf-8');
							} elseif ($att_nmbr == 2 && $x == 1) {
								// OR the very first additional attendee after the primary attendee
								$additional_attendees[$item['line_item']][$att_nmbr]['event_hdr'] = $item['name'] . ' - ' . html_entity_decode($item['options']['price_desc'], ENT_QUOTES, 'utf-8');
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

		// PRE APPROVAL
		$template_args['events_requiring_pre_approval'] = '';
		//  do we have any events that require it ?
		if (!empty($events_requiring_pre_approval)) {

			// echo printr( $events_requiring_pre_approval, '$events_requiring_pre_approval' );
			// cycle through array of events requiring pre approval
			foreach ($events_requiring_pre_approval as $cart_type => $cart_contents) {
				foreach ($cart_contents as $items) {
					foreach ($items as $line_item_id => $item) {
						// we will subtract events that require pre-approval from the event queue totals since these will not be getting purchased right now
						$total_items = $total_items - $item['qty'];
						$grand_total = $grand_total - $item['price'];
						$template_args['events_requiring_pre_approval'] .= '<li>' . $item['name'] . '</li>';
					}
				}
			}
			$template_args['events_requiring_pre_approval'] = rtrim($template_args['events_requiring_pre_approval'], ', ');
		}


		//  GOT COUPONS ?
		$template_args['events_that_use_coupon_codes'] = '';
		// do we have any events that use them ?
		if (!empty($events_that_use_coupon_codes)) {

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
		}


		// Groupons ?
		$template_args['events_that_use_groupon_codes'] = '';
		// do we have any events that use them ?
		if (!empty($events_that_use_groupon_codes)) {

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
		}


		$template_args['mer_reg_page_ajax_coupons_url'] = add_query_arg(array('e_reg' => 'apply_coupon'), $this->_reg_page_base_url);
		$template_args['step_1_line_items'] = $step_1_line_items;

		$template_args['target_inputs'] = rtrim($target_inputs, '&&');

		$template_args['print_copy_info'] = TRUE;
		$template_args['additional_attendees'] = $additional_attendees;

		$template_args['total_items'] = $total_items;
		$template_args['empty_cart'] = $total_items < 1 ? TRUE : FALSE;

		$template_args['payment_required'] = $grand_total > 0 ? TRUE : FALSE;
		$sub_total = $grand_total;

		$template_args['taxes'] = FALSE;

		//		if ( $step == 2 ) {
		// load and instantiate models
		require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Base.model.php' );
		require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price.model.php' );
		$PRC = EEM_Price::instance();
		// retreive all taxes
		$global_taxes = $PRC->get_all_prices_that_are_taxes();
		if ($global_taxes) {
			//echo printr( $global_taxes, '$global_taxes' );
			$template_args['taxes'] = array();
			$tax_totals = array();
			$amnt = 0;
			foreach ($global_taxes as $taxes) {
				$tax_tier_total = 0;
				foreach ($taxes as $tax) {
					//echo printr( $tax, '$tax' );
					$prcnt = $tax->amount() / 100;
					$amnt = number_format($grand_total * $prcnt, 2, '.', '');
					$prcnt = $prcnt * 100;
					$template_args['taxes'][$tax->ID()] = array('name' => $tax->name(), 'percent' => $prcnt, 'amount' => $amnt);
					$tax_totals [$tax->ID()] = $amnt;
					$tax_tier_total = $tax_tier_total + $amnt;
				}
				// add tax to grand total
				$grand_total = $grand_total + $tax_tier_total;
			}
				// add tax data to session
				$EE_Session->set_session_data(array('_cart_grand_total_amount' => $grand_total, 'taxes' => $template_args['taxes'], 'tax_totals' => $tax_totals), 'session_data');
		}
		//		}

		$template_args['sub_total'] = number_format($sub_total, 2, '.', '');
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

		//Recaptcha
		$template_args['recaptcha'] = '';
		if ($org_options['use_captcha'] && (empty($_REQUEST['edit_details']) || $_REQUEST['edit_details'] != 'true') && !is_user_logged_in()) {

			if (!function_exists('recaptcha_get_html')) {
				require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/recaptchalib.php');
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
<p class="event_form_field" id="spc-captcha">
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

		//echo printr( $EE_Session->get_session_data(), __FUNCTION__ );

		espresso_display_template($this->_templates['registration_page_wrapper'], $template_args);
	}





	/**
	 * 		get additional event details required for registration
	 *
	 * 		@access 		private
	 * 		@param 		string 		$event_id
	 * 		@return 		int
	 */
	private function _get_event_reg_details($event_id) {

		global $wpdb;

		$SQL = "SELECT event_code, use_coupon_code, use_groupon_code, category_id, coupon_id, tax_percentage, tax_mode, early_disc, early_disc_date, early_disc_percentage, question_groups, allow_overflow, overflow_event_id, event_meta, require_pre_approval FROM " . EVENTS_DETAIL_TABLE . " WHERE id=%d";
		$event_reg_details = $wpdb->get_row($wpdb->prepare($SQL, $event_id));
		if ($event_reg_details) {
			return $event_reg_details;
		}

		return FALSE;
	}





	/**
	 * 		process_registration_step_1
	 *
	 * 		@access 		public
	 * 		@param 		string 		$event_id
	 * 		@return 		int
	 */
	public function process_registration_step_1() {

		global $EE_Session;

		$success_msg = FALSE;
		$error_msg = FALSE;

		// don't need these so get rid of them so they don't get processed
		unset($_POST['action']);

		// some empty containers
		$attendees = array();
		$primary_attendee = array();
		$valid_data = array();

		// loop through post data and sanitize all elements
		foreach ($_POST as $key => $value) {
			$valid_data[$key] = stripslashes_deep($value);
		}

		// if we don't have a qstn field then something went TERRIBLY WRONG !!! AHHHHHHHH!!!!!!!
		if (isset($valid_data['qstn'])) {
			// now loop through our array of valid post data
			foreach ($valid_data['qstn'] as $event_id => $event_data) {
				// continue to drill down through the array and set paramaters
				foreach ($event_data as $att_nmbr => $att_event_data) {
					foreach ($att_event_data as $event_date => $event_details) {
						foreach ($event_details as $event_time => $tckt_details) {
							foreach ($tckt_details as $tckt_price => $att_details) {
								foreach ($att_details as $form_input => $input_value) {

									$input_value = htmlentities($input_value, ENT_QUOTES, 'UTF-8');

									$line_item_id = $att_details['line_item_id'];
									$cart_contents = $this->cart->whats_in_the_cart('REG', $line_item_id);

									// $registration_id = uniqid( $event_id.'-', TRUE );
									// $registration_id = $event_id . '-' . $att_nmbr . '-' . $EE_Session->id();
									//	$attendees[$line_item_id][$event_id]['attendees'][$att_nmbr]['registration_id'] = $registration_id;
									// add ticket price to the array
									$attendees[$line_item_id][$event_id]['attendees'][$att_nmbr]['price_paid'] = number_format($tckt_price / 100, 2, '.', '');

									// now add all other post data that was generated by attendee questions
									$attendees[$line_item_id][$event_id]['attendees'][$att_nmbr][$form_input] = $input_value;
									unset($attendees[$line_item_id][$event_id]['attendees'][$att_nmbr]['line_item_id']);

									// gather other content to save to attendee table
									if (is_array($cart_contents['options']['price_desc'])) {
										$price_desc = explode(' : ', $cart_contents['options']['price_desc']);
										$price_option = $price_desc[0];
									} else {
										$price_option = $cart_contents['options']['price_desc'];
									}

									// store a bit of data about the primary attendee
									if ($form_input == 'primary_attendee' && $input_value == 1) {
										$primary_attendee['line_item_id'] = $line_item_id;
										//$primary_attendee['registration_id'] = $registration_id;
										$primary_attendee['fname'] = $valid_data['qstn'][$event_id][$att_nmbr][$event_date][$event_time][$tckt_price]['fname'];
										$primary_attendee['lname'] = $valid_data['qstn'][$event_id][$att_nmbr][$event_date][$event_time][$tckt_price]['lname'];
										$primary_attendee['email'] = $valid_data['qstn'][$event_id][$att_nmbr][$event_date][$event_time][$tckt_price]['email'];
										$EE_Session->set_session_data(array('primary_attendee' => $primary_attendee), 'session_data');
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
						$notices = espresso_get_notices(FALSE);
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

		global $EE_Session, $espresso_notices;

		$success_msg = FALSE;
		$error_msg = FALSE;

		// don't need these so get rid of them'
		unset($_POST['action']);

		// if sessions is not instantiated
		if (!defined('EE_Validate_and_Sanitize')) {
			require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/classes/EE_Validate_and_Sanitize.class.php');
			$EE_VnS = EE_Validate_and_Sanitize::instance();
		}

		if (isset($_POST['reg-page-no-payment-required']) && absint($_POST['reg-page-no-payment-required']) == 1) {
			// FREE EVENT !!! YEAH : )
			if ($EE_Session->set_session_data(array('billing_info' => 'no payment required'), $section = 'session_data')) {
				$success_msg = __('Registration Step 2 completed', 'event_espresso');
			} else {
				$espresso_notices = $EE_VnS->return_notices();
				$notices = espresso_get_notices(FALSE);
				$error_msg = $notices['errors'];
			}

		} else { // PAID EVENT !!!  BOO  : (

			$gateway_data = $EE_Session->get_session_data(FALSE, 'gateway_data');

			// check for off site payment
			if ( isset( $_POST['selected_gateway'] )) {
				$gateway_data['selected_gateway'] = sanitize_text_field( $_POST['selected_gateway'] );
				$gateway_data['type'] = $gateway_data['payment_settings'][$gateway_data['selected_gateway']]['type'];
				$EE_Session->set_session_data($gateway_data, 'gateway_data');
			}

			// check for off site payment

			$continue = ($gateway_data['type'] == 'off-site') ? TRUE : FALSE;
			
			if ($gateway_data['type'] == 'on-site') { // on site payment
				// on site payment
				// load default billing inputs
				$reg_page_billing_inputs = array(

						'type' => 'onsite',

						'gateway' => sanitize_text_field( $_POST['gateway'] ),

						'reg-page-billing-fname' => array(
								'db-col' => 'fname',
								'label' => __('First Name', 'event_espresso'),
								'input' => 'text',
								'type' => 'string',
								'sanitize' => 'no_html',
								'required' => TRUE,
								'validation' => TRUE,
								'value' => NULL,
								'format' => '%s'
						),
						'reg-page-billing-lname' => array(
								'db-col' => 'lname',
								'label' => __('Last Name', 'event_espresso'),
								'input' => 'text',
								'type' => 'string',
								'sanitize' => 'no_html',
								'required' => TRUE,
								'validation' => TRUE,
								'value' => NULL,
								'format' => '%s'
						),
						'reg-page-billing-email' => array(
								'db-col' => 'email',
								'label' => __('Email Address', 'event_espresso'),
								'input' => 'text',
								'type' => 'string',
								'sanitize' => 'email',
								'required' => TRUE,
								'validation' => TRUE,
								'value' => NULL,
								'format' => '%s'
						),
						'reg-page-billing-address' => array(
								'db-col' => 'address',
								'label' => __('Address', 'event_espresso'),
								'input' => 'text',
								'type' => 'string',
								'sanitize' => 'no_html',
								'required' => TRUE,
								'validation' => TRUE,
								'value' => NULL,
								'format' => '%s'
						),
						'reg-page-billing-city' => array(
								'db-col' => 'city',
								'label' => __('City', 'event_espresso'),
								'input' => 'text',
								'type' => 'string',
								'sanitize' => 'no_html',
								'required' => TRUE,
								'validation' => TRUE,
								'value' => NULL,
								'format' => '%s'
						),
						'reg-page-billing-state' => array(
								'db-col' => 'state',
								'label' => __('State', 'event_espresso'),
								'input' => 'text',
								'type' => 'string',
								'sanitize' => 'no_html',
								'required' => TRUE,
								'validation' => TRUE,
								'value' => NULL,
								'format' => '%s'
						),
						'reg-page-billing-zip' => array(
								'db-col' => 'zip',
								'label' => __('Zip Code', 'event_espresso'),
								'input' => 'text',
								'type' => 'string',
								'sanitize' => 'no_html',
								'required' => TRUE,
								'validation' => TRUE,
								'value' => NULL,
								'format' => '%s'
						),
						'reg-page-billing-card-nmbr' => array(
								'db-col' => 'card-nmbr',
								'label' => __('Credit Card Number', 'event_espresso'),
								'input' => 'text',
								'type' => 'int',
								'sanitize' => 'ccard',
								'required' => TRUE,
								'validation' => TRUE,
								'value' => NULL,
								'format' => '%s'
						),
						'reg-page-billing-card-exp-date-mnth' => array(
								'db-col' => 'exp-date-mnth',
								'label' => __('Expiry Date Month', 'event_espresso'),
								'input' => 'select',
								'type' => 'int',
								'sanitize' => 'ccmm',
								'required' => TRUE,
								'validation' => TRUE,
								'value' => NULL,
								'format' => '%s'
						),
						'reg-page-billing-card-exp-date-year' => array(
								'db-col' => 'exp-date-year',
								'label' => __('Expiry Date Year', 'event_espresso'),
								'input' => 'select',
								'type' => 'int',
								'sanitize' => 'ccyy',
								'required' => TRUE,
								'validation' => TRUE,
								'value' => NULL,
								'format' => '%s'
						),
						'reg-page-billing-card-ccv-code' => array(
								'db-col' => 'ccv-code',
								'label' => __('CCV Code', 'event_espresso'),
								'input' => 'text',
								'type' => 'int',
								'sanitize' => 'ccv',
								'required' => TRUE,
								'validation' => TRUE,
								'value' => NULL,
								'format' => '%s'
						)

				);


				// allow others to edit post input array
				$reg_page_billing_inputs = apply_filters('filter_hook_espresso_reg_page_billing_inputs', $reg_page_billing_inputs);
				// validate and sanitize	post data
				$reg_page_billing_inputs = $EE_VnS->validate_and_sanitize_post_inputs($reg_page_billing_inputs);
				if ($reg_page_billing_inputs) {
					// add billing info to the session
					if ($EE_Session->set_session_data(array('billing_info' => $reg_page_billing_inputs), $section = 'session_data')) {
						$success_msg = __('Billing information submitted successfully', 'event_espresso');
					} else {
						//$error_msg = __( 'An error occured! The billing information could not be submitted. Please refresh your browser and try agin.', 'event_espresso' );
						$espresso_notices = $EE_VnS->return_notices();
						$notices = espresso_get_notices(FALSE);
						$error_msg = $notices['errors'];
					}
				} else {
					$espresso_notices = $EE_VnS->return_notices();
					$notices = espresso_get_notices(FALSE);
					$error_msg = $notices['errors'];
				}

				// End of onsite payment
			}

			if ($this->send_ajax_response($success_msg, $error_msg, '_send_reg_step_2_ajax_response') || $continue) {
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

		global $org_options, $EE_Session;

		$session_data = $EE_Session->get_session_data();
		//printr( $session_data, '$session_data ( ' . __FUNCTION__ . ' on line: ' .  __LINE__ . ' )' );

		$billing_info = $session_data['billing_info'];
		$gateway_data = $session_data['gateway_data'];
		$reg_info = $session_data['cart']['REG'];
		$template_args = array();
		$exclude_attendee_info = array('registration_id', 'price_paid', 'primary_attendee');

		foreach ($reg_info['items'] as $line_item_id => $event) {

			$template_args['events'][$line_item_id]['name'] = $event['name'];
			$template_args['events'][$line_item_id]['date'] = $event['options']['date'];
			$template_args['events'][$line_item_id]['time'] = date('g:i a', strtotime($event['options']['time']));
			$template_args['events'][$line_item_id]['ticket-price'] = $event['options']['price_desc'];

			foreach ($event['attendees'] as $att_nmbr => $attendee) {

				$template_args['events'][$line_item_id]['attendees'][$att_nmbr]['name'] = $attendee['fname'] . ' ' . $attendee['lname'];
				$extra_att_details = array();

				foreach ($attendee as $key => $value) {
					switch ($key) {

						case 'fname' :
						case 'lname' :
							break;

						default:
							if (!in_array($key, $exclude_attendee_info) && !is_numeric($key) && $value != '') {
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

		if ($billing_info == 'no payment required') {
			return '<h3>' . __('No payment required.<br/>Please click "Confirm Registration" below to complete the registration process.', 'event_espresso') . '</h3>';
		} else {
			if ($gateway_data['type']=='off-site') {
				$template_args['billing']['gateway'] = $gateway_data['payment_settings'][$gateway_data['selected_gateway']]['display_name'];
			} else {
				$template_args['billing']['first name'] = $billing_info['reg-page-billing-fname']['value'];
				$template_args['billing']['last name'] = $billing_info['reg-page-billing-lname']['value'];
				$template_args['billing']['email address'] = $billing_info['reg-page-billing-email']['value'];
				$template_args['billing']['address'] = $billing_info['reg-page-billing-address']['value'];
				$template_args['billing']['city'] = $billing_info['reg-page-billing-city']['value'];
				$template_args['billing']['state'] = $billing_info['reg-page-billing-state']['value'];
				$template_args['billing']['zip'] = $billing_info['reg-page-billing-zip']['value'];
				$template_args['billing']['credit card number'] = $billing_info['reg-page-billing-card-nmbr']['value'];
				$template_args['billing']['expiry date'] = $billing_info['reg-page-billing-card-exp-date-mnth']['value'] . $billing_info['reg-page-billing-card-exp-date-year']['value'];
				$template_args['billing']['ccv code'] = $billing_info['reg-page-billing-card-ccv-code']['value'];
			}
			$total = $session_data['_cart_grand_total_amount'];
			if (isset($session_data['tax_totals'])) {
				foreach ($session_data['tax_totals'] as $taxes) {
					$total = $total + $taxes;
				}
			}


			$template_args['billing']['total due'] = $org_options['currency_symbol'] . number_format($total, 2);

			return espresso_display_template($this->_templates['confirmation_page'], $template_args, TRUE);
		}
	}






	/**
	 * 		process_registration_step_3
	 *
	 * 		@access 		public
	 * 		@return 		void
	 */
	public function process_registration_step_3() {
// Sidney is watching me...   { : \
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

		global $org_options;

		$success_msg = FALSE;
		$error_msg = FALSE;
		$continue_reg = TRUE;
		$txn_details = array();

		// check recaptcha
		if ($org_options['use_captcha'] && !is_user_logged_in()) {
			if (!function_exists('recaptcha_check_answer')) {
				require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/recaptchalib.php');
			}

			$response = recaptcha_check_answer($org_options['recaptcha_privatekey'], $_SERVER["REMOTE_ADDR"], $_POST["recaptcha_challenge_field"], $_POST["recaptcha_response_field"]);
			if (!$response->is_valid) {
				$continue_reg = FALSE;
				$error_msg = __('Sorry, but you did not enter the correct anti-spam phrase.<br/>Please refresh the ReCaptcha (the top button of it\'s three), and try again.', 'event_espresso');
			}
		}

		if ($continue_reg) {

			do_action('action_hook_espresso_begin_reg');

			global $EE_Session;

			// load and instantiate models
			require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Base.model.php' );
			require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Registration.model.php' );
			require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Transaction.model.php' );
			require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Attendee.model.php' );
			$REG = EEM_Registration::instance();
			$TXN = EEM_Transaction::instance();
			$ATT = EEM_Attendee::instance();

			// grab session data
			$session = $EE_Session->get_session_data();
//			printr( $session, '$session ( ' . __FUNCTION__ . ' on line: ' .  __LINE__ . ' )' ); die();

			$reg_items = $session['cart']['REG']['items'];

			// in case of back button shenanigans or multiple orders in the same session , we'll remove these so that duplicates don't pile up'
			if ( isset( $session['registration'] )) {
				unset( $session['registration'] );
			}
			if ( isset( $session['transaction'] )) {
				unset( $session['transaction'] );
			}
			if ( isset( $session['txn_results'] )) {
				unset( $session['txn_results'] );
			}
//			printr( $session, '$session ( ' . __FUNCTION__ . ' on line: ' .  __LINE__ . ' )' ); die();

			// start the transaction record
			$transaction = new EE_Transaction(0.00, 'TPN', NULL, $session, NULL, NULL);
			$txn_results = $transaction->insert();
			// more than one item means this is a group registration
			$is_group_reg = count($reg_items) > 1 ? TRUE : FALSE;
			// cycle through items in session
			foreach ($reg_items as $line_item_id => $event) {
				// more than one attendee also means this is a group registration
				$is_group_reg = count($event['attendees']) > 1 ? TRUE : $is_group_reg;
				// cycle through attendees
				foreach ($event['attendees'] as $att_nmbr => $attendee) {

					// grab main attendee details
					$ATT_fname = isset($attendee['fname']) ? $attendee['fname'] : '';
					$ATT_lname = isset($attendee['lname']) ? $attendee['lname'] : '';
					$ATT_email = isset($attendee['email']) ? $attendee['email'] : '';
					// create array for query where statement
					$where_cols_n_values = array('ATT_fname' => $ATT_fname, 'ATT_lname' => $ATT_lname, 'ATT_email' => $ATT_email);
					// do we already have an existing record for this attendee ?
					$existing_attendee = $ATT->find_existing_attendee($where_cols_n_values);
					if ($existing_attendee) {
						$ATT_ID = $existing_attendee->ID();
					} else {
						// create attendee
						$att[$att_nmbr] = new EE_Attendee(
														$ATT_fname,
														$ATT_lname,
														isset($attendee['address']) ? $attendee['address'] : NULL,
														isset($attendee['address2']) ? $attendee['address2'] : NULL,
														isset($attendee['city']) ? $attendee['city'] : NULL,
														isset($attendee['state']) ? $attendee['state'] : NULL,
														isset($attendee['country']) ? $attendee['country'] : NULL,
														isset($attendee['zip']) ? $attendee['zip'] : NULL,
														$ATT_email,
														isset($attendee['phone']) ? $attendee['phone'] : NULL,
														isset($attendee['social']) ? $attendee['social'] : NULL
						);
						//add attendee to db
						$att_results = $att[$att_nmbr]->insert();
						$ATT_ID = $att_results['new-ID'];
					}

					$DTT_ID = $event['options']['dtt_id'];
					$PRC_ID = $event['options']['price_id'];
					$price_paid = $attendee['price_paid'];

					$new_reg_ID = $txn_results['new-ID'] . '-' . $event['id'] . '-' . $ATT_ID . '-' . $DTT_ID . '-' . $PRC_ID . '-' . $att_nmbr . '-' . $session['id'];

					// check for existing registration attempt
					$prev_reg = $REG->find_existing_registrations_LIKE('%-' . $event['id'] . '-' . $ATT_ID . '-' . $DTT_ID . '-' . $PRC_ID . '-' . $att_nmbr . '-' . $session['id'] . '%');
					if ($prev_reg) {

						// get previous transaction
						$prev_txn_ID = $prev_reg->transaction_ID();
						$prev_txn = $TXN->get_transaction($prev_txn_ID);
						if ($prev_txn) {
							// get txn details
							$prev_txn_details = $prev_txn->details();
							if (!isset($prev_txn_details['REDO_TXN'])) {
								$prev_txn_details['REDO_TXN'] = array();
							}
							// update with new TXN_ID
							$prev_txn_details['REDO_TXN'][] = $txn_results['new-ID'];//var_dump($prev_txn_details);die();
							$prev_txn->set_details( $prev_txn_details );
							$prev_txn->update();
						}

						// delete prev registration so that they don't pile up in the DB
						// ( it's ok - we're tracking the failed transactions, and if they don't retry the transaction, then we will still have this record won't we? )
						$REG->delete(array('REG_ID' => $prev_reg->ID()));
					}

					// now create a new registration for the attendee
					$reg[$line_item_id] = new EE_Registration(
													$event['id'],
													$ATT_ID,
													$txn_results['new-ID'],
													$DTT_ID,
													$PRC_ID,
													'RPN',
													time(),
													$price_paid,
													$session['id'],
													$new_reg_ID,
													isset($attendee['primary_attendee']),
													$is_group_reg,
													FALSE,
													FALSE
					);
					//printr( $reg[$line_item_id], '$reg[$line_item_id] ( ' . __FUNCTION__ . ' on line: ' .  __LINE__ . ' )' );die();

					$reg[$line_item_id]->insert();

					// add registration id to session for the primary attendee
					if (isset($attendee['primary_attendee']) && $attendee['primary_attendee'] == 1) {
						$primary_attendee = $session['primary_attendee'];
						$primary_attendee['registration_id'] = $new_reg_ID;
						$EE_Session->set_session_data(array('primary_attendee' => $primary_attendee), 'session_data');
					}
				}
			}

			$EE_Session->set_session_data(array( 'registration' => $reg, 'transaction' => $transaction ), 'session_data');

//			$session2 = $EE_Session->get_session_data();
//			printr( $session2, 'session data ( ' . __FUNCTION__ . ' on line: ' .  __LINE__ . ' )' ); die();

			// free event?
			if (isset($_POST['reg-page-no-payment-required']) && absint($_POST['reg-page-no-payment-required']) == 1) {
				// becuz this was a free event we need to generate some pseudo gateway results
				$txn_details = array(
						'approved' => TRUE,
						'response_msg' => __('You\'re registration has been completed successfully.', 'event_espresso'),
						'status' => 'Approved',
						'details' => 'free event',
						'amount' => 0.00,
						'method' => 'none'
				);
				$EE_Session->set_session_data(array('txn_results' => $txn_details), 'session_data');

			} else {
				// attempt to perform transaction via payment gateway
				$gateway_data = $EE_Session->get_session_data(FALSE, 'gateway_data');
				$selected_gateway = $gateway_data['selected_gateway'];
				$gateway_path = $gateway_data['active_gateways'][$selected_gateway];
				require_once($gateway_path . "/return.php");
				do_action('action_hook_espresso_gateway_process_step_3', $EE_Session);
				if ( $this->_ajax == 0) {
					$gateway_data['type'] = 'onsite_noajax';
					$EE_Session->set_session_data($gateway_data, 'gateway_data');
					if (!$this->_return_page_url) {
						$return_page_id = $org_options['return_url'];
						// get permalink for thank you page
						// to ensure that it ends with a trailing slash, first we remove it (in case it is there) then add it again
						$this->_return_page_url = rtrim(get_permalink($return_page_id), '/');
					}
					wp_safe_redirect($this->_return_page_url);
					exit();
				}
			}
		}
		//$session_data = $EE_Session->get_session_data();var_dump($session_data);die();
		//$this->process_registration_payment( $transaction );

		if ( $this->_ajax == 1) {
			$this->process_registration_payment();
		}

	}





	/**
	 * 		process_registration_payment
	 *
	 * 		@access 		private
	 * 		@param 		object 		$transaction
	 * 		@return 		JSON		or redirect
	 */
	public function process_registration_payment( $perform_redirect = TRUE ) {

		global $EE_Session;
		require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Transaction.model.php' );

		$success_msg = FALSE;
		$error_msg = FALSE;

		// grab session data
		$session = $EE_Session->get_session_data();
//		printr( $session, 'session data ( ' . __FUNCTION__ . ' on line: ' .  __LINE__ . ' )' ); die();

		$transaction = $session['transaction'];
		$txn_results = $session['txn_results'];
		// $txn_results['txn_results'] = $session;

		$txn_results['amount'] = isset($txn_results['amount']) ? (float)abs($txn_results['amount']) : 0.00;
		$txn_results['method'] = isset($txn_results['method']) ? $txn_results['method'] : '';

		switch ($txn_results['status']) {

			case 'Approved' :
				$status = 'TAP';
				$success_msg = $txn_results['response_msg'];
				do_action('action_hook_espresso_reg_approved');
				break;

			case 'Declined' :
				$status = 'DEC';
				$error_msg = __('We\'re sorry, but the transaction was declined for the following reasons: <br />', 'event_espresso') . '<b>' . $txn_results['response_msg'] . '</b>';
				do_action('action_hook_espresso_reg_declined');
				break;

			case 'Incomplete' :
				$status = 'INC';
				$error_msg = __('We\'re sorry, but an error occured and the transaction could not be completed. Please try again. If problems persist, contact the site administrator.', 'event_espresso');
				do_action('action_hook_espresso_reg_incomplete');
				break;
		}

		$transaction->set_total($txn_results['amount']);
		$transaction->set_status($status);
		$transaction->set_details( $txn_results );
		$transaction->set_session_data( $session );

		if (isset($txn_results['md5_hash'])) {
			$transaction->set_hash_salt($txn_results['md5_hash']);
		}

		if (isset($session['taxes'])) {
			$tax_data = array('taxes' => $session['taxes'], 'tax_totals' => $session['tax_totals']);
			$transaction->set_tax_data($tax_data);
		}

		$transaction->update();

		if ($transaction->total() > 0 && $txn_results['status'] == 'Approved') {
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Payment.model.php');
			EEM_Payment::instance();
			$payment = new EE_Payment($transaction->ID(), $transaction->datetime(), $txn_results['method'], $txn_results['amount']);
			$results = $payment->insert();
			if (!$results) {
				$error_msg = __('There was a problem inserting your payment into our records.', 'event_espresso');
			}
		}


/*		global $espresso_notices;
		$espresso_notices['success'][] = $success_msg;
		$espresso_notices['errors'][] = $error_msg;

//		$espresso_notices = $EE_VnS->return_notices();
		$notices = espresso_get_notices(FALSE);
		echo $notices;

//		$error_msg = $notices['errors'];
//		$response_data = array( 'success' => $notices['success'], 'error' => $notices['errors'], 'continue' => $continue_reg );
//		echo json_encode($response_data);
		die();*/

		if( $perform_redirect ) {
			if ($this->send_ajax_response($success_msg, $error_msg, '_send_reg_step_3_ajax_response')) {
				if (!$this->_return_page_url) {
					$return_page_id = $org_options['return_url'];
					// get permalink for thank you page
					// to ensure that it ends with a trailing slash, first we remove it (in case it is there) then add it again
					$this->_return_page_url = rtrim(get_permalink($return_page_id), '/');
				}
				wp_safe_redirect($this->_return_page_url);
				exit();
			} else {
				$reg_page_step_3_url = add_query_arg(array('e_reg' => 'register', 'step' => '3'), $this->_reg_page_base_url);
				wp_safe_redirect($reg_page_step_3_url);
				exit();
			}
		}

	}





	/**
	 * 		send reg step 3 ajax response
	 *
	 * 		@access 		private
	 * 		@param 		string 		$success_msg
	 * 		@return 		JSON
	 */
	private function _send_reg_step_3_ajax_response($args, $success_msg) {

		global $org_options;

		// What's args for?
		$dummy_var = $args;

		// Sidney is watching me...   { : \
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

		if (!$this->_return_page_url) {
			$return_page_id = $org_options['return_url'];
			// get permalink for thank you page
			// to ensure that it ends with a trailing slash, first we remove it (in case it is there) then add it again
			$this->_return_page_url = rtrim(get_permalink($return_page_id), '/');
		}

		$response_data = array(
				'success' => $success_msg,
				'return_data' => array('redirect-to-thank-you-page' => $this->_return_page_url)
		);

		echo json_encode($response_data);
		// to be... or...
		die();
	}





	/**
	 * 		load and display Registration Complete Page
	 *
	 * 		@access 		public
	 * 		@return 		void
	 */
	public function registration_complete() {

		global $EE_Session;

		$session = $EE_Session->get_session_data();
		$txn_results = $session['txn_results'];

		$txn_results = array(
				'approved' => $payment_data->approved ? $payment_data->approved : 0,
				'response_msg' => $payment_data->response_reason_text,
				'md5_hash' => $payment_data->md5_hash,
				'details' => array(
						'transaction_id' => $payment_data->transaction_id,
						'invoice_number' => $payment_data->invoice_number,
				),
		);
	}





	/**
	 *   handle ajax message responses
	 *
	 *   @access private
	 *   @return void
	 */
	private function send_ajax_response($success_msg = FALSE, $error_msg = FALSE, $callback = FALSE, $callback_param = FALSE) {

		global $espresso_notices;
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
				$espresso_notices['success'][] = $success_msg;
				// return false becuz response was not ajax
				return TRUE;
			}
		} elseif ($error_msg) {

			if ($this->_ajax === 1) {
				echo json_encode(array('error' => $error_msg));
				die();
			} else {
				$espresso_notices['errors'][] = $error_msg;
				// return false becuz response was not ajax
				return FALSE;
			}
		}
	}

}

/* End of file EE_Single_Page_Checkout.class.php */
/* Location: includes/process-registration/EE_Single_Page_Checkout.class.php */