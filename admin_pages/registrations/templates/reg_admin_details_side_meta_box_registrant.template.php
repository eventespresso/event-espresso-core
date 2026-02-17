<?php

use EventEspresso\core\services\request\sanitizers\AllowedTags;

/**
 * @var bool        $user_can_edit_contact
 * @var int         $ATT_ID
 * @var int         $REG_ID
 * @var string      $att_edit_label
 * @var string      $att_edit_link
 * @var string      $att_edit_title
 * @var string      $create_label
 * @var string      $email
 * @var string      $fname
 * @var string      $formatted_address
 * @var string      $lname
 * @var string      $phone
 * @var string      $info_error
 * @var string      $info_error_link
 * @var string      $contact_list_url
 * @var string[]    $contact_options
 * @var string      $change_reg_contact_url
 */

$attendee_full_name = "$fname $lname";
$email = sanitize_email($email);
$avatar  = get_avatar_url($email);

?>

<script id="ee-contacts-data" type="application/json">
<?php echo wp_json_encode($contact_options); ?>
</script>

<div class='admin-side-mbox-attendee-id'><?php printf(esc_html__('ID: &nbsp; %1$s', 'event_espresso'), $ATT_ID) ?></div>

<?php if (! empty($info_error)): ?>
    <div class="attendee-info-error ee-status-bg--RIC">
        <?php esc_html_e( 'Contact information is missing for this attendee!', 'event_espresso' ); ?>
        <br>
        <?php if (empty($info_error_link)): ?>
            <span class="small-text"><?php esc_html_e(
                    "The registration form was likely abandoned before any attendee information was submitted.",
                    'event_espresso'
                );?>
            </span>
        <?php else: ?>
            <?php esc_html_e( 'Copy contact information from the primary registrant?', 'event_espresso' ); ?>
            <div class='ee-admin-button-row'>
                <a class="button button--primary button--small"
                   href="<?php echo esc_url_raw($info_error_link); ?>"
                   aria-label="<?php esc_attr_e(
                       'Click to copy contact information from the primary registrant',
                       'event_espresso'
                   ); ?>"
                >
                    <span class="ee-icon ee-icon-user-add-new"></span>
                    <?php esc_html_e( 'Copy primary registrant?', 'event_espresso' ); ?>
                </a>
            </div>
        <?php endif; ?>
    </div>
<?php else: ?>

<div id='admin-side-mbox-primary-registrant-dv' class='admin-side-mbox-dv'>
    <div class="ee-admin-attendee-avatar">
        <img alt="profile pic for <?php echo esc_html($attendee_full_name); ?>" src="<?php echo $avatar; ?>" />
    </div>
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

<?php endif;

// only show if logged-in user has access
if ($user_can_edit_contact) : ?>
    <div class='ee-admin-button-row'>
        <a class="ee-aria-tooltip button button--small button--secondary" href="<?php echo esc_url_raw($att_edit_link); ?>"
           aria-label="<?php esc_html_e('View details for this contact.', 'event_espresso'); ?>"
        >
            <span class="dashicons dashicons-businessperson"></span>
            <?php esc_html_e('View/Edit Contact', 'event_espresso'); ?>
        </a>
    </div>
<?php
endif;
?>
    <div class='change-reg-contact-div'>
        <h4><?php esc_html_e('Reassign Contact', 'event_espresso');?></h4>
        <form id="change-reg-contact-form" method="POST" action="<?php echo esc_url_raw($change_reg_contact_url) ?>">
            <p class="small-text">
                <?php esc_html_e(
                    "You can reassign this registration to another contact, by performing one of the following actions:",
                    'event_espresso'
                );?>
            </p>
            <div class='reg-contact-autocomplete-wrap'>
                <h5 class="small-text">
                    <?php esc_html_e('Assign to an Existing Contact', 'event_espresso');?>
                </h5>
                <p class="small-text">
                    <?php esc_html_e(
                        'Enter the first name, last name, or email address for an exisiting contact, select the desired contact from the list of options, then click the "Reassign Contact" button.',
                        'event_espresso'
                    );?>
                </p>

                <label for="change-reg-contact-autocomplete" class='screen-reader-text'>
                    <?php esc_html_e('Assign to existing contact', 'event_espresso');?>
                </label>
                <input type="text"
                       class="ee-input-size--small ee-input-width--reg"
                       id="change-reg-contact-autocomplete"
                       name="change_reg_contact_autocomplete"
                       autocomplete="off"
                       placeholder="<?php esc_attr_e('Type to search contacts...', 'event_espresso'); ?>"
                />
                <input type="hidden" name="change_reg_contact_id" id="change-reg-contact-id" value="<?php echo absint($ATT_ID); ?>" />
                <div class='ee-admin-button-row'>
                    <button class="button button--secondary button--small ee-aria-tooltip"
                            aria-label="<?php esc_html_e('Click to change contact', 'event_espresso');?>"
                    >
                        <span class="dashicons dashicons-groups"></span> <?php esc_html_e('Reassign Contact', 'event_espresso');?>
                    </button>
                </div>
            </div>
        </form>

        <?php if (! empty($create_link)) : ?>
        <h5 class="small-text">
            <?php esc_html_e('Create a New Contact', 'event_espresso');?>
        </h5>
        <p class="small-text">
            <?php esc_html_e(
                'Or click the "Create New Contact" button below, which will duplicate the current contact and then redirect you to the edit contact page where you can change the details.',
                'event_espresso'
            );?>
        </p>
        <div class='ee-admin-button-row'>
            <a class="ee-aria-tooltip button button--small button--secondary" href="<?php echo esc_url_raw($create_link); ?>"
               aria-label="<?php esc_attr_e(
                   'Click to create a new contact',
                   'event_espresso'
               ); ?>"
            >
                <span class="ee-icon ee-icon-user-add-new"></span>
                <?php esc_html_e('Create New Contact', 'event_espresso'); ?>
            </a>
        </div>
        <?php endif; ?>
        <p class="view-contact-list small-text">
            <?php printf(
                esc_html__('open the %1$scontact list%2$s in a new browser tab or window', 'event_espresso'),
                '<a href="' . esc_url_raw($contact_list_url) . '" target="_blank">',
                '</a>',
                '<br>'
            );?>
        </p>
    </div>
