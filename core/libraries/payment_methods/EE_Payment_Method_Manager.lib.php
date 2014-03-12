<?php

/*
 * Used for finding all payment method types that can be defined. Allows addons
 * to easily add other payment methods
 */
class EE_Payment_Method_Manager {
	/**
	 * 	instance of the EE_Payment_Method_Manager object
	 *	@var 	$_instance
	 * 	@access 	private
	 */
	private static $_instance = NULL;
	/**
	 * @var array keys are classnames without 'EEPM_', values are their filepaths
	 */
	protected $_payment_method_types = array();
	
	/**
	 *
	 * @var array whose valusa re payment method 
	 */
	protected $_included_payment_method_types = array();
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
		return self::$_instance;
	}
	
	/**
	 * 		_register_modules
	 *
	 * 		@access private
	 * 		@return void
	 */
	function register_payment_methods() {
		// grab list of installed modules
		$pm_to_register = glob( EE_PAYMENT_METHODS . '*', GLOB_ONLYDIR );
		// filter list of modules to register
		$pm_to_register = apply_filters( 'FHEE__EE_Payment_Method_Manager__register_payment_methods__modules_to_register', $pm_to_register );
		// loop through folders
		foreach ( $pm_to_register as $pm_path ) {
				$this->register_payment_method( $pm_path );
		}
		// filter list of installed modules
		return apply_filters( 'FHEE__EE_Payment_Method_Manager__register_payment_methods__installed_payment_methods', EE_Registry::instance()->payment_methods );
	}
	/**
	 * 	register_payment_method- makes core aware of this paymetn method
	 *
	 *  @access 	public
	 *  @param 	string 		$$payment_method_path - full path up to and including payment method folder
	 *  @return 	void
	 */
	public function register_payment_method( $payment_method_path = NULL ) {
		do_action( 'AHEE__EE_Payment_Method_Manager__register_payment_method__begin',$payment_method_path );
		$module_ext = '.pm.php';
		// make all separators match
		$payment_method_path = rtrim( str_replace( '/\\', DS, $payment_method_path ), DS );
		// grab and sanitize module name
		$module_dir = basename( $payment_method_path );
		// create classname from module directory name
		$module = str_replace( ' ', '_', ucwords( str_replace( '_', ' ', $module_dir )));
		// add class prefix
		$module_class = 'EEPM_' . $module;
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
		// verfiy that class exists
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
	 * Checks if a paymetn method has been registered, and if so includes it
	 * @param string $payment_method_name like 'Paypal_Pro', (ie classname without the prefix 'EEPM_')
	 * @return boolean
	 */
	public function payment_method_exists($payment_method_name){
		if( ! $this->_payment_method_types){
			$this->register_payment_methods();
		}
		d($this->_payment_method_types);
		if(isset($this->_payment_method_types[$payment_method_name])){
			require_once($this->_payment_method_types[$payment_method_name]);
			return true;
		}else{
			return false;
		}
	}
}