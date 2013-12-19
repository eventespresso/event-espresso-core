<?php
/*
  Plugin Name: Event Espresso - Calendar
  Plugin URI: http://www.eventespresso.com
  Description: A full calendar addon for Event Espresso. Includes month, week, and day views.
  Version: 2.1.p
  Author: Event Espresso
  Author URI: http://www.eventespresso.com
  Copyright 2013 Event Espresso (email : support@eventespresso.com)

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
 * @ author				Seth Shoultes
 * @ copyright			(c) 2008-2013 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link				http://www.eventespresso.com
 * @ version		 	3.1
 *
 * ------------------------------------------------------------------------
 *
 * EE_Calendar
 *
 * @package				Event Espresso
 * @subpackage			espresso-calendar
 * @author				Seth Shoultes, Chris Reynolds, Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EE_Calendar {

   /**
     * 	EE_Calendar Object
     * 	@var 		EE_Calendar $_instance
	 * 	@access 	private 	
     */
	private static $_instance = NULL;

	/**
	 * 	@var 		array	$_calendar_options
	 *  @access 	private
	 */
	private $_calendar_options = array();

	/**
	 * 	@var 		INT	$_event_category_id
	 *  @access 	private
	 */
	private $_event_category_id = 0;
	
	/**
	 * 	@var 	INT	$_event_venue_id
	 *  @access 	private
	 */
	private $_event_venue_id = 0;


	/**
	 * 	@var 		boolean	$_show_expired
	 *  @access 	private
	 */
	private $_show_expired = TRUE;


	private $timer = NULL;


	/**
	 *@singleton method used to instantiate class object
	 *@access public
	 *@return EE_Calendar instance
	 */	
	public static function instance() {
		// check if class object is instantiated
		if ( self::$_instance === NULL  or ! is_object( self::$_instance ) or ! is_a( self::$_instance, __CLASS__ )) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	/**
	 * 	class constructor
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function __construct() {
		
//		$this->timer = new Elapse_time();

		// calendar_version
		define( 'ESPRESSO_CALENDAR_VERSION', $this->calendar_version());
		// define the plugin directory path and URL
		define( 'ESPRESSO_CALENDAR_PLUGINFULLPATH', plugin_dir_path( __FILE__ ));
		define( 'ESPRESSO_CALENDAR_PLUGINFULLURL', plugin_dir_url( __FILE__ ));	
		
		if ( is_admin() ) {			
			register_activation_hook(  __FILE__ , array( $this, 'activation' ));
			require_once( ESPRESSO_CALENDAR_PLUGINFULLPATH . 'calendar_admin.php' );
			EE_Calendar_Admin::instance();
			// ajax hooks
			add_action( 'wp_ajax_get_calendar_events', array( $this, 'get_calendar_events' ));
			add_action( 'wp_ajax_nopriv_get_calendar_events', array( $this, 'get_calendar_events' ));			
		} else {
			add_action( 'wp_enqueue_scripts', array( $this, 'calendar_scripts' ));
			add_shortcode( 'ESPRESSO_CALENDAR', array( $this, 'espresso_calendar' ));
		}

		add_action( 'widgets_init', array( $this, 'widget_init' ));
		
	}

	/**
	 * 	calendar_version - Define the version of the plugin
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function calendar_version() {
		return '2.1.p';
	}

	/**
	 * 	activation
	 *
	 *  @return 	void
	 */
	function activation() {		
	    if ( ! current_user_can( 'activate_plugins' )) {
			 return;
		}
	    $plugin = isset( $_REQUEST['plugin'] ) ? $_REQUEST['plugin'] : '';
	    check_admin_referer( "activate-plugin_{$plugin}" );
	 	require_once( ESPRESSO_CALENDAR_PLUGINFULLPATH . 'calendar_admin.php' );
		EE_Calendar_Admin::activation();
	}

	/**
	 * 	plugin_file
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function plugin_file() {
		static $plugin_file;
		if ( ! $plugin_file ) {
		    $plugin_file = plugin_basename( __FILE__ );
		}
		return $plugin_file;
	}
	
	/**
	 * 	get_calendar_options
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	private function _get_calendar_options() {
		if ( empty( $this->_calendar_options ) || ! is_array( $this->_calendar_options )) {
			$this->_calendar_options = get_option( 'espresso_calendar_options', array() );
		}
		return $this->_calendar_options;
	}

	/**
	 * 	calendar_scripts - Load the scripts and css
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function calendar_scripts() {
		if ( ! defined( 'EVENT_ESPRESSO_VERSION' )) {
			return;
		}
		// get calendar options
		$this->_calendar_options = $this->_get_calendar_options();
		//Load tooltips styles
		$show_tooltips = isset( $this->_calendar_options['show_tooltips'] ) && $this->_calendar_options['show_tooltips'] ? TRUE : FALSE;
		if ( $show_tooltips ) {
			// register jQuery qtip
			wp_register_style( 'qtip', ESPRESSO_CALENDAR_PLUGINFULLURL . 'css/jquery.qtip.min.css' );
			wp_register_script( 'jquery-qtip', ESPRESSO_CALENDAR_PLUGINFULLURL . 'scripts/jquery.qtip.js', array('jquery'), '2.1.1', TRUE);			
		}
		
		// load base calendar style
		wp_register_style('fullcalendar', ESPRESSO_CALENDAR_PLUGINFULLURL . 'css/fullcalendar.css'); 
		//Check to see if the calendar css file exists in the '/uploads/espresso/' directory
		if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "css/calendar.css")) {
			//This is the url to the css file if available
			wp_register_style('espresso_calendar', EVENT_ESPRESSO_UPLOAD_URL . 'css/calendar.css'); 
		} else {
			// EE calendar style
			wp_register_style('espresso_calendar', ESPRESSO_CALENDAR_PLUGINFULLURL . 'css/calendar.css'); 
		}
		//core calendar script
		wp_register_script( 'fullcalendar-min-js', ESPRESSO_CALENDAR_PLUGINFULLURL . 'scripts/fullcalendar.min.js', array('jquery'), '1.6.2', TRUE ); 
		wp_register_script( 'espresso_calendar', ESPRESSO_CALENDAR_PLUGINFULLURL . 'scripts/espresso_calendar.js', array('fullcalendar-min-js'), ESPRESSO_CALENDAR_VERSION, TRUE ); 

		// get the current post
		global $post, $is_espresso_calendar;
		if ( isset( $post->post_content ) || $is_espresso_calendar ) {
			 // check the post content for the short code
			 if ( strpos( $post->post_content, '[ESPRESSO_CALENDAR') !== FALSE || $is_espresso_calendar ) {
				if ( $show_tooltips ) {
					wp_enqueue_style('qtip');
					wp_enqueue_script('jquery-qtip');
					wp_enqueue_script('jquery');
				}
				wp_enqueue_style('fullcalendar');
				wp_enqueue_style('espresso_calendar');
				wp_enqueue_script('espresso_calendar');	
			}
		}
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
	public function espresso_calendar( $atts ) {
		
		if ( ! defined( 'EVENT_ESPRESSO_VERSION' )) {
			return '';
		}

		global $wpdb, $org_options;

		// get calendar options
		$this->_calendar_options = $this->_get_calendar_options();
		$defaults = array_merge( array( 'event_category_id' => '', 'show_expired' => 'false', 'cal_view' => 'month', 'widget' => FALSE, 'show_tooltips' => FALSE ), $this->_calendar_options );

		// make sure $atts is an array
		$atts = is_array( $atts ) ? $atts : array( $atts );
		// set default attributes
		$atts = shortcode_atts( $defaults, $atts );
		
		$output_filter = '';
		if (!$atts['widget']) {
			// Query for Select box filters
			$c_sql = "SELECT * FROM " . EVENTS_CATEGORY_TABLE;
			$temp_cats = $wpdb->get_results($c_sql);
			
			$v_sql = "SELECT * FROM " . EVENTS_VENUE_TABLE;
			$temp_venue = $wpdb->get_results($v_sql);
			
			
			if (!empty($temp_venue) || !empty($temp_cats)){
				
				ob_start();
				
				//Category legend
				if (isset($this->_calendar_options['enable_category_legend']) && $this->_calendar_options['enable_category_legend'] == TRUE ){
					echo '<div id="espreso-category-legend"><ul id="ee-category-legend-ul">';
					
					foreach ($temp_cats as $category) {
						$catcode = $category->id;
						$catmeta = unserialize($category->category_meta);
						$bg = $catmeta['event_background'];
						$fontcolor = $catmeta['event_text_color'];
						$use_bg = $catmeta['use_pickers'];
			
						if($use_bg == "Y") {
							echo '<li id="ee-category-legend-li-'.$catcode.'" class="has-sub" style="border-left: 10px solid ' . $bg . ';">';
						} else {
							echo '<li id="ee-category-li-'.$catcode.'" class="has-sub" style="border-left: 10px solid #CCC";>';
						}
					
						echo '<span class="ee-category"><a href="?event_category_id='.$category->category_identifier.'">'.$category->category_name.'</a></span></a></li>';
						
					}
					//echo '<li class="has-sub" style="border-left:solid 1px #000;"><a href="?event_category_id">'.__('All', 'event_espresso').'</a></li>';
					echo '</ul></div>';
				}
				
				//Filter dropdowns
				if (isset($this->_calendar_options['enable_calendar_filters']) && $this->_calendar_options['enable_calendar_filters'] == TRUE ){
					?>
					<!-- select box filters -->
					<div class="ee-filter-form">
					<form name="filter-calendar-form" id="filter-calendar-form" method="post" action="">
					<?php if(!empty($temp_cats)){?>
						<select id="ee-category-submit" class="submit-this ee-category-select" name="event_category_id">
						<option id="option" class="ee_select" value=""><?php echo __('Select a Category', 'event_espresso'); ?></option>
						<option class="ee_filter_show_all" value=""><?php echo __('Show All', 'event_espresso'); ?></option>
						<?php
							foreach($temp_cats as $cat) {
							echo '<option '.(isset($_REQUEST['event_category_id']) && $cat->category_identifier == $_REQUEST['event_category_id'] ? 'selected' :'').' value="'.$cat->category_identifier.'">'.stripslashes($cat->category_name).'</option>';
								}?>
						</select>
					<?php }?>
					
					<?php if(!empty($temp_venue)){?>
						<select id="ee-venue-submit" class="submit-this ee-venue-select" name="event_venue_id">
						<option class="ee_select" value=""><?php echo __('Select a Venue', 'event_espresso'); ?></option>
						<option class="ee_filter_show_all" value=""><?php echo __('Show All', 'event_espresso'); ?></option>
						<?php
							foreach($temp_venue as $venue) {
							echo '<option'. (isset($_REQUEST['event_venue_id']) && $venue->id == $_REQUEST['event_venue_id'] ? ' selected="selected"' :'').' value="'.$venue->id.'">'.stripslashes($venue->name).'</option>';
							}?>
						</select>
					<?php }?>
					</form>
					</div>
					<?php
				}
				$output_filter = ob_get_contents();
				ob_end_clean();
			}
		}

		// grab some request vars
		$this->_event_category_id = $atts['event_category_id'] = isset( $_REQUEST['event_category_id'] ) && ! empty( $_REQUEST['event_category_id'] ) ? sanitize_key( $_REQUEST['event_category_id'] ) : $atts['event_category_id'];
		$atts['event_venue_id'] = isset( $_REQUEST['event_venue_id'] ) && ! empty( $_REQUEST['event_venue_id'] ) ? sanitize_key( $_REQUEST['event_venue_id'] ) : '';
		$this->_show_expired = $atts['show_expired'] = isset( $_REQUEST['show_expired'] ) && ! empty( $_REQUEST['show_expired'] ) ? sanitize_key( $_REQUEST['show_expired'] ) : $atts['show_expired'];
		// loop thru atts and add to js options
		foreach ( $atts as $att_name => $att_value ) {
			if ( ! empty( $att_value )) {
				$ee_calendar_js_options[$att_name] = is_array( $att_value ) ? stripslashes_deep( $att_value ) : stripslashes( $att_value );
			}
		}
		// i18n some strings
		$ee_calendar_js_options['monthNames'] = array( 
			__('January', 		'event_espresso'),
			__('February', 		'event_espresso'),
			__('March', 		'event_espresso'),
			__('April', 		'event_espresso'),
			__('May', 			'event_espresso'),
			__('June', 			'event_espresso'),
			__('July', 			'event_espresso'),
			__('August', 		'event_espresso'),
			__('September', 	'event_espresso'),
			__('October', 		'event_espresso'),
			__('November', 		'event_espresso'),
			__('December', 		'event_espresso')
		);
			
		$ee_calendar_js_options['monthNamesShort'] =array( 
				__('Jan', 		'event_espresso'),
				__('Feb', 		'event_espresso'),
				__('Mar', 		'event_espresso'),
				__('Apr', 		'event_espresso'),
				__('May', 		'event_espresso'),
				__('Jun', 		'event_espresso'),
				__('Jul', 		'event_espresso'),
				__('Aug', 		'event_espresso'),
				__('Sep', 		'event_espresso'),
				__('Oct', 		'event_espresso'),
				__('Nov', 		'event_espresso'),
				__('Dec', 		'event_espresso')
			);
				
		$ee_calendar_js_options['dayNames'] = array( 
				__('Sunday', 	'event_espresso'),
				__('Monday', 	'event_espresso'),
				__('Tuesday', 	'event_espresso'),
				__('Wednesday', 'event_espresso'),
				__('Thursday', 	'event_espresso'),
				__('Friday', 	'event_espresso'),
				__('Saturday', 	'event_espresso')
			);
			
		$ee_calendar_js_options['dayNamesShort'] = array( 
				__('Sun', 		'event_espresso'),
				__('Mon', 		'event_espresso'),
				__('Tue', 		'event_espresso'),
				__('Wed', 		'event_espresso'),
				__('Thu', 		'event_espresso'),
				__('Fri', 		'event_espresso'),
				__('Sat', 		'event_espresso')
			);
			
		$ee_calendar_js_options['theme'] = ! empty( $org_options['style_settings']['enable_default_style'] ) && $org_options['style_settings']['enable_default_style'] == 'Y' ? TRUE : FALSE;
		
//		echo '<h3>$ee_calendar_js_options</h3><pre style="height:auto;border:2px solid lightblue;">' . print_r( $ee_calendar_js_options, TRUE ) . '</pre><br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>';

		// Get current page protocol
		$protocol = isset($_SERVER["HTTPS"]) ? 'https://' : 'http://';
		// Output admin-ajax.php URL with same protocol as current page
		$ee_calendar_js_options['ajax_url'] = admin_url('admin-ajax.php', $protocol);
		wp_localize_script( 'espresso_calendar', 'eeCAL', $ee_calendar_js_options );
		
		$calendar_class = $atts['widget'] ? 'calendar_widget' : 'calendar_fullsize';
		
		$output_filter = apply_filters( 'filter_hook_espresso_calendar_output_filter', $output_filter );
		
		return apply_filters( 'filter_hook_espresso_calendar_output_before', '' ).$output_filter.'
	<div id="espresso_calendar" class="'. $calendar_class . '">
		<div id="ee-calendar-ajax-loader-dv">
			<img id="ee-calendar-ajax-loader-img" class="ee-ajax-loader-img" style="display:none;" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/ajax-loader-large.gif">
		</div>
	</div>
	<div style="clear:both;" ></div>
	<div id="espresso_calendar_images" ></div>'.apply_filters( 'filter_hook_espresso_calendar_output_after','' ); 
	
	
	}

	/**
	 * 	get_calendar_events
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function get_calendar_events() {
		
//	$this->timer->start();
		
		global $wpdb, $org_options;
		remove_shortcode('LISTATTENDEES');
		// get calendar options
		$this->_calendar_options = $this->_get_calendar_options();
		$today = date( 'Y-m-d' );
		$month = date('m' );
		$year = date('Y' );
		$start_date = isset( $_REQUEST['start_date'] ) ? date( 'Y-m-d', absint( $_REQUEST['start_date'] )) : date('Y-m-d', mktime( 0, 0, 0, $month, 1, $year ));
		$end_date = isset( $_REQUEST['end_date'] ) ? date( 'Y-m-d', absint( $_REQUEST['end_date'] )) : date('Y-m-t', mktime( 0, 0, 0, $month, 1, $year ));
		$show_expired = isset( $_REQUEST['show_expired'] ) ? sanitize_key( $_REQUEST['show_expired'] ) : $this->_show_expired;
//		echo '<h4>$show_expired : ' . $show_expired . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
		
		// set boolean for categories 
		$use_categories = isset($this->_calendar_options['disable_categories']) && $this->_calendar_options['disable_categories'] == FALSE ? TRUE : FALSE;
		$event_category_id = isset( $_REQUEST['event_category_id'] ) && ! empty( $_REQUEST['event_category_id'] ) ? sanitize_key( $_REQUEST['event_category_id'] ) : $this->_event_category_id;
		
		//Get venue id
		$event_venue_id = isset( $_REQUEST['event_venue_id'] ) && ! empty( $_REQUEST['event_venue_id'] ) ? sanitize_key( $_REQUEST['event_venue_id'] ) : $this->_event_venue_id;
		
		//Build the SQL to run
		$SQL = "SELECT e.*, ese.start_time, ese.end_time ";
		
		//Get the categories
		$SQL .= $event_category_id ? ", c.category_meta, c.category_identifier, c.category_name, c.category_desc, c.display_desc " : '';
		
		//Get the venues
		$SQL .= $event_venue_id ? ", v.meta venue_meta, v.id venue_id, v.name venue_name, v.address venue_address, v.city venue_city, v.state venue_state " : '';
		
		$SQL .= "FROM " . EVENTS_DETAIL_TABLE . " e ";
		$SQL .= " LEFT JOIN " . EVENTS_START_END_TABLE . " ese ON ese.event_id= e.id ";
		
		//Get the categories
		$SQL .= $event_category_id ? "JOIN " . EVENTS_CATEGORY_REL_TABLE . " r ON r.event_id = e.id " : '';
		$SQL .= $event_category_id ? "JOIN " . EVENTS_CATEGORY_TABLE . " c ON c.id = r.cat_id " : '';
		
		//Get the venues
		$SQL .= $event_venue_id ? "JOIN " . EVENTS_VENUE_REL_TABLE . " vr ON vr.event_id = e.id " : '';
		$SQL .= $event_venue_id ? "JOIN " . EVENTS_VENUE_TABLE . " v ON v.id = vr.venue_id " : '';
		
		$SQL .= "WHERE e.is_active != 'N' ";
		$SQL .= " AND e.event_status NOT IN ( 'D', 'S', 'P', 'X', 'R' ) "; //Deleted, Secondary/Waitlist, Pending, X?,  Draft
		$SQL .= $event_category_id ?  " AND c.category_identifier = '$event_category_id' " : '';
		$SQL .= $event_venue_id ?  " AND v.id = '$event_venue_id' " : '';
//		$SQL .= " AND (( e.start_date >= %s AND e.start_date <= %s ) OR e.event_status != 'O' ) ";		
		$SQL .= " AND ( e.start_date >= %s AND e.start_date <= %s ) ";		
		
		if ($show_expired == "false") {
			$SQL .= apply_filters( 'filter_hook_espresso_calendar_sef_and_start_end_dates', " AND ( e.start_date >= '$today' AND e.registration_end >= '$today' ) " );
		}

		$SQL .= " GROUP BY e.id ORDER BY e.start_date ASC "; // . $throttle;
		// grab event data with event IDs as the array keys
		$events_data = $wpdb->get_results( $wpdb->prepare( $SQL, $start_date, $end_date ), OBJECT_K );
		
//		$this->timer->stop();
//		echo $this->timer->get_elapse( __LINE__ );
//		$this->timer->start();

//		echo '<h4>' . $wpdb->last_query . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		echo '<h3>$events_data</h3><pre style="height:auto;border:2px solid lightblue;">' . print_r( $events_data, TRUE ) . '</pre><br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>';

		$event_categories = array();
		//Do we need to get Category data ?
		if ( $use_categories ) {
			// grab event_ids from query results above to use in category query
			$EVT_IDs = array_keys($events_data);
			$SQL = "SELECT event_id, c.category_meta, c.category_identifier, c.category_name, c.category_desc, c.display_desc";
			$SQL .= " FROM " . EVENTS_CATEGORY_REL_TABLE . ' r ';
			$SQL .= " LEFT JOIN " . EVENTS_CATEGORY_TABLE . " c ON c.id = r.cat_id ";
			$SQL .= " WHERE event_id IN ( '" . implode("', '", $EVT_IDs) . "' )";
			$categories = $wpdb->get_results( $wpdb->prepare( $SQL, NULL ));
//			echo '<h4>' . $wpdb->last_query . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
			foreach ($categories as $category) {
				$event_categories[$category->event_id][] = $category;
			}
		}
//		echo '<h3>$event_categories</h3><pre style="height:auto;border:2px solid lightblue;">' . print_r( $event_categories, TRUE ) . '</pre><br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>';

		 $enable_cat_classes = isset( $this->_calendar_options['enable_cat_classes'] ) && $this->_calendar_options['enable_cat_classes'] ? TRUE : FALSE;
		 $show_attendee_limit = isset( $this->_calendar_options['show_attendee_limit'] ) && $this->_calendar_options['show_attendee_limit'] ? TRUE : FALSE;
		 $show_time = isset( $this->_calendar_options['show_time'] ) && $this->_calendar_options['show_time'] ? TRUE : FALSE;
		 $show_tooltips = isset( $this->_calendar_options['show_tooltips'] ) && $this->_calendar_options['show_tooltips'] ? TRUE : FALSE;
		if ( $show_tooltips ) {
			$tooltip_my = isset( $this->_calendar_options['tooltips_pos_my_1'] ) && ! empty( $this->_calendar_options['tooltips_pos_my_1'] ) ? $this->_calendar_options['tooltips_pos_my_1'] : 'bottom';
			$tooltip_my .= isset( $this->_calendar_options['tooltips_pos_my_2'] ) && ! empty( $this->_calendar_options['tooltips_pos_my_2'] ) ? ' ' . $this->_calendar_options['tooltips_pos_my_2'] : ' center';
			$tooltip_at = isset( $this->_calendar_options['tooltips_pos_at_1'] ) && ! empty( $this->_calendar_options['tooltips_pos_at_1'] ) ? $this->_calendar_options['tooltips_pos_at_1'] : 'top';
			$tooltip_at .= isset( $this->_calendar_options['tooltips_pos_at_2'] ) && ! empty( $this->_calendar_options['tooltips_pos_at_2']) ? ' ' . $this->_calendar_options['tooltips_pos_at_2'] : ' center';
			$tooltip_style = isset( $this->_calendar_options['tooltip_style'] ) && $this->_calendar_options['tooltip_style'] ? $this->_calendar_options['tooltip_style'] : 'qtip-light';
			$tooltip_word_count = isset( $this->_calendar_options['tooltip_word_count'] ) ? $this->_calendar_options['tooltip_word_count'] : 50;
		}
		$enable_calendar_thumbs = isset( $this->_calendar_options['enable_calendar_thumbs'] ) && $this->_calendar_options['enable_calendar_thumbs'] ? TRUE : FALSE;
		
		$wp_thumbnail_crop = get_option( 'thumbnail_crop' );//Is WP thumbnail cropping active?
		if ( $enable_calendar_thumbs ) {
			$thumbnail_size_w = get_option( 'thumbnail_size_w' );
			$thumbnail_size_h = get_option( 'thumbnail_size_h' );
			$upload_dir = wp_upload_dir();
		}

		do_action('action_hook_espresso_calendar_do_stuff',$show_expired);
//		$this->timer->stop();
//		echo $this->timer->get_elapse( __LINE__ );
		
		$events = array();
		$cntr = 0;
		foreach ( $events_data as $event ) {

//		$this->timer->start();

			//Reset category colors
			$events[ $cntr ]['color'] = '';
			$events[ $cntr ]['textColor'] = '';

			global $this_event_id;

			$this_event_id = $event->id;

			//Get details about the category of the event
			if ($use_categories) {
				// extract info from separate array of category data ?
				if ( isset( $event_categories[$event->id] ) ) {
					// get first element of array without modifying original array
					$primary_cat = array_shift(array_values($event_categories[$event->id]));
					$category_data['category_meta'] = unserialize($primary_cat->category_meta);
				} else {
					$category_data['category_meta'] = array();
				}

				//Assign colors to events by category
				if ( $enable_cat_classes && isset($category_data['category_meta']['use_pickers']) && $category_data['category_meta']['use_pickers'] == 'Y') {
					$events[ $cntr ]['color'] = $category_data['category_meta']['event_background'];
					$events[ $cntr ]['textColor'] = $category_data['category_meta']['event_text_color'];
				}
			}

			//Gets the URL of the event and links the event to the registration form.
			$this->_calendar_options['espresso_page_post'] = isset( $this->_calendar_options['espresso_page_post'] ) ? $this->_calendar_options['espresso_page_post'] : 'R';
			$registration_url = $this->_calendar_options['espresso_page_post'] == 'P' ? get_permalink( $event->post_id ) : add_query_arg( 'ee', $event->id, get_permalink( $org_options['event_page_id'] ));
			$events[ $cntr ]['url'] = $event->externalURL != '' ? htmlspecialchars_decode($event->externalURL) : $registration_url;
			

			//Id of the event
			$events[ $cntr ]['id'] = $event->id;
			//Get the title of the event
			$events[ $cntr ]['title'] = htmlspecialchars_decode(stripslashes($event->event_name ), ENT_QUOTES);


			//Get the start and end times for each event
			//important! time must be in iso8601 format 2010-05-10T08:30!!
			$events[ $cntr ]['start'] = date("c", strtotime($event->start_date . ' ' . event_date_display($event->start_time, get_option('time_format'))));
			$events[ $cntr ]['end'] = date("c", strtotime($event->end_date . ' ' . event_date_display($event->end_time, get_option('time_format'))));
			$events[ $cntr ]['reg_start'] = date("c", strtotime($event->registration_start . ' ' . event_date_display($event->registration_startT, get_option('time_format'))));
			$events[ $cntr ]['reg_end'] = date("c", strtotime($event->registration_end . ' ' . event_date_display($event->registration_endT, get_option('time_format'))));
			
			$start = strtotime( $event->start_date . ' ' . $event->start_time );
			$end = strtotime( $event->end_date . ' ' . $event->end_time );
			$events[ $cntr ]['event_days'] = max( ceil(( $end - $start ) / ( 60*60*24 )), 1 );

			$expired = ($events[ $cntr ]['end'] < date('Y-m-d') || $events[ $cntr ]['reg_end'] < date('Y-m-d')) && $event->event_status != 'O' ? TRUE : FALSE;
			if ( $expired ) {
				$events[ $cntr ]['className'] = 'expired';
			} else {
				$events[ $cntr ]['className'] = '';
			}
			
			//Make sure registration is open 
			$not_open = $events[ $cntr ]['reg_start'] > date('Y-m-d') ? TRUE : FALSE;
			if ( $not_open ) {
				$events[ $cntr ]['className'] = 'expired';
			} else {
				$events[ $cntr ]['className'] = '';
			}
			
//			$this->timer->stop();
//			echo $this->timer->get_elapse( __LINE__ );
//			$this->timer->start();

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

			$event_meta = unserialize($event->event_meta);
			
			// Add thumb to eventArray
			if ( $enable_calendar_thumbs && isset( $event_meta['event_thumbnail_url'] ) && ! empty( $event_meta['event_thumbnail_url'] )) {
				
				// get pathinfo
				$pathinfo = pathinfo( $event_meta['event_thumbnail_url'] );
				// get dirname
				$dirname = $pathinfo['dirname'] . '/';
				// now get filename without path or extension
				$filename = $pathinfo['filename'];
				// and extension
				$ext = $pathinfo['extension'];
				// generate thumbnail size string ie: -150x150
				$thumbnail_size = '-' . $thumbnail_size_w . 'x' . $thumbnail_size_h;
				// check that thumbnail dimesions are not already included in filename
				$thumbnail_size = strpos( $filename, $thumbnail_size ) === FALSE && $wp_thumbnail_crop == FALSE ? $thumbnail_size : '';
				
				
				$path_to_thumbnail = $dirname . $filename . '.' . $ext;
				
				$events[ $cntr ]['thumbnail_size_w'] = $thumbnail_size_w;
				$events[ $cntr ]['thumbnail_size_h'] = $thumbnail_size_h;
				
				// check if file exists
				if ( $pathinfo['dirname'] == $upload_dir['url'] ) {
					// since the above is true we know the file is in the uploads so we can use file_exists() to verify it
					if ( ! file_exists( $upload_dir['path'] . DIRECTORY_SEPARATOR . $filename . $thumbnail_size . '.' . $ext )) {
						// hmmm...  the scaled thumbnail doesn't exist, so better check that the original is still there, or set path to FALSE
						$path_to_thumbnail = file_exists( $upload_dir['path'] . DIRECTORY_SEPARATOR . $filename . '.' . $ext ) ? $event_meta['event_thumbnail_url'] : FALSE;
					}			
				}
				

				
//				echo '<h4>event_thumbnail_url : ' . $event_meta['event_thumbnail_url'] . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//				echo '<h4>$thumbnail_size : ' . $thumbnail_size . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//				echo '<h4>$path_to_thumbnail : ' . $path_to_thumbnail . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
				
				
				if ( $path_to_thumbnail ) { 
					$events[ $cntr ]['event_img_thumb'] = '
					<span class="thumb-wrap">
						<img id="ee-event-thumb-' . $event->id . '" class="ee-event-thumb" src="' . $path_to_thumbnail . '" alt="image of ' . $events[ $cntr ]['title'] . '" />
					</span>';
					$events[ $cntr ]['className'] .= ' event-has-thumb';
				}
			}

			//Custom fields:
			//These can be used to perform special functions in your display.
			//This decalares the category ID as the CSS class name
			$events[ $cntr ]['eventType'] = '';
			if ( $use_categories ) {
				if ( $enable_cat_classes ) {

					if ( isset( $event_categories[$event->id] )) {
						foreach ( $event_categories[$event->id] as $cat ) {
							//This is the css class name
							$events[ $cntr ]['className'] .= ' ' . $cat->category_identifier;
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

//			$this->timer->stop();
//			echo $this->timer->get_elapse( __LINE__ );
//			$this->timer->start();

			if ( $show_tooltips ) {
				// gets the description of the event. This can be used for hover effects such as jQuery Tooltips or QTip
				$events[ $cntr ]['description'] = wpautop( stripslashes( do_shortcode( $event->event_desc )));
				// use short descriptions
				$events[ $cntr ]['description'] = reset( explode( '<!--more-->', $events[ $cntr ]['description'] ));
				// tooltip wrapper
				$events[ $cntr ]['tooltip'] = '<div class="ui-tooltip-content qtip_info">';
				// show time ?
				$events[ $cntr ]['tooltip'] .= $show_time && $startTime ? '<p class="time_cal_qtip">' . __('Event Time: ', 'event_espresso') . $startTime . ' - ' . $endTime . '</p>' : '';
				// check attendee reg limit
				$num_completed = 0;
				$a_sql = "SELECT SUM(quantity) quantity FROM " . EVENTS_ATTENDEE_TABLE . " WHERE event_id=%d AND (payment_status='Completed' OR payment_status='Pending' OR payment_status='Refund') ";
				$wpdb->get_results( $wpdb->prepare( $a_sql, $event->id ), ARRAY_A);
				if ($wpdb->num_rows > 0 && $wpdb->last_result[0]->quantity != NULL) {
					$num_completed = $wpdb->last_result[0]->quantity;
				}
				$reg_limit = $event->reg_limit; 

				// add attendee limit if set
				if ( $show_attendee_limit ) {
					$attendee_limit = $reg_limit >= 999999 ? __('Available Spaces: unlimited', 'event_espresso') : __('Registrations / Spaces: ', 'event_espresso') . $num_completed . ' / ' . $reg_limit;
					$events[ $cntr ]['tooltip'] .= ' <p class="attendee_limit_qtip">' . $attendee_limit . '</p>';
				}

				//add link
				$regButtonText = $event->display_reg_form == 'Y' ?  __('Register Now', 'event_espresso') :  __('View Details', 'event_espresso');
				// reg open
				if (! $expired && $not_open){
					$events[ $cntr ]['tooltip'] .= '<div class="sold-out-dv">' . __('Registration Not Open', 'event_espresso') . '</div>';
				} else if ( $num_completed < $reg_limit && ! $expired ) {
					$events[ $cntr ]['tooltip'] .= '<a class="ui-state-active reg-now-btn" href="' . $events[ $cntr ]['url'] . '">' . $regButtonText . '</a>';				
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
			
//			$this->timer->stop();
//			echo $this->timer->get_elapse( __LINE__ );

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
EE_Calendar::instance();

// http://uniapple.net/blog/?p=274
/*class Elapse_time {
	private $_start = 0;
	private $_stop = 0;
	private $_elpase = 0;

	public function start(){
		$this->_start = array_sum(explode(' ',microtime()));
	}
	public function stop(){
		$this->_stop = array_sum(explode(' ',microtime()));
	}
	public function get_elapse( $line_nmbr ){
		$this->_elpase = $this->_stop - $this->_start;
		return sprintf( 'L# %d) elpased time : %.3f<br/>', $line_nmbr, $this->_elpase );
	}
}*/
// End of file espresso-calendar.php
// Location: /espresso-calendar/espresso-calendar.php
