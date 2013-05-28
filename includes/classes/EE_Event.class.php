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
	/**
	 * All registrations for this event
	 * @var EE_Registration[] 
	 */
	protected $_Registration;
	
	/**
	 * All datetimes this event is offered
	 * @var EE_Datetime[] 
	 */
	protected $_Datetime;
	
	/**
	 * All prices which apply to this event
	 * @var EE_Price[] 
	 */
	protected $_Price;
	
	/**
	 * Al question groups which apply to this event
	 * @var EE_Question_Group[] 
	 */
	protected $_Question_Group;
	
	
	/**
	 * ID of event (post id)
	 * @var int 
	 */
	protected $_EVT_ID;
	/**
	 * name of the event
	 * @var string
	 */
	protected $_EVT_name;
	/**
	 * description of the event
	 * @var string
	 */
	protected $_EVT_desc;
	/**
	 * url-friendly string of event name
	 * @var string
	 */
	protected $_EVT_slug;
	/**
	 * STring describing Event
	 * @var string
	 */
	protected $_EVT_created;
	protected $_EVT_short_desc;
	protected $_EVT_status;
	protected $_EVT_modified;
	protected $_EVT_wp_user;
	protected $_EVT_parent;
	protected $_EVT_order;
	protected $_EVT_is_active;
	protected $_EVT_display_desc;
	protected $_EVT_display_reg_form;
	protected $_EVT_visible_on;
	protected $_EVT_reg_limit;
	protected $_EVT_allow_multiple;
	protected $_EVT_additional_limit;
	protected $_EVT_require_pre_approval;
	protected $_EVT_member_only;
	protected $_EVT_allow_overflow;
	protected $_EVT_timezone_string;
	protected $_EVT_external_URL;

	public static function new_instance( $props_n_values = array() ) {
		$classname = __CLASS__;
		$has_object = parent::_check_for_object( $props_n_values, $classname );
		return $has_object ? $has_object : new self( $props_n_values);
	}


	public static function new_instance_from_db ( $props_n_values = array() ) {
		return new self( $props_n_values, TRUE );
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