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
 * EE_Term_Relationship class
 *
 * @package 			Event Espresso
 * @subpackage 	includes/classes/EE_Term_Relationship.class.php
 * @author 				Mike Nelson
 */
class EE_Term_Relationship extends EE_Base_Class {

	/**
	 * @param array $props_n_values
	 * @return EE_Term_Relationship
	 */
	public static function new_instance( $props_n_values = array() ) {
		$has_object = parent::_check_for_object( $props_n_values, __CLASS__ );
		return $has_object ? $has_object : new self( $props_n_values );
	}



	/**
	 * @param array $props_n_values
	 * @return EE_Term_Relationship
	 */
	public static function new_instance_from_db( $props_n_values = array() ) {
		return new self( $props_n_values, TRUE );
	}



}

/* End of file EE_Term_Relationship.class.php */
/* Location: /includes/classes/EE_Term_Relationship.class.php */