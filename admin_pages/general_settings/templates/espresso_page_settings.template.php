<div class="padding">

	<h2 class="ee-admin-settings-hdr">
		<?php _e('Critical Pages & Shortcodes', 'event_espresso'); ?>
	</h2>
	<p class="ee-attention">
		<?php
		echo sprintf(
			__('The following shortcodes and page settings are required for Event Espresso to function properly. These shortcodes should not be replaced with any other shortcodes. Please view %sthis page%s for a list of optional shortcodes you can use on other pages.', 'event_espresso'),
			'<a href="admin.php?page=espresso_support">',
			'</a>'
		);
		?>
	</p>

	<table class="form-table">
		<tbody>

			<tr>
				<th>
					<label for="reg_page_id">
						<strong>
							<?php _e('Registration Checkout Page', 'event_espresso'); ?>
						</strong>
						<?php echo EEH_Template::get_help_tab_link('registration_page_info'); ?>
						<br />
						<?php echo General_Settings_Admin_Page::edit_view_links( $reg_page_id );?>
					</label>
				</th>
				<td>
					<select id="reg_page_id" name="reg_page_id" data-placeholder="Choose a page...">
						<option value="0">
							<?php _e('Main Page', 'event_espresso'); ?>
						</option>
						<?php General_Settings_Admin_Page::page_settings_dropdown( $reg_page_id ); ?>
					</select>
					<span>
						<?php echo General_Settings_Admin_Page::page_and_shortcode_status( $reg_page_obj, '[ESPRESSO_CHECKOUT]' ); ?>
					</span>
					<br />
					<p class="description">
						<?php
						echo sprintf(
							__('This page can be hidden from navigation if desired, but should always contain the %s shortcode.', 'event_espresso'),
							'<span class="highlight" style="padding:3px;margin:0;">[ESPRESSO_CHECKOUT]</span>'
						);
						?>
					</p>
					<br/><br/>
				</td>
			</tr>

			<tr>
				<th>
					<label for="txn_page_id">
						<strong>
							<?php _e('Transactions Page', 'event_espresso'); ?>
						</strong>
						<?php echo EEH_Template::get_help_tab_link('notify_url_info'); ?>
						<br />
						<span class="lt-grey-text"><?php _e('Notify URL (processes payments)', 'event_espresso'); ?></span><br/>
						<?php echo General_Settings_Admin_Page::edit_view_links( $txn_page_id );?>
					</label>
				</th>
				<td>
					<select id="txn_page_id" name="txn_page_id" data-placeholder="Choose a page...">
						<option value="0">
							<?php _e('Main Page', 'event_espresso'); ?>
						</option>
						<?php General_Settings_Admin_Page::page_settings_dropdown( $txn_page_id ); ?>
					</select>
					<span>
						<?php echo General_Settings_Admin_Page::page_and_shortcode_status( $txn_page_obj, '[ESPRESSO_TXN_PAGE]' ); ?>
					</span>
					<br />
					<p class="description">
						<?php
						echo sprintf(
							__( 'This page should be hidden from your navigation, but still viewable to the public (not password protected), and should always contain the %s shortcode.', 'event_espresso' ),
							'<span class="highlight" style="padding:3px;margin:0;">[ESPRESSO_TXN_PAGE]</span>'
						);
						?>
					</p>
					<br/><br/>
				</td>
			</tr>

			<tr>
				<th>
					<label for="thank_you_page_id">
						<strong>
							<?php _e('Thank You Page', 'event_espresso'); ?>
						</strong>
						<?php echo EEH_Template::get_help_tab_link('return_url_info'); ?>
						<br />
						<?php echo General_Settings_Admin_Page::edit_view_links( $thank_you_page_id );?>
					</label>
				</th>
				<td>
					<select id="thank_you_page_id" name="thank_you_page_id" data-placeholder="Choose a page...">
						<option value="0">
							<?php _e('Main Page', 'event_espresso'); ?>
						</option>
						<?php General_Settings_Admin_Page::page_settings_dropdown( $thank_you_page_id ); ?>
					</select>
					<span>
						<?php echo General_Settings_Admin_Page::page_and_shortcode_status( $thank_you_page_obj, '[ESPRESSO_THANK_YOU]' ); ?>
					</span>
					<br />
					<p class="description">
						<?php
						echo sprintf(
							__( 'This page should be hidden from your navigation, but still viewable to the public (not password protected), and should always contain the %s shortcode.', 'event_espresso' ),
							'<span class="highlight" style="padding:3px;margin:0;">[ESPRESSO_THANK_YOU]</span>'
						);
						?>
					</p>
					<br/><br/>
				</td>
			</tr>

			<tr>
				<th>
					<label for="cancel_page_id">
						<strong>
							<?php _e('Cancel/Return Page', 'event_espresso'); ?>
						</strong>
						<?php echo EEH_Template::get_help_tab_link('cancel_return_info'); ?>
						<br />
						<?php echo General_Settings_Admin_Page::edit_view_links( $cancel_page_id );?>
					</label>
				</th>
				<td>
					<select id="cancel_page_id" name="cancel_page_id" data-placeholder="Choose a page...">
						<option value="0">
							<?php _e('Main Page', 'event_espresso'); ?>
						</option>
						<?php General_Settings_Admin_Page::page_settings_dropdown( $cancel_page_id ); ?>
					</select>
					<span>
						<?php echo General_Settings_Admin_Page::page_and_shortcode_status( $cancel_page_obj, '[ESPRESSO_CANCELLED]' ); ?>
					</span>
					<br />
					<p class="description">
						<?php
						echo sprintf(
							__( 'This page should be hidden from your navigation, but still viewable to the public (not password protected), and should always contain a "cancelled transaction" message and the %s shortcode.', 'event_espresso' ),
							'<span class="highlight" style="padding:3px;margin:0;">[ESPRESSO_CANCELLED]</span>'
						);
						?>
					</p>
					<br/><br/>
				</td>
			</tr>
			
			<tr>
				<th>
					<label for="event_list_id">
						<strong>
							<?php _e('Event List', 'event_espresso'); ?>
						</strong>
						<?php echo EEH_Template::get_help_tab_link('event_list_cpt_info'); ?>
						<br />
						<a href='<?php echo get_post_type_archive_link('espresso_events') ?>'><?php	_e('View', 'event_espresso');?></a>
					</label>
				</th>
				<td>
					<p class="description">
						<?php echo __('Events are custom post types and use WordPress\' normal archive pages for displaying events.', 'event_espresso') ?>
					</p>
					<p class="description">
						<?php printf(__('If you would still like your events on a page like in Event Espresso 3.1 or earlier, simply create a page and place a shortcode to display them on the page, as described %s here %s', 'event_espresso'),'<a href="admin.php?page=espresso_support">','</a>') ?>
					</p>
					<br/><br/>
				</td>
			</tr>

			<tr>
				<th>
					<label for="venue_list_id">
						<strong>
							<?php _e('Venue List', 'event_espresso'); ?>
						</strong>
						<?php echo EEH_Template::get_help_tab_link('venue_list_cpt_info'); ?>
						<br />
						<a href='<?php echo get_post_type_archive_link('espresso_venues') ?>'><?php	_e('View', 'event_espresso');?></a>
					</label>
				</th>
				<td>
					<p class="description">
						<?php echo __('Venues are custom post types and use WordPress\' normal archive pages for displaying events.', 'event_espresso') ?>
					</p>
					<p class="description">
						<?php printf(__('If you would still like your venues on a page like in Event Espresso 3.1 or earlier, simply create a page and place a shortcode to display them on the page, as described %s here %s', 'event_espresso'),'<a href="admin.php?page=espresso_support">','</a>') ?>
					</p>
				</td>
			</tr>

		</tbody>
	</table>

</div>