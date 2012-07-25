	<div id="admin-side-mbox-billing-info-dv" class="admin-side-mbox-dv">
<?php if ( $free_event ) : ?>
		<div class="clearfix">
			<?php _e( 'Free Event', 'event_espresso' );?><br/>
			- <?php echo $free_event;?>			
		</div>
<?php else : ?>	
	
		<div class="clearfix">
			<span class="admin-side-mbox-label-spn lt-grey-txt float-left"><?php echo $fname['label'];?></span><?php echo $fname['value'];?>
		</div>
		<div class="clearfix">
			<span class="admin-side-mbox-label-spn lt-grey-txt float-left"><?php echo $lname['label'];?></span><?php echo $lname['value'];?>
		</div>
		<div class="clearfix">
			<span class="admin-side-mbox-label-spn lt-grey-txt float-left"><?php echo $email['label'];?></span><a href="mailto:<?php echo $email['value'];?>"><?php echo $email['value'];?></a>
		</div>
		<div class="clearfix">
			<span class="admin-side-mbox-label-spn lt-grey-txt float-left"><?php echo $address['label'];?></span>
			<div class="admin-side-mbox-text-dv">
				<?php echo $address['value'];?>
			</div>
		</div>
		<div class="clearfix">
			<span class="admin-side-mbox-label-spn lt-grey-txt float-left"><?php echo $city['label'];?></span><?php echo $city['value'];?>
		</div>
		<div class="clearfix">
			<span class="admin-side-mbox-label-spn lt-grey-txt float-left"><?php echo $state['label'];?></span><?php echo $state['value'];?>
		</div>
		<div class="clearfix">
			<span class="admin-side-mbox-label-spn lt-grey-txt float-left"><?php echo $country['label'];?></span><?php echo $country['value'];?>
		</div>
		<div class="clearfix">
			<span class="admin-side-mbox-label-spn lt-grey-txt float-left"><?php echo $zip['label'];?></span><?php echo $zip['value'];?>
		</div>
		<br/>
		
	<?php if ( $credit_card_info ) : ?>
		<div class="clearfix">
			<span class="admin-side-mbox-label-spn lt-grey-txt float-left"><?php echo $card_nmbr['label'];?></span><?php echo $card_nmbr['value'];?>
		</div>
		<div class="clearfix">
			<span class="admin-side-mbox-label-spn lt-grey-txt float-left"><?php echo $card_exp_date['label'];?></span><?php echo $card_exp_date['value'];?>
		</div>
		<div class="clearfix">
			<span class="admin-side-mbox-label-spn lt-grey-txt float-left"><?php echo $card_ccv_code['label'];?></span><?php echo $card_ccv_code['value'];?>
		</div>
	<?php endif; ?>	

<?php endif; ?>	

	</div>

