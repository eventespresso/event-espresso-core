<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
do_action('action_hook_espresso_log', __FILE__, ' FILE LOADED', '' );

function espresso_admin_footer() {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
	return 'Event Registration and Ticketing Powered by <a href="http://eventespresso.com/" title="Event Registration Powered by Event Espresso" target="_blank">' . EVENT_ESPRESSO_POWERED_BY . '</a>';
}
add_filter('admin_footer_text', 'espresso_admin_footer');





function espresso_help_popup($name) {
	wp_enqueue_style('thickbox');
	wp_enqueue_script('media-upload');
	wp_enqueue_script('thickbox');
	echo '
	<a class="thickbox" href="#TB_inline?height=400&amp;width=500&amp;inlineId=' . $name . '" target="_blank">
		<span class="question">
			<img src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/icons/subtle_help.png" width="16" height="16" alt="help" />
		</span>
	</a>';
}
add_action('action_hook_espresso_help', 'espresso_help_popup');





function event_espresso_filter_plugin_actions($links, $file) {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
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