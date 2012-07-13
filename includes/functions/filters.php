<?php

function espresso_admin_footer() {
	return 'Event Registration and Ticketing Powered by <a href="http://eventespresso.com/" title="Event Registration Powered by Event Espresso" target="_blank">' . EVENT_ESPRESSO_POWERED_BY . '</a>';
}
add_filter('admin_footer_text', 'espresso_admin_footer');





function espresso_help_popup($name) {
	return '<a class="thickbox" href="#TB_inline?height=400&amp;width=500&amp;inlineId=' . $name . '" target="_blank"><span class="question">[?]</span></a>';
}
add_filter('filter_hook_espresso_help', 'espresso_help_popup');





function event_espresso_filter_plugin_actions($links, $file) {
	// Static so we don't call plugin_basename on every plugin row.
	static $this_plugin;
	if (!$this_plugin)
		$this_plugin = plugin_basename(espresso_main_file());

	if ($file == $this_plugin) {
		$org_settings_link = '<a href="admin.php?page=event_espresso">' . __('Settings') . '</a>';
		$events_link = '<a href="admin.php?page=events">' . __('Events') . '</a>';
		array_unshift($links, $org_settings_link, $events_link); // before other links
	}
	return $links;
}