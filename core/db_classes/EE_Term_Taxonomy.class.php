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
	 * Event related to this term_taxonomy via the term_relation model
	 * @var EE_Event
	 */
	protected $_Event;

	/**
	 * Venue related to this term_taxonomy via the term_relation model.
	 * 
	 * @var EE_Venue
	 */
	protected $_Venue;

	/**
	 * Attendee related to this term_taxonomy via the term_relation model.
	 * 
	 * @var EE_Attendee
	 */
	protected $_Attendee;


	public static function new_instance( $props_n_values = array() ) {
		$classname = __CLASS__;
		$has_object = parent::_check_for_object( $props_n_values, $classname );
		return $has_object ? $has_object : new self( $props_n_values);
	}


	public static function new_instance_from_db ( $props_n_values = array() ) {
		return new self( $props_n_values, TRUE );
	}
	/**
	 * Gets taxonomy
	 * @return string
	 */
	function taxonomy() {
		return $this->get('taxonomy');
	}

	/**
	 * Sets taxonomy
	 * @param string $taxonomy
	 * @return boolean
	 */
	function set_taxonomy($taxonomy) {
		return $this->set('taxonomy', $taxonomy);
	}
	/**
	 * Gets term_count
	 * @return int
	 */
	function count() {
		return $this->get('term_count');
	}

	/**
	 * Sets term_count
	 * @param int $term_count
	 * @return boolean
	 */
	function set_count($term_count) {
		return $this->set('term_count', $term_count);
	}
	/**
	 * Gets the term for this term taxnomy
	 * @return EE_Term
	 */
	function term(){
		return $this->get_first_related('Term');
	}



}

/* End of file EE_Answer.class.php */
/* Location: /includes/classes/EE_Answer.class.php */