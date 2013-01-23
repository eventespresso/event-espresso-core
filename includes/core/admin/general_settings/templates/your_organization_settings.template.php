<div class="padding">

	<h4><?php _e('Company Logo', 'event_espresso'); ?></h4>
	
	<table class="form-table">
		<tbody>		
			<tr>
				<th>						
					<label for="upload_image"><?php _e('Add a Default Logo', 'event_espresso'); ?></label>
				</th>
				<td>						
					<div id="default-logo-image">
						<input id="upload_image" type="text" class="regular-text" name="default_logo_url" value="<?php echo $default_logo_url ?>" />
						<input id="upload_image_button" type="button" value="Upload Image" /><br/>
						<span class="description"><?php echo __('The default logo will be used in your custom invoice, ticketing, certificates, and payment templates.', 'event_espresso'); ?></span>
						<?php if ( $default_logo_url ) { ?>
							<p id="default-logo-thumb">								
								<img id="current-image-thumb" src="<?php echo $default_logo_url ?>" alt="" /><br />
								<a id='remove-image' href='#' title='Remove this image' onclick='return false;'><?php _e('Remove Image', 'event_espresso'); ?></a>					
							</p>
						<?php } ?>
					</div>				
				</td>
			</tr>			
		</tbody>
	</table>
	
	<h4 style="display: inline-block; width: 230px; margin:3em 0 1em;"><?php _e('Contact Information', 'event_espresso'); ?></h4>
	<span class="description"><?php echo __('Displayed on all emails and invoices.', 'event_espresso'); ?></span>
	
	<table class="form-table">
		<tbody>
			<tr>
				<th>					
					<label for="organization"><?php _e('Organization Name:', 'event_espresso'); ?></label>						
				</th>
				<td>					
					<input class="regular-text" type="text" name="organization" value="<?php echo $organization; ?>" />					
				</td>
			</tr>
			<tr>
				<th>					
					<label for="organization_street1"><?php _e('Organization Street 1:', 'event_espresso'); ?></label>						
				</th>
				<td>
					<input class="regular-text" type="text" name="organization_street1" value="<?php echo $organization_street1; ?>" />
				</td>
			</tr>
			<tr>
				<th>
					<label for="organization_street2"><?php _e('Organization Street 2:', 'event_espresso'); ?></label>
				</th>
				<td>
					<input class="regular-text" type="text" name="organization_street2" value="<?php echo $organization_street2; ?>" />
				</td>
			</tr>
			<tr>
				<th>
					<label for="organization_city"><?php _e('Organization City:', 'event_espresso'); ?></label>
				</th>
				<td>
					<input class="regular-text" type="text" name="organization_city" value="<?php echo $organization_city; ?>" />
				</td>
			</tr>
			<tr>
				<th>
					<label for="organization_state"><?php _e('Organization State:', 'event_espresso'); ?></label>
				</th>
				<td>
					<input class="regular-text" type="text" name="organization_state" value="<?php echo $organization_state; ?>" />
				</td>
			</tr>
			<tr>
				<th>
					<label for="organization_zip"><?php _e('Organization Zip/Postal Code:', 'event_espresso'); ?></label>
				</th>
				<td>
					<input class="regular-text" type="text" name="organization_zip" size="10" value="<?php echo $organization_zip; ?>" />
				</td>
			</tr>
			<tr>
				<th>
					<label for="organization_country"><?php _e('Organization Country:', 'event_espresso'); ?></label>
				</th>
				<td>					
					<?php printCountriesSelector( 'organization_country', $organization_country ); ?> <span class="description"><?php echo _e('currency sign: ', 'event_espresso') . $currency_symbol; ?></span>
				</td>
			</tr>
			<tr>
				<th>
					<label for="contact_email"><?php _e('Primary contact email:', 'event_espresso'); ?></label>
				</th>
				<td>
					<input class="regular-text" type="text" name="contact_email" value="<?php echo $contact_email; ?>" />
				</td>
			</tr>
		</tbody>
	</table>
		
</div>