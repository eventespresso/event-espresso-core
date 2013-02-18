<?php
/* WARNING MODIFYING THIS AT YOUR OWN RISK  */
/* Payments template page. Currently this just shows the registration data block. */

//This page gets all of the varaibles from includes/process-registration/payment_page.php
//Payment confirmation block
function espresso_display_confirmation_page($conf_page_data) {
	global $org_options, $wpdb;
	add_filter('filter_hook_espresso_get_total_cost', 'espresso_get_total_cost');
	$conf_page_data = apply_filters('filter_hook_espresso_get_total_cost', $conf_page_data);
	$attendee_num = 1;
	?>
	<form id="form1" name="form1" method="post" action="<?php echo espresso_get_reg_page_full_url(); ?>">
		<div class="event-conf-block event-display-boxes ui-widget" >
			<h2 class="event_title ui-widget-header ui-corner-top">
				<?php _e('Please verify your registration details:', 'event_espresso'); ?>
			</h2>
			<div class="event-data-display ui-widget-content ui-corner-bottom">
				<table class="event-display-tables grid"  id="event_espresso_attendee_verify">

					<tr>
						<th scope="row" class="header">
							<?php _e('Event Name:', 'event_espresso'); ?>
						</th>
						<td><span class="event_espresso_value"><?php echo stripslashes_deep($conf_page_data['event_name']) ?></span></td>
					</tr>
						<tr>
							<th scope="row" class="header">
								<?php _e('Price per attendee:', 'event_espresso'); ?>
							</th>
							<td><span class="event_espresso_value"><?php echo $org_options['currency_symbol'] . $conf_page_data['tickets'][0]['cost']; ?></span></td>
						</tr>
					<tr>
						<th scope="row" class="header">
							<?php _e('Attendee Name:', 'event_espresso'); ?>
						</th>
						<td  valign="top">
							<span class="event_espresso_value"><?php echo stripslashes_deep($conf_page_data['attendee_name']) ?> (<?php echo $conf_page_data['attendee_email'] ?>) <?php echo '<a href="' . home_url() . '/?page_id=' . $conf_page_data['event_page_id'] . '&amp;registration_id=' . $conf_page_data['registration_id'] . '&amp;id=' . $conf_page_data['attendee_id'] . '&amp;e_reg=register&amp;form_action=edit_attendee&amp;primary=' . $conf_page_data['attendee_id'] . '&amp;p_id=' . $conf_page_data['p_id'] . '&amp;event_id=' . $conf_page_data['event_id'] . '&amp;coupon_code=' . $conf_page_data['coupon_code'] . '&amp;groupon_code=' . $conf_page_data['groupon_code'] . '&amp;attendee_num=' . $attendee_num . '">' . __('Edit', 'event_espresso') . '</a>'; ?>
								<?php
								//Create additional attendees
								$sql = "SELECT * FROM " . EVENTS_ATTENDEE_TABLE;
								$sql .= " WHERE registration_id = '" . espresso_registration_id($conf_page_data['attendee_id']) . "' AND id != '" . $conf_page_data['attendee_id'] . "' ";
								//echo $sql;
								$x_attendees = $wpdb->get_results($sql, ARRAY_A);
								if ($wpdb->num_rows > 0) {
									foreach ($x_attendees as $x_attendee) {
										$attendee_num++;
										//echo $attendee_num;
										//print_r($x_attendees);
										echo "<br/>" . $x_attendee['fname'] . " " . $x_attendee['lname'] . " ";
										if ($x_attendee['email'] != '') {
											echo "(" . $x_attendee['email'] . ") ";
										}

										//Create edit link
										echo '<a href="' . home_url() . '/?page_id=' . $conf_page_data['event_page_id'] . '&amp;registration_id=' . $conf_page_data['registration_id'] . '&amp;id=' . $x_attendee['id'] . '&amp;e_reg=register&amp;form_action=edit_attendee&amp;primary=' . $conf_page_data['attendee_id'] . '&amp;p_id=' . $conf_page_data['p_id'] . '&amp;coupon_code=' . $conf_page_data['coupon_code'] . '&amp;groupon_code=' . $conf_page_data['groupon_code'] . '&amp;attendee_num=' . $attendee_num . '">' . __('Edit', 'event_espresso') . '</a>';
										//Create delete link
										echo ' | <a href="' . home_url() . '/?page_id=' . $conf_page_data['event_page_id'] . '&amp;registration_id=' . $conf_page_data['registration_id'] . '&amp;id=' . $x_attendee['id'] . '&amp;e_reg=register&amp;form_action=edit_attendee&amp;primary=' . $conf_page_data['attendee_id'] . '&amp;delete_attendee=true&amp;p_id=' . $conf_page_data['p_id'] . '&amp;coupon_code=' . $conf_page_data['coupon_code'] . '&amp;groupon_code=' . $conf_page_data['groupon_code'] . '">' . __('Delete', 'event_espresso') . '</a>';
									}
								}
								?>
							</span>
						</td>
					</tr>
					<?php if ($conf_page_data['quantity'] > 1) { ?>
						<tr>
							<th scope="row" class="header">
								<?php _e('Total Registrants:', 'event_espresso'); ?>
							</th>
							<td><span class="event_espresso_value"><?php echo $conf_page_data['quantity']; ?></span></td>
						</tr>
					<?php } ?>
					<tr valign="top">
						<th scope="row" class="header">
							<?php _e('Total Price:', 'event_espresso'); ?>
							</td>
						<td><span class="event_espresso_value"><?php echo $org_options['currency_symbol'] ?><?php echo $conf_page_data['total_cost'];
						if (!empty($conf_page_data['discount_applied'])) {
							echo ' (' . __('Discount of ', 'event_espresso') . $org_options['currency_symbol'] . number_format($conf_page_data['discount_applied'], 2, ".", ",") . __(' applied', 'event_espresso') . ')';
						}
							?></span></td>
					</tr>

				</table>
			</div>

			<p class="espresso_confirm_registration"><input class="btn_event_form_submit ui-priority-primary ui-state-default ui-corner-all" type="submit" name="confirm" id="confirm" value="<?php _e('Confirm Registration', 'event_espresso'); ?>" /></p>


	<?php if ($conf_page_data['display_questions'] != '') { ?>
				<h2 class="event_title ui-widget-header ui-corner-top"><?php _e('Additional Information for:', 'event_espresso'); ?> <?php echo stripslashes_deep($conf_page_data['attendee_name']) ?></h2>
				<div id="additional-conf-info" class="event-data-display ui-widget-content ui-corner-bottom">


					<table id="event_espresso_attendee_verify_questions" class="event-display-tables grid">

		<?php foreach ($conf_page_data['questions'] as $question) { ?>
							<tr>
								<th scope="row" class="header"><?php echo $question->question ?></th><td><?php echo $question->answer ?></td>
							</tr>
		<?php } ?>

					</table>

				</div><!-- / .event-data-display -->
			</div><!-- / .event-display-boxes -->
			<p class="espresso_confirm_registration"><input class="btn_event_form_submit ui-priority-primary ui-state-default ui-corner-all" type="submit" name="confirm2" id="confirm2" value="<?php _e('Confirm Registration', 'event_espresso'); ?>" /></p>
			<?php
		}
		?>

	<?php /* This form builds the confirmation buttons */ ?>


		<input name="confirm_registration" id="confirm_registration" type="hidden" value="true" />
		<input type="hidden" name="attendee_id" id="attendee_id" value="<?php echo $conf_page_data['attendee_id'] ?>" />
		<input type="hidden" name="registration_id" id="registration_id" value="<?php echo $conf_page_data['registration_id'] ?>" />
		<!--<input type="hidden" name="e_reg" id="e_reg-<?php echo $conf_page_data['event_id']; ?>" value="post_attendee">-->
		<input type="hidden" name="event_id" id="event_id-<?php echo $conf_page_data['event_id']; ?>" value="<?php echo $conf_page_data['event_id']; ?>">
	</form>
	<?php
}

add_action('action_hook_espresso_display_confirmation_page', 'espresso_display_confirmation_page');