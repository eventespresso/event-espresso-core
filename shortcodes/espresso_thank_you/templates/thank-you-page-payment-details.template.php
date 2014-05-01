<h2 class="section-heading display-box-heading">
	<?php _e('Payment Overview', 'event_espresso'); ?>
</h2>
<?php  do_action( 'AHEE__thank_you_page_payment_details_template__after_heading' ); ?>

<div id="espresso-thank-you-page-payment-details-dv">
	<?php
	if ( ! empty( $payments )){

		foreach ( $payments as $payment ) {
	?>
		<table class='ee-table'>
			<tbody>
				<tr>
					<td>
						<label><?php _e('Payment Type:', 'event_espresso'); ?></label>
					</td>
					<td>
						<?php $payment->e('PAY_gateway'); ?>
					</td>
				</tr>
				<tr>
					<td>
						<label><?php _e('Payment Date:', 'event_espresso'); ?></label>
					</td>
					<td>
						<?php $payment->e('PAY_timestamp'); ?>
					</td>
				</tr>
				<tr>
					<td>
						<label><?php _e("Payment Amount: ", 'event_espresso') ?></label>
					</td>
					<td>
						<?php  $payment->e( 'PAY_amount' ); ?>
					</td>
				</tr>
				<tr>
					<td>
						<label><?php _e("Payment Status: ", 'event_espresso') ?></label>
					</td>
					<td>
						<?php $payment->e_pretty_status( TRUE );
						if ( $show_try_pay_again_link &&  ! $payment->is_approved()) {?>
						<a href='<?php echo $SPCO_payment_options_url?>'><?php _e("Retry Payment", 'event_espresso'); ?></a>
							<?php }
						?>
					</td>
				</tr>
				</tbody>
			</table>
            <?php  do_action( 'AHEE__thank_you_page_payment_details_template__after_each_payment', $payment ); ?>

        <?php }

		} else {

			if ( $transaction->total() ){
				echo apply_filters(
					'FHEE__payment_overview_template__no_payments_made',
					sprintf (
						__('%sNo payments towards this transaction have been received.%s', 'event_espresso' ),
						'<p class="important-notice">',
						'</p>'
					)
				);
                do_action( 'AHEE__thank_you_page_payment_details_template__no_payments_made', $transaction );

            } else {
				echo apply_filters(
					'FHEE__payment_overview_template__no_payment_required',
					sprintf (
						__('%sNo payment is required for this transaction.%s', 'event_espresso' ),
						'<p>',
						'</p>'
					)
				);
                do_action( 'AHEE__thank_you_page_payment_details_template__no_payment_required' );
			 }

		}
		if ( ! empty( $gateway_content ) && ! $transaction->is_completed() ){
			echo $gateway_content;
            do_action( 'AHEE__thank_you_page_payment_details_template__after_gateway_content', $gateway_content );
		 }
		?>

    <br/>
    <?php  do_action( 'AHEE__thank_you_page_payment_details_template__after_payment_details' ); ?>

</div>