<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_Billing_Attendee_Info_Form
 * Extends EE_Billing_Info_Form to have methods pertaining specifically to the attendee
 * who's paying.
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_Billing_Attendee_Info_Form extends EE_Billing_Info_Form{

	/**
	 *
	 * @param EE_Payment_Method $payment_method
	 * @param array $options_array @see EE_Form_Section_Proper::__construct()
	 */
	public function __construct( EE_Payment_Method $payment_method, $options_array= array()){
		$options_array['subsections'] = array_merge(
			array(
				'first_name' 	=> new EE_Text_Input( array( 'required'=>TRUE, 'html_class' => 'ee-billing-qstn ee-billing-qstn-fname', 'html_label_text' => __( 'First Name', 'event_espresso' ) ) ),
				'last_name'		=> new EE_Text_Input( array( 'required'=>TRUE, 'html_class' => 'ee-billing-qstn ee-billing-qstn-lname', 'html_label_text' => __( 'Last Name', 'event_espresso' ) ) ),
				'email'				=> new EE_Email_Input( array( 'required'=>TRUE, 'html_class' => 'ee-billing-qstn ee-billing-qstn-email', 'html_label_text' => __( 'Email', 'event_espresso' ) ) ),
				'address'			=> new EE_Text_Input( array( 'html_label_text'=>  __( 'Address', 'event_espresso'), 'required'=>TRUE, 'html_class' => 'ee-billing-qstn ee-billing-qstn-address' )),
				'address2'		=> new EE_Text_Input( array( 'html_label_text'=> __( 'Address 2', 'event_espresso'), 'html_class' => 'ee-billing-qstn ee-billing-qstn-address2' )),
				'city'					=> new EE_Text_Input( array( 'required'=>TRUE, 'html_class' => 'ee-billing-qstn ee-billing-qstn-city', 'html_label_text' => __( 'City', 'event_espresso' ) ) ),
				'state' 				=> apply_filters( 'FHEE__EE_Billing_Attendee_Info_Form__state_field', new EE_State_Select_Input( NULL, array( 'required'=>TRUE, 'html_class' => 'ee-billing-qstn ee-billing-qstn-state', 'html_label_text' => __( 'State', 'event_espresso' ) ) ) ),
				'country' 			=> apply_filters( 'FHEE__EE_Billing_Attendee_Info_Form__country_field', new EE_Country_Select_Input( NULL, array( 'required'=>TRUE, 'html_class' => 'ee-billing-qstn ee-billing-qstn-country', 'html_label_text' => __( 'Country', 'event_espresso' ) ) ) ),
				'zip'					=> new EE_Text_Input( array( 'required'=>TRUE, 'html_class' => 'ee-billing-qstn ee-billing-qstn-zip', 'html_label_text' => __( 'Zip', 'event_espresso' ) ) ),
				'phone'			=> new EE_Text_Input( array( 'html_class' => 'ee-billing-qstn ee-billing-qstn-phone', 'html_label_text' => __( 'Phone', 'event_espresso' ) )),
			),
			isset( $options_array['subsections'] ) ? $options_array['subsections'] : array()
		);

		parent::__construct( $payment_method, $options_array );

	}

	/**
	 * Sets the defaults for the billing form according to the attendee's details
	 * @param EE_Attendee $attendee
	 */
	public function populate_from_attendee( $attendee ){
		$attendee = EEM_Attendee::instance()->ensure_is_obj($attendee);
		/** @var $attendee EE_Attendee */
		$this->populate_defaults( 
			apply_filters( 'FHEE__EE_Billing_Attendee_Info_Form__populate_from_attendee',
				array(
					'first_name'=>$attendee->fname(),
					'last_name'=>$attendee->lname(),
					'email'=>$attendee->email(),
					'address'=>$attendee->address(),
					'address2'=>$attendee->address2(),
					'city'=>$attendee->city(),
					'state'=> $attendee->state_ID(),
					'country'=> $attendee->country_ID(),
					'zip'=>$attendee->zip(),
					'phone'=>$attendee->phone(),
				),
				$attendee,
				$this 
			)
		);
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
}

// End of file EE_Billing_Attendee_Info_Form.form.php