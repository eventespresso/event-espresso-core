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
require_once ( 'EE_Base_Class.class.php' );
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
	 * @var EE_Region[] 
	 */
	protected $_Region;


	/**
	 * Constructor
	 * @param int $REG_ID registration ID OR an array of all field values, where keys match these arguments' names
	 * @param int $QST_ID question ID
	 * @param string $ANS_value text representing the Country. Could be CSV'd
	 */
	public function __construct( $CNT_ISO=NULL, $CNT_ISO3=NULL, $RGN_ID=NULL, $CNT_name=NULL, $CNT_cur_code='USD', $CNT_cur_single='dollar', $CNT_cur_plural='dollars', $CNT_cur_sign='$', $CNT_cur_sign_b4=TRUE, $CNT_cur_dec_plc=2, $CNT_cur_dec_mrk='.', $CNT_cur_thsnds=',', $CNT_tel_code=NULL, $CNT_is_EU=FALSE, $CNT_active=FALSE ) {
		//if the first parameter is an array, assume it's an array of key-value pairs for this object
		if(is_array($CNT_ISO)){
			parent::__construct($CNT_ISO);
			return;
		}
		$reflector = new ReflectionMethod($this,'__construct');	
		$arrayForParent=array();
		foreach($reflector->getParameters() as $param){
			$paramName=$param->name;
			$arrayForParent[$paramName]=$$paramName;//yes, that's using a variable variable.
		}
		parent::__construct($arrayForParent);
	}


	/**
	 * Gets the realted EE_Region for this EE_Country
	 * @return EE_Region
	 */
	public function region(){
		return $this->get_first_related('Region');
	}


}

/* End of file EE_Country.class.php */
/* Location: /includes/classes/EE_Country.class.php */