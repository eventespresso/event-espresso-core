	<div id="admin-side-mbox-billing-info-dv" class="admin-side-mbox-dv">
<?php if ( empty($billing_form) ) : ?>
		<div class="clearfix">
			<?php _e( 'There is no billing info for this transaction.', 'event_espresso' );?><br/>
		</div>
<?php else :
		foreach ( $billing_form->inputs() as $form_input ) :
		/* @var $form_input EE_Form_Input_Base */
	if( $form_input->get_sensitive_data_removal_strategy() instanceof EE_All_Sensitive_Data_Removal ||
			$form_input->get_sensitive_data_removal_strategy() instanceof EE_CCV_Sensitive_Data_Removal ){
		continue;
	}
	?>
		<div class="clearfix">
			<span class="admin-side-mbox-label-spn lt-grey-txt float-left"><?php echo $form_input->get_html_for_label();?></span><?php echo $form_input->pretty_value();?>
		</div>

		<?php endforeach; ?>
		<p class="help"><?php _e( 'Note: Credit Card expiry dates and CCV are not stored. Only the last 4 digits of credit card numbers are stored.', 'event_espresso' );?></p>
<?php endif; ?>

	</div>

