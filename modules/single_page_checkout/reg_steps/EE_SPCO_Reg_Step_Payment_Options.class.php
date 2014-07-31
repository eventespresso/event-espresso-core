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
	}



	public function translate_js_strings() {

	}

	public function enqueue_styles_and_scripts() {

	}



	/**
	 * @return boolean
	 */
	public function initialize_reg_step() {
		// don't need payment options for a completed or overpaid transaction
		// TODO: if /when we implement donations, then this will need overriding
		if ( $this->checkout->transaction->is_completed() || $this->checkout->transaction->is_overpaid() ) {
			unset( $this->checkout->reg_steps['payment_options'] );
		}
	}



	/**
	 * @return bool
	 */
	public function generate_reg_form() {
		EE_Registry::instance()->load_helper( 'HTML' );
		// set some defaults
		$this->checkout->selected_method_of_payment = 'payments_closed';
		$payment_required = FALSE;
		$sold_out_events = array();
		$events_requiring_pre_approval = array();
		$reg_count = 0;
		// loop thru registrations to gather info
		foreach ( $this->checkout->transaction->registrations() as $registration ) {
			$reg_count++;
			/** @var $registration EE_Registration */
			if ( $registration->event()->is_sold_out() || $registration->event()->is_sold_out( TRUE )) {
				// add event to list of events that are sold out
				$sold_out_events[] = $registration->event();
			}
			// these reg statuses require payment (if event is not free)
			$requires_payment = array(
				EEM_Registration::status_id_pending_payment,
				EEM_Registration::status_id_approved
			);
			$payment_required = in_array( $registration->status_ID(), $requires_payment ) && ! $registration->ticket()->is_free() ? TRUE : $payment_required;
			// event requires admin approval
			if ( $registration->status_ID() == EEM_Registration::status_id_not_approved ) {
				// add event to list of events with pre-approval reg status
				$events_requiring_pre_approval[] = $registration->event();
			}
		}
		// now decide which template to load
		if ( ! empty( $sold_out_events )) {
			$this->reg_form = $this->_sold_out_events( $sold_out_events );
		} else if ( ! empty( $events_requiring_pre_approval )) {
			$this->reg_form = $this->_events_requiring_pre_approval( $events_requiring_pre_approval );
		} else if ( $payment_required ) {
			$this->reg_form = $this->_display_payment_options( $reg_count );
		} else {
			$this->reg_form = $this->_no_payment_required();
		}

	}



	/**
	 * sold_out_events
	 * @param \EE_Event[] $sold_out_events_array
	 * @return \EE_Form_Section_Proper
	 */
	private function _sold_out_events( $sold_out_events_array = array() ) {

		echo '<br/><h5 style="color:#2EA2CC;">' . __CLASS__ . '<span style="font-weight:normal;color:#0074A2"> -> </span>' . __FUNCTION__ . '() <br/><span style="font-size:9px;font-weight:normal;color:#666">' . __FILE__ . '</span>    <b style="font-size:10px;color:#333">  ' . __LINE__ . ' </b></h5>';
		// set some defaults
		$this->checkout->selected_method_of_payment = 'events_sold_out';

		$sold_out_events = '';
		foreach ( $sold_out_events_array as $sold_out_event ) {
			$sold_out_events .= EEH_HTML::li( EEH_HTML::span( $sold_out_event->name(), '', 'dashicons dashicons-marker ee-icon-size-16 pink-text' ));
		}
		return new EE_Form_Section_Proper(
			array(
				'name' 					=> 'ee-' . $this->slug() . '-reg-step-form',
				'html_id' 					=> 'ee-' . $this->slug() . '-reg-step-form',
				'subsections' 			=> array(
					'hidden_inputs' 	=> $this->_default_hidden_inputs()
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
	 * events_requiring_pre_approval
	 * @param \EE_Event[] $events_requiring_pre_approval_array
	 * @return \EE_Form_Section_Proper
	 */
	private function _events_requiring_pre_approval( $events_requiring_pre_approval_array = array()) {

		echo '<br/><h5 style="color:#2EA2CC;">' . __CLASS__ . '<span style="font-weight:normal;color:#0074A2"> -> </span>' . __FUNCTION__ . '() <br/><span style="font-size:9px;font-weight:normal;color:#666">' . __FILE__ . '</span>    <b style="font-size:10px;color:#333">  ' . __LINE__ . ' </b></h5>';

		$events_requiring_pre_approval = '';
		foreach ( $events_requiring_pre_approval_array as $event_requiring_pre_approval ) {
			$events_requiring_pre_approval .= EEH_HTML::li( EEH_HTML::span( $event_requiring_pre_approval->name(), '', 'dashicons dashicons-marker ee-icon-size-16 orange-text' ));
		}
		return new EE_Form_Section_Proper(
			array(
				'name' 					=> 'ee-' . $this->slug() . '-reg-step-form',
				'html_id' 					=> 'ee-' . $this->slug() . '-reg-step-form',
				'subsections' 			=> array(
					'hidden_inputs' 	=> $this->_default_hidden_inputs()
				),
				'layout_strategy'		=> new EE_Template_Layout(
					array(
						'layout_template_file' 	=> SPCO_TEMPLATES_PATH . $this->slug() . DS . 'events_requiring_pre_approval.template.php', // layout_template
						'template_args'  				=> apply_filters(
							'FHEE__EE_SPCO_Reg_Step_Payment_Options___sold_out_events__template_args',
							array(
								'events_requiring_pre_approval' 			=> $events_requiring_pre_approval,
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
	 * @return \EE_Form_Section_Proper
	 */
	private function _no_payment_required() {

		echo '<br/><h5 style="color:#2EA2CC;">' . __CLASS__ . '<span style="font-weight:normal;color:#0074A2"> -> </span>' . __FUNCTION__ . '() <br/><span style="font-size:9px;font-weight:normal;color:#666">' . __FILE__ . '</span>    <b style="font-size:10px;color:#333">  ' . __LINE__ . ' </b></h5>';
		// set some defaults
		$this->checkout->selected_method_of_payment = 'no_payment_required';

		return new EE_Form_Section_Proper(
			array(
				'name' 					=> 'ee-' . $this->slug() . '-reg-step-form',
				'html_id' 					=> 'ee-' . $this->slug() . '-reg-step-form',
				'subsections' 			=> array(
					'hidden_inputs' 	=> $this->_default_hidden_inputs()
				),
				'layout_strategy' 	=> new EE_Template_Layout(
					array(
						'layout_template_file' 	=> SPCO_TEMPLATES_PATH . $this->slug() . DS . 'no_payment_required.template.php', // layout_template
						'template_args'  				=> apply_filters(
							'FHEE__EE_SPCO_Reg_Step_Payment_Options___no_payment_required__template_args',
							array(
								'revisit' 			=> $this->checkout->revisit,
								'registrations' =>array(),
								'ticket_count' 	=>array(),
								'no_payment_required_msg' => EEH_HTML::p( __( 'This is a free event, so no billing will occur.', 'event_espresso' ))
							)
						),
					)
				),
			)
		);
	}



	/**
	 * _default_hidden_inputs
	 * @param bool $no_payment_required
	 * @return \EE_Form_Section_Proper
	 */
	private function _default_hidden_inputs( $no_payment_required = TRUE ) {

		//	<input id="reg-page-selected-method-of-payment" type="hidden" value="payments_closed" name="selected_method_of_payment">
		//	<input type="hidden" id="reg-page-no-payment-required-payment_options" name="_reg-page-no-payment-required" value="1" />

		return new EE_Form_Section_Proper(
			array(
				'html_id' 				=> 'ee-' . $this->slug() . '-hidden-inputs',
				'layout_strategy'	=> new EE_Div_Per_Section_Layout(),
				'subsections' 		=> array(
					'selected_method_of_payment' => new EE_Hidden_Input(
						array(
							'normalization_strategy' 	=> NULL,
							'layout_strategy' 				=> new EE_Div_Per_Section_Layout(),
							'html_name' 						=> 'selected_method_of_payment',
							'html_id' 								=> 'reg-page-selected-method-of-payment',
							'default'								=> $this->checkout->selected_method_of_payment
						)
					),
					'spco_no_payment_required' => new EE_Hidden_Input(
						array(
							'normalization_strategy' 	=> new EE_Boolean_Normalization(),
							'layout_strategy' 				=> new EE_Div_Per_Section_Layout(),
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
	 * _display_payment_options
	 * @param int $reg_count
	 * @return \EE_Form_Section_Proper
	 */
	private function _display_payment_options( $reg_count = 0 ) {
		// reset in case someone changes their mind
		$this->_reset_selected_method_of_payment();
		// has method_of_payment been set by no-js user?
		$this->checkout->selected_method_of_payment = $this->_get_selected_method_of_payment();
		// autoload Line_Item_Display classes
		EEH_Autoloader::register_line_item_display_autoloaders();
		$Line_Item_Display = new EE_Line_Item_Display( 'spco' );
		// build payment options form
		return new EE_Form_Section_Proper(
			array(
				'name' 			=> 'ee-' . $this->slug() . '-reg-step-form',
				'html_id' 			=> 'ee-' . $this->slug() . '-reg-step-form',
				'subsections' 	=> array(
					'payment_options' => $this->_setup_payment_options(),
					'hidden_inputs' 		=> $this->_default_hidden_inputs( FALSE )
				),
				'layout_strategy'		=> new EE_Template_Layout( array(
							'layout_template_file' 	=> SPCO_TEMPLATES_PATH . $this->slug() . DS . 'payment_options_main.template.php', // layout_template
							'template_args'  				=> apply_filters(
								'FHEE__EE_SPCO_Reg_Step_Payment_Options___payment_options__template_args',
								array(
									'reg_count' 					=> $reg_count,
									'transaction_details' 	=> $Line_Item_Display->display_line_item( $this->checkout->cart->get_grand_total() ),
									'available_payment_methods' => array()
								)
							),
						)
					),
			)
		);
	}



	/**
	 * 	_reset_selected_method_of_payment
	 *
	 * 	@access 		private
	 * 	@return 		void
	 */
	private function _reset_selected_method_of_payment() {
		$reset_payment_method = sanitize_text_field( EE_Registry::instance()->REQ->get( 'reset_payment_method', FALSE ));
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
	 * 	@return 		EE_Billing_Info_Form
	 */
	private function _save_selected_method_of_payment() {
		EE_Registry::instance()->SSN->set_session_data( array( 'selected_method_of_payment' => $this->checkout->selected_method_of_payment ));
	}



	/**
	 * _setup_payment_options
	 * @return \EE_Form_Section_Proper
	 */
	public function _setup_payment_options() {
		$payment_methods = EE_Registry::instance()->load_model( 'Payment_Method' )->get_all_for_transaction( $this->checkout->transaction, EEM_Payment_Method::scope_cart );
		$payment_method_header = count( $payment_methods ) > 1
			? apply_filters( 'FHEE__registration_page_payment_options__method_of_payment_hdr', __( 'Available Methods of Payment', 'event_espresso' ))
			: apply_filters( 'FHEE__registration_page_payment_options__method_of_payment_hdr', __( 'Method of Payment', 'event_espresso' ));
		$available_payment_methods = array(
			// display the "Payment Method" header
			'payment_method_header' => new EE_Form_Section_HTML(
				EEH_HTML::h4 ( $payment_method_header, 'method-of-payment-hdr' )
			)
		);
		$available_payment_method_options = array();
		$payment_methods_billing_info = array();

		foreach( $payment_methods as $payment_method ) {
			if ( $payment_method instanceof EE_Payment_Method ) {
				// check if any payment methods are set as default
				// if payment method is already selected OR nothing is selected and this payment method should be open_by_default
				if (( $this->checkout->selected_method_of_payment == $payment_method->slug() ) || ( ! $this->checkout->selected_method_of_payment && $payment_method->open_by_default() )) {
					$this->checkout->selected_method_of_payment = $payment_method->slug();
					$this->_save_selected_method_of_payment();
				}
				$info_html = EEH_HTML::img( $payment_method->button_url(), $payment_method->name(), 'spco-payment-method-' . $payment_method->slug() . '-btn-img', 'spco-payment-method-btn-img' );
				$info_html .= EEH_HTML::div ( '<br />', '', '', 'clear:both;' );
				$available_payment_method_options[ $payment_method->slug() ] =  $info_html;
				$payment_methods_billing_info[ $payment_method->slug() . '-info' ] = $this->_payment_method_billing_info( $payment_method );
			}
		}
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
					'' => new EE_Radio_Button_Input(
						$available_payment_method_options,
						array(
							'layout_strategy' => new EE_Div_Per_Section_Layout(),
							'html_name' 		=> 'selected_method_of_payment',
							'html_class' 		=> 'spco-payment-method',
							'default'				=> array( $this->checkout->selected_method_of_payment )
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
		// setup billing form
		if ( $this->checkout->selected_method_of_payment == $payment_method->slug() ) {
			$this->checkout->billing_form = $this->_get_billing_form_for_payment_method( $payment_method );
			$billing_form = $this->checkout->billing_form;
			$pm_style = '';
		} else {
			$billing_form = new EE_Form_Section_HTML();
			$pm_style = 'display:none;';
		}
		$info_html = '';
		//		$info_html = EEH_HTML::img( $payment_method->button_url(), $payment_method->name(), 'spco-payment-method-info-' . $payment_method->slug() . '-img', 'spco-payment-method-img' );
		$info_html .= EEH_HTML::h3 ( 'Important information regarding your payment', '', 'spco-payment-method-hdr' );
		$info_html .= EEH_HTML::div ( ' ', '', '', 'clear:both;' );
		$info_html .= $payment_method->description() ? EEH_HTML::p ( $payment_method->description(), '', 'spco-payment-method-desc ee-attention' ) : '';

		//d( $payment_method );
		return new EE_Form_Section_Proper(
			array(
				'html_id' 					=> 'spco-payment-method-info-' . $payment_method->slug(),
				'html_class' 			=> 'spco-payment-method-info-dv',
				'html_style' 			=> $pm_style,
				'layout_strategy'		=> new EE_Div_Per_Section_Layout(),
				'subsections' 			=> array(
					'info' 					=> new EE_Form_Section_HTML( $info_html ),
					'billing_form' 		=> $billing_form,
				)
			)
		);
	}



	/**
	 * _get_billing_form_for_payment_method
	 *
	 * @access private
	 * @param EE_Payment_Method $payment_method
	 * @return \EE_Billing_Info_Form
	 */
	private function _get_billing_form_for_payment_method( EE_Payment_Method $payment_method ) {
		if ( EE_Registry::instance()->REQ->is_set( 'payment_method' )) {
			EE_Error::add_success(
				apply_filters(
					'FHEE__Single_Page_Checkout__registration_checkout__selected_payment_method',
					sprintf( __( 'You have selected "%s" as your method of payment', 'event_espresso' ), $payment_method->name() )
				)
			);
		}
		// if it exists, get billing form for the selected payment method
		if( $payment_method->type_obj()->billing_form() instanceof EE_Billing_Info_Form ) {
			if ( $this->_transaction_has_primary_registrant() ) {
				$payment_method->type_obj()->billing_form()->populate_from_attendee( $this->checkout->transaction->primary_registration()->attendee() );
			}
			return $payment_method->type_obj()->billing_form();
		}
		// no actual billing form, so return empty HTML form section
		return new EE_Form_Section_HTML();
	}



	/**
	 * 	_transaction_has_primary_registration
	 *
	 * 	@access 		private
	 * 	@return 		bool
	 */
	private function _transaction_has_primary_registrant() {
		return $this->checkout->transaction->primary_registration() instanceof EE_Registration && $this->checkout->transaction->primary_registration()->attendee() instanceof EE_Attendee ? TRUE : FALSE;
	}



	/**
	 * 	_get_selected_method_of_payment
	 *
	 * 	@access 		private
	 * 	@param 		boolean 	$required - whether to throw an error if the "selected_method_of_payment" is not found in the incoming request
	 * 	@return 		string | NULL
	 */
	private function _get_selected_method_of_payment( $required = FALSE ) {
		// is selected_method_of_payment set in the request ?
		if ( EE_Registry::instance()->REQ->is_set( 'selected_method_of_payment' )) {
			// grab it and sanitize it
			$selected_method_of_payment = EE_Registry::instance()->REQ->get( 'selected_method_of_payment' );
			$selected_method_of_payment = is_array( $selected_method_of_payment ) ? array_shift( $selected_method_of_payment ) : $selected_method_of_payment;
			$selected_method_of_payment = sanitize_text_field( $selected_method_of_payment );
			// store it in the session so that it's available for all subsequent requests including AJAX
			$this->_save_selected_method_of_payment();
		} else {
			// or is is set in the session ?
			$selected_method_of_payment = EE_Registry::instance()->SSN->get_session_data( 'selected_method_of_payment' );
		}
		// do ya really really gotsta have it?
		if ( empty( $this->checkout->selected_method_of_payment ) && $required ) {
			EE_Error::add_error(
				sprintf(
					__( 'The selected method of payment could not be determined.%sPlease ensure that you have selected one before proceeding.%sIf you continue to experience difficulties, then refresh your browser and try again, or contact %s for assistance.', 'event_espresso' ),
					'<br/>',
					'<br/>',
					EE_Registry::instance()->CFG->organization->email
				),
				__FILE__, __FUNCTION__, __LINE__
			);
			return NULL;
		}
		return $selected_method_of_payment;
	}



	/**
	 * @return boolean
	 */
	public function process_reg_step() {
		// how have they chosen to pay?
		$this->checkout->selected_method_of_payment = $this->_get_selected_method_of_payment( TRUE );
		switch(  $this->checkout->selected_method_of_payment ) {

			case 'events_sold_out' :
				EE_Error::add_attention( __( 'can not register for sold out events.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
				return FALSE;
				break;

			case 'payments_closed' :
				EE_Error::add_success( __( 'no payment required at this time.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
				return TRUE;
				break;

			case 'no_payment_required' :
				EE_Error::add_success( __( 'no payment required.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
				return TRUE;
				break;

			default:
				return $this->_process_payment();
//				$result = $this->_process_payment();
//				echo '<br/><h5 style="color:#2EA2CC;">' . __CLASS__ . '<span style="font-weight:normal;color:#0074A2"> -> </span>' . __FUNCTION__ . '() <br/><span style="font-size:9px;font-weight:normal;color:#666">' . __FILE__ . '</span>    <b style="font-size:10px;color:#333">  ' . __LINE__ . ' </b></h5>';
//				die();
//				return $result;

		}
	}



	/**
	 *    update_reg_step
	 *    this is the final step after a user  revisits the site to retry a payment
	 *
	 * @return boolean
	 */
	public function update_reg_step() {
		if ( ! $this->_billing_form_is_valid() ) {
			return FALSE;
		}
		$this->checkout->transaction->save();
		$this->checkout->cart->get_grand_total()->save_this_and_descendants_to_txn( $this->checkout->transaction->ID() );
		do_action ('AHEE__EE_Single_Page_Checkout__process_finalize_registration__before_gateway', $this->checkout->transaction );
		// set return URL
		$this->checkout->redirect_url = add_query_arg( array( 'e_reg_url_link' => $this->checkout->reg_url_link ), $this->checkout->thank_you_page_url );
		// if payment required
		if ( $this->checkout->transaction->total() > 0 ) {
			// attempt payment via payment method
			return $this->_process_payment();
		}
		return TRUE;
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
			$this->checkout->json_response['return_data'] = array( 'plz-select-method-of-payment' => FALSE );
			return FALSE;
		}
		echo '<h5 style="color:#2EA2CC;">$this->checkout->selected_method_of_payment : <span style="color:#E76700">' . $this->checkout->selected_method_of_payment . '</span><br/><span style="font-size:9px;font-weight:normal;color:#666">' . __FILE__ . '</span>    <b style="font-size:10px;color:#333">  ' . __LINE__ . ' </b></h5>';
		// get EE_Payment_Method object
		if ( ! $this->checkout->payment_method = $this->_get_payment_method_for_selected_method_of_payment( $this->checkout->selected_method_of_payment ) ) {
			return FALSE;
		}
		// bad billing form ?
		if ( ! $this->_billing_form_is_valid() && $this->checkout->payment_method->is_on_site() ) {
			return FALSE;
		}
		// ensure primary registrant has been fully processed
		if ( ! $this->_finalize_primary_registrant_prior_to_payment() ) {
			return FALSE;
		}
		// attempt payment
		$payment = $this->_attempt_payment( $this->checkout->payment_method );
		// onsite payment?
		if ( $this->checkout->payment_method->is_on_site() ) {
			$this->_onsite_payment_success( $payment );
		} else if ( $this->checkout->payment_method->is_off_site() ) {
			// if a payment object was made and it specifies a redirect url, then we'll setup that redirect info
			if ( $payment->redirect_url() ){
				$this->checkout->redirect = TRUE;
				$this->checkout->redirect_form = $payment->redirect_form();
				$this->checkout->redirect_url = add_query_arg(  array( 'ee' => '_register', 'step' => $this->slug(), 'action' => 'redirect_form' ), $this->checkout->reg_page_base_url );
				// setup URL for redirect
				$this->checkout->json_response['return_data'] = array( 'off-site-redirect' => $this->checkout->redirect_form );
//				d( $payment );
//				d( $this->checkout );
//				die();
			}

		}

		// please note that offline payment methods will NOT make a payment,
		// but instead just mark themselves as the PMD_ID on the transaction
		// so for either on-site / off-site payments OR off-line payment methods
		return $payment instanceof EE_Payment || $this->checkout->payment_method->is_off_line() ? TRUE : FALSE;

	}



	/**
	 * redirect_form
	 *
	 * @access public
	 * @return string
	 */
	public function redirect_form() {
		echo $this->checkout->redirect_form;
		exit();
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
				EE_Error::add_error( __( 'One or more billing form inputs are invalid and require correction before proceeding.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			}
		}
		return FALSE;
	}



	/**
	 * _finalize_primary_registrant_prior_to_payment
	 * ensures that the primary registrant has a valid attendee object created with the critical details populated (first & last name & email)
	 * and that both the transaction object and primary registration object have been saved
	 * plz note that any other registrations will NOT be saved at this point (because they may not have any details yet)
	 *
	 * @access private
	 * @return bool
	 */
		private function _finalize_primary_registrant_prior_to_payment() {
			// check if transaction has a primary registrant and that it has a related Attendee object
			if ( ! $this->_transaction_has_primary_registrant() ) {
				// need to at least gather some primary registrant data before attempting payment
				if ( ! $this->_capture_primary_registration_data_from_billing_form() ) {
					return FALSE;
				}
			}
			// because saving an object clears it's cache, we need to do the chevy shuffle
			// grab the primary_registration object
			$primary_registration = $this->checkout->transaction->primary_registration();
			// save the TXN ( which clears cached copy of primary_registration)
			$this->checkout->transaction->save();
			// grab TXN ID and save it to the primary_registration
			$primary_registration->set_transaction_id( $this->checkout->transaction->ID() );
			// save what we have so far
			$primary_registration->save();
			// ensure primary registration been finalized
			$primary_registration->finalize();
			return TRUE;
		}



	/**
	 * _capture_primary_registration_data_from_billing_form
	 *
	 * @access private
	 * @return bool
	 */
		private function _capture_primary_registration_data_from_billing_form() {
			$primary_attendee = $this->checkout->billing_form->create_attendee_from_billing_form_data();
			if ( ! $primary_attendee instanceof EE_Attendee ) {
				EE_Error::add_error(
					sprintf(
						__( 'The billing form details could not be used for attendee details due to a technical issue.%sPlease try again or contact %s for assistance.', 'event_espresso' ),
						'<br/>',
						EE_Registry::instance()->CFG->organization->email
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
						EE_Registry::instance()->CFG->organization->email
					), __FILE__, __FUNCTION__, __LINE__
				);
				return FALSE;
			}
			if ( ! $primary_registration->_add_relation_to( $primary_attendee, 'Attendee' ) instanceof EE_Attendee ) {
				EE_Error::add_error(
					sprintf(
						__( 'The primary registrant could not be associated with this transaction due to a technical issue.%sPlease try again or contact %s for assistance.', 'event_espresso' ),
						'<br/>',
						EE_Registry::instance()->CFG->organization->email
					), __FILE__, __FUNCTION__, __LINE__
				);
				return FALSE;
			}
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
			$payment_method = EE_Registry::instance()->load_model( 'Payment_Method' )->get_one_by_slug( $this->checkout->selected_method_of_payment );
			// verify $payment_method
			if ( ! $payment_method instanceof EE_Payment_Method ) {
				// not a payment
				EE_Error::add_error(
					sprintf(
						__( 'The selected method of payment could not be determined due to a technical issue.%sPlease try again or contact %s for assistance.', 'event_espresso' ),
						'<br/>',
						EE_Registry::instance()->CFG->organization->email
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
						EE_Registry::instance()->CFG->organization->email
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
	 * 	@return 	mixed	object | boolean
	 */
	private function _attempt_payment( EE_Payment_Method $payment_method ) {
		$this->checkout->transaction->save();
		$payment_processor = EE_Registry::instance()->load_core( 'Payment_Processor' );
		if ( ! $payment_processor instanceof EE_Payment_Processor ) {
			return FALSE;
		}
		// generate payment object
		$payment = $payment_processor->process_payment(
			$payment_method,
			$this->checkout->transaction,
			EE_Registry::instance()->SSN->get_session_data( 'payment_amount' ),
			$this->checkout->billing_form,
			$this->checkout->next_step->reg_step_url()
		);
		if ( $this->checkout->payment_method->is_off_line() ) {
			return TRUE;
		}
		// verify payment object
		if ( ! $payment instanceof EE_Payment ) {
			// not a payment
			EE_Error::add_error(
				sprintf(
					__( 'A valid payment was not generated due to a technical issue.%sPlease try again or contact %s for assistance.', 'event_espresso' ),
					'<br/>',
					EE_Registry::instance()->CFG->organization->email
				), __FILE__, __FUNCTION__, __LINE__
			);
			return FALSE;
		}
		return $payment;
	}






	/**
	 * 	_onsite_payment_success
	 *
	 * 	@access private
	 * 	@type 	EE_Payment $payment
	 * 	@return 	boolean
	 */
	private function _onsite_payment_success( $payment ) {
		// check results
		switch ( $payment->status() ) {

			// good payment
			case EEM_Payment::status_id_approved :
				EE_Error::add_success( __( 'Your payment was processed successfully.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
				return TRUE;
				break;

			// slow payment
			case EEM_Payment::status_id_pending :
				EE_Error::add_success( __( 'Your payment appears to have been processed successfully, but the Instant Payment Notification has not yet been received. It should arrive shortly.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
				return TRUE;
				break;

			// don't wanna payment
			case EEM_Payment::status_id_cancelled :
				EE_Error::add_attention( __( 'Your payment was cancelled, do you wish to try again?', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
				break;

			// bad payment
			case EEM_Payment::status_id_declined :
				EE_Error::add_attention( __( 'We\'re sorry but your payment was declined, do you wish to try again?', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
				break;

			// brokked payment
			case EEM_Payment::status_id_failed :
				EE_Error::add_error(
					sprintf(
						__( 'Your payment could not be processed successfully due to a technical issue.%sPlease try again or contact %s for assistance.', 'event_espresso' ),
						'<br/>',
						EE_Registry::instance()->CFG->organization->email
					),
					__FILE__, __FUNCTION__, __LINE__
				);
				break;

		}
		return FALSE;
	}




}
// End of file EE_SPCO_Reg_Step_Payment_Options.class.php
// Location: /EE_SPCO_Reg_Step_Payment_Options.class.php