<?php
if (!function_exists('event_espresso_shopping_cart')) {

	function event_espresso_shopping_cart() {
		global $wpdb, $org_options;
		if (!empty($org_options['full_logging']) && $org_options['full_logging'] == 'Y') {
			espresso_log::singleton()->log(array('file' => __FILE__, 'function' => __FUNCTION__, 'status' => ''));
		}
		//session_destroy();
		//echo "<pre>", print_r( $_SESSION ), "</pre>";
		$events_in_session = $_SESSION['events_in_session'];
		if (event_espresso_invoke_cart_error($events_in_session))
			return false;

		if (count($events_in_session) > 0) {
			foreach ($events_in_session as $event) {
				// echo $event['id'];
				if (is_numeric($event['id']))
					$events_IN[] = $event['id'];
			}

			$events_IN = implode(',', $events_IN);


			$sql = "SELECT e.* FROM " . EVENTS_DETAIL_TABLE . " e ";
			$sql .= " WHERE e.id in ($events_IN) ";
			$sql .= " AND e.event_status != 'D' ";
			$sql .= " ORDER BY e.start_date ";

			$result = $wpdb->get_results($sql);
			?>

			<form action='?page_id=<?php echo $org_options['event_page_id']; ?>&regevent_action=load_checkout_page' method='post' id="event_espresso_shopping_cart">

				<?php
				$counter = 1; //Counter that will keep track of the first events
				foreach ($result as $r):

					$num_attendees = get_number_of_attendees_reg_limit($r->id, 'num_attendees'); //Get the number of attendees
					$available_spaces = get_number_of_attendees_reg_limit($r->id, 'available_spaces'); //Gets a count of the available spaces
					$number_available_spaces = get_number_of_attendees_reg_limit($r->id, 'number_available_spaces'); //Gets the number of available spaces
					//echo "<pre>$r->id, $num_attendees,$available_spaces,$number_available_spaces</pre>";
					?>
					<div class="multi_reg_cart_block event-display-boxes ui-widget"  id ="multi_reg_cart_block-<?php echo $r->id ?>">

						<h3 class="event_title ui-widget-header ui-corner-top"><?php echo stripslashes_deep($r->event_name) ?> <span class="remove-cart-item"> <img class="ee_delete_item_from_cart" id="cart_link_<?php echo $r->id ?>" alt="Remove this item from your cart" src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/icons/remove.gif" /> </span> </h3>
						<div class="event-data-display ui-widget-content ui-corner-bottom">
							<table id="cart-reg-details" class="event-display-tables">
								<thead>
									<tr>
										<th><?php _e('Date', 'event_espresso'); ?></th>
										<th><?php _e('Time', 'event_espresso'); ?></th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td><?php echo event_date_display($r->start_date, get_option('date_format')) ?>
											<?php /* _e( ' to ', 'event_espresso' ); ?> <?php echo event_date_display( $r->end_date, get_option( 'date_format' ) ) */ ?></td>
										<td><?php echo event_espresso_time_dropdown($r->id, 0, 1, $_SESSION['events_in_session'][$r->id]['start_time_id']); ?></td>
									</tr>
									<tr>
										<td colspan="2"><?php echo event_espresso_group_price_dropdown($r->id, 0, 1, $_SESSION['events_in_session'][$r->id]['price_id']); ?></td>
									</tr>
							</table>
							<?php
							//Coupons
							if (function_exists('event_espresso_coupon_registration_page')) {
								// echo event_espresso_coupon_registration_page( $r->use_coupon_code, $r->id, 1 );
							}//End coupons display
							?>

							<input type="hidden" name="event_name[<?php echo $r->id; ?>]" value="<?php echo $r->event_name; ?>" />
						</div><!-- / .event-data-display -->
					</div><!-- / .event-display-boxes -->

					<?php
					$counter++;
				endforeach;
				?>
				<div class="event-display-boxes ui-widget">
					<div class="mer-event-submit ui-widget-content ui-corner-all">
						<input type="hidden" name="event_name[<?php echo $r->id; ?>]" value="<?php echo stripslashes_deep($r->event_name); ?>" />
						<input type="hidden" name="regevent_action" value="load_checkout_page" />

						<div id="event_espresso_coupon_wrapper" class="clearfix event-data-display">
							<label class="coupon-code" for="event_espresso_coupon_code">
								<?php _e('Enter Coupon Code ', 'event_espresso'); ?>
							</label>
							<input onkeydown="if(event.keyCode==13) {document.getElementById('event_espresso_refresh_total').focus(); return false;}" type="text" name="event_espresso_coupon_code" id ="event_espresso_coupon_code" value="<?php echo $_SESSION['event_espresso_coupon_code']; ?>"/>
						</div>

						<div id="event_espresso_total_wrapper" class="clearfix event-data-display">
							<a href="#" id="event_espresso_refresh_total"><?php _e('Refresh Total', 'event_espresso'); ?></a>
							<span class="event_total_price">
								<?php _e('Total (' . $org_options['currency_symbol'] . '): <span id="event_total_price">' . $_SESSION['event_espresso_grand_total'], 'event_espresso') . '</span>'; ?>
							</span>
						</div>

						<input type="submit" class="submit btn_event_form_submit ui-priority-primary ui-state-default ui-state-hover ui-state-focus ui-corner-all" name="Continue" id="event_espresso_continue_registration" value="<?php _e('Continue to registration page', 'event_espresso'); ?>" />
					</div><!-- / .mer-event-submit -->
				</div><!-- / .event-display-boxes -->
			</form>
			<?php
		}
	}

}
