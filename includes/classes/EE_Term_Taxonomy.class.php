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
require_once ( 'EE_Base_Class.class.php' );
class EE_Term_Taxonomy extends EE_Base_Class{
	
	/**
	 * primary key for this relationship table
	 * 
	 * @access protected
	 * @var int
	 */
	protected $_term_taxonomy_id;
	/**
	 * foreign key to term-only table
	 * @var int
	 */
	protected $_term_id;
	
	/**
	 * name of taxonomy
	 * @var string
	 */
	protected $_taxonomy;
	/**
	 * description of term in context of the taxonomy
	 * @var string
	 */
	protected $_description;
	/**
	 * parent term in context of taxonomy
	 * @var int
	 */
	protected $_parent;


	/**
	 * count of objects this term is attached to
	 * @var int
	 */
	protected $_term_count;


	/**
	 * Join model between terms-in-context and posts
	 * @access protected
	 * @var EE_Term_Relationship[]
	 */
	protected $_Term_Relationship;
	/**
	 * RElated term
	 * @var EE_Term
	 */
	protected $_Term;
	/**
	 * Event related to this term_taxonomy via teh term_relation model
	 * @var EE_Event
	 */
	protected $_Event;


	/**
	 * Venue related to this term_taxonomy via the term_relation model.
	 * 
	 * @var EE_Venue
	 */
	protected $_Venue;


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