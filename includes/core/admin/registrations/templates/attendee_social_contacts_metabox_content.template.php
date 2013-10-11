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
				<label for="ATT_social"><?php _e('Social Networking Contacts', 'event_espresso'); ?></label>
				<textarea class="ee-width-100" id="ATT_social" name="ATT_social" cols="30" rows="4" ><?php echo $attendee->social(); ?></textarea><br/>
				<p class="description"><?php _e('Social networking contacts for the attendee such as Facebook page, Twitter account, LinkedIn account, etc. One per line please', 'event_espresso'); ?></p>
			</td>							
		</tr>
	</tbody>
</table>