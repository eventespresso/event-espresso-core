<?php
/**
 * This file is the template for the create_custom template form that is used as a part of the messages metabox on the event editor.
 * @package Event Espresso
 * @subpackage Admin
 * @since 4.3.0
 */

/**
 * Template args in this template
 *
 */
?>
<div id="messages-change-edit-templates-dv" class="messages-change-edit-templates-option auto-hide hidden">
	<div class="messages-change-edit-templates-content">
		<form id="custom-message-template-form" method="POST" action="">
			<p>
				<label for="custom-message-template-name"><?php _e('Name for Template:', 'event_espresso'); ?></label><br />
				<input id="custom-message-template-name" type="text" class="regular-text" name="custom_template_args[MTP_name]" value="" >
			</p>
			<p>
				<label for="custom-message-template-description"><?php _e('Description:', 'event_espresso'); ?></label>
				<textarea class="large-text" id="custom-message-template-description" name="custom_template_args[MTP_description]"></textarea>
			</p>
			<input id="custom-message-template-grpID" type="hidden" name="custom_template_args[GRP_ID] value="XXXGRP_IDXXX">
			<div class="submit-button-container right">
				<input type="submit" class="button button-primary" value="<?php _e('Create Template', 'event_espresso'); ?>">
				<button type="button" class="button button-secondary cancel-create-template"><?php _e('Cancel', 'event_espresso'); ?></button>
			</div>
		</form>
	</div>
</div>
