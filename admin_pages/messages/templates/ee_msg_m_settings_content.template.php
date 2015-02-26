<div class="messenger-settings-content">
	<div class="activate_messages_on_off_toggle_container">
		<div id="espresso-ajax-loading" class="ajax-loader-grey">
				<span class="ee-spinner ee-spin"></span><span class="hidden"><?php _e('loading...', 'event_espresso'); ?></span>
			</div>
		<span id="on-off-nonce-<?php echo $messenger; ?>" class="hidden"><?php echo $nonce; ?></span>
		<div class="switch">
			<?php
				$checked = $on_off_status ? ' checked="checked"' : '';
			?>
			<input id="ee-on-off-toggle-<?php echo $messenger; ?>" type="checkbox" class="ee-on-off-toggle ee-toggle-round-flat"<?php echo $checked; ?> value="<?php echo $on_off_action; ?>">
			<label for="ee-on-off-toggle-<?php echo $messenger; ?>"></label>
		</div>
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
