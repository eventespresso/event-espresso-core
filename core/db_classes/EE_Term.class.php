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
class EE_Term extends EE_Base_Class{

	/**
	 * Sets some dynamic defaults
	 * @param type $fieldValues
	 * @param type $bydb
	 * @param type $timezone
	 */
	protected function __construct($fieldValues=null, $bydb = FALSE, $timezone = NULL ){
		if( ! isset($fieldValues['slug'])){
			$fieldValues['slug'] = $fieldValues['name'];
		}
		parent::__construct($fieldValues,$bydb,$timezone);
	}


	public static function new_instance( $props_n_values = array() ) {
		$classname = __CLASS__;
		$has_object = parent::_check_for_object( $props_n_values, $classname );
		return $has_object ? $has_object : new self( $props_n_values);
	}


	public static function new_instance_from_db ( $props_n_values = array() ) {
		return new self( $props_n_values, TRUE );
	}

	/**
	 * Gets name
	 * @return string
	 */
	function name() {
		return $this->get('name');
	}

	/**
	 * Sets name
	 * @param string $name
	 * @return boolean
	 */
	function set_name($name) {
		return $this->set('name', $name);
	}
	/**
	 * Gets slug
	 * @return string
	 */
	function slug() {
		return $this->get('slug');
	}

	/**
	 * Sets slug
	 * @param string $slug
	 * @return boolean
	 */
	function set_slug($slug) {
		return $this->set('slug', $slug);
	}


}

/* End of file EE_Answer.class.php */
/* Location: /includes/classes/EE_Answer.class.php */