<?php
/*
Plugin Name: Event Espresso - Calendar
Plugin URI: http://www.eventespresso.com
Description: A full calendar addon for Event Espresso. Includes month, week, and day views. Add [ESPRESSO_CALENDAR] to any page or post to display a calendar of Event Espresso events. Use [ESPRESSO_CALENDAR event_category_id="your_category_identifier"] to show events of a certain category (also creates a CSS using the category_identifier as the class name.) Use [ESPRESSO_CALENDAR show_expired="true"] to show expired events, can also be used int conjunction wit the category ID.
Version: 1.11
Author: Seth Shoultes
Author URI: http://www.eventespresso.com
Copyright 2011  Seth Shoultes  (email : seth@eventespresso.com)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 2, as
    published by the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

//Define the version of the plugin
function espresso_calendar_version() {
	return '1.11';
}
define("ESPRESSO_CALENDAR_VERSION", espresso_calendar_version() );

 $wp_plugin_url = WP_PLUGIN_URL;

 if (is_ssl()){

    $wp_plugin_url = str_replace( 'http://' , 'https://' ,WP_PLUGIN_URL );

 }

//Define the plugin directory and path
define("ESPRESSO_CALENDAR_PLUGINPATH", "/" . plugin_basename( dirname(__FILE__) ) . "/");
define("ESPRESSO_CALENDAR_PLUGINFULLPATH", WP_PLUGIN_DIR . ESPRESSO_CALENDAR_PLUGINPATH  );
define("ESPRESSO_CALENDAR_PLUGINFULLURL", $wp_plugin_url . ESPRESSO_CALENDAR_PLUGINPATH );

//Globals
global $espresso_calendar;
$espresso_calendar = get_option('espresso_calendar_settings');

//Install the plugin
function espresso_calendar_install(){
	//Install Facebook Options
	$espresso_calendar = array(
					'calendar_pages' => "0",
					'espresso_page_post' => "R",
					'espresso_calendar_header' => "left: 'prev, today', center: 'title', right: 'month,agendaWeek,agendaDay,next'",
					'espresso_calendar_buttonText' => "left: 'prev, today', center: 'title', right: 'month,agendaWeek,agendaDay,next'",
					'espresso_calendar_firstday' => '0',
					'espresso_calendar_weekends' => 'true',
					'espresso_calendar_height' => '650',
					'espresso_calendar_width' => '2',
					'espresso_calendar_titleFormat' => "month: 'MMMM yyyy', week: \"MMM d[ yyyy]{ '—'[ MMM] d yyyy}\", day: 'dddd, MMM d, yyyy'",
					'espresso_calendar_columnFormat' => "month: 'ddd', week: 'ddd M/d', day: 'dddd M/d'",
					'espresso_calendar_monthNames' => "'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'",
					'espresso_calendar_monthNamesShort' => "'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'",
					'espresso_calendar_dayNames' => "'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'",
					'espresso_calendar_dayNamesShort' => "'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'"
				);
	add_option( 'espresso_calendar_settings', $espresso_calendar );
}
register_activation_hook(__FILE__,'espresso_calendar_install');



/**
 * Add a settings link to the Plugins page, so people can go straight from the plugin page to the
 * settings page.
 */
function espresso_calendar_plugin_actions( $links, $file ){
	// Static so we don't call plugin_basename on every plugin row.
	static $this_plugin;
	if ( ! $this_plugin ) $this_plugin = plugin_basename(__FILE__);

	if ( $file == $this_plugin ){
		$org_settings_link = '<a href="admin.php?page=espresso_calendar">' . __('Settings') . '</a>';
		array_unshift( $links, $org_settings_link ); // before other links
	}
	return $links;
}
add_filter( 'plugin_action_links', 'espresso_calendar_plugin_actions', 10, 2 );

function espresso_calendar_config_mnu()	{
	global $wpdb, $espresso_calendar;

	/*Calendar*/
	function espresso_calendar_updated(){
	return __('Calendar details saved.','event_espresso');
	}

	if (isset($_POST['update_calendar'])) {
		$espresso_calendar['espresso_page_post'] = $_POST['espresso_page_post'];
		$espresso_calendar['espresso_calendar_header'] = $_POST['espresso_calendar_header'];
		$espresso_calendar['espresso_calendar_buttonText'] = $_POST['espresso_calendar_buttonText'];
		$espresso_calendar['espresso_calendar_firstday'] = $_POST['espresso_calendar_firstday'];
		$espresso_calendar['espresso_calendar_weekends'] = $_POST['espresso_calendar_weekends'];
		$espresso_calendar['espresso_calendar_height'] = $_POST['espresso_calendar_height'];
		$espresso_calendar['espresso_calendar_width'] = $_POST['espresso_calendar_width'];
		$espresso_calendar['calendar_thumb_size'] = $_POST['calendar_thumb_size'];
		$espresso_calendar['show_in_thickbox'] = $_POST['show_in_thickbox'];
		$espresso_calendar['espresso_calendar_titleFormat'] = $_POST['espresso_calendar_titleFormat'];
		$espresso_calendar['espresso_calendar_columnFormat'] = $_POST['espresso_calendar_columnFormat'];
		$espresso_calendar['espresso_calendar_monthNames'] = $_POST['espresso_calendar_monthNames'];
		$espresso_calendar['espresso_calendar_monthNamesShort'] = $_POST['espresso_calendar_monthNamesShort'];
		$espresso_calendar['espresso_calendar_dayNames'] = $_POST['espresso_calendar_dayNames'];
		$espresso_calendar['espresso_calendar_dayNamesShort'] = $_POST['espresso_calendar_dayNamesShort'];
		$espresso_calendar['calendar_pages'] = $_POST['calendar_pages']==''?0:$_POST['calendar_pages'];

		update_option( 'espresso_calendar_settings', $espresso_calendar);
		add_action( 'admin_notices', 'espresso_calendar_updated');
	}
	if ($_REQUEST['reset_calendar']=='true') {
		delete_option("espresso_calendar_settings");
		espresso_calendar_install();
	}
	$espresso_calendar = get_option('espresso_calendar_settings');

	// checks value of calendar thumb size to set radio inputs
		function espresso_is_selected($name) {
   global $espresso_calendar;
   $input_val = $name;
   if ($espresso_calendar['calendar_thumb_size'] !== $input_val  )
   return false;
   else
   echo  'checked="checked"';
   return; 
  }	
	?>
	
<div class="wrap">
  <div id="icon-options-event" class="icon32"> </div>
  <h2>
    <?php _e('Event Espresso - Calendar Settings','event_espresso'); ?>
  </h2>
  <div id="poststuff" class="metabox-holder has-right-sidebar">
  <?php event_espresso_display_right_column ();?>
  <div id="post-body">
<div id="post-body-content">
  <form class="espresso_form" method="post" action="<?php echo $_SERVER['REQUEST_URI']?>">
      <ul id="event_espresso-sortables">
        <li>
          <div class="metabox-holder">
			<div class="postbox">
            <h3>
              <?php _e('Calendar Settings','event_espresso'); ?>
            </h3>
          <div class="padding">
              <ul>

              <li>
              <strong><?php _e('Directions:', 'event_espresso'); ?></strong><br />
             <?php _e(' Add [ESPRESSO_CALENDAR] to any page or post to display a calendar of Event Espresso events. Use [ESPRESSO_CALENDAR event_category_id="your_category_identifier"] to show events of a certain category (also creates a CSS using the category_identifier as the class name.) Use [ESPRESSO_CALENDAR show_expired="true"] to show expired events, can also be used in  conjunction with the category ID.', 'event_espresso'); ?></li>
              <li><strong><?php _e('Examples Shortcodes:', 'event_espresso'); ?></strong><br />
            	[ESPRESSO_CALENDAR]<br />
				[ESPRESSO_CALENDAR show_expired="true"]<br />
				[ESPRESSO_CALENDAR event_category_id="your_category_identifier"]<br />
                [ESPRESSO_CALENDAR event_category_id="your_category_identifier" show_expired="true"]<br />
                [ESPRESSO_CALENDAR cal_view="month"] (Available parameters: month, basicWeek, basicDay, agendaWeek, agendaDay)
              </li>
              <li><strong><?php _e('Styles/Colors:', 'event_espresso'); ?></strong><br />
              <?php _e('To edit the calendar styles, copy the CSS file located in the plugin folder to your "wp-content/uploads/espresso/" directory. Then edit as needed. Refer to <a href="http://arshaw.com/fullcalendar/docs/event_rendering/Colors/" target="_blank">this page</a> for an example of styling the calendar and colors.', 'event_espresso'); ?>
              </li>

              <li><strong><?php _e('Category Colors:', 'event_espresso'); ?></strong><br />
              <?php _e('Event Categories can have their own colors on the calendar. To use this feature, simply create a class in theme CSS file with the names of your event categories. For more inforamtion <a href="http://eventespresso.com/forums/?p=650" target="_blank">please visit the tutorial</a> for this topic.', 'event_espresso'); ?>
              </li></ul>
              </div>
              </div>
              </div>
              <div class="metabox-holder">
			<div class="postbox">
              <h3><?php _e('Basic Settings', 'event_espresso'); ?></h3>
              <div class="padding">
            <ul>
                <li>
                  <label for="espresso_calendar_firstday">
                    <?php _e('First Day of the Week:','event_espresso'); ?>
                  </label>
                 <?php _e('(Sunday=0, Monday=1, Tuesday=2, etc.)', 'event_espresso'); ?><br />
                  <input id="espresso_calendar_firstday" type="text" name="espresso_calendar_firstday" size="10" maxlength="1" value="<?php echo $espresso_calendar['espresso_calendar_firstday'];?>" />
                </li>

                <li>
                  <label for="espresso_calendar_weekends">
                    <?php _e('Show Weekends:','event_espresso'); ?>
                  </label>
                 <?php
						$values=array(
							array('id'=>'true','text'=> __('Yes','event_espresso')),
							array('id'=>'false','text'=> __('No','event_espresso'))
						);
							echo select_input('espresso_calendar_weekends', $values, $espresso_calendar['espresso_calendar_weekends'], 'id="espresso_calendar_weekends"');
					?>
                </li>
                <li>
                  <label for="espresso_calendar_height">
                    <?php _e('Height:','event_espresso'); ?>
                  </label><?php _e('Will make the entire calendar (including header) a pixel height.', 'event_espresso'); ?><br />
                   <input id="espresso_calendar_height" type="text" name="espresso_calendar_height" size="100" maxlength="100" value="<?php echo $espresso_calendar['espresso_calendar_height'];?>" />
                </li>
                <li><label for="calendar_pages">
                    <?php _e('Page(s) displaying the calendar: ','event_espresso'); ?><a class="thickbox"  href="#TB_inline?height=400&amp;width=500&amp;inlineId=display-on-pages" target="_blank"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/question-frame.png" alt="help text link" width="16" height="16" /></a>
                  </label><?php _e('This tells the plugin to load the calendar CSS file on specific pages. This should be a comma seperated list of page ids.', 'event_espresso'); ?><br />
                   <input id="calendar_pages" type="text" name="calendar_pages" size="100" maxlength="100" value="<?php echo $espresso_calendar['calendar_pages']==''?0:$espresso_calendar['calendar_pages'];?>" /></li>
                <li>
                  <label for="calendar_page_post">
                    <?php _e('Links go to post or registration page? ','event_espresso'); ?><a class="thickbox"  href="#TB_inline?height=400&amp;width=500&amp;inlineId=display-where" target="_blank"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/question-frame.png" alt="help text link" width="16" height="16" /></a>
                  </label><?php _e('If you are using the "Create a Post" feature. Use this option to link to the posts that are created by Event Espresso.', 'event_espresso'); ?><br />
                   <?php echo select_input('espresso_page_post',  array(array('id'=>'R','text'=> __('Registration Page','event_espresso')),array('id'=>'P','text'=> __('Post','event_espresso'))), $espresso_calendar['espresso_page_post'], 'id="calendar_page_post"');?>
                </li>

                <li>
									<p class="section-heading">Select Calendar thumbnail size: <a class="thickbox"  href="#TB_inline?height=400&amp;width=500&amp;inlineId=calendar-thumb-sizes" target="_blank"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/question-frame.png" alt="help text link" width="16" height="16" /></a></p>
									 <label for="calendar-thumb-size-sml"><input id="calendar-thumb-size-sml" type="radio" name="calendar_thumb_size" <?php espresso_is_selected('small')?> value="small"  /><?php _e(' Small (50px high)', 'event_espresso') ?></label>
									 <label for="calendar-thumb-size-med"><input id="calendar-thumb-size-med" type="radio" name="calendar_thumb_size" <?php espresso_is_selected('medium')?> value="medium" /><?php _e(' Medium (100px high)', 'event_espresso')?></label>
									 <label for="calendar-thumb-size-lrg"><input id="calendar-thumb-size-lrg" type="radio" name="calendar_thumb_size" <?php espresso_is_selected('large')?> value="large" /><?php _e(' Large (150px high)', 'event_espresso')?></label>
									 
									</li>
									<li>
									<label for=""><?php _e('Show event details in popup box', 'event_espresso'); ?></label>
									
									<?php echo select_input('show_in_thickbox',  array(array('id'=>'Y','text'=> __('Yes','event_espresso')),array('id'=>'N','text'=> __('No','event_espresso'))), $espresso_calendar['show_in_thickbox'], 'id="show-in-thickbox"');?>
									</li>
                <li>
                  <input class="button-primary" type="submit" name="save_calendar_settings" value="<?php _e('Save Calendar Options', 'event_espresso'); ?>" id="save_calendar_settings2" />
                </li>
                </ul>
                </div></div></div>
                <div class="metabox-holder">
			<div class="postbox"> <h3><?php _e('Advanced Settings', 'event_espresso'); ?></h3>
            <div class="padding">
                <ul>
                <li>

<table width="100%" border="0" cellpadding="20" cellspacing="5">
  <tr>
    <td align="left" valign="top">
   <p> <strong><?php _e('Header Style:','event_espresso'); ?></strong><br /><?php _e('Defines the buttons and title at the top of the calendar.', 'event_espresso'); ?></p><textarea name="espresso_calendar_header" id="espresso_calendar_header" cols="30" rows="5"><?php echo stripslashes_deep($espresso_calendar['espresso_calendar_header']) ?></textarea></td>
    <td align="left"  valign="top"><p><strong><?php _e('Example:', 'event_espresso'); ?></strong></p><p>left: 'prev,<br />today', <br />center: 'title', <br />right: 'month,agendaWeek,agendaDay,next'</p>
      <p>
        <?php _e('More Ino:','event_espresso'); ?>
        <br />
        <a href="http://arshaw.com/fullcalendar/docs/display/header/" target="_blank">http://arshaw.com/fullcalendar/docs/display/header/</a></p></td>
  </tr>
  <tr>
    <td align="left" valign="top">
   <p> <strong><?php _e('Button Text:','event_espresso'); ?></strong><br /><?php _e('Text that will be displayed on buttons of the header.', 'event_espresso'); ?></p><textarea name="espresso_calendar_buttonText" id="espresso_calendar_buttonText" cols="30" rows="5"><?php echo stripslashes_deep($espresso_calendar['espresso_calendar_buttonText']) ?></textarea></td>
    <td align="left"  valign="top"><p><strong><?php _e('Example:', 'event_espresso'); ?></strong></p>
      <p>prev:     '&amp;nbsp;&amp;#9668;&amp;nbsp;',  //<span class="red_text">(Eg. left triangle)</span><br />
next:     '&amp;nbsp;&amp;#9658;&amp;nbsp;',//<span class="red_text"> (Eg. right triangle)</span><br />
prevYear: '&amp;nbsp;&amp;lt;&amp;lt;&amp;nbsp;', //<span class="red_text">(Eg. &lt;&lt; )</span><br />
nextYear: '&amp;nbsp;&amp;gt;&amp;gt;&amp;nbsp;', //<span class="red_text">(Eg. &gt;&gt; )</span><br />
today:    'today',<br />
month:    'month',<br />
week:     'week',<br />
day:      'day'</p>
      <p><?php _e('More Ino:','event_espresso'); ?><br /><a href="http://arshaw.com/fullcalendar/docs/text/buttonText/" target="_blank">http://arshaw.com/fullcalendar/docs/text/buttonText/</a></p></td>
  </tr>
  <tr>
    <td align="left" valign="top">
   <p> <strong><?php _e('Title Format:','event_espresso'); ?></strong><br />
<?php _e('For date formatting options.', 'event_espresso'); ?></p><textarea name="espresso_calendar_titleFormat" id="espresso_calendar_titleFormat" cols="30" rows="5"><?php echo stripslashes_deep($espresso_calendar['espresso_calendar_titleFormat']) ?></textarea></td>
    <td align="left" valign="top"><p><strong><?php _e('Example:', 'event_espresso'); ?></strong></p><p>month: 'MMMM yyyy', //<span class="red_text">(Eg. September 2009)</span><br />week: "MMM d[ yyyy]{ '&#8212;'[ MMM] d yyyy}", //<span class="red_text">(Eg. Sep 7 - 13 2009)</span><br />day: 'dddd, MMM d, yyyy' //<span class="red_text">(Eg. Tuesday, Sep 8, 2009)</span></p>
      <p><?php _e('For date formatting options, please refer to: ','event_espresso'); ?> <br />
        <a href="http://arshaw.com/fullcalendar/docs/utilities/formatDate/" target="_blank">http://arshaw.com/fullcalendar/docs/utilities/formatDate/</a></p></td>
  </tr>
  <tr>
    <td align="left" valign="top">
   <p> <strong><?php _e('Column Format:','event_espresso'); ?></strong><br />
<?php _e('For date formatting options.', 'event_espresso'); ?></p><textarea name="espresso_calendar_columnFormat" id="espresso_calendar_columnFormat" cols="30" rows="5"><?php echo stripslashes_deep($espresso_calendar['espresso_calendar_columnFormat']) ?></textarea></td>
    <td align="left" valign="top"><p><strong><?php _e('Example:', 'event_espresso'); ?></strong></p><p>month: 'ddd', //<span class="red_text">(Eg. Mon) </span><br />week: 'ddd M/d', //<span class="red_text">(Eg. Mon 9/7) </span><br />day: 'dddd M/d' //<span class="red_text">(Eg. Monday 9/7)</span></p>
      <p><?php _e('More Ino:','event_espresso'); ?><br />
<a href="http://arshaw.com/fullcalendar/docs/text/columnFormat/" target="_blank">http://arshaw.com/fullcalendar/docs/text/columnFormat/</a></p></td>
  </tr>
   <tr>
    <td align="left" valign="top">
   <p> <strong><?php _e('Month Names:','event_espresso'); ?></strong><br />
<?php _e('Full names of months.', 'event_espresso'); ?></p><textarea name="espresso_calendar_monthNames" id="espresso_calendar_monthNames" cols="30" rows="5"><?php echo stripslashes_deep($espresso_calendar['espresso_calendar_monthNames']) ?></textarea></td>
    <td align="left" valign="top"><p><strong><?php _e('Example:', 'event_espresso'); ?></strong></p><p>'January', 'February', 'March', <br />'April', 'May', 'June', <br />'July', 'August', 'September', 'October', <br />'November', 'December'</p></td>
  </tr>
   <tr>
    <td align="left" valign="top">
   <p> <strong><?php _e('Month Names Short:','event_espresso'); ?></strong><br />
<?php _e('Abbreviated names of months.', 'event_espresso'); ?></p><textarea name="espresso_calendar_monthNamesShort" id="espresso_calendar_monthNamesShort" cols="30" rows="5"><?php echo stripslashes_deep($espresso_calendar['espresso_calendar_monthNamesShort']) ?></textarea></td>
    <td align="left" valign="top"><p><strong><?php _e('Example:', 'event_espresso'); ?></strong></p><p>'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'</p></td>
  </tr>
   <tr>
    <td align="left" valign="top">
   <p> <strong><?php _e('Day Names:','event_espresso'); ?></strong><br />
<?php _e('Full names of days-of-week.', 'event_espresso'); ?></p><textarea name="espresso_calendar_dayNames" id="espresso_calendar_dayNames" cols="30" rows="5"><?php echo stripslashes_deep($espresso_calendar['espresso_calendar_dayNames']) ?></textarea></td>
    <td align="left" valign="top"><p><strong><?php _e('Example:', 'event_espresso'); ?></strong></p><p>'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'</p></td>
  </tr>
   <tr>
    <td align="left" valign="top">
   <p> <strong><?php _e('Day Names Short:','event_espresso'); ?></strong><br />
<?php _e('Abbreviated names of days-of-week.', 'event_espresso'); ?></p><textarea name="espresso_calendar_dayNamesShort" id="espresso_calendar_dayNamesShort" cols="30" rows="5"><?php echo stripslashes_deep($espresso_calendar['espresso_calendar_dayNamesShort']) ?></textarea></td>
    <td align="left" valign="top"><p><strong><?php _e('Example:', 'event_espresso'); ?></strong></p><p>'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'</p></td>
  </tr>
</table>
                </li>
                 <?php
				 //Changed 8-30-2011 by Seth
				 /*?><li>
                  <label for="espresso_calendar_width">
                    <?php _e('Width:','event_espresso'); ?>
                  </label>
                   <input type="text" name="espresso_calendar_width" size="100" maxlength="100" value="<?php echo $espresso_calendar['espresso_calendar_width'];?>" />
                </li><?php */
				//End Seth
				?>
                <li><input type="hidden" name="update_calendar" value="update" />
      <p>
        <input class="button-primary" type="submit" name="Submit" value="<?php _e('Save Calendar Options', 'event_espresso'); ?>" id="save_calendar_settings_1" />
      </p>
      <p>Reset Calendar Settings? <input name="reset_calendar" type="checkbox" value="true" /> </p>

      </li>
              </ul>
              </div>
            </div>
          </div>
        </li>
        </ul>
 </form>
	<?php include_once('calendar_help.php'); ?>
 </div>
        </div>
		</div>
        </div>

<?php
}

//Load the scripts and css
if (!function_exists('espresso_init_calendar')) {
	function espresso_init_calendar() {
		global $load_espresso_calendar_scripts;
		if ( ! $load_espresso_calendar_scripts )
			return;

		wp_enqueue_script('jquery');
		wp_register_script('fullcalendar-min-js',  ESPRESSO_CALENDAR_PLUGINFULLURL.'scripts/fullcalendar.min.js', array('jquery') );//core calendar script
		wp_print_scripts('fullcalendar-min-js');
		wp_print_scripts('thickbox');
	}
}
add_action('wp_footer', 'espresso_init_calendar',20);

if (!function_exists('espresso_init_calendar_style')) {
	function espresso_init_calendar_style() {
		global $espresso_calendar;
		$page_array  = explode(',', $espresso_calendar['calendar_pages']);
		//print_r($page_array);
		if ($espresso_calendar['calendar_pages']!=0){
			if (!is_page($page_array)){
				return;
			}
		}
		//Enable the following if you would like to use jQuery UI Theme Roller styles (http://jqueryui.com/themeroller/).
		//See "Theme Settings" section in jquery script below
		//wp_enqueue_script('jquery-ui-custom-js',  EVENT_ESPRESSO_UPLOAD_URL.'scripts/jquery-ui-custom.js', array('jquery') );//calendar ui script
		//wp_enqueue_style('redmond', EVENT_ESPRESSO_UPLOAD_URL.'redmond/theme.css');//calendar alternate style

		//Check to see if the calendar css file exists in the '/uploads/espresso/' directory
		if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR."calendar.css")){
			wp_register_style('calendar', EVENT_ESPRESSO_UPLOAD_URL.'calendar.css');//This is the url to the css file if available
		}else{
			wp_register_style('calendar', ESPRESSO_CALENDAR_PLUGINFULLURL.'calendar.css');//calendar core style
		}
		wp_enqueue_style( 'calendar');
	}
}
add_action('wp_print_styles', 'espresso_init_calendar_style',10);

//Build the short code
//[ESPRESSO_CALENDAR]
//[ESPRESSO_CALENDAR show_expired="true"]
//[ESPRESSO_CALENDAR event_category_id="your_category_identifier"]
if (!function_exists('espresso_calendar')) {
	function espresso_calendar ($atts){
		global $wpdb, $org_options, $espresso_calendar, $load_espresso_calendar_scripts;

		$load_espresso_calendar_scripts = true;//This tells the plugin to load the required scripts

		extract(shortcode_atts(array('event_category_id' => '', 'show_expired' => 'false', 'cal_view' => 'month'), $atts));
		$event_category_id  = "{$event_category_id}";
		$show_expired  = "{$show_expired}";
		$cal_view  = "{$cal_view}";

		//Build the SQL to run

		//Get the categories
		if ($event_category_id != "" ){
			$sql = "SELECT e.*, c.category_name, c.category_desc, c.display_desc, ese.start_time, ese.end_time FROM ". EVENTS_DETAIL_TABLE . " e ";
			$sql .= " JOIN " . EVENTS_CATEGORY_REL_TABLE . " r ON r.event_id = e.id ";
			$sql .= " JOIN " . EVENTS_CATEGORY_TABLE . " c ON  c.id = r.cat_id ";
			$sql .= " LEFT JOIN " . EVENTS_START_END_TABLE . " ese ON ese.event_id= e.id ";
			$sql .= " WHERE e.is_active = 'Y' ";
			$sql .= " AND e.event_status != 'D' ";
			$sql .= " AND e.event_status != 'S' ";
			$sql .= " AND e.event_status != 'P' ";
			$sql .= " AND e.event_status != 'X' ";
			$sql .= " AND e.event_status != 'R' ";
			$sql .= " AND c.category_identifier = '" . $event_category_id . "' ";
			if ($show_expired == "false" ){
				$sql .= " AND start_date >= '".date ( 'Y-m-d' )."' ";
				$sql .= " AND e.registration_start <= '".date ( 'Y-m-d' )."' ";
				$sql .= " AND e.registration_end >= '".date ( 'Y-m-d' )."' ";
			}
		}else{
			$sql = "SELECT e.*, ese.start_time, ese.end_time FROM ". EVENTS_DETAIL_TABLE . " e ";
			$sql .= " LEFT JOIN " . EVENTS_START_END_TABLE . " ese ON ese.event_id= e.id ";
			$sql .= " WHERE is_active = 'Y' ";
			$sql .= " AND e.event_status != 'D' ";
			$sql .= " AND e.event_status != 'S' ";
			$sql .= " AND e.event_status != 'P' ";
			$sql .= " AND e.event_status != 'X' ";
			$sql .= " AND e.event_status != 'R' ";
			if ($show_expired == "false" ){
				$sql .= " AND e.start_date >= '".date ( 'Y-m-d' )."' ";
				$sql .= " AND e.registration_start <= '".date ( 'Y-m-d' )."' ";
				$sql .= " AND e.registration_end >= '".date ( 'Y-m-d' )."' ";
			}
		}
		$sql .= " GROUP BY e.id ORDER BY date(start_date), id ASC";

		//Print the results of the query
		//echo $sql;

		// grab the thumbnail size & thickbox from calendar options settings
		if(empty($espresso_calendar['calendar_thumb_size'])) {
		$ee_img_size = 'small';
		}else{
		$ee_img_size = $espresso_calendar['calendar_thumb_size'];
		}
		if( isset($espresso_calendar['show_in_thickbox']) ) {
		$in_thickbox = $espresso_calendar['show_in_thickbox'];
		}
		$events_data = $wpdb->get_results($sql);
	 
		$events = array();
  
		foreach ($events_data as $event){
			//Get details about the category of the event
			//print_r( espresso_event_category_data($event->id) ); //Print the category id for each event.
			$category_data = espresso_event_category_data($event->id);
			$event_meta = unserialize($event->event_meta);
			//var_dump($event);

			switch ($espresso_calendar['espresso_page_post']){

				case 'P':
					$registration_url = get_option('siteurl'). '/?p=' . $event->post_id;
				break;
				case 'R':
				default:
					$registration_url = get_option('siteurl'). '/?page_id=' . $org_options['event_page_id'] . '&regevent_action=register&event_id=' . $event->id;
				break;

			}
			
			//Checkthe status of the event. If the event is expired, the link to the registration page will be deactivated.
			$eventArray['url'] ='';
			$status = '';
			//Changed 8-30-2011 by Seth
			/*switch (event_espresso_get_status($event->id)){
				case 'NOT_ACTIVE':
					$status = ' - ' . __('Expired','event_espresso');
				break;
				case 'ACTIVE':
					$status = '';
				break;
			}*/
			//End Seth
			
			// Build calendar array from $event data
			//Gets the URL of the event and links the event to the registration form.					
			$eventArray['url'] = $event->externalURL !=''? htmlspecialchars_decode($event->externalURL) : $registration_url ;	
			//Id of the event
			$eventArray['id'] = $event->id;

			//Get the title of the event
			$ee_event_title = htmlspecialchars_decode( stripslashes_deep($event->event_name . $status), ENT_QUOTES );
			$eventArray['title'] = $ee_event_title;

			//Gets the description of the event. This can be used for hover effects such as jQuery Tooltips or QTip
			$eventArray['description'] = espresso_format_content($event->event_desc);

			//Get the start and end times for each event
			//important! time must be in iso8601 format 2010-05-10T08:30  !!
			$eventArray['start'] = date("c", strtotime($event->start_date . ' ' . event_date_display($event->start_time, get_option('time_format')) ));
			$eventArray['end'] = date("c", strtotime($event->end_date . ' ' .  event_date_display($event->end_time, get_option('time_format')) ));
					
    // add image thumb to array
			if( !empty($event_meta['event_thumbnail_url']) ) {
			 $calendar_thumb  = $event_meta['event_thumbnail_url'];
    // echo '<a href="' . $registration_url . '"><img class="event-id-'. $event->id . '" src="'. $calendar_thumb . '" alt="" title="' . $ee_event_title . '" / ></a>';
			}			
			if( !empty($event_meta['display_thumb_in_calendar']) ) {
			$eventArray['event_img_thumb'] = $calendar_thumb ;
			}
			
			//Custom fields: 
			//These can be used to perform special functions in your display.

			//This can be used to use the category id as the event type
			$eventArray['eventType'] = $category_data['category_name'];
			//Changed 8-30-2011 by Seth
			//This decalares the category ID as the CSS class name
			/*$sql_categories = 'select * from `wp_events_category_rel` where event_id='.$event->id ;
			$categories_data = $wpdb->get_results($sql_categories);

			$cssClass = $category_data['category_identifier'];
 			foreach($categories_data as $_category){
				if(isset($categoryCss[$_category->cat_id])){
					$cssClass .=' '.$categoryCss[$_category->cat_id] ;
					continue;
				}
				$sql_cat = 'select * from `wp_events_category_detail` where id='.$_category->cat_id;
				$category = $wpdb->get_results($sql_cat);
				foreach($category as $_cat){
					$cssClass .=' '.$_cat->category_identifier ;
					$categoryCss[$_category->cat_id] = $_cat->category_identifier;
					continue;
				}

			}

			$eventArray['className'] = $cssClass;*/

			//End Seth
			
			
			//End custom fields

			//If set to true, events will be shown as all day events
			$eventArray['allDay'] = FALSE;
   
			// Set sizes for image display
			$eventArray['img_size_class'] = $ee_img_size;
			
			// image onclick displays in thickbox yes/no
			if($in_thickbox == 'Y'){
			$in_thickbox_class = 'thickbox';
			$in_thickbox_url = '#TB_inline?height=400&width=500&inlineId=event-thumb-detail-' .  $event->id ;
			}else {
   $in_thickbox_class = '';
			$in_thickbox_url = '';
			}			
			
			$eventArray['in_thickbox_class'] = $in_thickbox_class;
			$eventArray['in_thickbox_url'] = $in_thickbox_url;
			//var_dump($eventArray['in_thickbox_url']);
			
			//Array of the event details
			$events[] = $eventArray; 
		}
		//Print the results of the code above
		// echo json_encode($events);

	//Start the output of the calendar
	ob_start();
	?>
<script type="text/javascript">
		$jaer = jQuery.noConflict();
		jQuery(document).ready(function($jaer) {

				$jaer('#espresso_calendar').fullCalendar({


					/**
					* General Display
					* http://arshaw.com/fullcalendar/docs/text/
					**/

					//month, basicWeek, basicDay, agendaWeek, agendaDay
					defaultView: '<?php echo $cal_view ?>',

					//Defines the buttons and title at the top of the calendar.
					header: { //Settings: http://arshaw.com/fullcalendar/docs/display/header/
						<?php echo stripslashes_deep($espresso_calendar['espresso_calendar_header']) ?>
					},

					/**
					* Theme Settings
					*
					* Once you enable theming with true, you still need to include the CSS file for the theme you want.
					* For example, if you just downloaded a theme from the jQuery UI Themeroller, you need to put a <link> tag in your page's <head>.
					**/

					//Enables/disables use of jQuery UI theming.
					//theme: true, //Settings: http://arshaw.com/fullcalendar/docs/display/theme/

					//This option only applies to calendars that have jQuery UI theming enabled with the theme option.
					/*buttonIcons:{ //Settings: http://arshaw.com/fullcalendar/docs/display/buttonIcons/
						prev: 'circle-triangle-w',
						next: 'circle-triangle-e'
					},*/

					//The day that each week begins.
					//The value must be a number that represents the day of the week.
					//Sunday=0, Monday=1, Tuesday=2, etc.
					firstDay:<?php echo $espresso_calendar['espresso_calendar_firstday'];?>, //Settings: http://arshaw.com/fullcalendar/docs/display/firstDay/

					//Displays the calendar in right-to-left mode.
					isRTL: false,

					//Whether to include Saturday/Sunday columns in any of the calendar views.
					weekends: <?php echo $espresso_calendar['espresso_calendar_weekends'];?>,

					//Determines the number of weeks displayed in a month view. Also determines each week's height.
					weekMode:'fixed', //Settings: http://arshaw.com/fullcalendar/docs/display/weekMode/

					//Will make the entire calendar (including header) a pixel height.
					height:<?php echo $espresso_calendar['espresso_calendar_height'];?>, //Settings: http://arshaw.com/fullcalendar/docs/display/height/

					//Will make the calendar's content area a pixel height.
					//contentHeight: 600, //Settings: http://arshaw.com/fullcalendar/docs/display/contentHeight/

					//Determines the width-to-height aspect ratio of the calendar.
					//aspectRatio: 2, //Settings: http://arshaw.com/fullcalendar/docs/display/aspectRatio/

					/**
					* Agenda Options
					* http://arshaw.com/fullcalendar/docs/agenda/
					* Note: These ptions that apply to the agendaWeek and agendaDay views, and have beft out intentionally.
					* Please refer to the URL above to add.manage your agenda views.
					**/

					/**
					* Text/Time Customization Settings
					* http://arshaw.com/fullcalendar/docs/text/
					**/

					//Determines the time-text that will be displayed on each event.
					timeFormat:{ //Settings: http://arshaw.com/fullcalendar/docs/text/timeFormat/
						// for agendaWeek and agendaDay
						agenda: 'h:mm{ - h:mm}', // 5:00 - 6:30

						// for all other views
						'': ''            // 7p
					},

					//Changes the colors of the events as seen here:
					//http://code.google.com/p/fullcalendar/issues/detail?id=6&can=1&q=css&colspec=ID%20Type%20Status%20Milestone%20Summary%20Stars
					eventRender: function(event, element) {

						//This displays the title of the event when hovering
						element.attr('title', event.title);
						// if the user selects show in thickbox we add this element 
						if(event.in_thickbox_url){
      element.after($jaer('<div style="display: none;"><div id="event-thumb-detail-' + event.id  + '"><p class="tb-event-title">' + event.title + '</p><p class="tb-event-start">Event start: ' + event.start + '</p><p class="tb-event-end">Event End: ' + event.end + '</p>' + event.description + '<p class="tb-reg-link"><a href="' + event.url + '"title="Go to registration page for this event">Register for this event</a></p></div></div>'));
						}
						if(event.event_img_thumb){
						 //alert('we have thumbs');
							
						 element.addClass('event-has-thumb');
							  if(event.in_thickbox_url){
							   element.find('a').attr('href', event.in_thickbox_url);
							  }else{
							    element.find('a').attr('href', event.url );
							  }
							//element.find('a').attr('href', event.url + event.in_thickbox_url);
							element.find('a').addClass(event.in_thickbox_class);
						 element.find('span.fc-event-title').before($jaer('<span class="thumb-wrap"><img class="ee-event-thumb ' + event.img_size_class + '" src="' + event.event_img_thumb + '" alt="image of ' + event.title + '" \/></span>'));
						 //$jaer('span.fc-event-title').before($jaer('<span>' + event.event_img_thumb + '</span>'));
						 }
						//These are examples of custom parameters that can be passed
						/*if (event.eventType == 'meeting') {
							element.addClass('meeting');
							//alert(event.myType );
						}*/

						//This example basically applies different classes to the event
						/*switch (event.myType){
						case 'meeting' :
							element.find('.n, .w, .c, .e, .s').css('background-color', '#00cc33');
						break;
						case 'project' :
							element.find('.n, .w, .c, .e, .s').css('background-color', 'red');
						break;
						default :
						break;
						}*/
					},

					//Determines the text that will be displayed on the calendar's column headings.
					columnFormat:{ //Settings: http://arshaw.com/fullcalendar/docs/text/columnFormat/
						<?php echo stripslashes_deep($espresso_calendar['espresso_calendar_columnFormat']);?>
						/*month: 'ddd',    // Mon
						week: 'ddd M/d', // Mon 9/7
						day: 'dddd M/d'  // Monday 9/7*/
					},

					//For date formatting options, please refer to: http://arshaw.com/fullcalendar/docs/utilities/formatDate/
					titleFormat:{ //Settings: http://arshaw.com/fullcalendar/docs/text/columnFormat/
						<?php echo stripslashes_deep($espresso_calendar['espresso_calendar_titleFormat']);?>
						/*month: 'MMMM yyyy',                             // September 2009
						week: "MMM d[ yyyy]{ '&#8212;'[ MMM] d yyyy}", // Sep 7 - 13 2009
						day: 'dddd, MMM d, yyyy'                  // Tuesday, Sep 8, 2009*/
					},

					//Text that will be displayed on buttons of the header.
					buttonText: { //Settings: http://arshaw.com/fullcalendar/docs/text/buttonText/
						<?php echo stripslashes_deep($espresso_calendar['espresso_calendar_buttonText']);?>
						/*prev:     '&nbsp;&#9668;&nbsp;',  // left triangle
						next:     '&nbsp;&#9658;&nbsp;',  // right triangle
						prevYear: '&nbsp;&lt;&lt;&nbsp;', // <<
						nextYear: '&nbsp;&gt;&gt;&nbsp;', // >>
						today:    'today',
						month:    'month',
						week:     'week',
						day:      'day'*/
					},

					//Full names of months.
					monthNames: [<?php echo stripslashes_deep($espresso_calendar['espresso_calendar_monthNames']);?>/*'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'*/],

					//Abbreviated names of months.
					monthNamesShort: [<?php echo stripslashes_deep($espresso_calendar['espresso_calendar_monthNamesShort']);?>/*'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'*/],

					//Full names of days-of-week.
					dayNames: [<?php echo stripslashes_deep($espresso_calendar['espresso_calendar_dayNames']);?>/*'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'*/],

					//Abbreviated names of days-of-week.
					dayNamesShort: [<?php echo stripslashes_deep($espresso_calendar['espresso_calendar_dayNamesShort']);?>/*'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'*/],

					//Load the events into json srrsy
					events: <?php echo json_encode($events)?>,
					loading: function(bool) {
						if (bool) $('#loading').show();
						else $jaer('#loading').hide();
					}

				});
				// this line was overriding the cal_view defined inthe shortcode
				//$jaer('#espresso_calendar').fullCalendar('changeView','month');
			});

	</script>

		<div id='espresso_calendar'></div>
	<?php
		$buffer = ob_get_contents();
		ob_end_clean();
		return $buffer;
		//End calendar output
	}
}
add_shortcode('ESPRESSO_CALENDAR', 'espresso_calendar');

/*
events: [
      <% @schedule.events.each do |event| %>
      {
        // Render your events here as needed
        // I added a custom attribute called eventDeleteLink, to be used below
      },
      <% end %>
    ],
    // Add this piece:
    eventRender: function(event, element) {
      element.find(".fc-event-time").append(" " + event.eventDeleteLink);
    }
*/
