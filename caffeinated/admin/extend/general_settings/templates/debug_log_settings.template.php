<h4 class="ee-admin-settings-hdr">
	<?php _e('Debug/Logging Options', 'event_espresso'); ?>
</h4>

<table class="form-table">
	<tbody>

		<tr>
			<th>
				<?php _e('Enable Full Logging', 'event_espresso'); ?>
				<?php echo EEH_Template::get_help_tab_link('full_logging_info'); ?>
			</th>
			<td>
				<?php echo EEH_Form_Fields::select_input('use_full_logging', $values, $use_full_logging ); ?>
				<p class="description">
					<span class="reminder-spn">
						<?php _e('Please use caution when using this feature. These files may be publicly available.', 'event_espresso'); ?>
					</span><br/>
					<?php echo sprintf( __('File is available at: %s', 'event_espresso'), '<b>/wp-content/uploads/espresso/logs/</b>' ); ?>
				</p>

			</td>
		</tr>

		<tr>
			<th>
				<?php _e('Enable Remote Logging', 'event_espresso'); ?>
				<?php echo EEH_Template::get_help_tab_link('remote_logging_info'); ?>
			</th>
			<td>
				<?php echo EEH_Form_Fields::select_input('use_remote_logging', $values, $use_remote_logging ); ?>
				<p class="description">
					<?php _e('Send debugging data to the remote URL below.', 'event_espresso'); ?>
				</p>
			</td>
		</tr>

		<tr>
			<th>
				<?php _e('Remote Logging URL', 'event_espresso'); ?>
				<?php echo EEH_Template::get_help_tab_link('remote_logging_url_info'); ?>
			</th>
			<td>
				<input name="remote_logging_url" id="remote_logging_url" size="20" class="regular-text" type="text" value="<?php echo $remote_logging_url;?>" />
				<p class="description">
					<?php _e('Example: http://requestb.in/MY_UNIQUE_ID', 'event_espresso'); ?>

				</p>
			</td>
		</tr>

	</tbody>
</table>
