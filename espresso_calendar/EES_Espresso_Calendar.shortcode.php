<?php if ( ! defined( 'EVENT_ESPRESSO_VERSION' )) { exit(); }
/*
 * ------------------------------------------------------------------------
 *
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
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
 * @author			Seth Shoultes, Chris Reynolds, Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EES_Espresso_Calendar  extends EES_Shortcode {


	/**
	 * @var 	EE_Calendar_Config	$_calendar_options
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
	 * 	set_hooks - for hooking into EE Core, modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks() {
		add_action( 'plugins_loaded', array( EES_Espresso_Calendar::instance(), 'plugins_loaded' ));	
		add_action( 'widgets_init', array( EES_Espresso_Calendar::instance(), 'widget_init' ));		
	}

	/**
	 * 	set_hooks_admin - for hooking into EE Admin Core, modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks_admin() {
		// ajax hooks
		add_action( 'wp_ajax_get_calendar_events', array( EES_Espresso_Calendar::instance(), 'get_calendar_events' ));
		add_action( 'wp_ajax_nopriv_get_calendar_events', array( EES_Espresso_Calendar::instance(), 'get_calendar_events' ));			
	}



	/**
	 * 	set_definitions
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_definitions() {
	}



	/**
	 * 	run - initial shortcode module setup called during "wp_loaded" hook
	 * 	this method is primarily used for loading resources that will be required by the shortcode when it is actually processed
	 *
	 *  @access 	public
	 *  @param 	 WP $WP
	 *  @return 	void
	 */
	public function run( WP $WP ) {
		add_action( 'wp_enqueue_scripts', array( EES_Espresso_Calendar::instance(), 'calendar_scripts' ));
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
		$this->_calendar_config = isset ( EE_Config::instance()->addons['calendar'] ) && EE_Config::instance()->addons['calendar'] instanceof EE_Calendar_Config ? EE_Config::instance()->addons['calendar'] : new EE_Calendar_Config();
		return $this->_calendar_config;
	}

	/**
	 * 	calendar_scripts - Load the scripts and css
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function calendar_scripts() {
		// get calendar options
		$calendar_config = $this->_get_calendar_options();
		//Load tooltips styles
		$show_tooltips = $calendar_config->tooltip->show;
		if ( $show_tooltips ) {
			// register jQuery qtip
			wp_register_style( 'qtip', EE_CALENDAR_PLUGINFULLURL . 'css/jquery.qtip.min.css' );
			wp_register_script( 'jquery-qtip', EE_CALENDAR_PLUGINFULLURL . 'scripts/jquery.qtip.js', array('jquery'), '2.1.1', TRUE);			
		}
		
		// load base calendar style
		wp_register_style('fullcalendar', EE_CALENDAR_PLUGINFULLURL . 'css/fullcalendar.css'); 
		//Check to see if the calendar css file exists in the '/uploads/espresso/' directory
		if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "css/calendar.css")) {
			//This is the url to the css file if available
			wp_register_style('espresso_calendar', EVENT_ESPRESSO_UPLOAD_URL . 'css/calendar.css'); 
		} else {
			// EE calendar style
			wp_register_style('espresso_calendar', EE_CALENDAR_PLUGINFULLURL . 'css/calendar.css'); 
		}
		//core calendar script
		wp_register_script( 'fullcalendar-min-js', EE_CALENDAR_PLUGINFULLURL . 'scripts/fullcalendar.min.js', array('jquery'), '1.6.2', TRUE ); 
		wp_register_script( 'espresso_calendar', EE_CALENDAR_PLUGINFULLURL . 'scripts/espresso_calendar.js', array('fullcalendar-min-js'), EE_CALENDAR_VERSION, TRUE ); 

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
	 * 	process_shortcode
	 * 	
	 * 	[ESPRESSO_CALENDAR]
	 * 	[ESPRESSO_CALENDAR show_expired="true"]
	 * 	[ESPRESSO_CALENDAR event_category_id="your_category_identifier"]
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function process_shortcode( $shortcode_atts ) {
		
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
		
		$where_params['DTT_EVT_start*1']= array('>=',$start_datetime);
		$where_params['DTT_EVT_start*2'] = array('<=',$end_date);
		if($show_expired == 'false'){
			$where_params['DTT_EVT_start*3'] = array('>=',$today);
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
		if ( ! file_exists( EE_CALENDAR_PLUGINFULLPATH . 'espresso-calendar-widget.php' )) {
			echo 'An error occurred. The file espresso-calendar-widget.php could not be found.';
		} else {		
			include_once(EE_CALENDAR_PLUGINFULLPATH . 'espresso-calendar-widget.php');
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
// End of file EES_Espresso_Calendar.shortcode.php
// Location: /espresso-calendar/inc/EES_Espresso_Calendar.shortcode.php