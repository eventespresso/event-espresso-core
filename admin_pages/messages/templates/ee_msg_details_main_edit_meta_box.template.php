<div id="admin-primary-mbox-dv" class="admin-primary-mbox-dv">

	<h3 class="admin-primary-mbox-h4"><?php echo isset($event_name) ? $event_name . ' Custom Template' : ''; ?></h3>
		<input type="hidden" id="ee-msg-current-context" name="MTP_context" value="<?php echo $context; ?>"  />
		<!-- if this is not a global template then let's show the name and description fields -->
		<?php if ( ! $MTP->is_global() ) : ?>
			<div class="non-global-mtp-fields">
				<p>
					<?php _e('This is a custom template.  Custom Templates have an editable name and description to help you differentiate between templates.', 'event_espresso'); ?>
				</p>
				<div id="titlediv">
					<div id="titlewrap">
						<label for="title" class="label-MTP_name" style="visibility:hidden"><?php _e('Message Template Name:', 'event_espresso'); ?></label>
						<input id="title" type="text" class="regular-text" name="ee_msg_non_global_fields[MTP_name]" value="<?php echo $MTP->name(); ?>" >
						</div>
				</div>
				<p>
					<label for="ee-msg-non-global-fields-MTP_description" class="label-MTP_description" style="visibility:hidden;"><?php _e('Message Template Description:', 'event_espresso'); ?></label>
					<textarea id="ee-msg-non-global-fields-MTP_description" class="large-text" name="ee_msg_non_global_fields[MTP_description]"><?php echo $MTP->description(); ?></textarea>
				</p>
			</div>
		<?php else: ?>
			<input type="hidden" name="ee_msg_non_global_fields[MTP_name]" value="<?php echo $MTP->name(); ?>">
			<input type="hidden" name="ee_msg_non_global_fields[MTP_description]" value="<?php echo $MTP->description(); ?>">
		<?php endif; ?>
		<!-- we need to loop through the template_fields so we know our structure -->
		<?php
		if ( isset($template_fields) && !empty($template_fields) && !is_wp_error($template_fields) ) {
				echo $template_fields;
		} else {
			?>
			<p><?php _e('Something has gone wrong, there are no template fields to output.', 'event_espresso'); ?></p>
			<?php
		}

		?>
</div> <!-- end #admin-primary-mbox-dv -->
