<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
 /**
 *
 * Class EE_SPCO_Reg_Step_Payment_Options
 *
 * Description
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Brent Christensen
 * @since 				4.5.0
 *
 */
class EE_SPCO_Reg_Step_Payment_Options extends EE_SPCO_Reg_Step {

	/**
	 * @access protected
	 * @var EE_Line_Item_Display $Line_Item_Display
	 */
	protected $Line_Item_Display = null;



	/**
	 * 	set_hooks - for hooking into EE Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks() {
		add_action( 'wp_ajax_spco_billing_form', array( 'EE_SPCO_Reg_Step_Payment_Options', 'spco_billing_form' ));
		add_action( 'wp_ajax_nopriv_spco_billing_form', array( 'EE_SPCO_Reg_Step_Payment_Options', 'spco_billing_form' ));
		add_action( 'wp_ajax_get_transaction_details_for_gateways', array( 'EE_SPCO_Reg_Step_Payment_Options', 'get_transaction_details' ) );
		add_action( 'wp_ajax_nopriv_get_transaction_details_for_gateways', array( 'EE_SPCO_Reg_Step_Payment_Options', 'get_transaction_details' ) );
		add_filter( 'FHEE__EED_Recaptcha___bypass_recaptcha__bypass_request_params_array', array( 'EE_SPCO_Reg_Step_Payment_Options', 'bypass_recaptcha_for_load_payment_method' ), 10, 1 );
	}




	/**
	 * 	ajax spco_billing_form
	 */
	public static function spco_billing_form() {
		EED_Single_Page_Checkout::process_ajax_request( 'get_billing_form_html_for_payment_method' );
	}




	/**
	 * 	ajax get_transaction_details
	 */
	public static function get_transaction_details() {
		EED_Single_Page_Checkout::process_ajax_request( 'get_transaction_details_for_gateways' );
	}





	/**
	 *    class constructor
	 *
	 * @access    public
	 * @param    EE_Checkout $checkout
	 * @return    \EE_SPCO_Reg_Step_Payment_Options
	 */
	public function __construct( EE_Checkout $checkout ) {
		$this->_slug = 'payment_options';
		$this->_name = __('Payment Options', 'event_espresso');
		$this->_template = SPCO_TEMPLATES_PATH . 'payment_options_main.template.php';
		$this->checkout = $checkout;
		$this->_reset_success_message();
		$this->set_instructions( __('Please select a method of payment and provide any necessary billing information before proceeding.', 'event_espresso'));
	}



	/**
	 * @return null
	 */
	public function Line_Item_Display() {
		return $this->Line_Item_Display;
	}



	/**
	 * @param null $Line_Item_Display
	 */
	public function set_Line_Item_Display( $Line_Item_Display ) {
		$this->Line_Item_Display = $Line_Item_Display;
	}



	/**
	 * translate_js_strings
	 * @return void
	 */
	public function translate_js_strings() {
		EE_Registry::$i18n_js_strings['no_payment_method'] = __( 'Please select a method of payment in order to continue.', 'event_espresso' );
		EE_Registry::$i18n_js_strings['invalid_payment_method'] = __( 'A valid method of payment could not be determined. Please refresh the page and try again.', 'event_espresso' );
		EE_Registry::$i18n_js_strings['forwarding_to_offsite'] = __( 'Forwarding to Secure Payment Provider.', 'event_espresso' );
	}



	/**
	 * enqueue_styles_and_scripts
	 * @return void
	 */
	public function enqueue_styles_and_scripts() {

	}



	/**
	 * initialize_reg_step
	 * @return void
	 */
	public function initialize_reg_step() {
		// TODO: if /when we implement donations, then this will need overriding
		if (
			// don't need payment options for:
			// 	registrations made via the admin
			// 	completed transactions
			// 	overpaid transactions
			// 	$ 0.00 transactions (no payment required)
			! $this->checkout->payment_required()
			// but do NOT remove if current action being called belongs to this reg step
			&& ! is_callable( array( $this, $this->checkout->action ) )
		) {
				// and if so, then we no longer need the Payment Options step
				$this->checkout->remove_reg_step( $this->_slug );
				$this->checkout->reset_reg_steps();
				// DEBUG LOG
				//$this->checkout->log( __CLASS__, __FUNCTION__, __LINE__ );
				return;
		}
		// load EEM_Payment_Method
		EE_Registry::instance()->load_model( 'Payment_Method' );
		// get all active payment methods
		$this->checkout->available_payment_methods = EEM_Payment_Method::instance()->get_all_for_transaction( $this->checkout->transaction, EEM_Payment_Method::scope_cart );
	}



	/**
	 * @return bool
	 */
	public function generate_reg_form() {
		EE_Registry::instance()->load_helper( 'HTML' );
		// set some defaults
		$this->checkout->selected_method_of_payment = 'payments_closed';
		$registrations_requiring_payment = array();
		$registrations_for_free_events = array();
		$registrations_requiring_pre_approval = array();
		$sold_out_events = array();
		$reg_count = 0;
		// loop thru registrations to gather info
		$registrations = $this->checkout->transaction->registrations( $this->checkout->reg_cache_where_params );
		foreach ( $registrations as $registration ) {
			//echo '<h3 style="color:#E76700;line-height:1em;">' . $registration->ID() . '<br/><span style="font-size:9px;font-weight:normal;color:#666">' . __FILE__ . '</span>    <b style="font-size:10px;color:#333">  ' . __LINE__ . ' </b></h3>';
			/** @var $registration EE_Registration */
			$reg_count++;
			// if returning registrant is Approved then do NOT do this
			if ( ! ( $this->checkout->revisit && $registration->status_ID() == EEM_Registration::status_id_approved )) {
				if ( $registration->event()->is_sold_out() || $registration->event()->is_sold_out( true )) {
					// add event to list of events that are sold out
					$sold_out_events[ $registration->event()->ID() ] = $registration->event();
					do_action(
						'AHEE__EE_SPCO_Reg_Step_Payment_Options__generate_reg_form__sold_out_event',
						$registration->event(),
						$this
					);
				}
				// event requires admin approval
				if ( $registration->status_ID() == EEM_Registration::status_id_not_approved ) {
					// add event to list of events with pre-approval reg status
					$registrations_requiring_pre_approval[ $registration->ID() ] = $registration;
					do_action(
						'AHEE__EE_SPCO_Reg_Step_Payment_Options__generate_reg_form__event_requires_pre_approval',
						$registration->event(),
						$this
					);
				}
			}
			// are they allowed to pay now and is there monies owing?
			if ( $registration->owes_monies_and_can_pay() ) {
				$registrations_requiring_payment[ $registration->ID() ] = $registration;
				do_action(
					'AHEE__EE_SPCO_Reg_Step_Payment_Options__generate_reg_form__event_requires_payment',
					$registration->event(),
					$this
				);
			} else if ( ! $this->checkout->revisit && $registration->status_ID() != EEM_Registration::status_id_not_approved && $registration->ticket()->is_free()  ) {
				$registrations_for_free_events[ $registration->event()->ID() ] = $registration;
			}
		}
		$subsections = array();
		// now decide which template to load
		if ( ! empty( $sold_out_events )) {
			$subsections['sold_out_events'] = $this->_sold_out_events( $sold_out_events );
		}
		if ( ! empty( $registrations_requiring_pre_approval )) {
			$subsections['registrations_requiring_pre_approval'] = $this->_registrations_requiring_pre_approval( $registrations_requiring_pre_approval );
		}
		if ( ! empty( $registrations_for_free_events ) ) {
			$subsections[ 'no_payment_required' ] = $this->_no_payment_required( $registrations_for_free_events );
		}
		if ( ! empty( $registrations_requiring_payment ) ) {
			//EEH_Debug_Tools::printr( $registrations_requiring_payment, '$registrations_requiring_payment', __FILE__, __LINE__ );
			// autoload Line_Item_Display classes
			EEH_Autoloader::register_line_item_display_autoloaders();
			$this->set_Line_Item_Display( new EE_Line_Item_Display( 'spco' ) );
			$transaction_details = $this->Line_Item_Display->display_line_item(
				$this->checkout->cart->get_grand_total(),
				array( 'registrations' => $registrations )
			);
			$this->checkout->amount_owing = $this->Line_Item_Display->grand_total();
			if ( $this->checkout->amount_owing > 0 ) {
				$subsections[ 'payment_options' ] = $this->_display_payment_options( $transaction_details );
			}
		}
		return new EE_Form_Section_Proper(
			array(
				'name'            => $this->reg_form_name(),
				'html_id'         => $this->reg_form_name(),
				'subsections'  => $subsections,
				'layout_strategy' => new EE_No_Layout()
			)
		);

	}



	/**
	 * sold_out_events
	 * @param \EE_Event[] $sold_out_events_array
	 * @return \EE_Form_Section_Proper
	 */
	private function _sold_out_events( $sold_out_events_array = array() ) {
		// set some defaults
		$this->checkout->selected_method_of_payment = 'events_sold_out';

		$sold_out_events = '';
		foreach ( $sold_out_events_array as $sold_out_event ) {
			$sold_out_events .= EEH_HTML::li( EEH_HTML::span( $sold_out_event->name(), '', 'dashicons dashicons-marker ee-icon-size-16 pink-text' ));
		}
		return new EE_Form_Section_Proper(
			array(
				//'name' 					=> $this->reg_form_name(),
				//'html_id' 					=> $this->reg_form_name(),
				'subsections' 			=> array(
					'default_hidden_inputs' => $this->reg_step_hidden_inputs(),
					'extra_hidden_inputs' 	=> $this->_extra_hidden_inputs()
				),
				'layout_strategy'		=> new EE_Template_Layout(
					array(
						'layout_template_file' 	=> SPCO_TEMPLATES_PATH . $this->slug() . DS . 'sold_out_events.template.php', // layout_template
						'template_args'  				=> apply_filters(
							'FHEE__EE_SPCO_Reg_Step_Payment_Options___sold_out_events__template_args',
							array(
								'sold_out_events' 			=> $sold_out_events,
								'sold_out_events_msg' 	=> apply_filters(
									'FHEE__EE_SPCO_Reg_Step_Payment_Options___sold_out_events__sold_out_events_msg',
									__( 'It appears that the event you were about to make a payment for has sold out since you first registered. If you have already made a partial payment towards this event, please contact the event administrator for a refund.', 'event_espresso' )
								)
							)
						)
					)
				)
			)
		);
	}



	/**
	 * registrations_requiring_pre_approval
	 * @param array $registrations_requiring_pre_approval
	 * @return \EE_Form_Section_Proper
	 */
	private function _registrations_requiring_pre_approval( $registrations_requiring_pre_approval = array()) {
		$events_requiring_pre_approval = '';
		foreach ( $registrations_requiring_pre_approval as $registration ) {
			if ( $registration instanceof EE_Registration && $registration->event() instanceof EE_Event ) {
				$events_requiring_pre_approval[ $registration->event()->ID() ] = EEH_HTML::li(
					EEH_HTML::span( '', '', 'dashicons dashicons-marker ee-icon-size-16 orange-text'
					)
					. EEH_HTML::span( $registration->event()->name(), '', 'orange-text' )
				);
			}
		}
		return new EE_Form_Section_Proper(
			array(
				'subsections' 			=> array(
					'default_hidden_inputs' => $this->reg_step_hidden_inputs(),
					'extra_hidden_inputs' 	=> $this->_extra_hidden_inputs()
				),
				'layout_strategy'		=> new EE_Template_Layout(
					array(
						'layout_template_file' 	=> SPCO_TEMPLATES_PATH . $this->slug() . DS . 'events_requiring_pre_approval.template.php', // layout_template
						'template_args'  				=> apply_filters(
							'FHEE__EE_SPCO_Reg_Step_Payment_Options___sold_out_events__template_args',
							array(
								'events_requiring_pre_approval' 			=> implode( '', $events_requiring_pre_approval ),
								'events_requiring_pre_approval_msg' 	=> apply_filters(
									'FHEE__EE_SPCO_Reg_Step_Payment_Options___events_requiring_pre_approval__events_requiring_pre_approval_msg',
									__( 'The following events do not require payment at this time and will not be billed during this transaction. Billing will only occur after the attendee has been approved by the event organizer. You will be notified when your registration has been processed. If this is a free event, then no billing will occur.', 'event_espresso' )
								)
							)
						),
					)
				),
			)
		);
	}



	/**
	 * _no_payment_required
	 *
	 * @param \EE_Event[] $registrations_for_free_events
	 * @return \EE_Form_Section_Proper
	 */
	private function _no_payment_required( $registrations_for_free_events = array() ) {
		// set some defaults
		$this->checkout->selected_method_of_payment = 'no_payment_required';
		// generate no_payment_required form
		return new EE_Form_Section_Proper(
			array(
				'subsections' 			=> array(
					'default_hidden_inputs' => $this->reg_step_hidden_inputs(),
					'extra_hidden_inputs' 	=> $this->_extra_hidden_inputs()
				),
				'layout_strategy' 	=> new EE_Template_Layout(
					array(
						'layout_template_file' 	=> SPCO_TEMPLATES_PATH . $this->slug() . DS . 'no_payment_required.template.php', // layout_template
						'template_args'  				=> apply_filters(
							'FHEE__EE_SPCO_Reg_Step_Payment_Options___no_payment_required__template_args',
							array(
								'revisit' 			=> $this->checkout->revisit,
								'registrations' => array(),
								'ticket_count' 	=> array(),
								'registrations_for_free_events' 	=> $registrations_for_free_events,
								'no_payment_required_msg' => EEH_HTML::p( __( 'This is a free event, so no billing will occur.', 'event_espresso' ))
							)
						),
					)
				),
			)
		);
	}



	/**
	 * _display_payment_options
	 *
	 * @param string $transaction_details
	 * @return \EE_Form_Section_Proper
	 */
	private function _display_payment_options( $transaction_details = '' ) {
		// reset in case someone changes their mind
		$this->_reset_selected_method_of_payment();
		// has method_of_payment been set by no-js user?
		$this->checkout->selected_method_of_payment = $this->_get_selected_method_of_payment();
		// build payment options form
		return new EE_Form_Section_Proper(
			array(
				'subsections' 	=> array(
					'payment_options' => $this->_setup_payment_options(),
					'default_hidden_inputs' => $this->reg_step_hidden_inputs(),
					'extra_hidden_inputs' 		=> $this->_extra_hidden_inputs( FALSE )
				),
				'layout_strategy'		=> new EE_Template_Layout( array(
						'layout_template_file' 	=> SPCO_TEMPLATES_PATH . $this->slug() . DS . 'payment_options_main.template.php',
						'template_args'  				=> apply_filters(
							'FHEE__EE_SPCO_Reg_Step_Payment_Options___payment_options__template_args',
							array(
								'reg_count' 					=> $this->Line_Item_Display->total_items(),
								'transaction_details' 	=> $transaction_details,
								'available_payment_methods' => array()
							)
						),
					)
				),
			)
		);
	}



	/**
	 * _extra_hidden_inputs
	 * @param bool $no_payment_required
	 * @return \EE_Form_Section_Proper
	 */
	private function _extra_hidden_inputs( $no_payment_required = TRUE ) {

		return new EE_Form_Section_Proper(
			array(
				'html_id' 				=> 'ee-' . $this->slug() . '-hidden-inputs',
				'layout_strategy'	=> new EE_Div_Per_Section_Layout(),
				'subsections' 		=> array(
					'selected_method_of_payment_input' => new EE_Hidden_Input(
							array(
								'normalization_strategy' 	=> NULL,
								'html_name' 						=> 'selected_method_of_payment',
								'html_id' 								=> 'reg-page-selected-method-of-payment',
								'default'								=> $this->checkout->selected_method_of_payment
							)
						),
					'spco_no_payment_required' => new EE_Hidden_Input(
							array(
								'normalization_strategy' 	=> new EE_Boolean_Normalization(),
								'html_name' 						=> 'spco_no_payment_required',
								'html_id' 								=> 'spco-no-payment-required-payment_options',
								'default'								=> $no_payment_required
							)
						)
				)
			)
		);

	}



	/**
	 *    _reset_selected_method_of_payment
	 *
	 * @access 	private
	 * @param 	bool $force_reset
	 * @return 	void
	 */
	private function _reset_selected_method_of_payment( $force_reset = FALSE ) {
		$reset_payment_method = $force_reset ? TRUE : sanitize_text_field( EE_Registry::instance()->REQ->get( 'reset_payment_method', FALSE ));
		if ( $reset_payment_method ) {
			$this->checkout->selected_method_of_payment = NULL;
			$this->_save_selected_method_of_payment();
		}
	}



	/**
	 *    _save_selected_method_of_payment
	 *
	 * 		stores the selected_method_of_payment in the session so that it's available for all subsequent requests including AJAX
	 *
	 * 	@access 		private
	 * @param string $selected_method_of_payment
	 * 	@return 		EE_Billing_Info_Form
	 */
	private function _save_selected_method_of_payment( $selected_method_of_payment = '' ) {
		$selected_method_of_payment = ! empty( $selected_method_of_payment ) ? $selected_method_of_payment : $this->checkout->selected_method_of_payment;
		EE_Registry::instance()->SSN->set_session_data( array( 'selected_method_of_payment' => $selected_method_of_payment ));
	}



	/**
	 * _setup_payment_options
	 * @return \EE_Form_Section_Proper
	 */
	public function _setup_payment_options() {
		// switch up header depending on number of available payment methods
		$payment_method_header = count( $this->checkout->available_payment_methods ) > 1
			? apply_filters( 'FHEE__registration_page_payment_options__method_of_payment_hdr', __( 'Please Select Your Method of Payment', 'event_espresso' ))
			: apply_filters( 'FHEE__registration_page_payment_options__method_of_payment_hdr', __( 'Method of Payment', 'event_espresso' ));
		$available_payment_methods = array(
			// display the "Payment Method" header
			'payment_method_header' => new EE_Form_Section_HTML(
				EEH_HTML::h4 ( $payment_method_header, 'method-of-payment-hdr' )
			)
		);
		// the list of actual payment methods ( invoice, paypal, etc ) in a  ( slug => HTML )  format
		$available_payment_method_options = array();
		$default_payment_method_option = array();
		// additional instructions to be displayed and hidden below payment methods (adding a clearing div to start)
		$payment_methods_billing_info = array( new EE_Form_Section_HTML( EEH_HTML::div ( '<br />', '', '', 'clear:both;' )));
		// loop through payment methods
		foreach( $this->checkout->available_payment_methods as $payment_method ) {
			if ( $payment_method instanceof EE_Payment_Method ) {

				$payment_method_button = EEH_HTML::img( $payment_method->button_url(), $payment_method->name(), 'spco-payment-method-' . $payment_method->slug() . '-btn-img', 'spco-payment-method-btn-img' );
				// check if any payment methods are set as default
				// if payment method is already selected OR nothing is selected and this payment method should be open_by_default
				if (( $this->checkout->selected_method_of_payment == $payment_method->slug() ) || ( ! $this->checkout->selected_method_of_payment && $payment_method->open_by_default() )) {
					$this->checkout->selected_method_of_payment = $payment_method->slug();
					$this->_save_selected_method_of_payment();
					$default_payment_method_option[ $payment_method->slug() ] =  $payment_method_button;
				} else {
					$available_payment_method_options[ $payment_method->slug() ] =  $payment_method_button;
				}
				$payment_methods_billing_info[ $payment_method->slug() . '-info' ] = $this->_payment_method_billing_info( $payment_method );
			}
		}
		// prepend available_payment_method_options with default_payment_method_option so that it appears first in list of PMs
		$available_payment_method_options = $default_payment_method_option + $available_payment_method_options;
		// now generate the actual form  inputs
		$available_payment_methods['available_payment_methods'] = $this->_available_payment_method_inputs( $available_payment_method_options );
		$available_payment_methods = $available_payment_methods + $payment_methods_billing_info;

		// build the available payment methods form
		return new EE_Form_Section_Proper(
			array(
				'html_id' 					=> 'spco-available-methods-of-payment-dv',
				'subsections' 			=> $available_payment_methods,
				'layout_strategy'		=> new EE_Div_Per_Section_Layout()
			)
		);
	}




	/**
	 *    _available_payment_method_inputs
	 *
	 * @access 	private
	 * @param 	array $available_payment_method_options
	 * @return 	\EE_Form_Section_Proper
	 */
	private function _available_payment_method_inputs( $available_payment_method_options = array() ) {
		// generate inputs
		return new EE_Form_Section_Proper(
			array(
				'html_id' 				=> 'ee-available-payment-method-inputs',
				'layout_strategy'	=> new EE_Div_Per_Section_Layout(),
				'subsections' 		=> array(
					'' => new EE_Radio_Button_Input (
						$available_payment_method_options,
						array(
							'html_name' 				=> 'selected_method_of_payment',
							'html_class' 				=> 'spco-payment-method',
							'default'						=> $this->checkout->selected_method_of_payment,
							'label_size'					=> 11,
							'enforce_label_size' 	=> TRUE
						)
					)
				)
			)
		);
	}



	/**
	 *    _payment_method_billing_info
	 *
	 * @access 	private
	 * @param 	EE_Payment_Method $payment_method
	 * @return 	\EE_Form_Section_Proper
	 */
	private function _payment_method_billing_info( EE_Payment_Method $payment_method ) {
		$currently_selected = $this->checkout->selected_method_of_payment == $payment_method->slug() ? TRUE : FALSE;
		// generate the billing form for payment method
		$billing_form = $this->_get_billing_form_for_payment_method( $payment_method, $currently_selected );
		// it's all in the details
		$info_html = EEH_HTML::h3 ( __( 'Important information regarding your payment', 'event_espresso' ), '', 'spco-payment-method-hdr' );
		// add some info regarding the step, either from what's saved in the admin, or a default string depending on whether the PM has a billing form or not
		if ( $payment_method->description() ) {
			$payment_method_info = $payment_method->description();
		} elseif ( $billing_form instanceof EE_Billing_Info_Form ) {
			$payment_method_info = sprintf( __( 'Please provide the following billing information, then click the "%1$s" button below in order to proceed.', 'event_espresso' ), $this->submit_button_text() );
		} else {
			$payment_method_info = sprintf( __( 'Please click the "%1$s" button below in order to proceed.', 'event_espresso' ), $this->submit_button_text() );
		}
		$info_html .= EEH_HTML::p (
			apply_filters( 'FHEE__EE_SPCO_Reg_Step_Payment_Options___payment_method_billing_info__payment_method_info', $payment_method_info ),
			'',
			'spco-payment-method-desc ee-attention'
		);

		return new EE_Form_Section_Proper(
			array(
				'html_id' 					=> 'spco-payment-method-info-' . $payment_method->slug(),
				'html_class' 			=> 'spco-payment-method-info-dv',
				// only display the selected or default PM
				'html_style' 			=> $this->checkout->selected_method_of_payment == $payment_method->slug() ? '' : 'display:none;',
				'layout_strategy'		=> new EE_Div_Per_Section_Layout(),
				'subsections' 			=> array(
					'info' 					=> new EE_Form_Section_HTML( $info_html ),
					'billing_form' 		=> $this->checkout->selected_method_of_payment == $payment_method->slug() ? $billing_form : new EE_Form_Section_HTML()
				)
			)
		);

	}



	/**
	 * bypass_recaptcha_for_load_payment_method
	 *
	 * @access public
	 * @return string
	 */
	public static function bypass_recaptcha_for_load_payment_method() {
		return array(
			'EESID' 		=> EE_Registry::instance()->SSN->id(),
			'step' 		=> 'payment_options',
			'action' 	=> 'spco_billing_form'
		);
	}



	/**
	 * get_billing_form_html_for_payment_method
	 *
	 * @access public
	 * @return string
	 */
	public function get_billing_form_html_for_payment_method() {
		// how have they chosen to pay?
		$this->checkout->selected_method_of_payment = $this->_get_selected_method_of_payment( TRUE );
		$this->checkout->payment_method = $this->_get_payment_method_for_selected_method_of_payment();
		if ( ! $this->checkout->payment_method instanceof EE_Payment_Method ) {
			return FALSE;
		}
		if ( apply_filters( 'FHEE__EE_SPCO_Reg_Step_Payment_Options__registration_checkout__selected_payment_method__display_success', false ) ) {
            EE_Error::add_success(
                apply_filters(
                    'FHEE__Single_Page_Checkout__registration_checkout__selected_payment_method',
                    sprintf(__('You have selected "%s" as your method of payment. Please note the important payment information below.', 'event_espresso'), $this->checkout->payment_method->name())
                )
            );
        }
		// now generate billing form for selected method of payment
		$payment_method_billing_form = $this->_get_billing_form_for_payment_method( $this->checkout->payment_method, FALSE );
		// fill form with attendee info if applicable
		if ( $payment_method_billing_form instanceof EE_Billing_Attendee_Info_Form && $this->checkout->transaction_has_primary_registrant() ) {
			$payment_method_billing_form->populate_from_attendee( $this->checkout->transaction->primary_registration()->attendee() );
		}
		// and debug content
		if ( $payment_method_billing_form instanceof EE_Billing_Info_Form && $this->checkout->payment_method->type_obj() instanceof EE_PMT_Base ) {
			$payment_method_billing_form = $this->checkout->payment_method->type_obj()->apply_billing_form_debug_settings( $payment_method_billing_form );
		}
		$billing_info = $payment_method_billing_form instanceof EE_Form_Section_Proper ? $payment_method_billing_form->get_html() : '';
		$this->checkout->json_response->set_return_data( array( 'payment_method_info' => $billing_info ));
		// localize validation rules for main form
		$this->checkout->current_step->reg_form->localize_validation_rules();
		$this->checkout->json_response->add_validation_rules( EE_Form_Section_Proper::js_localization() );
		return TRUE;
	}



	/**
	 * _get_billing_form_for_payment_method
	 *
	 * @access private
	 * @param EE_Payment_Method $payment_method
	 * @return \EE_Billing_Info_Form
	 */
	private function _get_billing_form_for_payment_method( EE_Payment_Method $payment_method ) {
		$billing_form = $payment_method->type_obj()->billing_form( $this->checkout->transaction, array( 'amount_owing' => $this->checkout->amount_owing ) );
		if ( $billing_form instanceof EE_Billing_Info_Form ) {
			if ( EE_Registry::instance()->REQ->is_set( 'payment_method' )) {
                if ( apply_filters('FHEE__EE_SPCO_Reg_Step_Payment_Options__registration_checkout__selected_payment_method__display_success', false )) {
                    EE_Error::add_success(
                        apply_filters(
                            'FHEE__Single_Page_Checkout__registration_checkout__selected_payment_method',
                            sprintf( __( 'You have selected "%s" as your method of payment. Please note the important payment information below.', 'event_espresso' ), $payment_method->name() )
                        )
                    );
                }
			}
			return apply_filters(
				'FHEE__EE_SPCO_Reg_Step_Payment_Options___get_billing_form_for_payment_method__billing_form',
				$billing_form
			);
		}
		// no actual billing form, so return empty HTML form section
		return new EE_Form_Section_HTML();
	}



	/**
	 *    _get_selected_method_of_payment
	 *
	 * @access private
	 * @param boolean 	$required - whether to throw an error if the "selected_method_of_payment" is not found in the incoming request
	 * @param string 		$request_param
	 * @return NULL|string
	 */
	private function _get_selected_method_of_payment( $required = FALSE, $request_param = 'selected_method_of_payment' ) {
		// is selected_method_of_payment set in the request ?
		$selected_method_of_payment = EE_Registry::instance()->REQ->get( $request_param, FALSE );
		if ( $selected_method_of_payment ) {
			// sanitize it
			$selected_method_of_payment = is_array( $selected_method_of_payment ) ? array_shift( $selected_method_of_payment ) : $selected_method_of_payment;
			$selected_method_of_payment = sanitize_text_field( $selected_method_of_payment );
			// store it in the session so that it's available for all subsequent requests including AJAX
			$this->_save_selected_method_of_payment( $selected_method_of_payment );
		} else {
			// or is is set in the session ?
			$selected_method_of_payment = EE_Registry::instance()->SSN->get_session_data( 'selected_method_of_payment' );
		}
		// do ya really really gotta have it?
		if ( empty( $selected_method_of_payment ) && $required ) {
			EE_Error::add_error(
				sprintf(
					__( 'The selected method of payment could not be determined.%sPlease ensure that you have selected one before proceeding.%sIf you continue to experience difficulties, then refresh your browser and try again, or contact %s for assistance.', 'event_espresso' ),
					'<br/>',
					'<br/>',
					EE_Registry::instance()->CFG->organization->get_pretty( 'email' )
				),
				__FILE__, __FUNCTION__, __LINE__
			);
			return NULL;
		}
		return $selected_method_of_payment;
	}






	/********************************************************************************************************/
	/****************************************  PROCESS REG STEP  ****************************************/
	/********************************************************************************************************/






	/**
	 * process_reg_step
	 * @return boolean
	 */
	public function process_reg_step() {
		// how have they chosen to pay?
		$this->checkout->selected_method_of_payment = $this->_get_selected_method_of_payment( TRUE );
		// choose your own adventure based on method_of_payment
		switch(  $this->checkout->selected_method_of_payment ) {

			case 'events_sold_out' :
				$this->checkout->redirect = TRUE;
				$this->checkout->redirect_url = $this->checkout->cancel_page_url;
				$this->checkout->json_response->set_redirect_url( $this->checkout->redirect_url );
				// mark this reg step as completed
				$this->checkout->current_step->set_completed();
				return FALSE;
				break;

			case 'payments_closed' :
				if ( apply_filters( 'FHEE__EE_SPCO_Reg_Step_Payment_Options__process_reg_step__payments_closed__display_success', false ) ) {
					EE_Error::add_success( __( 'no payment required at this time.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
				}
				// mark this reg step as completed
				$this->checkout->current_step->set_completed();
				return TRUE;
				break;

			case 'no_payment_required' :
				if ( apply_filters( 'FHEE__EE_SPCO_Reg_Step_Payment_Options__process_reg_step__no_payment_required__display_success', false ) ) {
					EE_Error::add_success( __( 'no payment required.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
				}
				// mark this reg step as completed
				$this->checkout->current_step->set_completed();
				return TRUE;
				break;

			default:
				$payment_successful = $this->_process_payment();
				if ( $payment_successful ) {
					$this->checkout->continue_reg = true;
					$this->_maybe_set_completed( $this->checkout->payment_method );
				} else {
					$this->checkout->continue_reg = false;
				}
				return $payment_successful;

		}
	}



	/**
	 * _maybe_set_completed
	 *
	 * @access protected
	 * @param \EE_Payment_Method $payment_method
	 * @return void
	 */
	protected function _maybe_set_completed( EE_Payment_Method $payment_method ) {
		switch ( $payment_method->type_obj()->payment_occurs() ) {
			case EE_PMT_Base::offsite :
				break;
			case EE_PMT_Base::onsite :
			case EE_PMT_Base::offline :
				// mark this reg step as completed
			$this->checkout->current_step->set_completed();
				break;
		}
		return;
	}



	/**
	 *    update_reg_step
	 *    this is the final step after a user  revisits the site to retry a payment
	 *
	 * @return boolean
	 */
	public function update_reg_step() {
		$success = TRUE;
		// if payment required
		if ( $this->checkout->transaction->total() > 0 ) {
			do_action ('AHEE__EE_Single_Page_Checkout__process_finalize_registration__before_gateway', $this->checkout->transaction );
			// attempt payment via payment method
			$success = $this->process_reg_step();
		}
		if ( $success && ! $this->checkout->redirect ) {
			$this->checkout->cart->get_grand_total()->save_this_and_descendants_to_txn( $this->checkout->transaction->ID() );
			 // set return URL
			$this->checkout->redirect_url = add_query_arg( array( 'e_reg_url_link' => $this->checkout->reg_url_link ), $this->checkout->thank_you_page_url );
		}
		return $success;
	}






	/**
	 * 	_process_payment
	 *
	 * 	@access private
	 * 	@return 	bool
	 */
	private function _process_payment() {
		// clear any previous errors related to not selecting a payment method
//		EE_Error::overwrite_errors();
		// ya gotta make a choice man
		if ( empty( $this->checkout->selected_method_of_payment )) {
			$this->checkout->json_response->set_plz_select_method_of_payment( __( 'Please select a method of payment before proceeding.', 'event_espresso' ));
			return FALSE;
		}
		// get EE_Payment_Method object
		if ( ! $this->checkout->payment_method = $this->_get_payment_method_for_selected_method_of_payment() ) {
			return FALSE;
		}
		// setup billing form
		if ( $this->checkout->payment_method->is_on_site() ) {
			$this->checkout->billing_form = $this->_get_billing_form_for_payment_method( $this->checkout->payment_method );
			// bad billing form ?
			if ( ! $this->_billing_form_is_valid() ) {
				return FALSE;
			}
		}
		// ensure primary registrant has been fully processed
		if ( ! $this->_setup_primary_registrant_prior_to_payment() ) {
			return FALSE;
		}
		/** @type EE_Transaction_Processor $transaction_processor */
		//$transaction_processor = EE_Registry::instance()->load_class( 'Transaction_Processor' );
		// in case a registrant leaves to an Off-Site Gateway and never returns, we want to approve any registrations for events with a default reg status of Approved
		//$transaction_processor->toggle_registration_statuses_for_default_approved_events( $this->checkout->transaction, $this->checkout->reg_cache_where_params );
		// attempt payment
		$payment = $this->_attempt_payment( $this->checkout->payment_method );
		// process results
		$payment = $this->_validate_payment( $payment );
		$payment = $this->_post_payment_processing( $payment );
		// verify payment
		if ( $payment instanceof EE_Payment ) {
			// store that for later
			$this->checkout->payment = $payment;
			/** @type EE_Transaction_Processor $transaction_processor */
			$transaction_processor = EE_Registry::instance()->load_class( 'Transaction_Processor' );
			// we can also consider the TXN to not have been failed, so temporarily upgrade it's status to abandoned
			$transaction_processor->toggle_failed_transaction_status( $this->checkout->transaction );
			if ( $payment->status() == EEM_Payment::status_id_approved || $payment->status() == EEM_Payment::status_id_pending ) {
				return true;
			} else {
				return false;
			}
		} else if ( $payment === true ) {
			// please note that offline payment methods will NOT make a payment,
			// but instead just mark themselves as the PMD_ID on the transaction, and return true
			$this->checkout->payment = $payment;
			return true;
		}
		// where's my money?
		return false;
	}



	/**
	 * redirect_form
	 *
	 * @access public
	 * @return bool
	 */
	public function redirect_form() {
		$payment_method_billing_info = $this->_payment_method_billing_info( $this->_get_payment_method_for_selected_method_of_payment() );
		$html = $payment_method_billing_info->get_html_and_js();
		$html .= $this->checkout->redirect_form;
		EE_Registry::instance()->REQ->add_output( $html );
		return TRUE;
	}



	/**
	 * _billing_form_is_valid
	 *
	 * @access private
	 * @return bool
	 */
	private function _billing_form_is_valid() {
		if ( $this->checkout->billing_form instanceof EE_Billing_Info_Form ) {
			if ( $this->checkout->billing_form->was_submitted() ) {
				$this->checkout->billing_form->receive_form_submission();
				if ( $this->checkout->billing_form->is_valid() ) {
					return TRUE;
				}
				$validation_errors = $this->checkout->billing_form->get_validation_errors_accumulated();
				$error_strings = array();
				foreach( $validation_errors as $validation_error ){
					if( $validation_error instanceof EE_Validation_Error ){
						$form_section = $validation_error->get_form_section();
						if( $form_section instanceof EE_Form_Input_Base ){
							$label = $form_section->html_label_text();
						}elseif( $form_section instanceof EE_Form_Section_Base ){
							$label = $form_section->name();
						}else{
							$label = __( 'Validation Error', 'event_espresso' );
						}
						$error_strings[] = sprintf('%1$s: %2$s', $label, $validation_error->getMessage() );
					}
				}
				EE_Error::add_error( sprintf( __( 'One or more billing form inputs are invalid and require correction before proceeding. %1$s %2$s', 'event_espresso' ), '<br/>', implode( '<br/>', $error_strings )  ), __FILE__, __FUNCTION__, __LINE__ );
			} else {
				EE_Error::add_error( __( 'The billing form was not submitted or something prevented it\'s submission.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			}
		} else {
			EE_Error::add_error( __( 'The submitted billing form is invalid possibly due to a technical reason.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
		}
		return FALSE;
	}



	/**
	 * _setup_primary_registrant_prior_to_payment
	 * ensures that the primary registrant has a valid attendee object created with the critical details populated (first & last name & email)
	 * and that both the transaction object and primary registration object have been saved
	 * plz note that any other registrations will NOT be saved at this point (because they may not have any details yet)
	 *
	 * @access private
	 * @return bool
	 */
		private function _setup_primary_registrant_prior_to_payment() {
			// check if transaction has a primary registrant and that it has a related Attendee object
			if ( ! $this->checkout->transaction_has_primary_registrant() ) {
				// need to at least gather some primary registrant data before attempting payment
				if ( $this->checkout->billing_form instanceof EE_Billing_Attendee_Info_Form && ! $this->_capture_primary_registration_data_from_billing_form() ) {
					return FALSE;
				}
			}
			// because saving an object clears it's cache, we need to do the chevy shuffle
			// grab the primary_registration object
			$primary_registration = $this->checkout->transaction->primary_registration();
			/** @type EE_Transaction_Processor $transaction_processor */
			$transaction_processor = EE_Registry::instance()->load_class( 'Transaction_Processor' );
			// at this point we'll consider a TXN to not have been failed
			$transaction_processor->toggle_failed_transaction_status( $this->checkout->transaction );
			// save the TXN ( which clears cached copy of primary_registration)
			$this->checkout->transaction->save();
			// grab TXN ID and save it to the primary_registration
			$primary_registration->set_transaction_id( $this->checkout->transaction->ID() );
			// save what we have so far
			$primary_registration->save();
			return TRUE;
		}



	/**
	 * _capture_primary_registration_data_from_billing_form
	 *
	 * @access private
	 * @return bool
	 */
		private function _capture_primary_registration_data_from_billing_form() {
			// convert billing form data into an attendee
			$this->checkout->primary_attendee_obj = $this->checkout->billing_form->create_attendee_from_billing_form_data();
			if ( ! $this->checkout->primary_attendee_obj instanceof EE_Attendee ) {
				EE_Error::add_error(
					sprintf(
						__( 'The billing form details could not be used for attendee details due to a technical issue.%sPlease try again or contact %s for assistance.', 'event_espresso' ),
						'<br/>',
						EE_Registry::instance()->CFG->organization->get_pretty( 'email' )
					), __FILE__, __FUNCTION__, __LINE__
				);
				return FALSE;
			}
			$primary_registration = $this->checkout->transaction->primary_registration();
			if ( ! $primary_registration instanceof EE_Registration ) {
				EE_Error::add_error(
					sprintf(
						__( 'The primary registrant for this transaction could not be determined due to a technical issue.%sPlease try again or contact %s for assistance.', 'event_espresso' ),
						'<br/>',
						EE_Registry::instance()->CFG->organization->get_pretty( 'email' )
					), __FILE__, __FUNCTION__, __LINE__
				);
				return FALSE;
			}
			if ( ! $primary_registration->_add_relation_to( $this->checkout->primary_attendee_obj, 'Attendee' ) instanceof EE_Attendee ) {
				EE_Error::add_error(
					sprintf(
						__( 'The primary registrant could not be associated with this transaction due to a technical issue.%sPlease try again or contact %s for assistance.', 'event_espresso' ),
						'<br/>',
						EE_Registry::instance()->CFG->organization->get_pretty( 'email' )
					), __FILE__, __FUNCTION__, __LINE__
				);
				return FALSE;
			}
			/** @type EE_Registration_Processor $registration_processor */
			$registration_processor = EE_Registry::instance()->load_class( 'Registration_Processor' );
			// at this point, we should have enough details about the registrant to consider the registration NOT incomplete
			$registration_processor->toggle_incomplete_registration_status_to_default( $primary_registration );

			return TRUE;
		}



	/**
	 * _get_payment_method_for_selected_method_of_payment
	 * retrieves a valid payment method
	 *
	 * @access public
	 * @return \EE_Payment_Method
	 */
		private function _get_payment_method_for_selected_method_of_payment() {
			// get EE_Payment_Method object
			$payment_method = EE_Registry::instance()->LIB->EEM_Payment_Method->get_one_by_slug( $this->checkout->selected_method_of_payment );
			// verify $payment_method
			if ( ! $payment_method instanceof EE_Payment_Method ) {
				// not a payment
				EE_Error::add_error(
					sprintf(
						__( 'The selected method of payment could not be determined due to a technical issue.%sPlease try again or contact %s for assistance.', 'event_espresso' ),
						'<br/>',
						EE_Registry::instance()->CFG->organization->get_pretty( 'email' )
					), __FILE__, __FUNCTION__, __LINE__
				);
				return NULL;
			}
			// and verify it has a valid Payment_Method Type object
			if ( ! $payment_method->type_obj() instanceof EE_PMT_Base ) {
				// not a payment
				EE_Error::add_error(
					sprintf(
						__( 'A valid payment method could not be determined due to a technical issue.%sPlease try again or contact %s for assistance.', 'event_espresso' ),
						'<br/>',
						EE_Registry::instance()->CFG->organization->get_pretty( 'email' )
					), __FILE__, __FUNCTION__, __LINE__
				);
				return NULL;
			}
			return $payment_method;
		}





	/**
	 * 	_attempt_payment
	 *
	 * 	@access 	private
	 * 	@type 	EE_Payment_Method $payment_method
	 * 	@return 	mixed	EE_Payment | boolean
	 */
	private function _attempt_payment( EE_Payment_Method $payment_method ) {
		$payment =NULL;
		$this->checkout->transaction->save();
		$payment_processor = EE_Registry::instance()->load_core( 'Payment_Processor' );
		if ( ! $payment_processor instanceof EE_Payment_Processor ) {
			return FALSE;
		}
		try {
			$payment_processor->set_revisit( $this->checkout->revisit );
			// generate payment object
			$payment = $payment_processor->process_payment(
				$payment_method,
				$this->checkout->transaction,
				$this->checkout->amount_owing,
				$this->checkout->billing_form,
				$this->_get_return_url( $payment_method )
			);
		} catch( Exception $e ) {
			$this->_handle_payment_processor_exception( $e );
		}
		return $payment;
	}



	/**
	 * _handle_payment_processor_exception
	 *
	 * @access protected
	 * @param \Exception $e
	 * @return void
	 */
	protected function _handle_payment_processor_exception( Exception $e ) {
		EE_Error::add_error(
			sprintf(
				__( 'The payment could not br processed due to a technical issue.%1$sPlease try again or contact %2$s for assistance.||The following Exception was thrown in %4$s on line %5$s:%1$s%3$s', 'event_espresso' ),
				'<br/>',
				EE_Registry::instance()->CFG->organization->get_pretty( 'email' ),
				$e->getMessage(),
				$e->getFile(),
				$e->getLine()
			), __FILE__, __FUNCTION__, __LINE__
		);
	}



	/**
	 * _get_return_url
	 *
	 * @access protected
	 * @param \EE_Payment_Method $payment_method
	 * @return string
	 */
	protected function _get_return_url( EE_Payment_Method $payment_method ) {
		$return_url = '';
		switch ( $payment_method->type_obj()->payment_occurs() ) {

			case EE_PMT_Base::offsite :
				$return_url = add_query_arg(
					array(
						'action' => 'process_gateway_response',
						'selected_method_of_payment' => $this->checkout->selected_method_of_payment,
						'spco_txn' => $this->checkout->transaction->ID(),
					),
					$this->reg_step_url()
				);
				break;

			case EE_PMT_Base::onsite :
			case EE_PMT_Base::offline :
				$return_url = $this->checkout->next_step->reg_step_url();
				break;

		}
		return $return_url;
	}



	/**
	 * process_gateway_response
	 * this is the return point for Off-Site Payment Methods
	 * It will attempt to "handle the IPN" if it appears that this has not already occurred,
	 * otherwise, it will load up the last payment made for the TXN.
	 * If the payment retrieved looks good, it will then either:
	 *  	complete the current step and allow advancement to the next reg step
	 * 		or present the payment options again
	 *
	 * @access private
	 * @return EE_Payment | FALSE
	 */
	public function process_gateway_response() {
		$payment = null;
		// how have they chosen to pay?
		$this->checkout->selected_method_of_payment = $this->_get_selected_method_of_payment( true );
		// get EE_Payment_Method object
		if ( ! $this->checkout->payment_method = $this->_get_payment_method_for_selected_method_of_payment() ) {
			$this->checkout->continue_reg = false;
			return false;
		}
		if ( ! $this->checkout->payment_method->is_off_site() ) {
			return false;
		}
		$this->_validate_offsite_return();
		// DEBUG LOG
		//$this->checkout->log(
		//	__CLASS__, __FUNCTION__, __LINE__,
		//	array(
		//		'selected_method_of_payment' => $this->checkout->selected_method_of_payment,
		//		'payment_method' => $this->checkout->payment_method,
		//	),
		//	true
		//);
		// verify TXN
		if ( $this->checkout->transaction instanceof EE_Transaction ) {
			$gateway = $this->checkout->payment_method->type_obj()->get_gateway();
			if ( ! $gateway instanceof EE_Offsite_Gateway ) {
				$this->checkout->continue_reg = false;
				return false;
			}
			$payment = $this->_process_off_site_payment( $gateway );
			$payment = $this->_process_cancelled_payments( $payment );
			$payment = $this->_validate_payment( $payment );
			// if payment was not declined by the payment gateway or cancelled by the registrant
			if ( $this->_process_payment_status( $payment, EE_PMT_Base::offsite ) ) {
				//$this->_setup_redirect_for_next_step();
				// store that for later
				$this->checkout->payment = $payment;
				// mark this reg step as completed
				//$this->checkout->current_step->set_completed();
				return true;
			}
		}
		// DEBUG LOG
		//$this->checkout->log( __CLASS__, __FUNCTION__, __LINE__,
		//	array( 'payment' => $payment )
		//);
		$this->checkout->continue_reg = false;
		return false;
	}



	/**
	 * _validate_return
	 *
	 * @access private
	 * @return bool
	 */
	private function _validate_offsite_return() {
		$TXN_ID = (int)EE_Registry::instance()->REQ->get( 'spco_txn', 0 );
		if ( $TXN_ID != $this->checkout->transaction->ID() ) {
			// Houston... we might have a problem
			$invalid_TXN = false;
			// first gather some info
			$valid_TXN = EEM_Transaction::instance()->get_one_by_ID( $TXN_ID );
			$primary_registrant = $valid_TXN instanceof EE_Transaction ? $valid_TXN->primary_registration() : null;
			// let's start by retrieving the cart for this TXN
			$cart = EE_Cart::get_cart_from_txn( $this->checkout->transaction );
			if ( $cart instanceof EE_Cart ) {
				// verify that the current cart has tickets
				$tickets = $cart->get_tickets();
				if ( empty( $tickets ) ) {
					$invalid_TXN = true;
				}
			} else {
				$invalid_TXN = true;
			}
			$valid_TXN_SID = $primary_registrant instanceof EE_Registration ? $primary_registrant->session_ID() : null;
			// validate current Session ID and compare against valid TXN session ID
			if ( EE_Session::instance()->id() === null ) {
				$invalid_TXN = true;
			} else if ( EE_Session::instance()->id() === $valid_TXN_SID ) {
				// WARNING !!!
				// this could be PayPal sending back duplicate requests (ya they do that)
				// or it **could** mean someone is simply registering AGAIN after having just done so
				// so now we need to determine if this current TXN looks valid or not
				/** @type EE_Transaction_Processor $transaction_processor */
				$transaction_processor = EE_Registry::instance()->load_class( 'Transaction_Processor' );
				// has this step even been started ?
				if ( $transaction_processor->reg_step_completed( $this->checkout->transaction, $this->slug() === false )
				) {
					// really? you're half way through this reg step, but you never started it ?
					$invalid_TXN = true;
				}
			}
			if ( $invalid_TXN ) {
				// is the valid TXN completed ?
				if ( $valid_TXN instanceof EE_Transaction ) {
					/** @type EE_Transaction_Processor $transaction_processor */
					$transaction_processor = EE_Registry::instance()->load_class( 'Transaction_Processor' );
					// has this step even been started ?
					$reg_step_completed = $transaction_processor->reg_step_completed( $valid_TXN, $this->slug() );
					if ( $reg_step_completed !== false && $reg_step_completed !== true ) {
						// so it **looks** like this is a double request from PayPal
						// so let's try to pick up where we left off
						$this->checkout->transaction = $valid_TXN;
						$this->checkout->refresh_all_entities( true );
						return;
					}
				}
				// you appear to be lost?
				$this->_redirect_wayward_request( $primary_registrant );
			}
		}
	}



	/**
	 * _redirect_wayward_request
	 *
	 * @access private
	 * @param \EE_Registration $primary_registrant
	 * @return bool
	 */
	private function _redirect_wayward_request( EE_Registration $primary_registrant ) {
		if ( ! $primary_registrant instanceof EE_Registration ) {
			// try redirecting based on the current TXN
			$primary_registrant = $this->checkout->transaction instanceof EE_Transaction ? $this->checkout->transaction->primary_registration() : null;
			if ( ! $primary_registrant instanceof EE_Registration ) {
				EE_Error::add_error(
					sprintf(
						__( 'Invalid information was received from the Off-Site Payment Processor and your
						Transaction details could not be retrieved from the database.%1$sPlease try again or contact
						%2$s for assistance.', 'event_espresso' ),
						'<br/>',
						EE_Registry::instance()->CFG->organization->get_pretty( 'email' )
					),
					__FILE__, __FUNCTION__, __LINE__
				);
				return false;
			}
		}
		wp_safe_redirect(
			add_query_arg(
				array(
					'e_reg_url_link' => $primary_registrant->reg_url_link(),
				),
				$this->checkout->thank_you_page_url
			)
		);
		exit();
	}




	/**
	 * _process_off_site_payment
	 *
	 * @access private
	 * @param \EE_Offsite_Gateway $gateway
	 * @return \EE_Payment
	 */
	private function _process_off_site_payment( EE_Offsite_Gateway $gateway ) {
		try {
			// if gateway uses_separate_IPN_request, then we don't have to process the IPN manually
			if ( $gateway instanceof EE_Offsite_Gateway && $gateway->uses_separate_IPN_request() ) {
				$payment = $this->checkout->transaction->last_payment();
				//$payment_source = 'last_payment';
			} else {
				// get payment details and process results
				/** @type EE_Payment_Processor $payment_processor */
				$payment_processor = EE_Registry::instance()->load_core( 'Payment_Processor' );
				$payment = $payment_processor->process_ipn(
					$_REQUEST,
					$this->checkout->transaction,
					$this->checkout->payment_method,
					true,
					false
				);
				//$payment_source = 'process_ipn';
			}
		} catch ( Exception $e ) {
			// let's just eat the exception and try to move on using any previously set payment info
			$payment = $this->checkout->transaction->last_payment();
			//$payment_source = 'last_payment after Exception';
			// but if we STILL don't have a payment object
			if ( ! $payment instanceof EE_Payment ) {
				// then we'll object ! ( not object like a thing... but object like what a lawyer says ! )
				$this->_handle_payment_processor_exception( $e );
			}
		}
		// DEBUG LOG
		//$this->checkout->log( __CLASS__, __FUNCTION__, __LINE__,
		//	array(
		//		'process_ipn_payment' => $payment,
		//		'payment_source'      => $payment_source,
		//	)
		//);
		return $payment;
	}



	/**
	 * _process_cancelled_payments
	 * just makes sure that the payment status gets updated correctly
	 * so tha tan error isn't generated during payment validation
	 *
	 * @access private
	 * @param EE_Payment $payment
	 * @return EE_Payment | FALSE
	 */
	private function _process_cancelled_payments( $payment = NULL ) {
		if (
			isset( $_REQUEST[ 'ee_cancel_payment' ] )
			&& $payment instanceof EE_Payment
			&& $payment->status() == EEM_Payment::status_id_failed
		) {
			$payment->set_status( EEM_Payment::status_id_cancelled );
		}
		return $payment;
	}



	/**
	 * _validate_payment
	 *
	 * @access private
	 * @param EE_Payment $payment
	 * @return EE_Payment | FALSE
	 */
	private function _validate_payment( $payment = NULL ) {
		if (  $this->checkout->payment_method->is_off_line() ) {
			return TRUE;
		}
		// verify payment object
		if ( ! $payment instanceof EE_Payment ) {
			// not a payment
			EE_Error::add_error(
				sprintf(
					__( 'A valid payment was not generated due to a technical issue.%sPlease try again or contact %s for assistance.', 'event_espresso' ),
					'<br/>',
					EE_Registry::instance()->CFG->organization->get_pretty( 'email' )
				), __FILE__, __FUNCTION__, __LINE__
			);
			return FALSE;
		}
		return $payment;
	}



	/**
	 * _post_payment_processing
	 *
	 * @access private
	 * @param EE_Payment $payment
	 * @return bool
	 */
	private function _post_payment_processing( $payment = NULL ) {
		// On-Site payment?
		if ( $this->checkout->payment_method->is_on_site() ) {
			if ( ! $this->_process_payment_status( $payment, EE_PMT_Base::onsite )) {
				//$this->_setup_redirect_for_next_step();
				$this->checkout->continue_reg = false;
			}
			// Off-Site payment?
		} else if ( $this->checkout->payment_method->is_off_site() ) {
			// if a payment object was made and it specifies a redirect url, then we'll setup that redirect info
			if ( $payment instanceof EE_Payment && $payment->redirect_url() ){
				$this->checkout->redirect = TRUE;
				$this->checkout->redirect_form = $payment->redirect_form();
				$this->checkout->redirect_url = $this->reg_step_url( 'redirect_form' );
				// set JSON response
				$this->checkout->json_response->set_redirect_form( $this->checkout->redirect_form );
				// set cron job for finalizing the TXN
				// in case the user does not return from the off-site gateway
				EE_Cron_Tasks::schedule_finalize_abandoned_transactions_check(
					EE_Registry::instance()->SSN->expiration() + 1,
					$this->checkout->transaction->ID()
				);
			} else {
				// not a payment
				$this->checkout->continue_reg = false;
				EE_Error::add_error(
					sprintf(
						__( 'It appears the Off Site Payment Method was not configured properly.%sPlease try again or contact %s for assistance.', 'event_espresso' ),
						'<br/>',
						EE_Registry::instance()->CFG->organization->get_pretty( 'email' )
					), __FILE__, __FUNCTION__, __LINE__
				);
			}
			// Off-Line payment?
		} else if ( $payment === TRUE ) {
			//$this->_setup_redirect_for_next_step();
			return TRUE;
		} else {
			$this->checkout->continue_reg = false;
			return FALSE;
		}
		return $payment;
	}



	/**
	 * 	_setup_redirect_for_next_step
	 *
	 * 	@access private
	 * 	@return 	void
	 */
	//private function _setup_redirect_for_next_step() {
		//$this->checkout->redirect = TRUE;
		//$this->checkout->redirect_url = $this->checkout->next_step->reg_step_url();
		// set JSON response
		//$this->checkout->json_response->set_redirect_url( $this->checkout->redirect_url );
	//}



	/**
	 *    _process_payment_status
	 *
	 * @access private
	 * @type    EE_Payment $payment
	 * @param string $payment_occurs
	 * @return bool
	 * @throws \EE_Error
	 */
	private function _process_payment_status( $payment, $payment_occurs = EE_PMT_Base::offline ) {
		// off-line payment? carry on
		if ( $payment_occurs == EE_PMT_Base::offline ) {
			return true;
		}
		// verify payment validity
		if ( $payment instanceof EE_Payment ) {
			$msg = $payment->gateway_response();
			// check results
			switch ( $payment->status() ) {

				// good payment
				case EEM_Payment::status_id_approved :
					EE_Error::add_success( __( 'Your payment was processed successfully.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
					return TRUE;
					break;

				// slow payment
				case EEM_Payment::status_id_pending :
					if ( empty( $msg )) {
						$msg = __( 'Your payment appears to have been processed successfully, but the Instant Payment Notification has not yet been received. It should arrive shortly.', 'event_espresso' );
					}
					EE_Error::add_success( $msg, __FILE__, __FUNCTION__, __LINE__ );
					return TRUE;
					break;

				// don't wanna payment
				case EEM_Payment::status_id_cancelled :
					if ( empty( $msg )) {
						$msg = _n(
							'Payment cancelled. Please try again.',
							'Payment cancelled. Please try again or select another method of payment.',
							count( $this->checkout->available_payment_methods ),
							'event_espresso'
						);
					}
					EE_Error::add_attention( $msg, __FILE__, __FUNCTION__, __LINE__ );
					return FALSE;
					break;

				// not enough payment
				case EEM_Payment::status_id_declined :
					if ( empty( $msg )) {
						$msg = _n(
							'We\'re sorry but your payment was declined. Please try again.',
							'We\'re sorry but your payment was declined. Please try again or select another method of payment.',
							count( $this->checkout->available_payment_methods ),
							'event_espresso'
						);
					}
					EE_Error::add_attention( $msg, __FILE__, __FUNCTION__, __LINE__ );
					return FALSE;
					break;

				// bad payment
				case EEM_Payment::status_id_failed :
					if ( ! empty( $msg ) ) {
						EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
						return false;
					}
					// else default to error below
					break;

			}
		}
		// off-site payment gateway responses are too unreliable, so let's just assume that
		// the payment processing is just running slower than the registrant's request
		if ( $payment_occurs == EE_PMT_Base::offsite ) {
			return true;
		}
		EE_Error::add_error(
				sprintf(
					__( 'Your payment could not be processed successfully due to a technical issue.%sPlease try again or contact %s for assistance.', 'event_espresso' ),
					'<br/>',
					EE_Registry::instance()->CFG->organization->get_pretty( 'email' )
				),
				__FILE__, __FUNCTION__, __LINE__
			);
		return FALSE;
	}



	/**
	 *    get_transaction_details_for_gateways
	 *
	 * @access    public
	 * @return    int
	 */
	public function get_transaction_details_for_gateways() {
		$txn_details = array();
		// ya gotta make a choice man
		if ( empty( $this->checkout->selected_method_of_payment ) ) {
			$txn_details = array(
				'error' => __( 'Please select a method of payment before proceeding.', 'event_espresso' )
			);
		}
		// get EE_Payment_Method object
		if (
			empty( $txn_details ) &&
			! $this->checkout->payment_method = $this->_get_payment_method_for_selected_method_of_payment()
		) {
			$txn_details = array(
				'selected_method_of_payment' => $this->checkout->selected_method_of_payment,
				'error' => __( 'A valid Payment Method could not be determined.', 'event_espresso' )
			);
		}
		if ( empty( $txn_details ) && $this->checkout->transaction instanceof EE_Transaction ) {
			$return_url = $this->_get_return_url( $this->checkout->payment_method );
			$txn_details = array(
				'TXN_ID'        			=> $this->checkout->transaction->ID(),
				'TXN_timestamp' 	=> $this->checkout->transaction->datetime(),
				'TXN_total'     			=> $this->checkout->transaction->total(),
				'TXN_paid'      			=> $this->checkout->transaction->paid(),
				'TXN_reg_steps' 		=> $this->checkout->transaction->reg_steps(),
				'STS_ID'        			=> $this->checkout->transaction->status_ID(),
				'PMD_ID'        			=> $this->checkout->transaction->payment_method_ID(),
				'return_url' 				=> $return_url,
				'cancel_url' 				=> add_query_arg( array( 'ee_cancel_payment' => true ), $return_url ),
				'notify_url' 				=> EE_Config::instance()->core->txn_page_url(
					array(
						'e_reg_url_link'    			=> $this->checkout->transaction->primary_registration()->reg_url_link(),
						'ee_payment_method' 	=> $this->checkout->payment_method->slug()
					)
				)
			);
		}
		echo json_encode( $txn_details );
		exit();
	}

}
// End of file EE_SPCO_Reg_Step_Payment_Options.class.php
// Location: /EE_SPCO_Reg_Step_Payment_Options.class.php
