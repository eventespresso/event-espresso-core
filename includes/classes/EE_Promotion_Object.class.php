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
 * EE_Promotion_Object class
 *
 * @package			Event Espresso
 * @subpackage		includes/classes/EE_Answer.class.php
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
require_once ( EE_CLASSES . 'EE_Base_Class.class.php' );
class EE_Promotion_Object extends EE_Base_Class{
	
	/** Price-to-Object ID", "event_espresso @var POB_ID*/ 
	protected $_POB_ID = NULL;
	/** Promotion Object", "event_espresso @var PRO_ID*/ 
	protected $_PRO_ID = NULL;
	/** ID of the Related Object", "event_espresso @var OBJ_ID*/ 
	protected $_OBJ_ID = NULL;
	/** Model of Related Object", "event_espresso @var POB_type*/ 
	protected $_POB_type = NULL;
	/** Times the promotion has been used for this object", "event_espresso @var POB_used*/ 
	protected $_POB_used = NULL;
			
	/**
	 *
	 * @var EE_Promotion
	 */
	protected $_Promotion = NULL;
	/**
	 *
	 * @var EE_Event 
	 */
	protected $_Event = NULL;
	
	/**
	 *
	 * @var EE_Venue
	 */
	protected $_Venue = NULL;
	/**
	 *
	 * @var EE_Ticket
	 */
	protected $_Ticket = NULL;
	/**
	 *
	 * @var EE_Datetime
	 */
	protected $_Datetime = NULL;
	/**
	 *
	 * @var EE_Transaction
	 */
	protected $_Transaction = NULL;
	
	/**
	 * 
	 * @param type $props_n_values
	 * @return EE_Promotion_Object
	 */
	public static function new_instance( $props_n_values = array() ) {
		$classname = __CLASS__;
		$has_object = parent::_check_for_object( $props_n_values, $classname );
		return $has_object ? $has_object : new self( $props_n_values);
	}

	/**
	 * 
	 * @param type $props_n_values
	 * @return EE_Promotion_Object
	 */
	public static function new_instance_from_db ( $props_n_values = array() ) {
		return new self( $props_n_values, TRUE );
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
	 * Gets OBJ_ID
	 * @return int
	 */
	function OBJ_ID() {
		return $this->get('OBJ_ID');
	}

	/**
	 * Sets OBJ_ID
	 * @param int $OBJ_ID
	 * @return boolean
	 */
	function set_OBJ_ID($OBJ_ID) {
		return $this->set('OBJ_ID', $OBJ_ID);
	}
	/**
	 * Gets type
	 * @return string
	 */
	function type() {
		return $this->get('POB_type');
	}

	/**
	 * Sets type
	 * @param string $type
	 * @return boolean
	 */
	function set_type($type) {
		return $this->set('POB_type', $type);
	}
	/**
	 * Gets used
	 * @return int
	 */
	function used() {
		return $this->get('PRO_used');
	}

	/**
	 * Sets used
	 * @param int $used
	 * @return boolean
	 */
	function set_used($used) {
		return $this->set('PRO_used', $used);
	}

	/**
	 * Gets the object that this model-joins-to. Eg, if this promotion-object join model object
	 * applies the promotion to an event (ie, has POB_type=='Event'), then it will return an EE_Event
	 * @return EE_Base_Class (one of the model objects that the field OBJ_ID can point to... see the 'OBJ_ID' field on EEM_Promotion_Object)
	 */
	function object(){
		$model_name_of_related_obj = $this->type();
		$is_model_name = EE_Registry::instance()->is_model_name($model_name_of_related_obj);
		if( ! $is_model_name ){
			return null;
		}else{
			return $this->get_first_related($model_name_of_related_obj);
		}
	}

}

/* End of file EE_Answer.class.php */
/* Location: /includes/classes/EE_Answer.class.php */