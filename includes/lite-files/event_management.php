<?php

function espresso_question_group_sql_filter($sql) {
	$sql .= ' LIMIT 0,2';
	return $sql;
}

add_filter('filter_hook_espresso_question_group_sql', 'espresso_question_group_sql_filter');

function espresso_event_editor_questions_notice() {
	_e('Need more questions?', 'event_espresso');
	?>
	<a href="http://eventespresso.com/download/" target="_blank"><?php _e('Upgrade Now!', 'event_espresso'); ?></a>
	<?php
}

add_action('action_hook_espresso_event_editor_questions_notice', 'espresso_event_editor_questions_notice');

function espresso_register_free_event_editor_meta_boxes() {
	add_meta_box('espresso_free_event_editor_event_options', __('Event Options', 'event_espresso'), 'espresso_free_event_editor_event_options_meta_box', 'toplevel_page_events', 'side');
}

add_action('current_screen', 'espresso_register_free_event_editor_meta_boxes');

function espresso_free_event_editor_event_options_meta_box($event) {
	?>
	<p class="inputundersmall">
		<label for"reg-limit">
		<?php _e('Attendee Limit: ', 'event_espresso'); ?>
	</label>
	<br />
	<input id="reg-limit" name="reg_limit"  size="10" type="text" value="<?php echo $event->reg_limit; ?>" /><br />
	<span>(<?php _e('leave blank for unlimited', 'event_espresso'); ?>)</span>
	</p>
	<p class="clearfix" style="clear: both;">
		<label for="group-reg"><?php _e('Allow group registrations? ', 'event_espresso'); ?></label>
		<br />
		<?php select_input('allow_multiple', $values, $event->allow_multiple, 'id="group-reg"'); ?>
	</p>
	<p class="inputundersmall">
		<label for="max-registrants"><?php _e('Max Group Registrants: ', 'event_espresso'); ?></label>
		<br />
		<input type="text" id="max-registrants" name="additional_limit" value="<?php echo $event->additional_limit; ?>" size="4" />
	</p>
	<p>
		<strong><?php _e('Advanced Options:', 'event_espresso'); ?>
		</strong>
	</p>
	<p>
		<label><?php _e('Is this an active event? ', 'event_espresso'); ?>
		</label><?php _e(select_input('is_active', $values, $event->is_active)); ?>
	</p>
	<p><label><?php _e('Display  description? ', 'event_espresso'); ?></label>
		<?php select_input('display_desc', $values, $event->display_desc); ?>
	</p>
	<p>
		<label><?php _e('Display  registration form? ', 'event_espresso'); ?>
		</label><?php select_input('display_reg_form', $values, $event->display_reg_form); ?>
	</p>
	<?php
}