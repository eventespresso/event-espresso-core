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
	<p class="clearfix">
		<span class="admin-side-mbox-label-full-spn lt-grey-txt"><?php _e('Social Networking Contacts', 'event_espresso'); ?></span>&nbsp;
		<div class="admin-side-mbox-text-dv">
			<?php echo $social;?>
		</div>
	</p>
	<p class="clearfix">
		<span class="admin-side-mbox-label-full-spn lt-grey-txt"><?php _e('Attendee Comments', 'event_espresso'); ?></span>&nbsp;
		<div class="admin-side-mbox-text-dv">
			<?php echo $comments;?>
		</div>
	</p>
	<p class="clearfix">
		<span class="admin-side-mbox-label-spn lt-grey-txt float-left"><?php _e('Admin Notes', 'event_espresso'); ?></span>&nbsp;
		<div class="admin-side-mbox-text-dv">
			<?php echo $notes;?>
		</div>
	</p>
</div>


<p style="text-align:right;">
	<?php $att_link = wp_nonce_url( add_query_arg( array( 'action'=>'edit_attendee', 'id'=>$ATT_ID ), REG_ADMIN_URL ), 'edit_attendee_nonce' ); ?>
	<a href="<?php echo $att_link; ?>" title="<?php _e( 'View details for this attendee', 'event_espresso' );?>">
		<?php _e('View / Edit this Attendee', 'event_espresso'); ?>
	</a>
</p>