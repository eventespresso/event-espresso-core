<?php

/*
 * CLass for detecting all payment method types, loading them, and returning them all.
 */
class EE_Payment_Method_Manager{
	/**
     * 	@var EE_Payment_Method_Manager $_instance
	 * 	@access 	private 	
     */
	private static $_instance = NULL;
	
	/**
	 *@singleton method used to instantiate class object
	 *@access public
	 *@return EE_Payment_Method_Manager instance
	 */	
	public static function instance() {
		// check if class object is instantiated
		if ( self::$_instance === NULL  or ! is_object( self::$_instance ) or ! ( self::$_instance instanceof EE_Data_Migration_Manager )) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}	
	
	/**
	 * Finds all the payment method files and requires them
	 * @return boolean of success
	 */
	public function load_payment_method_types(){
		
	}
	/**
	 * Calls load_payment_Method_types and returns the classnames 
	 * (if you want all the actual payment methods created, use EEM_Payment_Method)
	 */
	public function get_all_payment_method_types(){
		
	}
}
