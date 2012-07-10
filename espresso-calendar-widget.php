<?php
	// do the javascript stuff
	$espresso_calendar_widget = '<script type="text/javascript">';
	$espresso_calendar_widget .= '$jaer = jQuery.noConflict();';
	$espresso_calendar_widget .= 'jQuery(document).ready(function($jaer) {';
	$espresso_calendar_widget .= '$jaer(\'#espresso_calendar\').fullCalendar({';
					/**
					* General Display
					* http://arshaw.com/fullcalendar/docs/text/
					**/
					//month, basicWeek, basicDay, agendaWeek, agendaDay
	$espresso_calendar_widget .= 'defaultView: \'month\',';

					//Defines the buttons and title at the top of the calendar.
	$espresso_calendar_widget .= 'header: { left: \'prev\', center: \'title\', right: \'next\' },'; // setting this to a blank value so no title/buttons appear

					/**
					* Theme Settings
					*
					* Once you enable theming with true, you still need to include the CSS file for the theme you want.
					* For example, if you just downloaded a theme from the jQuery UI Themeroller, you need to put a <link> tag in your page's <head>.
					**/

					//jQuery UI Themeroller
					//Enables/disables use of jQuery UI theming.
					//Settings: http://arshaw.com/fullcalendar/docs/display/theme/

					if ( (!empty($org_options['style_settings']['enable_default_style']) && $org_options['style_settings']['enable_default_style'] == 'Y') || (function_exists('espresso_version') && espresso_version() >= '3.2.P' && !empty($org_options['style_settings']['enable_default_style']) && $org_options['style_settings']['enable_default_style'] == true) ) {
						$espresso_calendar_widget .= 'theme: true,';
					}
					//This option only applies to calendars that have jQuery UI theming enabled with the theme option.
					/*buttonIcons:{ //Settings: http://arshaw.com/fullcalendar/docs/display/buttonIcons/
						prev: 'circle-triangle-w',
						next: 'circle-triangle-e'
					},*/

					//The day that each week begins.
					//The value must be a number that represents the day of the week.
					//Sunday=0, Monday=1, Tuesday=2, etc.
	$espresso_calendar_widget .= 'firstDay: ' . $espresso_calendar['espresso_calendar_firstday'] . ','; //Settings: http://arshaw.com/fullcalendar/docs/display/firstDay/

					//Displays the calendar in right-to-left mode.
	$espresso_calendar_widget .= 'isRTL: false,';

					//Whether to include Saturday/Sunday columns in any of the calendar views.
	$espresso_calendar_widget .= 'weekends: ' . $espresso_calendar['espresso_calendar_weekends'] . ',';

					//Determines the number of weeks displayed in a month view. Also determines each week's height.
	$espresso_calendar_widget .= 'weekMode:\'fixed\','; //Settings: http://arshaw.com/fullcalendar/docs/display/weekMode/

					//Will make the entire calendar (including header) a pixel height.
	$espresso_calendar_widget .= 'height: 300,'; //Settings: http://arshaw.com/fullcalendar/docs/display/height/

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
	$espresso_calendar_widget .= 'timeFormat:{ '; //Settings: http://arshaw.com/fullcalendar/docs/text/timeFormat/
						// for agendaWeek and agendaDay
	$espresso_calendar_widget .= 'agenda: \'h:mm{ - h:mm}\','; // 5:00 - 6:30

						// for all other views
	$espresso_calendar_widget .= '\'\': \'\''; // 7p
	$espresso_calendar_widget .= '},';

					//Changes the colors of the events as seen here:
					//http://code.google.com/p/fullcalendar/issues/detail?id=6&can=1&q=css&colspec=ID%20Type%20Status%20Milestone%20Summary%20Stars
	$espresso_calendar_widget .= 'eventRender: function(event, element) { ';

						// set an event category class
						//alert(event.className);
	$espresso_calendar_widget .= 'if(event.className){';
	$espresso_calendar_widget .= 'element.find(\'a\').addClass(event.className);';
	$espresso_calendar_widget .= 'element.attr(\'title\',event.title)';
	$espresso_calendar_widget .= '}';
	$espresso_calendar_widget .= $dont_show_expired;
						//This displays the title of the event when hovering
						//element.attr('title', event.title + " - Event Times: " + event.start + event.end);

						// if the user selects show in thickbox we add this element
						//if(event.in_thickbox_url){
						//element.after($jaer('<div style="display: none;"><div id="event-thumb-detail-' + event.id+ '"><h2 class="tb-event-title">' + event.title + '</h2><p class="tb-event-start">Event start: ' + event.start + '</p><p class="tb-event-end">Event End: ' + event.end + '</p>' + event.description + '<p class="tb-reg-link"><a href="' + event.url + '"title="Go to registration page for this event">Register for this event</a></p></div></div>'));
						//}

	$espresso_calendar_widget .= 'if(event.event_img_thumb){';
							//alert('we have thumbs');

	$espresso_calendar_widget .= 'element.addClass(\'event-has-thumb\');';

	$espresso_calendar_widget .= 'element.find(\'.fc-event-title\').after($jaer(\'<span class="thumb-wrap"><img class="ee-event-thumb \' + event.img_size_class + \'" src="\' + event.event_img_thumb + \'" alt="image of \' + event.title + \'" /></span>\'));';
	$espresso_calendar_widget .= '}';

	if ($espresso_calendar['show_time'] == 'true'){
		$espresso_calendar_widget .= 'element.find(\'.fc-event-title\').after($jaer(\'<p class="time-display-block"><span class="event-start-time">\' + event.startTime + \' - </span><span class="event-end-time">\' + event.endTime + \'</span></p>\'));';
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
	$espresso_calendar_widget .= '},';

					//Determines the text that will be displayed on the calendar's column headings.
	$espresso_calendar_widget .= 'columnFormat:{'; //Settings: http://arshaw.com/fullcalendar/docs/text/columnFormat/
	$espresso_calendar_widget .= stripslashes_deep($espresso_calendar['espresso_calendar_columnFormat']);
						/*month: 'ddd',// Mon
						week: 'ddd M/d', // Mon 9/7
						day: 'dddd M/d'// Monday 9/7*/
	$espresso_calendar_widget .= '},';

					//For date formatting options, please refer to: http://arshaw.com/fullcalendar/docs/utilities/formatDate/
	$espresso_calendar_widget .= 'titleFormat:{ month: \'MMMM\' },';

					//Text that will be displayed on buttons of the header.  Uncomment this if you want to change it from the default.
	//$espresso_calendar_widget .= 'buttonText: { },';

					//Full names of months.
	$espresso_calendar_widget .= 'monthNames: [' . stripslashes_deep($espresso_calendar['espresso_calendar_monthNames']) . '],';

					//Abbreviated names of months.
	$espresso_calendar_widget .= 'monthNamesShort: [' . stripslashes_deep($espresso_calendar['espresso_calendar_monthNamesShort']) . '],';

					//Full names of days-of-week.
	$espresso_calendar_widget .= 'dayNames: [' . stripslashes_deep($espresso_calendar['espresso_calendar_dayNames']) /*'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'*/ . '],';

					//Abbreviated names of days-of-week.
	$espresso_calendar_widget .= 'dayNamesShort: [' . stripslashes_deep($espresso_calendar['espresso_calendar_dayNamesShort']) /*'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'*/ . '],';

					//Load the events into json srrsy
	$espresso_calendar_widget .= 'events: ' . json_encode($events) . ',';
	$espresso_calendar_widget .= 'loading: function(bool) { ';
	$espresso_calendar_widget .= 'if (bool) $(\'#loading\').show();';
	$espresso_calendar_widget .= 'else $jaer(\'#loading\').hide();';
	$espresso_calendar_widget .= '}';

	$espresso_calendar_widget .= '});';
	$espresso_calendar_widget .= '});';

	$espresso_calendar_widget .= '</script>';
	$espresso_calendar_widget .= '<div id="espresso_calendar"></div>';
	$espresso_calendar_debug_msg = '<p>this is espresso_hook_action_calendar_widget</p>';

