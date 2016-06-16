<?php if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package 		Event Espresso
 * @ author 		Event Espresso
 * @ copyright 	(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license 		{@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link 				{@link http://www.eventespresso.com}
 * @ since 			4.0
 *
 */



/**
 * EE_Price class
 *
 * @package 			Event Espresso
 * @subpackage 	includes/classes/EE_Price.class.php
 * @author             Mike Nelson
 */
class EE_Price extends EE_Soft_Delete_Base_Class {

	/**
	 *
	 * @param array $props_n_values  incoming values
	 * @param string $timezone  incoming timezone (if not set the timezone set for the website will be
	 *                          		used.)
	 * @param array $date_formats  incoming date_formats in an array where the first value is the
	 *                             		    date_format and the second value is the time format
	 * @return EE_Attendee
	 */
	public static function new_instance( $props_n_values = array(), $timezone = null, $date_formats = array() ) {
		$has_object = parent::_check_for_object( $props_n_values, __CLASS__, $timezone, $date_formats );
		return $has_object ? $has_object : new self( $props_n_values, false, $timezone, $date_formats );
	}



	/**
	 * @param array $props_n_values  incoming values from the database
	 * @param string $timezone  incoming timezone as set by the model.  If not set the timezone for
	 *                          		the website will be used.
	 * @return EE_Attendee
	 */
	public static function new_instance_from_db( $props_n_values = array(), $timezone = null ) {
		return new self( $props_n_values, TRUE, $timezone );
	}



	/**
	 *        Set Price type ID
	 *
	 * @access        public
	 * @param        int $PRT_ID
	 */
	public function set_type( $PRT_ID = 0 ) {
		$this->set( 'PRT_ID', $PRT_ID );
	}



	/**
	 *        Set Price Amount
	 *
	 * @access        public
	 * @param        float $PRC_amount
	 */
	public function set_amount( $PRC_amount = 0.00 ) {
		$this->set( 'PRC_amount', $PRC_amount );
	}



	/**
	 *        Set Price Name
	 *
	 * @access        public
	 * @param        string $PRC_name
	 */
	public function set_name( $PRC_name = '' ) {
		$this->set( 'PRC_name', $PRC_name );
	}



	/**
	 *        Set Price Description
	 *
	 * @access        public
	 * @param        string $PRC_desc
	 */
	public function set_description( $PRC_desc = '' ) {
		$this->Set( 'PRC_desc', $PRC_desc );
	}



	/**
	*		set is_default
	*
	* 		@access		public
	*		@param		bool		$PRC_is_default
	*/
	public function set_is_default( $PRC_is_default = FALSE ) {
		$this->set( 'PRC_is_default', $PRC_is_default );
	}



	/**
	*		set deleted
	*
	* 		@access		public
	*		@param		bool		$PRC_deleted
	*/
	public function set_deleted( $PRC_deleted = NULL ) {
		$this->set( 'PRC_deleted', $PRC_deleted );
	}



	/**
	 *    get Price type
	 * @access        public
	 * @return        int
	 */
	public function type() {
		return $this->get( 'PRT_ID' );
	}



	/**
	 *    get Price Amount
	 * @access        public
	 * @return        float
	 */
	public function amount() {
		return $this->get( 'PRC_amount' );
	}



	/**
	 *    get Price Name
	 * @access        public
	 * @return        string
	 */
	public function name() {
		return $this->get( 'PRC_name' );
	}



	/**
	 *    get Price description
	 * @access        public
	 * @return        string
	 */
	public function desc() {
		return $this->get( 'PRC_desc' );
	}



	/**
	 *    get overrides
	 * @access        public
	 * @return        int
	 */
	public function overrides() {
		return $this->get( 'PRC_overrides' );
	}



	/**
	 *    get order
	 * @access        public
	 * @return        int
	 */
	public function order() {
		return $this->get( 'PRC_order' );
	}



	/**
	 * get the author of the price
	 *
	 * @since 4.5.0
	 *
	 * @return int
	 */
	public function wp_user() {
		return $this->get('PRC_wp_user');
	}



	/**
	 *    get is_default
	 * @access        public
	 * @return        bool
	 */
	public function is_default() {
		return $this->get( 'PRC_is_default' );
	}



	/**
	 *    get deleted
	 * @access        public
	 * @return        bool
	 */
	public function deleted() {
		return $this->get( 'PRC_deleted' );
	}



	/**
	 * @return bool
	 */
	public function parent() {
		return $this->get( 'PRC_parent' );
	}


	//some helper methods for getting info on the price_type for this price

	/**
	 * return whether the price is a base price or not
	 * @return boolean
	 */
	public function is_base_price() {
		$price_type = $this->type_obj();
		return $price_type->base_type() === 1;
	}



	/**
	 *
	 * @return EE_Price_Type
	 */
	public function type_obj() {
		return $this->get_first_related( 'Price_Type' );
	}



	/**
	 * Simply indicates whether this price increases or decreases the total
	 * @return boolean true = discount, otherwise adds to the total
	 */
	public function is_discount() {
		$price_type = $this->type_obj();
		return $price_type->is_discount();
	}



	/**
	 * whether the price is a percentage or not
	 * @return boolean
	 */
	public function is_percent() {
		$price_type = $this->type_obj();
		return $price_type->get( 'PRT_is_percent' );
	}


	/**
	 * return pretty price dependant on whether its a dollar or percent.
	 *
	 * @since 4.4.0
	 *
	 * @return string
	 */
	public function pretty_price() {
		return ! $this->is_percent() ? $this->get_pretty('PRC_amount') : $this->get('PRC_amount') . '%';
	}



	/**
	 * @return mixed
	 */
	public function get_price_without_currency_symbol() {
		return str_replace( EE_Registry::instance()->CFG->currency->sign, '', $this->get_pretty( 'PRC_amount' ) );
	}
}

/* End of file EE_Price.class.php */
/* Location: /includes/classes/EE_Price.class.php */
