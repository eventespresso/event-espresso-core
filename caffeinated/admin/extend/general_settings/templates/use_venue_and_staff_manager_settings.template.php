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
				<?php echo $use_venue_manager_select; ?>
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
				<?php echo $use_personnel_manager_select; ?>
				<p class="description">
					<?php _e('Activates an additional Event Espresso admin page that allows you to manage event staff and personnel.', 'event_espresso'); ?>
				</p>
			</td>
		</tr>

	</tbody>
</table>