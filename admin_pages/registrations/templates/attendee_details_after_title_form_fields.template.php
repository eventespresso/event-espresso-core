<?php
EEH_Template_Validator::verify_instanceof( $attendee, '$attendee', 'EE_Attendee');
/**
 * @var $attendee - instance of EE_Attendee
 */
?>
<div id="titlediv">
	<div id="titlewrap">
		<label class="hidden" id="attendee-first-name-text" for="ATT_fname"><?php _e('First Name:', 'event_espresso'); ?></label>
		<input type="text" class="smaller-text-field" name="ATT_fname" value="<?php echo $attendee->get('ATT_fname'); ?>" id="ATT_fname" placeholder="<?php _e('First Name', 'event_espresso'); ?>" required>
		<label class="hidden" id="attendee-first-name-text" for="ATT_lname"><?php _e('Last Name:', 'event_espresso'); ?></label>
		<input type="text" class="smaller-text-field" name="ATT_lname" value="<?php echo $attendee->get('ATT_lname'); ?>" id="ATT_lname" placeholder="<?php _e('Last Name', 'event_espresso'); ?>">
		<div style="clear:both"></div>
	</div>
</div>
<?php
