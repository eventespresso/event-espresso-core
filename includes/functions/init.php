<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
do_action('AHEE_log', __FILE__, ' FILE LOADED', '' );



function espresso_parse_site_url_for_ssl() {
	return is_ssl() ? str_replace( 'https://', '', site_url() ) :  str_replace( 'http://', '', site_url() );
}





function espresso_export_certificate() {
	do_action('AHEE_log', __FILE__, __FUNCTION__, '' );
	if (isset($_REQUEST['certificate_launch']) && $_REQUEST['certificate_launch'] == 'true') {
		echo espresso_certificate_launch($_REQUEST['id'], $_REQUEST['r_id']);
	}
}





function espresso_export_invoice() {
	do_action('AHEE_log', __FILE__, __FUNCTION__, '' );
	//Version 2.0
	if (isset($_REQUEST['invoice_launch']) && $_REQUEST['invoice_launch'] == 'true') {
		if (isset($_REQUEST['id'])) {
			$_REQUEST['id'] = sanitize_key( $_REQUEST['id'] );
			require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/Invoice/lib/Invoice.class.php");
			$invoice = new Invoice($_REQUEST['id']);
			$invoice->send_invoice();
		}
	}
	//End Version 2.0
	//Export pdf version
	if (isset($_REQUEST['download_invoice']) && $_REQUEST['download_invoice'] == 'true') {
		if (isset($_REQUEST['id'])) {
			$_REQUEST['id'] = sanitize_key( $_REQUEST['id'] );
			require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/invoice/lib/Invoice.class.php");
			$invoice = new Invoice($_REQUEST['id']);
			// send invoice but force download
			$invoice->send_invoice( TRUE ); 
		}
	}
	//End pdf version
}





function espresso_load_messages_init() {
	$EEMSGS_init = new EE_messages_init();
}





function espresso_events_on_frontpage() {
	// first check if a page is being used for the frontpage
	if ( get_option('show_on_front') == 'page' ) {
		global $org_options;
		// grab that page's id
		$frontpage = get_option('page_on_front');
		// compare to event_page_id
		return $frontpage == $org_options['event_page_id'] ? TRUE : FALSE;
	}
	return FALSE;
}









function espresso_add_query_vars($query_vars) {
	do_action('AHEE_log', __FILE__, __FUNCTION__, '');
	$query_vars[] = 'event_slug';
	$query_vars[] = 'ee';
	$query_vars[] = 'e_reg';
	//printr( $query_vars, '$query_vars  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
	return $query_vars;
}



/**
 * 	espresso_add_rewrite_rules
 *
 *  @param 	boolean 		$to_flush_or_not_to_flush
 *  @return 	void
 */
function espresso_add_rewrite_rules( $to_flush_or_not_to_flush = FALSE ) {

	do_action('AHEE_log', __FILE__, __FUNCTION__, '' );
	global $wpdb, $org_options;

	if (empty($org_options['event_page_id'])) {
		espresso_load_org_options();
	}
	// create pretty permalinks
	if ( get_option('permalink_structure') != '' ) {
		// grab slug for event reg page
		$SQL = 'SELECT post_name  FROM ' . $wpdb->prefix . 'posts WHERE ID = %d';
		$reg_page_url_slug = $wpdb->get_var( $wpdb->prepare( $SQL, $org_options['event_page_id'] ));
		// rules for event slug pretty links
		add_rewrite_rule( $reg_page_url_slug . '/([^/]+)/?$', 'index.php?pagename=' . $reg_page_url_slug . '&event_slug=$matches[1]', 'top');
		// whether tis nobler on the server to suffer the pings and errors of outrageous flushing
		if ( $to_flush_or_not_to_flush ) {
			flush_rewrite_rules();
		}
	}	
	
}





function espresso_register_jquery_validate() {
	// load jQuery Validate script from CDN with local fallback
	$jquery_validate_url = 'http://ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/jquery.validate.min.js'; 
	// is the URL accessible ?
	$test_url = @fopen( $jquery_validate_url, 'r' );
	// use CDN URL or local fallback ?
	$jquery_validate_url = $test_url !== FALSE ? $jquery_validate_url : EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/jquery.validate.min.js';
	// register jQuery Validate
	wp_register_script('jquery-validate', $jquery_validate_url, array('jquery'), '1.11.1', TRUE);		
}
