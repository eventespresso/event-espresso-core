<div class="padding">

	<h4><?php _e('Company Logo', 'event_espresso'); ?></h4>
	
	<table class="form-table">
		<tbody>		
			<tr>
				<th>						
					<label for="upload_image"><?php _e('Add a Default Logo', 'event_espresso'); ?><?php echo apply_filters('filter_hook_espresso_help', 'espresso_default_logo_info'); ?></label>
				</th>
				<td>						
					<div id="default-logo-image">
						<input id="upload_image" type="hidden" size="36" name="upload_image" value="<?php echo $org_options['default_logo_url'] ?>" />
						<input id="upload_image_button" type="button" value="Upload Image" />
						<?php if ( $org_options['default_logo_url'] != '' ) { ?>
							<p class="default-logo-thumb">								
								<img src="<?php echo $org_options['default_logo_url'] ?>" alt="" /><br />
								<a id='remove-image' href='#' title='Remove this image' onclick='return false;'><?php _e('Remove Image', 'event_espresso'); ?></a>					
							</p>
						<?php } ?>
					</div>
					<div id="espresso_default_logo_info" class="pop-help" style="display:none">
						<h2><?php _e('Default Logo', 'event_espresso'); ?></h2>
						<p><?php echo __('The default logo will be used in your custom invoice, ticketing, certificates, and payment templates.', 'event_espresso'); ?></p>
					</div>					
				</td>
			</tr>			
		</tbody>
	</table>
	
	<h4><?php _e('Contact Information', 'event_espresso'); ?></h4><?php echo apply_filters('filter_hook_espresso_help', 'contact_info'); ?>
	
	<table class="form-table">
		<tbody>
			<tr>
				<th>					
					<label for="org_name"><?php _e('Organization Name:', 'event_espresso'); ?></label>						
				</th>
				<td>					
					<input class="regular-text" type="text" name="org_name" value="<?php echo stripslashes_deep($org_options['organization']); ?>" />					
				</td>
			</tr>
			<tr>
				<th>					
					<label for="org_street1"><?php _e('Organization Street 1:', 'event_espresso'); ?></label>						
				</th>
				<td>
					<input class="regular-text" type="text" name="org_street1" value="<?php echo $org_options['organization_street1']; ?>" />
				</td>
			</tr>
			<tr>
				<th>
					<label for="org_street2"><?php _e('Organization Street 2:', 'event_espresso'); ?></label>
				</th>
				<td>
					<input class="regular-text" type="text" name="org_street2" value="<?php echo $org_options['organization_street2']; ?>" />
				</td>
			</tr>
			<tr>
				<th>
					<label for="org_city"><?php _e('Organization City:', 'event_espresso'); ?></label>
				</th>
				<td>
					<input class="regular-text" type="text" name="org_city" value="<?php echo $org_options['organization_city']; ?>" />
				</td>
			</tr>
			<tr>
				<th>
					<label for="org_state"><?php _e('Organization State:', 'event_espresso'); ?></label>
				</th>
				<td>
					<input class="regular-text" type="text" name="org_state" value="<?php echo $org_options['organization_state']; ?>" />
				</td>
			</tr>
			<tr>
				<th>
					<label for="org_zip"><?php _e('Organization Zip/Postal Code:', 'event_espresso'); ?></label>
				</th>
				<td>
					<input class="regular-text" type="text" name="org_zip" size="10" value="<?php echo $org_options['organization_zip']; ?>" />
				</td>
			</tr>
			<tr>
				<th>
					<label for="org_country"><?php _e('Organization Country:', 'event_espresso'); ?></label>
				</th>
				<td>					
					<?php printCountriesSelector("org_country", isset($org_options['organization_country']) ? $org_options['organization_country'] : ''); ?> (<?php echo $org_options['currency_symbol']; ?>)
				</td>
			</tr>
			<tr>
				<th>
					<label for="email"><?php _e('Primary contact email:', 'event_espresso'); ?></label>
				</th>
				<td>
					<input class="regular-text" type="text" name="email" value="<?php echo $org_options['contact_email']; ?>" />
				</td>
			</tr>
		</tbody>
	</table>
	
	<h4><?php _e('Time and Date Settings', 'event_espresso'); ?></h4>
	
	<table class="form-table">
		<tbody>
			<tr>
				<th>
					<?php _e('Current Time: ', 'event_espresso'); ?>
				</th>
				<td>					
					<span class="current-date"> <?php echo date(get_option('date_format') . ' ' . get_option('time_format')); ?> </span><br />
					<p class="description">						
						<a class="change-date-time" href="options-general.php" target="_blank"><?php _e('Change timezone and date format settings?', 'event_espresso'); ?></a><br />
						<span class="important"><?php _e('Note:', 'event_espresso'); ?></span>
						<?php _e('You must set the time zone for your city, or the city closest to you. UTC time will not work.', 'event_espresso'); ?>
						<a href="http://ee-updates.s3.amazonaws.com/images/time-zone-settings-example.jpg?TB_iframe=true&height=200&width=630" class="thickbox">
							<?php _e('View an example?', 'event_espresso'); ?>
						</a>							
					</p>							
				</td>
			</tr>
			<tr>
				<th>					
					<label for="expire_on_registration_end"><?php _e('Events expire on registration end date?', 'event_espresso'); ?></label>					
				</th>
				<td>
					<?php echo select_input('expire_on_registration_end', $values, $org_options['expire_on_registration_end']); ?>
				</td>
			</tr>
		</tbody>
	</table>
	
	<p>
		<input class="button-primary" type="submit" name="Submit" value="<?php _e('Save Options', 'event_espresso'); ?>" id="save_organization_saetting_1" />
	</p>
		
</div>