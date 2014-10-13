<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 *
 * Class EE_Payment_Method_Manager
 *
 * Used for finding all payment method types that can be defined.
 * Allows addons to easily add other payment methods
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Michael Nelson
 * @since 				$VID:$
 *
 */
class EE_Payment_Method_Manager {
	/**
	 * 	instance of the EE_Payment_Method_Manager object
	 *	@var 	$_instance
	 * 	@access 	private
	 */
	private static $_instance = NULL;
	/**
	 * @var array keys are classnames without 'EE_PMT_', values are their filepaths
	 */
	protected $_payment_method_types = array();
	/**
	 *		@singleton method used to instantiate class object
	 *		@access public
	 *		@return EE_Payment_Method_Manager instance
	 */
	public static function instance() {
		// check if class object is instantiated, and instantiated properly
		if ( self::$_instance === NULL  or ! is_object( self::$_instance ) or ! ( self::$_instance instanceof EE_Payment_Method_Manager )) {
			self::$_instance = new self();
		}
		EE_Registry::instance()->load_lib('PMT_Base');
		return self::$_instance;
	}

	/**
	 * Resets the instance and returns a new one
	 * @return EE_Payment_Method_Manager
	 */
	public static function reset(){
		self::$_instance = NULL;
		return self::instance();
	}

	/**
	 * If necessary, re-register payment methods
	 * @param boolean $force_recheck whether to recheck for payment method types,
	 * or just re-use the PMTs we found last time we checked during this request (if
	 * we have not yet checked during this request, then we need to check anyways)
	 */
	protected function _maybe_register_payment_methods( $force_recheck = FALSE ){
		if( ! $this->_payment_method_types || $force_recheck ){
			$this->register_payment_methods();
		}
	}

	/**
	 * 		register_payment_methods
	 *
	 * 		@return array
	 */
	function register_payment_methods() {
		// grab list of installed modules
		$pm_to_register = glob( EE_PAYMENT_METHODS . '*', GLOB_ONLYDIR );
		// filter list of modules to register
		$pm_to_register = apply_filters( 'FHEE__EE_Payment_Method_Manager__register_payment_methods__payment_methods_to_register', $pm_to_register );
		// loop through folders
		foreach ( $pm_to_register as $pm_path ) {
				$this->register_payment_method( $pm_path );
		}
		// filter list of installed modules
		return apply_filters( 'FHEE__EE_Payment_Method_Manager__register_payment_methods__installed_payment_methods', $this->_payment_method_types );
	}



	/**
	 *    register_payment_method- makes core aware of this payment method
	 *
	 * @access public
	 * @param string $payment_method_path - full path up to and including payment method folder
	 * @return boolean
	 */
	public function register_payment_method( $payment_method_path = '' ) {
		do_action( 'AHEE__EE_Payment_Method_Manager__register_payment_method__begin',$payment_method_path );
		$module_ext = '.pm.php';
		// make all separators match
		$payment_method_path = rtrim( str_replace( '/\\', DS, $payment_method_path ), DS );
		// grab and sanitize module name
		$module_dir = basename( $payment_method_path );
		// create classname from module directory name
		$module = str_replace( ' ', '_', ucwords( str_replace( '_', ' ', $module_dir )));
		// add class prefix
		$module_class = 'EE_PMT_' . $module;
		// does the module exist ?
		if ( ! is_readable( $payment_method_path . DS . $module_class . $module_ext )) {
			$msg = sprintf( __( 'The requested %s payment method file could not be found or is not readable due to file permissions.', 'event_espresso' ), $module );
			EE_Error::add_error( $msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		if ( WP_DEBUG === TRUE ) { EEH_Debug_Tools::instance()->start_timer(); }
		// load the module class file
		require_once( $payment_method_path . DS . $module_class . $module_ext );
		if ( WP_DEBUG === TRUE ) { EEH_Debug_Tools::instance()->stop_timer("Requiring payment method $module_class"); }
		// verify that class exists
		if ( ! class_exists( $module_class )) {
			$msg = sprintf( __( 'The requested %s module class does not exist.', 'event_espresso' ), $module_class );
			EE_Error::add_error( $msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		// add to array of registered modules
		$this->_payment_method_types[ $module ] = $payment_method_path . DS . $module_class . $module_ext;
		return TRUE;
	}
	/**
	 * Checks if a payment method has been registered, and if so includes it
	 * @param string $payment_method_name like 'Paypal_Pro', (ie classname without the prefix 'EEPM_')
	 * @param boolean $force_recheck whether to force re-checking for new payment method types
	 * @return boolean
	 */
	public function payment_method_type_exists($payment_method_name, $force_recheck = FALSE){
		$this->_maybe_register_payment_methods($force_recheck);
		if(isset($this->_payment_method_types[$payment_method_name])){
			require_once($this->_payment_method_types[$payment_method_name]);
			return true;
		}else{
			return false;
		}
	}
	/**
	 * Returns all the classnames of the various payment method types
	 * @param boolean $with_prefixes TRUE: get payment method type classnames; false just their 'names'
	 * (what you'd find in wp_esp_payment_method.PMD_type)
	 * @param boolean $force_recheck whether to force re-checking for new payment method types
	 * @return array
	 */
	public function payment_method_type_names($with_prefixes = FALSE, $force_recheck = FALSE ){
		$this->_maybe_register_payment_methods($force_recheck);
		if($with_prefixes){
			$classnames = array_keys($this->_payment_method_types);
			$payment_methods = array();
			foreach($classnames as $classname){
				$payment_methods[] = $this->payment_method_class_from_type($classname);
			}
			return $payment_methods;
		}else{
			return array_keys($this->_payment_method_types);
		}
	}
	/**
	 * Gets an object of each payment method type, none of which are bound to a
	 * payment method instance
	 * @param boolean $force_recheck whether to force re-checking for new payment method types
	 * @return EE_PMT_Base[]
	 */
	public function payment_method_types( $force_recheck = FALSE ){
		$this->_maybe_register_payment_methods($force_recheck);
		$pmt_objs = array();
		foreach($this->payment_method_type_names(true) as $classname){
			$pmt_objs[] = new $classname;
		}
		return $pmt_objs;
	}

	/**
	 * Changes the payment method's classname into the payment method type's name
	 * (as used on the payment method's table's PMD_type field)
	 * @param string $classname
	 * @return string
	 */
	public function payment_method_type_sans_class_prefix($classname){
		$pmt_name = str_replace("EE_PMT_","",$classname);
		return $pmt_name;
	}

	/**
	 * Does the opposite of payment-method_type_sans_prefix
	 * @param string $type
	 * @return string
	 */
	public function payment_method_class_from_type($type){
		return "EE_PMT_".$type;
	}



}