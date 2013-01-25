<?php

function enter_attendee_payments() {

	global $wpdb, $org_options;
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	$event_id = $_REQUEST['event_id'];
	$today = date("d-m-Y");

//Added by Imon
	$multi_reg = false;
	$registration_id = $_REQUEST['registration_id'];
	$registration_ids = array();
	$check = $wpdb->get_row("select * from " . EVENTS_MULTI_EVENT_REGISTRATION_ID_GROUP_TABLE . " where registration_id = '$registration_id' ");
	if ($check !== NULL) {
		$registration_id = $check->primary_registration_id;
		$registration_ids = $wpdb->get_results("select * from " . EVENTS_MULTI_EVENT_REGISTRATION_ID_GROUP_TABLE . " where primary_registration_id = '$registration_id' ", ARRAY_A);
		$multi_reg = true;
	}
	switch ($_REQUEST['form_action']) {
		//Add payment info
		case 'payment':
			if (isset($_REQUEST['attendee_action']) && $_REQUEST['attendee_action'] == 'post_payment') {
				//Added by Imon
				$primary_row = $wpdb->get_row("select id from " . EVENTS_ATTENDEE_TABLE . " where registration_id = '$registration_id' order by id limit 0,1 ");
				$primary_attendee_id = $primary_row->id; // GET the primary attendee id because amount paid info is kept with the primary attendee
				$payment_status = isset($_REQUEST['payment_status']) ? $_REQUEST['payment_status'] : '';
				$txn_type = isset($_REQUEST['txn_type']) ? $_REQUEST['txn_type'] : '';
				$txn_id = isset($_REQUEST['txn_id']) ? $_REQUEST['txn_id'] : '';
				//$quantity = isset($_REQUEST[ 'quantity' ]) ? $_REQUEST[ 'quantity' ]:'';
				$amount_pd = isset($_REQUEST['amount_pd']) ? $_REQUEST['amount_pd'] : '';
				$payment_date = isset($_REQUEST['payment_date']) ? $_REQUEST['payment_date'] : '';
				$coupon_code = isset($_REQUEST['coupon_code']) ? $_REQUEST['coupon_code'] : '';

				//Added/updated by Imon
				//Update payment status information for primary attendee
				$sql = "UPDATE " . EVENTS_ATTENDEE_TABLE . " SET payment_status = '$payment_status', txn_type = '$txn_type', txn_id = '$txn_id', amount_pd = '$amount_pd', payment_date ='$payment_date',  coupon_code ='$coupon_code' WHERE registration_id ='" . $registration_id . "' and id = $primary_attendee_id ";

				$wpdb->query($sql);

				if (count($registration_ids) > 0) {
					foreach ($registration_ids as $reg_id) {
						// Update payment status information for all attendees
						$sql = "UPDATE " . EVENTS_ATTENDEE_TABLE . " SET payment_status = '$payment_status', txn_type = '$txn_type', txn_id = '$txn_id', payment_date ='$payment_date', coupon_code ='$coupon_code' WHERE registration_id ='" . $reg_id['registration_id'] . "' ";
						$wpdb->query($sql);
					}
				} else {
					// Update payment status information for all attendees
					$sql = "UPDATE " . EVENTS_ATTENDEE_TABLE . " SET payment_status = '$payment_status', txn_type = '$txn_type', txn_id = '$txn_id', payment_date ='$payment_date', coupon_code ='$coupon_code' WHERE registration_id ='" . $registration_id . "' ";
					$wpdb->query($sql);
				}

				//Send Payment Recieved Email
				if ($_REQUEST['send_payment_rec'] == "send_message") {
					/*
					 * @todo Do we send an email to each attendee in a group or just the main?
					 */
					//event_espresso_send_payment_notification( $id );
//Added by Imon
					if (count($registration_ids) > 0) {
						foreach ($registration_ids as $reg_id) {
							event_espresso_send_payment_notification(array('registration_id' => $reg_id['registration_id']));
						}
					} else {
						event_espresso_send_payment_notification(array('registration_id' => $registration_id));
					}
				}
			}
			break;

		//Send Invoice
		case 'send_invoice':
			$_REQUEST['invoice_message'] = isset($_REQUEST['invoice_message']) && !empty($_REQUEST['invoice_message']) ? $_REQUEST['invoice_message'] : NULL;
			//Added by Imon
			if ($org_options["use_attendee_pre_approval"]) {
				$pre_approve = $_REQUEST['pre_approve'];
				if (count($registration_ids) > 0) {
					foreach ($registration_ids as $reg_id) {
						$sql = "UPDATE " . EVENTS_ATTENDEE_TABLE . " SET pre_approve = '$pre_approve' WHERE registration_id ='" . $reg_id['registration_id'] . "'";
						$wpdb->query($sql);
					}
				} else {
					$sql = "UPDATE " . EVENTS_ATTENDEE_TABLE . " SET pre_approve = '$pre_approve' WHERE registration_id ='" . $registration_id . "'";
					$wpdb->query($sql);
				}
			} else {
				$pre_approve = 0;
			}
			if ($pre_approve == "0") {

				if (count($registration_ids) > 0) {
					foreach ($registration_ids as $reg_id) {
						event_espresso_send_invoice($reg_id['registration_id'], $_REQUEST['invoice_subject'], $_REQUEST['invoice_message']);
					}
				} else {
					event_espresso_send_invoice($registration_id, $_REQUEST['invoice_subject'], $_REQUEST['invoice_message']);
				}
				echo '<div id="message" class="updated fade"><p><strong>' . __('Invoice Sent', 'event_espresso') . '</strong></p></div>';
			}
			break;
	}

	//Show the forms.
	// $id = $registration_id ;
	$attendees = $wpdb->get_results($wpdb->prepare("SELECT * FROM " . EVENTS_ATTENDEE_TABLE . " WHERE registration_id ='%s' ORDER BY ID LIMIT 1", $registration_id));
	foreach ($attendees as $attendee) {
		$id = $attendee->id;
		//$registration_id = $attendee->registration_id;//Removed by Imon
		$lname = $attendee->lname;
		$fname = $attendee->fname;
		$address = $attendee->address;
		$city = $attendee->city;
		$state = $attendee->state;
		$zip = $attendee->zip;
		$email = $attendee->email;
		$phone = $attendee->phone;
		$date = $attendee->date;
		$payment_status = $attendee->payment_status;
		$txn_type = $attendee->txn_type;
		$txn_id = $attendee->txn_id;
		$amount_pd = $attendee->amount_pd;
		$quantity = $attendee->quantity;
		$payment_date = $attendee->payment_date;
		$event_id = $attendee->event_id;
		$coupon_code = $attendee->coupon_code;
		$pre_approve = $attendee->pre_approve;
		$start_date = $attendee->start_date;
		$event_time = $attendee->event_time;

		if (!empty($attendee->transaction_details)) {
			$transaction_details = unserialize($attendee->transaction_details);
			//Debug
			//echo "<pre>".print_r($transaction_details,true)."</pre>";
		}
	}

	$events = $wpdb->get_results($wpdb->prepare("SELECT * FROM " . EVENTS_DETAIL_TABLE . " WHERE id='%d'", $event_id));
	foreach ($events as $event) {
		$event_id = $event->id;
		$event_name = $event->event_name;
		$event_desc = $event->event_desc;
		$event_description = $event->event_desc;
		$event_identifier = $event->event_identifier;
		$cost = isset($event->event_cost) ? $event->event_cost : 0;
		$active = $event->is_active;
		$require_pre_approval = $event->require_pre_approval;
	}
	$event_date = event_date_display($start_date . ' ' . $event_time, get_option('date_format') . ' g:i a');
	$total_paid = espresso_attendee_price(array('registration_id' => $_REQUEST['registration_id'], 'session_total' => true));

	if (isset($_REQUEST['status']) && $_REQUEST['status'] == 'saved') {
		?>

		<div id="message" class="updated fade">
			<p><strong>
					<?php _e('Payment details saved for', 'event_espresso'); ?>
					<?php echo $fname ?> <?php echo $lname ?>.
					<?php if (isset($_REQUEST['send_payment_rec']) && $_REQUEST['send_payment_rec'] == "send_message") { ?>
						<?php _e('Payment notification has been sent.', 'event_espresso'); ?>
					<?php } ?>
				</strong></p>
		</div>
		<?php
	}
	?>
	<div class="metabox-holder">
		<div class="postbox">
			<?php
			if (!$multi_reg) {
				?>
				<h3>
					<?php _e('Name:', 'event_espresso'); ?>
					<?php echo $fname ?> <?php echo $lname ?> |
					<?php _e('ID:', 'event_espresso'); ?>
					<?php echo $id ?> |
					<?php _e('Registered For:', 'event_espresso'); ?>
					<a href="admin.php?page=attendees&event_admin_reports=list_attendee_payments&event_id=<?php echo $event_id ?>"><?php echo stripslashes_deep($event_name) ?></a> - <?php echo $event_date; ?></h3>
				<?php
			} else {
				?>
				<h3> <?php echo __('Multiple Registration Payment for ', 'event_espresso'); ?> <a href="admin.php?page=attendees&event_admin_reports=list_attendee_payments&event_id=<?php echo $event_id ?>"><?php echo stripslashes_deep($event_name) ?></a> - <?php echo $event_date; ?> </h3>
				<?php
			}
			?>
			<div class="inside">
				<table width="100%" border="0">
					<tr>
						<td><strong>
								<?php _e('Payment Details', 'event_espresso'); ?>
							</strong></td>
						<td><strong>
								<?php _e('Invoice/Payment Reminder', 'event_espresso'); ?>
							</strong></td>
					</tr>
					<tr>
						<td valign="top"><?php
								if (count($registration_ids) > 0) {
									echo '<p><strong>' . __('Registration Ids:', 'event_espresso') . '</strong></p>';
									echo '<ul>';
									foreach ($registration_ids as $reg_id) {
										//TODO:Display cost per registration id. At the moment it is not possible to display price per registration id because discount is calculated for total amount [IMON]
										echo '<li># ' . $reg_id['registration_id'] . ' [ <a href="admin.php?page=attendees&event_admin_reports=edit_attendee_record&event_id=' . $event_id . '&registration_id=' . $reg_id['registration_id'] . '&form_action=edit_attendee">' . __('View/Edit Registration', 'event_espresso') . '</a> ]</li>';
									}
								} else {
									echo '<p><strong>' . __('Registration Id:', 'event_espresso') . '</strong></p>';
									//TODO:Display cost per registration id. At the moment it is not possible to display price per registration id because discount is calculated for total amount [IMON]
									echo '<p># ' . $registration_id . ' [ <a href="admin.php?page=attendees&event_admin_reports=edit_attendee_record&event_id=' . $event_id . '&registration_id=' . $registration_id . '&form_action=edit_attendee">' . __('View/Edit Registration', 'event_espresso') . '</a> ]</p>';
								}
								echo '</ul><hr style="width:90%; margin:20px 0;" align="left" />';
								?>
							<form method="POST" action="<?php echo $_SERVER['REQUEST_URI'] ?>&status=saved" class="espresso_form">
								<fieldset>
									<ul>
										<li>
											<label for="payment_status">
												<?php _e('Payment Status:', 'event_espresso'); ?>
											</label>
											<?php
											$values = array(
													array('id' => '', 'text' => __('None', 'event_espresso')),
													array('id' => 'Completed', 'text' => __('Completed', 'event_espresso')),
													array('id' => 'Pending', 'text' => __('Pending', 'event_espresso')),
													array('id' => 'Payment Declined', 'text' => __('Payment Declined', 'event_espresso')),
													array('id' => 'Incomplete', 'text' => __('Incomplete', 'event_espresso')));
											echo select_input('payment_status', $values, $payment_status);
											?> [<a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=transaction_data"><?php _e('Transaction Details', 'event_espresso'); ?></a> ]
										</li>
										<li>
											<label for="txn_type">
												<?php _e('Transaction Type:', 'event_espresso'); ?>
											</label>
											<?php
											$txn_values = array(
													array('id' => '', 'text' => __('N/A', 'event_espresso')),
													array('id' => 'web_accept', 'text' => espresso_payment_type('web_accept')),
													array('id' => 'CC', 'text' => __('Credit Card', 'event_espresso')),
													array('id' => 'INV', 'text' => espresso_payment_type('INV')),
													array('id' => 'OFFLINE', 'text' => espresso_payment_type('OFFLINE')),
											);
											echo select_input('txn_type', $txn_values, $txn_type);
											?>
										</li>
										<li>
											<label>
												<?php _e('Transaction ID:', 'event_espresso'); ?>
											</label>
											<input type="text" name="txn_id" size="45" value ="<?php echo $txn_id; ?>" />
										</li>
										<li>
											<label>
												<?php _e('Amount:', 'event_espresso'); ?>
											</label>
											<?php
											//TODO:Need to check this after pricing module is done [IMON]
											echo $org_options['currency_symbol']
											?>
											<input style="width:100px;" readonly="true" type="text" name="amount_pd" size="20" value ="<?php echo $total_paid; ?>" />
											<?php echo ' [ <a href="admin.php?page=attendees&event_admin_reports=edit_attendee_record&event_id=' . $event_id . '&registration_id=' . $registration_id . '&form_action=edit_attendee&show_payment=true">' . __('Edit Payment', 'event_espresso') . '</a> ] '; ?> </li>
										<li>
											<label>
												<?php _e('Coupon Code:', 'event_espresso'); ?>
											</label>
											<input type="text" name="coupon_code" size="45" value ="<?php echo $coupon_code; ?>" />
										</li>
										<?php /* ?><li>
										  <label>
										  <?php _e( 'How Many People:', 'event_espresso' ); ?>
										  </label>
										  <input type="text" name="quantity" size="45" value ="<?php echo espresso_count_attendees_for_registration($id); ?>" />
										  </li><?php */ ?>
										<li>
											<label>
												<?php _e('Date Paid:', 'event_espresso'); ?>
											</label>
											<input type="text" class="datepicker" name="payment_date" size="45" value ="<?php echo!empty($payment_date) ? event_date_display($payment_date) : event_date_display($today) ?>" />
										</li>
										<li>
											<label>
												<?php _e('Do you want to send a payment recieved notice to registrant?', 'event_espresso'); ?>
											</label>
											<input type="radio" name="send_payment_rec" value="true">
											<?php _e('Yes', 'event_espresso'); ?>
											<input type="radio" name="send_payment_rec" checked value="false">
											<?php _e('No', 'event_espresso'); ?>
										</li>
										<input type="hidden" name="id" value="<?php echo $id ?>">
										<input type="hidden" name="registration_id" value="<?php echo $registration_id ?>">
										<input type="hidden" name="form_action" value="payment">
										<input type="hidden" name="attendee_pay" value="paynow">
										<input type="hidden" name="event_id" value="<?php echo $event_id ?>">
										<input type="hidden" name="attendee_action" value="post_payment">
										<li>
											<input type="submit" name="Submit" class="action button-primary" value="Update Payment">
										</li>
									</ul>
								</fieldset>
							</form></td>
						<td valign="top"><form method='post' class="espresso_form" action="<?php echo $_SERVER['REQUEST_URI'] ?>&status=invoiced">
								<input type="hidden" name="id" value="<?php echo $id ?>">
								<input type="hidden" name="form_action" value="send_invoice">
								<input type="hidden" name="event_id" value="<?php echo $event_id ?>">
								<ul>
									<li>
										<?php _e('Use a ', 'event_espresso'); ?>
										<a href="admin.php?page=event_emails" target="_blank">
											<?php _e('pre-existing email', 'event_espresso'); ?>
										</a>? <?php echo espresso_db_dropdown('id', 'email_name', EVENTS_EMAIL_TABLE, 'email_name', '', 'desc') . ' ' . do_action('action_hook_espresso_help', 'email_manager_info'); ?> </li>
									<li>
										<?php _e('OR', 'event_espresso'); ?>
									</li>
									<li>
										<?php _e('Create a custom email:', 'event_espresso'); ?>
									</li>
									<li>
										<?php _e('Invoice Subject', 'event_espresso'); ?>
										:
										<input type="text" name="invoice_subject" size="45" value="<?php _e('Payment Reminder for [event]', 'event_espresso'); ?>" />
									</li>
									<li>
										<p>
											<?php _e('Message:', 'event_espresso'); ?>
										</p>
										<div class="postbox">
											<?php
											$email_content = __('Dear [fname] [lname], <p>Our records show that we have not received your payment of [cost] for [event_link].</p> <p>Please visit [payment_url] to view your payment options.</p><p>[invoice_link]</p><p>Sincerely,<br />' . $Organization = $org_options['organization'] . '</p>', 'event_espresso');
											if (function_exists('wp_editor')) {
												$args = array("textarea_rows" => 5, "textarea_name" => "invoice_message", "editor_class" => "my_editor_custom");
												wp_editor(espresso_admin_format_content($email_content), "invoice_message", $args);
											} else {
												echo '<textarea name="invoice_message" class="theEditor" id="invoice_message">' . espresso_admin_format_content($email_content) . '</textarea>';
												espresso_tiny_mce();
											}
											?>
											<table id="email-confirmation-form" cellspacing="0">
												<tbody>
													<tr>
														<td class="aer-word-count"></td>
														<td class="autosave-info"><span>&nbsp;</span></td>
													</tr>
												</tbody>
											</table>
											<p><a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=custom_email_info">
													<?php _e('View Custom Email Tags', 'event_espresso'); ?>
												</a> | <a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=custom_email_example">
													<?php _e('Email Example', 'event_espresso'); ?>
												</a></p>
										</div>
									</li>
									<?php
									if ($org_options["use_attendee_pre_approval"]) {
										//$pre_approve = is_attendee_approved($event_id, $id) == true ? 1 : 0;
										$pre_approve = is_attendee_approved($require_pre_approval, $id) == true ? 1 : 0;
										?>
										<li>
											<?php _e("Attendee approved?", "event_espresso"); ?>
											:
											<?php
											$pre_approval_values = array(array('id' => '0', 'text' => __('Yes', 'event_espresso')), array('id' => '1', 'text' => __('No', 'event_espresso')));
											echo select_input("pre_approve", $pre_approval_values, $pre_approve);
											?>
											<br />
											<?php _e("(If not approved then invoice will not be sent.)", "event_espresso"); ?>
										</li>
									<?php } ?>
									<li>
										<input type="submit" class="button-primary action" name="Submit" value="Send Invoice">
									</li>
								</ul>
							</form></td>
					</tr>
				</table>
				<p> <strong> <a href="admin.php?page=attendees&event_id=<?php echo $event_id; ?>&event_admin_reports=list_attendee_payments"> &lt;&lt;
							<?php _e('Back to List', 'event_espresso'); ?>
						</a> </strong> </p>
			</div>
		</div>
		<div id="email_manager_info" style="display:none">
			<h2>
				<?php _e('Pre-existing Emails', 'event_espresso'); ?>
			</h2>
			<p>
				<?php _e('This will override the custom email below if selected.', 'event_espresso'); ?>
			</p>
		</div>
		<div id="transaction_data" class="pop-help" style="display:none">
			<div class="TB-ee-frame">
				<h2><?php _e('Transaction Details', 'event_espresso'); ?></h2>
				<?php
				if (!empty($transaction_details) && ( is_array($transaction_details) || is_object($transaction_details) )) {
					echo '<ul>';
					foreach ($transaction_details as $k => $v) {
						echo '<li><strong>' . $k . '</strong> = ' . $v . '</li>';
					}
					echo '</ul>';
				} else {
					_e('No transaction detials available at this time.', 'event_espresso');
				}
				?>
			</div>
		</div>
		<script type="text/javascript" charset="utf-8">
			//<![CDATA[
			jQuery(document).ready(function() {

				jQuery(".datepicker" ).datepicker({
					changeMonth: true,
					changeYear: true,
					dateFormat: "yy-mm-dd",
					showButtonPanel: true
				});

			});

			//]]>
		</script>

	<?php
	//This show what tags can be added to a custom email.
	echo event_espresso_custom_email_info();
}
