<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
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
 * EE_Admin
 *
 * @package			Event Espresso
 * @subpackage	/core/admin/
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
final class EE_Admin {

   /**
     * 	EE_Admin Object
     * 	@private _instance
	 * 	@private 	protected
     */
	private static $_instance = NULL;

	/**
	 * 	EE_Registry Object
	 *	@var 	EE_Registry	$EE
	 * 	@access 	protected
	 */
	protected $EE = NULL;




	/**
	 *@ singleton method used to instantiate class object
	 *@ access public
	 *@ return class instance
	 */
	public static function instance() {
		// check if class object is instantiated
		if ( self::$_instance === NULL  or ! is_object( self::$_instance ) or ! ( self::$_instance instanceof EE_Admin )) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}



   /**
     * class constructor
     */
	protected function __construct() {
		// define global EE_Admin constants
		$this->_define_all_constants();

		// admin hooks
		add_filter( 'plugin_action_links', array( $this, 'filter_plugin_actions' ), 10, 2 );
		// load EE_Request_Handler early
		add_action( 'AHEE__EE_System__core_loaded_and_ready', array( $this, 'get_request' ));
		add_action( 'AHEE__EE_System__initialize_last', array( $this, 'init' ));
		add_action( 'AHEE__EE_Admin_Page__route_admin_request', array( $this, 'route_admin_request' ), 100, 2 );
		add_action( 'wp_loaded', array( $this, 'wp_loaded' ), 100 );
		add_action( 'admin_init', array( $this, 'admin_init' ), 100 );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_scripts' ), 20 );
		add_action( 'admin_notices', array( $this, 'display_admin_notices' ), 10 );
		add_filter('admin_footer_text', array( $this, 'espresso_admin_footer' ));
		// pew pew pew
		EE_Registry::instance()->load_core( 'PUE' );

		do_action( 'AHEE__EE_Admin__loaded' );
	}





	/**
	 * _define_all_constants
	 * define constants that are set globally for all admin pages
	 *
	 * @access private
	 * @return void
	 */
	private function _define_all_constants() {
		define( 'EE_ADMIN_URL', EE_PLUGIN_DIR_URL . 'core/admin/' );
		define( 'EE_ADMIN_PAGES_URL', EE_PLUGIN_DIR_URL . 'admin_pages/' );
		define( 'EE_ADMIN_TEMPLATE', EE_ADMIN . 'templates' . DS );
		define( 'WP_ADMIN_PATH', ABSPATH . 'wp-admin/' );
		define( 'WP_AJAX_URL', get_bloginfo('url') . '/wp-admin/admin-ajax.php' );
		define( 'JQPLOT_URL', EE_GLOBAL_ASSETS_URL . 'scripts/jqplot/' );
	}



	/**
	 * 	filter_plugin_actions - adds links to the Plugins page listing
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function filter_plugin_actions( $links, $plugin ) {
		// set $main_file in stone
		static $main_file;
		// if $main_file is not set yet
		if ( ! $main_file ) {
			$main_file = plugin_basename( EVENT_ESPRESSO_MAIN_FILE );
		}
		 if ( $plugin == $main_file ) {
		 	// compare current plugin to this one
			if ( EE_Maintenance_Mode::instance()->level() == EE_Maintenance_Mode::level_2_complete_maintenance ) {
				$maintenance_link = '<a href="admin.php?page=espresso_maintenance_settings" title="Event Espresso is in maintenance mode.  Click this link to learn why.">' . __('Maintenance Mode Active', 'event_espresso' ) . '</a>';
				array_unshift( $links, $maintenance_link );
			} else {
				$org_settings_link = '<a href="admin.php?page=espresso_general_settings">' . __( 'Settings', 'event_espresso' ) . '</a>';
				$events_link = '<a href="admin.php?page=espresso_events">' . __( 'Events', 'event_espresso' ) . '</a>';
				// add before other links
				array_unshift( $links, $org_settings_link, $events_link );
			}
		}
		return $links;
	}



	/**
	 *	_get_request
	 *
	 *	@access public
	 *	@return void
	 */
	public function get_request() {
		EE_Registry::instance()->load_core( 'Request_Handler' );
		EE_Registry::instance()->load_core( 'CPT_Strategy' );
	}



	/**
	 *	hide_admin_pages_except_maintenance_mode
	 *
	 *	@access public
	 *	@return array
	 */
	public function hide_admin_pages_except_maintenance_mode( $admin_page_folder_names = array() ){
		return array('maintenance', 'about','support');
	}



	/**
	* init- should fire after shortcode, module,  addon, other plugin (default priority), and even EE_Front_Controller's init phases have run
	*
	* @access public
	* @return void
	*/
	public function init() {

		//if we're in maintenance mode level 2, we want to disable the entire admin, except the maintenance mode page(s)
		//however, we want to make use of the admin infrastructure still
		if ( EE_Maintenance_Mode::instance()->level() == EE_Maintenance_Mode::level_2_complete_maintenance ){
			add_filter( 'FHEE__EE_Admin_Page_Loader___get_installed_pages__installed_refs', array( $this, 'hide_admin_pages_except_maintenance_mode' ), 100);
		} else {
			//ok so we want to enable the entire admin
			add_action( 'wp_ajax_dismiss_ee_nag_notice', array( $this, 'dismiss_ee_nag_notice_callback' ));
			add_action( 'save_post', array( $this, 'parse_post_content_on_save' ), 100, 2 );
			add_filter( 'content_save_pre', array( $this, 'its_eSpresso' ), 10, 1 );
			add_action( 'admin_notices', array( $this, 'get_persistent_admin_notices' ), 9 );
			// bring out the pidgeons!!!
			EE_Registry::instance()->load_lib( 'Messages_Init' );
			//at a glance dashboard widget
			add_filter( 'dashboard_glance_items', array( $this, 'dashboard_glance_items'), 10 );
		}

		// run the admin page factory but ONLY if we are doing an ee admin ajax request
		if ( !defined('DOING_AJAX') || EE_ADMIN_AJAX ) {
			try {
				//this loads the controller for the admin pages which will setup routing etc
				EE_Registry::instance()->load_core( 'Admin_Page_Loader' );
			} catch ( EE_Error $e ) {
				$e->get_error();
			}
		}

		//make sure our cpts and custom taxonomy metaboxes get shown for first time users
		add_action('admin_head', array($this, 'enable_hidden_ee_nav_menu_metaboxes' ), 10 );
		add_action('admin_head', array( $this, 'register_custom_nav_menu_boxes' ), 10 );

		//exclude EE critical pages from all nav menus and wp_list_pages
		add_filter('nav_menu_meta_box_object', array( $this, 'remove_pages_from_nav_menu'), 10 );
	}




	/**
	 * this simply hooks into the nav menu setup of pages metabox and makes sure that we remove EE critical pages from the list of options.
	 *
	 * the wp function "wp_nav_menu_item_post_type_meta_box" found in wp-admin/includes/nav-menu.php looks for the "_default_query" property on the post_type object and it uses that to override any queries found in the existing query for the given post type.  Note that _default_query is not a normal property on the post_type object.  It's found ONLY in this particular context.
	 * @param  object $post_type WP post type object
	 * @return object            WP post type object
	 */
	public function remove_pages_from_nav_menu( $post_type ) {
		//if this isn't the "pages" post type let's get out
		if ( $post_type->name !== 'page' )
			return $post_type;

		$critical_pages = EE_Registry::instance()->CFG->core->get_critical_pages_array();

		$post_type->_default_query = array(
			'post__not_in' => $critical_pages );
		return $post_type;
	}



	/**
	 * WP by default only shows three metaboxes in "nav-menus.php" for first times users.  We want to make sure our metaboxes get shown as well
	 *
	 * @access public
	 * @return void
	 */
	public function enable_hidden_ee_nav_menu_metaboxes() {
		global $wp_meta_boxes, $pagenow;
		if ( ! is_array($wp_meta_boxes) || $pagenow !== 'nav-menus.php' )
			return;

		$initial_meta_boxes = array( 'nav-menu-theme-locations', 'add-page', 'add-custom-links', 'add-category', 'add-espresso_events', 'add-espresso_venues', 'add-espresso_event_categories', 'add-espresso_venue_categories' );
		$hidden_meta_boxes = array();

		foreach ( array_keys($wp_meta_boxes['nav-menus']) as $context ) {
			foreach ( array_keys($wp_meta_boxes['nav-menus'][$context]) as $priority ) {
				foreach ( $wp_meta_boxes['nav-menus'][$context][$priority] as $box ) {
					if ( in_array( $box['id'], $initial_meta_boxes ) ) {
						unset( $box['id'] );
					} else {
						$hidden_meta_boxes[] = $box['id'];
					}
				}
			}
		}

		$user = wp_get_current_user();
		update_user_option( $user->ID, 'metaboxhidden_nav-menus', $hidden_meta_boxes, true );
	}






	/**
	 * This method simply registers custom nav menu boxes for "nav_menus.php route"
	 *
	 * Currently EE is using this to make sure there are menu options for our CPT archive page routes.
	 *
	 * @todo modify this so its more dynamic and automatic for all ee cpts and setups and can also be hooked into by addons etc.
	 *
	 * @access public
	 * @return void
	 */
	public function register_custom_nav_menu_boxes() {
		add_meta_box( 'add-extra-nav-menu-pages', __('Event Espresso Pages', 'event_espresso'), array( $this, 'ee_cpt_archive_pages' ), 'nav-menus', 'side', 'core' );
	}




	public function ee_cpt_archive_pages() {
		global $nav_menu_selected_id;

		$db_fields = false;
		$walker = new Walker_Nav_Menu_Checklist( $db_fields );
		$current_tab = 'event-archives';
		$page_links = array();

		/*if ( ! empty( $_REQUEST['quick-search-posttype-' . $post_type_name] ) ) {
			$current_tab = 'search';
		}/**/

		$removed_args = array(
			'action',
			'customlink-tab',
			'edit-menu-item',
			'menu-item',
			'page-tab',
			'_wpnonce',
		);

		?>
		<div id="posttype-extra-nav-menu-pages" class="posttypediv">
			<ul id="posttype-extra-nav-menu-pages-tabs" class="posttype-tabs add-menu-item-tabs">
				<li <?php echo ( 'event-archives' == $current_tab ? ' class="tabs"' : '' ); ?>>
					<a class="nav-tab-link" data-type="tabs-panel-posttype-extra-nav-menu-pages-event-archives" href="<?php if ( $nav_menu_selected_id ) echo esc_url(add_query_arg('extra-nav-menu-pages-tab', 'event-archives', remove_query_arg($removed_args))); ?>#tabs-panel-posttype-extra-nav-menu-pages-event-archives">
						<?php _e( 'Event Archive Pages', 'event_espresso' ); ?>
					</a>
				</li>
				<!-- temporarily removing but leaving skeleton in place in case we ever decide to add more tabs.
				<li <?php echo ( 'all' == $current_tab ? ' class="tabs"' : '' ); ?>>
					<a class="nav-tab-link" data-type="<?php echo esc_attr( $post_type_name ); ?>-all" href="<?php if ( $nav_menu_selected_id ) echo esc_url(add_query_arg($post_type_name . '-tab', 'all', remove_query_arg($removed_args))); ?>#<?php echo $post_type_name; ?>-all">
						<?php _e( 'View All' ); ?>
					</a>
				</li>
				<li <?php echo ( 'search' == $current_tab ? ' class="tabs"' : '' ); ?>>
					<a class="nav-tab-link" data-type="tabs-panel-posttype-extra-nav-menu-pages-search" href="<?php if ( $nav_menu_selected_id ) echo esc_url(add_query_arg('extra-nav-menu-pages-tab', 'search', remove_query_arg($removed_args))); ?>#tabs-panel-posttype-extra-nav-menu-pages-search">
						<?php _e( 'Search'); ?>
					</a>
				</li> -->
			</ul><!-- .posttype-tabs -->

			<div id="tabs-panel-posttype-extra-nav-menu-pages-event-archives" class="tabs-panel <?php
			echo ( 'event-archives' == $current_tab ? 'tabs-panel-active' : 'tabs-panel-inactive' );
			?>">
				<ul id="extra-nav-menu-pageschecklist-event-archives" class="categorychecklist form-no-clear">
					<?php
					$pages = $this->_get_extra_nav_menu_pages_items();
					$args['walker'] = $walker;
					echo walk_nav_menu_tree( array_map( array( $this, '_setup_extra_nav_menu_pages_items' ), $pages), 0, (object) $args );
					?>
				</ul>
			</div><!-- /.tabs-panel -->

			<p class="button-controls">
				<span class="list-controls">
					<a href="<?php
						echo esc_url( add_query_arg(
							array(
								'extra-nav-menu-pages-tab' => 'event-archives',
								'selectall' => 1,
							),
							remove_query_arg( $removed_args )
						));
					?>#posttype-extra-nav-menu-pages>" class="select-all"><?php _e('Select All'); ?></a>
				</span>

				<span class="add-to-menu">
					<input type="submit"<?php wp_nav_menu_disabled_check( $nav_menu_selected_id ); ?> class="button-secondary submit-add-to-menu right" value="<?php esc_attr_e( __( 'Add to Menu' ) ); ?>" name="add-post-type-menu-item" id="<?php esc_attr_e( 'submit-posttype-extra-nav-menu-pages' ); ?>" />
					<span class="spinner"></span>
				</span>
			</p>

		</div><!-- /.posttypediv -->

		<?php
	}



	/**
	 * Returns an array of event archive nav items.
	 *
	 * @todo  for now this method is just in place so when it gets abstracted further we can substitue in whatever method we use for getting the extra nav menu items
	 * @return array
	 */
	private function _get_extra_nav_menu_pages_items() {
		$menuitems[] = array(
			'title' => __('Event List', 'event_espresso'),
			'url' => get_post_type_archive_link( 'espresso_events' ),
			'description' => __('Archive page for all events.', 'event_espresso')
		);
		return apply_filters( 'FHEE__EE_Admin__get_extra_nav_menu_pages_items', $menuitems );
	}



	/**
	 * Setup nav menu walker item for usage in the event archive nav menu metabox.  It receives a menu_item array with the properites and converts it to the menu item object.
	 *
	 * @see wp_setup_nav_menu_item() in wp-includes/nav-menu.php
	 * @return stdClass
	 */
	private function _setup_extra_nav_menu_pages_items( $menuitem ) {
		$menu_item = new stdClass();
		$keys = array(
			'ID' => 0,
			'db_id' => 0,
			'menu_item_parent' => 0,
			'object_id' => -1,
			'post_parent' => 0,
			'type' => 'custom',
			'object' => '',
			'type_label' => __('Extra Nav Menu Item', 'event_espresso'),
			'title' => '',
			'url' => '',
			'target' => '',
			'attr_title' => '',
			'description' => '',
			'classes' => array(),
			'xfn' => ''
			);

		foreach ( $keys as $key => $value) {
			$menu_item->$key = isset($menuitem[$key]) ? $menuitem[$key] : $value;
		}
		return $menu_item;
	}


	/**
	 * This is the action hook for the AHEE__EE_Admin_Page__route_admin_request hook that fires off right before an EE_Admin_Page route is called.
	 *
	 * @param  string 		 $route 	  The route being called
	 * @param  EE_Admin_Page $admin_page  The EE_Admin_Page object
	 * @return void
	 */
	public function route_admin_request() {
		// messages loading is turned OFF by default, but prior to the AHEE__EE_Admin_Page__route_admin_request hook, can be turned back on again via: add_filter( 'FHEE_load_EE_messages', '__return_true' );
		if ( apply_filters( 'FHEE_load_EE_messages', FALSE )) {
			EE_Registry::instance()->load_lib( 'Messages_Init' );
		}
	}



	/**
	 * wp_loaded should fire on the WordPress wp_loaded hook.  This fires on a VERY late priority.
	 * @return void
	 */
	public function wp_loaded() {}




	/**
	* admin_init
	*
	* @access public
	* @return void
	*/
	public function admin_init() {
	}


	/**
	 * enqueue all admin scripts that need loaded for admin pages
	 *
	 * @accee public
	 * @return void
	 */
	public function enqueue_admin_scripts() {
		//this javascript is loaded on every admin page to catch any injections ee needs to add to wp run js.  Note the intention of this script is to only do TARGETED injections.  I.E, only injecting on certain script calls.
		wp_enqueue_script('ee-inject-wp', EE_ADMIN_URL . 'assets/ee-cpt-wp-injects.js', array('jquery'), EVENT_ESPRESSO_VERSION, TRUE);

		//register cookie script for future dependencies
		wp_register_script('jquery-cookie', EE_THIRD_PARTY_URL . 'joyride/jquery.cookie.js', array('jquery'), '2.1', TRUE );

		// jquery_validate loading is turned OFF by default, but prior to the admin_enqueue_scripts hook, can be turned back on again via:  add_filter( 'FHEE_load_jquery_validate', '__return_true' );
		if ( apply_filters( 'FHEE_load_jquery_validate', FALSE ) ) {
			$jquery_validate_url = EE_GLOBAL_ASSETS_URL . 'scripts/jquery.validate.min.js';
			// register jQuery Validate
			wp_register_script('jquery-validate', $jquery_validate_url, array('jquery'), '1.11.1', TRUE);
		}

		//joyride is turned OFF by default, but prior to the admin_enqueue_scripts hook, can be turned back on again vai: add_filter('FHEE_load_joyride', '__return_true' );
		if ( apply_filters( 'FHEE_load_joyride', FALSE ) ) {
			$joyride_js = EE_THIRD_PARTY_URL . 'joyride/jquery.joyride-2.1.js';
			$joyride_modenizr_js = EE_THIRD_PARTY_URL . 'joyride/modernizr.mq.js';
			$joyride_css = EE_THIRD_PARTY_URL . 'joyride/joyride-2.1.css';

			//joyride style
			wp_register_style('joyride-css', $joyride_css, array(), '2.1');

			wp_register_script('joyride-modenizr', $joyride_modenizr_js, array(), '2.1', TRUE );

			//joyride
			wp_register_script('jquery-joyride', $joyride_js, array('jquery-cookie', 'joyride-modenizr'), '2.1', TRUE );

			wp_enqueue_style('joyride-css');
			wp_enqueue_script('jquery-joyride');
		}

		//qtip is turned OFF by default, but prior to the admin_enqueue_scripts hook, can be turned back on again via: add_filter('FHEE_load_qtips', '__return_true' );
		if ( apply_filters( 'FHEE_load_qtip', FALSE ) ) {
			EE_Registry::instance()->load_helper('Qtip_Loader');
			EEH_Qtip_Loader::instance()->register_and_enqueue();
		}


		//accounting.js library
		// @link http://josscrowcroft.github.io/accounting.js/
		if ( apply_filters( 'FHEE_load_accounting_js', FALSE ) ) {
			$acct_js = EE_THIRD_PARTY_URL . 'accounting/accounting.js';
			wp_register_script( 'ee-accounting', EE_GLOBAL_ASSETS_URL . 'scripts/ee-accounting-config.js', array('ee-accounting-core'), EVENT_ESPRESSO_VERSION, TRUE );
			wp_register_script( 'ee-accounting-core', $acct_js, array('underscore'), '0.3.2', TRUE );
			wp_enqueue_script( 'ee-accounting' );

			$currency_config = array(
				'currency' => array(
					'symbol' => EE_Registry::instance()->CFG->currency->sign,
					'format' => array(
						'pos' => EE_Registry::instance()->CFG->currency->sign_b4 ? '%s%v' : '%v%s',
						'neg' => EE_Registry::instance()->CFG->currency->sign_b4 ? '- %s%v' : '- %v%s',
						'zero' => EE_Registry::instance()->CFG->currency->sign_b4 ? '%s--' : '--%s'
						 ),
					'decimal' => EE_Registry::instance()->CFG->currency->dec_mrk,
					'thousand' => EE_Registry::instance()->CFG->currency->thsnds,
					'precision' => EE_Registry::instance()->CFG->currency->dec_plc
					),
				'number' => array(
					'precision' => EE_Registry::instance()->CFG->currency->dec_plc,
					'thousand' => EE_Registry::instance()->CFG->currency->thsnds,
					'decimal' => EE_Registry::instance()->CFG->currency->dec_mrk
					)
				);
			wp_localize_script('ee-accounting', 'EE_ACCOUNTING_CFG', $currency_config);
		}
	}



	/**
	 * 	display_admin_notices
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public function display_admin_notices() {
		echo EE_Error::get_notices();
	}



	/**
	 * 	get_persistent_admin_notices
	 *
	 *  	@access 	public
	 *  	@return 		void
	 */
	public function get_persistent_admin_notices() {
		// http://www.example.com/wp-admin/admin.php?page=espresso_general_settings&action=critical_pages&critical_pages_nonce=2831ce0f30
		$args = array(
			'page' => EE_Registry::instance()->REQ->is_set( 'page' ) ? EE_Registry::instance()->REQ->get( 'page' ) : '',
			'action' => EE_Registry::instance()->REQ->is_set( 'action' ) ? EE_Registry::instance()->REQ->get( 'action' ) : '',
		);
		$return_url = EE_Admin_Page::add_query_args_and_nonce( $args, EE_ADMIN_URL );
		echo EE_Error::get_persistent_admin_notices( $return_url );
	}



	/**
	* 	dismiss_persistent_admin_notice
	*
	*	@access 	public
	* 	@return 		void
	*/
	public function dismiss_ee_nag_notice_callback() {
		EE_Error::dismiss_persistent_admin_notice();
	}



	public function dashboard_glance_items( $elements ) {
		$events = EEM_Event::instance()->count();
		$items['events']['url'] = EE_Admin_Page::add_query_args_and_nonce( array('page' => 'espresso_events'), EVENTS_ADMIN_URL );
		$items['events']['text'] = sprintf( _n( '%s Event', '%s Events', $events ), number_format_i18n( $events ) );
		$items['events']['title'] = __('Click to view all Events', 'event_espresso');
		$registrations = EEM_Registration::instance()->count();
		$items['registrations']['url'] = EE_Admin_Page::add_query_args_and_nonce( array('page' => 'espresso_registrations' ), REG_ADMIN_URL );
		$items['registrations']['text'] = sprintf( _n( '%s Registration', '%s Registrations', $registrations ), number_format_i18n($registrations) );
		$items['registrations']['title'] = __('Click to view all registrations', 'event_espresso');

		$items = apply_filters( 'FHEE__EE_Admin__dashboard_glance_items__items', $items );

		foreach ( $items as $item ) {
			$elements[] = sprintf( '<a href="%s" title="%s">%s</a>', $item['url'], $item['title'], $item['text'] );
		}
		return $elements;
	}








	/**
	 * 	parse_post_content_on_insert
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function parse_post_content_on_save( $post_ID, $post ) {
		// default post types
		$post_types = array( 'post' => 0, 'page' => 1 );
		// add CPTs
		$CPTs = EE_Register_CPTs::get_CPTs();
		$post_types = array_merge( $post_types, $CPTs );
		// for default or CPT posts...
		if ( isset( $post_types[ $post->post_type ] )) {
			// post on frontpage ?
			$show_on_front = get_option('show_on_front');
			$update_post_shortcodes = FALSE;
			// array of shortcodes indexed by post name
			EE_Registry::instance()->CFG->core->post_shortcodes = isset( EE_Registry::instance()->CFG->core->post_shortcodes ) ? EE_Registry::instance()->CFG->core->post_shortcodes : array();
			// empty both arrays
			EE_Registry::instance()->CFG->core->post_shortcodes[ $post->post_name ] = array();
			// loop thru shortcodes
			foreach ( EE_Registry::instance()->shortcodes as $EES_Shortcode => $shortcode_dir ) {
				// strip class prefix and convert to UPPERCASE
				$EES_Shortcode = strtoupper( $EES_Shortcode );
				// is the shortcode in the post_content ?
				if ( strpos( $post->post_content, $EES_Shortcode ) !== FALSE ) {
					// map shortcode to post names and post IDs
					EE_Registry::instance()->CFG->core->post_shortcodes[ $post->post_name ][ $EES_Shortcode ] = $post_ID;
					// and to frontpage in case it's displaying latest posts (don't need to track IDs for this)
					EE_Registry::instance()->CFG->core->post_shortcodes[ $show_on_front ][ $EES_Shortcode ] = $post_ID;
					$update_post_shortcodes = TRUE;
				}
			}

			if ( $update_post_shortcodes ) {
				EE_Registry::instance()->CFG->update_post_shortcodes();
			}
		}
	}



	/**
	 * 	its_eSpresso - converts the less commonly used spelling of "Expresso" to "Espresso"
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function its_eSpresso( $content ) {
		return str_replace( '[EXPRESSO_', '[ESPRESSO_', $content );
	}



	/**
	 * 	espresso_admin_footer
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function espresso_admin_footer() {
		return sprintf(
			__( 'Event Registration and Ticketing Powered by %sEvent Registration Powered by Event Espresso%s', 'event_espresso' ),
			'<a href="http://eventespresso.com/" title="',
			'">' . EVENT_ESPRESSO_POWERED_BY . '</a>'
		);
	}



	/**
	 * static method for registering ee admin page.
	 *
	 * This method is deprecated in favor of the new location in EE_Register_Admin_Page::register.
	 *
	 * @since 4.3.0
	 * @deprecated 4.3.0	Use EE_Register_Admin_Page::register() instead
	 * @see EE_Register_Admin_Page::register()
	 *
	 * @return void
	 */
	public static function register_ee_admin_page( $page_basename, $page_path, $config = array() ) {
		EE_Error::doing_it_wrong( __METHOD__, sprintf( __('Usage is deprecated.  Use EE_Register_Admin_Page::register() for registering the %s admin page.', 'event_espresso'), $page_basename), '4.4' );
		if ( class_exists( 'EE_Register_Admin_Page' ) )
			EE_Register_Admin_Page::register( $page_basename, $page_path, $config );
	}


}
// End of file EE_Admin.core.php
// Location: /core/admin/EE_Admin.core.php
