<div class="mt-settings-content">
	<div class"mt-description">
		<p><?php echo $description; ?></p>
	</div>
	<div class"mt-settings">
		<form method="POST" action="" class="mt-settings-form<?php echo $show_form; ?>">
			<?php echo $template_form_fields; ?>
			<?php foreach ( $hidden_fields as $name => $field ) {
				echo $field['field'];
			} ?> 
			<input type="submit" value="<?php _e('Submit', 'event_espresso'); ?>" class="button-secondary mt-settings-submit no-drag" />
		</form>
	</div>
</div>