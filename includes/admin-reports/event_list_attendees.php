<?php

function event_list_attendees() {

	global $wpdb, $org_options;
	$success = FALSE;
	$errors = FALSE;	
	
	require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Registration.model.php' );
	$REG = EEM_Registration::instance();
				
	if (!empty($_POST['delete_customer'])) {
		if (is_array($_POST['checkbox'])) {
			while (list( $del_id, $value ) = each($_POST['checkbox'])) {
				$sql = "DELETE FROM " . EVENTS_ATTENDEE_TABLE . " WHERE id = %d";
				$wpdb->query( $wpdb->prepare( $sql, absint($del_id )));
			}
		}		
		$success = __('Customer(s) have been successfully deleted from the event.', 'event_espresso'); 
	}


	//Ticketing
	if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "/ticketing/template.php") || function_exists('espresso_ticket_launch')) {
		global $ticketing_installed;
		$ticketing_installed = TRUE;
	} else {
		$ticketing_installed = FALSE;
	}
		
	//	MARKING USERS AS ATTENDED (OR NOT)
	if (( ! empty( $_POST['attended_customer'] ) || ! empty( $_POST['unattended_customer'] )) && $ticketing_installed ) {
		if ( is_array( $_POST['checkbox'] )) {
		
			while ( list( $REG_ID, $value ) = each( $_POST['checkbox'] )) {

				if ($value == "on" && $_POST['attended_customer']) {
					$check_IO = TRUE;
				} else {
					$check_IO = FALSE;
				}

				$ticket_scanned = $REG->is_registration_checked_in( $REG_ID );
				
				if ( $ticket_scanned == NULL ) {
					$errors = __('An error occured. The registration for this ticket could not be found.', 'event_espresso'); 
				} elseif ($ticket_scanned >= 1) {
					$errors = __('Scanned tickets cannot be redeemed/un-redeemed here.', 'event_espresso');
				} else {
					
					$ticket_checked = $REG->registration_check_in_check_out( $REG_ID, $check_IO );
				
					if ( $ticket_checked == NULL ) {
						$errors = __('An error occured. No ticket data was received.', 'event_espresso'); 
					} else {
						$success = __('Customer(s) attendance data successfully updated for this event.', 'event_espresso');
					}
					
				}
			}
		}
	}
	
	
	if ( $success ) : 
?>

		<div id="message" class="updated fade">
		  <p><strong><?php echo $success; ?></strong></p>
		</div>
		
<?php		
	endif;	
	
	if ( $errors ) : 
?>

		<div id="message" class="error fade">
		  <p><strong><?php echo $errors; ?></strong></p>
		</div>
		
<?php		
	endif;

	require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/admin_screens/events/queries.php');
	require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/functions/attendee_functions.php');

	if (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/admin-files/admin_reports_filters.php')) {
		$total_events = espresso_total_events();
		require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/admin-files/admin_reports_filters.php');
		do_action('action_hook_espresso_admin_reports_filters');
	} else {
		echo '<p><strong>' . __('Advanced filters are available in the premium versions.', 'event_espresso') . '</strong> <a href="http://eventespresso.com/download/" target="_blank">' . __('Upgrade Now!', 'event_espresso') . '</a></p>';
	}
	if ( isset( $_REQUEST['event_id'] ) && $_REQUEST['event_id'] != '' ) {
		echo '<h3>' . espresso_event_list_attendee_title( absint( $_REQUEST['event_id'] )) . '</h3>';
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
	
	<?php $t_cols = 10; ?>
	<form id="form1" name="form1" method="post" action="<?php echo $_SERVER["REQUEST_URI"] ?>">
	  <table id="table" class="widefat fixed" width="100%">
			<thead>
				<tr>
				
					<th class="manage-column column-cb check-column" id="cb" scope="col" style="width: 4%;"><input type="checkbox"></th>
					
					<th class="manage-column column-title" id="name" scope="col" title="Click to Sort" style="width: 17.5%;">
						<span><?php _e('Attendee Name', 'event_espresso'); ?></span> <span class="sorting-indicator"></span> 
					</th>
					
					<th class="manage-column column-date" id="registrationid" scope="col" title="Click to Sort" style="width: 21%;">
						<span><?php _e('Registration Code', 'event_espresso'); ?></span> <span class="sorting-indicator"></span>
						</th>
						
					<th class="manage-column column-date" id="registration" scope="col" title="Click to Sort" style="width: 10%;">
						<span><?php _e('Registration Date', 'event_espresso'); ?></span> <span class="sorting-indicator"></span>
					</th>
					
					<th class="manage-column column-title" id="event" scope="col" title="Click to Sort" style="width: 20%;">
						<span><?php _e('Event Title', 'event_espresso'); ?></span> <span class="sorting-indicator"></span>
					</th>
					
					<th class="manage-column column-title" id="event" scope="col" title="Click to Sort" style="width:10%;">
						<span><?php _e('Event Date & Time', 'event_espresso'); ?></span> <span class="sorting-indicator"></span>
					</th>
					
					<th class="manage-column column-title" id="event" scope="col" title="Click to Sort" style="width: 5%;">
						<span><?php _e('Price Paid', 'event_espresso'); ?></span> <span class="sorting-indicator"></span>
					</th>
					
					<th align="center" class="manage-column column-date" id="amount" style="width: 4%;" title="Click to Sort" scope="col">
					<span><?php _e('Payment', 'event_espresso'); ?></span> <span class="sorting-indicator"></span>
					</th>
					
					<th class="manage-column column-date" id="txn_id" scope="col" title="Click to Sort" style="width: 4%;">
						<span><?php _e('TXN ID', 'event_espresso'); ?></span> <span class="sorting-indicator"></span>
					</th>
					
					<th class="manage-column column-date" id="action" scope="col" title="Click to Sort" >
					<?php _e('Actions', 'event_espresso'); ?>
					</th>
					
					<?php $t_cols = apply_filters('filter_hook_espresso_event_attendee_table_header', $t_cols); ?>
					
				</tr>
			</thead>
			
			<?php if (function_exists('espresso_attendee_counts')) { ?>
				<tfoot>
					<tr>
						<td colspan="<?php echo $t_cols; ?>"><?php echo espresso_attendee_counts(); ?></td>
					</tr>
				</tfoot>
			<?php } ?>
			
			<tbody>
				<?php
				$temp_reg_id = ''; //will temporarily hold the registration id for checking with the next row
				$attendees_group = ''; //will hold the names of the group members
				$counter = 0; //used for keeping track of the last row.  If counter = num_rows, print
				$go = false; //triggers the output when true.  Set when the next reg id != temp_reg_id

				$attendees = $REG->get_registration_overview_attendees_list();

				$total_attendees = count( $attendees );
				$quantity = 0;
				$attendees_group = '';
				
				if ( $total_attendees > 0 ) {
					foreach ( $attendees as $attendee ) {
						
						//printr( $attendee, '$attendee ( ' . __FUNCTION__ . ' on line: ' .  __LINE__ . ' )' );
					
						$ATT_ID = $attendee->ATT_ID;
						$registration_id = $attendee->REG_code;
						$lname = $attendee->ATT_lname;
						$fname = $attendee->ATT_fname;
						$address = $attendee->ATT_address . ' ' . $attendee->ATT_address2;
						$city = $attendee->ATT_city;
						$state = $attendee->STA_ID;
						$zip = $attendee->ATT_zip;
						$email = '<span style="visibility:hidden">' . $attendee->ATT_email . '</span>';
						$phone = $attendee->ATT_phone;
						$quantity = $attendee->quantity > 1 ? '<br />(' . __('Total Attendees', 'event_espresso') . ': ' . $attendee->quantity . ')' : '';
						$attended = $attendee->REG_att_checked_in;
						$amount_pd = $attendee->REG_price_paid;
						$payment_status = $attendee->txn_status;
						$payment_date = $attendee->TXN_timestamp;
						$date = date_i18n( get_option('date_format') . ' g:i a', $attendee->REG_date );
						$event_id = $attendee->EVT_ID;
						$txn_id = $attendee->TXN_ID;
						$price_option = $attendee->REG_price_paid;
						$event_time = date_i18n( 'M d, Y g:i a', $attendee->DTT_EVT_start );
						$event_name = $attendee->event_name;
						$seating_info = has_filter( 'filter_hook_espresso_seating_info' ) ? apply_filters( 'filter_hook_espresso_seating_info', $ATT_ID, $event_id ) : '';
						
						//printr( unserialize(  $attendee->TXN_details ), 'TXN_details ( ' . __FUNCTION__ . ' on line: ' .  __LINE__ . ' )' );

						?>
						<tr>
						
							<td class="check-column" style="padding:7px 0 22px 7px; vertical-align:top;">
								<input name="checkbox[<?php echo $ATT_ID ?>]" type="checkbox"  title="Delete <?php echo $fname ?><?php echo $lname ?>">
							</td>
							
							<td class="row-title"  nowrap="nowrap">
								<a href="admin.php?page=attendees&amp;event_admin_reports=edit_attendee_record&amp;event_id=<?php echo $event_id; ?>&amp;registration_id=<?php echo $registration_id; ?>&amp;form_action=edit_attendee&amp;id=<?php echo $ATT_ID ?>" title="<?php echo'ID#:' . $ATT_ID . ' [ REG#: ' . $registration_id . ' ] ' . $seating_info; ?>">
									<?php echo $fname ?> <?php echo $lname ?> <?php echo $seating_info ?> <?php echo $quantity ?>
								</a>
								<div class="row-actions">
									<span class='edit'><a href="admin.php?page=attendees&amp;event_admin_reports=edit_attendee_record&amp;event_id=<?php echo $event_id; ?>&amp;registration_id=<?php echo $registration_id; ?>&amp;form_action=edit_attendee&amp;id=<?php echo $ATT_ID ?>" title="<?php echo'ID#:' . $ATT_ID . ' [ REG#: ' . $registration_id . ' ]' . $seating_info; ?>"><?php _e('Attendee', 'event_espresso'); ?></a></span>  |  <span class='edit'><a href="admin.php?page=attendees&amp;attendee_pay=paynow&amp;form_action=payment&amp;registration_id=<?php echo $registration_id ?>&amp;event_admin_reports=enter_attendee_payments&amp;event_id=<?php echo $event_id ?>" title="<?php _e('Edit Payment', 'event_espresso'); ?> ID: <?php echo $registration_id ?>"><?php _e('Payment', 'event_espresso'); ?></a> </span>
								</div>
							</td>
							
							<td nowrap="nowrap">
								<?php echo $registration_id ?>
							</td>
							
							<td class="date column-date">
								<?php echo $date ?>
							</td>
							
							<td nowrap="nowrap"><a href="admin.php?page=attendees&amp;event_admin_reports=list_attendee_payments&amp;event_id=<?php echo $event_id ?>" title="<?php _e('View attendees for this event', 'event_espresso'); ?>"><?php echo stripslashes_deep($event_name) ?></a>
							</td>
							
							<td nowrap="nowrap"><?php echo $event_time; ?>
							</td>
							
						<?php if ($ticketing_installed == true) { ?>
							<td nowrap="nowrap"><p style="padding-left:15px"><?php echo ($attended == 1 || $ticket_scanned >= 1) ? event_espresso_paid_status_icon('Checkedin') : event_espresso_paid_status_icon('NotCheckedin'); ?></p>
							</td>
						<?php } ?>
						
							<td nowrap="nowrap"><?php echo $price_option ?>
							</td>
							
							<td class="date column">
								<a href="admin.php?page=attendees&amp;attendee_pay=paynow&amp;form_action=payment&amp;registration_id=<?php echo $registration_id ?>&amp;event_admin_reports=enter_attendee_payments&amp;event_id=<?php echo $event_id ?>" title="<?php _e('Edit Payment', 'event_espresso'); ?> ID: <?php echo $registration_id ?>">
									<p style="padding-left:17px">
										<?php event_espresso_paid_status_icon($payment_status) ?>
									</p>
								</a>
							</td>
							
							<!--<td class="date column-date"><?php echo espresso_payment_type($txn_type); ?>
							</td>
							
							<td class="date column-date"><?php echo $coupon_code ?>
							</td>-->
							
							<td class="date column-date"><?php echo $txn_id ?>
							</td>
							
							<td class="date column-date" >
							
								<a href="admin.php?page=attendees&amp;attendee_pay=paynow&amp;form_action=payment&amp;registration_id=<?php echo $registration_id ?>&amp;event_admin_reports=enter_attendee_payments&amp;event_id=<?php echo $event_id ?>" title="<?php _e('Edit Payment', 'event_espresso'); ?> ID: <?php echo $registration_id ?>">
									<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/icons/money.png" width="16" height="16" alt="<?php _e('Edit Payment', 'event_espresso'); ?>" />
								</a> 
								
								<a href="admin.php?page=attendees&amp;event_admin_reports=edit_attendee_record&amp;registration_id=<?php echo $registration_id ?>&amp;event_id=<?php echo $event_id ?>&amp;form_action=edit_attendee" title="<?php _e('Edit Attendee', 'event_espresso'); ?>">
									<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/icons/user_edit.png" width="16" height="16" alt="<?php _e('Edit Attendee', 'event_espresso'); ?>" />
								</a> 
								
								<a href="admin.php?page=attendees&amp;event_admin_reports=resend_email&amp;registration_id=<?php echo $registration_id ?>&amp;event_id=<?php echo $event_id ?>&amp;form_action=resend_email" title="<?php _e('Resend Registration Details', 'event_espresso'); ?>">
									<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/icons/email_link.png" width="16" height="16" alt="<?php _e('Resend Registration Details', 'event_espresso'); ?>" />
								</a>
								
							<?php if ( function_exists('espresso_invoice_url')) : ?>
								<a href="<?php espresso_invoice_url(isset($attendee_id) && !empty($attendee_id) ? $attendee_id: '', $registration_id, 'admin=true')?>" target="_blank"  title="<?php _e('Download Invoice', 'event_espresso')?>">
									<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL?>images/icons/page_white_acrobat.png" width="16" height="16" alt="<?php _e('Download Invoice', 'event_espresso')?>" />
								</a>
							<?php endif; ?>
								
							<?php if ( defined('ESPRESSO_TICKETING_VERSION')) : ?>
								<a href="<?php espresso_ticket_url($ATT_ID, $registration_id)?>" target="_blank"  title="<?php _e('Download Ticket', 'event_espresso')?>">
									<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/icons/ticket-arrow-icon.png" width="16" height="16" alt="<?php _e('Download Ticket', 'event_espresso')?>" />
								</a>
							<?php endif; ?>
							<br/>
							<?php if ($org_options["use_attendee_pre_approval"]) { ?>
								<a href="admin.php?page=attendees&amp;attendee_pay=paynow&amp;form_action=payment&amp;registration_id=<?php echo $registration_id ?>&amp;event_admin_reports=enter_attendee_payments&amp;event_id=<?php echo $event_id ?>" title="<?php _e('Edit Payment', 'event_espresso'); ?> ID: <?php echo $registration_id ?>">
								<?php if ( is_attendee_approved( $attendee->require_pre_approval, $ATT_ID )) { ?>
									<strong><?php _e('Approved', 'event_espresso'); ?></strong><br/>
								<?php } else { ?>
									<span style="color:#FF0000"><strong><?php _e('Awaiting approval', 'event_espresso'); ?></strong></span>
								<?php } ?>
								</a>
							<?php } ?>
							
							</td>
						</tr>
						<?php
						$temp_reg_id = $registration_id;
						$registration_id = '';
					}
				}
				?>
			</tbody>
	  </table>
	  <div style="clear:both; margin-bottom:30px;">
			<input name="delete_customer" type="submit" class="button-secondary" id="delete_customer" value="<?php _e('Delete Attendee(s)', 'event_espresso'); ?>" style="margin:10px 0 0 0;" onclick="return confirmDelete();" />

			<?php
			do_action('action_hook_espresso_attendee_table_secondary_button');

			$_REQUEST['event_id'] = isset($_REQUEST['event_id']) && !empty($_REQUEST['event_id']) ? $_REQUEST['event_id'] : NULL;

			?>

			<a class="button-primary" style="margin:10px 0 0 20px;" href="#" onclick="window.location='<?php echo get_bloginfo('wpurl') . "/wp-admin/admin.php?event_espresso&amp;event_id=" . $_REQUEST['event_id'] . "&amp;export=report&action=payment&amp;type=excel";
			echo $_REQUEST['event_id'] == '' ? '&amp;all_events=true' : ''; ?>'" title="<?php _e('Export Payments to Excel', 'event_espresso'); ?>">
				 <?php _e('Export Payments to Excel', 'event_espresso'); ?>
			</a>

			<a class="button-primary" style="margin:10px 0 0 20px;" href="#" onclick="window.location='<?php echo get_bloginfo('wpurl') . "/wp-admin/admin.php?event_espresso&amp;export=report&action=attendees&amp;type=csv"; ?>'" title="<?php _e('Export All Attendee Data to CSV', 'event_espresso'); ?>"><?php _e('Export All Attendee Data to CSV', 'event_espresso'); ?></a>

			<?php echo isset($_REQUEST['event_id']) ? '<a style="margin:10px 0 0 20px;"  class="button-primary"  href="admin.php?page=attendees&amp;event_admin_reports=add_new_attendee&amp;event_id=' . $_REQUEST['event_id'] . '">' . __('Add Attendee', 'event_espresso') . '</a>' : ''; ?> <?php echo isset($_REQUEST['event_id']) ? '<a style="margin-left:5px" class="button-primary" href="admin.php?page=events&amp;action=edit&amp;event_id=' . $_REQUEST['event_id'] . '">' . __('Edit Event', 'event_espresso') . '</a>' : ''; ?>

		</div>
	</form>


	<h4 style="clear:both">
		<?php _e('Legend', 'event_espresso'); ?>
	</h4>
	<dl style="float:left; margin-left:10px; width:800px; height:80px;">
	  <dt style="float:left;width:200px;">
		<?php event_espresso_paid_status_icon('Completed') ?>
		-
		<?php _e('Completed', 'event_espresso'); ?>
	  </dt>
	  <dt style="float:left;width:200px;">
		<?php event_espresso_paid_status_icon('Incomplete') ?>
		-
		<?php _e('Incomplete', 'event_espresso'); ?>
	  </dt>
	  <dt style="float:left;width:200px;">
		<?php event_espresso_paid_status_icon('Pending') ?>
		-
		<?php _e('Pending', 'event_espresso'); ?>
	  </dt>
	  <dt style="float:left;width:200px;"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/icons/money.png" width="16" height="16" alt="<?php _e('Payment Details', 'event_espresso'); ?>" /> -
		<?php _e('Payment Details', 'event_espresso'); ?>
	  </dt>
	  <dt style="float:left;width:200px;"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/icons/email_link.png" width="16" height="16" alt="<?php _e('Resend Details', 'event_espresso'); ?>" /> -
		<?php _e('Resend Email', 'event_espresso'); ?>
	  </dt>
	  <dt style="float:left;width:200px;"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/icons/page_white_acrobat.png" width="16" height="16" alt="<?php _e('Download Invoice', 'event_espresso'); ?>" /> -
		<?php _e('Download Invoice', 'event_espresso'); ?>
	  </dt>
	  <dt style="float:left;width:200px;"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/icons/user_edit.png" width="16" height="16" alt="<?php _e(' Attendee Details', 'event_espresso'); ?>" /> -
		<?php _e('Attendee Details', 'event_espresso'); ?>
	  </dt>
	</dl>

	<?php
	/*	 * *************************** ADDED BY BRENT *********************** */

	if (empty($_REQUEST['action']) || $_REQUEST['action'] != 'edit') {
		include( EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/functions/csv_uploader.php' );
		$import_what = 'Attendees';
		$import_intro = 'If you have a previously exported list of Attendee Details in a Comma Separated Value (CSV) file format, you can upload the file here: ';
		$page = 'attendees';
		echo espresso_csv_uploader($import_what, $import_intro, $page);
	}

	/*	 * *************************** brent done adding *********************** */
	?>


	<script>
		jQuery(document).ready(function($) {
			/* show the table data */
			var mytable = $('#table').dataTable( {
				"sDom": 'Clfrtip',
				"bAutoWidth": false,
				"bStateSave": true,
				"sPaginationType": "full_numbers",
				"oLanguage": {	"sSearch": "<strong><?php _e('Live Search Filter', 'event_espresso'); ?>:</strong> (eg, email, txn id, event, etc.)",
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
										{ "bVisible": false, "aTargets": [
									<?php
										if (isset($_REQUEST['event_id'])) {
											echo '4,';
										} else {
											echo '2,';
										}
										echo $ticketing_installed == true ? '10,11' : '9,10';
									?> ] }
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
