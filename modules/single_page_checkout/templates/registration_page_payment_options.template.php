<!--***************  PAYMENT OPTIONS STEP  ***************-->

	<h2 id="spco-payment_options-hdr" class="spco-step-title-hdr">
		<?php echo sprintf( __('%s Payment Options', 'event_espresso'), $step_nmbr ); ?>
		<a id="spco-edit-payment_options-lnk" class="spco-edit-step-lnk <?php echo $edit_lnk_class; ?>"  href="<?php echo $edit_lnk_url; ?>" rel="payment_options"><?php apply_filters( 'FHEE__registration_page_payment_options__edit_link_text', __( 'edit', 'event_espresso' )); ?></a>
	</h2>
    <?php do_action( 'AHEE__registration_page_payment_options__after_spco_payment_options_header' )?>

	<div id="spco-payment_options-dv" class="spco-step-dv <?php echo $step_dv_class; ?>">

		<form id="spco-registration-payment_options-frm" action="<?php echo $reg_step_form_url;?>" method="post">

			<input type="hidden" id="spco-payment_options-action" name="ajax_action" value="espresso_<?php echo $reg_step_ajax_action;?>" />
			<input type="hidden" id="spco-payment_options-noheader" name="noheader" value="" />
			<input type="hidden" id="spco-payment_options-next-step" name="next_step" value="<?php echo $next_step; ?>" />
			<input type="hidden" id="spco-reg_url_link" name="e_reg_url_link" value="<?php echo $reg_url_link;?>" />
			<input type="hidden" id="spco-revisit" name="revisit" value="<?php echo $revisit;?>" />

	<?php if ( $sold_out_events != '' ) { ?>

			<br/><span class="ee-status sold-out"><?php _e('Sold Out', 'event_espresso');?></span><br/><br/>
			<ul id="spco-sold-out-events-ul"><?php echo $sold_out_events; ?></ul>
			<h6 class="pink-text"><?php _e("We're Sorry", 'event_espresso');?></h6>
			<p id="events-requiring-pre-approval-pg" class="small-text drk-grey-text">
				<?php echo $sold_out_events_msg; ?>
			</p>

			<input id="reg-page-selected-gateway" type="hidden" value="payments_closed" name="selected_gateway">
			<input type="hidden" id="reg-page-no-payment-required-payment_options" name="_reg-page-no-payment-required" value="1" />

	<?php } else if ( $events_requiring_pre_approval != '' ) { ?>

			<h4 class="orange-text"><?php _e('Important Notice:', 'event_espresso');?></h4>
			<p id="events-requiring-pre-approval-pg" class="small-text drk-grey-text">
				<?php echo $events_requiring_pre_approval_msg; ?>
			</p>
			<h6><?php _e('Events Requiring Pre-Approval:', 'event_espresso');?></h6>
			<ul id="spco-pre-approval-events-ul"><?php echo $events_requiring_pre_approval; ?></ul>

			<input id="reg-page-selected-gateway" type="hidden" value="payments_closed" name="selected_gateway">
			<input type="hidden" id="reg-page-no-payment-required-payment_options" name="_reg-page-no-payment-required" value="1" />

<?php
		} else if ( $payment_required ) {

			 if ( $use_coupon_codes or $use_groupon_codes ) {
?>

			<h5><strong><?php _e('Discount Codes', 'event_espresso'); ?></strong></h5>

			<p id="spco-coupon-code-input-pg" class="event_form_field">
				<label><?php _e('Enter discount code', 'event_espresso'); ?></label>
				<input type="text" id="spco-coupon_codes-txt" class="spco-coupon_codes-txt medium-txt <?php echo $css_class;?>"  value="" />
				<a id="spco-apply-coupon-btn" class="ui-button ui-priority-secondary ui-state-default ui-corner-all add-hover-fx hide-if-no-js" href="<?php echo $spco_reg_page_ajax_coupons_url;?>" >
					<span class="ui-icon ui-icon-tag"></span><?php _e('apply&nbsp;coupon&nbsp;', 'event_espresso'); ?>
				</a>
			</p>

			<p id="spco-coupon-codes-pg" class="smaller-text lt-grey-text hide-if-no-js">
				<?php apply_filters( 'FHEE__registration_page_payment_options__coupon_codes_pg', __('Enter any coupon codes you have into the above text field and then click apply coupon. Additional coupon codes can be entered one at a time.', 'event_espresso' )); ?>
			</p>

			<input type="hidden" id="spco-events-that-use-coupon-codes" name="spco-events-that-use-coupon-codes" value="<?php echo $events_that_use_coupon_codes;?>" />
			<input type="hidden" id="spco-events-that-use-groupon-codes" name="spco-events-that-use-groupon-codes" value="<?php echo $events_that_use_groupon_codes;?>"/>

	<?php } // end if $use_coupon_codes ?>

		<div id="spco-discounts-dv" class="<?php echo $reg_page_discounts_dv_class;?>">
			<h4 class="spco-discounts-hdr"><?php _e('Discounts:', 'event_espresso'); ?></h4>
		</div>

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
		$prev_ticket = NULL;
		foreach ( $event_queue['items'] as $line_item => $item ) {
			if ( $item['ticket'] instanceof EE_Ticket && $prev_ticket != $item['ticket']->ID() ) {
?>
                    <tr>
                        <td>
                        <?php
                            echo $item['ticket']->name();
                            echo $item['ticket']->description() ? '<br/>' . $item['ticket']->description() : '';
                        ?>
                        </td>
                        <td class="jst-rght"><?php echo $ticket_count[ $item['ticket']->ID() ];?></td>
                        <td class="jst-rght"><?php echo EEH_Template::format_currency( $item['ticket']->price() );?></td>
                        <td class="jst-rght"><?php echo EEH_Template::format_currency( $item['ticket']->price() * $ticket_count[ $item['ticket']->ID() ] );?></td>
                    </tr>
<?php
                do_action( 'AHEE__registration_page_payment_options__payment_info_table_ticket_row_end', $item['ticket'] );
                $prev_ticket = $item['ticket']->ID();
			}
		}
		if ( $sub_total != ( $item['ticket']->price() * $ticket_count[ $item['ticket']->ID() ] )) {
?>
                    <tr class="reg-page-totals-spn">
                        <td class="jst-rght"><?php echo __('Sub Total: ', 'event_espresso');?></td>
                        <td colspan="3" class="jst-rght"><?php echo EEH_Template::format_currency( $sub_total );?></td>
                        <?php	do_action( 'AHEE__registration_page_payment_options__payment_info_table_sub_total_row_end', $sub_total ); ?>
                    </tr>
<?php
		}
		if ( $taxes ) {
			foreach ( $taxes as $tax ){
				if( (float)$tax->total() > 0 ) {
?>
                    <tr class="reg-page-totals-spn">
                        <td class="jst-rght"><?php echo $tax->percent() . '% ' . $tax->name();?></td>
                        <td colspan="3" class="jst-rght"><?php echo EEH_Template::format_currency( $tax->total() );?></td>
                        <?php	do_action( 'AHEE__registration_page_payment_options__payment_info_table_tax_row_end', $tax ); ?>
                    </tr>
<?php
				}
			}
		}
		if ( $payments ) {
			foreach ( $payments as $payment ){
				if ( $payment instanceof EE_Payment ) {
?>
                    <tr class="reg-page-totals-spn">
						<td class="jst-rght"><?php echo __('Payment: ', 'event_espresso') . date_i18n( $pay_date_frmt, strtotime( $payment->timestamp() )); ?></td>
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

                </tbody>
            </table>
		</div>

		<input id="reg-page-selected-gateway" type="hidden" value="<?php echo $selected_gateway; ?>" name="selected_gateway">
		<div id="methods-of-payment">
			<h3 id="select-method-of-payment-hdr"><?php echo apply_filters( 'FHEE__registration_page_payment_options__select_method_of_payment_hdr', __( 'Please select your method of payment:', 'event_espresso' )); ?></h3>
			<?php	do_action( 'AHEE__display_payment_gateways', $selected_gateway ); ?>
			<a id="reg-page-select-other-gateway-lnk" class="hidden smaller-text right" rel=""><?php echo apply_filters( 'FHEE__registration_page_payment_options__select_other_gateway_lnk', __( 'select a different method of payment:', 'event_espresso' )); ?></a>
		</div>
		<!-- end #methods-of-payment -->
		<?php
				// end  if  $payment_required
		} else { ?>
			<input type="hidden" id="reg-page-no-payment-required-payment_options" name="_reg-page-no-payment-required" value="1" />
			<p><?php echo apply_filters( 'FHEE__registration_page_payment_options__no_payment_required_pg', __( 'This is a free event, so no billing will occur.', 'event_espresso' )); ?></p>
	<?php } ?>

			<?php do_action( 'AHEE__before_spco_whats_next_buttons', 'payment_options', $next_step ); ?>

	<?php if ( ! ( $revisit && ( $events_requiring_pre_approval != '' ||  $sold_out_events != '' ))) { ?>
			<div id="spco-payment_options-whats-next-buttons-dv" class="spco-whats-next-buttons">
				<?php echo EEH_Form_Fields::submit_button( $edit_lnk_url, 'spco-go-to-step-' . $next_step, 'spco-next-step-btn', $next_step_text, 'spco-go-to-step-' . $next_step, TRUE, 'rel="payment_options"' ); ?>
			</div>
			<!--end spco-whats-next-buttons-->
	<?php } ?>

		</form>

		<?php do_action( 'AHEE__SPCO_after_reg_step_form', 'payment_options', $next_step ); ?>

	</div>
	<!--end Step 2-->
