<div class="padding">

	<h4 class="ee-admin-settings-hdr">
		<?php _e('Critical Pages & Shortcodes', 'event_espresso'); ?>
	</h4>
	<p class="ee-attention">
		<?php
		echo sprintf(
			__('The following shortcodes and page settings are required for Event Espresso to function properly. %sThese shortcodes should not be replaced with any other shortcodes. Please view %sthis page%s for a list of optional shortcodes you can use on other pages.', 'event_espresso'),
			'<br />',
			'<a href="admin.php?page=espresso_support&action=shortcodes">',
			'</a>'
		);
		?>
	</p>

	<table class="form-table">
		<tbody>
			<?php
			if ( $event_ssl_active ) : //Check to see if we are using the deprecated SSL option. If we are, recommend updating to WordPress HTTPS (SSL) ?>

			<tr>
				<td colspan="2">
					<div id="ssl-reg" style="background-color: #ffffe0; border: #e6db55 1px solid; padding:4px;">
						<p>
							<strong>
								<?php _e('Attention!', 'event_espresso');?>
							</strong><br /><?php _e('The Secure Payment System has been removed.', 'event_espresso');?>
						</p>
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
						<label for="event_ssl_active">
							<?php _e('Turn off this message?', 'event_espresso'); ?>
						</label>
						<br />
						<?php echo select_input('event_ssl_active', $values, $event_ssl_active ); ?>
						<br/>
					</div>
				</td>
			</tr>
			<?php endif; ?>

			<tr>
				<th>
					<label for="event_page_id">
						<b>
							<?php _e('Event Registration page', 'event_espresso'); ?>
						</b>
						<?php do_action('action_hook_espresso_help', 'registration_page_info'); ?><br />
						<?php echo General_Settings_Admin_Page::edit_view_links( $event_page_id );?>
					</label>
				</th>
				<td>
					<select name="event_page_id" data-placeholder="Choose a page..." class="chzn-select wide">
						<option value="0">
							<?php _e('Main page', 'event_espresso'); ?>
						</option>
						<?php General_Settings_Admin_Page::page_settings_dropdown( $event_page_id ); ?>
					</select>
					<span>
						<?php echo General_Settings_Admin_Page::page_and_shortcode_status( $event_reg_page, '[ESPRESSO_EVENTS]' ); ?>
					</span>
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
						<b>
							<?php _e('Thank You page', 'event_espresso'); ?>
						</b>
						<?php do_action('action_hook_espresso_help', 'registration_page_info'); ?><br />
						<?php echo General_Settings_Admin_Page::edit_view_links( $return_url );?>
					</label>
				</th>
				<td>
					<select name="return_url" data-placeholder="Choose a page..." class="chzn-select wide">
						<option value="0">
							<?php _e('Main page', 'event_espresso'); ?>
						</option>
						<?php General_Settings_Admin_Page::page_settings_dropdown( $return_url ); ?>
					</select>
					<span>
						<?php echo General_Settings_Admin_Page::page_and_shortcode_status( $thank_you_page, '[ESPRESSO_PAYMENTS]' ); ?>
					</span>
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
						<b>
							<?php _e('Transactions page', 'event_espresso'); ?>
						</b>
						<?php do_action('action_hook_espresso_help', 'registration_page_info'); ?><br />
						<span class="lt-grey-text"><?php _e('Notify URL (processes payments)', 'event_espresso'); ?></span><br/>
						<?php echo General_Settings_Admin_Page::edit_view_links( $notify_url );?>
					</label>
				</th>
				<td>
					<select name="notify_url" data-placeholder="Choose a page..." class="chzn-select wide">
						<option value="0">
							<?php _e('Main page', 'event_espresso'); ?>
						</option>
						<?php General_Settings_Admin_Page::page_settings_dropdown( $notify_url ); ?>
					</select>
					<span>
						<?php echo General_Settings_Admin_Page::page_and_shortcode_status( $transactions_page, '[ESPRESSO_TXN_PAGE]' ); ?>
					</span>
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
						<b>
							<?php _e('Cancel/Return page', 'event_espresso'); ?>
						</b>
						<?php do_action('action_hook_espresso_help', 'registration_page_info'); ?><br />
						<?php echo General_Settings_Admin_Page::edit_view_links( $cancel_return );?>
					</label>
				</th>
				<td>
					<select name="cancel_return" data-placeholder="Choose a page..." class="chzn-select wide">
						<option value="0">
							<?php _e('Main page', 'event_espresso'); ?>
						</option>
						<?php General_Settings_Admin_Page::page_settings_dropdown( $cancel_return ); ?>
					</select>
					<span>
						<?php echo General_Settings_Admin_Page::page_and_shortcode_status( $cancel_return_page, '[ESPRESSO_CANCELLED]' ); ?>
					</span>
					<br />
					<span class="description">
						<?php
						echo sprintf(
							__( 'This page should be hidden from your navigation, but still viewable to the public (not password protected), and should always contain a "cancelled transaction" message and the %s shortcode.', 'event_espresso' ),
							'<span class="highlight" style="padding:3px;margin:0;">[ESPRESSO_CANCELLED]</span>'
						);
						?>
					</span>
					<br/><br/>
				</td>
			</tr>

		</tbody>
	</table>

	<h4 class="ee-admin-settings-hdr">
		<?php _e('Event URL Display', 'event_espresso'); ?>
	</h4>

	<table class="form-table">
		<tbody>

			<tr valign="top">
				<th scope="row">
					<?php _e('Activate "Pretty" Permalinks', 'event_espresso'); ?>
				</th>
				<td>
					<?php echo EE_Form_Fields::select_input('espresso_url_rewrite_activated', $values, $espresso_url_rewrite_activated ); ?>
					<span class="description">
						<?php
						echo sprintf(
							__('makes URLs look like: %s/event-registration/your-event-name%s instead of: %s', 'event_espresso'),
							'"<b>'. home_url(),
							'</b>"',
							'"<b>' . home_url() . '?page_id=4&ee=12</b>"'
						);
						?>
					</span>
				</td>
			</tr>

		</tbody>
	</table>

	<p class="ee-attention">
		<?php
		echo sprintf(
			__('You MUST have %sWordPress Permalinks%s turned on, and mod_rewrite (or similar) active on your server for "Pretty" Permalinks to function.%sIf your permalinks stop working and/or get disrupted for some reason (by other plugins, etc), then simply return to this page and they will be automagically reset.', 'event_espresso'),
			'<a style="color:#f00;" href="'. home_url('/') .'wp-admin/options-permalink.php">',
			'</a>',
			'<br />'
		);
		?>
	</p>

</div>