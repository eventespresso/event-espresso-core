<div class="padding">

	<h4 class="ee-admin-settings-hdr" style="width:300px;">
		<?php _e('Your Event Espresso License Key', 'event_espresso'); ?>
	</h4>

	<table class="form-table">
		<tbody>

			<tr <?php echo isset($_REQUEST['license_key']) && $_REQUEST['license_key'] == true ? 'class="yellow_alert"' : '' ?>>
				<th>
					<label for="site_license_key">
						<?php _e('Support License Key', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<input name="site_license_key" id="site_license_key" size="10" class="regular-text" type="text" value="<?php echo $site_license_key; ?>" /><?php echo $site_license_key_verified; ?><br/>
					<p class="description">
						<?php _e('Adding a valid Support License Key will enable automatic update notifications and backend updates for Event Espresso Core and any installed addons.'); ?>
					</p>			
				</td>
			</tr>

		</tbody>
	</table>

	<p class="ee-attention">
		<?php _e('If this is a Development or Test site, <strong>DO NOT</strong> enter your Support License Key . Save it for the Live Production Site, otherwise you will unnecessarily run into issues with needing to have your Key reset.', 'event_espresso'); ?>
	</p>		

	
	<h4 class="ee-admin-settings-hdr">
		<?php _e('Contact Information', 'event_espresso'); ?>
	</h4>

	<table class="form-table">
		<tbody>
			<tr>
				<th>
					<label for="organization_name">
						<?php _e('Organization Name:', 'event_espresso'); ?>
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
						<?php _e('Street Address:', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<input class="regular-text" type="text" name="organization_address_1" value="<?php echo $organization_address_1; ?>" />
					<p class="description">
						<?php echo __('Displayed on all emails and invoices.', 'event_espresso'); ?>
					</p>
				</td>
			</tr>
			<tr>
				<th>
					<label for="organization_address_2">
						<?php _e('Street Address 2:', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<input class="regular-text" type="text" name="organization_address_2" value="<?php echo $organization_address_2; ?>" />
					<p class="description">
						<?php echo __('Displayed on all emails and invoices.', 'event_espresso'); ?>
					</p>
				</td>
			</tr>
			<tr>
				<th>
					<label for="organization_city">
						<?php _e('City:', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<input class="regular-text" type="text" name="organization_city" value="<?php echo $organization_city; ?>" />
					<p class="description">
						<?php echo __('Displayed on all emails and invoices.', 'event_espresso'); ?>
					</p>
				</td>
			</tr>
			<tr>
				<th>
					<label for="organization_state">
						<?php _e('State / Province:', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<input class="regular-text" type="text" name="organization_state" value="<?php echo $organization_state; ?>" />
					<p class="description">
						<?php echo __('Displayed on all emails and invoices.', 'event_espresso'); ?>
					</p>
				</td>
			</tr>
			<tr>
				<th>
					<label for="organization_zip">
						<?php _e('Zip / Postal Code:', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<input class="regular-text" type="text" name="organization_zip" size="10" value="<?php echo $organization_zip; ?>" />
					<p class="description">
						<?php echo __('Displayed on all emails and invoices.', 'event_espresso'); ?>
					</p>
				</td>
			</tr>
			<tr>
				<th>
					<label for="organization_country">
						<?php _e('Country:', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php printCountriesSelector( 'organization_country', $organization_country ); ?>
					<p class="description">
						<?php echo _e('currency sign: ', 'event_espresso') . $currency_sign; ?>
					</p>
					<p class="description">
						<?php echo __('Displayed on all emails and invoices.', 'event_espresso'); ?>
					</p>
				</td>
			</tr>
			<tr>
				<th>
					<label for="organization_email">
						<?php _e('Primary Contact Email:', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<input class="regular-text" type="text" name="organization_email" value="<?php echo $organization_email; ?>" />
					<p class="description">
						<?php echo __('Displayed on all emails and invoices.', 'event_espresso'); ?>
					</p>
				</td>
			</tr>
		</tbody>
	</table>

	<h4 class="ee-admin-settings-hdr">
		<?php _e('Company Logo', 'event_espresso'); ?>
	</h4>

	<table class="form-table">
		<tbody>
			<tr>
				<th>
					<label for="upload_image">
						<?php _e('Upload New Logo', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<input id="upload_image" type="text" class="regular-text" name="default_logo_url" value="<?php echo $default_logo_url ?>" />
					<input id="upload_image_button" type="button" value="<?php _e('Upload Image', 'event_espresso'); ?>" />
					<p class="description">
						<?php echo __('Your logo will be used on custom invoices, tickets, certificates, and payment templates.', 'event_espresso'); ?>
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
					if ( $default_logo_url ) {
						?>
						<p id="default-logo-thumb">
							<img id="current-image-thumb" src="<?php echo $default_logo_url ?>" alt="" /><br />
							<a id='remove-image' href='#' title='<?php _e('Remove Image', 'event_espresso'); ?>' onclick='return false;'>
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
							array('id'=>'no','text'=> __('No! I\'m a grumpy old toot and I don\'t like you >:(','event_espresso'))
						);
						echo EE_Form_Fields::select_input('ueip_optin', $values, !empty($ee_ueip_optin) ? $ee_ueip_optin : 'yes'); 
					?>
				</td>
			</tr>

		</tbody>
	</table>

</div>