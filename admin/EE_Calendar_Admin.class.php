<?php
/*
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link				http://www.eventespresso.com
 * @ version		 	EE4
 *
 * ------------------------------------------------------------------------
 *
 * EE_Calendar_Admin
 *
 * @package		Event Espresso
 * @subpackage	espresso-calendar
 * @author		Seth Shoultes, Chris Reynolds, Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EE_Calendar_Admin {

   /**
     * 	EE_Calendar Object
     * 	@var EE_Calendar $_instance
	 * 	@access 	private 	
     */
	private static $_instance = NULL;


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
//		echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		//register calendar admin page with the EE_Admin pages.
		add_action('AHEE__EE_Admin__loaded', array($this, 'register_admin' ) );
		add_filter( 'plugin_action_links', array( $this, 'plugin_actions' ), 10, 2 );
		add_action( 'action_hook_espresso_calendar_update_api', array( $this, 'load_pue_update' ));
		add_action( 'action_hook_espresso_featured_image_add_to_meta_box', array( $this, 'add_to_featured_image_meta_box' ));
		
	}



	public function register_admin() {
		EE_Admin::register_ee_admin_page( 'calendar', EE_CALENDAR_ADMIN . 'calendar' . DS );
	}



	
	/**
	 * 	load_pue_update - Update notifications
	 *
	 *  @return 	void
	 */
	public function load_pue_update() {

		if (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . 'class/pue/pue-client.php')) { //include the file 
			require(EVENT_ESPRESSO_PLUGINFULLPATH . 'class/pue/pue-client.php' );
			$host_server_url = 'http://eventespresso.com';
			$plugin_slug = array(
				'premium' => array('p' => 'espresso-calendar'),
				'prerelease' => array('BETA' => 'espresso-calendar-pr')
			);
			$options = array(
				'apikey' => EE_Registry::instance()->NET_CFG->core->site_license_key,
				'lang_domain' => 'event_espresso',
				'checkPeriod' => '24',
				'option_key' => 'site_license_key',
				'options_page_slug' => 'event_espresso',
				'plugin_basename' => EE_CALENDAR_PLUGIN_FILE,
				'use_wp_update' => FALSE, //if TRUE then you want FREE versions of the plugin to be updated from WP
			);	
			$check_for_updates = new PluginUpdateEngineChecker($host_server_url, $plugin_slug, $options); //initiate the class and start the plugin update engine!
		}
	}



	/**
	 * Add a settings link to the Plugins page, so people can go straight from the plugin page to the
	 * settings page.
	 */
	public function plugin_actions( $links, $file ) {
		if ( $file == EE_CALENDAR_PLUGIN_FILE ) {
			// before other links
			array_unshift( $links, '<a href="admin.php?page=espresso_calendar">' . __('Settings') . '</a>' ); 
		}
		return $links;
	}



	public function add_to_featured_image_meta_box($event_meta) {
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



}
