<div id="admin-primary-mbox-questions-dv" class="admin-primary-mbox-dv">
	<p><?php _e('This displays the custom questions and answers for this registrant.  Please note that any answers to system questions have been saved with the contact record.  You can edit those answers via the "View/Edit this Contact" link in the Contact Details metabox in the sidebar.', 'event_espresso'); ?></p>
	
	<form name="reg-admin-attendee-questions-frm" id="reg-admin-attendee-questions-frm" action="<?php echo REG_ADMIN_URL; ?>" method="post">
		<?php wp_nonce_field( $reg_questions_form_action . '_nonce', $reg_questions_form_action . '_nonce' ); ?>
		<input  type="hidden" name="page" value="<?php echo REG_PG_SLUG; ?>"/>
		<input  type="hidden" name="action" value="<?php echo $reg_questions_form_action; ?>"/>
		<input  type="hidden" name="_REG_ID" value="<?php echo $REG_ID; ?>"/>
		<input  type="hidden" name="espresso_ajax" id="espresso-ajax" value="0"/>
		<input  type="hidden" name="noheader" id="reg-admin-noheader-inp" value="true"/>
		<?php echo $att_questions; ?>
		<?php if ( !empty($att_questions) ) : ?>
			<input id="reg-admin-attendee-questions-submit" class="button-primary" value="Update Registration Questions" type="submit" />
		<?php else : ?>
			<p class="ee-attention"><?php _e('There were no custom questions asked for this registration.', 'event_espresso'); ?></p>
		<?php endif; ?>

	</form>

	<br class="clear"/>
	
</div>
