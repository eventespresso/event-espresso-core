<?php if (EE_Registry::instance()->CFG->admin->use_event_timezones) : ?>
    <div id="timezones-datetimes-dv" class="">
        <span class="run-in"> <?php esc_html_e('Current Time for Event Timezone:', 'event_espresso'); ?> </span>
        <span class="current-date"> <?php echo $current_date; ?></span>
        <?php echo $current_time_help_link; ?>
        <a id="change-date-time-lnk" href="options-general.php" target="_blank"><?php
            esc_html_e('Change timezone and date format settings?', 'event_espresso');
        ?></a>

        <h6> <?php esc_html_e('Event Timezone:', 'event_espresso') ?> </h6>
        <?php echo $event_timezone; ?>
    </div>
<?php endif; ?>
