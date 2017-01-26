<?php if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package            Event Espresso
 * @ author            Seth Shoultes
 * @ copyright        (c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license            {@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link                    {@link http://www.eventespresso.com}
 * @ since                3.2.P
 *
 */



/**
 * EE_Country class
 *
 * @package               Event Espresso
 * @subpackage            includes/classes/EE_Country.class.php
 * @author                Brent Christensen
 */
class EE_Country extends EE_Base_Class {

	/**
	 * @param array $props_n_values
	 * @return EE_Country|mixed
	 */
	public static function new_instance( $props_n_values = array() ) {
		$has_object = parent::_check_for_object( $props_n_values, __CLASS__ );
		return $has_object ? $has_object : new self( $props_n_values );
	}



	/**
	 * @param array $props_n_values
	 * @return EE_Country
	 */
	public static function new_instance_from_db( $props_n_values = array() ) {
		return new self( $props_n_values, TRUE );
	}





	/**
	 * Gets the country name
	 * @return string
	 */
	public function name() {
		return $this->get( 'CNT_name' );
	}



	/**
	 * gets the country's currency code
	 * @return string
	 */
	public function currency_code() {
		return $this->get( 'CNT_cur_code' );
	}



	/**
	 * gets the country's currency sign/symbol
	 * @return string
	 */
	public function currency_sign() {
		$CNT_cur_sign = $this->get( 'CNT_cur_sign' );
		return $CNT_cur_sign ? $CNT_cur_sign : '';
	}



	/**
	 * Currency name singular
	 * @return string
	 */
	public function currency_name_single() {
		return $this->get( 'CNT_cur_single' );
	}



	/**
	 * Currency name plural
	 * @return string
	 */
	public function currency_name_plural() {
		return $this->get( 'CNT_cur_plural' );
	}



	/**
	 * currency_sign_before - ie: $TRUE  or  FALSE$
	 * @return boolean
	 */
	public function currency_sign_before() {
		return $this->get( 'CNT_cur_sign_b4' );
	}



	/**
	 * currency_decimal_places : 2 = 0.00   3 = 0.000
	 * @return integer
	 */
	public function currency_decimal_places() {
		return $this->get( 'CNT_cur_dec_plc' );
	}



	/**
	 * currency_decimal_mark :   (comma) ',' = 0,01   or   (decimal) '.' = 0.01
	 * @return string
	 */
	public function currency_decimal_mark() {
		return $this->get( 'CNT_cur_dec_mrk' );
	}



	/**
	 * currency thousands separator:   (comma) ',' = 1,000   or   (decimal) '.' = 1.000
	 * @return string
	 */
	public function currency_thousands_separator() {
		return $this->get( 'CNT_cur_thsnds' );
	}
}
/* End of file EE_Country.class.php */
/* Location: /includes/classes/EE_Country.class.php */