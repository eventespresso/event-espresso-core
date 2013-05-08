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
 * EE_State class
 *
 * @package			Event Espresso
 * @subpackage	includes/classes/EE_State.class.php
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
require_once ( 'EE_Base_Class.class.php' );
class EE_State extends EE_Base_Class{

	protected $_STA_ID;
	protected $_CNT_ISO;
	protected $_STA_abbrev;
	protected $_STA_name;
	protected $_STA_active;
	
	/**
	 * Related Country, lazy-loaded
	 * @access protected
	 * @var EE_Country[] 
	 */
	protected $_Country;

	/**
	 * Constructor
	 * @param int $STA_ID state ID
	 * @param int $CNT_ISO  Country 2 character ISO code
	 * @param string $STA_abbrev state abbreviation
	 * @param string $STA_name state name
	 * @param boolean $STA_active 
	 */
	public function __construct( $STA_ID=NULL, $CNT_ISO=NULL, $STA_abbrev=NULL, $STA_name=NULL, $STA_active=FALSE ) {
		//if the first parameter is an array, assume it's an array of key-value pairs for this object
		if(is_array($STA_ID)){
			parent::__construct($STA_ID);
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



}

/* End of file EE_State.class.php */
/* Location: /includes/classes/EE_State.class.php */