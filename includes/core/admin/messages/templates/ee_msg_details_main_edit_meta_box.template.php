<div id="admin-primary-mbox-dv" class="admin-primary-mbox-dv">
	
	<h4 class="admin-primary-mbox-h4"><?php echo isset($event_name) ? $event_name . ' Custom Template' : ''; ?></h4>
		<input type="hidden" id="ee-msg-current-context" name="MTP_context" value="<?php echo $context; ?>"  />
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
