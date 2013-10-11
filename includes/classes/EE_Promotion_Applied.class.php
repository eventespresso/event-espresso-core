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
 * EE_Promotion_Applied class
 * Indicates that a promotion was applied to a particular transaction or registration
 *
 * @package			Event Espresso
 * @subpackage		includes/classes/EE_Answer.class.php
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
require_once ( EE_CLASSES . 'EE_Base_Class.class.php' );
class EE_Promotion_Object extends EE_Base_Class{
	
	/** Promotion-to-Item Aplied to ID", "event_espresso @var PRA_ID*/ 
	protected $_PRA_ID = NULL;
	/** Promotion Object", "event_espresso @var PRO_ID*/ 
	protected $_PRO_ID = NULL;
	/** ID of the Related Object", "event_espresso @var OBJ_ID*/ 
	protected $_OBJ_ID = NULL;
	/** Model of Related Object", "event_espresso @var POB_type*/ 
	protected $_POB_type = NULL;				

	/**
	 *
	 * @var EE_Promotion
	 */
	protected $_Promotion = NULL;
	/**
	 *
	 * @var EE_Registration
	 */
	protected $_Registraiton = NULL;
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
	 * Gets the object that this model-joins-to. Eg, if this promotion-object join model object
	 * applies the promotion to a Regstration (ie, has POB_type=='Regstration'), then it will return an EE_Regstration
	 * @return EE_Base_Class (one of the model objects that the field OBJ_ID can point to... see the 'OBJ_ID' field on EEM_Promotion_Applied)
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