	<div id="txn-admin-apply-payment-dv" class="txn-admin-payment-option auto-hide hidden">

		<h2 id="admin-modal-dialog-apply-payment-h2" class="admin-modal-dialog-h2 hdr-has-icon hidden">
			<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL;?>images/cash-single-add-24x24.png" alt="" />
			<?php echo __( 'Apply a Payment to Transaction #', 'event_espresso' ) . $txn_nmbr['value'];?>
		</h2>

		<h2 id="admin-modal-dialog-edit-payment-h2" class="admin-modal-dialog-h2 hdr-has-icon hidden">
			<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL;?>images/cash-single-edit-24x24.png" alt="" />
			<?php echo __( 'Edit Payment #', 'event_espresso' ) . '<span></span>' . __( ' for Transaction #', 'event_espresso' ) . $txn_nmbr['value'];?>
		</h2>
		
		<h2 id="admin-modal-dialog-apply-refund-h2" class="admin-modal-dialog-h2 hdr-has-icon hidden">
			<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL;?>images/cash-single-remove-24x24.png" alt="" />
			<?php echo __( 'Apply a Refund to Transaction #', 'event_espresso' ) . $txn_nmbr['value'];?>
		</h2>
		
		<form name="txn-admin-apply-payment-frm" id="txn-admin-apply-payment-frm" action="<?php echo $apply_payment_form_url; ?>">
			<div class="admin-modal-dialog-wrap">
				<div class="admin-modal-dialog-inner">
					
					<input  type="hidden" name="espresso_apply_payment_nonce" id="espresso_apply_payment_nonce" value="<?php echo wp_create_nonce( 'espresso_apply_payment_nonce' );?>"/>
					<input  type="hidden" name="espresso_ajax" id="espresso-ajax" value="0"/>
					<input  type="hidden" name="noheader" id="txn-admin-noheader-inp" value="0"/>
					<input  type="hidden" name="txn_admin_payment[PAY_ID]" id="txn-admin-payment-payment-id-inp" class="txn-admin-apply-payment-inp" value="0"/>
					<input  type="hidden" name="txn_admin_payment[TXN_ID]" id="txn-admin-payment-txn-id-inp" value="<?php echo $txn_nmbr['value']; ?>"/>
					<input  type="hidden" name="txn_admin_payment[type]" id="txn-admin-payment-type-inp" value="1"/>
					<input  type="hidden" name="txn_admin_payment[details]" id="txn-admin-payment-details-inp" value=""/>
					<input  type="hidden" name="txn_admin_delete_payment_form_url" id="txn-admin-delete-payment-form-url-inp" value="<?php echo $delete_payment_form_url; ?>"/>
					<input  type="hidden" name="txn_admin_todays_date" id="txn-admin-todays-date-inp" value="<?php echo current_time('mysql'); ?>"/>

					<div class="txn-admin-apply-payment-date-dv admin-modal-dialog-row">
						<div class="validation-notice-dv"><?php _e( 'The following is  a required field', 'event_espresso' );?></div>
						<label for="txn-admin-payment-date-inp" class=""><?php _e( 'Payment Date', 'event_espresso' );?></label>
						<input name="txn_admin_payment[date]" id="txn-admin-payment-date-inp" class="txn-admin-apply-payment-inp datepicker required" type="text" value="<?php echo date( 'F j, Y g:i a' ); ?>"/>
						<br/>
						<p class="description"><?php _e( 'The date the payment was actually made on', 'event_espresso' );?></p>
					</div>
					
					<div class="txn-admin-apply-payment-amount-dv admin-modal-dialog-row">
						<div class="validation-notice-dv"><?php _e( 'The following is  a required field', 'event_espresso' );?></div>
						<label for="txn-admin-payment-amount-inp" class=""><?php _e( 'Amount', 'event_espresso' );?></label>
						<input name="txn_admin_payment[amount]" id="txn-admin-payment-amount-inp" class="txn-admin-apply-payment-inp required" type="text" value=""/>
						<br/>
						<p class="description"><?php _e( 'The amount of the payment', 'event_espresso' );?></p>
					</div>
					
					<div class="txn-admin-apply-payment-method-dv admin-modal-dialog-row">
						<div class="validation-notice-dv"><?php _e( 'The following is  a required field', 'event_espresso' );?></div>
						<label for="txn-admin-payment-method-inp" class=""><?php _e( 'Method of Payment', 'event_espresso' );?></label>
						<select name="txn_admin_payment[method]" id="txn-admin-payment-method-slct" class="txn-admin-apply-payment-slct required" type="text" >
							<option value="0" selected="selected"><?php _e( 'please select an option', 'event_espresso' );?>&nbsp;&nbsp;</option>
						<?php foreach ( $payment_methods as $method_ID => $method ) : ?>
							<option id="payment-method-opt-<?php echo $method_ID; ?>" value="<?php echo $method_ID; ?>"><?php echo $method; ?>&nbsp;&nbsp;</option>		
						<?php endforeach; ?>
						</select>
						<br/>
						<p class="description"><?php _e( 'Whether the payment was made via PayPal, Credit Card, Cheque, or Cash', 'event_espresso' );?></p>
					</div>
					
					<div class="mop-CC mop hidden">
						<div class="txn-admin-apply-payment-gateway admin-modal-dialog-row">
							<label for="txn-admin-payment-gateway-inp" class=""><?php _e( 'Gateway', 'event_espresso' );?></label>
							<select name="txn_admin_payment[gateway]" id="txn-admin-payment-gateway-slct" class="txn-admin-apply-payment-slct" type="text" >
								<option value="0" selected="selected"><?php _e( 'please select an option', 'event_espresso' );?>&nbsp;&nbsp;</option>
							<?php foreach ( $active_gateways as $gateway_ID => $gateway_name ) : ?>
								<option id="payment-gateway-opt-<?php echo $gateway_ID; ?>" value="<?php echo $gateway_ID; ?>"><?php echo $gateway_name; ?>&nbsp;&nbsp;</option>		
							<?php endforeach; ?>
							</select>
							<br/>
							<p class="description"><?php _e( 'The gateway used to process the payment', 'event_espresso' );?></p>
						</div>
					</div>
					
					<div class="mop-PP mop-CC mop-CHQ mop hidden">
						<div class="txn-admin-apply-payment-gw-txn-id-dv admin-modal-dialog-row">
							<label for="txn-admin-payment-txn-id-inp" class=""><?php _e( 'TXN ID / CHQ #', 'event_espresso' );?></label>
							<input name="txn_admin_payment[txn_id_chq_nmbr]" id="txn-admin-payment-txn-id-chq-nmbr-inp" class="txn-admin-apply-payment-inp" type="text"/>
							<br/>
							<p class="description"><?php _e( 'The Transaction ID sent back from the payment gateway, or the Cheque #', 'event_espresso' );?></p>
						</div>						
					</div>
					
					<div class="mop-CC mop hidden">
						<div class="txn-admin-apply-payment-response-dv admin-modal-dialog-row">
							<label for="txn-admin-payment-gateway-response-inp" class=""><?php _e( 'Gateway Response', 'event_espresso' );?></label>
							<input name="txn_admin_payment[gateway_response]" id="txn-admin-payment-gateway-response-inp" class="txn-admin-apply-payment-inp" type="text"/>
							<br/>
							<p class="description"><?php _e( 'The gateway response string (optional)', 'event_espresso' );?></p>
						</div>						
					</div>

					<div class="mop-PP mop-CC mop hidden">
						<div class="txn-admin-apply-payment-status-dv admin-modal-dialog-row">
							<label for="txn-admin-payment-status-inp" class=""><?php _e( 'Payment Status', 'event_espresso' );?></label>
							<select name="txn_admin_payment[status]" id="txn-admin-payment-status-slct" class="txn-admin-apply-payment-slct" type="text" >
							<?php foreach ( $payment_status as $STS_ID => $STS_code ) : ?>
								<?php $selected = $STS_ID == 'PAP' ? ' selected="selected"' : ''; ?>
								<option id="payment-status-opt-<?php echo $STS_ID; ?>" value="<?php echo $STS_ID; ?>"<?php echo $selected; ?>><?php echo $STS_code; ?>&nbsp;&nbsp;</option>		
							<?php endforeach; ?>
							</select>
							<br/>
							<p class="description"><?php _e( 'Whether the payment was approved, cancelled, declined or failed after submission to the gateway', 'event_espresso' );?></p>
						</div>
					</div>
																
					<div class="txn-admin-apply-payment-po-nmbr-dv admin-modal-dialog-row">
						<label for="txn-admin-payment-po-nmbr-inp" class=""><?php _e( 'P.O. / S.O. #', 'event_espresso' );?></label>
						<input name="txn_admin_payment[po_number]" id="txn-admin-payment-po-nmbr-inp" class="txn-admin-apply-payment-inp" type="text"/>
						<br/>
						<p class="description"><?php _e( 'The Purchase or Sales Order Number if any (optional)', 'event_espresso' );?></p>
					</div>
					
					<div class="txn-admin-apply-payment-accounting-dv admin-modal-dialog-row">
						<label for="txn-admin-payment-accounting-inp" class="last"><?php _e( 'Notes / Extra Accounting', 'event_espresso' );?></label>
						<input name="txn_admin_payment[accounting]" id="txn-admin-payment-accounting-inp" class="txn-admin-apply-payment-inp" type="text" value="<?php echo $REG_code; ?>"/>		<input type="hidden" id="txn-admin-reg-code-inp" value="<?php echo $REG_code; ?>"/>
						<br/>
						<p class="description"><?php _e( 'An extra field you may use for accounting purposes or simple notes.', 'event_espresso' );?></p><br/>
						<label></label>
						<p class="description"><?php _e( 'Defaults to the primary attendee\'s registration code.', 'event_espresso' );?></p>
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