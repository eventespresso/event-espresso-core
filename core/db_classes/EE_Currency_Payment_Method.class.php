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
 * Model for showing which currencies apply to which payment methods
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Currency_Payment_Method extends EE_Base_Class{

	/** Currency to Payment Method Link ID @var CPM_ID*/
	protected $_CPM_ID = NULL;
	/** Currency Code @var CUR_code*/
	protected $_CUR_code = NULL;
	/** Payment Method ID @var PMD_ID*/
	protected $_PMD_ID = NULL;
	protected $_Payment_Method;
	protected $_Currency;



	/**
	 *
	 * @param array $props_n_values
	 * @return EE_Currency_Payment_Method
	 */
	public static function new_instance( $props_n_values = array() ) {
		$has_object = parent::_check_for_object( $props_n_values, __CLASS__ );
		return $has_object ? $has_object : new self( $props_n_values);
	}

	/**
	 *
	 * @param array $props_n_values
	 * @return EE_Currency_Payment_Method
	 */
	public static function new_instance_from_db ( $props_n_values = array() ) {
		return new self( $props_n_values, TRUE );
	}

}

// End of file EE_Currency_Payment_Method.class.php