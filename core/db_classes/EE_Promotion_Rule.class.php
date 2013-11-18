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
 * EE_Promotion_Rule class
 *
 * @package			Event Espresso
 * @subpackage		includes/classes/EE_Answer.class.php
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Promotion_Rule extends EE_Base_Class{
	/** Relation ID between Promotion and Rule", "event_espresso @var PRR_ID*/ 
	protected $_PRR_ID = NULL;
	/** Promotion ID", "event_espresso @var PRO_ID*/ 
	protected $_PRO_ID = NULL;
	/** Rule ID", "event_espresso @var RUL_ID*/ 
	protected $_RUL_ID = NULL;
	/** Order of this Rule in applying to the Promotion", "event_espresso @var PRR_order*/ 
	protected $_PRR_order = NULL;
	/** Comparision Operator", "event_espresso @var PRR_add_rule_comparison*/ 
	protected $_PRR_add_rule_comparison = NULL;
		
	
				

	public static function new_instance( $props_n_values = array() ) {
		$classname = __CLASS__;
		$has_object = parent::_check_for_object( $props_n_values, $classname );
		return $has_object ? $has_object : new self( $props_n_values);
	}


	public static function new_instance_from_db ( $props_n_values = array() ) {
		return new self( $props_n_values, TRUE );
	}
	
	/**
	 * Gets order
	 * @return int
	 */
	function order() {
		return $this->get('PRR_order');
	}

	/**
	 * Sets order
	 * @param int $order
	 * @return boolean
	 */
	function set_order($order) {
		return $this->set('PRR_order', $order);
	}
	/**
	 * Gets add_rule_comparison
	 * @return string
	 */
	function add_rule_comparison() {
		return $this->get('PRR_add_rule_comparison');
	}

	/**
	 * Sets add_rule_comparison
	 * @param string $add_rule_comparison
	 * @return boolean
	 */
	function set_add_rule_comparison($add_rule_comparison) {
		return $this->set('PRR_add_rule_comparison', $add_rule_comparison);
	}

	/**
	 * Gets promotion_ID
	 * @return int
	 */
	function promotion_ID() {
		return $this->get('PRO_ID');
	}

	/**
	 * Sets promotion_ID
	 * @param int $promotion_ID
	 * @return boolean
	 */
	function set_promotion_ID($promotion_ID) {
		return $this->set('PRO_ID', $promotion_ID);
	}
	/**
	 * Gets Rule_ID
	 * @return int
	 */
	function Rule_ID() {
		return $this->get('RUL_ID');
	}

	/**
	 * Sets Rule_ID
	 * @param int $Rule_ID
	 * @return boolean
	 */
	function set_Rule_ID($Rule_ID) {
		return $this->set('RUL_ID', $Rule_ID);
	}

	/**
	 * 
	 * @return EE_Promotion
	 */
	function promotion(){
		return $this->get_first_related('Promotion');
	}
	/**
	 * 
	 * @return EE_Rule
	 */
	function rule(){
		return $this->get_first_related('Rule');
	}

}

/* End of file EE_Answer.class.php */
/* Location: /includes/classes/EE_Answer.class.php */