<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
do_action('action_hook_espresso_log', __FILE__, ' FILE LOADED', '' );

function espresso_admin_footer() {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
	return 'Event Registration and Ticketing Powered by <a href="http://eventespresso.com/" title="Event Registration Powered by Event Espresso" target="_blank">' . EVENT_ESPRESSO_POWERED_BY . '</a>';
}
add_filter('admin_footer_text', 'espresso_admin_footer');





function espresso_help_tab_links( $help_tab = FALSE, $action = FALSE, $page = FALSE, $help_text = '' ) {
	
	if ( ! $page ) {
		$page = isset( $_REQUEST['page'] ) && ! empty( $_REQUEST['page'] ) ? sanitize_key( $_REQUEST['page'] ) : $page;
	}
	
	if ( ! $action ) {
		$action = isset( $_REQUEST['action'] ) && ! empty( $_REQUEST['action'] ) ? sanitize_key( $_REQUEST['action'] ) : $action;
	}

	if ( ! $help_tab ) {
		$help_tab = isset( $_REQUEST['action'] ) && ! empty( $_REQUEST['action'] ) ? sanitize_key( $_REQUEST['action'] ) . '_help_tab' : $help_tab;
	}
	
//	echo '<h4>$page : ' . $page . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//	echo '<h4>$action : ' . $action . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//	echo '<h4>$help_tab : ' . $help_tab . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
	
	$help_tab_lnk = $page . '-' . $action . '-' . $help_tab;
	$icon_style = empty( $help_text ) ? ' help_img' : '';
	$help_text = ! empty( $help_text ) ? $help_text : 'click for help';
//	$help_icon_img = $custom_image ? $custom_image : '<img src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/subtle_help.png" width="16" height="16" alt="help" />';
	
	echo '
	<a id="' . $help_tab_lnk . '" class="espresso-help-tab-lnk' . $icon_style . '" title="click to open the \'Help\' tab for more information about this feature" > ' . $help_text . ' </a>';
}
add_action( 'action_hook_espresso_help', 'espresso_help_tab_links', 10, 4 );





function event_espresso_filter_plugin_actions($links, $file) {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
	// Static so we don't call plugin_basename on every plugin row.
	static $this_plugin;
	if (!$this_plugin)
		$this_plugin = plugin_basename(espresso_main_file());

	if ($file == $this_plugin) {
		$org_settings_link = '<a href="admin.php?page=espresso_general_settings">' . __('Settings') . '</a>';
		$events_link = '<a href="admin.php?page=espresso_events">' . __('Events') . '</a>';
		array_unshift($links, $org_settings_link, $events_link); // before other links
	}
	return $links;
}