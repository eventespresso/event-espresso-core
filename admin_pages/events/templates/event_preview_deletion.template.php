<?php
/**
 * @var EE_Event[]             $events
 * @var EE_Form_Section_Proper $form
 * @var EE_Datetime[]          $datetimes
 * @var EE_Registration[]      $registrations
 * @var string                 $form_url
 * @var int                    $reg_count
 */
?>

<h2>
    <?php esc_html_e('Please Confirm You Want to Permanently Delete the Following Data', 'event_espresso'); ?>
</h2>
<h3>
    <?php echo esc_html(
        sprintf(
        // translators: 1: number of events
            _n('%1$d Event', '%1$d Events', count($events), 'event_espresso'),
            count($events)
        )
    );
?>
</h3>
<ul>
    <?php
    foreach ($events as $event) {
        ?>
        <li>
            <?php echo esc_html($event->name()); ?>
        </li>
        <?php
    }
    ?>
</ul>
<h3>
    <?php echo esc_html(
        sprintf(
        // translators: 1: number of datetimes
            _n('%1$d Datetime', '%1$d Datetimes', count($datetimes), 'event_espresso'),
            count($datetimes)
        )
    );
?>
</h3>
<ul>
    <?php
    foreach ($datetimes as $datetime) {
        ?>
        <li>
            <?php echo esc_html($datetime->get_dtt_display_name(true)); ?>
        </li>
        <?php
    }
    ?>
</ul>
<h3>
    <?php echo esc_html(
        sprintf(
            _n('%1$d Registration', '%1$d Registrations', $reg_count, 'event_espresso'),
            $reg_count
        )
    );
?>
</h3>
<?php
if ($reg_count > count($registrations)) {
    ?>
    <p class="notice">
        <?php printf(
            esc_html__('Only showing first %1$d.', 'event_espresso'),
            count($registrations)
        );
        ?>
    </p>
    <?php
}
?>
<?php
if ($reg_count > 0) {
    ?>
    <p>
        <?php esc_html_e(
            'Note: contacts will not be deleted, only their registrations for the enumerated events.',
            'event_espresso'
        ); ?>
    </p>
    <?php
}
?>
<ul>
    <?php
    foreach ($registrations as $registration) {
        ?>
        <li>
            <?php echo esc_html(
                sprintf(
                    _x('%1$s (%2$d of %3$d)', 'Registration name (number of count)', 'event_espresso'),
                    $registration->attendeeName(true),
                    $registration->count(),
                    $registration->group_size()
                )
            ); ?>
        </li>
        <?php
    }
    ?>
</ul>
<form action="<?php echo esc_url_raw($form_url); ?>" method="POST">
    <?php echo $form->get_html_and_js(); // already escaped ?>
    <input class='button button-primary'
           type="submit"
           value="<?php esc_attr_e('Confirm', 'event_espresso'); ?>"
    />
    <a href="javascript:window.history.back();" class="button button-secondary">
        <?php esc_html_e('Cancel', 'event_espresso'); ?>
    </a>
</form>
