<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			{@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link					{@link http://www.eventespresso.com}
 * @ since		 		4.0
 *
 * ------------------------------------------------------------------------
 *
 * EE_Attendee class
 *
 * @package			Event Espresso
 * @subpackage		includes/classes/EE_Transaction.class.php
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EE_Attendee extends EE_CPT_Base implements EEI_Has_Address {


    /**
    *	Transaction ID
	* 
	* 	primary key
	*	
	* 	@access	protected
    *	@var int	
    */
	protected $_ATT_ID = FALSE;

	/**
	 * Full name of attendee
	 * @var string
	 */
	protected $_ATT_full_name = NULL;
	
	/**
	 * biography of attendee
	 * @var string
	 */
	protected $_ATT_bio = NULL;

	/**
	 * slug url of attendee (usually automatically created)
	 * @var string
	 */
	protected $_ATT_slug = NULL;
	
	/**
	 * datetime of attendee creationg
	 * @var string
	 */
	protected $_ATT_created = NULL;
	
	/**
	 * short biography for excerpts
	 * @var string
	 */
	protected $_ATT_short_bio = NULL;
	
	/**
	 * Post type status of attendee
	 * @var string
	 */
	protected $_ATT_status = NULL;
	
	/**
	 * time attendee last modified
	 * @var string
	 */
	protected $_ATT_modified = NULL;
	
	/**
	 * ID of wordpress user who created attendee
	 * @var int
	 */
	protected $_ATT_author = NULL;
    /**
    *	Attendee First Name
	* 
	*	@access	protected
    *	@var string	
    */
	protected $_ATT_fname = NULL;


    /**
    *	Attendee Last Name
	* 
	*	@access	protected
    *	@var string	
    */
	protected $_ATT_lname = NULL;


    /**
    *	Attendee Email Address
	* 
	*	@access	protected
    *	@var string	
    */
	protected $_ATT_email = NULL;


    /**
    *	Attendee Address
	* 
	*	@access	protected
    *	@var string	
    */
	protected $_ATT_address = NULL;


    /**
    *	Attendee Address 2
	* 
	*	@access	protected
    *	@var string	
    */
	protected $_ATT_address2 = NULL;


    /**
    *	Attendee City
	* 
	*	@access	protected
    *	@var string	
    */
	protected $_ATT_city = NULL;


    /**
    *	State ID
	* 
	*	state text (used to be foreign key to eventually-to-be-created state table)
	*  
	*	@access	protected
    *	@var int	
    */
	protected $_STA_ID = NULL;


    /**
    *	Country ISO Code
	* 
	*	country text (used to be foreign key to eventually-to-be-created country table)
	*  
	*	@access	protected
    *	@var string	
    */
	protected $_CNT_ISO = NULL;


    /**
    *	Attendee Zip/Postal Code
	* 
	*	@access	protected
    *	@var string	
    */
	protected $_ATT_zip = NULL;


    /**
    *	Attendee Phone
	* 
	*	@access	protected
    *	@var string	
    */
	protected $_ATT_phone = NULL;


    
	
	/**
	 *
	 * @var EE_Registration[]
	 */
	protected $_Registration=NULL;
	
	/**
	 * related state
	 * @var EE_State
	 */
	protected $_State;

	/**
	 * related country
	 * @var EE_Country
	 */
	protected $_Country;



	/**
	 * Will hold an array of events attached to this attendee (attached by others not on instantiating)
	 * @var EE_Event[]
	 */
	protected $_Event = array();


	/**
	 * Sets some dynamic defaults
	 * @param array $fieldValues
	 * @param type $bydb
	 * @param type $timezone
	 */
	protected function __construct($fieldValues=null, $bydb = FALSE, $timezone = NULL ){
		if( ! isset( $fieldValues['ATT_full_name'] )) {
			$fname = isset( $fieldValues['ATT_fname'] ) ? $fieldValues['ATT_fname'] . ' ' : ''; 
			$lname = isset( $fieldValues['ATT_lname'] ) ? $fieldValues['ATT_lname'] : ''; 
			$fieldValues['ATT_full_name'] = $fname . $lname;
		}
		if( ! isset($fieldValues['ATT_slug'])){
//			$fieldValues['ATT_slug'] = sanitize_key(wp_generate_password(20));
			$fieldValues['ATT_slug'] = sanitize_title( $fieldValues['ATT_full_name'] );
		}
		if( ! isset($fieldValues['ATT_short_bio']) && isset($fieldValues['ATT_bio'])){
			$fieldValues['ATT_short_bio'] = substr($fieldValues['ATT_bio'],0,50);
		}
		parent::__construct($fieldValues,$bydb,$timezone);
	}

	/**
	 * 
	 * @param type $props_n_values
	 * @return EE_Attendee
	 */
	public static function new_instance( $props_n_values = array() ) {
		$classname = __CLASS__;
		$has_object = parent::_check_for_object( $props_n_values, $classname );
		return $has_object ? $has_object : new self( $props_n_values );
	}


	public static function new_instance_from_db ( $props_n_values = array() ) {
		return new self( $props_n_values, TRUE );
	}



	/**
	*		Set Attendee First Name
	* 
	* 		@access		public		
	*		@param		string		$fname
	*/	
	public function set_fname( $fname = FALSE ) {
		$this->set('ATT_fname',$fname);
	}





	/**
	*		Set Attendee Last Name
	* 
	* 		@access		public		
	*		@param		string		$lname
	*/	
	public function set_lname( $lname = FALSE ) {
		$this->set('ATT_lname',$lname);
	}





	/**
	*		Set Attendee Address
	* 
	* 		@access		public		
	*		@param		string		$address
	*/	
	public function set_address( $address = FALSE ) {
		$this->set('ATT_address',$address);
	}





	/**
	*		Set Attendee Address2
	* 
	* 		@access		public		
	*		@param		string		$address2
	*/	
	public function set_address2( $address2 = FALSE ) {
		$this->set('ATT_address2',$address2);
	}





	/**
	*		Set Attendee City
	* 
	* 		@access		public		
	*		@param		string		$city
	*/	
	public function set_city( $city = FALSE ) {
		
		$this->set('ATT_city',$city);
	}





	/**
	*		Set Attendee State ID
	* 
	* 		@access		public		
	*		@param		int		$STA_ID
	*/	
	public function set_state( $STA_ID = FALSE ) {
		
		$this->set('STA_ID',$STA_ID);
	}





	/**
	*		Set Attendee Country ISO Code
	* 
	* 		@access		public		
	*		@param		string		$CNT_ISO
	*/	
	public function set_country( $CNT_ISO = FALSE ) {
		
		$this->set('CNT_ISO',$CNT_ISO);
	}





	/**
	*		Set Attendee Zip/Postal Code
	* 
	* 		@access		public		
	*		@param		string		$zip
	*/	
	public function set_zip( $zip = FALSE ) {
		$this->set('ATT_zip',$zip);
	}





	/**
	*		Set Attendee Email Address
	* 
	* 		@access		public		
	*		@param		string		$email
	*/	
	public function set_email( $email = FALSE ) {
		$this->set('ATT_email',$email);
	}





	/**
	*		Set Attendee Phone
	* 
	* 		@access		public		
	*		@param		string		$phone
	*/	
	public function set_phone( $phone = FALSE ) {
		
		$this->set('ATT_phone',$phone);
	}












	/**
	*		set deleted
	* 
	* 		@access		public
	*		@param		bool		ATT_deleted
	*/
	public function set_deleted( $ATT_deleted = NULL ) {
		$this->set('ATT_deleted',$ATT_deleted);
	}


	/**
	*		get Attendee First Name
	* 		@access		public
	*/	
	public function fname() {
		return $this->get('ATT_fname');
	}
	
	
	
	
	
	/**
	 * echoes out the attendee's first name
	 */
	public function e_full_name(){
		echo $this->full_name();
	}
	
	
	
	
	
	/**
	 * Returns the first and last name concatenated together with a space.
	 * @return string
	 */
	public function full_name( $apply_html_entities = FALSE ){
		$full_name = $this->fname() . ' ' . $this->lname();
		return $apply_html_entities ? htmlentities( $full_name, ENT_QUOTES, 'UTF-8' ) : $full_name;
	}

	
	


	/**
	*		get Attendee Last Name
	* 		@access		public
	*/	
	public function lname() {
		return $this->get('ATT_lname');
	}

	/**
	 * Gest the attendee's full address as an array so client code can decide hwo to display it
	 * @return array numerically indexed, with each part of the address that is known.
	 * Eg, if the user only responded to state and country,
	 * it would be array(0=>'Alabama',1=>'USA')
	 */
	public function full_address_as_array(){
		$full_address_array = array();
		$initial_address_fields = array(
			'ATT_address','ATT_address2','ATT_city',
		);
		foreach($initial_address_fields as $address_field_name){
			$address_fields_value = $this->get($address_field_name);
			if (!empty($address_fields_value)){
				$full_address_array[] = $address_fields_value;
			}
		}
		//now handle state and country
		$state_obj = $this->state_obj();
		if ( ! empty($state_obj)){
			$full_address_array[] = $state_obj->name();
		}
		$country_obj = $this->country_obj();
		if( ! empty($country_obj)){
			$full_address_array[] = $country_obj->name();
		}
		//lastly get the xip
		$zip_value = $this->zip();
		if( ! empty($zip_value)){
			$full_address_array[] = $zip_value;
		}
		
		return $full_address_array;
	}


	/**
	*		get Attendee Address
	* 		@access		public
	*/	
	public function address() {
		return $this->get('ATT_address');
	}



	/**
	*		get Attendee Address2
	* 		@access		public
	*/	
	public function address2() {
		return $this->get('ATT_address2');
	}



	/**
	*		get Attendee City
	* 		@access		public
	*/	
	public function city() {
		return $this->get('ATT_city');
	}



	/**
	*		get Attendee State ID
	* 		@access		public
	*/	
	public function state_ID() {
		return $this->get('STA_ID');
	}
	
	/**
	 * Gets the state set to this attendee
	 * @return EE_State
	 */
	public function state_obj(){
		return $this->get_first_related('State');
	}



	/**
	*	get Attendee Country ISO Code
	* 	@access		public
	*/	
	public function country_ID() {
		return $this->get('CNT_ISO');
	}

	/**
	 * Gets country set for this attendee
	 * @return EE_Country
	 */
	public function country_obj(){
		return $this->get_first_related('Country');
	}


	/**
	*		get Attendee Zip/Postal Code
	* 		@access		public
	*/	
	public function zip() {
		return $this->get('ATT_zip');
	}



	/**
	*		get Attendee Email Address
	* 		@access		public
	*/	
	public function email() {
		return $this->get('ATT_email');
	}



	/**
	*		get Attendee Phone #
	* 		@access		public
	*/	
	public function phone() {
		return $this->get('ATT_phone');
	}





	/**
	*	get deleted
	* 	@access		public
	* 	@return 		bool
	*/
	public function deleted() {
		return $this->get('ATT_deleted');
	}




	/**
	 * Gets a maximum of 100 related registrations
	 * @return EE_Registration[] UNLESS $output='count', in which case INT
	 */
	public function get_registrations($query_params = array()){
		return $this->get_many_related('Registration',$query_params);
	}
	
	/**
	 * Gets the most recent registration of this attendee
	 * @return EE_Registration
	 */
	public function get_most_recent_registration(){
		return $this->get_first_related('Registration', array('order_by'=>array('REG_date'=>'DESC')));//null, 'REG_date', 'DESC', '=', 'OBJECT_K');
	}
	
	/**
	 * Gets the most recent registration for this attend at this event
	 * @param int $event_id
	 * @return EE_Registration
	 */
	public function get_most_recent_registration_for_event($event_id){
		return $this->get_first_related('Registrations', array('EVT_ID'=>$event_id), 'REG_date', 'DESC', '=', 'OBJECT_K');
	}

	/**
	 * returns any events attached to this attendee ($_Event property);
	 * @return array 
	 */
	public function events() {
		if ( empty( $this->_Event ) ){
			$events = EEM_Event::instance()->get_all(array(array('Registration.Attendee.ATT_ID'=>$this->get('ATT_ID'))));
			$this->_Event = $events;
		}
		return $this->_Event;
	}
	
	/**
	 * Gets the billing info array where keys match espresso_reg_page_billing_inputs(),
	 * and keys are their cleaned values
	 * @param string $gateway_name the _gateway_name property on the gateway class
	 * @return array exactly like EE_Onsite_Gateway->espresso_reg_page_billing_inputs(),
	 * where keys are names of fields, and values are an array of settings (the most important keys being
	 * 'label' and 'value)
	 */
	public function billing_info_for_gateway($gateway_name){
		$billing_info =  $this->get_post_meta('billing_info_'.$gateway_name,true);
		if ( !$billing_info){
			return null;
		}
		$gateway_model = EE_Registry::instance()->load_model('Gateways');
		$gateway = $gateway_model->get_gateway($gateway_name);
		if ( ! $gateway instanceof EE_Onsite_Gateway){
			return null;
		}else{
			$billing_inputs = $gateway->espresso_reg_page_billing_inputs();
			foreach($billing_inputs as $input_name => $billing_input_settings){
				$billing_inputs[$input_name]['value'] = isset($billing_info[$input_name]) ? $billing_info[$input_name] : null;
			}
		}
		return $billing_inputs;
	}
	
}

/* End of file EE_Attendee.class.php */
/* Location: /includes/classes/EE_Attendee.class.php */
