<?php
if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for Wordpress
 *
 * @package		Event Espresso
 * @author		Seth Shoultes
 * @copyright	(c)2009-2012 Event Espresso All Rights Reserved.
 * @license		http://eventespresso.com/support/terms-conditions/  ** see Plugin Licensing **
 * @link		http://www.eventespresso.com
 * @version		3.2.P
 *
 * ------------------------------------------------------------------------
 *
 * General_Settings_Admin_Page
 *
 * This contains the logic for setting up the Custom General_Settings related pages.  Any methods without phpdoc comments have inline docs with parent class. 
 *
 * NOTE:  TODO: This is a straight conversion from the legacy 3.1 settings page.  It is NOT optimized and will need modification to fully use the new system (and also will need adjusted when Questions and Questions groups model is implemented)
 *
 * @package		General_Settings_Admin_Page
 * @subpackage	includes/core/admin/General_Settings_Admin_Page.core.php
 * @author			Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class General_Settings_Admin_Page extends EE_Admin_Page {

	/**
	 * _question
	 * holds the specific question object for the question details screen
	 * @var object
	 */
	protected $_yes_no_values = array();

	/**
	 * _question_group
	 * holds the specific question group object for the question group details screen
	 * @var object
	 */
	protected $_question_group;



	public function __construct() {
		parent::__construct();
		$this->_yes_no_values = array(
			array('id' => TRUE, 'text' => __('Yes', 'event_espresso')),
			array('id' => FALSE, 'text' => __('No', 'event_espresso'))
		);
	}



	protected function _init_page_props() {
		$this->page_slug = GEN_SET_PG_SLUG;
		$this->page_label = GEN_SET_LABEL;
	}




	protected function _ajax_hooks() {
		//todo: all hooks for events ajax goes in here.
	}





	protected function _define_page_props() {
		$this->_admin_base_url = GEN_SET_ADMIN_URL;
		$this->_admin_page_title = GEN_SET_LABEL;
		$this->_labels = array();
	}




	protected function _set_page_routes() {
		$this->_page_routes = array(
			'default' => '_espresso_page_settings',
			'update_espresso_page_settings' => array(
				'func' => '_update_espresso_page_settings',
				'noheader' => TRUE,
				),
			'template_settings' => '_template_settings',
			'update_template_settings' => array(
				'func' => '_update_template_settings',
				'noheader' => TRUE,
				),
			'google_map_settings' => '_google_map_settings',
			'update_google_map_settings' => array(
				'func' => '_update_google_map_settings',
				'noheader' => TRUE,
				),
			'your_organization_settings' => '_your_organization_settings',
			'update_your_organization_settings' => array(
				'func' => '_update_your_organization_settings',
				'noheader' => TRUE,
				),
			'admin_option_settings' => '_admin_option_settings',
			'update_admin_option_settings' => array(
				'func' => '_update_admin_option_settings',
				'noheader' => TRUE,
				)
			);
	}





	protected function _set_page_config() {
		$this->_page_config = array(
			'default' => array(
				'nav' => array(
					'label' => __('Espresso Pages'),
					'order' => 20
					),
				'metaboxes' => array( '_publish_post_box', '_espresso_news_post_box', '_espresso_links_post_box' )
				),
			'template_settings' => array(
				'nav' => array(
					'label' => __('Templates'),
					'order' => 30
					),
				'metaboxes' => array( '_publish_post_box', '_espresso_news_post_box', '_espresso_links_post_box' )
				),
			'google_map_settings' => array(
				'nav' => array(
					'label' => __('Google Maps'),
					'order' => 40
					),
				'metaboxes' => array('_publish_post_box',  '_espresso_news_post_box', '_espresso_links_post_box' )
				),
			'your_organization_settings' => array(
				'nav' => array(
					'label' => __('Your Organization'),
					'order' => 50
					),
				'metaboxes' => array('_publish_post_box',  '_espresso_news_post_box', '_espresso_links_post_box' )
				),
			'admin_option_settings' => array(
				'nav' => array(
					'label' => __('Admin Options'),
					'order' => 60
					),
				'metaboxes' => array( '_publish_post_box', '_espresso_news_post_box', '_espresso_links_post_box' )
				)
			);
	}



	protected function _add_screen_options() {
	}

	protected function _add_screen_options_default() {
		$this->_per_page_screen_option();
	}

	protected function _add_screen_options_question_groups() {
		$this->_per_page_screen_option();
	}

	protected function _add_help_tabs() {}
	protected function _add_feature_pointers() {}
	public function load_scripts_styles() {
		//styles
		wp_enqueue_style('jquery-ui-style');
		//scripts
		wp_enqueue_script('ee_admin_js');		
	}
	public function admin_init() {}
	public function admin_notices() {}
	public function admin_footer_scripts() {}



	protected function _espresso_page_settings() {
	
		global $org_options;
		$this->_template_args['org_options'] = $org_options;
		// array of pages containing critical EE shortcodes
		$this->_template_args['ee_pages'] = array(		
			$org_options['event_page_id'] => array( get_page( $org_options['event_page_id'] ), '[ESPRESSO_EVENTS]' ),			
			$org_options['return_url'] => array( get_page( $org_options['return_url'] ), '[ESPRESSO_PAYMENTS]' ),			
			$org_options['notify_url'] => array( get_page( $org_options['notify_url'] ), '[ESPRESSO_TXN_PAGE]' ),			
			$org_options['cancel_return'] => array( get_page( $org_options['cancel_return'] ), 'ESPRESSO_CANCELLED' )			
		);
		$this->_set_add_edit_form_tags( 'update_espresso_page_settings' );
		$this->_set_publish_post_box_vars();
		$this->_template_args['admin_page_content'] = espresso_display_template( GEN_SET_TEMPLATE_PATH . 'espresso_page_settings.template.php', $this->_template_args, TRUE );
		// the details template wrapper
		$this->display_admin_page_with_sidebar();	
	}

	protected function _update_espresso_page_settings() {
		
		$data = array();
		$data['event_page_id'] = absint( $_POST['event_page_id'] );
		$data['return_url'] = absint( $_POST['return_url'] );
		$data['cancel_return'] = absint( $_POST['cancel_return'] );
		$data['notify_url'] = absint( $_POST['notify_url'] );
		
		$success = $this->_update_general_settings( $data, __FILE__, __FUNCTION__, __LINE__ );
		$this->_redirect_after_action( $success, 'Page Settings', 'updated', array() );
		
	}







	/***********/





	/**
	 * updates user_meta
	 *
	 * @param array $data
	 * @return string
	 */
	private function _update_general_settings( $data, $file, $func, $line ) {
		global $espresso_wp_user;
		// grab existing org options
		$org_options = get_user_meta( $espresso_wp_user, 'events_organization_settings', TRUE );
//		printr( $data, '$data  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//		printr( $org_options, '$org_options  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//		if ( ! empty( $org_options )) {
		// make sure everything is in arrays
		$org_options = is_array( $org_options ) ? $org_options : array( $org_options );
		$data = is_array( $data ) ? $data : array( $data );
		// overwrite existing org options with new data
		$data = array_merge( $org_options, $data );
		// and save it
		if ( update_user_meta( $espresso_wp_user, 'events_organization_settings', $data )) {
			EE_Error::add_success( __('Organization details saved', 'event_espresso'));
			return TRUE;
		} else {
			$user_msg = __('Unable to save Organization details.', 'event_espresso');
			EE_Error::add_error( $user_msg, $file, $func, $line  );
			return FALSE;
		}			
//		}

	}



	/**
	 * displays edit and view links for critical EE pages
	 *
	 * @access public 
	 * @param WP page object $ee_page
	 * @return string
	 */
	public static function edit_view_links( $ee_page_id ) {
		$links = '<a href="' . add_query_arg( array( 'post' => $ee_page_id, 'action' => 'edit' ),  admin_url( 'post.php' )) . '" >' . __('Edit', 'event_espresso') . '</a>';
		$links .= ' &nbsp;|&nbsp; ';
		$links .= '<a href="' . get_permalink( $ee_page_id ) . '" >' . __('View', 'event_espresso') . '</a>';
		return $links;
	}
	
	
	

	/**
	 * displays page and shortcode status for critical EE pages
	 *
	 * @param WP page object $ee_page
	 * @return string
	 */
	public static function page_and_shortcode_status( $ee_page, $shortcode ) {
//		printr( $ee_page, '$ee_page  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//		echo '<h4>$shortcode : ' . $shortcode . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
		// page status
		if ( ! isset( $ee_page[0] ) || ! isset( $ee_page[0]->post_status ) || $ee_page[0]->post_status != 'publish') { 
			$pg_colour = 'red';
			$pg_status = __('Page Visibility Problem', 'event_espresso');
		 } else { 
			$pg_colour = 'green';
			$pg_status = __('Page Status OK', 'event_espresso');
		}
		
		// shortcode status
		if ( ! isset( $ee_page[0] ) || ! isset( $ee_page[0]->post_content ) || strpos( $ee_page[0]->post_content, $shortcode ) === FALSE ) { 
			$sc_colour = 'red';
			$sc_status = __('Shortcode Problem', 'event_espresso');
		 } else { 
			$sc_colour = 'green';
			$sc_status = __('Shortcode OK', 'event_espresso');
		}

		return '<span style="color:' . $pg_colour . '; margin-right:2em;"><strong>' . $pg_status . '</strong></span><span style="color:' . $sc_colour . '"><strong>' . $sc_status . '</strong></span>';		

	}
	
	
	

	/**
	 * generates a dropdown of all parent pages - copied from WP core
	 *
	 * @param unknown_type $default
	 * @param unknown_type $parent
	 * @param unknown_type $level
	 * @return unknown
	 */
	public static function page_settings_dropdown( $default = 0, $parent = 0, $level = 0 ) {
		global $wpdb;
		$items = $wpdb->get_results( $wpdb->prepare("SELECT ID, post_parent, post_title FROM $wpdb->posts WHERE post_parent = %d AND post_type = 'page' AND post_status != 'trash' ORDER BY menu_order", $parent) );

		if ( $items ) {
			foreach ( $items as $item ) {
				$pad = str_repeat( '&nbsp;', $level * 3 );
				if ( $item->ID == $default)
					$current = ' selected="selected"';
				else
					$current = '';

				echo "\n\t<option class='level-$level' value='$item->ID'$current>$pad " . esc_html($item->post_title) . "</option>";
				parent_dropdown( $default, $item->ID, $level +1 );
			}
		} else {
			return false;
		}
	}


} //ends Forms_Admin_Page class