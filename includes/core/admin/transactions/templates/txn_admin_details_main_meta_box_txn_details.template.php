<div id="admin-primary-mbox-dv" class="admin-primary-mbox-dv">
	
	<h4 class="admin-primary-mbox-h4 hdr-has-icon">
		<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL;?>images/icons/invoice-1-16x16.png" alt="" /><?php _e( 'Transaction Items', 'event_espresso' );?>
	</h4>

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
				<tr class="admin-primary-mbox-taxes-tr">
					<th class=" jst-rght" colspan="6"><?php echo $tax['name'];?></th>
					<th class=" jst-rght"><?php echo $currency_sign . ' ' . number_format( $tax['amount'], 2 );?></th>
				</tr>
			<?php endforeach; // $taxes?>
		<?php endif; // $taxes?>
				<tr class="admin-primary-mbox-total-tr">
					<th class=" jst-rght" colspan="6"><?php _e( 'Transaction Total', 'event_espresso' );?></th>
					<th class=" jst-rght"><?php echo $currency_sign;?> <span id="txn-admin-grand-total"><?php echo number_format( $grand_total, 2 );?></span></th>
				</tr>
			</tbody>	
		</table>
	</div>	


	<a id="display-additional-transaction-session-info" class="display-the-hidden" rel="additional-transaction-session-info">
		<img id="additional-info-img" src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL;?>images/icons/additional_info-10x10.png" alt="" />
		<?php _e( 'view additional transaction session details', 'event_espresso' );?>
	</a>

	<div id="additional-transaction-session-info-dv" class="hidden">

		<a id="hide-additional-transaction-session-info" class="hide-the-displayed hidden" rel="additional-transaction-session-info">
			<img id="close-additional-info-img" src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL;?>images/icons/close_additional_info-10x10.png" alt="" />
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

	<h4 class="admin-primary-mbox-h4 hdr-has-icon">
		<img id="cash-single" src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL;?>images/icons/cash-single-16x16.png" alt="" /><?php _e( 'Payment Details', 'event_espresso' );?>
	</h4>

	<div class="admin-primary-mbox-tbl-wrap">
		<table id="txn-admin-payments-tbl" class="admin-primary-mbox-tbl">
			<thead>
				<tr>
					<th class="jst-cntr"></th>
					<th class="jst-cntr"><?php _e( 'ID', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'Status', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'Date', 'event_espresso' );?></th>
					<th class="jst-cntr"><?php _e( 'Method', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'Gateway', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'Gateway Response', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'TXN ID / CHQ #', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'P.O. / S.O. #', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'Notes / Extra Accounting', 'event_espresso' );?></th>
					<!--<th class="jst-left"><?php _e( 'Details', 'event_espresso' );?></th>-->
					<th class="jst-cntr"><?php _e( 'Amount', 'event_espresso' );?></th>
				</tr>
			</thead>
			<tbody>
		<?php if ( $payments ) : ?>
			<?php $payment_total = 0; ?>
			<?php foreach ( $payments as $PAY_ID => $payment ) : ?>
				<tr id="txn-admin-payment-tr-<?php echo $PAY_ID;?>">
					<td class=" jst-cntr">
						<ul class="txn-overview-actions-ul">
							<li>
								<a class="txn-admin-payment-action-edit-lnk" title="<?php _e( 'Edit Payment', 'event_espresso' );?>" rel="<?php echo $PAY_ID;?>">
									<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL;?>images/icons/edit.png" alt="" width="13" height="13" />
								</a>
							</li>
							<li>
								<a class="txn-admin-payment-action-delete-lnk" title="<?php _e( 'Delete Payment', 'event_espresso' );?>" rel="<?php echo $PAY_ID;?>">
									<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL;?>images/icons/trash-16x16.png" alt="" width="13" height="13" />
								</a>
							</li>
						</ul>
					</td>
					<td class=" jst-rght">
						<div id="payment-id-<?php echo $PAY_ID;?>"><?php echo $PAY_ID;?></div>
					</td>
					<td class=" jst-left">
						<div id="payment-status-<?php echo $PAY_ID;?>">
							<span class="txn-admin-payment-status-<?php echo $payment->STS_ID();?>"><?php echo $payment_status[ $payment->STS_ID() ];?></span>
							<div id="payment-STS_ID-<?php echo $PAY_ID;?>" class="hidden"><?php echo $payment->STS_ID();?></div>
						</div>
					</td>
					<td class=" jst-left">
						<div id="payment-date-<?php echo $PAY_ID;?>"><?php echo $payment->timestamp('D M j, Y');?></div>
					</td>
					<td class=" jst-cntr">
						<div id="payment-method-<?php echo $PAY_ID;?>"><?php echo strtoupper( $payment->method() );?></div>
					</td>
					<td class=" jst-left">
						<div id="payment-gateway-<?php echo $PAY_ID;?>">
							<?php echo isset( $active_gateways[ $payment->gateway() ] ) ? $active_gateways[ $payment->gateway() ] : '';?>
						</div>
						<div id="payment-gateway-id-<?php echo $PAY_ID;?>" class="hidden"><?php echo $payment->gateway();?></div>
					</td>
					<td class=" jst-left">
						<div id="payment-response-<?php echo $PAY_ID;?>"><?php echo $payment->gateway_response();?></div>
					</td>
					<td class=" jst-left">
						<div id="payment-txn-id-chq-nmbr-<?php echo $PAY_ID;?>"><?php echo $payment->txn_id_chq_nmbr();?></div>
					</td>
					<td class=" jst-left">
						<div id="payment-po-nmbr-<?php echo $PAY_ID;?>"><?php echo $payment->po_number();?></div>
					</td>
					<td class=" jst-left">
						<div id="payment-accntng-<?php echo $PAY_ID;?>"><?php echo $payment->extra_accntng();?></div>
					</td>	
					<td class=" jst-rght">
						<?php $payment_class = $payment->amount() > 0 ? 'txn-admin-payment-status-' . $payment->STS_ID() : 'txn-admin-payment-status-PDC'; ?>
						<span class="<?php echo $payment_class;?>">
							<?php echo $currency_sign; ?>&nbsp;
							<div id="payment-amount-<?php echo $PAY_ID;?>" style="display:inline;">
								<?php echo number_format( $payment->amount(), 2 );?>
							</div>
						</span>
					</td>
				</tr>
			<?php 
				$payment_total += $payment->STS_ID() == 'PAP' ? $payment->amount() : 0; 
			?>
			<?php endforeach; // $payment?>
			<?php 
				$payment_total = number_format( $payment_total, 2 );
				$pay_totals_class = $payment_total > $grand_total ? ' red-text' : '';
				$overpaid = $payment_total > $grand_total ? '<span id="overpaid">' . __( 'This transaction has been overpaid ! ', 'event_espresso' ) . '</span>' : '';
			?>
				<tr id="txn-admin-no-payments-tr" class="admin-primary-mbox-total-tr hidden">
					<td class=" jst-rght" colspan="11">
						<span class="red-text"><?php _e( 'No payments have been applied to this transaction yet. Click "Apply Payment" below to make a payment.', 'event_espresso' ); ?></span>
					</td>
				</tr>
				<tr id="txn-admin-payments-total-tr" class="admin-primary-mbox-total-tr<?php echo $pay_totals_class;?>">
					<th class=" jst-rght" colspan="10"><span id="payments-total-spn"><?php echo $overpaid . __( 'Payments Total', 'event_espresso' );?></span></th>
					<th class=" jst-rght"><?php echo $currency_sign;?> <span id="txn-admin-payment-total"><?php echo number_format( $payment_total, 2 );?></span></th>
				</tr>			
		<?php else : ?>
				<tr id="txn-admin-no-payments-tr" class="admin-primary-mbox-total-tr">
					<td class=" jst-rght" colspan="11">
						<span class="red-text"><?php _e( 'No payments have been applied to this transaction yet. Click "Apply Payment" below to make a payment.', 'event_espresso' ); ?></span>
					</td>
				</tr>
				<tr id="txn-admin-payments-total-tr" class="admin-primary-mbox-total-tr hidden">
					<th class=" jst-rght" colspan="10"><span id="payments-total-spn"><?php echo __( 'Payments Total', 'event_espresso' );?></span></th>
					<th class=" jst-rght"><?php echo $currency_sign;?> <span id="txn-admin-payment-total"></span></th>
				</tr>				
		<?php endif; // $payments?>

				<tr id="txn-admin-payment-empty-row-tr" class="hidden">  
					<td class=" jst-cntr">
						<ul class="txn-overview-actions-ul">
							<li>
								<a class="txn-admin-payment-action-edit-lnk" title="<?php _e( 'Edit Payment', 'event_espresso' );?>" rel="PAY_ID">
									<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL;?>images/icons/edit.png" alt="" width="13" height="13" />
								</a>
							</li>
							<li>
								<a class="txn-admin-payment-action-delete-lnk" title="<?php _e( 'Delete Payment', 'event_espresso' );?>" rel="PAY_ID">
									<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL;?>images/icons/trash-16x16.png" alt="" width="13" height="13" />
								</a>
							</li>
						</ul>
					</td>
					<td class=" jst-rght">
						<div id="payment-id-PAY_ID">PAY_ID</div>
					</td>
					<td class=" jst-left">
						<div id="payment-status-PAY_ID">
							<span class=""></span>
							<div id="payment-STS_ID-PAY_ID" class="hidden"></div>
						</div>
					</td>
					<td class=" jst-left">
						<div id="payment-date-PAY_ID"></div>
					</td>
					<td class=" jst-cntr">
						<div id="payment-method-PAY_ID"></div>
					</td>
					<td class=" jst-left">
						<div id="payment-gateway-PAY_ID">
						</div>
						<div id="payment-gateway-id-PAY_ID" class="hidden"></div>
					</td>
					<td class=" jst-left">
						<div id="payment-response-PAY_ID"></div>
					</td>
					<td class=" jst-left">
						<div id="payment-txn-id-chq-nmbr-PAY_ID"></div>
					</td>
					<td class=" jst-left">
						<div id="payment-po-nmbr-PAY_ID"></div>
					</td>
					<td class=" jst-left">
						<div id="payment-accntng-PAY_ID"></div>
					</td>	
					<td class=" jst-rght">
						<span class="">
							<?php echo $currency_sign; ?>&nbsp;
							<div id="payment-amount-PAY_ID" style="display:inline;">
							</div>
						</span>
					</td>
				</tr>

			</tbody>	
		</table>
	</div>	
	
	<ul id="txn-admin-payment-options-ul">
		<li>
			<a id="display-txn-admin-apply-payment" class="button-primary no-icon no-hide" rel="txn-admin-apply-payment" > <!--display-the-hidden -->
				<?php _e( 'Apply Payment', 'event_espresso' );?>
			</a>
		</li>
		<li>
			<a id="display-txn-admin-apply-refund" class="button-secondary no-icon no-hide" rel="txn-admin-apply-refund" >  <!--display-the-hidden -->
				<?php _e( 'Apply Refund', 'event_espresso' );?>
			</a>
		</li>
	</ul>
	<br class="clear"/>

	<div id="txn-admin-apply-payment-dv" class="txn-admin-payment-option auto-hide hidden">

		<h2 id="admin-modal-dialog-apply-payment-h2" class="admin-modal-dialog-h2 hdr-has-icon hidden">
			<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL;?>images/icons/cash-single-add-24x24.png" alt="" />
			<?php echo __( 'Apply a Payment to Transaction #', 'event_espresso' ) . $txn_nmbr['value'];?>
		</h2>

		<h2 id="admin-modal-dialog-edit-payment-h2" class="admin-modal-dialog-h2 hdr-has-icon hidden">
			<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL;?>images/icons/cash-single-edit-24x24.png" alt="" />
			<?php echo __( 'Edit Payment #', 'event_espresso' ) . '<span></span>' . __( ' for Transaction #', 'event_espresso' ) . $txn_nmbr['value'];?>
		</h2>
		
		<h2 id="admin-modal-dialog-apply-refund-h2" class="admin-modal-dialog-h2 hdr-has-icon hidden">
			<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL;?>images/icons/cash-single-remove-24x24.png" alt="" />
			<?php echo __( 'Apply a Refund to Transaction #', 'event_espresso' ) . $txn_nmbr['value'];?>
		</h2>
		
		<form name="txn-admin-apply-payment-frm" id="txn-admin-apply-payment-frm" action="<?php echo $apply_payment_form_url; ?>">
			<div class="admin-modal-dialog-wrap">
				<div class="admin-modal-dialog-inner">
					
					<?php wp_nonce_field( 'espresso_apply_payment_nonce' ); ?>
					<input  type="hidden" name="espresso_ajax" id="espresso-ajax" value="0"/>
					<input  type="hidden" name="noheader" id="txn-admin-noheader-inp" value="0"/>
					<input  type="hidden" name="txn_admin_payment[PAY_ID]" id="txn-admin-payment-payment-id-inp" class="txn-admin-apply-payment-inp" value="0"/>
					<input  type="hidden" name="txn_admin_payment[TXN_ID]" id="txn-admin-payment-txn-id-inp" value="<?php echo $txn_nmbr['value']; ?>"/>
					<input  type="hidden" name="txn_admin_payment[type]" id="txn-admin-payment-type-inp" value="1"/>
					<input  type="hidden" name="txn_admin_payment[details]" id="txn-admin-payment-details-inp" value=""/>
					<input  type="hidden" name="txn_admin_delete_payment_form_url" id="txn-admin-delete-payment-form-url-inp" value="<?php echo $delete_payment_form_url; ?>"/>
					<input  type="hidden" name="txn_admin_todays_date" id="txn-admin-todays-date-inp" value="<?php echo date('m/d/Y'); ?>"/>

					<div class="txn-admin-apply-payment-date-dv admin-modal-dialog-row">
						<div class="validation-notice-dv"><?php _e( 'The following is  a required field', 'event_espresso' );?></div>
						<label for="txn-admin-payment-date-inp" class="float-left"><?php _e( 'Payment Date', 'event_espresso' );?></label>
						<input name="txn_admin_payment[date]" id="txn-admin-payment-date-inp" class="txn-admin-apply-payment-inp datepicker required" type="text" value="<?php echo date( 'F j, Y g:i a' ); ?>">
						<br/>
						<span class="description"><?php _e( 'The date the payment was actually made on', 'event_espresso' );?></span>
					</div>
					
					<div class="txn-admin-apply-payment-amount-dv admin-modal-dialog-row">
						<div class="validation-notice-dv"><?php _e( 'The following is  a required field', 'event_espresso' );?></div>
						<label for="txn-admin-payment-amount-inp" class="float-left"><?php _e( 'Amount', 'event_espresso' );?></label>
						<input name="txn_admin_payment[amount]" id="txn-admin-payment-amount-inp" class="txn-admin-apply-payment-inp required" type="text" value="">
						<br/>
						<span class="description"><?php _e( 'The amount of the payment', 'event_espresso' );?></span>
					</div>
					
					<div class="txn-admin-apply-payment-method-dv admin-modal-dialog-row">
						<div class="validation-notice-dv"><?php _e( 'The following is  a required field', 'event_espresso' );?></div>
						<label for="txn-admin-payment-method-inp" class="float-left"><?php _e( 'Method of Payment', 'event_espresso' );?></label>
						<select name="txn_admin_payment[method]" id="txn-admin-payment-method-slct" class="txn-admin-apply-payment-slct required" type="text" >
							<option value="0" selected="selected"><?php _e( 'please select an option', 'event_espresso' );?>&nbsp;&nbsp;</option>
						<?php foreach ( $payment_methods as $method_ID => $method ) : ?>
							<option id="payment-method-opt-<?php echo $method_ID; ?>" value="<?php echo $method_ID; ?>"><?php echo $method; ?>&nbsp;&nbsp;</option>		
						<?php endforeach; ?>
						</select>
						<br/>
						<span class="description"><?php _e( 'Whether the payment was made via PayPal, Credit Card, Cheque, or Cash', 'event_espresso' );?></span>
					</div>
					
					<div class="mop-CC mop hidden">
						<div class="txn-admin-apply-payment-gateway admin-modal-dialog-row">
							<label for="txn-admin-payment-gateway-inp" class="float-left"><?php _e( 'Gateway', 'event_espresso' );?></label>
							<select name="txn_admin_payment[gateway]" id="txn-admin-payment-gateway-slct" class="txn-admin-apply-payment-slct" type="text" >
								<option value="0" selected="selected"><?php _e( 'please select an option', 'event_espresso' );?>&nbsp;&nbsp;</option>
							<?php foreach ( $active_gateways as $gateway_ID => $gateway_name ) : ?>
								<option id="payment-gateway-opt-<?php echo $gateway_ID; ?>" value="<?php echo $gateway_ID; ?>"><?php echo $gateway_name; ?>&nbsp;&nbsp;</option>		
							<?php endforeach; ?>
							</select>
							<br/>
							<span class="description"><?php _e( 'The gateway used to process the payment', 'event_espresso' );?></span>
						</div>
					</div>
					
					<div class="mop-PP mop-CC mop-CHQ mop hidden">
						<div class="txn-admin-apply-payment-gw-txn-id-dv admin-modal-dialog-row">
							<label for="txn-admin-payment-txn-id-inp" class="float-left"><?php _e( 'TXN ID / CHQ #', 'event_espresso' );?></label>
							<input name="txn_admin_payment[txn_id_chq_nmbr]" id="txn-admin-payment-txn-id-chq-nmbr-inp" class="txn-admin-apply-payment-inp" type="text" />
							<br/>
							<span class="description"><?php _e( 'The Transaction ID sent back from the payment gateway, or the Cheque #', 'event_espresso' );?></span>
						</div>						
					</div>
					
					<div class="mop-CC mop hidden">
						<div class="txn-admin-apply-payment-response-dv admin-modal-dialog-row">
							<label for="txn-admin-payment-gateway-response-inp" class="float-left"><?php _e( 'Gateway Response', 'event_espresso' );?></label>
							<input name="txn_admin_payment[gateway_response]" id="txn-admin-payment-gateway-response-inp" class="txn-admin-apply-payment-inp" type="text" />
							<br/>
							<span class="description"><?php _e( 'The gateway response string (optional)', 'event_espresso' );?></span>
						</div>						
					</div>

					<div class="mop-PP mop-CC mop hidden">
						<div class="txn-admin-apply-payment-status-dv admin-modal-dialog-row">
							<label for="txn-admin-payment-status-inp" class="float-left"><?php _e( 'Payment Status', 'event_espresso' );?></label>
							<select name="txn_admin_payment[status]" id="txn-admin-payment-status-slct" class="txn-admin-apply-payment-slct" type="text" >
							<?php foreach ( $payment_status as $STS_ID => $STS_code ) : ?>
								<?php $selected = $STS_ID == 'PAP' ? ' selected="selected"' : ''; ?>
								<option id="payment-status-opt-<?php echo $STS_ID; ?>" value="<?php echo $STS_ID; ?>"<?php echo $selected; ?>><?php echo $STS_code; ?>&nbsp;&nbsp;</option>		
							<?php endforeach; ?>
							</select>
							<br/>
							<span class="description"><?php _e( 'Whether the payment was approved, cancelled, declined or failed after submission to the gateway', 'event_espresso' );?></span>
						</div>
					</div>
																
					<div class="txn-admin-apply-payment-po-nmbr-dv admin-modal-dialog-row">
						<label for="txn-admin-payment-po-nmbr-inp" class="float-left"><?php _e( 'P.O. / S.O. #', 'event_espresso' );?></label>
						<input name="txn_admin_payment[po_number]" id="txn-admin-payment-po-nmbr-inp" class="txn-admin-apply-payment-inp" type="text" />
						<br/>
						<span class="description"><?php _e( 'The Purchase or Sales Order Number if any (optional)', 'event_espresso' );?></span>
					</div>
					
					<div class="txn-admin-apply-payment-accounting-dv admin-modal-dialog-row">
						<label class="last" for="txn-admin-payment-accounting-inp"><?php _e( 'Notes / Extra Accounting', 'event_espresso' );?></label>
						<input name="txn_admin_payment[accounting]" id="txn-admin-payment-accounting-inp" class="txn-admin-apply-payment-inp" type="text" />
						<br/>
						<span class="description"><?php _e( 'An extra field you may use for accounting purposes or simple notes', 'event_espresso' );?></span>
					</div>
					
					<div class="clear"></div>
	
				</div>	
			</div>			

			<ul id="admin-modal-dialog-options-ul">
				<li>
					<a id="txn-admin-modal-dialog-apply-payment-lnk" class="button-primary no-icon hidden" > 
						<?php _e( 'Apply Payment', 'event_espresso' );?>
					</a>
				</li>
				<li>
					<a id="txn-admin-modal-dialog-edit-payment-lnk" class="button-primary no-icon hidden" > 
						<?php _e( 'Save Payment Details', 'event_espresso' );?>
					</a>
				</li>
				<li>
					<a id="txn-admin-modal-dialog-apply-refund-lnk" class="button-primary no-icon hidden" > 
						<?php _e( 'Apply Refund', 'event_espresso' );?>
					</a>
				</li>
				<li>
					<a id="txn-admin-modal-dialog-cancel-lnk" class="button-secondary no-icon" >
						<?php _e( 'Cancel', 'event_espresso' );?>
					</a>
				</li>
			</ul>	
			<br class="clear"/>
									
		</form>
	</div>

	<?php endif; // $grand_total > 0?>
	
</div>
	
