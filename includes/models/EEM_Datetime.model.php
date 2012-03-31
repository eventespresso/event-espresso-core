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
			'DTT_timestamp' 	=> '%d', 	
			'DTT_event_or_reg'	=> '%s', 	 	
			'DTT_start_or_end'	=> '%s', 	 	
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
	private function _get_event_datetimes( $EVT_ID = FALSE, $DTT_event_or_reg = FALSE, $start_or_end = FALSE ) {
	
		if ( ! $EVT_ID ) {
			global $espresso_notices;
			$espresso_notices['errors'][] = 'No Event datetimes could be retreived because no event ID was received. ' . $this->_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}		

		$where = array( 'EVT_ID' => $EVT_ID );			

		if ( $DTT_event_or_reg ) {
			$where['DTT_event_or_reg'] = $DTT_event_or_reg;
		} 
				
		if ( $start_or_end ) {
			$where['DTT_start_or_end'] = $start_or_end;
		} 	
			
		$orderby = 'DTT_timestamp';
		
		if ( $datetimes = $this->select_all_where ( $where, $orderby )) {

			// load Datetime object class file
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Datetime.class.php');

			foreach ( $datetimes as $datetime ) {
					$array_of_objects[ $datetime->DTT_ID ] = new EE_Datetime(
							$datetime->EVT_ID, 
							$datetime->DTT_timestamp, 
							$datetime->DTT_event_or_reg, 
							$datetime->DTT_start_or_end, 
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
	public function get_event_start_dates( $EVT_ID = FALSE ) {
		return $this->_get_event_datetimes( $EVT_ID, 'E', 'S' );			
	}





	/**
	*		get event start date from db
	* 
	* 		@access		public		
	*		@return 		mixed		array on success, FALSE on fail
	*/	
	public function get_event_end_dates( $EVT_ID = FALSE ) {
		return $this->_get_event_datetimes( $EVT_ID, 'E', 'E' );			
	}




	/**
	*		get registration start date from db
	* 
	* 		@access		public		
	*		@return 		mixed		array on success, FALSE on fail
	*/	
	public function get_reg_start_dates( $EVT_ID = FALSE ) {
		return $this->_get_event_datetimes( $EVT_ID, 'R', 'S' );			
	}





	/**
	*		get registration start date from db
	* 
	* 		@access		public		
	*		@return 		mixed		array on success, FALSE on fail
	*/	
	public function get_reg_end_dates( $EVT_ID = FALSE ) {
		return $this->_get_event_datetimes( $EVT_ID, 'R', 'E' );			
	}





	function convert_existing_event_datetimes() {

		global $wpdb;

		$SQL = 'SELECT id, start_date, end_date, registration_start, registration_end, registration_startT, registration_endT, reg_limit FROM wp_events_detail ORDER BY id';
		$events = $wpdb->get_results( $SQL, OBJECT_K );		
//		echo printr( $events, '$events' );
		
		foreach ( $events as $id => $event ) {
			
			$SQL = 'SELECT * FROM wp_events_start_end WHERE event_id = '. $id .' ORDER BY start_time, end_time';
			if ( $event_times = $wpdb->get_results( $SQL, OBJECT_K )) {
					
				foreach ( $event_times as $event_time ) {	
		
					// First convert Event Start times
					if ( isset( $event_time->reg_limit ) && $event_time->reg_limit > 0 ) {
						$reg_limit = $event_time->reg_limit;
					} else {
						$reg_limit = $event->reg_limit;
					}
					
					$event->start_time = isset( $event_time->start_time ) ? ' ' . $event_time->start_time : '';
					// array of column names and values for the SQL INSERT... VALUES clause
					$set_column_values = array(
									'EVT_ID' => $id,
									'DTT_timestamp' => strtotime( $event->start_date . $event->start_time ),
									'DTT_event_or_reg' => 'E',
									'DTT_start_or_end' => 'S',
									'DTT_reg_limit' => $reg_limit
								);
					// model function to perform error checking and then run update
					$results = $this->insert ($set_column_values);		
				
					// then convert Event End times
					if ( isset( $event_time->end_time )) {
						$event->end_time = isset( $event_time->end_time ) ? ' ' . $event_time->end_time : '';
						// array of column names and values for the SQL INSERT... VALUES clause
						$set_column_values = array(
										'EVT_ID' => $id,
										'DTT_timestamp' => strtotime( $event->start_date . $event_time->end_time ),
										'DTT_event_or_reg' => 'E',
										'DTT_start_or_end' => 'E',
										'DTT_reg_limit' => NULL
									);
						// model function to perform error checking and then run update
						$results = $this->insert ($set_column_values);
					}	
				
					// then convert Event End dates if different from Start dates
					while ( $event->start_date != $event->end_date ) {
						
						$start_date = strtotime( $event->start_date );
						// increment start date by one day
						$event->start_date =  date( 'Y-m-d', mktime( 0, 0, 0, date( 'm', $start_date )  , date( 'd', $start_date )+1, date( 'Y', $start_date )));
	
						if ( isset( $event_time->reg_limit ) && $event_time->reg_limit > 0 ) {
							$reg_limit = $event_time->reg_limit;
						} else {
							$reg_limit = $event->reg_limit;
						}
					
						// First convert Event Start times
						if ( isset( $event_time->start_time ) && $event_time->start_time != '' ) {
							// array of column names and values for the SQL INSERT... VALUES clause
							$set_column_values = array(
											'EVT_ID' => $id,
											'DTT_timestamp' => strtotime( $event->start_date . ' ' . $event_time->start_time ),
											'DTT_event_or_reg' => 'E',
											'DTT_start_or_end' => 'S',
											'DTT_reg_limit' => $reg_limit
										);
							// model function to perform error checking and then run update
							$results = $this->insert ($set_column_values);
						}		
						
						// then convert Event End times
						if ( isset( $event_time->end_time ) && $event_time->end_time != '' ) {
							// array of column names and values for the SQL INSERT... VALUES clause
							$set_column_values = array(
											'EVT_ID' => $id,
											'DTT_timestamp' => strtotime( $event->start_date . ' ' . $event_time->end_time ),
											'DTT_event_or_reg' => 'E',
											'DTT_start_or_end' => 'E',
											'DTT_reg_limit' => NULL
										);
							// model function to perform error checking and then run update
							$results = $this->insert ($set_column_values);
						}	
					}
					// end while					
				
				} 
				
			} else {
			
				// for events that had no event times posted but still ahve a start date		
				
				// array of column names and values for the SQL INSERT... VALUES clause
				$set_column_values = array(
								'EVT_ID' => $id,
								'DTT_timestamp' => strtotime( $event->start_date ),
								'DTT_event_or_reg' => 'E',
								'DTT_start_or_end' => 'S',
								'DTT_reg_limit' => $event->reg_limit
							);
				// model function to perform error checking and then run update
				$results = $this->insert ($set_column_values);

				// array of column names and values for the SQL INSERT... VALUES clause
				$set_column_values = array(
								'EVT_ID' => $id,
								'DTT_timestamp' => strtotime( $event->start_date ),
								'DTT_event_or_reg' => 'E',
								'DTT_start_or_end' => 'E',
								'DTT_reg_limit' => NULL
							);
				// model function to perform error checking and then run update
				$results = $this->insert ($set_column_values);
			
				// then convert Event End dates if different from Start dates
				while ( $event->start_date != $event->end_date ) {
					
					$start_date = strtotime( $event->start_date );
					// increment start date by one day
					$event->start_date =  date( 'Y-m-d', mktime( 0, 0, 0, date( 'm', $start_date )  , date( 'd', $start_date )+1, date( 'Y', $start_date )));
					
					// array of column names and values for the SQL INSERT... VALUES clause
					$set_column_values = array(
									'EVT_ID' => $id,
									'DTT_timestamp' => strtotime( $event->start_date ),
									'DTT_event_or_reg' => 'E',
									'DTT_start_or_end' => 'S',
									'DTT_reg_limit' => $event->reg_limit
								);
					// model function to perform error checking and then run update
					$results = $this->insert ($set_column_values);

				}
				// end while						
			}
						
			// now convert registration datetimes

			if ( isset( $event->registration_start )) {
				$event->registration_startT = isset( $event->registration_startT ) ? ' ' . $event->registration_startT : '';
				// array of column names and values for the SQL INSERT... VALUES clause
				$set_column_values = array(
								'EVT_ID' => $id,
								'DTT_timestamp' => strtotime( $event->registration_start . $event->registration_startT ),
								'DTT_event_or_reg' => 'R',
								'DTT_start_or_end' => 'S',
								'DTT_reg_limit' => NULL
							);
				// model function to perform error checking and then run update
				$results = $this->insert ($set_column_values);
			}	
			
			if ( isset( $event->registration_end )) {
				$event->registration_endT = isset( $event->registration_endT ) ? ' ' . $event->registration_endT : '';
				// array of column names and values for the SQL INSERT... VALUES clause
				$set_column_values = array(
								'EVT_ID' => $id,
								'DTT_timestamp' => strtotime( $event->registration_end . $event->registration_endT ),
								'DTT_event_or_reg' => 'R',
								'DTT_start_or_end' => 'E',
								'DTT_reg_limit' => NULL
							);
				// model function to perform error checking and then run update
				$results = $this->insert ($set_column_values);
			}	

		}

		echo espresso_get_notices();
		
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
	
		return $results['rows'];
	
	}










	/**
	 *		This function updates table data
	 *		
	 *		@access public
	 *		@param array $set_column_values - array of column names and values for the SQL SET clause
	 *		@param array $where - column names and values for the SQL WHERE clause
	 *		@return array
	 */	
	public function update ($set_column_values, $where) {
	
		//$this->display_vars( __FUNCTION__, array( 'set_column_values' => $set_column_values, 'where' => $where ) );
			
		global $espresso_notices;

		// grab data types from above and pass everything to espresso_model (parent model) to perform the update
		$results = $this->_update( $this->table_name, $this->table_data_types, $set_column_values, $where );
	
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