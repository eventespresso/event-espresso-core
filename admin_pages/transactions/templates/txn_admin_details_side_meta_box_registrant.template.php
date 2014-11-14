<div id="admin-side-mbox-primary-registrant-dv" class="admin-side-mbox-dv">
	<p class="clearfix">
		<span class="admin-side-mbox-label-spn lt-grey-txt float-left"><?php _e( 'Name', 'event_espresso' );?></span><?php echo $prime_reg_fname . ' ' . $prime_reg_lname;?>
	</p>
	<p class="clearfix">
		<span class="admin-side-mbox-label-spn lt-grey-txt float-left"><?php _e( 'Email', 'event_espresso' );?></span><a href="mailto:<?php echo $prime_reg_email;?>"><?php echo $prime_reg_email;?></a>
	</p>
	<p class="clearfix">
		<span class="admin-side-mbox-label-spn lt-grey-txt float-left"><?php _e( 'Phone #', 'event_espresso' );?></span><?php echo $prime_reg_phone;?>
	</p>
	<p class="clearfix">
		<span class="admin-side-mbox-label-spn lt-grey-txt float-left"><?php _e( 'Address', 'event_espresso' );?></span>
		<div class="admin-side-mbox-text-dv">
			<?php echo $prime_reg_address;?>
			<?php echo $prime_reg_address2;?>
			<?php echo $prime_reg_city;?>
			<?php echo $prime_reg_state . $prime_reg_country;?>
			<?php echo $prime_reg_zip;?>
		</div>
	</p>
</div>


<p style="text-align:right;">
	<?php $att_link = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'edit_attendee', 'post'=>$ATT_ID ), REG_ADMIN_URL ); ?>
	<a class="button button-small" href="<?php echo $att_link; ?>" title="<?php _e( 'View details for this contact.', 'event_espresso' );?>">
		<span class="ee-icon ee-icon-user-edit"></span><?php _e('View / Edit this Contact', 'event_espresso'); ?>
	</a>
</p>
