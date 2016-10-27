	<div id="admin-side-mbox-billing-info-dv" class="admin-side-mbox-dv">
<?php if ( empty($billing_form) ) : ?>
		<div class="clearfix">
			<?php _e( 'There is no billing info for this transaction.', 'event_espresso' );?><br/>
		</div>
<?php else :
	function ee_show_billing_info_cleaned( EE_Form_Section_Proper $form_section, $found_cc_data = false ) {
		foreach( $form_section->subsections() as $subsection ) {
			if( $subsection instanceof EE_Form_Input_Base ) {
				if( $subsection->get_sensitive_data_removal_strategy() instanceof EE_All_Sensitive_Data_Removal
                    || $subsection->get_sensitive_data_removal_strategy() instanceof EE_CCV_Sensitive_Data_Removal
                    || $subsection->get_display_strategy() instanceof EE_Hidden_Display_Strategy ){
					continue;
				}
				if( $subsection->get_sensitive_data_removal_strategy() instanceof EE_Credit_Card_Sensitive_Data_Removal ) {
					$found_cc_data = true;
				}
				?>
					<div class="clearfix">
						<span class="admin-side-mbox-label-spn lt-grey-txt float-left"><?php echo $subsection->get_html_for_label();?></span><?php echo $subsection->pretty_value();?>
					</div><?php
			} elseif( $subsection instanceof EE_Form_Section_Proper ) {
				$found_cc_data = ee_show_billing_info_cleaned( $subsection, $found_cc_data);
			}
		}
		return $found_cc_data;
	}
	$found_cc_data = ee_show_billing_info_cleaned( $billing_form );
	if( apply_filters( 
			'FHEE__txn_admin_details_side_meta_box_billing_info__show_default_note', 
			$found_cc_data,
			$billing_form ) ) {?>
		<p class="help"><?php _e( 'Note: Card expiry dates and CCV are not stored. Only the last 4 digits of card numbers are stored.', 'event_espresso' );?></p>
	<?php }
	do_action( 'AHEE__txn_admin_details_side_meta_box_billing_info__billing_form_footer', $billing_form );
	endif; ?>

	</div>

