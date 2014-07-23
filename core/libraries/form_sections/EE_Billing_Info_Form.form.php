<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

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
 * @ version		 	4.3
 *
 * ------------------------------------------------------------------------
 *
 * EE_Billing_Info_Form
 * Default form which can be used by payment method types for their billing info
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Billing_Info_Form extends EE_Form_Section_Proper{
	/**
	 * The payment method this billing form is for
	 * @var EE_Payment_Method
	 */
	protected $_pm_instance;



	/**
	 *
	 * @param array $payment_method
	 * @param array $options_array @see EE_Form_Section_Proper::__construct()
	 */
	public function __construct($payment_method, $options_array= array()){
		$this->_pm_instance = $payment_method;
		$country_options = array();
		$states_organized = array();
		// get possibly cached list of countries
		$countries = EEM_Country::instance()->get_all_active_countries();
		if ( ! empty( $countries )) {
			foreach($countries as $country){
				$country_options[$country->ID()] = $country->name();
			}
		}
		// get possibly cached list of states
		$states = EEM_State::instance()->get_all_active_states();
		if ( ! empty( $states )) {
			foreach($states as $state){
				$states_organized[$state->country()->name()][$state->name()] = $state->name();
			}
		}
		$options_array['subsections'] = array_merge(
			array(
				'first_name' 	=> new EE_Text_Input( array( 'required'=>TRUE, 'html_class' => 'ee-billing-qstn' )),
				'last_name'		=> new EE_Text_Input( array( 'required'=>TRUE, 'html_class' => 'ee-billing-qstn' )),
				'email'				=> new EE_Email_Input( array( 'required'=>TRUE, 'html_class' => 'ee-billing-qstn' )),
				'address'			=> new EE_Text_Input( array( 'html_label_text'=>  __( 'Address', 'event_espresso'), 'required'=>TRUE, 'html_class' => 'ee-billing-qstn' )),
				'address2'		=> new EE_Text_Input( array( 'html_label_text'=> __( 'Address 2', 'event_espresso'), 'html_class' => 'ee-billing-qstn' )),
				'city'					=> new EE_Text_Input( array( 'required'=>TRUE, 'html_class' => 'ee-billing-qstn' )),
				'state' 				=> new EE_Select_Input( $states_organized, array( 'required'=>TRUE, 'html_class' => 'ee-billing-qstn' )),
				'country' 			=> new EE_Select_Input( $country_options, array( 'required'=>TRUE, 'html_class' => 'ee-billing-qstn' )),
				'zip'					=> new EE_Text_Input( array( 'required'=>TRUE, 'html_class' => 'ee-billing-qstn' )),
				'phone'			=> new EE_Text_Input( array( 'html_class' => 'ee-billing-qstn' )),
			),
			isset( $options_array['subsections'] ) ? $options_array['subsections'] : array()
		);

		$this->_layout_strategy = new EE_Div_Per_Section_Layout();
		parent::__construct( $options_array );

	}



	/**
	 * Sets the defaults for the billing form according to the attendee's details
	 * @param int | \EE_Attendee $attendee
	 */
	public function populate_from_attendee( $attendee ){
		$attendee = EEM_Attendee::instance()->ensure_is_obj($attendee);
		$state = $attendee->state_obj();
		$country = $attendee->country_obj();
		$this->populate_defaults(array(
			'first_name'=>$attendee->fname(),
			'last_name'=>$attendee->lname(),
			'email'=>$attendee->email(),
			'address'=>$attendee->address(),
			'address2'=>$attendee->address2(),
			'city'=>$attendee->city(),
			'state'=> $state ? $attendee->state_obj()->name() : '',
			'country'=> $country ? $attendee->country_obj()->name() : '',
			'zip'=>$attendee->zip(),
			'phone'=>$attendee->phone(),
		));
	}



	/**
	 * copy_billing_form_data_to_attendee
	 * copies info from the billing form to the attendee's details
	 * @param \EE_Attendee $attendee - the attendee object to copy details to
	 * @return \EE_Attendee
	 */
	public function copy_billing_form_data_to_attendee( EE_Attendee $attendee ){
		// grab billing form data
		$data = $this->valid_data();
		// copy first_name
		if ( ! empty( $data['first_name'] )) {
			$attendee->set_fname( $data['first_name'] );
		}
		// copy last_name
		if ( ! empty( $data['last_name'] )) {
			$attendee->set_lname( $data['last_name'] );
		}
		// copy email
		if ( ! empty( $data['email'] )) {
			$attendee->set_email( $data['email'] );
		}
		// copy address
		if ( ! empty( $data['address'] )) {
			$attendee->set_address( $data['address'] );
		}
		// copy address2
		if ( ! empty( $data['address2'] )) {
			$attendee->set_address2( $data['address2'] );
		}
		// copy city
		if ( ! empty( $data['city'] )) {
			$attendee->set_city( $data['city'] );
		}
		// copy state
		if ( ! empty( $data['state'] )) {
			$attendee->set_state( $data['state'] );
		}
		// copy country
		if ( ! empty( $data['country'] )) {
			$attendee->set_country( $data['country'] );
		}
		// copy zip
		if ( ! empty( $data['zip'] )) {
			$attendee->set_zip( $data['zip'] );
		}
		// copy phone
		if ( ! empty( $data['phone'] )) {
			$attendee->set_phone( $data['phone'] );
		}
		return $attendee;
	}


	/**
	 * create_attendee_from_billing_form_data
	 * uses info from the billing form to create a new attendee
	 * @return \EE_Attendee
	 */
	public function create_attendee_from_billing_form_data(){
		// grab billing form data
		$data = $this->valid_data();
		return EE_Attendee::new_instance( array(
			'ATT_fname' 		=> ! empty( $data['first_name'] ) ? $data['first_name'] : '',
			'ATT_lname' 		=> ! empty( $data['last_name'] ) ? $data['last_name'] : '',
			'ATT_email' 		=> ! empty( $data['email'] ) ? $data['email'] : '',
			'ATT_address' 		=> ! empty( $data['address'] ) ? $data['address'] : '',
			'ATT_address2' 	=> ! empty( $data['address2'] ) ? $data['address2'] : '',
			'ATT_city' 			=> ! empty( $data['city'] ) ? $data['city'] : '',
			'STA_ID' 				=> ! empty( $data['state'] ) ? $data['state'] : '',
			'CNT_ISO' 			=> ! empty( $data['country'] ) ? $data['country'] : '',
			'ATT_zip' 				=> ! empty( $data['zip'] ) ? $data['zip'] : '',
			'ATT_phone' 		=> ! empty( $data['phone'] ) ? $data['phone'] : '',
		));
	}



	/**
	 * Sets the payment method for this billing form
	 * @param EE_Payment_Method $payment_method
	 * @return void
	 */
	public function set_payment_method( EE_Payment_Method $payment_method ){
		$this->_pm_instance = $payment_method;
	}



	/**
	 * Returns the instance of the payment method this billing form is for
	 * @return EE_Payment_Method
	 */
	public function payment_method(){
		return $this->_pm_instance;
	}


	/**
	 * payment_fields_autofilled_notice_html
	 * @return string
	 */
	public function payment_fields_autofilled_notice_html(){
		EE_Registry::instance()->load_helper( 'HTML' );
		return  new EE_Form_Section_HTML(
			EEH_HTML::p(
				apply_filters( 'FHEE__EE_Billing_Info_Form__payment_fields_autofilled_notice_html_text', __( 'Payment fields have been autofilled because you are in debug mode', 'event_espresso' )),
				'',
				'important-notice'
			)
		);
	}



}
// End of file EE_Billing_Info_Form.form.php