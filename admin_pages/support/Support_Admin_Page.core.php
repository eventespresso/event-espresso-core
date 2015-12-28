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
 * @version		4.0
 *
 * ------------------------------------------------------------------------
 *
 * Support_Admin_Page
 *
 * This contains the logic for setting up the Help and Support related admin pages.  Any methods without phpdoc comments have inline docs with parent class.
 *
 *
 * @package		Support_Admin_Page
 * @subpackage	includes/core/admin/support/Support_Admin_Page.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Support_Admin_Page extends EE_Admin_Page {
	
	/**
	 * Because we want to use the response in both the localized JS and in the body
	 * we need to make this response available between method calls
	 * @var \EventEspressoBatchRequest\Helpers\JobStepResponse
	 */
	protected $_job_step_response = null;


	public function __construct( $routing = TRUE ) {
		parent::__construct( $routing );
	}



	protected function _init_page_props() {
		$this->page_slug = EE_SUPPORT_PG_SLUG;
		$this->page_label = __('Help & Support', 'event_espresso');
		$this->_admin_base_url = EE_SUPPORT_ADMIN_URL;
		$this->_admin_base_path = EE_SUPPORT_ADMIN;
	}



	protected function _ajax_hooks() {
		add_action('wp_ajax_espresso_batch_continue',array($this,'batch_continue'));
		add_action('wp_ajax_espresso_batch_cleanup',array($this,'batch_cleanup'));
		
	}



	protected function _define_page_props() {
		$this->_labels = array();
		$this->_admin_page_title = $this->page_label;
	}



	protected function _set_page_routes() {
		$this->_page_routes = array(
			'default' => array(
				'func' => '_shortcodes',
				'capability' => 'ee_read_ee'
				),
			//'installation' => '_installation',
			//'resources' => '_resources',
			'contact_support' => array(
				'func' => '_contact_support',
				'capability' => 'ee_read_ee'
				),
			'developers' => array(
				'func' => '_developers',
				'capability' => 'ee_read_ee'
				),
			'batch_create' => array( 
				'func' => 'batch_create',
				'capability' => 'ee_read_ee',
			),
			'batch_file_create' => array(
				'func' => 'batch_file_create',
				'capability' => 'ee_read_ee'
			)
			);
	}



	protected function _set_page_config() {
		$this->_page_config = array(
			'default' => array(
				'nav' => array(
					'label' => __('Shortcodes', 'event_espresso'),
					'order' => 30),
				'metaboxes' => array_merge( $this->_default_espresso_metaboxes, array('_shortcodes_boxes' ) ),
				'require_nonce' => FALSE
				),
			'contact_support' => array(
				'nav' => array(
					'label' => __('Support', 'event_espresso'),
					'order' => 40),
				'metaboxes' => array_merge( $this->_default_espresso_metaboxes, array( '_support_boxes' ) ),
				'require_nonce' => FALSE
				),
			'developers' => array(
				'nav' => array(
					'label' => __('Developers', 'event_espresso'),
					'order' => 50),
				'metaboxes' => $this->_default_espresso_metaboxes,
				'require_nonce' => FALSE
				),
			);
	}



	//none of the below group are currently used for Support pages
	protected function _add_screen_options() {}
	protected function _add_feature_pointers() {}
	public function admin_init() {}
	public function admin_notices() {}
	public function admin_footer_scripts() {}
	public function load_scripts_styles() {}





	protected function _installation() {
		$template_path = EE_SUPPORT_ADMIN_TEMPLATE_PATH . 'support_admin_details_installation.template.php';
		$this->_template_args['admin_page_content'] = EEH_Template::display_template( $template_path, '', TRUE);
		$this->display_admin_page_with_sidebar();
	}




	protected function _resources() {
		$this->display_admin_page_with_sidebar();
	}





	protected function _resources_boxes() {
		$boxes = array(
			'favorite_theme_developers' => __('Favorite Theme Developers', 'event_espresso'),
			'highly_recommended_themes' => __('Highly Recommended Themes', 'event_espresso'),
			'hire_developer' => __('Hire a Developer', 'event_espresso'),
			'partners' => __('Partners', 'event_espresso'),
			'recommended_plugins' => __('Recommended Plugins', 'event_espresso'),
			'other_resources' => __('Other Resources', 'event_espresso')
			);

		foreach ( $boxes as $box => $label ) {
			$template_path = EE_SUPPORT_ADMIN_TEMPLATE_PATH . 'support_admin_details_' . $box . '.template.php';
			$callback_args = array('template_path' => $template_path);
			add_meta_box( 'espresso_' . $box . '_settings', $label, create_function('$post, $metabox', 'echo EEH_Template::display_template( $metabox["args"]["template_path"], "", TRUE );'), $this->_current_screen_id, 'normal', 'high', $callback_args);
		}
	}






	protected function _shortcodes() {
		$this->display_admin_page_with_sidebar();
	}




	protected function _shortcodes_boxes() {
	$boxes = array(
			'shortcodes_event_listings' => __('Event Listings', 'event_espresso'),
			'shortcodes_ticket_selector' => __('Event Ticket Selector', 'event_espresso'),
			'shortcodes_category' => __('Event Categories', 'event_espresso'),
			'shortcodes_attendee' => __( 'Event Attendees', 'event_espresso' )
			/*'shortcodes_single_events' => __('Single Events', 'event_espresso'),*/
			/*'shortcodes_attendee_listings' => __('Attendee Listings', 'event_espresso'),*/
			);

		foreach ( $boxes as $box => $label ) {
			$template_path = EE_SUPPORT_ADMIN_TEMPLATE_PATH . 'support_admin_details_' . $box . '.template.php';
			$callback_args = array('template_path' => $template_path);
			add_meta_box( 'espresso_' . $box . '_settings', $label, create_function('$post, $metabox', 'echo EEH_Template::display_template( $metabox["args"]["template_path"], "", TRUE );'), $this->_current_screen_id, 'normal', 'high', $callback_args);
		}
	}





	protected function _contact_support() {
		$this->display_admin_page_with_sidebar();
	}


	protected function _support_boxes() {
		$boxes = array(
			'contact_support' => __('Contact Support', 'event_espresso'),
			'important_information' => __('Important Information', 'event_espresso')
			);

		foreach ( $boxes as $box => $label ) {
			$template_path = EE_SUPPORT_ADMIN_TEMPLATE_PATH . 'support_admin_details_' . $box . '.template.php';
			$callback_args = array('template_path' => $template_path, 'template_args' => $this->_template_args);
			add_meta_box( 'espresso_' . $box . '_settings', $label, create_function('$post, $metabox', 'echo EEH_Template::display_template( $metabox["args"]["template_path"], $metabox["args"]["template_args"], TRUE );'), $this->_current_screen_id, 'normal', 'high', $callback_args);
		}
	}


	protected function _developers() {
		$template_path = EE_SUPPORT_ADMIN_TEMPLATE_PATH . 'developers_admin_details.template.php';
		$this->_template_args['admin_page_content'] = EEH_Template::display_template($template_path, array(), true );
		$this->display_admin_page_with_sidebar();
	}
	
	public function load_scripts_styles_batch_create() {	
		$job_response = $this->_enqueue_batch_job_scripts_and_styles_and_start_job();
		wp_enqueue_script( 'batch_runner', EE_PLUGIN_DIR_URL . 'core/libraries/batch/Assets/batch_runner.js', array( 'progress_bar' ));
		wp_localize_script( 'support_batch_runner', 'ee_job_response', $job_response->to_array() );
		wp_localize_script( 'support_batch_runner', 'ee_job_i18n', 
			array(
				'redirect_url' => $this->_req_data['redirect_url' ],
			));
	}
	public function load_scripts_styles_batch_file_create() {
		//creates a job based on the request variable
		$job_response = $this->_enqueue_batch_job_scripts_and_styles_and_start_job();
		wp_enqueue_script( 'support_batch_file_runner', EE_SUPPORT_ASSETS_URL . 'support_batch_file_runner.js', array( 'batch_runner' ), EVENT_ESPRESSO_VERSION,true);
		wp_localize_script( 'support_batch_file_runner', 'ee_job_response', $job_response->to_array() );
		wp_localize_script( 'support_batch_file_runner', 'ee_job_i18n', 
				array(
					'download_and_redirecting' => sprintf( 
							__('File Generation complete. Downloading, and %1$sredirecting%2$s...', 'event_espresso'),
							'<a href="' . $this->_req_data['redirect_url' ] .'">',
							'</a>' ),
					'redirect_url' => $this->_req_data['redirect_url' ],
				));
	}
	
	/**
	 * Enqueues scripts and styles common to any batch job, and creates 
	 * a job from the request data, and stores the response in the
	 * $this->_job_step_response property
	 * @return \EventEspressoBatchRequest\Helpers\JobStepResponse
	 */
	protected function _enqueue_batch_job_scripts_and_styles_and_start_job() {
		wp_register_script( 'progress_bar', EE_PLUGIN_DIR_URL . 'core/libraries/batch/Assets/progress_bar.js', array( 'jquery' ) );
		wp_enqueue_style( 'progress_bar', EE_PLUGIN_DIR_URL . 'core/libraries/batch/Assets/progress_bar.css', array(), EVENT_ESPRESSO_VERSION );
		wp_enqueue_script( 'batch_runner', EE_PLUGIN_DIR_URL . 'core/libraries/batch/Assets/batch_runner.js', array( 'progress_bar' ));
		$job_handler_classname = stripslashes( $this->_req_data[ 'job_handler' ] );
		$request_data = array_diff_key( 
				$this->_req_data, 
				array_flip( array( 'action',  'page' ) ) );
		$batch_runner = new EventEspressoBatchRequest\BatchRequestProcessor();
		//eg 'EventEspressoBatchRequest\JobHandlers\RegistrationsReport'
		$job_response = $batch_runner->create_job( $job_handler_classname, $request_data );
		//remember the response for later. We need it to display the page body
		$this->_job_step_response = $job_response;
		return $job_response;
	}
	/**
	 * Invokes the report-generating code
	 */
	protected function batch_create() {		
		echo EEH_Template::locate_template( EE_SUPPORT_ADMIN . 'templates' . DS . 'admin_batch_runner.template.html' );
	}
	
	/**
	 * Loads a page for running a batch job that creates and downloads a file, 
	 * and then sends the user back to wherever they were before
	 */
	protected function batch_file_create() {
		if( $this->_job_step_response instanceof \EventEspressoBatchRequest\Helpers\JobStepResponse ) {
			$filename = EEH_File::get_filename_from_filepath( $this->_job_step_response->job_parameters()->extra_datum( 'filepath' ) );
		} else {
			$filename = __( 'Unknown', 'event_espresso' );
		}
		echo EEH_Template::locate_template( 
				EE_SUPPORT_ADMIN . 'templates' . DS . 'admin_batch_file_runner.template.html', 
				array( 
					'filename' => $filename 
				)
			);
	}
	
	/**
	 * Receives ajax calls for continuing a job
	 */
	public function batch_continue() {
		$job_id = sanitize_text_field( $this->_req_data[ 'job_id' ] );
		$batch_runner = new EventEspressoBatchRequest\BatchRequestProcessor();
		$responseobj = $batch_runner->continue_job( $job_id);
		$this->_template_args[ 'data' ] = $responseobj->to_array();
		$this->_return_json();
	}
	
	/**
	 * Receives the ajax call to cleanup a job
	 * @return type
	 */
	public function batch_cleanup() {
		$job_id = sanitize_text_field( $this->_req_data[ 'job_id' ] );
		$batch_runner = new EventEspressoBatchRequest\BatchRequestProcessor();
		$response_obj = $batch_runner->cleanup_job( $job_id );
		$this->_template_args[ 'data' ] = $response_obj->to_array();
		$this->_return_json();
	}



} //end Support_Admin_Page class
