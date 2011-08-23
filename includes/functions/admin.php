<?php

//All of the functions that deal with admin area should go here.
//The all of the scripts we need
function event_espresso_config_page_styles() {
    wp_enqueue_style('dashboard');
    wp_enqueue_style('thickbox');
    wp_enqueue_style('global');
    wp_enqueue_style('wp-admin');
    wp_enqueue_style('event_espresso', EVENT_ESPRESSO_PLUGINFULLURL . 'css/admin-styles.css'); //Events core style
    if (isset($_REQUEST['page'])) {
        switch ($_REQUEST['page']) {
            case ( 'events' ):
            case ( 'espresso_reports' ):
                // case ( 'event_categories' ):
                wp_enqueue_style('jquery-ui-style', EVENT_ESPRESSO_PLUGINFULLURL . 'css/ui-lightness/jquery-ui-1.7.3.custom.css');
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
    add_thickbox();
    if (isset($_REQUEST['page'])) {
        switch ($_REQUEST['page']) {
            case ('discounts' ):
			case ('groupons' ):
            case ('event_categories' ):
            case ('admin_reports' ):
            case ('form_builder' ):
            case ('form_groups' ):
            case ('my-events' ):
            case ('event_emails' ):
            case ('event_venues' ):
            case ('event_staff' ):
                if ($_REQUEST['page'] == 'form_builder' || $_REQUEST['page'] == 'form_groups') {
                    wp_enqueue_script('jquery-ui-sortable');
                }
                wp_enqueue_script('dataTables', EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/jquery.dataTables.min.js', array('jquery')); //Events core table script
            // break;
            case ( 'events' ):
							case ( 'event_espresso' ):
            case ( 'espresso_reports' ):
							case ( 'support' ) :
							case ( 'template_confg' ):
                //case ( 'event_venues' ):
                //case ( 'event_staff' ):
                //case ( 'event_categories' ):
                wp_enqueue_script('postbox');
                wp_enqueue_script('dashboard');
                wp_enqueue_script('thickbox');
                wp_enqueue_script('jquery');
                wp_enqueue_script('jquery-ui-core');
                wp_enqueue_script('jquery-ui-tabs');
                wp_enqueue_script('jquery-ui-datepicker', EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/ui.datepicker.min.js', array('jquery', 'jquery-ui-core'));
                wp_enqueue_script('tiny_mce');
                wp_enqueue_script('editor');
                wp_enqueue_script('editor-functions');
                wp_enqueue_script('media-upload');
                wp_enqueue_script('post');
                wp_enqueue_script('dataTables', EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/jquery.dataTables.min.js', array('jquery')); //Events core table script
                wp_enqueue_script('dataTablesColVis', EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/jquery.ColVis.min.js', array('jquery')); //Events core table column hide/show script

                if (isset($_REQUEST['event_admin_reports']) && $_REQUEST['event_admin_reports'] == 'add_new_attendee') {
                    //Load form validation script
                    wp_register_script('jquery.validate.pack', (EVENT_ESPRESSO_PLUGINFULLURL . "scripts/jquery.validate.pack.js"), false, '1.7');
                    wp_enqueue_script('jquery.validate.pack');
                }

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
                break;
        }
    }
    wp_enqueue_script('fancybox', EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/fancybox/jquery.fancybox-1.2.5.pack.js', array('jquery')); //Events popup script
    wp_enqueue_script('event_espresso', EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/event_espresso.js'); //Events core script
    //wp_enqueue_script( 'alert_box',  EVENT_ESPRESSO_PLUGINFULLURL.'scripts/jquery.alerts.js' );//Alert box script
    //wp_enqueue_script('media-upload');
}

function espresso_tiny_mce() {
    //This loads the the tinymce script into the header
    global $wp_version;
    $wp_min_version = '3.2';
    wp_tiny_mce(false, array("editor_selector" => "theEditor")); // true gives you a stripped down version of the editor
    //If the version of WordPress is lower than 3.2, then we load the fallback script.
    if (!version_compare($wp_version, $wp_min_version, '>=')) {
        //If this is an older version of WordPress, then we need to load this.
        if (function_exists('wp_tiny_mce_preload_dialogs')) {
            add_action('admin_print_footer_scripts', 'wp_tiny_mce_preload_dialogs', 30);
        }
    }
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
            if (event_espresso_get_status($event_id) == 'ACTIVE') {
                event_espresso_send_cancellation_notice($event_id);
            }
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
function event_espresso_run_install($table_name, $table_version, $sql) {

    global $wpdb;

    $wp_table_name = $wpdb->prefix . $table_name;

    if ($wpdb->get_var("SHOW TABLES LIKE '" . $wp_table_name . "'") != $wp_table_name) {

        $sql_create_table = "CREATE TABLE " . $wp_table_name . " ( " . $sql . " ) DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql_create_table);

        //create option for table version
        $option_name = $table_name . '_tbl_version';
        $newvalue = $table_version;
        if (get_option($option_name)) {
            update_option($option_name, $newvalue);
        } else {
            $deprecated = ' ';
            $autoload = 'no';
            add_option($option_name, $newvalue, $deprecated, $autoload);
        }
        //create option for table name
        $option_name = $table_name . '_tbl';
        $newvalue = $wp_table_name;
        if (get_option($option_name)) {
            update_option($option_name, $newvalue);
        } else {
            $deprecated = ' ';
            $autoload = 'no';
            add_option($option_name, $newvalue, $deprecated, $autoload);
        }
    }

    // Code here with new database upgrade info/table Must change version number to work.

    $installed_ver = get_option($table_name . '_tbl_version');
    if ($installed_ver != $table_version) {
        $sql_create_table = "CREATE TABLE " . $wp_table_name . " ( " . $sql . " ) ;";
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql_create_table);
        update_option($table_name . '_tbl_version', $table_version);
    }
}

//function to empty trash
//This will delete everything that is related to the events that have been deleted
function event_espresso_empty_event_trash($event_id) {
    global $wpdb;
    //if ( $_REQUEST['action'] == 'delete' ){
    //$event_id=$_REQUEST['id'];
    //Remove the event
    $sql = "DELETE FROM " . EVENTS_DETAIL_TABLE . " WHERE id='" . $event_id . "'";
    $wpdb->query($sql);

    //Remove the event times
    $sql = "DELETE FROM " . EVENTS_START_END_TABLE . " WHERE event_id='" . $event_id . "'";
    $wpdb->query($sql);

    //Remove the event prices
    $sql = "DELETE FROM " . EVENTS_PRICES_TABLE . " WHERE event_id='" . $event_id . "'";
    $wpdb->query($sql);

    //Remove the event discount
    $sql = "DELETE FROM " . EVENTS_DISCOUNT_REL_TABLE . " WHERE event_id='" . $event_id . "'";
    $wpdb->query($sql);



    $sql = "DELETE FROM " . EVENTS_ATTENDEE_TABLE . " WHERE event_id='" . $event_id . "'";
    $wpdb->query($sql);

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

function tep_not_null($value) {
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

function tep_round($number, $precision) {
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

function tep_output_string($string, $translate = false, $protected = false) {
    if ($protected == true) {
        return htmlspecialchars($string);
    } else {
        if ($translate == false) {
            return tep_parse_input_field_data($string, array('"' => '&quot;'));
        } else {
            return tep_parse_input_field_data($string, $translate);
        }
    }
}

function tep_parse_input_field_data($data, $parse) {
    return strtr(trim($data), $parse);
}

/* Turns an array into a select field */

function select_input($name, $values, $default = '', $parameters = '') {
    $field = '<select name="' . tep_output_string($name) . '"';
    if (tep_not_null($parameters))
        $field .= ' ' . $parameters;
    $field .= '>';

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

//Creates folders in the uploads directory to facilitate addons and templates
function event_espresso_create_upload_directories() {
    // Create the required folders
    $folders = array(
        EVENT_ESPRESSO_UPLOAD_DIR,
        EVENT_ESPRESSO_TEMPLATE_DIR,
        EVENT_ESPRESSO_GATEWAY_DIR,
        EVENT_ESPRESSO_UPLOAD_DIR . '/logs/',
    );
    foreach ($folders as $folder) {
        wp_mkdir_p($folder);
        @ chmod($folder, 0755);
    }
}

/**
 * event_espresso_count_templates_in_uploads_directory, does exactly what the name says
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
function event_espresso_smartCopy($source, $dest, $folderPermission=0755, $filePermission=0644) {
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
#                echo "$source$file ||| $dest$file<br />\n";
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

/*
  // espresso_getFileList() Usage
  $dirlist = espresso_getFileList(EVENT_ESPRESSO_TEMPLATE_DIR);
  echo "<table>\n";
  echo "<tr><th>Name</th><th>Type</th><th>Size</th><th>Last Mod.</th></tr>\n";
  foreach($dirlist as $file) { echo "<tr>\n";
  echo "<td>{$file['name']}</td>\n";
  echo "<td>{$file['type']}</td>\n";
  echo "<td>{$file['size']}</td>\n";
  echo "<td>" . date("r", $file['lastmod']) . "</td>\n";
  echo "</tr>\n"; }
  echo "</table>\n\n"; */

/* * ** These functions deal with country data *** */

function getCountriesArray($lang="en") {
    //first code, country_id
    //seconde code, country name
    //third code, ISO country id with two chars
    //fourth code, ISO country id with three chars
    //last code is for political zones, 2 is for european union, 1 for the rest of the world (by the moment)
    switch ($lang) {
        default: return array(
                array(0, __('No country selected', 'event_espresso'), '', '', 0),
                array(64, 'United States', 'US', 'USA', 1),
                array(15, 'Australia', 'AU', 'AUS', 1),
                array(39, 'Canada', 'CA', 'CAN', 1),
                array(171, 'United Kingdom', 'GB', 'GBR', 1),
                array(70, 'France', 'FR', 'FRA', 2),
                array(111, 'Italy', 'IT', 'ITA', 2),
                array(63, 'Spain', 'ES', 'ESP', 2),
                array(1, 'Afghanistan', 'AF', 'AFG', 1),
                array(2, 'Albania', 'AL', 'ALB', 1),
                array(3, 'Germany', 'DE', 'DEU', 2),
                array(198, 'Switzerland', 'CH', 'CHE', 1),
                array(9, 'Netherlands Antilles ', 'AN', 'ANT', 2),
                array(197, 'Sweden', 'SE', 'SWE', 1),
                array(4, 'Andorra', 'AD', 'AND', 1),
                array(5, 'Angola', 'AO', 'AGO', 1),
                array(6, 'Anguilla', 'AI', 'AIA', 1),
                array(7, 'Antarctica', 'AQ', 'ATA', 1),
                array(8, 'Antigua and Barbuda', 'AG', 'ATG', 1),
                array(10, 'Saudi Arabia', 'SA', 'SAU', 1),
                array(11, 'Argelia', 'DZ', 'DZA', 1),
                array(12, 'Argentina', 'AR', 'ARG', 1),
                array(13, 'Armenia', 'AM', 'ARM', 1),
                array(14, 'Aruba', 'AW', 'ABW', 1),
                array(16, 'Austria', 'AT', 'AUT', 2),
                array(17, 'Azerbaijan', 'AZ', 'AZE', 1),
                array(18, 'Bahamas', 'BS', 'BHS', 1),
                array(19, 'Bahrein', 'BH', 'BHR', 1),
                array(20, 'Bangladesh', 'BD', 'BGD', 1),
                array(21, 'Barbados', 'BB', 'BRB', 1),
                array(22, 'Belgium ', 'BE', 'BEL', 2),
                array(23, 'Belize', 'BZ', 'BLZ', 1),
                array(24, 'Benin', 'BJ', 'BEN', 1),
                array(25, 'Bermudas', 'BM', 'BMU', 1),
                array(26, 'Belarus', 'BY', 'BLR', 1),
                array(27, 'Bolivia', 'BO', 'BOL', 1),
                array(28, 'Bosnia and Herzegovina', 'BA', 'BIH', 1),
                array(29, 'Botswana', 'BW', 'BWA', 1),
                array(30, 'Brazil', 'BR', 'BRA', 1),
                array(31, 'Brunei', 'BN', 'BRN', 1),
                array(32, 'Bulgaria', 'BG', 'BGR', 2),
                array(33, 'Burkina Faso', 'BF', 'BFA', 1),
                array(34, 'Burundi', 'BI', 'BDI', 1),
                array(35, 'Bhutan', 'BT', 'BTN', 1),
                array(36, 'Cape Verde', 'CV', 'CPV', 1),
                array(37, 'Cambodia', 'KH', 'KHM', 1),
                array(38, 'Cameroon', 'CM', 'CMR', 1),
                array(40, 'Chad', 'TD', 'TCD', 1),
                array(41, 'Chile', 'CL', 'CHL', 1),
                array(42, 'China', 'CN', 'CHN', 1),
                array(43, 'Cyprus', 'CY', 'CYP', 2),
                array(44, 'Colombia', 'CO', 'COL', 1),
                array(45, 'Comoros', 'KM', 'COM', 1),
                array(46, 'Congo', 'CG', 'COG', 1),
                array(47, 'Corea del Norte', 'KP', 'PRK', 1),
                array(48, 'South Korea', 'KR', 'KOR', 1),
                array(49, 'Ivory Coast ', 'CI', 'CIV', 1),
                array(50, 'Costa Rica', 'CR', 'CRI', 1),
                array(51, 'Croatia', 'HR', 'HRV', 1),
                array(52, 'Cuba', 'CU', 'CUB', 1),
                array(53, 'Denmark', 'DK', 'DNK', 1),
                array(54, 'Djibouti', 'DJ', 'DJI', 1),
                array(55, 'Dominica', 'DM', 'DMA', 1),
                array(56, 'Ecuador', 'EC', 'ECU', 1),
                array(57, 'Egypt', 'EG', 'EGY', 1),
                array(58, 'El Salvador', 'SV', 'SLV', 1),
                array(59, 'United Arab Emirates', 'AE', 'ARE', 1),
                array(60, 'Eritrea', 'ER', 'ERI', 1),
                array(61, 'Eslovakia', 'SK', 'SVK', 2),
                array(62, 'Eslovenia', 'SI', 'SVN', 2),
                array(65, 'Estonia', 'EE', 'EST', 2),
                array(66, 'Ethiopia', 'ET', 'ETH', 1),
                array(67, 'Fiji', 'FJ', 'FJI', 1),
                array(68, 'Philippines', 'PH', 'PHL', 1),
                array(69, 'Finland', 'FI', 'FIN', 2),
                array(71, 'Gabon', 'GA', 'GAB', 1),
                array(72, 'Gambia', 'GM', 'GMB', 1),
                array(73, 'Georgia', 'GE', 'GEO', 1),
                array(74, 'Ghana', 'GH', 'GHA', 1),
                array(75, 'Gibraltar', 'GI', 'GIB', 1),
                array(76, 'Greece', 'GR', 'GRC', 2),
                array(77, 'Grenada', 'GD', 'GRD', 1),
                array(78, 'Greenland', 'GL', 'GRL', 1),
                array(79, 'Guadeloupe', 'GP', 'GLP', 1),
                array(80, 'Guam', 'GU', 'GUM', 1),
                array(81, 'Guatemala', 'GT', 'GTM', 1),
                array(82, 'Guinea', 'GN', 'GIN', 1),
                array(83, 'Equatorial Guinea', 'GQ', 'GNQ', 1),
                array(84, 'Guinea-Bissau', 'GW', 'GNB', 1),
                array(85, 'Guyana', 'GY', 'GUY', 1),
                array(86, 'Haiti', 'HT', 'HTI', 1),
                array(87, 'Holland', 'NL', 'NLD', 2),
                array(88, 'Honduras', 'HN', 'HND', 1),
                array(89, 'Hong Kong', 'HK', 'HKG', 1),
                array(90, 'Hungry', 'HU', 'HUN', 2),
                array(91, 'India', 'IN', 'IND', 1),
                array(92, 'Indonesia', 'ID', 'IDN', 1),
                array(93, 'Iraq', 'IQ', 'IRQ', 1),
                array(94, 'Iran', 'IR', 'IRN', 1),
                array(95, 'Ireland', 'IE', 'IRL', 2),
                array(96, 'Bouvet Island', 'BV', 'BVT', 1),
                array(97, 'Iceland', 'IS', 'ISL', 1),
                array(98, 'Cayman Islands', 'KY', 'CYM', 1),
                array(99, 'Cocos Island', 'CC', 'CCK', 1),
                array(100, 'Cook Islands', 'CK', 'COK', 1),
                array(101, 'Northern Marianas', 'MP', 'MNP', 1),
                array(102, 'Faroe islands', 'FO', 'FRO', 1),
                array(103, 'Falkland Islands', 'FK', 'FLK', 1),
                array(104, 'Marshall islands', 'MH', 'MHL', 1),
                array(105, 'Christmas Island', 'CX', 'CXR', 1),
                array(108, 'Virgin Islands', 'VI', 'VIR', 1),
                array(110, 'Israel', 'IL', 'ISR', 1),
                array(112, 'Jamaica', 'JM', 'JAM', 1),
                array(113, 'Japan', 'JP', 'JPN', 1),
                array(114, 'Jordan', 'JO', 'JOR', 1),
                array(115, 'Kazakhstan', 'KZ', 'KAZ', 1),
                array(116, 'Kenya', 'KE', 'KEN', 1),
                array(117, 'Kirguistan', 'KG', 'KGZ', 1),
                array(118, 'Kiribati', 'KI', 'KIR', 1),
                array(119, 'Kuwait', 'KW', 'KWT', 1),
                array(120, 'Laos', 'LA', 'LAO', 1),
                array(121, 'Latvia', 'LV', 'LVA', 2),
                array(122, 'Lesotho', 'LS', 'LSO', 1),
                array(123, 'Lebanon', 'LB', 'LBN', 1),
                array(124, 'Liberia', 'LR', 'LBR', 1),
                array(125, 'Libya', 'LY', 'LBY', 1),
                array(126, 'Liechtenstein', 'LI', 'LIE', 1),
                array(127, 'Lithuania', 'LT', 'LTU', 2),
                array(128, 'Luxemburg', 'LU', 'LUX', 2),
                array(129, 'Macao', 'MO', 'MAC', 1),
                array(130, 'Macedonia', 'MK', 'MKD', 1),
                array(131, 'Madagascar', 'MG', 'MDG', 1),
                array(132, 'Malaysia', 'MY', 'MYS', 1),
                array(133, 'Malawi', 'MW', 'MWI', 1),
                array(134, 'Maldivas', 'MV', 'MDV', 1),
                array(135, 'Mali', 'ML', 'MLI', 1),
                array(136, 'Malta', 'MT', 'MLT', 2),
                array(137, 'Marruecos', 'MA', 'MAR', 1),
                array(138, 'Martinica', 'MQ', 'MTQ', 1),
                array(139, 'Mauricio', 'MU', 'MUS', 1),
                array(140, 'Mauritania', 'MR', 'MRT', 1),
                array(141, 'Mayote', 'YT', 'MYT', 1),
                array(142, 'Mexico', 'MX', 'MEX', 1),
                array(143, 'Micronesia', 'FM', 'FSM', 1),
                array(144, 'Moldova', 'MD', 'MDA', 1),
                array(145, 'Monaco', 'MC', 'MCO', 1),
                array(146, 'Mongolia', 'MN', 'MNG', 1),
                array(147, 'Montserrat', 'MS', 'MSR', 1),
                array(148, 'Mozambique', 'MZ', 'MOZ', 1),
                array(149, 'Myanmar', 'MM', 'MMR', 1),
                array(150, 'Namibia', 'NA', 'NAM', 1),
                array(151, 'Nauru', 'NR', 'NRU', 1),
                array(152, 'Nepal', 'NP', 'NPL', 1),
                array(153, 'Nicaragua', 'NI', 'NIC', 1),
                array(154, 'Niger', 'NE', 'NER', 1),
                array(155, 'Nigeria', 'NG', 'NGA', 1),
                array(156, 'Niue', 'NU', 'NIU', 1),
                array(157, 'Norway', 'NO', 'NOR', 1),
                array(158, 'New Caledonia', 'NC', 'NCL', 1),
                array(159, 'New Zealand', 'NZ', 'NZL', 1),
                array(160, 'Oman', 'OM', 'OMN', 1),
                array(161, 'Pakistan', 'PK', 'PAK', 1),
                array(162, 'Palau', 'PW', 'PLW', 1),
                array(163, 'Panama', 'PA', 'PAN', 1),
                array(164, 'Papua New Guinea', 'PG', 'PNG', 1),
                array(165, 'Paraguay', 'PY', 'PRY', 1),
                array(166, 'Peru', 'PE', 'PER', 1),
                array(167, 'Polonia', 'PL', 'POL', 2),
                array(168, 'Portugal', 'PT', 'PRT', 2),
                array(169, 'Puerto Rico', 'PR', 'PRI', 1),
                array(170, 'Qatar', 'QA', 'QAT', 1),
                array(172, 'Central African Republic', 'CF', 'CAF', 1),
                array(173, 'Czech Republic', 'CZ', 'CZE', 2),
                array(174, 'Dominican Republic', 'DO', 'DOM', 1),
                array(176, 'Rowanda', 'RW', 'RWA', 1),
                array(177, 'Romania', 'RO', 'ROM', 2),
                array(178, 'Russia', 'RU', 'RUS', 1),
                array(180, 'Samoa', 'WS', 'WSM', 1),
                array(181, 'American Samoa', 'AS', 'ASM', 1),
                array(183, 'San Marino', 'SM', 'SMR', 1),
                array(184, 'San Vincente y las Granadinas', 'VC', 'VCT', 1),
                array(185, 'Santa Helena', 'SH', 'SHN', 1),
                array(186, 'Santa Lucia', 'LC', 'LCA', 1),
                array(188, 'Senegal', 'SN', 'SEN', 1),
                array(189, 'Seychelles', 'SC', 'SYC', 1),
                array(190, 'Sierra Leona', 'SL', 'SLE', 1),
                array(191, 'Singapore', 'SG', 'SGP', 4),
                array(192, 'Syria', 'SY', 'SYR', 1),
                array(193, 'Somalia', 'SO', 'SOM', 1),
                array(194, 'Sri Lanka', 'LK', 'LKA', 1),
                array(195, 'South Africa', 'ZA', 'ZAF', 1),
                array(196, 'Sudan', 'SD', 'SDN', 1),
                array(199, 'Suriname', 'SR', 'SUR', 1),
                array(200, 'Swaziland', 'SZ', 'SWZ', 1),
                array(201, 'Thailand', 'TH', 'THA', 1),
                array(202, 'Taiwan', 'TW', 'TWN', 1),
                array(203, 'Tanzania', 'TZ', 'TZA', 1),
                array(204, 'Tajikistan', 'TJ', 'TJK', 1),
                array(205, 'British Indian Ocean Territory', 'IO', 'IOT', 1),
                array(206, 'Timor Oriental', 'TP', 'TMP', 1),
                array(207, 'Togo', 'TG', 'TGO', 1),
                array(208, 'Tokelau', 'TK', 'TKL', 1),
                array(209, 'Tonga', 'TO', 'TON', 1),
                array(210, 'Trinidad and Tobago', 'TT', 'TTO', 1),
                array(211, 'Tunisia', 'TN', 'TUN', 1),
                array(212, 'Turkmenistan', 'TM', 'TKM', 1),
                array(213, 'Turkey', 'TR', 'TUR', 1),
                array(214, 'Tuvalu', 'TV', 'TUV', 1),
                array(215, 'Ukraine', 'UA', 'UKR', 1),
                array(216, 'Uganda', 'UG', 'UGA', 1),
                array(217, 'Uruguay', 'UY', 'URY', 1),
                array(218, 'Uzbekistan', 'UZ', 'UZB', 1),
                array(219, 'Vanuatu', 'VU', 'VUT', 1),
                array(220, 'Vatican', 'VA', 'VAT', 1),
                array(221, 'Venezuela', 'VE', 'VEN', 1),
                array(222, 'Vietnam', 'VN', 'VNM', 1),
                array(223, 'Yemen', 'YE', 'YEM', 1),
                array(224, 'Yugoslavia', 'YU', 'YUG', 1),
                array(225, 'Zambia', 'ZM', 'ZMB', 1),
                array(226, 'Zimbabwe', 'ZW', 'ZWE', 1));
    }
}

function getCountryZoneId($country_id) {
    //1 for the rest of the world
    //2 is for european union
    $countries = getCountriesArray();
    for ($t = 0; $t < sizeof($countries); $t++)
        if ($country_id == $countries[$t][0])
            return $countries[$t][4];
    return 0;
}

function getCountryBelongsZone($country_id, $zone_id=1 /* USA by default */) {
    //2 is for european union
    $countries = getCountriesArray();
    for ($t = 0; $t < sizeof($countries); $t++)
        if ($country_id == $countries[$t][0])
            if ($zone_id == $countries[$t][4])
                return true;
    return false;
}

function getCountryName($id, $lang="en") {
    $countries = getCountriesArray($lang);
    for ($t = 0; $t < sizeof($countries); $t++)
        if ($id == $countries[$t][0])
            return $countries[$t][1];
    return __('No country selected', 'event_espresso');
}

function getCountryFullData($id, $lang="en") {
    $countries = getCountriesArray($lang);
    for ($t = 0; $t < sizeof($countries); $t++)
        if ($id == $countries[$t][0])
            return array('id' => $countries[$t][0],
                'title' => $countries[$t][1],
                'iso_code_2' => $countries[$t][2],
                'iso_code_3' => $countries[$t][3]);

    return array('id' => '0',
        'title' => __('No country selected', 'event_espresso'),
        'iso_code_2' => '',
        'iso_code_3' => '');
}

function printCountriesSelector($name, $selected) {
    $selected = intval($selected);
    $countries = getCountriesArray("es");

    echo "<select name='" . $name . "'>";
    for ($t = 0; $t < sizeof($countries); $t++) {
        echo "<option ";
        if ($selected == $countries[$t][0])
            echo " selected='selected' ";
        echo "value='" . $countries[$t][0] . "'>" . $countries[$t][1] . "</option>";
    }
    echo "</select>";
}

/* * ** Misc functions *** */

/**
 * Check if URL is valid
 *
 * @param string $url
 * @return boolean
 */
function event_espresso_is_url($url) {
    return preg_match('~^https?://~', $url);
}

/**
 * Show plugin changes
 */
function event_espresso_plugin_update_message($url) {
    $data = event_espresso_url_get($url);

    if ($data) {
        $matches = null;
        if (preg_match('~==\s*Changelog\s*==\s*=\s*[0-9.]+\s*=(.*)(=\s*[0-9.]+\s*=|$)~Uis', $data, $matches)) {
            $changelog = (array) preg_split('~[\r\n]+~', trim($matches[1]));

            echo '<div style="color: #f00;">Take a minute to update, here\'s why:</div><div style="font-weight: normal;">';
            $ul = false;

            foreach ($changelog as $index => $line) {
                if (preg_match('~^\s*\*\s*~', $line)) {
                    if (!$ul) {
                        echo '<ul style="list-style: disc; margin-left: 20px;">';
                        $ul = true;
                    }
                    $line = preg_replace('~^\s*\*\s*~', '', htmlspecialchars($line));
                    echo '<li style="width: 50%; margin: 0; float: left; ' . ($index % 2 == 0 ? 'clear: left;' : '') . '">' . $line . '</li>';
                } else {
                    if ($ul) {
                        echo '</ul><div style="clear: left;"></div>';
                        $ul = false;
                    }
                    echo '<p style="margin: 5px 0;">' . htmlspecialchars($line) . '</p>';
                }
            }

            if ($ul) {
                echo '</ul><div style="clear: left;"></div>';
            }

            echo '</div>';
        }
    }
}

function event_espresso_admin_news($url) {
    return wp_remote_retrieve_body(wp_remote_get($url));
}

//Not sure if this works or not. Need to test at some point.
//This function should build the event editor description field.
function events_editor($content, $id = 'content', $prev_id = 'title') {
    $media_buttons = false;
    $richedit = user_can_richedit();
    ?>
    <div id="quicktags">
        <?php wp_print_scripts('quicktags'); ?>
        <script type="text/javascript">edToolbar()</script>
    </div>

    <?php //if(function_exists('qtrans_useCurrentLanguageIfNotFoundUseDefaultLanguage')) $output = qtrans_useCurrentLanguageIfNotFoundUseDefaultLanguage($output);    ?>

    <?php
    $the_editor = apply_filters('the_editor', "<div id='editorcontainer'><textarea rows='6' cols='90' name='$id' tabindex='4' id='$id'>%s</textarea></div>\n");
    $the_editor_content = apply_filters('the_editor_content', $content);
    printf($the_editor, $content);
    ?>
    <script type="text/javascript">
        // <![CDATA[
        edCanvas = document.getElementById('<?php echo $id; ?>');
    <?php if (user_can_richedit() && $prev_id) { ?>
            var dotabkey = true;
            // If tinyMCE is defined.
            if ( typeof tinyMCE != 'undefined' ) {
                // This code is meant to allow tabbing from Title to Post (TinyMCE).
                jQuery('#<?php echo $prev_id; ?>')[jQuery.browser.opera ? 'keypress' : 'keydown'](function (e) {
                    if (e.which == 9 && !e.shiftKey && !e.controlKey && !e.altKey) {
                        if ( (jQuery("#post_ID").val() < 1) && (jQuery("#title").val().length > 0) ) { autosave(); }
                        if ( tinyMCE.activeEditor && ! tinyMCE.activeEditor.isHidden() && dotabkey ) {
                            e.preventDefault();
                            dotabkey = false;
                            tinyMCE.activeEditor.focus();
                            return false;
                        }
                    }
                });
            }
    <?php } ?>
        // ]]>
    </script>
    <?php
}

//Create a dashboard widget for Event Espresso News
function espresso_news_dashboard_widget_function() {
    wp_widget_rss_output('http://eventespresso.com/feed/', array('items' => 5, 'show_author' => 1, 'show_date' => 1, 'show_summary' => 0));
}

function espresso_news_dashboard_widgets() {
    wp_add_dashboard_widget('espresso_news_dashboard_widget', 'Event Espresso News', 'espresso_news_dashboard_widget_function');
}

add_action('wp_dashboard_setup', 'espresso_news_dashboard_widgets');

function event_espresso_display_right_column() {
    ?>
    <div id="side-info-column" class="inner-sidebar">
        <div id="side-sortables" class="meta-box-sortables">

            <div id="submitdiv" class="postbox">
								<div title="Click to toggle" class="handlediv"><br /></div>
                <h3 class="hndle"><?php _e('New @ Event Espresso', 'event_espresso'); ?></h3>
                <div class="inside">
                    <div class="padding">

                        <div class="infolinks">
                            <?php
                            echo '<h2 style="margin:0">' . __('From the Blog', 'event_espresso') . '</h2>';

                            // Get RSS Feed(s)
                            @wp_widget_rss_output('http://eventespresso.com/feed/', array('show_date' => 0, 'items' => 6));

                            echo '<h2 style="margin:0">' . __('From the Forums', 'event_espresso') . '</h2>';

                            @wp_widget_rss_output('http://eventespresso.com/forums/feed/', array('show_date' => 0, 'items' => 4));
                            ?>

                        </div>
                    </div>
                </div>
            </div>
            <div id="submitdiv2" class="postbox " >
								<div title="Click to toggle" class="handlediv"><br /></div>
                <h3 class="hndle"><?php _e('Helpful Plugin Links', 'event_espresso'); ?></h3>
                <div class="inside">
                    <div class="padding">
                        <ul class="infolinks">
                            <li><a href="http://eventespresso.com/support/installation/" target="_blank"><?php _e('Installation &amp; Usage Guide', 'event_espresso'); ?></a></li>
                            <li><a href="http://eventespresso.com/forums/2010/09/css-classes/" target="_blank"><?php _e('Customization Forums', 'event_espresso'); ?></a></li>
                            <li><a href="http://eventespresso.com/forums/category/premium-plugin-support/" target="_blank"><?php _e('Plugin Support Forums', 'event_espresso'); ?></a></li>
                            <li><a href="http://eventespresso.com/forums/category/general/features-requests/" target="_blank"><?php _e('Feature Request Forums', 'event_espresso'); ?></a></li>
                            <li><a href="http://eventespresso.com/forums/category/premium-plugin-support/bug-reports/" target="_blank"><?php _e('Bug Submission Forums', 'event_espresso'); ?></a></li>
                            <li><a href="http://eventespresso.com/forums/category/premium-plugin-support/news-and-updates/changelogs/" target="_blank"><?php _e('Changelog', 'event_espresso'); ?></a></li>
                            <li><a href="http://eventespresso.com/download/plugins-and-addons/"><?php _e('Plugins and Addons', 'event_espresso'); ?></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <?php
            global $espresso_premium;
            if ($espresso_premium != true) {
                ?>
                <div id="submitdiv2" class="postbox " >
                    <h3><?php _e('Sponsors', 'event_espresso'); ?></h3>
                    <div class="inside">
                        <div class="padding">
                            <?php
                            $event_regis_sponsors = wp_remote_retrieve_body(wp_remote_get('http://ee-updates.s3.amazonaws.com/plugin-sponsors.html'));
                            echo $event_regis_sponsors;
                            ?>
                        </div>
                    </div>
                </div>
            <?php } ?>
        </div>
    </div>
    <?php
}

function event_espresso_get_right_column() {
    $output = '<div id="side-info-column" class="inner-sidebar"><div id="side-sortables" class="meta-box-sortables">';
    $output .= '<div id="submitdiv" class="postbox " ><h3>' . __('New @ Event Espresso', 'event_espresso') . '</h3>';
    $output .= '<div class="inside"><div class="padding"><div class="infolinks">';
    $output .= '<h2 style="margin:0">' . __('From the Blog', 'event_espresso') . '</h2>';
    ob_start();
    // Get RSS Feed(s)
    @wp_widget_rss_output('http://eventespresso.com/feed/', array('show_date' => 0, 'items' => 6));
    $output .= ob_get_contents();
    ob_end_clean();
    $output .= '<h2 style="margin:0">' . __('From the Forums', 'event_espresso') . '</h2>';
    ob_start();
    @wp_widget_rss_output('http://eventespresso.com/forums/feed/', array('show_date' => 0, 'items' => 4));
    $output .= ob_get_contents();
    ob_end_clean();
    $output .= '</div></div></div></div><div id="submitdiv2" class="postbox " >';
    $output .= '<h3>' . __('Helpful Plugin Links', 'event_espresso') . '</h3>';
    $output .= '<div class="inside"><div class="padding"><ul class="infolinks">';
    $output .= '<li><a href="http://eventespresso.com/support/installation/" target="_blank">' . __('Installation &amp; Usage Guide', 'event_espresso') . '</a></li>';
    $output .= '<li><a href="http://eventespresso.com/forums/2010/09/css-classes/" target="_blank">' . __('Customization Forums', 'event_espresso') . '</a></li>';
    $output .= '<li><a href="http://eventespresso.com/forums/category/premium-plugin-support/" target="_blank">' . __('Plugin Support Forums', 'event_espresso') . '</a></li>';
    $output .= '<li><a href="http://eventespresso.com/forums/category/general/features-requests/" target="_blank">' . __('Feature Request Forums', 'event_espresso') . '</a></li>';
    $output .= '<li><a href="http://eventespresso.com/forums/category/premium-plugin-support/bug-reports/" target="_blank">' . __('Bug Submission Forums', 'event_espresso') . '</a></li>';
    $output .= '<li><a href="http://eventespresso.com/forums/category/premium-plugin-support/news-and-updates/changelogs/" target="_blank">' . __('Changelog', 'event_espresso') . '</a></li>';
    $output .= '<li><a href="http://eventespresso.com/download/plugins-and-addons/">' . __('Plugins and Addons', 'event_espresso') . '</a></li>';
    $output .= '</ul></div></div></div>';
    global $espresso_premium;
    if ($espresso_premium != true) {
        $output .= '<div id="submitdiv2" class="postbox " ><h3>' . __('Sponsors', 'event_espresso') . '</h3>';
        $output .= '<div class="inside"><div class="padding">';
        $output .= wp_remote_retrieve_body(wp_remote_get('http://ee-updates.s3.amazonaws.com/plugin-sponsors.html'));
        $output .= '</div></div></div>';
    }
    $output .= '</div></div>';
    return $output;
}

//Displays what email tags are available
function event_espresso_custom_email_info() {
    ?>
    <div id="custom_email_info" style="display:none">
        <h2><?php _e('Email Confirmations', 'event_espresso'); ?></h2>
        <p><?php _e('For customized confirmation emails, the following tags can be placed in the email form and they will pull data from the database to include in the email.', 'event_espresso'); ?></p>
        <p>[registration_id], [fname], [lname], [phone], [event], [event_link], [event_url], [ticket_type], [ticket_link], [qr_code], [description], [cost], [company], [co_add1], [co_add2], [co_city],[co_state], [co_zip],[contact], [payment_url], [invoice_link], [start_date], [start_time], [end_date], [end_time], [location], [location_phone], [google_map_link], [venue_title], [venue_url], [venue_image], [venue_phone], [custom_questions]</p>
    </div>

    <div id="custom_email_example" style="display:none;">
        <h2>Sample Mail Send:</h2>

        <p style="font-size:10px;">***This is an automated response - Do Not Reply***</p>
        <p style="font-size:10px;">Thank you [fname] [lname] for registering for [event]. We hope that you will find this event both informative and enjoyable. Should have any questions, please contact [contact].</p>
        <p style="font-size:10px;"><strong>Ticket type:</strong> [ticket_type]</p>
        <p style="font-size:10px;"><strong>Print Tickets:</strong> [ticket_link] (A link <a href="http://eventespresso.com/?p=3754" target="_blank">Your Customized Ticket</a> if the ticketing addon is installed.)</p>
        <p style="font-size:10px;">[qr_code] (generated by the QR Code addon, if installed)</p>
        <p style="font-size:10px;">If you have not done so already, please submit your payment in the amount of [cost].</p>
        <p style="font-size:10px;">Click here to review your payment information [payment_url].</p>
        <p style="font-size:10px;">Your questions: [custom_questions].</p>
    </div>
    <?php
}

//Function to check if registration ids are missing
function event_espresso_verify_attendee_data() {
    global $wpdb;
    $sql = "SELECT id FROM " . EVENTS_ATTENDEE_TABLE . " WHERE registration_id IS NULL OR registration_id = '' OR registration_id = '0' ";
    $wpdb->get_results($sql);
    if ($wpdb->num_rows > 0) {
        return true;
    }
}

function event_espresso_update_attendee_data() {
    global $wpdb;
    //$wpdb->show_errors();

    $sql = "SELECT id, date, fname, email, event_id FROM " . EVENTS_ATTENDEE_TABLE . " WHERE  registration_id = '0' ";
    $attendees = $wpdb->get_results($sql);
    //echo $sql;
    foreach ($attendees as $attendee) {

        /*         * ********************************
         * ******	Update single registrations
         * ********************************* */
        $registration_id = uniqid('', true);

        $update_attendee = "UPDATE " . EVENTS_ATTENDEE_TABLE . " SET registration_id = '" . $registration_id . "' WHERE id = '" . $attendee->id . "'";

        if (!$wpdb->query($update_attendee)) {
            $error = true;
            //return $wpdb->print_error();
        }/* else{
          echo __('Updating Inividual<br />', 'event_espresso'). 'ID: ' . $attendee->id .  ' - ' . $attendee->fname . ' ' . $attendee->email .' Registration ID - '. $registration_id .'<br />';
          } */

        /*         * ********************************
         * ******	Update group registrations
         * ********************************* */
        $groups_sql = "SELECT id, date, fname, email, event_id FROM " . EVENTS_ATTENDEE_TABLE . " WHERE date = '" . $attendee->date . "' AND event_id = '" . $attendee->event_id . "'";
        $groups = $wpdb->get_results($groups_sql);
        $group_registration_id = uniqid('', true);
        if ($wpdb->num_rows > 1) {
            foreach ($groups as $group_attendee) {
                $update_attendee_group = "UPDATE " . EVENTS_ATTENDEE_TABLE . " SET registration_id = '" . $group_registration_id . "' WHERE id = '" . $group_attendee->id . "'";
                if (!$wpdb->query($update_attendee_group)) {
                    $error = true;
                    //return $wpdb->print_error();
                }/* else{
                  echo __('Adding to Group Registration<br />', 'event_espresso'). 'ID: ' . $group_attendee->id .  ' - ' . $group_attendee->fname . ' ' . $group_attendee->email . 'Registration ID - ' . $group_registration_id . '<br />';
                  } */
            }
        }
    }

    /* if ($error != true){?>
      <div id="message" class="updated fade">
      <p><strong>
      <?php _e('Attendee data has been updated!','event_espresso'); ?>
      </strong></p>
      </div>
      <?php
      }else { ?>
      <div id="message" class="error">
      <p><strong>
      <?php _e('There was an error in your submission, please try again.','event_espresso'); ?>
      <?php $wpdb->print_error(); ?>
      .</strong></p>
      </div>
      <?php
      } */
}

//Function to show an admin message if the main pages are not setup.
function event_espresso_activation_notice() {
    if (function_exists('admin_url')) {
        echo '<div class="error fade"><p><strong>' . __('Event Espresso must be configured. Go to', 'event_espresso') . ' <a href="' . admin_url('admin.php?page=event_espresso#page_settings') . '">' . __('the Organization Settings page', 'event_espresso') . '</a>  ' . __('to configure the plugin "Page Settings."', 'event_espresso') . '</strong></p></div>';
    } else {
        echo '<div class="error fade" ><p><strong>' . __('Event Espresso must be configured. Go to', 'event_espresso') . ' <a href="' . admin_url('admin.php?page=event_espresso#page_settings') . '">' . __('the Organization Settings page', 'event_espresso') . '</a> ' . __('to configure the plugin "Page Settings."', 'event_espresso') . '</strong></p></div>';
    }
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

    function espresso_secondary_events_dd($current_value = '0', $allow_overflow = 'N') {
        global $wpdb;
        $sql = "SELECT id, event_name FROM " . EVENTS_DETAIL_TABLE;
        $sql .= " WHERE event_status = 'S' ";

        $events = $wpdb->get_results($sql);
        $num_rows = $wpdb->num_rows;
        //return print_r( $events );
        if ($num_rows > 0) {
            $field = '<select name="overflow_event_id" id="overflow_event_id">\n';
            $field .= '<option value="0">Select an event</option>';

            foreach ($events as $event) {
                $selected = $event->id == $current_value ? 'selected="selected"' : '';
                $field .= '<option ' . $selected . ' value="' . $event->id . '">' . $event->event_name . '</option>\n';
            }
            $field .= "</select>";
            $values = array(array('id' => 'Y', 'text' => __('Yes', 'event_espresso')), array('id' => 'N', 'text' => __('No', 'event_espresso')));
            $html = '<p><label>' . __('Assign a Waitlist Event? ', 'event_espresso') . '</label> ' . select_input('allow_overflow', $values, $allow_overflow) . ' <a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=secondary_info"><img src="' . EVENT_ESPRESSO_PLUGINFULLURL . '/images/question-frame.png" width="16" height="16" /></a> </p>' .
                    '<p class="inputunder"><label>' . __('Overflow Event', 'event_espresso') . ': </label><br />' . $field . '</p>';

            return $html;
        }
    }

}

// Function espresso_db_dropdown creates a drop-down box
// by dynamically querying ID-Name pair from a lookup table
//
// Parameters:
// intIdField = Integer "ID" field of table, usually the primary key
// strNameField = Name field that user picks as a value
// strTableName = Name of MySQL table containing intIDField and strNameField
// strOrderField = Which field you want results sorted by
// strMethod = Sort as asc=ascending (default) or desc for descending
// $current_value = The current select value
// $strDDName = The name of the field
//
//
// Returns:
// HTML Drop-Down Box Mark-up Code
function espresso_db_dropdown($intIdField, $strNameField, $strTableName, $strOrderField, $current_value, $strMethod="desc", $strDDName="") {
    global $wpdb;

    $strQuery = "select $intIdField, $strNameField from $strTableName order by $strOrderField $strMethod";
    //$rsrcResult = mysql_query($strQuery);
    $data = $wpdb->get_results($strQuery, ARRAY_A);
    //print_r($data);
    $strDDName = $strDDName != "" ? $strDDName : $strNameField;
    if ($wpdb->num_rows > 0) {
        echo '<select name="' . $strDDName . '">';
        echo '<option value="">' . __('Select Value', 'event_espresso') . '</option>';

        /*         * * loop over the results ** */
        foreach ($data as $row) {
            /*             * * create the options ** */
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
    $results = $wpdb->get_results("SELECT * FROM " . EVENTS_EMAIL_TABLE . " WHERE id =" . $id);
    foreach ($results as $result) {
        $email_id = $result->id;
        $email_name = stripslashes_deep($result->email_name);
        $email_subject = stripslashes_deep($result->email_subject);
        $email_text = stripslashes_deep($result->email_text);
    }
    $email_data = array('id' => $id, 'email_name' => $email_name, 'email_subject' => $email_subject, 'email_text' => $email_text);
    return $email_data;
}

function espresso_category_dropdown($current_value='') {
    global $wpdb;

    $strQuery = "select id, category_name from " . EVENTS_CATEGORY_TABLE;
    $data = $wpdb->get_results($strQuery, ARRAY_A);
    //print_r($data);

    if ($wpdb->num_rows > 0) {
        echo '<select name="category_id">';
        echo '<option value="">' . __('Show All Categories', 'event_espresso') . '</option>';

        /*         * * loop over the results ** */
        foreach ($data as $row) {
            /*             * * create the options ** */
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

//This function grabs the event categories.
//@param optional $event_id = pass the event id to get the categories assigned to the event.
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

//Retrives the attendee count based on an attendee ids
function espresso_count_attendees_for_registration($attendee_id) {
    global $wpdb;
    $cnt = $wpdb->get_var("SELECT COUNT(1) as cnt FROM " . EVENTS_ATTENDEE_TABLE . " WHERE registration_id='" . espresso_registration_id($attendee_id) . "' ORDER BY id ");
    if ($cnt == 1) {
        $cnt = $wpdb->get_var("SELECT quantity FROM " . EVENTS_ATTENDEE_TABLE . " WHERE registration_id='" . espresso_registration_id($attendee_id) . "' ORDER BY id ");
        if ($cnt == 0) {
            return 1;
        } elseif ($cnt > 0) {
            return $cnt;
        }
    }
    return $cnt;
}

function espresso_quantity_for_registration($attendee_id) {
    global $wpdb;
    $cnt = $wpdb->get_var("SELECT quantity FROM " . EVENTS_ATTENDEE_TABLE . " WHERE registration_id='" . espresso_registration_id($attendee_id) . "' ORDER BY id ");
    return $cnt;
}

function espresso_attendees_by_month_dropdown($current_value='') {
    global $wpdb;

    $strQuery = "select id, date from " . EVENTS_ATTENDEE_TABLE . " group by YEAR(date), MONTH(date) ";
    //$rsrcResult = mysql_query($strQuery);
    $data = $wpdb->get_results($strQuery, ARRAY_A);
    //print_r($data);

    if ($wpdb->num_rows > 0) {
        echo '<select name="month_range">';
        echo '<option value="">' . __('Select a Month/Year', 'event_espresso') . '</option>';

        /*         * * loop over the results ** */
        foreach ($data as $row) {
            /*             * * create the options ** */
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

//This function installs the required pages
function espresso_create_default_pages() {
    global $wpdb, $org_options;
    $default_pages = array('Event Registration', 'Thank You', 'Registration Cancelled', 'Transactions');
    $existing_pages = get_pages();
    foreach ($existing_pages as $page) {
        $temp[] = $page->post_title;
    }
    $pages_to_create = array_diff($default_pages, $temp);
    foreach ($pages_to_create as $new_page_title) {

        // Create post object
        $my_post = array();
        $my_post['post_title'] = $new_page_title;
        //$my_post['post_content'] = 'This is my '.$new_page_title.' page.';
        $my_post['post_status'] = 'publish';
        $my_post['post_type'] = 'page';
		$my_post['comment_status']='closed';
        // Insert the post into the database
        //$result = wp_insert_post( $my_post );

        switch ($new_page_title) {
            case 'Event Registration':
                if ($org_options['event_page_id'] == ('0' || '')) {
                    $my_post['post_content'] = '[ESPRESSO_EVENTS]';
                    $event_page_id = wp_insert_post($my_post);
                    $org_options['event_page_id'] = $event_page_id;
                }
                break;
            case 'Thank You':
                if ($org_options['return_url'] == ('0' || '')) {
                    $my_post['post_content'] = '[ESPRESSO_PAYMENTS]';
                    $return_url = wp_insert_post($my_post);
                    $org_options['return_url'] = $return_url;
                }
                break;
            case 'Registration Cancelled':
                if ($org_options['cancel_return'] == ('0' || '')) {
                    $my_post['post_content'] = 'You have cancelled your registration.';
                    $cancel_return = wp_insert_post($my_post);
                    $org_options['cancel_return'] = $cancel_return;
                }
                break;
            case 'Transactions':
                if ($org_options['notify_url'] == ('0' || '')) {
                    $my_post['post_content'] = '[ESPRESSO_TXN_PAGE]';
                    $notify_url = wp_insert_post($my_post);
                    $org_options['notify_url'] = $notify_url;
                }
                break;
        }
    }
    update_option('events_organization_settings', $org_options);
    //print_r($org_options);
}

function espresso_edit_this($event_id) {
    global $espresso_premium;
    if ($espresso_premium != true)
        return;
    global $current_user;
    wp_get_current_user();
    $curauth = wp_get_current_user();
    $user_id = $curauth->ID;
    $user = new WP_User($user_id);
    foreach ($user->roles as $role) {
        //echo $role;
        //Build the edit event link
        $edit_link = '<a class="post-edit-link" href="' . site_url() . '/wp-admin/admin.php?page=events&action=edit&event_id=' . $event_id . '">' . __('Edit Event') . '</a>';
        switch ($role) {
            case 'administrator':
            case 'espresso_event_admin':
            case 'espresso_event_manager':
            case 'espresso_group_admin':
                //If user is an event manager, then show the edit link for their events
                if (function_exists('espresso_member_data') && espresso_member_data('role') == 'espresso_eventmanager' && espresso_member_data('id') != espresso_is_my_event($event_id))
                    return;
                return $edit_link;
                break;
        }
    }
}

if (!function_exists('espresso_event_list_attendee_title')) {

    function espresso_event_list_attendee_title($event_id = NULL) {
        global $wpdb;

        $events = $wpdb->get_results("SELECT event_name FROM " . EVENTS_DETAIL_TABLE . " WHERE id = '" . $event_id . "' ");

        foreach ($events as $event) {
            $title_event_name = stripslashes_deep($event->event_name);
        }

        $content = $title_event_name;
        $content .= ' | ';
        $content .= 'ID: ' . $event_id;
        $content .= ' | ';
        $content .= espresso_event_time($event_id, 'start_date_time');
        return $content;
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

function espresso_ticket_links($registration_id, $attendee_id) {
    global $wpdb;
    $sql = "SELECT * FROM " . EVENTS_ATTENDEE_TABLE;
    if (espresso_is_primary_attendee($attendee_id) != true) {
        $sql .= " WHERE id = '" . $attendee_id . "' ";
    } else {
        $sql .= " WHERE registration_id = '" . $registration_id . "' ";
    }
    //echo $sql;
    $attendees = $wpdb->get_results($sql);
    $ticket_link = '';
    if ($wpdb->num_rows > 0) {
        $group = $wpdb->num_rows > 1 ? '<strong>' . sprintf(__('Tickets Purchased (%s):', 'event_espresso'), $wpdb->num_rows) . '</strong><br />' : '';
        $break = '<br />';
        foreach ($attendees as $attendee) {
            $ticket_url = get_option('siteurl') . "/?download_ticket=true&amp;id=" . $attendee->id . "&amp;registration_id=" . $attendee->registration_id;
            $ticket_link .= '<a href="' . $ticket_url . '">' . __('Download/Print Ticket') . ' (' . $attendee->fname . ' ' . $attendee->lname . ')' . '</a>' . $break;
        }
        return '<p>' . $group . $ticket_link . '</p>';
    }
}

function espresso_is_primary_attendee($attendee_id) {
    global $wpdb;
    $sql = "SELECT am.meta_value FROM " . EVENTS_ATTENDEE_META_TABLE . " am ";
    $sql .= " WHERE am.attendee_id = '" . $attendee_id . "' AND am.meta_key='primary_attendee' AND am.meta_value='1' ";
    //echo $sql;
    $wpdb->get_results($sql);
    if ($wpdb->num_rows > 0) {
        return true;
    }
}

function espresso_get_primary_attendee_id($registration_id) {
    global $wpdb;
    $sql = "SELECT am.attendee_id FROM " . EVENTS_ATTENDEE_META_TABLE . " am ";
    $sql .= " JOIN " . EVENTS_ATTENDEE_TABLE . " ea ON ea.id = am.attendee_id ";
    $sql .= " WHERE ea.registration_id = '" . $registration_id . "' AND am.meta_key='primary_attendee' AND am.meta_value='1' ";
    //echo $sql;
    $wpdb->get_results($sql);
    if ($wpdb->num_rows > 0) {
        return $wpdb->last_result[0]->attendee_id;
    }
}

function espresso_performance( $visible = false ) {

    $stat = sprintf( '%d queries in %.3f seconds, using %.2fMB memory',
        get_num_queries(),
        timer_stop( 0, 3 ),
        memory_get_peak_usage() / 1024 / 1024
        );

    echo $visible ? $stat : "<!-- {$stat} -->" ;
}
add_action( 'wp_footer', 'espresso_performance', 20 );

function espresso_admin_performance($show=0) {
	if($show==0)
		return;

	global $wpdb, $EZSQL_ERROR;
		$out = '';
		$total_time = 0;

		if ( !empty($wpdb->queries) ) {
			$show_many = isset($_GET['debug_queries']);

			if ( $wpdb->num_queries > 500 && !$show_many )
				$out .= "<p>" . sprintf( __('There are too many queries to show easily! <a href="%s">Show them anyway</a>', 'debug-bar'), add_query_arg( 'debug_queries', 'true' ) ) . "</p>";

			$out .= '<ol class="wpd-queries">';
			$counter = 0;

			foreach ( $wpdb->queries as $q ) {
				list($query, $elapsed, $debug) = $q;

				$total_time += $elapsed;

				if ( ++$counter > 500 && ! $show_many )
					continue;

				$debug = explode( ', ', $debug );
				$debug = array_diff( $debug, array( 'require_once', 'require', 'include_once', 'include' ) );
				$debug = implode( ', ', $debug );
				$debug = str_replace( array( 'do_action, call_user_func_array' ), array( 'do_action' ), $debug );
				$query = nl2br(esc_html($query));

				$out .= "<li>$query<br/><div class='qdebug'>$debug <span>#{$counter} (" . number_format(sprintf('%0.1f', $elapsed * 1000), 1, '.', ',') . "ms)</span></div></li>\n";
			}
			$out .= '</ol>';
		} else {
			if ( $wpdb->num_queries == 0 )
				$out .= "<p><strong>" . __('There are no queries on this page.', 'debug-bar') . "</strong></p>";
			else
				$out .= "<p><strong>" . __('SAVEQUERIES must be defined to show the query log.', 'debug-bar') . "</strong></p>";
		}

		if ( ! empty($EZSQL_ERROR) ) {
			$out .= '<h3>' . __( 'Database Errors', 'debug-bar' ) . '</h3>';
			$out .= '<ol class="wpd-queries">';

			foreach ( $EZSQL_ERROR as $e ) {
				$query = nl2br(esc_html($e['query']));
				$out .= "<li>$query<br/><div class='qdebug'>{$e['error_str']}</div></li>\n";
			}
			$out .= '</ol>';
		}

		$heading = '';
		if ( $wpdb->num_queries )
			$heading .= '<h2><span>Total Queries:</span>' . number_format( $wpdb->num_queries ) . "</h2>\n";
		if ( $total_time )
			$heading .= '<h2><span>Total query time:</span>' . number_format(sprintf('%0.1f', $total_time * 1000), 1) . " ms</h2>\n";
		if ( ! empty($EZSQL_ERROR) )
			$heading .= '<h2><span>Total DB Errors:</span>' . number_format( count($EZSQL_ERROR) ) . "</h2>\n";

		$out = $heading . $out;

		echo $out;
}

add_filter('admin_footer_text', 'espresso_admin_performance');

function espresso_admin_footer () {
	echo 'Event Registration and Ticketing Powered by <a href="http://eventespresso.com/" title="Event Registration Powered by Event Espresso" target="_blank">'.EVENT_ESPRESSO_POWERED_BY.'</a>';
}
add_filter('admin_footer_text', 'espresso_admin_footer');