<?php

/**
 * Model for retrieving Information about the Event Espresso status.
 */
class EEM_System_Status{

	// private instance of the EEM_System_Status object
	private static $_instance = NULL;



	/**
	 * 		This function is a singleton method used to instantiate the EEM_Attendee object
	 *
	 * 		@access public
	 * 		@param string $timezone string representing the timezone we want to set for returned Date Time Strings (and any incoming timezone data that gets saved).  Note this just sends the timezone info to the date time model field objects.  Default is NULL (and will be assumed using the set timezone in the 'timezone_string' wp option)
	 * 		@return EEM_System_Status
	 */
	public static function instance() {

		// check if instance of EEM_System_Status already exists
		if (self::$_instance === NULL) {
			// instantiate EEM_System_Status
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	private function __construct(){

	}
	/**
	 *
	 * @return array where each key is a function name on this class, and each value is SOMETHING--
	 * it might be a value, an array, or an object
	 */
	function get_system_stati(){
		return array(
			'ee_version'=>$this->get_ee_version(),
			'ee_activation_history'=>$this->get_ee_activation_history(),
			'ee_config'=>$this->get_ee_config(),
			'ee_migration_history'=>$this->get_ee_migration_history(),
			'active_plugins'=>$this->get_active_plugins(),
			'wp_settings'=>$this->get_wp_settings(),
			'https_enabled'=>$this->get_https_enabled(),
			'php_version'=>$this->php_version(),
			'php.ini_settings'=>$this->get_php_ini_all(),
			'php_info'=>$this->get_php_info(),

		);
	}
	/**
	 *
	 * @return string
	 */
	function get_ee_version(){
		return espresso_version();
	}
	/**
	 *
	 * @return string
	 */
	function php_version(){
		return phpversion();
	}
	/**
	 *
	 * @return array, where each key is a plugin name (lower-cased), values are sub-arrays.
	 * Sub-arrays like described in wp function get_plugin_data. Ie,	 *
	 *	'Name' => 'Plugin Name',
		'PluginURI' => 'Plugin URI',
		'Version' => 'Version',
		'Description' => 'Description',
		'Author' => 'Author',
		'AuthorURI' => 'Author URI',
		'TextDomain' => 'Text Domain',
		'DomainPath' => 'Domain Path',
		'Network' => 'Network',
	 */
	function get_active_plugins(){
		$active_plugins = (array) get_option( 'active_plugins', array() );
		if ( is_multisite() )
			$active_plugins = array_merge( $active_plugins, get_site_option( 'active_sitewide_plugins', array() ) );
		$active_plugins = array_map( 'strtolower', $active_plugins );
		$plugin_info = array();
		foreach ( $active_plugins as $plugin ) {
				$plugin_data = @get_plugin_data( WP_PLUGIN_DIR . '/' . $plugin );

				$plugin_info[ $plugin ] = $plugin_data;
		}
		return $plugin_info;
	}

	/**
	 *
	 * @return array with keys 'home_url' and 'site_url'
	 */
	function get_wp_settings(){

		return array(
			'name'=>get_bloginfo('name','display'),
			'is_multisite'=>is_multisite(),
			'version'=>  get_bloginfo( 'version', 'display' ),
			'home_url'=>home_url(),
			'site_url'=>site_url(),
			'WP_DEBUG'=>WP_DEBUG,
			'permalink_structure'=>get_option('permalink_structure'),
			'theme'=>wp_get_theme(),
			'gmt_offset'=>get_option('gmt_offset'),
			'timezone_string'=>get_option('timezone_string'),
			'admin_email'=>  get_bloginfo('admin_email', 'display'),
			'language'=>get_bloginfo('language','display')
			);
	}

	/**
	 * Gets an array of information about the history of ee versions installed
	 * @return array
	 */
	function get_ee_activation_history(){
		return get_option('espresso_db_update');
	}


	/**
	 * Gets an array where keys are ee versions, and their values are arrays indicating all the different times that version was installed
	 * @return EE_Data_Migration_Script_Base[]
	 */
	function get_ee_migration_history(){
		$options = EE_Data_Migration_Manager::instance()->get_all_migration_script_options();
		$presentable_migration_scripts = array();
		foreach($options as $option_array){
			$presentable_migration_scripts[str_replace(EE_Data_Migration_Manager::data_migration_script_option_prefix,"",$option_array['option_name'])] = maybe_unserialize($option_array['option_value']);
		}
		return $presentable_migration_scripts;
//		return get_option(EE_Data_Migration_Manager::data_migrations_option_name);//EE_Data_Migration_Manager::instance()->get_data_migrations_ran();
	}

	/**
	 *
	 * @return array like EE_Config class
	 */
	function get_ee_config(){
		return EE_Config::instance();
	}

	/**
	 * Gets an array of php setup info, pilfered from http://www.php.net/manual/en/function.phpinfo.php#87463
	 * @return array like the output of phpinfo(), but in an array
	 */
	function get_php_info(){
		ob_start();
		phpinfo(-1);

		$pi = preg_replace(
		array('#^.*<body>(.*)</body>.*$#ms', '#<h2>PHP License</h2>.*$#ms',
		'#<h1>Configuration</h1>#',  "#\r?\n#", "#</(h1|h2|h3|tr)>#", '# +<#',
		"#[ \t]+#", '#&nbsp;#', '#  +#', '# class=".*?"#', '%&#039;%',
		 '#<tr>(?:.*?)" src="(?:.*?)=(.*?)" alt="PHP Logo" /></a>'
		 .'<h1>PHP Version (.*?)</h1>(?:\n+?)</td></tr>#',
		 '#<h1><a href="(?:.*?)\?=(.*?)">PHP Credits</a></h1>#',
		 '#<tr>(?:.*?)" src="(?:.*?)=(.*?)"(?:.*?)Zend Engine (.*?),(?:.*?)</tr>#',
		 "# +#", '#<tr>#', '#</tr>#'),
		array('$1', '', '', '', '</$1>' . "\n", '<', ' ', ' ', ' ', '', ' ',
		 '<h2>PHP Configuration</h2>'."\n".'<tr><td>PHP Version</td><td>$2</td></tr>'.
		 "\n".'<tr><td>PHP Egg</td><td>$1</td></tr>',
		 '<tr><td>PHP Credits Egg</td><td>$1</td></tr>',
		 '<tr><td>Zend Engine</td><td>$2</td></tr>' . "\n" .
		 '<tr><td>Zend Egg</td><td>$1</td></tr>', ' ', '%S%', '%E%'),
		ob_get_clean());

		$sections = explode('<h2>', strip_tags($pi, '<h2><th><td>'));
		unset($sections[0]);

		$pi = array();
		foreach($sections as $section){
		  $n = substr($section, 0, strpos($section, '</h2>'));
		  preg_match_all(
		  '#%S%(?:<td>(.*?)</td>)?(?:<td>(.*?)</td>)?(?:<td>(.*?)</td>)?%E%#',
			$section, $askapache, PREG_SET_ORDER);
		  foreach($askapache as $m)
			  $m2 = isset($m[2]) ? $m[2] : null;
			  $pi[$n][$m[1]]=(!isset($m[3])||$m2==$m[3]) ? $m2 : array_slice($m,2);
		}

		return $pi;
	}

	/**
	 * Checks if site responds ot HTTPS
	 * @return boolean
	 */
	function get_https_enabled(){
		$home = str_replace("http://", "https://", home_url());
		$response = wp_remote_get($home);
		if($response instanceof WP_Error){ 
			$error_string = '';
			foreach($response->errors as $short_name => $description_array){
				$error_string .= "<b>$short_name</b>: ".implode(", ",$description_array);
			}
			return $error_string;
		}
		return "ok!";
	}
	/**
	 * Gets all the php.ini settings
	 * @return array
	 */
	function get_php_ini_all(){
		return ini_get_all();
	}	
}