<?php
/**
 * @var EE_Attendee $att_check
 * @var string      $att_edit_label
 * @var string      $att_edit_link
 * @var string      $create_label
 * @var string      $email
 * @var string      $fname
 * @var string      $formatted_address
 * @var string      $lname
 * @var string      $phone
 */
$email = sanitize_email($email);
?>

<div id="admin-side-mbox-primary-registrant-dv" class="admin-side-mbox-dv">
    <div class="clearfix">
        <span class="admin-side-mbox-label-spn lt-grey-txt float-left">
            <?php esc_html_e('Name', 'event_espresso'); ?>
        </span>
        <?php echo esc_html("$fname $lname"); ?>
    </div>
    <div class="clearfix">
        <span class="admin-side-mbox-label-spn lt-grey-txt float-left">
            <?php esc_html_e('Email', 'event_espresso'); ?>
        </span>
        <a href="mailto:<?php echo esc_attr($email); ?>">
            <?php echo esc_html($email); ?>
        </a>
    </div>
    <div class="clearfix">
        <span class="admin-side-mbox-label-spn lt-grey-txt float-left">
            <?php esc_html_e('Phone #', 'event_espresso'); ?>
        </span>
        <?php if (! empty($phone)) : ?>
            <a href="tel:<?php echo esc_attr($phone); ?>">
                <?php echo esc_html($phone); ?>
            </a>
        <?php endif; ?>
    </div>
    <div class="clearfix">
        <span class="admin-side-mbox-label-spn lt-grey-txt float-left">
            <?php esc_html_e('Address', 'event_espresso'); ?>
        </span>
        <div class="admin-side-mbox-text-dv">
            <?php echo $formatted_address; // already escaped ?>
        </div>
    </div>
</div>

<div class="contact-details-buttons">
    <?php
    if (
        $att_check instanceof EE_Attendee
        && EE_Registry::instance()->CAP->current_user_can(
            'ee_edit_contact',
            'view_or_edit_contact_button',
            $att_check->ID()
        )
    ) :
        ?>
        <a class="button button--secondary button--small" href="<?php echo esc_url_raw($att_edit_link); ?>"
           title="<?php echo esc_attr($att_edit_label); ?>"
        >
            <span class="dashicons dashicons-groups"></span>
            <?php echo esc_html($att_edit_label); ?>
        </a>
        <?php if (! empty($create_link)) : ?>
        <a class="button button--secondary button--small" href="<?php echo esc_url_raw($create_link); ?>"
           title="<?php esc_attr_e(
               'This registration shares the contact details for the primary registration in this group.  If you\'d like this registration to have its own details, you can do so by clicking this button',
               'event_espresso'
           ); ?>"
        >
            <span class="ee-icon ee-icon-user-add-new"></span>
            <?php echo esc_html($create_label); ?>
        </a>
        <?php endif; ?>
        <div style="clear:both"></div>
    <?php endif; ?>
</div>
