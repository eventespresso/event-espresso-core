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
	/**
	 * Short description of the event
	 * @var string
	 */
	protected $_EVT_short_desc;
	/**
	 * Foreign key into status table
	 * @var string
	 */
	protected $_STS_ID;
	/**
	 * time last modified
	 * @var string
	 */
	protected $_EVT_modified;
	/**
	 * id of creator
	 * @var int 
	 */
	protected $_EVT_wp_user;
	/**
	 * id of parent
	 * @var int
	 */
	protected $_EVT_parent;
	/**
	 * indicates order of event on a menu
	 * @var int 
	 */
	protected $_EVT_order;
	/**
	 * flag indicating even tis active
	 * @var boolean
	 */
	protected $_EVT_is_active;
	/**
	 * whether or not to display the event's description
	 * @var boolean
	 */
	protected $_EVT_display_desc;
	/**
	 * whether ot not to display something
	 * @brent: yeah what is this field for? from mike
	 * @var boolean
	 */
	protected $_EVT_display_reg_form;
	/**
	 * indicates time when event should be visible
	 * @var int 
	 */
	protected $_EVT_visible_on;
	/**
	 * registration limit on event
	 * @var int 
	 */
	protected $_EVT_reg_limit;
	/**
	 * flag indicating whehter to allwo group registrations
	 * @var boolean
	 */
	protected $_EVT_allow_multiple;
	/**
	 * how many extra people user can register
	 * @var int
	 */
	protected $_EVT_additional_limit;
	/**
	 * flag indicating whether to require users to be approved by admin
	 * before they are approved
	 * @brent do we still need this? isnt there a global setting for this? from mike
	 * @var boolean
	 */
	protected $_EVT_require_pre_approval;
	/**
	 * whether event is for members only
	 * @var boolean
	 */
	protected $_EVT_member_only;
	/**
	 * flag indicating whether ot not to allow overflow registrants
	 * @var boolean
	 */
	protected $_EVT_allow_overflow;
	/**
	 * timezone event will occur in
	 * @var string
	 */
	protected $_EVT_timezone_string;
	/**
	 * URL of event if hosted elsewhere
	 * @var string
	 */
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