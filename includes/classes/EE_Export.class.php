<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
do_action('action_hook_espresso_log', __FILE__, ' FILE LOADED', '' );
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

 
	/**
	 *		private constructor to prevent direct creation
	 *		@Constructor
	 *		@access private
	 *		@return void
	 */	
  private function __construct() {
	}


	/**
	 *		@ singleton method used to instantiate class object
	 *		@ access public
	 *		@ return class instance
	 */	
	public static function instance() {
		// check if class object is instantiated
		if ( self::$_instance === NULL  or ! is_object( self::$_instance ) or ! is_a( self::$_instance, __CLASS__ )) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	

	/**
	 *			@Export Event Espresso data - routes export requests
	 *		  @access public
	 *			@return void
	 */	
	public function export() {
	
		require_once( EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/classes/EE_CSV.class.php' );
		$this->EE_CSV= EE_CSV::instance();

		$this->today = date("Y-m-d",time());

		switch ($_REQUEST['export']) {
			case 'report':
				switch ($_REQUEST['action']) {
				
					case 'everything':
						$this->export_freakin_everything();
					break;
					case "event";
						$this->export_event();
					break;
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
																				
		$table_data = $this->process_mult_table_export( $tables_to_export );
		$filename = $this->generate_filename ( 'full-db-export' );

		if ( ! $this->EE_CSV->export_array_to_csv( FALSE, $table_data, $filename )) {
			$this->EE_CSV->_notices['errors'][] = 'An error occured and the Event details could not be exported from the database.';
			add_action('admin_notices', array( $this->EE_CSV, 'csv_admin_notices' ) );
		}
	}	


	/**
	 *			@Export data for one event ? dunno
	 *		  @access public
	 *			@return void
	 */	
	function export_event() {
		if ( !isset( $_REQUEST['event_id'] ) )
			throw new EE_Error(__('We need an event_id to export events.', 'event_espresso') );
		$event_ids = is_array($_REQUEST['event_id']) ? $_REQUEST['event_id'] : (array) $_REQUEST['event_id'];
		$filename = sanitize_title_with_dashes($this->_event_name);
		foreach ( $event_ids as $this->_event_id ) {
			$table_data[] = $this->espresso_event_export();
		}

		$filename = $_REQUEST['all_events'] == "true" || count($event_ids) > 1 ? __('multiple-events', 'event_espresso') :	$filename;
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
		$tables_to_export = array( 
				EVENTS_DETAIL_TABLE,
				EVENTS_CATEGORY_REL_TABLE,
				EVENTS_CATEGORY_TABLE,
				EVENTS_VENUE_REL_TABLE,
				EVENTS_VENUE_TABLE,
				EVENTS_LOCALE_REL_TABLE,
				EVENTS_LOCALE_TABLE
			);
																				
		$table_data = $this->process_mult_table_export( $tables_to_export );
		$filename = $this->generate_filename ( 'all-events' );

		if ( ! $this->EE_CSV->export_array_to_csv( FALSE, $table_data, $filename )) {
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
		$tables_to_export = array( 
				EVENTS_ATTENDEE_TABLE,
				EVENTS_ATTENDEE_COST_TABLE,
				//EVENTS_ATTENDEE_META_TABLE
			);
																				
		$table_data = $this->process_mult_table_export( $tables_to_export );
		$filename = $this->generate_filename ( 'all-attendees' );

		if ( ! $this->EE_CSV->export_array_to_csv( FALSE, $table_data, $filename )) {
			$this->EE_CSV->_notices['errors'][] = 'An error occured and the Attendee data could not be exported from the database.';
			add_action('admin_notices', array( $this->EE_CSV, 'csv_admin_notices' ) );
		}
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
																				
		$table_data = $this->process_mult_table_export( $tables_to_export );
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
			$filename = str_replace( ' ', '-', strtolower( $filename )) . '-' . $this->today;
			return $filename;
		}	 else {
			$this->EE_CSV->_notices['errors'][] = 'No filename was provided.';
			add_action('admin_notices', array( $this->EE_CSV, 'csv_admin_notices' ) );
		}
	}	
	
	
	
	/**
	 *			@recursive funtion for exporting table data and merging the results with the next results
	 *		  @access private
	 *		  @param array - tables_to_export
	 *			@return array on success, FALSE on fail
	 */	
	private function process_mult_table_export( $tables_to_export = FALSE ) {
		$table_data = FALSE;
		if ( is_array( $tables_to_export ) ) {
			foreach ( $tables_to_export as $table ) {
				$table_data = $this->EE_CSV->export_table_to_array ( $table, $table_data, FALSE );
			}
		}
		return $table_data;
	}		




	
	
	/**
	 *			@LEGACY CODE  ; )	Export data for event
	 *		  @access private 
	 *			@return void
	 */	
	private function espresso_event_export(){
	
		$this->build_basic_header();

		global $wpdb;

		$htables = array();
		$htables[] = 'Event Id';
		$htables[] = 'Name';
		$htables[] = 'Venue';
		$htables[] = 'Start Date';
		$htables[] = 'Start Time';
		$htables[] = 'DoW';
		$htables[] = 'Reg Begins';
		if (function_exists('espresso_is_admin')&&espresso_is_admin()==true && $espresso_premium == true){
			$htables[] = 'Submitter';
		}
		$htables[] = 'Status';
		$htables[] = 'Attendees';

		if ($_REQUEST['month_range']){
			$pieces = explode('-',$_REQUEST['month_range'], 3);
			$year_r = $pieces[0];
			$month_r = $pieces[1];
		}
		$group = '';
		if (function_exists('espresso_member_data')&&espresso_member_data('role')=='espresso_group_admin')
		{
			$group = get_user_meta(espresso_member_data('id'), "espresso_group", true);
			$group = unserialize($group);
			$sql = "(SELECT e.id event_id, e.event_name, e.event_identifier, e.reg_limit, e.registration_start, ";
			$sql .= " e.start_date, e.is_active, e.recurrence_id, e.registration_startT, ";
			$sql .= " e.address, e.address2, e.city, e.state, e.zip, e.country, ";
			$sql .= " e.venue_title, e.phone, e.wp_user ";
			$sql .= " FROM ". EVENTS_DETAIL_TABLE ." e ";
			if ($_REQUEST[ 'category_id' ] !='')
			{
				$sql .= " JOIN " . EVENTS_CATEGORY_REL_TABLE . " r ON r.event_id = e.id ";
				$sql .= " JOIN " . EVENTS_CATEGORY_TABLE . " c ON  c.id = r.cat_id ";
			}
			if ($group !='')
			{
				$sql .= " JOIN " . EVENTS_VENUE_REL_TABLE . " r ON r.event_id = e.id ";
				$sql .= " JOIN " . EVENTS_LOCALE_REL_TABLE . " l ON  l.venue_id = r.venue_id ";
			}
			$sql .= ($_POST[ 'event_status' ] !='' && $_POST[ 'event_status' ] !='IA')  ? " WHERE event_status = '" . $_POST[ 'event_status' ] ."' ":" WHERE event_status != 'D' ";
			$sql .= $_REQUEST[ 'category_id' ] !='' ? " AND c.id = '" . $_REQUEST[ 'category_id' ] . "' " : '';
			$sql .= $group !='' ? " AND l.locale_id IN (" . implode(",",$group) . ") " : '';
			if ($_POST[ 'month_range' ] !='')
			{
				$sql .= " AND start_date BETWEEN '".date('Y-m-d', strtotime($year_r. '-' .$month_r . '-01'))."' AND '".date('Y-m-d', strtotime($year_r . '-' .$month_r. '-31'))."' ";
			}
			if ($_REQUEST[ 'today' ]=='true')
			{
				$sql .= " AND start_date = '" . $curdate ."' ";
			}
			if ($_REQUEST[ 'this_month' ]=='true')
			{
				$sql .= " AND start_date BETWEEN '".date('Y-m-d', strtotime($this_year_r. '-' .$this_month_r . '-01'))."' AND '".date('Y-m-d', strtotime($this_year_r . '-' .$this_month_r. '-' . $days_this_month))."' ";
			}
			$sql .= ") UNION ";
		}
		$sql .= "(SELECT e.id event_id, e.event_name, e.event_identifier, e.reg_limit, e.registration_start, ";
		$sql .= " e.start_date, e.is_active, e.recurrence_id, e.registration_startT, ";
		$sql .= " e.address, e.address2, e.city, e.state, e.zip, e.country, ";
		$sql .= " e.venue_title, e.phone, e.wp_user ";
		$sql .= " FROM ". EVENTS_DETAIL_TABLE ." e ";
		if ($_REQUEST[ 'category_id' ] !='')
		{
			$sql .= " JOIN " . EVENTS_CATEGORY_REL_TABLE . " r ON r.event_id = e.id ";
			$sql .= " JOIN " . EVENTS_CATEGORY_TABLE . " c ON  c.id = r.cat_id ";
		}
		$sql .= ($_POST[ 'event_status' ] !='' && $_POST[ 'event_status' ] !='IA')  ? " WHERE event_status = '" . $_POST[ 'event_status' ] ."' ":" WHERE event_status != 'D' ";
		$sql .= $_REQUEST[ 'category_id' ] !='' ? " AND c.id = '" . $_REQUEST[ 'category_id' ] . "' " : '';
		if ($_POST[ 'month_range' ] !='')
		{
			$sql .= " AND start_date BETWEEN '".date('Y-m-d', strtotime($year_r. '-' .$month_r . '-01'))."' AND '".date('Y-m-d', strtotime($year_r . '-' .$month_r. '-31'))."' ";
		}
		if ($_REQUEST[ 'today' ]=='true')
		{
			$sql .= " AND start_date = '" . $curdate ."' ";
		}
		if ($_REQUEST[ 'this_month' ]=='true')
		{
			$sql .= " AND start_date BETWEEN '".date('Y-m-d', strtotime($this_year_r. '-' .$this_month_r . '-01'))."' AND '".date('Y-m-d', strtotime($this_year_r . '-' .$this_month_r. '-' . $days_this_month))."' ";
		}
		if(  function_exists('espresso_member_data') && ( espresso_member_data('role')=='espresso_event_manager' || espresso_member_data('role')=='espresso_group_admin') )
		{
			$sql .= " AND wp_user = '" . espresso_member_data('id') ."' ";
		}
		$sql .= ") ORDER BY start_date ASC";
		
		$events = $wpdb->get_results($sql);
		$event_data = array_merge( $htables, $events );
		
		return $event_data;
		
	}



	/**
	 *			@LEGACY CODE  ; ) 
	 *		  @access private
	 *			@return void
	 */	
	private function export_payment() {
	
		$this->build_basic_header();

		global $wpdb;

		
		//will be used to associate questions with correct answers
		$question_list = array();
		//will be used to keep track of newly added and deleted questions
		$question_filter = array();
	
		if ( count( $this->_question_groups ) > 0) {
			$questions_in = '';
			$question_sequence = array();
	
			$questions_in = implode(",", $this->_question_groups);
	
			$group_name = '';
			$counter = 0;
	
			$quest_sql = "SELECT q.id, q.question FROM " . EVENTS_QUESTION_TABLE . " q ";
			$quest_sql .= " JOIN " .  EVENTS_QST_GROUP_REL_TABLE . " qgr on q.id = qgr.question_id ";
			$quest_sql .= " JOIN " . EVENTS_QST_GROUP_TABLE . " qg on qg.id = qgr.group_id ";
			$quest_sql .= " WHERE qgr.group_id in ( " . $questions_in . ") ";
			
			if(  function_exists('espresso_member_data') && ( espresso_member_data('role')=='espresso_event_manager' || espresso_member_data('role')=='espresso_group_admin') ) {
				$quest_sql .= " AND qg.wp_user = '" . espresso_member_data('id') ."' ";
			}
			
			//Fix from Jesse in the forums (http://eventespresso.com/forums/2010/10/form-questions-appearing-in-wrong-columns-in-excel-export/)
			//$quest_sql .= " AND q.system_name is null ORDER BY qg.id, q.id ASC ";
			$quest_sql .= " AND q.system_name is null ORDER BY q.sequence, q.id ASC ";
	
			$questions = $wpdb->get_results($quest_sql);
	
			$num_rows = $wpdb->num_rows;
			if ($num_rows > 0) {
				foreach ($questions as $question) {
					$question_list[$question->id] = $question->question;
					$question_filter[$question->id] = $question->id;
					array_push( $this->_basic_header, escape_csv_val( $question->question, $_REQUEST['type']));
					//array_push($question_sequence, $question->sequence);
				}
			}
		}
	
		if (count($question_filter) >0) {
			$question_filter = implode(",", $question_filter);
		}
		//$participants = $wpdb->get_results("SELECT * FROM ".EVENTS_ATTENDEE_TABLE." WHERE event_id = '$this->event_id'");
	
		//$participants = $wpdb->get_results("SELECT ed.event_name, ed.start_date, a.id, a.lname, a.fname, a.email, a.address, a.city, a.state, a.zip, a.phone, a.payment, a.date, a.payment_status, a.txn_type, a.txn_id, a.amount_pd, a.quantity, a.coupon_code, a.payment_date, a.event_time, a.price_option FROM " . EVENTS_ATTENDEE_TABLE . " a JOIN " . EVENTS_DETAIL_TABLE . " ed ON ed.id=a.event_id WHERE ed.id = '" . $this->event_id . "'");
		$sql = "(";
		
		if (function_exists('espresso_member_data')&&espresso_member_data('role')=='espresso_group_admin') {
			$group = get_user_meta(espresso_member_data('id'), "espresso_group", true);
			$group = unserialize($group);
			if (!empty($group)){
				$group = implode(",",$group);
			}
			$sql .= "SELECT ed.event_name, ed.start_date, a.id, a.registration_id, a.lname, a.fname, a.email, a.address, a.address2, a.city";
			$sql .= ", a.state, a.zip, a.phone, a.payment, a.date, a.payment_status, a.txn_type, a.txn_id";
			$sql .= ", a.amount_pd, a.quantity, a.coupon_code, a.checked_in, a.checked_in_quantity";
			$sql .= ", a.payment_date, a.event_time, a.price_option";
			$sql .= " FROM " . EVENTS_ATTENDEE_TABLE . " a ";
			$sql .= " JOIN " . EVENTS_DETAIL_TABLE . " ed ON ed.id=a.event_id ";
			if (!empty($group)) {
				$sql .= " JOIN " . EVENTS_VENUE_REL_TABLE . " r ON r.event_id = ed.id ";
				$sql .= " JOIN " . EVENTS_LOCALE_REL_TABLE . " l ON  l.venue_id = r.venue_id ";
			}
			$sql .= $_REQUEST['all_events'] == "true"? '' :	" WHERE ed.id = '" . $this->event_id . "' ";
			$sql .= !empty($group) ? " AND  l.locale_id IN (" . $group . ") " : '';
			$sql .= ") UNION (";
		}
		$sql .= "SELECT ed.event_name, ed.start_date, a.id, a.registration_id, a.lname, a.fname, a.email, a.address, a.address2, a.city";
		$sql .= ", a.state, a.zip, a.phone, a.payment, a.date, a.payment_status, a.txn_type, a.txn_id";
		$sql .= ", a.amount_pd, a.quantity, a.coupon_code, a.checked_in, a.checked_in_quantity";
	
		$sql .= ", a.payment_date, a.event_time, a.price_option";
		$sql .= " FROM " . EVENTS_ATTENDEE_TABLE . " a ";
		$sql .= " JOIN " . EVENTS_DETAIL_TABLE . " ed ON ed.id=a.event_id ";
		$sql .= (!empty($_REQUEST['all_events']) && $_REQUEST['all_events'] == "true") ? '' :	" WHERE ed.id = '" . $this->event_id . "' ";
		
		if(  function_exists('espresso_member_data') && ( espresso_member_data('role')=='espresso_event_manager' || espresso_member_data('role')=='espresso_group_admin') ) {
			$sql .= " AND ed.wp_user = '" . espresso_member_data('id') ."' ";
		}
		
		$sql .= ") ORDER BY id ";

		$participants = $wpdb->get_results($sql);
	
		$filename = (!empty($_REQUEST['all_events']) && $_REQUEST['all_events'] == "true") ? __('attendee-payments', 'event_espresso') :	sanitize_title_with_dashes($this->_event_name);
		$filename = 'event-espresso-' . $filename . '-' . $this->today ;
		
		switch ($_REQUEST['type']) {

			case "csv" :
				$st = "";
				$et = ",";
				$s = $et . $st;
				header("Content-type: application/x-msdownload");
				header("Content-Disposition: attachment; filename=" . $filename . ".csv");
				header("Pragma: no-cache");
				header("Expires: 0");
				echo implode($s, $this->_basic_header) . "\r\n";
			break;

			default :
				$st = "";
				$et = "\t";
				$s = $et . $st;
				header("Content-Disposition: attachment; filename=" . $filename . ".xls");
				header("Content-Type: application/vnd.ms-excel");
				header("Pragma: no-cache");
				header("Expires: 0");
				echo implode($s, $this->_basic_header) . $et . "\r\n";
			break;

		}
		

		if ($participants) {
		
			//will temporarily hold the registration id for checking with the next row
			$temp_reg_id = ''; 
			//will hold the names of the group members
			$attendees_group = ''; 
			$group_counter = 1;
			$amount_pd = 0;
	
			foreach ($participants as $participant) {
	
				if ( $temp_reg_id == '' ) {
					$temp_reg_id = $participant->registration_id;
					$amount_pd = $participant->amount_pd;
				}
	
	
				if ( $temp_reg_id == $participant->registration_id ) {
				} else {
					$group_counter++;
					$temp_reg_id = $participant->registration_id;
				}
				
				$attendees_group = "Group $group_counter";
	
				echo $attendees_group
				. $s . $participant->id
				. $s . escape_csv_val(stripslashes($participant->lname))
				. $s . escape_csv_val(stripslashes($participant->fname))
				. $s . stripslashes($participant->email)
				. $s . escape_csv_val(stripslashes($participant->address))
				. $s . escape_csv_val(stripslashes($participant->address2))
				. $s . escape_csv_val(stripslashes($participant->city))
				. $s . escape_csv_val(stripslashes($participant->state))
				. $s . escape_csv_val(stripslashes($participant->zip))
				. $s . escape_csv_val(stripslashes($participant->phone))
				. $s . escape_csv_val(stripslashes($participant->payment))
				. $s . event_date_display($participant->date, 'Y-m-d')
				. $s . stripslashes($participant->payment_status)
				. $s . stripslashes($participant->txn_type)
				. $s . stripslashes($participant->txn_id)
				. $s . $participant->amount_pd
				. $s . escape_csv_val($participant->coupon_code)
				. $s . $participant->quantity
				. $s . event_date_display($participant->payment_date, 'Y-m-d')
				. $s . escape_csv_val($participant->event_name)
				. $s . $participant->price_option
				. $s . event_date_display($participant->start_date, 'Y-m-d')
				. $s . event_date_display($participant->event_time, get_option('time_format'))
				. $s . $participant->checked_in
				. $s . $participant->checked_in_quantity
				;
	
	
				$answers = $wpdb->get_results("SELECT a.question_id, a.answer FROM " . EVENTS_ANSWER_TABLE . " a WHERE question_id IN ($question_filter) AND attendee_id = '" . $participant->id . "'", OBJECT_K);
				
				foreach($question_list as $k=>$v) {
						$search = array("\r", "\n", "\t");
						$clean_answer = empty($answers[$k]->answer) ? '' : $answers[$k]->answer;
						$clean_answer = str_replace($search, " ", $clean_answer);
						$clean_answer = escape_csv_val($clean_answer);
						echo $s . $clean_answer;
				}
				
				switch ($_REQUEST['type']) {
					case "csv" :
						echo "\r\n";
					break;
					default :
						echo $et . "\r\n";
					break;
				}
				
			}
			
		} else {
			$this->EE_CSV->_notices['errors'][] = 'No participant data has been collected.';
			add_action('admin_notices', array( $this->EE_CSV, 'csv_admin_notices' ) );
		}
				
}
	
	
	/**
	 *			@LEGACY CODE  ; ) 
	 *		  @access private
	 *			@return void
	 */	
	private function build_basic_header() {

		global $wpdb;

		if ( !isset($_REQUEST['event_id'] ) )
			throw new EE_Error( __('We need an event_id to do anything with the export', 'event_espresso') );

		$this->event_id = !empty($this->_event_id) ? $this->_event_id : $_REQUEST['event_id'];

		if ( isset( $_REQUEST['event_id'] )) {
			$this->event_id = $_REQUEST['event_id'];
		}

		$sql_x = "SELECT id, event_name, event_desc, event_identifier, question_groups, event_meta FROM " . EVENTS_DETAIL_TABLE;
		$sql_x .= (!empty($_REQUEST['all_events']) && $_REQUEST['all_events'] == "true") ? '' :	" WHERE id = '" . $this->event_id . "' ";

		$results = $wpdb->get_row($sql_x, ARRAY_N);

		list($this->event_id, $this->_event_name, $this->_event_description, $this->_event_identifier, $this->_question_groups, $this->_event_meta) = $results;

		$this->_basic_header = array(__('Group','event_espresso'),__('Reg ID','event_espresso'), __('Last Name','event_espresso'), __('First Name','event_espresso'), __('Email','event_espresso'), __('Address','event_espresso'), __('Address 2','event_espresso'), __('City','event_espresso'), __('State','event_espresso'), __('Zip','event_espresso'), __('Phone','event_espresso'), __('Payment Method','event_espresso'), __('Reg Date','event_espresso'), __('Pay Status','event_espresso'), __('Type of Payment','event_espresso'), __('Transaction ID','event_espresso'), __('Payment','event_espresso'), __('Coupon Code','event_espresso'), __('# Attendees','event_espresso'), __('Date Paid','event_espresso'), __('Event Name','event_espresso'), __('Price Option','event_espresso'), __('Event Date','event_espresso'), __('Event Time','event_espresso'), __('Website Check-in','event_espresso'), __('Tickets Scanned','event_espresso') );

		if ( $this->_question_groups != '' ) {
			$this->_question_groups = unserialize( $this->_question_groups );
		} else {
			$this->_question_groups = array();
		}

		$this->_event_meta = unserialize( $this->_event_meta );

		if ( isset( $this->_event_meta['add_attendee_question_groups'] )) {
		
			$add_attendee_question_groups = $this->_event_meta['add_attendee_question_groups'];
			
			if ( !empty($add_attendee_question_groups)) {
				$this->_question_groups = array_unique( array_merge( (array)$this->_question_groups, (array)$add_attendee_question_groups ));
			}
			
		}
		
	}




}
/* End of file EE_Export.class.php */
/* Location: /includes/classes/EE_Export.class.php */
?>