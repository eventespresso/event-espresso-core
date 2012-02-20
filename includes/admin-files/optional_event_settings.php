<?php
$values = array(
		array('id' => 'Y', 'text' => __('Yes', 'event_espresso')),
		array('id' => 'N', 'text' => __('No', 'event_espresso'))
);

$boolean_values = array(
		array('id' => true, 'text' => __('Yes', 'event_espresso')),
		array('id' => false, 'text' => __('No', 'event_espresso'))
);

$default_payment_status = array(
		array('id' => 'Incomplete', 'text' => 'Incomplete'),
		array('id' => 'Pending', 'text' => 'Pending'),
		array('id' => 'Completed', 'text' => 'Completed')
);

$remote_logging_url = '';
if ( isset($org_options['remote_logging_url']) && $org_options['remote_logging_url'] != ''){
	 $remote_logging_url = stripslashes_deep($org_options['remote_logging_url']);
}

/*$bin_name = '';
if (isset($_REQUEST['create_postbin']) && $_REQUEST['create_postbin'] =='Y'){
		$c = curl_init ('http://requestb.in/api/v1/bins');
		curl_setopt ($c, CURLOPT_POST, true);
		curl_setopt ($c, CURLOPT_POSTFIELDS, $data);
		curl_setopt ($c, CURLOPT_RETURNTRANSFER, true);
		$bin = curl_exec ($c);
		curl_close ($c);
		
		//Debug
		//echo "<pre>".print_r(json_decode($bin),true)."</pre>";
		
		$bin_name = json_decode($bin);
		$remote_logging_url = 'http://requestb.in/'.$bin_name->name;
}*/


?>

<div id="espresso_optional_settings" class="metabox-holder">
	<div class="postbox <?php echo isset($_REQUEST['Submit_4']) ? '' : 'closed'; ?>">
		<div title="Click to toggle" class="handlediv"><br />
		</div>
		<h3 class="hndle">
			<?php _e('Optional Settings', 'event_espresso'); ?>
		</h3>
		<div class="inside">
			<div class="padding">
				<?php
				if (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/admin-files/recaptcha_form.php')) {
					require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/admin-files/recaptcha_form.php');
				}
				?>
				<h4>
<?php _e('Payment Settings', 'event_espresso'); ?>
				</h4>
				<table class="form-table">
					<tbody>
						<tr>
							<th><label for="default_payment_status">
									<?php _e(' Default Payment Status', 'event_espresso'); ?>
<?php echo apply_filters('filter_hook_espresso_help', 'payment_status_info') ?> </label></th>
							<td><?php echo select_input('default_payment_status', $default_payment_status, $org_options['default_payment_status']) ?><br />
								<span class="description">
									<?php _e('This value will be automatically filled in for each person\'s payment status,<br />
until payment is made, for each event.', 'event_espresso'); ?>
								</span></td>
						</tr>
						<tr>
							<th><label for="surcharge">
<?php _e('Default Surcharge', 'event_espresso'); ?>
								</label></th>
							<td><input type="text" name="surcharge" size="2" value="<?php echo (!is_numeric($org_options['surcharge'])) ? '0.00' : $org_options['surcharge']; ?>" />
								<br />
								<span class="description">
<?php _e('This value will be automatically filled in for each price type when creating an event.', 'event_espresso'); ?>
								</span></td>
						</tr>
						<tr>
							<th><?php _e('Surcharge Type', 'event_espresso'); ?></th>
							<td><select name="surcharge_type" data-placeholder="Choose a rate..." class="chzn-select wide">
									<option value = "flat_rate" <?php selected($org_options['surcharge_type'], 'flat_rate') ?>>
<?php _e('Flat Rate', 'event_espresso'); ?>
									</option>
									<option value = "pct" <?php selected($org_options['surcharge_type'], 'pct') ?>>
<?php _e('Percent', 'event_espresso'); ?>
									</option>
								</select></td>
						</tr>
						<tr>
							<th><label for="surcharge_text">
<?php _e('Surcharge Display Text', 'event_espresso'); ?>
								</label></th>
							<td><input type="text" name="surcharge_text" value="<?php echo isset($org_options['surcharge_text']) ? $org_options['surcharge_text'] : __('Surcharge', 'event_espresso'); ?>" />
								<br />
								<span class="description">
<?php _e('eg. Surcharge or Service Fee', 'event_espresso'); ?>
								</span></td>
						</tr>
						<tr>
							<th><label>
<?php _e('Show Additional Payment Options for Pending Payments', 'event_espresso'); ?>
								</label></th>
							<td><?php echo select_input('show_pending_payment_options', $values, isset($org_options['show_pending_payment_options']) ? $org_options['show_pending_payment_options'] : 'Y'); ?><br />
								<span class="description">
<?php _e('Shows alternate payment options for "Pending Payments" on the Payment Overview page.', 'event_espresso'); ?>
								</span></td>
						</tr>
					</tbody>
				</table>
				<h4>
<?php _e('Administration Options', 'event_espresso'); ?>
				</h4>
				<table class="form-table">
					<tbody>
						<tr>
							<th><label>
<?php _e('Use the Venue Manager?', 'event_espresso'); ?>
								</label></th>
							<td><?php echo select_input('use_venue_manager', $values, isset($org_options['use_venue_manager']) ? $org_options['use_venue_manager'] : 'Y'); ?></td>
						</tr>
						<tr>
							<th><label>
<?php _e('Use the Staff Manager?', 'event_espresso'); ?>
								</label></th>
							<td><?php echo select_input('use_personnel_manager', $values, isset($org_options['use_personnel_manager']) ? $org_options['use_personnel_manager'] : 'N'); ?></td>
						</tr>
						
						<tr>
							<th><label for="use_attendee_pre_approval">
<?php _e('Enable Attendee Pre-approval', 'event_espresso'); ?>
								</label></th>
							<td><?php echo select_input('use_attendee_pre_approval', $values, isset($org_options['use_attendee_pre_approval']) ? $org_options['use_attendee_pre_approval'] : 'N'); ?></td>
						</tr>
						<tr>
							<th> <label for="use_custom_post_types">
<?php _e('Use the custom post types feature', 'event_espresso'); ?>
								</label>
							</th>
							<td><?php echo select_input('use_custom_post_types', $boolean_values, $org_options['template_settings']['use_custom_post_types'], 'id="use_custom_post_types"'); ?></td>
						</tr>
					</tbody>
				</table>
				<h4>
<?php _e('Extras', 'event_espresso'); ?>
				</h4>
				<table class="form-table">
					<tbody>
						<tr>
							<th><label for="default_mail">
<?php _e('Use Fancy Email Headers', 'event_espresso'); ?> <?php echo apply_filters('filter_hook_espresso_help', 'fancyemailheaders'); ?>
								</label></th>
							<td><?php echo select_input('email_fancy_headers', $values, $org_options['email_fancy_headers']); ?></td>
						</tr>
						<tr>
							<td colspan="2"><strong>
<?php _e('WordPress Dashboard', 'event_espresso'); ?>
								</strong></td>
						</tr>
						<tr>
							<th><label for="espresso_dashboard_widget">
<?php _e('Show the Upcoming Events widget in the dashboard?', 'event_espresso'); ?>
								</label></th>
							<td><?php echo select_input('espresso_dashboard_widget', $values, isset($org_options['espresso_dashboard_widget']) ? $org_options['espresso_dashboard_widget'] : 'Y'); ?></td>
						</tr>
						<tr>
							<th><?php _e('How many days into the future?', 'event_espresso'); ?></th>
							<td><input name="events_in_dasboard" size="5" style="width:50px;" type="text" value="<?php echo stripslashes_deep($org_options['events_in_dasboard']); ?>" /></td>
						</tr>
						<tr>
							<td colspan="2"><strong>
<?php _e('Advanced Time Settings', 'event_espresso'); ?>
								</strong></td>
						<tr>
							<th><label for="time_reg_limit">
<?php _e('Registration Limits on Time Slots', 'event_espresso'); ?>
								</label></th>
							<td><?php echo select_input('time_reg_limit', $values, isset($org_options['time_reg_limit']) ? $org_options['time_reg_limit'] : 'N'); ?><br />
								<span class="important description">
									<?php _e('This function is experimental and may not function as expected.<br />
You will need adjust your attendee limit accordingly.', 'event_espresso'); ?>
								</span></td>
						</tr>
						<tr>
							<th><label>
<?php _e('Custom Time Zone for Each Event', 'event_espresso'); ?>
								</label></th>
							<td><?php echo select_input('use_event_timezones', $values, isset($org_options['use_event_timezones']) ? $org_options['use_event_timezones'] : 'N'); ?><br />
								<span class="description">
<?php _e('This allows you to set a custom time zone for each event.<br />Modificatiosn to your site may be required for this to work properly.', 'event_espresso'); ?>
								</span></td>
						</tr>
						<tr>
							<td colspan="2"><a name="remote_logging_stuff" id="remote_logging_stuff"></a><strong>
<?php _e('Debug/Logging Options', 'event_espresso'); ?>
								</strong></td>
						<tr>
						<tr>
							<th><label>
<?php _e('Enable Full Logging', 'event_espresso'); ?>
								</label></th>
							<td><?php echo select_input('full_logging', $values, isset($org_options['full_logging']) ? $org_options['full_logging'] : 'N'); ?></td>
						</tr>
						<tr>
							<th><label>
<?php _e('Enable Remote Logging', 'event_espresso'); ?>
								<?php echo apply_filters( 'filter_hook_espresso_help', 'remote_logging_info'); ?></label></th>
							<td><?php echo select_input('remote_logging', $values, isset($org_options['remote_logging']) ? $org_options['remote_logging'] : 'N'); ?><br />
								<span class="description">
									<?php _e('Send debugging data to the remote URL below.', 'event_espresso'); ?>
								</span></td>
						</tr>
						<tr <?php //if (isset($_REQUEST['create_postbin']) && $_REQUEST['create_postbin'] =='Y') echo ' class="yellow_inform"'; ?>>
							<th>								<label>
<?php _e('Remote Logging URL', 'event_espresso'); ?>
						    <?php echo apply_filters( 'filter_hook_espresso_help', 'remote_logging_url_info'); ?><?php //if (isset($_REQUEST['create_postbin']) && $_REQUEST['create_postbin'] =='Y') echo '<br /><span class="red_text">'.__('Don\'t forget to save!', 'event_espresso').'</span>'; ?></label></th>
							<td><input name="remote_logging_url" id="remote_logging_url" size="20" class="regular-text" type="text" value="<?php echo $remote_logging_url ?>" /><br />
								<span class="description">
									<?php _e('Example: http://www.postbin.org/MY_UNIQUE_ID', 'event_espresso'); ?>
									
								</span></td>
						</tr>
						<tr>
							<td colspan="2"><strong>
<?php _e('Promote Event Espresso', 'event_espresso'); ?>
								</strong></td>
						<tr>
						<tr>
							<th><label>
									<?php _e('Link to Event Espresso in your Registration Page', 'event_espresso'); ?>
<?php apply_filters('filter_hook_espresso_help', 'affiliate_info'); ?>
								</label></th>
							<td><?php echo select_input('show_reg_footer', $values, isset($org_options['show_reg_footer']) ? $org_options['show_reg_footer'] : 'Y'); ?></td>
						</tr>
						<tr>
							<th><?php _e('Event Espresso Affiliate ID', 'event_espresso'); ?></th>
							<td><input name="affiliate_id" size="10" style="width:70px;" type="text" value="<?php echo isset($org_options['affiliate_id']) && $org_options['affiliate_id'] != '' ? stripslashes_deep($org_options['affiliate_id']) : '0'; ?>" />
								<br />
								<span class="description">
<?php _e('Earn cash for promoting our plugin.', 'event_espresso'); ?>
								</span></td>
						</tr>
						<tr>
							<td colspan="2"><a name="license_key" id="license_key"></a> <strong>
<?php _e('Your Event Espresso License Key', 'event_espresso'); ?>
								</strong></td>
						</tr>
						<tr <?php echo isset($_REQUEST['license_key']) && $_REQUEST['license_key'] == true ? 'class="yellow_alert"' : '' ?>>
							<th> <label for="site_license_key">
<?php _e('Support License Key', 'event_espresso'); ?>
								</label>
							</th>
							<td><input name="site_license_key" id="site_license_key" size="10" class="regular-text" type="text" value="<?php echo isset($org_options['site_license_key']) && $org_options['site_license_key'] != '' ? stripslashes_deep($org_options['site_license_key']) : '0'; ?>" />
								<br />
								<span class="description">
									<?php _e('Adding a valid Support License Key will enable automatic update notifications <br />
and backend updates for Event Espresso Core and any installed addons.'); ?>
								</span>
								</div>

							</td>

						</tr>

					</tbody>

				</table>
				<p>
					<input class="button-primary" type="submit" name="Submit_4" value="<?php _e('Save Options', 'event_espresso'); ?>" id="save_organization_setting_4" />
				</p>
			</div>
		</div>
	</div>
</div>
<?php include_once(EVENT_ESPRESSO_INCLUDES_DIR . 'help_global.php'); ?>
