<!--**********************************  STEP 2 	**********************************-->		
	
	<h2 id="mer-reg-page-step-title-2-hdr" class="mer-reg-page-step-title-hdr">
		<?php _e('Step 2 - Payment Options', 'event_espresso'); ?>
		<a id="mer-reg-page-edit-step-2-lnk" class="mer-reg-page-go-to-step-2 mer-reg-page-edit-step-lnk <?php echo $step_2_edit_lnk_class; ?>" ><?php _e('edit', 'event_espresso'); ?></a>
	</h2>
	
	<div id="mer-reg-page-step-2-dv" class="mer-reg-page-step-dv <?php echo $step_2_dv_class; ?>">

		<form id="mer-registration-frm-2" action="<?php echo $reg_page_goto_step_3_url;?>" method="post">

			<input type="hidden" id="mer-reg-page-step-2-action" name="ajax_action" value="espresso_process_registration_step_2" />		
			<input type="hidden" id="mer-reg-page-step-2-ajax" name="espresso_ajax" value="0" />		

<?php 
		if ( $events_requiring_pre_approval != '' ) { ?>
			<h4 class="important-notice small-text"><?php _e('Important Notice:', 'event_espresso');?></h4>
			<p id="events-requiring-pre-approval-pg" class="small-text drk-grey-text"><?php echo __('The following events require attendee pre-approval and will not be billed during this transaction. Billing will only occur after the attendee has been approved by the event organizer. If this is a free event, then no billing will occur.', 'event_espresso'); ?></p>
			<h6><?php _e('Events Requiring Pre-Approval:', 'event_espresso');?></h6>
			<ul><?php echo $events_requiring_pre_approval; ?></ul>

<?php 
		} 	// end  if  $events_requiring_pre_approval 

			if ( $payment_required ) {
			
				do_action('action_hook_espresso_display_payment_gateways');
				
				 if ( $use_coupon_codes or $use_groupon_codes ) { 
?>
		
			<h5><strong><?php _e('Discount Codes', 'event_espresso'); ?></strong></h5>
			
			<p id="mer-reg-page-coupon-code-input-pg" class="event_form_field">
				<label><?php _e('Enter discount code', 'event_espresso'); ?></label>			
				<input type="text" id="mer-reg-page-coupon_codes-txt" class="mer-reg-page-coupon_codes-txt medium-txt <?php echo $css_class;?>"  value="" />
				<a id="mer-reg-page-apply-coupon-btn" class="ui-button ui-priority-secondary ui-state-default ui-corner-all add-hover-fx hide-if-no-js" href="<?php echo $mer_reg_page_ajax_coupons_url;?>" >
					<span class="ui-icon ui-icon-tag"></span><?php _e('apply&nbsp;coupon&nbsp;', 'event_espresso'); ?>
				</a>
			</p>
				
			<p id="mer-reg-page-coupon-codes-pg" class="smaller-text lt-grey-text hide-if-no-js">
				<?php _e('Enter any coupon codes (including Groupons) you have into the above text field and then click apply coupon. Additional coupon codes can be entered one at a time.', 'event_espresso'); ?>
			</p>
			
			<input type="hidden" id="mer-reg-page-events-that-use-coupon-codes" name="mer-reg-page-events-that-use-coupon-codes" value="<?php echo $events_that_use_coupon_codes;?>" />
			<input type="hidden" id="mer-reg-page-events-that-use-groupon-codes" name="mer-reg-page-events-that-use-groupon-codes" value="<?php echo $events_that_use_groupon_codes;?>"/>	
		
<?php } // end if $use_coupon_codes ?>

		<div id="mer-reg-page-discounts-dv" class="<?php echo $reg_page_discounts_dv_class;?>">		
			<h4 class="mer-reg-page-discounts-hdr"><?php _e('Discounts:', 'event_espresso'); ?></h4>				
		</div>

		<h4 id="mer-reg-page-totals-hdr" class="overline-hdr">
			<span class="drk-grey-text"><?php _e('Billable Registrations:', 'event_espresso'); ?></span> <?php echo $total_items;?> 
			<span id="mer-reg-page-totals-spn">
				<span class="drk-grey-text"><?php echo __('Total Amount Due: ', 'event_espresso');?></span>
				<?php echo $currency_symbol;?><span id="mer-reg-page-grand-total-spn"><?php echo$grand_total;?></span>
			</span>
		</h4>

<?php // end  if  $payment_required	
			} else { ?>
			<input type="hidden" id="reg-page-no-payment-required" name="reg-page-no-payment-required" value="1" />	
<?php }  ?>
	
		<div id="mer-reg-page-whats-next-buttons" class="mer-whats-next-buttons">
		
			<a id="mer-reg-page-go-to-step-3-btn" class="mer-register-btn ui-button ui-button-big ui-priority-primary ui-state-default ui-corner-all add-hover-fx icon-right hide-if-no-js" >
				<?php _e('Registration&nbsp;Step&nbsp;3&nbsp;', 'event_espresso'); ?><span class="ui-icon ui-icon-carat-1-e"></span>
			</a>

			<noscript>
				<input type="submit" 
							id="mer-reg-page-go-to-step-3-sbmt-btn" 
							class="mer-register-btn no-js-btn ui-button ui-button-big ui-priority-primary ui-state-default ui-corner-all add-hover-fx"
							name="mer-reg-page-go-to-step-3-sbmt-btn" 
							value="&nbsp;<?php  _e('Registration&nbsp;Step&nbsp;3&nbsp;', 'event_espresso'); ?>&nbsp;&raquo;" 
					/>				
			</noscript>	
			
		</div>				
		<!--end mer-whats-next-buttons-->

		</form>		
	
	</div>
	<!--end Step 2-->	
