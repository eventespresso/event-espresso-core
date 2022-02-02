<?php
/**
 * @var int             $REG_ID
 * @var string          $filtered_registrations_link
 * @var string          $filtered_registrations_link
 * @var string          $event_link
 * @var string          $previous_registration
 * @var string          $next_registration
 * @var string[]        $reg_nmbr
 * @var string[]        $reg_datetime
 * @var EE_Registration $registration
 */
?>

<div class='ee-admin-page-nav-strip-wrap'>
    <div class='ee-admin-page-nav-strip'>
        <?php
        echo $previous_registration; // already escaped
        echo '<span>';
        echo esc_html__('Registration # ', 'event_espresso');
        echo esc_html($reg_nmbr['value']);
        echo '</span>';
        echo $next_registration; // already escaped
        ?>
    </div>
    <div class='ee-admin-page-nav-strip'>
        <?php if ($registration->group_size() > 1) : ?>
            <span class='ee-admin-page-nav-strip-item'>
            <a id="scroll-to-other-attendees" class="scroll-to" href="#other-attendees">
                <?php echo esc_html__(
                    'Scroll to Other Registrations in the Same Transaction',
                    'event_espresso'
                ); ?>
            </a>
        </span>
        <?php endif; ?>
        <span class='ee-admin-page-nav-strip-item'>
        <?php echo sprintf(
            esc_html__('View %1$sRegistrations%4$s /  %2$sTransactions%4$s for this %3$sevent%4$s.', 'event_espresso'),
            '<a href="' . esc_url_raw($filtered_registrations_link) . '">',
            '<a href="' . esc_url_raw($filtered_registrations_link) . '">',
            '<a href="' . esc_url_raw($event_link) . '">',
            '</a>'
        ); ?>
        </span>
    </div>
</div>

<div class='ee-admin-page-header-grid'>
    <div class='ee-admin-container'>
        <label><?php echo esc_html__('Registration Date', 'event_espresso'); ?></label>
        <span><?php echo esc_html($reg_datetime['value']); ?></span>
    </div>
    <div class='ee-admin-container status-<?php echo esc_attr($registration->status_ID()); ?>'>
        <label><?php echo esc_html__('Registration Status: ', 'event_espresso'); ?></label>
        <span><?php echo esc_html($registration->pretty_status()); ?></span>
    </div>
</div>


<?php do_action('AHEE__reg_status_change_buttons__after_header', $REG_ID); ?>

