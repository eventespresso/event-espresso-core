<div id="titlediv">
	<div id="titlewrap">
		<label class="hidden" id="attendee-first-name-text" for="ATT_fname">First Name:</label>
		<input type="text" class="main-text-field" name="ATT_fname" value="<?php echo $attendee->get('ATT_fname'); ?>" id="ATT_fname" class="smaller-text-field" placeholder="<?php _e('First Name', 'event_espresso'); ?>">
		<label class="hidden" id="attendee-first-name-text" for="ATT_lname">Last Name:</label>
		<input type="text" class="main-text-field" name="ATT_lname" value="<?php echo $attendee->get('ATT_lname'); ?>" id="ATT_lname" class="smaller-text-field" placeholder="<?php _e('Last Name', 'event_espresso'); ?>">
		<div style="clear:both"></div>
	</div>
</div>
<?php
/**
 * template vars in use
 * $attendee - EE_Attendee object
 */