<?php
EEH_Template_Validator::verify_instanceof( $attendee, '$attendee', 'EE_Attendee');
/**
 * @var $attendee - instance of EE_Attendee
 */
?>
<table class="form-table">
	<tbody>
		<tr valign="top">
			<td>
				<label for="ATT_email"><?php _e('Email Address', 'event_espresso'); ?><span class="denotes-required-spn">*</span></label><br>
				<div class="validation-notice-dv"><?php _e( 'The following is  a required field', 'event_espresso' );?></div>
				<input class="all-options required" type="text" id="ATT_email" name="ATT_email" value="<?php echo $attendee->email(); ?>" required/><br/>
				<p class="description"><?php _e('( required value )', 'event_espresso'); ?></p>
			</td>
		</tr>
		<tr valign="top">
			<td>
				<label for="ATT_phone"><?php _e('Phone Number', 'event_espresso'); ?></label><br>
				<input class="all-options" type="text" id="ATT_phone" name="ATT_phone" value="<?php echo $attendee->phone(); ?>"/>
			</td>
		</tr>
	</tbody>
</table>