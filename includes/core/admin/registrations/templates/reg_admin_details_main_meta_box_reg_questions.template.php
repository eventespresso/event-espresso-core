<div id="admin-primary-mbox-questions-dv" class="admin-primary-mbox-dv">
	
	<form name="reg-admin-attendee-questions-frm" id="reg-admin-attendee-questions-frm" action="<?php echo REG_ADMIN_URL; ?>">
		<?php wp_nonce_field( $reg_questions_form_action . '_nonce', $reg_questions_form_action . '_nonce' ); ?>
		<input  type="hidden" name="page" value="<?php echo REG_PG_SLUG; ?>"/>
		<input  type="hidden" name="action" value="<?php echo $reg_questions_form_action; ?>"/>
		<input  type="hidden" name="REG_ID" value="<?php echo $REG_ID; ?>"/>
		<input  type="hidden" name="espresso_ajax" id="espresso-ajax" value="0"/>
		<input  type="hidden" name="noheader" id="reg-admin-noheader-inp" value="true"/>
		
		<?php echo $att_questions; ?>
		
		<table class="form-table ee-width-50">
			<tbody>
				<tr>
					<th>
					</th>
					<td>
						<input id="reg-admin-attendee-questions-submit" class="button-primary" value="Update Attendee Questions" type="submit" />
					</td>
				</tr>
			</tbody>
		</table>

	</form>

	<br class="clear"/>
	
	<p class="ee-attention">
		<?php _e( '<b>Please Note:</b><br/>Editing the primary personal information (first name, last name, email address) for a registrant will result in a new record being created in the attendee contact details table, that will then be applied to <strong>this</strong> registration only. If you wish to simply correct a typo for this attendee, or update other personal details, then update the attendee record directly via the Contact List.', 'event_espresso' );?>
	</p>
	
</div>
