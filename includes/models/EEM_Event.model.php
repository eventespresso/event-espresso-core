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
	* 		@param		int 			$EVT_ID		
	* 		@param		array 		$question_meta		additional question details petaining to the form	
	*		@return 		mixed		array on success, FALSE on fail
	*/	
	public function get_event_questions( $EVT_ID = FALSE, $q_meta = array() ) {
		
		if ( ! $EVT_ID ) {
			EE_Error::add_error( __( 'An error occured. No Question Groups could be retrieved because an Event ID was not received.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			return false;
		}
		
		$questions = array();
		$default_q_meta = array(
				'attendee_number' => 1,
				'price_id' => '',
				'date' => '',
				'time' => '',
				'input_name' => '',
				'input_id' => '',
				'input_class' => ''
		);
		
		$q_meta = array_merge( $default_q_meta, $q_meta );
		
		global $wpdb;
//		$SQL = 'SELECT QST.QST_ID, QSG.*, QST.* FROM ' . $wpdb->prefix . 'esp_event_question_group EQG '; 
//		$SQL .= 'INNER JOIN ' . $wpdb->prefix . 'esp_question_group QSG ON  EQG.QSG_ID = QSG.QSG_ID '; 
//		$SQL .= 'INNER JOIN ' . $wpdb->prefix . 'esp_question_group_question QGQ ON  QSG.QSG_ID = QGQ.QSG_ID '; 
//		$SQL .= 'INNER JOIN ' . $wpdb->prefix . 'esp_question QST ON  QGQ.QST_ID = QST.QST_ID '; 
//		$SQL .= 'WHERE EQG.EVT_ID = %d AND QSG.QSG_deleted = 0 AND QST.QST_deleted = 0 AND QST.QST_admin_only = %d '; 
//		$SQL .= 'ORDER BY QSG.QSG_order, QST.QST_order'; 
//		// get questions for this event
//		$questions = $wpdb->get_results( $wpdb->prepare( $SQL, $EVT_ID, is_admin() ), 'OBJECT_K' );
		
			

		


		// get Question Groups
		$SQL = 'SELECT QSG.* FROM ' . $wpdb->prefix . 'esp_event_question_group EQG '; 
		$SQL .= 'INNER JOIN ' . $wpdb->prefix . 'esp_question_group QSG ON  EQG.QSG_ID = QSG.QSG_ID ';
		$SQL .= 'WHERE EQG.EVT_ID = %d AND QSG.QSG_deleted = 0 '; 
		// Only personal information for the additional attendees in each group
		if ( $q_meta['additional_attendee_reg_info'] < 3 && $q_meta['attendee_number'] > 1 ) {
			$SQL .= " AND qg.system_group = 1 ";
		}
		$SQL .= 'ORDER BY QSG.QSG_order'; 
		$QSGs = $wpdb->get_results( $wpdb->prepare( $SQL, $EVT_ID ), 'OBJECT_K' );
		
		$QSG_IDs = implode( array_keys( $QSGs ), ',' );		

		// get Questions		
		$SQL = 'SELECT QST.*, QGQ.QSG_ID FROM ' . $wpdb->prefix . 'esp_question_group_question QGQ '; 
		$SQL .= 'INNER JOIN ' . $wpdb->prefix . 'esp_question QST ON  QGQ.QST_ID = QST.QST_ID '; 
		$SQL .= 'WHERE QGQ.QSG_ID IN (' . $QSG_IDs . ') AND QST.QST_deleted = 0 AND QST.QST_admin_only = %d '; 
		$SQL .= 'ORDER BY QST.QST_order'; 
		$QSTs = $wpdb->get_results( $wpdb->prepare( $SQL, is_admin() ), 'OBJECT_K' );
		
		$QST_IDs = implode( array_keys( $QSTs ), ',' );

		// get Question Options		
		$SQL = 'SELECT * FROM ' . $wpdb->prefix . 'esp_question_option '; 
		$SQL .= 'WHERE QST_ID IN (' . $QST_IDs . ') AND QSO_deleted = 0 '; 
		$SQL .= 'ORDER BY QSO_ID'; 
		$QSOs = $wpdb->get_results( $wpdb->prepare( $SQL, is_admin() ), 'OBJECT_K' );

		// now interlace everything into one big array where quetions groups have questions and questions have options
		foreach ( $QSGs as $QSG_ID => $QSG ) {
			$questions[ $QSG_ID ] = (array)$QSG;
			$questions[ $QSG_ID ]['QSG_questions'] = array();
			foreach ( $QSTs as $QST_ID => $QST ) {
				if ( $QST->QSG_ID == $QSG_ID ) {
					
					$questions[ $QSG_ID ]['QSG_questions'][ $QST_ID ] = array(
							'db-col' =>  $this->_get_question_target_db_column( $QST->QST_system_ID ),
							'label' => $QST->QST_display_text,
							'input' => 'text',
							'type' => 'string',
							'sanitize' => 'no_html',
							'required' => TRUE,
							'validation' => TRUE,
							'value' => NULL,
							'format' => '%s'
					);
					//printr( $QST, '$QST  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );	
					$questions[ $QSG_ID ]['QSG_questions'][ $QST_ID ] = (array)$QST;
					$questions[ $QSG_ID ]['QSG_questions'][ $QST_ID ]['QST_options'] = array();
					if ( $QST->QST_type == 'SINGLE' ||$QST->QST_type == 'MULTIPLE' ||$QST->QST_type == 'DROPDOWN' ) {
						foreach ( $QSOs as $QSO_ID => $QSO ) {					
							if ( $QSO->QST_ID == $QST_ID ) {
								$questions[ $QSG_ID ]['QSG_questions'][ $QST_ID ]['QST_options'][ $QSO_ID ] = (array)$QSO;
							}
						}
					}
				}
			}				
		}
		
				
		if ( $questions === FALSE ) {
			EE_Error::add_error( __( 'An error occured that prevented this event\'s questions from being retrieved from the database.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			return false;
		}
		
		return $questions;

	}







	/**
	*		_get_question_target_db_column
	* 
	* 		@access		private
	* 		@param		$QST_system_ID 			
	*		@return 		string		string
	*/	
	private function _get_question_target_db_column( $QST_system_ID = FALSE ) {
		$db_col = 'esp_answer.ANS_value';
		if ( $QST_system_ID ) {
			switch( $QST_system_ID ) {
				
				case 1 :
						$db_col = 'esp_attendee.ATT_fname';
					break;
					
				case 2 :
						$db_col = 'esp_attendee.ATT_fname';
					break;
					
				case 3 :
						$db_col = 'esp_attendee.ATT_email';
					break;
					
				case 4 :
						$db_col = 'esp_attendee.ATT_address';
					break;
					
				case 5 :
						$db_col = 'esp_attendee.ATT_address2';
					break;
					
				case  6  :
						$db_col = 'esp_attendee.ATT_city';
					break;
					
				case 7 :
						$db_col = 'esp_attendee.STA_ID';
					break;
					
				case 8 :
						$db_col = 'esp_attendee.ATT_zip';
					break;
					
				case 9 :
						$db_col = 'esp_attendee.CNT_ISO';
					break;
					
				case 10 :
						$db_col = 'esp_attendee.ATT_phone';
					break;
				
			}
		}
		return $db_col;
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