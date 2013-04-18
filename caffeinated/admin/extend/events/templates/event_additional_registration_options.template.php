<?php if ( $use_attendee_pre_approval ) : ?>
<p>
	<label><?php _e('Attendee pre-approval required?', 'event_espresso'); ?></label>
	<?php
	echo $attendee_pre_approval_required;
	?>
</p>
<?php endif; ?>