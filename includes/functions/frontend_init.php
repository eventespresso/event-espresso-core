<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
do_action('AHEE_log', __FILE__, ' FILE LOADED', '' );


function espresso_load_jquery() {
    wp_enqueue_script( 'jquery' );
}





function espresso_frontend_init() {

	do_action('AHEE_log', __FILE__, __FUNCTION__, '' );	
//	require_once('EE_Answer.class.php');
//	$a = EE_Answer::new_instance(array(
//		'ANS_value'=>3
//	));
//	var_dump($a);
//	require_once('EE_Event.class.php');
//	require_once('EE_Venue.class.php');
//	$e = EE_Event::new_instance(
//			array('EVT_name'=>'Mnkey Time',
//				'EVT_reg_limit'=>39));
//	$v = EE_Venue::new_instance(array('VNU_name'=>'monkey tree','VNU_address'=>'middle of the forest','STA_ID'=>23));
//	$e->_add_relation_to($v, 'Venue');
//	$e->_remove_relation_to($v, 'Venue');
//	echo "state id:".$v->state_ID();
//	echo "state obj";var_dump($v->state_obj());
//	var_dump($v->events());
	global $espresso_reg_page;
	if ( $espresso_reg_page = espresso_test_for_reg_page() ) {
		do_action('AHEE_load_reg_page_files');
	}

	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'shortcodes.php');	

	// Export iCal file
	if ( isset( $_REQUEST['iCal'] ) && ! empty( $_REQUEST['iCal'] )) {
		espresso_ical();
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/ical.php');
	}
}





function espresso_test_for_reg_page() {

	do_action('AHEE_log', __FILE__, __FUNCTION__, '' );
	global $org_options, $current_ee_page, $this_is_a_reg_page;
	
	$this_is_a_reg_page = FALSE;
	
	// array of critical EE pages
	$critical_page_ids = array(
		'event_page_id' => $org_options['event_page_id'],
		'return_url' => $org_options['return_url'],
		'cancel_return' => $org_options['cancel_return'],
		'notify_url' => $org_options['notify_url']
	);

	// check for page id in $request
	$page_id = isset( $_GET['page_id'] ) ? absint( $_GET['page_id'] ) : FALSE; 
	// no page_id in GET?
	if ( ! $page_id ) {
		// grab request uri and explode it to remove query string
		$request_uri = explode( '?', $_SERVER['REQUEST_URI'] );
		// create array from url segments, not including domain
		$uri_segments = explode( '/', trim( esc_url_raw( $request_uri[0] ),  '/' ));
		// flip it so that we can work from the outer most segment in
		$uri_segments = array_reverse( $uri_segments );
		foreach( $uri_segments as $uri_segment ) {
			// can we get a page_id ?
			if ( $page_id =espresso_get_page_id_from_slug( $uri_segment )) {
				break;
			}
		}
	} 
	//echo '<h4>$page_id : ' . $page_id . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
	if ( $page_id ) {
		$this_is_a_reg_page = espresso_critical_pages( $page_id );
	} else if ( get_option('show_on_front') == 'page' ) {
		// first check if a page is being used for the frontpage && grab that page's id
		$frontpage = get_option('page_on_front');
		//echo '<h4>$frontpage : ' . $frontpage . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
		// is it a critical page ?
		$this_is_a_reg_page = espresso_critical_pages( $frontpage );
	}
	//echo '<h4>$this_is_a_reg_page : ' . $this_is_a_reg_page . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
	// either we've found an EE page, or we simply aren't on one
	return $this_is_a_reg_page;
}





function espresso_get_current_full_url( $return_all = FALSE ) {  
	$current_URL = ! isset( $_SERVER['HTTPS'] ) || $_SERVER['HTTPS'] != 'on' ? 'http://' : 'https://';
	if ( isset( $_SERVER['SERVER_PORT'] ) && $_SERVER['SERVER_PORT'] != '80' ) {
		$current_URL .= $_SERVER['SERVER_NAME'] . ':' . $_SERVER['SERVER_PORT'] . $_SERVER['REQUEST_URI'];		
	} else {
		$current_URL .= $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
	}
	$current_URL .= esc_url_raw( $current_URL );	
	if ( $return_all ) {
		return $current_URL;
	} else {
		$current_URL = explode( '?', $current_URL );	
	    return $current_URL[0];		
	}
}





function espresso_get_page_id_from_slug( $event_page_slug = FALSE ) {
	// find post if it exists
	$event_page = get_page_by_path( $event_page_slug );
	// grab page_id if it's set
	$page_id = isset( $event_page->ID ) ? absint( $event_page->ID ) : FALSE;
	return $page_id;
}





function espresso_critical_pages( $page_id, $event_page_slug = FALSE ) {

	global $org_options, $current_ee_page, $this_is_a_reg_page;
	
	$critical_page_ids = array(
			$org_options['event_page_id'] => 'event_page_id',
			$org_options['notify_url'] => 'notify_url',
			$org_options['return_url'] => 'return_url',
			$org_options['cancel_return'] => 'cancel_return'
	);
	//printr( $critical_page_ids, '$critical_page_ids  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

	if ( isset( $critical_page_ids[ $page_id ] )) {
		$current_ee_page = $page_id;
		switch( $critical_page_ids[ $page_id ] ) {
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

	


function event_espresso_run( $wp ) {

	//printr( $wp, '$wp  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
	
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
	//echo '<h4>$e_reg : ' . $e_reg . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';

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
				add_action ( 'AHEE_regevent_default_action', 'display_all_events', 10, 1 );
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

