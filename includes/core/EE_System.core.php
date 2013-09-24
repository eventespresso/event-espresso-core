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
	 * 	EE_Registry Object
	 *	@var 	EE_Registry	$EE	
	 * 	@access 	protected
	 */
	protected $EE = NULL;

	/**
	 * Whether this request was from activating EE or if it was already activated
	 * @var boolean
	 */
	private $_activation = false;
	
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
	 *		@singleton method used to instantiate class object
	 *		@access public
	 *		@return EE_System
	 */
	public static function instance( $activation = FALSE ) {
		// check if class object is instantiated, and instantiated properly
		if ( self::$_instance === NULL  or ! is_object( self::$_instance ) or ! ( self::$_instance instanceof  EE_System )) {
			self::$_instance = new self( $activation );
		}
		return self::$_instance;
	}



	/**
	 * 	class constructor
	 *
	 *  @access 	private
	 *  @return 	void
	 */
	private function __construct( $activation ) {
		
		// handy dandy object for holding shtuff
		$this->_activation = $activation;
		$this->_load_registry();
		$this->_register_custom_autoloaders();
		$this->_define_table_names();
		$this->EE->load_core( 'Maintenance_Mode' );
		$this->handle_new_install_or_upgrade_etc();

		if ( ! $activation ) {
			add_action( 'plugins_loaded', array( $this, 'plugins_loaded' ), 5 );
			add_action( 'init', array( $this, 'init' ), 3 );
			add_action('wp_enqueue_scripts', array( $this, 'wp_enqueue_scripts' ), 25 );			
		}
	}



	/**
	 * 		_load_registry
	 *
	 * 		@access private
	 * 		@return void
	 */
	private function _load_registry() {
//		echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		if ( is_readable( EE_CORE . 'EE_Registry.core.php' )) {
			require_once( EE_CORE . 'EE_Registry.core.php' );
			$this->EE = EE_Registry::instance();
		} else {
			$msg = __( 'The EE_Registry could not be loaded.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
		}
	}




	/**
	 * 		register core, model and class 'autoloaders'
	 *
	 * 		@access private
	 * 		@return void
	 */
	private function _register_custom_autoloaders() {
		$this->_register_autoloaders_for_each_file_in_folder( EE_CORE );
		$this->_register_autoloaders_for_each_file_in_folder( EE_MODELS );
		$this->_register_autoloaders_for_each_file_in_folder( EE_MODELS . DS  . 'fields' );
		$this->_register_autoloaders_for_each_file_in_folder( EE_MODELS . DS  . 'helpers' );
		$this->_register_autoloaders_for_each_file_in_folder( EE_MODELS . DS  . 'relations' );
		$this->_register_autoloaders_for_each_file_in_folder( EE_MODELS . DS  . 'strategies' );
		$this->_register_autoloaders_for_each_file_in_folder( EE_CLASSES );
	}
	
	
	/**
	 * Assumes all the files in this folder have the normal naming scheme (namely that their classname
	 * is the file's name, plus ".whatever.php".) and adds each of them to the autoloader list.
	 * If that's not the case, you'll need to improve this function or just use _get_classname_from_filepath_with_standard_filename() directly.
	 * Yes this has to scan the directory for files, but it only does it once -- not on EACH
	 * time the autoloader is used
	 * @param string $folder name, with or without trailing /, doesn't matter
	 * @return void
	 */
	private function _register_autoloaders_for_each_file_in_folder($folder){
		// make sure last char is a /
		$folder .= $folder[strlen($folder)-1] != DS ? DS : '';
		$class_to_filepath_map = array();
		//get all the files in that folder that end in php
		$filepaths = glob( $folder.'*.php');
		foreach($filepaths as $filepath){
			$class_to_filepath_map [ $this->_get_classname_from_filepath_with_standard_filename( $filepath ) ] = $filepath;
		}
		//printr( $class_to_filepath_map, '$class_to_filepath_map  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		EE_Registry::register_autoloader($class_to_filepath_map);
	}

	/**
	 * Given that the file in $filepath has the normal name, (ie, CLASSNAME.whatever.php),
	 * extract that classname.
	 * @param string $filepath
	 * @return string
	 */
	private function _get_classname_from_filepath_with_standard_filename($filepath){
		//extract file from path
		$filename = basename( $filepath );
		//now remove the first period and everything after
		$pos_of_first_period = strpos( $filename,'.' );
		$classname = substr($filename, 0, $pos_of_first_period);
		return $classname;
	}
	
	
	/**
	 * cycles through all of the models/*.model.php files, then checks for and calls define_table_name()
	 * 
	 * @return void
	 */
	private function _define_table_names(){
		//get all the files in the EE_MODELS folder that end in .model.php
		$models = glob( EE_MODELS.'*.model.php');
		foreach( $models as $model ){
			// get model classname
			$classname = $this->_get_classname_from_filepath_with_standard_filename( $model );
			// check for define_table_name() then call it
			if ( method_exists( $classname, 'define_table_name' )) {
				call_user_func( array( $classname, 'define_table_name' ));
			}
		}

		// because there's no model for the status table...
		if ( ! defined( 'ESP_STATUS_TABLE' )) {
			global $wpdb;
			define( 'ESP_STATUS_TABLE', $wpdb->prefix . 'esp_status' );
		}
	}




	/**
	* handle_new_install_or_upgrade_etc
	* 
	* Takes care of detecting whether this is a brand new install or code upgrade,
	* and either setting up the DB or setting up maintenance mode etc.
	* 
	* @access public
	* @since 3.1.28
	* @return void
	*/
	private function handle_new_install_or_upgrade_etc() {
		// check if db has been updated, or if its a brand-new installation
		$espresso_db_update = $this->fix_espresso_db_upgrade_option();
		switch($this->detect_req_type($espresso_db_update)){
			case EE_System::req_type_new_activation:
			case EE_System::req_type_reactivation:
				EEH_Activation::initialize_db_and_folders();
				EEH_Activation::initialize_db_content();
				$this->update_list_of_installed_versions($espresso_db_update);
				break;
			case EE_System::req_type_upgrade:
				EE_Maintenance_Mode::instance()->set_maintenance_mode_if_db_old();
				$this->update_list_of_installed_versions($espresso_db_update);
				break;
			case EE_System::req_type_downgrade:
				$this->update_list_of_installed_versions($espresso_db_update);
				break;
			case EE_System::req_type_normal:
			default:
				break;
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
	 * @return int one of the consts on EE_System::req_type_*
	 */
	public function detect_req_type($espresso_db_update = null){
		
		if ($this->_req_type === null){
			$espresso_db_update = $this->fix_espresso_db_upgrade_option($espresso_db_update);
			if($espresso_db_update){
				//it exists, so this isn't a completely new install
				//check if this version already in that list of previously installed versions
				if ( ! isset( $espresso_db_update[ EVENT_ESPRESSO_VERSION ] )) {
					//its a new version!
					$this->_req_type = EE_System::req_type_upgrade;
				}else{
					//its not an update. maybe a reactivation?
					if($this->_activation){
						$this->_req_type = EE_System::req_type_reactivation;
					}else{
						//its not a new install, not an upgrade, and not even a reactivation. its nothing special
						$this->_req_type = EE_System::req_type_normal;
					}
				}
			}else{
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
	 * 		plugins_loaded
	 *
	 * 		@access 	public
	 * 		@return 		void
	 */
	public function plugins_loaded() {
		if ( $activation_errors = get_option( 'espresso_plugin_activation_errors', FALSE )) {
			EE_Error::add_error( $activation_errors );
			update_option( 'espresso_plugin_activation_errors', FALSE );
		}
	}



	/**
	 * 	init
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function init() {
		// load EE_Config
		$this->EE->load_core( 'Config' );
		// register Custom Post Types
		$this->EE->load_core( 'Register_CPTs' );
		// session loading is turned OFF by default, but prior to the init hook, can be turned back on again via: add_filter( 'FHEE_load_EE_Session', '__return_true' );
		if ( apply_filters( 'FHEE_load_EE_Session', FALSE ) || is_admin() ) {
			$this->load_EE_Session();
		}
		//$this->create_event_slug_rewrite_rule();

	}


	/**
	 * 		load and instantiate EE_Session class
	 *
	 * 		@access public
	 * 		@return void
	 */
	public function load_EE_Session() {
		// instantiate !!!
		$this->EE->load_core( 'Session' );
	}




	/**
	 * 	create_event_slug_rewrite_rule
	 *
	 *  @access 	public
	 *  @param 	boolean 	$to_flush_or_not_to_flush reset rules ?
	 *  @return 	void
	 */
	private function create_event_slug_rewrite_rule( $to_flush_or_not_to_flush = FALSE ) {
//		global $wpdb;		
//		// grab slug for event reg page
//		$SQL = 'SELECT post_name  FROM ' . $wpdb->prefix . 'posts WHERE ID = %d';
//		$reg_page_url_slug = $wpdb->get_var( $wpdb->prepare( $SQL, $this->EE->CFG->events_page ));
//		$this->_add_rewrite_rules( $reg_page_url_slug, 'event_slug', $to_flush_or_not_to_flush );
	}



	/**
	 * 	_add_rewrite_rules
	 *
	 *  @access 	private
	 *  @param 	string 		$url_slug 	the slug you want to appear in the URL
	 *  @param 	string 		$slug_key	the key you will use to obtain the slug
	 *  @param 	boolean 	$to_flush_or_not_to_flush reset rules ?
	 *  @return 	void
	 */
	private function _add_rewrite_rules( $url_slug = FALSE, $slug_key = FALSE, $to_flush_or_not_to_flush = FALSE ) {	
		// you don't get something for nothing !!!'
		if ( ! $url_slug || ! $slug_key ) {
			return FALSE;
		}
		$to_flush_or_not_to_flush = apply_filters( 'FHEE_flush_rewrite_rules', $to_flush_or_not_to_flush );
		// create pretty permalinks
		if ( get_option( 'permalink_structure' ) != '' ) {
			// rules for url slug pretty links
			add_rewrite_rule( $url_slug . '/([^/]+)/?$', 'index.php?pagename=' . $url_slug . '&'. $slug_key .'=$matches[1]', 'top');
			// whether tis nobler on the server to suffer the pings and errors of outrageous flushing
			if ( $to_flush_or_not_to_flush ) {
				flush_rewrite_rules();
			}
		}		
	}





	/*********************************************** 		WP_ENQUEUE_SCRIPTS HOOK		 ***********************************************/



	/**
	 * 	wp_enqueue_scripts
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function wp_enqueue_scripts() {
		// unlike other systems, EE_System_scripts loading is turned ON by default, but prior to the init hook, can be turned off via: add_filter( 'FHEE_load_EE_System_scripts', '__return_false' );
		if ( apply_filters( 'FHEE_load_EE_System_scripts', TRUE )) {
		
			// jquery_validate loading is turned OFF by default, but prior to the wp_enqueue_scripts hook, can be turned back on again via:  add_filter( 'FHEE_load_jquery_validate', '__return_true' );
			if ( apply_filters( 'FHEE_load_jquery_validate', FALSE )) {
				// load jQuery Validate script from CDN with local fallback
				$jquery_validate_url = 'http://ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/jquery.validate.min.js'; 
				// is the URL accessible ?
				$test_url = @fopen( $jquery_validate_url, 'r' );
				// use CDN URL or local fallback ?
				$jquery_validate_url = $test_url !== FALSE ? $jquery_validate_url : EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/jquery.validate.min.js';
				// register jQuery Validate
				wp_register_script('jquery-validate', $jquery_validate_url, array('jquery'), '1.11.1', TRUE);			
			}
			
		}
	}






	


}
//EE_System::instance();

// End of file EE_System.core.php
// Location: /core/EE_System.core.php
