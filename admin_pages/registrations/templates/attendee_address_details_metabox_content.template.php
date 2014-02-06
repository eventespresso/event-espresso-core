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
				<label for="ATT_address"><?php _e('Address:', 'event_espresso'); ?></label><br>
				<input class="all-options" type="text" id="ATT_address" name="ATT_address" value="<?php echo $attendee->address(); ?>"/>
				<br/>
				<input class="all-options" type="text" id="ATT_address2" name="ATT_address2" value="<?php echo $attendee->address2(); ?>"/>
				<br/>
				<p class="description"><?php _e('The contact\'s street address.', 'event_espresso'); ?></p>
			</td>
		</tr>
		<tr valign="top">
			<td>
				<label for="ATT_city"><?php _e('City', 'event_espresso'); ?></label><br>
				<input class="all-options" type="text" id="ATT_city" name="ATT_city" value="<?php echo $attendee->city(); ?>"/>
			</td>
		</tr>
		<tr valign="top">
			<td>
				<?php echo $state_html?>
			</td>
		</tr>
		<tr valign="top">
			<td>
				<?php echo $country_html?>
			</td>
		</tr>
		<tr valign="top">
			<td>
				<label for="ATT_zip"><?php _e('Zip/Postal Code', 'event_espresso'); ?></label><br>
				<input class="all-options" type="text" id="ATT_zip" name="ATT_zip" value="<?php echo $attendee->zip(); ?>"/>
			</td>
		</tr>
	</tbody>
</table>