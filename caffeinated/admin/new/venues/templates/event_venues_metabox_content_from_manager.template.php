<table class="form-table">
	<tr>
		<td valign="top" class="use-ven-manager"><fieldset id="venue-manager">
				<legend><?php echo __('Venue Information', 'event_espresso') ?></legend>
				<?php if (!$this->_espresso_venue_dd()) : ?>
					<p class="info">
						<b><?php _e('You have not created any venues yet.', 'event_espresso'); ?></b>
					</p>
					<p><a href="admin.php?page=espresso_venues"><?php echo __('Add venues to the Venue Manager', 'event_espresso') ?></a></p>
				<?php else: ?>
					<?php echo $venue_selection; ?>
				<?php endif; ?>
			</fieldset>
		</td>
	</tr>
</table>