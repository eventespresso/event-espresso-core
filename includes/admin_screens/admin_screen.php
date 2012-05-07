<?php

function espresso_add_meta_boxes() {
	global $espresso_premium;
	$screen = get_current_screen();
	$screen_id = $screen->id;
	/* $screen->add_help_tab(array(
	  'id' => 'help-content',
	  'title' => __('Content'),
	  'content' => 'help me!',
	  ));
	  $screen->add_option('layout_columns', array('max' => 2, 'default' => 2)); */

	// adds side meta boxes
	switch ($screen_id) {
		case 'event-espresso_page_event_staff':
		case 'event-espresso_page_event_venues':
		case 'event-espresso_page_members':
		case 'event-espresso_page_espresso_social':
		case 'event-espresso_page_espresso_calendar':
		case 'event-espresso_page_espresso_permissions':
		case 'event-espresso_page_event_tickets':
		case 'event-espresso_page_event_certificates':
		case 'event-espresso_page_event_categories':
		case 'event-espresso_page_form_groups':
		case 'event-espresso_page_form_builder':
		case 'event-espresso_page_discounts':
		case 'event-espresso_page_admin_addons':
		case 'event-espresso_page_event_espresso':
		case 'event-espresso_page_payment_gateways':
		case 'event-espresso_page_template_confg':
		case 'event-espresso_page_template_map_confg':
		case 'event-espresso_page_event_emails':
		case 'event-espresso_page_support':
		case 'event-espresso_page_pricing':
			add_meta_box('espresso_news_post_box', __('New @ Event Espresso', 'event_espresso'), 'espresso_news_post_box', $screen_id, 'side');
			add_meta_box('espresso_links_post_box', __('Helpful Plugin Links', 'event_espresso'), 'espresso_links_post_box', $screen_id, 'side');
			if (!$espresso_premium)
				add_meta_box('espresso_sponsors_post_box', __('Sponsors', 'event_espresso'), 'espresso_sponsors_post_box', $screen_id, 'side');
			break;
	}


	//adds main meta boxes
	switch ($screen_id) {
		case 'event-espresso_page_event_espresso':
			add_meta_box('espresso_organization_settings', __('Organization Settings', 'event_espresso'), 'espresso_org_settings_meta_box', $screen_id);
			add_meta_box('espresso_page_settings', __('Page Settings', 'event_espresso'), 'espresso_page_settings_meta_box', $screen_id);
			add_meta_box('espresso_email_settings', __('Email Settings', 'event_espresso'), 'espresso_email_settings_meta_box', $screen_id);
			if ($espresso_premium) {
				add_meta_box('espresso_optional_settings', __('Optional Event Settings', 'event_espresso'), 'espresso_optional_settings_meta_box', $screen_id);
			} else {
				add_meta_box('espresso_free_recaptcha_settings', __('reCAPTCHA Settings', 'event_espresso'), 'espresso_free_recaptcha_settings_meta_box', $screen_id);
				add_meta_box('espresso_free_optional_settings', __('Optional Event Settings', 'event_espresso'), 'espresso_free_optional_settings_meta_box', $screen_id);
			}
			break;
		case 'event-espresso_page_payment_gateways':
			if ($espresso_premium) {
				add_meta_box('espresso_optional_settings', __("Developers Section", 'event_espresso'), 'espresso_gateway_developer_meta_box', $screen_id);
			}
			break;
		case 'event-espresso_page_template_confg':
			add_meta_box('template_settings', __('Template Settings', 'event_espresso'), 'espresso_template_settings', $screen_id);
			add_meta_box('customization_instructions', __('Customization Instructions', 'event_espresso'), 'espresso_template_customization_instructions', $screen_id);
			break;
		case 'event-espresso_page_template_map_confg':
			add_meta_box('customization_instructions', __('Google Maps Display Options', 'event_espresso'), 'espresso_template_map_confg_meta_box', $screen_id);
			break;
		case 'event-espresso_page_support':
			add_meta_box('support_links', __('Quick Links', 'event_espresso'), 'espresso_admin_help_links_meta_box', $screen_id);
			add_meta_box('support_installation', __('Installation', 'event_espresso'), 'espresso_admin_help_installation_meta_box', $screen_id);
			add_meta_box('support_partners', __('Partners', 'event_espresso'), 'espresso_admin_help_partners_meta_box', $screen_id);
			add_meta_box('support_devs', __('Hire a Developer', 'event_espresso'), 'espresso_admin_help_hire_devs_meta_box', $screen_id);
			add_meta_box('support_theme_devs', __('Favorite Theme Developers', 'event_espresso'), 'espresso_admin_help_theme_devs_meta_box', $screen_id);
			add_meta_box('support_plugins', __('Recommended Plugins', 'event_espresso'), 'espresso_admin_help_plugins_meta_box', $screen_id);
			add_meta_box('support_themes', __('Highly Recommended Themes', 'event_espresso'), 'espresso_admin_help_themes_meta_box', $screen_id);
			add_meta_box('support_resources', __('Other Resources', 'event_espresso'), 'espresso_admin_help_resources_meta_box', $screen_id);
			add_meta_box('support_shortcodes', __('Shortcodes', 'event_espresso'), 'espresso_admin_help_shortcodes_meta_box', $screen_id);
			add_meta_box('support_info', __('Important Information', 'event_espresso'), 'espresso_admin_help_information_meta_box', $screen_id);
			add_meta_box('support_contact', __('Contact Support', 'event_espresso'), 'espresso_admin_help_support_meta_box', $screen_id);
			add_meta_box('support_faq', __('Frequently Asked Questions', 'event_espresso'), 'espresso_admin_help_faq_meta_box', $screen_id);
			add_meta_box('support_add_info', __('Additional Information', 'event_espresso'), 'espresso_admin_help_additional_info_meta_box', $screen_id);
			break;
		case 'event-espresso_page_admin_addons':
			add_meta_box('addons_rem', __('Recurring Events Manager', 'event_espresso'), 'espresso_admin_addons_rem_meta_box', $screen_id);
			add_meta_box('addons_groupon', __('Groupon Integration Module', 'event_espresso'), 'espresso_admin_addons_groupon_meta_box', $screen_id);
			add_meta_box('addons_members', __('Members Integration Module', 'event_espresso'), 'espresso_admin_addons_members_meta_box', $screen_id);
			add_meta_box('addons_custom_files', __('Custom Files', 'event_espresso'), 'espresso_admin_addons_custom_files_meta_box', $screen_id);
			break;
		case 'event-espresso_page_pricing':
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin_screens/pricing/postboxes.php');
			if (isset($_REQUEST['action'])) {
				if ($_REQUEST['action'] == 'add_new_price') {
					add_meta_box('add_new_price', __('Add a Price', 'event_espresso'), 'edit_event_price_postbox', $screen_id, 'normal');
					//add_meta_box('description_editor', __('Description', 'event_espresso'), 'espresso_description_editor_postbox', 'espresso_price_desc_editor', 'normal');
				}
				if ($_REQUEST['action'] == 'edit_price') {
					add_meta_box('edit_price', __('Edit Global Price', 'event_espresso'), 'edit_event_price_postbox', $screen_id, 'normal');
					add_meta_box('description_editor', __('Description', 'event_espresso'), 'espresso_description_editor_postbox', 'espresso_price_desc_editor', 'normal');
				}
				if ($_REQUEST['action'] == 'add_new_price_type') {
					add_meta_box('add_new_price_type', __('Add a Price Type', 'event_espresso'), 'edit_event_price_type_postbox', $screen_id, 'normal');
				}
				if ($_REQUEST['action'] == 'edit_price_type') {
					add_meta_box('edit_price_type', __('Edit Price Type', 'event_espresso'), 'edit_event_price_type_postbox', $screen_id, 'normal');
				}
			}
			break;
	}


	switch ($screen_id) {
		case 'event-espresso_page_pricing':
		case 'event-espresso_page_event_categories':
		case 'event-espresso_page_form_groups':
		case 'event-espresso_page_form_builder':
		case 'event-espresso_page_discounts':
		case 'event-espresso_page_admin_addons':
		case 'event-espresso_page_event_espresso':
		case 'event-espresso_page_template_confg':
		case 'event-espresso_page_payment_gateways':
		case 'event-espresso_page_template_map_confg':
		case 'event-espresso_page_support':
			add_action('admin_footer', 'espresso_admin_page_footer');
			break;
	}

	$espresso_pages = array('event_espresso', 'discounts', 'groupons',
			'event_categories', 'admin_reports', 'form_builder',
			'form_groups', 'my-events', 'event_emails', 'event_venues',
			'event_staff', 'attendees', 'espresso_reports', 'pricing',
			'support', 'template_confg', 'template_map_confg',
			'payment_gateways', 'members', 'espresso_social',
			'admin_addons', 'espresso_calendar', 'event_tickets',
			'event_certificates', 'espresso-mailchimp',
			'espresso_permissions', 'roles', 'event_locales',
			'event_groups', 'test_drive', 'espresso_https'
	);
}

function espresso_news_post_box() {
	?>
	<div class="padding">
		<div class="infolinks">
			<?php
			echo '<h2 style="margin:0">' . __('From the Blog', 'event_espresso') . '</h2>';

			// Get RSS Feed(s)
			@wp_widget_rss_output('http://eventespresso.com/feed/', array('show_date' => 0, 'items' => 6));

			echo '<h2 style="margin:0">' . __('From the Forums', 'event_espresso') . '</h2>';

			@wp_widget_rss_output('http://eventespresso.com/forums/feed/', array('show_date' => 0, 'items' => 4));
			?>
		</div>
	</div>
	<?php
}

function espresso_links_post_box() {
	?>
	<div class="padding">
		<ul class="infolinks">
			<li><a href="http://eventespresso.com/support/installation/" target="_blank">
					<?php _e('Installation &amp; Usage Guide', 'event_espresso'); ?>
				</a></li>
			<li><a href="http://eventespresso.com/forums/2010/09/css-classes/" target="_blank">
					<?php _e('Customization Forums', 'event_espresso'); ?>
				</a></li>
			<li><a href="http://eventespresso.com/forums/category/premium-plugin-support/" target="_blank">
					<?php _e('Plugin Support Forums', 'event_espresso'); ?>
				</a></li>
			<li><a href="http://eventespresso.com/forums/category/general/features-requests/" target="_blank">
					<?php _e('Feature Request Forums', 'event_espresso'); ?>
				</a></li>
			<li><a href="http://eventespresso.com/forums/category/premium-plugin-support/bug-reports/" target="_blank">
					<?php _e('Bug Submission Forums', 'event_espresso'); ?>
				</a></li>
			<li><a href="http://eventespresso.com/forums/category/premium-plugin-support/news-and-updates/changelogs/" target="_blank">
					<?php _e('Changelog', 'event_espresso'); ?>
				</a></li>
			<li><a href="http://eventespresso.com/download/plugins-and-addons/">
					<?php _e('Plugins and Addons', 'event_espresso'); ?>
				</a></li>
		</ul>
	</div>
	<?php
}

function espresso_sponsors_post_box() {
	?>
	<div class="padding">
		<?php
		$event_regis_sponsors = wp_remote_retrieve_body(wp_remote_get('http://ee-updates.s3.amazonaws.com/plugin-sponsors.html'));
		echo $event_regis_sponsors;
		?>
	</div>
	<?php
}
