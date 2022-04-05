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

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>

<div style="float:right">
    <?php echo sprintf(
        esc_html__('View %1$sRegistrations%4$s /  %2$sTransactions%4$s for this %3$sevent%4$s.', 'event_espresso'),
        '<a href="' . esc_url_raw($filtered_registrations_link) . '">',
        '<a href="' . esc_url_raw($filtered_registrations_link) . '">',
        '<a href="' . esc_url_raw($event_link) . '">',
        '</a>'
    ); ?>
</div>
<h3 id="reg-admin-reg-details-reg-nmbr-hdr">
    <?php
    echo wp_kses($previous_registration, AllowedTags::getAllowedTags());
    echo '&nbsp;' . sprintf(
        /* translators: %s: registration number */
        esc_html__('Registration # %1$s', 'event_espresso'),
        esc_html($reg_nmbr['value'])
    ) . '&nbsp;';
    echo wp_kses($next_registration, AllowedTags::getAllowedTags());
    ?>
</h3>
<h2 id="reg-admin-reg-details-reg-date-hdr"><?php echo esc_html($reg_datetime['value']); ?></h2>

<?php if ($registration->group_size() > 1) : ?>
    <a id="scroll-to-other-attendees" class="scroll-to" href="#other-attendees">
        <?php echo esc_html__(
            'Scroll to Other Registrations in the Same Transaction',
            'event_espresso'
        ); ?>
    </a>
<?php endif; ?>

<?php do_action('AHEE__reg_status_change_buttons__after_header', $REG_ID); ?>

