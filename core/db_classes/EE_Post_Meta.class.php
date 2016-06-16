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
 * EE_Post_Meta class
 *
 * @package 			Event Espresso
 * @subpackage 	includes/classes/EE_Answer.class.php
 * @author 				Mike Nelson
 */
class EE_Post_Meta extends EE_Base_Class {

	/**
	 * @param array $props_n_values
	 * @return EE_Post_Meta|mixed
	 */
	public static function new_instance( $props_n_values = array() ) {
		$has_object = parent::_check_for_object( $props_n_values, __CLASS__ );
		return $has_object ? $has_object : new self( $props_n_values );
	}



	/**
	 * @param array $props_n_values
	 * @return EE_Post_Meta
	 */
	public static function new_instance_from_db( $props_n_values = array() ) {
		return new self( $props_n_values, TRUE );
	}



	/**
	 * Gets meta_id
	 * @return int
	 */
	function meta_id() {
		return $this->get( 'meta_id' );
	}



	/**
	 * Sets meta_id
	 * @param int $meta_id
	 * @return boolean
	 */
	function set_meta_id( $meta_id) {
		return $this->set( 'meta_id', $meta_id);
	}
	/**
	 * Gets post_id
	 * @return int
	 */
	function post_id() {
		return $this->get( 'post_id' );
	}



	/**
	 * Sets post_id
	 * @param int $post_id
	 * @return boolean
	 */
	function set_post_id( $post_id) {
		return $this->set( 'post_id', $post_id);
	}
	/**
	 * Gets meta_key
	 * @return string
	 */
	function meta_key() {
		return $this->get( 'meta_key' );
	}



	/**
	 * Sets meta_key
	 * @param string $meta_key
	 * @return boolean
	 */
	function set_meta_key( $meta_key) {
		return $this->set( 'meta_key', $meta_key);
	}
	/**
	 * Gets meta_value
	 * @return mixed
	 */
	function meta_value() {
		return $this->get( 'meta_value' );
	}



	/**
	 * Sets meta_value
	 * @param mixed $meta_value
	 * @return boolean
	 */
	function set_meta_value( $meta_value) {
		return $this->set( 'meta_value', $meta_value);
	}






}
/* End of file EE_Post_Meta.class.php */
/* Location: /includes/classes/EE_Answer.class.php */