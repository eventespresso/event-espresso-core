<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package		Event Espresso
 * @ author		Event Espresso
 * @ copyright	(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license		http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link			http://www.eventespresso.com
 * @ version		4.0
 *
 * ------------------------------------------------------------------------
 *
 * EE_System
 *
 * @package		Event Espresso
 * @subpackage	core/
 * @author		Brent Christensen, Michael Nelson
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
	 * indicates this is a 'normal' request. Ie, not activation, nor upgrade, nor activation.
	 * So examples of this would be a normal GET request on the frontend or backend, or a POST, etc
	 */
	const req_type_normal = 0;
	/**
	 * Indicates this is a brand new installation of EE so we should install
	 * tables and default data etc
	 */
	const req_type_new_activation = 1;
	/**
	 * we've detected that EE has been reactivated (or EE was activated during maintenance mode,
	 * and we just exited maintenance mode). We MUST check the database is setup properly
	 * and that default data is setup too
	 */
	const req_type_reactivation = 2;
	/**
	 * indicates that EE has been upgraded since its previous request.
	 * We may have data migration scripts to call and will want to trigger maintenance mode
	 */
	const req_type_upgrade = 3;
	/**
	 * TODO  will detect that EE has been DOWNGRADED. We probably don't want to run in this case...
	 */
	const req_type_downgrade = 4;

	/**
	 * Indicates a new activation, but we couldn't install eveyrthing properly because
	 * EE was in maintenance mode. So when we exit maintenance mode, we will
	 * consider the next request to be a reactivation and will verify default data
	 * is in place and tables are setup
	 */
	const req_type_activation_but_not_installed = 5;

	/**
	 * option prefix for recordin ghte activation history (like core's "espresso_db_update") of addons
	 */
	const addon_activation_history_option_prefix = 'ee_addon_activation_history_';

	/**
	 * Stores which type of request this is, options being one of the constants on EE_System starting with req_type_*.
	 * It can be a brand-new activation, a reactivation, an upgrade, a downgrade, or a normal request.
	 * @var int
	 */
	private $_req_type;



	/**
	 *	@singleton method used to instantiate class object
	 *	@access public
	 *	@return EE_System
	 */
	public static function instance() {
		// check if class object is instantiated, and instantiated properly
		if ( self::$_instance === NULL  or ! is_object( self::$_instance ) or ! ( self::$_instance instanceof  EE_System )) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	/**
	 * resets the instance and returns it
	 * @return EE_System
	 */
	public static function reset(){
		self::$_instance = NULL;
		return self::instance();
	}



	/**
	 *    class constructor
	 *
	 *    checks recommended versions for both WP and PHP
	 *    loads minimum files for bootstrapping system
	 *    sets hooks for running rest of system
	 *    provides "AHEE__EE_System__construct__complete" hook for EE Addons to use as their starting point
	 *    starting EE Addons from any other point may lead to problems
	 *
	 * @access    private
	 * @return \EE_System
	 */
	private function __construct() {
		do_action( 'AHEE__EE_System__construct__begin',$this );
		// check required WP version
		if ( ! $this->_minimum_wp_version_required() ) {
			unset( $_GET['activate'] );
			add_action( 'admin_notices', array( $this, 'minimum_wp_version_error' ), 1 );
			return;
		}
		// check required PHP version
		if ( ! $this->_minimum_php_version_required() ) {
			unset( $_GET['activate'] );
			add_action( 'admin_notices', array( $this, 'minimum_php_version_error' ), 1 );
			return;
		}
		// check recommended WP version
		if ( ! $this->_minimum_wp_version_recommended() ) {
			$this->_display_minimum_recommended_wp_version_notice();
		}
		// check recommended PHP version
		if ( ! $this->_minimum_php_version_recommended() ) {
			$this->_display_minimum_recommended_php_version_notice();
		}
		// central repository for classes
		$this->_load_registry();
		// workarounds for PHP < 5.3
		$this->_load_class_tools();
		// load a few helper files
		EE_Registry::instance()->load_helper( 'File' );
		EE_Registry::instance()->load_helper( 'Autoloader', array(), FALSE );
		// allow addons to load first so that they can register autoloaders, set hooks for running DMS's, etc
		add_action( 'plugins_loaded', array( $this, 'load_espresso_addons' ), 1 );
		// when an ee addon is activated, we want to call the core hook(s) again
		// because the newly-activated addon didn't get a chance to run at all
		add_action( 'activate_plugin', array( $this, 'load_espresso_addons' ), 1 );
		// detect whether install or upgrade
		add_action( 'plugins_loaded', array( $this, 'detect_activations_or_upgrades' ), 3 );
		// load EE_Config, EE_Textdomain, etc
		add_action( 'plugins_loaded', array( $this, 'load_core_configuration' ), 5 );
		// load EE_Config, EE_Textdomain, etc
		add_action( 'plugins_loaded', array( $this, 'register_shortcodes_modules_and_widgets' ), 7 );
		// you wanna get going? I wanna get going... let's get going!
		add_action( 'plugins_loaded', array( $this, 'brew_espresso' ), 9 );
		// ALL EE Addons should use the following hook point to attach their initial setup too
		// it's extremely important for EE Addons to register any class autoloaders so that they can be available when the EE_Config loads
		do_action( 'AHEE__EE_System__construct__complete', $this );
	}



	/**
	 *    _check_wp_version
	 *
	 * @access private
	 * @param string $min_version
	 * @return boolean
	 */
	private function _check_wp_version( $min_version = EE_MIN_WP_VER_REQUIRED ) {
		global $wp_version;
		return version_compare( $wp_version, $min_version, '>=' ) ? TRUE : FALSE;
	}

	/**
	 * 	_minimum_wp_version_required
	 *
	 * 	@access private
	 * 	@return boolean
	 */
	private function _minimum_wp_version_required() {
		return $this->_check_wp_version( EE_MIN_WP_VER_REQUIRED );
	}

	/**
	 * 	_minimum_wp_version_recommended
	 *
	 * 	@access private
	 * 	@return boolean
	 */
	private function _minimum_wp_version_recommended() {
		return $this->_check_wp_version( EE_MIN_WP_VER_RECOMMENDED );
	}



	/**
	 *    _check_php_version
	 *
	 * @access private
	 * @param string $min_version
	 * @return boolean
	 */
	private function _check_php_version( $min_version = EE_MIN_PHP_VER_RECOMMENDED ) {
		return version_compare( PHP_VERSION, $min_version, '>=' ) ? TRUE : FALSE;
	}

	/**
	 * 	_minimum_php_version_required
	 *
	 * 	@access private
	 * 	@return boolean
	 */
	private function _minimum_php_version_required() {
		return $this->_check_php_version( EE_MIN_PHP_VER_REQUIRED );
	}

	/**
	 * 	_minimum_php_version_recommended
	 *
	 * 	@access private
	 * 	@return boolean
	 */
	private function _minimum_php_version_recommended() {
		return $this->_check_php_version( EE_MIN_PHP_VER_RECOMMENDED );
	}



	/**
	 * 	minimum_wp_version_error
	 *
	 * 	@return void
	 */
	public function minimum_wp_version_error() {
		global $wp_version;
		?>
		<div class="error">
		<p>
		<?php
		printf(
			__( 'We\'re sorry, but Event Espresso requires WordPress version %1$s or greater in order to operate. You are currently running version %2$s.%3$sFor information on how to update your version of WordPress, please go to %4$s.', 'event_espresso' ),
			EE_MIN_WP_VER_REQUIRED,
			$wp_version,
			'<br/>',
			'<a href="http://codex.wordpress.org/Updating_WordPress">http://codex.wordpress.org/Updating_WordPress</a>'
		);
		?>
		</p>
		</div>
		<?php
		EE_System::deactivate_plugin( EE_PLUGIN_BASENAME );
	}



	/**
	 * 	minimum_php_version_error
	 *
	 * 	@return void
	 */
	public function minimum_php_version_error() {
		?>
		<div class="error">
		<p>
		<?php
		printf(
			__( 'We\'re sorry, but Event Espresso requires PHP version %1$s or greater in order to operate. You are currently running version %2$s.%3$sIn order to update your version of PHP, you will need to contact your current hosting provider.%3$sFor information on stable PHP versions, please go to %4$s.', 'event_espresso' ),
			EE_MIN_PHP_VER_REQUIRED,
			PHP_VERSION,
			'<br/>',
			'<a href="http://php.net/downloads.php">http://php.net/downloads.php</a>'
		);
		?>
		</p>
		</div>
		<?php
		deactivate_plugins( EE_PLUGIN_BASENAME );
	}



	/**
	 * 	_display_minimum_recommended_wp_version_notice
	 *
	 * 	@access private
	 * 	@return void
	 */
	private function _display_minimum_recommended_wp_version_notice() {
		global $wp_version;
		EE_Error::add_persistent_admin_notice(
			'wp_version_' . str_replace( '.', '-', EE_MIN_WP_VER_RECOMMENDED ) . '_recommended',
			sprintf(
				__( 'Event Espresso recommends WordPress version %1$s or greater in order for everything to operate properly. You are currently running version %2$s.%3$sFor information on how to update your version of WordPress, please go to %4$s.', 'event_espresso' ),
				EE_MIN_WP_VER_RECOMMENDED,
				$wp_version,
				'<br/>',
				'<a href="http://codex.wordpress.org/Updating_WordPress">http://codex.wordpress.org/Updating_WordPress</a>'
			)
		);
	}



	/**
	 * 	_display_minimum_recommended_php_version_notice
	 *
	 * 	@access private
	 * 	@return void
	 */
	private function _display_minimum_recommended_php_version_notice() {
		EE_Error::add_persistent_admin_notice(
			'php_version_' . str_replace( '.', '-', EE_MIN_PHP_VER_RECOMMENDED ) . '_recommended',
			sprintf(
				__( 'Event Espresso recommends PHP version %1$s or greater for optimal performance. You are currently running version %2$s.%3$sIn order to update your version of PHP, you will need to contact your current hosting provider.%3$sFor information on stable PHP versions, please go to %4$s.', 'event_espresso' ),
				EE_MIN_PHP_VER_RECOMMENDED,
				PHP_VERSION,
				'<br/>',
				'<a href="http://php.net/downloads.php">http://php.net/downloads.php</a>'
			)
		);
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
	* load_espresso_addons
	*
	* allow addons to load first so that they can set hooks for running DMS's, etc
	*
	* @access public
	* @return void
	*/
	public function load_espresso_addons() {
		// set autoloaders for all of the classes implementing EEI_Plugin_API
		// which provide helpers for EE plugin authors to more easily register certain components with EE.
		EEH_Autoloader::instance()->register_autoloaders_for_each_file_in_folder( EE_LIBRARIES . 'plugin_api' );
		do_action( 'AHEE__EE_System__load_espresso_addons' );
	}


	/**
	 * Checks for activation or upgrade of core first; then also checks if any registered
	 * addons have been activated or upgraded
	 */
	public function detect_activations_or_upgrades(){
		//first off: let's make sure to handle core
		$this->detect_if_activation_or_upgrade();
		foreach(EE_Registry::instance()->addons as $addon){
			//detect teh request type for that addon
			$addon->detect_activation_or_upgrade();
		}
	}
	/**
	* detect_if_activation_or_upgrade
	*
	* Takes care of detecting whether this is a brand new install or code upgrade,
	* and either setting up the DB or setting up maintenance mode etc.
	*
	* @access private
	* @return void
	*/
	public function detect_if_activation_or_upgrade() {
		do_action('AHEE__EE_System___detect_if_activation_or_upgrade__begin');

		//this filter is present to make it easier to bypass the admin/user check here so we can setup the db when running tests.
		$testsbypass = apply_filters( 'FHEE__EE_System__detect_if_activation_or_upgrade__testsbypass', FALSE );

		if ( !$testsbypass &&
				( ! is_admin() ||
				( isset( $GLOBALS['pagenow'] ) && in_array( $GLOBALS['pagenow'], array( 'wp-login.php', 'wp-register.php' ))) ||
				( is_admin() && defined('DOING_AJAX') && DOING_AJAX  ) ) ) {

			return;
		}
		// load M-Mode class
		EE_Registry::instance()->load_core( 'Maintenance_Mode' );
		// check if db has been updated, or if its a brand-new installation

		$espresso_db_update = $this->fix_espresso_db_upgrade_option();
		$request_type =  $this->detect_req_type($espresso_db_update);
//		echo "request type:".$request_type;
		if( $request_type != EE_System::req_type_normal){
			EE_Registry::instance()->load_helper('Activation');
		}

		switch($request_type){
			case EE_System::req_type_new_activation:
				do_action( 'AHEE__EE_System__detect_if_activation_or_upgrade__new_activation' );
				add_action( 'AHEE__EE_System__perform_activations_upgrades_and_migrations', array( $this, 'initialize_db_if_no_migrations_required' ));
//				echo "done activation";die;
				$this->update_list_of_installed_versions( $espresso_db_update );
				$this->_do_setup_validations( $request_type );
				break;
			case EE_System::req_type_activation_but_not_installed:
				//just record that it was activated, but don't install anything
				do_action( 'AHEE__EE_System__detect_if_activation_or_upgrade__new_activation_but_not_installed' );
				$this->update_list_of_installed_versions( $espresso_db_update );
				$this->_do_setup_validations( $request_type );
				break;
			case EE_System::req_type_reactivation:
				do_action( 'AHEE__EE_System__detect_if_activation_or_upgrade__reactivation' );
				add_action( 'AHEE__EE_System__perform_activations_upgrades_and_migrations', array( $this, 'initialize_db_if_no_migrations_required' ));
//				echo "done reactivation";die;
				$this->update_list_of_installed_versions( $espresso_db_update );
				$this->_do_setup_validations( $request_type );
				break;
			case EE_System::req_type_upgrade:
				do_action( 'AHEE__EE_System__detect_if_activation_or_upgrade__upgrade' );
				if( ! EE_Maintenance_Mode::instance()->set_maintenance_mode_if_db_old()){
					// so the database doesnt look old (ie, there are no migration scripts that say they need to upgrade it)
					// THEN, we just want to still give the system a chance to setup new default data
					add_action( 'AHEE__EE_System__perform_activations_upgrades_and_migrations', array( $this, 'initialize_db_if_no_migrations_required' ));
				} else {
					add_action( 'AHEE__EE_System__load_CPTs_and_session__start', array( $this, 'redirect_to_about_ee'));
				}
				$this->update_list_of_installed_versions( $espresso_db_update );
				$this->_do_setup_validations( $request_type );
//				echo "done upgrade";die;
				break;
			case EE_System::req_type_downgrade:
				do_action( 'AHEE__EE_System__detect_if_activation_or_upgrade__downgrade' );
				$this->update_list_of_installed_versions( $espresso_db_update );
				$this->_do_setup_validations( $request_type );
				break;
			case EE_System::req_type_normal:
			default:
//				$this->_maybe_redirect_to_ee_about();
				break;
		}
		do_action( 'AHEE__EE_System__detect_if_activation_or_upgrade__complete' );
	}




	/**
	 * standardizes the wp option 'espresso_db_upgrade' which actually stores
	 * information about what versions of EE have been installed and activated,
	 * NOT necessarily the state of the database
	 *
	 * @param null $espresso_db_update
	 * @internal param array $espresso_db_update_value the value of the WordPress option. If not supplied, fetches it from the options table
	 * @return array the correct value of 'espresso_db_upgrade', after saving it, if it needed correction
	 */
	private function fix_espresso_db_upgrade_option($espresso_db_update = null){
		do_action( 'FHEE__EE_System__manage_fix_espresso_db_upgrade_option__begin', $espresso_db_update );
		if( ! $espresso_db_update){
			$espresso_db_update = get_option( 'espresso_db_update' );
		}
		// check that option is an array
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
			//if IS an array, but is it an array where KEYS are version numbers, and values are arrays?
			foreach($espresso_db_update as $should_be_version_string => $should_be_array){
				if(is_int($should_be_version_string) && ! is_array($should_be_array)){
					//the key is an int, and the value IS NOT an array
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

		do_action( 'FHEE__EE_System__manage_fix_espresso_db_upgrade_option__complete', $espresso_db_update );
		return $espresso_db_update;
	}




	/**
	 * Does the traditional work of setting up the plugin's database and adding default data.
	 * If migration script/process did not exist, this is what would happen on every activation/reactivation/upgrade.
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
			//foreach registered addon, make sure its db is up-to-date too
			foreach(EE_Registry::instance()->addons as $addon){
				$addon->initialize_db_if_no_migrations_required();
			}
		}
		if ( $request_type == EE_System::req_type_new_activation || $request_type == EE_System::req_type_reactivation || $request_type == EE_System::req_type_upgrade ) {
			add_action( 'AHEE__EE_System__load_CPTs_and_session__start', array( $this, 'redirect_to_about_ee' ), 9 );
		}
	}



	/**
	 * Adds the current code version to the saved wp option which stores a list of all ee versions ever installed.
	 * @param 	array 	$version_history
	 * @param 	string 	$current_version_to_add 	version to be added to the version history
	 * @return 	boolean success as to whether or not this option was changed
	 */
	public function update_list_of_installed_versions($version_history = NULL,$current_version_to_add = NULL) {
		if( ! $version_history ) {
			$version_history = $this->fix_espresso_db_upgrade_option($version_history);
		}
		if( $current_version_to_add == NULL){
			$current_version_to_add = espresso_version();
		}
		$version_history[ $current_version_to_add ][] = date( 'Y-m-d H:i:s',time() );
		// re-save
		return update_option( 'espresso_db_update', $version_history );
	}




	/**
	 * This method holds any setup validations that are done on all activation request types excluding the normal request type.
	 *
	 * @since  4.3.1
	 *
	 * @param int $request_type What request type this is.  The paramater is included so that any future validations added to here can be restricted to only certain request types.
	 *
	 * @return void
	 */
	private function _do_setup_validations( $request_type ) {
		if ( $request_type !== EE_System::req_type_new_activation ) {
			add_action( 'AHEE__EE_System__core_loaded_and_ready', array( 'EEH_Activation', 'validate_messages_system' ), 1 );
		}
		do_action( 'AHEE__EE_System___do_setup_validations', $request_type );
	}





	/**
	 * Detects if the current version indicated in the has existed in the list of
	 * previously-installed versions of EE (espresso_db_update). Does NOT modify it (ie, no side-effect)
	 *
	 * @param $espresso_db_update array from the wp option stored under the name 'espresso_db_update'.
	 *                            If not provided, this function retrieves it from the database... so the parameter only exists for optimization
	 * @internal param array $espresso_db_update_value the value of the wordpress option.
	 *                            If not supplied, fetches it from the options table.
	 *                            Also, caches its result so later parts of the code can also know whether there's been an
	 *                            update or not. This way we can add the current version to espresso_db_update,
	 *                            but still know if this is a new install or not
	 * @return int one of the consts on EE_System::req_type_
	 */
	public function detect_req_type( $espresso_db_update = NULL ){

		if ( $this->_req_type === NULL ){
			$espresso_db_update = ! empty( $espresso_db_update ) ? $espresso_db_update : $this->fix_espresso_db_upgrade_option();
			$this->_req_type = $this->detect_req_type_given_activation_history($espresso_db_update,'ee_espresso_activation',espresso_version());
		}
		return $this->_req_type;
	}
	/**
	 * Determines the request type for any ee addon, given three piece of info: the current array of activation histories (for core that' 'espresso_db_update' wp option); the name of the wordpress option which is temporarily set upon activation of the plugin (for core it's 'ee_espresso_activation'); and the version that this plugin
	 * was just activated to (for core that will alwasy be espreso_version())
	 * @param array $activation_history_for_addon the option's value which stores the activation history for this ee plugin.
	 * for core that's 'espresso_db_update'
	 * @param string $activation_indicator_option_name the name of the wordpress option that is temporarily set to indicate that this plugin was just activated
	 * @param string $version_to_upgrade_to the version that was just upgraded to (for core that will be espresso_version())
	 * @return int one of the consts on EE_System::req_type_*
	 */
	public static function detect_req_type_given_activation_history($activation_history_for_addon, $activation_indicator_option_name,$version_to_upgrade_to){
		//there are some exceptions if we're in maintenance mode. So are we in MM?
		if( EE_Maintenance_Mode::instance()->real_level() == EE_Maintenance_Mode::level_2_complete_maintenance ) {
			//ok check if this is a new install while in MM...
			if( $activation_history_for_addon ){
				$req_type = EE_System::req_type_normal;
			}else{
				//so this should have been a "new install" request, but we're in MM
				//so set things up so that when we exit MM, we will consider it a delayed install
				//for that, WE LEAVE THE activation indicator option in place
				$req_type = EE_System::req_type_activation_but_not_installed;
			}
		}else{
			if( $activation_history_for_addon ){
				//it exists, so this isn't a completely new install
				//check if this version already in that list of previously installed versions
				if ( ! isset( $activation_history_for_addon[ $version_to_upgrade_to ] )) {
					//its a new version!
					$req_type = EE_System::req_type_upgrade;
					delete_option( $activation_indicator_option_name );
				} else {
					// its not an update. maybe a reactivation?
					if( get_option( $activation_indicator_option_name, FALSE ) ){
						$req_type = EE_System::req_type_reactivation;
						delete_option( $activation_indicator_option_name );
					} else {
						//its not a new install, not an upgrade, and not even a reactivation. its nothing special
						$req_type = EE_System::req_type_normal;
					}
				}
			} else {
				//brand new install and we're not in MM
				$req_type = EE_System::req_type_new_activation;
				delete_option( $activation_indicator_option_name );

			}
		}
//		echo "req type for ".$activation_indicator_option_name." was $req_type";
		return $req_type;
	}



	/**
	 * This redirects to the about EE page after activation
	 * @return void
	 */
	public function redirect_to_about_ee() {
		if( is_admin() ){
			$url = add_query_arg( array( 'page' => 'espresso_about' ), admin_url( 'admin.php' ) );
			wp_safe_redirect( $url );
			exit();
		}
	}


	/**
	 * load_core_configuration - runs during the WP plugins_loaded action at priority 5
	 *
	 * @return void
	 */
	public function load_core_configuration(){
		do_action( 'AHEE__EE_System__load_core_configuration__begin', $this );
		// load and setup EE_Config and EE_Network_Config
		EE_Registry::instance()->load_core( 'Config' );
		EE_Registry::instance()->load_core( 'Network_Config' );
		// setup autoloaders
		EE_Registry::instance()->load_core( 'EE_Load_Textdomain' );
		//load textdomain
		EE_Load_Textdomain::load_textdomain();
		// enable logging?
		if ( EE_Registry::instance()->CFG->admin->use_full_logging ) {
			EE_Registry::instance()->load_core( 'Log' );
		}
		// check for activation errors
		$activation_errors = get_option( 'ee_plugin_activation_errors', FALSE );
		if ( $activation_errors ) {
			EE_Error::add_error( $activation_errors, __FILE__, __FUNCTION__, __LINE__ );
			update_option( 'ee_plugin_activation_errors', FALSE );
		}
		// get model names
		$this->_parse_model_names();
		//load_messages controller
		EE_Registry::instance()->load_lib( 'Messages_Init' );
		//load caf stuff a chance to play during the activation process too.
		$this->_maybe_brew_regular();
		do_action( 'AHEE__EE_System__load_core_configuration__complete', $this );
	}


	/**
	 * cycles through all of the models/*.model.php files, and assembles an array of model names
	 *
	 * @return void
	 */
	private function _parse_model_names(){
		//get all the files in the EE_MODELS folder that end in .model.php
		$models = glob( EE_MODELS.'*.model.php');
		$model_names = array();
		$non_abstract_db_models = array();
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
	* register_shortcodes_modules_and_widgets
	*
	* generate lists of shortcodes and modules, then verify paths and classes
	*
	* @access public
	* @return void
	*/
	public function register_shortcodes_modules_and_widgets() {
		do_action( 'AHEE__EE_System__register_shortcodes_modules_and_widgets' );
		// check for addons using old hookpoint
		if ( has_action( 'AHEE__EE_System__register_shortcodes_modules_and_addons' )) {
			$this->_incompatible_addon_error();
		}
	}


	/**
	* _incompatible_addon_error
	*
	* @access public
	* @return void
	*/
	private function _incompatible_addon_error() {
		// get array of classes hooking into here
		$class_names = EEH_Class_Tools::get_class_names_for_all_callbacks_on_hook( 'AHEE__EE_System__register_shortcodes_modules_and_addons' );
		if ( ! empty( $class_names )) {
			$msg = __( 'The following plugins, addons, or modules appear to be incompatible with this version of Event Espresso and were automatically deactivated to avoid fatal errors:', 'event_espresso' );
			$msg .= '<ul>';
			foreach ( $class_names as $class_name ) {
				$msg .= '<li><b>Event Espresso - ' . str_replace( array( 'EE_', 'EEM_', 'EED_', 'EES_', 'EEW_' ), '', $class_name ) . '</b></li>';
			}
			$msg .= '</ul>';
			$msg .= __( 'Compatibility issues can be avoided and/or resolved by keeping addons and plugins updated to the latest version.', 'event_espresso' );
			// save list of incompatible addons to wp-options for later use
			add_option( 'ee_incompatible_addons', $class_names, '', 'no' );
			if ( is_admin() ) {
				EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			}
		}
	}




	/**
	 * brew_espresso
	 *
	 * begins the process of setting hooks for initializing EE in the order
	 * runs during the WP plugins_loaded action at priority 9
	 *
	 * @return void
	 */
	public function brew_espresso(){
		do_action( 'AHEE__EE_System__brew_espresso__begin', $this );
		// load some final core systems
		add_action( 'init', array( $this, 'set_hooks_for_core' ), 1 );
		add_action( 'init', array( $this, 'perform_activations_upgrades_and_migrations' ), 3 );
		add_action( 'init', array( $this, 'load_CPTs_and_session' ), 5 );
		add_action( 'init', array( $this, 'load_controllers' ), 7 );
		add_action( 'init', array( $this, 'core_loaded_and_ready' ), 9 );
		add_action( 'init', array( $this, 'initialize' ), 10 );
		add_action( 'init', array( $this, 'initialize_last' ), 100 );
		add_action('wp_enqueue_scripts', array( $this, 'wp_enqueue_scripts' ), 25 );
		add_action( 'admin_bar_menu', array( $this, 'espresso_toolbar_items' ), 100 );

		if ( is_admin()  ) {
			// pew pew pew
			EE_Registry::instance()->load_core( 'PUE' );
			do_action( 'AHEE__EE_System__brew_espresso__after_pue_init' );
		}
		do_action( 'AHEE__EE_System__brew_espresso__complete', $this );
	}




	/**
	 * 	set_hooks_for_core
	 *
	 *  	@access public
	 *  	@return 	void
	 */
	public function set_hooks_for_core() {
		$this->_deactivate_incompatible_addons();
		do_action( 'AHEE__EE_System__set_hooks_for_core' );
	}



	/**
	 * Using the information gathered in EE_System::_incompatible_addon_error,
	 * deactivates any addons considered incompatible with the current version of EE
	 */
	private function _deactivate_incompatible_addons(){
		$incompatible_addons = get_option( 'ee_incompatible_addons', array() );
		if ( ! empty( $incompatible_addons )) {
			$active_plugins = get_option( 'active_plugins', array() );
			foreach ( $active_plugins as $active_plugin ) {
				foreach ( $incompatible_addons as $incompatible_addon ) {
					if ( strpos( $active_plugin,  $incompatible_addon ) !== FALSE ) {
						unset( $_GET['activate'] );
						EE_System::deactivate_plugin( $active_plugin );
					}
				}
			}
		}
	}



	/**
	 *    deactivate_plugin
	 * usage:  EE_System::deactivate_plugin( plugin_basename( __FILE__ ));
	 *
	 * @access public
	 * @param string $plugin_basename - the results of plugin_basename( __FILE__ ) for the plugin's main file
	 * @return    void
	 */
	public static function deactivate_plugin( $plugin_basename = '' ) {
		if ( ! function_exists( 'deactivate_plugins' )) {
			require_once(ABSPATH . 'wp-admin/includes/plugin.php');
		}
		deactivate_plugins( $plugin_basename );
	}



	/**
	 * 	perform_activations_upgrades_and_migrations
	 *
	 *  	@access public
	 *  	@return 	void
	 */
	public function perform_activations_upgrades_and_migrations() {
		do_action( 'AHEE__EE_System__perform_activations_upgrades_and_migrations' );
	}



	/**
	 * 	load_CPTs_and_session
	 *
	 *  	@access public
	 *  	@return 	void
	 */
	public function load_CPTs_and_session() {
//		$e = EEM_Event::instance()->get_one();
//		EEM_Datetime::instance()->show_next_x_db_queries();
//		$ds = EEM_Datetime::instance()->get_datetimes_for_event_ordered_by_start_time($e->ID(),false);
//
		do_action( 'AHEE__EE_System__load_CPTs_and_session__start' );
		// register Custom Post Types
		EE_Registry::instance()->load_core( 'Register_CPTs' );
		EE_Registry::instance()->load_core( 'Session' );
		do_action( 'AHEE__EE_System__load_CPTs_and_session__complete' );
	}



	/**
	* load_controllers
	*
	* this is the best place to load any additional controllers that needs access to EE core.
	* it is expected that all basic core EE systems, that are not dependant on the current request are loaded at this time
	*
	* @access public
	* @return void
	*/
	public function load_controllers() {
		do_action( 'AHEE__EE_System__load_controllers__start' );
		// let's get it started
		if ( ! is_admin() && !  EE_Maintenance_Mode::instance()->level() ) {
			do_action( 'AHEE__EE_System__load_controllers__load_front_controllers' );
			EE_Registry::instance()->load_core( 'Front_Controller' );
		} else if ( ! EE_FRONT_AJAX ) {
			do_action( 'AHEE__EE_System__load_controllers__load_admin_controllers' );
			EE_Registry::instance()->load_core( 'Admin' );
		}
		do_action( 'AHEE__EE_System__load_controllers__complete' );
	}



	/**
	* core_loaded_and_ready
	*
	* all of the basic EE core should be loaded at this point and available regardless of M-Mode
	*
	* @access public
	* @return void
	*/
	public function core_loaded_and_ready() {
		do_action( 'AHEE__EE_System__core_loaded_and_ready' );
		add_action( 'wp_loaded', array( $this, 'set_hooks_for_shortcodes_modules_and_addons' ), 1 );
	}



	/**
	* initialize
	*
	* this is the best place to begin initializing client code
	*
	* @access public
	* @return void
	*/
	public function initialize() {
		do_action( 'AHEE__EE_System__initialize' );
	}



	/**
	* initialize_last
	*
	* this is run really late during the WP init hookpoint, and ensures that mostly everything else that needs to initialize has done so
	*
	* @access public
	* @return void
	*/
	public function initialize_last() {
		do_action( 'AHEE__EE_System__initialize_last' );
	}




	/**
	* set_hooks_for_shortcodes_modules_and_addons
	*
	* this is the best place for other systems to set callbacks for hooking into other parts of EE
	* this happens at the very beginning of the wp_loaded hookpoint
	*
	* @access public
	* @return void
	*/
	public function set_hooks_for_shortcodes_modules_and_addons() {
		do_action( 'AHEE__EE_System__set_hooks_for_shortcodes_modules_and_addons' );
	}



	/**
	 *    espresso_toolbar_items
	 *
	 * @access    public
	 * @param $admin_bar
	 * @return    void
	 */
	public function espresso_toolbar_items( $admin_bar ) {

		// if in full M-Mode, or its an AJAX request, or user is NOT an admin
		if ( EE_Maintenance_Mode::instance()->level() == EE_Maintenance_Mode::level_2_complete_maintenance || defined( 'DOING_AJAX' ) || ! current_user_can( 'administrator' )) {
			return;
		}

		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		EE_Registry::instance()->load_helper( 'URL' );
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
				// register jQuery Validate
				wp_register_script( 'jquery-validate', EE_GLOBAL_ASSETS_URL . 'scripts/jquery.validate.min.js', array('jquery'), '1.11.1', TRUE );
			}
		}
	}
}
//EE_System::instance();

// End of file EE_System.core.php
// Location: /core/EE_System.core.php
