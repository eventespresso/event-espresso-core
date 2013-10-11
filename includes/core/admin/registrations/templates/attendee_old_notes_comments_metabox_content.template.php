<?php
EEH_Template_Validator::verify_instanceof( $attendee, '$attendee', 'EE_Attendee');
/*
 * @var $attendee EE_Attendee 
 * @var $state_html html for displaying the attendee's state
 * @var $country_html html for displaying the attendee's country
 */
?>
<table class="form-table">
	<tbody>
		<tr valign="top">
			<td>
				<label for="ATT_comments"><?php _e('Comments', 'event_espresso'); ?></label>
				<textarea class="ee-width-100" id="ATT_comments" name="ATT_comments" cols="40" rows="8" ><?php echo $attendee->comments(); ?></textarea><br/>
				<p class="description"><?php _e('Comments from the attendee regarding your events, services, etc collected via forms, emails, etc.', 'event_espresso'); ?></p>
			</td>						
		</tr>
		<tr valign="top">
			<td>
				<label for="ATT_notes"><?php _e('Notes', 'event_espresso'); ?></label>
				<textarea class="ee-width-100" id="ATT_notes" name="ATT_notes" cols="40" rows="8" ><?php echo $attendee->notes() ?></textarea><br/>
				<p class="description"><?php _e('A place for you to keep any notes pertaining to this attendee, their preferences, special circumstances, etc.', 'event_espresso'); ?></p>
			</td>							
		</tr>
	</tbody>
</table>