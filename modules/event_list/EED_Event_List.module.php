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
	 * 	set_hooks - for hooking into EE Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks() {
		define( 'EVENT_LIST_ASSETS_URL', plugin_dir_url( __FILE__ ) . 'assets' . DS );
		define( 'EVENT_LIST_TEMPLATES_PATH', plugin_dir_path( __FILE__ ) . 'templates' . DS );
		add_filter( 'FHEE_load_EE_Session', '__return_true' );
		EE_Config::register_route( 'events', 'Event_List', 'run' );
		EE_Config::register_view( 'events', 0, EVENT_LIST_TEMPLATES_PATH . 'archive-espresso_events.template.php' );		
	}

	/**
	 * 	set_hooks_admin - for hooking into EE Admin Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks_admin() {
	}



	/**
	 * 	run - initial module setup
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function run() {
		add_filter( 'FHEE_load_css', '__return_true' );
//		add_filter( 'FHEE_run_EE_wp', '__return_true' );
//		add_filter( 'FHEE_load_EE_Session', '__return_true' );
//		add_action( 'wp_loaded', array( $this, 'wp_loaded' ));
		add_action( 'wp', array( $this, 'wp' ));
		add_action( 'loop_start', array( $this, 'loop_start' ), 1 );
		add_filter( 'pre_get_posts', array( $this, 'pre_get_posts' ), 10 );  
		remove_all_filters( 'excerpt_length' );
		add_filter( 'excerpt_length', array( $this, 'excerpt_length' ), 10 );
		add_filter('excerpt_more', array( $this, 'excerpt_more' ), 10 );
		add_action('wp_enqueue_scripts', array( $this, 'wp_enqueue_scripts' ), 10 );
		add_filter( 'the_content', array( $this, 'the_content' ));

	}


				

	/**
	 * 	wp_loaded
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function wp_loaded() {

	}





	/**
	 * 	pre_get_posts
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function pre_get_posts(  $WP_Query  ) {
		// only filter the main query
		if( ! $WP_Query->is_main_query() ) {
			return;
		}
//		printr( $WP_Query, '$WP_Query  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		//if ( $WP_Query )
		$posts_per_page = isset( $_GET['posts_per_page'] ) ? sanitize_key( $_GET['posts_per_page'] ) : 24;
		$WP_Query->set( 'posts_per_page', $posts_per_page );
		//$WP_Query->set( 'posts_per_page', $posts_per_page );		
	}




	/**
	 * 	wp
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function wp( $WP_Query ) {		
//		if ( is_single() ) {
//			 $this->EE->REQ->set_view( EVENT_LIST_TEMPLATES_PATH . 'single-espresso_events.template.php' );
//		} else if ( is_archive() ) {
//			 $this->EE->REQ->set_view( EVENT_LIST_TEMPLATES_PATH . 'archive-espresso_events.template.php' );
//		} 
	}




	/**
	 * 	loop_start
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function loop_start( $WP_Query ) {
//		echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
//		printr( $WP_Query, '$WP_Query  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		$EVT_IDs = array();
		if ( isset( $WP_Query->posts )) {
			foreach( $WP_Query->posts as $event ) {
				$EVT_IDs[] = $event->ID;
			}
//			printr( $EVT_IDs, '$EVT_IDs  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

			// load datetimes model
			$DTM = $this->EE->load_model( 'Datetime' );
			if ( $datetimes = $DTM->get_all( array( array( 'EVT_ID' => array( 'IN', $EVT_IDs ))))) {
//				printr( $datetimes, '$datetimes  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
				foreach( $WP_Query->posts as $event ) {
					$event->datetimes = array();
					foreach ( $datetimes as $datetime ) {
						if ( $event->ID == $datetime->get( 'EVT_ID' )) {
							$event->datetimes[] = $datetime;
						}
					}
				}
			}
		}
		

		//printr( $this->EE->CFG, '$this->EE->CFG  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		// attempt to add extra data to $wp_query (doesn't work so far)
//		$WP_Query->pagination_args = array(
//			'base' => str_replace( 999999, '%#%', esc_url( get_pagenum_link( 999999 ) ) ),
//			'format' => '?paged=%#%',
//			'current' => max( 1, $paged ),
//			'total' => $posts->max_num_pages
//		);
//		printr( $wp_query, '$wp_query  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

	}


	/**
	 * 	excerpt_length
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function excerpt_length( $length ) {
		return 28;
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
	 * 	the_event_date
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public static function the_event_date() {
		global $post;
		if ( isset( $post->datetimes ) && is_array( $post->datetimes )) {
			$datetime = array_shift( $post->datetimes );
			$datetime->e_start_date_and_time();		
		}
	}



	/**
	 * 	wp_enqueue_scripts
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function wp_enqueue_scripts() {

		// get some style
		if ( apply_filters( 'FHEE_enable_default_espresso_css', FALSE )) {
			if ( is_archive() ) {
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

	}




	/**
	 * 	the_content
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function the_content( $content ) {
		//$content .= printr( $this->EE, 'EE_Registry  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		$content .= $this->ouput;
		return $content;
	}
	
	


}


	function the_event_date() {
		EED_Event_List::the_event_date();
	}
// End of file EED_Event_List.module.php
// Location: /modules/event_list/EED_Event_List.module.php