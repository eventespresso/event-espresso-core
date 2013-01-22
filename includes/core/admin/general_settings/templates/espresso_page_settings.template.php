<div class="padding"> 
	<a name="page_settings" id="page_settings"></a>
	<p>
		<?php _e('The following shortcodes and page settings are required for Event Espresso to function properly. These shortcodes should not be replaced with any other shortcodes. Please view <a href="admin.php?page=support#shortcodes">this page</a> for a list of optional shortcodes.', 'event_espresso'); ?>
	</p>
	<table class="form-table">
		<tbody>
			<?php
			//Check to see if we are using the deprecated SSL option. If we are, recommend updating to WordPress HTTPS (SSL).
			if (isset($org_options['event_ssl_active'])) {
				if ($org_options['event_ssl_active']) {
					echo '<tr><td colspan="2"><div id="ssl-reg" style="background-color: #ffffe0; border: #e6db55 1px solid; padding:4px;">';
					echo '<p><strong>' . __('Attention!', 'event_espresso') . '</strong><br />' . __('The Secure Payment System has been removed.', 'event_espresso') . '</p>';
					echo '<p>' . __('If your site uses SSL to handle secure transactions. Please install the <a href="http://ee-updates.s3.amazonaws.com/espresso-https.1.0.zip" title="Install Now">Event Espresso SSL/HTTPS</a> plugin now.', 'event_espresso') . ' ' . __('<a href="http://eventespresso.com/forums/2011/09/use-wordpress-https-for-ssl-encryption-on-your-event-espresso-site/" target="_blank">More information here</a>.', 'event_espresso') . '</p>';
					?>
				<label for="event_ssl_active">
					<?php _e('Turn off this message?', 'event_espresso'); ?>
				</label>
				<br />
				<?php
				echo select_input('event_ssl_active', $values, empty($org_options['event_ssl_active']) ? false : $org_options['event_ssl_active']);
				echo '</div></td></tr>';
			}
		}
		?>
		<tr>
			<th><label for="event_page_id">
					<?php _e('Main registration page', 'event_espresso'); ?>
					<?php echo apply_filters('filter_hook_espresso_help', 'registration_page_info'); ?><br />
					<a href="<?php echo home_url(); ?>/wp-admin/post.php?post=<?php echo $org_options['event_page_id']; ?>&action=edit" >
						<?php _e('Edit', 'event_espresso'); ?>
					</a> | <a href="<?php echo home_url(); ?>/?page_id=<?php echo $org_options['event_page_id']; ?>" >
						<?php _e('View', 'event_espresso'); ?>
					</a> </label>
		<p>
			<?php if ($ee_pages[$org_options['event_page_id']][0]->post_status != 'publish') { ?>
				<span style="color:red">
					<?php _e('Not Published', 'event_espresso'); ?>
				</span>
			<?php } else { ?>
				<span style="color:green">
					<?php _e('Published', 'event_espresso'); ?>
				</span>
			<?php } ?>
		</p>
		<p>
			<?php if (strpos($ee_pages[$org_options['event_page_id']][0]->post_content, $ee_pages[$org_options['event_page_id']][1]) === false) { ?>
				<span style="color:red">
					<?php _e('Shortcode Problem', 'event_espresso'); ?>
				</span>
			<?php } else { ?>
				<span style="color:green">
					<?php _e('Shortcode OK', 'event_espresso'); ?>
				</span>
			<?php } ?>
		</p>
		</th>
		<td><select name="event_page_id" data-placeholder="Choose a page..." class="chzn-select wide">
				<option value="0">
					<?php _e('Main page', 'event_espresso'); ?>
				</option>
				<?php parent_dropdown($default = $org_options['event_page_id']); ?>
			</select>
			<br />
			<span class="description"><?php echo sprintf(__("This page can be hidden from navigation if desired, <br />but should always contain the %s shortcode.", 'event_espresso'), '<span class="highlight">[ESPRESSO_EVENTS]</span>'); ?></span></td>
		</tr>
		<tr>
			<th><label for="return_url">
					<?php _e('Auto Return URL', 'event_espresso'); ?>
					<?php echo apply_filters('filter_hook_espresso_help', 'return_url_info'); ?><br />
					<a href="<?php echo home_url(); ?>/wp-admin/post.php?post=<?php echo $org_options['return_url']; ?>&action=edit" >
						<?php _e('Edit', 'event_espresso'); ?>
					</a> | <a href="<?php echo home_url(); ?>/?page_id=<?php echo $org_options['return_url']; ?>" >
						<?php _e('View', 'event_espresso'); ?>
					</a> </label>
		<p>
			<?php if ($ee_pages[$org_options['return_url']][0]->post_status != 'publish') { ?>
				<span style="color:red">
					<?php _e('Not Published', 'event_espresso'); ?>
				</span>
			<?php } else { ?>
				<span style="color:green">
					<?php _e('Published', 'event_espresso'); ?>
				</span>
			<?php } ?>
		</p>
		<p>
			<?php if (strpos($ee_pages[$org_options['return_url']][0]->post_content, $ee_pages[$org_options['return_url']][1]) === false) { ?>
				<span style="color:red">
					<?php _e('Shortcode Problem', 'event_espresso'); ?>
				</span>
			<?php } else { ?>
				<span style="color:green">
					<?php _e('Shortcode OK', 'event_espresso'); ?>
				</span>
			<?php } ?>
		</p></th>
		<td><select name="return_url" data-placeholder="Choose a page..." class="chzn-select wide">
				<option value="0">
					<?php _e('Main page', 'event_espresso'); ?>
				</option>
				<?php parent_dropdown($default = $org_options['return_url']); ?>
			</select>
			<br />
			<span class="description"><?php echo sprintf(__("This page should hidden from your navigation,<br />but still viewable to the public (not password protected),<br />
and should always contain the %s shortcode.", 'event_espresso'), '<span class="highlight">[ESPRESSO_PAYMENTS]</span>'); ?> </span></td>
		</tr>
		<tr>
			<th><label for="notify_url">
					<?php _e('Payment Notification URL', 'event_espresso'); ?>
					<?php echo apply_filters('filter_hook_espresso_help', 'notify_url_info'); ?><br />
					<a href="<?php echo home_url(); ?>/wp-admin/post.php?post=<?php echo $org_options['notify_url']; ?>&action=edit" >
						<?php _e('Edit', 'event_espresso'); ?>
					</a> | <a href="<?php echo home_url(); ?>/?page_id=<?php echo $org_options['notify_url']; ?>" >
						<?php _e('View', 'event_espresso'); ?>
					</a> </label>
		<p>
			<?php if ($ee_pages[$org_options['notify_url']][0]->post_status != 'publish') { ?>
				<span style="color:red">
					<?php _e('Not Published', 'event_espresso'); ?>
				</span>
			<?php } else { ?>
				<span style="color:green">
					<?php _e('Published', 'event_espresso'); ?>
				</span>
			<?php } ?>
		</p>
		<p>
			<?php if (strpos($ee_pages[$org_options['notify_url']][0]->post_content, $ee_pages[$org_options['notify_url']][1]) === false) { ?>
				<span style="color:red">
					<?php _e('Shortcode Problem', 'event_espresso'); ?>
				</span>
			<?php } else { ?>
				<span style="color:green">
					<?php _e('Shortcode OK', 'event_espresso'); ?>
				</span>
			<?php } ?>
		</p></th>
		<td><select name="notify_url" data-placeholder="Choose a page..." class="chzn-select wide">
				<option value="0">
					<?php _e('Main page', 'event_espresso'); ?>
				</option>
				<?php parent_dropdown($default = $org_options['notify_url']); ?>
			</select>
			<br />
			<span class="description"><?php echo sprintf(__("This page should hidden from your navigation, <br />but still viewable to the public (not password protected),<br /> and should always contain the %s shortcode.", 'event_espresso'), '<span class="highlight">[ESPRESSO_TXN_PAGE]</span>'); ?></span></td>
		</tr>
		<tr>
			<th><label for="cancel_return">
					<?php _e('Cancel Return URL', 'event_espresso'); ?>
					<?php echo apply_filters('filter_hook_espresso_help', 'cancel_return_info'); ?><br />
					<a href="<?php echo home_url(); ?>/wp-admin/post.php?post=<?php echo $org_options['cancel_return']; ?>&action=edit" >
						<?php _e('Edit', 'event_espresso'); ?>
					</a> | <a href="<?php echo home_url(); ?>/?page_id=<?php echo $org_options['cancel_return']; ?>" >
						<?php _e('View', 'event_espresso'); ?>
					</a> </label>
		<p>
			<?php if ($ee_pages[$org_options['cancel_return']][0]->post_status != 'publish') { ?>
				<span style="color:red">
					<?php _e('Not Published', 'event_espresso'); ?>
				</span>
			<?php } else { ?>
				<span style="color:green">
					<?php _e('Published', 'event_espresso'); ?>
				</span>
			<?php } ?>
		</p>
		<p>
			<?php if (strpos($ee_pages[$org_options['cancel_return']][0]->post_content, $ee_pages[$org_options['cancel_return']][1]) === false) { ?>
				<span style="color:red">
					<?php _e('Shortcode Problem', 'event_espresso'); ?>
				</span>
			<?php } else { ?>
				<span style="color:green">
					<?php _e('Shortcode OK', 'event_espresso'); ?>
				</span>
			<?php } ?>
		</p></th>
		<td><select name="cancel_return" data-placeholder="Choose a page..." class="chzn-select wide">
				<option value="0">
					<?php _e('Main page', 'event_espresso'); ?>
				</option>
				<?php parent_dropdown($default = $org_options['cancel_return']); ?>
			</select>
			<br />
			<span class="description"> <?php echo sprintf(__("This should be a page on your website that contains a cancelled message %s and the %s shortcode. This page should hidden %s from your navigation, but still viewable to the public (not password protected.)", 'event_espresso'), '<br />', '<span class="highlight">[ESPRESSO_CANCELLED]</span>', '<br />'); ?> </span></td>
		</tr>
		<tr valign="top">
			<th scope="row"><?php _e('Pretty Permalinks', 'event_espresso'); ?></th>
			<td><fieldset>
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
				</fieldset></td>
		</tr>
		</tbody>

	</table>
	<p>
		<input class="button-primary" type="submit" name="Submit_2" value="<?php _e('Save Options', 'event_espresso'); ?>" id="save_organization_setting_2" />
	</p>
</div>