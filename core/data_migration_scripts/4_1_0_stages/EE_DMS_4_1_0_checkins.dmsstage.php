<?php

/**
 * Converts 3.1 checkins to 4.1 checkins. It's true that in 3.1 there WAS a table named
 * event_attendee_checkin, which recorded the time of registrations' checkins. HOWEVER, it was inconsistently used
 * (if at all), and its data is basically junk. The checked_in_quantity and checked_in values on the attendee table
 * are the important records to convert.
 * So, in converting we use those numbers to decide how many checkins to add in 4.1, and just assume that
 * they checked in at the time of the event (which is quite reasonable). We COULD try to hunt for the actual time
 * of their checkin from the events_attendee_checkin table, but that'd be very difficult and problematic.
 *
4.1 tables and fields:
 * $this->_tables = array(
			'Checkin'=>new EE_Primary_Table('esp_checkin','CHK_ID')
		);
		$this->_fields = array(
			'Checkin'=> array(
				'CHK_ID'=>new EE_Primary_Key_Int_Field('CHK_ID', 'Checkin ID'),
				'REG_ID'=>new EE_Foreign_Key_Int_Field('REG_ID', 'Registration Id', false, 1, 'Registration'),
				'DTT_ID'=>new EE_Foreign_Key_Int_Field('DTT_ID', 'Datetime Id', false, 1, 'Datetime'),
				'CHK_in'=>new EE_Boolean_Field('CHK_in', 'Whether a person has checked in or checked out', false, true),
				'CHK_timestamp'=>new EE_Datetime_Field('CHK_timestamp', __('When the row was modified','event_espresso'), false, time(), $timezone )
			)
		);
*/

class EE_DMS_4_1_0_checkins extends EE_Data_Migration_Script_Stage_Table{
	private $_new_table;
	function __construct() {
		global $wpdb;
		$this->_pretty_name = __("Checkins", "event_espresso");
		$this->_old_table = $wpdb->prefix."events_attendee";
		$this->_new_table = $wpdb->prefix."esp_checkin";
		parent::__construct();
	}
	protected function _migrate_old_row($old_row) {
		global $wpdb;
		$new_reg_table = $wpdb->prefix."esp_registration";

		$num_to_checkin_at_this_time = max(array(intval($old_row['checked_in_quantity']),intval($old_row['checked_in']))) ;

		$new_registrations_for_attendee = $this->get_migration_script()->get_mapping_new_pk($this->_old_table, $old_row['id'], $new_reg_table);
		if( ! $new_registrations_for_attendee){
			$new_registrations_for_attendee = array();
		}
		$new_datetime = $this->_try_to_find_datetime($old_row);

		//make sure registrations array is numerically indexed starting at 0 (it probably already is)
		$new_registrations_for_attendee = array_values($new_registrations_for_attendee);
		$new_checkin_ids = array();
		for($i = 0; $i<abs($num_to_checkin_at_this_time); $i++){
			$new_reg_id = $new_registrations_for_attendee[$i];
			if( ! $new_reg_id){
				$this->add_error(sprintf(__('It appears we wanted to check-in more registrations than actually exist. The old attendee record (%1$s) indicated we should check-in %2$d registrations, but there are only %3$d registrations for that attendee (%4$s)', "event_espresso"),
					$this->_json_encode($old_row),abs($num_to_checkin_at_this_time),count($new_registrations_for_attendee),  $this->_json_encode($new_registrations_for_attendee)));
				break;
			}
			$new_last_checkin_record = $wpdb->get_row($wpdb->prepare("SELECT * FROM $this->_new_table WHERE REG_ID = %d ORDER BY CHK_ID DESC LIMIT 1",$new_reg_id));
			if( ! $new_last_checkin_record ){
				$is_checked_in = FALSE;
			}else{
				$is_checked_in = intval($new_last_checkin_record['CHK_in']);
			}
			$new_id = $this->_insert_checkin_record($new_reg_id, $new_datetime);
			if($new_id){
				$new_checkin_ids[]= $new_id;
			}

		}
		if ($new_checkin_ids){
			$this->get_migration_script()->set_mapping($this->_old_table, $old_row['id'], $this->_new_table, $new_checkin_ids);
		}
	}


	/**
	 * Tries to find the new datetime the Check-in was for, based on the attendee row
	 * (because we know the attendee was for an event as a specific time, and we know
	 * the event's OLD ID...)
	 * @global type $wpdb
	 * @param array $old_attendee_row
	 * @return array row of datetime from DB
	 */
	private function _try_to_find_datetime($old_attendee){
		global $wpdb;

		$new_event_id = $this->get_migration_script()->get_mapping_new_pk($wpdb->prefix."events_detail", $old_attendee['event_id'], $wpdb->posts);
		if ( ! $new_event_id){
			$this->add_error(sprintf(__("Could nto find new event ID with old event id '%d', on attendee row %s; and because of that couldnt find the correct datetime for Check-in", "event_espresso"),$old_attendee['event_id'],$this->_json_encode($old_attendee)));
			return 0;
		}
		$old_att_start_date = $old_attendee['start_date'];
		$old_att_start_time = $this->get_migration_script()->convertTimeFromAMPM($old_attendee['event_time']);
		$old_att_datetime = $this->get_migration_script()->convert_date_string_to_utc($this,$old_attendee,"$old_att_start_date $old_att_start_time:00");

		$datetime_table = $wpdb->prefix."esp_datetime";
		//add all conditions to an array from which we can SHIFT conditions off in order to widen our search
		//the most important condition should be last, as it will be array_shift'ed off last
		$conditions = array(
			$wpdb->prepare("$datetime_table.DTT_EVT_start = %s",$old_att_datetime),//times match?
			$wpdb->prepare("$datetime_table.EVT_ID = %d",$new_event_id),//events match?
		);
		//start running queries, widening search each time by removing a condition
		$datetime_found = NULL;
		do{
			$full_query = "SELECT * FROM $datetime_table WHERE ".implode(" AND ",$conditions)." LIMIT 1";
			$datetime_found = $wpdb->get_row($full_query,ARRAY_A);
			array_shift($conditions);
		}while( ! $datetime_found && $conditions);
		return $datetime_found;
	}

	/**
	 * Adds a new Check-in/checkout record according for $new_reg_id,$new_datetime_id,$checking_in, and $timestmap
	 * @param int $new_reg_id
	 * @param int $new_datetime_id
	 * @param string $timestamp mysql datetime
	 * @return int new Check-in id
	 */
	private function _insert_checkin_record($new_reg_id,$new_datetime){
		global $wpdb;


		//ok we can actually do what we set out to do: add a checkin/checkout record
		$cols_n_values = array(
			'REG_ID'=>$new_reg_id,
			'DTT_ID'=>$new_datetime['DTT_ID'],
			'CHK_in'=>true,
			'CHK_timestamp'=>$new_datetime['DTT_EVT_start']
		);
		$datatypes = array(
			'%d',//REG_ID
			'%d',//DTT_ID
			'%d',//CHK_in
			'%s',//CHK_timestamp
		);
		$success = $wpdb->insert($this->_new_table,$cols_n_values,$datatypes);
		if ( ! $success){
			$this->add_error($this->get_migration_script()->_create_error_message_for_db_insertion($this->_old_table, $old_checkin, $this->_new_table, $cols_n_values, $datatypes));
			return 0;
		}
		$new_id = $wpdb->insert_id;
		return $new_id;
	}


}
