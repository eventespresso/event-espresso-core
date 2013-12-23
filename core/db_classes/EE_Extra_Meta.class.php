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
 * EE_Extra_Meta class
 *
 * @package			Event Espresso
 * @subpackage		includes/classes/EE_Answer.class.php
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
require_once ( EE_CLASSES . 'EE_Base_Class.class.php' );
class EE_Extra_Meta extends EE_Base_Class{
	/** Extra Meta ID", "event_espresso @var EXM_ID*/ 
	protected $_EXM_ID = NULL;
	/** Primary Key of Attached Thing", "event_espresso @var OBJ_ID*/ 
	protected $_OBJ_ID = NULL;
	/** Model of Attached Thing", "event_espresso @var EXM_type*/ 
	protected $_EXM_type = NULL;
	/** Meta Key", "event_espresso @var EXM_key*/ 
	protected $_EXM_key = NULL;
	/** Meta Value", "event_espresso @var EXM_value*/ 
	protected $_EXM_value = NULL;
				
	
	/**
	 * 
	 * @var EE_Payment 
	 */
	protected $_Payment;
	/**
	 *
	 * @var EE_Transaction
	 */
	protected $_Transaction;
	
	protected $_Term_Taxonomy;


	public static function new_instance( $props_n_values = array() ) {
		$classname = __CLASS__;
		$has_object = parent::_check_for_object( $props_n_values, $classname );
		return $has_object ? $has_object : new self( $props_n_values);
	}


	public static function new_instance_from_db ( $props_n_values = array() ) {
		return new self( $props_n_values, TRUE );
	}

	/**
	 * Gets FK_ID
	 * @return int
	 */
	function FK_ID() {
		return $this->get('FK_ID');
	}

	/**
	 * Sets FK_ID
	 * @param int $FK_ID
	 * @return boolean
	 */
	function set_FK_ID($FK_ID) {
		return $this->set('FK_ID', $FK_ID);
	}
	/**
	 * Gets model
	 * @return string
	 */
	function model() {
		return $this->get('EXM_model');
	}

	/**
	 * Sets model
	 * @param string $model
	 * @return boolean
	 */
	function set_model($model) {
		return $this->set('EXM_model', $model);
	}
	/**
	 * Gets key
	 * @return string
	 */
	function key() {
		return $this->get('EXM_key');
	}

	/**
	 * Sets key
	 * @param string $key
	 * @return boolean
	 */
	function set_key($key) {
		return $this->set('EXM_key', $key);
	}
	/**
	 * Gets value
	 * @return string
	 */
	function value() {
		return $this->get('EXM_value');
	}

	/**
	 * Sets value
	 * @param string $value
	 * @return boolean
	 */
	function set_value($value) {
		return $this->set('EXM_value', $value);
	}


	}
}

/* End of file EE_Extra_Meta.class.php */
/* Location: /includes/classes/EE_Answer.class.php */