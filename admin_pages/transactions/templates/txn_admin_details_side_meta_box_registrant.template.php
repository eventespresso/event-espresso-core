<?php
/** @type int ATT_ID */
/** @type string $no_attendee_message */
/** @type string $prime_reg_fname */
/** @type string $prime_reg_lname */
/** @type string $prime_reg_email */
/** @type string $prime_reg_phone */
/** @type string $formatted_address */
/** @type string $edit_attendee_url */
?>
<div id="admin-side-mbox-primary-registrant-dv" class="admin-side-mbox-dv">
    <?php if ( ! empty($no_attendee_message)) : ?>
    <p class="clearfix">
        <?php echo $no_attendee_message; ?>
    </p>
</div> <!-- end #admin-side-mbox-primary-registrant-dv -->
<?php else : ?>
    <p class="clearfix">
        <span class="admin-side-mbox-label-spn lt-grey-txt float-left"><?php _e('Name',
                    'event_espresso'); ?></span><?php echo $prime_reg_fname . ' ' . $prime_reg_lname; ?>
    </p>
    <p class="clearfix">
        <span class="admin-side-mbox-label-spn lt-grey-txt float-left"><?php _e('Email', 'event_espresso'); ?></span><a
                href="mailto:<?php echo $prime_reg_email; ?>"><?php echo $prime_reg_email; ?></a>
    </p>
    <p class="clearfix">
        <span class="admin-side-mbox-label-spn lt-grey-txt float-left"><?php _e('Phone #',
                    'event_espresso'); ?></span><?php echo $prime_reg_phone; ?>
    </p>
    <p class="clearfix">
        <span class="admin-side-mbox-label-spn lt-grey-txt float-left"><?php _e('Address', 'event_espresso'); ?></span>
    <div class="admin-side-mbox-text-dv">
        <?php echo $formatted_address; ?>
    </div>
    </p>
    </div> <!-- end #admin-side-mbox-primary-registrant-dv -->

    <?php
    /** only show if logged in user has access */
    if ( EE_Registry::instance()->CAP->current_user_can(
            'ee_edit_contact',
            'view_or_edit_contact_button',
            $ATT_ID
    )
    ) : ?>
    <p style="text-align:right;">
        <a class="button button-small" href="<?php echo $edit_attendee_url; ?>"
           title="<?php esc_attr_e('View details for this contact.', 'event_espresso'); ?>">
            <span class="ee-icon ee-icon-user-edit"></span><?php _e('View / Edit this Contact', 'event_espresso'); ?>
        </a>
    </p>
    <?php endif; ?>
<?php endif;  //end no attendee check?>
