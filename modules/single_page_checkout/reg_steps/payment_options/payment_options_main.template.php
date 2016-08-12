<?php
/** @type string $transaction_details */
/** @type string $before_payment_options */
/** @type string $payment_options */
/** @type string $after_payment_options */
/** @type string $default_hidden_inputs */
/** @type string $extra_hidden_inputs */
?>

	<h4 id="reg-page-totals-hdr" class="">
		<span class="drk-grey-text"><?php _e('Registrations:', 'event_espresso'); ?></span> <?php echo $reg_count;?>
	</h4>

	<div class="spco-payment-info-dv">
		<table id="spco-payment-info-table">
			<thead>
				<tr>
					<th scope="col" width=""><?php _e('Name and Description', 'event_espresso');?></th>
					<th scope="col" width="15%" class="jst-cntr"><?php _e('Price', 'event_espresso');?></th>
					<th scope="col" width="5%" class="jst-cntr"><?php _e( 'Qty', 'event_espresso' ); ?></th>
					<th scope="col" width="15%" class="jst-cntr"><?php _e('Total', 'event_espresso');?></th>
					<?php	do_action( 'AHEE__registration_page_payment_options__payment_info_table_thead_row_end' ); ?>
				</tr>
			</thead>
			<tbody>
			<?php echo $transaction_details;?>
			<?php	do_action( 'AHEE__registration_page_payment_options__payment_info_table_tbody_end' ); ?>
			</tbody>
		</table>
	</div>
	<div class="clear-float"> </div>

	<?php  echo $before_payment_options;  ?>

	<div id="methods-of-payment">
		<?php echo $payment_options; ?>
	</div>
	<!-- end #methods-of-payment -->

	<?php  echo $after_payment_options;  ?>

