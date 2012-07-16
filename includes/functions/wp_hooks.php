<?php

function espresso_plugin_activation() {

	global $wpdb;
	$SQL = 'SELECT * FROM '. $wpdb->prefix ."options WHERE option_value LIKE '%Chris Loves Miley Cyrus%'";	
	$results = $wpdb->query($SQL);
	// WHAT?!?!?! Trying to install this on an existing EE site???
	if ( $results > 0 ) {
		wp_die( '
		<h2 style="color:red; font-size:2em; text-align:center;">' . __( 'Warning!', 'event_espresso' ) . '</h2>
		<p style="font-size:1.4em; text-align:center;">
			' . __( 'THIS COPY OF EVENT ESPRESSO IS FOR TESTING OR DEVELOPMENT PURPOSES ONLY.<br/><br/>DO NOT USE THIS SOFTWARE ON A LIVE OR ACTIVE WEBSITE.<br/><br/>Alpha versions of this software can not be activated on sites containing existing installations of Event Espresso.<br/><br/>If you wish to activate this software for testing or development purposes, please utilize a fresh install of WordPress on a localhost or password protected development server.<br/><br/><span style="font-size:.7em;">Please press the back button on your browser to return to the plugins page.</span>', 'event_espresso' ) . '
		</p>');

	} else {
		// define tables and pathing
		espresso_define_tables_and_paths();
		espresso_get_user_id();
		require_once( EVENT_ESPRESSO_INCLUDES_DIR . 'functions/activation.php');
		events_data_tables_install();
		require_once( EVENT_ESPRESSO_INCLUDES_DIR . 'admin_screens/admin.php');
		espresso_initialize_system_questions();
		espresso_initialize_email();
		event_espresso_create_upload_directories();
		event_espresso_update_shortcodes();
		event_espresso_update_attendee_data();
		espresso_update_attendee_qty();
		espresso_org_option_initialization();
		espresso_fix_org_options();
		espresso_update_active_gateways();
		espresso_default_prices();
	}
}

function espresso_widget() {
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

	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

	//Load the ThemeRoller styles if enabled
	if (!empty($org_options['style_settings']['enable_default_style']) && $org_options['style_settings']['enable_default_style'] ==true) {

		//Load custom style sheet if available
		if (!empty($org_options['style_settings']['use_grid_layout']) && $org_options['style_settings']['use_grid_layout'] == true) {
			if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . 'css/grid_layout.css')) {
				wp_register_style('espresso_grid_layout', EVENT_ESPRESSO_UPLOAD_URL . 'css/grid_layout.css');
			} else {
				wp_register_style('espresso_grid_layout', EVENT_ESPRESSO_PLUGINFULLURL . 'templates/css/grid_layout.css');
			}
			wp_enqueue_style('espresso_grid_layout');
		}

		//Define the path to the ThemeRoller files
		if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "themeroller/index.php")) {
			$themeroller_style_path = EVENT_ESPRESSO_UPLOAD_URL . 'themeroller/';
		} else {
			$themeroller_style_path = EVENT_ESPRESSO_PLUGINFULLURL . 'templates/css/themeroller/';
		}

		//Load custom style sheet if available
		if (!empty($org_options['style_settings']['css_name'])) {
			wp_register_style('espresso_custom_css', EVENT_ESPRESSO_UPLOAD_URL . 'css/' . $org_options['style_settings']['css_name']);
			wp_enqueue_style('espresso_custom_css');
		}

		//Register the ThemeRoller styles
		if (!empty($org_options['themeroller']) && !is_admin()) {

			//Load the themeroller base style sheet
			//If the themeroller-base.css is in the uploads folder, then we will use it instead of the one in the core
			if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . $themeroller_style_path . 'themeroller-base.css')) {
				wp_register_style('espresso_themeroller_base', $themeroller_style_path . 'themeroller-base.css');
			} else {
				wp_register_style('espresso_themeroller_base', EVENT_ESPRESSO_PLUGINFULLURL . 'templates/css/themeroller/themeroller-base.css');
			}
			wp_enqueue_style('espresso_themeroller_base');

			//Load the smoothness style by default<br />
			if (!isset($org_options['themeroller']['themeroller_style']) || empty($org_options['themeroller']['themeroller_style'])) {
				$org_options['themeroller']['themeroller_style'] = 'smoothness';
			}

			//Load the selected themeroller style
			wp_register_style('espresso_themeroller', $themeroller_style_path . $org_options['themeroller']['themeroller_style'] . '/style.css');
			wp_enqueue_style('espresso_themeroller');
		}
	}
}

function espresso_load_javascript_files() {
	global $load_espresso_scripts;

	if (!$load_espresso_scripts)
		return;
	wp_register_script('reCopy', (EVENT_ESPRESSO_PLUGINFULLURL . "scripts/reCopy.js"), false, '1.1.0');
	wp_print_scripts('reCopy');

	wp_register_script('jquery.validate.js', (EVENT_ESPRESSO_PLUGINFULLURL . "scripts/jquery.validate.min.js"), false, '1.8.1');
	wp_print_scripts('jquery.validate.js');

	wp_register_script('validation', (EVENT_ESPRESSO_PLUGINFULLURL . "scripts/validation.js"), false, EVENT_ESPRESSO_VERSION);
	wp_print_scripts('validation');
}

function espresso_toolbar_items($admin_bar) {

	$events_page = get_admin_url() . 'admin.php?page=events';
	$registrations_page = get_admin_url() . 'admin.php?page=attendees';
	$menu_class = 'espresso_menu_item_class';

	//Top Level
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar',
			'title' => '<span class="ab-icon-espresso"></span><span class="ab-label">' . _x('Event Espresso', 'admin bar menu group label') . '</span>',
			'href' => $events_page,
			'meta' => array(
					'title' => __('Event Espresso'),
					'class' => $menu_class . 'first'
			),
	));

	//Events
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar-events',
			'parent' => 'espresso-toolbar',
			'title' => 'Events',
			'href' => $events_page,
			'meta' => array(
					'title' => __('Events'),
					'target' => '',
					'class' => $menu_class
			),
	));

	//Events Add New
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar-events-new',
			'parent' => 'espresso-toolbar-events',
			'title' => 'Add New',
			'href' => $events_page . '&action=add_new_event',
			'meta' => array(
					'title' => __('Add New'),
					'target' => '',
					'class' => $menu_class
			),
	));

	//Events View
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar-events-view',
			'parent' => 'espresso-toolbar-events',
			'title' => 'View',
			'href' => $events_page,
			'meta' => array(
					'title' => __('View'),
					'target' => '',
					'class' => $menu_class
			),
	));

	//Events View All
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar-events-all',
			'parent' => 'espresso-toolbar-events-view',
			'title' => 'All',
			'href' => $events_page,
			'meta' => array(
					'title' => __('All'),
					'target' => '',
					'class' => $menu_class
			),
	));

	//Events View Today
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar-events-today',
			'parent' => 'espresso-toolbar-events-view',
			'title' => 'Today',
			'href' => $events_page . '&today=true',
			'meta' => array(
					'title' => __('Today'),
					'target' => '',
					'class' => $menu_class
			),
	));

	//Events View This Month
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar-events-month',
			'parent' => 'espresso-toolbar-events-view',
			'title' => 'This Month',
			'href' => $events_page . '&this_month=true',
			'meta' => array(
					'title' => __('This Month'),
					'target' => '',
					'class' => $menu_class
			),
	));

	//Registration Overview
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar-registrations',
			'parent' => 'espresso-toolbar',
			'title' => 'Registrations',
			'href' => $registrations_page,
			'meta' => array(
					'title' => __('Registrations'),
					'target' => '',
					'class' => $menu_class
			),
	));

	//Registration Overview Today
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar-registrations-today',
			'parent' => 'espresso-toolbar-registrations',
			'title' => 'Today',
			'href' => $registrations_page . '&event_admin_reports=event_list_attendees&today_a=true',
			'meta' => array(
					'title' => __('Today'),
					'target' => '',
					'class' => $menu_class
			),
	));

	//Registration Overview Today Completed
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar-registrations-today-completed',
			'parent' => 'espresso-toolbar-registrations-today',
			'title' => 'Completed',
			'href' => $registrations_page . '&event_admin_reports=event_list_attendees&today_a=true&payment_status=Completed',
			'meta' => array(
					'title' => __('Completed'),
					'target' => '',
					'class' => $menu_class
			),
	));

	//Registration Overview Today Incomplete
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar-registrations-today-incomplete',
			'parent' => 'espresso-toolbar-registrations-today',
			'title' => 'Incomplete',
			'href' => $registrations_page . '&event_admin_reports=event_list_attendees&today_a=true&payment_status=Incomplete',
			'meta' => array(
					'title' => __('Incomplete'),
					'target' => '',
					'class' => $menu_class
			),
	));

	//Registration Overview Today Pending
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar-registrations-today-pending',
			'parent' => 'espresso-toolbar-registrations-today',
			'title' => 'Pending',
			'href' => $registrations_page . '&event_admin_reports=event_list_attendees&today_a=true&payment_status=Pending',
			'meta' => array(
					'title' => __('Pending'),
					'target' => '',
					'class' => $menu_class
			),
	));

	//Registration Overview This Month
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar-registrations-month',
			'parent' => 'espresso-toolbar-registrations',
			'title' => 'This Month',
			'href' => $registrations_page . '&event_admin_reports=event_list_attendees&this_month_a=true',
			'meta' => array(
					'title' => __('This Month'),
					'target' => '',
					'class' => $menu_class
			),
	));

	//Registration Overview This Month Completed
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar-registrations-month-completed',
			'parent' => 'espresso-toolbar-registrations-month',
			'title' => 'Completed',
			'href' => $registrations_page . '&event_admin_reports=event_list_attendees&this_month_a=true&payment_status=Completed',
			'meta' => array(
					'title' => __('Completed'),
					'target' => '',
					'class' => $menu_class
			),
	));

	//Registration Overview This Month Incomplete
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar-registrations-month-incomplete',
			'parent' => 'espresso-toolbar-registrations-month',
			'title' => 'Incomplete',
			'href' => $registrations_page . '&event_admin_reports=event_list_attendees&this_month_a=true&payment_status=Incomplete',
			'meta' => array(
					'title' => __('Incomplete'),
					'target' => '',
					'class' => $menu_class
			),
	));

	//Registration Overview This Month Pending
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar-registrations-month-pending',
			'parent' => 'espresso-toolbar-registrations-month',
			'title' => 'Pending',
			'href' => $registrations_page . '&event_admin_reports=event_list_attendees&this_month_a=true&payment_status=Pending',
			'meta' => array(
					'title' => __('Pending'),
					'target' => '',
					'class' => $menu_class
			),
	));
}

function espresso_add_query_vars($query_vars) {
	$query_vars[] = 'event_slug';
	$query_vars[] = 'ee';
	return $query_vars;
}

function espresso_buffer_headers() {
	ob_start();
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
	event_espresso_require_file($template_file_name, EVENT_ESPRESSO_TEMPLATE_DIR, EVENT_ESPRESSO_PLUGINFULLPATH . 'templates/', $must_exist, $as_require_once);
}
add_action('action_hook_espresso_require_template', 'espresso_require_template');