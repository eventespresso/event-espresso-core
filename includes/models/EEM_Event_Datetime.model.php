<?php
/**
 * model for handling has-and-belongs-to-many relatinobetween events and datetimes
 * We need this relationship because of the potential for heirarchal events and autosaves and revisions needing to share the same datetimes.
 * If you want to query based on a non-primary of foreign key on this model, you can't use the EE_HABTM_Relation on Event nor or Datetime.
 */
class EEM_Event_Datetime extends EEM_Base{
	// private instance of the Attendee object
	private static $_instance = NULL;

	/**
	 *		This funtion is a singleton method used to instantiate the EEM_Event_Datetime object
	 *
	 *		@access public
	 *		@return EEM_Question_Group instance
	 */	
	public static function instance(){
	
		// check if instance of EEM_Attendee already exists
		if ( self::$_instance === NULL ) {
			// instantiate Espresso_model 
			self::$_instance = new self();
		}
		// EEM_Attendee object
		return self::$_instance;
	}

	protected function __construct(){
		$this->singular_item = __('Event to Datetime Link','event_espresso');
		$this->plural_item = __('Event to Datetime Links','event_espresso');
		$this->_tables = array(
			'Event_Datetime'=>new EE_Primary_Table('esp_event_datetime','EVD_ID')
		);
		$this->_fields = array(
			'Event_Datetime'=>array(
				'EVD_ID'=>new EE_Primary_Key_Int_Field('EVD_ID', __('Event to Datetime Link ID','event_espresso'), false),
				'EVT_ID'=>new EE_Foreign_Key_Int_Field('EVT_ID', __('Event ID','event_espresso'), false, 0, 'Event'),
				'DTT_ID'=>new EE_Foreign_Key_Int_Field('DTT_ID', __('Datetime ID','event_espresso'), false, 0, 'Datetime')
				
				
			)
		);
		$this->_model_relations = array(
			'Event'=>new EE_Belongs_To_Relation(),
			'Datetime'=>new EE_Belongs_To_Relation(),
		);
		parent::__construct();
	}



	/**
	 * defines  table name as a constant
	 * @access public
	 */
	public static function define_table_name() {
		global $wpdb;
		define( 'EE_EVENT_DATETIME_TABLE', $wpdb->prefix . 'esp_event_datetime' );
	}


}