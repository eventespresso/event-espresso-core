<div style="padding:1em;">	
	<form id="att-admin-add-new-attendee-frm" method="post" action="<?php echo $form_url; ?>">
		<?php wp_nonce_field( $action . '_nonce' ); ?>
		<?php if ( $action == 'update_attendee' ) : ?>
		<input type="hidden" name="ATT_ID" value="<?php echo $ATT_ID; ?>">
		<?php endif; ?>
	
		<table class="form-table">
			<tbody>
			
				<tr valign="top">
					<th>
						<label for="ATT_fname"><?php _e('First Name', 'event_espresso'); ?><span class="denotes-required-spn">*</span></label>
					</th>
					<td>
						<div class="validation-notice-dv"><?php _e( 'The following is  a required field', 'event_espresso' );?></div>
						<input class="regular-text required" type="text" id="ATT_fname" name="ATT_fname" value="<?php echo $attendee_fname; ?>"/><br/>
						<span class="description"><?php _e('The attendee\'s given name. ( required value )', 'event_espresso'); ?></span>
					</td>
				</tr>
				
				<tr valign="top">
					<th>
						<label for="ATT_lname"><?php _e('Last Name', 'event_espresso'); ?><span class="denotes-required-spn">*</span></label>
					</th>
					<td>
						<div class="validation-notice-dv"><?php _e( 'The following is  a required field', 'event_espresso' );?></div>
						<input class="regular-text required" type="text" id="ATT_lname" name="ATT_lname" value="<?php echo $attendee_lname; ?>"/><br/>
						<span class="description"><?php _e('The attendee\'s family name. ( required value )', 'event_espresso'); ?></span>
					</td>
				</tr>
				
				<tr valign="top">
					<th>
						<label for="ATT_email"><?php _e('Email Address', 'event_espresso'); ?><span class="denotes-required-spn">*</span></label>
					</th>
					<td>
						<div class="validation-notice-dv"><?php _e( 'The following is  a required field', 'event_espresso' );?></div>
						<input class="regular-text required" type="text" id="ATT_email" name="ATT_email" value="<?php echo $attendee_email; ?>"/><br/>
						<span class="description"><?php _e('( required value )', 'event_espresso'); ?></span>
					</td>
				</tr>
				
				<tr valign="top">
					<th>
						<label for="ATT_phone"><?php _e('Phone Number', 'event_espresso'); ?></label>
					</th>
					<td>
						<input class="regular-text" type="text" id="ATT_phone" name="ATT_phone" value="<?php echo $attendee_phone; ?>"/>
					</td>
				</tr>
				
				<tr valign="top">
					<th>
						<label for="ATT_address"><?php _e('Address', 'event_espresso'); ?></label>
					</th>
					<td>
						<input class="regular-text" type="text" id="ATT_address" name="ATT_address" value="<?php echo $attendee_address; ?>"/>
						<br/>
						<input class="regular-text" type="text" id="ATT_address2" name="ATT_address2" value="<?php echo $attendee_address2; ?>"/>
						<br/>
						<span class="description"><?php _e('The attendee\'s street address.', 'event_espresso'); ?></span>
					</td>
				</tr>
				
				<tr valign="top">
					<th>
						<label for="ATT_city"><?php _e('City', 'event_espresso'); ?></label>
					</th>
					<td>
						<input class="regular-text" type="text" id="ATT_city" name="ATT_city" value="<?php echo $attendee_city; ?>"/>
					</td>
				</tr>
				
				<tr valign="top">
					<th>
						<label for="STA_ID"><?php _e('State / Province', 'event_espresso'); ?></label>
					</th>
					<td>
						<input class="regular-text" type="text" id="STA_ID" name="STA_ID" value="<?php echo $attendee_state_ID; ?>"/>
					</td>
				</tr>
				
				<tr valign="top">
					<th>
						<label for="CNT_ISO"><?php _e('Country', 'event_espresso'); ?></label>
					</th>
					<td>
						<input class="regular-text" type="text" id="CNT_ISO" name="CNT_ISO" value="<?php echo $attendee_country_ISO; ?>"/>
					</td>
				</tr>
				
				<tr valign="top">
					<th>
						<label for="ATT_zip"><?php _e('Zip / Postal Code', 'event_espresso'); ?></label>
					</th>
					<td>
						<input class="medium-text" type="text" id="ATT_zip" name="ATT_zip" value="<?php echo $attendee_zip; ?>"/>
					</td>
				</tr>
				
				<tr valign="top">
					<th>
						<label for="ATT_social"><?php _e('Social Networking Contacts', 'event_espresso'); ?></label>
					</th>
					<td>
						<textarea class="" id="ATT_social" name="ATT_social" cols="40" rows="2" ><?php echo $attendee_social; ?></textarea><br/>
						<span class="description"><?php _e('Social networking contacts for the attendee such as Facebook page, Twitter account, LinkedIn account, etc. One per line please', 'event_espresso'); ?></span>
					</td>							
				</tr>
				
				<tr valign="top">
					<th>
						<label for="ATT_comments"><?php _e('Attendee Comments', 'event_espresso'); ?></label>
					</th>
					<td>
						<textarea class="" id="ATT_comments" name="ATT_comments" cols="40" rows="4" ><?php echo $attendee_comments; ?></textarea><br/>
						<span class="description"><?php _e('Comments from the attendee regarding your events, services, etc collected via forms, emails, etc.', 'event_espresso'); ?></span>
					</td>							
				</tr>
				
				<tr valign="top">
					<th>
						<label for="ATT_notes"><?php _e('Attendee Notes', 'event_espresso'); ?></label>
					</th>
					<td>
						<textarea class="" id="ATT_notes" name="ATT_notes" cols="40" rows="4" ><?php echo $attendee_notes; ?></textarea><br/>
						<span class="description"><?php _e('A place for you to keep any notes pertaining to this attendee, their preferences, special circumstances, etc.', 'event_espresso'); ?></span>
					</td>							
				</tr>
				
			</tbody>
		</table>
	
		<div id="publishing-action">
			<input class="add_new_attendee button-primary" type="submit" name="save_and_edit" value="<?php _e('Save'); ?>" />
			<input class="add_new_attendee button-primary" type="submit" name="save_and_close" value="<?php _e('Save &amp; Close'); ?>" />
		</div>
		<div class="clear"></div>
	
	</form>
</div>