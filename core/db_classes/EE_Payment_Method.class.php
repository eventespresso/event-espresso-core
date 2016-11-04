<?php if (!defined('EVENT_ESPRESSO_VERSION')) {exit('No direct script access allowed');}
do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
/**
 * EE_Payment_Method class
 * Should be parent of all payment method classes
 *
 * @package			Event Espresso
 * @subpackage		includes/classes/EE_Checkin.class.php
 * @author			Mike Nelson
 */
class EE_Payment_Method extends EE_Base_Class{

	/**
	 * Payment Method type object, which has all the info about this type of payment method,
	 * including functions for processing payments, to get settings forms, etc.
	 * @var EE_PMT_Base
	 */
	protected $_type_obj;



	/**
	 * @param array $props_n_values
	 * @return EE_Payment_Method
	 * @throws \EE_Error
	 */
	public static function new_instance( $props_n_values = array()) {
		$has_object = parent::_check_for_object( $props_n_values, __CLASS__ );
		return $has_object ? $has_object : new self( $props_n_values, FALSE );
	}



	/**
	 * @param array $props_n_values
	 * @return EE_Payment_Method
	 * @throws \EE_Error
	 */
	public static function new_instance_from_db ( $props_n_values = array()) {
		return new self( $props_n_values, TRUE );
	}



	/**
	 * Checks if there is a payment method class of the given 'PMD_type', and if so returns the classname.
	 * Otherwise returns a normal EE_Payment_Method
	 * @param array $props_n_values where 'PMD_type' is a gateway name like 'Paypal_Standard','Invoice',etc (basically
	 * the classname minus 'EEPM_')
	 * @return string
	 */
//	private static function _payment_method_type($props_n_values){
//		EE_Registry::instance()->load_lib('Payment_Method_Manager');
//		$type_string = isset($props_n_values['PMD_type']) ? $props_n_values['PMD_type'] : NULL;
//		if(EE_Payment_Method_Manager::instance()->payment_method_type_exists($type_string)){
//			return 'EEPM_'.$type_string;
//		}else{
//			return __CLASS__;
//		}
//	}



	/**
	 * Gets whether this payment method can be used anywhere at all (ie frontend cart, admin, etc)
	 * @return boolean
	 */
	public function active() {
		return array_intersect(array_keys(EEM_Payment_Method::instance()->scopes()),$this->scope());
	}



	/**
	 * Sets this PM as active by making it usable within the CART scope. Offline gateways
	 * are also usable from the admin-scope as well. DOES NOT SAVE it
	 *
	 * @throws \EE_Error
	 */
	public function set_active(){
		$default_scopes = array(EEM_Payment_Method::scope_cart);
		if($this->type_obj() &&
			$this->type_obj()->payment_occurs() === EE_PMT_Base::offline){
			$default_scopes[] = EEM_Payment_Method::scope_admin;
		}
		$this->set_scope($default_scopes);
	}



	/**
	 * Makes this payment method apply to NO scopes at all. DOES NOT SAVE it.
	 */
	public function deactivate(){
		$this->set_scope(array());
	}



	/**
	 * Gets button_url
	 * @return string
	 */
	public function button_url() {
		return $this->get('PMD_button_url');
	}



	/**
	 * Sets button_url
	 * @param string $button_url
	 */
	public function set_button_url($button_url) {
		$this->set('PMD_button_url', $button_url);
	}



	/**
	 * Gets debug_mode
	 * @return boolean
	 */
	public function debug_mode() {
		return $this->get('PMD_debug_mode');
	}



	/**
	 * Sets debug_mode
	 * @param boolean $debug_mode
	 */
	public function set_debug_mode($debug_mode) {
		$this->set('PMD_debug_mode', $debug_mode);
	}



	/**
	 * Gets description
	 * @return string
	 */
	public function description() {
		return $this->get('PMD_desc');
	}



	/**
	 * Sets description
	 * @param string $description
	 */
	public function set_description($description) {
		$this->set('PMD_desc', $description);
	}



	/**
	 * Gets name
	 * @return string
	 */
	public function name() {
		return $this->get('PMD_name');
	}



	/**
	 * Sets name
	 * @param string $name
	 */
	public function set_name($name) {
		$this->set('PMD_name', $name);
	}



	/**
	 * Gets open_by_default
	 * @return boolean
	 */
	public function open_by_default() {
		return $this->get('PMD_open_by_default');
	}



	/**
	 * Sets open_by_default
	 * @param boolean $open_by_default
	 */
	public function set_open_by_default($open_by_default) {
		$this->set('PMD_open_by_default', $open_by_default);
	}



	/**
	 * Gets order
	 * @return int
	 */
	public function order() {
		return $this->get('PMD_order');
	}



	/**
	 * Sets order
	 * @param int $order
	 */
	public function set_order($order) {
		$this->set('PMD_order', $order);
	}



	/**
	 * Gets slug
	 * @return string
	 */
	public function slug() {
		return $this->get('PMD_slug');
	}



	/**
	 * Sets slug
	 * @param string $slug
	 */
	public function set_slug($slug) {
		$this->set('PMD_slug', $slug);
	}



	/**
	 * Gets type
	 * @return string
	 */
	public function type() {
		return $this->get('PMD_type');
	}



	/**
	 * Sets type
	 * @param string $type
	 */
	public function set_type($type) {
		$this->set('PMD_type', $type);
	}



	/**
	 * Gets wp_user
	 * @return int
	 */
	public function wp_user() {
		return $this->get('PMD_wp_user');
	}




	/**
	 * Sets wp_user
	 * @param int $wp_user_id
	 */
	public function set_wp_user($wp_user_id) {
		$this->set('PMD_wp_user', $wp_user_id);
	}

	/**
	 * Overrides parent so when PMD_type is changed we refresh the _type_obj
	 * @param string $field_name
	 * @param mixed $field_value
	 * @param boolean $use_default
	 */
	public function set( $field_name, $field_value, $use_default = FALSE ){
		if( $field_name === 'PMD_type' ){
			//the type has probably changed, so forget about its old type object
			$this->_type_obj = NULL;
		}
		parent::set($field_name, $field_value, $use_default);
	}



	/**
	 * Gets admin_name
	 * @return string
	 */
	public function admin_name() {
		return $this->get('PMD_admin_name');
	}



	/**
	 * Sets admin_name
	 * @param string $admin_name
	 */
	public function set_admin_name($admin_name) {
		$this->set('PMD_admin_name', $admin_name);
	}



	/**
	 * Gets admin_desc
	 * @return string
	 */
	public function admin_desc() {
		return $this->get('PMD_admin_desc');
	}



	/**
	 * Sets admin_desc
	 * @param string $admin_desc
	 */
	public function set_admin_desc($admin_desc) {
		$this->set('PMD_admin_desc', $admin_desc);
	}



	/**
	 * Gets scope
	 * @return array
	 */
	public function scope() {
		return $this->get('PMD_scope');
	}



	/**
	 * Sets scope
	 * @param array $scope
	 */
	public function set_scope($scope) {
		$this->set('PMD_scope', $scope);
	}



	/**
	 * Gets the payment method type for this payment method instance
	 * @return EE_PMT_Base
	 * @throws EE_Error
	 */
	public function type_obj(){
		if( ! $this->_type_obj ) {
			EE_Registry::instance()->load_lib( 'Payment_Method_Manager' );
			if ( EE_Payment_Method_Manager::instance()->payment_method_type_exists( $this->type() )) {
				$class_name = EE_Payment_Method_Manager::instance()->payment_method_class_from_type( $this->type() );
				if ( ! class_exists( $class_name )) {
					throw new EE_Error(
						sprintf(
							__( 'An attempt to use the "%1$s" payment method failed, so it was deactivated.%2$sWas the "%1$s" Plugin recently deactivated? It can be reactivated on the %3$sPlugins Admin Page%4$s', 'event_espresso' ),
							$class_name,
							'<br />',
							'<a href="' . admin_url('plugins.php') . '">',
							'</a>'
						)
					);
				}
				$r = new ReflectionClass( $class_name );
					$this->_type_obj = $r->newInstanceArgs( array( $this ));
			} else {
				throw new EE_Error( sprintf( __( 'A payment method of type "%1$s" does not exist. Only ones existing are: %2$s', 'event_espresso' ), $this->type(), implode(',', EE_Payment_Method_Manager::instance()->payment_method_type_names() ) ) );
			}
		}
		return $this->_type_obj;
	}



	/**
	 * Returns a simple array of key-value pairs combining the payment method's fields (without the 'PMD_' prefix)
	 * and the extra meta. Mostly used for passing off ot gateways.	 *
	 * @return array
	 */
	public function settings_array(){
		$fields = $this->model_field_array();
		$extra_meta = $this->all_extra_meta_array();
		//remove the model's prefix from the fields
		$combined_settings_array = array();
		foreach($fields as $key => $value){
			if(strpos($key, 'PMD_')===0){
				$key_sans_model_prefix = str_replace('PMD_', '', $key);
				$combined_settings_array [$key_sans_model_prefix] = $value;
			}
		}
		$combined_settings_array = array_merge( $extra_meta,$combined_settings_array );
		return $combined_settings_array;
	}



	/**
	 * Gets the HTML for displaying the payment method on a page.
	 *
	 * @param string $url
	 * @param string $css_class
	 * @return string of HTML for displaying the button
	 * @throws \EE_Error
	 */
	public function button_html( $url = '', $css_class = '' ){
		$payment_occurs = $this->type_obj()->payment_occurs();
		return '
		 <div id="' . $this->slug() . '-payment-option-dv" class="'. $payment_occurs .'-payment-gateway reg-page-payment-option-dv' . $css_class . '">
			<a id="payment-gateway-button-' . $this->slug() . '" class="reg-page-payment-option-lnk" rel="' . $this->slug() . '" href="' . $url . '" >
				<img src="' . $this->button_url() . '" alt="' . sprintf( esc_attr__( 'Pay using %s', 'event_espresso' ), $this->get_pretty('PMD_name','form_input') ) . '" />
			</a>
		</div>
';
	}



	/**
	 * Gets all the currencies which are an option for this payment method
	 * (as defined by the gateway and the currently active currencies)
	 *
	 * @return EE_Currency[]
	 * @throws \EE_Error
	 */
	public function get_all_usable_currencies(){
		return EEM_Currency::instance()->get_all_currencies_usable_by($this->type_obj());
	}



	/**
	 * Reports whether or not this payment method can be used for this payment method
	 *
	 * @param string $currency_code currency ID (code)
	 * @return boolean
	 * @throws \EE_Error
	 */
	public function usable_for_currency( $currency_code ) {
		foreach( $this->get_all_usable_currencies() as $currency_obj ) {
			if( $currency_obj->ID() === $currency_code ){
				return TRUE;
			}
		}
		return FALSE;
	}



	/**
	 * Returns TRUE if this payment method's gateway is an instance of EE_Onsite_Gateway
	 *
	 * @return bool
	 * @throws \EE_Error
	 */
	public function is_on_site(){
		return $this->type_obj()->payment_occurs() === EE_PMT_Base::onsite;
	}



	/**
	 * Returns TRUE if this payment method's gateway is an instance of EE_Offsite_Gateway
	 *
	 * @return bool
	 * @throws \EE_Error
	 */
	public function is_off_site(){
		return $this->type_obj()->payment_occurs() === EE_PMT_Base::offsite;
	}



	/**
	 * Returns TRUE if this payment method does not utilize a gateway
	 *
	 * @return bool
	 * @throws \EE_Error
	 */
	public function is_off_line(){
		return $this->type_obj()->payment_occurs() === EE_PMT_Base::offline;
	}

	/**
	 * Overrides default __sleep so the object type is NOT cached.
	 * This way we can rely on the normal EE_Payment_Method::type_obj() logic
	 * to load the required classes, and don't need them at the time of unserialization
	 * @return array
	 */
	public function __sleep(){
		$properties =  get_object_vars( $this );
		unset( $properties[ '_type_obj' ] );
		return array_keys( $properties );
	}



	/**
	 * Overrides parent to add some logging for when payment methods get deactivated
	 *
	 * @param array $set_cols_n_values
	 * @return int @see EE_Base_Class::save()
	 * @throws \EE_Error
	 */
	public function save( $set_cols_n_values = array() ) {
		$results =  parent::save( $set_cols_n_values );
		if( $this->get_original( 'PMD_scope' ) !== $this->get( 'PMD_scope' ) ) {
			EE_Log::instance()->log(
				__FILE__,
				__FUNCTION__,
				sprintf(
					__( 'Set new scope on payment method %1$s to %2$s from %3$s on URL %4$s', 'event_espresso' ),
					$this->name(),
					serialize( $this->get_original(  'PMD_scope' ) ),
					serialize( $this->get( 'PMD_scope' ) ),
					EE_Registry::instance()->REQ->get_current_page_permalink()
				),
				'payment_method_change'
			);
		}
		return $results;
	}

}
