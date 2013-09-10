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
 * Event List
 *
 * @package			Event Espresso
 * @subpackage	/modules/event_list/
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EED_Single_Page_Checkout  extends EED_Module {

	// base url for the site's registration checkout page - additional url params will be added to this
	private $_reg_page_base_url = '';

	private $_templates = array();


	/**
	 * 	set_hooks - for hooking into EE Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks() {
		// routing
		EE_Config::register_route( 'register', 'EED_Single_Page_Checkout', 'run' );
		EE_Config::register_route( 'process_reg_step_1', 'EED_Single_Page_Checkout', 'process_registration_step_1' );
		EE_Config::register_route( 'process_reg_step_2', 'EED_Single_Page_Checkout', 'process_registration_step_2' );
		EE_Config::register_route( 'process_reg_step_3', 'EED_Single_Page_Checkout', 'process_registration_step_3' );
		// hooks
		add_action( 'wp_loaded', array( 'EED_Single_Page_Checkout', 'set_definitions' ), 2 );
		// AJAX
		add_action('wp_ajax_espresso_process_registration_step_1', array( 'EED_Single_Page_Checkout', 'process_registration_step_1'));
		add_action('wp_ajax_espresso_process_registration_step_2', array( 'EED_Single_Page_Checkout', 'process_registration_step_2'));
		add_action('wp_ajax_espresso_process_registration_step_3', array( 'EED_Single_Page_Checkout', 'process_registration_step_3'));
	}



	/**
	 * 	set_hooks_admin - for hooking into EE Admin Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks_admin() {

		// AJAX
		add_action('wp_ajax_nopriv_espresso_process_registration_step_1', array( 'EED_Single_Page_Checkout', 'process_registration_step_1'));
		add_action('wp_ajax_nopriv_espresso_process_registration_step_2', array( 'EED_Single_Page_Checkout', 'process_registration_step_2'));
		add_action('wp_ajax_nopriv_espresso_process_registration_step_3', array( 'EED_Single_Page_Checkout', 'process_registration_step_3'));

	}



	/**
	 * 	set_definitions
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function set_definitions() {
		define( 'SPCO_ASSETS_URL', plugin_dir_url( __FILE__ ) . 'assets' . DS );
		define( 'SPCO_TEMPLATES_PATH', str_replace( '\\', DS, plugin_dir_path( __FILE__ )) . 'templates' . DS );
	}




	/**
	 * 	run - initial module setup
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function run( $WP ) {
		$this->EE = EE_Registry::instance();
		// load classes
		$this->EE->load_core( 'Cart' );
		$this->EE->load_model( 'Gateways' );
		$this->EE->LIB->EEM_Gateways->set_ajax( $this->EE->REQ->ajax );
		
		//printr( $this->EE->CART, '$this->EE->CART  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		//taxes
		$this->EE->load_class( 'Cost_Calculator' );
		$this->EE->load_class( 'Taxes', array(), FALSE, FALSE, TRUE );
		$this->set_templates();
		// load css and js
		add_action('wp_enqueue_scripts', array( 'EED_Single_Page_Checkout', 'wp_enqueue_scripts' ), 5 );
		add_filter( 'espresso_filter_hook_calculate_taxes', array( 'EE_Taxes', 'calculate_taxes' ));
		
		$this->_reg_page_base_url = get_permalink( $this->EE->CFG->core->reg_page_id );
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
	 * 		wp_enqueue_scripts
	 *
	 * 		@access 		public
	 * 		@return 		void
	 */
	public function wp_enqueue_scripts() {
		wp_register_style( 'single_page_checkout', EVENT_ESPRESSO_PLUGINFULLURL . 'templates/reg_page_checkout/registration_page_checkout.css' );
		wp_enqueue_style( 'single_page_checkout' );
		wp_register_script( 'single_page_checkout', EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/registration_page_checkout.js', array('jquery'), '', TRUE );
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

		$template_args = array();

		$template_args['currency_symbol'] = $this->EE->CFG->currency->sign;

		$template_args['css_class'] = ' ui-widget-content ui-corner-all';
		$template_args['confirmation_data'] = '';

		// grab what step we're on
		$step = $this->EE->is_set( 'step' ) ? absint( $this->EE->get( 'step' )) : 1;

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
		if (isset($_GET['payment'])) {
			if ($this->EE->LIB->EEM_Gateways->selected_gateway() != $_GET['payment']) {
				$this->EE->LIB->EEM_Gateways->set_selected_gateway(sanitize_text_field($_GET['payment']));
			} else {
				$this->EE->LIB->EEM_Gateways->unset_selected_gateway(sanitize_text_field($_GET['payment']));
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
					$event_queue[$cart_type]['items'][$item['line_item']]['ticket_desc'] = stripslashes( $item['options']['ticket_desc'] );
					$event_queue[$cart_type]['items'][$item['line_item']]['ticket'] = $item['ticket'];
					$event_queue[$cart_type]['items'][$item['line_item']]['qty'] = $item['qty'];
					$event_queue[$cart_type]['items'][$item['line_item']]['line_total'] = number_format($item['line_total'], 2, '.', '');

					// get additional event registration details not currently in the sesion/cart
					//$event_reg_details = $this->_get_event_reg_details($item['id']);
					//echo printr($event_reg_details);

					//$event_reg_details->question_groups = maybe_unserialize($event_reg_details->question_groups);
					//$event_reg_details->event_meta = maybe_unserialize($event_reg_details->event_meta);

//					 echo '<h2>require pre approval : ' . $event_reg_details->require_pre_approval . '</h2>';
//					 echo '<h2>use coupon code : ' . $event_reg_details->use_coupon_code . '</h2>';
//					 echo '<h2>use groupon code : ' . $event_reg_details->use_groupon_code . '</h2>';

//					if ($event_reg_details->require_pre_approval == 1) {
//						$events_requiring_pre_approval[$cart_type]['items'][$item['line_item']] = array('id' => $item['id'], 'name' => $item['name'], 'ticket' => $item['ticket'], 'qty' => $item['qty']);
//					}

//					if ($event_reg_details->use_coupon_code) {
//						$events_that_use_coupon_codes[$cart_type]['items'][$item['line_item']] = array('id' => $item['id'], 'name' => $item['name'], 'ticket' => $item['ticket'], 'qty' => $item['qty']);
//					}
//
//					if (defined('EVENTS_GROUPON_CODES_TABLE') && $event_reg_details->use_groupon_code) {
//						$events_that_use_groupon_codes[$cart_type]['items'][$item['line_item']] = array('id' => $item['id'], 'name' => $item['name'], 'ticket' => $item['ticket'], 'qty' => $item['qty']);
//					}

					// $additional_event_registration_info = apply_filters( 'FHEE_additional_event_registration_info', $additional_event_registration_info );
					// $event_queue[$cart_type]['items'][ $item['line_item'] ]['extra_reg_info'] = $additional_event_registration_info;


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
								'date' => $tckt_date,
								'time' => $tckt_time,
								'input_name' => $input_name,
								'input_id' => $input_id,
								'input_class' => 'ee-reg-page-questions' . $template_args['css_class'],
								'additional_attendee_reg_info' => $additional_attendee_reg_info
						);

						add_filter( 'FHEE_form_field_label_html', array( $this, 'reg_form_form_field_label_wrap' ), 10, 1 );
						add_filter( 'FHEE_form_field_input_html', array( $this, 'reg_form_form_field_input__wrap' ), 10, 1 );
						
						$questions_and_groups = EEM_Event::instance()->get_event_questions_and_groups( $question_meta );
//						printr( $questions_and_groups, '$questions_and_groups  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
						$att_questions = EEH_Form_Fields::generate_question_groups_html( $questions_and_groups, 'div' );

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
							
							$item_name = $item['name'] . ' - ' . stripslashes( $item['options']['ticket_desc'] );

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
		$template_args['sub_total'] = number_format( $grand_total, 2, '.', '' );

		$template_args['taxes'] = FALSE;
		$template_args['taxes'] = EE_Taxes::calculate_taxes( $grand_total );
		$grand_total = apply_filters( 'espresso_filter_hook_grand_total_after_taxes', $grand_total );

		$template_args['grand_total'] = number_format($grand_total, 2, '.', '');

		$template_args['event_queue'] = $event_queue;
		$template_args['nmbr_of_carts'] = count($event_queue);
		$template_args['images_dir_url'] = EVENT_ESPRESSO_PLUGINFULLURL . 'images/';

		$template_args['return_url'] = add_query_arg(array('ee' => 'event_queue'), $this->_reg_page_base_url);
		$template_args['update_url'] = add_query_arg(array('ee' => 'update_event_queue'), $this->_reg_page_base_url);
		$template_args['event_queue_url'] = add_query_arg(array('ee' => 'event_queue'), $this->_reg_page_base_url);
		$template_args['register_url'] = add_query_arg(array('ee' => 'register'), $this->_reg_page_base_url);
		$template_args['reg_page_step_1_url'] = add_query_arg(array('ee' => 'register', 'step' => 1), $this->_reg_page_base_url);
		$template_args['reg_page_goto_step_2_url'] = add_query_arg(array('ee' => 'process_reg_step_1'), $this->_reg_page_base_url);
		$template_args['reg_page_goto_step_3_url'] = add_query_arg(array('ee' => 'process_reg_step_2'), $this->_reg_page_base_url);
		$template_args['reg_page_complete_reg_url'] = add_query_arg(array('ee' => 'process_reg_step_3'), $this->_reg_page_base_url);
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

//		printr( $EE_Session->get_session_data(), '$EE_Session  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		
		$this->EE->REQ->set_output( espresso_display_template( $this->_templates['registration_page_wrapper'], $template_args, TRUE ));
	}














}




// End of file EED_Single_Page_Checkout.module.php
// Location: /modules/event_list/EED_Single_Page_Checkout.module.php