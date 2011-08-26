<?php
function event_list_attendees() {
    global $wpdb, $org_options, $ticketing_installed;
	
	//Dates
	$curdate = date("Y-m-d");
	$pieces = explode('-',$curdate, 3);
	$this_year_r = $pieces[0];
	$this_month_r = $pieces[1];
	$days_this_month = date('t', strtotime($curdate));

    if (!empty($_POST['delete_customer'])) {
        if (is_array($_POST['checkbox'])) {
            while (list($key, $value) = each($_POST['checkbox'])):
                $del_id = $key;
                $sql = "DELETE FROM " . EVENTS_ATTENDEE_TABLE . " WHERE registration_id = '$del_id'";
                $wpdb->query($sql);
            endwhile;
        }
        ?>

<div id="message" class="updated fade">
  <p><strong>
    <?php _e('Customer(s) have been successfully deleted from the event.', 'event_espresso'); ?>
    </strong></p>
</div>
<?php
    }
    //	MARKING USERS AS ATTENDED (OR NOT)
    if ((!empty($_POST['attended_customer']) || !empty($_POST['unattended_customer'])) && $ticketing_installed == true) {
        if (is_array($_POST['checkbox'])) {
            while (list($key, $value) = each($_POST['checkbox'])):
                $del_id = $key;
                //echo $del_id . " / " . $value . "<br />\n";
                if ($value == "on" && $_POST['attended_customer']) {
                    $checker = 1;
                } else {
                    $checker = 0;
                }
                $wpdb->get_results("SELECT checked_in_quantity FROM " . EVENTS_ATTENDEE_TABLE . " WHERE registration_id = '$del_id' LIMIT 0,1 ");
                $ticket_scanned = $wpdb->last_result[0]->checked_in_quantity;
                if ($ticket_scanned >= 1) {
                    ?>
<div id="message" class="error fade">
  <p><strong>
    <?php _e('Scanned tickets cannot be redeemed/un-redeemed here.', 'event_espresso'); ?>
    </strong></p>
</div>
<?php
                } else {
                    $sql = "UPDATE " . EVENTS_ATTENDEE_TABLE . " SET checked_in = $checker WHERE registration_id = '$del_id'";
                    $wpdb->query($sql);
                    //echo $sql;
                    ?>
<div id="message" class="updated fade">
  <p><strong>
    <?php _e('Customer(s) attendance data successfully updated for this event.', 'event_espresso'); ?>
    </strong></p>
</div>
<?php
                }
            endwhile;
        }
    }
	
    require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/event-management/queries.php');
	
	if (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/admin-files/admin_reports_filters.php')) {
        require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/admin-files/admin_reports_filters.php');
    } else {
        echo '<p><strong>' . __('Advanced filters are available in the premium versions.', 'event_espresso') . '</strong> <a href="http://eventespresso.com/download/" target="_blank">' . __('Upgrade Now!', 'event_espresso') . '</a></p>';
    }
	if (isset($_REQUEST['event_id']) && $_REQUEST['event_id']!=''){
		echo '<h3>'.espresso_event_list_attendee_title($_REQUEST['event_id']).'</h3>'; 
	}
    ?>
<style type="text/css">
        .dataTables_paginate {margin-top:10px;}
        .sorting_asc .sorting_desc {}
        th.sorting_asc span.sorting-indicator {display:block; margin-left:3px; background-position: 0 0;}
        th.sorting_desc span.sorting-indicator {display:block; margin-left:3px; background-position: -7px 0;}
        #table thead tr th span {cursor:pointer; float:left;}
        #table thead tr th span:hover {color:#D54E21;}
        #table_filter input {width:250px; background:#fff;}

        /*fixing this */
        .view_btn:hover, .edit_btn:hover, .complete_btn:hover, .shortcode_btn:hover, .excel_exp_btn:hover, .csv_exp_btn:hover, .newsletter_btn:hover  {height: 18px; margin: 2px 3px 0 0;}
    </style>
<?php /*if (!empty($_REQUEST['event_id'])) { ?>

        <h3 style="margin-bottom:15px;"><?php _e('Attendee Report for Event ID:', 'event_espresso'); ?> <?php espresso_event_list_attendee_title($_REQUEST['event_id']); ?></h3>

    <?php }*/ ?>
<form id="form1" name="form1" method="post" action="<?php echo $_SERVER["REQUEST_URI"] ?>">
  <table id="table" class="widefat fixed" width="100%">
    <thead>
      <tr>
        <th class="manage-column column-cb check-column" id="cb" scope="col" style="width: 4%;"><input type="checkbox"></th>
        <th class="manage-column column-title" id="name" scope="col" title="Click to Sort"style="width: 10%;"> <span>
          <?php _e('Attendee Name', 'event_espresso'); ?>
          <span> <span class="sorting-indicator"></span> </th>
        <th class="manage-column column-date" id="registrationid" scope="col" title="Click to Sort" style="width: 10%;"> <span>
          <?php _e('Reg ID', 'event_espresso'); ?>
          </span> <span class="sorting-indicator"></span> </th>
        <th class="manage-column column-date" id="registration" scope="col" title="Click to Sort" style="width: 10%;"> <span>
          <?php _e('Registered', 'event_espresso'); ?>
          </span> <span class="sorting-indicator"></span> </th>
        <th class="manage-column column-title" id="event" scope="col" title="Click to Sort" style="width: 10%;"> <span>
          <?php _e('Event Title', 'event_espresso'); ?>
          </span> <span class="sorting-indicator"></span> </th>
        <th class="manage-column column-title" id="event" scope="col" title="Click to Sort" style="width: 8%;"> <span>
          <?php _e('Event Time', 'event_espresso'); ?>
          </span> <span class="sorting-indicator"></span> </th>
        <?php if ($ticketing_installed == true) { ?>
        <th class="manage-column column-title" id="attended" scope="col" title="Click to Sort" style="width: 8%;"> <span>
          <?php _e('Attended', 'event_espresso'); ?>
          </span> <span class="sorting-indicator"></span> </th>
        <?php } ?>
        <th class="manage-column column-title" id="event" scope="col" title="Click to Sort" style="width: 8%;"> <span>
          <?php _e('Option', 'event_espresso'); ?>
          </span> <span class="sorting-indicator"></span> </th>
        <th class="manage-column column-date" id="amount" scope="col" title="Click to Sort" style="width: 10%;"> <span>
          <?php _e('Payment', 'event_espresso'); ?>
          </span> <span class="sorting-indicator"></span> </th>
        <th class="manage-column column-date" id="payment_type" scope="col" title="Click to Sort" style="width: 10%;"> <span>
          <?php _e('Type', 'event_espresso'); ?>
          </span> <span class="sorting-indicator"></span> </th>
        <th class="manage-column column-date" id="coupon" scope="col" title="Click to Sort" style="width: 12%;"> <span>
          <?php _e('Coupon', 'event_espresso'); ?>
          </span> <span class="sorting-indicator"></span> </th>
        <th class="manage-column column-date" id="txn_id" scope="col" title="Click to Sort" style="width: 15%;"> <span>
          <?php _e('Transaction ID', 'event_espresso'); ?>
          </span> <span class="sorting-indicator"></span> </th>
        <th class="manage-column column-date" id="action" scope="col" title="Click to Sort"style="width: 8%;"><?php _e('Action', 'event_espresso'); ?></th>
      </tr>
    </thead>
    <tbody>
      <?php
    $temp_reg_id = ''; //will temporarily hold the registration id for checking with the next row
    $attendees_group = ''; //will hold the names of the group members
    $counter = 0; //used for keeping track of the last row.  If counter = num_rows, print
    $go = false; //triggers the output when true.  Set when the next reg id != temp_reg_id
	$sql_clause = " WHERE ";
    $sql_a = "(";
    if (function_exists('espresso_member_data') && espresso_member_data('role') == 'espresso_group_admin') {
        $group = get_user_meta(espresso_member_data('id'), "espresso_group", true);
        $group = unserialize($group);
        $group = implode(",", $group);
        $sql_a .= "SELECT a.*, e.id event_id, e.event_name, checked_in FROM " . EVENTS_ATTENDEE_TABLE . " a ";
        $sql_a .= " LEFT JOIN " . EVENTS_DETAIL_TABLE . " e ON e.id=a.event_id ";

        if ($_REQUEST['category_id'] != '') {
            $sql_a .= " JOIN " . EVENTS_CATEGORY_REL_TABLE . " r ON r.event_id = e.id ";
            $sql_a .= " JOIN " . EVENTS_CATEGORY_TABLE . " c ON  c.id = r.cat_id ";
        }
        if ($group != '') {
            $sql_a .= " JOIN " . EVENTS_VENUE_REL_TABLE . " r ON r.event_id = e.id ";
            $sql_a .= " JOIN " . EVENTS_LOCALE_REL_TABLE . " l ON  l.venue_id = r.venue_id ";
        }
        $sql_a .= $_REQUEST['category_id'] != '' ? " AND c.id = '" . $_REQUEST['category_id'] . "' " : '';

        $sql_clause = " WHERE ";

        if ($_REQUEST['payment_status'] != '') {
            $sql_a .= " $sql_clause a.payment_status = '" . $_REQUEST['payment_status'] . "' ";
            $sql_clause = " AND ";
        }
        if ($_POST['month_range'] != '') {
            $pieces = explode('-', $_REQUEST['month_range'], 3);
            $year_r = $pieces[0];
            $month_r = $pieces[1];
            $sql_a .= " $sql_clause a.date BETWEEN '" . event_espresso_no_format_date($year_r . '-' . $month_r . '-01', $format = 'Y-m-d') . "' AND '" . event_espresso_no_format_date($year_r . '-' . $month_r . '-31', $format = 'Y-m-d') . "' ";
            $sql_clause = " AND ";
        }

        if ($_REQUEST['event_id'] != '') {
            $sql_a .= " $sql_clause a.event_id = '" . $_REQUEST['event_id'] . "' ";
            $sql_clause = " AND ";
        }

        if ($_REQUEST['today_a'] == 'true') {
            //$sql_a .= " $sql_clause a.date = '" . event_espresso_no_format_date($curdate,$format = 'Y-m-d') ."' ";
            $sql_a .= " $sql_clause a.date BETWEEN '" . $curdate . ' 00:00:00' . "' AND '" . $curdate . ' 23:59:59' . "' ";
            $sql_clause = " AND ";
        }

        if ($_REQUEST['this_month_a'] == 'true') {
            $sql_a .= " $sql_clause a.date BETWEEN '" . event_espresso_no_format_date($this_year_r . '-' . $this_month_r . '-01', $format = 'Y-m-d') . "' AND '" . event_espresso_no_format_date($this_year_r . '-' . $this_month_r . '-' . $days_this_month, $format = 'Y-m-d') . "' ";
            $sql_clause = " AND ";
        }
        $sql_a .= $group != '' ? $sql_clause . "  l.locale_id IN (" . $group . ") " : '';
		$sql_a .= " AND e.event_status != 'D' ";
        $sql_a .= ") UNION (";
    }
    $sql_a .= "SELECT a.*, e.id event_id, e.event_name, checked_in FROM " . EVENTS_ATTENDEE_TABLE . " a ";
    $sql_a .= " LEFT JOIN " . EVENTS_DETAIL_TABLE . " e ON e.id=a.event_id ";
    if (!empty($_REQUEST['category_id'])) {
        $sql_a .= " JOIN " . EVENTS_CATEGORY_REL_TABLE . " r ON r.event_id = e.id ";
        $sql_a .= " JOIN " . EVENTS_CATEGORY_TABLE . " c ON  c.id = r.cat_id ";
    }

    $sql_a .= !empty($_REQUEST['category_id']) ? " AND c.id = '" . $_REQUEST['category_id'] . "' " : '';

    $sql_clause = " WHERE ";

    if (!empty($_REQUEST['payment_status'])) {
        $sql_a .= " $sql_clause a.payment_status = '" . $_REQUEST['payment_status'] . "' ";
        $sql_clause = " AND ";
    }

    if (!empty($_POST['month_range'])) {
        $pieces = explode('-', $_REQUEST['month_range'], 3);
        $year_r = $pieces[0];
        $month_r = $pieces[1];
        $sql_a .= " $sql_clause a.date BETWEEN '" . event_espresso_no_format_date($year_r . '-' . $month_r . '-01', $format = 'Y-m-d') . "' AND '" . event_espresso_no_format_date($year_r . '-' . $month_r . '-31', $format = 'Y-m-d') . "' ";
        $sql_clause = " AND ";
    }

    if (!empty($_REQUEST['event_id'])) {
        $sql_a .= " $sql_clause a.event_id = '" . $_REQUEST['event_id'] . "' ";
        $sql_clause = " AND ";
    }
    if (!empty($_REQUEST['today_a'])) {
        //$sql_a .= " $sql_clause a.date = '" . event_espresso_no_format_date($curdate,$format = 'Y-m-d') ."' ";
        $sql_a .= " $sql_clause a.date BETWEEN '" . $curdate . ' 00:00:00' . "' AND '" . $curdate . ' 23:59:59' . "' ";
        $sql_clause = " AND ";
    }
    if (!empty($_REQUEST['this_month_a'])) {
        $sql_a .= " $sql_clause a.date BETWEEN '" . event_espresso_no_format_date($this_year_r . '-' . $this_month_r . '-01', $format = 'Y-m-d') . "' AND '" . event_espresso_no_format_date($this_year_r . '-' . $this_month_r . '-' . $days_this_month, $format = 'Y-m-d') . "' ";
        $sql_clause = " AND ";
    }
    if (function_exists('espresso_member_data') && ( espresso_member_data('role') == 'espresso_event_manager' || espresso_member_data('role') == 'espresso_group_admin')) {
        $sql_a .= $sql_clause . " e.wp_user = '" . espresso_member_data('id') . "' ";
    }
	$sql_a .= " $sql_clause e.event_status != 'D' ";
    $sql_a .= ") ORDER BY date DESC, id ASC ";
	
    $attendees = $wpdb->get_results($sql_a);
	//echo $sql_a;
	
    $total_attendees = $wpdb->num_rows;
	$quantity =0;
	$$attendees_group = '';
    if ($total_attendees > 0) {
        for ($i = 0; $i <= $total_attendees; $i++) {
            #if (isset($attendees[$i])){
				if (isset($attendees[$i])){	
					$attendee = $attendees[$i];
				
					//echo 'Reg. Id: '.$registration_id.'<br />';
					$registration_id = $attendee->registration_id;
					$lname = $attendee->lname;
					$fname = $attendee->fname;
					$address = $attendee->address;
					$city = $attendee->city;
					$state = $attendee->state;
					$zip = $attendee->zip;
					$email = '<span style="visibility:hidden">' . $attendee->email . '</span>';
					$phone = $attendee->phone;
					$quantity = $attendee->quantity > 1 ? '<br />(' . __('Total Attendees', 'event_espresso') . ': ' . $attendee->quantity . ')' : '';
					if ($temp_reg_id == '') {
						$id = $attendee->id;
						$temp_reg_id = $registration_id;
						//echo 'Temp Reg. Id: '.$registration_id.'<br />';
		
						$attended = $attendee->checked_in;
						$ticket_scanned = $attendee->checked_in_quantity;
						$amount_pd = $attendee->amount_pd;
						$payment_status = $attendee->payment_status;
						$payment_date = $attendee->payment_date;
						$date = $attendee->date;
						$event_id = $attendee->event_id;
						$coupon_code = $attendee->coupon_code;
						$txn_id = $attendee->txn_id;
						$txn_type = $attendee->txn_type;
						$price_option = $attendee->price_option;
						$event_time = $attendee->event_time;
						$event_name = $attendee->event_name;
						$event_date = $attendee->start_date;
						
					}
				}
				if ($temp_reg_id == $registration_id && isset($attendees[$i])) {
					
					$booking_info = "";
					/*
					 * Added for seating chart addon
					 */
					$booking_info = "";
					if ( defined('ESPRESSO_SEATING_CHART') )
					{
						$seating_chart_id = seating_chart::check_event_has_seating_chart($event_id);
						if ( $seating_chart_id !== false )
						{
							$seat = $wpdb->get_row("select scs.* , sces.id as booking_id from ".EVENTS_SEATING_CHART_SEAT_TABLE." scs inner join ".EVENTS_SEATING_CHART_EVENT_SEAT_TABLE." sces on scs.id = sces.seat_id where sces.attendee_id = {$attendee->id}");
							if ( $seat !== NULL )
							{
								$booking_info = "[Seat: ".$seat->custom_tag." <br/>#booking id: ".$seat->booking_id." ]<br/>";
							}
						}
					}
					/*
					 *	End
					 */

					$attendees_group .= "<li> $fname $lname $email <br/>".$booking_info." <span style=\"visibility:hidden\">" . $registration_id . "</span>$quantity</li>";
					/*echo '<p>';
					echo $payment_status.'<br />';
					echo 'Temp Reg. Id: '.$temp_reg_id.'<br />';
					echo 'Amount: '. espresso_attendee_price(array('attendee_id'=>$registration_id)).'<br />';
					echo '</p>';*/
					$total_amount_pd = espresso_attendee_price(array('registration_id'=>$registration_id, 'reg_total'=>true));
				} else {
					$go = true;
				}
				//echo $attendee->quantity;
				#echo "total attendees : {$total_attendees} && counter : {$counter}";
				if ($go || $total_attendees == $counter) {
                ?>
                  <tr>
                    <td class="check-column" style="padding:7px 0 22px 7px; vertical-align:top;"><input name="checkbox[<?php echo $temp_reg_id ?>]" type="checkbox"  title="Delete <?php echo $fname ?><?php echo $lname ?>"></td>
                    <td class="row-title"  nowrap="nowrap"><a href="admin.php?page=events&amp;event_admin_reports=edit_attendee_record&amp;event_id=<?php echo $event_id; ?>&amp;registration_id=<?php echo $temp_reg_id; ?>&amp;form_action=edit_attendee&amp;id=<?php echo $id ?>" title="<?php echo'ID#:'.$id.' [ REG#: ' . $temp_reg_id.' ]'; ?>">
                      <ul>
                         <?php echo $attendees_group ?>
                      </ul>
                      </a></td>
                    <td nowrap="nowrap"><?php echo $temp_reg_id ?></td>
                    <td class="date column-date"><?php echo event_date_display($date, get_option('date_format') . ' g:i a') ?></td>
                    <td nowrap="nowrap"><a href="admin.php?page=events&amp;event_admin_reports=list_attendee_payments&amp;event_id=<?php echo $event_id ?>" title="<?php _e('View attendees for this event', 'event_espresso'); ?>"><?php echo stripslashes_deep($event_name) ?></a></td>
                    <td nowrap="nowrap"><?php echo event_date_display($event_time, get_option('time_format')) ?></td>
                    <?php if ($ticketing_installed == true) { ?>
                    <td nowrap="nowrap"><?php echo ($attended == 1 || $ticket_scanned >= 1) ? event_espresso_paid_status_icon('Checkedin') : event_espresso_paid_status_icon('NotCheckedin'); ?></td>
                    <?php } ?>
                    <td nowrap="nowrap"><?php echo $price_option ?></td>
                    <td class="date column-date"><a href="admin.php?page=events&amp;attendee_pay=paynow&amp;form_action=payment&amp;registration_id=<?php echo $temp_reg_id ?>&amp;event_admin_reports=enter_attendee_payments&amp;event_id=<?php echo $event_id ?>" title="<?php _e('Edit Payment', 'event_espresso'); ?> ID: <?php echo $temp_reg_id ?>">
                      <?php event_espresso_paid_status_icon($payment_status) ?>
                      </a> <a href="admin.php?page=events&amp;attendee_pay=paynow&amp;form_action=payment&amp;registration_id=<?php echo $temp_reg_id ?>&amp;event_admin_reports=enter_attendee_payments&amp;event_id=<?php echo $event_id ?>" title="<?php _e('Edit Payment', 'event_espresso'); ?> ID: <?php echo $temp_reg_id ?>"><?php echo $org_options['currency_symbol'] ?><?php echo $total_amount_pd ?></a></td>
                    <td class="date column-date"><?php echo espresso_payment_type($txn_type); ?></td>
                    <td class="date column-date"><?php echo $coupon_code ?></td>
                    <td class="date column-date"><?php echo $txn_id ?></td>
                    <td class="date column-date" >
                    
                    <a href="admin.php?page=events&amp;attendee_pay=paynow&amp;form_action=payment&amp;registration_id=<?php echo $temp_reg_id ?>&amp;event_admin_reports=enter_attendee_payments&amp;event_id=<?php echo $event_id ?>" title="<?php _e('Edit Payment', 'event_espresso'); ?> ID: <?php echo $temp_reg_id ?>"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/icons/money.png" width="16" height="16" alt="<?php _e('Edit Payment', 'event_espresso'); ?>" /></a>
                    
                    <a href="admin.php?page=events&amp;event_admin_reports=edit_attendee_record&amp;registration_id=<?php echo $temp_reg_id ?>&amp;event_id=<?php echo $event_id ?>&amp;form_action=edit_attendee" title="<?php _e('Edit Attendee', 'event_espresso'); ?>"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/icons/user_edit.png" width="16" height="16" alt="<?php _e('Edit Attendee', 'event_espresso'); ?>" /></a>
                    
                    <a href="admin.php?page=events&amp;event_admin_reports=resend_email&amp;registration_id=<?php echo $temp_reg_id ?>&amp;event_id=<?php echo $event_id ?>&amp;form_action=resend_email" title="<?php _e('Resend Registration Details', 'event_espresso'); ?>"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/icons/email_link.png" width="16" height="16" alt="<?php _e('Resend Registration Details', 'event_espresso'); ?>" /></a>
                    
                    <a href="<?php echo home_url(); ?>/?download_invoice=true&amp;admin=true&amp;registration_id=<?php echo $temp_reg_id ?>" target="_blank"  title="<?php _e('Download Invoice', 'event_espresso'); ?>"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/icons/page_white_acrobat.png" width="16" height="16" alt="<?php _e('Download Invoice', 'event_espresso'); ?>" /></a>
          <?php 
				if ($org_options["use_attendee_pre_approval"] == "Y") { 
			?>
          <br/>
          <a href="admin.php?page=events&amp;attendee_pay=paynow&amp;form_action=payment&amp;registration_id=<?php echo $temp_reg_id ?>&amp;event_admin_reports=enter_attendee_payments&amp;event_id=<?php echo $event_id ?>" title="<?php _e('Edit Payment', 'event_espresso'); ?> ID: <?php echo $temp_reg_id ?>">
          <?php 
					if (is_attendee_approved($event_id, $id)) { 
				?>
          <strong>
          <?php _e('Approved', 'event_espresso'); ?>
          </strong><br/>
          <?php 
					}else { ?>
          <span style="color:#FF0000"><strong>
          <?php _e('Awaiting approval', 'event_espresso'); ?>
          </strong></span>
          <?php 
					}
			?>
          </a>
          <?php 
				}
	?></td>
      </tr>
      <?php
					#echo '<p>';
					$id = $attendee->id;
					$temp_reg_id = $registration_id;
					$booking_info = "";
														/*
														 * Added for seating chart addon
														 */
														
														if ( defined('ESPRESSO_SEATING_CHART') )
														{
															$seating_chart_id = seating_chart::check_event_has_seating_chart($attendee->event_id);
															if ( $seating_chart_id !== false )
															{
																$seat = $wpdb->get_row("select scs.* , sces.id as booking_id from ".EVENTS_SEATING_CHART_SEAT_TABLE." scs inner join ".EVENTS_SEATING_CHART_EVENT_SEAT_TABLE." sces on scs.id = sces.seat_id where sces.attendee_id = {$id}");
																if ( $seat !== NULL )
																{
																	$booking_info = "[Seat: ".$seat->custom_tag." <br/>#booking id: ".$seat->booking_id." ]<br/>";
																}
															}
														}
														/*
														 *	End
														 */
                                                        $email = '<span style="visibility:hidden">' . $attendee->email . '</span>';
                                                        $attendees_group = "<li>$fname $lname $email <br/>$booking_info $quantity</li>";
					$go = false;
																	   
					$total_amount_pd = espresso_attendee_price(array('registration_id'=>$temp_reg_id, 'reg_total'=>true));
					$attended = $attendee->checked_in;
					$ticket_scanned = $attendee->checked_in_quantity;
					$payment_status = $attendee->payment_status;
					$payment_date = $attendee->payment_date;
					$date = $attendee->date;
					$event_id = $attendee->event_id;
					$coupon_code = $attendee->coupon_code;
					$txn_type = $attendee->txn_type;
					$txn_id = $attendee->txn_id;
					$event_name = $attendee->event_name;
					$event_time = $attendee->event_time;
					$price_option = $attendee->price_option;
					$event_date = $attendee->start_date;
				}
				$counter++;
			#} #if (isset($attendees[$i]))
		}
	}
?>
    </tbody>
  </table>
  <div style="clear:both; margin-bottom:30px;">
    <input name="delete_customer" type="submit" class="button-secondary" id="delete_customer" value="<?php _e('Delete Attendee(s)', 'event_espresso'); ?>" style="margin:10px 0 0 0;" onclick="return confirmDelete();" />
    <?php if ($ticketing_installed == true) { ?>
    <input name="attended_customer" type="submit" class="button-secondary" id="attended_customer" value="<?php _e('Mark as Attended', 'event_espresso'); ?>" style="margin:10px 0 0 10px;" />
    <input name="unattended_customer" type="submit" class="button-secondary" id="attended_customer" value="<?php _e('Unmark as Attended', 'event_espresso'); ?>" style="margin:10px 0 0 10px;" />
    <?php } ?>
    <a style="margin-left:5px" class="button-primary" href="admin.php?page=events&amp;action=csv_import">
    <?php _e('Import CSV', 'event_espresso'); ?>
    </a> <a class="button-primary" style="margin-left:5px" href="#" onclick="window.location='<?php echo get_bloginfo('wpurl') . "/wp-admin/admin.php?event_espresso&amp;event_id=" . $_REQUEST['event_id'] . "&amp;export=report&action=payment&amp;type=excel";
                                    echo $_REQUEST['event_id'] == '' ? '&amp;all_events=true' : ''; ?>'" title="<?php _e('Export to Excel', 'event_espresso'); ?>">
    <?php _e('Export to Excel', 'event_espresso'); ?>
    </a> <?php echo isset($_REQUEST['event_id']) ? '<a style="margin-left:5px"  class="button-primary"  href="admin.php?page=events&amp;event_admin_reports=add_new_attendee&amp;event_id=' . $_REQUEST['event_id'] . '">' . __('Add Attendee', 'event_espresso') . '</a>' : ''; ?> <?php echo isset($_REQUEST['event_id']) ? '<a style="margin-left:5px" class="button-primary" href="admin.php?page=events&amp;action=edit&amp;event_id=' . $_REQUEST['event_id'] . '">' . __('Edit Event', 'event_espresso') . '</a>' : ''; ?> </div>
</form>
 <h4 style="clear:both"><?php _e('Legend', 'event_espresso'); ?></h4>
<dl style="float:left; margin-left:10px; width:200px">
  <dt><?php event_espresso_paid_status_icon('Completed') ?> - <?php _e('Completed', 'event_espresso'); ?></dt>
  <dt><?php event_espresso_paid_status_icon('Incomplete') ?> - <?php _e('Incomplete', 'event_espresso'); ?></dt>
    <dt><?php event_espresso_paid_status_icon('Pending') ?> - <?php _e('Pending', 'event_espresso'); ?></dt>

  <dt><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/icons/money.png" width="16" height="16" alt="<?php _e('Payment Details', 'event_espresso'); ?>" /> - <?php _e('Payment Details', 'event_espresso'); ?></dt>

  
  </dl>
  <dl style="float:left; margin-left:10px; width:200px">
  <dt><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/icons/email_link.png" width="16" height="16" alt="<?php _e('Resend Details', 'event_espresso'); ?>" /> - <?php _e('Resend Email', 'event_espresso'); ?></dt>
  <dt><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/icons/page_white_acrobat.png" width="16" height="16" alt="<?php _e('Download Invoice', 'event_espresso'); ?>" /> - <?php _e('Download Invoice', 'event_espresso'); ?></dt>
  <dt><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/icons/user_edit.png" width="16" height="16" alt="<?php _e(' Attendee Details', 'event_espresso'); ?>" /> - <?php _e('Attendee Details', 'event_espresso'); ?></dt>
</dl>
<script>
		jQuery(document).ready(function($) {
			/* show the table data */
			var mytable = $('#table').dataTable( {
				"sDom": 'Clfrtip',
				"bAutoWidth": false,
				"bStateSave": true,
				"sPaginationType": "full_numbers",
				"oLanguage": {    "sSearch": "<strong><?php _e('Live Search Filter', 'event_espresso'); ?>:</strong> (eg, email, txn id, event, etc.)",
				"sZeroRecords": "<?php _e('No Records Found!', 'event_espresso'); ?>" },
				"aoColumns": [
					{ "bSortable": false },
					null,
					<?php echo $ticketing_installed == true ? 'null,' : '' ?>
					null,
					null,
					null,
					null,
					null,
					null,
					null,
					null,
					null,
					{ "bSortable": false }
				],
				"aoColumnDefs": [
					{ "bVisible": false, "aTargets": [  <?php if (isset($_REQUEST['event_id'])) {echo '4,';}else{ echo '2,';} ?> <?php echo $ticketing_installed == true ? '10,11' : '9,10'; ?> ] }
				],
				"oColVis": {
					"aiExclude": [ 0, 1],
					"buttonText": "Filter: Show / Hide Columns",
					"bRestore": true
				},
			});
		});
	</script>
<?php
}
