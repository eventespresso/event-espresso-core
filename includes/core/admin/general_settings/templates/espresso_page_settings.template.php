<div class="padding"> 

	<h5>
	<?php 
		echo sprintf( 
				__('The following shortcodes and page settings are required for Event Espresso to function properly. %sThese shortcodes should not be replaced with any other shortcodes. Please view %s for a list of optional shortcodes.', 'event_espresso'),
				'<br />',
				'<a href="admin.php?page=support&action=shortcodes">this page</a>'
			); 
	?>
	</h5>
	
	<table class="form-table">
		<tbody>		
			<?php
			//Check to see if we are using the deprecated SSL option. If we are, recommend updating to WordPress HTTPS (SSL).
			if ( isset( $org_options['event_ssl_active'] ) && $org_options['event_ssl_active'] ) :
			?>			
				
			<tr>				
				<td colspan="2">					
					<div id="ssl-reg" style="background-color: #ffffe0; border: #e6db55 1px solid; padding:4px;">
						<p><strong><?php _e('Attention!', 'event_espresso');?></strong><br /><?php _e('The Secure Payment System has been removed.', 'event_espresso');?></p>
						<p>						
							<?php 
								echo sprintf(
									__('If your site uses SSL to handle secure transactions. Please install the %s plugin now.', 'event_espresso'), 
									'<a href="http://ee-updates.s3.amazonaws.com/espresso-https.1.0.zip" title="Install Now">Event Espresso SSL/HTTPS</a>' 
								);
							?>
							<a href="http://eventespresso.com/forums/2011/09/use-wordpress-https-for-ssl-encryption-on-your-event-espresso-site/" target="_blank">						
								<?php _e( 'More information here.', 'event_espresso')?>						
							</a>						
						</p>
						<label for="event_ssl_active"><?php _e('Turn off this message?', 'event_espresso'); ?></label>
						<br />
						<?php echo select_input('event_ssl_active', $values, empty($org_options['event_ssl_active']) ? false : $org_options['event_ssl_active']); ?>
						<br/>
					</div>				
				</td>				
			</tr>
		<?php endif; ?>
		
		<tr>
			<th>				
				<label for="event_page_id">
					<b><?php _e('Event Registration page', 'event_espresso'); ?></b>
					<?php echo apply_filters('filter_hook_espresso_help', 'registration_page_info'); ?><br />
 					<?php echo General_Settings_Admin_Page::edit_view_links( $org_options['event_page_id'] );?>
				</label>
			</th>
			<td>				
				<select name="event_page_id" data-placeholder="Choose a page..." class="chzn-select wide">
					<option value="0"><?php _e('Main page', 'event_espresso'); ?></option>
					<?php General_Settings_Admin_Page::page_settings_dropdown( $org_options['event_page_id'] ); ?>
				</select>
				<span><?php echo General_Settings_Admin_Page::page_and_shortcode_status( $ee_pages[$org_options['event_page_id']], '[ESPRESSO_EVENTS]' ); ?></span>				
				<br />
				<span class="description">					
					<?php 
					echo sprintf(
						__("This page can be hidden from navigation if desired, but should always contain the %s shortcode.", 'event_espresso'),
						'<span class="highlight" style="padding:3px;margin:0;">[ESPRESSO_EVENTS]</span>'
					); 
					?>					
				</span>
				<br/><br/>
			</td>
		</tr>
		
		<tr>
			<th>				
				<label for="return_url">
					<b><?php _e('Thank You page', 'event_espresso'); ?></b>
					<?php echo apply_filters('filter_hook_espresso_help', 'registration_page_info'); ?><br />
 					<?php echo General_Settings_Admin_Page::edit_view_links( $org_options['return_url'] );?>
				</label>
			</th>
			<td>				
				<select name="return_url" data-placeholder="Choose a page..." class="chzn-select wide">
					<option value="0"><?php _e('Main page', 'event_espresso'); ?></option>
					<?php General_Settings_Admin_Page::page_settings_dropdown( $org_options['return_url'] ); ?>
				</select>
				<span><?php echo General_Settings_Admin_Page::page_and_shortcode_status( $ee_pages[$org_options['return_url']], '[ESPRESSO_PAYMENTS]' ); ?></span>				
				<br />
				<span class="description">					
					<?php 
					echo sprintf(
						__( 'This page should be hidden from your navigation, but still viewable to the public (not password protected), and should always contain the %s shortcode.', 'event_espresso' ),
						'<span class="highlight" style="padding:3px;margin:0;">[ESPRESSO_PAYMENTS]</span>'
					); 
					?>					
				</span>
				<br/><br/>
			</td>
		</tr>
		
		<tr>
			<th>				
				<label for="notify_url">
					<b><?php _e('Transactions page', 'event_espresso'); ?></b>
					<?php echo apply_filters('filter_hook_espresso_help', 'registration_page_info'); ?><br />
 					<?php echo General_Settings_Admin_Page::edit_view_links( $org_options['notify_url'] );?>
				</label>
			</th>
			<td>				
				<select name="notify_url" data-placeholder="Choose a page..." class="chzn-select wide">
					<option value="0"><?php _e('Main page', 'event_espresso'); ?></option>
					<?php General_Settings_Admin_Page::page_settings_dropdown( $org_options['notify_url'] ); ?>
				</select>
				<span><?php echo General_Settings_Admin_Page::page_and_shortcode_status( $ee_pages[$org_options['notify_url']], '[ESPRESSO_TXN_PAGE]' ); ?></span>				
				<br />
				<span class="description">					
					<?php 
					echo sprintf(
						__( 'This page should be hidden from your navigation, but still viewable to the public (not password protected), and should always contain the %s shortcode.', 'event_espresso' ),
						'<span class="highlight" style="padding:3px;margin:0;">[ESPRESSO_TXN_PAGE]</span>'
					); 
					?>					
				</span>
				<br/><br/>
			</td>
		</tr>
	
		<tr>
			<th>				
				<label for="cancel_return">
					<b><?php _e('Cancel/Return page', 'event_espresso'); ?></b>
					<?php echo apply_filters('filter_hook_espresso_help', 'registration_page_info'); ?><br />
 					<?php echo General_Settings_Admin_Page::edit_view_links( $org_options['cancel_return'] );?>
				</label>
			</th>
			<td>				
				<select name="cancel_return" data-placeholder="Choose a page..." class="chzn-select wide">
					<option value="0"><?php _e('Main page', 'event_espresso'); ?></option>
					<?php General_Settings_Admin_Page::page_settings_dropdown( $org_options['cancel_return'] ); ?>
				</select>
				<span><?php echo General_Settings_Admin_Page::page_and_shortcode_status( $ee_pages[$org_options['cancel_return']], '[ESPRESSO_TXN_PAGE]' ); ?></span>				
				<br />
				<span class="description">					
					<?php 
					echo sprintf(
						__( 'This page should be hidden from your navigation, but still viewable to the public (not password protected), and should always contain a "cancelled transaction" message and the %s shortcode.', 'event_espresso' ),
						'<span class="highlight" style="padding:3px;margin:0;">[ESPRESSO_TXN_PAGE]</span>'
					); 
					?>					
				</span>
				<br/><br/>
			</td>
		</tr>
	
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

</div>