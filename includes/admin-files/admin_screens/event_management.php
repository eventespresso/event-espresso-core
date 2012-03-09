<?php

function espresso_register_premium_event_editor_meta_boxes() {
	global $org_options;
	add_meta_box('espresso_event_editor_event_options', __('Event Options', 'event_espresso'), 'espresso_event_editor_event_options_meta_box', 'toplevel_page_events', 'side', 'high');
	add_meta_box('espresso_event_editor_additional_questions', __('Questions for Additional Attendees', 'event_espresso'), 'espresso_event_editor_additional_attendees_question_groups_meta_box', 'toplevel_page_events', 'side', 'default');
	add_meta_box('espresso_event_editor_promo_box', __('Event Promotions', 'event_espresso'), 'espresso_event_editor_promotions_meta_box', 'toplevel_page_events', 'side', 'default');
	add_meta_box('espresso_event_editor_featured_image_box', __('Featured Image', 'event_espresso'), 'espresso_featured_image_meta_box', 'toplevel_page_events', 'side', 'default');
	if ($org_options['use_attendee_pre_approval']) {
		add_meta_box('espresso_event_editor_preapproval_box', __('Attendee Pre-Approval', 'event_espresso'), 'espresso_featured_image_meta_box', 'toplevel_page_events', 'side', 'default');
	}
}

add_action('current_screen', 'espresso_register_premium_event_editor_meta_boxes');

function espresso_event_editor_event_options_meta_box($event) {
	$values = array(
			array('id' => true, 'text' => __('Yes', 'event_espresso')),
			array('id' => false, 'text' => __('No', 'event_espresso'))
	);
	$additional_attendee_reg_info_values = array(
			array('id' => '1', 'text' => __('No info required', 'event_espresso')),
			array('id' => '2', 'text' => __('Personal Information only', 'event_espresso')),
			array('id' => '3', 'text' => __('Full registration information', 'event_espresso'))
	);
	$event_status_values = array(
			array('id' => 'A', 'text' => __('Public', 'event_espresso')),
			array('id' => 'S', 'text' => __('Waitlist', 'event_espresso')),
			array('id' => 'O', 'text' => __('Ongoing', 'event_espresso')),
			array('id' => 'R', 'text' => __('Draft', 'event_espresso')),
			array('id' => 'D', 'text' => __('Deleted', 'event_espresso'))
	);
	$event_status_values = apply_filters('filter_hook_espresso_event_status_values', $event_status_values);

	$default_payment_status_values = array(
			array('id' => "", 'text' => 'No Change'),
			array('id' => 'Incomplete', 'text' => 'Incomplete'),
			array('id' => 'Pending', 'text' => 'Pending'),
			array('id' => 'Completed', 'text' => 'Completed')
	);
	?>
	<p class="inputundersmall">
		<label for="reg-limit">
			<?php _e('Attendee Limit: ', 'event_espresso'); ?>
		</label>
		<input id="reg-limit" name="reg_limit"  size="10" type="text" value="<?php echo $event->reg_limit; ?>" /><br />
		<span>(<?php _e('leave blank for unlimited', 'event_espresso'); ?>)</span>
	</p>
	<p class="clearfix" style="clear: both;">
		<label for="group-reg"><?php _e('Allow group registrations? ', 'event_espresso'); ?></label>
		<?php echo select_input('allow_multiple', $values, $event->allow_multiple, 'id="group-reg"', '', false); ?>
	</p>
	<p class="inputundersmall">
		<label for="max-registrants"><?php _e('Max Group Registrants: ', 'event_espresso'); ?></label>
		<input type="text" id="max-registrants" name="additional_limit" value="<?php echo $event->additional_limit; ?>" size="4" />
	</p>
	<p class="inputunder">
		<label><?php _e('Additional Attendee Registration info?', 'event_espresso'); ?></label>
		<?php echo select_input('additional_attendee_reg_info', $additional_attendee_reg_info_values, $event->event_meta['additional_attendee_reg_info']); ?>
	</p>
	<p>
		<label><?php _e('Event is Active', 'event_espresso'); ?></label>
		<?php echo select_input('is_active', $values, $event->is_active); ?>
	</p>
	<p>
		<label><?php _e('Event Status', 'event_espresso'); ?>
			<a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=status_types_info">
				<span class="question">[?]</span>
			</a>
		</label>
		<?php echo select_input('event_status', $event_status_values, $event->event_status, '', '', false); ?>
	</p>
	<p>
		<label><?php _e('Display  Description', 'event_espresso'); ?></label>
		<?php echo select_input('display_desc', $values, $event->display_desc); ?>
	</p>
	<p>
		<label>
			<?php _e('Display  Registration Form', 'event_espresso'); ?>
		</label>
		<?php echo select_input('display_reg_form', $values, $event->display_reg_form, '', '', false); ?>
	</p>
	<p class="inputunder">
		<label>
			<?php _e('Default Payment Status', 'event_espresso'); ?>
			<a class="thickbox" href="#TB_inline?height=300&amp;width=400&amp;inlineId=payment_status_info">
				<span class="question">[?]</span>
			</a>
		</label>
		<?php echo select_input('default_payment_status', $default_payment_status_values, $event->event_meta['default_payment_status']); ?>
	</p>
	<p class="inputunder">
		<label><?php _e('Alternate Registration Page', 'event_espresso'); ?>
			<a class="thickbox" href="#TB_inline?height=300&amp;width=400&amp;inlineId=external_URL_info">
				<span class="question">[?]</span>
			</a>
		</label>
		<input name="externalURL" size="20" type="text" value="<?php echo $event->externalURL; ?>">
	</p>
	<p class="inputunder">
		<label><?php _e('Alternate Email Address', 'event_espresso'); ?>
			<a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=alt_email_info">
				<span class="question">[?]</span>
			</a>
		</label>
		<input name="alt_email" size="20" type="text" value="<?php echo $event->alt_email; ?>">
	</p>
	<?php
}

function espresso_event_editor_additional_attendees_question_groups_meta_box($event) {
	$add_attendee_question_groups = $event->event_meta['add_attendee_question_groups'];
	$event_id = $event->id;
	?>
	<div class="inside">
		<p><strong>
				<?php _e('Question Groups', 'event_espresso'); ?>
			</strong><br />
			<?php _e('Add a pre-populated', 'event_espresso'); ?>
			<a href="admin.php?page=form_groups" target="_blank">
				<?php _e('group', 'event_espresso'); ?>
			</a>
			<?php _e('of', 'event_espresso'); ?>
			<a href="admin.php?page=form_builder" target="_blank">
				<?php _e('questions', 'event_espresso'); ?>
			</a>
			<?php _e('to your event. The personal information group is required for all events.', 'event_espresso'); ?>
		</p>
		<?php
		if ($event->num_rows > 0) {
			reset($event->q_groups);
			$html = '';
			foreach ($event->q_groups as $question_group) {
				$question_group_id = $question_group->id;
				$question_group_description = $question_group->group_description;
				$group_name = $question_group->group_name;
				$checked = (is_array($add_attendee_question_groups) && array_key_exists($question_group_id, $add_attendee_question_groups)) || ($question_group->system_group == 1) ? ' checked="checked" ' : '';

				$visibility = $question_group->system_group == 1 ? 'style="visibility:hidden"' : '';

				$html .= '<p id="event-question-group-' . $question_group_id . '"><input value="' . $question_group_id . '" type="checkbox" ' . $visibility . ' name="add_attendee_question_groups[' . $question_group_id . ']" ' . $checked . ' /> <a href="admin.php?page=form_groups&amp;action=edit_group&amp;group_id=' . $question_group_id . '" title="edit" target="_blank">' . $group_name . "</a></p>";
			}
			if ($event->num_rows > 10) {
				$top_div = '<div style="height:250px;overflow:auto;">';
				$bottom_div = '</div>';
			} else {
				$top_div = '';
				$bottom_div = '';
			}
			$html = $top_div . $html . $bottom_div;
			echo $html;
		} else {
			echo __('There seems to be a problem with your questions. Please contact support@eventespresso.com', 'event_espresso');
		}
		?>
	</div>
	<?php
}

function espresso_event_editor_promotions_meta_box($event) {
	$values = array(
			array('id' => true, 'text' => __('Yes', 'event_espresso')),
			array('id' => false, 'text' => __('No', 'event_espresso'))
	);
	global $wpdb, $org_options;
	?>
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
			<label><?php _e('Allow discount codes?', 'event_espresso'); ?> <?php echo apply_filters('filter_hook_espresso_help', 'coupon_code_info'); ?></label>
			<?php echo select_input('use_coupon_code', $values, !isset($event->use_coupon_code) || $event->use_coupon_code == '' ? 'N' : $event->use_coupon_code); ?>
		</p>

		<?php
		$sql = "SELECT * FROM " . EVENTS_DISCOUNT_CODES_TABLE;
		if (function_exists('espresso_member_data') && !empty($event_id)) {
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

				$in_event_discounts = !empty($event_id) ? $wpdb->get_results("SELECT * FROM " . EVENTS_DISCOUNT_REL_TABLE . " WHERE event_id='" . $event_id . "' AND discount_id='" . $discount_id . "'") : array();
				$in_event_discount = '';
				foreach ($in_event_discounts as $in_discount) {
					$in_event_discount = $in_discount->discount_id;
				}
				echo '<p class="event-disc-code" id="event-discount-' . $discount_id . '"><label for="in-event-discount-' . $discount_id . '" class="selectit"><input value="' . $discount_id . '" type="checkbox" name="event_discount[]" id="in-event-discount-' . $discount_id . '"' . ($in_event_discount == $discount_id ? ' checked="checked"' : "" ) . '/> ' . $coupon_code . "</label></p>";
			}
		}

		echo '<p><a href="admin.php?page=discounts" target="_blank">' . __('Manage Promotional Codes ', 'event_espresso') . '</a></p>';
		?>
	</div>
	<?php
}

function espresso_featured_image_meta_box($event) {
	$event_meta = $event->event_meta;
	$values = array(
			array('id' => true, 'text' => __('Yes', 'event_espresso')),
			array('id' => false, 'text' => __('No', 'event_espresso')));
	?>
	<div class="inside">
		<div id="featured-image">
			<?php
			if (!empty($event_meta['event_thumbnail_url'])) {
				$event_thumb = $event_meta['event_thumbnail_url'];
			} else {
				$event_thumb = '';
			}
			?>
			<?php // var_dump($event_meta['event_thumbnail_url']);   ?>
			<label for="upload_image">
				<?php _e('Add Featured Image', 'event_espresso'); ?>
			</label>
			<input id="upload_image" type="hidden" size="36" name="upload_image" value="<?php echo $event_thumb ?>" />
			<input id="upload_image_button" type="button" value="Upload Image" />
			<?php if ($event_thumb) { ?>
				<p class="event-featured-thumb"><img  src="<?php echo $event_thumb ?>" alt="" /></p>
				<a id='remove-image' href='#' title='Remove this image' onclick='return false;'>Remove Image</a>
			<?php } ?>
		</div>
		<p>
			<label>
				<?php _e('Enable image in event lists', 'event_espresso'); ?>
			</label>
			<?php echo select_input('show_thumb_in_lists', $values, isset($event_meta['display_thumb_in_lists']) ? $event_meta['display_thumb_in_lists'] : '', 'id="show_thumb_in_lists"'); ?> </p>
		<p>
			<label>
				<?php _e('Enable image in registration', 'event_espresso'); ?>
			</label>
			<?php echo select_input('show_thumb_in_regpage', $values, isset($event_meta['display_thumb_in_regpage']) ? $event_meta['display_thumb_in_regpage'] : '', 'id="show_thumb_in_regpage"'); ?> </p>
		<?php do_action('action_hook_espresso_featured_image_add_to_meta_box', $event_meta); ?>
	</div>
	<?php
}

function espresso_event_editor_preapproval_metabox($event) {
	$pre_approval_values = array(
			array('id' => true, 'text' => __('Yes', 'event_espresso')),
			array('id' => false, 'text' => __('No', 'event_espresso')));
	?>
	<div class="inside">
		<p class="pre-approve">
			<label>
				<?php _e('Enable image in registration', 'event_espresso'); ?>
			</label>
			<?php
			echo select_input("require_pre_approval", $pre_approval_values, $event->require_pre_approval);
			?>
		</p>
	</div>
	<?php
}