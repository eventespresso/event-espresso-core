<div id="admin-side-mbox-primary-registrant-dv" class="admin-side-mbox-dv">
	<p class="clearfix">
		<span class="admin-side-mbox-label-spn lt-grey-txt float-left">Name</span><?php echo $fname . ' ' . $lname;?>
	</p>
	<p class="clearfix">
		<span class="admin-side-mbox-label-spn lt-grey-txt float-left">Email</span><a href="mailto:<?php echo $email;?>"><?php echo $email;?></a>
	</p>
	<p class="clearfix">
		<span class="admin-side-mbox-label-spn lt-grey-txt float-left">Phone #</span><?php echo $phone;?>
	</p>
	<p class="clearfix">
		<span class="admin-side-mbox-label-spn lt-grey-txt float-left">Address</span>
		<div class="admin-side-mbox-text-dv">
			<?php echo $address;?>
			<?php echo $address2;?>
			<?php echo $city;?>
			<?php echo $state . $country;?>
			<?php echo $zip;?>
		</div>
	</p>
	<p class="clearfix">
		<span class="admin-side-mbox-label-full-spn lt-grey-txt">Social Networking Contacts</span>&nbsp;
		<div class="admin-side-mbox-text-dv">
			<?php echo $social;?>
		</div>
	</p>
	<p class="clearfix">
		<span class="admin-side-mbox-label-full-spn lt-grey-txt">Attendee Comments</span>&nbsp;
		<div class="admin-side-mbox-text-dv">
			<?php echo $comments;?>
		</div>
	</p>
	<p class="clearfix">
		<span class="admin-side-mbox-label-spn lt-grey-txt float-left">Admin Notes</span>&nbsp;
		<div class="admin-side-mbox-text-dv">
			<?php echo $notes;?>
		</div>
	</p>
</div>

