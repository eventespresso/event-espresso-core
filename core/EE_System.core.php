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
 * EE_System
 *
 * @package			Event Espresso
 * @subpackage	core/
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
final class EE_System {


	/**
	 * 	instance of the EE_System object
	 *	@var 	$_instance
	 * 	@access 	private
	 */
	private static $_instance = NULL;

	/**
	 * Whether this request was from activating EE or if it was already activated
	 * @var boolean
	 */
	private static $_activation = FALSE;
	
	/**
	 * indicates this is a 'normal' request. Ie, not activation, nor upgrade, nor activation. So examples of this
	 * would be a normal GET request on teh frontend or backcend, or a POST, etc. 
	 */
	const req_type_normal = 0;
	/**
	 * Indicates this is a brand new installation of EE, and we'll probably want to create db tables etc.
	 */
	const req_type_new_activation = 1;
	/**
	 * normal request except the activation hook was called... probably want to recheck database is ok
	 */
	const req_type_reactivation = 2;
	/**
	 * indicates that EE has been upgraded since its previous request. We may have data migration scripts
	 * to call and will want to trigger maintenance mode
	 */
	const req_type_upgrade = 3;
	/**
	 * TODO: will detect that EE has been DOWNGRADED. We probably don't want to run in this case...
	 */
	const req_type_downgrade = 4;
	
	/**
	 * Stores which type of request this is, options being one of the consts on EE_System starting with
	 * req_type_*. It can be a brand-new activation, a reactivation, an upgrade, a downgrade, or a normal request.
	 * @var int
	 */
	private $_req_type;

	/**
	 * List of all addons which have registered themselves to work with EE core
	 * @var EE_Addon[]
	 */
	protected $_addons;


	/**
	 *	@singleton method used to instantiate class object
	 *	@access public
	 *	@return EE_System
	 */
	public static function instance( $activation = FALSE ) {
		self::$_activation = $activation;
		// check if class object is instantiated, and instantiated properly
		if ( self::$_instance === NULL  or ! is_object( self::$_instance ) or ! ( self::$_instance instanceof  EE_System )) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}




	/**
	 * 	class constructor
	 *
	 *  @access 	private
	 *  @return 	void
	 */
	private function __construct() {
		do_action( 'AHEE__EE_System__construct__begin',$this );
		// check WP version
		if ( ! espresso_minimum_wp_version_recommended() ) {
			global $wp_version;
			EE_Error::add_persistent_admin_notice( 
				'wp_version_' . str_replace( '.', '-', EE_MIN_WP_VER_RECOMMENDED ) . '_recommended', 
				sprintf(
					__( 'Event Espresso recommendeds WordPress version %s or greater in order for everything to operate properly. You are currently running version %s.%sFor information on how to update your version of WordPress, please go to %s.', 'event_espresso' ),
					EE_MIN_WP_VER_RECOMMENDED,
					$wp_version,
					'<br/>',
					'<a href="http://codex.wordpress.org/Updating_WordPress">http://codex.wordpress.org/Updating_WordPress</a>'
				)
			);
		}
		// check PHP version
		if ( ! espresso_minimum_php_version_recommended() ) {
			EE_Error::add_persistent_admin_notice( 
				'php_version_' . str_replace( '.', '-', EE_MIN_PHP_VER_RECOMMENDED ) . '_recommended', 
				sprintf(
					__( 'Event Espresso recommendeds PHP version %s or greater in order for everything to operate properly. You are currently running version %s.%sIn order to update your version of PHP, you will need to contact your current hosting provider.', 'event_espresso' ),
					EE_MIN_PHP_VER_RECOMMENDED,
					PHP_VERSION,
					'<br/>'
				)
			);
		}
		
		$this->_load_registry();
		// workarounds for PHP < 5.3
		$this->_load_class_tools();
		
		EE_Registry::instance()->load_helper( 'File' );
		EE_Registry::instance()->load_helper( 'Autoloader', array(), FALSE );
		do_action( 'AHEE__EE_System__construct__autoloaders_available',$this );
		// load and setup EE_Config and EE_Network_Config
		EE_Registry::instance()->load_core( 'Config' );
		EE_Registry::instance()->load_core( 'Network_Config' );
		// setup autoloaders
		EE_Registry::instance()->load_core( 'EE_Load_Textdomain' );
		//load textdomain
		EE_Load_Textdomain::load_textdomain();
		// check for activation errors
		if ( $activation_errors = get_option( 'ee_plugin_activation_errors', FALSE )) {
			EE_Error::add_error( $activation_errors );
			update_option( 'ee_plugin_activation_errors', FALSE );
		}
		// get model names
		$this->_parse_model_names();
		//load caf stuff a chance to play during the activation process too.
		$this->_maybe_brew_regular();
		//we gave addons a chance to register themselves before detecting the request type
		//and deciding whether or not to set maintenance mode
		// check for plugin activation/upgrade/installation
		if(self::$_activation){
			//if this is activation (or deactivation), then this will have been called well AFTER
			//the plugins_loaded hook! so just do this right away then
			$this->plugins_loaded();
		}else{
			add_action( 'plugins_loaded', array( $this,'plugins_loaded' ), 7 );
		}
		do_action( 'AHEE__EE_System__construct__end', $this );
	}



	/**
	 * 	_load_registry
	 *
	 * 	@access private
	 * 	@return void
	 */
	private function _load_registry() {
		if ( is_readable( EE_CORE . 'EE_Registry.core.php' )) {
			require_once( EE_CORE . 'EE_Registry.core.php' );
		} else {
			$msg = __( 'The EE_Registry core class could not be loaded.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			wp_die( EE_Error::get_notices() );
		}
	}


	/**
	 * 	_load_registry
	 *
	 * 	@access private
	 * 	@return void
	 */
	private function _load_class_tools() {
		if ( is_readable( EE_HELPERS . 'EEH_Class_Tools.helper.php' )) {
			require_once( EE_HELPERS . 'EEH_Class_Tools.helper.php' );
		} else {
			$msg = __( 'The EEH_Class_Tools helper could not be loaded.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
		}
	}



	/**
	 * cycles through all of the models/*.model.php files, and assembles an array of model names
	 * 
	 * @return void
	 */
	private function _parse_model_names(){
		//get all the files in the EE_MODELS folder that end in .model.php
		$models = glob( EE_MODELS.'*.model.php');
		foreach( $models as $model ){
			// get model classname
			$classname = EEH_File::get_classname_from_filepath_with_standard_filename( $model );
			$shortname = str_replace( 'EEM_', '', $classname );
			$reflectionClass = new ReflectionClass($classname);
			if( $reflectionClass->isSubclassOf('EEM_Base') && ! $reflectionClass->isAbstract()){
				$non_abstract_db_models[$shortname] = $classname;
			}
			$model_names[ $shortname ] = $classname;
				
		}
		EE_Registry::instance()->models = apply_filters( 'FHEE__EE_System__parse_model_names', $model_names );		
		EE_Registry::instance()->non_abstract_db_models = apply_filters( 'FHEE__EE_System__parse_implemented_model_names', $non_abstract_db_models );
	}	



	/**
	 * The purpose of this method is to simply check for a file named "caffeinated/brewing_regular.php" for any hooks that need to be setup before our EE_System launches.
	 * @return void
	 */
	private function _maybe_brew_regular() {
		if (( ! defined( 'EE_DECAF' ) ||  EE_DECAF !== TRUE ) && is_readable( EE_CAFF_PATH . 'brewing_regular.php' )) {
			require_once EE_CAFF_PATH . 'brewing_regular.php';
		}
	}



	/**
	 * plugins_loaded
	 * 
	 * @return void
	 */
	public function plugins_loaded(){
		// detect whether install or upgrade
		$this->_manage_activation_process();		
		// let's get it started		
		if ( is_admin() && ! EE_FRONT_AJAX ) {
			EE_Registry::instance()->load_core( 'Admin' );
		} else if ( EE_Maintenance_Mode::instance()->level() ) {
			// shut 'er down down for maintenance ?
			add_filter( 'the_content', array( 'EE_Maintenance_Mode', 'the_content' ), 99999 );
		} else {
			EE_Registry::instance()->load_core( 'Front_Controller' );
		}
		// load additional common resources
		add_action( 'init', array( $this, 'init' ), 3 );
		add_action('wp_enqueue_scripts', array( $this, 'wp_enqueue_scripts' ), 25 );
		/**
		 * whether on frontend or backend, load EE_Admin's toolbar. but not if its an ajax request
		 */
		if(EE_Maintenance_Mode::instance()->level() != EE_Maintenance_Mode::level_2_complete_maintenance && 
				! defined('DOING_AJAX')){
			add_action( 'admin_bar_menu', array( $this, 'espresso_toolbar_items' ), 100 );
		}
		do_action( 'AHEE__EE_System__plugins_loaded__end', $this );
	}
	/**
	 * Seta a wp option to remember that we want to redirect to the about page on the
	 * next normal ee request (because it appears we cant do that right after activation,
	 * because it interferes with activation of the plugin)
	 */
	private function _remember_to_redirect_to_ee_about_on_next_request(){
		update_option('ee_redirect_to_ee_about_on_next_request',true);
	}
	/**
	 * Removes the wp option to remember that we want to redirec tot the about page
	 * on next request- so that we don't accidentally get into an infinite loop!
	 */
	private function _remember_to_NOT_redirect_to_ee_about_on_next_request(){
		delete_option('ee_redirect_to_ee_about_on_next_request');
	}
	/**
	 * Checks the wp option to see if we should redirect the user to the ee about page or not
	 * @return boolean
	 */
	private function _should_redirect_to_ee_about_page(){
		return get_option('ee_redirect_to_ee_about_on_next_request',false);
	}


	/**
	* _manage_activation_process
	* 
	* Takes care of detecting whether this is a brand new install or code upgrade,
	* and either setting up the DB or setting up maintenance mode etc.
	* 
	* @access private
	* @return void
	*/
	private function _manage_activation_process() {

		do_action('AHEE__EE_System___manage_activation_process__before');

		if ( ! is_admin() || ( isset( $GLOBALS['pagenow'] ) && in_array( $GLOBALS['pagenow'], array( 'wp-login.php', 'wp-register.php' ))) || ( is_admin() && defined('DOING_AJAX') && DOING_AJAX  ) || ( is_admin() && !is_user_logged_in() ) ) {
			return;
		}
		// check if db has been updated, or if its a brand-new installation		
		$espresso_db_update = $this->fix_espresso_db_upgrade_option();
		$request_type = $this->detect_req_type($espresso_db_update);
//		echo "request type:".$request_type;
		if( $request_type != EE_System::req_type_normal){
			EE_Registry::instance()->load_helper('Activation');
		}
		switch($request_type){
			case EE_System::req_type_new_activation:
				 
				do_action( 'AHEE__EE_System__manage_activation_process__new_activation' );
				$this->_setup_initialize_db_if_no_migrations_required();	
//				echo "done activation";die;
				break;
			case EE_System::req_type_reactivation:
				do_action( 'AHEE__EE_System__manage_activation_process__reactivation' );
					$this->initialize_db_if_no_migrations_required();
//				echo "done reactivation";die;
				break;
			case EE_System::req_type_upgrade:
				do_action( 'AHEE__EE_System__manage_activation_process__upgrade' );
				if( ! EE_Maintenance_Mode::instance()->set_maintenance_mode_if_db_old()){
					//so the database doesnt look old (ie, there are no migration scripts
					//taht say they need to upgrade it)
					//THEN, we just want to still give the system a chance to setup new default data
					//first: double-check if this was called via an activation hook or a normal reqeust
					$this->_setup_initialize_db_if_no_migrations_required();
				} else {
					$this->_remember_to_redirect_to_ee_about_on_next_request();
				}
//				echo "done upgrade";die;
				break;
			case EE_System::req_type_downgrade:
				do_action( 'AHEE__EE_System__manage_activation_process__downgrade' );
				
				break;
			case EE_System::req_type_normal:
			default:
				$this->_maybe_redirect_to_ee_about();
				break;
		}
		if( ! $request_type == EE_System::req_type_normal){
			$this->update_list_of_installed_versions($espresso_db_update);
		}
		do_action( 'AHEE__EE_System__manage_activation_process__end' );
	}



	
	/**
	 * Does the traditional work of setting up the plugin's database and adding default data.
	 * If migration script/process didn't exist, this is what woudl happen on every activation/reactivation/upgrade.
	 * NOTE: does nothing if we're in maintenance mode (which would be the case if we detect there are data
	 * migration scripts that need to be run)
	 * @return void
	 */
	public function initialize_db_if_no_migrations_required(){
		$request_type = $this->detect_req_type();
		//only initialize system if we're not in maintenance mode.
		if( EE_Maintenance_Mode::instance()->level() != EE_Maintenance_Mode::level_2_complete_maintenance ){
			// set flag for flushing rewrite rules
			update_option( 'ee_flush_rewrite_rules', TRUE );
			EEH_Activation::system_initialization();
			EEH_Activation::initialize_db_and_folders();
			EEH_Activation::initialize_db_content();
		}
		if ( $request_type == EE_System::req_type_new_activation || $request_type == EE_System::req_type_reactivation || $request_type == EE_System::req_type_upgrade ) {
			$this->_remember_to_redirect_to_ee_about_on_next_request();
		}
	}




	/**
	 * This redirects to the about EE page after activation
	 * @return void
	 */
	public function redirect_to_about_ee() {
		$this->_remember_to_NOT_redirect_to_ee_about_on_next_request();
		$url = add_query_arg( array('page' => 'espresso_about'), admin_url( 'admin.php' ) );
		wp_safe_redirect( $url );
		exit();
	}



	
	/**
	 * Instead of just calling the activation code, we first check when WAS this code called?
	 * If it's on activation hook, then we can directly call initialize_db_if_no_migrations_required as 
	 * everything's ready for it, and init has already been called and we shouldn't add it on that hook (because it wont fire).
	 * If it's NOT on activation hook, then it's probably on plugins_loaded, and it's too early to call initialize_db_if_no_migrations_required,
	 * so we set it up to call it later, on init, when it's ready.
	 */
	private function _setup_initialize_db_if_no_migrations_required(){
		if(self::$_activation){
			//if via activation hook, we need to run the code right away, because the
			//init hook was called before this activation hook
			$this->initialize_db_if_no_migrations_required();
		}else{
			//if via a normal request, then we need to wait to run activation-type-code
			//until we_rewrite is defined by WP (on init hook) otherwise we'll have troubles
			add_action('init',array($this,'initialize_db_if_no_migrations_required'),2);
		}
	}


	/**
	 * Checks if we've set a wp option to indicate that we ought to redirect to 
	 * the ABOUT page; and if so, sets a hook to perform that direct
	 */
	private function _maybe_redirect_to_ee_about() {
		if(is_admin() && $this->_should_redirect_to_ee_about_page()){
			add_action('init', array($this, 'redirect_to_about_ee'), 10 );
		}
	}



	/**
	 * standardizes the wp option 'espresso_db_upgrade' which actually stores
	 * information about what versions of EE have been installed and activated,
	 * NOT necessarily the state of the database
	 * @param array $espresso_db_update_value teh value of the wordpress option. 
	 * If not supplied, fetches it from teh options table
	 * @return array the correct value of 'espresso_db_upgrade', after saving it
	 * if it needed correction
	 */
	private function fix_espresso_db_upgrade_option($espresso_db_update = null){
		do_action( 'AHEE__EE_System__manage_fix_espresso_db_upgrade_option__begin' );
		do_action( 'FHEE__EE_System__manage_fix_espresso_db_upgrade_option__begin',$espresso_db_update );
		if( ! $espresso_db_update){
			$espresso_db_update = get_option( 'espresso_db_update' );
		}
//		echo 'echodump of $espresso_db_update';
//		var_dump($espresso_db_update);
		// chech that option is an array
		if( ! is_array( $espresso_db_update )) {
			// if option is FALSE, then it never existed
			if ( $espresso_db_update === FALSE ) {
				// make $espresso_db_update an array and save option with autoload OFF
				$espresso_db_update =  array();
				add_option( 'espresso_db_update', $espresso_db_update, '', 'no' );
			} else {
				// option is NOT FALSE but also is NOT an array, so make it an array and save it
				$espresso_db_update =  array( $espresso_db_update=>array() );
				update_option( 'espresso_db_update', $espresso_db_update );
			}
		}else{
			$corrected_db_update = array();
			//if IS an array, but is it an array where KEYS are verion numbers, and values are arrays?
			foreach($espresso_db_update as $should_be_version_string => $should_be_array){
				if(is_int($should_be_version_string) && ! is_array($should_be_array)){
					//the key is an int, and the value ISNT an array
					//so it must be numerically-indexed, where values are versions installed...
					//fix it!
					$version_string = $should_be_array;
					$corrected_db_update[$version_string] = array('unknown-date');
				}else{
					//ok it checks out
					$corrected_db_update[$should_be_version_string] = $should_be_array;
				}
			}
			$espresso_db_update = $corrected_db_update;
			update_option( 'espresso_db_update', $espresso_db_update );
			
		}
		
		do_action( 'AHEE__EE_System__manage_fix_espresso_db_upgrade_option__end' );
		do_action( 'FHEE__EE_System__manage_fix_espresso_db_upgrade_option__end',$espresso_db_update );
		return $espresso_db_update;
	}



	/**
	 * Detects if the current version indicated in the has existed in the list of 
	 * previously-installed versions of EE (espresso_db_update). Does NOT modify it (ie, no side-effect)
	 * @param array $espresso_db_update_value teh value of the wordpress option. 
	 * If not supplied, fetches it from teh options table.
	 * Also, caches its result so later parts of the code can also know whether there's been an
	 * update or not. This way we can add the current version to espresso_db_update,
	 * but still know if this is a new install or not
	 * @param $espresso_db_update array from the wp option stored under the name 'espresso_db_update'. If not provided, this function
	 * retrieves it from the database... so the parameter only exists for optimization
	 * @return int one of the consts on EE_System::req_type_*
	 */
	public function detect_req_type($espresso_db_update = null){
		
		if ( $this->_req_type === NULL ){
			$espresso_db_update = ! empty( $espresso_db_update ) ? $espresso_db_update : $this->fix_espresso_db_upgrade_option();
			if( $espresso_db_update ){
				//it exists, so this isn't a completely new install
				//check if this version already in that list of previously installed versions
				if ( ! isset( $espresso_db_update[ EVENT_ESPRESSO_VERSION ] )) {
					//its a new version!
					$this->_req_type = EE_System::req_type_upgrade;
				} else {
					// its not an update. maybe a reactivation?
					if( self::$_activation ){
						$this->_req_type = EE_System::req_type_reactivation;
					} else {
						//its not a new install, not an upgrade, and not even a reactivation. its nothing special
						$this->_req_type = EE_System::req_type_normal;
					}
				}
			} else {
				//it doesn't exist. It's a completely new install
				$this->_req_type = EE_System::req_type_new_activation;
			}
		}
		return $this->_req_type;
	}



	/**
	 * Adds teh current code version to the saved wp option which stores a list
	 * of all ee versions ever installed.
	 * @param array $espresso_db_update_value teh value of the wordpress option. 
	 * If not supplied, fetches it from teh options table
	 * @return boolean success as to whether or not this option was changed
	 */
	public function update_list_of_installed_versions($espresso_db_update = null){
		$espresso_db_update = $this->fix_espresso_db_upgrade_option($espresso_db_update);
		$espresso_db_update[ EVENT_ESPRESSO_VERSION ][] = date( 'Y-m-d H:i:s' );
		// resave
		return update_option( 'espresso_db_update', $espresso_db_update );
	}




	/**
	 * 	init
	 *
	 *  	@access public
	 *  	@return 	void
	 */
	public function init() {
		// register Custom Post Types
		EE_Registry::instance()->load_core( 'Register_CPTs' );
		// session loading is turned ON by default, but prior to the init hook, can be turned back OFF via: add_filter( 'FHEE_load_EE_Session', '__return_false' );
		if ( apply_filters( 'FHEE_load_EE_Session', TRUE ) ) {
			EE_Registry::instance()->load_core( 'Session' );
		}
	}

	
	/**
	 * 	espresso_toolbar_items
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function espresso_toolbar_items($admin_bar) {

		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		EE_Registry::instance()->load_helper('URL', null, true);
		$menu_class = 'espresso_menu_item_class';
		//we don't use the constants EVENTS_ADMIN_URL or REG_ADMIN_URL
		//because they're only defined in each of their respective constructors
		//and this might be a frontend request, in which case they aren't available
		$events_admin_url = admin_url("admin.php?page=espresso_events");
		$reg_admin_url = admin_url("admin.php?page=espresso_registrations");

		//Top Level
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar',
				'title' => '<span class="ee-icon ee-icon-ee-cup-thick ee-icon-size-20"></span><span class="ab-label">' . _x('Event Espresso', 'admin bar menu group label') . '</span>',
				'href' => $events_admin_url,
				'meta' => array(
						'title' => __('Event Espresso'),
						'class' => $menu_class . 'first'
				),
		));

		//Events
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-events',
				'parent' => 'espresso-toolbar',
				'title' => 'Events',
				'href' => $events_admin_url,
				'meta' => array(
						'title' => __('Events'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Events Add New
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-events-new',
				'parent' => 'espresso-toolbar-events',
				'title' => 'Add New',
				'href' => EEH_URL::add_query_args_and_nonce( array( 'action'=>'create_new' ), $events_admin_url ),
				'meta' => array(
						'title' => __('Add New'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Events View
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-events-view',
				'parent' => 'espresso-toolbar-events',
				'title' => 'View',
				'href' => $events_admin_url,
				'meta' => array(
						'title' => __('View'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Events View All
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-events-all',
				'parent' => 'espresso-toolbar-events-view',
				'title' => 'All',
				'href' => $events_admin_url,
				'meta' => array(
						'title' => __('All'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Events View Today
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-events-today',
				'parent' => 'espresso-toolbar-events-view',
				'title' => 'Today',
				'href' => EEH_URL::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'today' ), $events_admin_url ),
				'meta' => array(
						'title' => __('Today'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Events View This Month
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-events-month',
				'parent' => 'espresso-toolbar-events-view',
				'title' => 'This Month',
				'href' => EEH_URL::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'month' ), $events_admin_url ),
				'meta' => array(
						'title' => __('This Month'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Registration Overview
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-registrations',
				'parent' => 'espresso-toolbar',
				'title' => 'Registrations',
				'href' => $reg_admin_url,
				'meta' => array(
						'title' => __('Registrations'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Registration Overview Today
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-registrations-today',
				'parent' => 'espresso-toolbar-registrations',
				'title' => 'Today',
				'href' => EEH_URL::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'today' ), $reg_admin_url ),
				'meta' => array(
						'title' => __('Today'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Registration Overview Today Completed
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-registrations-today-approved',
				'parent' => 'espresso-toolbar-registrations-today',
				'title' => 'Approved',
				'href' => EEH_URL::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'today', '_reg_status'=>EEM_Registration::status_id_approved ), $reg_admin_url ),
				'meta' => array(
						'title' => __('Approved'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Registration Overview Today Pending
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-registrations-today-pending',
				'parent' => 'espresso-toolbar-registrations-today',
				'title' => 'Pending',
				'href' => EEH_URL::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'today', 'reg_status'=>EEM_Registration::status_id_pending_payment ), $reg_admin_url ),
				'meta' => array(
						'title' => __('Pending Payment'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Registration Overview Today Incomplete
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-registrations-today-not-approved',
				'parent' => 'espresso-toolbar-registrations-today',
				'title' => 'Not Approved',
				'href' => EEH_URL::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'today', '_reg_status'=>EEM_Registration::status_id_not_approved ), $reg_admin_url ),
				'meta' => array(
						'title' => __('Not Approved'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Registration Overview Today Incomplete
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-registrations-today-cancelled',
				'parent' => 'espresso-toolbar-registrations-today',
				'title' => 'Cancelled',
				'href' => EEH_URL::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'today', '_reg_status'=>EEM_Registration::status_id_cancelled ), $reg_admin_url ),
				'meta' => array(
						'title' => __('Cancelled'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Registration Overview This Month
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-registrations-month',
				'parent' => 'espresso-toolbar-registrations',
				'title' => 'This Month',
				'href' => EEH_URL::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'month' ), $reg_admin_url ),
				'meta' => array(
						'title' => __('This Month'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Registration Overview This Month Approved
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-registrations-month-approved',
				'parent' => 'espresso-toolbar-registrations-month',
				'title' => 'Approved',
				'href' => EEH_URL::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'month', '_reg_status'=>EEM_Registration::status_id_approved ), $reg_admin_url ),
				'meta' => array(
						'title' => __('Approved'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Registration Overview This Month Pending
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-registrations-month-pending',
				'parent' => 'espresso-toolbar-registrations-month',
				'title' => 'Pending',
				'href' => EEH_URL::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'month', '_reg_status'=>EEM_Registration::status_id_pending_payment ), $reg_admin_url ),
				'meta' => array(
						'title' => __('Pending'),
						'target' => '',
						'class' => $menu_class
				),
		));
		
		//Registration Overview This Month Not Approved
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-registrations-month-not-approved',
				'parent' => 'espresso-toolbar-registrations-month',
				'title' => 'Not Approved',
				'href' => EEH_URL::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'month', '_reg_status'=>EEM_Registration::status_id_not_approved ), $reg_admin_url ),
				'meta' => array(
						'title' => __('Not Approved', 'event_espresso' ),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Registration Overview This Month Cancelled
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-registrations-month-cancelled',
				'parent' => 'espresso-toolbar-registrations-month',
				'title' => 'Cancelled',
				'href' => EEH_URL::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'month', '_reg_status'=>EEM_Registration::status_id_cancelled ), $reg_admin_url ),
				'meta' => array(
						'title' => __('Cancelled'),
						'target' => '',
						'class' => $menu_class
				),
		));
	}






	/*********************************************** 		WP_ENQUEUE_SCRIPTS HOOK		 ***********************************************/



	/**
	 * 	wp_enqueue_scripts
	 *
	 *  	@access 	public
	 *  	@return 	void
	 */
	public function wp_enqueue_scripts() {
		// unlike other systems, EE_System_scripts loading is turned ON by default, but prior to the init hook, can be turned off via: add_filter( 'FHEE_load_EE_System_scripts', '__return_false' );
		if ( apply_filters( 'FHEE_load_EE_System_scripts', TRUE ) ) {
		
			// jquery_validate loading is turned OFF by default, but prior to the wp_enqueue_scripts hook, can be turned back on again via:  add_filter( 'FHEE_load_jquery_validate', '__return_true' );
			if ( apply_filters( 'FHEE_load_jquery_validate', FALSE ) ) {
				// load jQuery Validate script from CDN with local fallback
				$jquery_validate_url = 'http://ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/jquery.validate.min.js'; 
				// is the URL accessible ?
				$test_url = @fopen( $jquery_validate_url, 'r' );
				// use CDN URL or local fallback ?
				$jquery_validate_url = $test_url !== FALSE ? $jquery_validate_url : EE_PLUGIN_DIR_URL . 'scripts/jquery.validate.min.js';
				// register jQuery Validate
				wp_register_script('jquery-validate', $jquery_validate_url, array('jquery'), '1.11.1', TRUE);			
			}
			
		}
	}
}
//EE_System::instance();

// End of file EE_System.core.php
// Location: /core/EE_System.core.php