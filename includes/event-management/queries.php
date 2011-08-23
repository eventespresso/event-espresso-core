<?php
function espresso_total_events(){
	//Get number of total events
	global $wpdb;
	
	//Dates
	$curdate = date("Y-m-d");
	$pieces = explode('-',$curdate, 3);
	$this_year_r = $pieces[0];
	$this_month_r = $pieces[1];
	$days_this_month = date('t', strtotime($curdate));
	
	$group = '';
	if (function_exists('espresso_member_data')&&espresso_member_data('role')=='espresso_group_admin'){
		$group = get_user_meta(espresso_member_data('id'), "espresso_group", true);
		$group = unserialize($group);
		$group = implode(",",$group);
	}
	
	$sql1 = "(";
	if ( $group != '' ){
		$sql1 .= "SELECT e.id FROM ". EVENTS_DETAIL_TABLE." e ";
		$sql1 .= " JOIN " . EVENTS_VENUE_REL_TABLE . " r ON r.event_id = e.id ";
		$sql1 .= " JOIN " . EVENTS_LOCALE_REL_TABLE . " l ON  l.venue_id = r.venue_id ";
		$sql1 .= " WHERE event_status != 'D'";
		$sql1 .= $group != '' ? " AND l.locale_id IN (" . $group . ") " : '';
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
	
function espresso_total_events_today(){
	//Get total events today
	global $wpdb;
	
	//Dates
	$curdate = date("Y-m-d");
	$pieces = explode('-',$curdate, 3);
	$this_year_r = $pieces[0];
	$this_month_r = $pieces[1];
	$days_this_month = date('t', strtotime($curdate));	
	
	$sql2 = "(";
	if ( !empty($group)){
		$sql2 .= "SELECT e.id FROM ". EVENTS_DETAIL_TABLE." e ";
		$sql2 .= " JOIN " . EVENTS_VENUE_REL_TABLE . " r ON r.event_id = e.id ";
		$sql2 .= " JOIN " . EVENTS_LOCALE_REL_TABLE . " l ON  l.venue_id = r.venue_id ";
		$sql2 .= " WHERE e.event_status != 'D' AND e.start_date = '" . $curdate . "' ";
		$sql2 .= $group != '' ? " AND l.locale_id IN (" . $group . ") " : '';
		$sql2 .= ") UNION (";
	}
	$sql2 .= "SELECT e.id FROM ". EVENTS_DETAIL_TABLE." e ";
	$sql2 .= " WHERE e.event_status != 'D' AND e.start_date = '" . $curdate . "' ";
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

function espresso_total_events_this_month(){	
	//Get total events this month
	global $wpdb;
	
	//Dates
	$curdate = date("Y-m-d");
	$pieces = explode('-',$curdate, 3);
	$this_year_r = $pieces[0];
	$this_month_r = $pieces[1];
	$days_this_month = date('t', strtotime($curdate));
	
	$sql3 = "(";
	if (!empty($group)){
		$sql3 .= "SELECT e.id FROM ". EVENTS_DETAIL_TABLE." e ";
		$sql3 .= " JOIN " . EVENTS_VENUE_REL_TABLE . " r ON r.event_id = e.id ";
		$sql3 .= " JOIN " . EVENTS_LOCALE_REL_TABLE . " l ON  l.venue_id = r.venue_id ";
		$sql3 .= " WHERE event_status != 'D' AND start_date BETWEEN '".date('Y-m-d', strtotime($this_year_r. '-' .$this_month_r . '-01'))."' AND '".date('Y-m-d', strtotime($this_year_r . '-' .$this_month_r. '-' . $days_this_month))."' ";
		$sql3 .= $group != '' ? " AND l.locale_id IN (" . $group . ") " : '';
		$sql3 .= ") UNION (";
	}
	$sql3 .= "SELECT e.id FROM ". EVENTS_DETAIL_TABLE." e ";
	$sql3 .= " WHERE event_status != 'D' AND start_date BETWEEN '".date('Y-m-d', strtotime($this_year_r. '-' .$this_month_r . '-01'))."' AND '".date('Y-m-d', strtotime($this_year_r . '-' .$this_month_r. '-' . $days_this_month))."' ";
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
	
	function espresso_total_all_attendees(){
		//Get number of total attendees
		global $wpdb;
		$WHERE = " WHERE ";
		$asql1 = "(";
		if (function_exists('espresso_member_data')&&espresso_member_data('role')=='espresso_group_admin'){
			$group = get_user_meta(espresso_member_data('id'), "espresso_group", true);
			$group = unserialize($group);
			$asql1 .= "SELECT SUM(a.quantity) quantity FROM " . EVENTS_ATTENDEE_TABLE. " a ";
			$asql1 .= " JOIN ". EVENTS_DETAIL_TABLE ." e ON e.id=a.event_id ";
			if ($group !=''){
				$asql1 .= " JOIN " . EVENTS_VENUE_REL_TABLE . " r ON r.event_id = e.id ";
				$asql1 .= " JOIN " . EVENTS_LOCALE_REL_TABLE . " l ON  l.venue_id = r.venue_id ";
			}
			$asql1 .= $group !='' ? " WHERE l.locale_id IN (" . implode(",",$group) . ") " : '';
			//$asql1 .= " AND quantity >= 1 ";
			// AND (payment_status='Completed' OR payment_status='Pending') ";
			$asql1 .= " WHERE event_status != 'D' ";
			$asql1 .= ") UNION (";
		}
		$asql1 .= "SELECT SUM(a.quantity) quantity FROM " . EVENTS_ATTENDEE_TABLE. " a ";
		$asql1 .= " JOIN ". EVENTS_DETAIL_TABLE ." e ON e.id=a.event_id ";
		if(  function_exists('espresso_member_data') && ( espresso_member_data('role')=='espresso_event_manager' || espresso_member_data('role')=='espresso_group_admin') ){
			$asql1 .= " $WHERE wp_user = '" . espresso_member_data('id') ."'";
			$WHERE = " AND ";
		}
		//$asql1 .= " $WHERE a.quantity >= 1 ";
		//AND (a.payment_status='Completed' OR a.payment_status='Pending') ";
		$asql1 .= " $WHERE e.event_status != 'D' ";
		$asql1 .= ")";
		if(  function_exists('espresso_member_data') && ( espresso_member_data('role')=='espresso_event_manager' || espresso_member_data('role')=='espresso_group_admin') ){
		}
		$wpdb->query($asql1);
		//echo $asql1;
		//echo '<p>$asql1 '.$asql1.'</p>';
		$total_a = 0;
		if ($wpdb->num_rows > 0 && $wpdb->last_result[0]->quantity!=NULL) {
			$total_a =  $wpdb->last_result[0]->quantity + (isset($wpdb->last_result[1]->quantity) ? $wpdb->last_result[1]->quantity:0);
		}
		return $total_a;
	}
	
	function espresso_total_attendees_today(){
		//Get total attendees today
		global $wpdb;
		$curdate = date("Y-m-d");
		$asql2 = "(";
		if (function_exists('espresso_member_data')&&espresso_member_data('role')=='espresso_group_admin'){
			$group = get_user_meta(espresso_member_data('id'), "espresso_group", true);
			$group = unserialize($group);
			$asql2 .= "SELECT SUM(a.quantity) quantity FROM " . EVENTS_ATTENDEE_TABLE. " a ";
			$asql2 .= " LEFT JOIN ". EVENTS_DETAIL_TABLE ." e ON e.id=a.event_id ";
			if ($group !=''){
				$asql2 .= " JOIN " . EVENTS_VENUE_REL_TABLE . " r ON r.event_id = e.id ";
				$asql2 .= " JOIN " . EVENTS_LOCALE_REL_TABLE . " l ON  l.venue_id = r.venue_id ";
			}
			$asql2 .= " WHERE date BETWEEN '". $curdate.' 00:00:00'."' AND '". $curdate.' 23:59:59' ."' ";
			$asql2 .= $group !='' ? " AND l.locale_id IN (" . implode(",",$group) . ") " : '';
			$asql2 .= " AND quantity >= 1";
			// AND (payment_status='Completed' OR payment_status='Pending') ";
			$asql2 .= " AND event_status != 'D' ";
			$asql2 .= ") UNION (";
		}
		$asql2 .= "SELECT SUM(a.quantity) quantity FROM " . EVENTS_ATTENDEE_TABLE. " a ";
		$asql2 .= " LEFT JOIN ". EVENTS_DETAIL_TABLE ." e ON e.id=a.event_id ";
		$asql2 .= " WHERE date BETWEEN '". $curdate.' 00:00:00'."' AND '". $curdate.' 23:59:59' ."' ";
		if(  function_exists('espresso_member_data') && ( espresso_member_data('role')=='espresso_event_manager' || espresso_member_data('role')=='espresso_group_admin') ){
			$asql2 .= " AND e.wp_user = '" . espresso_member_data('id') ."' ";
		}
		$asql2 .= " AND a.quantity >= 1 ";
		//AND (a.payment_status='Completed' OR a.payment_status='Pending') ";
		$asql2 .= " AND e.event_status != 'D' ";
		$asql2 .= ")";
		//echo $asql2;
		$total_a_today = 0;
		$wpdb->query($asql2);
		if ($wpdb->num_rows > 0 && $wpdb->last_result[0]->quantity!=NULL) {
			$total_a_today =  $wpdb->last_result[0]->quantity + (isset($wpdb->last_result[1]->quantity) ? $wpdb->last_result[1]->quantity:0);
		}
		return $total_a_today;
	}
	//echo total_attendees_today();
	
	function espresso_total_attendees_this_month(){
		//Get total attendees this month
		global $wpdb;
		
		//Dates
		$curdate = date("Y-m-d");
		$pieces = explode('-',$curdate, 3);
		$this_year_r = $pieces[0];
		$this_month_r = $pieces[1];
		$days_this_month = date('t', strtotime($curdate));
		
		$asql3 = "(";
		if (function_exists('espresso_member_data')&&espresso_member_data('role')=='espresso_group_admin'){
			$group = get_user_meta(espresso_member_data('id'), "espresso_group", true);
			$group = unserialize($group);
			$asql3 .= "SELECT SUM(a.quantity) quantity FROM " . EVENTS_ATTENDEE_TABLE. " a ";
			$asql3 .= " LEFT JOIN ". EVENTS_DETAIL_TABLE ." e ON e.id=a.event_id ";
			if ($group !=''){
				$asql3 .= " JOIN " . EVENTS_VENUE_REL_TABLE . " r ON r.event_id = e.id ";
				$asql3 .= " JOIN " . EVENTS_LOCALE_REL_TABLE . " l ON  l.venue_id = r.venue_id ";
			}
			$asql3 .= " WHERE date BETWEEN '".event_espresso_no_format_date($this_year_r. '-' .$this_month_r . '-01',$format = 'Y-m-d')."' AND '".event_espresso_no_format_date($this_year_r . '-' .$this_month_r. '-' . $days_this_month,$format = 'Y-m-d')."' ";
			$asql3 .= $group !='' ? " AND l.locale_id IN (" . implode(",",$group) . ") " : '';
			$asql3 .= " AND a.quantity >= 1 ";
			//AND (a.payment_status='Completed' OR a.payment_status='Pending') ";
			$asql3 .= " AND e.event_status != 'D' ";
			$asql3 .= ") UNION (";
		}
		$asql3 .= "SELECT SUM(a.quantity) quantity FROM " . EVENTS_ATTENDEE_TABLE. " a ";
		$asql3 .= " LEFT JOIN ". EVENTS_DETAIL_TABLE ." e ON e.id=a.event_id ";
		$asql3 .= " WHERE a.date BETWEEN '".event_espresso_no_format_date($this_year_r. '-' .$this_month_r . '-01',$format = 'Y-m-d')."' AND '".event_espresso_no_format_date($this_year_r . '-' .$this_month_r. '-' . $days_this_month,$format = 'Y-m-d')."' ";
		if(  function_exists('espresso_member_data') && ( espresso_member_data('role')=='espresso_event_manager' || espresso_member_data('role')=='espresso_group_admin') ){
			$asql3 .= " AND e.wp_user = '" . espresso_member_data('id') ."' ";
		}
		$asql3 .= " AND a.quantity >= 1 ";
		//AND (a.payment_status='Completed' OR a.payment_status='Pending') ";
		$asql3 .= " AND e.event_status != 'D' ";
		$asql3 .= ")";
		//echo $asql3;
		$total_a_this_month = 0;
		$wpdb->query($asql3);
		if ($wpdb->num_rows > 0 && $wpdb->last_result[0]->quantity!=NULL) {
			$total_a_this_month =  $wpdb->last_result[0]->quantity + (isset($wpdb->last_result[1]->quantity) ? $wpdb->last_result[1]->quantity:0);
		}
		return $total_a_this_month;
	}
	//echo total_attendees_this_month();