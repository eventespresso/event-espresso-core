<?php

use EventEspresso\core\services\request\sanitizers\AllowedTags;

/**
 * @var int    $ATT_ID
 * @var string $no_attendee_message
 * @var string $prime_reg_fname
 * @var string $prime_reg_lname
 * @var string $prime_reg_email
 * @var string $prime_reg_phone
 * @var string $formatted_address
 * @var string $edit_attendee_url
 */
$attendee_full_name = "$prime_reg_fname $prime_reg_lname";

$prime_reg_email = sanitize_email($prime_reg_email);
$avatar = get_avatar_url($prime_reg_email);
?>
<div id="admin-side-mbox-primary-registrant-dv" class="admin-side-mbox-dv">
<?php if (! empty($no_attendee_message)) : ?>
    <div>
        <?php echo esc_html($no_attendee_message); ?>
    </div>
<?php else : ?>
    <?php if (! empty($avatar)) : ?>
    <div class="ee-admin-attendee-avatar">
        <img alt="profile pic for <?php echo esc_html($attendee_full_name); ?>" src="<?php echo esc_url_raw($avatar); ?>" />
    </div>
    <?php endif; ?>
    <div class='admin-side-mbox-text-dv'>
        <div class="ee-admin-attendee-name">
            <?php echo esc_html($attendee_full_name); ?>
        </div>
        <div class='ee-admin-attendee-email'>
            <div class='ee-admin-contact-details-with-dashicon'>
                <span class='dashicons dashicons-email'></span>
                <a href="mailto:<?php echo esc_attr($prime_reg_email); ?>">
                    <?php echo esc_html($prime_reg_email); ?>
                </a>
            </div>
        </div>
        <?php if (! empty($prime_reg_phone)) : ?>
            <div class='ee-admin-attendee-phone'>
                <div class='ee-admin-contact-details-with-dashicon'>
                    <span class='dashicons dashicons-phone'></span>
                    <a href="tel:<?php echo esc_attr($prime_reg_phone); ?>">
                        <?php echo esc_html($prime_reg_phone); ?>
                    </a>
                </div>
            </div>
        <?php endif; ?>
        <?php if (! empty($formatted_address)) : ?>
        <div class='ee-admin-attendee-address'>
            <div class='ee-admin-contact-details-with-dashicon'>
                <span class='dashicons dashicons-location'></span>
                <?php echo wp_kses($formatted_address, AllowedTags::getAllowedTags()); ?>
            </div>
        </div>
        <?php endif; ?>
    </div>
</div>

<?php
endif;
// only show if logged-in user has access
if (
    EE_Registry::instance()->CAP->current_user_can(
        'ee_edit_contact',
        'view_or_edit_contact_button',
        $ATT_ID
    )
) : ?>
    <div class='ee-admin-button-row'>
        <a class="button button--small button--secondary" href="<?php echo esc_url_raw($edit_attendee_url); ?>"
           title="<?php esc_attr_e('View details for this contact.', 'event_espresso'); ?>"
        >
            <span class="dashicons dashicons-groups"></span>
            <?php esc_html_e('View/Edit Contact', 'event_espresso'); ?>
        </a>
    </div>
<?php endif;
