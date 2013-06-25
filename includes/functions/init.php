<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
do_action('AHEE_log', __FILE__, ' FILE LOADED', '' );










function espresso_events_on_frontpage() {
	// first check if a page is being used for the frontpage
	if ( get_option('show_on_front') == 'page' ) {
		global $org_options;
		if ( empty($org_options) )
			return; //get  out this is likely a fresh EE activation
		// grab that page's id
		$frontpage = get_option('page_on_front');
		// compare to event_page_id
		return $frontpage == $org_options['event_page_id'] ? TRUE : FALSE;
	}
	return FALSE;
}







