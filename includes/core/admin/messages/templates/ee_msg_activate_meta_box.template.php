<div id="<?php echo $box_view; ?>_<?php echo $box_id; ?>_meta_box" class="admin-primary-mbox-dv">
	
	<p><?php echo $box_head_content; ?></p>

	<!-- holds the content for the active state -->
	<div class="activate_messages_meta_box_active_content <?php echo $show_hide_active_content; ?>">
		<?php echo $activate_msgs_active_details; ?>
		<div class="active_msgs_details_button">
			<a class="button-primary" href="<?php echo $activate_msgs_details_url; ?>" title="<?php _e('Change Settings', 'event_espresso'); ?>"><?php _e('Change', 'event_espresso'); ?></a>
		</div>
	</div> <!-- end .activate_messages_meta_box_active_content -->

	<!-- holds the form for the edit state  -->
	<div class="activate_messages_meta_box_form <?php echo $show_hide_edit_form; ?>">
		<form id="ee-msg-activate-<?php echo $box_view;?>-<?php echo $box_id; ?>-frm" action="<?php echo $activate_message_template_form_action; ?>" method="POST">
			<input type="hidden" name="ee-msg-activate-form" id="ee-msg-activate-form-<?php echo $box_id; ?>" value="1" />
			<?php echo $activate_msgs_form_fields; ?>
			<div class="active_msgs_details_button">
				<input type="submit" class="button-primary" value="<?php _e('Submit'); ?>" />
			</div>
		</form>
	</div> <!-- end .activate_messages_meta_box_form -->

	<div class="activate_messages_on_off_toggle_container <?php echo $show_on_off_button; ?>">
		<a href="<?php echo $on_off_action; ?>" title="<?php printf( __('Click here to %s', 'event-espresso'), $activate_msgs_on_off_descrp); ?>" class="on-off-<?php echo $on_off_status;?>"></a>
	</div> <!-- end .activate_messages_on_off_toggle_container -->
	<div style="clear:both"></div>
</div> <!-- end #admin-primary-mbox-dv -->