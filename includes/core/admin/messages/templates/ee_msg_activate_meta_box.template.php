<div id="<?php echo $box_view; ?>_<?php echo $box_id; ?>_meta_box" class="admin-primary-mbox-dv <?php echo $activate_state; ?>">
	
	<p><?php echo $box_head_content; ?></p>

	<!-- holds the content for the active state -->
	<div class="activate_messages_meta_box_active_content <?php echo $show_hide_active_content; ?>">
		<?php echo $activate_msgs_active_details; ?>
		<div class="active_msgs_details_button">
			<?php echo $activate_msgs_details_url; ?>
		</div>
	</div> <!-- end .activate_messages_meta_box_active_content -->

	<!-- holds the form for the edit state  -->
	<div class="activate_messages_meta_box_form <?php echo $show_hide_edit_form; ?>">
		<form id="ee-msg-activate-<?php echo $box_view;?>-<?php echo $box_id; ?>-frm" action="<?php echo $activate_message_template_form_action; ?>" method="get">
			<?php echo $activate_msgs_form_fields; ?>
			<div class="active_msgs_details_button">
				<?php echo $activate_msgs_details_url; ?>
			</div>
		</form>
	</div> <!-- end .activate_messages_meta_box_form -->

	<div class="activate_messages_on_off_toggle_container">
		<a href="<?php echo $on_off_action; ?>" title="Click here to <?php echo $activate_msgs_on_off_descrp; ?>" class="on-off-<?php echo $on_off_status;?>"></a>
	</div> <!-- end .activate_messages_on_off_toggle_container -->
</div> <!-- end #admin-primary-mbox-dv -->