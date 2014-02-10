<?php
/*
  Plugin Name: Event Espresso - Calendar
  Plugin URI: http://www.eventespresso.com
  Description: A full calendar addon for Event Espresso. Includes month, week, and day views.
  Version: 2.2.1.DEV
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

/**
		 * Class for containing info about how to display an event  datetime in the calendar
		 */
class EE_Datetime_In_Calendar {

	/**
	 * @var EE_Event $_Event
	 */
	protected $_event;
	protected $_datetime;
	protected $_color = '';
	protected $_textColor = '';
	protected $_classname = '';
	protected $_event_time = '';
	protected $_event_time_no_tags = '';
	protected $_event_img_thumb = '';
	protected $_eventType = '';
	protected $_description = null;
	protected $_tooltip = null;
	protected $_tooltip_my = null;
	protected $_tooltip_at = null;
	protected $_tooltip_style = null;
	protected $_show_tooltips = null;
	public function __construct(EE_Datetime $datetime) {
		$this->_datetime = $datetime;
		$this->_event = $datetime->event();
	}
	
	public function get($variable_name){
		return $this->$variable_name;
	}
	public function set($variable_name,$value){
		return $this->$variable_name = $value;
	}

	/**
	 * Gets color
	 * @return string
	 */
	function color() {
		return $this->get('_color');
	}

	/**
	 * Sets color
	 * @param string $color
	 * @return boolean
	 */
	function set_color($color) {
		return $this->set('_color', $color);
	}

	/**
	 * Gets textColor
	 * @return string
	 */
	function textColor() {
		return $this->get('_textColor');
	}

	/**
	 * Sets textColor
	 * @param string $textColor
	 * @return boolean
	 */
	function set_textColor($textColor) {
		return $this->set('_textColor', $textColor);
	}

	/**
	 * Gets datetime
	 * @return EE_Datetime
	 */
	function datetime() {
		return $this->get('_datetime');
	}

	/**
	 * Sets datetime
	 * @param EE_Datetime $datetime
	 * @return boolean
	 */
	function set_datetime($datetime) {
		return $this->set('_datetime', $datetime);
	}

	/**
	 * Gets event
	 * @return EE_Event
	 */
	function event() {
		return $this->get('_event');
	}

	/**
	 * Sets event
	 * @param EE_Event $event
	 * @return boolean
	 */
	function set_event($event) {
		return $this->set('_event', $event);
	}
	/**
	 * Gets classname
	 * @return string
	 */
	function classname() {
		return $this->get('_classname');
	}

	/**
	 * Sets classname
	 * @param string $classname
	 * @return boolean
	 */
	function set_classname($classname) {
		return $this->set('_classname', $classname);
	}
	/**
	 * Just adds $classname to th eexisting classname attribute
	 * @param string $classname
	 * @return string
	 */
	function add_classname($classname){
		return $this->set('_classname',$this->get('_classname')." ".$classname);
	}
	/**
	 * Gets event_time html
	 * @return string
	 */
	function event_time() {
		return $this->get('_event_time');
	}

	/**
	 * Sets event_time html
	 * @param string $event_time
	 * @return boolean
	 */
	function set_event_time($event_time) {
		$this->set('_event_time_no_tags',strip_tags($event_time));
		return $this->set('_event_time', $event_time);
	}
	/**
	 * Gets event_time_no_tags 
	 * @return string
	 */
	function event_time_no_tags() {
		return $this->get('_event_time_no_tags');
	}

	/**
	 * Gets event_img_thumb HTML
	 * @return string
	 */
	function event_img_thumb() {
		return $this->get('_event_img_thumb');
	}

	/**
	 * Sets event_img_thumb HTML
	 * @param string $event_img_thumb
	 * @return boolean
	 */
	function set_event_img_thumb($event_img_thumb) {
		return $this->set('_event_img_thumb', $event_img_thumb);
	}
	/**
	 * Gets eventType
	 * @return string
	 */
	function eventType() {
		return $this->get('_eventType');
	}

	/**
	 * Sets eventType
	 * @param string $eventType
	 * @return boolean
	 */
	function set_eventType($eventType) {
		return $this->set('_eventType', $eventType);
	}
	
	/**
	 * Gets description
	 * @return string
	 */
	function description() {
		return $this->get('_description');
	}

	/**
	 * Sets description
	 * @param string $description
	 * @return boolean
	 */
	function set_description($description) {
		return $this->set('_description', $description);
	}
	/**
	 * Gets tooltip
	 * @return string
	 */
	function tooltip() {
		return $this->get('_tooltip');
	}

	/**
	 * Sets tooltip
	 * @param string $tooltip
	 * @return boolean
	 */
	function set_tooltip($tooltip) {
		return $this->set('_tooltip', $tooltip);
	}
	/**
	 * Gets tooltip_my
	 * @return string
	 */
	function tooltip_my() {
		return $this->get('_tooltip_my');
	}

	/**
	 * Sets tooltip_my
	 * @param string $tooltip_my
	 * @return boolean
	 */
	function set_tooltip_my($tooltip_my) {
		return $this->set('_tooltip_my', $tooltip_my);
	}
	/**
	 * Gets tooltip_at
	 * @return string
	 */
	function tooltip_at() {
		return $this->get('_tooltip_at');
	}

	/**
	 * Sets tooltip_at
	 * @param string $tooltip_at
	 * @return boolean
	 */
	function set_tooltip_at($tooltip_at) {
		return $this->set('_tooltip_at', $tooltip_at);
	}
	/**
	 * Gets tooltip_style
	 * @return string
	 */
	function tooltip_style() {
		return $this->get('_tooltip_style');
	}

	/**
	 * Sets tooltip_style
	 * @param string $tooltip_style
	 * @return boolean
	 */
	function set_tooltip_style($tooltip_style) {
		return $this->set('_tooltip_style', $tooltip_style);
	}
	/**
	 * Gets show_tooltips
	 * @return boolean
	 */
	function show_tooltips() {
		return $this->get('_show_tooltips');
	}

	/**
	 * Sets show_tooltips
	 * @param boolean $show_tooltips
	 * @return boolean
	 */
	function set_show_tooltips($show_tooltips) {
		return $this->set('_show_tooltips', $show_tooltips);
	}

	
	/**
	 * 
	 * @return array which can be used for converting to json
	 */
	function to_array_for_json(){
		return array(
			'allDay'=>false,
			'className'=>$this->classname(),
			'color'=>$this->color(),
			'end'=>$this->_datetime->end_date('c'),
			'event_days'=>$this->_datetime->length('days', true),
			'event_time'=>$this->event_time(),
			'event_time_no_tags'=>$this->event_time_no_tags(),
			'event_img_thumb'=>$this->event_img_thumb(),
			'eventType'=>$this->eventType(),
			'description'=>$this->description(),
			'id'=>$this->_event->ID(),
			'show_tooltips'=>$this->show_tooltips(),
			'start'=>$this->_datetime->start_date('c'),
			'textColor'=>$this->textColor(),
			'tooltip'=>$this->tooltip(),
			'tooltip_my'=>$this->tooltip_my(),
			'tooltip_at'=>$this->tooltip_at(),
			'tooltip_style'=>$this->tooltip_style(),
			'title'=>$this->_event->name(),
			
			'url'=>$this->_event->get_permalink(),
		);
	}

}

class EE_Calendar {

   /**
     * 	EE_Calendar Object
     * 	@var EE_Calendar $_instance
	* 	@access 	private 	
     */
	private static $_instance = NULL;

	/**
	 * 	@var 	EE_Calendar_Config	$_calendar_options
	 *  @access 	private
	 */
	private $_calendar_config = array();

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
		define('ESPRESSO_CALENDAR_SHORTCODEFULLPATH',ESPRESSO_CALENDAR_PLUGINFULLPATH."shortcodes/");
		define('ESPRESSO_CALENDAR_DATAMIGRATIONSCRIPTSPATH',ESPRESSO_CALENDAR_PLUGINFULLPATH."data_migration_scripts/");
		
		add_action( 'widgets_init', array( $this, 'widget_init' ));
		add_filter('FHEE__EE_Config__register_shortcodes__shortcodes_to_register', array($this,'add_shortcodes'));
		add_action( 'AHEE__EE_System__construct__autoloaders_available',array($this,'EE_System__construct__autoloaders_available'));
		add_action( 'AHEE__EE_System__construct__end', array($this,'EE_System__construct__end') );
		
		$this->_setup_migration_script_hooks();
	}
	/**
	 * Runs initialization stuff for the calendar addon, but doesn't run or enqueue any code
	 * that assumes we're NOT in maintenance mode. This function is called regardless of 
	 * whether we're in maintenance mode or not
	 */
	public function EE_System__construct__autoloaders_available(){
		EEH_Autoloader::instance()->register_autoloader(
				array('EE_Calendar_Config'=>ESPRESSO_CALENDAR_PLUGINFULLPATH.'EE_Calendar_Config.php'));
	}
	public function EE_System__construct__end(){
		//check that the EE_Calendar_Config is in the main cnofig file
		$cfg = EE_Config::instance();
		if(!isset($cfg->addons['calendar'])){
			$cfg->addons['calendar'] = new EE_Calendar_Config();
			$cfg->update_espresso_config();
		}
		if ( is_admin() ) {			
			register_activation_hook(  __FILE__ , array( $this, 'activation' ));
			require_once( ESPRESSO_CALENDAR_PLUGINFULLPATH . 'calendar_admin.php' );
			EE_Calendar_Admin::instance();
			// ajax hooks
			add_action( 'wp_ajax_get_calendar_events', array( $this, 'get_calendar_events' ));
			add_action( 'wp_ajax_nopriv_get_calendar_events', array( $this, 'get_calendar_events' ));			
		} else {
			//this should probably be happening in the EES_Espresso_Calendar's run method
			add_action( 'wp_enqueue_scripts', array( $this, 'calendar_scripts' ));
//			add_shortcode( 'ESPRESSO_CALENDAR', array( $this, 'espresso_calendar' ));
		}
	}
	
	/**
	 * Setup hooks for adding calendar logic to EE4 migrations. Initially only adds
	 * a stage to teh 4.1.0 migration script
	 */
	protected function _setup_migration_script_hooks(){
		add_filter( 'FHEE__EE_DMS_4_1_0__autoloaded_stages',array($this,'autoload_migration_stage'));
		add_filter( 'FHEE__EE_DMS_4_1_0__construct__migration_stages',array($this,'add_migration_stage'));
	}
	/**
	 * Filters the list of shortcodes to add ours.
	 * @param array $globbed_shortcode_folders array where keys don't matter, 
	 * and they're just full filepaths to FOLDERS containing a shortcode class file. Eg.
	 * array('monkeybrains'=>'/public_html/wondersite/wp-content/plugins/ee4/shortcodes/espresso_monkey',...)
	 * @return array
	 */
	public function add_shortcodes($globbed_shortcode_folders){
		$globbed_shortcode_folders[] = ESPRESSO_CALENDAR_SHORTCODEFULLPATH."espresso_calendar";
		return $globbed_shortcode_folders;
	}
	/**
	 * Add our 4.1.0 migration stage for autoloading
	 * @param array $classname_to_filepath_array strings are classnames, valuesa re their full paths
	 * @return arrat
	 */
	public function autoload_migration_stage($classname_to_filepath_array){
		$classname_to_filepath_array['EE_DMS_4_1_0_calendar'] = ESPRESSO_CALENDAR_DATAMIGRATIONSCRIPTSPATH.'4_1_0_stages/EE_DMS_4_1_0_calendar.dmsstage.php';
		return $classname_to_filepath_array;
	}
	/**
	 * Adds our data migration stage into the list
	 * @param EE_Data_Migration_Script_Stage[] $migration_stages keys are their priority, values are EE_Data_Migration_Script_Stage
	 * return EE_Data_Migration_Script_Stage[]
	 */
	public function add_migration_stage($migration_stages){
		$migration_stages[] = new EE_DMS_4_1_0_calendar();
		return $migration_stages;
	}


	/**
	 * 	calendar_version - Define the version of the plugin
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function calendar_version() {
		return '2.2.1.DEV';
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
		$c = isset ( EE_Config::instance()->addons['calendar'] ) ? EE_Config::instance()->addons['calendar'] : new EE_Calendar_Config();
		$this->_calendar_config = $c;
		return $this->_calendar_config;
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
		$calendar_config = $this->_get_calendar_options();
		//Load tooltips styles
		$show_tooltips = $calendar_config->tooltip->show;
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
	 * Gets the HTML for the calendar filters area
	 * @param array $ee_calendar_js_options mess of options which will eb passed onto js
	 * which we might want in here. (But using the config object directly might be nice,
	 * because it's well-defined... however, unfortunately settings in it might be overridden
	 * by shortcode attributes, which you can access in this array, if you know their key)
	 * @return string
	 */
	private function _get_filter_html($ee_calendar_js_options = array()){
		$calendar_config = EE_Config::instance()->addons['calendar'];
		/*@var $calendar_config EE_Calendar_Config */
		$output_filter = '';
		if ( !$ee_calendar_js_options['widget']) {
			// Query for Select box filters
			$ee_terms = EEM_Term::instance()->get_all(array(array('Term_Taxonomy.taxonomy'=>'espresso_event_categories')));
			$venues = EEM_Venue::instance()->get_all();
			
			if (!empty($venues) || !empty($ee_terms)){
				
				ob_start();
				
				//Category legend
				if ( $calendar_config->enable_category_legend ){
					echo '<div id="espreso-category-legend"><ul id="ee-category-legend-ul">';
					
					foreach ($ee_terms as $ee_term) {
						/*@var $ee_term EE_Term */
						$catcode = $ee_term->ID();
						
						$catmeta = unserialize($ee_term->category_meta);
						$bg = $ee_term->get_extra_meta('background_color', $calendar_config->event_background);
						$fontcolor =$ee_term->get_extra_meta('text_color', $calendar_config->event_text_color);
						$use_bg =$ee_term->get_extra_meta('use_color_picker', true);
			
						if($use_bg ) {
							echo '<li id="ee-category-legend-li-'.$catcode.'" class="has-sub" style="border-left: 10px solid ' . $bg . ';">';
						} else {
							echo '<li id="ee-category-li-'.$catcode.'" class="has-sub" style="border-left: 10px solid #CCC";>';
						}
					
						echo '<span class="ee-category"><a href="?event_category_id='.$ee_term->slug().'">'.$ee_term->name().'</a></span></a></li>';
						
					}
					//echo '<li class="has-sub" style="border-left:solid 1px #000;"><a href="?event_category_id">'.__('All', 'event_espresso').'</a></li>';
					echo '</ul></div>';
				}
				
				//Filter dropdowns
				if ($calendar_config->enable_calendar_filters ){
					?>
					<!-- select box filters -->
					<div class="ee-filter-form">
					<form name="filter-calendar-form" id="filter-calendar-form" method="post" action="">
					<?php if(!empty($ee_terms)){?>
						<select id="ee-category-submit" class="submit-this ee-category-select" name="event_category_id">
						<option id="option" class="ee_select" value=""><?php echo __('Select a Category', 'event_espresso'); ?></option>
						<option class="ee_filter_show_all" value=""><?php echo __('Show All', 'event_espresso'); ?></option>
						<?php
							foreach($ee_terms as $term) {
								$selected = in_array($ee_calendar_js_options['event_category_id'],array($term->slug(),"{$term->ID()}"), $ee_calendar_js_options);
							echo '<option '.($selected ? 'selected' :'').' value="'.$term->slug().'">'.$term->name().'</option>';
								}?>
						</select>
					<?php }?>
					
					<?php if(!empty($venues)){?>
						<select id="ee-venue-submit" class="submit-this ee-venue-select" name="event_venue_id">
						<option class="ee_select" value=""><?php echo __('Select a Venue', 'event_espresso'); ?></option>
						<option class="ee_filter_show_all" value=""><?php echo __('Show All', 'event_espresso'); ?></option>
						<?php
							foreach($venues as $venue) {
								$selected = in_array($ee_calendar_js_options['event_venue_id'],array($venue->identifier(),"{$venue->ID()}"));
							echo '<option'. ($selected ? ' selected="selected"' :'').' value="'.$venue->identifier().'">'.stripslashes($venue->name()).'</option>';
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

		return $output_filter;
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
	public function espresso_calendar( $shortcode_atts ) {
		
		if ( ! defined( 'EVENT_ESPRESSO_VERSION' )) {
			return '';
		}
		// get calendar options
		$calendar_config = $this->_get_calendar_options();
		$defaults = array_merge( array( 
				'show_expired' => 'true', 
				'cal_view' => 'month', 
				'widget' => FALSE,), 
			$calendar_config->to_flat_array() );
		// make sure $atts is an array
		$shortcode_atts = is_array( $shortcode_atts ) ? $shortcode_atts : array( $shortcode_atts );
		//if the user has changed the filters, those should override whatever the admin specified in the shortcode
		$overrides = array(
				'event_category_id' => isset($_REQUEST['event_category_id']) ? $_REQUEST['event_category_id'] : '', 
				'event_venue_id'=> isset($_REQUEST['event_venue_id']) ? $_REQUEST['event_venue_id'] : '', 
		);
		// set default attributes
		$ee_calendar_js_options = array_merge(shortcode_atts( $defaults, $shortcode_atts ),$overrides);
		$output_filter = $this->_get_filter_html($ee_calendar_js_options);
		
		
		// grab some request vars
		$this->_event_category_id = $ee_calendar_js_options['event_category_id'] = isset( $_REQUEST['event_category_id'] ) && ! empty( $_REQUEST['event_category_id'] ) ? sanitize_key( $_REQUEST['event_category_id'] ) : $ee_calendar_js_options['event_category_id'];
		// i18n some strings
		$ee_calendar_js_options['month_names'] = array( 
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
			
		$ee_calendar_js_options['month_names_short'] =array( 
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
				
		$ee_calendar_js_options['day_names'] = array( 
				__('Sunday', 'event_espresso'),
				__('Monday', 'event_espresso'),
				__('Tuesday', 'event_espresso'),
				__('Wednesday', 'event_espresso'),
				__('Thursday', 	'event_espresso'),
				__('Friday', 	'event_espresso'),
				__('Saturday', 	'event_espresso')
			);
			
		$ee_calendar_js_options['day_names_short'] = array( 
				__('Sun', 'event_espresso'),
				__('Mon', 'event_espresso'),
				__('Tue', 'event_espresso'),
				__('Wed', 'event_espresso'),
				__('Thu', 'event_espresso'),
				__('Fri', 'event_espresso'),
				__('Sat', 'event_espresso')
			);
			
		$ee_calendar_js_options['theme'] = ! empty( $org_options['style_settings']['enable_default_style'] ) && $org_options['style_settings']['enable_default_style'] == 'Y' ? TRUE : FALSE;
		
//		echo '<h3>$ee_calendar_js_options</h3><pre style="height:auto;border:2px solid lightblue;">' . print_r( $ee_calendar_js_options, TRUE ) . '</pre><br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>';

		// Get current page protocol
		$protocol = isset($_SERVER["HTTPS"]) ? 'https://' : 'http://';
		// Output admin-ajax.php URL with same protocol as current page
		$ee_calendar_js_options['ajax_url'] = admin_url('admin-ajax.php', $protocol);
		wp_localize_script( 'espresso_calendar', 'eeCAL', $ee_calendar_js_options );
		
		$calendar_class = $ee_calendar_js_options['widget'] ? 'calendar_widget' : 'calendar_fullsize';
		$output_filter = apply_filters( 'filter_hook_espresso_calendar_output_filter', $output_filter );
		return apply_filters( 'filter_hook_espresso_calendar_output_before', '' ).$output_filter.'
	<div id="espresso_calendar" class="'. $calendar_class . '">
		<div id="ee-calendar-ajax-loader-dv">
			<img id="ee-calendar-ajax-loader-img" class="ee-ajax-loader-img" style="display:none;" src="' . EE_IMAGES_URL . 'ajax-loader.gif">
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
		remove_shortcode('LISTATTENDEES');
		// get calendar options
		$config = $this->_get_calendar_options();
		 $enable_cat_classes = $config->enable_cat_classes;
		 $show_attendee_limit = $config->show_attendee_limit;
		 $show_time = $config->time->show;
		 $show_tooltips = $config->tooltip->show;
		if ( $show_tooltips ) {
			$tooltip_my = $config->tooltip->pos_my_1 . $config->tooltip->pos_my_2;
			$tooltip_at = $config->tooltip->pos_at_1 . $config->tooltip->pos_at_2;
			$tooltip_style = $config->tooltip->style;
		}
		$enable_calendar_thumbs = $config->enable_calendar_thumbs;

		
		$today = date( 'Y-m-d' );
		$month = date('m' );
		$year = date('Y' );
		$start_datetime = isset( $_REQUEST['start_date'] ) ? date( 'Y-m-d H:i:s', absint( $_REQUEST['start_date'] )) : date('Y-m-d H:i:s', mktime( 0, 0, 0, $month, 1, $year ));
		$end_date = isset( $_REQUEST['end_date'] ) ? date( 'Y-m-d H:i:s', absint( $_REQUEST['end_date'] )) : date('Y-m-t H:i:s', mktime( 0, 0, 0, $month, 1, $year ));	
		$show_expired = isset( $_REQUEST['show_expired'] ) ? sanitize_key( $_REQUEST['show_expired'] ) : 'true';	
		// set boolean for categories 
		$use_categories = ! $config->disable_categories;
		$category_id_or_slug = isset( $_REQUEST['event_category_id'] ) && ! empty( $_REQUEST['event_category_id'] ) ? sanitize_key( $_REQUEST['event_category_id'] ) : $this->_event_category_id;
		$venue_id_or_slug = isset( $_REQUEST['event_venue_id'] ) && ! empty( $_REQUEST['event_venue_id'] ) ? sanitize_key( $_REQUEST['event_venue_id'] ) : NULL;
		if($category_id_or_slug){
			$where_params['OR*category'] = array('Event.Term_Taxonomy.Term.slug' => $category_id_or_slug,
												'Event.Term_Taxonomy.Term.term_id'=>$category_id_or_slug);
		}
		if($venue_id_or_slug){
			$where_params['OR*venue'] = array('Event.Venue.VNU_ID' => $venue_id_or_slug,
												'Event.Venue.VNU_identifier'=>$venue_id_or_slug);
		}
		$where_params['Event.status'] = 'publish';//@todo: how about sold_out, cancelled, etc events?
		
		$where_params['DTT_EVT_start']= array('<=',$end_date);
		$where_params['DTT_EVT_end'] = array('>=',$start_datetime);
		if($show_expired == 'false'){
			$where_params['DTT_EVT_end*3'] = array('>=',$today);
			$where_params['Ticket.TKT_end_date'] = array('>=',$today);
		}
		$datetime_objs = EEM_Datetime::instance()->get_all(array($where_params,'order_by'=>array('DTT_EVT_start'=>'ASC')));
		/* @var $datetime_objs EE_Datetime[] */
				
//	$this->timer->stop();
//	echo $this->timer->get_elapse( __LINE__ );
		
		$calendar_datetimes_for_json = array();
		foreach ( $datetime_objs as $datetime ) {
			/* @var $datetime EE_Datetime */
			$calendar_datetime = new EE_Datetime_In_Calendar($datetime);
//	$this->timer->start();
			$event = $datetime->event();
			/* @var $event EE_Event */
			if( ! $event ){
				EE_Error::add_error(sprintf(__("Datetime data for datetime with ID %d has no associated event!", "event_espresso"),$datetime->ID()));
				continue;
			}
			//Get details about the category of the event
			if ($use_categories) {
//				echo "using cateogires!";
				$primary_cat = $event->first_event_category();
				//any term_taxonmies set for this event?
//				d($primary_cat);
				if ( $primary_cat ) {
//					d($primary_cat->get_extra_meta('use_color_picker',true,false));
					if($primary_cat->get_extra_meta('use_color_picker',true,false)){
						$calendar_datetime->set_color($primary_cat->get_extra_meta('background_color',true,null));
						$calendar_datetime->set_textColor($primary_cat->get_extra_meta('text_color',true,null));
					}
					$calendar_datetime->set_eventType($primary_cat->slug());
//					d($calendar_datetime);
					if ( $enable_cat_classes ) {
						foreach ( $event->term_taxonomies() as $term_taxonomy ) {
							$calendar_datetime->add_classname($term_taxonomy->taxonomy());
						}				
					} else {
						$calendar_datetime->add_classname($primary_cat->slug());
					}
				}
				
			}

			if ( $datetime->is_expired() ) {
				$calendar_datetime->set_classname('expired');
			}
			

			$startTime =  '<span class="event-start-time">' . $datetime->start_time($config->time->format) . '</span>';
			$endTime = '<span class="event-end-time">' . $datetime->end_time($config->time->format) . '</span>';

			if ( $show_time && $startTime ) {
				$event_time_html = '<span class="time-display-block">' . $startTime;
				$event_time_html .= $endTime ? ' - ' . $endTime : '';
				$event_time_html .= '</span>';
			} else {
				$event_time_html = FALSE;
			}
			$calendar_datetime->set_event_time($event_time_html);
			
					
			// Add thumb to event
			if ( $enable_calendar_thumbs ) {
				
				$thumbnail_url = $event->feature_image_url('thumbnail');
				if ( $thumbnail_url ) { 
					$calendar_datetime->set_event_img_thumb( '
					<span class="thumb-wrap">
						<img id="ee-event-thumb-' . $datetime->ID() . '" class="ee-event-thumb" src="' . $thumbnail_url . '" alt="image of ' . $event->name() . '" />
					</span>');
					$calendar_datetime->add_classname('event-has-thumb');
				}
			}

//			$this->timer->stop();
//			echo $this->timer->get_elapse( __LINE__ );
//			$this->timer->start();

			if ( $show_tooltips ) {
				//Gets the description of the event. This can be used for hover effects such as jQuery Tooltips or QTip
				$description = $event->description_filtered();
				
				//Supports 3.1 short descriptions
//				if ( false ){// isset( $org_options['display_short_description_in_event_list'] ) && $org_options['display_short_description_in_event_list'] == 'Y' ) {
				$desciption_parts =  explode( '<!--more-->', $description);
				if(is_array($desciption_parts)){
					$description = array_shift($desciption_parts);
				}
//				}
				// and just in case it's still too long, or somebody forgot to use the more tag...
				//if word count is set to 0, set no limit
				$calendar_datetime->set_description($description);			
// tooltip wrapper
				$tooltip_html = '<div class="qtip_info">';
				// show time ?
				$tooltip_html .= $show_time && $startTime ? '<p class="time_cal_qtip">' . __('Event Time: ', 'event_espresso') . $startTime . ' - ' . $endTime . '</p>' : '';
				
				$tickets_initially_available_at_datetime = $datetime->sum_tickets_initially_available();

				// add attendee limit if set
				if ( $show_attendee_limit ) {
					$tickets_sold = $datetime->sold();
					$attendee_limit_text = $datetime->total_tickets_available_at_this_datetime() == -1 ? __('Available Spaces: unlimited', 'event_espresso') : __('Registrations / Spaces: ', 'event_espresso') . $tickets_sold . ' / ' . $tickets_initially_available_at_datetime;
					$tooltip_html .= ' <p class="attendee_limit_qtip">' .$attendee_limit_text . '</p>';
				}

				//add link
				$regButtonText = $event->display_reg_form() ?  __('Register Now', 'event_espresso') :  __('View Details', 'event_espresso');
				// reg open
				if ( $event->is_sold_out() || $datetime->sold_out() || $datetime->total_tickets_available_at_this_datetime() == 0) {
					$tooltip_html .= '<div class="sold-out-dv">' . __('Sold Out', 'event_espresso') . '</div>';				
				} else if($event->is_cancelled()){
					$tooltip_html .= '<div class="sold-out-dv">' . __('Registration Closed', 'event_espresso') . '</div>';				
				}else{
					'<a class="reg-now-btn" href="' . $event->get_permalink() . '">' . $regButtonText . '</a>';				
				}

				$tooltip_html .= '<div class="clear"></div>';
				$tooltip_html .= '</div>';
				$calendar_datetime->set_tooltip($tooltip_html);
				
				
				// Position my top left...
				$calendar_datetime->set_tooltip_my($tooltip_my);
				$calendar_datetime->set_tooltip_at($tooltip_at);
				$calendar_datetime->set_tooltip_style( $tooltip_style );
				$calendar_datetime->set_show_tooltips(true);
			} else {
				$calendar_datetime->set_show_tooltips(FALSE);
			}
			$calendar_datetimes_for_json [] = $calendar_datetime->to_array_for_json();
			
//			$this->timer->stop();
//			echo $this->timer->get_elapse( __LINE__ );

		}
//		echo '<h3>$events</h3><pre style="height:auto;border:2px solid lightblue;">' . print_r( $events, TRUE ) . '</pre><br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>';
		echo json_encode( $calendar_datetimes_for_json );
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
