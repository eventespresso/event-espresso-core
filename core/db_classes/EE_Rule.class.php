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
 * EE_Rule class
 *
 * @package			Event Espresso
 * @subpackage		includes/classes/EE_Answer.class.php
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Rule extends EE_Soft_Delete_Base_Class{
	
	/** ID",  @var RUL_ID*/ 
	protected $_RUL_ID = NULL;
	/** Name",  @var RUL_name*/ 
	protected $_RUL_name = NULL;
	/** Description",  @var RUL_desc*/ 
	protected $_RUL_desc = NULL;
	/** Trigger",  @var RUL_trigger*/ 
	protected $_RUL_trigger = NULL;
	/** Trigger Type",  @var RUL_trigger_type*/ 
	protected $_RUL_trigger_type = NULL;
	/** Comparison",  @var RUL_comparison*/ 
	protected $_RUL_comparison = NULL; 
	/** Value",  @var RUL_value*/ 
	protected $_RUL_value = NULL;
	/** Value Type",  @var RUL_value_type*/ 
	protected $_RUL_value_type = NULL;
	/** Is Active?",  @var RUL_is_active*/ 
	protected $_RUL_is_active = NULL;
	/** Archived?",  @var RUL_archived*/ 
	protected $_RUL_archived = NULL;
					
	/**
	 *
	 * @var EE_Promotion_Rule
	 */
	protected $_Promotion_Rule = NULL;
			
	/**
	 *
	 * @var EE_Promotion
	 */
	protected $_Promotion = NULL;
				

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
		return $this->get('RUL_name');
	}

	/**
	 * Sets name
	 * @param string $name
	 * @return boolean
	 */
	function set_name($name) {
		return $this->set('RUL_name', $name);
	}
	/**
	 * Gets desc
	 * @return string
	 */
	function desc() {
		return $this->get('RUL_desc');
	}

	/**
	 * Sets desc
	 * @param string $desc
	 * @return boolean
	 */
	function set_desc($desc) {
		return $this->set('RUL_desc', $desc);
	}
	/**
	 * Gets trigger
	 * @return string
	 */
	function trigger() {
		return $this->get('RUL_trigger');
	}

	/**
	 * Sets trigger
	 * @param string $trigger
	 * @return boolean
	 */
	function set_trigger($trigger) {
		return $this->set('RUL_trigger', $trigger);
	}
	/**
	 * Gets trigger_type
	 * @return string
	 */
	function trigger_type() {
		return $this->get('RUL_trigger_type');
	}

	/**
	 * Sets trigger_type
	 * @param string $trigger_type
	 * @return boolean
	 */
	function set_trigger_type($trigger_type) {
		return $this->set('RUL_trigger_type', $trigger_type);
	}
	/**
	 * Gets comparison
	 * @return string
	 */
	function comparison() {
		return $this->get('RUL_comparison');
	}

	/**
	 * Sets comparison
	 * @param string $comparison
	 * @return boolean
	 */
	function set_comparison($comparison) {
		return $this->set('RUL_comparison', $comparison);
	}
	/**
	 * Gets value
	 * @return string
	 */
	function value() {
		return $this->get('RUL_value');
	}

	/**
	 * Sets value
	 * @param string $value
	 * @return boolean
	 */
	function set_value($value) {
		return $this->set('RUL_value', $value);
	}
	/**
	 * Gets value_type
	 * @return string
	 */
	function value_type() {
		return $this->get('RUL_value_type');
	}

	/**
	 * Sets value_type
	 * @param string $value_type
	 * @return boolean
	 */
	function set_value_type($value_type) {
		return $this->set('RUL_value_type', $value_type);
	}
	/**
	 * Gets is_active
	 * @return boolean
	 */
	function is_active() {
		return $this->get('RUL_is_active');
	}

	/**
	 * Sets is_active
	 * @param boolean $is_active
	 * @return boolean
	 */
	function set_is_active($is_active) {
		return $this->set('RUL_is_active', $is_active);
	}
	/**
	 * Gets archived
	 * @return boolean
	 */
	function archived() {
		return $this->get('RUL_archived');
	}

	/**
	 * Sets archived
	 * @param boolean $archived
	 * @return boolean
	 */
	function set_archived($archived) {
		return $this->set('RUL_archived', $archived);
	}

}

/* End of file EE_Answer.class.php */
/* Location: /includes/classes/EE_Answer.class.php */