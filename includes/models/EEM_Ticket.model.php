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
 *	Ticket Model
 *
 * @package			Event Espresso
 * @subpackage		includes/models/EEM_Ticket.model.php
 * @author			Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
require_once ( EE_MODELS . 'EEM_Soft_Delete_Base.model.php' );
require_once ( EE_CLASSES . 'EE_Ticket.class.php' );

class EEM_Ticket extends EEM_Soft_Delete_Base {

	// private instance of the EEM_Ticket object
	private static $_instance = NULL;
	
	/**
	 *		private constructor to prevent direct creation
	 *		@Constructor
	 *		@access private
	 *		@param string $timezone string representing the timezone we want to set for returned Date Time Strings (and any incoming timezone data that gets saved).  Note this just sends the timezone info to the date time model field objects.  Default is NULL (and will be assumed using the set timezone in the 'timezone_string' wp option)
	 *		@return void
	 */
	protected function __construct( $timezone ) {
		$this->singlular_item = __('Ticket','event_espresso');
		$this->plural_item = __('Tickets','event_espresso');		

		$this->_tables = array(
			'Ticket'=> new EE_Primary_Table('esp_ticket', 'TKT_ID')
		);
		$this->_fields = array(
			'Ticket'=>array(
				'TKT_ID'=> new EE_Primary_Key_Int_Field('TKT_ID', __('Ticket ID','event_espresso'), false, 0),
				'TTM_ID'=>new EE_Foreign_Key_Int_Field('TTM_ID', __('Ticket Template ID','event_espresso'), false, 0, 'Ticket_Template'),
				'EVT_ID'=> new EE_Foreign_Key_Int_Field('EVT_ID', __('Event ID', 'event_espresso'), false, 0),
				'TKT_start_date'=>new EE_Datetime_Field('TKT_start_date', __('Start time/date of Ticket','event_espresso'), false, current_time('timestamp'), $timezone ),
				'TKT_end_date'=>new EE_Datetime_Field('TKT_end_date', __('End time/date of Ticket','event_espresso'), false, current_time('timestamp'), $timezone ),
				'TKT_reg_limit'=>new EE_Integer_Field('TKT_reg_limit', __('Registration LImit for this ticket','event_espresso'), true, 0),
				'TKT_tax'=>new EE_Boolean_Field('TKT_tax', __("Flag indicating whether there is tax applied on this ticket", "event_espresso"), false,false),
				'TKT_order' => new EE_Integer_Field('TKT_order', __('The order in which the Ticket is displayed', 'event_espresso'), false, 0),
				'TKT_deleted' => new EE_Trashed_Flag_Field('TKT_deleted', __('Flag indicating if this has been archived or not', 'event_espresso'), false, false),
				'TKT_parent' => new EE_Integer_Field('TKT_parent', __('Indicates what TKT_ID is the parent of this TKT_ID (used in autosaves/revisions)'), true, 0 )
			));
		$this->_model_relations = array(
			'Registration'=>new EE_Has_Many_Relation(),
			'Event'=>new EE_Belongs_To_Relation(),
			'Datetime'=>new EE_HABTM_Relation('Datetime_Ticket'),
			'Price'=>new EE_HABTM_Relation('Ticket_Price'),
			'Ticket_Template'=>new EE_Belongs_To_Relation()
		);

		parent::__construct( $timezone );
	}



	/**
	 * defines  table name as a constant
	 * @access public
	 */
	public static function define_table_name() {
		global $wpdb;
		define( 'EE_TICKET_TABLE', $wpdb->prefix . 'esp_ticket' );
	}




	/**
	 *		This function is a singleton method used to instantiate the Espresso_model object
	 *
	 *		@access public
	 *		@param string $timezone string representing the timezone we want to set for returned Date Time Strings (and any incoming timezone data that gets saved).  Note this just sends the timezone info to the date time model field objects.  Default is NULL (and will be assumed using the set timezone in the 'timezone_string' wp option)
	 *		@return EEM_Ticket instance
	 */
	public static function instance( $timezone = NULL ){

		// check if instance of Espresso_model already exists
		if ( self::$_instance === NULL ) {
			// instantiate Espresso_model
			self::$_instance = new self( $timezone );
		}

		//set timezone if we have in incoming string
		if ( !empty( $timezone ) )
			self::$_instance->set_timezone( $timezone );
		
		// Espresso_model object
		return self::$_instance;
	}



} //end EEM_Ticket model