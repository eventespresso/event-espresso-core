<div class="padding"> 
	
	<h4><?php _e('Event URL Display', 'event_espresso'); ?></h4>
	
	<table class="form-table">
		<tbody>		
	
			<tr valign="top">
				<th scope="row">
					<?php _e('Pretty Permalinks', 'event_espresso'); ?>
				</th>
				<td>				
					<fieldset>
						<legend class="screen-reader-text"><span>
								<?php _e('Pretty Permalinks', 'event_espresso'); ?>
							</span></legend>
						<label>
							<?php
							if (isset($org_options['espresso_url_rewrite_activated'])) {
								$checked = $org_options['espresso_url_rewrite_activated'] ? 'checked="checked"' : '';
							} else {
								$checked = '';
							}
							?>
							<input type="checkbox"  value="true" id="espresso_url_rewrite_activated" name="espresso_url_rewrite_activated" <?php echo $checked; ?>/>
							<?php _e('Activate "Pretty" Permalinks', 'event_espresso'); ?>
							<br />
							<span class="description">
								<?php _e('makes URLs look like:', 'event_espresso'); ?>
								"<b><?php echo home_url(); ?><?php _e('/event-registration/your-event-name', 'event_espresso'); ?></b>" 
								<?php _e('instead of:', 'event_espresso'); ?> "<b><?php echo home_url(); ?>?page_id=4&ee=12</b>"<br/>
								<span class="important">
									<?php _e('Must have', 'event_espresso'); ?>
									<a style="color:#d54e21;" href="<?php echo home_url('/'); ?>wp-admin/options-permalink.php">
										<?php _e('WordPress Permalinks', 'event_espresso'); ?>
									</a>
									<?php _e('turned on, and mod_rewrite (or similar) active on server', 'event_espresso'); ?>
								</span> 
								<br/>
								<span class="important">
									<?php _e('If your permalinks stop working and/or get disrupted for some reason (by other plugins, etc), then simply return to this page and they will be automagically reset.', 'event_espresso'); ?>
								</span> 
							</span> 
						</label>
					</fieldset>					
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

</div>