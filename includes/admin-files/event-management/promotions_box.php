<div id="event-discounts" class="postbox closed">
	<div class="handlediv" title="Click to toggle"><br>
	</div>
	<h3 class="hndle"><span>
			<?php _e('Event Promotions', 'event_espresso'); ?>
		</span></h3>
	<div class="inside">

		<p><strong><?php _e('Early Registration Discount', 'event_espresso'); ?></strong></p>

		<p><label for="early_disc_date"><?php _e('End Date:', 'event_espresso'); ?></label><input type="text" class="datepicker" size="12" id="early_disc_date" name="early_disc_date" value="<?php echo isset($event->early_disc_date) ? $event->early_disc_date : ''; ?>"/> </p>

		<p class="promo-amnts">
			<label for="early_disc"><?php _e('Amount:', 'event_espresso'); ?></label><input type="text" size="3" id="early_disc" name="early_disc" value="<?php echo isset($event->early_disc) ? $event->early_disc : ''; ?>" /> <br /><span class="description"><?php _e('(Leave blank if not applicable)', 'event_espresso'); ?></span>
		</p>

		<p>
			<label><?php _e('Percentage:', 'event_espresso') ?></label>

			<?php echo select_input('early_disc_percentage', $values, !isset($event->early_disc_percentage) ? '' : $event->early_disc_percentage); ?>
		</p>

		<p><strong><?php _e('Promotion Codes', 'event_espresso'); ?></strong></p>
		<p class="disc-codes">
			<label><?php _e('Allow discount codes?', 'event_espresso'); ?> <?php echo apply_filters('espresso_help', 'coupon_code_info'); ?></label>
			<?php echo select_input('use_coupon_code', $values, !isset($event->use_coupon_code) || $event->use_coupon_code == '' ? 'N' : $event->use_coupon_code); ?>
		</p>

		<?php
		if (!empty($event_id)) {
			$sql = "SELECT * FROM " . EVENTS_DISCOUNT_CODES_TABLE;
			if (function_exists('espresso_member_data')) {
				$wpdb->get_results("SELECT wp_user FROM " . EVENTS_DETAIL_TABLE . " WHERE id = '" . $event_id . "'");
				$event->wp_user = $wpdb->last_result[0]->wp_user != '' ? $wpdb->last_result[0]->wp_user : espresso_member_data('id');
				$sql .= " WHERE ";
				if ($event->wp_user == 0 || $event->wp_user == 1) {
					$sql .= " (wp_user = '0' OR wp_user = '1') ";
				} else {
					$sql .= " wp_user = '" . $event->wp_user . "' ";
				}
			}
			$event_discounts = $wpdb->get_results($sql);
			if (!empty($event_discounts)) {
				foreach ($event_discounts as $event_discount) {
					$discount_id = $event_discount->id;
					$coupon_code = $event_discount->coupon_code;
					$discount_type_price = $event_discount->use_percentage == 'Y' ? $event_discount->coupon_code_price . '%' : $org_options['currency_symbol'] . $event_discount->coupon_code_price;

					$in_event_discounts = $wpdb->get_results("SELECT * FROM " . EVENTS_DISCOUNT_REL_TABLE . " WHERE event_id='" . $event_id . "' AND discount_id='" . $discount_id . "'");
					$in_event_discount = '';
					foreach ($in_event_discounts as $in_discount) {
						$in_event_discount = $in_discount->discount_id;
					}
					echo '<p class="event-disc-code" id="event-discount-' . $discount_id . '"><label for="in-event-discount-' . $discount_id . '" class="selectit"><input value="' . $discount_id . '" type="checkbox" name="event_discount[]" id="in-event-discount-' . $discount_id . '"' . ($in_event_discount == $discount_id ? ' checked="checked"' : "" ) . '/> ' . $coupon_code . "</label></p>";
				}
			}
		}
		echo '<p><a href="admin.php?page=discounts" target="_blank">' . __('Manage Promotional Codes ', 'event_espresso') . '</a></p>';
		?>
	</div>
</div>
<!-- /event-discounts -->