<div id="admin-primary-mbox-questions-dv" class="admin-primary-mbox-dv">
	
	<p id="reg-admin-attendee-reg-frm-warning-pg" class="ee-attention">
	<?php 
		echo sprintf(
			__( '<b>Please Note:</b><br/>Editing the primary personal information below (first name, last name, email address) for a registrant may result in a <strong>new</strong> record being created in the attendee contact details table (if an existing attendee matching those same details is not found). The new (or existing) attendee record will then be associated with this registration.<br/><br/>If you wish to simply correct a typo for this attendee, or update other contact details, then update the attendee record directly via the %sContact List%s.<br/>The reason that editing the primary personal information below might create a new attendee record is because this allows for a way to differentiate between multiple registrations that were originally created using one set of attendee details, and avoid duplicate and/or conflicting registrations.', 'event_espresso' ),
			'<a href=' . $contact_list_url . '>',
			'</a>'
		);
	?>
	</p>

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
	
	
</div>


http://localhost/4.0-DEV/wp-admin/admin.php?page=espresso_registrations&action=contact_list&contact_list_nonce=5650d7b7f3