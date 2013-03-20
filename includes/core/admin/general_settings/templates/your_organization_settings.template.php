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
					<input name="site_license_key" id="site_license_key" size="10" class="regular-text" type="text" value="<?php echo isset($org_options['site_license_key']) && $org_options['site_license_key'] != '' ? stripslashes_deep($org_options['site_license_key']) : '0'; ?>" /><br/>
					<p class="description">
						<?php _e('Adding a valid Support License Key will enable automatic update notifications and backend updates for Event Espresso Core and any installed addons.'); ?>
					</p>
				</td>
			</tr>

		</tbody>
	</table>

	<h4 class="ee-admin-settings-hdr">
		<?php _e('Contact Information', 'event_espresso'); ?>
	</h4>

	<table class="form-table">
		<tbody>
			<tr>
				<th>
					<label for="organization">
						<?php _e('Organization Name:', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<input class="regular-text" type="text" name="organization" value="<?php echo $organization; ?>" />
					<p class="description">
						<?php echo __('Displayed on all emails and invoices.', 'event_espresso'); ?>
					</p>
				</td>
			</tr>
			<tr>
				<th>
					<label for="organization_street1">
						<?php _e('Street Address:', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<input class="regular-text" type="text" name="organization_street1" value="<?php echo $organization_street1; ?>" />
					<p class="description">
						<?php echo __('Displayed on all emails and invoices.', 'event_espresso'); ?>
					</p>
				</td>
			</tr>
			<tr>
				<th>
					<label for="organization_street2">
						<?php _e('Street Address 2:', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<input class="regular-text" type="text" name="organization_street2" value="<?php echo $organization_street2; ?>" />
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
						<?php echo _e('currency sign: ', 'event_espresso') . $currency_symbol; ?>
					</p>
					<p class="description">
						<?php echo __('Displayed on all emails and invoices.', 'event_espresso'); ?>
					</p>
				</td>
			</tr>
			<tr>
				<th>
					<label for="contact_email">
						<?php _e('Primary Contact Email:', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<input class="regular-text" type="text" name="contact_email" value="<?php echo $contact_email; ?>" />
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

</div>