<div style="padding:1em;">	
	<form id="att-admin-add-new-attendee-frm" method="post" action="<?php echo $edit_attendee_form_url; ?>">
		<?php wp_nonce_field( $action . '_nonce' ); ?>
		<?php if ( $action == 'update_attendee' ) : ?>
		<input type="hidden" name="ATT_ID" value="<?php echo $ATT_ID; ?>">
		<?php endif; ?>
	
		<table class="form-table">
			<tbody>
			
				<tr valign="top">
					<th><label for="ATT_fname"><?php _e('First Name', 'event_espresso'); ?></label></th>
					<td>
						<div class="validation-notice-dv"><?php _e( 'The following is  a required field', 'event_espresso' );?></div>
						<input class="regular-text required" type="text" id="ATT_fname" name="ATT_fname" value="<?php echo html_entity_decode( stripslashes( $attendee->fname() ), ENT_QUOTES, 'UTF-8' ); ?>"/><br/>
						<span class="description"><?php _e('The attendee\'s given name.', 'event_espresso'); ?></span>
					</td>
				</tr>
				
				<tr valign="top">
					<th><label for="ATT_lname"><?php _e('Last Name', 'event_espresso'); ?></label></th>
					<td>
						<div class="validation-notice-dv"><?php _e( 'The following is  a required field', 'event_espresso' );?></div>
						<input class="regular-text required" type="text" id="ATT_lname" name="ATT_lname" value="<?php echo html_entity_decode( stripslashes( $attendee->lname() ), ENT_QUOTES, 'UTF-8' ); ?>"/><br/>
						<span class="description"><?php _e('The attendee\'s family name.', 'event_espresso'); ?></span>
					</td>
				</tr>
				
				<tr valign="top">
					<th><label for="ATT_email"><?php _e('Email Address', 'event_espresso'); ?></label></th>
					<td>
						<div class="validation-notice-dv"><?php _e( 'The following is  a required field', 'event_espresso' );?></div>
						<input class="regular-text required" type="text" id="ATT_email" name="ATT_email" value="<?php echo $attendee->email(); ?>"/>
					</td>
				</tr>
				
				<tr valign="top">
					<th><label for="ATT_phone"><?php _e('Phone Number', 'event_espresso'); ?></label></th>
					<td>
						<input class="regular-text" type="text" id="ATT_phone" name="ATT_phone" value="<?php echo $attendee->phone(); ?>"/>
					</td>
				</tr>
				
				<tr valign="top">
					<th><label for="ATT_address"><?php _e('Address', 'event_espresso'); ?></label></th>
					<td>
						<input class="regular-text" type="text" id="ATT_address" name="ATT_address" value="<?php echo html_entity_decode( stripslashes( $attendee->address() ), ENT_QUOTES, 'UTF-8' ); ?>"/>
						<br/>
						<input class="regular-text" type="text" id="ATT_address2" name="ATT_address2" value="<?php echo html_entity_decode( stripslashes( $attendee->address2() ), ENT_QUOTES, 'UTF-8' ); ?>"/>
						<br/>
						<span class="description"><?php _e('The attendee\'s street address.', 'event_espresso'); ?></span>
					</td>
				</tr>
				
				<tr valign="top">
					<th><label for="ATT_city"><?php _e('City', 'event_espresso'); ?></label></th>
					<td>
						<input class="regular-text" type="text" id="ATT_city" name="ATT_city" value="<?php echo html_entity_decode( stripslashes( $attendee->city() ), ENT_QUOTES, 'UTF-8' ); ?>"/>
					</td>
				</tr>
				
				<tr valign="top">
					<th><label for="STA_ID"><?php _e('State / Province', 'event_espresso'); ?></label></th>
					<td>
						<input class="regular-text" type="text" id="STA_ID" name="STA_ID" value="<?php echo $attendee->state_ID(); ?>"/>
					</td>
				</tr>
				
				<tr valign="top">
					<th><label for="CNT_ISO"><?php _e('Country', 'event_espresso'); ?></label></th>
					<td>
						<input class="regular-text" type="text" id="CNT_ISO" name="CNT_ISO" value="<?php echo $attendee->country_ISO(); ?>"/>
					</td>
				</tr>
				
				<tr valign="top">
					<th><label for="ATT_zip"><?php _e('Zip / Postal Code', 'event_espresso'); ?></label></th>
					<td>
						<input class="medium-text" type="text" id="ATT_zip" name="ATT_zip" value="<?php echo $attendee->zip(); ?>"/>
					</td>
				</tr>
				
				<tr valign="top">
					<th><label for="ATT_social"><?php _e('Social Networking Contacts', 'event_espresso'); ?></label></th>
					<td>
						<textarea class="" id="ATT_social" name="ATT_social" cols="40" rows="2" >
							<?php echo html_entity_decode( stripslashes( $attendee->social() ), ENT_QUOTES, 'UTF-8' ); ?>
						</textarea><br/>
						<span class="description"><?php _e('Social networking contacts for the attendee such as Facebook page, Twitter account, LinkedIn account, etc. One per line please', 'event_espresso'); ?></span>
					</td>							
				</tr>
				
				<tr valign="top">
					<th><label for="ATT_comments"><?php _e('Attendee Comments', 'event_espresso'); ?></label></th>
					<td>
						<textarea class="" id="ATT_comments" name="ATT_comments" cols="40" rows="4" >
							<?php echo html_entity_decode( stripslashes( $attendee->comments() ), ENT_QUOTES, 'UTF-8' ); ?>
						</textarea><br/>
						<span class="description"><?php _e('Comments from the attendee regarding your events, services, etc collected via forms, emails, etc.', 'event_espresso'); ?></span>
					</td>							
				</tr>
				
				<tr valign="top">
					<th><label for="ATT_notes"><?php _e('Attendee Notes', 'event_espresso'); ?></label></th>
					<td>
						<textarea class="" id="ATT_notes" name="ATT_notes" cols="40" rows="4" >
							<?php echo html_entity_decode( stripslashes( $attendee->notes() ), ENT_QUOTES, 'UTF-8' ); ?>
						</textarea><br/>
						<span class="description"><?php _e('A place for you to keep any notes pertaining to this attendee, their preferences, special circumstances, etc.', 'event_espresso'); ?></span>
					</td>							
				</tr>
				
			</tbody>
		</table>
	
		<div id="publishing-action">
			<input class="button-primary" type="submit" name="Submit" value="<?php _e('Save Changes'); ?>" id="add_new_attendee" />
		</div>
		<div class="clear"></div>
	
	</form>
</div>