<div id="admin-primary-mbox-dv" class="admin-primary-mbox-dv">

	<h3 class="admin-primary-mbox-h4 hdr-has-icon">
		<span class="dashicons dashicons-cart"></span><?php _e( 'Transaction Items', 'event_espresso' );?>
	</h3>

	<div class="admin-primary-mbox-tbl-wrap">
		<?php echo $line_item_table; ?>
		<span id="txn-admin-grand-total" class="hidden"><?php echo $grand_raw_total; ?></span>
	</div>

	<a id="display-additional-transaction-session-info" class="display-the-hidden smaller-text" rel="additional-transaction-session-info">
		<span class="dashicons dashicons-plus-alt"></span><?php _e( 'view additional transaction session details', 'event_espresso' );?>
	</a>

	<div id="additional-transaction-session-info-dv" class="hidden">

		<a id="hide-additional-transaction-session-info" class="hide-the-displayed hidden smaller-text" rel="additional-transaction-session-info">
			<span class="dashicons dashicons-dismiss"></span><?php _e( 'hide additional transaction session details', 'event_espresso' );?>
		</a>
	<br class="clear"/>

		<h3 class="admin-primary-mbox-h4"><?php _e( 'Transaction Session Details', 'event_espresso' );?></h3>

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


	<?php if ( $attendee instanceof EE_Attendee && ( $grand_raw_total > 0 || $TXN_status != 'TCM' || ! empty( $payments ) ) ) : ?>

	<h3 class="admin-primary-mbox-h4 hdr-has-icon">
		<span class="ee-icon ee-icon-cash"></span><?php _e( 'Payment Details', 'event_espresso' );?>
	</h3>

	<div class="admin-primary-mbox-tbl-wrap">
		<table id="txn-admin-payments-tbl" class="admin-primary-mbox-tbl">
			<thead>
				<tr>
					<th></th>
					<th class="jst-cntr"></th>
					<th class="jst-cntr"><?php _e( 'ID', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'Date', 'event_espresso' );?></th>
					<th class="jst-cntr"><?php _e( 'Source', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'Method', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'Gateway Response', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'TXN&nbsp;ID / CHQ&nbsp;#', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'P.O. / S.O.&nbsp;#', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'Notes / Extra&nbsp;Accounting', 'event_espresso' );?></th>
					<!--<th class="jst-left"><?php _e( 'Details', 'event_espresso' );?></th>-->
					<th class="jst-cntr"><?php _e( 'Amount', 'event_espresso' );?></th>
				</tr>
			</thead>
			<tbody>
		<?php if ( $payments ) : ?>
			<?php $payment_total = 0; ?>
			<?php foreach ( $payments as $PAY_ID => $payment ) :
				$existing_reg_payment_json = isset( $existing_reg_payments[ $PAY_ID ] )
					? wp_json_encode( $existing_reg_payments[ $PAY_ID ] )
					: '{}';
				?>
				<tr id="txn-admin-payment-tr-<?php echo $PAY_ID;?>">
					<td>
						<span id="payment-status-<?php echo $PAY_ID; ?>" class="ee-status-strip-td ee-status-strip pymt-status-<?php echo $payment->STS_ID(); ?>"></span>
						<div id="payment-STS_ID-<?php echo $PAY_ID;?>" class="hidden"><?php echo $payment->STS_ID();?></div>
						<div id="reg-payments-<?php echo $PAY_ID;?>" class="hidden"><?php echo $existing_reg_payment_json; ?></div>
					</td>
					<td class=" jst-cntr">
						<ul class="txn-overview-actions-ul">
							<li>
								<a class="txn-admin-payment-action-edit-lnk" title="<?php esc_attr_e( 'Edit Payment', 'event_espresso' );?>" data-payment-id="<?php echo $PAY_ID;?>">
									<div class="dashicons dashicons-edit" style="margin: 0;"></div>
								</a>
							</li>
							<li>
								<a class="txn-admin-payment-action-delete-lnk" title="<?php esc_attr_e( 'Delete Payment', 'event_espresso' );?>" data-payment-id="<?php echo $PAY_ID;?>">
									<div class="dashicons dashicons-trash" style="margin: 0;"></div>
								</a>
							</li>
						</ul>
					</td>
					<td class=" jst-rght">
						<div id="payment-id-<?php echo $PAY_ID;?>"><?php echo $PAY_ID;?></div>
					</td>
					<td class=" jst-left">
						<div id="payment-date-<?php echo $PAY_ID;?>" class="payment-date-dv"><?php echo $payment->timestamp('Y-m-d', 'g:i a');?></div>
					</td>
					<td class=" jst-cntr">
						<div id="payment-method-<?php echo $PAY_ID;?>">
							<?php echo $payment->source();?>
						</div>
					</td>
					<td class=" jst-left">
						<div id="payment-gateway-<?php echo $PAY_ID;?>">
							<?php echo $payment->payment_method() ?  $payment->payment_method()->admin_name() : __("Unknown", 'event_espresso');?>
						</div>
						<div id="payment-gateway-id-<?php echo $PAY_ID;?>" class="hidden"><?php echo $payment->payment_method() ? $payment->payment_method()->ID() : 0;?></div>
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
							<div id="payment-amount-<?php echo $PAY_ID;?>" style="display:inline;"><?php echo EEH_Template::format_currency($payment->amount(), FALSE, FALSE ); ?></div>
						</span>
					</td>
				</tr>
			<?php
				$payment_total += $payment->STS_ID() == 'PAP' ? $payment->amount() : 0;
			?>
			<?php endforeach; // $payment?>
			<?php
				$pay_totals_class = $payment_total > $grand_raw_total ? ' important-notice' : '';
				$overpaid = $payment_total > $grand_raw_total ? '<span id="overpaid">' . __( 'This transaction has been overpaid ! ', 'event_espresso' ) . '</span>' : '';
			?>
				<tr id="txn-admin-no-payments-tr" class="admin-primary-mbox-total-tr hidden">
					<td class=" jst-rght" colspan="11">
						<span class="important-notice"><?php _e( 'No payments have been applied to this transaction yet. Click "Apply Payment" below to make a payment.', 'event_espresso' ); ?></span>
					</td>
				</tr>
				<tr id="txn-admin-payments-total-tr" class="admin-primary-mbox-total-tr<?php echo $pay_totals_class;?>">
					<th class=" jst-rght" colspan="10"><span id="payments-total-spn"><?php echo $overpaid . sprintf( __( 'Payments Total %s', 'event_espresso' ), '(' . EE_Registry::instance()->CFG->currency->code . ')' );?></span></th>
					<th class=" jst-rght"><span id="txn-admin-payment-total"><?php echo EEH_Template::format_currency($payment_total, FALSE, FALSE);?></span></th>
				</tr>
		<?php else : ?>
				<tr id="txn-admin-no-payments-tr" class="admin-primary-mbox-total-tr">
					<td class=" jst-rght" colspan="11">
						<span class="important-notice"><?php _e( 'No payments have been applied to this transaction yet. Click "Apply Payment" below to make a payment.', 'event_espresso' ); ?></span>
					</td>
				</tr>
				<tr id="txn-admin-payments-total-tr" class="admin-primary-mbox-total-tr hidden">
					<th class=" jst-rght" colspan="10"><span id="payments-total-spn"><?php echo __( 'Payments Total', 'event_espresso' );?></span></th>
					<th class=" jst-rght"><span id="txn-admin-payment-total"></span></th>
				</tr>
		<?php endif; // $payments?>

				<tr id="txn-admin-payment-empty-row-tr" class="hidden">
					<td>
						<span id="payment-status-PAY_ID" class="ee-status-strip-td ee-status-strip"></span>
						<div id="payment-STS_ID-PAY_ID" class="hidden"></div>
					</td>
					<td class=" jst-cntr">
						<ul class="txn-overview-actions-ul">
							<li>
								<a class="txn-admin-payment-action-edit-lnk" title="<?php esc_attr_e( 'Edit Payment', 'event_espresso' );?>" data-payment-id="PAY_ID">
									<div class="dashicons dashicons-edit" style="margin: 0;"></div>
								</a>
							</li>
							<li>
								<a class="txn-admin-payment-action-delete-lnk" title="<?php esc_attr_e( 'Delete Payment', 'event_espresso' );?>" data-payment-id="PAY_ID">
									<div class="dashicons dashicons-trash" style="margin: 0;"></div>
								</a>
							</li>
						</ul>
					</td>
					<td class=" jst-rght">
						<div id="payment-id-PAY_ID">PAY_ID</div>
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

	<div id="txn-admin-apply-payment-dv" class="txn-admin-payment-option auto-hide" style="display: none;">

		<h2 id="admin-modal-dialog-apply-payment-h2" class="admin-modal-dialog-h2 hdr-has-icon" style="display:none;">
			<div class="ee-icon ee-icon-cash-add float-left"></div>
			<?php echo __( 'Apply a Payment to Transaction #', 'event_espresso' ) . $txn_nmbr['value'];?>
		</h2>

		<h2 id="admin-modal-dialog-edit-payment-h2" class="admin-modal-dialog-h2 hdr-has-icon" style="display:none;">
			<div class="ee-icon ee-icon-cash-edit float-left"></div>
			<?php
			echo sprintf(
				__( 'Edit Payment #%s for Transaction #%s', 'event_espresso' ),
				'<span></span>',
				$txn_nmbr['value']
			);
			?>
		</h2>

		<h2 id="admin-modal-dialog-edit-refund-h2" class="admin-modal-dialog-h2 hdr-has-icon" style="display:none;">
			<div class="ee-icon ee-icon-cash-edit float-left"></div>
			<?php
			echo sprintf(
				__( 'Edit Refund #%s for Transaction #%s', 'event_espresso' ),
				'<span></span>',
				$txn_nmbr['value']
			);
			?>
		</h2>

		<h2 id="admin-modal-dialog-apply-refund-h2" class="admin-modal-dialog-h2 hdr-has-icon" style="display:none;">
			<div class="ee-icon ee-icon-cash-remove float-left"></div>
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
					<input  type="hidden" name="txn_admin_todays_date" id="txn-admin-todays-date-inp" value="<?php echo date( 'Y-m-d h:i a', current_time( 'timestamp' )); ?>"/>

					<div class="txn-admin-apply-payment-date-dv admin-modal-dialog-row">
						<div class="validation-notice-dv"><?php _e( 'The following is  a required field', 'event_espresso' );?></div>
						<label for="txn-admin-payment-date-inp" class=""><?php _e( 'Payment Date', 'event_espresso' );?></label>
						<input name="[date]txn_admin_payment" id="txn-admin-payment-date-inp" class="txn-admin-apply-payment-inp required" type="text" value="<?php echo date( 'Y-m-d g:i a', current_time( 'timestamp' )); ?>"/>
						<p class="description"><?php _e( 'The date the payment was actually made on', 'event_espresso' );?></p>
					</div>

					<div class="txn-admin-apply-payment-amount-dv admin-modal-dialog-row">
						<div class="validation-notice-dv"><?php _e( 'The following is  a required field', 'event_espresso' );?></div>
						<label for="txn-admin-payment-amount-inp" class=""><?php _e( 'Amount', 'event_espresso' );?></label>
						<input name="txn_admin_payment[amount]" id="txn-admin-payment-amount-inp" class="txn-admin-apply-payment-inp required" type="text" value=""/>
						<p class="description"><?php _e( 'The amount of the payment', 'event_espresso' );?></p>
					</div>

					<div class="txn-admin-apply-payment-method-dv admin-modal-dialog-row">
						<div class="validation-notice-dv"><?php _e( 'The following is  a required field', 'event_espresso' );?></div>
						<label for="txn-admin-payment-method-inp" class=""><?php _e( 'Method of Payment', 'event_espresso' );?></label>
						<select name="txn_admin_payment[PMD_ID]" id="txn-admin-payment-method-slct" class="txn-admin-apply-payment-slct required" type="text" >
						<?php foreach ( $payment_methods as $method ) : ?>
							<?php $selected = $method->slug() == 'cash' ? ' selected="selected"' : ''; ?>
							<option id="payment-method-opt-<?php echo $method->slug(); ?>" value="<?php echo $method->ID(); ?>"<?php echo $selected; ?>><?php echo sanitize_key( $method->admin_desc() ) ? substr( $method->admin_desc(), 0, 128) : $method->admin_name() ; ?>&nbsp;&nbsp;</option>
						<?php endforeach; ?>
						</select>
						<p class="description"><?php _e( 'Whether the payment was made via PayPal, Credit Card, Cheque, or Cash', 'event_espresso' );?></p>
					</div>

					<div class="mop-PP mop-CC mop-CHQ mop">
						<div class="txn-admin-apply-payment-gw-txn-id-dv admin-modal-dialog-row">
							<label for="txn-admin-payment-txn-id-inp" class=""><?php _e( 'TXN ID / CHQ #', 'event_espresso' );?></label>
							<input name="txn_admin_payment[txn_id_chq_nmbr]" id="txn-admin-payment-txn-id-chq-nmbr-inp" class="txn-admin-apply-payment-inp" type="text" maxlength="100"/>
							<p class="description"><?php _e( 'The Transaction ID sent back from the payment gateway, or the Cheque #', 'event_espresso' );?></p>
						</div>
					</div>

					<div class="mop-CC mop" style="display:none">
						<div class="txn-admin-apply-payment-response-dv admin-modal-dialog-row">
							<label for="txn-admin-payment-gateway-response-inp" class=""><?php _e( 'Gateway Response', 'event_espresso' );?></label>
							<input name="txn_admin_payment[gateway_response]" id="txn-admin-payment-gateway-response-inp" class="txn-admin-apply-payment-inp" type="text"/>
							<p class="description"><?php _e( 'The gateway response string (optional)', 'event_espresso' );?></p>
						</div>
					</div>

					<div class="mop-PP mop-CC mop">
						<div class="txn-admin-apply-payment-status-dv admin-modal-dialog-row">
							<label for="txn-admin-payment-status-inp" class=""><?php _e( 'Payment Status', 'event_espresso' );?></label>
							<select name="txn_admin_payment[status]" id="txn-admin-payment-status-slct" class="txn-admin-apply-payment-slct" type="text" >
							<?php foreach ( $payment_status as $STS_ID => $STS_code ) : ?>
								<?php $selected = $STS_ID == 'PAP' ? ' selected="selected"' : ''; ?>
								<option id="payment-status-opt-<?php echo $STS_ID; ?>" value="<?php echo $STS_ID; ?>"<?php echo $selected; ?>><?php echo $STS_code; ?>&nbsp;&nbsp;</option>
							<?php endforeach; ?>
							</select>
							<p class="description"><?php _e( 'Whether the payment was approved, cancelled, declined or failed after submission to the gateway', 'event_espresso' );?></p>
						</div>
					</div>

					<div class="txn-admin-apply-payment-po-nmbr-dv admin-modal-dialog-row">
						<label for="txn-admin-payment-po-nmbr-inp" class=""><?php _e( 'P.O. / S.O. #', 'event_espresso' );?></label>
						<input name="txn_admin_payment[po_number]" id="txn-admin-payment-po-nmbr-inp" class="txn-admin-apply-payment-inp" type="text" maxlength="100"/>
						<p class="description"><?php _e( 'The Purchase or Sales Order Number if any (optional)', 'event_espresso' );?></p>
					</div>

					<div class="txn-admin-apply-payment-accounting-dv admin-modal-dialog-row">
						<label for="txn-admin-payment-accounting-inp" class="last"><?php _e( 'Notes / Extra Accounting', 'event_espresso' );?></label>
						<input name="txn_admin_payment[accounting]" id="txn-admin-payment-accounting-inp" class="txn-admin-apply-payment-inp" type="text" value="<?php echo $REG_code; ?>" maxlength="100"/>		<input type="hidden" id="txn-admin-reg-code-inp" value="<?php echo $REG_code; ?>"/>
						<p class="description"><?php _e( 'An extra field you may use for accounting purposes or simple notes. Defaults to the primary registrant\'s registration code.', 'event_espresso' );?></p>
					</div>

					<div class="txn-admin-apply-payment-registrations-dv admin-modal-dialog-row">
						<label for="txn-admin-payment-registrations-inp" class="last"><?php _e( 'Registrations to Apply Payment to:', 'event_espresso' ); ?></label>
						<label class="txn-admin-apply-payment-to-registrations-lbl">
							<input type="radio" value="1" id="txn-admin-apply-payment-to-all-registrations-inp" name="txn_admin_payment[apply_to_all_registrations]"  checked="checked"/>
							<?php _e( 'ALL Registrations', 'event_espresso' ); ?>
						</label>
						<label class="txn-admin-apply-payment-to-registrations-lbl">
							<input type="radio" value="0" id="txn-admin-apply-payment-to-some-registrations-inp" name="txn_admin_payment[apply_to_all_registrations]" />
							<?php _e( 'Just the following Registrations', 'event_espresso' ); ?>
						</label>
						<?php echo $registrations_to_apply_payment_to; ?>
					</div>

					<div class="txn-admin-payment-reg-status-dv admin-modal-dialog-row">
						<label for="txn-admin-payment-reg-status-inp" class="last"><?php _e( 'Change Registration Status?', 'event_espresso' );?></label>
						<?php echo $status_change_select; ?>
						<p class="description"><?php _e( 'If you wish to change the status for the registrations selected above, then select which status from this dropdown.', 'event_espresso' ); ?></p>
						<br/>
					</div>

					<div class="txn-admin-apply-payment-send-notifications-dv admin-modal-dialog-row">

						<label for="txn-admin-payment-send-notifications-inp" class="last"><?php _e( 'Send Related Messages?', 'event_espresso' );?></label>
						<label class="txn-admin-payment-send-notifications-lbl">
							<input type="checkbox" value="1" name="txn_payments[send_notifications]" checked="checked" aria-checked="true" style="vertical-align: middle;">
							<?php _e( 'Payment Messages?', 'event_espresso' ); ?>
						</label>
						<label class="txn-admin-payment-send-notifications-lbl">
							<input type="checkbox" value="1" name="txn_reg_status_change[send_notifications]" style="vertical-align: middle;">
							<?php _e( 'Registration Messages?', 'event_espresso' ); ?>
						</label>
						<br class="clear-float"/>
						<p class="description"><?php printf( __('By default %1$sa payment message is sent to the primary registrant%2$s after submitting this form.%3$sHowever, if you check the "Registration Messages" box, the system will also send any related messages matching the status of the registrations to %1$seach registration for this transaction%2$s.', 'event_espresso'), '<strong>', '</strong>', '<br />' ); ?></p>
						<label></label>
					</div>
					<div class="clear"></div>

				</div>
			</div>

			<ul id="admin-modal-dialog-options-ul">
				<li>
					<a id="txn-admin-modal-dialog-apply-payment-lnk" class="button-primary no-icon" style="display:none;" >
						<?php _e( 'Apply Payment', 'event_espresso' );?>
					</a>
				</li>
				<li>
					<a id="txn-admin-modal-dialog-edit-payment-lnk" class="button-primary no-icon" style="display:none;" >
						<?php _e( 'Save Payment Details', 'event_espresso' );?>
					</a>
				</li>
				<li>
					<a id="txn-admin-modal-dialog-edit-refund-lnk" class="button-primary no-icon" style="display:none;" >
						<?php _e( 'Save Refund Details', 'event_espresso' );?>
					</a>
				</li>
				<li>
					<a id="txn-admin-modal-dialog-apply-refund-lnk" class="button-primary no-icon" style="display:none;" >
						<?php _e( 'Apply Refund', 'event_espresso' );?>
					</a>
				</li>
				<li>
					<a id="txn-admin-modal-dialog-cancel-lnk" class="button-secondary no-icon" >
						<?php _e( 'Cancel', 'event_espresso' );?>
					</a>
				</li>
				<li>
					<span id="ee-ajax-processing-text" style="display:none;"><?php _e('Processing...', 'event_espresso'); ?></span>
				</li>
			</ul>

			<br class="clear"/>

		</form>
	</div>

	<div id="txn-admin-delete-payment-dv" class="txn-admin-payment-option auto-hide" style="display: none;">

		<h2 id="admin-modal-dialog-delete-payment-h2" class="admin-modal-dialog-h2 hdr-has-icon" style="display:none;">
			<span class="ee-icon ee-icon-cash-add"></span>
			<?php echo __( 'Delete Payment/Refund for Transaction #', 'event_espresso' ) . $txn_nmbr['value'];?>
		</h2>

		<form name="txn-admin-delete-payment-frm" id="txn-admin-delete-payment-frm" action="<?php echo $delete_payment_url; ?>">
			<div class="admin-modal-dialog-wrap">
				<div class="admin-modal-dialog-inner">

					<input  type="hidden" name="espresso_delete_payment_nonce" id="espresso_delete_payment_nonce" value="<?php echo wp_create_nonce( 'espresso_delete_payment_nonce' );?>"/>
					<input  type="hidden" name="delete_espresso_ajax" id="delete-espresso-ajax" value="0"/>
					<input  type="hidden" name="delete_noheader" id="delete-txn-admin-noheader-inp" value="0"/>
					<input  type="hidden" name="delete_txn_admin_payment[PAY_ID]" id="delete-txn-admin-payment-payment-id-inp" class="txn-admin-apply-payment-inp" value="0"/>
					<input  type="hidden" name="delete_txn_admin_payment[TXN_ID]" id="delete-txn-admin-payment-txn-id-inp" value="<?php echo $txn_nmbr['value']; ?>"/>

					<div class="txn-admin-apply-payment-accounting-dv admin-modal-dialog-row">
						<label for="delete-txn-admin-payment-reg-status-inp" class="last"><?php _e( 'Change Registration Status?', 'event_espresso' );?></label>
						<?php echo $delete_status_change_select; ?>
						<p class="description"><?php printf( __('If you wish to change the status of all the registrations associated with this transaction after deleting this payment/refund, then select which status from this dropdown. %sNote: ALL registrations associated with this transaction will be updated to this new status.%s', 'event_espresso'), '<strong>', '</strong>' ); ?></p>
					</div>

					<div class="ee-attention txn-admin-apply-payment-accounting-dv admin-modal-dialog-row">
						<label for="delete-txn-admin-payment-accounting-inp" class="last"><?php _e( 'Send Related Messages?', 'event_espresso' );?></label>
						<input type="checkbox" value="1" name="delete_txn_reg_status_change[send_notifications]">
						<p class="description"><?php _e( 'If you check this box, the system will send any related registration messages matching the status of the registrations to each registration for this transaction. No Payment notifications are sent when deleting a payment.', 'event_espresso' );?></p>
					</div>
					<div class="clear"></div>

				</div>
			</div>

			<ul id="del-admin-modal-dialog-options-ul">
				<li>
					<a id="txn-admin-modal-dialog-delete-lnk" class="button-primary no-icon" style="display:none;" >
						<?php _e( 'Delete', 'event_espresso' );?>
					</a>
				</li>
				<li>
					<a id="del-txn-admin-modal-dialog-cancel-lnk" class="button-secondary no-icon" >
						<?php _e( 'Cancel', 'event_espresso' );?>
					</a>
				</li>
				<li>
					<span id="delete-ee-ajax-processing-text" style="display:none;"><?php _e('Processing...', 'event_espresso'); ?></span>
				</li>
			</ul>

			<br class="clear"/>

		</form>
	</div>

	<?php endif; // $grand_raw_total > 0?>

	<?php
	if ( WP_DEBUG ) {
		$delivered_messages = get_option( 'EED_Messages__payment', array() );
		if ( isset( $delivered_messages[ $TXN_ID ] )) {
			?>
			<h4 class="admin-primary-mbox-h4 hdr-has-icon"><span class="dashicons dashicons-email-alt"></span><?php _e( 'Messages Sent to Primary Registrant', 'event_espresso' );?></h4>

			<div class="admin-primary-mbox-tbl-wrap">
				<table class="admin-primary-mbox-tbl">
					<thead>
						<tr>
							<th class="jst-left"><?php _e( 'Date & Time', 'event_espresso' );?></th>
							<th class="jst-left"><?php _e( 'Message Type', 'event_espresso' );?></th>
							<th class="jst-left"><?php _e( 'Payment Status Upon Sending', 'event_espresso' );?></th>
							<th class="jst-left"><?php _e( 'TXN Status Upon Sending', 'event_espresso' );?></th>
						</tr>
					</thead>
					<tbody>
						<?php foreach ( $delivered_messages[ $TXN_ID ] as $timestamp => $delivered_message ) :
							?>
							<tr>
								<td class="jst-left"><?php echo date( get_option('date_format') . ' ' . get_option('time_format'), ( $timestamp + ( get_option( 'gmt_offset' ) * HOUR_IN_SECONDS ) ) );?></td>
								<td class="jst-left"><?php echo isset( $delivered_message['message_type'] ) ? $delivered_message['message_type'] : '';?></td>
								<td class="jst-left"><?php echo isset( $delivered_message['pay_status'] ) ? $delivered_message['pay_status'] : '';?></td>
								<td class="jst-left"><?php echo isset( $delivered_message['txn_status'] ) ? $delivered_message['txn_status'] : '';?></td>
							</tr>
						<?php endforeach; // $delivered_messages?>
					</tbody>
				</table>
			</div>
		<?php
		}
	}
	?>


</div>

