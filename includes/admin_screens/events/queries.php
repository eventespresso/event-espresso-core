<?php

/**
 * Get total number of events
 * @return int
 */
function espresso_total_events(){

	global $wpdb;

	//Dates
	$curdate = date('Y-m-d');
	$this_year_r = date('Y');
	$this_month_r = date('m');
	$days_this_month = date('t');

	$group = '';
	if (function_exists('espresso_member_data')&&espresso_member_data('role')=='espresso_group_admin'){
		$group = get_user_meta(espresso_member_data('id'), "espresso_group", true);
		$group = unserialize($group);
		if (!empty($group)){
			$group = implode(",",$group);
		}
	}

	$sql1 = "(";
	if ( $group != '' ){
		$sql1 .= "SELECT e.id FROM ". EVENTS_DETAIL_TABLE." e ";
		$sql1 .= " JOIN " . EVENTS_VENUE_REL_TABLE . " r ON r.event_id = e.id ";
		$sql1 .= " JOIN " . EVENTS_LOCALE_REL_TABLE . " l ON  l.venue_id = r.venue_id ";
		$sql1 .= " WHERE event_status != 'D'";
		$sql1 .= !empty($group) ? " AND l.locale_id IN (" . $group . ") " : '';
		$sql1 .= ") UNION (";
	}
	$sql1 .= "SELECT e.id FROM ". EVENTS_DETAIL_TABLE." e ";
	$sql1 .= " WHERE event_status != 'D'";
	if(  function_exists('espresso_member_data') && ( espresso_member_data('role')=='espresso_event_manager' || espresso_member_data('role')=='espresso_group_admin') ){
		$sql1 .= " AND wp_user = '" . espresso_member_data('id') ."' ";
	}
	$sql1 .= ")";
	$total_events = 0;
	if( $wpdb->query($sql1) ){
		$total_events =	$wpdb->num_rows;
	}
	return $total_events;
}





/**
 * Get total number of events today
 * @return int
 */
function espresso_total_events_today(){

	global $wpdb;

	//Dates
	$curdate = date('Y-m-d');
	$this_year_r = date('Y');
	$this_month_r = date('m');
	$days_this_month = date('t');
	$start = ' 00:00:00';
	$end = ' 23:59:59';

	$sql2 = "(";
	if ( !empty($group)){
		$sql2 .= "SELECT e.id FROM ". EVENTS_DETAIL_TABLE." e ";
		$sql2 .= " JOIN " . ESP_DATETIME . " dtt ON dtt.EVT_ID = e.id ";
		$sql2 .= " JOIN " . EVENTS_VENUE_REL_TABLE . " r ON r.event_id = e.id ";
		$sql2 .= " JOIN " . EVENTS_LOCALE_REL_TABLE . " l ON  l.venue_id = r.venue_id ";
		$sql2 .= " WHERE e.event_status != 'D'";
		$sql2 .= " AND dtt.DTT_EVT_start BETWEEN '" . strtotime( date('Y-m-d') . $start ) . "' AND '" . strtotime( date('Y-m-d') . $end ) . "' ";
		$sql2 .= $group != '' ? " AND l.locale_id IN (" . $group . ") " : '';
		$sql2 .= ") UNION (";
	}
	$sql2 .= "SELECT e.id FROM ". EVENTS_DETAIL_TABLE." e ";
	$sql2 .= " JOIN " . ESP_DATETIME . " dtt ON dtt.EVT_ID = e.id ";
	$sql2 .= " WHERE e.event_status != 'D'";
	$sql2 .= " AND dtt.DTT_EVT_start BETWEEN '" . strtotime( date('Y-m-d') . $start ) . "' AND '" . strtotime( date('Y-m-d') . $end ) . "' ";

	if(  function_exists('espresso_member_data') && ( espresso_member_data('role')=='espresso_event_manager' || espresso_member_data('role')=='espresso_group_admin') ){
		$sql2 .= " AND e.wp_user = '" . espresso_member_data('id') ."' ";
	}
	$sql2 .= ")";
	$total_events_today = 0;
	if( $wpdb->query($sql2) ){
		$total_events_today =	$wpdb->num_rows;
	}
	return $total_events_today;
}






/**
 * Get total number of events this month
 * @return int
 */
function espresso_total_events_this_month(){

	global $wpdb;

	//Dates
	$curdate = date('Y-m-d');
	$this_year_r = date('Y');
	$this_month_r = date('m');
	$days_this_month = date('t');
	$start = ' 00:00:00';
	$end = ' 23:59:59';

	$sql3 = "(";
	if (!empty($group)){
		$sql3 .= "SELECT e.id FROM ". EVENTS_DETAIL_TABLE." e ";
		$sql3 .= " JOIN " . ESP_DATETIME . " dtt ON dtt.EVT_ID = e.id ";
		$sql3 .= " JOIN " . EVENTS_VENUE_REL_TABLE . " r ON r.event_id = e.id ";
		$sql3 .= " JOIN " . EVENTS_LOCALE_REL_TABLE . " l ON  l.venue_id = r.venue_id ";
		$sql3 .= " WHERE event_status != 'D'";
		$sql3 .= " AND dtt.DTT_EVT_start BETWEEN '" . strtotime($this_year_r . '-' . $this_month_r . '-01' . $start) . "' AND '" . strtotime($this_year_r . '-' . $this_month_r . '-' . $days_this_month . $end ) . "' ";

		$sql3 .= $group != '' ? " AND l.locale_id IN (" . $group . ") " : '';
		$sql3 .= ") UNION (";
	}
	$sql3 .= "SELECT e.id FROM ". EVENTS_DETAIL_TABLE." e ";
	$sql3 .= " JOIN " . ESP_DATETIME . " dtt ON dtt.EVT_ID = e.id ";
	$sql3 .= " WHERE event_status != 'D'";
	$sql3 .= " AND dtt.DTT_EVT_start BETWEEN '" . strtotime($this_year_r . '-' . $this_month_r . '-01' . $start) . "' AND '" . strtotime($this_year_r . '-' . $this_month_r . '-' . $days_this_month . $end ) . "' ";

	if(  function_exists('espresso_member_data') && ( espresso_member_data('role')=='espresso_event_manager' || espresso_member_data('role')=='espresso_group_admin') ){
		$sql3 .= " AND wp_user = '" . espresso_member_data('id') ."' ";
	}
	$sql3 .= ")";
	//echo $sql3;
	$wpdb->query($sql3);
	$total_events_this_month = 0;
	if( $wpdb->query($sql3) ){
		$total_events_this_month =	$wpdb->num_rows;
	}
	return $total_events_this_month;
}







/* Attendees */

/**
 * Get total number of attendees
 * @return int
 */
function espresso_total_all_attendees(){
	global $wpdb;
	$where = " WHERE ";
	$asql1 = "(";
	if (function_exists('espresso_member_data')&&espresso_member_data('role')=='espresso_group_admin'){
		$group = get_user_meta(espresso_member_data('id'), "espresso_group", true);
		$group = unserialize($group);
		$asql1 .= "SELECT reg.REG_ID FROM " . $wpdb->prefix . "esp_registration reg ";
		$asql1 .= " LEFT JOIN ". EVENTS_DETAIL_TABLE ." evt ON evt.id=reg.EVT_ID ";
		if ($group !=''){
			$asql1 .= " JOIN " . EVENTS_VENUE_REL_TABLE . " vnr ON vnr.event_id = reg.EVT_ID ";
			$asql1 .= " JOIN " . EVENTS_LOCALE_REL_TABLE . " loc ON  loc.venue_id = vnr.venue_id ";
			$asql1 .= " $where loc.locale_id IN (" . implode(",",$group) . ") " ;
			$where = " AND ";
		}
		$asql1 .= $where . "event_status != 'D' ";
		$asql1 .= ") UNION (";
	}
	$where_2 = " WHERE ";
	$asql1 .= "SELECT reg.REG_ID FROM " . $wpdb->prefix . "esp_registration reg ";
	$asql1 .= " LEFT JOIN ". EVENTS_DETAIL_TABLE ." evt ON evt.id=reg.EVT_ID ";
	if(  function_exists('espresso_member_data') && ( espresso_member_data('role')=='espresso_event_manager' || espresso_member_data('role')=='espresso_group_admin') ){
		$asql1 .= $where . "wp_user = '" . espresso_member_data('id') ."'";
		$where_2 = " AND ";
	}
	$asql1 .= $where . "evt.event_status != 'D' ";
	$asql1 .= ")";

	$registrations = $wpdb->get_results($asql1);
	$total_a = $wpdb->num_rows;

	return $total_a;
}






/**
 * Get total number of attendees today
 * @return int
 */
function espresso_total_attendees_today(){

	global $wpdb;
	$curdate = date( 'Y-m-d' );
	$start = strtotime( $curdate . ' 00:00:00' );
	$end = strtotime( $curdate . ' 23:59:59' );

	$asql2 = "(";
	if (function_exists('espresso_member_data')&&espresso_member_data('role')=='espresso_group_admin'){
		$group = get_user_meta(espresso_member_data('id'), "espresso_group", true);
		$group = unserialize($group);
		$asql2 .= "SELECT reg.REG_date FROM " . $wpdb->prefix . "esp_registration reg ";
		$asql2 .= " LEFT JOIN ". EVENTS_DETAIL_TABLE ." evt ON evt.id=reg.EVT_ID ";
		if ($group !=''){
			$asql2 .= " JOIN " . EVENTS_VENUE_REL_TABLE . " vnr ON vnr.event_id = reg.EVT_ID ";
			$asql2 .= " JOIN " . EVENTS_LOCALE_REL_TABLE . " loc ON  loc.venue_id = vnr.venue_id ";
			$asql2 .= " $where loc.locale_id IN (" . implode(",",$group) . ") " ;
		}
		$asql2 .= " WHERE reg.REG_date BETWEEN '". $start."' AND '". $end . "' ";
		$asql2 .= $group !='' ? " AND loc.locale_id IN (" . implode(",",$group) . ") " : '';
		$asql2 .= " AND evt.event_status != 'D' ";
		$asql2 .= ") UNION (";
	}
	$asql2 .= "SELECT reg.REG_date FROM " . $wpdb->prefix . "esp_registration reg ";
	$asql2 .= " LEFT JOIN ". EVENTS_DETAIL_TABLE ." evt ON evt.id=reg.EVT_ID ";
	$asql2 .= " WHERE reg.REG_date BETWEEN '". $start."' AND '". $end . "' ";
	if(  function_exists('espresso_member_data') && ( espresso_member_data('role')=='espresso_event_manager' || espresso_member_data('role')=='espresso_group_admin') ){
		$asql2 .= " AND evt.wp_user = '" . espresso_member_data('id') ."' ";
	}
	$asql2 .= " AND evt.event_status != 'D' ";
	$asql2 .= ")";

	$registrations = $wpdb->get_results($asql2);
	$total_a_today = $wpdb->num_rows;
	return $total_a_today;
}




/**
 * Get total number of attendees this month
 * @return int
 */
function espresso_total_attendees_this_month(){

	global $wpdb;

	//Dates
	$curdate = date('Y-m-d');
	$this_year_r = date('Y');
	$this_month_r = date('m');
	$days_this_month = date('t');
	$start = strtotime( $this_year_r. '-' .$this_month_r . '-01 00:00:00' );
	$end = strtotime( $this_year_r . '-' .$this_month_r. '-' . $days_this_month . ' 23:59:59' );

	$asql3 = "(";

	if (function_exists('espresso_member_data')&&espresso_member_data('role')=='espresso_group_admin'){

		$group = get_user_meta(espresso_member_data('id'), "espresso_group", true);
		$group = unserialize($group);
		$asql3 .= "SELECT reg.REG_date FROM " . $wpdb->prefix . "esp_registration reg ";
		$asql3 .= " LEFT JOIN ". EVENTS_DETAIL_TABLE ." evt ON evt.id=reg.EVT_ID ";

		if ($group !=''){
			$asql3 .= " JOIN " . EVENTS_VENUE_REL_TABLE . " vnr ON vnr.event_id = reg.EVT_ID ";
			$asql3 .= " JOIN " . EVENTS_LOCALE_REL_TABLE . " loc ON  loc.venue_id = vnr.venue_id ";
		}

		$asql3 .= " WHERE reg.REG_date BETWEEN '". $start."' AND '". $end . "' ";
		$asql3 .= $group !='' ? " AND loc.locale_id IN (" . implode(",",$group) . ") " : '';
		$asql3 .= " AND evt.event_status != 'D' ";
		$asql3 .= ") UNION (";
	}

	$asql3 .= "SELECT reg.REG_date FROM " . $wpdb->prefix . "esp_registration reg ";
	$asql3 .= " LEFT JOIN ". EVENTS_DETAIL_TABLE ." evt ON evt.id=reg.EVT_ID ";
	$asql3 .= " WHERE reg.REG_date BETWEEN '". $start."' AND '". $end . "' ";

	if(  function_exists('espresso_member_data') && ( espresso_member_data('role')=='espresso_event_manager' || espresso_member_data('role')=='espresso_group_admin') ){
		$asql3 .= " AND evt.wp_user = '" . espresso_member_data('id') ."' ";
	}

	$asql3 .= " AND evt.event_status != 'D' ";
	$asql3 .= ")";

	$registrations = $wpdb->get_results($asql3);
	$total_a_this_month = $wpdb->num_rows;
	return $total_a_this_month;
}
