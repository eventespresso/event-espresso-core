<div id="admin-primary-mbox-dv" class="admin-primary-mbox-dv">
	
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
		<?php if ( $taxes ) : ?>
			<?php foreach ( $taxes as $tax ) : ?>
				<tr>
					<th class=" jst-rght" colspan="6"><?php echo $tax['name'];?></th>
					<th class=" jst-rght"><?php echo $currency_sign . ' ' . number_format( $tax['amount'], 2 );?></th>
				</tr>
			<?php endforeach; // $taxes?>
		<?php endif; // $taxes?>
				<tr class="admin-primary-mbox-total-tr">
					<th class=" jst-rght" colspan="6"><?php _e( 'Transaction Total', 'event_espresso' );?></th>
					<th class=" jst-rght"><?php echo $currency_sign . ' ' . number_format( $grand_total, 2 );?></th>
				</tr>
			</tbody>	
		</table>
	</div>	


	<a id="display-additional-transaction-session-info" class="display-the-hidden" rel="additional-transaction-session-info">
		<?php _e( 'view additional transaction session details', 'event_espresso' );?>
	</a>

	<div id="additional-transaction-session-info-dv" class="hidden">

		<a id="hide-additional-transaction-session-info" class="hide-the-displayed hidden" rel="additional-transaction-session-info">
			<?php _e( 'hide additional transaction session details', 'event_espresso' );?>
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
	

	<?php if ( $grand_total > 0 ) : ?>

	<h4 class="admin-primary-mbox-h4"><?php _e( 'Payment Details', 'event_espresso' );?></h4>

	<div class="admin-primary-mbox-tbl-wrap">
		<table class="admin-primary-mbox-tbl">
			<thead>
				<tr>
					<th class="jst-cntr"><?php _e( '', 'event_espresso' );?></th>
					<th class="jst-cntr"><?php _e( 'ID', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'Date', 'event_espresso' );?></th>
					<th class="jst-cntr"><?php _e( 'Method', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'Gateway', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'Gateway Response', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'Gateway TXN ID', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'For Your Accounting', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'Details', 'event_espresso' );?></th>
					<th class="jst-cntr"><?php _e( 'Amount', 'event_espresso' );?></th>
				</tr>
			</thead>
			<tbody>
		<?php if ( $payments ) : ?>
			<?php foreach ( $payments as $PAY_ID => $payment ) : ?>
				<tr>
					<td class=" jst-rght"><a class="txn-admin-edit-payment-lnk" href="<?php echo $edit_payment_url;?>&amp;id=<?php echo $PAY_ID;?>" title="<?php _e( 'Edit Payment', 'event_espresso' );?>"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL;?>images/icons/edit.png" alt="" /></a>
					</td>
					<td class=" jst-rght"><?php echo $PAY_ID;?></td>
					<td class=" jst-left"><?php echo $payment->timestamp();?></td>
					<td class=" jst-cntr"><?php echo $payment->method();?></td>
					<td class=" jst-left"><?php echo $payment->gateway();?></td>
					<td class=" jst-left"><?php echo $payment->gateway_response();?></td>
					<td class=" jst-left"><?php echo $payment->gateway_txn_id();?></td>
					<td class=" jst-left"><?php echo $payment->extra_accntng();?></td>
					<td class=" jst-left">
						<div id="payment-details-<?php echo $PAY_ID;?>" class="hidden"><?php echo $payment->details();?></div>
					</td>				
					<td class=" jst-rght"><?php echo $currency_sign . ' ' . number_format( $payment->amount(), 2 );?></td>
				</tr>
			<?php endforeach; // $payment?>
		<?php else : ?>
				<tr>
					<td class=" jst-left" colspan="10"><?php _e( 'No payments have been applied to this transaction yet. Click "Apply Payment" below to do so.', 'event_espresso' ); ?></td>
				</tr>		
		<?php endif; // $payments?>
			</tbody>	
		</table>
	</div>	
	
	<ul id="txn-admin-payment-options-ul">
		<li>
			<a id="display-txn-admin-apply-payment" class="button-primary display-the-hidden no-icon no-hide" rel="txn-admin-apply-payment" >
				<?php _e( 'Apply Payment', 'event_espresso' );?>
			</a>
		</li>
		<li>
			<a id="txn-admin-apply-refund-lnk" class="button-secondary display-the-hidden no-icon no-hide" rel="txn-admin-apply-refund" >
				<?php _e( 'Apply Refund', 'event_espresso' );?>
			</a>
		</li>
	</ul>	
	<br class="clear"/>
	
	<div id="txn-admin-apply-payment-dv" class="hidden">
		<h4 class="admin-primary-mbox-h4"><?php _e( 'Apply a Payment to this Transaction', 'event_espresso' );?></h4>
		<form name="txn-admin-apply-payment-frm">
			<!--<div class="admin-primary-mbox-tbl-wrap">-->
				<table class="admin-primary-mbox-tbl borderless">
					<thead>
						<tr>
							<th class="jst-left"><label for="txn-admin-payment-date-inp"><?php _e( 'Payment Date', 'event_espresso' );?></label></th>
							<th class="jst-left"><label for="txn-admin-payment-method-inp"><?php _e( 'Method of Payment', 'event_espresso' );?></label></th>
							<th class="jst-left"><label for="txn-admin-payment-gateway-inp"><?php _e( 'Gateway', 'event_espresso' );?></label></th>
							<th class="jst-left"><label for="txn-admin-payment-gateway-response-inp"><?php _e( 'Gateway Response', 'event_espresso' );?></label></th>
							<th class="jst-left"><label for="txn-admin-payment-gateway-txn-id-inp"><?php _e( 'Gateway TXN ID', 'event_espresso' );?></label></th>
						</tr>
					</thead>
					<tbody>								
						<tr>
							<td class="jst-left">
								<input name="txn-filter-start-date" id="txn-admin-payment-method-inp" class="datepicker hasDatepicker" type="text" value="<?php echo date( 'F j, Y g:i a' ); ?>">
							</td>
							<td class="jst-left">
								<select name="txn_admin_payment[method]" id="txn-admin-payment-method-slct" type="text" >
								<?php foreach ( $payment_methods as $method_ID => $method ) : ?>
									<option value="<?php echo $method_ID; ?>"><?php echo $method; ?>&nbsp;&nbsp;</option>		
								<?php endforeach; ?>
								</select>
							</td>
							<td class="jst-left">
								<select name="txn_admin_payment[gateway]" id="txn-admin-payment-method-slct" type="text" >
								<?php foreach ( $active_gateways as $gateway_ID => $gateway_name ) : ?>
									<option value="<?php echo $gateway_ID; ?>"><?php echo $gateway_name; ?>&nbsp;&nbsp;</option>		
								<?php endforeach; ?>
									<option value="NULL"><?php _e( 'not applicable', 'event_espresso' );?>&nbsp;&nbsp;</option>
								</select>
							</td>
							<td class="jst-left">
								<input id="txn-admin-payment-gateway-response-inp" name="txn_admin_payment[gateway_response]" type="text" />
							</td>
							<td class="jst-left">
								<input id="txn-admin-payment-gateway-response-inp" name="txn_admin_payment[gateway_response]" type="text" />
							</td>
						</tr>								
					</tbody>	
				</table>
			<!--</div>	-->
		</form>
	</div>
	
	<div id="txn-admin-apply-refund-dv" class="hidden">
		<h4 class="admin-primary-mbox-h4"><?php _e( 'Apply a Refund to this Transaction', 'event_espresso' );?></h4>
	</div>

	<?php endif; // $grand_total > 0?>
	
</div>
	