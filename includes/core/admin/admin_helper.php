<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');


//Text formatting function for wp_editor.
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

	function event_espresso_delete_event( $event_id = 'NULL' ) {
	
		global $wpdb;	
		
		if (isset($_REQUEST['action']) && $_REQUEST['action'] == 'delete') {
		
			$event_id = absint( $_REQUEST['event_id'] );
		
			$data_cols_and_vals = array('event_status' => 'D');
			$where_cols_and_vals = array('id' => $event_id);
			$where_format = array('%s');

			if( $wpdb->update( EVENTS_DETAIL_TABLE, $data_cols_and_vals, $where_cols_and_vals, $where_format, array('%d'))) {

				$sql = 'SELECT event_name FROM ' . EVENTS_DETAIL_TABLE . ' WHERE id  = %d';
				$event = $wpdb->get_row($wpdb->prepare($sql, $event_id));
				
				$msg = sprintf( 
						__( '%s has been successfully deleted.', 'event_espresso' ), 
						stripslashes( html_entity_decode( $event->event_name, ENT_QUOTES, 'UTF-8' ))
				);
				EE_Error::add_success( $msg, __FILE__, __FUNCTION__, __LINE__ );
				do_action( 'action_hook_espresso_event_moved_to_trash' );
				
			} else {
				$msg = __( 'An error occured. The event could not be moved to the trash.', 'event_espresso' );
				EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			}			
		} else {
			$msg = __( 'An error occured. The event could not be moved to the trash because a valid event ID was not not supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
		}
	}

}

//This function installs the tables
//function to empty trash
//This will delete everything that is related to the events that have been deleted
function event_espresso_empty_event_trash($event_id) {

	global $wpdb;

	$sql = 'SELECT post_id, event_name FROM ' . EVENTS_DETAIL_TABLE . ' WHERE id  = %d';
	$event = $wpdb->get_row($wpdb->prepare($sql, $event_id));
	$event_name = stripslashes( html_entity_decode( $event->event_name, ENT_QUOTES, 'UTF-8' ));
	
	// check for registrations
	$sql = 'SELECT * FROM ' . $wpdb->prefix . 'esp_registration WHERE EVT_ID = %d';
	
	if ( $results = $wpdb->query($wpdb->prepare($sql, $event_id))) {
		$msg = sprintf( __( '%s could not be deleted because Registration information exists for this event and doing so would corrupt your records.', 'event_espresso' ), $event_name );
		EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
	} else {
	
		do_action( 'action_hook_espresso_event_permanently_deleted' );
		// remove CPT
		wp_delete_post($event->post_id);

		$msg = sprintf( __( '%s has been successfully deleted.', 'event_espresso' ), $event_name );
		EE_Error::add_success( $msg, __FILE__, __FUNCTION__, __LINE__ );
	
		//Remove the event
		$sql = 'DELETE FROM ' . EVENTS_DETAIL_TABLE . ' WHERE id = %d';
		$wpdb->query($wpdb->prepare($sql, $event_id));
		
		//delete datetimes
		$sql = 'DELETE FROM ' . $wpdb->prefix . 'esp_datetime WHERE EVT_ID = %d';
		$wpdb->query($wpdb->prepare($sql, $event_id));
	
		//delete prices
		$sql = 'DELETE FROM ' . $wpdb->prefix . 'esp_price WHERE EVT_ID = %d';
		$wpdb->query($wpdb->prepare($sql, $event_id));
	
		//Remove the event discount
		$sql = 'DELETE FROM ' . EVENTS_DISCOUNT_REL_TABLE . ' WHERE event_id = %d';
		$wpdb->query($wpdb->prepare($sql, $event_id));
	
		$sql = 'DELETE FROM ' . EVENTS_ATTENDEE_TABLE . ' WHERE event_id = %d';
		$wpdb->query($wpdb->prepare($sql, $event_id));
	
	
		/*	 * ********************* REMOVE AFTER DATA MIGRATION SCRIPTS WRITTEN ********************** */
		//Remove the event times
		$sql = 'DELETE FROM ' . EVENTS_START_END_TABLE . ' WHERE event_id = %d';
		$wpdb->query($wpdb->prepare($sql, $event_id));
	
		//Remove the event prices
		$sql = 'DELETE FROM ' . EVENTS_PRICES_TABLE . ' WHERE event_id = %d';
		$wpdb->query($wpdb->prepare($sql, $event_id));
	
		/*	 * ********************* END REMOVE ********************** */

		/* delete_price_from_event($event_id);
		  delete_category_from_event($event_id);
		  delete_discount_from_event($event_id);
		  delete_attendees_from_event($event_id);
		 */

	}
	
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


//Function to show an admin message if the main pages are not setup.
function espresso_updated_pages() {
	echo '<div class="error fade"><p><strong>' . __('In order to function properly Event Espresso has added one or more pages with the corresponding shortcodes. Go to', 'event_espresso') . ' <a href="' . admin_url('edit.php?post_type=page') . '">' . __('Pages', 'event_espresso') . '</a>  ' . __('to view the updated pages.', 'event_espresso') . '</strong></p></div>';
}

function espresso_page_problems() {
	echo '<div class="error fade"><p><strong>' . __('A problem has been detected with one or more of your Event Espresso pages. Go to', 'event_espresso') . ' <a href="' . admin_url('admin.php?page=espresso_general_settings') . '">' . __('Event Espresso Critical Pages Settings', 'event_espresso') . '</a>  ' . __('to view your Event Espresso pages.', 'event_espresso') . '</strong></p></div>';
}

//Function to show an admin message if registration id's are missing.
function event_espresso_registration_id_notice() {
	if (function_exists('admin_url')) {
		echo '<div class="error fade"><p><strong>' . __('Event Espresso attendee data needs to be updated. Please visit the ', 'event_espresso') . ' <a href="' . admin_url('admin.php?page=espresso_support#attendee_data') . '">' . __('Support page', 'event_espresso') . '</a>  ' . __('to configure update the attendee information.', 'event_espresso') . '</strong></p></div>';
	} else {
		echo '<div class="error fade"><p><strong>' . __('Event Espresso attendee data needs to be updated. Please visit the ', 'event_espresso') . ' <a href="' . admin_url('admin.php?page=espresso_support#attendee_data') . '">' . __('Support page', 'event_espresso') . '</a>  ' . __('to configure update the attendee information.', 'event_espresso') . '</strong></p></div>';
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
			$html = '<p><label>' . __('Assign a Waitlist Event? ', 'event_espresso') . '</label> ' . select_input('allow_overflow', $values, $allow_overflow) . ' ' . do_action('action_hook_espresso_help', 'secondary_info') . '</p>' .
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

function espresso_category_dropdown($current_value = '') {

	global $wpdb;

	$ecd = '';

	$strQuery = "select id, category_name from " . EVENTS_CATEGORY_TABLE;
	$data = $wpdb->get_results($strQuery, ARRAY_A);
	//print_r($data);

	if ($wpdb->num_rows > 0) {
		$ecd .= '<select name="category_id" class="" style="width:160px;">';
		$ecd .= '<option value="">' . __('Show All Categories', 'event_espresso') . '</option>';

		/*		 * * loop over the results ** */
		foreach ($data as $row) {
			/*			 * * create the options ** */
			$ecd .= '<option value="' . $row["id"] . '"';
			if ($row["id"] == $current_value) {
				$ecd .= ' selected';
			}
			$ecd .= '>' . stripslashes_deep($row["category_name"]) . '</option>' . "\n";
		}
		$ecd .= "</select>";
	}

	return $ecd;
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
	$SQL = "SELECT REG_date FROM " . $wpdb->prefix . "esp_registration GROUP BY YEAR(REG_date), MONTH(REG_date)";
	$dates = $wpdb->get_results($SQL, ARRAY_A);

	if ($wpdb->num_rows > 0) {
		echo '<select name="month_range" class="wide">';
		echo '<option value="">' . __('Select a Month/Year', 'event_espresso') . '</option>';
		foreach ($dates as $row) {
			$option_date =  date( 'M Y', $row["date"] );
			echo '<option value="' . $option_date . '"';
			echo $option_date == $current_value ? ' selected="selected=selected"' : '';
			echo '>' . $option_date . '</option>' . "\n";
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
	echo '<h1>FIX ME  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h1>';
	die();
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





if (!function_exists('espresso_personnel_cb')) {

	function espresso_personnel_cb($event_id = 0, $orig_user = 0, $orig_event_staff = 0) {
		global $wpdb;
		if ($orig_event_staff != 0) {
			//print_r( $orig_event_staff );
			$p_id = '';
			foreach ($orig_event_staff as $k => $v) {
				$p_id .= "'" . $v . "',";
			}
			$p_id = rtrim($p_id, ",");
		}
		if ($event_id != 0) {
			$sql = "SELECT id, name, role, meta FROM " . EVENTS_PERSONNEL_TABLE;
			if (function_exists('espresso_member_data')) {
				$wpdb->get_results("SELECT wp_user FROM " . EVENTS_DETAIL_TABLE . " WHERE id = '" . $event_id . "'");
				$wp_user = $wpdb->last_result[0]->wp_user != '' ? $wpdb->last_result[0]->wp_user : espresso_member_data('id');
				$sql .= " WHERE ";
				$sql .= "(";
				if ($wp_user == 0 || $wp_user == 1) {
					$sql .= " (wp_user = '0' OR wp_user = '1') ";
				} else {

					$sql .= " wp_user = '" . $wp_user . "' ";
					if ($orig_user != 0) {
						$sql .= " OR wp_user = '" . $orig_user . "' ";
					}
				}
				if ($orig_event_staff != 0) {
					$sql .= " OR id IN (" . $p_id . ") ";
				}
				$sql .= ")";
			}
			//echo $sql;
			$event_personnel = $wpdb->get_results($sql);
			$num_rows = $wpdb->num_rows;
		} else
			$num_rows = 0;
		if ($num_rows > 0) {
			$html = '';
			foreach ($event_personnel as $person) {
				$person_id = $person->id;
				$person_name = $person->name;
				$person_role = $person->role;

				$meta = unserialize($person->meta);
				$person_organization = (isset($meta['organization']) && $meta['organization'] != '') ? $meta['organization'] : '';
				//$person_title = $meta['title']!=''? $meta['title']:'';
				$person_info = (isset($person_role) && $person_role != '') ? ' [' . $person_role . ']' : '';

				$in_event_personnel = $wpdb->get_results("SELECT * FROM " . EVENTS_PERSONNEL_REL_TABLE . " WHERE event_id='" . $event_id . "' AND person_id='" . $person_id . "'");
				$in_event_person = '';
				foreach ($in_event_personnel as $in_person) {
					$in_event_person = $in_person->person_id;
				}

				$html .= '<p id="event-person-' . $person_id . '" class="event-staff-list"><label for="in-event-person-' . $person_id . '" class="selectit"><input value="' . $person_id . '" type="checkbox" name="event_person[]" id="in-event-person-' . $person_id . '"' . ($in_event_person == $person_id ? ' checked="checked"' : "" ) . '/> <a href="admin.php?page=espresso_personnel&amp;action=edit&amp;id=' . $person_id . '"  target="_blank" title="' . $person_organization . '">' . $person_name . '</a> ' . $person_info . '</label></p>';
			}

			$top_div = '';
			$bottom_div = '';

			if ($num_rows > 10) {
				$top_div = '<div style="height:250px;overflow:auto;">';
				$bottom_div = '</div>';
			}

			$manage = '<p><a href="admin.php?page=espresso_personnel" target="_blank">' . __('Manage Staff Members', 'event_espresso') . '</a> | <a class="thickbox link" href="#TB_inline?height=300&width=400&inlineId=staff_info">Shortcode</a> </p>';

			echo '<div id="staff_info" style="display:none">';
			echo '<div class="TB-ee-frame">';
			echo '<h2>' . __('Staff Shortcode', 'event_espresso') . '</h2>';
			echo '<p>' . __('Add the following shortcode into the description to show the staff for this event.', 'event_espresso') . '</p>';
			echo '<p>[ESPRESSO_STAFF]</p>';
			echo '<p>Example with Optional Parameters:<br />
			[ESPRESSO_STAFF outside_wrapper="div" outside_wrapper_class="event_staff" inside_wrapper="p" inside_wrapper_class="event_person"]</p>';

			echo '<p><strong><a href="http://eventespresso.com/forums/2010/10/post-type-variables-and-shortcodes/#staff_shortcode" target="_blank">More Examples</a></strong></p>';
			echo '</div>';
			echo '</div>';

			$html = $top_div . $html . $bottom_div . $manage;
			return $html;
		} else {
			return '<a href="admin.php?page=espresso_personnel&amp;action=add_new_person">' . __('Please add at least one person.', 'event_espresso') . '</a>';
		}
	}

}
