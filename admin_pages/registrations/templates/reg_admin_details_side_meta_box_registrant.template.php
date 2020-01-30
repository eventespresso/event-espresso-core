<div id="admin-side-mbox-primary-registrant-dv" class="admin-side-mbox-dv">
    <div class="clearfix">
        <span class="admin-side-mbox-label-spn lt-grey-txt float-left">
            <?php esc_html_e('Name', 'event_espresso'); ?>
        </span><?php echo $fname . ' ' . $lname; ?>
    </div>
    <div class="clearfix">
        <span class="admin-side-mbox-label-spn lt-grey-txt float-left">
            <?php esc_html_e('Email', 'event_espresso'); ?>
        </span>
        <a href="mailto:<?php echo $email; ?>">
            <?php echo $email; ?>
        </a>
    </div>
    <div class="clearfix">
        <span class="admin-side-mbox-label-spn lt-grey-txt float-left">
            <?php esc_html_e('Phone #', 'event_espresso'); ?>
        </span>
        <?php if (! empty($phone)) : ?>
            <a href="tel:<?php echo $phone; ?>">
                <?php echo $phone; ?>
            </a>
        <?php endif; ?>
    </div>
    <div class="clearfix">
        <span class="admin-side-mbox-label-spn lt-grey-txt float-left">
            <?php esc_html_e('Address', 'event_espresso'); ?>
        </span>
    <div class="admin-side-mbox-text-dv">
        <?php echo $formatted_address; ?>
    </div>
    </div>
</div>


<div class="contact-details-buttons">
    <?php
    if ($att_check instanceof EE_Attendee
        && EE_Registry::instance()->CAP->current_user_can(
            'ee_edit_contact',
            'view_or_edit_contact_button',
            $att_check->ID()
        )) :
    ?>
    <a class="button button-small" href="<?php echo $att_edit_link; ?>"
       title="<?php echo esc_attr($att_edit_label); ?>">
        <span class="ee-icon ee-icon-user-edit"></span><?php echo $att_edit_label; ?>
    </a>
    <?php if (! empty($create_link)) : ?>
        <a class="button button-small" href="<?php echo $create_link; ?>"
           title="<?php
                   esc_attr_e(
                       'This registration shares the contact details for the primary registration in this group.  If you\'d like this registration to have its own details, you can do so by clicking this button',
                       'event_espresso'
                   ); ?>">
            <span class="ee-icon ee-icon-user-add-new"></span><?php echo $create_label; ?>
        </a>
    <?php endif; ?>
<div style="clear:both"></div>
<?php
    endif;
?>
</div>
