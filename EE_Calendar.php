<?php
/*
  Plugin Name: Event Espresso - Calendar
  Plugin URI: http://www.eventespresso.com
  Description: A full calendar addon for Event Espresso. Includes month, week, and day views.
  Version: 3.0.0.reg
  Author: Event Espresso
  Author URI: http://www.eventespresso.com
  Copyright 2014 Event Espresso (email : support@eventespresso.com)

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
 * @ author			Event Espresso
 * @ copyright		(c) 2008-2014 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link				http://www.eventespresso.com
 * @ version		 	EE4
 *
 * ------------------------------------------------------------------------
 *
 * EE_Calendar
 *
 * @package			Event Espresso
 * @subpackage		espresso-calendar
 * @author			Seth Shoultes, Chris Reynolds, Brent Christensen, Michael Nelson
 *
 * ------------------------------------------------------------------------
 */
//if ee4 core is active, run the calendar
 add_action( 'AHEE__EE_System__load_espresso_addons', array( 'EE_Calendar', 'instance' ));
 //we need to register our activation hook before init or plugins_loaded (where we load teh calendar)
 register_activation_hook(__FILE__, array('EE_Calendar','register_activation_hook'));
 class EE_Calendar {
	 const activation_indicator_option_name = 'ee_espresso_calendar_activation';

	/**
	 * instance of the EE_Calendar object
	 *@var 		$_instance
	 * @access 	private
	 */
	private static $_instance = NULL;

	/**
	 * @var 	EE_Calendar_Config	$_calendar_options
	 * @access 	private
	 */
	private static $_calendar_config = NULL;

	/**
	 * @var 		INT	$_event_category_id
	 * @access 	private
	 */
	private $_event_category_id = 0;

	/**
	 * @var 	INT	$_event_venue_id
	 * @access 	private
	 */
	private $_event_venue_id = 0;

	/**
	 * for optimization purposes
	 * @access 	private
	 */
	private $timer = NULL;





	/**
	 *	@singleton method used to instantiate class object
	 *	@access public
	 *	@return EE_Calendar instance
	 */
	public static function instance() {
		// check if class object is instantiated
		if ( ! self::$_instance instanceof EE_Calendar ) {
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
		// calendar_version
		define( 'EE_CALENDAR_VERSION', '3.0.0.reg' );
		// define the plugin directory path and URL
		define( 'EE_CALENDAR_PATH', plugin_dir_path( __FILE__ ));
		define( 'EE_CALENDAR_URL', plugin_dir_url( __FILE__ ));
		define( 'EE_CALENDAR_PLUGIN_FILE', plugin_basename( __FILE__ ));
		define( 'EE_CALENDAR_FRONT', EE_CALENDAR_PATH . 'espresso_calendar' . DS );
		define( 'EE_CALENDAR_ADMIN', EE_CALENDAR_PATH . 'admin' . DS );
		define( 'EE_CALENDAR_DMS_PATH', EE_CALENDAR_PATH . 'data_migration_scripts' . DS );
		// we need cars
		$this->register_autoloaders();
		// GO !!!
		add_action( 'AHEE__EE_System__register_shortcodes_modules_and_addons', array( $this, 'plugins_loaded' ));
		// migrate data
		$this->_setup_data_migration_script_hooks();
	}

	/**
	 * Until we do something better, we'll just check for migration scripts upon
	 * plugin activation only. In the future, we'll want to do it on plugin updates too
	 */
	public static function register_activation_hook(){
		//let's just handle this on the next request, ok? right now we're just not really ready
		update_option(EE_Calendar::activation_indicator_option_name,true);
	}
	/**
	 * 	register_autoloaders
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function register_autoloaders() {
		EEH_Autoloader::instance()->register_autoloader( array(
			'EE_Calendar_Config' =>EE_CALENDAR_PATH . 'EE_Calendar_Config.php',
			'EE_Datetime_In_Calendar' =>EE_CALENDAR_PATH . 'EE_Datetime_In_Calendar.class.php',
			'EE_Calendar_Admin' => EE_CALENDAR_ADMIN . 'EE_Calendar_Admin.class.php',
			'Calendar_Admin_Page_Init' => EE_CALENDAR_ADMIN . 'calendar' . DS . 'Calendar_Admin_Page_Init.core.php',
		));
	}



	/**
	 * 	plugins_loaded
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function plugins_loaded() {
		//if core is also active, then get core to check for migration scripts
		//and set maintneance mode is necessary
		if(get_option(EE_Calendar::activation_indicator_option_name)){
			EE_Maintenance_Mode::instance()->set_maintenance_mode_if_db_old();
			delete_option(EE_Calendar::activation_indicator_option_name);
		}

		// is EE running and not in M-Mode ?
		if ( defined( 'EVENT_ESPRESSO_VERSION' ) && ! EE_Maintenance_Mode::instance()->level() ) {
			// calendar settings
			$this->_set_calendar_config();
			// add Calendar to list of shortcodes to be registered
			add_filter( 'FHEE__EE_Config__register_shortcodes__shortcodes_to_register', array( $this, 'add_shortcode' ));
			// add Calendar to list of widgets to be registered
			add_filter( 'FHEE__EE_Config__register_widgets__widgets_to_register', array( $this, 'add_widget' ));
			// load admin
			if ( is_admin() ) {
				// ajax hooks
				add_action( 'wp_ajax_get_calendar_events', array( $this, 'get_calendar_events' ));
				add_action( 'wp_ajax_nopriv_get_calendar_events', array( $this, 'get_calendar_events' ));
				 new EE_Calendar_Admin();
			}
		}
	}



	/**
	 * 	_get_calendar_config
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	private function _set_calendar_config() {
		//check that the EE_Calendar_Config is in the main config file
		if( ! isset( EE_Config::instance()->addons['calendar'] ) || ! EE_Config::instance()->addons['calendar'] instanceof EE_Calendar_Config ){
			EE_Config::instance()->addons['calendar'] = new EE_Calendar_Config();
			EE_Config::instance()->update_espresso_config();
		}
	}



	/**
	 * 	get_calendar_config
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function get_calendar_config() {
		if ( ! EE_Calendar::$_calendar_config ) {
			EE_Calendar::$_calendar_config = isset( EE_Config::instance()->addons['calendar'] ) || EE_Config::instance()->addons['calendar'] instanceof EE_Calendar_Config ? EE_Config::instance()->addons['calendar'] : new EE_Calendar_Config();
		}
		return EE_Calendar::$_calendar_config;
	}



	/**
	 * Filters the list of shortcodes to add ours.
	 * and they're just full filepaths to FOLDERS containing a shortcode class file. Eg.
	 * array('espresso_monkey'=>'/public_html/wondersite/wp-content/plugins/ee4/shortcodes/espresso_monkey',...)
	 * @param array $shortcodes_to_register  array of paths to all shortcodes that require registering
	 * @return array
	 */
	public function add_shortcode( $shortcodes_to_register ){
		$shortcodes_to_register[] = EE_CALENDAR_FRONT;
		return $shortcodes_to_register;
	}



	/**
	 * Filters the list of widgets to add ours.
	 * and they're just full filepaths to FOLDERS containing a shortcode class file. Eg.
	 * array('espresso_monkey'=>'/public_html/wondersite/wp-content/plugins/ee4/widgets/espresso_monkey',...)
	 * @param array $widgets_to_register  array of paths to all widgets that require registering
	 * @return array
	 */
	public function add_widget( $widgets_to_register = array() ) {
		$widgets_to_register[] = EE_CALENDAR_FRONT;
		return $widgets_to_register;
	}




	/**
	 * _setup_data_migration_script_hooks
	 * Adds the calendar migraiton scripts folder to core's
	 */
	protected function _setup_data_migration_script_hooks(){
		add_filter('FHEE__EE_Data_Migration_Manager__get_data_migration_script_folders',array($this,'add_calendar_migrations'));
	}
	/**
	 * Adds our data migration script folder
	 * @param array $folders_with_migration_scripts
	 * return array
	 */
	public function add_calendar_migrations($folders_with_migration_scripts){
		$folders_with_migration_scripts[] = EE_CALENDAR_DMS_PATH;
		return $folders_with_migration_scripts;
	}




	/**
	 * 	calendar_scripts - Load the scripts and css
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function calendar_scripts() {
		// get calendar options
		$calendar_config = EE_Calendar::get_calendar_config();
		//Load tooltips styles
		$show_tooltips = $calendar_config->tooltip->show;
		if ( $show_tooltips ) {
			// register jQuery qtip
			wp_register_style( 'qtip', EE_CALENDAR_URL . 'css/jquery.qtip.min.css' );
			wp_register_script( 'jquery-qtip', EE_CALENDAR_URL . 'scripts/jquery.qtip.js', array('jquery'), '2.1.1', TRUE);
		}

		// load base calendar style
		wp_register_style('fullcalendar', EE_CALENDAR_URL . 'css/fullcalendar.css');
		//Check to see if the calendar css file exists in the '/uploads/espresso/' directory
		if ( is_readable( EVENT_ESPRESSO_UPLOAD_DIR . "css/calendar.css")) {
			//This is the url to the css file if available
			wp_register_style('espresso_calendar', EVENT_ESPRESSO_UPLOAD_URL . 'css/calendar.css');
		} else {
			// EE calendar style
			wp_register_style('espresso_calendar', EE_CALENDAR_URL . 'css/calendar.css');
		}
		//core calendar script
		wp_register_script( 'fullcalendar-min-js', EE_CALENDAR_URL . 'scripts/fullcalendar.min.js', array('jquery'), '1.6.2', TRUE );
		wp_register_script( 'espresso_calendar', EE_CALENDAR_URL . 'scripts/espresso_calendar.js', array('fullcalendar-min-js'), EE_CALENDAR_VERSION, TRUE );

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
		$output_filter = '';
		if ( ! $ee_calendar_js_options['widget'] ) {
			// Query for Select box filters
			$ee_terms = EEM_Term::instance()->get_all(array(array('Term_Taxonomy.taxonomy'=>'espresso_event_categories')));
			$venues = EEM_Venue::instance()->get_all();

			if ( ! empty( $venues ) || !empty( $ee_terms )){

				ob_start();

				//@var $calendar_config EE_Calendar_Config
				$calendar_config = EE_Calendar::get_calendar_config();

				//Category legend
				if ( $calendar_config->display->enable_category_legend ){
					echo '
				<div id="espreso-category-legend">
					<p class="smaller-text lt-grey-txt">' .  __('Click to select a category:', 'event_espresso') . '</p>
					<ul id="ee-category-legend-ul">';

					foreach ($ee_terms as $ee_term) {
						/*@var $ee_term EE_Term */
						$catcode = $ee_term->ID();

						$bg = $ee_term->get_extra_meta( 'background_color',true, $calendar_config->display->event_background );
						$fontcolor =$ee_term->get_extra_meta( 'text_color',true, $calendar_config->display->event_text_color );
						$use_bg =$ee_term->get_extra_meta( 'use_color_picker', true );

						if($use_bg ) {
//							echo '<li id="ee-category-legend-li-'.$catcode.'" class="has-sub" style="border-left: 10px solid ' . $bg . ';">';
							echo '
							<li id="ee-category-legend-li-'.$catcode.'" class="has-sub" style="background: ' . $bg . ';">
								<span class="ee-category"><a href="?event_category_id='.$ee_term->slug().'" style="color: ' . $fontcolor . ';">'.$ee_term->name().'</a></span></a>
							</li>';
						} else {
//							echo '<li id="ee-category-li-'.$catcode.'" class="has-sub" style="border-left: 10px solid #CCC";>';
							echo '
							<li id="ee-category-li-'.$catcode.'" class="has-sub" style="background: #f3f3f3;" >
								<span class="ee-category"><a href="?event_category_id='.$ee_term->slug().'">'.$ee_term->name().'</a></span></a>
							</li>';
						}


					}
					//echo '<li class="has-sub" style="border-left:solid 1px #000;"><a href="?event_category_id">'.__('All', 'event_espresso').'</a></li>';
					echo '</ul></div>';
				}

				//Filter dropdowns
				if ($calendar_config->display->enable_calendar_filters ){
					?>
					<!-- select box filters -->
					<div class="ee-filter-form">
					<form name="filter-calendar-form" id="filter-calendar-form" method="post" action="">
					<?php if ( ! empty( $ee_terms )) { ?>
						<select id="ee-category-submit" class="submit-this ee-category-select" name="event_category_id">
						<option id="option" class="ee_select" value=""><?php echo __('Select a Category', 'event_espresso'); ?></option>
						<option class="ee_filter_show_all" value=""><?php echo __('Show All', 'event_espresso'); ?></option>
						<?php
							foreach( $ee_terms as $term ) {
								$selected = in_array( $ee_calendar_js_options['event_category_id'], array( $term->slug(), $term->ID() )) ? 'selected="selected"' : '';
								echo '<option ' . $selected . ' value="' . $term->slug() . '">' . $term->name() . '</option>';
							}
						?>
						</select>
					<?php }?>

					<?php if ( ! empty( $venues )) { ?>
						<select id="ee-venue-submit" class="submit-this ee-venue-select" name="event_venue_id">
						<option class="ee_select" value=""><?php echo __('Select a Venue', 'event_espresso'); ?></option>
						<option class="ee_filter_show_all" value=""><?php echo __('Show All', 'event_espresso'); ?></option>
						<?php
							foreach ( $venues as $venue ) {
								$selected = in_array( $ee_calendar_js_options['event_venue_id'], array( $venue->identifier(), $venue->ID() )) ? 'selected="selected"' : '';
							echo '<option ' . $selected . ' value="' . $venue->identifier() . '">' . stripslashes( $venue->name() ) . '</option>';
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
	 * 	display_calendar
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function display_calendar( $ee_calendar_js_options ) {
		// get calendar options
		$calendar_config = EE_Calendar::get_calendar_config()->to_flat_array();
		// merge incoming shortcode attributes with calendar config
		$ee_calendar_js_options = array_merge( $calendar_config, $ee_calendar_js_options );
		//if the user has changed the filters, those should override whatever the admin specified in the shortcode
		$js_option_event_category_id = isset( $ee_calendar_js_options['event_category_id'] ) ? $ee_calendar_js_options['event_category_id'] : NULL;
		$js_option_event_venue_id = isset( $ee_calendar_js_options['event_venue_id'] ) ? $ee_calendar_js_options['event_venue_id'] : NULL;
		// setup an array with overridden values in it
		$overrides = array(
			'event_category_id' => isset( $_REQUEST['event_category_id'] ) ? sanitize_key( $_REQUEST['event_category_id'] ) : $js_option_event_category_id,
			'event_venue_id'=> isset( $_REQUEST['event_venue_id'] ) ? sanitize_key( $_REQUEST['event_venue_id'] ) : $js_option_event_venue_id,
			'month'=> isset( $_REQUEST['month'] ) ? sanitize_text_field( $_REQUEST['month'] ) : $ee_calendar_js_options['month'],
			'year'=> isset( $_REQUEST['year'] ) ? sanitize_text_field( $_REQUEST['year'] ) : $ee_calendar_js_options['year'],
		);
		// merge overrides into options
		$ee_calendar_js_options = array_merge( $ee_calendar_js_options, $overrides );
		// set and format month param
		if ( ! is_int( $ee_calendar_js_options['month'] ) && strtotime( $ee_calendar_js_options['month'] )) {
			$ee_calendar_js_options['month'] = date('n', strtotime( $ee_calendar_js_options['month'] ));
		}
		// weed out any attempts to use month=potato or something similar
		$ee_calendar_js_options['month'] = is_int( $ee_calendar_js_options['month'] ) && $ee_calendar_js_options['month'] > 0 && $ee_calendar_js_options['month'] < 13 ? $ee_calendar_js_options['month'] : date('n');
		// fullcalendar uses 0-based value for month
		$ee_calendar_js_options['month']--;
		// set and format year param
		$ee_calendar_js_options['year'] = isset( $ee_calendar_js_options['year'] ) && is_int( $ee_calendar_js_options['year'] ) ? date('Y', strtotime( $ee_calendar_js_options['year'] )) : date('Y');
		// add calendar filters
		$output_filter = $this->_get_filter_html( $ee_calendar_js_options );
		// grab some request vars
		$this->_event_category_id = isset( $ee_calendar_js_options['event_category_id'] ) && ! empty( $ee_calendar_js_options['event_category_id'] ) ? $ee_calendar_js_options['event_category_id'] : '';
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


		// Get current page protocol
		$protocol = isset( $_SERVER["HTTPS"] ) ? 'https://' : 'http://';
		// Output admin-ajax.php URL with same protocol as current page
		$ee_calendar_js_options['ajax_url'] = admin_url( 'admin-ajax.php', $protocol );
//		printr( $ee_calendar_js_options, '$ee_calendar_js_options  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		wp_localize_script( 'espresso_calendar', 'eeCAL', $ee_calendar_js_options );

		$calendar_class = $ee_calendar_js_options['widget'] ? 'calendar_widget' : 'calendar_fullsize';

		$html = apply_filters( 'FHEE__EE_Calendar__display_calendar__before', '' );
		$html .= apply_filters( 'FHEE__EE_Calendar__display_calendar__output_filter', $output_filter );
		$html .= '
	<div id="espresso_calendar" class="'. $calendar_class . '"></div>
	<div style="clear:both;" ></div>
	<div id="espresso_calendar_images" ></div>';
		$html .= apply_filters( 'FHEE__EE_Calendar__display_calendar__after', '' );
		return $html;

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
		$config = EE_Calendar::get_calendar_config();
		if ( $config->tooltip->show ) {
			$tooltip_my = $config->tooltip->pos_my_1 . $config->tooltip->pos_my_2;
			$tooltip_at = $config->tooltip->pos_at_1 . $config->tooltip->pos_at_2;
			$tooltip_style = $config->tooltip->style;
		}

		$today = date( 'Y-m-d' );
		$month = date('m' );
		$year = date('Y' );
		$start_datetime = isset( $_REQUEST['start_date'] ) ? date( 'Y-m-d H:i:s', absint( $_REQUEST['start_date'] )) : date('Y-m-d H:i:s', mktime( 0, 0, 0, $month, 1, $year ));
		$end_date = isset( $_REQUEST['end_date'] ) ? date( 'Y-m-d H:i:s', absint( $_REQUEST['end_date'] )) : date('Y-m-t H:i:s', mktime( 0, 0, 0, $month, 1, $year ));
		$show_expired = isset( $_REQUEST['show_expired'] ) ? sanitize_key( $_REQUEST['show_expired'] ) : 'true';
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
			if ( ! $config->display->disable_categories) {
//				echo "using cateogires!";
				 $categories= $event->get_all_event_categories();

				//any term_taxonmies set for this event?
//				d($primary_cat);
				if ( $categories ) {
//					d($primary_cat->get_extra_meta('use_color_picker',true,false));
					$primary_cat = reset($categories);
					if($primary_cat->get_extra_meta('use_color_picker',true,false)){
						$calendar_datetime->set_color($primary_cat->get_extra_meta('background_color',true,null));
						$calendar_datetime->set_textColor($primary_cat->get_extra_meta('text_color',true,null));
					}
					$calendar_datetime->set_eventType($primary_cat->slug());
//					d($calendar_datetime);
					if ( $config->display->enable_cat_classes ) {
						foreach ( $categories as $category ) {
							$calendar_datetime->add_classname($category->slug());
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

			if ( $config->time->show && $startTime ) {
				$event_time_html = '<span class="time-display-block">' . $startTime;
				$event_time_html .= $endTime ? ' - ' . $endTime : '';
				$event_time_html .= '</span>';
			} else {
				$event_time_html = FALSE;
			}
			$calendar_datetime->set_event_time($event_time_html);


			// Add thumb to event
			if ( $config->display->enable_calendar_thumbs ) {

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

			if ( $config->tooltip->show ) {
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
				$tooltip_html .= $config->time->show && $startTime ? '<p class="time_cal_qtip">' . __('Event Time: ', 'event_espresso') . $startTime . ' - ' . $endTime . '</p>' : '';

				$tickets_initially_available_at_datetime = $datetime->sum_tickets_initially_available();

				// add attendee limit if set
				if ( $config->display->show_attendee_limit ) {
					$tickets_sold = $datetime->sold();
					$attendee_limit_text = $datetime->total_tickets_available_at_this_datetime() == -1 ? __('Available Spaces: unlimited', 'event_espresso') : __('Registrations / Spaces: ', 'event_espresso') . $tickets_sold . ' / ' . $tickets_initially_available_at_datetime;
					$tooltip_html .= ' <p class="attendee_limit_qtip">' .$attendee_limit_text . '</p>';
				}

				//add link
				$regButtonText = $event->display_ticket_selector() ?  __('Register Now', 'event_espresso') :  __('View Details', 'event_espresso');
				// reg open
				if ( $event->is_sold_out() || $datetime->sold_out() || $datetime->total_tickets_available_at_this_datetime() == 0) {
					$tooltip_html .= '<div class="sold-out-dv">' . __('Sold Out', 'event_espresso') . '</div>';
				} else if($event->is_cancelled()){
					$tooltip_html .= '<div class="sold-out-dv">' . __('Registration Closed', 'event_espresso') . '</div>';
				}else{
					$tooltip_html .= '<a class="reg-now-btn" href="' . $event->get_permalink() . '">' . $regButtonText . '</a>';
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

		echo json_encode( $calendar_datetimes_for_json );
		die();

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
// End of file espresso-calendar.php
// Location: /espresso-calendar/espresso-calendar.php
