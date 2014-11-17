<div id="admin-side-mbox-primary-registrant-dv" class="admin-side-mbox-dv">
	<p class="clearfix">
		<span class="admin-side-mbox-label-spn lt-grey-txt float-left"><?php _e('Name', 'event_espresso'); ?></span><?php echo $fname . ' ' . $lname;?>
	</p>
	<p class="clearfix">
		<span class="admin-side-mbox-label-spn lt-grey-txt float-left"><?php _e('Email', 'event_espresso'); ?></span><a href="mailto:<?php echo $email;?>"><?php echo $email;?></a>
	</p>
	<p class="clearfix">
		<span class="admin-side-mbox-label-spn lt-grey-txt float-left"><?php _e('Phone #', 'event_espresso'); ?></span><?php echo $phone;?>
	</p>
	<p class="clearfix">
		<span class="admin-side-mbox-label-spn lt-grey-txt float-left"><?php _e('Address', 'event_espresso'); ?></span>
		<div class="admin-side-mbox-text-dv">
			<?php echo $address;?>
			<?php echo $address2;?>
			<?php echo $city;?>
			<?php echo $state . $country;?>
			<?php echo $zip;?>
		</div>
	</p>
</div>


<p class="contact-details-buttons">
	<a class="button button-small" href="<?php echo $att_edit_link; ?>" title="<?php echo $att_edit_label; ?>">
		<span class="ee-icon ee-icon-user-edit"></span><?php echo $att_edit_label; ?>
	</a>
	<?php if ( !empty( $create_link ) ) : ?>
		<a class="button button-small" href="<?php echo $create_link; ?>" title="<?php _e('This registration shares the contact details for the primary registration in this group.  If you\'d like this registration to have its own details, you can do so by clicking this button', 'event_espresso'); ?>">
			<span class="ee-icon ee-icon-user-add-new"></span><?php echo $create_label; ?>
	</a>
	<?php endif; ?>
	<div style="clear:both"></div>
</p>
