<div class="messenger-settings-content">
	<div class="activate_messages_on_off_toggle_container">
		<div id="espresso-ajax-loading" class="ajax-loader-grey">
				<span class="ee-spinner ee-spin"></span><span class="hidden"><?php _e('loading...', 'event_espresso'); ?></span>
			</div>
		<span id="on-off-nonce" class="hidden"><?php echo $nonce; ?></span>
		<button type="button" name="messenger_on_off_action" id="on-off-<?php echo $messenger; ?>" value="<?php echo $on_off_action; ?>" class="on-off-<?php echo $on_off_status;?> on-off-action"></button>
	</div> <!-- end .activate_messages_on_off_toggle_container -->
	<div class="messenger-description">
		<p><?php echo $description; ?></p>
	</div>
	<div class="messenger-settings<?php echo $show_hide_edit_form; ?>">
		<span id="has_form_class" class="hidden"><?php echo trim($show_hide_edit_form); ?></span>
		<form method="POST" action="" class="mt-settings-form">
			<?php echo $template_form_fields; ?>
			<?php foreach ( $hidden_fields as $name => $field ) {
				echo $field['field'];
			} ?> 
			<input type="submit" value="<?php _e('Submit', 'event_espresso'); ?>" class="button-secondary no-drag" />
		</form>
	</div>
</div>