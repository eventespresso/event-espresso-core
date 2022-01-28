<?php
/**
 * @var string $current_date
 * @var string $current_time_help_link
 * @var string $event_timezone
 */
?>
<?php if (EE_Registry::instance()->CFG->admin->use_event_timezones) : ?>
    <div id="timezones-datetimes-dv" class="">
        <span class="run-in"> <?php esc_html_e('Current Time for Event Timezone:', 'event_espresso'); ?> </span>
        <span class="current-date"> <?php echo esc_html($current_date); ?></span>
        <?php echo esc_html($current_time_help_link); ?>
        <a id="change-date-time-lnk" href="options-general.php" target="_blank">
            <?php esc_html_e('Change timezone and date format settings?', 'event_espresso'); ?>
        </a>
        <h6> <?php esc_html_e('Event Timezone:', 'event_espresso') ?></h6>
        <?php echo esc_html($event_timezone); ?>
    </div>
<?php endif; ?>
