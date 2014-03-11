<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
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
 * EE_Payment_Method class
 * Shoudl be parent of all paymetn method classes
 *
 * @package			Event Espresso
 * @subpackage		includes/classes/EE_Checkin.class.php
 * @author			Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Payment_Method extends EE_Soft_Delete_Base_Class{
	
	/** ID @var PMD_ID*/ 
	protected $_PMD_ID = NULL;
	/** Payment Method Type @var PMD_type*/ 
	protected $_PMD_type = NULL;
	/** Name @var PMD_name*/ 
	protected $_PMD_name = NULL;
	/** Description @var PMD_desc*/ 
	protected $_PMD_desc = NULL;
	/** Slug @var PMD_slug*/ 
	protected $_PMD_slug = NULL;
	/** Order @var PMD_order*/ 
	protected $_PMD_order = NULL;
	/** Surcharge Price @var PRC_ID*/ 
	protected $_PRC_ID = NULL;
	/** Debug Mode On? @var PMD_debug_model*/ 
	protected $_PMD_debug_model = NULL;
	/** Logging On? @var PMD_logging*/ 
	protected $_PMD_logging = NULL;
	/** User ID @var PMD_wp_user_id*/ 
	protected $_PMD_wp_user_id = NULL;
	/** Open by Default? @var PMD_open_by_default*/ 
	protected $_PMD_open_by_default = NULL;
	/** Active? @var PMD_active*/ 
	protected $_PMD_active = NULL;
	/** Button URL @var PMD_button_url*/ 
	protected $_PMD_button_url = NULL;
	/** Preferred Currency @var PMD_preferred_currency*/ 
	protected $_PMD_preferred_currency = NULL;





	/**
	 * 
	 * @param type $props_n_values
	 * @return EE_Payment_Method
	 */
	public static function new_instance( $props_n_values = array()) {
		$classname = __CLASS__;
		$has_object = parent::_check_for_object( $props_n_values, $classname, $timezone );
		$classname = self::_payment_method_type($props_n_values);
		return $has_object ? $has_object : new $classname( $props_n_values, FALSE, $timezone );
	}

	
	public static function new_instance_from_db ( $props_n_values = array(), $timezone = NULL ) {
		$classname = self::_payment_method_type($props_n_values);
		return new $classname( $props_n_values, TRUE, $timezone );
	}
	/**
	 * Checks if there is a payment method class of the given 'PMD_type', and if so returns the classname.
	 * Otherwise returns a normal EE_Payment_Method
	 * @param array $props_n_values where 'PMD_type' is a gateway name like 'Paypal_Standard','Invoice',etc (basically
	 * the classname minus 'EEPM_')
	 * @return string
	 */
	private static function _payment_method_type($props_n_values){
		$type_string = isset($props_n_values['PMD_type']) ? 'EEPM_'.$props_n_values['PMD_type'] : NULL;
		if(class_exists($type_string)){
			return $type_string;
		}else{
			return __CLASS__;
		}
	}

	/**
	 * Gets active
	 * @return boolean
	 */
	function active() {
		return $this->get('PMD_active');
	}

	/**
	 * Sets active
	 * @param boolean $active
	 * @return boolean
	 */
	function set_active($active) {
		return $this->set('PMD_active', $active);
	}
	/**
	 * Gets button_url
	 * @return string
	 */
	function button_url() {
		return $this->get('PMD_button_url');
	}

	/**
	 * Sets button_url
	 * @param string $button_url
	 * @return boolean
	 */
	function set_button_url($button_url) {
		return $this->set('PMD_button_url', $button_url);
	}
	/**
	 * Gets debug_mode
	 * @return boolean
	 */
	function debug_mode() {
		return $this->get('PMD_debug_mode');
	}

	/**
	 * Sets debug_mode
	 * @param boolean $debug_mode
	 * @return boolean
	 */
	function set_debug_mode($debug_mode) {
		return $this->set('PMD_debug_mode', $debug_mode);
	}
	/**
	 * Gets description
	 * @return string
	 */
	function description() {
		return $this->get('PMD_desc');
	}

	/**
	 * Sets description
	 * @param string $description
	 * @return boolean
	 */
	function set_description($description) {
		return $this->set('PMD_desc', $description);
	}
	/**
	 * Gets logging
	 * @return boolean
	 */
	function logging() {
		return $this->get('PMD_logging');
	}

	/**
	 * Sets logging
	 * @param boolean $logging
	 * @return boolean
	 */
	function set_logging($logging) {
		return $this->set('PMD_logging', $logging);
	}
	/**
	 * Gets name
	 * @return string
	 */
	function name() {
		return $this->get('PMD_name');
	}

	/**
	 * Sets name
	 * @param string $name
	 * @return boolean
	 */
	function set_name($name) {
		return $this->set('PMD_name', $name);
	}
	/**
	 * Gets open_by_default
	 * @return boolean
	 */
	function open_by_default() {
		return $this->get('PMD_open_by_default');
	}

	/**
	 * Sets open_by_default
	 * @param boolean $open_by_default
	 * @return boolean
	 */
	function set_open_by_default($open_by_default) {
		return $this->set('PMD_open_by_default', $open_by_default);
	}
	/**
	 * Gets order
	 * @return int
	 */
	function order() {
		return $this->get('PMD_order');
	}

	/**
	 * Sets order
	 * @param int $order
	 * @return boolean
	 */
	function set_order($order) {
		return $this->set('PMD_order', $order);
	}
	/**
	 * Gets preferred_currency
	 * @return string
	 */
	function preferred_currency() {
		return $this->get('PMD_preferred_currency');
	}

	/**
	 * Sets preferred_currency
	 * @param string $preferred_currency
	 * @return boolean
	 */
	function set_preferred_currency($preferred_currency) {
		return $this->set('PMD_preferred_currency', $preferred_currency);
	}
	/**
	 * Gets slug
	 * @return string
	 */
	function slug() {
		return $this->get('PMD_slug');
	}

	/**
	 * Sets slug
	 * @param string $slug
	 * @return boolean
	 */
	function set_slug($slug) {
		return $this->set('PMD_slug', $slug);
	}
	/**
	 * Gets type
	 * @return string
	 */
	function type() {
		return $this->get('PMD_type');
	}

	/**
	 * Sets type
	 * @param string $type
	 * @return boolean
	 */
	function set_type($type) {
		return $this->set('PMD_type', $type);
	}
	/**
	 * Gets wp_user_id
	 * @return int
	 */
	function wp_user_id() {
		return $this->get('PMD_wp_user_id');
	}

	/**
	 * Sets wp_user_id
	 * @param int $wp_user_id
	 * @return boolean
	 */
	function set_wp_user_id($wp_user_id) {
		return $this->set('PMD_wp_user_id', $wp_user_id);
	}

}