<div id="timezones-datetimes-dv" class="">

	<?php if ((!isset($org_options['use_event_timezones']) || $org_options['use_event_timezones'] ) ) : ?>
		<span class="run-in"> <?php _e('Current Time:', 'event_espresso'); ?> </span>
		<span class="current-date"> <?php echo $current_date; ?></span>
		<?php echo $current_time_help_link; ?>
		<a id="change-date-time-lnk" href="options-general.php" target="_blank"><?php _e('Change timezone and date format settings?', 'event_espresso'); ?></a>
	<?php endif; ?>

	<?php if (!empty($org_options['use_event_timezones']) ) : ?>
		<h6> <?php _e('Event Timezone:', 'event_espresso') ?> </h6>
		<?php echo $event_timezone; ?>
	<?php endif; ?>

</div>