<?php

//All of the functions that deal with admin area should go here.

function espresso_choose_layout($main_post_content = '', $sidebar_content = '', $center_metabox_content = '') {
	global $wp_version;
	if (version_compare($wp_version, '3.3.2', '>')) {
		espresso_post_wp_3_4_layout($main_post_content, $sidebar_content, $center_metabox_content);
	} else {
		espresso_pre_wp_3_4_layout($main_post_content, $sidebar_content, $center_metabox_content);
	}
	return TRUE;
}

function espresso_post_wp_3_4_layout($main_post_content = '', $sidebar_content = '', $center_metabox_content = '') {
	?>
	<div id="poststuff">
		<div id="post-body" class="metabox-holder columns-2">
			<div id="post-body-content">
				<!-- main post stuff here -->
				<?php echo $main_post_content; ?>
			</div> <!-- post-body-content -->
			<div id="postbox-container-1" class="postbox-container">
				<!-- sidebar stuff here -->
				<?php echo $sidebar_content; ?>
			</div> <!-- postbox-container-1 -->
			<div id="postbox-container-2" class="postbox-container">
				<!-- main column metaboxes under the post content here -->
				<?php echo $center_metabox_content; ?>
			</div> <!-- postbox-container-2 -->
		</div> <!-- post-body -->
	</div> <!-- poststuff -->
	<?php
}

function espresso_pre_wp_3_4_layout($main_post_content = '', $sidebar_content = '', $center_metabox_content = '') {
	?>
	<div id="poststuff" class="metabox-holder has-right-sidebar">
		<div id="side-info-column" class="inner-sidebar">
			<div id="side-sortables" class="meta-box-sortables ui-sortable">
				<!-- sidebar stuff here -->
				<?php echo $sidebar_content; ?>
			</div> <!-- side-sortables -->
		</div> <!-- side-info-column -->
		<div id="post-body">
			<div id="post-body-content">
				<!-- post stuff here -->
				<?php echo $main_post_content; ?>
				<?php echo $center_metabox_content; ?>
			</div> <!-- post-body-content -->
		</div> <!-- post-body -->
	</div> <!-- poststuff -->
	<?php
}

//These are all of the scripts we need
function event_espresso_config_page_styles() {
	wp_enqueue_style('dashboard');
	wp_enqueue_style('thickbox');
	wp_enqueue_style('global');
	wp_enqueue_style('wp-admin');
	wp_enqueue_style('event_espresso', EVENT_ESPRESSO_PLUGINFULLURL . 'css/admin-styles.css'); //Events core style
	if (isset($_REQUEST['page'])) {
		switch ($_REQUEST['page']) {
			case ( 'events' ):
			case ( 'discounts' ):
			case ( 'espresso_reports' ):
			case ( 'attendees' ):
				wp_enqueue_style('jquery-ui-style', EVENT_ESPRESSO_PLUGINFULLURL . 'css/ui-ee-theme/jquery-ui-1.8.16.custom.css');
				wp_enqueue_style('jquery-ui-style-datepicker', EVENT_ESPRESSO_PLUGINFULLURL . 'css/ui-ee-theme/jquery.ui.datepicker.css');
				break;
		}
		if (isset($_REQUEST['event_admin_reports'])) {
			switch ($_REQUEST['event_admin_reports']) {
				case 'charts':
					wp_enqueue_style('jquery-jqplot-css', EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/jqplot/jquery.jqplot.min.css');
					break;
			}
		}
	}
}

function event_espresso_config_page_scripts() {
	//add_thickbox();
	wp_enqueue_script('postbox');
	wp_enqueue_script('dashboard');
	wp_enqueue_script('thickbox');
	wp_enqueue_script('jquery');
	wp_enqueue_script('tiny_mce');
	wp_enqueue_script('editor');
	wp_enqueue_script('editor-functions');
	wp_enqueue_script('media-upload');
	wp_enqueue_script('post');
	wp_enqueue_script('dataTables', EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/jquery.dataTables.min.js', array('jquery')); //Events core table script
	wp_enqueue_script('dataTablesColVis', EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/jquery.ColVis.min.js', array('jquery', 'dataTables')); //Events core table column hide/show script
	//wp_enqueue_script('dataTablesColFilter', EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/jquery.dataTables.columnFilter.js', array('jquery', 'dataTables')); //Events core table column filtering

	$load_jquery_ui = FALSE;
	$load_datepicker = FALSE;
	$load_farbtastic = FALSE;
	$load_datetimepicker = FALSE;

	if ($_REQUEST['page'] == 'espresso_calendar') {
		$load_farbtastic = TRUE;
	}

	if ($_REQUEST['page'] == 'events') {
		$load_jquery_ui = TRUE;
		$load_datepicker = TRUE;
		$load_datetimepicker = TRUE;
		/*wp_register_script('jquery.reveal.js', (EVENT_ESPRESSO_PLUGINFULLURL . "scripts/jquery.reveal.js"), array('jquery'), '1.0');
		wp_enqueue_script('jquery.reveal.js');*/
	}

	if ($_REQUEST['page'] == 'discounts' && isset($_REQUEST['action']) && ($_REQUEST['action'] == 'edit' || $_REQUEST['action'] == 'new')) {
		$load_jquery_ui = TRUE;
		$load_datepicker = TRUE;
	}

	if ($_REQUEST['page'] == 'attendees' && isset($_REQUEST['event_admin_reports']) && $_REQUEST['event_admin_reports'] == 'enter_attendee_payments') {
		$load_jquery_ui = TRUE;
		$load_datepicker = TRUE;
	}

	//Load farbtastic
	if ($load_farbtastic) {
		wp_enqueue_script('farbtastic');
		wp_enqueue_style('farbtastic');
	}

	//Load jquery UI scripts
	if ($load_jquery_ui) {
		wp_enqueue_script('jquery-ui-core');
		wp_enqueue_script('jquery-ui-tabs');
	}

	//Load datepicker script
	if ($load_datepicker) {
		wp_enqueue_script('jquery-ui-datepicker');
	}

	//Load datetimepicker script
	if ($load_datetimepicker) {

		wp_enqueue_script('jquery-ui-slider');
		wp_register_script('jquery-ui-timepicker', (EVENT_ESPRESSO_PLUGINFULLURL . "scripts/jquery-ui-timepicker-addon.js"), array('jquery', 'jquery-ui-core', 'jquery-ui-datepicker', 'jquery-ui-slider'), '1.0.0');
		wp_enqueue_script('jquery-ui-timepicker');
	}


	if (isset($_REQUEST['event_admin_reports']) && $_REQUEST['event_admin_reports'] == 'add_new_attendee' || $_REQUEST['page'] == 'form_groups' || $_REQUEST['page'] == 'form_builder' || $_REQUEST['page'] == 'event_staff' || $_REQUEST['page'] == 'event_categories' || $_REQUEST['page'] == 'event_venues' || $_REQUEST['page'] == 'discounts' || $_REQUEST['page'] == 'groupons') {
		//Load form validation script
		wp_register_script('jquery.validate.js', (EVENT_ESPRESSO_PLUGINFULLURL . "scripts/jquery.validate.min.js"), false, '1.8.1');
		wp_enqueue_script('jquery.validate.js');
	}

	wp_register_script('event_espresso_js', (EVENT_ESPRESSO_PLUGINFULLURL . "scripts/event_espresso.js"), '', '', true);
	wp_enqueue_script('event_espresso_js');

	if (isset($_REQUEST['event_admin_reports'])) {
		switch ($_REQUEST['event_admin_reports']) {
			case 'charts':
				wp_enqueue_script('jquery-jqplot-js', EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/jqplot/jquery.jqplot.min.js', array('jquery'));
				wp_enqueue_script('jqplot-barRenderer-js', EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/jqplot/plugins/jqplot.barRenderer.min.js', array('jquery'));
				wp_enqueue_script('jqplot-pieRenderer-js', EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/jqplot/plugins/jqplot.pieRenderer.min.js', array('jquery'));
				wp_enqueue_script('jqplot-categoryAxisRenderer-js', EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/jqplot/plugins/jqplot.categoryAxisRenderer.min.js', array('jquery'));
				wp_enqueue_script('jqplot-highlighter-js', EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/jqplot/plugins/jqplot.highlighter.min.js', array('jquery'));
				wp_enqueue_script('jqplot-pointLabels-js', EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/jqplot/plugins/jqplot.pointLabels.min.js', array('jquery'));
				break;
		}
	}
	remove_all_filters('mce_external_plugins');
}

//Text formatting function for the_editor.
//This should fix all of the formatting issues of text output from the database.
function espresso_admin_format_content($content = '') {
	return wpautop(stripslashes_deep(html_entity_decode($content, ENT_QUOTES, "UTF-8")));
}

//This loads the the tinymce script into the header
function espresso_tiny_mce() {
	global $wp_version;
	$wp_min_version = '3.2';
	//If the version of WordPress is lower than 3.2, then we load the fallback script.
	if (!version_compare($wp_version, $wp_min_version, '>=')) {
		//If this is an older version of WordPress, then we need to load this.
		if (function_exists('wp_tiny_mce_preload_dialogs')) {
			add_action('admin_print_footer_scripts', 'wp_tiny_mce_preload_dialogs', 30);
		}
	}
	$show = true;
	//If thhis is a newer version of wordress and we are the events page, we don't want to load the editor function
	if (version_compare($wp_version, $wp_min_version, '>=')) {
		//If this is the event editor page, we don't want to load the tiny mce editor because it breaks the page
		if (isset($_REQUEST['page']) && ($_REQUEST['page'] == 'events')) {
			$show = false;
		}
		//If this is the edit attendee payments page then we need to load the tiny mce editor.
		//We need to do it this way because the 'event_admin_reports' is in the same URL string as 'event' above.
		if (isset($_REQUEST['event_admin_reports']) && ($_REQUEST['event_admin_reports'] == 'enter_attendee_payments')) {
			$show = true;
		}
	}
	//Load the tiny mce editor
	if ($show == true)
		wp_tiny_mce(false, array("editor_selector" => "theEditor")); // true gives you a stripped down version of the editor
}

//function to delete event
//From now on I am making events disapear instead of deleting completely.
//If an event is active and has active attendees, it will send the attendees an email notification of the cancelled event.
//@param optional pass an event id to delete
if (!function_exists('event_espresso_delete_event')) {

	function event_espresso_delete_event($event_id = 'NULL') {
		global $wpdb;
		if (isset($_REQUEST['action']) && $_REQUEST['action'] == 'delete') {
			$event_id = $_REQUEST['event_id'];
		}
		if ($event_id != 'NULL') {
			$sql = array('event_status' => 'D');
			$update_id = array('id' => $event_id);
			$sql_data = array('%s');
			/* if ($wpdb->update(EVENTS_DETAIL_TABLE, $sql, $update_id, $sql_data, array( '%d' ) ) && event_espresso_get_status($event_id) == 'ACTIVE'){
			  event_espresso_send_cancellation_notice($event_id);
			  } */

//Add an option in general settings for the following?
			/* if (event_espresso_get_status($event_id) == 'ACTIVE') {
			  event_espresso_send_cancellation_notice($event_id);
			  } */

			if ($wpdb->update(EVENTS_DETAIL_TABLE, $sql, $update_id, $sql_data, array('%d'))/* && event_espresso_get_status($event_id) == 'ACTIVE' */) {
				$event_post = $wpdb->get_row("SELECT post_id FROM " . EVENTS_DETAIL_TABLE . " WHERE id =" . $event_id, ARRAY_A);
				wp_delete_post($event_post['post_id']);
				//echo $event_post['post_id'];
			}
		} else {
			echo '<h1>' . __('No ID  Supplied', 'event_espresso') . '</h1>';
		}
	}

}

//This function installs the tables
//function to empty trash
//This will delete everything that is related to the events that have been deleted
function event_espresso_empty_event_trash($event_id) {
	global $wpdb;
	//if ( $_REQUEST['action'] == 'delete' ){
	//$event_id=$_REQUEST['id'];
	//Remove the event
	$sql = "DELETE FROM " . EVENTS_DETAIL_TABLE . " WHERE id='" . $event_id . "'";
	$wpdb->query($wpdb->prepare($sql, $event_id));

	//Remove the event discount
	$sql = "DELETE FROM " . EVENTS_DISCOUNT_REL_TABLE . " WHERE event_id='" . $event_id . "'";
	$wpdb->query($wpdb->prepare($sql, $event_id));

	$sql = "DELETE FROM " . EVENTS_ATTENDEE_TABLE . " WHERE event_id='" . $event_id . "'";
	$wpdb->query($wpdb->prepare($sql, $event_id));


	/*	 * ********************* REMOVE AFTER DATA MIGRATION SCRIPTS WRITTEN ********************** */
	//Remove the event times
	$sql = "DELETE FROM " . EVENTS_START_END_TABLE . " WHERE event_id='" . $event_id . "'";
	$wpdb->query($wpdb->prepare($sql, $event_id));

	//Remove the event prices
	$sql = "DELETE FROM " . EVENTS_PRICES_TABLE . " WHERE event_id='" . $event_id . "'";
	$wpdb->query($wpdb->prepare($sql, $event_id));

	/*	 * ********************* END REMOVE ********************** */




	/* delete_price_from_event($event_id);
	  delete_category_from_event($event_id);
	  delete_discount_from_event($event_id);
	  delete_attendees_from_event($event_id); */
	//}
}

/**
 * Create a postbox widget
 */
function postbox($id, $title, $content) {
	?>

	<div id="<?php echo $id; ?>" class="postbox">
		<div class="handlediv" title="Click to toggle"><br />
		</div>
		<h3 class="hndle"><span><?php echo $title; ?></span></h3>
		<div class="inside"> <?php echo $content; ?> </div>
	</div>
	<?php
}

/* Aurelio */

function ee_tep_not_null($value) {
	if (is_array($value)) {
		if (sizeof($value) > 0) {
			return true;
		} else {
			return false;
		}
	} else {
		if (($value != '') && (strtolower($value) != 'null') && (strlen(trim($value)) > 0)) {
			return true;
		} else {
			return false;
		}
	}
}

function ee_tep_round($number, $precision) {
	if (strpos($number, '.') && (strlen(substr($number, strpos($number, '.') + 1)) > $precision)) {
		$number = substr($number, 0, strpos($number, '.') + 1 + $precision + 1);

		if (substr($number, -1) >= 5) {
			if ($precision > 1) {
				$number = substr($number, 0, -1) + ('0.' . str_repeat(0, $precision - 1) . '1');
			} elseif ($precision == 1) {
				$number = substr($number, 0, -1) + 0.1;
			} else {
				$number = substr($number, 0, -1) + 1;
			}
		} else {
			$number = substr($number, 0, -1);
		}
	}

	return $number;
}

function ee_tep_output_string($string, $translate = false, $protected = false) {
	if ($protected == true) {
		return htmlspecialchars($string);
	} else {
		if ($translate == false) {
			return ee_tep_parse_input_field_data($string, array('"' => '&quot;'));
		} else {
			return ee_tep_parse_input_field_data($string, $translate);
		}
	}
}

function ee_tep_parse_input_field_data($data, $parse) {
	return strtr(trim($data), $parse);
}

/* Turns an array into a select field */

function select_input($name, $values, $default = '', $parameters = '', $class = '', $autosize = true) {
	$field = '<select name="' . ee_tep_output_string($name) . '"';
	//Debug
	//echo "<pre>".print_r($values,true)."</pre>";
	if (ee_tep_not_null($parameters))
		$field .= ' ' . $parameters;
	if ($autosize) {
		$size = 'med';
		for ($ii = 0, $ni = sizeof($values); $ii < $ni; $ii++) {
			if ($values[$ii]['text']) {
				if (strlen($values[$ii]['text']) > 5)
					$size = 'wide';
			}
		}
	} else
		$size = '';

	$field .= ' class="' . $class . ' ' . $size . '">';

	if (empty($default) && isset($GLOBALS[$name]))
		$default = stripslashes($GLOBALS[$name]);


	for ($i = 0, $n = sizeof($values); $i < $n; $i++) {
		$field .= '<option value="' . $values[$i]['id'] . '"';
		if ($default == $values[$i]['id']) {
			$field .= 'selected = "selected"';
		}

		$field .= '>' . $values[$i]['text'] . '</option>';
	}
	$field .= '</select>';

	return $field;
}

/* * ** These functions deals with moving templates and files *** */

/**
 * event_espresso_count_files, does exactly what the name says
 */
function event_espresso_count_files($path, $exclude = ".|..|.svn", $recursive = false) {
	$result = array();
	$path = rtrim($path, "/") . "/";
	if (is_dir($path)) {
		$folder_handle = opendir($path);
		$exclude_array = explode("|", $exclude);
		while (false !== ($filename = readdir($folder_handle))) {
			if (!in_array(strtolower($filename), $exclude_array)) {
				if (is_dir($path . $filename . "/")) {
					if ($recursive)
						$result[] = file_array($path, $exclude, true);
				} else {
					$result[] = $filename;
				}
			}
		}
	}
	//return $result;
	return count($result);
}

//Functions for copying and moving templates
function event_espresso_trigger_copy_templates() {
	global $wpdb;
	check_admin_referer('copy_templates');
	event_espresso_smartCopy(EVENT_ESPRESSO_PLUGINFULLPATH . 'templates/', EVENT_ESPRESSO_TEMPLATE_DIR);

	$_SESSION['event_espresso_themes_copied'] = true;
	$sendback = wp_get_referer();
	$sendback = add_query_arg('tab', $_SESSION['event_espresso_settings_curr_page'], remove_query_arg('tab', $sendback));
	wp_redirect($sendback);
	exit();
}

//Functions for copying and moving gateways
function event_espresso_trigger_copy_gateways() {
	global $wpdb;
	check_admin_referer('copy_gateways');
	event_espresso_smartCopy(EVENT_ESPRESSO_PLUGINFULLPATH . 'gateways/', EVENT_ESPRESSO_GATEWAY_DIR);

	$_SESSION['event_espresso_gateways_copied'] = true;
	$sendback = wp_get_referer();
	$sendback = add_query_arg('tab', $_SESSION['event_espresso_settings_curr_page'], remove_query_arg('tab', $sendback));
	wp_redirect($sendback);
	exit();
}

//Functions for copying and moving files and themes
function event_espresso_smartCopy($source, $dest, $folderPermission = 0755, $filePermission = 0644) {
# source=file & dest=dir => copy file from source-dir to dest-dir
# source=file & dest=file / not there yet => copy file from source-dir to dest and overwrite a file there, if present
# source=dir & dest=dir => copy all content from source to dir
# source=dir & dest not there yet => copy all content from source to a, yet to be created, dest-dir
	$result = false;

	if (is_file($source)) { # $source is file
		if (is_dir($dest)) { # $dest is folder
			if ($dest[strlen($dest) - 1] != '/') # add '/' if necessary
				$__dest = $dest . "/";
			$__dest .= basename($source);
		}
		else { # $dest is (new) filename
			$__dest = $dest;
		}
		$result = copy($source, $__dest);
		chmod($__dest, $filePermission);
	} elseif (is_dir($source)) { # $source is dir
		if (!is_dir($dest)) { # dest-dir not there yet, create it
			@mkdir($dest, $folderPermission);
			chmod($dest, $folderPermission);
		}
		if ($source[strlen($source) - 1] != '/') # add '/' if necessary
			$source = $source . "/";
		if ($dest[strlen($dest) - 1] != '/') # add '/' if necessary
			$dest = $dest . "/";

		# find all elements in $source
		$result = true; # in case this dir is empty it would otherwise return false
		$dirHandle = opendir($source);
		while ($file = readdir($dirHandle)) { # note that $file can also be a folder
			if ($file != "." && $file != "..") { # filter starting elements and pass the rest to this function again
#				echo "$source$file ||| $dest$file<br />\n";
				$result = event_espresso_smartCopy($source . $file, $dest . $file, $folderPermission, $filePermission);
			}
		}
		closedir($dirHandle);
	} else {
		$result = false;
	}
	return $result;
}

function espresso_getFileList($dir) {
	#array to hold return value
	$retval = array();
	#add trailing slash if missing
	if (substr($dir, -1) != "/")
		$dir .= "/";
	# open pointer to directory and read list of files
	$d = @dir($dir) or die("getFileList: Failed opening directory $dir for reading");
	while (false !== ($entry = $d->read())) {
		# skip hidden files
		if ($entry[0] == "." || $entry[0] == "_")
			continue;
		if (is_dir("$dir$entry")) {
			$retval[] = array("name" => "$dir$entry/", "type" => filetype("$dir$entry"), "size" => 0, "lastmod" => filemtime("$dir$entry"));
		} elseif (is_readable("$dir$entry")) {
			$retval[] = array("name" => "$dir$entry", "type" => mime_content_type("$dir$entry"), "size" => filesize("$dir$entry"), "lastmod" => filemtime("$dir$entry"));
		}
	} $d->close();
	return $retval;
}

function event_espresso_admin_news($url) {
	return wp_remote_retrieve_body(wp_remote_get($url));
}

//Displays what email tags are available
function event_espresso_custom_email_info() {
	?>
	<div style="display: none;">
		<div id="custom_email_info" class="pop-help" >
			<div class="TB-ee-frame">
				<h2>
	<?php _e('Email Confirmations', 'event_espresso'); ?>
				</h2>
				<p>
	<?php _e('For customized confirmation emails, the following tags can be placed in the email form and they will pull data from the database to include in the email.', 'event_espresso'); ?>
				</p>
				<p>[registration_id], [fname], [lname], [phone], [event], [event_link], [event_url], [ticket_type], [ticket_link], [qr_code], [description], [cost], [company], [co_add1], [co_add2], [co_city],[co_state], [co_zip],[contact], [payment_url], [invoice_link], [txn_id], [start_date], [start_time], [end_date], [end_time], [location], [location_phone], [google_map_link], [venue_title], [venue_address], [venue_url], [venue_image], [venue_phone], [custom_questions]</p>
			</div>
		</div>
	</div>
	<div style="display: none;">
		<div id="custom_email_example" class="pop-help" >
			<div class="TB-ee-frame">
				<h2>
	<?php _e('Sample Mail Send:', 'event_espresso'); ?>
				</h2>
				<p style="font-size:10px;">***This is an automated response - Do Not Reply***</p>
				<p style="font-size:10px;">Thank you [fname] [lname] for registering for [event]. We hope that you will find this event both informative and enjoyable. Should have any questions, please contact [contact].</p>
				<p style="font-size:10px;"><strong>Ticket type:</strong> [ticket_type]</p>
				<p style="font-size:10px;"><strong>Print Tickets:</strong> [ticket_link] (A link <a href="http://eventespresso.com/?p=3754" target="_blank">Your Customized Ticket</a> if the ticketing addon is installed.)</p>
				<p style="font-size:10px;">[qr_code] (generated by the QR Code addon, if installed)</p>
				<p style="font-size:10px;">If you have not done so already, please submit your payment in the amount of [cost].</p>
				<p style="font-size:10px;">Click here to review your payment information [payment_url].</p>
				<p style="font-size:10px;">Your questions: [custom_questions].</p>
			</div>
		</div>
	</div>
	<?php
}

//Function to check if registration ids are missing
function event_espresso_verify_attendee_data() {
	if (!is_admin())
		return;
	global $wpdb;
	$sql = "SELECT id FROM " . EVENTS_ATTENDEE_TABLE . " WHERE registration_id IS NULL OR registration_id = '' OR registration_id = '0' OR quantity IS NULL OR quantity = '' OR quantity = '0' ";
	$wpdb->get_results($sql);
	if ($wpdb->num_rows > 0) {
		return true;
	}
}

function event_espresso_update_attendee_data() {
	global $wpdb;
	//$wpdb->show_errors();

	$sql = "SELECT id FROM " . EVENTS_ATTENDEE_TABLE . " WHERE registration_id IS NULL OR registration_id = '' OR registration_id = '0' ";
	$attendees = $wpdb->get_results($sql);

	if ($wpdb->num_rows > 0) {

		//echo $sql;
		foreach ($attendees as $attendee) {

			/**			 * *******************************
			 * ******	Update single registrations
			 * ********************************* */
			$registration_id = uniqid('', true);
			$update_attendee = "UPDATE " . EVENTS_ATTENDEE_TABLE . " SET registration_id = '" . $registration_id . "' WHERE id = '" . $attendee->id . "'";
			$wpdb->query($update_attendee);
		}
	}

	$sql2 = "SELECT id FROM " . EVENTS_ATTENDEE_TABLE . " WHERE quantity IS NULL OR quantity = '' OR quantity = '0' ";
	$attendees2 = $wpdb->get_results($sql2);
	if ($wpdb->num_rows > 0) {
		//echo $sql;
		foreach ($attendees2 as $attendee2) {

			/**			 * *******************************
			 * ******	Update pricing
			 * ********************************* */
			$update_attendee2 = "UPDATE " . EVENTS_ATTENDEE_TABLE . " SET quantity = '1' WHERE id = '" . $attendee2->id . "'";
			$wpdb->query($update_attendee2);
		}
	}
}

//This function installs the required pages
function espresso_create_default_pages() {
	global $wpdb, $org_options, $espresso_wp_user;
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	$default_pages = array('Event Registration', 'Thank You', 'Registration Cancelled', 'Transactions');
	$existing_pages = get_pages();
	$temp = array();
	foreach ($existing_pages as $page) {
		$temp[] = $page->post_title;
	}
	$pages_to_create = array_diff($default_pages, $temp);
	$updated_flag = false;
	$page_ids = get_all_page_ids();
	foreach ($pages_to_create as $new_page_title) {

		// Create post object
		$my_post = array();
		$my_post['post_title'] = $new_page_title;
		//$my_post['post_content'] = 'This is my '.$new_page_title.' page.';
		$my_post['post_status'] = 'publish';
		$my_post['post_type'] = 'page';
		$my_post['comment_status'] = 'closed';
		// Insert the post into the database
		//$result = wp_insert_post( $my_post );

		switch ($new_page_title) {
			case 'Event Registration':
				if (empty($org_options['event_page_id'])
								|| !in_array($org_options['event_page_id'], $page_ids)) {
					$my_post['post_content'] = '[ESPRESSO_EVENTS]';
					$event_page_id = wp_insert_post($my_post);
					$org_options['event_page_id'] = $event_page_id;
					$updated_flag = true;
				}
				break;
			case 'Thank You':
				if (empty($org_options['return_url'])
								|| !in_array($org_options['return_url'], $page_ids)) {
					$my_post['post_content'] = '[ESPRESSO_PAYMENTS]';
					$return_url = wp_insert_post($my_post);
					$org_options['return_url'] = $return_url;
					$updated_flag = true;
				}
				break;
			case 'Registration Cancelled':
				if (empty($org_options['cancel_return'])
								|| !in_array($org_options['cancel_return'], $page_ids)) {
					$my_post['post_content'] = 'You have cancelled your registration.<br />[ESPRESSO_CANCELLED]';
					$cancel_return = wp_insert_post($my_post);
					$org_options['cancel_return'] = $cancel_return;
					$updated_flag = true;
				}
				break;
			case 'Transactions':
				if (empty($org_options['notify_url'])
								|| !in_array($org_options['notify_url'], $page_ids)) {
					$my_post['post_content'] = '[ESPRESSO_TXN_PAGE]';
					$notify_url = wp_insert_post($my_post);
					$org_options['notify_url'] = $notify_url;
					$updated_flag = true;
				}
				break;
		}
	}
	update_user_meta($espresso_wp_user, 'events_organization_settings', $org_options);
	if ($updated_flag)
		add_action('admin_notices', 'espresso_updated_pages');
}

//Function to show an admin message if the main pages are not setup.
function espresso_updated_pages() {
	echo '<div class="error fade"><p><strong>' . __('In order to function properly Event Espresso has added one or more pages with the corresponding shortcodes. Go to', 'event_espresso') . ' <a href="' . admin_url('admin.php?page=event_espresso&anchor=page_settings#page_settings') . '">' . __('Event Espresso Page Settings', 'event_espresso') . '</a>  ' . __('to view the updated pages.', 'event_espresso') . '</strong></p></div>';
}

function espresso_page_problems() {
	echo '<div class="error fade"><p><strong>' . __('A problem has been detected with one or more of your Event Espresso pages. Go to', 'event_espresso') . ' <a href="' . admin_url('admin.php?page=event_espresso&anchor=page_settings#page_settings') . '">' . __('Event Espresso Page Settings', 'event_espresso') . '</a>  ' . __('to view your Event Espresso pages.', 'event_espresso') . '</strong></p></div>';
}

//Function to show an admin message if registration id's are missing.
function event_espresso_registration_id_notice() {
	if (function_exists('admin_url')) {
		echo '<div class="error fade"><p><strong>' . __('Event Espresso attendee data needs to be updated. Please visit the ', 'event_espresso') . ' <a href="' . admin_url('admin.php?page=support#attendee_data') . '">' . __('Support page', 'event_espresso') . '</a>  ' . __('to configure update the attendee information.', 'event_espresso') . '</strong></p></div>';
	} else {
		echo '<div class="error fade"><p><strong>' . __('Event Espresso attendee data needs to be updated. Please visit the ', 'event_espresso') . ' <a href="' . admin_url('admin.php?page=support#attendee_data') . '">' . __('Support page', 'event_espresso') . '</a>  ' . __('to configure update the attendee information.', 'event_espresso') . '</strong></p></div>';
	}
}

//This function returns a dropdown of secondary events
if (!function_exists('espresso_secondary_events_dd')) {

	function espresso_secondary_events_dd($current_value = '0', $allow_overflow = false) {
		global $wpdb;
		$sql = "SELECT id, event_name FROM " . EVENTS_DETAIL_TABLE;
		$sql .= " WHERE event_status = 'S' ";

		$events = $wpdb->get_results($sql);
		$num_rows = $wpdb->num_rows;
		//return print_r( $events );
		if ($num_rows > 0) {
			$field = '<select name="overflow_event_id" id="overflow_event_id" class="chzn-select wide">\n';
			$field .= '<option value="0">Select an event</option>';

			foreach ($events as $event) {
				$selected = $event->id == $current_value ? 'selected="selected"' : '';
				$field .= '<option ' . $selected . ' value="' . $event->id . '">' . $event->event_name . '</option>\n';
			}
			$field .= "</select>";
			$values = array(array('id' => true, 'text' => __('Yes', 'event_espresso')), array('id' => false, 'text' => __('No', 'event_espresso')));
			$html = '<p><label>' . __('Assign a Waitlist Event? ', 'event_espresso') . '</label> ' . select_input('allow_overflow', $values, $allow_overflow) . ' ' . apply_filters('filter_hook_espresso_help', 'secondary_info') . '</p>' .
							'<p class="inputunder"><label>' . __('Overflow Event', 'event_espresso') . ': </label><br />' . $field . '</p>';

			return $html;
		}
	}

}

/**
 * Function espresso_db_dropdown creates a drop-down box
 * by dynamically querying ID-Name pair from a lookup table
 * Parameters:
 * intIdField = Integer "ID" field of table, usually the primary key
 * strNameField = Name field that user picks as a value
 * strTableName = Name of MySQL table containing intIDField and strNameField
 * strOrderField = Which field you want results sorted by
 * strMethod = Sort as asc=ascending (default) or desc for descending
 * $current_value = The current select value
 * $strDDName = The name of the field
 *
 * Returns:
 * HTML Drop-Down Box Mark-up Code
 */
function espresso_db_dropdown($intIdField, $strNameField, $strTableName, $strOrderField, $current_value, $strMethod = "desc", $strDDName = "") {
	global $wpdb;

	$strQuery = "select $intIdField, $strNameField from $strTableName order by $strOrderField $strMethod";
	//$rsrcResult = mysql_query($strQuery);
	$data = $wpdb->get_results($strQuery, ARRAY_A);
	//print_r($data);
	$strDDName = $strDDName != "" ? $strDDName : $strNameField;
	if ($wpdb->num_rows > 0) {
		echo '<select name="' . $strDDName . '" class="chzn-select wide">';
		echo '<option value="">' . __('Select Value', 'event_espresso') . '</option>';

		/*		 * * loop over the results ** */
		foreach ($data as $row) {
			/*			 * * create the options ** */
			echo '<option value="' . $row["$intIdField"] . '"';
			if ($row["$intIdField"] == $current_value) {
				echo ' selected';
			}
			echo '>' . stripslashes_deep($row["$strNameField"]) . '</option>' . "\n";
		}
		echo "</select>";
	} else {
		_e('No Results', 'event_espresso');
	}
}

function espresso_email_message($id) {
	global $wpdb;
	$result = $wpdb->get_row("SELECT * FROM " . EVENTS_EMAIL_TABLE . " WHERE id =" . $id, ARRAY_A);
	$result['email_name'] = stripslashes_deep($result['email_name']);
	$result['email_subject'] = stripslashes_deep($result['email_subject']);
	$result['email_text'] = stripslashes_deep($result['email_text']);
	return $result;
}

function espresso_category_dropdown($current_value = '') {
	global $wpdb;

	$strQuery = "select id, category_name from " . EVENTS_CATEGORY_TABLE;
	$data = $wpdb->get_results($strQuery, ARRAY_A);
	//print_r($data);

	if ($wpdb->num_rows > 0) {
		echo '<select name="category_id" class="chzn-select" style="width:160px;">';
		echo '<option value="">' . __('Show All Categories', 'event_espresso') . '</option>';

		/*		 * * loop over the results ** */
		foreach ($data as $row) {
			/*			 * * create the options ** */
			echo '<option value="' . $row["id"] . '"';
			if ($row["id"] == $current_value) {
				echo ' selected';
			}
			echo '>' . stripslashes_deep($row["category_name"]) . '</option>' . "\n";
		}
		echo "</select>";
	} else {
		return;
	}
}

/**
 * This function grabs the event categories.
 * @param optional $event_id = pass the event id to get the categories assigned to the event.
 */
function event_espresso_list_categories($event_id = 0) {
	global $wpdb;
	$event_categories = $wpdb->get_results("SELECT * FROM " . EVENTS_CATEGORY_TABLE);

	foreach ($event_categories as $category) {
		$category_id = $category->id;
		$category_name = $category->category_name;

		$in_event_categories = $wpdb->get_results("SELECT * FROM " . EVENTS_CATEGORY_REL_TABLE . " WHERE event_id='" . $event_id . "' AND cat_id='" . $category_id . "'");
		if ($wpdb->num_rows > 0) {
			echo '<ul>';
			foreach ($in_event_categories as $in_category) {
				$in_event_category = $in_category->cat_id;
			}
			echo $in_event_category != 0 ? '<li>' . $category_name . '</li>' : '';
			echo '</ul>';
		} else {
			return 0;
		}
	}
}

function espresso_attendees_by_month_dropdown($current_value = '') {
	global $wpdb;

	$strQuery = "select id, date from " . EVENTS_ATTENDEE_TABLE . " group by YEAR(date), MONTH(date) ";
	//$rsrcResult = mysql_query($strQuery);
	$data = $wpdb->get_results($strQuery, ARRAY_A);
	//print_r($data);

	if ($wpdb->num_rows > 0) {
		echo '<select name="month_range" class="chzn-select wide">';
		echo '<option value="">' . __('Select a Month/Year', 'event_espresso') . '</option>';

		/*		 * * loop over the results ** */
		foreach ($data as $row) {
			/*			 * * create the options ** */
			echo '<option value="' . event_espresso_no_format_date($row["date"], $format = 'Y-m-d') . '"';
			if (event_espresso_no_format_date($row["date"], $format = 'Y-m-d') == $current_value) {
				echo ' selected';
			}
			echo '>' . event_espresso_no_format_date($row["date"], $format = 'F  Y') . '</option>' . "\n";
		}
		echo "</select>";
	} else {
		_e('No Results', 'event_espresso');
	}
}

if (!function_exists('espresso_event_list_attendee_title')) {

	function espresso_event_list_attendee_title( $event_id = FALSE ) {

		if ( ! $event_id ) {
			return FALSE;
		}

		global $wpdb;
		$SQL = 'SELECT event_name FROM ' . EVENTS_DETAIL_TABLE . ' WHERE id = %d';
		if ( $event = $wpdb->get_row( $wpdb->prepare( $SQL, $event_id ))) {
			$content = stripslashes_deep( $event->event_name);
			$content .= ' | ';
			$content .= 'ID: ' . $event_id;
			$content .= ' | ';
			$content .= espresso_event_time( $event_id, 'start_date_time' );
			return $content;

		} else {
			return '';
		}

	}
}

function espresso_payment_reports($atts) {
	global $wpdb;
	extract($atts);
	$sql = "SELECT SUM(a.amount_pd) quantity FROM " . EVENTS_ATTENDEE_TABLE . " a WHERE a.quantity >= 1 AND a.payment_status='Completed' AND a.event_id = '" . $event_id . "' ";
	$payments = $wpdb->get_results($sql, ARRAY_A);
	$total = 0;
	if ($wpdb->num_rows > 0 && $wpdb->last_result[0]->quantity != NULL) {
		$total = $wpdb->last_result[0]->quantity;
	}
	//echo $sql;
	switch ($type) {
		case 'total_payments':
			return $total;
			break;
	}
}

//Retunrs an array of template files on the uploads directory
function espresso_template_files_exist($dir) {
	// read our template dir and build an array of files
	$dhandle = opendir($dir);
	$files = array();
	$exclude = array('.', '..', 'index.htm', 'index.html', 'index.php', '.svn', '.DS_Store');

	//if we manage to open the directory
	if ($dhandle) {
		// loop through all of the files
		while (( $fname = readdir($dhandle)) !== FALSE) {
			// if the file is not in the array of things to exclude
			if (!in_array($fname, $exclude) && !is_dir($fname)) {
				// then store the filename
				$files[] = $fname;
			}
		}
		// close the directory
		closedir($dhandle);
	}
	$html = '<p>';
	foreach ($files as $k => $v) {
		$html .= $v . '<br />';
	}
	$html .= '</p>';
	return $html;
}

/**
 * 		creates url slugs from event_name
 *
 * 		@access public
 * 		@return void
 */
function espresso_create_url_slugs() {
	//echo '<h1>'. __FILE__ . ' - ' . __FUNCTION__ . ' ( line no: ' . __LINE__ . ' )</h1>';

	global $wpdb;

	$SQL = 'SELECT id, event_name FROM ' . EVENTS_DETAIL_TABLE;

	if ($events = $wpdb->get_results($wpdb->prepare($SQL))) {
		$data = array();
		$where = array();
		if ($events) {
			foreach ($events as $event) {

				$data['slug'] = espresso_string_to_url($event->event_name);
				$where['id'] = $event->id;

				$wpdb->update(
								EVENTS_DETAIL_TABLE, $data, $where, array('%s'), array('%d')
				);
			}
		}
	}

//echo printr($data);
//echo printr($where);
}

/**
 * 		converts a string to url friendly string by:
 * 	changing spaces to dashes, changing & (or &amp;) to "and", stripping tags, and converting to lowercase
 *
 * 		@access 	public
 * 		@param 	string	$string
 * 		@return 	string
 */
function espresso_string_to_url($string) {

	$expressions = array(
			'&\#\d+?;' => '',
			'&\S+?;' => '',
			'\s+' => '-',
			'[^a-z0-9\-\._]' => '',
			'-+' => '-',
			'-$' => '-',
			'^-' => '-',
			'\.+$' => ''
	);

	$string = str_replace('&amp;', 'and', $string);
	$string = str_replace('&', 'and', $string);
	$string = wp_strip_all_tags($string);

	foreach ($expressions as $key => $exp) {
		$string = preg_replace("#" . $key . "#i", $exp, $string);
	}

	$string = strtolower($string);

	return $string;
}

/**
 * 		flushes the event cache
 *
 * 		@access public
 * 		@param 	in	$event_id
 * 		@return void
 */
if (!function_exists('espresso_reset_cache')) {

	function espresso_reset_cache($event_id = 0) {
		delete_transient('all_espresso_events');
		delete_transient('all_espresso_calendar_events');

		//Flushes the cache that may be set for an event slug
		if ($event_id > 0) {
			delete_transient('espresso_event_slug_' . $event_id);
			delete_transient('espresso_time_dropdown_' . $event_id);
		}
	}

}


