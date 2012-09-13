<div id="admin-primary-mbox-dv" class="admin-primary-mbox-dv">
	
	<h4 class="admin-primary-mbox-h4"><?php echo ($event_name) ? $event_name . ' Custom Template' : ''; ?></h4>

	<!-- todo: temp putting context swticher here .. will have to figure out how to put it at the top later (or maybe in a sidebar?)  this needs to be added to the admin_details_wrapper (which means I'll have to create a custom one) -->
	<form method="get" action="<?php echo $context_switcher_url; ?>" id="ee-msg-context-switcher-frm">
		<select name="context">
			<?php if ( $context_templates = $message_template->context_templates() && is_array($context_templates) ) :
					foreach ( $context_templates as $context => $template_fields ) :
			?>
			<option value="<?php echo $context; ?>"><?php echo $context; ?></option>
			<?php endforeach; endif; ?>
		</select>
		<input id="submit-msg-context-switcher-sbmt" class="button-secondary" type="submit" value="Switch Context">
	</form>
		<input type="hidden" id="ee-msg-current-context" name="MTP_context" value="<?php echo $context; ?>"  />
		<!-- we need to loop through the template_fields so we know our structure -->
		<?php
		if ( isset($template_fields) and !empty($template_fields ) ) {
			foreach ( $template_fields as $field_id => $field ) {
				//we dont' need fields that get included in the sidebar here.
				$sidebar_array = array('ee-msg-is-global', 'ee-msg-is-override', 'ee-msg-deleted');
				if ( !in_array($field_id, $sidebar_array) ) {
					echo $field;
				}
			}
		} else {
			?>
			<p><?php _e('Something has gone wrong, there are no template fields to output.', 'event_espresso'); ?></p>
			<?php
		}

		?>
	</form> <!-- end edit template form -->
</div> <!-- end #admin-primary-mbox-dv -->
