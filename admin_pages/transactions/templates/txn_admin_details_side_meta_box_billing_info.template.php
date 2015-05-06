	<div id="admin-side-mbox-billing-info-dv" class="admin-side-mbox-dv">
<?php if ( empty($billing_form) ) : ?>
		<div class="clearfix">
			<?php _e( 'There is no billing info for this transaction.', 'event_espresso' );?><br/>
		</div>
<?php else :
	function ee_show_billing_info_cleaned( EE_Form_Section_Proper $form_section ) {
		foreach( $form_section->subsections() as $subsection ) {
			if( $subsection instanceof EE_Form_Input_Base ) {
				if( $subsection->get_sensitive_data_removal_strategy() instanceof EE_All_Sensitive_Data_Removal ||
					$subsection->get_sensitive_data_removal_strategy() instanceof EE_CCV_Sensitive_Data_Removal ){
					continue;
				}
				?>
					<div class="clearfix">
						<span class="admin-side-mbox-label-spn lt-grey-txt float-left"><?php echo $subsection->get_html_for_label();?></span><?php echo $subsection->pretty_value();?>
					</div><?php
			} elseif( $subsection instanceof EE_Form_Section_Proper ) {
				ee_show_billing_info_cleaned( $subsection );
			}
		}
	}
	ee_show_billing_info_cleaned( $billing_form ); ?>
		<p class="help"><?php _e( 'Note: Card expiry dates and CCV are not stored. Only the last 4 digits of card numbers are stored.', 'event_espresso' );?></p>
<?php endif; ?>

	</div>

