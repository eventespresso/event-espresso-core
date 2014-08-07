
	<h4 id="reg-page-totals-hdr" class="">
		<span class="drk-grey-text"><?php _e('Billable Registrations:', 'event_espresso'); ?></span> <?php echo $reg_count;?>
	</h4>

	<div class="spco-payment-info-dv">
		<table id="spco-payment-info-table">
			<thead>
				<tr>
					<th scope="col" width=""><?php _e('Ticket Name and Description', 'event_espresso');?></th>
					<th scope="col" width="5%" class="jst-cntr"><?php _e('Qty', 'event_espresso');?></th>
					<th scope="col" width="15%" class="jst-cntr"><?php _e('Price', 'event_espresso');?></th>
					<th scope="col" width="15%" class="jst-cntr"><?php _e('Total', 'event_espresso');?></th>
					<?php	do_action( 'AHEE__registration_page_payment_options__payment_info_table_thead_row_end' ); ?>
				</tr>
			</thead>
			<tbody>
			<?php echo $transaction_details;?>
<?php
/*		if ( $payments ) {
		foreach ( $payments as $payment ){
			if ( $payment instanceof EE_Payment ) {
?>
				<tr class="reg-page-totals-spn">
					<td class="jst-rght"><?php echo __('Payment: ', 'event_espresso') . date_i18n( $pay_date_frmt, (int)$payment->timestamp() ); ?></td>
					<td colspan="3" class="jst-rght"><?php echo EEH_Template::format_currency( $payment->amount() );?></td>
					<?php	do_action( 'AHEE__registration_page_payment_options__payment_info_table_payment_row_end', $payment ); ?>
				</tr>
<?php
			}
		}
	}
	if ( $grand_total != $amount_owing ) {
?>
				<tr class="reg-page-totals-spn">
					<td class="jst-rght"><?php echo __('Grand Total: ', 'event_espresso');?></td>
					<td colspan="3" class="jst-rght"><?php echo EEH_Template::format_currency( $grand_total );?></td>
					<?php	do_action( 'AHEE__registration_page_payment_options__payment_info_table_grand_total_row_end', $grand_total ); ?>
				</tr>
<?php
}
?>
				<tr id="reg-page-grand-total-dv" class="reg-page-totals-spn">
					<td class="jst-rght"><?php echo __('Total Amount Due: ', 'event_espresso');?></td>
					<td colspan="3" class="jst-rght"><?php echo EEH_Template::format_currency( $amount_owing );?></td>
					<?php	do_action( 'AHEE__registration_page_payment_options__payment_info_table_amount_owing_row_end', $amount_owing ); ?>
				</tr>
				<?php */ ?>
			</tbody>
		</table>
	</div>

	<?php  echo $hidden_inputs;  ?>

	<div id="methods-of-payment">
		<?php echo $payment_options; ?>
		<a id="reg-page-select-other-method-of-payment-lnk" class="hidden smaller-text right" rel=""><?php echo apply_filters( 'FHEE__registration_page_payment_options__select_other_method_of_payment_lnk', __( 'select a different method of payment:', 'event_espresso' )); ?></a>
	</div>
	<!-- end #methods-of-payment -->
