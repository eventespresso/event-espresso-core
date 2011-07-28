<?php
	//Dates
	$curdate = date("Y-m-d");
	$pieces = explode('-',$curdate, 3);
	$this_year_r = $pieces[0];
	$this_month_r = $pieces[1];
	$days_this_month = date('t', strtotime($curdate));
	/* Events */
	$group = '';
	if (function_exists('espresso_member_data')&&espresso_member_data('role')=='espresso_group_admin'){
		$group = get_user_meta(espresso_member_data('id'), "espresso_group", true);
		$group = unserialize($group);
		$group = implode(",",$group);
	}
	//Get number of total events
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
	
	//Get total events today
	$sql2 = "(";
	if ( $group != '' ){
		$sql2 .= "SELECT e.id FROM ". EVENTS_DETAIL_TABLE." e ";
		$sql2 .= " JOIN " . EVENTS_VENUE_REL_TABLE . " r ON r.event_id = e.id ";
		$sql2 .= " JOIN " . EVENTS_LOCALE_REL_TABLE . " l ON  l.venue_id = r.venue_id ";
		$sql2 .= " WHERE event_status != 'D' AND start_date = '" . $curdate . "' ";
		$sql2 .= $group != '' ? " AND l.locale_id IN (" . $group . ") " : '';
		$sql2 .= ") UNION (";
	}
	$sql2 .= "SELECT e.id FROM ". EVENTS_DETAIL_TABLE." e ";
	$sql2 .= " WHERE event_status != 'D' AND start_date = '" . $curdate . "' ";
	if(  function_exists('espresso_member_data') && ( espresso_member_data('role')=='espresso_event_manager' || espresso_member_data('role')=='espresso_group_admin') ){
		$sql2 .= " AND wp_user = '" . espresso_member_data('id') ."' ";
	}
	$sql2 .= ")";
	$total_events_today = 0;
	if( $wpdb->query($sql2) ){
		$total_events_today =	$wpdb->num_rows;
	}
	
	//Get total events this month
	$sql3 = "(";
	if ( $group != '' ){
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
	$total_events_this_month = 0;
	if( $wpdb->query($sql3) ){
		$total_events_this_month =	$wpdb->num_rows;
	}

	
	/* Attendees */
	//Get number of total attendees
	$asql1 = "(";
	if (function_exists('espresso_member_data')&&espresso_member_data('role')=='espresso_group_admin'){
		$group = get_user_meta(espresso_member_data('id'), "espresso_group", true);
		$group = unserialize($group);
		$asql1 .= "SELECT a.*, e.id event_id, e.event_name, checked_in FROM " . EVENTS_ATTENDEE_TABLE. " a ";
		$asql1 .= " LEFT JOIN ". EVENTS_DETAIL_TABLE ." e ON e.id=a.event_id ";
		if ($group !=''){
			$asql1 .= " JOIN " . EVENTS_VENUE_REL_TABLE . " r ON r.event_id = e.id ";
			$asql1 .= " JOIN " . EVENTS_LOCALE_REL_TABLE . " l ON  l.venue_id = r.venue_id ";
		}
		$asql1 .= $group !='' ? " WHERE l.locale_id IN (" . implode(",",$group) . ") " : '';
		$asql1 .= ") UNION (";
	}
	$asql1 .= "SELECT a.*, e.id event_id, e.event_name, checked_in FROM " . EVENTS_ATTENDEE_TABLE. " a ";
	$asql1 .= " LEFT JOIN ". EVENTS_DETAIL_TABLE ." e ON e.id=a.event_id ";
	if(  function_exists('espresso_member_data') && ( espresso_member_data('role')=='espresso_event_manager' || espresso_member_data('role')=='espresso_group_admin') ){
		$asql1 .= " WHERE wp_user = '" . espresso_member_data('id') ."' ";
	}
	$asql1 .= ")";
#	echo $asql1;
	$total_a = 0;
	if( $wpdb->query($asql1) ){
		$total_a =	$wpdb->num_rows;
	}
	
	//Get total attendees today
	$asql2 = "(";
	if (function_exists('espresso_member_data')&&espresso_member_data('role')=='espresso_group_admin'){
		$group = get_user_meta(espresso_member_data('id'), "espresso_group", true);
		$group = unserialize($group);
		$asql2 .= "SELECT a.*, e.id event_id, e.event_name, checked_in FROM " . EVENTS_ATTENDEE_TABLE. " a ";
		$asql2 .= " LEFT JOIN ". EVENTS_DETAIL_TABLE ." e ON e.id=a.event_id ";
		if ($group !=''){
			$asql2 .= " JOIN " . EVENTS_VENUE_REL_TABLE . " r ON r.event_id = e.id ";
			$asql2 .= " JOIN " . EVENTS_LOCALE_REL_TABLE . " l ON  l.venue_id = r.venue_id ";
		}
		$asql2 .= " WHERE date BETWEEN '". $curdate.' 00:00:00'."' AND '". $curdate.' 23:59:59' ."' ";
		$asql2 .= $group !='' ? " AND l.locale_id IN (" . implode(",",$group) . ") " : '';
		$asql2 .= ") UNION (";
	}
	$asql2 .= "SELECT a.*, e.id event_id, e.event_name, checked_in FROM " . EVENTS_ATTENDEE_TABLE. " a ";
	$asql2 .= " LEFT JOIN ". EVENTS_DETAIL_TABLE ." e ON e.id=a.event_id ";
	$asql2 .= " WHERE date BETWEEN '". $curdate.' 00:00:00'."' AND '". $curdate.' 23:59:59' ."' ";
	if(  function_exists('espresso_member_data') && ( espresso_member_data('role')=='espresso_event_manager' || espresso_member_data('role')=='espresso_group_admin') ){
		$asql2 .= " AND wp_user = '" . espresso_member_data('id') ."' ";
	}
	$asql2 .= ")";
	$total_a_today = 0;
	if( $wpdb->query($asql2) ){
		$total_a_today = $wpdb->num_rows;
	}
	
	//Get total attendees this month
	$asql3 = "(";
	if (function_exists('espresso_member_data')&&espresso_member_data('role')=='espresso_group_admin'){
		$group = get_user_meta(espresso_member_data('id'), "espresso_group", true);
		$group = unserialize($group);
		$asql3 .= "SELECT a.*, e.id event_id, e.event_name, checked_in FROM " . EVENTS_ATTENDEE_TABLE. " a ";
		$asql3 .= " LEFT JOIN ". EVENTS_DETAIL_TABLE ." e ON e.id=a.event_id ";
		if ($group !=''){
			$asql3 .= " JOIN " . EVENTS_VENUE_REL_TABLE . " r ON r.event_id = e.id ";
			$asql3 .= " JOIN " . EVENTS_LOCALE_REL_TABLE . " l ON  l.venue_id = r.venue_id ";
		}
		$asql3 .= " WHERE date BETWEEN '".event_espresso_no_format_date($this_year_r. '-' .$this_month_r . '-01',$format = 'Y-m-d')."' AND '".event_espresso_no_format_date($this_year_r . '-' .$this_month_r. '-' . $days_this_month,$format = 'Y-m-d')."' ";
		$asql3 .= $group !='' ? " AND l.locale_id IN (" . implode(",",$group) . ") " : '';
		$asql3 .= ") UNION (";
	}
	$asql3 .= "SELECT a.*, e.id event_id, e.event_name, checked_in FROM " . EVENTS_ATTENDEE_TABLE. " a ";
	$asql3 .= " LEFT JOIN ". EVENTS_DETAIL_TABLE ." e ON e.id=a.event_id ";
	$asql3 .= " WHERE date BETWEEN '".event_espresso_no_format_date($this_year_r. '-' .$this_month_r . '-01',$format = 'Y-m-d')."' AND '".event_espresso_no_format_date($this_year_r . '-' .$this_month_r. '-' . $days_this_month,$format = 'Y-m-d')."' ";
	if(  function_exists('espresso_member_data') && ( espresso_member_data('role')=='espresso_event_manager' || espresso_member_data('role')=='espresso_group_admin') ){
		$asql3 .= " AND wp_user = '" . espresso_member_data('id') ."' ";
	}
	$asql3 .= ")";
//	echo $asql3;
	$total_a_this_month = 0;
	if( $wpdb->query($asql3) ){
		$total_a_this_month =	$wpdb->num_rows;
	}