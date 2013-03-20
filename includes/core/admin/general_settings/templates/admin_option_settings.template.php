<?php global $caffeinated; ?>
<div class="padding">
	
	<?php if ( $caffeinated ) : ?>
	
	<h4 class="ee-admin-settings-hdr">
		<?php _e('Espresso Admin Managers', 'event_espresso'); ?>
	</h4>

	<table class="form-table">
		<tbody>
			<tr>
				<th>
					<label>
						<?php _e('Use the Venue Manager?', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EE_Form_Fields::select_input('use_venue_manager', $values, $use_venue_manager ); ?>
					<p class="description">
						<?php _e('Activates an additional Event Espresso admin page that allows you to manage multiple event venues and locations.', 'event_espresso'); ?>
					</p>
				</td>
			</tr>
			<tr>
				<th>
					<label>
						<?php _e('Use the Staff Manager?', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EE_Form_Fields::select_input('use_personnel_manager', $values, $use_personnel_manager ); ?>
					<p class="description">
						<?php _e('Activates an additional Event Espresso admin page that allows you to manage event staff and personnel.', 'event_espresso'); ?>
					</p>
				</td>
			</tr>

		</tbody>
	</table>
	
	<?php endif; ?>

	<h4 class="ee-admin-settings-hdr">
		<?php _e('WordPress Dashboard', 'event_espresso'); ?>
	</h4>

	<table class="form-table">
		<tbody>
			<tr>

				<th>
					<label for="espresso_dashboard_widget">
						<?php _e('Upcoming Events Widget', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EE_Form_Fields::select_input('espresso_dashboard_widget', $values, $espresso_dashboard_widget ); ?>
					<p class="description">
						<?php _e('Activates the Upcoming Events Widget in the WordPress Dashboard so that you can see a list of upcoming events as soon as you log in.', 'event_espresso'); ?>
					</p>
				</td>
			</tr>

			<tr>
				<th>
					<?php _e('How many days into the future?', 'event_espresso'); ?>
				</th>
				<td>
					<input name="events_in_dasboard" size="5" style="width:50px;" type="text" value="<?php echo $events_in_dasboard; ?>" />
				</td>
			</tr>

		</tbody>
	</table>

	<h4 class="ee-admin-settings-hdr">
		<?php _e('Time and Date Settings', 'event_espresso'); ?>
	</h4>

	<table class="form-table">
		<tbody>

			<tr>
				<th>
					<?php _e('Current Time: ', 'event_espresso'); ?>
				</th>
				<td>
					<strong>
						<?php echo date(get_option('date_format') . ' ' . get_option('time_format')); ?>
					</strong>
					<p class="description">
						<a class="change-date-time" href="options-general.php" target="_blank">
							<?php _e('Change timezone and date format settings?', 'event_espresso'); ?>
						</a><br />
						<span class="important">
							<?php _e('Note:', 'event_espresso'); ?>
						</span>
						<?php _e('You must set the time zone for your city, or the city closest to you. UTC time will not work.', 'event_espresso'); ?>
						<a href="http://ee-updates.s3.amazonaws.com/images/time-zone-settings-example.jpg?TB_iframe=true&height=200&width=630" class="thickbox">
							<?php _e('View an example?', 'event_espresso'); ?>
						</a>
					</p>
				</td>
			</tr>

			<!--			<tr>
			<th>
			<label>
			<?php _e('Custom Time Zone for Each Event', 'event_espresso'); ?>
			</label>
			</th>
			<td>
			<?php echo EE_Form_Fields::select_input('use_event_timezones', $values, $use_event_timezones ); ?>
			<p class="description">
			<?php _e('This allows you to set a custom time zone for each event. Modificatiosn to your site may be required for this to work properly.', 'event_espresso'); ?>
			</p>
			</td>
			</tr>-->

		</tbody>
	</table>

	<h4 class="ee-admin-settings-hdr">
		<?php _e('Debug/Logging Options', 'event_espresso'); ?>
	</h4>

	<table class="form-table">
		<tbody>

			<tr>
				<th>
					<?php _e('Enable Full Logging', 'event_espresso'); ?> <?php do_action('action_hook_espresso_help', 'full_logging_info'); ?>
				</th>
				<td>
					<?php echo EE_Form_Fields::select_input('full_logging', $values, $full_logging ); ?>
					<p class="description">
						<span class="red_text">
							<?php _e('Please use caution when using this feature. These files may be publicly available.', 'event_espresso'); ?>
						</span>&nbsp;&nbsp;
						<?php echo sprintf( __('File is available at: %s', 'event_espresso'), '<b>/wp-content/uploads/espresso/logs/</b>' ); ?>
					</p>

				</td>
			</tr>

			<tr>
				<th>
					<?php _e('Enable Remote Logging', 'event_espresso'); ?>
					<?php do_action('action_hook_espresso_help', 'remote_logging_info'); ?>
				</th>
				<td>
					<?php echo EE_Form_Fields::select_input('remote_logging', $values, $remote_logging ); ?>
					<p class="description">
						<?php _e('Send debugging data to the remote URL below.', 'event_espresso'); ?>
					</p>
				</td>
			</tr>

			<tr>
				<th>
					<?php _e('Remote Logging URL', 'event_espresso'); ?>
					<?php do_action('action_hook_espresso_help', 'remote_logging_url_info'); ?>
				</th>
				<td>
					<input name="remote_logging_url" id="remote_logging_url" size="20" class="regular-text" type="text" value="<?php echo $remote_logging_url;?>" />
					<p class="description">
						<?php _e('Example: http://www.postbin.org/MY_UNIQUE_ID', 'event_espresso'); ?>

					</p>
				</td>
			</tr>

		</tbody>
	</table>

	<h4 class="ee-admin-settings-hdr">
		<?php _e('Promote Event Espresso', 'event_espresso'); ?>
	</h4>

	<table class="form-table">
		<tbody>

			<tr>
				<th>
					<label>
						<?php _e('Link to Event Espresso in your Registration Page', 'event_espresso'); ?>
						<?php do_action('action_hook_espresso_help', 'affiliate_info'); ?>
					</label>
				</th>
				<td>
					<?php echo EE_Form_Fields::select_input('show_reg_footer', $values, $show_reg_footer ); ?>
				</td>
			</tr>

			<tr>
				<th>
					<?php _e('Event Espresso Affiliate ID', 'event_espresso'); ?>
				</th>
				<td>
					<input name="affiliate_id" class="regular-text" type="text" value="<?php echo $affiliate_id; ?>" />
					<br />
					<p class="description">
						<?php _e('Earn cash for promoting our plugin.', 'event_espresso'); ?>
					</p>
				</td>
			</tr>

		</tbody>
	</table>


</div>
<?php include_once( GEN_SET_TEMPLATE_PATH . 'admin_options_help.php' ); ?>