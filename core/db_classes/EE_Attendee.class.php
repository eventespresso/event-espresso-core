<?php if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package            Event Espresso
 * @ author                Seth Shoultes
 * @ copyright        (c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license            {@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link                    {@link http://www.eventespresso.com}
 * @ since                4.0
 *
 */



/**
 * EE_Attendee class
 *
 * @package               Event Espresso
 * @subpackage            includes/classes/EE_Transaction.class.php
 * @author                Mike Nelson
 */
class EE_Attendee extends EE_CPT_Base implements EEI_Has_Address {

	/**
	 * Sets some dynamic defaults
	 * @param array  $fieldValues
	 * @param bool   $bydb
	 * @param string $timezone
	 */
	protected function __construct( $fieldValues = NULL, $bydb = FALSE, $timezone = NULL ) {
		if ( !isset( $fieldValues[ 'ATT_full_name' ] ) ) {
			$fname = isset( $fieldValues[ 'ATT_fname' ] ) ? $fieldValues[ 'ATT_fname' ] . ' ' : '';
			$lname = isset( $fieldValues[ 'ATT_lname' ] ) ? $fieldValues[ 'ATT_lname' ] : '';
			$fieldValues[ 'ATT_full_name' ] = $fname . $lname;
		}
		if ( !isset( $fieldValues[ 'ATT_slug' ] ) ) {
			//			$fieldValues['ATT_slug'] = sanitize_key(wp_generate_password(20));
			$fieldValues[ 'ATT_slug' ] = sanitize_title( $fieldValues[ 'ATT_full_name' ] );
		}
		if ( !isset( $fieldValues[ 'ATT_short_bio' ] ) && isset( $fieldValues[ 'ATT_bio' ] ) ) {
			$fieldValues[ 'ATT_short_bio' ] = substr( $fieldValues[ 'ATT_bio' ], 0, 50 );
		}
		parent::__construct( $fieldValues, $bydb, $timezone );
	}



	/**
	 *
	 * @param array $props_n_values
	 * @return EE_Attendee
	 */
	public static function new_instance( $props_n_values = array() ) {
		$classname = __CLASS__;
		$has_object = parent::_check_for_object( $props_n_values, $classname );
		return $has_object ? $has_object : new self( $props_n_values );
	}



	/**
	 * @param array $props_n_values
	 * @return EE_Attendee
	 */
	public static function new_instance_from_db( $props_n_values = array() ) {
		return new self( $props_n_values, TRUE );
	}



	/**
	 *        Set Attendee First Name
	 *
	 * @access        public
	 * @param string $fname
	 */
	public function set_fname( $fname = '' ) {
		$this->set( 'ATT_fname', $fname );
	}



	/**
	 *        Set Attendee Last Name
	 *
	 * @access        public
	 * @param string $lname
	 */
	public function set_lname( $lname = '' ) {
		$this->set( 'ATT_lname', $lname );
	}



	/**
	 *        Set Attendee Address
	 *
	 * @access        public
	 * @param string $address
	 */
	public function set_address( $address = '' ) {
		$this->set( 'ATT_address', $address );
	}



	/**
	 *        Set Attendee Address2
	 *
	 * @access        public
	 * @param        string $address2
	 */
	public function set_address2( $address2 = '' ) {
		$this->set( 'ATT_address2', $address2 );
	}



	/**
	 *        Set Attendee City
	 *
	 * @access        public
	 * @param        string $city
	 */
	public function set_city( $city = '' ) {
		$this->set( 'ATT_city', $city );
	}



	/**
	 *        Set Attendee State ID
	 *
	 * @access        public
	 * @param        int $STA_ID
	 */
	public function set_state( $STA_ID = 0 ) {
		$this->set( 'STA_ID', $STA_ID );
	}



	/**
	 *        Set Attendee Country ISO Code
	 *
	 * @access        public
	 * @param        string $CNT_ISO
	 */
	public function set_country( $CNT_ISO = '' ) {
		$this->set( 'CNT_ISO', $CNT_ISO );
	}



	/**
	 *        Set Attendee Zip/Postal Code
	 *
	 * @access        public
	 * @param        string $zip
	 */
	public function set_zip( $zip = '' ) {
		$this->set( 'ATT_zip', $zip );
	}



	/**
	 *        Set Attendee Email Address
	 *
	 * @access        public
	 * @param        string $email
	 */
	public function set_email( $email = '' ) {
		$this->set( 'ATT_email', $email );
	}



	/**
	 *        Set Attendee Phone
	 *
	 * @access        public
	 * @param        string $phone
	 */
	public function set_phone( $phone = '' ) {
		$this->set( 'ATT_phone', $phone );
	}



	/**
	 *        set deleted
	 *
	 * @access        public
	 * @param        bool $ATT_deleted
	 */
	public function set_deleted( $ATT_deleted = FALSE ) {
		$this->set( 'ATT_deleted', $ATT_deleted );
	}



	/**
	 *        get Attendee First Name
	 * @access        public
	 * @return string
	 */
	public function fname() {
		return $this->get( 'ATT_fname' );
	}



	/**
	 * echoes out the attendee's first name
	 * @return void
	 */
	public function e_full_name() {
		echo $this->full_name();
	}



	/**
	 * Returns the first and last name concatenated together with a space.
	 * @param bool $apply_html_entities
	 * @return string
	 */
	public function full_name( $apply_html_entities = FALSE ) {
		$full_name = $this->fname() . ' ' . $this->lname();
		return $apply_html_entities ? htmlentities( $full_name, ENT_QUOTES, 'UTF-8' ) : $full_name;
	}



	/**
	 *        get Attendee Last Name
	 * @access        public
	 * @return string
	 */
	public function lname() {
		return $this->get( 'ATT_lname' );
	}



	/**
	 * Gets the attendee's full address as an array so client code can decide hwo to display it
	 * @return array numerically indexed, with each part of the address that is known.
	 * Eg, if the user only responded to state and country,
	 * it would be array(0=>'Alabama',1=>'USA')
	 * @return array
	 */
	public function full_address_as_array() {
		$full_address_array = array();
		$initial_address_fields = array( 'ATT_address', 'ATT_address2', 'ATT_city', );
		foreach ( $initial_address_fields as $address_field_name ) {
			$address_fields_value = $this->get( $address_field_name );
			if ( !empty( $address_fields_value ) ) {
				$full_address_array[ ] = $address_fields_value;
			}
		}
		//now handle state and country
		$state_obj = $this->state_obj();
		if ( !empty( $state_obj ) ) {
			$full_address_array[ ] = $state_obj->name();
		}
		$country_obj = $this->country_obj();
		if ( !empty( $country_obj ) ) {
			$full_address_array[ ] = $country_obj->name();
		}
		//lastly get the xip
		$zip_value = $this->zip();
		if ( !empty( $zip_value ) ) {
			$full_address_array[ ] = $zip_value;
		}
		return $full_address_array;
	}



	/**
	 *        get Attendee Address
	 * @return string
	 */
	public function address() {
		return $this->get( 'ATT_address' );
	}



	/**
	 *        get Attendee Address2
	 * @return string
	 */
	public function address2() {
		return $this->get( 'ATT_address2' );
	}



	/**
	 *        get Attendee City
	 * @return string
	 */
	public function city() {
		return $this->get( 'ATT_city' );
	}



	/**
	 *        get Attendee State ID
	 * @return string
	 */
	public function state_ID() {
		return $this->get( 'STA_ID' );
	}



	/**
	 * Gets the state set to this attendee
	 * @return EE_State
	 */
	public function state_obj() {
		return $this->get_first_related( 'State' );
	}

	/**
	 * Returns the state's name, otherwise 'Unknown'
	 * @return string
	 */
	public function state_name(){
		if( $this->state_obj() ){
			return $this->state_obj()->name();
		}else{
			return __( 'Unknown', 'event_espresso' );
		}
	}



	/**
	 *    get Attendee Country ISO Code
	 * @return string
	 */
	public function country_ID() {
		return $this->get( 'CNT_ISO' );
	}



	/**
	 * Gets country set for this attendee
	 * @return EE_Country
	 */
	public function country_obj() {
		return $this->get_first_related( 'Country' );
	}

	/**
	 * REturns the country's name if known, otherwise 'Unknown'
	 * @return string
	 */
	public function country_name(){
		if( $this->country_obj() ){
			return $this->country_obj()->name();
		}else{
			return __( 'Unknown', 'event_espresso' );
		}
	}



	/**
	 *        get Attendee Zip/Postal Code
	 * @return string
	 */
	public function zip() {
		return $this->get( 'ATT_zip' );
	}



	/**
	 *        get Attendee Email Address
	 * @return string
	 */
	public function email() {
		return $this->get( 'ATT_email' );
	}



	/**
	 *        get Attendee Phone #
	 * @return string
	 */
	public function phone() {
		return $this->get( 'ATT_phone' );
	}



	/**
	 *    get deleted
	 * @return        bool
	 */
	public function deleted() {
		return $this->get( 'ATT_deleted' );
	}



	/**
	 * Gets registrations of this attendee
	 * @param array $query_params
	 * @return EE_Registration[]
	 */
	public function get_registrations( $query_params = array() ) {
		return $this->get_many_related( 'Registration', $query_params );
	}



	/**
	 * Gets the most recent registration of this attendee
	 * @return EE_Registration
	 */
	public function get_most_recent_registration() {
		return $this->get_first_related( 'Registration', array( 'order_by' => array( 'REG_date' => 'DESC' ) ) ); //null, 'REG_date', 'DESC', '=', 'OBJECT_K');
	}



	/**
	 * Gets the most recent registration for this attend at this event
	 * @param int $event_id
	 * @return EE_Registration
	 */
	public function get_most_recent_registration_for_event( $event_id ) {
		return $this->get_first_related( 'Registrations', array( 'EVT_ID' => $event_id ), 'REG_date', 'DESC', '=', 'OBJECT_K' );
	}



	/**
	 * returns any events attached to this attendee ($_Event property);
	 * @return array
	 */
	public function events() {
		return $this->get_many_related( 'Event' );
	}



	/**
	 * Gets the billing info array where keys match espresso_reg_page_billing_inputs(),
	 * and keys are their cleaned values
	 * @param string $gateway_name the _gateway_name property on the gateway class
	 * @return array exactly like EE_Onsite_Gateway->espresso_reg_page_billing_inputs(),
	 *                             where keys are names of fields, and values are an array of settings (the most important keys being
	 *                             'label' and 'value)
	 */
	public function billing_info_for_gateway( $gateway_name ) {
		$billing_info = $this->get_post_meta( 'billing_info_' . $gateway_name, TRUE );
		if ( !$billing_info ) {
			return NULL;
		}
		$gateway = EE_Registry::instance()->load_model( 'Gateways' )->get_gateway( $gateway_name );
		if ( !$gateway instanceof EE_Onsite_Gateway ) {
			return NULL;
		}
		else {
			$billing_inputs = $gateway->espresso_reg_page_billing_inputs();
			foreach ( $billing_inputs as $input_name => $billing_input_settings ) {
				$billing_inputs[ $input_name ][ 'value' ] = isset( $billing_info[ $input_name ] ) ? $billing_info[ $input_name ] : NULL;
			}
		}
		return $billing_inputs;
	}
}

/* End of file EE_Attendee.class.php */
/* Location: /includes/classes/EE_Attendee.class.php */
