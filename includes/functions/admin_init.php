<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
do_action('AHEE_log', __FILE__, ' FILE LOADED', '' );







function espresso_verify_default_pages_exist() {
	
	global $org_options;
	$critical_page_problem = FALSE;
	
	// first check that critical page id's are set in the org options and that those page id's exist in the WP post db
	$page_ids = get_all_page_ids();
	if (	! isset( $org_options['event_page_id'] ) || empty( $org_options['event_page_id'] ) || ! in_array( $org_options['event_page_id'], $page_ids )|| 
			! isset( $org_options['return_url'] ) || empty( $org_options['return_url'] ) || ! in_array( $org_options['return_url'], $page_ids ) || 
			! isset( $org_options['notify_url'] ) || empty( $org_options['notify_url'] ) || ! in_array( $org_options['notify_url'], $page_ids ) || 
			! isset( $org_options['cancel_return'] ) || empty( $org_options['cancel_return'] ) || ! in_array( $org_options['cancel_return'], $page_ids )
	) { 
		$critical_page_problem = TRUE;
	} else {
	
		$ee_pages = array(
				$org_options['event_page_id'] => array(get_page($org_options['event_page_id']), '[ESPRESSO_EVENTS]'),
				$org_options['return_url'] => array(get_page($org_options['return_url']), '[ESPRESSO_PAYMENTS]'),
				$org_options['notify_url'] => array(get_page($org_options['notify_url']), '[ESPRESSO_TXN_PAGE]'),
				$org_options['cancel_return'] => array(get_page($org_options['cancel_return']), 'ESPRESSO_CANCELLED')
			);

		foreach ($ee_pages as $ee_page) {
			if ( ! isset($ee_page[0]->post_status) || $ee_page[0]->post_status != 'publish' || strpos( $ee_page[0]->post_content, $ee_page[1] ) === false) {	
				$critical_page_problem = TRUE;
			}
		}
			
	}

	if ( $critical_page_problem ) {
		require_once( EE_CORE . 'admin/admin_helper.php' );
		add_action('admin_notices', 'espresso_page_problems');
	}


}















