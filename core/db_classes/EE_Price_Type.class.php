<?php if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package        Event Espresso
 * @ author        Event Espresso
 * @ copyright    (c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license        {@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link                {@link http://www.eventespresso.com}
 * @ since            4.0
 *
 */





/**
 * EE_Price_Type class
 *
 * @package 			Event Espresso
 * @subpackage 	includes/classes/EE_Price_Type.class.php
 * @author 				Mike Nelson
 */
class EE_Price_Type extends EE_Soft_Delete_Base_Class {

	/**
	 * @param array $props_n_values
	 * @return EE_Price_Type
	 */
	public static function new_instance( $props_n_values = array() ) {
		$has_object = parent::_check_for_object( $props_n_values, __CLASS__ );
		return $has_object ? $has_object : new self( $props_n_values );
	}



	/**
	 * @param array $props_n_values
	 * @return EE_Price_Type
	 */
	public static function new_instance_from_db( $props_n_values = array() ) {
		return new self( $props_n_values, TRUE );
	}



	/**
	 *        Set Price Type Name
	 *
	 * @access        public
	 * @param        string $PRT_name
	 */
	public function set_name( $PRT_name = '' ) {
		$this->set( 'PRT_name', $PRT_name );
	}



	/**
	 *        Set Price Type a percent
	 *
	 * @access        public
	 * @param        bool $PRT_is_percent
	 */
	public function set_is_percent( $PRT_is_percent = FALSE ) {
		$this->set( 'PRT_is_percent', $PRT_is_percent );
	}



	/**
	 *        Set Price Type order
	 *
	 * @access        public
	 * @param        int $PRT_order
	 */
	public function set_order( $PRT_order = 0 ) {
		$this->set( 'PRT_order', $PRT_order );
	}



	/**
	 *
	 */
	public function move_to_trash() {
		$this->set( 'PRT_deleted', TRUE );
	}



	/**
	 *
	 */
	public function restore_from_trash() {
		$this->set( 'PRT_deleted', FALSE );
	}



	/**
	 *        get Price Type Name
	 * @access        public
	 */
	public function name() {
		return $this->get( 'PRT_name' );
	}



	/**
	 *        get is Price Type a discount?
	 * @access        public
	 */
	public function base_type() {
		return $this->get( 'PBT_ID' );
	}



	/**
	 * @return mixed
	 */
	public function base_type_name() {
		return $this->get_pretty( 'PBT_ID' );
	}



	/**
	 *        get is Price Type a percent?
	 * @access        public
	 */
	public function is_percent() {
		return $this->get( 'PRT_is_percent' );
	}



	/**
	 * @return bool
	 */
	public function is_discount() {
		return $this->get( 'PBT_ID' ) == 2 ? TRUE : FALSE;
	}



	/**
	 * get the author of the price type.
	 *
	 * @since 4.5.0
	 *
	 * @return int
	 */
	public function wp_user() {
		return $this->get('PRT_wp_user');
	}



	/**
	 *        get Price Type order
	 * @access        public
	 */
	public function order() {
		return $this->get( 'PRT_order' );
	}



	/**
	 *        get  is Price Type deleted ?
	 * @access        public
	 */
	public function deleted() {
		return $this->get( 'PRT_deleted' );
	}
}

/* End of file EE_Price_Type.class.php */
/* Location: /includes/classes/EE_Price_Type.class.php */
