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
 * Event Model
 *
 * @package			Event Espresso
 * @subpackage		includes/models/
 * @author				Michael Nelson, Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EEM_Event  {
	//extends EEM_TempBase

  	// private instance of the Event object
	private static $_instance = NULL;

	/**
	 *		This funtion is a singleton method used to instantiate the EEM_Event object
	 *
	 *		@access public
	 *		@return EEM_Event instance
	 */	
	public static function instance(){
	
		// check if instance of EEM_Event already exists
		if ( self::$_instance === NULL ) {
			// instantiate Espresso_model 
			self::$_instance = new self();
		}
		// EEM_Event object
		return self::$_instance;
	}

	protected function __construct(){
	}



	/**
	*		retrieve all active Questions for an Event via the Event's ID
	* 
	* 		@access		public
	* 		@param		$EVT_ID		
	*		@return 		mixed		array on success, FALSE on fail
	*/	
	public function get_event_questions( $EVT_ID = FALSE ) {
		
		if ( ! $EVT_ID ) {
			EE_Error::add_error( __( 'An error occured. No Question Groups could be retrieved because an Event ID was not received.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			return false;
		}
		
		$question_groups = array();		
		
		global $wpdb;
		$SQL = 'SELECT QSG_ID FROM ' . $wpdb->prefix . 'esp_event_question_group WHERE EVT_ID = %d'; 
		// get question group IDs for this event
		if ( $QSG_IDs = $wpdb->get_results( $wpdb->prepare( $SQL, $EVT_ID ))) {
			
			printr( $QSG_IDs, '$QSG_IDs  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
			die();
			// create csv list of QSG_IDs
			$QSG_csv = implode( $QSG_IDs, ',' );
			$SQL = 'SELECT * FROM ' . $wpdb->prefix . 'esp_question_group WHERE QSG_ID IN "%s" AND QSG_deleted = 0'; 
			// get question groups for this event
			if ( $question_groups = $wpdb->get_results( $wpdb->prepare( $SQL, $QSG_csv ))) {
				printr( $question_groups, '$question_groups  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
			}
		}

	}







	/**
	*		migrate question data
	* 
	* 		usage: EEM_Event::instance()->migrate_question_data();
	* 
	* 		@access		public
	* 		@param		$EVT_ID		
	*		@return 		mixed		array on success, FALSE on fail
	*/	
	public function migrate_question_data() {
		
		global $wpdb;
		$SQL = 'SELECT id, question_groups FROM ' . $wpdb->prefix . 'events_detail ORDER BY id';
		if ( $results = $wpdb->get_results( $SQL )) {
			foreach ( $results as $result ) {
				$QSG_IDs = unserialize( $result->question_groups );
				foreach ( $QSG_IDs as $QSG_ID ) {
					if ( $wpdb->insert( $wpdb->prefix . 'esp_event_question_group', array( 'EVT_ID' => $result->id, 'QSG_ID' => $QSG_ID ), array( '%d', '%d' ))) {
						echo '<h5>SUCCESS:    EVT_ID : ' . $result->id . '   QSG_ID : ' . $QSG_ID . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h5>';
					} else {
						echo '<h4>FAIL:    EVT_ID : ' . $result->id . '   QSG_ID : ' . $QSG_ID . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
					}
				}
			}
		}
		
	}




}
// End of file EEM_Event.model.php
// Location: /includes/models/EEM_Event.model.php