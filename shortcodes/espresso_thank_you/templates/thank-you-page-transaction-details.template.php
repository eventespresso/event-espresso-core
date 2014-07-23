<h3><?php _e('Transaction Details', 'event_espresso'); ?></h3>
<?php  do_action( 'AHEE__thank_you_page_transaction_details_template__after_heading' ); ?>

<div id="espresso-thank-you-page-transaction-details-dv">
	<table class='ee-table'>
		<tbody>
			<tr>
				<td>
					<label><?php _e('Total Cost: ', 'event_espresso'); ?></label>
				</td>
				<td>
					<?php echo EEH_Template::format_currency( $transaction->total() ); ?>
				</td>
			</tr>
			<tr>
				<td>
					<label><?php _e('Amount Owing: ', 'event_espresso'); ?></label>
				</td>
				<td class="<?php echo ($transaction->paid() == $transaction->total()) ? 'ee-transaction-paid' : 'ee-transaction-unpaid' ?>">
					<?php echo EEH_Template::format_currency( $transaction->remaining() ); ?>
				</td>
			</tr>
			<tr>
				<td>
					<label><?php _e('Transaction Status: ', 'event_espresso'); ?></label>
				</td>
				<td>
					<?php $transaction->e_pretty_status( TRUE );
					if ( $show_try_pay_again_link && ! $transaction->is_completed() ) { ?>
					 &nbsp; <span class="small-text"><a href='<?php echo $SPCO_payment_options_url?>'><?php _e('View Payment Options', 'event_espresso'); ?></a></span>
					<?php } ?>
				</td>
			</tr>
			<tr>
				<td>
					<label><?php _e('Primary Registrant:', 'event_espresso'); ?></label>
				</td>
				<td>
					<?php  echo $primary_registrant_name; ?>
				</td>
			</tr>
            <?php  do_action( 'AHEE__thank_you_page_transaction_details_template__after_transaction_table_row', $transaction ); ?>
		</tbody>
	</table>

<?php if ( $show_try_pay_again_link && ! $transaction->is_completed() ) { ?>
	<p class="small-text jst-rght">
		<a href='<?php echo $SPCO_payment_options_url?>'><?php _e("Click here to view Payment Options", 'event_espresso'); ?></a>
	</p>
	<br/>


<?php }?>

    <?php  do_action( 'AHEE__thank_you_page_transaction_details_template__after_transaction_details' ); ?>

</div>
