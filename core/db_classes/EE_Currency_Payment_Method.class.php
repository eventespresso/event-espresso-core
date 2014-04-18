<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.3
 *
 * ------------------------------------------------------------------------
 *
 * EE_Currency_Payment_Method
 * Model for showing which currencies apply to which paymetn methods
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Currency_Payment_Method extends EE_Base_Class{
	/** Currency to Payment Method LInk ID @var CPM_ID*/ protected $_CPM_ID = NULL;
	/** Currency Code @var CUR_code*/ protected $_CUR_code = NULL;
	/** Paymetn Method ID @var PMD_ID*/ protected $_PMD_ID = NULL; 
	protected $_Payment_Method;
	protected $_Currency;
	/**
	 * 
	 * @param type $props_n_values
	 * @return EE_Currency_Payment_Method
	 */
	public static function new_instance( $props_n_values = array() ) {
		$classname = __CLASS__;
		$has_object = parent::_check_for_object( $props_n_values, $classname );
//		d( $has_object );
		return $has_object ? $has_object : new self( $props_n_values);
	}

	/**
	 * 
	 * @param type $props_n_values
	 * @return EE_Currency_Payment_Method
	 */
	public static function new_instance_from_db ( $props_n_values = array() ) {
		$classname = __CLASS__;
//		$mapped_object = parent::_get_object_from_entity_mapper($props_n_values, $classname);
//		d( $mapped_object );
//		return $mapped_object ? $mapped_object : new self( $props_n_values, TRUE );
		return new self( $props_n_values, TRUE );
	}
	
}

// End of file EE_Currency_Payment_Method.class.php