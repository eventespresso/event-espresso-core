<!--***************  REGISTRATION CONFIRMATION STEP ***************-->			
	
	<h2 id="spco-registration_confirmation-hdr" class="spco-step-title-hdr">
		<?php echo sprintf( __('%s Registration Confirmation', 'event_espresso'), $step_nmbr ); ?>
		<a id="spco-edit-registration_confirmation-lnk" class="spco-edit-step-lnk <?php echo $edit_lnk_class; ?>"  href="<?php echo $edit_lnk_url; ?>" rel="registration_confirmation"><?php _e('edit', 'event_espresso'); ?></a>
	</h2>
	
	<div id="spco-registration_confirmation-dv" class="spco-step-dv <?php echo $step_dv_class; ?>	">

		<div id='reg-page-confirmation-dv-and-whats-next-button'>
			<form id="spco-registration-registration_confirmation-frm" action="<?php echo $reg_step_form_url;?>" method="post">

				<input type="hidden" id="spco-registration_confirmation-action" name="ajax_action" value="espresso_<?php echo $reg_step_ajax_action;?>" />		
				<input type="hidden" id="spco-registration_confirmation-noheader" name="noheader" value="" />		
				<input type="hidden" id="spco-reg_url_link" name="e_reg_url_link" value="<?php echo $reg_url_link;?>" />		
				<input type="hidden" id="spco-registration_confirmation-next-step" name="next_step" value="<?php echo $next_step; ?>" />
				<input type="hidden" id="spco-revisit" name="revisit" value="<?php echo $revisit;?>" />

	<?php	if ( ! $payment_required ) { ?>
				<input type="hidden" id="reg-page-no-payment-required-registration_confirmation" name="_reg-page-no-payment-required" value="1" />
	<?php } ?>

				<div id="reg-page-confirmation-dv">
					<?php echo $confirmation_data; ?>
				</div>

				<?php do_action( 'AHEE__before_spco_whats_next_buttons', 'registration_confirmation', $next_step ); ?>

				<div id="spco-registration_confirmation-whats-next-buttons-dv" class="mer-whats-next-buttons">

					<a href="" id="spco-go-to-step-<?php echo $next_step; ?>-btn" class="spco-next-step-btn ee-button ee-register-button huge ee-green hide-if-no-js" rel="registration_confirmation" >
						<strong><?php echo $next_step_text; ?></strong>
					</a>

					<noscript>
						<input type="submit" id="spco-go-to-step-<?php echo $next_step; ?>-sbmt-btn" class="spco-next-step-btn ee-button ee-register-button huge ee-green no-js-btn" name="spco-go-to-step-<?php echo $next_step; ?>-sbmt-btn" value="&nbsp;<?php echo $next_step_text; ?>&nbsp;&raquo;" />				
					</noscript>	

				</div>		
				<!--end mer-whats-next-buttons-->

			</form>		

			<?php do_action( 'AHEE__SPCO_after_reg_step_form', 'registration_confirmation', $next_step ); ?>

		</div>
	</div>
	<!--end Step 3-->
		

