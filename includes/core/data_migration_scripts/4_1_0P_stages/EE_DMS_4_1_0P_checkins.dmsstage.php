<?php

/**
 * Converts 3.1 prices to 4.1 tickets, prices, and associates those tickets to prices,
 * to events, and to datetimes.
 * For reference,3.1 price's table:
3.1 table definition
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
				'CHK_timestamp'=>new EE_Datetime_Field('CHK_timestamp', __('When the row was modified','event_espresso'), false, current_time('timestamp'), $timezone )
			)
		);
*/

class EE_DMS_4_1_0P_checkins extends EE_Data_Migration_Script_Stage_Table{
	private $_new_table;
	private $_old_attendee_table;
	function __construct() {
		global $wpdb;
		$this->_pretty_name = __("Checkins", "event_espresso");
		$this->_old_table = $wpdb->prefix."events_attendee_checkin";
		$this->_old_attendee_table = $wpdb->prefix."events_attendee";
		$this->_new_table = $wpdb->prefix."esp_checkin";
		parent::__construct();
	}
	protected function _migrate_old_row($old_row) {
		global $wpdb;
		$new_reg_table = $wpdb->prefix."esp_registration";
		
		$previous_old_checkin_count = $this->_get_previous_checkin_count($old_row);
		$num_to_checkin_at_this_time = intval($old_row['checked_in']) - $previous_old_checkin_count;
		
		$new_registrations_for_attendee = $this->get_migration_script()->get_mapping_new_pk($this->_old_attendee_table, $old_row['attendee_id'], $new_reg_table);
		$new_datetime_id = $this->_try_to_find_datetime($old_row);

		//if quantity is negative, we're actually going to be checking out REGs
		$checking_in = $num_to_checkin_at_this_time ? true : false;
		//make sure registrations array is numerically indexed starting at 0 (it probably already is)
		$new_registrations_for_attendee = array_values($new_registrations_for_attendee);
		$new_checkin_ids = array();
		for($i = 0; $i<abs($num_to_checkin_at_this_time); $i++){
			$new_reg_id = $new_registrations_for_attendee[$i];
			if( ! $new_reg_id){
				$checkin_i18n = $checking_in ? __("check in", "event_espresso") : __("check out", "event_espresso");
				$this->add_error(sprintf(__('It appears we wanted to $s%1 more registrations than actually exist. The old checking record ($s%2) indicated we should $s%1 $d%3 registrations, but there are only $d%4 registrations for that attendee ($s%5)', "event_espresso"),
						$checkin_i18n,  http_build_query($old_row),abs($num_to_checkin_at_this_time),count($new_registrations_for_attendee),  http_build_query($new_registrations_for_attendee)));
				break;
			}
			$new_last_checkin_record = $wpdb->get_row($wpdb->prepare("SELECT * FROM $this->_new_table WHERE REG_ID = %d ORDER BY CHK_ID DESC LIMIT 1",$new_reg_id));
			if( ! $new_last_checkin_record ){
				$is_checked_in = FALSE;
			}else{
				$is_checked_in = intval($new_last_checkin_record['CHK_in']);
			}
			
			if($is_checked_in && $checking_in){
				//we meant to check them IN and they're already checked in
				continue;
			}elseif( ! $is_checked_in && ! $checking_in){
				//we meant to checkh them OUT and they're already checked out
				continue;
			}else{
				$new_id = $this->_insert_checkin_record($new_reg_id, $new_datetime_id, $checking_in, $old_row['date_scanned']);
				if($new_id){
					$new_checkin_ids[]= $new_id;
				}
			}
		}
		if ($new_checkin_ids){
			$this->get_migration_script()->set_mapping($this->_old_table, $old_row['id'], $this->_new_table, $new_checkin_ids);
		}
	}
	
	/**
	 * Gets the 3.1 checked_in (count) before the one with id $old_checkin.
	 * If none exists, returns null
	 * @global type $wpdb
	 * @param array $old_checkin_id
	 * @return int
	 */
	private function _get_previous_checkin_count($old_checkin){
		global $wpdb;
		$old_checkin_id = $old_checkin['id'];
		$old_attendee_id = $old_checkin['attendee_id'];
		$previous_old_checkin_count = $wpdb->get_var($wpdb->prepare("SELECT checked_in FROM $this->_old_table WHERE id < %d AND attendee_id = %d LIMIT 1 ORDER BY id DESC",$old_checkin_id,$old_attendee_id));
		return intval($previous_old_checkin_count);
	}
	
	/**
	 * Tries to find the new datetime the checkin was for, based on the attendee row
	 * (because we know the attendee was for an event as a specific time, and we know
	 * the event's OLD ID...)
	 * @global type $wpdb
	 * @param array $old_checkin
	 * @return int
	 */
	private function _try_to_find_datetime($old_checkin){
		global $wpdb;
		$old_attendee_id = $old_checkin['attendee_id'];
		$old_attendee = $wpdb->get_row($wpdb->prepare("SELECT * FROM $this->_old_attendee_table WHERE id = %d",$old_attendee_id),ARRAY_A);
		
		$new_event_id = $this->get_migration_script()->get_mapping_new_pk($wpdb->prefix."events_detail", $old_attendee['event_id'], $wpdb->posts);
		if ( ! $new_event_id){
			$this->add_error(sprintf(__("Could nto find new event ID with old event id '%d', on attendee row %s; and because of that couldnt find the correct datetime for checkin", "event_espresso"),$old_attendee['event_id'],http_build_query($old_attendee)));
			return 0;
		}
		$old_att_start_date = $old_attendee['start_date'];
		$old_att_start_time = $this->get_migration_script()->convertTimeFromAMPM($old_attendee['event_time']);
		$old_att_datetime = "$old_att_start_date $old_att_start_time:00";
		
		$datetime_table = $wpdb->prefix."esp_datetime";
		//add all conditions to an array from which we can SHIFT conditions off in order to widen our search
		//the most important condition should be last, as it will be array_shift'ed off last
		$conditions = array(
			$wpdb->prepare("$datetime_table.DTT_EVT_start = %s",$old_att_datetime),//times match?
			$wpdb->prepare("$datetime_table.EVT_ID = %d",$new_event_id),//events match?
		);
		//start running queries, widening search each time by removing a condition
		$datetime_id_found = NULL;
		do{
			$full_query = "SELECT DTT_ID FROM $datetime_table WHERE ".implode(" AND ",$conditions)." LIMIT 1";
			$datetime_id_found = $wpdb->get_var($full_query);
			array_shift($conditions);
		}while( ! $datetime_id_found && $conditions);
		return $datetime_id_found;
	}
	
	/**
	 * Adds a new checkin/checkout record according for $new_reg_id,$new_datetime_id,$checking_in, and $timestmap
	 * @param int $new_reg_id
	 * @param int $new_datetime_id
	 * @param boolean $checking_in
	 * @param string $timestamp mysql datetime
	 * @return int new checkin id
	 */
	private function _insert_checkin_record($new_reg_id,$new_datetime_id,$checking_in,$timestamp){
		global $wpdb;
		
		
		//ok we can actually do what we set out to do: add a cehckin/checkout record
		$cols_n_values = array(
			'REG_ID'=>$new_reg_id,
			'DTT_ID'=>$new_datetime_id,
			'CHK_in'=>$checking_in,
			'CHK_timestamp'=>$timestamp
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