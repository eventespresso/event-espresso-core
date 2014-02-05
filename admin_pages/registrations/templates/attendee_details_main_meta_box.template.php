<?php
EEH_Template_Validator::verify_instanceof($attendee, '$attendee', 'EE_Attendee');
/*
 * @var $attendee EE_Attendee 
 * @var $state_html html for displaying the attendee's state
 * @var $country_html html for displaying the attendee's country
 */
?>
<div style="padding:1em;">	

	<div id="att-admin-add-new-attendee-messages-dv"></div>
	
		<input type="hidden" name="ATT_ID" value="<?php echo $attendee->ID(); ?>">
	
		<table class="form-table">
			<tbody>
			
				<tr valign="top">
					<th>
						<label for="ATT_fname"><?php _e('First Name', 'event_espresso'); ?><span class="denotes-required-spn">*</span></label>
					</th>
					<td>
						<div class="validation-notice-dv"><?php _e( 'The following is  a required field', 'event_espresso' );?></div>
						<input class="regular-text required" type="text" id="ATT_fname" name="ATT_fname" value="<?php echo $attendee->fname(); ?>"/><br/>
						<p class="description"><?php _e('The registrant\'s given name. ( required value )', 'event_espresso'); ?></p>
					</td>
				</tr>
				
				<tr valign="top">
					<th>
						<label for="ATT_lname"><?php _e('Last Name', 'event_espresso'); ?><span class="denotes-required-spn">*</span></label>
					</th>
					<td>
						<div class="validation-notice-dv"><?php _e( 'The following is  a required field', 'event_espresso' );?></div>
						<input class="regular-text required" type="text" id="ATT_lname" name="ATT_lname" value="<?php echo $attendee->lname(); ?>"/><br/>
						<p class="description"><?php _e('The registrant\'s family name. ( required value )', 'event_espresso'); ?></p>
					</td>
				</tr>
				
				<tr valign="top">
					<th>
						<label for="ATT_email"><?php _e('Email Address', 'event_espresso'); ?><span class="denotes-required-spn">*</span></label>
					</th>
					<td>
						<div class="validation-notice-dv"><?php _e( 'The following is  a required field', 'event_espresso' );?></div>
						<input class="regular-text required" type="text" id="ATT_email" name="ATT_email" value="<?php echo $attendee->email(); ?>"/><br/>
						<p class="description"><?php _e('( required value )', 'event_espresso'); ?></p>
					</td>
				</tr>
				
				<tr valign="top">
					<th>
						<label for="ATT_phone"><?php _e('Phone Number', 'event_espresso'); ?></label>
					</th>
					<td>
						<input class="regular-text" type="text" id="ATT_phone" name="ATT_phone" value="<?php echo $attendee->phone(); ?>"/>
					</td>
				</tr>
				
				<tr valign="top">
					<th>
						<label for="ATT_address"><?php _e('Address', 'event_espresso'); ?></label>
					</th>
					<td>
						<input class="regular-text" type="text" id="ATT_address" name="ATT_address" value="<?php echo $attendee->address(); ?>"/>
						<br/>
						<input class="regular-text" type="text" id="ATT_address2" name="ATT_address2" value="<?php echo $attendee->address2(); ?>"/>
						<br/>
						<p class="description"><?php _e('The registrant\'s street address.', 'event_espresso'); ?></p>
					</td>
				</tr>
				
				<tr valign="top">
					<th>
						<label for="ATT_city"><?php _e('City', 'event_espresso'); ?></label>
					</th>
					<td>
						<input class="regular-text" type="text" id="ATT_city" name="ATT_city" value="<?php echo $attendee->city(); ?>"/>
					</td>
				</tr>
				
				<tr valign="top">
					<th>
						<label for="STA_ID"><?php _e('State/Province', 'event_espresso'); ?></label>
					</th>
					<td>
						<?php echo $state_html?>
					</td>
				</tr>
				
				
				<tr valign="top">
					<th>
						<label for="CNT_ISO"><?php _e('Country', 'event_espresso'); ?></label>
					</th>
					<td>
						<?php echo $country_html?>
					</td>
				</tr>
				
				<tr valign="top">
					<th>
						<label for="ATT_zip"><?php _e('Zip/Postal Code', 'event_espresso'); ?></label>
					</th>
					<td>
						<input class="medium-text" type="text" id="ATT_zip" name="ATT_zip" value="<?php echo $attendee->zip(); ?>"/>
					</td>
				</tr>
				
				
				
				<?php do_action( 'AHEE__attendee_details_main_meta_box__template__table_body_end',$attendee );?>
			</tbody>
		</table>
		<?php do_action( 'AHEE__attendee_details_main_meta_box__template__after_table',$attendee );?>
</div>