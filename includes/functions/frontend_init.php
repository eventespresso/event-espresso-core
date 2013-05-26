<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
do_action('AHEE_log', __FILE__, ' FILE LOADED', '' );


function espresso_load_jquery() {
    wp_enqueue_script( 'jquery' );
}





function espresso_frontend_init() {

	do_action('AHEE_log', __FILE__, __FUNCTION__, '' );
	
	global $espresso_reg_page;
	if ( $espresso_reg_page = espresso_test_for_reg_page() ) {
		do_action('AHEE_load_reg_page_files');
	}

	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'shortcodes.php');
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/ical.php');

	// Export iCal file
	if (!empty($_REQUEST['iCal'])) {
		espresso_ical();
	}
}






function espresso_critical_pages( $page_id, $event_page_slug = FALSE ) {

	global $org_options, $current_ee_page, $this_is_a_reg_page;
	
	$reg_page_ids = array(
			$org_options['event_page_id'] => 'event_page_id',
			$org_options['notify_url'] => 'notify_url',
			$org_options['return_url'] => 'return_url',
			$org_options['cancel_return'] => 'cancel_return'
	);
/*echo "reg page ids:";
foreach($reg_page_ids as $id=>$reg_pad){
	echo "link:".get_permalink($id);
	echo " key:$id, value:$reg_pad <br>";
}
126($reg_page_ids);*/
	if ( isset( $reg_page_ids[ $page_id ] )) {
		$current_ee_page = $page_id;
		switch( $reg_page_ids[ $page_id ] ) {
			case 'event_page_id' :
					$this_is_a_reg_page = TRUE;
					add_action( 'wp', 'event_espresso_run', 100 );
					add_action ( 'AHEE_event_registration', 'event_details_page', 10, 2 );
					return TRUE;
				break;
			case 'notify_url' :
					$this_is_a_reg_page = TRUE;
					//add_action( 'wp', 'event_espresso_txn', 101 );
					return TRUE;
				break;			
			case 'return_url' :
					$this_is_a_reg_page = TRUE;
					//add_action( 'wp', 'espresso_thank_you_page', 102 );
					return TRUE;
				break;
		}		
	}
	
	return FALSE;

}





function espresso_test_for_reg_page() {

	do_action('AHEE_log', __FILE__, __FUNCTION__, '' );
	global $org_options, $current_ee_page, $this_is_a_reg_page;
	
	$this_is_a_reg_page = FALSE;
	
	$critical_page_ids = array(
		'event_page_id' => $org_options['event_page_id'],
		'return_url' => $org_options['return_url'],
		'cancel_return' => $org_options['cancel_return'],
		'notify_url' => $org_options['notify_url']
	);
	
	// first check if a page is being used for the frontpage
	if ( get_option('show_on_front') == 'page' ) {
		// grab that page's id
		$frontpage = get_option('page_on_front');
		// is it a critical page ?
		$this_is_a_reg_page = espresso_critical_pages( $frontpage );
	}
	//  if this is not a critical page
	if ( ! $this_is_a_reg_page ) {
		// grab page_id if it's set
		$page_id = isset( $_GET['page_id'] ) ? absint( $_GET['page_id'] ) : NULL; 
		if ( ! empty( $page_id )) {
			espresso_critical_pages( $page_id );
		} else {
			// loop thru our critical pages and gather further intel
			foreach ( $critical_page_ids as $critical_page_id ) {
				// get permalink for critical page
				$link = get_permalink( $critical_page_id );
				// if they have their home_url set in the WP settings
				if ( $home = home_url() ) {
					// then we can drill down to the exact page slug
					$event_page_slug = trim( substr( $link, strlen( $home )), '/' );
				} else {
					// or determine strlen up to and including domain
					$offset = strlen( $_SERVER['SERVER_NAME'] ) + strpos( $link, $_SERVER['SERVER_NAME'] );
					// whatever's left is, or includes the page slug
					$event_page_slug = substr( $link, $offset );	
				}

				// is the page slug for the critical page in the current request ?
				if ( !empty( $event_page_slug) && strpos( $_SERVER['REQUEST_URI'], $event_page_slug ) !== false) {
					espresso_critical_pages( $critical_page_id, $event_page_slug );
					break;
				}
			}
		}
	}

	return $this_is_a_reg_page;
}








function espresso_check_scripts() {
	do_action('AHEE_log', __FILE__, __FUNCTION__, '');
	if (function_exists('wp_script_is')) {
		if (!wp_script_is('jquery')) {
			echo '<div class="event_espresso_error"><p><em>' . __('Jquery is not loaded!', 'event_espresso') . '</em><br />' . __('Event Espresso is unable to load Jquery do to a conflict with your theme or another plugin.', 'event_espresso') . '</p></div>';
		}
	}
	if (!function_exists('wp_head')) {
		echo '<div class="event_espresso_error"><p><em>' . __('Missing wp_head() Function', 'event_espresso') . '</em><br />' . __('The WordPress function wp_head() seems to be missing in your theme. Please contact the theme developer to make sure this is fixed before using Event Espresso.', 'event_espresso') . '</p></div>';
	}
	if (!function_exists('wp_footer')) {
		echo '<div class="event_espresso_error"><p><em>' . __('Missing wp_footer() Function', 'event_espresso') . '</em><br />' . __('The WordPress function wp_footer() seems to be missing in your theme. Please contact the theme developer to make sure this is fixed before using Event Espresso.', 'event_espresso') . '</p></div>';
	}
}

	


function event_espresso_run() {

	do_action('AHEE_log', __FILE__, __FUNCTION__, '' );
	do_action('AHEE_event_espresso_run_start');
	// grab some globals
	global $load_espresso_scripts, $espresso_content;

	// tell the plugin to load the required scripts
	$load_espresso_scripts = true;

	// begin output buffering
	ob_start();

	//Make sure scripts are loading
	echo espresso_check_scripts();

	// Get action type
	$e_reg = isset($_REQUEST['e_reg']) ? sanitize_text_field( $_REQUEST['e_reg'] ) : '';

	switch ($e_reg) {

		case 'process_ticket_selections' :
			do_action('AHEE_log', __FILE__, __FUNCTION__, ' e_reg = process_ticket_selections'  );
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Ticket_Selector.class.php');
			EE_Ticket_Selector::process_ticket_selections();
			break;

		case 'register' :
			do_action('AHEE_log', __FILE__, __FUNCTION__, ' e_reg = register'  );
			remove_all_actions('AHEE_regevent_default_action');
			remove_all_actions('AHEE_event_registration');
			do_action('AHEE_event_reg_checkout');
			break;

		case 'edit_attendee' :
			do_action('AHEE_log', __FILE__, __FUNCTION__, ' e_reg = edit_attendee'  );
			remove_all_actions('AHEE_regevent_default_action');
			remove_all_actions('AHEE_event_registration');
			require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/process-registration/attendee_edit_record.php');
			attendee_edit_record();
			break;

		default :		

			espresso_require_template('init.php');

			// check if this is an event list or an event detail page by looking for event slug
			$event_detail_page = get_query_var('event_slug') ? TRUE : FALSE;

			if ( $event_detail_page or isset( $_REQUEST['ee'] ) ) {
				do_action('AHEE_log', __FILE__, __FUNCTION__, ' e_reg = event_detail_page'  );
				//This is the form page for registering the attendee
				require_once(espresso_get_registration_page_template());
				do_action ( 'AHEE_event_registration' );
			} else {
				do_action('AHEE_log', __FILE__, __FUNCTION__, ' e_reg = event_list'  );
				require_once(espresso_get_event_list_template());
				//add_action ( 'AHEE_regevent_default_action', 'display_all_events', 10, 1 );
				do_action ( 'AHEE_regevent_default_action', $e_reg );
			}

	}

	$espresso_content =  ob_get_clean();
	if ( espresso_events_on_frontpage() ) {
		add_filter( 'the_content', 'return_espresso_content' );
		remove_filter('template_redirect', 'redirect_canonical'); 
	} else {
		add_shortcode( 'ESPRESSO_EVENTS', 'return_espresso_content' );
	}	

}





function espresso_events_on_frontpage() {
	// first check if a page is being used for the frontpage
	if ( get_option('show_on_front') == 'page' ) {
		global $org_options;
		// grab that page's id
		$frontpage = get_option('page_on_front');
		// compare to event_page_id
		return  $frontpage == $org_options['event_page_id'] ? TRUE : FALSE;
	}
	return FALSE;
}




function return_espresso_content( $content ) {
	global $espresso_content;
	return $espresso_content;
}




function espresso_widget() {
	do_action('AHEE_log', __FILE__, __FUNCTION__, '');
	espresso_require_template('init.php');
	require(espresso_get_widget_template());
	//The widget can be over-ridden with the custom files addon
	register_widget('Event_Espresso_Widget');
}



function espresso_info_header() {
	print( "<meta name='generator' content='Event Espresso Version " . EVENT_ESPRESSO_VERSION . "' />");
}



function add_espresso_stylesheet() {
	global $org_options;

	do_action('AHEE_log', __FILE__, __FUNCTION__, '');

	if ( ! isset( $_REQUEST['e_reg'] ) && ! is_admin() ) {
		wp_register_style('ticket_selector', EVENT_ESPRESSO_PLUGINFULLURL . 'templates/ticket_selector/ticket_selector.css');
		wp_enqueue_style('ticket_selector');
	}
		
}



function espresso_load_javascript_files() {
	do_action('AHEE_log', __FILE__, __FUNCTION__, '');
	global $load_espresso_scripts;
	if (!$load_espresso_scripts) {
		return;
	}
	espresso_register_jquery_validate();
}




function eei18n_js_strings() {
	global $eei18n_js_strings;
	// Get current page protocol
	$protocol = isset($_SERVER["HTTPS"]) ? 'https://' : 'http://';
	// Output admin-ajax.php URL with same protocol as current page
	$eei18n_js_strings['ajax_url'] = admin_url('admin-ajax.php', $protocol);
	wp_localize_script( 'ticket_selector', 'eei18n', $eei18n_js_strings );
	wp_localize_script( 'single_page_checkout', 'eei18n', $eei18n_js_strings );
	// usage:  
	// global $eei18n_js_strings;
	// $eei18n_js_strings['string_key'] = __( 'string to translate.', 'event_espresso' );
	// in js file:
	// var translatedString = eei18n.string_key;
}









function espresso_add_query_vars($query_vars) {
	do_action('AHEE_log', __FILE__, __FUNCTION__, '');
	$query_vars[] = 'event_slug';
	$query_vars[] = 'ee';
	$query_vars[] = 'e_reg';
	//printr( $query_vars );
	return $query_vars;
}



/**
 * event_espresso_require_template()
 *
 * @param mixed $template_file_name // Name of template file.
 * @param bool $must_exist		  // Error if neither file exist.
 * @param bool $as_require_once	 // True for require_once(), False for require()
 * @return void	// No return value. File already included.
 *
 * Usage: event_espresso_require_template('shopping_cart.php')
 */
function espresso_require_template($template_file_name, $must_exist = true, $as_require_once = true) {
	do_action('AHEE_log', __FILE__, __FUNCTION__, '');
	event_espresso_require_file($template_file_name, EVENT_ESPRESSO_TEMPLATE_DIR, EVENT_ESPRESSO_PLUGINFULLPATH . 'templates/', $must_exist, $as_require_once);
}
add_action('AHEE_require_template', 'espresso_require_template');

