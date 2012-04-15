<div id="admin-primary-mbox-dv" class="admin-primary-mbox-dv">
	
	<h4 class="admin-primary-mbox-h4"><?php _e( 'Payment Details', 'event_espresso' );?></h4>

	<table id="admin-primary-mbox-txn-session-info-tbl" class="form-table skinny-rows">
		<tbody>
			<tr>
				<th><?php echo $method['label'];?> : </th><td><?php echo $method['value'];?></td>
			</tr>
			<tr>
				<th><?php echo $gateway_response_msg['label'];?> : </th><td><?php echo $gateway_response_msg['value'];?></td>
			</tr>
		</tbody>
	</table>	
	
	<h4 class="admin-primary-mbox-h4"><?php _e( 'Transaction Items', 'event_espresso' );?></h4>

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
		<?php foreach ( $taxes as $tax ) : ?>
				<tr>
					<th class=" jst-rght" colspan="6"><?php echo $tax['name'];?></th>
					<th class=" jst-rght"><?php echo $currency_sign . ' ' . number_format( $tax['amount'], 2 );?></th>
				</tr>
		<?php endforeach; // $taxes?>
				<tr class="admin-primary-mbox-total-tr">
					<th class=" jst-rght" colspan="6"><?php _e( 'Grand Total', 'event_espresso' );?></th>
					<th class=" jst-rght"><?php echo $currency_sign . ' ' . number_format( $grand_total, 2 );?></th>
				</tr>
			</tbody>	
		</table>
	</div>	



	<a id="display-additional-transaction-session-info" class="display-the-hidden" rel="additional-transaction-session-info">
		view additional transaction session details<img src="../../../../images/icons/additional_info-10x10.png" alt="" />
	</a>

	<div id="additional-transaction-session-info-dv" class="hidden">

		<a id="hide-additional-transaction-session-info" class="hide-the-displayed hidden" rel="additional-transaction-session-info">
			hide additional transaction session details<img src="../../../../images/icons/close_additional_info-10x10.png" alt="" />
		</a>
	<br class="clear"/>	
		
		<h4 class="admin-primary-mbox-h4"><?php _e( 'Transaction Session Details', 'event_espresso' );?></h4>

		<table id="admin-primary-mbox-txn-extra-session-info-tbl" class="form-table skinny-rows">
			<tbody>
			<?php foreach ( $txn_details as $key => $txn_detail ) : ?>
				<tr>
					<th>
						<label for="<?php echo $key;?>"><?php echo $txn_detail['label'];?></label>
					</th>
					<td>
						<?php echo $txn_detail['value'];?>
					</td>
				</tr>
			<?php endforeach; // $txn_details?>
			</tbody>
		</table>	
	</div>
	

	<br class="clear"/>
	
</div>
	