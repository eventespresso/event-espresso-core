<div id="admin-primary-mbox-dv" class="admin-primary-mbox-dv">
	
	<h4 class="admin-primary-mbox-h4"><?php _e( 'Payment Details', 'event_espresso' );?></h4>

	<table id="admin-primary-mbox-reg-session-info-tbl" class="form-table skinny-rows">
		<tbody>
			<tr>
				<th><?php echo $method['label'];?> : </th><td><?php echo $method['value'];?></td>
			</tr>
			<tr>
				<th><?php echo $gateway_response_msg['label'];?> : </th><td><?php echo $gateway_response_msg['value'];?></td>
			</tr>
		</tbody>
	</table>	
	
	<h4 class="admin-primary-mbox-h4"><?php _e( 'Registration Items', 'event_espresso' );?></h4>

	<div class="admin-primary-mbox-tbl-wrap">
		<table class="admin-primary-mbox-tbl">
			<thead>
				<tr>
					<th class="jst-left"><?php _e( 'Line Item ID', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'Event Name', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'Event Date', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'Ticket Option', 'event_espresso' );?></th>
					<th class="jst-cntr"><?php _e( 'Price Paid', 'event_espresso' );?></th>
					<th class="jst-cntr"><?php _e( 'Qty', 'event_espresso' );?></th>
					<th class="jst-cntr"><?php _e( 'Line Total', 'event_espresso' );?></th>
				</tr>
			</thead>
			<tbody>
		<?php foreach ( $items as $item ) : ?>
			<tr>
				<td class="jst-left"><?php echo $item['line_item'];?></td>
				<td class="jst-left"><?php echo $item['name'];?></td>
				<td class="jst-left"><?php echo date( 'D M j, Y', $item['date'] ) . ',    ' . date( 'g:i a', $item['time'] );?></td>
				<td class="jst-left"><?php echo $item['price_desc'];?></td>
				<td class="jst-rght"><?php echo $currency_sign . ' ' . number_format( $item['price'], 2 );?></td>
				<td class="jst-rght"><?php echo $item['qty'];?></td>
				<td class="jst-rght"><?php echo $currency_sign . ' ' . number_format( $item['line_total'], 2 );?></td>
			</tr>
		<?php endforeach; // $items?>
		<?php if ( $taxes ) : ?>
			<?php foreach ( $taxes as $tax ) : ?>
				<tr>
					<th class=" jst-rght" colspan="6"><?php echo $tax['name'];?></th>
					<th class=" jst-rght"><?php echo $currency_sign . ' ' . number_format( $tax['amount'], 2 );?></th>
				</tr>
			<?php endforeach; // $taxes?>
		<?php endif; // $taxes?>
				<tr class="admin-primary-mbox-total-tr">
					<th class=" jst-rght" colspan="6"><?php _e( 'Grand Total', 'event_espresso' );?></th>
					<th class=" jst-rght"><?php echo $currency_sign . ' ' . number_format( $grand_total, 2 );?></th>
				</tr>
			</tbody>	
		</table>
	</div>	



	<a id="display-additional-registration-session-info" class="display-the-hidden" rel="additional-registration-session-info">
		<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL; ?>images/icons/additional_info-10x10.png" alt="" />
		<?php _e( 'view additional registration session details', 'event_espresso' );?>
	</a>

	<div id="additional-registration-session-info-dv" class="hidden">

		<a id="hide-additional-registration-session-info" class="hide-the-displayed hidden" rel="additional-registration-session-info">
			<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL; ?>images/icons/close_additional_info-10x10.png" alt="" />
			<?php _e( 'hide additional registration session details', 'event_espresso' );?>			
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
	</div>
	

	<br class="clear"/>
	
</div>
	