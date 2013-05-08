<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * Event Question Group Model
 *
 * @package			Event Espresso
 * @subpackage		includes/models/
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EE_Event extends EE_Base_Class{ 
	protected $_EVT_ID;
	
	/**
	 *
	 * @var EE_Registration[] 
	 */
	protected $_Registration;
	
	/**
	 *
	 * @var EE_Datetime[] 
	 */
	protected $_Datetime;
	
	/**
	 *
	 * @var EE_Price[] 
	 */
	protected $_Price;
	
	/**
	 *
	 * @var EE_Question_Group[] 
	 */
	protected $_Question_Group;
	
	

	/**
	 * Constructor
	 *
	 * @access protected
	 * @param array array of values indexed by property name (without the leading underscore)
	 * @param bool  $bydb indicates whether the model is instantiating this class or not
	 * @param string $timezone valid timezone string (optional)
	 * @return void
	 */
	protected function __construct( $fieldValues = array(), $bydb = FALSE, $timezone = NULL ) {
		parent::__construct( $fieldValues, $bydb, $timezone );
	}


	public static function new_instance( $props_n_values = array() ) {
		$classname = get_class( self );
		$has_object = parent::_check_for_object( $props_n_values, $classname );
		return $has_object ? $has_object : self::__construct( $props_n_values);
	}


	public static function new_instance_from_db ( $props_n_values = array() ) {
		self::__construct( $props_n_values, TRUE );
	}


	/**
	 * Gets all the datetimes for this event, first the primary datetime, and
	 * then ordered by date (earliest first)
	 * @return EE_Datetime[]
	 */
	public function datetimes(){
		require_once('EEM_Datetime.model.php');
		return EEM_Datetime::instance( $this->_timezone )->get_all_event_dates($this->ID);
	}
	
	
	
	
}