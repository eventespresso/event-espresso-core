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
 * Event List
 *
 * @package			Event Espresso
 * @subpackage	/modules/event_list/
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EED_Event_List  extends EED_Module {


	/**
	 * 	Start Date
	 *	@var 	$_elf_month
	 * 	@access 	protected
	 */
	protected $_elf_month = NULL;


	/**
	 * 	Category
	 *	@var 	$_elf_category
	 * 	@access 	protected
	 */
	protected $_elf_category = NULL;


	/**
	 * 	whether to display expired events in the event list
	 *	@var 	$_show_expired
	 * 	@access 	protected
	 */
	protected $_show_expired = NULL;


	/**
	 * 	whether to display the event list as a grid or list
	 *	@var 	$_default_view
	 * 	@access 	protected
	 */
	protected static $_default_view = NULL;




	/**
	 * 	set_hooks - for hooking into EE Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks() {
		EE_Config::register_route( __( 'events', 'event_espresso' ), 'Event_List', 'run' );
//		EE_Config::register_route( 'event_list', 'Event_List', 'event_list' );		
		add_action( 'wp_loaded', array( 'EED_Event_List', 'set_definitions' ), 2 );
	}

	/**
	 * 	set_hooks_admin - for hooking into EE Admin Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks_admin() {
		add_filter('FHEE__Config__update_config__CFG', array( 'EED_Event_List', 'filter_config' ), 10 );
		add_filter( 'FHEE__Event_List__template_settings_form__event_list_config', array( 'EED_Event_List', 'set_default_settings' ));
		add_action( 'AHEE__general_settings_admin__template_settings__before_settings_form', array( 'EED_Event_List', 'template_settings_form' ), 10 );
		add_action( 'wp_loaded', array( 'EED_Event_List', 'set_definitions' ), 2 );
		add_filter( 'FHEE__General_Settings_Admin_Page__update_template_settings__data', array( 'EED_Event_List', 'update_template_settings' ), 10, 2 );
	}




	/**
	 * 	set_definitions
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_definitions() {
		define( 'EVENT_LIST_ASSETS_URL', plugin_dir_url( __FILE__ ) . 'assets' . DS );
		define( 'EVENT_LIST_TEMPLATES_PATH', str_replace( '\\', DS, plugin_dir_path( __FILE__ )) . 'templates' . DS );
	}



	/**
	 * 	run - initial module setup
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function run( $WP ) {
		$this->_initial_setup();
		EE_Config::register_view( 'events', 0, $this->_get_template('full') );	
	}



	/**
	 * 	event_list
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function event_list() {		
//		global $wp_query;
//		$this->EE->load_helper('Event_View');
//		$this->_initial_setup();
//		$args = array( 'post_type' => 'espresso_events' );
//		$wp_query = new WP_Query( $args );
//		$wp_query = EEH_Event_View::get_event_datetimes_and_tickets_for_WP_Query( $wp_query );	
//		ob_start();
//		include( $this->_get_template('part') );
//		$output = ob_get_clean();	
//		$this->EE->REQ->output .= $output;
//		wp_reset_query();
	}



	/**
	 * 	_initial_setup
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	private function _initial_setup() {
		// grab POST data
		$this->get_post_data();		
		// build event list query
		add_action( 'posts_join', array( 'EED_Event_List', 'posts_join' ), 1 );
		add_action( 'posts_where', array( 'EED_Event_List', 'posts_where' ), 1 );
		add_action( 'posts_orderby', array( 'EED_Event_List', 'posts_orderby' ), 1 );

		add_filter( 'FHEE_load_css', '__return_true' );
		add_filter( 'FHEE_load_EE_Session', '__return_true' );
		add_action('wp_enqueue_scripts', array( $this, 'wp_enqueue_scripts' ), 10 );
		remove_all_filters( 'excerpt_length' );
		add_filter( 'excerpt_length', array( $this, 'excerpt_length' ), 10 );
		add_filter( 'excerpt_more', array( $this, 'excerpt_more' ), 10 );
		//add_filter( 'the_excerpt', array( $this, 'the_excerpt' ), 999 );
		add_action( 'AHEE__archive_event_list_template__after_header', array( $this, 'event_list_template_filters' ));
		$this->EE->load_helper( 'Event_View' );
	}



	/**
	 * 	get_post_data
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function get_post_data() {
		$this->_elf_month = $this->EE->REQ->is_set( 'elf_month_dd' ) ? sanitize_text_field( $this->EE->REQ->get( 'elf_month_dd' )) : '';
		$this->_elf_category = $this->EE->REQ->is_set( 'elf_category_dd' ) ? sanitize_text_field( $this->EE->REQ->get( 'elf_category_dd' )) : '';
		$display_expired_events = isset( EE_Registry::instance()->CFG->EED_Event_List['display_expired_events'] ) ? EE_Registry::instance()->CFG->EED_Event_List['display_expired_events'] : FALSE;
		$this->_show_expired = $this->EE->REQ->is_set( 'elf_expired_chk' ) ? absint( $this->EE->REQ->get( 'elf_expired_chk' )) : FALSE;
		$default_view = isset( EE_Registry::instance()->CFG->EED_Event_List['default_view'] ) ? EE_Registry::instance()->CFG->EED_Event_List['default_view'] : 'grid';
		self::$_default_view = $this->EE->REQ->is_set( 'elf_default_view' ) ? sanitize_text_field( $this->EE->REQ->get( 'elf_default_view' )) : $default_view;
//		printr( $this->EE->REQ, '$this->EE->REQ  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//		echo '<h4>$this->_elf_month : ' . $this->_elf_month . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		echo '<h4>$this->_elf_category : ' . $this->_elf_category . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		printr( $this->_elf_category, '$this->_elf_category  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//		echo '<h4>$this->_show_expired : ' . $this->_show_expired . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		echo '<h4>$this->_default_view : ' . $this->_default_view . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
	}


	/**
	 * 	posts_join
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function posts_join( $SQL ) {
		global $wpdb, $wp_query;
		if ( $wp_query->is_main_query() ) {
			// Category
			$elf_category = EE_Registry::instance()->REQ->is_set( 'elf_category_dd' ) ? sanitize_text_field( EE_Registry::instance()->REQ->get( 'elf_category_dd' )) : '';
			if ( ! empty( $elf_category )) {
				$SQL .= "LEFT JOIN $wpdb->term_relationships ON ($wpdb->posts.ID = $wpdb->term_relationships.object_id)";
				$SQL .= "LEFT JOIN $wpdb->term_taxonomy ON ($wpdb->term_relationships.term_taxonomy_id = $wpdb->term_taxonomy.term_taxonomy_id)";
				$SQL .= "LEFT JOIN $wpdb->terms ON ($wpdb->terms.term_id = $wpdb->term_taxonomy.term_id)";
			}
		}
		return $SQL;
	}


	/**
	 * 	posts_where
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function posts_where( $SQL ) {
		global $wpdb, $wp_query;
		if ( $wp_query->is_main_query() ) {			
			// Show Expired ?
			$display_expired_events = isset( EE_Registry::instance()->CFG->EED_Event_List['display_expired_events'] ) ? EE_Registry::instance()->CFG->EED_Event_List['display_expired_events'] : FALSE;
			// override default expired option if set via filter
			$show_expired = EE_Registry::instance()->REQ->is_set( 'elf_expired_chk' ) ? absint( EE_Registry::instance()->REQ->get( 'elf_expired_chk' )) : FALSE;
			$SQL .= ! $show_expired ? ' AND ' . EE_DATETIME_TABLE . '.DTT_EVT_start >= "' . date('Y-m-d H:s:i') . '" ' : '';
			// Category
			$elf_category = EE_Registry::instance()->REQ->is_set( 'elf_category_dd' ) ? sanitize_text_field( EE_Registry::instance()->REQ->get( 'elf_category_dd' )) : '';
			$SQL .=  ! empty( $elf_category ) ? ' AND ' . $wpdb->terms . '.slug = "' . $elf_category . '" ' : '';
			// Start Date
			$elf_month = EE_Registry::instance()->REQ->is_set( 'elf_month_dd' ) ? sanitize_text_field( EE_Registry::instance()->REQ->get( 'elf_month_dd' )) : '';
			$SQL .= ! empty( $elf_month ) ? ' AND ( ' . EE_DATETIME_TABLE . '.DTT_EVT_start >= "' . date('Y-m-d 0:0:00', strtotime( $elf_month )) . '" AND ' . EE_DATETIME_TABLE . '.DTT_EVT_start <= "' . date('Y-m-t 23:59:59', strtotime( $elf_month )) . '" ) ' : '';
		}
		return $SQL;
	}


	/**
	 * 	posts_orderby
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function posts_orderby( $SQL ) {
		global $wpdb, $wp_query;
		if ( $wp_query->is_main_query() ) {			
			$SQL = ' ' . EE_DATETIME_TABLE . '.DTT_EVT_start ASC ';
		}
		return $SQL;
	}





	/**
	 * 	_get_template
	 *
	 *  @access 	private
	 *  @return 	string
	 */
	private function _get_template( $which = 'part' ) {
		return EVENT_LIST_TEMPLATES_PATH . 'archive-espresso_events.template.php';		
	}



	/**
	 * 	excerpt_length
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function excerpt_length( $length ) {
		
		if ( self::$_default_view == 'list' ) {
			return 36;
		}
		
		switch ( EE_Registry::instance()->CFG->EED_Event_List['event_list_grid_size'] ) {
			case 'tiny' :
					return 12;
				break;
			case 'small' :
					return 24;
				break;
			case 'large' :
					return 48;
				break;
			default :
					return 36;
		}		
	}

	/**
	 * 	excerpt_more
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function excerpt_more( $more ) {
		return '&hellip;';
	}

	/**
	 * 	the_excerpt
	 *
	 *  @access 	public
	 *  @return 	void
	 */
//	public function the_excerpt( $the_excerpt ) {
//		$display_address = isset( $this->EE->CFG->EED_Event_List['display_description'] ) ? $this->EE->CFG->EED_Event_List['display_description'] : TRUE;
//		return $display_address ? $the_excerpt : '';			
//	}





	/**
	 * 	wp_enqueue_scripts
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function wp_enqueue_scripts() {

		// get some style
		if ( apply_filters( 'FHEE_enable_default_espresso_css', FALSE )) {
			// first check uploads folder
			if ( file_exists( EVENT_ESPRESSO_UPLOAD_DIR . 'templates/event_list.css' )) {
				wp_register_style( 'espresso_event_list', EVENT_ESPRESSO_UPLOAD_URL . 'templates/espresso_event_list.css', array() );
				wp_register_script( 'espresso_event_list', EVENT_ESPRESSO_UPLOAD_URL . 'templates/espresso_event_list.js', array( 'blocksit' ), '1.0', TRUE  );
			} else {
				wp_register_style( 'espresso_event_list', EVENT_LIST_ASSETS_URL . 'espresso_event_list.css', array() );
				wp_register_script( 'espresso_event_list', EVENT_LIST_ASSETS_URL . 'espresso_event_list.js', array( 'blocksit' ), '1.0', TRUE );
			}
			wp_register_script( 'blocksit', EVENT_LIST_ASSETS_URL . 'blocksit.min.js', array( 'jquery' ), '1.0', TRUE );
			wp_enqueue_style( 'espresso_event_list' );
			wp_enqueue_script( 'blocksit' );
			wp_enqueue_script( 'espresso_event_list' );
		}

	}




	/**
	 * 	template_settings_form
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function template_settings_form() {
		EE_Registry::instance()->CFG->EED_Event_List = isset( EE_Registry::instance()->CFG->EED_Event_List ) ? EE_Registry::instance()->CFG->EED_Event_List : array();
		EE_Registry::instance()->CFG->EED_Event_List = apply_filters( 'FHEE__Event_List__template_settings_form__event_list_config', EE_Registry::instance()->CFG->EED_Event_List );
		espresso_display_template( EVENT_LIST_TEMPLATES_PATH . 'admin-event-list-settings.template.php', EE_Registry::instance()->CFG->EED_Event_List );
	}




	/**
	 * 	display_description
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function display_description( $value ) {
		$display_description= isset( EE_Registry::instance()->CFG->EED_Event_List['display_description'] ) ? EE_Registry::instance()->CFG->EED_Event_List['display_description'] : 0;
		return $display_description === $value ? TRUE : FALSE;
	}





	/**
	 * 	set_default_settings
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function set_default_settings( $event_list_config ) {
		//printr( $CFG, '$CFG  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		$event_list_config = array(
			'display_description' => isset( $event_list_config['display_description'] ) && ! empty( $event_list_config['display_description'] ) ? $event_list_config['display_description'] : FALSE,
			'display_address' => isset( $event_list_config['display_address'] ) && ! empty( $event_list_config['display_address'] ) ? $event_list_config['display_address'] : FALSE,
			'display_venue' => isset( $event_list_config['display_venue'] ) && ! empty( $event_list_config['display_venue'] ) ? $event_list_config['display_venue'] : FALSE,
			'display_expired_events' => isset( $event_list_config['display_expired_events'] ) && ! empty( $event_list_config['display_expired_events'] ) ? $event_list_config['display_expired_events'] : FALSE,
			'hide_sold_out_events' => isset( $event_list_config['hide_sold_out_events'] ) && ! empty( $event_list_config['hide_sold_out_events'] ) ? $event_list_config['hide_sold_out_events'] : FALSE,
			'default_view' => isset( $event_list_config['default_view'] ) && ! empty( $event_list_config['default_view'] ) ? $event_list_config['default_view'] : 'grid',
			'event_list_grid_size' => isset( $event_list_config['event_list_grid_size'] ) && ! empty( $event_list_config['event_list_grid_size'] ) ? $event_list_config['event_list_grid_size'] : 'med',
			'templates' => array(
				'full'  => isset( $event_list_config['templates']['full'] ) && ! empty( $event_list_config['templates']['full'] ) ? $event_list_config['templates']['full'] : EVENT_LIST_TEMPLATES_PATH . 'archive-espresso_events' . '.template.php',
				'part'  => isset( $event_list_config['templates']['part'] ) && ! empty( $event_list_config['templates']['part'] ) ? $event_list_config['templates']['part'] : EVENT_LIST_TEMPLATES_PATH . 'grid-view-event-list.template.php'
			)
		);
		return $event_list_config;
	}



	/**
	 * 	filter_config
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function filter_config( $CFG ) {//display_short_description_in_event_list display_exceprt
		//printr( $CFG, '$CFG  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		$CFG->EED_Event_List = array(
			'display_description' => isset( $CFG->template_settings['display_description_in_event_list'] ) ? $CFG->template_settings['display_description_in_event_list'] : $CFG->EED_Event_List['display_description'],
			'display_address' => isset( $CFG->template_settings['display_address_in_event_list'] ) ? $CFG->template_settings['display_address_in_event_list'] : $CFG->EED_Event_List['display_address'],
			'display_venue' => isset( $CFG->template_settings['display_venue_in_event_list'] ) ? $CFG->template_settings['display_venue_in_event_list'] : $CFG->EED_Event_List['display_venue'],
			'display_expired_events' => isset( $CFG->template_settings['display_expired_events'] ) ? $CFG->template_settings['display_expired_events'] : $CFG->EED_Event_List['display_expired_events'],
			'default_view' => isset( $CFG->template_settings['default_view'] ) ? $CFG->template_settings['default_view'] : $CFG->EED_Event_List['default_view'],
			'event_list_grid_size' => isset( $CFG->template_settings['event_list_grid_size'] ) ? $CFG->template_settings['event_list_grid_size'] : $CFG->EED_Event_List['event_list_grid_size'],
			'templates' => array(
				'full'  => EVENT_LIST_TEMPLATES_PATH . 'archive-espresso_events.template.php',
				'part'  => EVENT_LIST_TEMPLATES_PATH . 'grid-view-event-list.template.php'
			)
		);
		unset( $CFG->template_settings['display_description_in_event_list'] );
		unset( $CFG->template_settings['display_short_description_in_event_list'] );
		unset( $CFG->template_settings['display_address_in_event_list'] );
		unset( $CFG->template_settings['display_venue_in_event_list'] );
		return $CFG;
	}




	/**
	 * 	filter_config
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function update_template_settings( $data, $REQ ) {
//		printr( $REQ, '$REQ  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//		printr( $data, '$data  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

		$data['EED_Event_List'] = array(
			'display_description' => isset( $REQ['display_description_in_event_list'] ) ? absint( $REQ['display_description_in_event_list'] ) : FALSE,
			'display_address' => isset( $REQ['display_address_in_event_list'] ) ? absint( $REQ['display_address_in_event_list'] ) : FALSE,
			'display_venue' => isset( $REQ['display_venue_in_event_list'] ) ? absint( $REQ['display_venue_in_event_list'] ) : FALSE,
			'display_expired_events' => isset( $REQ['display_expired_events'] ) ? absint( $REQ['display_expired_events'] ) : FALSE,
			'default_view' => isset( $REQ['default_view'] ) ? sanitize_text_field( $REQ['default_view'] ) : 'grid',
			'event_list_grid_size' => isset( $REQ['event_list_grid_size'] ) ? sanitize_text_field( $REQ['event_list_grid_size'] ) : 'med',
			'templates' => array(
				'full'  => str_replace( '\\', DS, plugin_dir_path( __FILE__ )) . 'templates' . DS . 'archive-espresso_events.template.php'
			)
		);
		
		switch ( $data['EED_Event_List']['default_view'] ) {
			case 'list' :
					$data['EED_Event_List']['templates']['part'] = str_replace( '\\', DS, plugin_dir_path( __FILE__ )) . 'templates' . DS . 'dates-list-event-list.template.php';
				break;
			default :
					$data['EED_Event_List']['templates']['part'] = str_replace( '\\', DS, plugin_dir_path( __FILE__ )) . 'templates' . DS . 'grid-view-event-list.template.php';
		}
		
		return $data;
	}




	/**
	 * 	event_list_template_filters
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function event_list_template_filters() {
		$args = array(
			'form_url' => add_query_arg( array( ), home_url( __( 'events', 'event_espresso' )) ),
			'elf_month' => $this->_elf_month,
			'elf_category' => $this->_elf_category,
			'elf_show_expired' => $this->_show_expired,
			'elf_default_view' => $this->_default_view
		);
		espresso_display_template( EVENT_LIST_TEMPLATES_PATH . 'event-list-template-filters.template.php', $args );		
	}





	/**
	 * 	event_categories
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function event_categories() {
		$event_categories = EE_Registry::instance()->load_model('Term')->get_all_ee_categories();
//		printr( $event_categories, '$event_categories  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		return $event_categories;
	}





	/**
	 * 	get_template_part
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function get_template_part() {
		switch ( self::$_default_view ) {
			case 'list' :
					return 'dates-list-event-list.template.php';
				break;
			default :
					return 'grid-view-event-list.template.php';
		}
		
//		return EE_Registry::instance()->CFG->EED_Event_List['templates']['part'];
	}





	/**
	 * 	event_list_grid_size
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function event_list_grid_size() {
		$event_list_grid_size = isset( EE_Registry::instance()->CFG->EED_Event_List['event_list_grid_size'] ) ? EE_Registry::instance()->CFG->EED_Event_List['event_list_grid_size'] : 'med';
		$event_list_grid_size .= '-event-list-grid';
		return $event_list_grid_size;
	}
	
	


}



function espresso_event_list_grid_size() {
	return EED_Event_List::event_list_grid_size();
}
 
function espresso_event_categories() {
	return EED_Event_List::event_categories();
}
 
function espresso_display_full_description_in_event_list() {
	return EED_Event_List::display_description( 2 );
}

function espresso_display_excerpt_in_event_list() {
	return EED_Event_List::display_description( 1 );
}

function espresso_event_list_template_part() {
	return EED_Event_List::get_template_part();
}



// End of file EED_Event_List.module.php
// Location: /modules/event_list/EED_Event_List.module.php