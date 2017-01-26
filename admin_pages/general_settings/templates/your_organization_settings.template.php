<div class="padding">
	<?php
		//we'll only show site-license keys if this is main_site() (which works for both multi-site and single-site wp installations)
		if ( is_main_site() ) { ?>
		<h2 class="ee-admin-settings-hdr" style="width:300px;">
			<?php _e('Your Event Espresso License Key', 'event_espresso'); ?>
		</h2>

		<table class="form-table">
			<tbody>
				<tr <?php echo isset($_REQUEST['license_key']) && $_REQUEST['license_key'] == true ? 'class="yellow_alert"' : '' ?>>
					<th>
						<label for="site_license_key">
							<?php _e('Support License Key', 'event_espresso'); ?> <?php echo EEH_Template::get_help_tab_link('site_license_key_info');?>
						</label>
					</th>
					<td>
						<input name="site_license_key" id="site_license_key" size="10" class="regular-text" type="text" value="<?php echo $site_license_key; ?>" /><?php echo $site_license_key_verified; ?><br/>
						<p class="description">
							<?php printf( __('Adding a valid Support License Key will enable automatic update notifications and backend updates for Event Espresso Core and any installed add-ons. If this is a Development or Test site, %sDO NOT%s enter your Support License Key.', 'event_espresso'), '<strong>', '</strong>' ); ?>
						</p>
					</td>
				</tr>
			</tbody>
		</table>

	<?php } //end is_main_site() condition ?>




	<h2 id="contact_info_h4" class="ee-admin-settings-hdr">
		<?php _e('Contact Information', 'event_espresso'); ?> <?php echo EEH_Template::get_help_tab_link('contact_info_info');?>
	</h2>

	<table class="form-table">
		<tbody>
			<tr>
				<th>
					<label for="organization_name">
						<?php _e('Organization Name', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<input class="regular-text" type="text" name="organization_name" value="<?php echo $organization_name; ?>" />
					<p class="description">
						<?php echo __('Displayed on all emails and invoices.', 'event_espresso'); ?>
					</p>
				</td>
			</tr>
			<tr>
				<th>
					<label for="organization_address_1">
						<?php _e('Street Address', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<input class="regular-text" type="text" name="organization_address_1" value="<?php echo $organization_address_1; ?>" />
				</td>
			</tr>
			<tr>
				<th>
					<label for="organization_address_2">
						<?php _e('Street Address 2', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<input class="regular-text" type="text" name="organization_address_2" value="<?php echo $organization_address_2; ?>" />
				</td>
			</tr>
			<tr>
				<th>
					<label for="organization_city">
						<?php _e('City', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<input id="organization_city" class="regular-text" type="text" name="organization_city" value="<?php echo $organization_city; ?>" />
				</td>
			</tr>
			<?php echo EEH_Form_Fields::generate_form_input( $states ); ?>
			<?php echo EEH_Form_Fields::generate_form_input( $countries ); ?>
			<tr>
				<th>
					<label for="organization_zip">
						<?php _e('Zip/Postal Code', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<input class="regular-text" type="text" name="organization_zip" size="10" value="<?php echo $organization_zip; ?>" />
				</td>
			</tr>
			<tr>
				<th>
					<label for="organization_email">
						<?php _e('Primary Contact Email', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<input class="regular-text" type="text" name="organization_email" value="<?php echo $organization_email; ?>" />
					<p class="description">
						<?php echo sprintf( esc_html__('This is where notifications go to when you use the %1$s and %2$s shortcodes in the message templates.', 'event_espresso'), '<code>[CO_FORMATTED_EMAIL]</code>', '<code>[CO_EMAIL]</code>' ); ?>
					</p>
				</td>
			</tr>
			<tr>
				<th>
					<label for="organization_phone">
						<?php _e('Phone Number', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<input class="regular-text" type="text" name="organization_phone" value="<?php echo $organization_phone; ?>" />
					<p class="description">
						<?php _e('The phone number for your organization.', 'event_espresso'); ?>
					</p>
				</td>
			</tr>
			<tr>
				<th>
					<label for="organization_vat">
						<?php _e('VAT/Tax Number', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<input class="regular-text" type="text" name="organization_vat" value="<?php echo $organization_vat; ?>" />
					<p class="description">
						<?php _e('The VAT/Tax Number may be displayed on invoices and receipts.', 'event_espresso'); ?>
					</p>
				</td>
			</tr>
		</tbody>
	</table>

	<h2 class="ee-admin-settings-hdr">
		<?php _e('Company Logo', 'event_espresso'); ?> <?php echo EEH_Template::get_help_tab_link('organization_logo_info');?>
	</h2>

	<table class="form-table">
		<tbody>
			<tr>
				<th>
					<label for="upload_image">
						<?php _e('Upload New Logo', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<input id="upload_image" type="text" class="regular-text" name="organization_logo_url" value="<?php echo $organization_logo_url ?>" />
					<input id="upload_image_button" type="button" value="<?php _e('Upload Image', 'event_espresso'); ?>" />
					<p class="description">
						<?php _e('Your logo will be used on custom invoices, tickets, certificates, and payment templates.', 'event_espresso'); ?>
					</p>
				</td>
			</tr>

			<tr>
				<th>
					<label for="upload_image">
						<?php _e('Existing Logo', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php
					if ( $organization_logo_url ) {
						?>
						<p id="default-logo-thumb">
							<img id="current-image-thumb" src="<?php echo $organization_logo_url ?>" alt="" /><br />
							<a id='remove-image' href='#' title='<?php esc_attr_e('Remove Image', 'event_espresso'); ?>' onclick='return false;'>
								<?php _e('Remove Image', 'event_espresso'); ?>
							</a>
						</p>
						<?php
					} ?>
				</td>
			</tr>

		</tbody>
	</table>
	<br/><br/>

	<h2 class="ee-admin-settings-hdr">
		<?php _e('Social Links', 'event_espresso'); ?> <?php echo EEH_Template::get_help_tab_link('social_links_info');?>
	</h2>
	<p class="description"><?php _e('Enter any links to social accounts for your organization here', 'event_espresso'); ?></p>

	<table class="form-table">
		<tbody>
			<tr>
				<th>
					<label for="organization_facebook">
						<?php _e('Facebook', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<input placeholder="facebook.com/profile.name" id="organization_facebook" type="text" class="regular-text" name="organization_facebook" value="<?php echo $organization_facebook ?>" />
				</td>
			</tr>

			<tr>
				<th>
					<label for="organization_twitter">
						<?php _e('Twitter', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<input placeholder="twitter.com/twitterhandle" id="organization_twitter" type="text" class="regular-text" name="organization_twitter" value="<?php echo $organization_twitter ?>" />
				</td>
			</tr>

			<tr>
				<th>
					<label for="organization_linkedin">
						<?php _e('LinkedIn', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<input placeholder="linkedin.com/in/profilename" id="organization_linkedin" type="text" class="regular-text" name="organization_linkedin" value="<?php echo $organization_linkedin ?>" />
				</td>
			</tr>

			<tr>
				<th>
					<label for="organization_pinterest">
						<?php _e('Pinterest', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<input placeholder="pinterest.com/profilename" id="organization_pinterest" type="text" class="regular-text" name="organization_pinterest" value="<?php echo $organization_pinterest ?>" />
				</td>
			</tr>

			<tr>
				<th>
					<label for="organization_google">
						<?php _e('Google+', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<input placeholder="google.com/+profileName" id="organization_google" type="text" class="regular-text" name="organization_google" value="<?php echo $organization_google ?>" />
				</td>
			</tr>

			<tr>
				<th>
					<label for="organization_instagram">
						<?php _e('Instagram', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<input placeholder="instagram.com/handle" id="organization_instagram" type="text" class="regular-text" name="organization_instagram" value="<?php echo $organization_instagram ?>" />
				</td>
			</tr>

		</tbody>
	</table>
	<br/><br/>


	<?php if ( is_main_site() ) : ?>
		<p>
			<?php echo  EE_PUE::espresso_data_collection_optin_text( FALSE ); ?>
		</p>

		<table class="form-table">
			<tbody>

				<tr>
					<th>
						<label for="ueip_optin">
							<?php _e('UXIP Opt In?', 'event_espresso'); ?>
						</label>
					</th>
					<td>
						<?php
							$values=array(
								array('id'=>'yes','text'=> __('Yes! I want to help improve Event Espresso!','event_espresso')),
								array('id'=>'no','text'=> __('Not at this time. Maybe later.','event_espresso'))
							);
							echo EEH_Form_Fields::select_input('ueip_optin', $values, !empty($ee_ueip_optin) ? $ee_ueip_optin : 'yes');
						?>
					</td>
				</tr>

			</tbody>
		</table>
	<?php endif; //end is_main_site() check ?>

</div>
