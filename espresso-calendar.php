<?php
/*
Plugin Name: Event Espresso - Calendar
Plugin URI: http://www.eventespresso.com
Description: A full calendar addon for Event Espresso. Includes month, week, and day views.
Version: 2.0
Author: Seth Shoultes
Author URI: http://www.eventespresso.com
Copyright 2011Seth Shoultes(email : seth@eventespresso.com)

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License, version 2, as
published by the Free Software Foundation.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA02110-1301USA
*/

//Define the version of the plugin
function espresso_calendar_version() {
	return '2.0';
}
define("ESPRESSO_CALENDAR_VERSION", espresso_calendar_version() );

 $wp_plugin_url = WP_PLUGIN_URL;

 if (is_ssl()){

$wp_plugin_url = str_replace( 'http://' , 'https://' ,WP_PLUGIN_URL );

 }

//Define the plugin directory and path
define("ESPRESSO_CALENDAR_PLUGINPATH", "/" . plugin_basename( dirname(__FILE__) ) . "/");
define("ESPRESSO_CALENDAR_PLUGINFULLPATH", WP_PLUGIN_DIR . ESPRESSO_CALENDAR_PLUGINPATH);
define("ESPRESSO_CALENDAR_PLUGINFULLURL", $wp_plugin_url . ESPRESSO_CALENDAR_PLUGINPATH );

//Globals
global $espresso_calendar;
$espresso_calendar = get_option('espresso_calendar_settings');

//Install the plugin
function espresso_calendar_install(){
	$espresso_calendar = array(
					'calendar_pages' => "0",
					'espresso_page_post' => "R",
					'espresso_calendar_header' => "left: 'prev, today', center: 'title', right: 'month,agendaWeek,agendaDay,next'",
					'espresso_calendar_buttonText' => "left: 'prev, today', center: 'title', right: 'month,agendaWeek,agendaDay,next'",
					'espresso_calendar_firstday' => '0',
					'espresso_calendar_weekends' => 'true',
					'espresso_calendar_height' => '650',
					'espresso_calendar_width' => '2',
					'enable_calendar_thumbs' => false,
					'calendar_thumb_size' => 'small',
					'show_tooltips' => 'Y',
					'espresso_use_pickers' => false,
					'ee_event_background' => 'ffffff',
					'ee_event_text_color' => '555555',
					'enable_cat_classes' => false, 
					'time_format' => get_option('time_format'),
					'show_time' => 'true',
					'use_themeroller' => 'false',
					'espresso_calendar_titleFormat' => "month: 'MMMM yyyy', week: \"MMM d[ yyyy]{ '—'[ MMM] d yyyy}\", day: 'dddd, MMM d, yyyy'",
					'espresso_calendar_columnFormat' => "month: 'ddd', week: 'ddd M/d', day: 'dddd M/d'",
					'espresso_calendar_monthNames' => "'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'",
					'espresso_calendar_monthNamesShort' => "'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'",
					'espresso_calendar_dayNames' => "'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'",
					'espresso_calendar_dayNamesShort' => "'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'"
				);
	update_option( 'espresso_calendar_settings', $espresso_calendar );
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
	global $wpdb, $espresso_calendar, $org_options, $notices;

	/*Calendar*/
	function espresso_calendar_updated(){
	global $notices;
	}

	if (isset($_POST['update_calendar'])  && check_admin_referer('espresso_form_check', 'update_calendar') ) {
		$espresso_calendar['espresso_page_post'] = $_POST['espresso_page_post'];
		$espresso_calendar['espresso_calendar_header'] = $_POST['espresso_calendar_header'];
		$espresso_calendar['espresso_calendar_buttonText'] = $_POST['espresso_calendar_buttonText'];
		$espresso_calendar['espresso_calendar_firstday'] = $_POST['espresso_calendar_firstday'];
		$espresso_calendar['espresso_calendar_weekends'] = $_POST['espresso_calendar_weekends'];
		$espresso_calendar['espresso_calendar_height'] = $_POST['espresso_calendar_height'];
		$espresso_calendar['espresso_calendar_width'] = $_POST['espresso_calendar_width'];
		$espresso_calendar['enable_calendar_thumbs'] = $_POST['enable_calendar_thumbs'];
		$espresso_calendar['calendar_thumb_size'] = (!empty($_POST['calendar_thumb_size']))? $_POST['calendar_thumb_size']: $espresso_calendar['calendar_thumb_size'];
		$espresso_calendar['show_tooltips'] = $_POST['show_tooltips'];
		$espresso_calendar['show_time'] = $_POST['show_time'];
		$espresso_calendar['time_format'] = $_POST['time_format_custom'];
		$espresso_calendar['espresso_use_pickers'] = $_POST['espresso_use_pickers'];
		$espresso_calendar['ee_event_background'] = (!empty($_POST['ee_event_background']) )? $_POST['ee_event_background'] : $espresso_calendar['ee_event_background'];
		$espresso_calendar['ee_event_text_color'] = (!empty($_POST['ee_event_text_color']) )? $_POST['ee_event_text_color'] : $espresso_calendar['ee_event_text_color'];
		$espresso_calendar['enable_cat_classes'] = $_POST['enable_cat_classes'];
		$espresso_calendar['use_themeroller'] = $_POST['use_themeroller'];
		$espresso_calendar['espresso_calendar_titleFormat'] = $_POST['espresso_calendar_titleFormat'];
		$espresso_calendar['espresso_calendar_columnFormat'] = $_POST['espresso_calendar_columnFormat'];
		$espresso_calendar['espresso_calendar_monthNames'] = $_POST['espresso_calendar_monthNames'];
		$espresso_calendar['espresso_calendar_monthNamesShort'] = $_POST['espresso_calendar_monthNamesShort'];
		$espresso_calendar['espresso_calendar_dayNames'] = $_POST['espresso_calendar_dayNames'];
		$espresso_calendar['espresso_calendar_dayNamesShort'] = $_POST['espresso_calendar_dayNamesShort'];
		$espresso_calendar['calendar_pages'] = $_POST['calendar_pages']==''?0:$_POST['calendar_pages'];

		update_option( 'espresso_calendar_settings', $espresso_calendar);
		add_action( 'admin_notices', 'espresso_calendar_updated');
		$notices['updates'][] = __('The calendar settings were saved ', 'event_espresso');
	}
	if ($_REQUEST['reset_calendar']=='true' && check_admin_referer('espresso_form_check', 'reset_calendar')) {
		delete_option("espresso_calendar_settings");
		espresso_calendar_install();
		$notices['updates'][] = __('The calendar settings were reset ', 'event_espresso');
	}
	$espresso_calendar = get_option('espresso_calendar_settings');

	// checks value of calendar thumb size to set radio inputs
	function espresso_is_selected($name) {
		global $espresso_calendar;
		$input_val = $name;
		if ($espresso_calendar['calendar_thumb_size'] !== $input_val)
		return false;
		else
		echo'checked="checked"';
		return; 
	}

	$values=array(
		
		array('id'=>'false','text'=> __('No','event_espresso')),
		array('id'=>'true','text'=> __('Yes','event_espresso'))
	);
################## Begin admin settings screen ###########################
	?>

<div id="ee-calendar-settings" class="wrap meta-box-sortables ui-sortable">
	<div id="icon-options-event" class="icon32"> </div>
	<h2>
		<?php _e('Event Espresso - Calendar Settings','event_espresso'); ?>
	</h2>
	<?php do_action( 'action_hook_espresso_admin_notices'); ?>
	<div id="poststuff" class="metabox-holder has-right-sidebar">
		<?php event_espresso_display_right_column ();?>
		<div id="post-body">
			<div id="post-body-content"> 
				
				<!-- begin left column metaboxes-->
				
				<div class="meta-box-sortables ui-sortables">
					<form class="espresso_form" method="post" action="<?php echo $_SERVER['REQUEST_URI']?>">
						<div class="metabox-holder">
							<div class="postbox">
								<div title="Click to toggle" class="handlediv"><br />
								</div>
								<h3 class="hndle">
									<?php _e('Calendar Usage','event_espresso'); ?>
								</h3>
								<div class="inside">
									<div class="padding">
										<ul>
											<li> <strong>
												<?php _e('Directions:', 'event_espresso'); ?>
												</strong><br />
												<?php _e(' Add [ESPRESSO_CALENDAR] to any page or post to display a calendar of Event Espresso events. Use [ESPRESSO_CALENDAR event_category_id="your_category_identifier"] to show events of a certain category (also creates a CSS using the category_identifier as the class name.) Use [ESPRESSO_CALENDAR show_expired="true"] to show expired events, can also be used inconjunction with the category ID.', 'event_espresso'); ?>
											</li>
											<li><strong>
												<?php _e('Examples Shortcodes:', 'event_espresso'); ?>
												</strong><br />
												[ESPRESSO_CALENDAR]<br />
												[ESPRESSO_CALENDAR show_expired="true"]<br />
												[ESPRESSO_CALENDAR event_category_id="your_category_identifier"]<br />
												[ESPRESSO_CALENDAR event_category_id="your_category_identifier" show_expired="true"]<br />
												[ESPRESSO_CALENDAR cal_view="month"] (Available parameters: month, basicWeek, basicDay, agendaWeek, agendaDay) </li>
											<li><strong>
												<?php _e('Styles/Colors:', 'event_espresso'); ?>
												</strong><br />
												<?php _e('To edit the calendar styles, copy the CSS file located in the plugin folder to your "wp-content/uploads/espresso/" directory. Then edit as needed. Refer to <a href="http://arshaw.com/fullcalendar/docs/event_rendering/Colors/" target="_blank">this page</a> for an example of styling the calendar and colors.', 'event_espresso'); ?>
											</li>
											<li><strong>
												<?php _e('Category Colors:', 'event_espresso'); ?>
												</strong><br />
												<?php _e('Event Categories can have their own colors on the calendar. To use this feature, simply create a class in theme CSS file with the names of your event categories. For more inforamtion <a href="http://eventespresso.com/forums/?p=650" target="_blank">please visit the tutorial</a> for this topic.', 'event_espresso'); ?>
											</li>
										</ul>
									</div>
									<!-- / .padding --> 
								</div>
								<!-- / .inside --> 
							</div>
							<!-- / .postbox --> 
						</div>
						<!-- / .metabox-holder --> 
						
						<!-- Calendar basic settings metabox -->
						<div class="metabox-holder">
							<div class="postbox">
								<div title="Click to toggle" class="handlediv"><br />
								</div>
								<h3 class="hndle">
									<?php _e('Basic Settings', 'event_espresso'); ?>
								</h3>
								<div class="inside">
									<div class="padding">
										<h4>
											<?php _e('Time/Date Settings', 'event_espresso'); ?>
										</h4>
										<table class="form-table">
											<tbody>
												<tr>
													<th> <label for="show_time">
															<?php _e('Show Event Time in Calendar','event_espresso'); ?>
															<?php echo apply_filters( 'filter_hook_espresso_help', 'show-event-times') ?>
														</label>
													</th>
													<td><?php
												 		echo select_input('show_time', $values, $espresso_calendar['show_time'], 'id="show_time"');
													?></td>
												</tr>
												<tr>
													<th><?php _e('Time Format') ?></th>
													<td><?php
														$espresso_calendar['time_format'] = empty($espresso_calendar['time_format']) ? get_option('time_format') : $espresso_calendar['time_format'];
														$time_formats = apply_filters( 'time_formats', array(
															__('g:i a'),
															'ga',
															'g:i A',
															'gA',
															'H:i',
														) );
													
														$custom = true;
													
														foreach ( $time_formats as $format ) {
															echo "\t<label title='" . esc_attr($format) . "'><input type='radio' name='time_format' value='" . esc_attr($format) . "'";
															if ( $espresso_calendar['time_format'] === $format ) { // checked() uses "==" rather than "==="
																echo " checked='checked'";
																$custom = false;
															}
															echo ' /> <span>' . date_i18n( $format ) . "</span></label><br />\n";
														}
													
														echo '	<label><input type="radio" name="time_format" id="time_format_custom_radio" value="\c\u\s\t\o\m"';
														checked( $custom );
														echo '/> ' . __('Custom:') . ' </label> <input type="text" name="time_format_custom" value="' . esc_attr( $espresso_calendar['time_format'] ) . '" class="small-text" /> ';
														echo '<span class="example"> ' . date_i18n( $espresso_calendar['time_format'] ) . "</span> <img class='ajax-loading' src='" . esc_url( admin_url( 'images/wpspin_light.gif' ) ) . "' alt='' />";
													?>
														<br />
														<span class="description"><a href="http://codex.wordpress.org/Formatting_Date_and_Time">
														<?php _e('Documentation on date and time formatting', 'event_espresso'); ?>
														</a></span></td>
												</tr>
												<tr>
													<th> <label for="espresso_calendar_firstday">
															<?php _e('First Day of the Week','event_espresso'); ?>
														</label>
													</th>
													<td><input id="espresso_calendar_firstday" type="text" name="espresso_calendar_firstday" size="10" maxlength="1" value="<?php echo $espresso_calendar['espresso_calendar_firstday'];?>" />
														<br />
														<span class="description">
														<?php _e('(Sunday=0, Monday=1, Tuesday=2, etc.)', 'event_espresso'); ?>
														</span></td>
												</tr>
												<tr>
													<th> <label for="espresso_calendar_weekends">
															<?php _e('Show Weekends','event_espresso'); ?>
														</label>
													</th>
													<td><?php echo select_input('espresso_calendar_weekends', $values, $espresso_calendar['espresso_calendar_weekends'], 'id="espresso_calendar_weekends"'); ?></td>
												</tr>
											</tbody>
										</table>
										<h4>
											<?php _e('Page Settings', 'event_espresso'); ?>
										</h4>
										<table class="form-table">
											<tbody>
												<tr>
													<th> <label for="espresso_calendar_height">
															<?php _e('Height','event_espresso'); ?>
														</label>
													</th>
													<td><input id="espresso_calendar_height" type="text" name="espresso_calendar_height" size="100" maxlength="100" value="<?php echo $espresso_calendar['espresso_calendar_height'];?>" />
														<br />
														<span class="description">
														<?php _e('Will make the entire calendar (including header) a pixel height.', 'event_espresso'); ?>
														</span></td>
												</tr>
												<tr>
													<th> <label for="calendar_pages">
															<?php _e('Page(s) Displaying the Calendar', 'event_espresso'); ?>
															<?php echo apply_filters( 'filter_hook_espresso_help', 'display-on-pages') ; ?>
														</label>
													</th>
													<td><input id="calendar_pages" type="text" name="calendar_pages" size="100" maxlength="100" value="<?php echo $espresso_calendar['calendar_pages']==''?0:$espresso_calendar['calendar_pages'];?>" />
														<br />
														<span class="description">
														<?php _e('This tells the plugin to load the calendar CSS file on specific pages. This should be a comma seperated list of page ids.', 'event_espresso'); ?>
														</span></td>
												</tr>
												<tr>
													<th> <label for="calendar_page_post">
															<?php _e('Link to Post or Registration Page','event_espresso'); ?>
															<?php echo apply_filters( 'filter_hook_espresso_help', 'display-where') ?>
														</label>
													</th>
													<td><?php echo select_input('espresso_page_post',array(array('id'=>'R','text'=> __('Registration Page','event_espresso')),array('id'=>'P','text'=> __('Post','event_espresso'))), $espresso_calendar['espresso_page_post'], 'id="calendar_page_post"');?> <br />
														<span class="description">
														<?php _e('If you are using the "Create a Post" feature. Use this option to link to the posts that are created by Event Espresso.', 'event_espresso'); ?>
														</span></td>
												</tr>
												<tr>
													<th> <label for="enable-calendar-thumbs">
															<?php _e('Enable Images in Calendar', 'event_espresso'); ?>
														</label>
													</th>
													<td><?php echo select_input('enable_calendar_thumbs', $values, $espresso_calendar['enable_calendar_thumbs'], 'id="enable-calendar-thumbs"');?>
														</li></td>
												</tr>
												<tr>
												<tr id="thumbnail-sizes">
													<th>
														<?php _e('Thumbnail Size', 'event_espresso'); ?>
														<?php echo apply_filters( 'filter_hook_espresso_help', 'calendar-thumb-sizes'); ?>
													</th>
													<td><input id="calendar-thumb-size-sml" type="radio" name="calendar_thumb_size" <?php espresso_is_selected('small')?> value="small" />
														<label for="calendar-thumb-size-sml">
															<?php _e('Small (50px high)', 'event_espresso') ?>
														</label>
														<br />
														<input id="calendar-thumb-size-med" type="radio" name="calendar_thumb_size" <?php espresso_is_selected('medium')?> value="medium" />
														<label for="calendar-thumb-size-med">
															<?php _e('Medium (100px high)', 'event_espresso')?>
														</label>
														<br />
														<input id="calendar-thumb-size-lrg" type="radio" name="calendar_thumb_size" <?php espresso_is_selected('large')?> value="large" />
														<label for="calendar-thumb-size-lrg">
															<?php _e('Large (150px high)', 'event_espresso')?>
														</label></td>
												</tr>
											</tbody>
										</table>
										<h4>
											<?php _e('Theme Settings', 'event_espresso'); ?>
										</h4>
										<?php
										$disabled = !empty($org_options['themeroller']['use_themeroller']) && ($org_options['themeroller']['use_themeroller'] == 'N' || $org_options['themeroller']['use_themeroller'] == '') ? 'disabled="disabled"' : '';
										$styled = ( !empty($disabled) ) ? 'style="color: #ccc;"' : '';
												?>
										<table class="form-table">
											<tbody>
												<tr>
													<th> <label for="use_themeroller">
															<?php _e('Enable Themeroller','event_espresso'); ?>
														</label>
													</th>
													<td><?php echo select_input('use_themeroller', $values, $espresso_calendar['use_themeroller'], 'id="use_themeroller" class"'.$styled.'" '.$disabled); ?></td>
												</tr>
												<tr>
													<th> <label for="espresso_use_pickers">
															<?php _e('Use Color Pickers', 'event_espresso'); ?>
														</label>
													</th>
													<td><?php echo select_input('espresso_use_pickers', $values, $espresso_calendar['espresso_use_pickers'], 'id="espresso_use_pickers"'); ?></td>
												</tr>
												<tr class="color-picker-selections">
													<th class="color-picker-style"> <label for="event-background">
															<?php _e('Event Background - color picker', 'event_espresso') ?>
														</label>
													</th>
													<td><input id="event-background"type="text" name="ee_event_background" <?php echo (isset($espresso_calendar['ee_event_background']) && !empty($espresso_calendar['ee_event_background']))? 'value="' . $espresso_calendar['ee_event_background'] . '"' : '' ?> /></td>
												</tr>
												<tr class="color-picker-selections">
													<th class="color-picker-style"> <label for="event-text">
															<?php _e('Event Text - color picker', 'event_espresso') ?>
														</label>
													</th>
													<td><input id="event-text"type="text" name="ee_event_text_color" <?php echo (isset($espresso_calendar['ee_event_text_color']) && !empty($espresso_calendar['ee_event_text_color']))? 'value="' . $espresso_calendar['ee_event_text_color'] . '"' : '' ?> /></td>
												</tr>
												<tr> 
													
													
											<tr>
												<th> 
													<label for="show_tooltips">
														<?php _e('Show Tooltips', 'event_espresso'); ?><?php echo apply_filters( 'filter_hook_espresso_help', 'show_tooltips_info') ?>
													</label>
												</th>
												<td>
													<?php echo select_input('show_tooltips',array(array('id'=>'Y','text'=> __('Yes','event_espresso')),array('id'=>'N','text'=> __('No','event_espresso'))), $espresso_calendar['show_tooltips'], 'id="show_tooltips"');?>
												</td>
											</tr>
											
												<tr>
													<th> <label for="enable-cat-classes">
															<?php _e('Enable CSS for Categories', 'event_espresso'); ?>
															<?php echo apply_filters( 'filter_hook_espresso_help', 'enable-categories') ?>
														</label>
													</th>
													<td><?php echo select_input('enable_cat_classes',array(array('id'=>'Y','text'=> __('Yes','event_espresso')),array('id'=>'N','text'=> __('No','event_espresso'))), $espresso_calendar['enable_cat_classes'], 'id="enable-cat-classes"');?></td>
												</tr>
											</tbody>
										</table>
										<p>
											<input class="button-primary" type="submit" name="save_calendar_settings" value="<?php _e('Save Calendar Options', 'event_espresso'); ?>" id="save_calendar_settings2" />
											<?php wp_nonce_field( 'espresso_form_check', 'update_calendar' ) ?>
										</p>
									</div>
									<!-- / .padding --> 
								</div>
								<!-- / .inside --> 
							</div>
							<!-- / .postbox --> 
						</div>
						<!-- / .metabox-holder --> 
						
						<!-- Advanced settings metabox -->
						<div class="metabox-holder">
							<div class="postbox">
								<h3 class="hndle">
									<?php _e('Advanced Settings', 'event_espresso'); ?>
								</h3>
								<div class="inside">
									<div class="padding">
										<table class="form-table">
											<tbody>
												<tr>
													<th><?php _e('Header Style','event_espresso'); ?>
														<?php echo apply_filters( 'filter_hook_espresso_help', 'calendar_header_info') ?></th>
													<td><textarea name="espresso_calendar_header" id="espresso_calendar_header" cols="30" rows="5"><?php echo stripslashes_deep($espresso_calendar['espresso_calendar_header']) ?></textarea>
														<br />
														<span class="description">
														<?php _e('Defines the buttons and title at the top of the calendar.', 'event_espresso'); ?>
														</span></td>
												</tr>
												<tr>
													<th><?php _e('Button Text','event_espresso'); ?>
														<?php echo apply_filters( 'filter_hook_espresso_help', 'calendar_buttonText_info') ?>
													</th>
													<td><textarea name="espresso_calendar_buttonText" id="espresso_calendar_buttonText" cols="30" rows="5"><?php echo stripslashes_deep($espresso_calendar['espresso_calendar_buttonText']) ?></textarea>
														<br />
														<span class="description">
														<?php _e('Text that will be displayed on buttons of the header.', 'event_espresso'); ?>
														</span></td>
												</tr>
												<tr>
													<th><?php _e('Title Format','event_espresso'); ?>
														<?php echo apply_filters( 'filter_hook_espresso_help', 'calendar_titleFormat_info') ?></th>
													<td><textarea name="espresso_calendar_titleFormat" id="espresso_calendar_titleFormat" cols="30" rows="5"><?php echo stripslashes_deep($espresso_calendar['espresso_calendar_titleFormat']) ?></textarea>
														<br />
														<span class="description">
														<?php _e('Determines the text that will be displayed in the header\'s title.', 'event_espresso'); ?>
														</span></td>
												</tr>
												<tr>
													<th><?php _e('Column Format','event_espresso'); ?>
														<?php echo apply_filters( 'filter_hook_espresso_help', 'calendar_columnFormat_info') ?></th>
														</th>
													<td><textarea name="espresso_calendar_columnFormat" id="espresso_calendar_columnFormat" cols="30" rows="5"><?php echo stripslashes_deep($espresso_calendar['espresso_calendar_columnFormat']) ?></textarea>
														<br />
														<span class="description">
														<?php _e('Determines the text that will be displayed on the calendar\'s column headings.', 'event_espresso'); ?>
														</span></td>
												</tr>
												<tr>
													<th><?php _e('Month Names','event_espresso'); ?>
														<?php echo apply_filters( 'filter_hook_espresso_help', 'calendar_monthNames_info') ?></th>
													<td><textarea name="espresso_calendar_monthNames" id="espresso_calendar_monthNames" cols="30" rows="5"><?php echo stripslashes_deep($espresso_calendar['espresso_calendar_monthNames']) ?></textarea>
														<br />
														<span class="description">
														<?php _e('Full names of months.', 'event_espresso'); ?>
														</span></td>
												</tr>
												<tr>
													<th><?php _e('Month Names Short','event_espresso'); ?>
														<?php echo apply_filters( 'filter_hook_espresso_help', 'calendar_monthNamesShort_info') ?></th>
													<td><textarea name="espresso_calendar_monthNamesShort" id="espresso_calendar_monthNamesShort" cols="30" rows="5"><?php echo stripslashes_deep($espresso_calendar['espresso_calendar_monthNamesShort']) ?></textarea>
														<br />
														<span class="description">
														<?php _e('Abbreviated names of months.', 'event_espresso'); ?>
														</span></td>
												</tr>
												<tr>
													<th><?php _e('Day Names','event_espresso'); ?>
														<?php echo apply_filters( 'filter_hook_espresso_help', 'calendar_dayNames_info') ?></th>
													<td><textarea name="espresso_calendar_dayNames" id="espresso_calendar_dayNames" cols="30" rows="5"><?php echo stripslashes_deep($espresso_calendar['espresso_calendar_dayNames']) ?></textarea>
														<br />
														<span class="description">
														<?php _e('Full names of days-of-week.', 'event_espresso'); ?>
														</span></td>
												</tr>
												<tr>
													<th><?php _e('Day Names Short','event_espresso'); ?>
														<?php echo apply_filters( 'filter_hook_espresso_help', 'calendar_dayNamesShort_info') ?></th>
													<td><textarea name="espresso_calendar_dayNamesShort" id="espresso_calendar_dayNamesShort" cols="30" rows="5"><?php echo stripslashes_deep($espresso_calendar['espresso_calendar_dayNamesShort']) ?></textarea>
														<br />
														<span class="description">
														<?php _e('Abbreviated names of days-of-week.', 'event_espresso'); ?>
														</span></td>
												</tr>
											</tbody>
										</table>
										<input type="hidden" name="update_calendar" value="update" />
										<p>
											<input class="button-primary" type="submit" name="Submit" value="<?php _e('Save Calendar Options', 'event_espresso'); ?>" id="save_calendar_settings_1" />
											<?php wp_nonce_field( 'espresso_form_check', 'update_calendar' ) ?>
										</p>
										<p>
											<?php _e('Reset Calendar Settings?', 'event_espresso'); ?>
											<input name="reset_calendar" type="checkbox" value="true" />
											<?php wp_nonce_field( 'espresso_form_check', 'reset_calendar' ) ?>
										</p>
									</div>
									<!-- / .padding --> 
								</div>
								<!-- / .inside --> 
							</div>
							<!-- / .postbox --> 
						</div>
						<!-- / .metabox-holder --> 
						<!--</li>
</ul>-->
					</form>
					<?php include_once('calendar_help.php'); ?>
				</div>
				<!-- / .meta-box-sortables --> 
			</div>
			<!-- / #post-body-content --> 
		</div>
		<!-- / #post-body --> 
	</div>
	<!-- / #poststuff --> 
</div>
<!-- / #wrap --> 
<script type="text/javascript">
//<![CDATA[
jQuery(document).ready(function($){
		$("input[name='time_format']").click(function(){
			if ( "time_format_custom_radio" != $(this).attr("id") )
				$("input[name='time_format_custom']").val( $(this).val() ).siblings('.example').text( $(this).siblings('span').text() );
		});
		$("input[name='time_format_custom']").focus(function(){
			$("#time_format_custom_radio").attr("checked", "checked");
		}); 
				
		// disable color picker & thumb sizes inputs & fade if not use controls true
		window.scp = $('select#espresso_use_pickers option:selected').val();
		window.ect = $('select#enable-calendar-thumbs option:selected').val();

			if(window.scp == 'false'){
				$('input#event-background, input#event-text').attr('disabled', true);
				$('.color-picker-style').attr('style', "opacity: .3");
				$('tr.color-picker-selections th, tr.color-picker-selections td').attr('style', "opacity: .3");
			}
			if(window.ect == 'false'){
				$('tr#thumbnail-sizes td input').attr('disabled', true);
				$('tr#thumbnail-sizes').attr('style', "opacity: .3");
			}
		$('select#enable-calendar-thumbs').change(function(){
			window.ect = $('select#enable-calendar-thumbs option:selected').val();
			if(window.ect == 'false'){
				$('tr#thumbnail-sizes td input').attr('disabled', true);
				$('tr#thumbnail-sizes').attr('style', "opacity: .3");
			}else{
				$('tr#thumbnail-sizes td input').removeAttr('disabled', true);
				$('tr#thumbnail-sizes').removeAttr('style', "opacity: .3");
			}		
		});
		$('select#espresso_use_pickers').change(function(){
			window.scp = $('select#espresso_use_pickers option:selected').val();
			if(window.scp == 'false'){
				$('input#event-background, input#event-text').attr('disabled', true);
				$('tr.color-picker-selections th, tr.color-picker-selections td').attr('style', "opacity: .3");
			}else {	
			 	$('input#event-background, input#event-text').removeAttr('disabled', true);
				$('tr.color-picker-selections th, tr.color-picker-selections td').removeAttr('style');
			}
		});		

		// color picker initialisation 
			$('input#event-background, input#event-text').wheelColorPicker({ 
			dir: '<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>scripts/wheelcolorpicker',
				preview: true,
				userinput: true,
				format: 'hex',
				validate: true
			});
		
		// WP toggle function		
		postboxes.add_postbox_toggles('espresso_calendar');

	});

//]]>
</script>
<?php
}
// configure scripts and styles for event background color picker
if(is_admin()){
	
	function espresso_calendar_load_admin_scripts() {
				wp_register_script('wheelcolorpicker',EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/wheelcolorpicker/jquery.wheelcolorpicker.min.js', array('jquery') );
				wp_enqueue_script('wheelcolorpicker');
	}
	add_action('admin_init', 'espresso_calendar_load_admin_scripts');	
}

################## finish admin screen settings ###########################

//Load the scripts and css
if (!function_exists('espresso_init_calendar')) {
	function espresso_init_calendar() {
		global $espresso_calendar, $load_espresso_calendar_scripts;
		if ( ! $load_espresso_calendar_scripts )
			return;

		wp_enqueue_script('jquery');
		
		wp_register_script('fullcalendar-min-js',ESPRESSO_CALENDAR_PLUGINFULLURL.'scripts/fullcalendar.min.js', array('jquery') );//core calendar script
		wp_print_scripts('fullcalendar-min-js');
		
		//Load tooltips script
		if (isset($espresso_calendar['show_tooltips'])){
			if ($espresso_calendar['show_tooltips'] == 'Y'){
				wp_register_script('jquery-qtip',ESPRESSO_CALENDAR_PLUGINFULLURL.'scripts/jquery.qtip.js', array('jquery') );//core calendar script
				wp_print_scripts('jquery-qtip');
			}
		}
	}
}
add_action('wp_footer', 'espresso_init_calendar',20);

if (!function_exists('espresso_init_calendar_style')) {
	function espresso_init_calendar_style() {
		global $espresso_calendar;
		$page_array= explode(',', $espresso_calendar['calendar_pages']);
		//print_r($page_array);
		if ($espresso_calendar['calendar_pages']!=0){
			if (!is_page($page_array)){
				return;
			}
		}

		//Check to see if the calendar css file exists in the '/uploads/espresso/' directory
		if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR."css/calendar.css")){
			wp_register_style('calendar', EVENT_ESPRESSO_UPLOAD_URL.'css/calendar.css');//This is the url to the css file if available
		}else{
			wp_register_style('calendar', ESPRESSO_CALENDAR_PLUGINFULLURL.'css/calendar.css');//calendar core style
		}
		wp_enqueue_style( 'calendar');
		
		//Load tooltips styles
		if (isset($espresso_calendar['show_tooltips'])){
			if ($espresso_calendar['show_tooltips'] == 'Y'){
				wp_register_style('qtip', ESPRESSO_CALENDAR_PLUGINFULLURL.'css/jquery.qtip.css');//calendar core style
				wp_enqueue_style( 'qtip');
			}
		}

	}
}
add_action('wp_print_styles', 'espresso_init_calendar_style',30);

// Add our embedded head styles for color picker selection 
if($espresso_calendar['espresso_use_pickers'] == 'true') { 
	function event_background_selection() {
		global $espresso_calendar;
?>
		<style type="text/css">
<?php 
		if( isset( $espresso_calendar['ee_event_background']) && !empty($espresso_calendar['ee_event_background']) ) {
?>
			.fc-event-skin {
				background-color: #<?php echo $espresso_calendar['ee_event_background'] ?>;
				border: 1px solid #<?php echo $espresso_calendar['ee_event_background'] ?>;
			}
<?php 
		}

		if( isset( $espresso_calendar['ee_event_text_color']) && !empty($espresso_calendar['ee_event_text_color']) ) {
?>
			.fc-event-title, .time-display-block {
				color: #<?php echo $espresso_calendar['ee_event_text_color'] ?>;
			}
<?php 
		}
?>
		</style>
<?php
		 return;
	}
	add_action('wp_head', 'event_background_selection');	
}// close if use picker is Yes

//Build the short code
//[ESPRESSO_CALENDAR]
//[ESPRESSO_CALENDAR show_expired="true"]
//[ESPRESSO_CALENDAR event_category_id="your_category_identifier"]
if (!function_exists('espresso_calendar')) {
	function espresso_calendar ($atts){
		global $wpdb, $org_options, $espresso_calendar, $load_espresso_calendar_scripts;
		
		//print_r($espresso_calendar);
		
		$load_espresso_calendar_scripts = true;//This tells the plugin to load the required scripts

		extract(shortcode_atts(array('event_category_id' => '', 'show_expired' => 'false', 'cal_view' => 'month'), $atts));
		$event_category_id= "{$event_category_id}";
		$show_expired= "{$show_expired}";
		$cal_view= "{$cal_view}";

		//Build the SQL to run

		//Get the categories
		if ($event_category_id != "" ){
			$sql = "SELECT e.*, c.category_name, c.category_desc, c.display_desc, ese.start_time, ese.end_time FROM ". EVENTS_DETAIL_TABLE . " e ";
			$sql .= " JOIN " . EVENTS_CATEGORY_REL_TABLE . " r ON r.event_id = e.id ";
			$sql .= " JOIN " . EVENTS_CATEGORY_TABLE . " c ON c.id = r.cat_id ";
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

		//Debug
		//echo '<p>$sql - '.$sql.'</p>';
		

		// grab the thumbnail size from calendar options settings
		if(empty($espresso_calendar['calendar_thumb_size'])) {
			$ee_img_size = 'small';
		}else{
			$ee_img_size = $espresso_calendar['calendar_thumb_size'];
		}
		
		$events_data = $wpdb->get_results($sql);
	 
		$events = array();

		foreach ($events_data as $event){
			
			//Debug:
			//Print the category id for each event.
			//print_r( espresso_event_category_data($event->id) );
			
			//Get details about the category of the event
			$category_data = espresso_event_category_data($event->id);
			$event_meta = unserialize($event->event_meta);
			
			//Debug:
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
			if ( isset($org_options['template_settings']['display_short_description_in_event_list']) && $org_options['template_settings']['display_short_description_in_event_list'] == 'Y' ) {
				$eventArray['description'] = array_shift(explode('<!--more-->', $eventArray['description']));
			}

			//Get the start and end times for each event
			//important! time must be in iso8601 format 2010-05-10T08:30!!
			$eventArray['start'] = date("c", strtotime($event->start_date . ' ' . event_date_display($event->start_time, get_option('time_format')) ));
			$eventArray['end'] = date("c", strtotime($event->end_date . ' ' .event_date_display($event->end_time, get_option('time_format')) ));
			$eventArray['startTime'] = event_date_display($event->start_time, $espresso_calendar['time_format']);
			$eventArray['endTime'] = event_date_display($event->end_time, $espresso_calendar['time_format']);	
 
			// Add thumb to eventArray
			$eventArray['event_img_thumb'] = '';
			if ($espresso_calendar['enable_calendar_thumbs'] == 'true'){
				if( !empty($event_meta['event_thumbnail_url']) ) {
					$calendar_thumb = $event_meta['event_thumbnail_url'];
					//Debug:
					//echo '<a href="' . $registration_url . '"><img class="event-id-'. $event->id . '" src="'. $calendar_thumb . '" alt="" title="' . $ee_event_title . '" / ></a>';
					if ( !empty($event_meta['display_thumb_in_calendar']) ) {
						if ($event_meta['display_thumb_in_calendar'] == 'Y'){
							$eventArray['event_img_thumb'] = $calendar_thumb ;
						}
					}
				}
			}
			
			//Custom fields: 
			//These can be used to perform special functions in your display.

			//This decalares the category ID as the CSS class name
			$eventArray['className'] = '';
			$eventArray['eventType'] = '';
			if ( isset($espresso_calendar['enable_cat_classes']) && $espresso_calendar['enable_cat_classes'] == 'Y' ) {
				$sql_categories = "SELECT * FROM ".EVENTS_CATEGORY_REL_TABLE." WHERE event_id='".$event->id."'";
				$categories_data = $wpdb->get_results($sql_categories);
			
				$cssClass = $category_data['category_identifier'];
				foreach($categories_data as $_category){
					if(isset($categoryCss[$_category->cat_id])){
						$cssClass .=' '.$categoryCss[$_category->cat_id] ;
						continue;
					}
					$sql_cat = "SELECT * FROM ".EVENTS_CATEGORY_TABLE." WHERE id='".$_category->cat_id."'";
					$category = $wpdb->get_results($sql_cat);
					foreach($category as $_cat){
						$cssClass .=' '.$_cat->category_identifier ;
						$categoryCss[$_category->cat_id] = $_cat->category_identifier;
						continue;
					}
				}
			 	//var_dump($cssClass);
				$eventArray['className'] = $cssClass;
				
				//This can be used to use the category id as the event type
				$eventArray['eventType'] = $category_data['category_name'];
				
			 }//end if user enabled cat for classes
			
			//End custom fields

			//If set to true, events will be shown as all day events
			$eventArray['allDay'] = FALSE;
 
			// Set sizes for image display
			$eventArray['img_size_class'] = $ee_img_size;
 
			//Array of the event details
			$events[] = $eventArray; 
		}
		//Debug:
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

					//jQuery UI Themeroller
					//Enables/disables use of jQuery UI theming.
					//Settings: http://arshaw.com/fullcalendar/docs/display/theme/
					<?php 
					if ( $espresso_calendar['use_themeroller'] == 'true' ){
						if ( !empty($org_options['style_settings']['enable_default_style']) ){
							if ( $org_options['style_settings']['enable_default_style'] == 'Y' ){
								if ( $org_options['themeroller']['themeroller_style'] !='' ){
									echo "theme: true,";
								}
							}
						}
					}
					
					?>

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
						'': ''// 7p
					},

					//Changes the colors of the events as seen here:
					//http://code.google.com/p/fullcalendar/issues/detail?id=6&can=1&q=css&colspec=ID%20Type%20Status%20Milestone%20Summary%20Stars
					eventRender: function(event, element) {
 
						// set an event category class
						//alert(event.className);
						if(event.className){
							element.find('a').addClass(event.className);
						}
						//This displays the title of the event when hovering
						//element.attr('title', event.title + " - Event Times: " + event.start + event.end);
						 
						// if the user selects show in thickbox we add this element
						//if(event.in_thickbox_url){
						//element.after($jaer('<div style="display: none;"><div id="event-thumb-detail-' + event.id+ '"><h2 class="tb-event-title">' + event.title + '</h2><p class="tb-event-start">Event start: ' + event.start + '</p><p class="tb-event-end">Event End: ' + event.end + '</p>' + event.description + '<p class="tb-reg-link"><a href="' + event.url + '"title="Go to registration page for this event">Register for this event</a></p></div></div>'));
						//}
						
						if(event.event_img_thumb){
							//alert('we have thumbs');
							
							element.addClass('event-has-thumb');
							
						 	element.find('.fc-event-title').after($jaer('<span class="thumb-wrap"><img class="ee-event-thumb ' + event.img_size_class + '" src="' + event.event_img_thumb + '" alt="image of ' + event.title + '" \/></span>'));
						 }
						//Shows spaces available
						//element.find('.fc-event-title').after($jaer('<p class="time-display-block event-start-time">Spaces: <?php echo get_number_of_attendees_reg_limit($event->id, 'num_attendees_slash_reg_limit', 'All Seats Reserved'); ?> </p>'));
						<?php 
						if ($espresso_calendar['show_time'] == 'true'){
						?>
							element.find('.fc-event-title').after($jaer('<p class="time-display-block"><span class="event-start-time">' + event.startTime + ' - </span><span class="event-end-time">' + event.endTime + '</span></p>'));
						<?php 
						}
						
						if (isset($espresso_calendar['show_tooltips'])){
							if ($espresso_calendar['show_tooltips'] == 'Y'){
						?>
								element.qtip({
									content: {
										text: event.description,
										title: {
											text: '<?php _e('Description', 'event_espresso'); ?>',
										}
		
									},
									position: {
										at: 'top right',
										adjust: {
         									x: 0, y: 30
										},
									},
									
									style: {//Additional informatio: http://craigsworks.com/projects/qtip2/docs/style/
										tip: {
											corner: 'left top'
										},
										classes: 'ui-tooltip-rounded ui-tooltip-shadow', //Themeroller styles
										/*
										  * The important part: style.widget property
										  
										  * This tells qTip to apply the ui-widget classes to
										  * the main, titlebar and content elements of the qTip.
										  * Otherwise they won't be applied and ThemeRoller styles
										  * won't effect this particular tooltip.
										*/
										widget: true
									}
								});
						<?php
							}
						}
						?>


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
						/*month: 'ddd',// Mon
						week: 'ddd M/d', // Mon 9/7
						day: 'dddd M/d'// Monday 9/7*/
					},

					//For date formatting options, please refer to: http://arshaw.com/fullcalendar/docs/utilities/formatDate/
					titleFormat:{ //Settings: http://arshaw.com/fullcalendar/docs/text/columnFormat/
						<?php echo stripslashes_deep($espresso_calendar['espresso_calendar_titleFormat']);?>
						/*month: 'MMMM yyyy', // September 2009
						week: "MMM d[ yyyy]{ '&#8212;'[ MMM] d yyyy}", // Sep 7 - 13 2009
						day: 'dddd, MMM d, yyyy'// Tuesday, Sep 8, 2009*/
					},

					//Text that will be displayed on buttons of the header.
					buttonText: { //Settings: http://arshaw.com/fullcalendar/docs/text/buttonText/
						<?php echo stripslashes_deep($espresso_calendar['espresso_calendar_buttonText']);?>
						/*prev: '&nbsp;&#9668;&nbsp;',// left triangle
						next: '&nbsp;&#9658;&nbsp;',// right triangle
						prevYear: '&nbsp;&lt;&lt;&nbsp;', // <<
						nextYear: '&nbsp;&gt;&gt;&nbsp;', // >>
						today:'today',
						month:'month',
						week: 'week',
						day:'day'*/
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