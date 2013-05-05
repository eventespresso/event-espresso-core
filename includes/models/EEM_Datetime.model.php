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
 *	Datetime Model
 *
 * @package			Event Espresso
 * @subpackage		includes/models/
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Base.model.php' );
require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Datetime.class.php' );

class EEM_Datetime extends EEM_Base {

  	// private instance of the Event_datetime object
	private static $_instance = NULL;

	// all event datetimes
	private $_event_DT = array();
	// all registration datetimes
	private $_reg_DT = array();
	// all event start datetimes
	private $_start_DT = array();
	// all event end datetimes
	private $_end_DT = array();





	/**
	 *		private constructor to prevent direct creation
	 *		@Constructor
	 *		@access private
	 *		@return void
	 */
	protected function __construct() {
		global $wpdb;
		// set table name
//		$this->table_name = $wpdb->prefix . 'esp_datetime';
		// set item names
		$this->singlular_item = __('Datetime','event_espresso');
		$this->plural_item = __('Datetimes','event_espresso');		
		// array representation of the datetime table and the data types for each field
//		$this->table_data_types = array (
//			'DTT_ID' 					=> '%d',
//			'EVT_ID' 					=> '%d',
//			'DTT_is_primary' 	=> '%d',
//			'DTT_EVT_start' 		=> '%d',
//			'DTT_EVT_end' 		=> '%d',
//			'DTT_REG_start' 		=> '%d',
//			'DTT_REG_end' 		=> '%d',
//			'DTT_reg_limit' 		=> '%d',
//			'DTT_tckts_left'	=> '%d'
//		);
		$this->_tables = array(
			'Datetime'=> new EE_Primary_Table('esp_datetime', 'DTT_ID')
		);
		$this->_fields = array(
			'Datetime'=>array(
				'DTT_ID'=> new EE_Primary_Key_Int_Field('DTT_ID', __('Datetime ID','event_espresso'), false, 0),
				'EVT_ID'=>new EE_Foreign_Key_Int_Field('EVT_ID', __('Event ID','event_espresso'), false, 0, 'Event'),
				'DTT_is_primary'=>new EE_Boolean_Field('DTT_is_primary', __('Flag indicating Primary Event Time','event_espresso'), false, true),
				'DTT_EVT_start'=>new EE_Datetime_Field('DTT_EVT_start', __('Start time/date of Event','event_espresso'), false, current_time('timestamp')),
				'DTT_EVT_end'=>new EE_Datetime_Field('DTT_EVT_end', __('End time/date of Event','event_espresso'), false, current_time('timestamp')),
				'DTT_REG_start'=>new EE_Datetime_Field('DTT_REG_start', __('Start time/date of Registration for Event','event_espresso'), false, current_time('timestamp')),
				'DTT_REG_end'=>new EE_Datetime_Field('DTT_REG_end', __('End time/date of Registration for Event','event_espresso'), false, current_time('timestamp')),
				'DTT_reg_limit'=>new EE_Integer_Field('DTT_reg_limit', __('Registration LImit for this time','event_espresso'), true, 999999),
				'DTT_tckts_left'=>new EE_Integer_Field('DTT_tckts_left', __('Calculated Tickets Remaining','event_espresso'), true, 999999)
			));
		$this->_model_relations = array(
			'Registration'=>new EE_Has_Many_Relation(),
			'Event'=>new EE_Belongs_To_Relation()
		);

		parent::__construct();
	}





	/**
	 *		This funtion is a singleton method used to instantiate the Espresso_model object
	 *
	 *		@access public
	 *		@return EEM_Datetime instance
	 */
	public static function instance(){

		// check if instance of Espresso_model already exists
		if ( self::$_instance === NULL ) {
			// instantiate Espresso_model
			self::$_instance = new self();
		}
		// Espresso_model object
		return self::$_instance;
	}

	/**
	*		create new blank datetime
	*
	* 		@access		public
	*		@return 		EE_Datetime[]		array on success, FALSE on fail
	*/
	public function create_new_blank_datetime() {
		$times = array( 
				new EE_Datetime( 
						0, 
						true, 
						time('timestamp') + (60 * 60 * 24 * 30), 
						time('timestamp') + (60 * 60 * 24 * 30), 
						time('timestamp'), 
						time('timestamp') + (60 * 60 * 24 * 30) 
						/*NULL,
						NULL*/
				)
		);

		$times[0]->set_start_time("8am");
		$times[0]->set_end_time("5pm");
		$times[0]->set_reg_start_time("8am");
		$times[0]->set_reg_end_time("5pm");/**/
		return $times;
	}





	/**
	*		get event start date from db
	*
	* 		@access		public
	* 		@param		int 			$EVT_ID
	*		@return 		mixed		array on success, FALSE on fail
	*/
	public function get_all_event_dates( $EVT_ID = FALSE ) {
		if ( ! $EVT_ID ) { // on add_new_event event_id gets set to 0
			return $this->create_new_blank_datetime();
		}
		$results =  $this->get_datetimes_for_event_ordered_by_importance($EVT_ID);
		return $results;
	}

	/**
	 * Gets the datetimes for the event (with the given limit), and orders them by "importance". By importance, we mean
	 * that the primary datetimes are most important, and then the earlier datetimes are the most important. Maybe we'll want
	 * this to take into account datetimes that haven't already passed, but we don't yet.
	 * @param int $EVT_ID
	 * @param int $limit
	 * @return EE_Datetime[]
	 */
	public function get_datetimes_for_event_ordered_by_importance( $EVT_ID = FALSE, $limit = NULL){
		return $this->get_all( array(array('Event.EVT_ID'=>$EVT_ID),
			'limit'=>$limit,
			'order_by'=>array('DTT_is_primary'=>'DESC','DTT_EVT_start'=>'ASC')));
	}

	/**
	 * Gets the most important datetime for a particular event (ie, the primary event usually. But if for some WACK
	 * reason it doesn't exist, we consider teh earliest event the most important)
	 * @param int $EVT_ID
	 * @return EE_Datetime
	 */
	public function get_most_important_datetime_for_event($EVT_ID){
		$results = $this->get_datetimes_for_event_ordered_by_importance($EVT_ID, 1);
		if($results){
			return array_shift($results);
		}else{
			return null;
		}
	}


	/**
	*		get registration date from db
	*
	* 		@access		public
	* 		@param		int 			$EVT_ID
	*		@return 		mixed		array on success, FALSE on fail
	*/
	public function get_all_reg_dates( $EVT_ID = FALSE ) {
		if (empty($EVT_ID)) { // on add_new_event event_id gets set to 0
			$reg_times = $this->create_new_blank_datetime();
			$reg_times[0]->set_start_time("12:00:01AM");
			$reg_times[0]->set_end_time("11:59:59PM");
			return $reg_times;
		}
		return $this->get_datetimes_for_event_ordered_by_importance( $EVT_ID );
	}




	/**
	*		get registration date from db
	*
	* 		@access		public
	* 		@param		int 			$EVT_ID
	*		@return 		mixed		array on success, FALSE on fail
	*/
	public function get_primary_reg_date_for_event( $EVT_ID = FALSE ) {
		if (empty($EVT_ID)) { // on add_new_event event_id gets set to 0
			return FALSE;
		}
		return $this->get_datetimes_for_event_ordered_by_importance( $EVT_ID, 1 );
	}


	/**
	 * @todo delete this
	 * Any idea what this is for? It's not used anywhere. I guess it's for 3.1->4.0 conversion? mike, april 25th 2013
	 * @global type $wpdb
	 */
	function convert_converted_event_datetimes() {

		global $wpdb;

		$SQL = 'SELECT * FROM wp_esp_datetime WHERE DTT_event_or_reg = "E" ORDER BY EVT_ID, DTT_start';
		$DTMs = $wpdb->get_results( $SQL, OBJECT_K );

		$start_dates = array( 3 => 1, 33 => 7 );
		$end_dates = array( 3, 33 );
		$delete = array( 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31 );

		foreach ( $DTMs as $DTM ) {

			echo '<h4>EVT_ID : ' . $DTM->EVT_ID . '   - DTT_ID : ' . $DTM->DTT_ID . ' : date : ' . date( 'F j, Y g:i a', $DTM->DTT_start )  . '</h4>';

			if ( in_array( $DTM->DTT_ID, $end_dates )) {
				$set_column_values = array( 'DTT_end' => $DTM->DTT_start  );
				$where_cols_n_values = array( 'DTT_ID' => $start_dates[ $DTM->DTT_ID ] );
				if ( $results = $this->update ( $set_column_values, array($where_cols_n_values ))) {
					echo '<h4>copy successful DTT_ID : ' . $DTM->DTT_ID . '</h4>';
				} else {
					echo '<h2 style="color:red;">COPY ERROR  DTT_ID : ' . $DTM->DTT_ID . '</h2>';
				}
			}

			if ( in_array( $DTM->DTT_ID, $delete )) {
				$where_cols_n_values = array( 'DTT_ID' => $DTM->DTT_ID );
				if ( $results = $this->delete ( $where_cols_n_values )) {
					echo '<h4>delete successful DTT_ID : ' . $DTM->DTT_ID . '</h4>';
				} else {
					echo '<h2 style="color:red;">delete ERROR  DTT_ID : ' . $DTM->DTT_ID . '</h2>';
				}
			}
		}
	}



/**
	 * @todo delete this
	 * Any idea what this is for? It's not used anywhere. I guess it's for 3.1->4.0 conversion? mike, april 25th 2013
	 * @global type $wpdb
	 */
	function convert_existing_event_datetimes() {

		global $wpdb;

		$SQL = 'SELECT id, start_date, end_date, registration_start, registration_end, registration_startT, registration_endT, reg_limit FROM wp_events_detail ORDER BY id';
		$events = $wpdb->get_results( $SQL, OBJECT_K );
//		echo printr( $events, '$events' );

		if (empty($events)) {
			return FALSE;
		}

		foreach ( $events as $id => $event ) {

			$SQL = 'SELECT * FROM wp_events_start_end WHERE event_id = '. $id .' ORDER BY start_time, end_time';
			$event_times = $wpdb->get_results( $SQL, OBJECT_K );

			if ( $event_times ) {

				foreach ( $event_times as $event_time ) {

					// First convert Event Start times
					if ( isset( $event_time->reg_limit ) && $event_time->reg_limit > 0 ) {
						$reg_limit = $event_time->reg_limit;
					} else {
						$reg_limit = $event->reg_limit;
					}

					$event->start_time = isset( $event_time->start_time ) ? ' ' . $event_time->start_time : '';
					$event->end_date = isset( $event->end_date ) ? $event->end_date : $event->start_date;
					$event->end_time = isset( $event_time->end_time ) ? ' ' . $event_time->end_time : '';

					// array of column names and values for the SQL INSERT... VALUES clause
					$set_column_values = array(
									'EVT_ID' => $id,
									'DTT_start' => strtotime( $event->start_date . $event->start_time ),
									'DTT_end' => strtotime( $event->end_date . $event->end_time ),
									'DTT_event_or_reg' => 'E',
									'DTT_reg_limit' => $reg_limit
								);
					// model function to perform error checking and then run update
					$results = $this->insert ($set_column_values);

				}

			} else {

				// for events that had no event times posted but still have a start date

				// array of column names and values for the SQL INSERT... VALUES clause
				$set_column_values = array(
								'EVT_ID' => $id,
								'DTT_start' => strtotime( $event->start_date ),
								'DTT_end' => isset( $event->end_date ) ? strtotime( $event->end_date ) : strtotime( $event->start_date ),
								'DTT_event_or_reg' => 'E',
								'DTT_reg_limit' => $event->reg_limit
							);
				// model function to perform error checking and then run update
				$results = $this->insert ($set_column_values);

			}

			// now convert registration datetimes

			if ( isset( $event->registration_start )) {

				$event->registration_startT = isset( $event->registration_startT ) ? ' ' . $event->registration_startT : '';
				$event->registration_end = isset( $event->registration_end ) ? $event->registration_end : $event->registration_start;
				$event->registration_endT = isset( $event->registration_endT ) ? ' ' . $event->registration_endT : '';
				// array of column names and values for the SQL INSERT... VALUES clause
				$set_column_values = array(
								'EVT_ID' => $id,
								'DTT_start' => strtotime( $event->registration_start . $event->registration_startT ),
								'DTT_end' => strtotime( $event->registration_end . $event->registration_endT ),
								'DTT_event_or_reg' => 'R',
								'DTT_reg_limit' => NULL
							);
				// model function to perform error checking and then run update
				$results = $this->insert ($set_column_values);
			}

		}

		echo EE_Error::get_notices();

	}
}
// End of file EEM_Datetime.model.php
// Location: /includes/models/EEM_Datetime.model.php
