<!--**********************************  STEP 3 	**********************************-->			
	
	<h2 id="mer-reg-page-step-title-3-hdr" class="mer-reg-page-step-title-hdr">
		<?php _e('Step 3 - Registration Confirmation', 'event_espresso'); ?>
		<a id="mer-reg-page-edit-step-3-lnk" class="mer-reg-page-go-to-step-3 mer-reg-page-edit-step-lnk <?php echo $step_3_edit_lnk_class; ?>" ><?php _e('edit', 'event_espresso'); ?></a>
	</h2>
	
	<div id="mer-reg-page-step-3-dv" class="mer-reg-page-step-dv <?php echo $step_3_dv_class; ?>	">
	
		<form id="mer-registration-frm-3" action="<?php echo $reg_page_complete_reg_url;?>" method="post">
	
			<input type="hidden" id="mer-reg-page-step-3-action" name="ajax_action" value="espresso_process_registration_step_3" />		
			<input type="hidden" id="mer-reg-page-step-3-ajax" name="espresso_ajax" value="0" />		
<?php	if ( ! $payment_required ) { ?>
			<input type="hidden" id="reg-page-no-payment-required-step-3" name="reg-page-no-payment-required" value="1" />
<?php } ?>
			
			<div id="reg-page-confirmation-dv">
				<?php echo $confirmation_data; ?>
			</div>

			<?php echo $recaptcha; ?>			
				
			<div id="mer-reg-page-whats-next-buttons" class="mer-whats-next-buttons">
			
				<a id="mer-reg-page-confirm-reg-btn" class="ui-button ui-button-big ui-priority-primary ui-state-default ui-corner-all add-hover-fx icon-right hide-if-no-js" >
					<strong><?php _e('YES!&nbsp;Confirm&nbsp;Registration&nbsp;', 'event_espresso'); ?></strong><span class="ui-icon ui-icon-circle-check"></span>
				</a>

				<noscript>
					<input type="submit" 
								id="mer-reg-page-confirm-sbmt-btn" 
								class="mer-register-btn no-js-btn ui-button ui-button-big ui-priority-primary ui-state-default ui-corner-all add-hover-fx"
								name="mer-reg-page-confirm-sbmt-btn" 
								value="&nbsp;<?php  _e('YES!&nbsp;Confirm&nbsp;Registration&nbsp;', 'event_espresso'); ?>&nbsp;&raquo;" 
						/>				
				</noscript>	

			</div>		
			<!--end mer-whats-next-buttons-->

		</form>		
	
	</div>
	<!--end Step 3-->
		

