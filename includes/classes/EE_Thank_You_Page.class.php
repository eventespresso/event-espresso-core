<?php

class EE_Thank_You_Page{
	// instance of the EE_Single_Page_Checkout object
	private static $_instance = NULL;
	
	/**
	 * 		@singleton method used to instantiate class object
	 * 		@access public
	 * 		@return class instance
	 */
	public static function instance() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
// check if class object is instantiated
		if (self::$_instance === NULL or !is_object(self::$_instance) or !is_a(self::$_instance, __CLASS__)) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	
	protected function __construct(){
		echo "GET:";var_dump($_GET);
		echo "POST:";var_dump($_POST);
	}
}