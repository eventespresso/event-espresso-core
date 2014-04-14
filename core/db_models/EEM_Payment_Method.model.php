<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
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
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * Payment Method Model
 *
 * For storing all payment methods (things that interact between EE and gateways).
 * As of 4.3, payment methods are NOT singletons so there can be multiple instances of payment methods
 * of the same type, with different details. Eg, multiple paypal standard gateways so different
 * events can have their proceeds going to different paypal accounts
 *
 * @package			Event Espresso
 * @subpackage		includes/models/EEM_Checkin.model.php
 * @author			Mike Nelson
 *
 * ------------------------------------------------------------------------
 */

class EEM_Payment_Method extends EEM_Base {
	const scope_cart = 'CART';
	const scope_admin = 'ADMIN';
	const scope_api = 'API';
	/**
	 *
	 * @var EEM_Payment_Method
	 */
	private static $_instance = NULL;



	/**
	 * 		This funtion is a singleton method used to instantiate the EEM_Payment_Method object
	 *
	 * 		@access public
	 * 		@return EEM_Payment_Method instance
	 */
	public static function instance() {

		// check if instance of EEM_Checkin already exists
		if (self::$_instance === NULL) {
			// instantiate Price_model
			self::$_instance = new self( );
		}
		// EEM_Checkin object
		return self::$_instance;
	}



	/**
	 * 		private constructor to prevent direct creation
	 * 		@Constructor
	 * 		@access protected
	 * 		@param string $timezone string representing the timezone we want to set for returned Date Time Strings (and any incoming timezone data that gets saved).  Note this just sends the timezone info to the date time model field objects.  Default is NULL (and will be assumed using the set timezone in the 'timezone_string' wp option)
	 * 		@return void
	 */
	protected function __construct() {
		$this->singlular_item = __('Payment Method','event_espresso');
		$this->plural_item = __('Payment Methods','event_espresso');		

		$this->_tables = array(
			'Payment_Method'=>new EE_Primary_Table('esp_payment_method','PMD_ID')
		);
		$this->_fields = array(
			'Payment_Method'=> array(
				'PMD_ID'=>new EE_Primary_Key_Int_Field('PMD_ID', __("ID", 'event_espresso')),
				'PMD_type'=>new EE_Plain_Text_Field('PMD_type', __("Payment Method Type", 'event_espresso'), false),
				'PMD_name'=>new EE_Plain_Text_Field('PMD_name', __("Name", 'event_espresso'), false),
				'PMD_desc'=>new EE_Simple_HTML_Field('PMD_desc', __("Description", 'event_espresso'), false, ''),
				'PMD_admin_name'=>new EE_Plain_Text_Field('PMD_admin_name', __("Admin-Only Name", 'event_espresso'), true),
				'PMD_admin_desc'=>new EE_Simple_HTML_Field('PMD_admin_desc', __("Admin-Only Description", 'event_espresso'), true),
				'PMD_slug'=>new EE_Slug_Field('PMD_slug', __("Slug", 'event_espresso'), false),
				'PMD_order'=>new EE_Integer_Field('PMD_order', __("Order", 'event_espresso'), false, 0),
				'PRC_ID'=>new EE_Foreign_Key_Int_Field('PRC_ID', __("Surcharge Price", 'event_espresso'), true, NULL, 'Price'),
				'PMD_debug_mode'=>new EE_Boolean_Field('PMD_debug_mode', __("Debug Mode On?", 'event_espresso'), false, false),
				'PMD_logging'=>new EE_Boolean_Field('PMD_logging', __("Logging On?", 'event_espresso'), false,false),
				'PMD_wp_user_id'=>new EE_Integer_Field('PMD_wp_user_Id', __("User ID", 'event_espresso'), false, 1),
				'PMD_open_by_default'=>new EE_Boolean_Field('PMD_open_by_default', __("Open by Default?", 'event_espresso'), false, false),
				'PMD_active'=>new EE_Boolean_Field('PMD_active', __("Active?", 'event_espresso'), false,true),
				'PMD_button_url'=>new EE_Plain_Text_Field('PMD_button_url', __("Button URL", 'event_espresso'), true,''),
				'PMD_preferred_currency'=>new EE_Plain_Text_Field('PMD_preferred_currency', __("Preferred Currency", 'event_espresso'), false, 'USD'),
				'PMD_scope'=>new EE_Serialized_Text_Field('PMD_scope', __("Usable From?", 'event_espresso'), false,array('frontend')),//possible values currently are 'frontend','admin','api'
				
			)
		);
		$this->_model_relations = array(
			'Price'=>new EE_Belongs_To_Relation(),
			'Event'=>new EE_HABTM_Relation('Event_Payment_Method'),
			'Payment'=>new EE_Has_Many_Relation(),
		);
		parent::__construct();
	}
	/**
	 * Gets one by the slug provided
	 * @param string $slug
	 * @return EE_Payment_Method
	 */
	public function get_one_by_slug($slug){
		return $this->get_one(array(array('PMD_slug'=>$slug)));
	}
	/**
	 * Gets all the acceptable scopes for payment methods.
	 * Keys are their names as store din the DB, and values are nicenames for displaying them
	 * @return array
	 */
	public function scopes(){
		return apply_filters('FHEE__EEM_Payment_Method__scopes',array(self::scope_cart => __("Front-end Registration Page", 'event_espresso'),self::scope_admin=>  __("Admin Registration Page", 'event_espresso')));
	}
	/**
	 * Determines if this is an valid scope 
	 * @param string $scope like one of EEM_Payment_Method::instance()->scopes()
	 * @return boolean
	 */
	public function is_valid_scope($scope){
		$scopes = $this->scopes();
		if(isset($scopes[$scope])){
			return true;
		}else{
			return false;
		}
	}
	/**
	 * Gets all active gateways
	 * @param string $scope one of 
	 * @return EE_Payment_Method[]
	 */
	public function get_all_active($scope = NULL){
		if($scope){
			if($this->is_valid_scope($scope)){
				return $this->get_all(array(array('PMD_active'=>true,'PMD_scope'=>array('LIKE',"%$scope%"))));
			}else{
				throw new EE_Error(sprintf(__("'%s' is not a valid scope for a payment method", "event_espresso"),$scope));
			}	
		}else{
			return $this->get_all(array(array('PMD_active'=>true)));
		}
	}
	
	/**
	 * Gets one payment method of that type, regardless of whether its active or not
	 * @param string $type
	 * @return EE_Payment_Method
	 */
	public function get_one_of_type($type){
		return $this->get_one(array(array('PMD_type'=>$type)));
	}
	/**
	 * Overrides parent ot also check by the slug
	 * @see EEM_Base::ensure_is_obj()
	 * @param string|int|EE_Payment_Method $base_class_obj_or_id
	 * @param boolean $ensure_is_in_db 
	 * @return EE_Payment_Method
	 * @throws EE_Error
	 */
	public function ensure_is_obj($base_class_obj_or_id, $ensure_is_in_db = false) {
		try{
			return parent::ensure_is_obj($base_class_obj_or_id, $ensure_is_in_db);
		}catch(EE_Error $e){
			//last ditch-try to find one by the slug
			$obj = $this->get_one_by_slug($base_class_obj_or_id);
			if($obj){
				return $obj;
			}else{
				throw new EE_Error(sprintf(__("'%s' is neither a Payment Method ID, slug, nor object.", "event_espresso"),$base_class_obj_or_id));
			}
		}
	}
	
	/**
	 * Gets the ID of this object, or if its a string finds the object's id
	 * assocaited with that slug
	 * @param type $base_obj_or_id_or_slug
	 * @return int
	 */
	function ensure_is_ID($base_obj_or_id_or_slug){
		if(is_string($base_obj_or_id_or_slug)){
			//assume it's a slug
			$base_obj_or_id_or_slug =  $this->get_one_by_slug($base_obj_or_id_or_slug);	
		}
		return parent::ensure_is_ID($base_obj_or_id_or_slug);
		
	}
	/**
	 * Verifies the button urls on all the payment methods that meet the criteria
	 * of $query_params have a valid button url. If not, resets them to their default.
	 * @param array $query_params @see EEM_Base::get_all
	 */
	function verify_button_urls($query_params = array()){
		EE_Registry::instance()->load_helper('URL');
		$payment_methods = $this->get_all($query_params);
		/* @var $payment_method EE_Payment_Method[] */
		foreach($payment_methods as $payment_method){
			try{
				//send an HTTP HEAD request to quickkly verify the file exists
				
				if( ! EEH_URL::remote_file_exists($payment_method->button_url())){
					EE_Error::add_attention(sprintf(__("Payment Method '%s' had a broken button url, so it was reset", "event_espresso"),$payment_method->name()));
					$payment_method->save(array(
						'PMD_button_url'=>$payment_method->type_obj()->default_button_url()));
				}
			}catch(EE_Error $e){
				$payment_method->set_active(false);
			}
		}
	}
}