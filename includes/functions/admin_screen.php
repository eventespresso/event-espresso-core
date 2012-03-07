<?php

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

function espresso_add_meta_boxes() {
	global $espresso_premium;
	$screen = get_current_screen();
	switch ($screen->id) {
		case 'event-espresso_page_admin_addons':
		case 'event-espresso_page_event_espresso':
			add_meta_box('espresso_news_post_box', __('New @ Event Espresso', 'event_espresso'), 'espresso_news_post_box', $screen->id, 'side');
			add_meta_box('espresso_links_post_box', __('Helpful Plugin Links', 'event_espresso'), 'espresso_links_post_box', $screen->id, 'side');
			if (!$espresso_premium)
				add_meta_box('espresso_sponsors_post_box', __('Sponsors', 'event_espresso'), 'espresso_sponsors_post_box', $screen->id, 'side');
			break;
	}

	$espresso_pages = array('event_espresso', 'discounts', 'groupons',
			'event_categories', 'admin_reports', 'form_builder',
			'form_groups', 'my-events', 'event_emails', 'event_venues',
			'event_staff', 'attendees', 'espresso_reports',
			'support', 'template_confg', 'template_map_confg',
			'payment_gateways', 'members', 'espresso_social',
			'admin_addons', 'espresso_calendar', 'event_tickets',
			'event_certificates', 'espresso-mailchimp',
			'espresso_permissions', 'roles', 'event_locales',
			'event_groups', 'test_drive', 'espresso_https'
	);
}

