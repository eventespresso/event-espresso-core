<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
/**
 * EE_Export class
 * 
 * For creating csv file exports/reports in a single request.
 * Note that if you're creating a large csv file this is likely to timeout,
 * and so it would be better to use EventEspressoBatchRequest\BatchRequestProcessor
 * @package				Event Espresso
 * @subpackage			includes/functions
 * @author					Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
 class EE_Export {
	 
	 const option_prefix = 'ee_report_job_';


  // instance of the EE_Export object
	private static $_instance = NULL;

  // instance of the EE_CSV object
	/**
	 *
	 * @var EE_CSV
	 */
	var $EE_CSV = NULL;


	private $_req_data = array();



	 /**
	  *        private constructor to prevent direct creation
	  *
	  * @Constructor
	  * @access private
	  * @param array $request_data
	  */
 	private function __construct( $request_data = array() ) {
		$this->_req_data = $request_data;
		$this->today = date("Y-m-d",time());
		require_once( EE_CLASSES . 'EE_CSV.class.php' );
		$this->EE_CSV= EE_CSV::instance();
	}



	 /**
	  *        @ singleton method used to instantiate class object
	  *        @ access public
	  *
	  * @param array $request_data
	  * @return \EE_Export
	  */
	public static function instance( $request_data = array() ) {
		// check if class object is instantiated
		if ( self::$_instance === NULL  or ! is_object( self::$_instance ) or ! ( self::$_instance instanceof EE_Export )) {
			self::$_instance = new self( $request_data );
		}
		return self::$_instance;
	}


	/**
	 *			@Export Event Espresso data - routes export requests
	 *		  @access public
	 *			@return void | bool
	 */
	public function export() {

		// in case of bulk exports, the "actual" action will be in action2, but first check regular action for "export" keyword
		if ( isset( $this->_req_data['action'] ) && strpos( $this->_req_data['action'], 'export' ) === FALSE ) {
			// check if action2 has export action
			if ( isset( $this->_req_data['action2'] ) && strpos( $this->_req_data['action2'], 'export' ) !== FALSE ) {
				// whoop! there it is!
				$this->_req_data['action'] = $this->_req_data['action2'];
			}
		}

		$this->_req_data['export'] = isset( $this->_req_data['export'] ) ? $this->_req_data['export'] : '';

		switch ($this->_req_data['export']) {
			case 'report':
				switch ($this->_req_data['action']) {


					case "event";
					case "export_events";
					case 'all_event_data' :
						$this->export_all_event_data();
					break;

					case 'registrations_report_for_event':
						$this->report_registrations_for_event( $this->_req_data['EVT_ID'] );
					break;

					case 'attendees':
						$this->export_attendees();
					break;

					case 'categories':
						$this->export_categories();
					break;

					default:
						EE_Error::add_error(__('An error occurred! The requested export report could not be found.','event_espresso'), __FILE__, __FUNCTION__, __LINE__ ) ;
						return FALSE;
					break;

				}
			break; // end of switch export : report
			default:
			break;
		} // end of switch export

		exit;

	}

	/**
	 * Downloads a CSV file with all the columns, but no data. This should be used for importing
	 * @return null kills execution
	 */
	function export_sample(){
		$event = EEM_Event::instance()->get_one();
		$this->_req_data['EVT_ID'] = $event->ID();
		$this->export_all_event_data();
	}




	/**
	 *			@Export data for ALL events
	 *		  @access public
	 *			@return void
	 */
	function export_all_event_data() {
		// are any Event IDs set?
		$event_query_params = array();
		$related_models_query_params = array();
		$related_through_reg_query_params = array();
		$datetime_ticket_query_params = array();
		$price_query_params = array();
		$price_type_query_params = array();
		$term_query_params  = array();
		$state_country_query_params = array();
		$question_group_query_params = array();
		$question_query_params = array();
		if ( isset( $this->_req_data['EVT_ID'] )) {
			// do we have an array of IDs ?

			if ( is_array( $this->_req_data['EVT_ID'] )) {
				$EVT_IDs =  array_map( 'sanitize_text_field', $this->_req_data['EVT_ID'] );
				$value_to_equal = array('IN',$EVT_IDs);
				$filename = 'events';
			} else {
				// generate regular where = clause
				$EVT_ID = absint( $this->_req_data['EVT_ID'] );
				$value_to_equal = $EVT_ID;
				$event = EE_Registry::instance()->load_model('Event')->get_one_by_ID($EVT_ID);

				$filename = 'event-' . ( $event instanceof EE_Event ? $event->slug() : __( 'unknown', 'event_espresso' ) );

			}
			$event_query_params[0]['EVT_ID'] =$value_to_equal;
			$related_models_query_params[0]['Event.EVT_ID'] = $value_to_equal;
			$related_through_reg_query_params[0]['Registration.EVT_ID'] = $value_to_equal;
			$datetime_ticket_query_params[0]['Datetime.EVT_ID'] = $value_to_equal;
			$price_query_params[0]['Ticket.Datetime.EVT_ID'] = $value_to_equal;
			$price_type_query_params[0]['Price.Ticket.Datetime.EVT_ID'] = $value_to_equal;
			$term_query_params[0]['Term_Taxonomy.Event.EVT_ID'] = $value_to_equal;
			$state_country_query_params[0]['Venue.Event.EVT_ID'] = $value_to_equal;
			$question_group_query_params[0]['Event.EVT_ID'] = $value_to_equal;
			$question_query_params[0]['Question_Group.Event.EVT_ID'] = $value_to_equal;

		} else {
			$filename = 'all-events';
		}


		// array in the format:  table name =>  query where clause
		$models_to_export = array(
				'Event'=>$event_query_params,
				'Datetime'=>$related_models_query_params,
				'Ticket_Template'=>$price_query_params,
				'Ticket'=>$datetime_ticket_query_params,
				'Datetime_Ticket'=>$datetime_ticket_query_params,
				'Price_Type'=>$price_type_query_params,
				'Price'=>$price_query_params,
				'Ticket_Price'=>$price_query_params,
				'Term'=>$term_query_params,
				'Term_Taxonomy'=>$related_models_query_params,
				'Term_Relationship'=>$related_models_query_params, //model has NO primary key...
				'Country'=>$state_country_query_params,
				'State'=>$state_country_query_params,
				'Venue'=>$related_models_query_params,
				'Event_Venue'=>$related_models_query_params,
				'Question_Group'=>$question_group_query_params,
				'Event_Question_Group'=>$question_group_query_params,
				'Question'=>$question_query_params,
				'Question_Group_Question'=>$question_query_params,
//				'Transaction'=>$related_through_reg_query_params,
//				'Registration'=>$related_models_query_params,
//				'Attendee'=>$related_through_reg_query_params,
//				'Line_Item'=>

			);

		$model_data = $this->_get_export_data_for_models( $models_to_export );

		$filename = $this->generate_filename ( $filename );

		if ( ! $this->EE_CSV->export_multiple_model_data_to_csv( $filename, $model_data )) {
			EE_Error::add_error(__("'An error occurred and the Event details could not be exported from the database.'", "event_espresso"), __FILE__, __FUNCTION__, __LINE__ );
		}
	}

	function report_attendees(){
		$attendee_rows = EEM_Attendee::instance()->get_all_wpdb_results( 
			array( 
				'force_join' => array( 'State', 'Country' ), 
				'caps' => EEM_Base::caps_read_admin 
			) 
		);
		$csv_data = array();
		foreach( $attendee_rows as $attendee_row ){
			$csv_row = array();
			foreach( EEM_Attendee::instance()->field_settings() as $field_name => $field_obj ){
				if( $field_name == 'STA_ID' ){
					$state_name_field = EEM_State::instance()->field_settings_for( 'STA_name' );
					$csv_row[ __( 'State', 'event_espresso' ) ] = $attendee_row[ $state_name_field->get_qualified_column() ];
				}elseif( $field_name == 'CNT_ISO' ){
					$country_name_field = EEM_Country::instance()->field_settings_for( 'CNT_name' );
					$csv_row[ __( 'Country', 'event_espresso' ) ] = $attendee_row[ $country_name_field->get_qualified_column() ];
				}else{
					$csv_row[ $field_obj->get_nicename() ] = $attendee_row[ $field_obj->get_qualified_column() ];
				}
			}
			$csv_data[] = $csv_row;
		}

		$filename = $this->generate_filename ( 'contact-list-report' );

		$handle = $this->EE_CSV->begin_sending_csv( $filename);
		$this->EE_CSV->write_data_array_to_csv($handle, $csv_data);
		$this->EE_CSV->end_sending_csv($handle);
	}


	/**
	 *			@Export data for ALL attendees
	 *		  @access public
	 *			@return void
	 */
	function export_attendees() {

		$states_that_have_an_attendee = EEM_State::instance()->get_all(array(0=>array('Attendee.ATT_ID'=>array('IS NOT NULL'))));
		$countries_that_have_an_attendee = EEM_Country::instance()->get_all(array(0=>array('Attendee.ATT_ID'=>array('IS NOT NULL'))));
//		$states_to_export_query_params
		$models_to_export = array(
			'Country'=>array(array('CNT_ISO'=>array('IN',array_keys($countries_that_have_an_attendee)))),
			'State'=>array(array('STA_ID'=>array('IN',array_keys($states_that_have_an_attendee)))),
			'Attendee'=>array(),
		);



		$model_data = $this->_get_export_data_for_models( $models_to_export );
		$filename = $this->generate_filename ( 'all-attendees' );

		if ( ! $this->EE_CSV->export_multiple_model_data_to_csv( $filename, $model_data )) {
			EE_Error::add_error(__('An error occurred and the Attendee data could not be exported from the database.','event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
		}
	}

	/**
	 * Shortcut for preparing a database result for display
	 * @param EEM_Base $model
	 * @param string $field_name
	 * @param string $raw_db_value
	 * @param boolean|string $pretty_schema true to display pretty, a string to use a specific "Schema", or false to NOT display pretty
	 * @return string
	 */
	protected function _prepare_value_from_db_for_display( $model, $field_name,  $raw_db_value, $pretty_schema = true ) {
		$field_obj = $model->field_settings_for( $field_name );
		$value_on_model_obj = $field_obj->prepare_for_set_from_db( $raw_db_value );
		if( $field_obj instanceof EE_Datetime_Field ) {
			$field_obj->set_date_format( EE_CSV::instance()->get_date_format_for_csv( $field_obj->get_date_format( $pretty_schema ) ), $pretty_schema );
			$field_obj->set_time_format( EE_CSV::instance()->get_time_format_for_csv( $field_obj->get_time_format( $pretty_schema ) ), $pretty_schema );
		}
		if( $pretty_schema === true){
			return $field_obj->prepare_for_pretty_echoing( $value_on_model_obj );
		}elseif( is_string( $pretty_schema ) ) {
			return $field_obj->prepare_for_pretty_echoing($value_on_model_obj, $pretty_schema );
		}else{
			return $field_obj->prepare_for_get( $value_on_model_obj );
		}
	}

	/**
	 * Export a custom CSV of registration info including: A bunch of the reg fields, the time of the event, the price name,
	 * and the questions associated with the registrations
	 * @param int $event_id
	 */
	function report_registrations_for_event( $event_id = NULL ){
		$reg_fields_to_include = array(
				'TXN_ID',
				'ATT_ID',
				'REG_ID',
				'REG_date',
				'REG_code',
				'REG_count',
				'REG_final_price'

		);
		$att_fields_to_include = array(
			'ATT_fname',
			'ATT_lname',
			'ATT_email',
			'ATT_address',
			'ATT_address2',
			'ATT_city',
			'STA_ID',
			'CNT_ISO',
			'ATT_zip',
			'ATT_phone',
		);

		$registrations_csv_ready_array = array();
		$reg_model = EE_Registry::instance()->load_model('Registration');
		$query_params = apply_filters(
			'FHEE__EE_Export__report_registration_for_event',
			array(
				array(
					'OR' => array(
						//don't include registrations from failed or abandoned transactions...
						'Transaction.STS_ID' => array( 'NOT IN', array( EEM_Transaction::failed_status_code, EEM_Transaction::abandoned_status_code ) ),
						//unless the registration is approved, in which case include it regardless of transaction status
						'STS_ID' => EEM_Registration::status_id_approved
						),
					'Ticket.TKT_deleted' => array( 'IN', array( true, false ) )
					),
				'order_by' => array('Transaction.TXN_ID'=>'asc','REG_count'=>'asc'),
				'force_join' => array( 'Transaction', 'Ticket', 'Attendee' ),
				'caps' => EEM_Base::caps_read_admin
			),
			$event_id
		);
		if( $event_id ){
			$query_params[0]['EVT_ID'] =  $event_id;
		}else{
			$query_params[ 'force_join' ][] = 'Event';
		}
		$registration_rows = $reg_model->get_all_wpdb_results( $query_params );
		//get all questions which relate to someone in this group
		$registration_ids = array();
		foreach( $registration_rows as $reg_row ) {
			$registration_ids[] = intval( $reg_row[ 'Registration.REG_ID'] );
		}
//		EEM_Question::instance()->show_next_x_db_queries();
		$questions_for_these_regs_rows = EEM_Question::instance()->get_all_wpdb_results(array(array('Answer.REG_ID'=>array('IN',$registration_ids))));
		foreach($registration_rows as $reg_row){
			if ( is_array( $reg_row ) ) {
				$reg_csv_array = array();
				if( ! $event_id ){
					//get the event's name and Id
					$reg_csv_array[ __( 'Event', 'event_espresso' ) ] = sprintf( __( '%1$s (%2$s)', 'event_espresso' ), $this->_prepare_value_from_db_for_display( EEM_Event::instance(), 'EVT_name', $reg_row[ 'Event_CPT.post_title'] ), $reg_row[ 'Event_CPT.ID' ] );
				}
				$is_primary_reg = $reg_row[ 'Registration.REG_count' ] == '1' ? true : false;
				/*@var $reg_row EE_Registration */
				foreach($reg_fields_to_include as $field_name){
					$field = $reg_model->field_settings_for($field_name);
					if($field_name == 'REG_final_price'){
						$value = $this->_prepare_value_from_db_for_display( $reg_model, $field_name, $reg_row[ 'Registration.REG_final_price'], 'localized_float' );
					}elseif( $field_name == 'REG_count' ){
						$value = sprintf( __( '%s of %s', 'event_espresso' ), $this->_prepare_value_from_db_for_display( $reg_model, 'REG_count', $reg_row['Registration.REG_count'] ), $this->_prepare_value_from_db_for_display( $reg_model, 'REG_group_size', $reg_row['Registration.REG_group_size' ] ) );
					}elseif( $field_name == 'REG_date' ) {
						$value = $this->_prepare_value_from_db_for_display( $reg_model, $field_name, $reg_row[ 'Registration.REG_date'], 'no_html' );
					}else{
						$value = $this->_prepare_value_from_db_for_display( $reg_model, $field_name, $reg_row[ $field->get_qualified_column() ] );
					}
					$reg_csv_array[$this->_get_column_name_for_field($field)] = $value;
					if($field_name == 'REG_final_price'){
						//add a column named Currency after the final price
						$reg_csv_array[__("Currency", "event_espresso")] = EE_Config::instance()->currency->code;
					}
				}
				//get pretty status
				$stati = EEM_Status::instance()->localized_status( array(
					$reg_row[ 'Registration.STS_ID' ] => __( 'unknown', 'event_espresso' ),
					$reg_row[ 'TransactionTable.STS_ID' ] => __( 'unknown', 'event_espresso' ) ),
						FALSE,
						'sentence' );
				$reg_csv_array[__("Registration Status", 'event_espresso')] = $stati[ $reg_row[ 'Registration.STS_ID' ] ];
				//get pretty trnasaction status
				$reg_csv_array[__("Transaction Status", 'event_espresso')] = $stati[ $reg_row[ 'TransactionTable.STS_ID' ] ];
				$reg_csv_array[ __( 'Transaction Amount Due', 'event_espresso' ) ] = $is_primary_reg ? $this->_prepare_value_from_db_for_display( EEM_Transaction::instance(), 'TXN_total', $reg_row[ 'TransactionTable.TXN_total' ], 'localized_float' ) : '0.00';
				$reg_csv_array[ __( 'Amount Paid', 'event_espresso' )] = $is_primary_reg ? $this->_prepare_value_from_db_for_display( EEM_Transaction::instance(), 'TXN_paid', $reg_row[ 'TransactionTable.TXN_paid' ], 'localized_float' ) : '0.00';
				$payment_methods = array();
				$gateway_txn_ids_etc = array();
				$payment_times = array();
				if( $is_primary_reg && $reg_row[ 'TransactionTable.TXN_ID' ] ){
					$payments_info = EEM_Payment::instance()->get_all_wpdb_results(
							array(
								array(
									'TXN_ID' => $reg_row[ 'TransactionTable.TXN_ID' ],
									'STS_ID' => EEM_Payment::status_id_approved
								),
								'force_join' => array( 'Payment_Method' ),

							),
							ARRAY_A,
							'Payment_Method.PMD_admin_name as name, Payment.PAY_txn_id_chq_nmbr as gateway_txn_id, Payment.PAY_timestamp as payment_time' );

					foreach( $payments_info as $payment_method_and_gateway_txn_id ){
						$payment_methods[] = isset( $payment_method_and_gateway_txn_id[ 'name' ] ) ? $payment_method_and_gateway_txn_id[ 'name' ] : __( 'Unknown', 'event_espresso' );
						$gateway_txn_ids_etc[] = isset( $payment_method_and_gateway_txn_id[ 'gateway_txn_id' ] ) ? $payment_method_and_gateway_txn_id[ 'gateway_txn_id' ] : '';
						$payment_times[] = isset( $payment_method_and_gateway_txn_id[ 'payment_time' ] ) ? $payment_method_and_gateway_txn_id[ 'payment_time' ] : '';
					}

				}
				$reg_csv_array[ __( 'Payment Date(s)', 'event_espresso' ) ] = implode( ',', $payment_times );
				$reg_csv_array[ __( 'Payment Method(s)', 'event_espresso' ) ] = implode( ",", $payment_methods );
				$reg_csv_array[ __( 'Gateway Transaction ID(s)', 'event_espresso' )] = implode( ',', $gateway_txn_ids_etc );

				//get whether or not the user has checked in
				$reg_csv_array[__("Check-Ins", "event_espresso")] = $reg_model->count_related( $reg_row[ 'Registration.REG_ID'] , 'Checkin' );
				//get ticket of registration and its price
				$ticket_model = EE_Registry::instance()->load_model('Ticket');
				if( $reg_row[ 'Ticket.TKT_ID'] ) {
					$ticket_name = $this->_prepare_value_from_db_for_display( $ticket_model, 'TKT_name', $reg_row[ 'Ticket.TKT_name' ] );
					$datetimes_strings = array();
					foreach( EEM_Datetime::instance()->get_all_wpdb_results( array( array( 'Ticket.TKT_ID' => $reg_row[ 'Ticket.TKT_ID' ] ), 'order_by' => array( 'DTT_EVT_start' => 'ASC' ), 'default_where_conditions' => 'none' ) ) as $datetime){
						$datetimes_strings[] = $this->_prepare_value_from_db_for_display( EEM_Datetime::instance(), 'DTT_EVT_start', $datetime[ 'Datetime.DTT_EVT_start'] );
					}

				} else {
					$ticket_name = __( 'Unknown', 'event_espresso' );
					$datetimes_strings = array( __( 'Unknown', 'event_espresso' ) );
				}
				$reg_csv_array[$ticket_model->field_settings_for('TKT_name')->get_nicename()] = $ticket_name;
				$reg_csv_array[__("Datetimes of Ticket", "event_espresso")] = implode(", ", $datetimes_strings);
				//get datetime(s) of registration

				//add attendee columns
				foreach($att_fields_to_include as $att_field_name){
					$field_obj = EEM_Attendee::instance()->field_settings_for($att_field_name);
					if( $reg_row[ 'Attendee_CPT.ID' ]){
						if($att_field_name == 'STA_ID'){
							$value = EEM_State::instance()->get_var( array( array( 'STA_ID' => $reg_row[ 'Attendee_Meta.STA_ID' ] ) ), 'STA_name' );
						}elseif($att_field_name == 'CNT_ISO'){
							$value = EEM_Country::instance()->get_var( array( array( 'CNT_ISO' => $reg_row[ 'Attendee_Meta.CNT_ISO' ] ) ), 'CNT_name' );
						}else{
							$value = $this->_prepare_value_from_db_for_display( EEM_Attendee::instance(), $att_field_name, $reg_row[ $field_obj->get_qualified_column() ] );
						}
					}else{
						$value = '';
					}

					$reg_csv_array[$this->_get_column_name_for_field($field_obj)] = $value;
				}

				//make sure each registration has the same questions in the same order
				foreach($questions_for_these_regs_rows as $question_row){
					if( ! isset($reg_csv_array[$question_row[ 'Question.QST_admin_label']])){
						$reg_csv_array[$question_row[ 'Question.QST_admin_label' ] ] = null;
					}
				}
				//now fill out the questions THEY answered
				foreach( EEM_Answer::instance()->get_all_wpdb_results( array( array( 'REG_ID' => $reg_row[ 'Registration.REG_ID' ] ), 'force_join' => array( 'Question' ) ) ) as $answer_row){
					/* @var $answer EE_Answer */
					if( $answer_row[ 'Question.QST_ID' ] ){
						$question_label = $this->_prepare_value_from_db_for_display( EEM_Question::instance(), 'QST_admin_label', $answer_row[ 'Question.QST_admin_label' ] );
					}else{
						$question_label = sprintf( __( 'Question $s', 'event_espresso' ), $answer_row[ 'Answer.QST_ID' ] );
					}
                                        if( isset( $answer_row[ 'Question.QST_type'] ) && $answer_row[ 'Question.QST_type' ] == EEM_Question::QST_type_state ) {
                                            $reg_csv_array[ $question_label ] = EEM_State::instance()->get_state_name_by_ID( $answer_row[ 'Answer.ANS_value' ] );
                                        } else {
                                            $reg_csv_array[ $question_label ] = $this->_prepare_value_from_db_for_display( EEM_Answer::instance(), 'ANS_value', $answer_row[ 'Answer.ANS_value' ] );
                                        }
				}
				$registrations_csv_ready_array[] = apply_filters( 'FHEE__EE_Export__report_registrations__reg_csv_array', $reg_csv_array, $reg_row );
			}
		}

		//if we couldn't export anything, we want to at least show the column headers
		if(empty($registrations_csv_ready_array)){
			$reg_csv_array = array();
			$model_and_fields_to_include = array(
				'Registration' => $reg_fields_to_include,
				'Attendee' => $att_fields_to_include
			);
			foreach($model_and_fields_to_include as $model_name => $field_list){
				$model = EE_Registry::instance()->load_model($model_name);
				foreach($field_list as $field_name){
					$field = $model->field_settings_for($field_name);
					$reg_csv_array[$this->_get_column_name_for_field($field)] = null;//$registration->get($field->get_name());
				}
			}
			$registrations_csv_ready_array [] = $reg_csv_array;
		}
		if( $event_id ){
			$event_slug =  EEM_Event::instance()->get_var( array( array( 'EVT_ID' => $event_id ) ), 'EVT_slug' );
			if( ! $event_slug ) {
				$event_slug = __( 'unknown', 'event_espresso' );
			}
		}else{
			$event_slug = __( 'all', 'event_espresso' );
		}
		$filename = sprintf( "registrations-for-%s", $event_slug );

		$handle = $this->EE_CSV->begin_sending_csv( $filename);
		$this->EE_CSV->write_data_array_to_csv($handle, $registrations_csv_ready_array);
		$this->EE_CSV->end_sending_csv($handle);
	}

	/**
	 * Gets the 'normal' column named for fields
	 * @param EE_Model_Field_Base $field
	 * @return string
	 */
	protected function _get_column_name_for_field(EE_Model_Field_Base $field){
		return $field->get_nicename()."[".$field->get_name()."]";
	}


	/**
	 *			@Export data for ALL events
	 *		  @access public
	 *			@return void
	 */
	function export_categories() {
		// are any Event IDs set?
		$query_params = array();
		if ( isset( $this->_req_data['EVT_CAT_ID'] )) {
			// do we have an array of IDs ?
			if ( is_array( $this->_req_data['EVT_CAT_ID'] )) {
				// generate an "IN (CSV)" where clause
				$EVT_CAT_IDs = array_map( 'sanitize_text_field', $this->_req_data['EVT_CAT_ID'] );
				$filename = 'event-categories';
				$query_params[0]['term_taxonomy_id'] = array('IN',$EVT_CAT_IDs);
			} else {
				// generate regular where = clause
				$EVT_CAT_ID = absint( $this->_req_data['EVT_CAT_ID'] );
				$filename = 'event-category#' . $EVT_CAT_ID;
				$query_params[0]['term_taxonomy_id'] = $EVT_CAT_ID;
			}
		} else {
			// no IDs means we will d/l the entire table
			$filename = 'all-categories';
		}

		$tables_to_export = array(
				'Term_Taxonomy' => $query_params
			);

		$table_data = $this->_get_export_data_for_models( $tables_to_export );
		$filename = $this->generate_filename ( $filename );

		if ( ! $this->EE_CSV->export_multiple_model_data_to_csv( $filename, $table_data )) {
			EE_Error::add_error(__('An error occurred and the Category details could not be exported from the database.','event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
		}
	}


	/**
	 *			@process export name to create a suitable filename
	 *		  @access private
	 *		  @param string - export_name
	 *			@return string on success, FALSE on fail
	 */
	private function generate_filename ( $export_name = '' ) {
		if ( $export_name != '' ) {
			$filename = get_bloginfo('name') . '-' . $export_name;
			$filename = sanitize_key( $filename ) . '-' . $this->today;
			return $filename;
		}	 else {
			EE_Error::add_error(__("No filename was provided", "event_espresso"), __FILE__, __FUNCTION__, __LINE__ );
		}
		return false;
	}



	/**
	 *	@recursive function for exporting table data and merging the results with the next results
	 *	@access private
	 *	@param array $models_to_export keys are model names (eg 'Event', 'Attendee', etc.) and values are arrays of query params like on EEM_Base::get_all
	 *	@return array on success, FALSE on fail
	 */
	private function _get_export_data_for_models( $models_to_export = array() ) {
		$table_data = FALSE;
		if ( is_array( $models_to_export ) ) {
			foreach ( $models_to_export as $model_name => $query_params ) {
				//check for a numerically-indexed array. in that case, $model_name is the value!!
				if(is_int($model_name)){
					$model_name = $query_params;
					$query_params = array();
				}
				$model = EE_Registry::instance()->load_model($model_name);
				$model_objects = $model->get_all($query_params);

				$table_data[$model_name] = array();
				foreach($model_objects as $model_object){
					$model_data_array = array();
					$fields = $model->field_settings();
					foreach($fields as $field){
						$column_name = $field->get_nicename()."[".$field->get_name()."]";
						if($field instanceof EE_Datetime_Field){
//							$field->set_date_format('Y-m-d');
//							$field->set_time_format('H:i:s');
							$model_data_array[$column_name] = $model_object->get_datetime($field->get_name(),'Y-m-d','H:i:s');
						}
						else{
							$model_data_array[$column_name] = $model_object->get($field->get_name());
						}
					}
					$table_data[$model_name][] = $model_data_array;
				}

			}
		}
		return $table_data;
	}
}
/* End of file EE_Export.class.php */
/* Location: /includes/classes/EE_Export.class.php */
