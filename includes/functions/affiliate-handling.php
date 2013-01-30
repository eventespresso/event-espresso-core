<?php
/**
 * This file just prints whatever code was entered in in the payment-gateway#affiliate-handling settings.
 */

if ( !class_exists('espresso_Affiliate_handling' ) ) {
class espresso_Affiliate_handling {

	public $settings = array(); //holds the settings from the affiliate settings on payment-gateway settings page in admin

	function __construct() {
		global $espresso_wp_user;
		$payment_settings = get_option('payment_data_' . $espresso_wp_user);
		$this->settings = isset($payment_settings['affiliate']) ? $payment_settings['affiliate'] : null;
		if ( !empty($this->settings) )
			$this->hook_into_wp();
	}

	function hook_into_wp() {
		foreach ( $this->settings['hook_into'] as $hook_where ) {
			switch ( $hook_where ) {
				case 'header' :
					add_action('wp_head', array(&$this, 'print_aff') );
					break;
				case 'purchase_confirmation' :
					add_action('action_hook_espresso_reg_completed', array(&$this, 'print_aff') );
					break;
				case 'footer' :
					add_action('wp_footer', array(&$this, 'print_aff'));
			}
		}
	}

	function print_aff() {
		echo stripslashes($this->settings['script']);
	}
} //end class execution.
}// end class check.

$affiliate_handling = new espresso_Affiliate_handling();