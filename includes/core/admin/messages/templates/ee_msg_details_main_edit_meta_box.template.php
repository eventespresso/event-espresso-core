<div id="admin-primary-mbox-dv" class="admin-primary-mbox-dv">
	
	<h4 class="admin-primary-mbox-h4"><?php echo ($event_name) ? $event_name . ' Custom Template' : ''; ?></h4>

	<!-- todo: temp putting context swticher here .. will have to figure out how to put it at the top later (or maybe in a sidebar?)  this needs to be added to the admin_details_wrapper (which means I'll have to create a custom one) -->
	<form method="get" action="<?php echo $context_swticher_url; ?>" id="ee-msg-context-switcher-frm">
		<select name="context">
			<?php if ( $context_templates = $message_template->context_templates() && is_array($context_templates) ) :
					foreach ( $context_templates as $context => $template_fields ) :
			?>
			<option value="<?php echo $context; ?>"><?php echo $context; ?></option>
			<?php endforeach; endif; ?>
		</select>
		<input id="submit-msg-context-switcher-sbmt" class="button-secondary" type="submit" value="Switch Context">
	</form>

	<!-- todo: need to put the form opening and closing tags outside of the meta boxes, so we can have some side meta boxes for other data that get's added via the form.  This means of course that we have to be able to SEND data to the wrappers outside of the meta boxes. --> 

	<form method="post" action"<?php echo $edit_message_template_form_url; ?>" id="ee-msg-edit-frm">
		<input type="hidden" id="ee-msg-current-context" name="MTP_context" value="<?php echo $context; ?>"  />
		<!-- we need to loop through the template_fields so we know our structure -->
		<?php foreach ( $template_fields as $field ) : ?>

		<?php endforeach; ?>
	</form> <!-- end edit template form -->
</div> <!-- end #admin-primary-mbox-dv -->
