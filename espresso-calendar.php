<?php
/*
  Plugin Name: Event Espresso - Calendar
  Plugin URI: http://www.eventespresso.com
  Description: A full calendar addon for Event Espresso. Includes month, week, and day views.
  Version: 2.0.7.dev
  Author: Event Espresso
  Author URI: http://www.eventespresso.com
  Copyright 2012 Event Espresso (email : support@eventespresso.com)

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
 *
 * ------------------------------------------------------------------------
 *
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * EE_Calendar
 *
 * @package			Event Espresso
 * @subpackage	espresso-calendar
 * @author				Seth Shoultes, Chris Reynolds, Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EE_Calendar {

	/**
	 * 	@var 	array	$_calendar_options
	 *  @access 	private
	 */
	private $_calendar_options = array();






	/**
	 * 	class constructor
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function __construct() {
		// calendar_version
		define( 'ESPRESSO_CALENDAR_VERSION', $this->calendar_version());
		// define the plugin directory path and URL
		define( 'ESPRESSO_CALENDAR_PLUGINFULLPATH', plugin_dir_path( __FILE__ ));
		define( 'ESPRESSO_CALENDAR_PLUGINFULLURL', plugin_dir_url( __FILE__ ));	
		
		if ( is_admin() ) {
			
			require_once( ESPRESSO_CALENDAR_PLUGINFULLPATH . 'calendar_admin_classic.php' );
			register_activation_hook(  ESPRESSO_CALENDAR_PLUGINFULLPATH . 'calendar_admin_classic.php', 'espresso_calendar_install' );
			add_filter( 'plugin_action_links', 'espresso_calendar_plugin_actions', 10, 2 );
			add_action( 'action_hook_espresso_calendar_update_api', 'espresso_calendar_load_pue_update' );
			add_action( 'action_hook_espresso_featured_image_add_to_meta_box', 'espresso_calendar_add_to_featured_image_meta_box' );			
			add_action( 'action_hook_espresso_add_new_submenu_to_group_settings', 'espresso_add_calendar_to_admin_menu', 5 );
			add_action( 'admin_notices', 'espresso_calendar_current_screen' );
			// AJAX hooks for getting event data
			add_action( 'wp_ajax_get_calendar_events', array( $this, 'get_calendar_events' ));
			add_action( 'wp_ajax_nopriv_get_calendar_events', array( $this, 'get_calendar_events' ));
			
		} else {

			add_action( 'wp', array( $this, 'calendar_init' ));
			add_shortcode( 'ESPRESSO_CALENDAR', array( $this, 'espresso_calendar' ));
			add_action( 'widgets_init', array( $this, 'widget_init' ));
			
		}
		
	}



	/**
	 * 	calendar_version - Define the version of the plugin
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function calendar_version() {
		return '2.1.0.dev';
	}
	


	/**
	 * 	calendar_init - initialize
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function calendar_init() {
		// get the current post
		global $post;
		if ( isset( $post->post_content )) {			
			 // check the post content for the short code
			 if ( strpos( $post->post_content, '[ESPRESSO_CALENDAR') !== FALSE ) {		// get calendar options
				$this->_calendar_options = get_option('espresso_calendar_settings');
				add_action('wp_enqueue_scripts', array( $this, 'calendar_scripts' ));
			}
		}	
	}
	


	/**
	 * 	calendar_scripts - Load the scripts and css
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function calendar_scripts() {

		//Load tooltips styles
		if ( isset( $this->_calendar_options['show_tooltips'] ) && $this->_calendar_options['show_tooltips'] ? TRUE : FALSE ) {
			// load jQuery qtip script from CDN with local fallback
			$qtip_js_url = 'cdnjs.cloudflare.com/ajax/libs/qtip2/2.1.1/jquery.qtip.min.js'; 
			// is the URL accessible ?
			$test_url = @fopen( $qtip_js_url, 'r' );
			// use CDN URL or local fallback ?
			$qtip_js_url = $test_url !== FALSE ? $qtip_js_url : ESPRESSO_CALENDAR_PLUGINFULLURL . 'scripts/jquery.qtip.min.js';
			// use CDN URL or local fallback ?
			$qtip_css_url = $test_url !== FALSE ? 'cdnjs.cloudflare.com/ajax/libs/qtip2/2.1.1/jquery.qtip.min.css' : ESPRESSO_CALENDAR_PLUGINFULLURL . 'css/jquery.qtip.min.css';

			// register jQuery qtip
			wp_register_style( 'qtip', $qtip_css_url ); 
			wp_enqueue_style('qtip');
			wp_register_script( 'jquery-qtip-min', $qtip_js_url, array('jquery'), '2.1.1', TRUE);			
			wp_enqueue_script('jquery-qtip-min');
		}
		//Check to see if the calendar css file exists in the '/uploads/espresso/' directory
		if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "css/calendar.css")) {
			wp_register_style('calendar', EVENT_ESPRESSO_UPLOAD_URL . 'css/calendar.css'); //This is the url to the css file if available
		} else {
			wp_register_style('calendar', ESPRESSO_CALENDAR_PLUGINFULLURL . 'css/calendar.css'); //calendar core style
		}
		wp_enqueue_style('calendar');
		//core calendar script
		wp_register_script( 'fullcalendar-min-js', ESPRESSO_CALENDAR_PLUGINFULLURL . 'scripts/fullcalendar.min.js', array('jquery'), '1.6.2', TRUE ); 
		// finally load our stuff
		wp_register_script( 'espresso_calendar', ESPRESSO_CALENDAR_PLUGINFULLURL . 'scripts/espresso_calendar.js', array('fullcalendar-min-js'), ESPRESSO_CALENDAR_VERSION, TRUE ); 
		wp_enqueue_script('espresso_calendar');		

	}



	/**
	 * 	espresso_calendar - Build the short code
	 * 	
	 * 	[ESPRESSO_CALENDAR]
	 * 	[ESPRESSO_CALENDAR show_expired="true"]
	 * 	[ESPRESSO_CALENDAR event_category_id="your_category_identifier"]
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function espresso_calendar($atts) {

		global $org_options, $ee_calendar_js_options, $event_category_id, $events;
		// set default attributes
		$atts = shortcode_atts(array('event_category_id' => '', 'show_expired' => false, 'cal_view' => 'month'), $atts);
		// loop thru atts and add to js options
		foreach ( $atts as $att_name => $att_value ) {
			$ee_calendar_js_options[$att_name] = $att_value;
		}	
		// loop thru calendar_options and add to js options
		foreach ( $this->_calendar_options as $opt_name => $opt_value ) {
			$ee_calendar_js_options[$opt_name] = is_array( $opt_value ) ? stripslashes_deep( $opt_value ) : stripslashes( $opt_value );
		}	
		
		$ee_calendar_js_options['weekends'] = (bool)$ee_calendar_js_options['weekends'];
		
		// set other js options
//		$ee_calendar_js_options['theme'] = function_exists( 'espresso_version' ) && ! empty( $org_options['style_settings']['enable_default_style'] ) && $org_options['style_settings']['enable_default_style'] == 'Y' ? TRUE : FALSE;

//		$ee_calendar_js_options['description'] =__('Description', 'event_espresso');
//		$ee_calendar_js_options['register_now'] =__('Register Now', 'event_espresso');
//		$ee_calendar_js_options['view_details'] =__('View Details', 'event_espresso');
		$ee_calendar_js_options['monthNames'] = array( 
			__('January', 'event_espresso'),
			__('February', 'event_espresso'),
			__('March', 'event_espresso'),
			__('April', 'event_espresso'),
			__('May', 'event_espresso'),
			__('June', 'event_espresso'),
			__('July', 'event_espresso'),
			__('August', 'event_espresso'),
			__('September', 'event_espresso'),
			__('October', 'event_espresso'),
			__('November', 'event_espresso'),
			__('December', 'event_espresso')
		);
			
		$ee_calendar_js_options['monthNamesShort'] =array( 
				__('Jan', 'event_espresso'),
				__('Feb', 'event_espresso'),
				__('Mar', 'event_espresso'),
				__('Apr', 'event_espresso'),
				__('May', 'event_espresso'),
				__('Jun', 'event_espresso'),
				__('Jul', 'event_espresso'),
				 __('Aug', 'event_espresso'),
				__('Sep', 'event_espresso'),
				__('Oct', 'event_espresso'),
				__('Nov', 'event_espresso'),
				__('Dec', 'event_espresso')
			);
				
		$ee_calendar_js_options['dayNames'] = array( 
				__('Sunday', 'event_espresso'),
				__('Monday', 'event_espresso'),
				__('Tuesday', 'event_espresso'),
				__('Wednesday', 'event_espresso'),
				__('Thursday', 'event_espresso'),
				__('Friday', 'event_espresso'),
				__('Saturday', 'event_espresso')
			);
			
		$ee_calendar_js_options['dayNamesShort'] = array( 
				__('Sun', 'event_espresso'),
				__('Mon', 'event_espresso'),
				__('Tue', 'event_espresso'),
				__('Wed', 'event_espresso'),
				__('Thu', 'event_espresso'),
				__('Fri', 'event_espresso'),
				__('Sat', 'event_espresso')
			);
		
//		echo '<h3>$this->_calendar_options</h3><pre style="height:auto;border:2px solid lightblue;">' . print_r( $this->_calendar_options, TRUE ) . '</pre><br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>';
//		echo '<h3>$ee_calendar_js_options</h3><pre style="height:auto;border:2px solid lightblue;">' . print_r( $ee_calendar_js_options, TRUE ) . '</pre><br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>';

		// Get current page protocol
		$protocol = isset($_SERVER["HTTPS"]) ? 'https://' : 'http://';
		// Output admin-ajax.php URL with same protocol as current page
		$ee_calendar_js_options['ajax_url'] = admin_url('admin-ajax.php', $protocol);
		wp_localize_script( 'espresso_calendar', 'eeCAL', $ee_calendar_js_options );
	
		return '
		<div id="ee-calendar-ajax-loader-dv">
			<img id="ee-calendar-ajax-loader-img" class="ee-ajax-loader-img" style="display:none;" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/ajax-loader-large.gif">			
		</div>
		<div id="espresso_calendar"></div>';
	}



	/**
	 * 	get_calendar_events
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function get_calendar_events( $show_expired ) {
		
		global $wpdb, $org_options, $event_category_id, $events, $eventsArray;
		remove_shortcode('LISTATTENDEES');
		
		$this->_calendar_options = get_option('espresso_calendar_settings');
		
		$month = date('m' );
		$year = date('Y' );
		$start_date = isset( $_REQUEST['start_date'] ) ? date( 'Y-m-d', absint( $_REQUEST['start_date'] )) : date('Y-m-d', mktime( 0, 0, 0, $month, 1, $year ));
		$end_date = isset( $_REQUEST['end_date'] ) ? date( 'Y-m-d', absint( $_REQUEST['end_date'] )) : date('Y-m-t', mktime( 0, 0, 0, $month, 1, $year ));
//		echo '<h4>$start_date : ' . $start_date . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
		$show_expired = isset( $_REQUEST['show_expired'] ) ? sanitize_key( $_REQUEST['show_expired'] ) : 'false';
		
//		$throttle = '';
//		if (isset($this->_calendar_options['throttle']['enable']) && $this->_calendar_options['throttle']['enable'] == true) {
//			if ($this->_calendar_options['throttle']['amount'] > 1)
//				$throttle = 'LIMIT ' . $this->_calendar_options['throttle']['amount'];
//		}
		
		// set boolean for categories 
		$use_categories = isset($this->_calendar_options['disable_categories']) && $this->_calendar_options['disable_categories'] == FALSE ? TRUE : FALSE;
		$event_category_id = ! empty( $event_category_id ) ? $event_category_id : FALSE;
		$type = $event_category_id ? 'cat' : 'all';
		//Build the SQL to run
		$SQL = "SELECT e.*, ese.start_time, ese.end_time ";
		//Get the categories
		$SQL .= $event_category_id ? ", c.category_meta, c.category_identifier, c.category_name, c.category_desc, c.display_desc " : '';
		$SQL .= "FROM " . EVENTS_DETAIL_TABLE . " e ";
		$SQL .= " LEFT JOIN " . EVENTS_START_END_TABLE . " ese ON ese.event_id= e.id ";
		//Get the categories
		$SQL .= $event_category_id ? "JOIN " . EVENTS_CATEGORY_REL_TABLE . " r ON r.event_id = e.id " : '';
		$SQL .= $event_category_id ? "JOIN " . EVENTS_CATEGORY_TABLE . " c ON c.id = r.cat_id " : '';
		
		$SQL .= "WHERE e.is_active != 'N' ";
		$SQL .= " AND e.event_status != 'D' "; //Deleted
		$SQL .= " AND e.event_status != 'S' "; //Secondary/Waitlist
		$SQL .= " AND e.event_status != 'P' "; //Pending
		$SQL .= " AND e.event_status != 'X' ";
		$SQL .= " AND e.event_status != 'R' "; //Draft
		
		$SQL .= " AND ( e.start_date >= %s AND e.start_date <= %s ) OR e.event_status != 'O' ";		
		
		if ($show_expired == "false") {
			$SQL .= " AND ( e.registration_start <= '$end_date' AND e.registration_end <= '$end_date' ) ";
		}

		$SQL .= " GROUP BY e.id ORDER BY e.start_date ASC "; // . $throttle;

		// grab event data with event IDs as the array keys
		$events_data = $wpdb->get_results( $wpdb->prepare( $SQL, $start_date, $end_date ), OBJECT_K );
//		echo '<h4>' . $wpdb->last_query . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		echo '<h3>$events_data</h3><pre style="height:auto;border:2px solid lightblue;">' . print_r( $events_data, TRUE ) . '</pre><br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>';

		//Do we need to get Category data ?
		if ( $use_categories && $type == 'all' ) {
			// grab event_ids from query results above to use in category query
			$EVT_IDs = array_keys($events_data);
			$SQL = "SELECT event_id, c.category_meta, c.category_identifier, c.category_name, c.category_desc, c.display_desc";
			$SQL .= " FROM " . EVENTS_CATEGORY_REL_TABLE . ' r ';
			$SQL .= " LEFT JOIN " . EVENTS_CATEGORY_TABLE . " c ON c.id = r.cat_id ";
			$SQL .= " WHERE event_id IN ( '" . implode("', '", $EVT_IDs) . "' )";
			$categories = $wpdb->get_results($wpdb->prepare($SQL, ''));
			$event_categories = array();
			foreach ($categories as $category) {
				$event_categories[$category->event_id][] = $category;
			}
		}
		
		 $enable_cat_classes = isset( $this->_calendar_options['enable_cat_classes'] ) && $this->_calendar_options['enable_cat_classes'] ? TRUE : FALSE;
		 $show_attendee_limit = isset( $this->_calendar_options['show_attendee_limit'] ) && $this->_calendar_options['show_attendee_limit'] ? TRUE : FALSE;
		 $show_time = isset( $this->_calendar_options['show_time'] ) && $this->_calendar_options['show_time'] ? TRUE : FALSE;
		 $show_tooltips = isset( $this->_calendar_options['show_tooltips'] ) && $this->_calendar_options['show_tooltips'] ? TRUE : FALSE;
		if ( $show_tooltips ) {
			 $tooltip_style = isset( $this->_calendar_options['tooltip_style'] ) && $this->_calendar_options['tooltip_style'] ? $this->_calendar_options['tooltip_style'] : 'qtip-light';
			$tooltip_my = isset( $this->_calendar_options['tooltips_pos']['my_1'] ) && ! empty( $this->_calendar_options['tooltips_pos']['my_1'] ) ? $this->_calendar_options['tooltips_pos']['my_1'] : 'bottom';
			$tooltip_my .= isset( $this->_calendar_options['tooltips_pos']['my_2'] ) && ! empty( $this->_calendar_options['tooltips_pos']['my_2'] ) ? ' ' . $this->_calendar_options['tooltips_pos']['my_2'] : ' center';
			$tooltip_at = isset( $this->_calendar_options['tooltips_pos']['at_1'] ) && ! empty( $this->_calendar_options['tooltips_pos']['at_1'] ) ? $this->_calendar_options['tooltips_pos']['at_1'] : 'top';
			$tooltip_at .= isset( $this->_calendar_options['tooltips_pos']['at_2'] ) && ! empty( $this->_calendar_options['tooltips_pos']['at_2']) ? ' ' . $this->_calendar_options['tooltips_pos']['at_2'] : ' center';
		}
		
		$events = array();
		$cntr = 0;
		foreach ( $events_data as $event ) {
			//Reset category colors
			$events[ $cntr ]['color'] = '';
			$events[ $cntr ]['textColor'] = '';
			
			global $this_event_id;
			
			$this_event_id = $event->id;

			//Get details about the category of the event
			if ($use_categories) {
				// extract info from separate array of category data ?
				if (isset($event_categories[$event->id]) && $type == 'all') {
					// get first element of array without modifying original array
					$primary_cat = array_shift(array_values($event_categories[$event->id]));
					$category_data['category_meta'] = unserialize($primary_cat->category_meta);
				} else if ($type == 'cat') {
					// or was one category set via the shortcode
					$category_data['category_meta'] = unserialize($event->category_meta);
				} else {
					$category_data['category_meta'] = array();
				}
				//Assign colors to events by category
				if ( $enable_cat_classes && isset($category_data['category_meta']['use_pickers']) && $category_data['category_meta']['use_pickers'] == 'Y') {
					$events[ $cntr ]['color'] = $category_data['category_meta']['event_background'];
					$events[ $cntr ]['textColor'] = $category_data['category_meta']['event_text_color'];
				}
			}

			$event_meta = unserialize($event->event_meta);
			$this->_calendar_options['espresso_page_post'] = isset( $this->_calendar_options['espresso_page_post'] ) ? $this->_calendar_options['espresso_page_post'] : 'R';

			if (function_exists('espresso_version')) {
				switch ($this->_calendar_options['espresso_page_post']) {

					case 'P':
//						$registration_url = get_home_url() . '/?p=' . $event->post_id;
						$registration_url = get_permalink( $event->id );
						break;
					case 'R':
					default:
						$registration_url = add_query_arg( 'ee', $event->id, get_permalink( $org_options['event_page_id'] ));
						break;
				}
			}
			// Build calendar array from $event data
			//Gets the URL of the event and links the event to the registration form.
			$events[ $cntr ]['url'] = $event->externalURL != '' ? htmlspecialchars_decode($event->externalURL) : $registration_url;

			//Id of the event
			$events[ $cntr ]['id'] = $event->id;

			//Get the title of the event
			$ee_event_title = htmlspecialchars_decode(stripslashes($event->event_name ), ENT_QUOTES);
			$events[ $cntr ]['title'] = $ee_event_title;


			//Get the start and end times for each event
			//important! time must be in iso8601 format 2010-05-10T08:30!!
			$events[ $cntr ]['start'] = date("c", strtotime($event->start_date . ' ' . event_date_display($event->start_time, get_option('time_format'))));
			$events[ $cntr ]['end'] = date("c", strtotime($event->end_date . ' ' . event_date_display($event->end_time, get_option('time_format'))));

			$expired = $events[ $cntr ]['end'] < date('Y-m-d') && $event->event_status != 'O' ? TRUE : FALSE;
			if ( $expired ) {
				$events[ $cntr ]['className'] = 'expired';
			} else {
				$events[ $cntr ]['className'] = '';
			}
			
			$startTime = ! empty($event->start_time) ? '<span class="event-start-time">' . event_date_display($event->start_time, $this->_calendar_options['time_format']) . '</span>' : FALSE;
			$endTime = ! empty($event->end_time) ? '<span class="event-end-time">' . event_date_display($event->end_time, $this->_calendar_options['time_format']) . '</span>' : FALSE;

			if ( $show_time && $startTime ) {
				$events[ $cntr ]['event_time'] = '<span class="time-display-block">' . $startTime;
				$events[ $cntr ]['event_time'] .= $endTime ? ' - ' . $endTime : '';
				$events[ $cntr ]['event_time'] .= '</span>';
			} else {
				$events[ $cntr ]['event_time'] = FALSE;
			}
			
			$events[ $cntr ]['event_time_no_tags'] = wp_strip_all_tags( $events[ $cntr ]['event_time'] );

			// Add thumb to eventArray
			if ( isset( $this->_calendar_options['enable_calendar_thumbs'] ) && $this->_calendar_options['enable_calendar_thumbs'] ) {
				if ( isset( $event_meta['event_thumbnail_url'] )) {
					$events[ $cntr ]['event_img_thumb'] = '<span class="thumb-wrap"><img class="ee-event-thumb" src="' . $event_meta['event_thumbnail_url'] . '" alt="image of ' . $events[ $cntr ]['title'] . '" /></span>';
					$events[ $cntr ]['className'] .= ' event-has-thumb';
				}
			}

			//Custom fields:
			//These can be used to perform special functions in your display.
			//This decalares the category ID as the CSS class name
			$events[ $cntr ]['eventType'] = '';
			if ( $use_categories ) {
				if ( $enable_cat_classes ) {

					if (isset($event_categories[$event->id]) && $type == 'all') {
						foreach ($event_categories[$event->id] as $EVT) {
							//This is the css class name
							$events[ $cntr ]['className'] .= ' ' . $EVT->category_identifier;
						}
						// set event type to the category id
						$events[ $cntr ]['eventType'] = isset($primary_cat->category_name) && !empty($primary_cat->category_name) ? $primary_cat->category_name : '';
					} else {
						//This is the css class name
						$events[ $cntr ]['className'] .= isset($event->category_identifier) ? ' ' . $event->category_identifier : '';
						// set event type to the category id
						$events[ $cntr ]['eventType'] .= isset($event->category_name) ? ' ' . $event->category_name : '';
					}
				}
			}

			if ( $show_tooltips ) {
				//Gets the description of the event. This can be used for hover effects such as jQuery Tooltips or QTip
				$events[ $cntr ]['description'] = espresso_format_content( $event->event_desc );
				//Supports 3.1 short descriptions
				if ( isset( $org_options['display_short_description_in_event_list'] ) && $org_options['display_short_description_in_event_list'] == 'Y' ) {
					$events[ $cntr ]['description'] = array_shift( explode( '<!--more-->', $events[ $cntr ]['description'] ));
				}
				// tooltip wrapper
				$events[ $cntr ]['tooltip'] = '<div class="qtip_info">';
				// show time ?
				$events[ $cntr ]['tooltip'] .= $show_time && $startTime ? '<p class="time_cal_qtip">' . __('Event Time: ', 'event_espresso') . $startTime . ' - ' . $endTime . '</p>' : '';
				// check attendee reg limit
				$orig_attendee_limit = get_number_of_attendees_reg_limit( $event->id, $type = 'num_attendees_slash_reg_limit' );
				$parse_limits = explode('/', $orig_attendee_limit, 2);
				$num_completed = $parse_limits[0];
				$reg_limit = $parse_limits[1];
				// add attendee limit if set
				if ( $show_attendee_limit ) {
					$attendee_limit = $reg_limit >= 999999 ? __('Available Spaces: unlimited', 'event_espresso') : __('Registrations / Spaces: ', 'event_espresso') . $num_completed . ' / ' . $reg_limit;
					$events[ $cntr ]['tooltip'] .= ' <p class="attendee_limit_qtip">' . $attendee_limit . '</p>';
				}
				//add link
				$regButtonText = $event->display_reg_form == 'Y' ?  __('Register Now', 'event_espresso') :  __('View Details', 'event_espresso');
				// reg open
				if ( $num_completed < $reg_limit && ! $expired ) {
					$events[ $cntr ]['tooltip'] .= '<a class="reg-now-btn" href="' . $events[ $cntr ]['url'] . '">' . $regButtonText . '</a>';				
				} else if ( $num_completed >= $reg_limit && ! $expired ) {
					$events[ $cntr ]['tooltip'] .= '<div class="sold-out-dv">' . __('Sold Out', 'event_espresso') . '</div>';				
				} else {
					$events[ $cntr ]['tooltip'] .= '<div class="sold-out-dv">' . __('Registration Closed', 'event_espresso') . '</div>';				
				}

				$events[ $cntr ]['tooltip'] .= '<div class="clear"></div>';
				$events[ $cntr ]['tooltip'] .= '</div>';
				 
				// Position my top left...
				$events[ $cntr ]['tooltip_my'] = $tooltip_my;
				$events[ $cntr ]['tooltip_at'] = $tooltip_at;
				$events[ $cntr ]['tooltip_style'] = $tooltip_style;

			} else {
				$events[ $cntr ]['show_tooltips'] = FALSE;
			}

			// If set to true, events will be shown as all day events
			$events[ $cntr ]['allDay'] = FALSE;
			$cntr++;

		}
//		echo '<h3>$events</h3><pre style="height:auto;border:2px solid lightblue;">' . print_r( $events, TRUE ) . '</pre><br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>';

		echo json_encode( $events );
		die();

	}



	/**
	 * 	widget_init
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function widget_init() {
		if ( ! file_exists( ESPRESSO_CALENDAR_PLUGINFULLPATH . 'espresso-calendar-widget.php' )) {
			echo 'An error occurred. The file espresso-calendar-widget.php could not be found.';
		} else {		
			include_once(ESPRESSO_CALENDAR_PLUGINFULLPATH . 'espresso-calendar-widget.php');
			// registers our widget
			register_widget('Espresso_Calendar_Widget'); 
		}
	}




	/**
	 *		@ override magic methods
	 *		@ return void
	 */	
	public function __set($a,$b) { return FALSE; }
	public function __get($a) { return FALSE; }
	public function __isset($a) { return FALSE; }
	public function __unset($a) { return FALSE; }
	public function __clone() { return FALSE; }
	public function __wakeup() { return FALSE; }	
	public function __destruct() { return FALSE; }		

}
new EE_Calendar();
// End of file espresso-calendar.php
// Location: /espresso-calendar/espresso-calendar.php