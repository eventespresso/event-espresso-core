<?php
/**
 * 		Event Registration Subpage 1 - Configure Organization
 *
 * 		@ access public
 * 		@ return void
 */
add_action('in_admin_header', 'espresso_general_settings_add_screen_meta');

function espresso_general_settings_add_screen_meta() {
	$screen = get_current_screen();
	$screen->add_help_tab(array(
			'id' => 'help-content',
			'title' => __('Content'),
			'content' => 'help me!',
	));
	$screen->add_option('layout_columns', array('max' => 2, 'default' => 2));
	add_meta_box('espresso_organization_settings', __('Organization Settings', 'event_espresso'), 'espresso_org_settings_meta_box', 'event-espresso_page_event_espresso');
	add_meta_box('espresso_page_settings', __('Page Settings', 'event_espresso'), 'espresso_page_settings_meta_box', 'event-espresso_page_event_espresso');
	add_meta_box('espresso_email_settings', __('Email Settings', 'event_espresso'), 'espresso_email_settings_meta_box', 'event-espresso_page_event_espresso');
	if (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/admin-files/optional_event_settings.php')) {
		require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/admin-files/optional_event_settings.php');
		add_meta_box('espresso_optional_settings', __('Optional Event Settings', 'event_espresso'), 'espresso_optional_settings_meta_box', 'event-espresso_page_event_espresso');
	} else {
		add_meta_box('espresso_free_recaptcha_settings', __('reCAPTCHA Settings', 'event_espresso'), 'espresso_free_recaptcha_settings_meta_box', 'event-espresso_page_event_espresso');
		add_meta_box('espresso_free_optional_settings', __('Optional Event Settings', 'event_espresso'), 'espresso_free_optional_settings_meta_box', 'event-espresso_page_event_espresso');
	}
}

function organization_config_mnu() {
	global $wpdb, $notices, $org_options, $espresso_premium, $espresso_wp_user;
	if (!empty($_GET['anchor']) and $_GET['anchor'] == 'page_settings') {
		if ($closed_post_boxes = get_user_meta($espresso_wp_user, 'closedpostboxes_event-espresso_page_event_espresso', true)
						and $key = array_search('espresso_page_settings', $closed_post_boxes)) {
			unset($closed_post_boxes[$key]);
			update_user_meta($espresso_wp_user, 'closedpostboxes_event-espresso_page_event_espresso', $closed_post_boxes);
		}
	}

// if espresso_url_rewrite_activated is in the post data, but it doesn't yet exist in the org options, then this is the first time this will run
	if (isset($_POST['espresso_url_rewrite_activated']) && !isset($org_options['espresso_url_rewrite_activated'])) {

		// check for slug column
		$SQL = 'SHOW COLUMNS FROM ' . EVENTS_DETAIL_TABLE . ' LIKE "slug"';
		$results = $wpdb->get_results($wpdb->prepare($SQL));
		//echo printr( $results, '$results' );
		// if column does not exist
		if (empty($results)) {

			$SQL = 'ALTER TABLE ' . EVENTS_DETAIL_TABLE . ' ADD slug VARCHAR(100) AFTER event_name';
			$results = $wpdb->query($wpdb->prepare($SQL));
			//echo printr( $results, '$results' );
			// column creation was sucessful
			if (!empty($results)) {
				// create url slugs from event_name
				espresso_create_url_slugs();
			}
		}
	}


//print_r($timezoneTable);
	if (isset($_POST['update_org'])) {
		$org_options['organization'] = stripslashes_deep($_POST['org_name']);
		$org_options['organization_street1'] = $_POST['org_street1'];
		$org_options['organization_street2'] = $_POST['org_street2'];
		$org_options['organization_city'] = $_POST['org_city'];
		$org_options['organization_state'] = $_POST['org_state'];
		$org_options['organization_zip'] = $_POST['org_zip'];
		$org_options['organization_country'] = $_POST['org_country'];
		$org_options['contact_email'] = $_POST['email'];
		$org_options['expire_on_registration_end'] = $_POST['expire_on_registration_end'];
		$org_options['event_page_id'] = $_POST['event_page_id'];
		$org_options['return_url'] = $_POST['return_url'];
		$org_options['cancel_return'] = $_POST['cancel_return'];
		$org_options['notify_url'] = $_POST['notify_url'];
		$org_options['events_in_dasboard'] = $_POST['events_in_dasboard'];
		$org_options['default_mail'] = $_POST['default_mail'];
		$org_options['email_before_payment'] = $_POST['email_before_payment'];
		$org_options['email_fancy_headers'] = $_POST['email_fancy_headers'];
		$org_options['use_captcha'] = $_POST['use_captcha'];
		$org_options['recaptcha_publickey'] = $_POST['recaptcha_publickey'];
		$org_options['recaptcha_privatekey'] = $_POST['recaptcha_privatekey'];
		$org_options['recaptcha_theme'] = $_POST['recaptcha_theme'];
		$org_options['recaptcha_width'] = $_POST['recaptcha_width'];
		$org_options['recaptcha_language'] = $_POST['recaptcha_language'];
		$org_options['espresso_dashboard_widget'] = $_POST['espresso_dashboard_widget'];
		$org_options['time_reg_limit'] = $_POST['time_reg_limit'];
		$org_options['use_attendee_pre_approval'] = $_POST['use_attendee_pre_approval'];
		$org_options['show_pending_payment_options'] = $_POST['show_pending_payment_options'];
		$org_options['use_venue_manager'] = $_POST['use_venue_manager'];
		$org_options['use_personnel_manager'] = $_POST['use_personnel_manager'];
		$org_options['use_event_timezones'] = $_POST['use_event_timezones'];
		$org_options['full_logging'] = $_POST['full_logging'];
		$org_options['remote_logging_url'] = $_POST['remote_logging_url'];
		$org_options['remote_logging'] = $_POST['remote_logging'];
		$org_options['surcharge'] = $_POST['surcharge'];
		$org_options['surcharge_type'] = $_POST['surcharge_type'];
		$org_options['surcharge_text'] = $_POST['surcharge_text'];
		$org_options['show_reg_footer'] = $_POST['show_reg_footer'];
		$org_options['affiliate_id'] = $_POST['affiliate_id'];
		$org_options['site_license_key'] = $_POST['site_license_key'];
		$org_options['default_logo_url'] = $_REQUEST['upload_image'];
		$org_options['default_payment_status'] = $_POST['default_payment_status'];
		$org_options['template_settings']['use_custom_post_types'] = $_POST['use_custom_post_types'];
		//echo getCountryFullData($org_options['organization_country']);
		$country_data = getCountryFullData($org_options['organization_country']);
		$org_options['currency_symbol'] = $country_data['currency_symbol'];

		if (isset($_POST['espresso_url_rewrite_activated'])) {
			$org_options['espresso_url_rewrite_activated'] = $_POST['espresso_url_rewrite_activated'];
		} else {
			$org_options['espresso_url_rewrite_activated'] = false;
		}

		if (update_user_meta($espresso_wp_user, 'events_organization_settings', $org_options)) {
			$notices['updates'][] = __('Organization details saved', 'event_espresso');
			// reset rewrite rules
			espresso_add_rewrite_rules();
			flush_rewrite_rules();
		} else {
			$notices['errors'][] = __('Unable to save Organization details.', 'event_espresso');
		}
	}

	do_action('action_hook_espresso_admin_notices');

	espresso_org_confg_output();
}

function espresso_org_confg_output() {
	?>

	<div class="wrap columns-2">
		<div id="icon-options-event" class="icon32"> </div>
		<h2>
			<?php _e('General Settings', 'event_espresso'); ?>
		</h2>
		<div id="poststuff" class="metabox-holder has-right-sidebar">
			<div id="side-info-column" class="inner-sidebar">
				<?php do_meta_boxes('event-espresso_page_event_espresso', 'side', null); ?>
			</div>
			<div id="post-body">
				<div id="post-body-content">
					<form class="espresso_form" method="post" action="<?php echo $_SERVER['REQUEST_URI'] ?>">
						<?php do_meta_boxes('event-espresso_page_event_espresso', 'advanced', null); ?>
						<input type="hidden" name="update_org" value="update" />
					</form>
				</div>
			</div>
		</div>
	</div>
	<?php
	// Help Pop-up Boxes
	include('help.php');
	echo event_espresso_custom_email_info();
	?>
	<script type="text/javascript" charset="utf-8">
		//<![CDATA[
		jQuery(document).ready(function() {
			postboxes.add_postbox_toggles('event-espresso_page_event_espresso');

			//Logo uploader
			var header_clicked = false;
			jQuery('#upload_image_button').click(function() {
				formfield = jQuery('#upload_image').attr('name');
				tb_show('', 'media-upload.php?type=image&amp;TB_iframe=1');
				jQuery('p.default-logo-thumb').addClass('old');
				header_clicked = true;
				return false;
			});
			window.original_send_to_editor = window.send_to_editor;

			window.send_to_editor = function(html) {
				if(header_clicked) {
					imgurl = jQuery('img',html).attr('src');
					jQuery('#' + formfield).val(imgurl);
					jQuery('#default-logo-image').append("<p><img src='"+imgurl+"' alt='' /></p>");
					header_clicked = false;
					tb_remove();
				} else {
					window.original_send_to_editor(html);
				}
			}

		});
		//]]>
	</script>
	<?php
	wp_nonce_field('closedpostboxes', 'closedpostboxesnonce', false);
	wp_nonce_field('meta-box-order', 'meta-box-order-nonce', false);
	if (!function_exists('wp_editor')) {
		espresso_tiny_mce();
	}
}

function espresso_org_settings_meta_box() {
	global $org_options;
	$values = array(
			array('id' => true, 'text' => __('Yes', 'event_espresso')),
			array('id' => false, 'text' => __('No', 'event_espresso'))
	);
	?>
	<div class="padding">
		<h4>
			<?php _e('Contact Information', 'event_espresso'); ?>
			<?php echo apply_filters('filter_hook_espresso_help', 'contact_info'); ?> </h4>
		<table class="form-table">
			<tbody>
				<tr>
					<th><label for="org_name">
							<?php _e('Organization Name:', 'event_espresso'); ?>
						</label></th>
					<td><input class="regular-text" type="text" name="org_name" value="<?php echo stripslashes_deep($org_options['organization']); ?>" /></td>
				</tr>
				<tr>
					<th><label for="org_street1">
							<?php _e('Organization Street 1:', 'event_espresso'); ?>
						</label></th>
					<td><input class="regular-text" type="text" name="org_street1" value="<?php echo $org_options['organization_street1']; ?>" /></td>
				</tr>
				<tr>
					<th><label for="org_street2">
							<?php _e('Organization Street 2:', 'event_espresso'); ?>
						</label></th>
					<td><input class="regular-text" type="text" name="org_street2" value="<?php echo $org_options['organization_street2']; ?>" /></td>
				</tr>
				<tr>
					<th><label for="org_city">
							<?php _e('Organization City:', 'event_espresso'); ?>
						</label></th>
					<td><input class="regular-text" type="text" name="org_city" value="<?php echo $org_options['organization_city']; ?>" /></td>
				</tr>
				<tr>
					<th><label for="org_state">
							<?php _e('Organization State:', 'event_espresso'); ?>
						</label></th>
					<td><input class="regular-text" type="text" name="org_state" value="<?php echo $org_options['organization_state']; ?>" /></td>
				</tr>
				<tr>
					<th><label for="org_zip">
							<?php _e('Organization Zip/Postal Code:', 'event_espresso'); ?>
						</label></th>
					<td><input class="regular-text" type="text" name="org_zip" size="10" value="<?php echo $org_options['organization_zip']; ?>" /></td>
				</tr>
				<tr>
					<th><label for="org_country">
							<?php _e('Organization Country:', 'event_espresso'); ?>
						</label></th>
					<td><?php printCountriesSelector("org_country", isset($org_options['organization_country']) ? $org_options['organization_country'] : ''); ?> (<?php echo $org_options['currency_symbol']; ?>)</td>
				</tr>
				<tr>
					<th><label for="email">
							<?php _e('Primary contact email:', 'event_espresso'); ?>
						</label></th>
					<td><input class="regular-text" type="text" name="email" value="<?php echo $org_options['contact_email']; ?>" /></td>
				</tr>
			</tbody>
		</table>
		<h4>
			<?php _e('Time and Date Settings', 'event_espresso'); ?>
		</h4>
		<table class="form-table">
			<tbody>
				<tr>
					<th><?php _e('Current Time: ', 'event_espresso'); ?></th>
					<td><span class="current-date"> <?php echo date(get_option('date_format') . ' ' . get_option('time_format')); ?> </span><br />
						<span class="description"><a class="change-date-time" href="options-general.php" target="_blank">
								<?php _e('Change timezone and date format settings?', 'event_espresso'); ?>
							</a><br />
							<span class="important">
								<?php _e('Note:', 'event_espresso'); ?>
							</span>
							<?php _e('You must set the time zone for your city, or the city closest to you. UTC time will not work.', 'event_espresso'); ?>
							<a href="http://ee-updates.s3.amazonaws.com/images/time-zone-settings-example.jpg?TB_iframe=true&height=200&width=630" class="thickbox">
								<?php _e('View an example?', 'event_espresso'); ?>
							</a></span></td>
				</tr>
				<tr>
					<th><label for="expire_on_registration_end">
							<?php _e('Events expire on registration end date?', 'event_espresso'); ?>
						</label></th>
					<td><?php echo select_input('expire_on_registration_end', $values, $org_options['expire_on_registration_end']); ?></td>
				</tr>
			</tbody>
		</table>
		<h4>
			<?php _e('Images', 'event_espresso'); ?>
		</h4>
		<table class="form-table">
			<tbody>
				<tr>
					<th><label for="upload_image">
							<?php _e('Add a Default Logo', 'event_espresso'); ?>
							<?php echo apply_filters('filter_hook_espresso_help', 'espresso_default_logo_info'); ?> </label></th>
					<td><div id="default-logo-image">
							<input id="upload_image" type="hidden" size="36" name="upload_image" value="<?php echo $org_options['default_logo_url'] ?>" />
							<input id="upload_image_button" type="button" value="Upload Image" />
							<?php if ($org_options['default_logo_url'] != '') { ?>
								<p class="default-logo-thumb"><img src="<?php echo $org_options['default_logo_url'] ?>" alt="" /></p>
							<?php } ?>
						</div>
						<div id="espresso_default_logo_info" class="pop-help" style="display:none">
							<h2>
								<?php _e('Default Logo', 'event_espresso'); ?>
							</h2>
							<p><?php echo __('The default logo will be used in your custom invoice, ticketing, certificates, and payment templates.', 'event_espresso'); ?></p>
						</div></td>
				</tr>
			</tbody>
		</table>
		<p>
			<input class="button-primary" type="submit" name="Submit" value="<?php _e('Save Options', 'event_espresso'); ?>" id="save_organization_saetting_1" />
		</p>
	</div>
	<?php
}

function espresso_page_settings_meta_box() {
	global $org_options;
	$ee_pages = array($org_options['event_page_id'] => array(get_page($org_options['event_page_id']), '[ESPRESSO_EVENTS]'),
			$org_options['return_url'] => array(get_page($org_options['return_url']), '[ESPRESSO_PAYMENTS]'),
			$org_options['notify_url'] => array(get_page($org_options['notify_url']), '[ESPRESSO_TXN_PAGE]'),
			$org_options['cancel_return'] => array(get_page($org_options['cancel_return']), 'ESPRESSO_CANCELLED'));
	?>
	<div class="padding"> <a name="page_settings" id="page_settings"></a>
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
							<input type="checkbox"  value="Y" id="espresso_url_rewrite_activated" name="espresso_url_rewrite_activated" <?php echo $checked; ?>/>
							<?php _e('Activate "Pretty" Permalinks', 'event_espresso'); ?>
							<br />
							<span class="description">
								<?php _e('makes URLs look like:', 'event_espresso'); ?>
								"<b><?php echo espresso_get_reg_page_full_url(); ?>your-event-name</b>"<br/>
								instead of: "<b><?php echo espresso_get_reg_page_full_url(); ?>?ee=12</b>"<br/>
								<span class="important">
									<?php _e('Must have', 'event_espresso'); ?>
									<a style="color:#d54e21;" href="<?php echo home_url('/'); ?>wp-admin/options-permalink.php">
										<?php _e('WordPress Permalinks', 'event_espresso'); ?>
									</a>
									<?php _e('turned on, and mod_rewrite (or similar) active on server', 'event_espresso'); ?>
								</span> </span> </label>
					</fieldset></td>
			</tr>
			</tbody>

		</table>
		<p>
			<input class="button-primary" type="submit" name="Submit_2" value="<?php _e('Save Options', 'event_espresso'); ?>" id="save_organization_setting_2" />
		</p>
	</div>
	<?php
}

function espresso_email_settings_meta_box() {
	global $org_options;
	$values = array(
			array('id' => true, 'text' => __('Yes', 'event_espresso')),
			array('id' => false, 'text' => __('No', 'event_espresso'))
	);
	?>
	<div class="padding"><a name="email-settings" id="email-settings"></a>
		<h4>
			<?php _e('Email Server Options:', 'event_espresso'); ?>
		</h4>
		<table class="form-table">
			<tbody>
				<tr>
					<th><label for="email_fancy_headers">
							<?php _e('Use Personalized Email Headers', 'event_espresso'); ?>
							<?php echo apply_filters('filter_hook_espresso_help', 'fancyemailheaders'); ?> </label></th>
					<td><?php echo select_input('email_fancy_headers', $values, $org_options['email_fancy_headers']); ?></td>
				</tr>
			</tbody>
		</table>
		<h4>
			<?php _e('Payment Confirmation Email:', 'event_espresso'); ?>
		</h4>
		<table class="form-table">
			<tbody>
				<tr>
					<th><label for="default_mail">
							<?php _e('Send payment confirmation emails?', 'event_espresso'); ?>
						</label></th>
					<td><?php echo select_input('default_mail', $values, $org_options['default_mail']); ?></td>
				</tr>
			</tbody>
		</table>
		<h4>
			<?php _e('Default Registration Confirmation Email:', 'event_espresso'); ?>
		</h4>
		<table class="form-table">
			<tbody>
				<tr>
					<th><label for="email_before_payment">
							<?php _e('Send registration confirmation emails before payment is received?', 'event_espresso'); ?>
						</label></th>
					<td><?php echo select_input('email_before_payment', $values, $org_options['email_before_payment']); ?></td>
				</tr>
			</tbody>
		</table>
		<p>
			<input class="button-primary" type="submit" name="Submit_3" value="<?php _e('Save Options', 'event_espresso'); ?>" id="save_organization_setting_3" />
		</p>
	</div>
	<?php
}

function espresso_free_recaptcha_settings_meta_box() {
	?>
	<div class="padding">
		<p><?php echo sprintf(__('Please purchase a %s to gain access to this feature.', 'event_espresso'), '<a href="http://eventespresso.com/download/" target="_blank">' . __('support license', 'event_espresso') . '</a>'); ?> </p>
		<p> <?php echo sprintf(__('reCAPTCHA helps prevent automated abuse of your site (such as comment spam or bogus registrations) by using a %s to ensure that only humans perform certain actions.', 'event_espresso'), '<a href="http://recaptcha.net/captcha.html">CAPTCHA</a>'); ?> </p>
	</div>
	<?php
}

function espresso_free_optional_settings_meta_box() {
	?>
	<div class="padding">
		<p><?php echo __('Please purchase a', 'event_espresso') ?> <a href="http://eventespresso.com/download/" target="_blank"><?php echo __('support license', 'event_espresso') ?></a> <?php echo __('to gain access to these features.', 'event_espresso') ?></p>
		<p>
			<?php _e('Additional features include:', 'event_espresso'); ?>
		</p>
		<ol>
			<li>
				<?php _e('Upcoming events widget in the admin dashboard', 'event_espresso'); ?>
			</li>
			<li>
				<?php _e('Registration limits on time slots', 'event_espresso'); ?>
			</li>
			<li>
				<?php _e('Ability to display short descriptions in the event listings', 'event_espresso'); ?>
			</li>
			<li>
				<?php _e('Custom post types for events', 'event_espresso'); ?>
			</li>
			<li>
				<?php _e('Attendee pre-approval feature', 'event_espresso'); ?>
			</li>
			<li>
				<?php _e('Event Venue/Staff Manager', 'event_espresso'); ?>
			</li>
			<li>
				<?php _e('Graphical Reports', 'event_espresso'); ?>
			</li>
		</ol>
	</div>
	<?php
}

