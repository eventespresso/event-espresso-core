<?php

function espresso_calendar_add_to_featured_image_meta_box($event_meta) {
	$values = array(
			array('id' => true, 'text' => __('Yes', 'event_espresso')),
			array('id' => false, 'text' => __('No', 'event_espresso')));
	?>
	<p>
		<label>
			<?php _e('Add image to event calendar', 'event_espresso'); ?>
		</label>
		<?php echo select_input('show_on_calendar', $values, isset($event_meta['display_thumb_in_calendar']) ? $event_meta['display_thumb_in_calendar'] : '', 'id="show_on_calendar"'); ?>
	</p>
	<?php
}

add_action('action_hook_espresso_featured_image_add_to_meta_box', 'espresso_calendar_add_to_featured_image_meta_box');

function espresso_add_calendar_to_admin_menu($espresso_manager) {
	add_submenu_page('events', __('Event Espresso - Calendar Settings', 'event_espresso'), __('Calendar', 'event_espresso'), apply_filters('filter_hook_espresso_management_capability', 'administrator', $espresso_manager['espresso_manager_calendar']), 'espresso_calendar', 'espresso_calendar_config_mnu');
}

add_action('action_hook_espresso_add_new_submenu_to_group_settings', 'espresso_add_calendar_to_admin_menu', 5);

function espresso_calendar_config_mnu() {
	global $wpdb, $espresso_calendar, $org_options, $notices;

	/* Calendar */

	function espresso_calendar_updated() {
		global $notices;
	}

	if (isset($_POST['update_calendar']) && check_admin_referer('espresso_form_check', 'update_calendar')) {
		$espresso_calendar['espresso_page_post'] = $_POST['espresso_page_post'];
		$espresso_calendar['espresso_calendar_header'] = $_POST['espresso_calendar_header'];
		$espresso_calendar['espresso_calendar_buttonText'] = $_POST['espresso_calendar_buttonText'];
		$espresso_calendar['espresso_calendar_firstday'] = $_POST['espresso_calendar_firstday'];
		$espresso_calendar['espresso_calendar_weekends'] = $_POST['espresso_calendar_weekends'];
		$espresso_calendar['espresso_calendar_height'] = $_POST['espresso_calendar_height'];
		$espresso_calendar['enable_calendar_thumbs'] = $_POST['enable_calendar_thumbs'];
		$espresso_calendar['show_tooltips'] = $_POST['show_tooltips'];
		$espresso_calendar['show_time'] = $_POST['show_time'];
		$espresso_calendar['time_format'] = $_POST['time_format_custom'];
		$espresso_calendar['espresso_use_pickers'] = $_POST['espresso_use_pickers'];
		$espresso_calendar['ee_event_background'] = (!empty($_POST['ee_event_background']) ) ? $_POST['ee_event_background'] : $espresso_calendar['ee_event_background'];
		$espresso_calendar['ee_event_text_color'] = (!empty($_POST['ee_event_text_color']) ) ? $_POST['ee_event_text_color'] : $espresso_calendar['ee_event_text_color'];
		$espresso_calendar['enable_cat_classes'] = $_POST['enable_cat_classes'];
		//$espresso_calendar['use_themeroller'] = $_POST['use_themeroller'];
		$espresso_calendar['espresso_calendar_titleFormat'] = $_POST['espresso_calendar_titleFormat'];
		$espresso_calendar['espresso_calendar_columnFormat'] = $_POST['espresso_calendar_columnFormat'];
		$espresso_calendar['espresso_calendar_monthNames'] = $_POST['espresso_calendar_monthNames'];
		$espresso_calendar['espresso_calendar_monthNamesShort'] = $_POST['espresso_calendar_monthNamesShort'];
		$espresso_calendar['espresso_calendar_dayNames'] = $_POST['espresso_calendar_dayNames'];
		$espresso_calendar['espresso_calendar_dayNamesShort'] = $_POST['espresso_calendar_dayNamesShort'];
		$espresso_calendar['calendar_pages'] = $_POST['calendar_pages'] == '' ? 0 : $_POST['calendar_pages'];

		update_option('espresso_calendar_settings', $espresso_calendar);
		add_action('admin_notices', 'espresso_calendar_updated');
		$notices['updates'][] = __('The calendar settings were saved ', 'event_espresso');
	}
	if (!empty($_REQUEST['reset_calendar']) && check_admin_referer('espresso_form_check', 'reset_calendar_nonce')) {
		delete_option("espresso_calendar_settings");
		espresso_calendar_install();
		$notices['updates'][] = __('The calendar settings were reset ', 'event_espresso');
	}
	$espresso_calendar = get_option('espresso_calendar_settings');

	$values = array(
			array('id' => false, 'text' => __('No', 'event_espresso')),
			array('id' => true, 'text' => __('Yes', 'event_espresso'))
	);
################## Begin admin settings screen ###########################
	?>
	<div id="ee-calendar-settings" class="wrap meta-box-sortables ui-sortable">
		<div id="icon-options-event" class="icon32"> </div>
		<h2>
			<?php _e('Event Espresso - Calendar Settings', 'event_espresso'); ?>
		</h2>
		<div id="poststuff" class="metabox-holder has-right-sidebar">
			<div id="side-info-column" class="inner-sidebar">
			<?php 
			//Right column menu
				if ( espresso_version() >= '3.2.P' ){
					do_meta_boxes('event-espresso_page_espresso_calendar', 'side', null);
				}else{
					event_espresso_display_right_column ();
				}
			?>
			</div>
			<div id="post-body">
				<div id="post-body-content">

					<!-- begin left column metaboxes-->

					<div class="meta-box-sortables ui-sortables">
						<form class="espresso_form" method="post" action="<?php echo $_SERVER['REQUEST_URI'] ?>">
							<div class="metabox-holder">
								<div class="postbox">
									<div title="Click to toggle" class="handlediv"><br />
									</div>
									<h3 class="hndle">
										<?php _e('Calendar Usage', 'event_espresso'); ?>
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
																<?php _e('Show Event Time in Calendar', 'event_espresso'); ?>
																<?php
																if ( espresso_version() >= '3.2.P' )
																	echo apply_filters('filter_hook_espresso_help', 'show-event-times')
																?>
															</label>
														</th>
														<td><?php
															echo select_input('show_time', $values, $espresso_calendar['show_time'], 'id="show_time"');
																?></td>
													</tr>
													<tr>
														<th><label for="time_format"><?php _e('Time Format') ?></label></th>
														<td><?php
														$espresso_calendar['time_format'] = empty($espresso_calendar['time_format']) ? get_option('time_format') : $espresso_calendar['time_format'];
														$time_formats = apply_filters('time_formats', array(
																__('g:i a'),
																'ga',
																'g:i A',
																'gA',
																'H:i',
																		));

														$custom = true;

														foreach ($time_formats as $format) {
															echo "\t<label title='" . esc_attr($format) . "'><input type='radio' name='time_format' value='" . esc_attr($format) . "'";
															if ($espresso_calendar['time_format'] === $format) { // checked() uses "==" rather than "==="
																echo " checked='checked'";
																$custom = false;
															}
															echo ' /> <span>' . date_i18n($format) . "</span></label><br />\n";
														}

														echo '	<label><input type="radio" name="time_format" id="time_format_custom_radio" value="\c\u\s\t\o\m"';
														checked($custom);
														echo '/> ' . __('Custom:') . ' </label> <input type="text" name="time_format_custom" value="' . esc_attr($espresso_calendar['time_format']) . '" class="small-text" /> ';
														echo '<span class="example"> ' . date_i18n($espresso_calendar['time_format']) . "</span> <img class='ajax-loading' src='" . esc_url(admin_url('images/wpspin_light.gif')) . "' alt='' />";
																?>
															<br />
															<span class="description"><a href="http://codex.wordpress.org/Formatting_Date_and_Time">
																	<?php _e('Documentation on date and time formatting', 'event_espresso'); ?>
																</a></span></td>
													</tr>
													<tr>
														<th> <label for="espresso_calendar_firstday">
																<?php _e('First Day of the Week', 'event_espresso'); ?>
															</label>
														</th>
														<td><input id="espresso_calendar_firstday" type="text" name="espresso_calendar_firstday" size="10" maxlength="1" value="<?php echo $espresso_calendar['espresso_calendar_firstday']; ?>" />
															<br />
															<span class="description">
																<?php _e('(Sunday=0, Monday=1, Tuesday=2, etc.)', 'event_espresso'); ?>
															</span></td>
													</tr>
													<tr>
														<th> <label for="espresso_calendar_weekends">
																<?php _e('Show Weekends', 'event_espresso'); ?>
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
																<?php _e('Height', 'event_espresso'); ?>
															</label>
														</th>
														<td><input id="espresso_calendar_height" type="text" name="espresso_calendar_height" size="100" maxlength="100" value="<?php echo $espresso_calendar['espresso_calendar_height']; ?>" />
															<br />
															<span class="description">
																<?php _e('Will make the entire calendar (including header) a pixel height.', 'event_espresso'); ?>
															</span></td>
													</tr>
													<tr>
														<th> <label for="calendar_pages">
																<?php _e('Page(s) Displaying the Calendar', 'event_espresso'); ?>
																<?php
																if ( espresso_version() >= '3.2.P' )
																	echo apply_filters('filter_hook_espresso_help', 'display-on-pages');
																?>
															</label>
														</th>
														<td><input id="calendar_pages" type="text" name="calendar_pages" size="100" maxlength="100" value="<?php echo $espresso_calendar['calendar_pages'] == '' ? 0 : $espresso_calendar['calendar_pages']; ?>" />
															<br />
															<span class="description">
																<?php _e('This tells the plugin to load the calendar CSS file on specific pages. This should be a comma seperated list of page ids.', 'event_espresso'); ?>
															</span></td>
													</tr>
													<tr>
														<th> <label for="calendar_page_post">
																<?php _e('Link to Post or Registration Page', 'event_espresso'); ?>
																<?php
																if ( espresso_version() >= '3.2.P' )
																	echo apply_filters('filter_hook_espresso_help', 'display-where')
																?>
															</label>
														</th>
														<td><?php echo select_input('espresso_page_post', array(array('id' => 'R', 'text' => __('Registration Page', 'event_espresso')), array('id' => 'P', 'text' => __('Post', 'event_espresso'))), $espresso_calendar['espresso_page_post'], 'id="calendar_page_post"'); ?> <br />
															<span class="description">
																<?php _e('If you are using the "Create a Post" feature. Use this option to link to the posts that are created by Event Espresso.', 'event_espresso'); ?>
															</span></td>
													</tr>
													<?php if ( espresso_version() >= '3.2.P' ) {
														//only display this if we're using 3.2 ?>
													<tr>
														<th> <label for="enable-calendar-thumbs">
																<?php _e('Enable Images in Calendar', 'event_espresso');
																if ( espresso_version() >= '3.2.P' )
																	echo apply_filters('filter_hook_espresso_help', 'enable-images')?>
															</label>
														</th>
														<td><?php echo select_input('enable_calendar_thumbs', $values, $espresso_calendar['enable_calendar_thumbs'], 'id="enable-calendar-thumbs"'); ?>
															</li></td>
													</tr>
													<?php } ?>
												</tbody>
											</table>
											<h4>
												<?php _e('Theme Settings', 'event_espresso'); ?>
											</h4>
											
											<table class="form-table">
												<tbody>
													<tr>
														<th> <label for="espresso_use_pickers">
																<?php _e('Use Color Pickers', 'event_espresso'); ?>
															</label>
														</th>
														<td><?php echo select_input('espresso_use_pickers', $values, $espresso_calendar['espresso_use_pickers'], 'id="espresso_use_pickers"'); ?></td>
													</tr>
													<tr class="color-picker-selections">
														<th class="color-picker-style"> <label for="background-color">
																<?php _e('Event Background Color', 'event_espresso') ?>
															</label>
														</th>
														<td><input id="background-color"type="text" name="ee_event_background" <?php echo (isset($espresso_calendar['ee_event_background']) && !empty($espresso_calendar['ee_event_background'])) ? 'value="' . $espresso_calendar['ee_event_background'] . '"' : 'value="#486D96"' ?> /><div id="colorpicker-1"></div></td>
													</tr>
													<tr class="color-picker-selections">
														<th class="color-picker-style"> <label for="text-color">
																<?php _e('Event Text Color', 'event_espresso') ?>
															</label>
														</th>
														<td><input id="text-color" type="text" name="ee_event_text_color" <?php echo (isset($espresso_calendar['ee_event_text_color']) && !empty($espresso_calendar['ee_event_text_color'])) ? 'value="' . $espresso_calendar['ee_event_text_color'] . '"' : 'value="#ebe6e8"' ?> /><div id="colorpicker-2"></div></td>
													</tr>


													<tr>
														<th>
															<label for="show_tooltips">
																<?php _e('Show Tooltips', 'event_espresso'); ?><?php
																if ( espresso_version() >= '3.2.P' )
																	echo apply_filters('filter_hook_espresso_help', 'show-tooltips-info') ?>
															</label>
														</th>
														<td>
															<?php echo select_input('show_tooltips', $values, $espresso_calendar['show_tooltips'], 'id="show_tooltips"'); ?>
														</td>
													</tr>

													<tr>
														<th> <label for="enable-cat-classes">
																<?php _e('Enable CSS for Categories', 'event_espresso'); ?>
																<?php
																if ( espresso_version() >= '3.2.P' )
																	echo apply_filters('filter_hook_espresso_help', 'enable-categories')
																?>
															</label>
														</th>
														<td><?php echo select_input('enable_cat_classes', $values, $espresso_calendar['enable_cat_classes'], 'id="enable-cat-classes"'); ?></td>
													</tr>
												</tbody>
											</table>
											<p>
												<input class="button-primary" type="submit" name="save_calendar_settings" value="<?php _e('Save Calendar Options', 'event_espresso'); ?>" id="save_calendar_settings2" />
												<?php wp_nonce_field('espresso_form_check', 'update_calendar') ?>
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
														<th><?php _e('Header Style', 'event_espresso'); ?>
															<?php
															if ( espresso_version() >= '3.2.P' )
																echo apply_filters('filter_hook_espresso_help', 'calendar_header_info')
															?></th>
														<td><textarea name="espresso_calendar_header" id="espresso_calendar_header" cols="30" rows="5"><?php echo htmlentities(stripslashes_deep($espresso_calendar['espresso_calendar_header'])) ?></textarea>
															<br />
															<span class="description">
																<?php _e('Defines the buttons and title at the top of the calendar.', 'event_espresso'); ?>
															</span></td>
													</tr>
													<tr>
														<th><?php _e('Button Text', 'event_espresso'); ?>
															<?php
															if ( espresso_version() >= '3.2.P' )
																echo apply_filters('filter_hook_espresso_help', 'calendar_buttonText_info')
															?>
														</th>
														<td><textarea name="espresso_calendar_buttonText" id="espresso_calendar_buttonText" cols="30" rows="5"><?php echo htmlentities(stripslashes_deep($espresso_calendar['espresso_calendar_buttonText'])) ?></textarea>
															<br />
															<span class="description">
																<?php _e('Text that will be displayed on buttons of the header.', 'event_espresso'); ?>
															</span></td>
													</tr>
													<tr>
														<th><?php _e('Title Format', 'event_espresso'); ?>
															<?php
															if ( espresso_version() >= '3.2.P' )
																echo apply_filters('filter_hook_espresso_help', 'calendar_titleFormat_info')
															?></th>
														<td><textarea name="espresso_calendar_titleFormat" id="espresso_calendar_titleFormat" cols="30" rows="5"><?php echo htmlentities(stripslashes_deep($espresso_calendar['espresso_calendar_titleFormat'])) ?></textarea>
															<br />
															<span class="description">
																<?php _e('Determines the text that will be displayed in the header\'s title.', 'event_espresso'); ?>
															</span></td>
													</tr>
													<tr>
														<th><?php _e('Column Format', 'event_espresso'); ?>
															<?php
															if ( espresso_version() >= '3.2.P' )
																echo apply_filters('filter_hook_espresso_help', 'calendar_columnFormat_info')
															?></th>
														</th>
														<td><textarea name="espresso_calendar_columnFormat" id="espresso_calendar_columnFormat" cols="30" rows="5"><?php echo htmlentities(stripslashes_deep($espresso_calendar['espresso_calendar_columnFormat'])) ?></textarea>
															<br />
															<span class="description">
																<?php _e('Determines the text that will be displayed on the calendar\'s column headings.', 'event_espresso'); ?>
															</span></td>
													</tr>
													<tr>
														<th><?php _e('Month Names', 'event_espresso'); ?>
															<?php
															if ( espresso_version() >= '3.2.P' )
																echo apply_filters('filter_hook_espresso_help', 'calendar_monthNames_info')
															?></th>
														<td><textarea name="espresso_calendar_monthNames" id="espresso_calendar_monthNames" cols="30" rows="5"><?php echo stripslashes_deep($espresso_calendar['espresso_calendar_monthNames']) ?></textarea>
															<br />
															<span class="description">
																<?php _e('Full names of months.', 'event_espresso'); ?>
															</span></td>
													</tr>
													<tr>
														<th><?php _e('Month Names Short', 'event_espresso'); ?>
															<?php
															if ( espresso_version() >= '3.2.P' )
																echo apply_filters('filter_hook_espresso_help', 'calendar_monthNamesShort_info')
															?></th>
														<td><textarea name="espresso_calendar_monthNamesShort" id="espresso_calendar_monthNamesShort" cols="30" rows="5"><?php echo stripslashes_deep($espresso_calendar['espresso_calendar_monthNamesShort']) ?></textarea>
															<br />
															<span class="description">
																<?php _e('Abbreviated names of months.', 'event_espresso'); ?>
															</span></td>
													</tr>
													<tr>
														<th><?php _e('Day Names', 'event_espresso'); ?>
															<?php
															if ( espresso_version() >= '3.2.P' )
																echo apply_filters('filter_hook_espresso_help', 'calendar_dayNames_info')
															?></th>
														<td><textarea name="espresso_calendar_dayNames" id="espresso_calendar_dayNames" cols="30" rows="5"><?php echo stripslashes_deep($espresso_calendar['espresso_calendar_dayNames']) ?></textarea>
															<br />
															<span class="description">
																<?php _e('Full names of days-of-week.', 'event_espresso'); ?>
															</span></td>
													</tr>
													<tr>
														<th><?php _e('Day Names Short', 'event_espresso'); ?>
															<?php
															if ( espresso_version() >= '3.2.P' )
																echo apply_filters('filter_hook_espresso_help', 'calendar_dayNamesShort_info')
															?></th>
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
												<?php wp_nonce_field('espresso_form_check', 'update_calendar') ?>
											</p>
											<p>
												<?php _e('Reset Calendar Settings?', 'event_espresso'); ?>
												<input name="reset_calendar" type="checkbox" />
												<?php wp_nonce_field('espresso_form_check', 'reset_calendar_nonce') ?>
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

			if(window.scp == ''){
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
				if(window.scp == ''){
					$('input#event-background, input#event-text').attr('disabled', true);
					$('tr.color-picker-selections th, tr.color-picker-selections td').attr('style', "opacity: .3");
				}else {
					$('input#event-background, input#event-text').removeAttr('disabled', true);
					$('tr.color-picker-selections th, tr.color-picker-selections td').removeAttr('style');
				}
			});

			// color picker initialization
			$('#colorpicker-1').hide();
			$('#colorpicker-2').hide();
			$('#colorpicker-1').farbtastic("#background-color");
			$('#colorpicker-2').farbtastic("#text-color");
			$("#background-color").click(function(){$('#colorpicker-1').slideToggle()});
			$("#text-color").click(function(){$('#colorpicker-2').slideToggle()});

			// WP toggle function
			postboxes.add_postbox_toggles('espresso_calendar');

		});

		//]]>
	</script>
	<?php
}
