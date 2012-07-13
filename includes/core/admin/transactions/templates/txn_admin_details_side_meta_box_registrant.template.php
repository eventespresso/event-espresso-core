<div id="admin-side-mbox-primary-registrant-dv" class="admin-side-mbox-dv">
	<p class="clearfix">
		<span class="admin-side-mbox-label-spn lt-grey-txt float-left">Name</span><?php echo $prime_reg_fname . ' ' . $prime_reg_lname;?>
	</p>
	<p class="clearfix">
		<span class="admin-side-mbox-label-spn lt-grey-txt float-left">Email</span><a href="mailto:<?php echo $prime_reg_email;?>"><?php echo $prime_reg_email;?></a>
	</p>
	<p class="clearfix">
		<span class="admin-side-mbox-label-spn lt-grey-txt float-left">Phone #</span><?php echo $prime_reg_phone;?>
	</p>
	<p class="clearfix">
		<span class="admin-side-mbox-label-spn lt-grey-txt float-left">Address</span>
		<div class="admin-side-mbox-text-dv">
			<?php echo $prime_reg_address;?>
			<?php echo $prime_reg_address2;?>
			<?php echo $prime_reg_city;?>
			<?php echo $prime_reg_state . $prime_reg_country;?>
			<?php echo $prime_reg_zip;?>
		</div>
	</p>
	<p class="clearfix">
		<span class="admin-side-mbox-label-full-spn lt-grey-txt">Social Networking Contacts</span>&nbsp;
		<div class="admin-side-mbox-text-dv">
			<?php echo $prime_reg_social;?>
		</div>
	</p>
	<p class="clearfix">
		<span class="admin-side-mbox-label-full-spn lt-grey-txt">Attendee Comments</span>&nbsp;
		<div class="admin-side-mbox-text-dv">
			<?php echo $prime_reg_comments;?>
		</div>
	</p>
	<p class="clearfix">
		<span class="admin-side-mbox-label-spn lt-grey-txt float-left">Admin Notes</span>&nbsp;
		<div class="admin-side-mbox-text-dv">
			<?php echo $prime_reg_notes;?>
		</div>
	</p>
</div>

