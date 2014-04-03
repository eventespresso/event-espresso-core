<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.3
 *
 * ------------------------------------------------------------------------
 *
 * EEM_Payment_Log
 * does NOT extend EEM_Base. It's an odd one.
 * This is for adding and retrieiving paymetn log messages (which are stored in the wp_options table
 * using a special option_name to allow fo rlimited searching. If we need more powerful searching
 * in teh future we can make this a full-blown model with its own table etc)
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EEM_Payment_Log {
	const log_transient_key_prefix = 'ee_pm_log_';
	// private instance of the Payment object
	private static $_instance = NULL;
	
	private function __construct() {
		
	}
	/**
	 *		This funtion is a singleton method used to instantiate the EEM_Payment object
	 *
	 *		@access public
	 *		@param string $timezone string representing the timezone we want to set for returned Date Time Strings (and any incoming timezone data that gets saved).  Note this just sends the timezone info to the date time model field objects.  Default is NULL (and will be assumed using the set timezone in the 'timezone_string' wp option)
	 *		@return EEM_Payment instance
	 */	
	public static function instance( ){
	
		// check if instance of EEM_Payment already exists
		if ( self::$_instance === NULL ) {
			// instantiate Espresso_model 
			self::$_instance = new self();
		}
		
		// EEM_Payment object
		return self::$_instance;
	}
	
	/**
	 * Adds this item to the paymetn methods log
	 * @param string $message
	 * @param mixed $transaction ID or object
	 * @param mixed $payment_method payment method ID or objec
	 */
	public function log($message,$transaction = NULL, $payment_method = NULL){
		try{
			$pm_obj = EEM_Payment_Method::instance()->ensure_is_obj($payment_method);
			if($pm_obj && ! $pm_obj->logging()){
				return;	
			}
			$pm = $pm_obj->ID();
		}catch(EE_Error $e){
			$pm = 0;
		}
		try{
			$transaction = EEM_Transaction::instance()->ensure_is_ID($transaction);
		}catch(EE_Error $e){
			$transaction = 0;
		}
		$t = microtime(true);
		$micro = sprintf("%06d",($t - floor($t)) * 1000000);
		add_option(self::log_transient_key_prefix.'/p'.$pm.'/t'.$transaction.'/d'.current_time('mysql').':'.$micro,$message,NULL,false);
	}
}

// End of file EEM_Payment_Log.model.php