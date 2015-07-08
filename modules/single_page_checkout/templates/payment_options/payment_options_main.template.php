
	<h4 id="reg-page-totals-hdr" class="">
		<span class="drk-grey-text"><?php _e('Registrations:', 'event_espresso'); ?></span> <?php echo $reg_count;?>
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
			<?php	do_action( 'AHEE__registration_page_payment_options__payment_info_table_tbody_end' ); ?>
			</tbody>
		</table>
	</div>

	<?php  echo $default_hidden_inputs;  ?>

	<div id="methods-of-payment">
		<?php echo $payment_options; ?>
		<a id="reg-page-select-other-method-of-payment-lnk" class="hidden smaller-text right" rel=""><?php echo apply_filters( 'FHEE__registration_page_payment_options__select_other_method_of_payment_lnk', __( 'select a different method of payment:', 'event_espresso' )); ?></a>
	</div>
	<!-- end #methods-of-payment -->
