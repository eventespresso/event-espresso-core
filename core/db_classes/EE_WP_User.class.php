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
 * EE_WP_User class
 *
 * @package 			Event Espresso
 * @subpackage 	includes/classes/EE_WP_User.class.php
 * @author 				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_WP_User extends EE_Base_Class {

	/**
	 *
	 * @var WP_User
	 */
	protected $_wp_user_obj;

	/**
	 * @param array $props_n_values
	 * @return EE_WP_User|mixed
	 */
	public static function new_instance( $props_n_values = array() ) {
		$has_object = parent::_check_for_object( $props_n_values, __CLASS__ );
		return $has_object ? $has_object : new self( $props_n_values );
	}



	/**
	 * @param array $props_n_values
	 * @return EE_WP_User
	 */
	public static function new_instance_from_db( $props_n_values = array() ) {
		return new self( $props_n_values, TRUE );
	}

	/**
	 * Return a normal WP_User object (caches the object for future calls)
	 * @return WP_User
	 */
	public function wp_user_obj() {
		if( ! $this->_wp_user_obj ) {
			$this->_wp_user_obj = get_user_by('ID', $this->ID() );
		}
		return $this->_wp_user_obj;
	}
}

/* End of file EE_Answer.class.php */
/* Location: /includes/classes/EE_Answer.class.php */