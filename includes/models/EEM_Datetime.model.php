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
 * @ version		 	3.1.P.7
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
	private function __construct() {
		global $wpdb;
		// set table name
		$this->table_name = $wpdb->prefix . 'esp_datetime';
		// array representation of the datetime table and the data types for each field
		$this->table_data_types = array (
			'DTT_ID' 					=> '%d',
			'EVT_ID' 					=> '%d',
			'DTT_is_primary' 	=> '%d',
			'DTT_start' 				=> '%d',
			'DTT_end' 				=> '%d',
			'DTT_event_or_reg'	=> '%s',
			'DTT_reg_limit' 		=> '%d'
		);

		// uncomment these for example code samples of how to use them
		//			self::how_to_use_insert();
		//			self::how_to_use_update();
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
			self::$_instance = &new self();
		}
		// Espresso_model object
		return self::$_instance;
	}




	/**
	*		get event times from db
	*
	* 		@access		private
	* 		@param		$EVT_ID
	*		@return 		mixed		array on success, FALSE on fail
	*/
	private function _get_event_datetimes( $EVT_ID = FALSE, $DTT_event_or_reg = FALSE, $primary = FALSE ) {

		if ( ! $EVT_ID ) {
			global $espresso_notices;
			$espresso_notices['errors'][] = 'No Event datetimes could be retreived because no event ID was received. ' . $this->_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}

		$where = array( 'EVT_ID' => $EVT_ID );

		if ( $DTT_event_or_reg ) {
			$where['DTT_event_or_reg'] = $DTT_event_or_reg;
		}
		
		if ( $primary ) {
			$where['DTT_is_primary'] = 1;
		}

		$orderby = array( 'DTT_is_primary', 'DTT_start' );
		$sort = array( 'DESC', 'ASC' );

		if ( $datetimes = $this->select_all_where ( $where, $orderby, $sort )) {

			// load Datetime object class file
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Datetime.class.php');

			foreach ( $datetimes as $datetime ) {
					$array_of_objects[ $datetime->DTT_ID ] = new EE_Datetime(
							$datetime->EVT_ID,
							$datetime->DTT_is_primary,
							$datetime->DTT_start,
							$datetime->DTT_end,
							$datetime->DTT_event_or_reg,
							$datetime->DTT_reg_limit,
							$datetime->DTT_ID
					 	);
			}

			return $array_of_objects;

		} else {
			return FALSE;
		}

	}





	/**
	*		get all event datetimes from db
	*
	* 		@access		public
	*		@return 		mixed		array on success, FALSE on fail
	*/
	public function get_all_datetimes_for_event( $EVT_ID = FALSE ) {
		return $this->_get_event_datetimes( $EVT_ID );
	}




	/**
	*		get event start date from db
	*
	* 		@access		public
	*		@return 		mixed		array on success, FALSE on fail
	*/
	public function get_all_event_dates( $EVT_ID = FALSE ) {
		if (empty($EVT_ID)) { // on add_new_event event_id gets set to 0
			$times = array(new EE_Datetime( 0, true, time() + (60 * 60 * 24 * 30), time() + (60 * 60 * 24 * 30), 'E', NULL ));
			$times[0]->set_start_time("8AM");
			$times[0]->set_end_time("3:30PM");
			return $times;
		}
		return $this->_get_event_datetimes( $EVT_ID, 'E' );
	}



	/**
	*		get event start date from db
	*
	* 		@access		public
	*		@return 		mixed		array on success, FALSE on fail
	*/
	public function get_event_start_dates( $EVT_ID = FALSE ) {
		return $this->_get_event_datetimes( $EVT_ID, 'E', TRUE );
	}





	/**
	*		get event start date from db
	*
	* 		@access		public
	*		@return 		mixed		array on success, FALSE on fail
	*/
	public function get_event_end_dates( $EVT_ID = FALSE ) {
		return $this->_get_event_datetimes( $EVT_ID, 'E', TRUE );
	}




	/**
	*		get registration date from db
	*
	* 		@access		public
	*		@return 		mixed		array on success, FALSE on fail
	*/
	public function get_all_reg_dates( $EVT_ID = FALSE ) {
		if (empty($EVT_ID)) { // on add_new_event event_id gets set to 0
			$reg_times = array(new EE_Datetime(0, true, time(), time() + (60 * 60 * 24 * 29), 'R', NULL));
			$reg_times[0]->set_start_time("12:01AM");
			$reg_times[0]->set_end_time("11:59PM");
			return $reg_times;
		}
		return $this->_get_event_datetimes( $EVT_ID, 'R' );
	}




	/**
	*		get registration date from db
	*
	* 		@access		public
	*		@return 		mixed		array on success, FALSE on fail
	*/
	public function get_primary_reg_date_for_event( $EVT_ID = FALSE ) {
		if (empty($EVT_ID)) { // on add_new_event event_id gets set to 0
			return FALSE;
		}
		return $this->_get_event_datetimes( $EVT_ID, 'R', TRUE );
	}



	/**
	*		get registration start date from db
	*
	* 		@access		public
	*		@return 		mixed		array on success, FALSE on fail
	*/
	public function get_reg_start_dates( $EVT_ID = FALSE ) {
		return $this->_get_event_datetimes( $EVT_ID, 'R', TRUE );
	}





	/**
	*		get registration start date from db
	*
	* 		@access		public
	*		@return 		mixed		array on success, FALSE on fail
	*/
	public function get_reg_end_dates( $EVT_ID = FALSE ) {
		return $this->_get_event_datetimes( $EVT_ID, 'R', TRUE );
	}





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
				if ( $results = $this->update ( $set_column_values, $where_cols_n_values )) {
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

			if( $event->recurrence_id ) {
//				$SQL = 'SELECT * FROM wp_events_start_end WHERE event_id = '. $id .' ORDER BY start_time, end_time';
//				$event_times = $wpdb->get_results( $SQL, OBJECT_K );
			}

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

		echo espresso_get_notices();

	}





	public function delete_datetime( $DTT_ID = FALSE ) {
		if ( ! $DTT_ID ) {
			return FALSE;
		}
		return $this->delete( array( 'DTT_ID' => $DTT_ID ));
	}





	public function delete_all_event_datetimes( $EVT_ID = FALSE ) {
		if ( ! $EVT_ID ) {
			return FALSE;
		}
		return $this->delete( array( 'EVT_ID' => $EVT_ID ));
	}




	public function delete_all_where( $where_cols_n_values = FALSE ) {
		if ( ! $where_cols_n_values ) {
			return FALSE;
		}
		return $this->delete( $where_cols_n_values );
	}




	/**
	 *		This function inserts table data
	 *
	 *		@access public
	 *		@param array $set_column_values - array of column names and values for the SQL INSERT
	 *		@return array
	 */
	public function insert ($set_column_values) {

		//$this->display_vars( __FUNCTION__, array( 'set_column_values' => $set_column_values ) );

		global $espresso_notices;

		// grab data types from above and pass everything to espresso_model (parent model) to perform the update
		$results = $this->_insert( $this->table_name, $this->table_data_types, $set_column_values );

		// set some table specific success messages
		if ( $results['rows'] == 1 ) {
			// one row was successfully updated
			$espresso_notices['success'][] = 'Datetime details have been successfully saved to the database.';
		} elseif ( $results['rows'] > 1 ) {
			// multiple rows were successfully updated
			$espresso_notices['success'][] = 'Details for '.$results.' datetimes have been successfully saved to the database.';
		} else {
			// error message
			$espresso_notices['errors'][] = 'An error occured and the datetime has not been saved to the database. ' . $this->_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
		}

		return $results;

	}










	/**
	 *		This function updates table data
	 *
	 *		@access public
	 *		@param array $set_column_values - array of column names and values for the SQL SET clause
	 *		@param array $where_cols_n_values - column names and values for the SQL WHERE clause
	 *		@return array
	 */
	public function update ($set_column_values, $where_cols_n_values) {

		//$this->display_vars( __FUNCTION__, array( 'set_column_values' => $set_column_values, '$where_cols_n_values' => $where_cols_n_values ) );

		global $espresso_notices;

		// grab data types from above and pass everything to espresso_model (parent model) to perform the update
		$results = $this->_update( $this->table_name, $this->table_data_types, $set_column_values, $where_cols_n_values );

		// set some table specific success messages
		if ( $results['rows'] == 1 ) {
			// one row was successfully updated
			$espresso_notices['success'][] = 'Datetime details have been successfully updated.';
		} elseif ( $results['rows'] > 1 ) {
			// multiple rows were successfully updated
			$espresso_notices['success'][] = 'Details for '.$results.' datetimes have been successfully updated.';
		} else {
			// error message
			$espresso_notices['errors'][] = 'An error occured and the datetime has not been updated. ' . $this->_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
		}

		return $results['rows'];

	}




}
// End of file EEM_Datetime.model.php
// Location: /includes/models/EEM_Datetime.model.php