
	<h4 id="reg-page-totals-hdr" class="">
		<span class="drk-grey-text"><?php _e('Billable Registrations:', 'event_espresso'); ?></span> <?php echo $total_items;?>
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
<?php
/*	$prev_ticket = NULL;
	foreach ( $event_queue['items'] as $line_item => $item ) {
		if ( $item['ticket'] instanceof EE_Ticket && $prev_ticket != $item['ticket']->ID() ) {
*/?><!--
				<tr>
					<td>
					<?php
/*						echo $item['ticket']->name();
						echo $item['ticket']->description() ? '<br/>' . $item['ticket']->description() : '';
					*/?>
					</td>
					<td class="jst-rght"><?php /*echo $ticket_count[ $item['ticket']->ID() ];*/?></td>
					<td class="jst-rght"><?php /*echo EEH_Template::format_currency( $item['ticket']->price() );*/?></td>
					<td class="jst-rght"><?php /*echo EEH_Template::format_currency( $item['ticket']->price() * $ticket_count[ $item['ticket']->ID() ] );*/?></td>
				</tr>
<?php
/*			do_action( 'AHEE__registration_page_payment_options__payment_info_table_ticket_row_end', $item['ticket'] );
			$prev_ticket = $item['ticket']->ID();
		}
	}
	if ( $sub_total != ( $item['ticket']->price() * $ticket_count[ $item['ticket']->ID() ] )) {
*/?>
				<tr class="reg-page-totals-spn">
					<td class="jst-rght"><?php /*echo __('Sub Total: ', 'event_espresso');*/?></td>
					<td colspan="3" class="jst-rght"><?php /*echo EEH_Template::format_currency( $sub_total );*/?></td>
					<?php	/*do_action( 'AHEE__registration_page_payment_options__payment_info_table_sub_total_row_end', $sub_total ); */?>
				</tr>
<?php
/*	}
	if ( $taxes ) {
		foreach ( $taxes as $tax ){
			if( (float)$tax->total() > 0 ) {
*/?>
				<tr class="reg-page-totals-spn">
					<td class="jst-rght"><?php /*echo $tax->percent() . '% ' . $tax->name();*/?></td>
					<td colspan="3" class="jst-rght"><?php /*echo EEH_Template::format_currency( $tax->total() );*/?></td>
					<?php	/*do_action( 'AHEE__registration_page_payment_options__payment_info_table_tax_row_end', $tax ); */?>
				</tr>
<?php
/*			}
		}
	}
	if ( $payments ) {
		foreach ( $payments as $payment ){
			if ( $payment instanceof EE_Payment ) {
*/?>
				<tr class="reg-page-totals-spn">
					<td class="jst-rght"><?php /*echo __('Payment: ', 'event_espresso') . date_i18n( $pay_date_frmt, (int)$payment->timestamp() ); */?></td>
					<td colspan="3" class="jst-rght"><?php /*echo EEH_Template::format_currency( $payment->amount() );*/?></td>
					<?php	/*do_action( 'AHEE__registration_page_payment_options__payment_info_table_payment_row_end', $payment ); */?>
				</tr>
<?php
/*			}
		}
	}
	if ( $grand_total != $amount_owing ) {
*/?>
				<tr class="reg-page-totals-spn">
					<td class="jst-rght"><?php /*echo __('Grand Total: ', 'event_espresso');*/?></td>
					<td colspan="3" class="jst-rght"><?php /*echo EEH_Template::format_currency( $grand_total );*/?></td>
					<?php	/*do_action( 'AHEE__registration_page_payment_options__payment_info_table_grand_total_row_end', $grand_total ); */?>
				</tr>
<?php
/*	}
*/?>
				<tr id="reg-page-grand-total-dv" class="reg-page-totals-spn">
					<td class="jst-rght"><?php /*echo __('Total Amount Due: ', 'event_espresso');*/?></td>
					<td colspan="3" class="jst-rght"><?php /*echo EEH_Template::format_currency( $amount_owing );*/?></td>
					<?php	/*do_action( 'AHEE__registration_page_payment_options__payment_info_table_amount_owing_row_end', $amount_owing ); */?>
				</tr>
				--><?php  ?>
			</tbody>
		</table>
	</div>

	<input id="reg-page-selected-method-of-payment" type="hidden" value="<?php echo $selected_method_of_payment; ?>" name="selected_method_of_payment">
	<div id="methods-of-payment">
		<h3 id="select-method-of-payment-hdr"><?php echo apply_filters( 'FHEE__registration_page_payment_options__select_method_of_payment_hdr', __( 'Please select your method of payment:', 'event_espresso' )); ?></h3>
		<?php
			foreach( $available_payment_methods as $payment_method_options ) {
				foreach( $payment_method_options as $payment_method_option_html ) {
					echo $payment_method_option_html;
				}
			}
		 ?>
		<a id="reg-page-select-other-method-of-payment-lnk" class="hidden smaller-text right" rel=""><?php echo apply_filters( 'FHEE__registration_page_payment_options__select_other_method_of_payment_lnk', __( 'select a different method of payment:', 'event_espresso' )); ?></a>
	</div>
	<!-- end #methods-of-payment -->
