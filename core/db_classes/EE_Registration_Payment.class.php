<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Class EE_Registration_Payment
 *
 * Description
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Brent Christensen
 * @since 				4.7.0
 *
 */

class EE_Registration_Payment extends EE_Base_Class {

	/**
	 *
	 * @param array $props_n_values
	 * @param string $timezone
	 * @return EE_Registration_Payment
	 */
	public static function new_instance( $props_n_values = array(), $timezone = '' ) {
		$has_object = parent::_check_for_object( $props_n_values, __CLASS__ );
		return $has_object ? $has_object : new self( $props_n_values, false, $timezone );
	}



	/**
	 * @param array $props_n_values
	 * @param string $timezone
	 * @return EE_Registration_Payment
	 */
	public static function new_instance_from_db( $props_n_values = array(), $timezone = '' ) {
		return new self( $props_n_values, true, $timezone );
	}



	/**
	 * amount
	 * @access 	public
	 * @return 	float
	 */
	public function amount() {
		return $this->get( 'RPY_amount' );
	}



}
// End of file EE_Registration_Payment.class.php
// Location: /EE_Registration_Payment.class.php