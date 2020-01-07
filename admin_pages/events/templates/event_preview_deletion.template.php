<h2><?php esc_html_e('Please Confirm You Want to Permanently Delete the Following Data', 'event_espresso'); ?></h2>
<h3>
    <?php
    printf(
        esc_html(
            // translators: 1: number of events
            _n('%1$d Event', '%1$d Events', count($events), 'event_espresso')
        ),
        count($events)
    );
    ?>
</h3>
<ul>
    <?php
    foreach ($events as $event) {
        ?>
        <li>
            <?php echo $event->name(); ?>
        </li>
        <?php
    }
    ?>
</ul>
<h3>
    <?php
    printf(
        esc_html(
            // translators: 1: number of datetimes
            _n('%1$d Datetime', '%1$d Datetimes', count($datetimes), 'event_espresso')
        ),
        count($datetimes)
    );
    ?>
</h3>
<ul>
    <?php
    foreach ($datetimes as $datetime) {
        ?>
        <li>
            <?php echo $datetime->get_dtt_display_name(true); ?>
        </li>
        <?php
    }
    ?>
</ul>
<h3>
    <?php
    printf(
        esc_html(
            _n('$1%d Registration', '%1$d Registrations', $reg_count, 'event_espresso')
        ),
        $reg_count
    );
    ?>
</h3>
<?php
if ($reg_count > count($registrations)) {
    ?>
    <p class="notice">
        <?php
        printf(
            esc_html__('Only showing first %1$d.', 'event_espresso'),
            count($registrations)
        );
        ?>
    </p>
    <?php
}
?>
<ul>
    <?php
    foreach ($registrations as $registration) {
        ?>
        <li>
            <?php
            printf(
                esc_html(
                    _x('%1$s (%2$d of %3$d)', 'Registration name (number of count)', 'event_espresso')
                ),
                $registration->attendeeName(true),
                $registration->count(),
                $registration->group_size()
            ); ?>
        </li>
        <?php
    }
    ?>
</ul>
<form action="<?php echo $form_url; ?>" method="POST">
    <?php echo $form->get_html_and_js(); ?>
    <input type="submit" value="<?php echo esc_attr(esc_html__('Confirm', 'event_espresso')); ?>">
</form>
