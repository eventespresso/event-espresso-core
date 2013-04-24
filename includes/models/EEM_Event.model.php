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
 * Event Model
 *
 * @package			Event Espresso
 * @subpackage		includes/models/
 * @author				Michael Nelson, Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
//NOTE! Until this notice is removed, this model is still in construction. Many, if not almost all,
//the inherited functions from EEM_TempBase don't work. They will work once the databse structure
//has been brought into compliance with new naming structure, and once it defines its _field_settings and _related_models arrays,
//and we've created an EE_Event class.
class EEM_Event  extends EEM_TempBase{
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
		$this->singular_item = __('Event','event_espresso');
		$this->plural_item = __('Events','event_espresso');
		$this->table_name='events_detail';
		$this->data_types=array();
	}

	/**
	 * Gets all the question groups related to this event. Has almost teh same inputs as EEM_TEmpBase->get_many_related
	 * @global type $wpdb
	 * @param int $EVT_ID
	 * @param array $where_col_n_values all the following parameters are just like EEM_TempBase's get_all_where
	 * @param string $orderby
	 * @param string $order
	 * @param mixed $operators array/string. 
	 * @param int $limit
	 * @param string $output
	 */
	public function get_related_question_groups($EVT_ID, $where_col_n_values=array(),$orderby=null,$order='ASC',$operators='=',$limit=null,$output='OBJECT_K'){
		
		//trying to duplicate EEM_TempBase's get_many_related in teh HABTM case, to allow for easier transition when EEM_Events inherits EEM_TempBase
		global $wpdb;
		
		require_once('EEM_Question_Group.model.php');
		$relatedModel = EEM_Question_Group::instance();
		$joinTable = $wpdb->prefix."esp_"."event_question_group";
		$otherTableName = $relatedModel->_get_table_name();
		$otherTablePK = $relatedModel->primary_key_name();
		$joinSQL = "$joinTable LEFT JOIN $otherTableName ON $joinTable.$otherTablePK=$otherTableName.$otherTablePK ";
		$thisTablePK = "EVT_ID";
		if( !is_array($where_col_n_values) || !array_key_exists($thisTablePK,$where_col_n_values )){
			$where_col_n_values[$thisTablePK]=$EVT_ID;
		}
		$rows=$relatedModel->select_all_join_where($joinSQL,
											$relatedModel->_get_table_data_types() + array('EQG_ID'=>'%d','EVT_ID'=>'%d', 'QSG_ID'=>'%d', 'EQG_primary'=>'%d'), 
											$where_col_n_values,
											$orderby,
											$order,
											$operators,
											$limit,
											$output);
		//if we're only wanting to count them, then $rows is actually just an integer
		//so we only want ot return it.
		if($output!=='COUNT'){
			$relatedObjects=$relatedModel->_create_objects($rows);
		}else{
			$relatedObjects=$rows;
		}
		return $relatedObjects;
	}
	/**
	*		retrieve all active Questions and Groups for an Event via the Event's ID
	* 
	* 		@access		public
	* 		@param		array 		$question_meta		additional question details petaining to the form	
	*		@return 		mixed		array on success, FALSE on fail
	*/	
	public function get_event_questions_and_groups( $q_meta = array() ) {
		
		if ( ! isset( $q_meta['EVT_ID'] ) || ! absint( $q_meta['EVT_ID'] )) {
			EE_Error::add_error( __( 'An error occured. No Question Groups could be retrieved because an Event ID was not received.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			return false;
		}
		
		$QSGs = $QSTs = $QSOs = array();

		$default_q_meta = array(
				'att_nmbr' => 1,
				'price_id' => '',
				'date' => '',
				'time' => '',
				'input_name' => '',
				'input_id' => '',
				'input_class' => ''
		);		
		$q_meta = array_merge( $default_q_meta, $q_meta );

		// set System Groups for the additional attendees
		$system_ID = $q_meta['att_nmbr'] > 1 ? $q_meta['additional_attendee_reg_info'] : 0;
		// get Question Groups		
		$QSGs = $this->get_question_groups_for_event( $q_meta['EVT_ID'], $system_ID, $q_meta['att_nmbr'] );
		if ( ! empty( $QSGs )) {
			// csv list of QSG IDs
			$QSG_IDs = implode( array_keys( $QSGs ), ',' );
			// get Questions
			$QSTs = $this->get_questions_in_groups( $QSG_IDs );
			if ( ! empty( $QSTs )) {
				// csv list of QST IDs
				$QST_IDs = implode( array_keys( $QSTs ), ',' );
				// get Question Options
				$QSOs = $this->get_options_for_question( $QST_IDs );
				// package it all up and send it off
			}
		}

		return $this->assemble_array_of_groups_questions_and_options( $QSGs, $QSTs, $QSOs, $q_meta );

	}







	/**
	*		get_question_groups
	* 
	* 		@access		public
	*		@return 		array		
	*/	
	public function get_all_question_groups() {
		global $wpdb;
		// get Question Groups
		$SQL = 'SELECT QSG.* FROM ' . $wpdb->prefix . 'esp_question_group QSG ';
		$SQL .= 'WHERE QSG.QSG_deleted = 0 '; 
		$SQL .= 'ORDER BY QSG.QSG_order'; 
		$QSGs = $wpdb->get_results( $SQL, 'OBJECT_K' );
		return $QSGs;
	}






	/**
	*		get_question_groups
	* 
	* 		@access		public
	* 		@param		int			$EVT_ID 			
	*		@return 		array		
	*/	
	public function get_all_event_question_groups( $EVT_ID = FALSE ) {
		if ( ! isset( $EVT_ID) || ! absint( $EVT_ID )) {
			EE_Error::add_error( __( 'An error occured. No Event Question Groups could be retrieved because an Event ID was not received.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			return false;
		}
		global $wpdb;
		// get Event Question Groups
		$SQL = 'SELECT QSG_ID FROM ' . $wpdb->prefix . 'esp_event_question_group ';
		$SQL .= 'WHERE EVT_ID = %d'; 		
		$EQGs = $wpdb->get_col( $wpdb->prepare( $SQL, $EVT_ID ));
		return $EQGs;		
	}





	/**
	*		get_question_groups
	* 
	* 		@access		public
	* 		@param		int			$EVT_ID 			
	* 		@param		boolean	$for_primary_attendee 			
	*		@return 		array		
	*/	
	public function get_event_question_groups( $EVT_ID = FALSE, $for_primary_attendee = TRUE ) {
		if ( ! isset( $EVT_ID) || ! absint( $EVT_ID )) {
			EE_Error::add_error( __( 'An error occured. No Event Question Groups could be retrieved because an Event ID was not received.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			return false;
		}
		global $wpdb;
		// get Event Question Groups
		$SQL = 'SELECT QSG_ID FROM ' . $wpdb->prefix . 'esp_event_question_group ';
		$SQL .= 'WHERE EVT_ID = %d'; 		
		$SQL .= $for_primary_attendee ? ' AND EQG_primary = 1' : ' AND EQG_primary = 0'; 
		$EQGs = $wpdb->get_col( $wpdb->prepare( $SQL, $EVT_ID ));
		return $EQGs;		
	}






	/**
	*		get_question_groups
	* 
	* 		@access		public
	* 		@param		int					$EVT_ID 			
	* 		@param		int					$system_ID	
	* 		@param		boolean|int		$for_primary_attendee	could be TRUE or FALSE or the attendee number
	*		@return 		array		
	*/	
	public function get_question_groups_for_event( $EVT_ID = FALSE, $system_ID = FALSE, $for_primary_attendee = TRUE ) {
		
		if ( ! isset( $EVT_ID) || ! absint( $EVT_ID )) {
			EE_Error::add_error( __( 'An error occured. No Question Groups could be retrieved because an Event ID was not received.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			return false;
		}

		global $wpdb;
		// get Question Groups
		$SQL = 'SELECT QSG.*, EQG.EVT_ID FROM ' . $wpdb->prefix . 'esp_event_question_group EQG '; 
		$SQL .= 'INNER JOIN ' . $wpdb->prefix . 'esp_question_group QSG ON  EQG.QSG_ID = QSG.QSG_ID ';
		$SQL .= 'WHERE EQG.EVT_ID = %d AND QSG.QSG_deleted = 0 '; 
		$SQL .= $for_primary_attendee === TRUE || $for_primary_attendee === 1 ? ' AND EQG.EQG_primary = 1 ' : ' AND EQG.EQG_primary = 0 '; 
		// system groups only?
		if ( $system_ID ) {
			$SQL .= ' AND QSG.QSG_system_ID < %d AND QSG.QSG_system_ID != 0 ';
		}
		$SQL .= 'ORDER BY QSG.QSG_order'; 
		$QSGs = $wpdb->get_results( $wpdb->prepare( $SQL, $EVT_ID, $system_ID ), 'OBJECT_K' );

		// WHAT?!?!? NOTHING?!?!?
//		if ( empty( $QSGs )) {
//			$SQL = 'SELECT QSG.* FROM ' . $wpdb->prefix . 'esp_event_question_group EQG '; 
//			$SQL .= 'INNER JOIN ' . $wpdb->prefix . 'esp_question_group QSG ON  EQG.QSG_ID = QSG.QSG_ID ';
//			$SQL .= 'WHERE QSG.QSG_system_ID = 1';
//			$QSGs = $wpdb->get_results( $wpdb->prepare( $SQL, $EVT_ID, $system_ID ), 'OBJECT_K' );		
//		}
		
		return $QSGs;
		
	}







	/**
	*		get_question_target_db_column
	* 
	* 		@access		public
	* 		@param		string		$QSG_IDs  csv list of $QSG IDs	
	*		@return 		array
	*/	
	public function get_questions_in_groups( $QSG_IDs = '' ) {		

		if ( empty( $QSG_IDs )) {
			EE_Error::add_error( __( 'An error occured. No Question Group IDs were received.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			return false;
		}

		global $wpdb;
		// get Questions		
		$SQL = 'SELECT QST.*, QGQ.QSG_ID FROM ' . $wpdb->prefix . 'esp_question_group_question QGQ '; 
		$SQL .= 'INNER JOIN ' . $wpdb->prefix . 'esp_question QST ON  QGQ.QST_ID = QST.QST_ID '; 
		$SQL .= 'WHERE QGQ.QSG_ID IN (' . $QSG_IDs . ') AND QST.QST_deleted = 0 AND QST.QST_admin_only = %d '; 
		$SQL .= 'ORDER BY QST.QST_order'; 
		$QSTs = $wpdb->get_results( $wpdb->prepare( $SQL, is_admin() ), 'OBJECT_K' );
		return $QSTs;
	}







	/**
	*		get_options_for_question
	* 
	* 		@access		public
	* 		@param		string		$QST_IDs  csv list of $QST IDs	 			
	*		@return 		array
	*/	
	public function get_options_for_question( $QST_IDs ) {		

		if ( empty( $QST_IDs )) {
			EE_Error::add_error( __( 'An error occured. No Question IDs were received.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			return false;
		}

		global $wpdb;
		// get Question Options		
		$SQL = 'SELECT * FROM ' . $wpdb->prefix . 'esp_question_option '; 
		$SQL .= 'WHERE QST_ID IN (' . $QST_IDs . ') AND QSO_deleted = 0 '; 
		$SQL .= 'ORDER BY QSO_ID'; 
		$QSOs = $wpdb->get_results( $wpdb->prepare( $SQL, is_admin() ), 'OBJECT_K' );
		return $QSOs;
	}







	/**
	*		_get_question_target_db_column
	* 
	* 		@access		public
	* 		@param		array		$QSGs 		array of question groups	
	* 		@param		array		$QSTs 			array of questions
	* 		@param		array		$QSOs 		array of question options	
	*		@return 		array
	*/	
	public function assemble_array_of_groups_questions_and_options( $QSGs = array(), $QSTs = array(), $QSOs = array(), $q_meta = array() ) {		

		if ( empty( $QSGs ) || empty( $QSTs ) /*|| empty( $q_meta )*/) {
			EE_Error::add_error( __( 'An error occured. Insufficient data was received to process question groups and questions.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			return false;
		}

		$questions = array();
		// now interlace everything into one big array where quetions groups have questions and questions have options
		if ( is_array( $QSGs )) {
			foreach ( $QSGs as $QSG_ID => $QSG ) {
				$questions[ $QSG_ID ] = (array)$QSG;
				$questions[ $QSG_ID ]['QSG_questions'] = array();
				
				if ( is_array( $QSTs )) {
					foreach ( $QSTs as $QST_ID => $QST ) {
						if ( $QST->QSG_ID == $QSG_ID ) {
							
							$qst_name = $qst_id = $QST->QST_system_ID ? $QST->QST_system_ID : $QST->QST_ID;
							$qst_name = isset( $QST->ANS_ID ) ? '[' . $qst_name . '][' . $QST->ANS_ID . ']' : '[' . $qst_name . ']';
							$input_name = isset( $q_meta['input_name'] ) ? $q_meta['input_name']  : '';
							$input_id = isset( $q_meta['input_id'] ) ? $q_meta['input_id'] : sanitize_key( $QST->QST_display_text );
							$input_class = isset( $q_meta['input_class'] ) ? $q_meta['input_class'] : '';
							
							//printr( $QST, '$QST  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );	
							$questions[ $QSG_ID ]['QSG_questions'][ $QST_ID ] = (array)$QST;
							$questions[ $QSG_ID ]['QSG_questions'][ $QST_ID ]['QST_input_name'] = 'qstn' . $input_name . $qst_name;
							$questions[ $QSG_ID ]['QSG_questions'][ $QST_ID ]['QST_input_id'] = $input_id . '-' . $qst_id;
							$questions[ $QSG_ID ]['QSG_questions'][ $QST_ID ]['QST_input_class'] = $input_class;
							$questions[ $QSG_ID ]['QSG_questions'][ $QST_ID ]['QST_options'] = array();
							
							if ( $QST->QST_type == 'SINGLE' ||$QST->QST_type == 'MULTIPLE' ||$QST->QST_type == 'DROPDOWN' ) {
								if ( is_array( $QSOs )) {
									foreach ( $QSOs as $QSO_ID => $QSO ) {					
										if ( $QSO->QST_ID == $QST_ID ) {
											$questions[ $QSG_ID ]['QSG_questions'][ $QST_ID ]['QST_options'][ $QSO_ID ] = (array)$QSO;
										}
									}
								}
							}
						}
					}				
				}			
			}
		}

		
		return $questions;
	}







	/**
	*		_get_question_target_db_column
	* 
	* 		@access		private
	* 		@param		$QST 			
	*		@return 		string		string
	*/	
	private function _generate_question_input_name( $QST ) {

		if ( $QST->QST_system_ID ) {
			$qst_name = $QST->QST_system_ID;
/*			switch( $QST->QST_system_ID ) {
				
				case 1 :
						$qst_name = $QST->QST_ID . '-fname';
					break;
					
				case 2 :
						$qst_name = $QST->QST_ID . '-lname';
					break;
					
				case 3 :
						$qst_name = $QST->QST_ID . '-email';
					break;
					
				case 4 :
						$qst_name = $QST->QST_ID . '-address';
					break;
					
				case 5 :
						$qst_name = $QST->QST_ID . '-address2';
					break;
					
				case  6  :
						$qst_name = $QST->QST_ID . '-city';
					break;
					
				case 7 :
						$qst_name = $QST->QST_ID . '-state';
					break;
					
				case 8 :
						$qst_name = $QST->QST_ID . '-zip';
					break;
					
				case 9 :
						$qst_name = $QST->QST_ID . '-country';
					break;
					
				case 10 :
						$qst_name = $QST->QST_ID . '-phone-' . $QST->QST_ID;
					break;
				
			}*/
			
		} else {
			//$qst_name = $QST->QST_ID . '-' . str_replace( array( ' ', '-', '.' ), '_', strtolower( $QST->QST_display_text ));
			$qst_name = $QST->QST_ID;
		}
		return $qst_name;
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