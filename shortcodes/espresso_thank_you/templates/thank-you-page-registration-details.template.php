<h3 class="ee-registration-details-h3"><?php _e('Registration  Details:', 'event_espresso'); ?></h3>
<?php  do_action( 'AHEE__thank_you_page_registration_details_template__after_heading' ); ?>

<div class="ee-registration-details-dv">
<?php
$reg_cntr = 0;
$event_name = '';

foreach ( $transaction->registrations() as $registration ) {
	if ( $registration instanceof EE_Registration ) {
		$reg_cntr++;
		if ( $event_name != $registration->event_name() ) {
			$event_name = $registration->event_name();
	?>
	<h5>
		<span class="smaller-text grey-text"><?php _e('for','event_espresso');?>: </span> <?php echo htmlentities( $registration->event_name(), ENT_QUOTES, 'UTF-8' );?>
	</h5>
	<table class='ee-table ee-registrations-list'>
		<thead>
			<tr>
				<th width="35%">
					<?php _e("Registrant Name",'event_espresso')?>
				</th>
				<th width="30%" class="jst-left">
					<?php _e("REG Code",'event_espresso');?>
				</th>
				<th width="35%" class="jst-left">
					<?php _e("REG Status",'event_espresso');?>
				</th>
			</tr>
		</thead>
		<tbody>
	<?php } ?>
	<?php if ( $is_primary || ( ! $is_primary && $reg_url_link == $registration->reg_url_link() )) { ?>
			<tr>
				<td width="35%">
				<?php
					if ( $registration->attendee() instanceof EE_Attendee ) {
						echo $registration->attendee()->full_name( TRUE );
					}
					echo '<span class="small-text jst-rght"><a class="ee-icon-only-lnk" href="' .  $registration->edit_attendee_information_url() . '" title="' . __('Click here to edit Attendee Information', 'event_espresso') . '"><span class="ee-icon ee-icon-user-edit"></span></a></span>';
					echo '<span class="small-text jst-rght"><a class="ee-resend-reg-confirmation-email ee-icon-only-lnk" href="' .  $resend_reg_confirmation_url . '" title="' . __('Click here to resend the Registration Confirmation email', 'event_espresso') . '" rel="' . $registration->reg_url_link() . '"><span class="ee-icon ee-icon-email-send"></span></a></span>';


				?>
				</td>
				<td width="30%" class="jst-left">
					<?php $registration->e('REG_code') ?>
				</td>
				<td width="35%" class="jst-left">
					<?php $registration->e_pretty_status( TRUE )?>
				</td>
			</tr>
            <?php  do_action( 'AHEE__thank_you_page_registration_details_template__after_registration_table_row', $registration ); ?>
        <?php } ?>
        <?php if (( $event_name != $registration->event_name() && $event_name != '' ) || $reg_cntr >= count( $transaction->registrations() )) {  ?>
		</tbody>
	</table>
	<?php
		}
	}
}
?>
<?php if ( $is_primary && $SPCO_attendee_information_url ) { ?>
	<p class="small-text jst-rght">
		<span><a href='<?php echo $SPCO_attendee_information_url?>'><?php _e("Click here to edit All Attendee Information", 'event_espresso'); ?></a></span>
	</p>
<?php } ?>

    <?php  do_action( 'AHEE__thank_you_page_registration_details_template__after_registration_details' ); ?>

</div>
<!-- end of .registration-details -->