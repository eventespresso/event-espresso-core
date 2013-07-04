<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			{@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link					{@link http://www.eventespresso.com}
 * @ since		 		3.2.P
 *
 * ------------------------------------------------------------------------
 *
 * EE_Country class
 *
 * @package			Event Espresso
 * @subpackage	includes/classes/EE_Country.class.php
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
require_once ( EE_CLASSES . 'EE_Base_Class.class.php' );
class EE_Country extends EE_Base_Class{

	protected $_CNT_ISO;
	protected $_CNT_ISO3;
	protected $_RGN_ID;
	protected $_CNT_name;
	protected $_CNT_cur_code;
	protected $_CNT_cur_single;
	protected $_CNT_cur_plural;
	protected $_CNT_cur_sign;
	protected $_CNT_cur_sign_b4;
	protected $_CNT_cur_dec_plc;
	protected $_CNT_cur_dec_mrk;
	protected $_CNT_cur_thsnds;
	protected $_CNT_tel_code;
	protected $_CNT_is_EU;
	protected $_CNT_active;
	
	/**
	 * Related Region, lazy-loaded
	 * @access protected
	 * @var EE_Region
	 */
	protected $_Region;
	
	/**
	 * Related states
	 * @var EE_State[]
	 */
	protected $_State;


	public static function new_instance( $props_n_values = array() ) {
		$classname = __CLASS__;
		$has_object = parent::_check_for_object( $props_n_values, $classname );
		return $has_object ? $has_object : new self( $props_n_values );
	}




	public static function new_instance_from_db ( $props_n_values = array() ) {
		return new self( $props_n_values, TRUE );
	}


	/**
	 * Gets the realted EE_Region for this EE_Country
	 * @return EE_Region
	 */
	public function region(){
		return $this->get_first_related('Region');
	}


	public function name() {
		return $this->_CNT_name;
	}


}

/* End of file EE_Country.class.php */
/* Location: /includes/classes/EE_Country.class.php */