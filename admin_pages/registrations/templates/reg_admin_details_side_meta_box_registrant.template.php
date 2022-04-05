<?php

use EventEspresso\core\services\request\sanitizers\AllowedTags;

/**
 * @var EE_Attendee $att_check
 * @var int         $ATT_ID
 * @var string      $att_edit_label
 * @var string      $att_edit_link
 * @var string      $att_edit_title
 * @var string      $create_label
 * @var string      $email
 * @var string      $fname
 * @var string      $formatted_address
 * @var string      $lname
 * @var string      $phone
 */

$attendee_full_name = "$fname $lname";
$email = sanitize_email($email);
$avatar  = get_avatar_url($email);
?>

<div id='admin-side-mbox-primary-registrant-dv' class='admin-side-mbox-dv'>
    <?php if (! empty($avatar)) : ?>
    <div class="ee-admin-attendee-avatar">
        <img alt="profile pic for <?php echo esc_html($attendee_full_name); ?>" src="<?php echo $avatar; ?>" />
    </div>
    <?php endif; ?>
    <div class='admin-side-mbox-text-dv'>
        <div class="ee-admin-attendee-name">
            <?php echo esc_html($attendee_full_name); ?>
        </div>
        <div class='ee-admin-attendee-email'>
            <div class='ee-admin-contact-details-with-dashicon'>
                <span class='dashicons dashicons-email'></span>
                <a href="mailto:<?php echo esc_attr($email); ?>"><?php echo esc_html($email); ?></a>
            </div>
        </div>
        <?php if (! empty($phone)) : ?>
            <div class='ee-admin-attendee-phone'>
                <div class='ee-admin-contact-details-with-dashicon'>
                    <span class='dashicons dashicons-phone'></span>
                    <a href="tel:<?php echo esc_attr($phone); ?>"><?php echo esc_html($phone); ?></a>
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
// only show if logged-in user has access
if (
    EE_Registry::instance()->CAP->current_user_can(
        'ee_edit_contact',
        'view_or_edit_contact_button',
        $ATT_ID
    )
) : ?>
    <div class='ee-admin-button-row'>
        <a class="button button--small button--secondary" href="<?php echo esc_url_raw($att_edit_link); ?>"
           title="<?php echo esc_attr($att_edit_title); ?>"
        >
            <span class="dashicons dashicons-groups"></span>
            <?php echo esc_html($att_edit_label); ?>
        </a>

    <?php if (! empty($create_link)) : ?>
        <a class="button button--small button--secondary" href="<?php echo esc_url_raw($create_link); ?>"
           title="<?php esc_attr_e(
               'This registration shares the contact details for the primary registration in this group.  If you\'d like this registration to have its own details, you can do so by clicking this button',
               'event_espresso'
           ); ?>"
        >
            <span class="ee-icon ee-icon-user-add-new"></span>
            <?php echo esc_html($create_label); ?>
        </a>
    <?php endif; ?>

    </div>
<?php endif;?>
