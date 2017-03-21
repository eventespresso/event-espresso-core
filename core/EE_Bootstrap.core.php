<?php
defined('EVENT_ESPRESSO_VERSION') || exit;


/**
 * Class EE_Bootstrap
 *
 * Loads a few required autoloaders, then proceeds to build a request stack
 * which consists of an array of EE_Middleware request decorator classes.
 * Each middleware class wraps the previous middleware class with itself,
 * with the core application loader residing at the center.
 * The stack is then processed by passing an EE_Request object to the first class in the stack.
 * Each middleware class:
 *      accepts the request object
 * 		passes the request to the next middleware class in the stack
 * 		receives an EE_Response object from that next middleware class
 * 		applies it's logic before and/or after doing the above
 * 		returns an EE_Response object to the previous middleware class
 * 		and can terminate the request at any point during the above
 * If none of the middleware classes terminate the request,
 * then the Request Stack will terminate itself after everything else is finished.
 *
 * @package 	Event Espresso
 * @subpackage 	core
 * @author 		Brent Christensen
 * @since 		4.8.20
 *
 */

class EE_Bootstrap {

    /**
     * @var EE_Request $request
     */
    protected $request;

    /**
     * @var EE_Response $response
     */
    protected $response;

    /**
	 * @var EE_Request_Stack_Builder $request_stack_builder
	 */
	protected $request_stack_builder = null;

	/**
	 * @var EE_Request_Stack $_request_stack
	 */
	protected $request_stack = null;



	public function __construct(EE_Request $request, EE_Response $response) {
        $this->request = $request;
        $this->response = $response;
        // construct request stack and run middleware apps as soon as all WP plugins are loaded
		add_action( 'plugins_loaded', array( $this, 'run_request_stack' ), 0 );
		// set framework for the rest of EE to hook into when loading
		add_action( 'plugins_loaded', array( 'EE_Bootstrap', 'load_espresso_addons' ), 1 );
		add_action( 'plugins_loaded', array( 'EE_Bootstrap', 'detect_activations_or_upgrades' ), 3 );
		add_action( 'plugins_loaded', array( 'EE_Bootstrap', 'load_core_configuration' ), 5 );
		add_action( 'plugins_loaded', array( 'EE_Bootstrap', 'register_shortcodes_modules_and_widgets' ), 7 );
		add_action( 'plugins_loaded', array( 'EE_Bootstrap', 'brew_espresso' ), 9 );
	}



	/**
	 * run_request_stack
	 * construct request stack and run middleware apps
	 */
	public function run_request_stack() {
		$this->load_autoloader();
		$this->set_autoloaders_for_required_files();
		$this->request_stack_builder = $this->build_request_stack();
		$this->request_stack = $this->request_stack_builder->resolve(
		    new EE_Load_Espresso_Core()
        );
		$this->request_stack->handle_request($this->request, $this->response);
		$this->request_stack->handle_response();
	}



	/**
	 * load_autoloader
	 */
	protected function load_autoloader() {
		// load interfaces
		espresso_load_required( 'EEH_Autoloader', EE_CORE . 'helpers' . DS . 'EEH_Autoloader.helper.php' );
		EEH_Autoloader::instance();
	}



    /**
     * load_required_files
     *
     * @throws \EE_Error
     */
	protected function set_autoloaders_for_required_files() {
		// load interfaces
        EEH_Autoloader::register_autoloaders_for_each_file_in_folder(EE_CORE . 'interfaces', true);
        // load helpers
		EEH_Autoloader::register_autoloaders_for_each_file_in_folder( EE_HELPERS );
		// load request stack
		EEH_Autoloader::register_autoloaders_for_each_file_in_folder( EE_CORE . 'request_stack' . DS );
		// load middleware
		EEH_Autoloader::register_autoloaders_for_each_file_in_folder( EE_CORE . 'middleware' . DS );
    }



	/**
	 * build_request_stack
	 *
	 * @return \EE_Request_Stack_Builder
	 */
	public function build_request_stack() {
		$request_stack_builder = new EE_Request_Stack_Builder();
		$stack_apps = apply_filters(
			'FHEE__EE_Bootstrap__build_request_stack__stack_apps',
			array(
				'EE_Detect_Login',
				'EE_Recommended_Versions',
				'EE_Alpha_Banner_Warning',
			)
		);
		// load middleware onto stack : FILO (First In Last Out)
		foreach ( (array)$stack_apps as $stack_app ) {
			//$request_stack_builder->push( $stack_app );
			$request_stack_builder->unshift( $stack_app );
		}
		return apply_filters(
			'FHEE__EE_Bootstrap__build_request_stack__request_stack_builder',
			$request_stack_builder
		);
	}



	/**
	 * load_espresso_addons
	 * runs during the WP 'plugins_loaded' action at priority 1
	 * and is the initial loading phase for EE addons
	 * no other logic should be performed at this point
	 */
	public static function load_espresso_addons() {
		do_action( 'AHEE__EE_Bootstrap__load_espresso_addons' );
	}



	/**
	 * detect_activations_or_upgrades
	 * runs during the WP 'plugins_loaded' action at priority 3
	 * Now that all of the addons have been loaded,
	 * we can determine if anything needs activating or upgrading
	 */
	public static function detect_activations_or_upgrades() {
		do_action( 'AHEE__EE_Bootstrap__detect_activations_or_upgrades' );
	}



	/**
	 * load_core_configuration
	 * runs during the WP 'plugins_loaded' action at priority 5
	 * Now that the database is assumed to be at the correct version
	 * we can load and set all of the system configurations
	 */
	public static function load_core_configuration() {
		do_action( 'AHEE__EE_Bootstrap__load_core_configuration' );
	}



	/**
	 * register_shortcodes_modules_and_widgets
	 * runs during the WP 'plugins_loaded' action at priority 7
	 * and handles registering all o four shortcodes, modules and widgets
	 * so that they are ready to be used throughout the system
	 */
	public static function register_shortcodes_modules_and_widgets() {
		do_action( 'AHEE__EE_Bootstrap__register_shortcodes_modules_and_widgets' );
	}



	/**
	 * brew_espresso
	 * runs during the WP 'plugins_loaded' action at priority 9
	 * bootstrapping is considered complete at this point,
	 * so let the fun begin...
	 */
	public static function brew_espresso() {
		do_action( 'AHEE__EE_Bootstrap__brew_espresso' );
	}



}
// End of file EE_Bootstrap.core.php
// Location: /EE_Bootstrap.core.php