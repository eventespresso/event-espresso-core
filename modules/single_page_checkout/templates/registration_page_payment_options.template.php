<!--***************  PAYMENT OPTIONS STEP  ***************-->

	<h2 id="spco-payment_options-hdr" class="spco-step-title-hdr">
		<?php echo sprintf( __('%s Payment Options', 'event_espresso'), $step_nmbr ); ?>
		<a id="spco-edit-payment_options-lnk" class="spco-edit-step-lnk <?php echo $edit_lnk_class; ?>"  href="<?php echo $edit_lnk_url; ?>" rel="payment_options"><?php _e('edit', 'event_espresso'); ?></a>
	</h2>

	<div id="spco-payment_options-dv" class="spco-step-dv <?php echo $step_dv_class; ?>">

		<form id="spco-registration-payment_options-frm" action="<?php echo $reg_step_form_url;?>" method="post">

			<input type="hidden" id="spco-payment_options-action" name="ajax_action" value="espresso_<?php echo $reg_step_ajax_action;?>" />
			<input type="hidden" id="spco-payment_options-noheader" name="noheader" value="" />		
			<input type="hidden" id="spco-payment_options-next-step" name="next_step" value="<?php echo $next_step; ?>" />		
			<input type="hidden" id="spco-reg_url_link" name="e_reg_url_link" value="<?php echo $reg_url_link;?>" />
			<input type="hidden" id="spco-revisit" name="revisit" value="<?php echo $revisit;?>" />

<?php
		if ( $sold_out_events != '' ) { ?>
			<br/><span class="ee-status sold-out"><?php _e('Sold Out', 'event_espresso');?></span><br/><br/>
			<ul id="spco-sold-out-events-ul"><?php echo $sold_out_events; ?></ul>
			<h6 class="pink-text"><?php _e("We're Sorry", 'event_espresso');?></h6>
			<p id="events-requiring-pre-approval-pg" class="small-text drk-grey-text">
				<?php echo $sold_out_events_msg; ?>				
			</p>
			
			
			
			<input id="reg-page-selected-gateway" type="hidden" value="payments_closed" name="selected_gateway">
			<input type="hidden" id="reg-page-no-payment-required-payment_options" name="reg-page-no-payment-required" value="1" />

<?php
		} else if ( $events_requiring_pre_approval != '' ) { ?>
			<h4 class="orange-text"><?php _e('Important Notice:', 'event_espresso');?></h4>
			<p id="events-requiring-pre-approval-pg" class="small-text drk-grey-text">
				<?php echo $events_requiring_pre_approval_msg; ?>				
			</p>
			<h6><?php _e('Events Requiring Pre-Approval:', 'event_espresso');?></h6>
			<ul id="spco-pre-approval-events-ul"><?php echo $events_requiring_pre_approval; ?></ul>
			
			<input id="reg-page-selected-gateway" type="hidden" value="payments_closed" name="selected_gateway">
			<input type="hidden" id="reg-page-no-payment-required-payment_options" name="reg-page-no-payment-required" value="1" />

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
				<?php _e('Enter any coupon codes (including Groupons) you have into the above text field and then click apply coupon. Additional coupon codes can be entered one at a time.', 'event_espresso'); ?>
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

<?php	if ( $sub_total != $grand_total ) { ?>
		<div class="reg-page-totals-spn">
			<span class="lt-grey-text"><?php echo __('Sub Total: ', 'event_espresso');?></span>
			<span class="reg-page-total-spn"><?php echo$sub_total;?></span>
		</div>
<?php	} ?>
<?php 	if ( $taxes ) {
			foreach ( $taxes as $tax ){
				if( (float)$tax->total() > 0 ) {
?>
		<div class="reg-page-totals-spn">
			<span class="lt-grey-text"><?php echo $tax->percent() . '% ' . $tax->name();?></span>
			<span class="reg-page-total-spn"><?php echo EEH_Template::format_currency( $tax->total() );?></span>
		</div>

<?php
				}
			}
		}
?>
		<div id="reg-page-grand-total-dv" class="reg-page-totals-spn">
			<span class="drk-grey-text"><?php echo __('Total Amount Due: ', 'event_espresso');?></span>
			<span class="reg-page-total-spn"><?php echo $grand_total;?></span>
		</div>

		<input id="reg-page-selected-gateway" type="hidden" value="<?php echo $selected_gateway; ?>" name="selected_gateway">
		<!--<input id="reg-page-selected-gateway-name-free" type="hidden" value="free" name="selected_gateway_name[free]">-->
		<div id="methods-of-payment">
			<h3 id="select-method-of-payment-hdr"><?php _e('Please select your method of payment:', 'event_espresso'); ?></h3>
			<?php	do_action( 'AHEE_display_payment_gateways' ); ?>
			<a id="reg-page-select-other-gateway-lnk" class="hidden smaller-text right" rel=""><?php _e('select a different method of payment:', 'event_espresso'); ?></a>
		</div><!-- / .event-display-boxes payment opts -->
		<?php
				// end  if  $payment_required
		} else { ?>
			<input type="hidden" id="reg-page-no-payment-required-payment_options" name="reg-page-no-payment-required" value="1" />
			<?php _e('This is a free event, so no billing will occur.', 'event_espresso'); ?>
	<?php } ?>

			<?php do_action( 'AHEE__before_spco_whats_next_buttons', 'payment_options', $next_step ); ?>
			
	<?php if ( ! ( $revisit && ( $events_requiring_pre_approval != '' ||  $sold_out_events != '' ))) { ?>
			<div id="spco-payment_options-whats-next-buttons-dv" class="spco-whats-next-buttons">

				<a href="" id="spco-go-to-step-<?php echo $next_step; ?>-btn" class="spco-next-step-btn ee-button ee-register-button huge ee-green hide-if-no-js" rel="payment_options" >
					<?php echo $next_step_text; ?>
				</a>

				<noscript>
					<input type="submit"
								id="spco-go-to-step-<?php echo $next_step; ?>-sbmt-btn"
								class="spco-next-step-btn ee-button ee-register-button huge ee-green no-js-btn"
								name="spco-go-to-step-<?php echo $next_step; ?>-sbmt-btn"
								value="&nbsp;<?php echo $next_step_text; ?>&nbsp;&raquo;"
						/>
				</noscript>

			</div>
			<!--end spco-whats-next-buttons-->
	<?php } ?>

		</form>
		
		<?php do_action( 'AHEE__SPCO_after_reg_step_form', 'payment_options', $next_step ); ?>

	</div>
	<!--end Step 2-->
