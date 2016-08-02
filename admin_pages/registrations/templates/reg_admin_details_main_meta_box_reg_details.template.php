<div id="admin-primary-mbox-reg-details-dv" class="admin-primary-mbox-dv">

	<?php do_action( 'AHEE__reg_admin_details_main_meta_box_reg_details__top', $REG_ID ); ?>
	<?php echo $resend_registration_button; ?>
	<?php echo $view_transaction_button; ?>
	<br/>

	<h3 class="admin-primary-mbox-h4 hdr-has-icon"><span class="dashicons dashicons-clipboard"></span><?php _e( 'Registration Items', 'event_espresso' );?></h3>

	<?php echo $line_item_table; ?>

	<?php
	if ( WP_DEBUG ) {
		$delivered_messages = get_option( 'EED_Messages__maybe_registration', array() );
		if ( isset( $delivered_messages[ $REG_ID ] )) {
	?>
	<h4 class="admin-primary-mbox-h4 hdr-has-icon"><span class="dashicons dashicons-email-alt"></span><?php _e( 'Messages Sent to Registrant', 'event_espresso' );?></h4>

	<div class="admin-primary-mbox-tbl-wrap">
		<table class="admin-primary-mbox-tbl">
			<thead>
				<tr>
					<th class="jst-left"><?php _e( 'Date & Time', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'Message Type', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'REG Status Upon Sending', 'event_espresso' );?></th>
				</tr>
			</thead>
			<tbody>
				<?php foreach ( $delivered_messages[ $REG_ID ] as $timestamp => $delivered_message ) :
					?>
					<tr>
						<td class="jst-left"><?php echo gmdate( get_option('date_format') . ' ' . get_option('time_format'), ( $timestamp + ( get_option( 'gmt_offset' ) * HOUR_IN_SECONDS ) ) );?></td>
						<td class="jst-left"><?php echo isset( $delivered_message['message_type'] ) ? $delivered_message['message_type'] : '';?></td>
						<td class="jst-left"><?php echo isset( $delivered_message['reg_status'] ) ? $delivered_message['reg_status'] : '';?></td>
					</tr>
				<?php endforeach; // $delivered_messages?>
			</tbody>
		</table>
	</div>
	<?php
		}
	}
	?>

	<a id="display-additional-registration-session-info" class="display-the-hidden smaller-text" rel="additional-registration-session-info">
		<span class="dashicons dashicons-plus-alt"></span><?php _e( 'view additional registration session details', 'event_espresso' );?>
	</a>

	<div id="additional-registration-session-info-dv" class="hidden">

		<a id="hide-additional-registration-session-info" class="hide-the-displayed hidden smaller-text" rel="additional-registration-session-info">
			<span class="dashicons dashicons-dismiss"></span><?php _e( 'hide additional registration session details', 'event_espresso' );?>
		</a>
	<br class="clear"/>

		<h3 class="admin-primary-mbox-h4"><?php _e( 'Registration Session Details', 'event_espresso' );?></h3>

		<table id="admin-primary-mbox-reg-extra-session-info-tbl" class="form-table skinny-rows">
			<tbody>
			<?php foreach ( $reg_details as $key => $reg_detail ) : ?>
				<tr>
					<th>
						<label for="<?php echo $key;?>"><?php echo $reg_detail['label'];?></label>
					</th>
					<td>
						<?php echo $reg_detail['value'];?>
					</td>
				</tr>
			<?php endforeach; // $reg_details?>
			</tbody>
		</table>
	</div>

	<br class="clear"/>

</div>
