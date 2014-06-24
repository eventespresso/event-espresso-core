<div id="admin-primary-mbox-reg-details-dv" class="admin-primary-mbox-dv">

	<?php echo $view_transaction_button; ?>
	<?php echo $resend_registration_button; ?>
	<br/>

	<h4 class="admin-primary-mbox-h4 hdr-has-icon"><span class="dashicons dashicons-clipboard"></span><?php _e( 'Registration Items', 'event_espresso' );?></h4>

	<div class="admin-primary-mbox-tbl-wrap">
		<table class="admin-primary-mbox-tbl">
			<thead>
				<tr>
					<th class="jst-left"><?php _e( 'Line Item ID', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'Event Name', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'Event Date', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'Ticket Option', 'event_espresso' );?></th>
					<th class="jst-cntr"><?php _e( 'Price', 'event_espresso' );?></th>
					<th class="jst-cntr"><?php _e( 'Qty', 'event_espresso' );?></th>
					<th class="jst-cntr"><?php _e( 'Line Total', 'event_espresso' );?></th>
				</tr>
			</thead>
			<tbody>
		<?php foreach ( $line_items as $item ) :
?>
			<tr>
				<td class="jst-left"><?php echo $item->get('LIN_code');?></td>
				<td class="jst-left"><?php echo $item->ticket_event_name();?></td>
				<td class="jst-left"><?php echo $item->ticket_datetime_start('Y-m-d','h:i a'); ?></td>
				<td class="jst-left"><?php echo $item->get('LIN_name');?></td>
				<td class="jst-rght"><?php echo EEH_Template::format_currency( $item->get('LIN_unit_price') );?></td>
				<td class="jst-rght"><?php echo $item->get('LIN_quantity');?></td>
				<td class="jst-rght"><?php echo EEH_Template::format_currency($item->get('LIN_total'));?></td>
			</tr>
		<?php endforeach; // $items?>
		<?php if ( $taxes ) : ?>
			<?php foreach ( $taxes as $tax ) : ?>
				<tr>
					<th class=" jst-rght" colspan="6"><?php echo $tax->get('LIN_name');?> (<?php echo $tax->get_pretty('LIN_percent'); ?>%)</th>
					<th class=" jst-rght"><?php echo EEH_Template::format_currency( $tax->get('LIN_total'));?></th>
				</tr>
			<?php endforeach; // $taxes?>
		<?php endif; // $taxes?>
				<tr class="admin-primary-mbox-total-tr">
					<th class=" jst-rght" colspan="6"><?php _e( 'Grand Total', 'event_espresso' );?></th>
					<th class=" jst-rght"><?php echo $grand_total; ?></th>
				</tr>
			</tbody>
		</table>
	</div>

	<a id="display-additional-registration-session-info" class="display-the-hidden smaller-text" rel="additional-registration-session-info">
		<span class="dashicons dashicons-plus-alt"></span><?php _e( 'view additional registration session details', 'event_espresso' );?>
	</a>

	<div id="additional-registration-session-info-dv" class="hidden">

		<a id="hide-additional-registration-session-info" class="hide-the-displayed hidden smaller-text" rel="additional-registration-session-info">
			<span class="dashicons dashicons-dismiss"></span><?php _e( 'hide additional registration session details', 'event_espresso' );?>
		</a>
	<br class="clear"/>

		<h4 class="admin-primary-mbox-h4"><?php _e( 'Registration Session Details', 'event_espresso' );?></h4>

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
		<?php
		//printr( $full_session, 'full_session', 'auto' );
		?>
	</div>

	<br class="clear"/>

</div>
