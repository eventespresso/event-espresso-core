<?php

/**
 *
 * Class EED_Batch
 *
 * Module for running batch jobs, which uses the library files in event-espresso-core/core/libraries/batch.
 * So will respond on the frontend at "{site_url}?espresso_batch&batch={file|job}", 
 * or in the admin at "{site_url}/wp-admin?page=espresso_batch&batch={file|job}" (use whichever will make your user happier,
 * note that the admin one requires the user to be able to access the admin, and the frontend one is disabled until specifically enabled via a filter).
 * 
 * 
 *
 * @package         Event Espresso
 * @subpackage    
 * @author				Mike Nelson
 * @since		 	   4.8.30.rc.007
 *
 */
if( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

define( 'BATCH_URL', plugin_dir_url( __FILE__ ) );

class EED_Batch extends EED_Module{
	
	/**
	 * Possibly value for $_REQUEST[ 'batch' ]. Indicates to run a job that
	 * processes data only
	 */
	const batch_job = 'job';
	/**
	 * Possibly value for $_REQUEST[ 'batch' ]. Indicates to run a job that
	 * produces a file for download
	 */
	const batch_file_job = 'file';
	/**
	 * Possibly value for $_REQUEST[ 'batch' ]. Indicates this request is NOT
	 * for a batch job. It's the same as not providing the $_REQUEST[ 'batch' ] 
	 * at all
	 */
	const batch_not_job = 'none';
	
	/**
	 *
	 * @var string 'file', or 'job', or false to indicate its not a batch request at all
	 */
	protected $_batch_request_type = null;
	
	/**
	 * Because we want to use the response in both the localized JS and in the body
	 * we need to make this response available between method calls
	 * @var \EventEspressoBatchRequest\Helpers\JobStepResponse
	 */
	protected $_job_step_response = null;
	
	/**
	 * Gets the batch instance
	 * @return EED_Batch
	 */
	public static function instance() {
		return self::get_instance();
	}
	
	/**
	 * Sets hooks to enable batch jobs on the frontend. Disabled by default
	 * because it's an attack vector and there are currently no implementations
	 */
	public static function set_hooks() {
		//because this is a possibel attack vector, let's have this disabled until 
		//we at least have a real use for it on the frontend
		if( apply_filters( 'FHEE__EED_Batch__set_hooks__enable_frontend_batch', false ) ) {
			add_action( 'wp_enqueue_scripts', array( self::instance(), 'enqueue_scripts' ) );
			add_filter( 'template_include', array( self::instance(), 'override_template' ), 99 );
		}
	}
	
	/**
	 * Initializes some hooks for the admin in order to run batch jobs
	 */
	public static function set_hooks_admin() {
		add_action( 'admin_menu', array( self::instance(), 'register_admin_pages' ) );
		add_action( 'admin_enqueue_scripts', array( self::instance(), 'enqueue_scripts' ) );
		
		//ajax
		add_action('wp_ajax_espresso_batch_continue',array(self::instance(),'batch_continue'));
		add_action('wp_ajax_espresso_batch_cleanup',array(self::instance(),'batch_cleanup'));
		add_action('wp_ajax_nopriv_espresso_batch_continue',array(self::instance(),'batch_continue'));
		add_action('wp_ajax_nopriv_espresso_batch_cleanup',array(self::instance(),'batch_cleanup'));
	}
	
	/**
	 * Enqueues batch scripts on the frontend or admin, and creates a job
	 */
	public function enqueue_scripts() { 
		if( isset( $_REQUEST[ 'espresso_batch' ] ) 
			|| 
			( 
				isset( $_REQUEST[ 'page' ] )
				&& $_REQUEST[ 'page' ] == 'espresso_batch'
			) 
		) { 
			switch( $this->batch_request_type() ) {
				case self::batch_job:
					$this->enqueue_scripts_styles_batch_create();
					break;
				case self::batch_file_job:
					$this->enqueue_scripts_styles_batch_file_create();
					break;
			}
		}
	}
	
	/**
	 * Create a batch job, enqueues a script to run it, and localizes some data for it
	 */
	public function enqueue_scripts_styles_batch_create() {	
		$job_response = $this->_enqueue_batch_job_scripts_and_styles_and_start_job();
		wp_enqueue_script( 'batch_runner_init', BATCH_URL . 'assets/batch_runner_init.js', array( 'batch_runner' ), EVENT_ESPRESSO_VERSION, true );
		wp_localize_script( 'batch_runner_init', 'ee_job_response', $job_response->to_array() );
		wp_localize_script( 'batch_runner_init', 'ee_job_i18n', 
			array(
				'return_url' => $_REQUEST['return_url' ],
			));
	}
	
	/**
	 * Creates a batch job which will download a file, enqueues a script to run the job, and localizes some data for it
	 */
	public function enqueue_scripts_styles_batch_file_create() {
		//creates a job based on the request variable
		$job_response = $this->_enqueue_batch_job_scripts_and_styles_and_start_job();
		wp_enqueue_script( 'batch_file_runner_init', BATCH_URL . 'assets/batch_file_runner_init.js', array( 'batch_runner' ), EVENT_ESPRESSO_VERSION, true );
		wp_localize_script( 'batch_file_runner_init', 'ee_job_response', $job_response->to_array() );
		wp_localize_script( 'batch_file_runner_init', 'ee_job_i18n', 
				array(
					'download_and_redirecting' => sprintf( 
							__('File Generation complete. Downloading, and %1$sredirecting%2$s...', 'event_espresso'),
							'<a href="' . $_REQUEST['return_url' ] .'">',
							'</a>' ),
					'return_url' => $_REQUEST['return_url' ],
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
		//just copy the bits of EE admin's eei18n that we need in the JS
		wp_localize_script(
		    'batch_runner',
            'eei18n',
            array(
                'ajax_url' => WP_AJAX_URL,
                'is_admin' => (bool)is_admin(),
                'error_message' => esc_html__('An error occurred and the job has been stopped.', 'event_espresso')
            )
        );
		$job_handler_classname = stripslashes( $_GET[ 'job_handler' ] );
		$request_data = array_diff_key( 
				$_REQUEST, 
				array_flip( array( 'action',  'page', 'ee', 'batch' ) ) );
		$batch_runner = new EventEspressoBatchRequest\BatchRequestProcessor();
		//eg 'EventEspressoBatchRequest\JobHandlers\RegistrationsReport'
		$job_response = $batch_runner->create_job( $job_handler_classname, $request_data );
		//remember the response for later. We need it to display the page body
		$this->_job_step_response = $job_response;
		return $job_response;
	}
	
	/**
	 * If we are doing a frontend batch job, this makes it so WP shows our template's HTML
	 * @param string $template
	 * @return string
	 */
	public function override_template( $template ) {
		if( isset( $_REQUEST[ 'espresso_batch' ] ) && isset( $_REQUEST[ 'batch' ] ) ) {
			return EE_MODULES . 'batch' . DS . 'templates' . DS . 'batch_frontend_wrapper.template.html';
		}
		return $template;
	}
	
	/**
	 * Adds an admin page which doesn't appear in the admin menu
	 */
	public function register_admin_pages() {
		add_submenu_page( 
			'', //parent slug. we don't want this to actually appear in the menu
			__( 'Batch Job', 'event_espresso' ), //page title
			'n/a', //menu title
			'read', //we want this page to actually be accessible to anyone,  
			'espresso_batch', //menu slug
			array( self::instance(), 'show_admin_page' )
		);
	}
	
	/**
	 * Renders the admin page, after most of the work was already done during enqueuing scripts
	 * of creating the job and localizing some data
	 */
	public function show_admin_page() { 
		echo EEH_Template::locate_template( 
			EE_MODULES . 'batch' . DS . 'templates' . DS . 'batch_wrapper.template.html', 
			array( 'batch_request_type' => $this->batch_request_type() )
		);
	}
	
	/**
	 * Receives ajax calls for continuing a job
	 */
	public function batch_continue() {
		$job_id = sanitize_text_field( $_REQUEST[ 'job_id' ] );
		$batch_runner = new EventEspressoBatchRequest\BatchRequestProcessor();
		$response_obj = $batch_runner->continue_job( $job_id);
		$this->_return_json( $response_obj->to_array() );
	}
	
	/**
	 * Receives the ajax call to cleanup a job
	 * @return type
	 */
	public function batch_cleanup() {
		$job_id = sanitize_text_field( $_REQUEST[ 'job_id' ] );
		$batch_runner = new EventEspressoBatchRequest\BatchRequestProcessor();
		$response_obj = $batch_runner->cleanup_job( $job_id );
		$this->_return_json( $response_obj->to_array() );
	}
	
	
	/**
	 * Returns a json response
	 *
	 * @param array $data The data we want to send echo via in the JSON response's "data" element
	 *
	 * The returned json object is created from an array in the following format:
	 * array(
	 * 	'notices' => '', // - contains any EE_Error formatted notices
	 * 	'data' => array() //this can be any key/value pairs that a method returns for later json parsing by the js. We're also going to include the template args with every package (so js can pick out any specific template args that might be included in here)
	 *	'isEEajax' => true,//indicates this is a response from EE
	 * )
	 */
	protected function _return_json( $data ) {
		$json = array(
			'notices' => EE_Error::get_notices(),
			'data' => $data,
			'isEEajax' => TRUE //special flag so any ajax.Success methods in js can identify this return package as a EEajax package.
			);


		// make sure there are no php errors or headers_sent.  Then we can set correct json header.
		if ( NULL === error_get_last() || ! headers_sent() ) {
			header('Content-Type: application/json; charset=UTF-8');
		}
        echo wp_json_encode( $json );
		exit();
	}
	
	/**
	 * Gets the job step response which was done during the enqueuing of scripts
	 * @return \EventEspressoBatchRequest\Helpers\JobStepResponse
	 */
	public function job_step_response() {
		return $this->_job_step_response;
	}
	/**
	 * Gets the batch request type indicated in the $_REQUEST
	 * @return string: EED_Batch::batch_job, EED_Batch::batch_file_job, EED_Batch::batch_not_job
	 */
	public function batch_request_type() {
		if( $this->_batch_request_type === null ) {
			if( isset( $_GET[ 'batch' ] ) ) {
				if( $_GET[ 'batch' ] == self::batch_job ) {
					$this->_batch_request_type = self::batch_job;
				} elseif( $_GET[ 'batch' ] == self::batch_file_job ) {
					$this->_batch_request_type = self::batch_file_job;
				}
			}
			//if we didn't find that it was a batch request, indicate it wasn't
			if( $this->_batch_request_type === null ) {
				$this->_batch_request_type = self::batch_not_job;
			}
		}
		return $this->_batch_request_type;
	}
	
	/**
	 * Unnecessary
	 * @param type $WP
	 */
	public function run( $WP ) {
		
	}

//put your code here
}
