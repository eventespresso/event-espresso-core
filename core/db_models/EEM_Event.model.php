<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
require_once( EE_MODELS . 'EEM_CPT_Base.model.php');
/**
 *
 * EEM_Event Model
 *
 * extends EEM_CPT_Base which extends EEM_Base
 *
 * @package			Event Espresso
 * @subpackage		includes/models/
 * @author				Michael Nelson, Brent Christensen
 *
 */
class EEM_Event  extends EEM_CPT_Base{

	/**
	 * constant used by status(), indicating that no more tickets can be purchased for any of the datetimes for the event
	 */
	const sold_out = 'sold_out';

	/**
	 * constant used by status(), indicating that upcoming event dates have been postponed (may be pushed to a later date)
	 */
	const postponed = 'postponed';

	/**
	 * constant used by status(), indicating that the event will no longer occur
	 */
	const cancelled = 'cancelled';



	/**
	 * private instance of the Event object
	 * @var EEM_Event
	 */
	private static $_instance = NULL;



	/**
	 *        This function is a singleton method used to instantiate the EEM_Event object
	 *
	 * @access public
	 * @param string $timezone
	 * @return EEM_Event
	 */
	public static function instance( $timezone = NULL ){

		// check if instance of EEM_Event already exists
		if ( ! self::$_instance instanceof EEM_Event ) {
			// instantiate Espresso_model
			self::$_instance = new self( $timezone );
		}
		//we might have a timezone set, let set_timezone decide what to do with it
		self::$_instance->set_timezone( $timezone );
		// EEM_Event object
		return self::$_instance;
	}



	/**
	 * Adds a relationship to Term_Taxonomy for each CPT_Base
	 * @param string $timezone
	 * @return EEM_Event
	 */
	protected function __construct($timezone = null){

		EE_Registry::instance()->load_model( 'Registration' );

		$this->singular_item = __('Event','event_espresso');
		$this->plural_item = __('Events','event_espresso');

		// to remove Cancelled events from the frontend, copy the following filter to your functions.php file
		// add_filter( 'AFEE__EEM_Event__construct___custom_stati__cancelled__Public', '__return_false' );
		// to remove Postponed events from the frontend, copy the following filter to your functions.php file
		// add_filter( 'AFEE__EEM_Event__construct___custom_stati__postponed__Public', '__return_false' );
		// to remove Sold Out events from the frontend, copy the following filter to your functions.php file
		//	add_filter( 'AFEE__EEM_Event__construct___custom_stati__sold_out__Public', '__return_false' );

		$this->_custom_stati = apply_filters(
			'AFEE__EEM_Event__construct___custom_stati',
			array(
				EEM_Event::cancelled => array(
					'label' => __('Cancelled', 'event_espresso'),
					'public' => apply_filters( 'AFEE__EEM_Event__construct___custom_stati__cancelled__Public', TRUE )
				),
				EEM_Event::postponed => array(
					'label' => __('Postponed', 'event_espresso'),
					'public' => apply_filters( 'AFEE__EEM_Event__construct___custom_stati__postponed__Public', TRUE )
				),
				EEM_Event::sold_out => array(
					'label' => __('Sold Out', 'event_espresso'),
					'public' => apply_filters( 'AFEE__EEM_Event__construct___custom_stati__sold_out__Public', TRUE )
				)
			)
		);

		$this->_tables = array(
			'Event_CPT'=>new EE_Primary_Table( 'posts','ID' ),
			'Event_Meta'=> new EE_Secondary_Table( 'esp_event_meta', 'EVTM_ID', 'EVT_ID' )
		);

		$this->_fields = array(
			'Event_CPT'=>array(
				'EVT_ID'=>new EE_Primary_Key_Int_Field( 'ID', __( 'Post ID for Event','event_espresso' )),
				'EVT_name'=>new EE_Plain_Text_Field( 'post_title', __( 'Event Name','event_espresso' ), FALSE, '' ),
				'EVT_desc'=>new EE_Post_Content_Field( 'post_content', __( 'Event Description', 'event_espresso' ), FALSE, '' ),
				'EVT_slug'=>new EE_Slug_Field( 'post_name', __( 'Event Slug', 'event_espresso' ), FALSE, '' ),
				'EVT_created'=>new EE_Datetime_Field( 'post_date', __( 'Date/Time Event Created', 'event_espresso' ), FALSE, current_time( 'timestamp' )),
				'EVT_short_desc'=>new EE_Simple_HTML_Field( 'post_excerpt', __( 'Event Short Description', 'event_espresso' ), FALSE,'' ),
				'EVT_modified'=>new EE_Datetime_Field( 'post_modified', __( 'Date/Time Event Modified', 'event_espresso' ), TRUE, current_time( 'timestamp' )),
				'EVT_wp_user'=>new EE_Integer_Field( 'post_author', __( 'Wordpress User ID', 'event_espresso'), FALSE, 1 ),
				'parent'=>new EE_Integer_Field( 'post_parent', __( 'Event Parent ID', 'event_espresso' ), TRUE ),
				'EVT_order'=>new EE_Integer_Field( 'menu_order', __( 'Event Menu Order', 'event_espresso' ), FALSE, 1 ),
				'post_type'=>new EE_WP_Post_Type_Field('espresso_events'),// EE_Plain_Text_Field( 'post_type', __( 'Event Post Type', 'event_espresso' ), FALSE, 'espresso_events' ),
				'status' => new EE_WP_Post_Status_Field( 'post_status', __( 'Event Status', 'event_espresso' ), FALSE, 'draft', $this->_custom_stati )
			),
			'Event_Meta'=>array(
				'EVTM_ID'=> new EE_DB_Only_Float_Field( 'EVTM_ID', __( 'Event Meta Row ID','event_espresso' ), FALSE ),
				'EVT_ID_fk'=>new EE_DB_Only_Int_Field( 'EVT_ID', __( 'Foreign key to Event ID from Event Meta table', 'event_espresso' ), FALSE ),
				'EVT_display_desc'=>new EE_Boolean_Field( 'EVT_display_desc', __( 'Display Description Flag', 'event_espresso' ), FALSE, 1 ),
				'EVT_display_ticket_selector'=>new EE_Boolean_Field( 'EVT_display_ticket_selector', __( 'Display Ticket Selector Flag', 'event_espresso' ), FALSE, 1 ),
				'EVT_visible_on'=>new EE_Datetime_Field( 'EVT_visible_on', __( 'Event Visible Date', 'event_espresso' ), TRUE, current_time( 'timestamp' )),
				'EVT_additional_limit'=>new EE_Integer_Field( 'EVT_additional_limit', __( 'Limit of Additional Registrations on Same Transaction', 'event_espresso' ), TRUE, 10 ),
				'EVT_default_registration_status'=>new EE_Enum_Text_Field(
					'EVT_default_registration_status', __( 'Default Registration Status on this Event', 'event_espresso' ), FALSE, EEM_Registration::status_id_pending_payment, EEM_Registration::reg_status_array()
				),
				'EVT_member_only'=>new EE_Boolean_Field( 'EVT_member_only', __( 'Member-Only Event Flag', 'event_espresso' ), FALSE, FALSE ),
				'EVT_phone'=> new EE_Plain_Text_Field('EVT_phone', __( 'Event Phone Number', 'event_espresso' ), FALSE ),
				'EVT_allow_overflow'=>new EE_Boolean_Field(  'EVT_allow_overflow', __( 'Allow Overflow on Event', 'event_espresso' ), FALSE, FALSE ),
				'EVT_timezone_string'=>new EE_Plain_Text_Field( 'EVT_timezone_string', __( 'Timezone (name) for Event times', 'event_espresso' ), FALSE ),
				'EVT_external_URL'=>new EE_Plain_Text_Field( 'EVT_external_URL', __( 'URL of Event Page if hosted elsewhere', 'event_espresso' ), TRUE ),
				'EVT_donations'=>new EE_Boolean_Field( 'EVT_donations', __( 'Accept Donations?', 'event_espresso' ), FALSE, FALSE )

			));

		$this->_model_relations = array(
			'Registration'=>new EE_Has_Many_Relation(),
			'Datetime'=>new EE_Has_Many_Relation(),
			'Question_Group'=>new EE_HABTM_Relation('Event_Question_Group'),
			'Venue'=>new EE_HABTM_Relation('Event_Venue'),
			'Term_Taxonomy'=>new EE_HABTM_Relation('Term_Relationship'),
			'Message_Template_Group' => new EE_HABTM_Relation('Event_Message_Template'),
			'Attendee'=>new EE_HABTM_Relation('Registration'),
		);

		$this->_default_where_conditions_strategy = new EE_CPT_Where_Conditions('espresso_events', 'EVTM_ID');
		parent::__construct( $timezone );
	}






	/**
	*		get_question_groups
	*
	* 		@access		public
	*		@return 		array
	*/
	public function get_all_question_groups() {
		return EE_Registry::instance()->load_model( 'Question_Group' )->get_all( array(
			array( 'QSG_deleted' => FALSE ),
			'order_by' => array( 'QSG_order' => 'ASC' )
		));
	}






	/**
	*		get_question_groups
	*
	* 		@access		public
	* 		@param		int $EVT_ID
	*		@return 		array
	*/
	public function get_all_event_question_groups( $EVT_ID = 0 ) {
		if ( ! isset( $EVT_ID) || ! absint( $EVT_ID )) {
			EE_Error::add_error( __( 'An error occurred. No Event Question Groups could be retrieved because an Event ID was not received.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		return EE_Registry::instance()->load_model( 'Event_Question_Group' )->get_all( array(
			array( 'EVT_ID' => $EVT_ID )
		));
	}





	/**
	*		get_question_groups
	*
	* 		@access		public
	* 		@param		int $EVT_ID
	* 		@param		boolean	$for_primary_attendee
	*		@return 		array
	*/
	public function get_event_question_groups( $EVT_ID = 0, $for_primary_attendee = TRUE ) {
		if ( ! isset( $EVT_ID) || ! absint( $EVT_ID )) {
			EE_Error::add_error( __( 'An error occurred. No Event Question Groups could be retrieved because an Event ID was not received.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		return EE_Registry::instance()->load_model( 'Event_Question_Group' )->get_all( array(
			array( 'EVT_ID' => $EVT_ID, 'EQG_primary' => $for_primary_attendee )
		));
	}






	/**
	*		get_question_groups
	*
	* 		@access		public
	* 		@param		int $EVT_ID
	* 		@param		EE_Registration 	$registration
	*		@return 		array
	*/
	public function get_question_groups_for_event( $EVT_ID = 0, EE_Registration $registration ) {

		if ( ! isset( $EVT_ID) || ! absint( $EVT_ID )) {
			EE_Error::add_error( __( 'An error occurred. No Question Groups could be retrieved because an Event ID was not received.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}

		$where_params = array(
			'Event_Question_Group.EVT_ID' => $EVT_ID,
			'Event_Question_Group.EQG_primary' => $registration->count() == 1 ? TRUE : FALSE,
			'QSG_deleted' => FALSE
		);

		return EE_Registry::instance()->load_model( 'Question_Group' )->get_all( array(
			$where_params,
			'order_by' => array('QSG_order' => 'ASC')
		));

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
			EE_Error::add_error( __( 'An error occurred. No Question Group IDs were received.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}

		return EE_Registry::instance()->load_model( 'Question' )->get_all( array(
			array(
				'Question_Group.QSG_ID' => array( 'IN', $QSG_IDs ),
				'QST_deleted' => FALSE,
				'QST_admin_only' => is_admin()
			),
			'order_by' => 'QST_order'
		));

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
			EE_Error::add_error( __( 'An error occurred. No Question IDs were received.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}

		return EE_Registry::instance()->load_model( 'Question_Option' )->get_all( array(
			array(
				'Question.QST_ID' => array( 'IN', $QST_IDs ),
				'QSO_deleted' => FALSE
			),
			'order_by' => 'QSO_ID'
		));

	}



	/**
	 *        _get_question_target_db_column
	 *
	 * @access 	public
	 * @param 	EE_Registration $registration (so existing answers for registration are included)
	 * @param 	int 	$EVT_ID 	so all question groups are included for event (not just answers from registration).
	 * @throws EE_Error
	 * @return 	array
	 */
	public function assemble_array_of_groups_questions_and_options( EE_Registration $registration, $EVT_ID = 0 ) {

		if ( empty( $EVT_ID ) ) {
			throw new EE_Error( __( 'An error occurred. No EVT_ID is included.  Needed to know which question groups to retrieve.', 'event_espresso' ) );
		}

		$questions = array();

		// get all question groups for event
		$qgs = $this->get_question_groups_for_event( $EVT_ID, $registration );
		if ( !empty( $qgs ) ) {
			foreach ( $qgs as $qg ) {
			 	$qsts = $qg->questions();
			 	$questions[ $qg->ID() ] = $qg->model_field_array();
			 	$questions[ $qg->ID() ]['QSG_questions'] = array();
			 	foreach ( $qsts as $qst ) {
			 		if ( $qst->is_system_question() )
			 			continue;
			 		$answer = EEM_Answer::instance()->get_one( array( array( 'QST_ID' => $qst->ID(), 'REG_ID' => $registration->ID() ) ) );
			 		$answer = $answer instanceof EE_Answer ? $answer : EEM_Answer::instance()->create_default_object();
			 		$qst_name = $qstn_id = $qst->ID();
			 		$ans_id = $answer->ID();
			 		$qst_name = !empty( $ans_id ) ?  '[' . $qst_name . '][' . $ans_id . ']' : '[' . $qst_name . ']';
			 		$input_name = '';
			 		$input_id = sanitize_key( $qst->display_text() );
			 		$input_class = '';
			 		$questions[$qg->ID()]['QSG_questions'][$qst->ID()] = $qst->model_field_array();
		 			$questions[ $qg->ID() ]['QSG_questions'][ $qst->ID() ]['QST_input_name'] = 'qstn' . $input_name . $qst_name;
					$questions[ $qg->ID() ]['QSG_questions'][ $qst->ID() ]['QST_input_id'] = $input_id . '-' . $qstn_id;
					$questions[ $qg->ID() ]['QSG_questions'][ $qst->ID() ]['QST_input_class'] = $input_class;
					$questions[ $qg->ID() ]['QSG_questions'][ $qst->ID() ]['QST_options'] = array();
					$questions[ $qg->ID() ]['QSG_questions'][ $qst->ID() ]['qst_obj'] = $qst;
					$questions[ $qg->ID() ]['QSG_questions'][ $qst->ID() ]['ans_obj'] = $answer;

					if ( $qst->type() == 'SINGLE' || $qst->type() == 'MULTIPLE' || $qst->type() == 'DROPDOWN' ) {
						$QSOs = $qst->options(TRUE,$answer->value());
						if ( is_array( $QSOs ) ) {
							foreach ( $QSOs as $QSO_ID => $QSO ) {
								$questions[ $qg->ID() ]['QSG_questions'][ $qst->ID() ]['QST_options'][ $QSO_ID ] = $QSO->model_field_array();
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



	/**
	 * Gets all events that are published and have event start time earlier than now and an event end time later than now
	 *
	 * @access public
	 * @param  array  $query_params An array of query params to further filter on (note that status and DTT_EVT_start and DTT_EVT_end will be overridden)
	 * @param bool    $count whether to return the count or not (default FALSE)
	 * @return array 	EE_Event objects
	 */
	public function get_active_events( $query_params, $count = FALSE ) {
		if ( array_key_exists( 0, $query_params ) ) {
			$where_params = $query_params[0];
			unset( $query_params[0] );
		} else {
			$where_params = array();
		}

		//let's add specific query_params for active_events - keep in mind this will override any sent status in the query AND any date queries.
		$where_params['status'] = 'publish';
		$where_params['Datetime.DTT_EVT_start'] = array('>',  date('Y-m-d g:i:s', time() ) );
		$where_params['Datetime.DTT_EVT_end'] = array('<', date('Y-m-d g:i:s', time() ) );
		$query_params[0] = $where_params;
		$events = $count ? $this->count($query_params, 'EVT_ID') : $this->get_all( $query_params );
		return $events;
	}





	/**
	 * get all events that are published and have an event start time later than now
	 *
	 * @access public
	 * @param  array 	$query_params An array of query params to further filter on (Note that status and DTT_EVT_start will be overridden)
	 * @param bool    $count whether to return the count or not (default FALSE)
	 * @return array               EE_Event objects
	 */
	public function get_upcoming_events( $query_params, $count = FALSE ) {
		if ( array_key_exists( 0, $query_params ) ) {
			$where_params = $query_params[0];
			unset( $query_params[0] );
		} else {
			$where_params = array();
		}

		//let's add specific query_params for active_events - keep in mind this will override any sent status in the query AND any date queries.
		$where_params['status'] = 'publish';
		$where_params['Datetime.DTT_EVT_start'] = array('>', date('Y-m-d g:i:s', time() ) );
		$query_params[0] = $where_params;
		return $count ? $this->count($query_params, 'EVT_ID') : $this->get_all( $query_params );
	}


	/**
	 * Get all events that are either published and have an event end time that is less than now OR unpublished events.
	 *
	 * @access public
	 * @param  array  $query_params An array of query params to further filter on (note that status and DTT_EVT_end will be overridden)
	 * @param bool    $count whether to return the count or not (default FALSE)
	 * @return array 	EE_Event objects
	 */
	public function get_expired_events( $query_params, $count = FALSE ) {
		if ( array_key_exists( 0, $query_params ) ) {
			$where_params = $query_params[0];
			unset( $query_params[0] );
		} else {
			$where_params = array();
		}

		//let's add specific query_params for active_events - keep in mind this will override any sent status in the query AND any date queries.
		if ( isset( $where_params['status'] ) )
			unset( $where_params['status'] );
		$where_params['OR'] = array( 'status' => array( '!=', 'publish' ), 'AND' => array('status' => 'publish', 'Datetime.DTT_EVT_end' => array( '<',  date('Y-m-d g:i:s', time() ) ) ) );
		$query_params[0] = $where_params;
		return $count ? $this->count($query_params, 'EVT_ID') : $this->get_all( $query_params );
	}



	/**
	 * This basically just returns the events that do not have the publish status or that are expired.
	 * @param  array  $query_params  An array of query params to further filter on (note that status will be overwritten)
	 * @param  boolean $count        whether to return the count or not (default FALSE)
	 * @return EE_Event[]            array of EE_Event objects
	 */
	public function get_inactive_events( $query_params, $count = FALSE ) {
		if ( array_key_exists( 0, $query_params ) ) {
			$where_params = $query_params[0];
			unset( $query_params[0] );
		} else {
			$where_params = array();
		}

		//let's add in specific query_params for inactive events.
		if ( isset( $where_params['status'] ) )
			unset( $where_params['status'] );

		//we check for events that are not published OR are expired.

		$where_params['OR'] = array( 'status' => array( '!=', 'publish' ), 'Datetime.DTT_EVT_end' => array( '<', date('Y-m-d g:i:s', time() ) ) );
		$query_params[0] = $where_params;
		return $count ? $this->count( $query_params, 'EVT_ID' ) : $this->get_all( $query_params );
	}


	/**
	 * This is just injecting into the parent add_relationship_to so we do special handling on price relationships because we don't want to override any existing global default prices but instead insert NEW prices that get attached to the event.
	 * See parent for param descriptions
	 */
	public function add_relationship_to($id_or_obj,$other_model_id_or_obj, $relationName, $where_query = array()){

		if ( $relationName == 'Price' ) {
			//let's get the PRC object for the given ID to make sure that we aren't dealing with a default
			$prc_chk = $this->get_related_model_obj($relationName)->ensure_is_obj($other_model_id_or_obj);
			//if EVT_ID = 0, then this is a default
			if ( $prc_chk->get('EVT_ID') == 0 ) {
				//let's set the prc_id as 0 so we force an insert on the add_relation_to carried out by relation
				$prc_chk->set('PRC_ID', 0);
			}

			//run parent
			return parent::add_relationship_to($id_or_obj, $prc_chk, $relationName, $where_query);
		}

		//otherwise carry on as normal
		return parent::add_relationship_to($id_or_obj,$other_model_id_or_obj, $relationName, $where_query);
	}



}
// End of file EEM_Event.model.php
// Location: /includes/models/EEM_Event.model.php
