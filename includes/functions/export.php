<?php
// Export data for event, called by excel request below
if (!function_exists('espresso_event_export')){
	function espresso_event_export($ename){
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
		if (function_exists('espresso_member_data')&&espresso_member_data('role')=='espresso_group_admin'){
			$group = get_user_meta(espresso_member_data('id'), "espresso_group", true);
			$group = unserialize($group);
			$sql = "(SELECT e.id event_id, e.event_name, e.event_identifier, e.reg_limit, e.registration_start, ";
			$sql .= " e.start_date, e.is_active, e.recurrence_id, e.registration_startT, ";
			$sql .= " e.address, e.address2, e.city, e.state, e.zip, e.country, ";
			$sql .= " e.venue_title, e.phone, e.wp_user ";
			$sql .= " FROM ". EVENTS_DETAIL_TABLE ." e ";
			if ($_REQUEST[ 'category_id' ] !=''){
				$sql .= " JOIN " . EVENTS_CATEGORY_REL_TABLE . " r ON r.event_id = e.id ";
				$sql .= " JOIN " . EVENTS_CATEGORY_TABLE . " c ON  c.id = r.cat_id ";
			}
			if ($group !=''){
				$sql .= " JOIN " . EVENTS_VENUE_REL_TABLE . " r ON r.event_id = e.id ";
				$sql .= " JOIN " . EVENTS_LOCALE_REL_TABLE . " l ON  l.venue_id = r.venue_id ";
			}
			$sql .= ($_POST[ 'event_status' ] !='' && $_POST[ 'event_status' ] !='IA')  ? " WHERE event_status = '" . $_POST[ 'event_status' ] ."' ":" WHERE event_status != 'D' ";
			$sql .= $_REQUEST[ 'category_id' ] !='' ? " AND c.id = '" . $_REQUEST[ 'category_id' ] . "' " : '';
			$sql .= $group !='' ? " AND l.locale_id IN (" . implode(",",$group) . ") " : '';
			if ($_POST[ 'month_range' ] !=''){
				$sql .= " AND start_date BETWEEN '".date('Y-m-d', strtotime($year_r. '-' .$month_r . '-01'))."' AND '".date('Y-m-d', strtotime($year_r . '-' .$month_r. '-31'))."' ";
			}		
			if ($_REQUEST[ 'today' ]=='true'){
				$sql .= " AND start_date = '" . $curdate ."' ";
			}			
			if ($_REQUEST[ 'this_month' ]=='true'){
				$sql .= " AND start_date BETWEEN '".date('Y-m-d', strtotime($this_year_r. '-' .$this_month_r . '-01'))."' AND '".date('Y-m-d', strtotime($this_year_r . '-' .$this_month_r. '-' . $days_this_month))."' ";
			}
			$sql .= ") UNION ";
		}
		$sql .= "(SELECT e.id event_id, e.event_name, e.event_identifier, e.reg_limit, e.registration_start, ";
		$sql .= " e.start_date, e.is_active, e.recurrence_id, e.registration_startT, ";
		$sql .= " e.address, e.address2, e.city, e.state, e.zip, e.country, ";
		$sql .= " e.venue_title, e.phone, e.wp_user ";
		$sql .= " FROM ". EVENTS_DETAIL_TABLE ." e ";
		if ($_REQUEST[ 'category_id' ] !=''){
			$sql .= " JOIN " . EVENTS_CATEGORY_REL_TABLE . " r ON r.event_id = e.id ";
			$sql .= " JOIN " . EVENTS_CATEGORY_TABLE . " c ON  c.id = r.cat_id ";
		}
		$sql .= ($_POST[ 'event_status' ] !='' && $_POST[ 'event_status' ] !='IA')  ? " WHERE event_status = '" . $_POST[ 'event_status' ] ."' ":" WHERE event_status != 'D' ";
		$sql .= $_REQUEST[ 'category_id' ] !='' ? " AND c.id = '" . $_REQUEST[ 'category_id' ] . "' " : '';
		if ($_POST[ 'month_range' ] !=''){
			$sql .= " AND start_date BETWEEN '".date('Y-m-d', strtotime($year_r. '-' .$month_r . '-01'))."' AND '".date('Y-m-d', strtotime($year_r . '-' .$month_r. '-31'))."' ";
		}		
		if ($_REQUEST[ 'today' ]=='true'){
			$sql .= " AND start_date = '" . $curdate ."' ";
		}			
		if ($_REQUEST[ 'this_month' ]=='true'){
			$sql .= " AND start_date BETWEEN '".date('Y-m-d', strtotime($this_year_r. '-' .$this_month_r . '-01'))."' AND '".date('Y-m-d', strtotime($this_year_r . '-' .$this_month_r. '-' . $days_this_month))."' ";
		}
		if(  function_exists('espresso_member_data') && ( espresso_member_data('role')=='espresso_event_manager' || espresso_member_data('role')=='espresso_group_admin') ){
			$sql .= " AND wp_user = '" . espresso_member_data('id') ."' ";
		}
		ob_start();
		$sql .= ") ORDER BY start_date ASC";
		$filename = $_REQUEST['all_events'] == "true"? __('all-events', 'event_espresso') :	sanitize_title_with_dashes($event_name);
		$filename = $filename . "-" . $today ;
		switch ($_REQUEST['type']) {
			case "csv" :
				$st = "";
				$et = ",";
				$s = $et . $st;
				header("Content-type: application/x-msdownload");
				header("Content-Disposition: attachment; filename=" . $filename . ".csv");
				header("Pragma: no-cache");
				header("Expires: 0");
				echo implode($s, $htables) . "\r\n";
			break;
			default :
				$st = "";
				$et = "\t";
				$s = $et . $st;
				header("Content-Disposition: attachment; filename=" . $filename . ".xls");
				header("Content-Type: application/vnd.ms-excel");
				header("Pragma: no-cache");
				header("Expires: 0");
				echo implode($s, $htables) . $et . "\r\n";
			break;
		}
		$events = $wpdb->get_results($sql);
		foreach ($events as $event){
			$event_id= $event->event_id;
			$event_name=stripslashes_deep($event->event_name);
			$event_identifier=stripslashes_deep($event->event_identifier);
			$reg_limit = $event->reg_limit;
			$registration_start = $event->registration_start;
			$start_date = event_date_display($event->start_date, 'Y-m-d');
			$end_date = event_date_display($event->end_date, 'Y-m-d');
			$is_active= $event->is_active;
			$status = array();
			$status = event_espresso_get_is_active($event_id);
			$recurrence_id = $event->recurrence_id;
			$registration_startT = $event->registration_startT;
			$event_address = $event->address;
			$event_address2 = $event->address2;
			$event_city = $event->city;
			$event_state = $event->state;
			$event_zip = $event->zip;
			$event_country = $event->country;
			$event_phone = $event->phone;
			$venue_title = $event->venue_title;
			$wp_user = $event->wp_user;
			$location = ($event_address != '' ? $event_address :'') . ($event_address2 != '' ? '<br />' . $event_address2 :'') . ($event_city != '' ? '<br />' . $event_city :'') . ($event_state != '' ? ', ' . $event_state :'') . ($event_zip != '' ? '<br />' . $event_zip :'') . ($event_country != '' ? '<br />' . $event_country :'');
			$dow = date("D",strtotime($start_date));
			echo $event_id 
					. $s . $event_name
					. $s . $venue_title
					. $s . $start_date
					. $s . event_espresso_get_time($event_id, 'start_time')
					. $s . $dow
					. $s . event_date_display($registration_start,get_option('date_format'));
			if (function_exists('espresso_is_admin')&&espresso_is_admin()==true && $espresso_premium == true){
					$user_company = espresso_user_meta($wp_user, 'company') !=''?espresso_user_meta($wp_user, 'company'):'';
					$user_organization = espresso_user_meta($wp_user, 'organization') !=''?espresso_user_meta($wp_user, 'organization'):'';
					$user_co_org = $user_company !=''?$user_company:$user_organization;
					echo $s . (espresso_user_meta($wp_user, 'user_firstname') !=''?espresso_user_meta($wp_user, 'user_firstname') . ' ' . espresso_user_meta($wp_user, 'user_lastname'):espresso_user_meta($wp_user, 'display_name'));
			}
			echo $s . 	strip_tags($status['display']) . 
						$s . str_replace('/',' of ', get_number_of_attendees_reg_limit($event_id) );

			switch ($_REQUEST['type']) {
				case "csv" : 	echo "\r\n";		break;
				default :		echo $et . "\r\n";	break;
			}
		}
	}
}

if (!function_exists('espresso_export_stuff')){
	function espresso_export_stuff(){
		//Export data to Excel file
		if (isset($_REQUEST['export'])){
			switch ($_REQUEST['export']) {
			 case "report";
				global $wpdb;
		
				$event_id= $_REQUEST['event_id'];
				$today = date("Y-m-d-Hi",time());
		
				$sql_x = "SELECT id, event_name, event_desc, event_identifier, question_groups, event_meta FROM " . EVENTS_DETAIL_TABLE;
				$sql_x .= $_REQUEST['all_events'] == "true"? '' :	" WHERE id = '" . $event_id . "' ";
				//echo $sql_x;
				$results = $wpdb->get_row($sql_x, ARRAY_N);
		
				list($event_id, $event_name, $event_description, $event_identifier, $question_groups, $event_meta) = $results;
		
				$basic_header = array(__('Group','event_espresso'),__('Reg ID','event_espresso'), __('Last Name','event_espresso'), __('First Name','event_espresso'), __('Email','event_espresso'), __('Address','event_espresso'), __('Address 2','event_espresso'), __('City','event_espresso'), __('State','event_espresso'), __('Zip','event_espresso'), __('Phone','event_espresso'), __('Payment Method','event_espresso'), __('Reg Date','event_espresso'), __('Pay Status','event_espresso'), __('Type of Payment','event_espresso'), __('Transaction ID','event_espresso'), __('Payment','event_espresso'), __('Coupon Code','event_espresso'), __('# Attendees','event_espresso'), __('Date Paid','event_espresso'), __('Event Name','event_espresso'), __('Price Option','event_espresso'), __('Event Date','event_espresso'), __('Event Time','event_espresso'), __('Website Check-in','event_espresso'), __('Tickets Scanned','event_espresso') );
		
				$question_groups = unserialize($question_groups);
				$event_meta = unserialize($event_meta);
				
				if (isset($event_meta['add_attendee_question_groups']))
				{
					$add_attendee_question_groups = $event_meta['add_attendee_question_groups'];
					$question_groups = array_unique(array_merge((array) $question_groups, (array) $add_attendee_question_groups));
				}
				switch ($_REQUEST['action']) {
					case "event";
						espresso_event_export($event_name);
						break;
					case "payment";
		
						$question_list = array();//will be used to associate questions with correct answers
						$question_filter = array();//will be used to keep track of newly added and deleted questions
		
						if (count($question_groups) > 0){
							$questions_in = '';
							$question_sequence = array();
		
							foreach ($question_groups as $g_id) 
							{
								$questions_in .= $g_id . ',';
							}
		
							$questions_in = substr($questions_in,0,-1);
							$group_name = '';
							$counter = 0;
		
							$quest_sql = "SELECT q.id, q.question FROM " . EVENTS_QUESTION_TABLE . " q ";
							$quest_sql .= " JOIN " .  EVENTS_QST_GROUP_REL_TABLE . " qgr on q.id = qgr.question_id ";
							$quest_sql .= " JOIN " . EVENTS_QST_GROUP_TABLE . " qg on qg.id = qgr.group_id ";
							$quest_sql .= " WHERE qgr.group_id in ( " . $questions_in . ") ";
							if(  function_exists('espresso_member_data') && ( espresso_member_data('role')=='espresso_event_manager' || espresso_member_data('role')=='espresso_group_admin') )
							{
								$quest_sql .= " AND qgr.wp_user = '" . espresso_member_data('id') ."' ";
							}		
							//Fix from Jesse in the forums (http://eventespresso.com/forums/2010/10/form-questions-appearing-in-wrong-columns-in-excel-export/)
							//$quest_sql .= " AND q.system_name is null ORDER BY qg.id, q.id ASC ";
							$quest_sql .= " AND q.system_name is null ORDER BY q.sequence, q.id ASC ";
		
							$questions = $wpdb->get_results($quest_sql);
		
							$num_rows = $wpdb->num_rows;
							if ($num_rows > 0)
							{
								foreach ($questions as $question) 
								{
									$question_list[$question->id] = $question->question;
									$question_filter[$question->id] = $question->id;
									array_push( $basic_header, escape_csv_val( $question->question, $_REQUEST['type']));
									//array_push($question_sequence, $question->sequence);
								}
							}
						}
		
						if (count($question_filter) >0)
						{
							$question_filter = implode(",", $question_filter);
						}
						//$participants = $wpdb->get_results("SELECT * FROM ".EVENTS_ATTENDEE_TABLE." WHERE event_id = '$event_id'");
			
						//$participants = $wpdb->get_results("SELECT ed.event_name, ed.start_date, a.id, a.lname, a.fname, a.email, a.address, a.city, a.state, a.zip, a.phone, a.payment, a.date, a.payment_status, a.txn_type, a.txn_id, a.amount_pd, a.quantity, a.coupon_code, a.payment_date, a.event_time, a.price_option FROM " . EVENTS_ATTENDEE_TABLE . " a JOIN " . EVENTS_DETAIL_TABLE . " ed ON ed.id=a.event_id WHERE ed.id = '" . $event_id . "'");
						$sql = "(";
						if (function_exists('espresso_member_data')&&espresso_member_data('role')=='espresso_group_admin')
						{
							$group = get_user_meta(espresso_member_data('id'), "espresso_group", true);
							$group = unserialize($group);
							$group = implode(",",$group);
							$sql .= "SELECT ed.event_name, ed.start_date, a.id, a.registration_id, a.lname, a.fname, a.email, a.address, a.address2, a.city";
							$sql .= ", a.state, a.zip, a.phone, a.payment, a.date, a.payment_status, a.txn_type, a.txn_id";
							$sql .= ", a.amount_pd, a.quantity, a.coupon_code, a.checked_in, a.checked_in_quantity";

							//Add groupon reference if installed
							if (file_exists("addons/groupon_functions.php"))
							{
								$sql .= ", a.groupon_code";
							}
							$sql .= ", a.payment_date, a.event_time, a.price_option";
							$sql .= " FROM " . EVENTS_ATTENDEE_TABLE . " a ";
							$sql .= " JOIN " . EVENTS_DETAIL_TABLE . " ed ON ed.id=a.event_id ";
							if ($group !='')
							{
								$sql .= " JOIN " . EVENTS_VENUE_REL_TABLE . " r ON r.event_id = ed.id ";
								$sql .= " JOIN " . EVENTS_LOCALE_REL_TABLE . " l ON  l.venue_id = r.venue_id ";
							}
							$sql .= $_REQUEST['all_events'] == "true"? '' :	" WHERE ed.id = '" . $event_id . "' ";
							$sql .= $group !='' ? " AND  l.locale_id IN (" . $group . ") " : '';
							$sql .= ") UNION (";
						}		
						$sql .= "SELECT ed.event_name, ed.start_date, a.id, a.registration_id, a.lname, a.fname, a.email, a.address, a.address2, a.city";
						$sql .= ", a.state, a.zip, a.phone, a.payment, a.date, a.payment_status, a.txn_type, a.txn_id";
						$sql .= ", a.amount_pd, a.quantity, a.coupon_code, a.checked_in, a.checked_in_quantity";
		
						//Add groupon reference if installed
						if (file_exists("addons/groupon_functions.php"))
						{
							$sql .= ", a.groupon_code";
						}
		
						$sql .= ", a.payment_date, a.event_time, a.price_option";
						$sql .= " FROM " . EVENTS_ATTENDEE_TABLE . " a ";
						$sql .= " JOIN " . EVENTS_DETAIL_TABLE . " ed ON ed.id=a.event_id ";
						$sql .= $_REQUEST['all_events'] == "true"? '' :	" WHERE ed.id = '" . $event_id . "' ";
						if(  function_exists('espresso_member_data') && ( espresso_member_data('role')=='espresso_event_manager' || espresso_member_data('role')=='espresso_group_admin') )
						{
							$sql .= " AND wp_user = '" . espresso_member_data('id') ."' ";
						}
						$sql .= ") ORDER BY a.id ";
		
						$participants = $wpdb->get_results($sql);
		
						$filename = $_REQUEST['all_events'] == "true"? __('all-events', 'event_espresso') :	sanitize_title_with_dashes($event_name);
		
						$filename = $filename . "-" . $today ;
						switch ($_REQUEST['type']) {
							case "csv" :
								$st = "";
								$et = ",";
								$s = $et . $st;
								header("Content-type: application/x-msdownload");
								header("Content-Disposition: attachment; filename=" . $filename . ".csv");
								//header("Content-Disposition: attachment; filename='" .$filename .".csv'");
								header("Pragma: no-cache");
								header("Expires: 0");
								//echo header
								echo implode($s, $basic_header) . "\r\n";
							break;
		
							default :
								$st = "";
								$et = "\t";
								$s = $et . $st;
								header("Content-Disposition: attachment; filename=" . $filename . ".xls");
								//header("Content-Disposition: attachment; filename='" .$filename .".xls'");
								header("Content-Type: application/vnd.ms-excel");
								header("Pragma: no-cache");
								header("Expires: 0");
								//echo header
								echo implode($s, $basic_header) . $et . "\r\n";
							break;
						}
							//echo data
						if ($participants) 
						{
							$temp_reg_id = ''; //will temporarily hold the registration id for checking with the next row
							$attendees_group = ''; //will hold the names of the group members
							$group_counter = 1;
							$amount_pd = 0;
	
							foreach ($participants as $participant) 
							{
	
								if ( $temp_reg_id == '' )
								{
									$temp_reg_id = $participant->registration_id;
									$amount_pd = $participant->amount_pd;
								}
	
	
								if ( $temp_reg_id == $participant->registration_id )
								{

								} 
								else 
								{

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
															//echo "<pre>", print_r($answers), "</pre>";
															//echo "<pre>", print_r($question_list), "</pre>";
								foreach($question_list as $k=>$v) 
								{
									/*
									 * in case the event organizer removes a question from a question group,
									 * the orphaned answers will remian in the answers table.  This check will make sure they don't get exported.
									 */
									if (array_key_exists($k, $answers))
									{
										$search = array("\r", "\n", "\t");
										$clean_answer = str_replace($search, " ", $answers[$k]->answer);
										$clean_answer = escape_csv_val($clean_answer);
										echo $s . $clean_answer;
									} 
									else 
									{
										echo $s;
									}
								}
								switch ($_REQUEST['type']) 
								{
									case "csv" :
										echo "\r\n";
									break;
									default :
										echo $et . "\r\n";
									break;
								}
							}
						} 
						else 
						{
							echo __('No participant data has been collected.','event_espresso');
						}
						exit;
					break;
		
					default:
						echo '<p>'.__('This Is Not A Valid Selection!','event_espresso').'</p>';
						break;
				}
		
				default:
				break;
			}
		}
	}
}
