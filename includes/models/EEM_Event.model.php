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
class EEM_Event  extends EEM_Base{
	//extends EEM_Base

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
	
	/**
	 * keys are the STS_IDs for events, values are translatable strings. It's nice having an 
	 * array of ALL of the statuses, so we can know what statuses are valid, and which are not
	 * @var array 
	 */
	private $_statuses = array();
	
	/**
	 * @todo: we should describe each status here. Ie, when things should have
	 * this status, what triggers it, and how it generally affects the rest of teh system
	 */
	const status_active = 'ACT';
	const status_not_active = 'NAC';
	const status_registration_not_open = 'NOP';
	const status_registration_open='OPN';
	const status_registration_closed = 'CLS';
	const status_pending = 'PND';
	const status_ongoing = 'ONG';
	const status_secondary = 'SEC';
	const status_draft = 'DRF';
	const status_deleted = 'DEL';
	const status_denied = 'DEN';
	const status_expired = 'EXP';

	
	/**
	 * Keys are INTs used in the DB and in forms to indicate how much info is required
	 * for additional attendees. Values are how to display them
	 * @var array 
	 */
	private $_additional_attendee_reg_info_enum = array();
	const additional_attendee_reg_info_none = 0;
	const additional_attendee_reg_info_personal_info_only = 1;
	const additional_attendee_reg_info_full = 2;
	protected function __construct(){
		$this->singular_item = __('Event','event_espresso');
		$this->plural_item = __('Events','event_espresso');
		
		$this->_statuses = $this->_get_event_status_array();
		$this->_additional_attendee_reg_info_enum = $this->_get_additional_attendee_reg_info_array();
		
		$this->_tables = array(
			'Event_CPT'=>new EE_Primary_Table('posts','ID'),
			'Event_Meta'=> new EE_Secondary_Table('esp_event_meta', 'EVTM_ID','EVT_ID',"Event_CPT.post_type='espresso_events'")
		);
		
		
		
		$this->_fields = array(
			'Event_CPT'=>array(
				'EVT_ID'=>new EE_Primary_Key_Int_Field('ID', __('Post ID for Event','event_espresso'), false),
				'EVT_name'=>new EE_Plain_Text_Field('post_title', __('Event Name','event_espresso'), false, ''),
				'EVT_desc'=>new EE_Simple_HTML_Field('post_content', __("Event Description", "event_espresso"), false, ''),
				'EVT_slug'=>new EE_Slug_Field('post_name', __("Event Slug", "event_espresso"), false, ''),
				'EVT_created'=>new EE_Datetime_Field('post_date', __("Date/Time Event Created", "event_espresso"), false, current_time('timestamp')),
				'EVT_short_desc'=>new EE_Simple_HTML_Field('post_excerpt', __("Event Short Descripiton", "event_espresso"), false,''),
				'STS_ID'=>new EE_Enum_Field('post_status', __("Event Status", "event_espresso"), false, EEM_Event::status_draft, $this->_statuses),//will be a foreign key once status model made
				'EVT_modified'=>new EE_Datetime_Field('post_modified', __("Dateim/Time Event Modified", "event_espresso"), true, current_time('timestamp')),
				'EVT_wp_user'=>new EE_Integer_Field('post_author', __("Wordpress User ID", "event_espresso"), false,1),
				'EVT_parent'=>new EE_Integer_Field('post_parent', __("Event Parent ID", "event_espresso"), true),
				'EVT_order'=>new EE_Integer_Field('menu_order', __("Event Menu Order", "event_espresso"), false, 1),
				'EVT_post_type'=>new EE_DB_Only_Text_Field('post_type', __("Event Post Type", "event_espresso"), false, 'espresso_events')
			),
			'Event_Meta'=>array(
				'EVTM_ID'=> new EE_DB_Only_Float_Field('EVTM_ID', __('Event Meta Row ID','event_espresso'), false),
				'EVT_ID_fk'=>new EE_DB_Only_Int_Field('EVT_ID', __("Foreign key to Event ID from Event Meta table", "event_espresso"), false),
				'EVT_is_active'=>new EE_Boolean_Field('EVT_is_active', __("Event Active Flag", "event_espresso"), false, 1),
				'EVT_display_desc'=>new EE_Boolean_Field('EVT_display_desc', __("Display Description Flag", "event_espresso"), false, 1),
				'EVT_display_reg_form'=>new EE_Boolean_Field('EVT_display_reg_form', __("Display Registration Form Flag", "event_espresso"), false, 1),
				'EVT_visible_on'=>new EE_Datetime_Field('EVT_visible_on', __("Event Visible Date", "event_espresso"), true, current_time('timestamp')),
				'EVT_reg_limit'=>new EE_Integer_Field('EVT_reg_limit', __("Event Registration Limit", "event_espresso"), true, 999999),
				'EVT_allow_multiple'=>new EE_Boolean_Field('EVT_allow_multiple', __("Allow Multiple Registrations on Same Transaction Flag", "event_espresso"), false, false),
				'EVT_additional_limit'=>new EE_Integer_Field('EVT_additional_limit', __("Limit of Additional Registrations on Same Transaction", "event_espresso"), true),
				'EVT_additional_attendee_reg_info'=>new EE_Enum_Field('EVT_additional_attendee_reg_info', __("Info Requested for Additional Attendees?", "event_espresso"), true, EEM_Event::additional_attendee_reg_info_none, $this->_additional_attendee_reg_info_enum,true),
				'EVT_default_registration_status'=>new EE_Enum_Field('EVT_default_registration_status', __("Default Registration Status on this Event", "event_espresso"), false, EEM_Registration::status_id_pending, EEM_Registration::reg_status_array(), false),
				'EVT_require_pre_approval'=>new EE_Boolean_Field('EVT_require_pre_approval', __("Event Requires Pre-Approval before Registration Complete", "event_espresso"), false, false),
				'EVT_member_only'=>new EE_Boolean_Field('EVT_member_only', __("Member-Only Event Flag", "event_espresso"), false, false),
				'EVT_allow_overflow'=>new EE_Boolean_Field('EVT_allow_overflow', __("Allow Overflow on Event", "event_espresso"), false, false),
				'EVT_timezone_string'=>new EE_Plain_Text_Field('EVT_timezone_string', __("Timezone (name) for Event times", "event_espresso"), false),
				'EVT_external_URL'=>new EE_Plain_Text_Field('EVT_external_URL', __("URL of Event Page if hosted elsewhere", "event_espresso"), true)
			));
		$this->_model_relations = array(
			'Registration'=>new EE_Has_Many_Relation(),
			'Datetime'=>new EE_Has_Many_Relation(),
			'Price'=>new EE_Has_Many_Relation(),
			'Question_Group'=>new EE_HABTM_Relation('Event_Question_Group'),
			'Venue'=>new EE_HABTM_Relation('Event_Venue'),
			'Term_Taxonomy'=>new EE_HABTM_Relation('Term_Relationship')
		);
		require_once('strategies/EE_Default_CPT_Where_Conditions.strategy.php');
		$this->_default_where_conditions_strategy = new EE_Default_CPT_Where_Conditions('espresso_events');
		parent::__construct();
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
			$SQL .= ' AND QSG.QSG_system < %d AND QSG.QSG_system != 0 ';
		}
		$SQL .= 'ORDER BY QSG.QSG_order'; 
		$QSGs = $wpdb->get_results( $wpdb->prepare( $SQL, $EVT_ID, $system_ID ), 'OBJECT_K' );

		// WHAT?!?!? NOTHING?!?!?
//		if ( empty( $QSGs )) {
//			$SQL = 'SELECT QSG.* FROM ' . $wpdb->prefix . 'esp_event_question_group EQG '; 
//			$SQL .= 'INNER JOIN ' . $wpdb->prefix . 'esp_question_group QSG ON  EQG.QSG_ID = QSG.QSG_ID ';
//			$SQL .= 'WHERE QSG.QST_system = 1';
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
							
							$qst_name = $qstn_id = $QST->QST_system ? $QST->QST_system : $QST_ID;
							$qst_name = isset( $QST->ANS_ID ) ? '[' . $qst_name . '][' . $QST->ANS_ID . ']' : '[' . $qst_name . ']';
							$input_name = isset( $q_meta['input_name'] ) ? $q_meta['input_name']  : '';
							$input_id = isset( $q_meta['input_id'] ) ? $q_meta['input_id'] : sanitize_key( $QST->QST_display_text );
							$input_class = isset( $q_meta['input_class'] ) ? $q_meta['input_class'] : '';
							
							//printr( $QST, '$QST  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );	
							$questions[ $QSG_ID ]['QSG_questions'][ $QST_ID ] = (array)$QST;
							$questions[ $QSG_ID ]['QSG_questions'][ $QST_ID ]['QST_input_name'] = 'qstn' . $input_name . $qst_name;
							$questions[ $QSG_ID ]['QSG_questions'][ $QST_ID ]['QST_input_id'] = $input_id . '-' . $qstn_id;
							$questions[ $QSG_ID ]['QSG_questions'][ $QST_ID ]['QST_input_class'] = $input_class;
							$questions[ $QSG_ID ]['QSG_questions'][ $QST_ID ]['QST_options'] = array();
							// check for answer in $_GET in case we are reprocessing a form after an error
							if ( isset( $q_meta['EVT_ID'] ) && isset( $q_meta['att_nmbr'] ) && isset( $q_meta['date'] ) && isset( $q_meta['time'] ) && isset( $q_meta['price_id'] )) {
								$answer = isset( $_GET['qstn'][ $q_meta['EVT_ID'] ][ $q_meta['att_nmbr'] ][ $q_meta['date'] ][ $q_meta['time'] ][ $q_meta['price_id'] ][ $qstn_id ] ) ? $_GET['qstn'][ $q_meta['EVT_ID'] ][ $q_meta['att_nmbr'] ][ $q_meta['date'] ][ $q_meta['time'] ][ $q_meta['price_id'] ][ $qstn_id ] : '';
								$questions[ $QSG_ID ]['QSG_questions'][ $QST_ID ]['ANS_value'] = $answer;
							}
							
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

		if ( $QST->QST_system ) {
			$qst_name = $QST->QST_system;
/*			switch( $QST->QST_system ) {
				
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



	public static function event_status_array() {
		self::$_statuses = call_user_func( array( __CLASS__, '_get_event_status_array' ) );
		return self::$_statuses;
	}


	public static function additional_attendee_reg_info_array() {
		self::$_additional_attendee_reg_info_array = call_user_func( array( __CLASS__, '_get_additional_attendee_reg_info_array' ) );
		return self::$_additional_attendee_reg_info_enum;
	}



	private function _get_event_status_array() {
		return apply_filters('FHEE_EEM_Event__construct__statuses',array(
			EEM_Event::status_active =>  __("Active", "event_espresso"),
			EEM_Event::status_not_active => __("Not Active", "event_espresso"),
			EEM_Event::status_registration_not_open =>  __("Registration Not Open", "event_espresso"),
			EEM_Event::status_registration_open =>  __("Registration Open", "event_espresso"),
			EEM_Event::status_registration_closed =>  __("Registration Closed", "event_espresso"),
			EEM_Event::status_pending =>  __("Pending", "event_espresso"),
			EEM_Event::status_ongoing =>  __("Ongoing", "event_espresso"),
			EEM_Event::status_secondary =>  __("Secondary", "event_espresso"),
			EEM_Event::status_draft =>  __("Draft", "event_espresso"),
			EEM_Event::status_deleted =>  __("Deleted", "event_espresso"),
			EEM_Event::status_denied =>  __("Denied", "event_espresso"),
			EEM_Event::status_expired=>  __("Expired", "event_espresso"),
			'auto-draft'=>  __("Auto Draft", "event_espresso")
		));
	}



	private function _get_additional_attendee_reg_info_array() {
		return array(
			EEM_Event::additional_attendee_reg_info_none =>  __("None", "event_espresso"),
			EEM_Event::additional_attendee_reg_info_personal_info_only => __("Personal Info Only", "event_espresso"),
			EEM_Event::additional_attendee_reg_info_full =>  __("Full Registration Info", "event_espresso")
		);
	}


}
// End of file EEM_Event.model.php
// Location: /includes/models/EEM_Event.model.php
