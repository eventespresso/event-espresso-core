<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
do_action('AHEE_log', __FILE__, ' FILE LOADED', '' );
/**
 * EE_Export class
 *
 * @package				Event Espresso
 * @subpackage			includes/functions
 * @author					Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
 class EE_Export {


  // instance of the EE_Export object
	private static $_instance = NULL;
	
  // instance of the EE_CSV object
	static $EE_CSV = NULL;
	
	var $_basic_header = array();
	var $_question_groups = array();
	var $_event_id = FALSE;
	var $_event_identifier = FALSE;
	var $_event_name = FALSE;
	var $_event_description = FALSE;
	var $_event_meta = FALSE;
	
	private $_req_data = array();

 
	/**
	 *		private constructor to prevent direct creation
	 *		@Constructor
	 *		@access private
	 *		@return void
	 */	
 	private function __construct( $request_data = array() ) {
		require_once( EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/classes/EE_CSV.class.php' );
		$this->EE_CSV= EE_CSV::instance();
		$this->_req_data = $request_data;
	}


	/**
	 *		@ singleton method used to instantiate class object
	 *		@ access public
	 *		@ return class instance
	 */	
	public static function instance( $request_data = array() ) {
		// check if class object is instantiated
		if ( self::$_instance === NULL  or ! is_object( self::$_instance ) or ! is_a( self::$_instance, __CLASS__ )) {
			self::$_instance = new self( $request_data );
		}
		return self::$_instance;
	}
	

	/**
	 *			@Export Event Espresso data - routes export requests
	 *		  @access public
	 *			@return void
	 */	
	public function export() {
	
		

		$this->today = date("Y-m-d",time());
		
		// in case of bulk exports, the "actual" action will be in action2, but first check regular action for "export" keyword
		if ( isset( $this->_req_data['action'] ) && strpos( $this->_req_data['action'], 'export' ) === FALSE ) {
			// check if action2 has export action
			if ( isset( $this->_req_data['action2'] ) && strpos( $this->_req_data['action2'], 'export' ) !== FALSE ) {
				// whoop! there it is!
				$this->_req_data['action'] = $this->_req_data['action2'];
			}
		}

		switch ($this->_req_data['export']) {
			case 'report':
				switch ($this->_req_data['action']) {
				
					case 'everything':
						$this->export_freakin_everything();
					break;
					
					case "event";
					case "export_events";
					case 'all_event_data' :
						$this->export_all_event_data();
					break;  
					
					case 'attendees':
						$this->export_attendees();
					break;
					
					case 'payment':
						$this->export_payment();
					break;
					
					case 'categories':
						$this->export_categories();
					break;
					
					case 'groupons':
						$this->export_groupons();
					break;

					default:
						// set the error message which is stored within the EE_CSV class
						$this->EE_CSV->_notices['errors'][] = 'An error occured! The requested export report could not be found.';
						// add the output of the csv_admin_notices function to the admin_notices hook
						add_action('admin_notices', array( $this->EE_CSV, 'csv_admin_notices' ) );
					break;
					
				}
			break; // end of switch export : report
			default:
			break;
		} // end of switch export
		
		exit;

	}
	


	/**
	 *		Export data for FREAKIN EVERYTHING !!!
	 *		 
	 *		usage: http://your-domain.tld/wp-admin/admin.php?event_espresso&export=report&action=everything&type=csv
	 *		 
	 *		@access public
	 *		@return void
	 */	
	function export_freakin_everything() {
	
		$tables_to_export = array( 
			EVENTS_ANSWER_TABLE,
			EVENTS_ATTENDEE_TABLE,
			EVENTS_ATTENDEE_COST_TABLE,
			EVENTS_CATEGORY_TABLE,
			EVENTS_CATEGORY_REL_TABLE,
			EVENTS_DETAIL_TABLE,
			EVENTS_DISCOUNT_CODES_TABLE,
			EVENTS_DISCOUNT_REL_TABLE,
			EVENTS_EMAIL_TABLE,
			EVENTS_LOCALE_TABLE,
			EVENTS_LOCALE_REL_TABLE,
			EVENTS_MULTI_EVENT_REGISTRATION_ID_GROUP_TABLE,
			EVENTS_PERSONNEL_TABLE,
			EVENTS_PERSONNEL_REL_TABLE,
			EVENTS_PRICES_TABLE,
			EVENTS_QST_GROUP_TABLE,
			EVENTS_QST_GROUP_REL_TABLE,
			EVENTS_QUESTION_TABLE,
			EVENTS_START_END_TABLE,
			EVENTS_VENUE_TABLE,
			EVENTS_VENUE_REL_TABLE
		);
																				
		$table_data = $this->process_multi_table_export( $tables_to_export );
		$filename = $this->generate_filename ( 'full-db-export' );

		if ( ! $this->EE_CSV->export_array_to_csv( FALSE, $table_data, $filename )) {
			$this->EE_CSV->_notices['errors'][] = 'An error occured and the Event details could not be exported from the database.';
			add_action('admin_notices', array( $this->EE_CSV, 'csv_admin_notices' ) );
		}
	}	


	/**
	 *	@Export data for one event ? dunno
	 *	@access public
	 *	@return void
	 */	
	function export_event() {
		if ( ! isset( $this->_req_data['event_id'] )) {
			throw new EE_Error(__('We need an event_id to export events.', 'event_espresso'));
		}
			
		$event_ids = is_array($this->_req_data['event_id']) ? $this->_req_data['event_id'] : (array) $this->_req_data['event_id'];
		$filename = sanitize_title_with_dashes($this->_event_name);
		foreach ( $event_ids as $this->_event_id ) {
			$table_data[] = $this->espresso_event_export();
		}

		$filename = $this->_req_data['all_events'] == "true" || count($event_ids) > 1 ? __('multiple-events', 'event_espresso') :	$filename;
		$filename .= "-" . $this->today ;
		if ( ! $this->EE_CSV->export_array_to_csv( FALSE, $table_data, $filename )) {
			$this->EE_CSV->_notices['errors'][] = 'An error occured and the Event details could not be exported from the database.';
			add_action('admin_notices', array( $this->EE_CSV, 'csv_admin_notices' ) );
		}
	}




	/**
	 *			@Export data for ALL events
	 *		  @access public
	 *			@return void
	 */	
	function export_all_event_data() {
		global $wpdb;
		//printr( $this->_req_data, 'XXXXXXX  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		// are any Event IDs set?
		if ( isset( $this->_req_data['EVT_ID'] )) {
			// do we have an array of IDs ?
			if ( is_array( $this->_req_data['EVT_ID'] )) {
				// generate an "IN (CSV)" where clause
				$EVT_ID = implode( array_map( 'sanitize_text_field', $this->_req_data['EVT_ID'] ), ',' );
				$filename = 'events';
				$EVT_ID = 'IN (' . $EVT_ID . ')';
			} else {
				// generate regular where = clause
				$EVT_ID = absint( $this->_req_data['EVT_ID'] );
				$filename = 'event#' . $EVT_ID;
				$EVT_ID = '= ' . $EVT_ID;
			}
		} else {
			// no IDs mena we will d/l the entire table
			$EVT_ID = FALSE;
			$filename = 'all-events';
		}
																				

		// array in the format:  table name =>  query where clause
		$tables_to_export = array( 
				$wpdb->prefix . 'events_detail'	=> ' WHERE id ' . $EVT_ID,
				$wpdb->prefix . 'esp_datetime'	=> ' WHERE EVT_ID ' . $EVT_ID,
				//$wpdb->prefix . 'esp_event_question_group'	=> ' WHERE EVT_ID ' . $EVT_ID,				
				$wpdb->prefix . 'esp_price'	=> ' WHERE EVT_ID ' . $EVT_ID,
				$wpdb->prefix . 'events_category_detail'	=> FALSE,
				$wpdb->prefix . 'events_category_rel'	=> ' WHERE event_id ' . $EVT_ID,
				$wpdb->prefix . 'events_venue'	=> FALSE,
				$wpdb->prefix . 'events_venue_rel' =>  ' WHERE event_id ' . $EVT_ID,

			);
			
		$table_data = $this->process_multi_table_export( $tables_to_export );
//		echo 'echodump of array_keys($tables_to_export)';
//		var_dump($table_data);
		$table_data[$wpdb->prefix."esp_attendee"] = 
				$wpdb->get_results($wpdb->prepare("SELECT * FROM ".$wpdb->prefix."esp_attendee att INNER JOIN ".$wpdb->prefix."esp_registration reg
			ON att.ATT_ID = reg.ATT_ID WHERE reg.EVT_ID=%d",$EVT_ID));
		
		$filename = $this->generate_filename ( $filename );

//		echo 'echodump of array_keys( $tables_to_export )';
//		var_dump(array_keys( $tables_to_export ));
		if ( ! $this->EE_CSV->export_array_to_csv( array_keys( $tables_to_export ), $table_data, $filename )) {
			$this->EE_CSV->_notices['errors'][] = 'An error occured and the Event details could not be exported from the database.';
			add_action('admin_notices', array( $this->EE_CSV, 'csv_admin_notices' ) );
		}
	}

	
	/**
	 *			@Export data for ALL attendees
	 *		  @access public
	 *			@return void
	 */	
	function export_attendees() {
		global $wpdb;
		$tables_to_export = array( 
			$wpdb->prefix . 'esp_attendee'=>''
				//EVENTS_ATTENDEE_TABLE,
				//EVENTS_ATTENDEE_COST_TABLE,
				//EVENTS_ATTENDEE_META_TABLE
			);
																				
		$table_data = $this->process_multi_table_export( $tables_to_export );
		$filename = $this->generate_filename ( 'all-attendees' );

		if ( ! $this->EE_CSV->export_array_to_csv( FALSE, $table_data, $filename )) {
			$this->EE_CSV->_notices['errors'][] = 'An error occured and the Attendee data could not be exported from the database.';
			add_action('admin_notices', array( $this->EE_CSV, 'csv_admin_notices' ) );
		}
	}
	
	function report_event_registrations($event_id){
		$data = array('registrations'=>array(
			'HEADINGS'=>array(
				'monkey'=>'monkey',
				'bob'=>'bob'
			),
			array('col1','col2'),
			array('monkey','chimp')
		));
		//get all registraionts for this event
		$registrations = EEM_Registration::instance()->get_all_where(array('EVT_ID'=>$event_id),null,'ASC','=',99999);
//		echo 'echodump of $registrations';
//		var_dump($registrations);die;
		global $wpdb;
		$registration_columns = array(
			'REG_ID',
			'ATT_ID',
			'REG_final_price',
			'REG_count',
			'REG_group_size',
			'STS_ID',
		);
		$question_columns = array();
		//get all questions answerd by any of these registrants
		$questionStdClasses = $wpdb->get_results("select * from ".$wpdb->prefix."esp_question q 
			INNER JOIN ".$wpdb->prefix."esp_answer a ON q.QST_ID = a.QST_ID WHERE REG_ID IN (".implode(",",array_keys($registrations)).")",OBJECT_K);
		foreach($questionStdClasses as $questionStdClass){
			$question_columns[$questionStdClass->QST_ID] = $questionStdClass->QST_admin_label;
		}

	//get all answers for this registration
		$csv_ready_data_array = array();
		$csv_ready_data_array['HEADINGS'] = array_merge($registration_columns,$question_columns);
		foreach($registrations as $registration){
			$csv_ready_entry = array();
			/* @var $registration EE_Registration */
			foreach($registration_columns as $reg_column){
				if($reg_column == 'STS_ID'){
					$csv_ready_entry[] = $registration->pretty_status();
				}else{
					$csv_ready_entry[] = $registration->get($reg_column);
				}
				
			}
			//now get their answers to custom questions
			$answers = $registration->answers_and_questions();
			
			//and insert into csv ready array in the same order as the columns
			foreach($question_columns as $question_id => $question_column){
				//now find their answer to that question
				foreach($answers as $answer){
					if($answer->question_ID() == $question_id){
						$csv_ready_entry[] = $answer->value();
					}
				}
			}
			
			$csv_ready_data_array[] = $csv_ready_entry;
		}
		
//		echo 'echodump of $csv_ready_data_array';
//		var_dump($csv_ready_data_array);
//echo 'echodump of $data';
//var_dump($data);
		$a_reg = array_shift($registrations);
		$this->EE_CSV->export_array_to_csv(array('wp_registrations'),$csv_ready_data_array,  sanitize_title_with_dashes($a_reg->event_name())."-registrations");
	}

	
	/**
	 *			@Export data for ALL events
	 *		  @access public
	 *			@return void
	 */	
	function export_categories() {
		$tables_to_export = array( 
				EVENTS_CATEGORY_REL_TABLE,
				EVENTS_CATEGORY_TABLE,
			);
																				
		$table_data = $this->process_multi_table_export( $tables_to_export );
		$filename = $this->generate_filename ( 'all-categories' );

		if ( ! $this->EE_CSV->export_array_to_csv( FALSE, $table_data, $filename )) {
			$this->EE_CSV->_notices['errors'][] = 'An error occured and the Category details could not be exported from the database.';
			add_action('admin_notices', array( $this->EE_CSV, 'csv_admin_notices' ) );
		}
	}

	
	/**
	 *			@Export data for groupons ?
	 *		  @access public
	 *			@return void
	 */	
	function export_groupons() {
		$groupon_codes = $this->EE_CSV->export_table_to_array ( EVENTS_GROUPON_CODES_TABLE );
		if ( ! $this->EE_CSV->export_array_to_csv( FALSE, $groupon_codes, 'groupon_codes' ) ) {
			$this->EE_CSV->_notices['errors'][] = 'An error occured and the Groupon Code(s) could not be exported from the database.';
			add_action('admin_notices', array( $this->EE_CSV, 'csv_admin_notices' ) );
		}
	}

	
	
	
	/**
	 *			@process export name to create a suitable filename
	 *		  @access private
	 *		  @param string - export_name
	 *			@return string on success, FALSE on fail
	 */	
	private function generate_filename ( $export_name = FALSE ) {
		if ( $export_name ) {
			$filename = get_bloginfo('name') . '-' . $export_name;
			$filename = sanitize_key( $filename ) . '-' . $this->today;
			return $filename;
		}	 else {
			$this->EE_CSV->_notices['errors'][] = 'No filename was provided.';
			add_action('admin_notices', array( $this->EE_CSV, 'csv_admin_notices' ) );
		}
	}	
	
	
	
	/**
	 *	@recursive funtion for exporting table data and merging the results with the next results
	 *	@access private
	 *	@param array - tables_to_export
	 *	@return array on success, FALSE on fail
	 */	
	private function process_multi_table_export( $tables_to_export = FALSE ) {
		$table_data = FALSE;
		if ( is_array( $tables_to_export ) ) {
			foreach ( $tables_to_export as $table => $query_where_clause ) {
				$query = $query_where_clause ? 'SELECT * FROM ' . $table . $query_where_clause : FALSE;
				$table_data = $this->EE_CSV->export_table_to_array ( $table, $table_data, $query );
			}
		}
		return $table_data;
	}		




	


}
/* End of file EE_Export.class.php */
/* Location: /includes/classes/EE_Export.class.php */