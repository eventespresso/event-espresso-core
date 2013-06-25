<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			{@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link					{@link http://www.eventespresso.com}
 * @ since		 		4.0
 *
 * ------------------------------------------------------------------------
 *
 * EE_Answer class
 *
 * @package			Event Espresso
 * @subpackage		includes/classes/EE_Answer.class.php
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
require_once ( EE_CLASSES . 'EE_Base_Class.class.php' );
class EE_Term_Relationship extends EE_Base_Class{
	
	/**
	 * object/post id
	 * 
	 * @access protected
	 * @var int
	 */
	protected $_object_id=FALSE;
	
	/**
	 * term Id (in context of a taxonomy)
	 * @access protected
	 * @var int 
	 */
	protected $_term_taxonomy_id=NULL;
	
	/**
	 * The order of the term? doesnt seem to get used much...
	 * @access protected
	 * @var int
	 */
	protected $_term_order=NULL;

	/**
	 * Related event, lazy-loaded
	 * @access protected
	 * @var EE_Event 
	 */
	protected $_Event;
	
	/**
	 * Related venue
	 * @var EE_Venue
	 */
	protected $_Venue;
	/**
	 * Related term in context of a taxonomy, lazy-loaded
	 * @access protected
	 * @var EE_Term_Taxonomy 
	 */
	protected $_Term_Taxonomy;




	public static function new_instance( $props_n_values = array() ) {
		$classname = __CLASS__;
		$has_object = parent::_check_for_object( $props_n_values, $classname );
		return $has_object ? $has_object : new self( $props_n_values);
	}


	public static function new_instance_from_db ( $props_n_values = array() ) {
		return new self( $props_n_values, TRUE );
	}

}

/* End of file EE_Answer.class.php */
/* Location: /includes/classes/EE_Answer.class.php */