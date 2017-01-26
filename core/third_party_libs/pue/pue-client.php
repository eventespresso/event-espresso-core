<?php
/**
* This file should be bundled with the main plugin.  Any addons to your main plugin can include this file from the main plugin folder.  This contains the library for
* handling all the automatic upgrade stuff on the clients end.
*
* You also have to make sure you call this class in any addons/plugins you want to be added to the update checker.  Here's what you do:
* if ( file_exists(WP_PLUGIN_DIR . '/location_of_file/pue-client.php') ) { //include the file
*	require( WP_PLUGIN_DIR . '/location_of_file/pue-client.php' );
*	$host_server_url = 'http://updateserver.com'; //this needs to be the host server where plugin update engine is installed.  note: if you leave this blank then it is assumed wordpress.org is going to be checked and we will just gracefully exit this class.
*	$plugin_slug = 'plugin-slug'; //this needs to be the slug of the plugin/addon that you want updated (and that pue-client.php is included with).  This slug should match what you've set as the value for plugin-slug when adding the plugin to the plugin list via plugin-update-engine on your server.  Note: IF this is a string then it is assumed the plugin slug will be for a premium version (requiring a license key).  If it is an array, then PUE will look for the "free" and "premium" indexes and then depending on whether there is a valid key or not what version we download for upgrade.
*	//$options needs to be an array with the included keys as listed.
*	$options = array(
*		'optionName' => '', //(optional) - used as the reference for saving update information in the clients options table.  Will be automatically set if left blank.
*		'apikey' => $api_key, //(required), you will need to obtain the apikey that the client gets from your site and then saves in their sites options table (see 'getting an api-key' below)
*		'lang_domain' => '', //(optional) - put here whatever reference you are using for the localization of your plugin (if it's localized).  That way strings in this file will be included in the translation for your plugin.
*		'checkPeriod' => '', //(optional) - use this parameter to indicate how often you want the client's install to ping your server for update checks.  The integer indicates hours.  If you don't include this parameter it will default to 12 hours.
*		'version_params' => array( 'free' => 'something', 'premium' => 'something' ) //(required if $slug is an array).  IF $plugin_slug is an array then you must set in this option what the params are for each version as that allows PUE to know whether the installed version is your free plugin or the premium upgrade.
*	);
*	$check_for_updates = new PluginUpdateEngineChecker($host_server_url, $plugin_slug, $options); //initiate the class and start the plugin update engine!
* }
*/

/**
 * getting an api-key
 *
*/
//You'll need to put something like this here before initiating the PluginUpdateEngineChecker class to obtain the api-key the client has set for your plugin. Of course this means you will need to include a field in your plugin option page for the client to enter this key.  (modify to match your setup):
/*
 $settings = get_site_option('plugin_options'); //'plugin_options' should be replaced by whatever holds your plugin options and the api_key
 $api_key = $settings['plugin_api_key'];
*/
if ( !class_exists('PluginUpdateEngineChecker') ):
/**
 * A custom plugin update checker.
 *
 * @original author (c) Janis Elsts
 * @heavily modified by Darren Ethier
 * @license GPL2 or greater.
 * @version 1.1
 * @access public
 */
class PluginUpdateEngineChecker {

	public $metadataUrl = ''; //The URL of the plugin's metadata file.
	public $pluginFile = '';  //plugin_basename (used internally by WP updates).
	public $pluginName = ''; //variable used to hold the pluginName as set by the constructor.
	public $checkPeriod = 12; //How often to check for updates (in hours).
	public $optionName = '';  //Where to store the update info.
	public $option_key = ''; //this is what is used to reference the api_key in your plugin options.  PUE uses this to trigger updating your information message whenever this option_key is modified.
	public $options_page_slug = ''; //this is the slug of the options page for your plugin where the site-licence(api) key is set by your user.  This is required in order to do an update check immediately when the options page is set so api messages update immediately.
	public $json_error = ''; //for storing any json_error data that get's returned so we can display an admin notice.
	public $api_secret_key = ''; //used to hold the user API.  If not set then nothing will work!
	public $install_key = '';  //used to hold the install_key if set (included here for addons that will extend PUE to use install key checks)
	public $install_key_arr = array(); //holds the install key array from the database.
	public $download_query = array(); //used to hold the query variables for download checks;
	public $lang_domain = ''; //used to hold the localization domain for translations .
	public $dismiss_upgrade; //for setting the dismiss upgrade option (per plugin).
	public $pue_install_key; //we'll customize this later so each plugin can have it's own install key!
	public $slug; //will hold the slug that is being used to check for updates.
	public $current_domain; //holds what the current domain is that is pinging for updates
	public $extra_stats; //used to contain an array of key/value pairs that will be sent as extra stats.
	public $turn_on_notice_saves = false; //used to flag that renewal notices/critical notices are attached to version updates of this plugin.


	private $_installed_version = ''; //this will just hold what installed version we have of the plugin right now.
	private $_is_premium = FALSE; //this is a flag used for setting whether the premium version is installed or not.
	private $_is_prerelease = FALSE; //optional, this flag is used to indicate whether this is a pre-release version or not.
	private $_is_freerelease = FALSE; //this is used to indicate whether this is a free release or not.
	private $_plugin_basename = '';
	private $_use_wp_update = FALSE; //flag for indicating if free downloads are updated from wp or not.
	private $_incoming_slug = '';
	private $_force_premium_upgrade = FALSE; //flag for indicating if we want to give the user the option to upgrade to premium from a free version immediately.


	/**
	 * This is just a container for any pue errors that get generated (and possibly used to display via an admin notice)
	 * @var array
	 */
	private $_pue_errors = array();
	private $_error_msg = '';

	/**
	 * Class constructor.
	 *
	 * @param string $metadataUrl The URL of the plugin's metadata file.
	 * @param string $pluginFile Fully qualified path to the main plugin file.
	 * @param string $slug The plugin's 'slug'.
	 * @param array $options:  Will contain any options that need to be set in the class initialization for construct.  These are the keys:
	 * 	@key integer $checkPeriod How often to check for updates (in hours). Defaults to checking every 12 hours. Set to 0 to disable automatic update checks.
	 * 	@key string $optionName Where to store book-keeping info about update checks. Defaults to 'external_updates-$slug'.
	 *  @key string $apikey used to authorize download updates from developer server
	 *	@key string $lang_domain If the plugin file pue-client.php is included with is localized you can put the domain reference string here so any strings in this file get included in the localization.
	 * @return void
	 */
	function __construct( $metadataUrl = NULL, $slug = NULL, $options = array() ){
		$this->metadataUrl = $metadataUrl;
		if ( empty($this->metadataUrl) )
			return FALSE;

		$this->_incoming_slug = $slug;

		$options_verified = $this->_verify_options( $options );

		if ( !$options_verified )
			return; //get out because we don't have verified options (and the admin_notice should display);

		$verify_slug = $this->_set_slug_and_slug_props($slug, $options_verified);

		if ( !$verify_slug )
			return; //get out because the slug isn't valid.  An admin notice should show.

		$this->current_domain = str_replace('http://','',site_url());
		$this->current_domain = urlencode(str_replace('https://','',$this->current_domain));
		$this->optionName = 'external_updates-' . $this->slug;
		$this->checkPeriod = (int) $options_verified['checkPeriod'];
		$this->api_secret_key = trim( $options_verified['apikey'] );
		$this->option_key = $options_verified['option_key'];
		$this->options_page_slug = $options_verified['options_page_slug'];
		$this->_use_wp_update = $this->_is_premium || $this->_is_prerelease ? FALSE : $options_verified['use_wp_update'];
		$this->extra_stats = $options_verified['extra_stats'];
		$this->turn_on_notice_saves = isset( $options_verified['turn_on_notices_saved'] ) ? $options_verified['turn_on_notices_saved'] : false;

		//set hooks
		$this->_check_for_forced_upgrade();
		$this->installHooks();
	}


	/**
	 * This checks to see if there is a forced upgrade option saved from a previous saved options page trigger.  If there is then we change the slug accordingly and setup for premium update
	 * This function will also take care of deleting any previous force_update options IF our current installed plugin IS premium
	 *
	 * @access private
	 * @return void
	 */
	private function _check_for_forced_upgrade() {

		/**
		 * We ONLY execute this check if the incoming plugin being checked has a free option.
		 * If there is no free option, then no forced upgrade will be happening.
		 */
		if ( ! isset( $this->_incoming_slug['free'] ) ) {
			return;
		}

		//is this premium?  let's delete any saved options for free
		if ( $this->_is_premium  ) {
			delete_site_option( 'pue_force_upgrade_' . $this->_incoming_slug['free'][key($this->_incoming_slug['free'])]);
		} else {
			$force_upgrade = get_site_option( 'pue_force_upgrade_' . $this->slug );
			$this->_force_premium_upgrade = !empty($force_upgrade) ? TRUE : FALSE;
			$this->_is_premium = !empty( $force_upgrade ) ? TRUE : FALSE;
			$this->slug = !empty( $force_upgrade ) ? $force_upgrade : $this->slug;
			$this->pue_install_key = 'pue_install_key_'.$this->slug;
			$this->optionName = 'external_updates-' . $this->slug;
			$this->_use_wp_update = !empty( $force_upgrade ) ? FALSE : $this->_use_wp_update;
		}
	}



	/**
	 * This simply goes through the sent options array and make sure it has all the REQUIRED info.  If it doesn't then we'll set an admin notice with an error message for the user.
	 *
	 * @access  private
	 * @return  void
	 */
	private function _verify_options( $options ) {
		$this->lang_domain = isset( $options['lang_domain'] ) ? $options['lang_domain'] : '';
		$required = array(
			'options_page_slug',
			'plugin_basename'
			);
		$defaults = array(
			'apikey' => NULL,
			'checkPeriod' => 12,
			'option_key' => 'pue_site_license_key',
			'use_wp_download' => FALSE,
			'extra_stats' => array() //this is an array of key value pairs for extra stats being tracked.
			);

		//let's first make sure requireds are present
		foreach ( $required as $key ) {
			if ( !isset( $options[$key] ) )
				$this->_pue_errors[] = $key;
		}

		if ( empty( $this->_pue_errors ) ) {
			$options = array_merge( $defaults, $options );
			return $options;
		} else {
			$this->_display_errors( 'options' );
			return FALSE;
		}
	}




	/**
	 * All this does is verify that if $slug is an array that we have a key in the $options field for 'version_params' that help us determine whether the plugin installed is the premium or freemium version.
	 * Then we set the _installed_version property and the _is_premium property
	 *
	 * @access  private
	 * @param  array $options already verified options
	 * @param  mixed(array|string) $slug    if array then we have premium and free options for this plugin
	 * @return bool (false for fail, true for success)
	 */
	private function _verify_and_set_installed_version( $slug ) {
		if ( is_array( $slug )  ) {

			//We require at LEAST 'premium' index to be present if this is an array
			if ( !isset( $slug['premium'] ) ) {
				$this->_display_errors('slug_array_invalid');
				return FALSE;
			}
		} else {
			$this->_display_errors('slug_not_array');
			return FALSE;
		}

		$this->_installed_version = $this->getInstalledVersion();

		if ( !$this->_installed_version ) {
			$this->_display_errors('no_version_present');
			return FALSE;
		}
		return TRUE;

	}




	private function _display_errors( $type ) {
		$msg = '';
		if ( defined('WP_DEBUG') && WP_DEBUG ) {
			switch ( $type ) {
				case 'options' :
					$msg .= sprintf( __('Plugin Update Engine is unable to setup correctly for the plugin with the slug "%s" because there are the following keys missing from the options array sent to the PluginUpdateEngineChecker class when it is instantiated:', $this->lang_domain), print_r( $this->_incoming_slug, true) ) . '</p><p>';
					$msg .= '<ul>';
					foreach ( $this->_pue_errors as $error ) {
						$msg .= '<li>' . $error . '</li>';
					}
					$msg .= '</ul>';
					break;

				case 'slug_array_invalid' :
					$msg .= __('An array was sent to the PluginUpdateEngineChecker class as the value for the $plugin_slug property, however the array is missing the "premium" index.', $this->lang_domain);
					break;

				case 'slug_string_invalid' :
					$msg .= __('A string was sent to the PluginUpdateEngineChecker class as the value for the $plugin_slug property, however the string is empty', $this->lang_domain);
					break;

				case 'no_version_present' :
					$msg .= __('For some reason PUE is unable to determine the current version of the plugin. It is possible that the incorrect value was sent for the "plugin_basename" key in the <strong>$options</strong> array.', $this->lang_domain);
					break;

				case 'slug_not_array' :
					//Old method for plugin name is just to use the slug and manipulate
					$pluginname = ucwords(str_replace('-', ' ', $this->_incoming_slug) );
					$msg .= sprintf( __('The following plugin needs to be updated in order to work with this version of our plugin update script: <strong>%s</strong></p><p>You will have to update this manually.  Contact support for further instructions', $this->lang_domain), $pluginname);
					break;
			}
		} else {
			$slug = $this->slug;

			if ( empty( $this->slug ) ) {
				$msg .= sprintf( 'Automatic updates cannot be setup for an EE addon because of an error in the file.  Please contact support, and include a list of EE addons recently installed/updated.', $this->lang_domain ) . '</p><p>';
			} else {
				$msg .= sprintf( __('Unable to setup automatic updates for the plugin with the slug "%s" because of an error with the code. Please contact EE support and give them this error message.', $this->lang_domain), $slug ) . '</p><p>';
			}
		}

		$this->_error_msg = apply_filters('PUE__display_errors', '<p>' . $msg . '</p>', $type, $this->_pue_errors, $this->_incoming_slug);
		add_action( 'admin_notices', array( $this, 'show_pue_client_errors'), 10 );
	}



	/**
	 * display any pue_client errors
	 *
	 * @access public
	 * @return string html string echoed.
	 */
	public function show_pue_client_errors() {
		?>
		<div class="error" style="padding:15px; position:relative;" id="pue_option_error">
			<?php echo $this->_error_msg; ?>
		</div>
		<?php
	}



	/**
	 * Takes care of setting the slug property and the related other properties dependent on the incoming slug var.
	 *
	 * If $slug is an array then we are expecting the array in the following format:
	 * array(
	 * 	'free' => 'slug_for_free' //what is sent in the update package to check on the PUE server for the free product
	 * 	'premium' => 'slug_for_premium' //what is send in the update package to check on the PUE server for the premium product
	 * )
	 *
	 * @param mixed (array|string) $slug either an array containing free product slugs or premium product
	 */
	private function _set_slug_and_slug_props( $slug, $options ) {


		$this->pluginFile = $options['plugin_basename'];
		$this->lang_domain = isset( $options['lang_domain'] ) && !empty($options['lang_domain']) ? $options['lang_domain'] : NULL;

		//we need to set installed version and set flags for version
		$verify_version = $this->_verify_and_set_installed_version( $slug );

		if ( !$verify_version )
			return FALSE;


		//set other properties related to version
		//is_premium?
		$premium_search_ref = is_array($slug) ? key($slug['premium']) : NULL;
		//case insensitive search in version
		$this->_is_premium = !empty( $premium_search_ref ) && preg_match( "/$premium_search_ref/i", $this->_installed_version ) ? TRUE : FALSE;


		//wait... if slug is_string() then we'll assume this is a premium install by default
		$this->_is_premium = !$this->_is_premium && !is_array( $slug ) ? TRUE : $this->_is_premium;

		//set pre-release flag
		$pr_search_ref = is_array($slug) && isset( $slug['prerelease'] ) ? key( $slug['prerelease'] ) : NULL;
		$this->_is_prerelease = !empty( $pr_search_ref ) && preg_match("/$pr_search_ref/i", $this->_installed_version ) ? TRUE : FALSE;

		//free_release?
		$fr_search_ref = is_array($slug) && isset( $slug['free'] ) ? key( $slug['free'] ) : NULL;
		$this->_is_freerelease = !empty( $fr_search_ref ) && preg_match("/$fr_search_ref/", $this->_installed_version ) ? TRUE : FALSE;


		//set slug we use
		$this->slug = $this->_is_premium && is_array( $slug ) ? $slug['premium'][key($slug['premium'])] : NULL;


		//we handle differently depending on whether the slug is an array or not.
		if ( is_array( $slug ) ) {
			//let's go through the conditions on what we use for the slug
			$set_slug = $this->_is_premium ? $slug['premium'][key($slug['premium'])] : NULL;
			$set_slug = empty( $set_slug ) && $this->_is_prerelease ? $slug['prerelease'][key($slug['prerelease'])] : $set_slug;
			$set_slug = empty( $set_slug ) && isset( $slug['free'] ) ? $slug['free'][key($slug['free'])] : $set_slug;
		} else {
			//first verify that $slug is not empty!
			if ( empty($slug ) ) {
				$this->_display_errors['slug_string_invalid'];
				return FALSE;
			}
			$set_slug = $slug;
		}

		$this->slug = $set_slug;  //now we've got the slug for the package to get set.

		//now let's setup other properties based on the slug OR the 'plugin_basename' option.

		$this->dismiss_upgrade = 'pu_dismissed_upgrade_'.$this->slug;
		$this->pue_install_key = 'pue_install_key_'.$this->slug;
		return TRUE;
	}



	/**
	* gets the api from the options table if present
	**/
	function set_api($new_api = '') {
		//download query flag
		$this->download_query['pu_get_download'] = 1;
		//include current version
		$this->download_query['pue_active_version'] = $this->_installed_version;
		$this->download_query['site_domain'] = $this->current_domain;


		//the following is for install key inclusion (will apply later with PUE addons.)
		$this->install_key_arr = get_site_option($this->pue_install_key);
		if ( isset($this->install_key_arr['key'] ) ) {

			$this->install_key = $this->install_key_arr['key'];

			$this->download_query['pue_install_key'] = $this->install_key;
		} else {
			$this->download_query['pue_install_key'] = '';
		}

		if ( !empty($new_api) ) {
			$this->api_secret_key = $new_api;
			$this->download_query['pu_plugin_api'] = $this->api_secret_key;
			return;
		}

		if ( empty($new_api) ) {
			$this->download_query['pu_plugin_api'] = $this->api_secret_key;
			return;
		}
	}

	/**
	 * Install the hooks required to run periodic update checks and inject update info
	 * into WP data structures.
	 * Also other hooks related to the automatic updates (such as checking agains API and what not (@from Darren)
	 * @return void
	 */
	function installHooks(){

		//Set up the periodic update checks
		$cronHook = 'check_plugin_updates-' . $this->slug;

		if ( $this->checkPeriod > 0 ){

			//Trigger the check via Cron
			if ( !wp_next_scheduled($cronHook) && !defined('WP_INSTALLING') ) {
				wp_schedule_event(time(), 'daily', $cronHook);
			}
			add_action($cronHook, array($this, 'checkForUpdates'));

			//In case Cron is disabled or unreliable, we also manually trigger
			//the periodic checks while the user is browsing the Dashboard.
			add_action( 'init', array($this, 'hook_into_wp_update_api'), 0 );

		} else {
			//Periodic checks are disabled.
			wp_clear_scheduled_hook($cronHook);
		}
		//dashboard message "dismiss upgrade" link
		add_action( "wp_ajax_".$this->dismiss_upgrade, array($this, 'dashboard_dismiss_upgrade'));

		if ( ! has_action( "wp_ajax_pue_dismiss_persistent_notice" ) ) {
			add_action( "wp_ajax_pue_dismiss_persistent_notice", array( $this, 'dismiss_persistent_notice' ) );
		}


		if ( !$this->_use_wp_update ) {
			add_filter( 'upgrader_pre_install', array( $this, 'pre_upgrade_setup'), 10, 2 );
			add_filter( 'upgrader_post_install', array( $this, 'tidy_up_after_upgrade'), 10, 3 );
		}
	}


	/**
	 * This is where we'll hook in to set filters for handling bulk and regular updates (i.e. making sure directory names are setup properly etc.)
	 * @param  boolean $continue   return true or WP aborts current upgrade process.
	 * @param  array   $hook_extra This will contain the plugin basename in a 'plugin' key
	 * @return boolean             We always make sure to return true otherwise wp aborts.
	 */
	function pre_upgrade_setup( $continue, $hook_extra ) {
		if ( !empty( $hook_extra['plugin'] ) && $hook_extra['plugin'] == $this->pluginFile ) {
			//we need to make sure that the new directory is named correctly
			add_filter('upgrader_source_selection', array( $this, 'fixDirName'), 10, 3 );
		}
		return TRUE;
	}




	/**
	 * Tidy's up our plugin upgrade stuff after update is complete so other plugins aren't affected.
	 *
	 * @uses
	 * @param  boolean $continue       return true so wp doesn't abort.
	 * @param  array   $hook_extra     contains the plugin_basename with the 'plugin'
	 *                                 index which we can use to indicate if this is
	 *                                 where we want our stuff run
	 * @param  array   $install_result WP sends off all the things that have been done in
	 *                                 an array (post install)
	 * @return boolean				   if wp_error object is returned then wp aborts.
	 */
	function tidy_up_after_upgrade( $continue, $hook_extra, $install_result ) {
		if ( !empty( $hook_extra['plugin'] ) && $hook_extra['plugin'] == $this->pluginFile ) {
			//gotta make sure bulk updates for other files don't get messed up!!
			remove_filter('upgrader_source_selection', array( $this, 'fixDirName'), 10);
			//maybe clean up any leftover files from upgrades
			$this->maybe_cleanup_upgrade();
		}
		return true;
	}



	/**
	 * This basically is set to fix the directories for our plugins.
	 *
	 * Take incoming remote_source file and rename it to match what it should be.
	 *
	 * @param  string $source        This is usually the same as $remote_source but *may* be something else if this has already been filtered
	 * @param  string $remote_source What WP has set as the source (ee plugins coming from beta.eventespresso.com will be beta.tmp)
	 * @param  WPPluginUpgrader $wppu
	 * @return string renamed file and path
	 */
	function fixDirName( $source, $remote_source, $wppu ) {
		global $wp_filesystem;

		//get out early if this doesn't have a plugin updgrader object.
		if ( !$wppu instanceof Plugin_Upgrader )
			return $source;

		//if this is a bulk update then we need an alternate method to verify this is an update we need to modify.
		if ( $wppu->bulk ) {
			$url_to_check = $wppu->skin->options['url'];
			$is_good = strpos( $url_to_check, urlencode($this->pluginFile) ) === FALSE ? FALSE : TRUE;
		} else {
			$is_good = isset( $wppu->skin->plugin ) && $wppu->skin->plugin == $this->pluginFile ? TRUE : FALSE;
		}

		if ( $is_good ) {
			$new_dir = $wp_filesystem->wp_content_dir() . 'upgrade/' . $this->slug . '/';

			//make new directory if needed.
			if ( $wp_filesystem->exists( $new_dir ) ) {
				//delete the existing dir first because we want to make sure clean install
				$wp_filesystem->delete($new_dir, FALSE, 'd');
			}

			//now make sure that we DON'T have the directory and we'll create a new one for this.
			if ( ! $wp_filesystem->exists( $new_dir ) ) {
				if ( !$wp_filesystem->mkdir( $new_dir, FS_CHMOD_DIR ) )
					return new WP_Error( 'mkdir_failed_destination', $wppu->strings['mkdir_failed'], $new_dir );
			}

			//copy original $source into new source
			$result = copy_dir( $source, $new_dir );
			if ( is_wp_error($result ) ) {
				//something went wrong let's just return the original $source as a fallback.
				return $source;
			}

			//everything went okay... new source = new dir
			$source = $new_dir;
		}
		return $source;
	}




	function hook_into_wp_update_api() {
		$this->set_api();
		$this->maybeCheckForUpdates();
		$ver_option_key = 'puvererr_' . basename( $this->pluginFile );


		//possible update checks on an option page save that is setting the license key. Note we're not actually using the response yet for this triggered update check but we might at some later date.
		$triggered = $this->trigger_update_check();


		//if we've got a forced premium upgrade then let's add an admin notice for this with a nice button to do the upgrade right away.  We'll also handle the display of any json errors in this admin_notice.
		if ( $this->_force_premium_upgrade ) {
			add_action('admin_notices', array($this, 'show_premium_upgrade') );
		}


		//this injects info into the returned Plugin info popup but we ONLY inject if we're not doing wp_updates
		$this->json_error = $this->get_json_error_string();
		if ( ! $this->_use_wp_update ) {
			add_filter('plugins_api', array( $this, 'injectInfo' ), 10, 3);

			//Insert our update info into the update array maintained by WP
			add_filter('site_transient_update_plugins', array( $this,'injectUpdate' ));

		}


		add_action( 'admin_notices', array( $this, 'maybe_display_extra_notices' ) );


		if ( ! $this->_use_wp_update ) {
			if ( !empty($this->json_error) && !$this->_force_premium_upgrade ) {
				add_action('admin_notices', array($this, 'display_json_error'), 10, 3);
			} else if ( empty( $this->json_error ) ) {
				//no errors so let's get rid of any error option if present BUT ONLY if there are no json_errors!
				delete_site_option( $ver_option_key );
			}
		}
	}



	function get_json_error_string() {
		$option_name = substr( 'pue_json_error_' . $this->pluginFile, 0, 40 );
		return get_site_option( $option_name );
	}


	function set_json_error_string( $error_message ) {
		$option_name = substr( 'pue_json_error_' . $this->pluginFile, 0, 40 );
		update_site_option( $option_name, $error_message );
	}



	function delete_json_error_string() {
		$option_name = substr( 'pue_json_error_' . $this->pluginFile, 0, 40 );
		delete_site_option( $option_name );
	}




	function maybe_cleanup_upgrade() {
		global $wp_filesystem;

		$chk_file = WP_CONTENT_DIR . '/upgrade/' . $this->slug . '/';

		if ( is_readable($chk_file ) ) {
			if ( !is_object( $wp_filesystem ) ) {
				require_once( ABSPATH . '/wp-admin/includes/file.php');
				WP_Filesystem();
			}
			$wp_filesystem->delete($chk_file, FALSE, 'd');
		}

	}



	function trigger_update_check() {
		//we're just using this to trigger a PUE ping whenever an option matching the given $this->option_key is saved..

		$has_triggered = FALSE;

		if ( defined( 'DOING_WP_CRON' ) && DOING_WP_CRON ) {
		    return $has_triggered;
        }

		if ( !empty($_POST) && !empty( $this->option_key ) ) {
			foreach ( $_POST as $key => $value ) {
				$triggered = $this->maybe_trigger_update($value, $key, $this->option_key);
				$has_triggered = $triggered && !$has_triggered ? TRUE : $has_triggered;
			}
		}

		return $has_triggered;

	}

	function maybe_trigger_update($value, $key, $site_key_search_string) {
		if ( $key == $site_key_search_string || (is_array($value) && isset($value[$site_key_search_string]) ) ) {

			//if $site_key_search_string exists but the actual key field is empty...let's reset the install key as well.
			if ( $value == '' || ( is_array($value) && empty($value[$site_key_search_string] ) ) || $value != $this->api_secret_key || ( is_array($value) && $value[$site_key_search_string] != $this->api_secret_key ) )
				delete_site_option($this->pue_install_key);

			$this->api_secret_key = $value;
			$this->set_api($this->api_secret_key);

			//reset force_upgrade flag (but only if there's a free slug key)
			if ( !empty( $this->_incoming_slug['free'] ) )
				delete_site_option( 'pue_force_upgrade_' . $this->_incoming_slug['free'][key($this->_incoming_slug['free'])]);

			//now let's reset some flags if necessary?  in other words IF the user has entered a premium key and the CURRENT version is a free version (NOT a prerelease version) then we need to make sure that we ping for the right version
			$free_key_match = '/FREE/i';

			//if this condition matches then that means we've got a free active key in place (or a free version from wp WITHOUT an active key) and the user has entered a NON free API key which means they intend to check for premium access.
			if ( !preg_match( $free_key_match, $this->api_secret_key ) && !empty($this->api_secret_key) && !$this->_is_premium && !$this->_is_prerelease && $this->_is_freerelease ) {
				$this->_use_wp_update = FALSE;
				$this->slug = $this->_incoming_slug['premium'][key($this->_incoming_slug['premium'])];
				$this->_is_premium = TRUE;
				$this->_force_premium_upgrade = TRUE;
				$this->pue_install_key = 'pue_install_key_'.$this->slug;
				$this->optionName = 'external_updates-' . $this->slug;
				if ( isset( $this->_incoming_slug['free'] ) )
					update_site_option( 'pue_force_upgrade_' . $this->_incoming_slug['free'][key($this->_incoming_slug['free'])], $this->slug );
			}

			$this->checkForUpdates();
			return true;
		}

		return false;
	}

	/**
	 * Retrieve plugin info from the configured API endpoint.
	 *
	 * @uses wp_remote_get()
	 *
	 * @param array $queryArgs Additional query arguments to append to the request. Optional.
	 * @return $pluginInfo
	 */
	function requestInfo($queryArgs = array()){
		//Query args to append to the URL. Plugins can add their own by using a filter callback (see addQueryArgFilter()).
		$queryArgs['pu_request_plugin'] = $this->slug;

		if ( !empty($this->api_secret_key) )
			$queryArgs['pu_plugin_api'] = $this->api_secret_key;

		if ( ! empty($this->install_key) && $this->_is_premium )
			$queryArgs['pue_install_key'] = $this->install_key;

		//todo: this can be removed in a later version of PUE when majority of EE users are using more recent versions.
		$queryArgs['new_pue_chk'] = 1;

		//include version info
		$queryArgs['pue_active_version'] = $this->_installed_version;

		//include domain info
		$queryArgs['site_domain'] = $this->current_domain;

		$queryArgs = apply_filters('puc_request_info_query_args-'.$this->slug, $queryArgs);

		//Various options for the wp_remote_get() call. Plugins can filter these, too.
		$options = array(
			'timeout' => 10, //seconds
			'headers' => array(
				'Accept' => 'application/json'
			),
		);
		$options = apply_filters('puc_request_info_options-'.$this->slug, $options);

		$url = $this->metadataUrl;

		if ( !empty($queryArgs) ){
			$url = add_query_arg($queryArgs, $url);
		}

		$result = wp_remote_get(
			$url,
			$options
		);

		$this->_send_extra_stats(); //we'll trigger an extra stats update here.

		//Try to parse the response
		$pluginInfo = null;

		//any special notices in the return package?
		if ( ! is_wp_error( $result ) && isset( $result['body'] ) ) {
			$response = json_decode( $result['body'] );
			if ( isset( $response->extra_notices ) ) {
				$this->add_persistent_notice( $response->extra_notices );
			}
		}


		if ( !is_wp_error($result) && isset($result['response']['code']) && ($result['response']['code'] == 200) && !empty($result['body']) ){

			$pluginInfo = PU_PluginInfo::fromJson($result['body']);
		}

		$pluginInfo = apply_filters('puc_request_info_result-'.$this->slug, $pluginInfo, $result);

		return $pluginInfo;
	}


	/**
	 * Utility method for adding a persistent notice to users admin.
	 *
	 * @param array $message Expect an array of ['error'], ['attention'], ['success'] notices to add to the persistent
	 *                       array.
	 * @param bool $overwrite Whether to force overwriting existing notices or just append to any existing notices
	 *                           (default).
	 */
	protected function add_persistent_notice( $message, $overwrite = false ) {
		//renewal notices are only saved ONCE per version update and we only do this for plugins that have "turned on"
		// notice saves (typically the main plugin).
		if ( ! $this->turn_on_notice_saves ) {
			return;
		}

		//get existing notices
		$notice_prefix = 'pue_special_notices_';
		$notice_ref = $notice_prefix . $this->_installed_version;

		$existing_notices = get_option( $notice_ref, array() );

		//if we don't have existing notices for the current plugin version then let's just make sure all older notices
		//are removed from the db.
		if ( empty( $existing_notices ) ) {
			global $wpdb;
			$wpdb->query( $wpdb->prepare( "DELETE FROM $wpdb->options WHERE option_name LIKE '%s'", '%' . $notice_prefix . '%' ) );
		}


		//k make sure there are no existing notices matching the incoming notices and only append new notices (unless overwrite is set to true).
		foreach ( (array) $message as $notice_type => $notices ) {
			if ( isset( $existing_notices[$notice_type] ) && ! $overwrite ) {
				foreach ( (array) $notices as $notice_id => $notice ) {
					if (  empty( $notice ) || ( isset( $existing_notices[$notice_type][$notice_id] ) &&  ! $existing_notices[$notice_type][$notice_id]['active'] ) ) {
						//first let's check the message (if not empty) and if it matches what's already present then we continue, otherwise we replace and make active.
						if ( ! empty( $notice ) && $existing_notices[$notice_type][$notice_id]['msg'] && $existing_notices[$notice_type][$notice_id]['msg'] != $notice ) {
							$existing_notices[$notice_type][$notice_id]['msg'] = $notice;
							$existing_notices[$notice_type][$notice_id]['active'] = 1;
						}
						continue;
					} else {
						$existing_notices[$notice_type][$notice_id]['msg'] = $notice;
						$existing_notices[$notice_type][$notice_id]['active'] = 1;
					}
				}
			} else {
				foreach ( (array) $notices as $notice_id => $notice ) {
					if ( ! empty( $notice ) ) {
						$existing_notices[$notice_type][$notice_id]['msg'] = $notice;
						$existing_notices[ $notice_type ][ $notice_id ]['active'] = 1;
					}
				}
			}
		}

		//update notices option
		update_option( $notice_ref, $existing_notices );
	}


	/**
	 * This basically dismisses all persistent notices of a given type (note this only dismisses the notice for the
	 * duration of the current plugins version
	 *
	 */
	public function dismiss_persistent_notice() {

		//if no $type in the request then exit
		$type = isset( $_REQUEST['type'] ) ? $_REQUEST['type'] : null;

		if ( empty( $type ) ) {
			return;
		}


		$notice_ref = 'pue_special_notices_' . $this->_installed_version;
		$existing_notices = get_option( $notice_ref, array() );

		if ( isset( $existing_notices[$type] ) ) {
			foreach ( $existing_notices[$type] as $notice_id => $details ) {
				$existing_notices[$type][$notice_id]['active'] = 0;
			}
		}

		update_option( $notice_ref, $existing_notices );
	}


	/**
	 * This method determines whether or not to display extra notices that might have come back from the request.
	 */
	public function maybe_display_extra_notices() {

		//nothing should happen if this plugin doesn't save extra notices
		if ( ! $this->turn_on_notice_saves || ! is_main_site() ) {
			return;
		}

		//okay let's get any extra notices
		$notices = get_option( 'pue_special_notices_' . $this->_installed_version, array() );

		//setup the message content for each notice;
		$errors = $attentions = $successes = '';
		foreach ( $notices as $type => $notes ) {
			switch( $type ) {
				case 'error' :
					foreach ( (array) $notes as $noteref ) {
						if ( ! $noteref['active'] || empty( $noteref['msg'] ) ) {
							continue;
						}
						$errors .= '<p>' . trim( stripslashes( $noteref['msg'] ) ) . '</p>';
					}
					break;
				case 'attention' :
					foreach ( (array) $notes as $noteref ) {
						if ( ! $noteref['active'] || empty( $noteref['msg'] ) ) {
							continue;
						}
						$attentions .= '<p>' . trim( stripslashes( $noteref['msg'] ) ) . '</p>';
					}
					break;
				case 'success' :
					foreach ( (array) $notes as $noteref ) {
						if ( ! $noteref['active'] || empty( $noteref['msg'] ) ) {
							continue;
						}
						$successes .= '<p>' . trim( stripslashes( $noteref['msg'] ) ) . '</p>';
					}
					break;
			}
		}

		//now let's setup the containers but only if we HAVE message to use :)
		if ( empty( $errors ) && empty( $attentions ) && empty( $successes ) ) {
			return '';
		}

		$content = '';
		if ( !empty( $errors ) ) {
			ob_start();
			?>
			<div class="error" id="pue_error_notices">
				<?php echo $this->_sanitize_notices( $errors ); ?>
				<a class="button-secondary" href="javascript:void(0);" onclick="PUEDismissNotice( 'error' );" style="float:right; margin-bottom: 10px;">
					<?php _e("Dismiss"); ?>
				</a>
				<div style="clear:both"></div>
			</div>
			<?php
			$content .= ob_get_contents();
			ob_end_clean();
		}

		if ( !empty( $attentions ) ) {
			ob_start();
			?>
			<div class="notice notice-info" id="pue_attention_notices">
				<?php echo $this->_sanitize_notices( $attentions ); ?>
				<a class="button-secondary" href="javascript:void(0);" onclick="PUEDismissNotice( 'attention' );" style="float:right; margin-bottom: 10px;">
					<?php _e("Dismiss"); ?>
				</a>
				<div style="clear:both"></div>
			</div>
			<?php
			$content .= ob_get_contents();
			ob_end_clean();
		}

		if ( !empty( $successes ) ) {
			ob_start();
			?>
			<div class="success" id="pue_success_notices">
				<?php echo $this->_sanitize_notices( $successes ); ?>
				<a class="button-secondary" href="javascript:void(0);" onclick="PUEDismissNotice( 'success' );" style="float:right; margin-bottom: 10px;">
					<?php _e("Dismiss"); ?>
				</a>
				<div style="clear:both"></div>
			</div>
			<?php
			$content .= ob_get_contents();
			ob_end_clean();
		}

		//add inline script for dismissing notice
		ob_start();
		?>
		<script type="text/javascript">
            function PUEDismissNotice( type ){
                jQuery("#pue_" + type + "_notices").slideUp();
                jQuery.post(ajaxurl, {action:"pue_dismiss_persistent_notice", type:type, cookie: encodeURIComponent(document.cookie)});
            }
        </script>
		<?php
		$content .= ob_get_contents();
		ob_end_clean();
		echo $content;
	}




	private function _send_extra_stats() {
		//first if we don't have a stats array then lets just get out.
		if ( empty( $this->extra_stats) ) return;


		//set up args sent in body
		$body = array(
			'extra_stats' => $this->extra_stats,
			'user_api_key' => $this->api_secret_key,
			'pue_stats_request' => 1,
			'domain' => $this->current_domain,
			'pue_plugin_slug' => $this->slug,
			'pue_plugin_version' => $this->getInstalledVersion()
			);

		//setup up post args
		$args = array(
			'timeout' => 10,
			'blocking' => TRUE,
			'user-agent' => 'PUE-stats-carrier',
			'body' => $body,
			'sslverify' => FALSE
			);

		wp_remote_post($this->metadataUrl, $args);

	}




	/**
	 * Retrieve the latest update (if any) from the configured API endpoint.
	 *
	 * @uses PluginUpdateEngineChecker::requestInfo()
	 *
	 * @return PluginUpdateUtility An instance of PluginUpdateUtility, or NULL when no updates are available.
	 */
	function requestUpdate(){
		//For the sake of simplicity, this function just calls requestInfo()
		//and transforms the result accordingly.
		$pluginInfo = $this->requestInfo(array('pu_checking_for_updates' => '1'));
		$this->delete_json_error_string();
		if ( $pluginInfo == null ){
			return null;
		}


		//admin display for if the update check reveals that there is a new version but the API key isn't valid.
		if ( isset($pluginInfo->api_invalid) )  { //we have json_error returned let's display a message
			$this->json_error = $pluginInfo;
			$this->set_json_error_string( $this->json_error );
			return $this->json_error;
		}


		if ( isset($pluginInfo->new_install_key) ) {
			$this->install_key_arr['key'] = $pluginInfo->new_install_key;
			update_site_option($this->pue_install_key, $this->install_key_arr);
		}

		//need to correct the download url so it contains the custom user data (i.e. api and any other paramaters)
		//oh let's generate the download_url otherwise it will be old news...

		if ( !empty($this->download_query) )  {
			$d_install_key = $this->install_key_arr['key'];
			$this->download_query['pue_install_key'] = $d_install_key;
			$this->download_query['new_pue_check'] = 1;
			$pluginInfo->download_url = add_query_arg($this->download_query, $pluginInfo->download_url);
		}

		return PluginUpdateUtility::fromPluginInfo($pluginInfo);
	}

	function in_plugin_update_message($plugin_data) {
		$plugininfo = $this->json_error;

		//only display messages if there is a new version of the plugin.
		if ( is_object($plugininfo) ) {
			if ( version_compare($plugininfo->version, $this->_installed_version, '>') ) {
				if ( $plugininfo->api_invalid ) {
					$msg = str_replace('%plugin_name%', $this->pluginName, $plugininfo->api_inline_invalid_message);
					$msg = str_replace('%version%', $plugininfo->version, $msg);
					$msg = str_replace('%changelog%', '<a class="thickbox" title="'.$this->pluginName.'" href="plugin-install.php?tab=plugin-information&plugin='.$this->slug.'&TB_iframe=true&width=640&height=808">What\'s New</a>', $msg);
					echo '</tr><tr class="plugin-update-tr"><td colspan="3" class="plugin-update"><div class="update-message">' . $this->_sanitize_notices( $msg ) . '</div></td>';
				}
			}
		}
	}

	function display_changelog() {
	//todo (at some point in the future!) contents of changelog display page when api-key is invalid or missing.  It will ONLY show the changelog (hook into existing thickbox?)

	}

	function display_json_error($echo = TRUE, $ignore_version_check = FALSE, $alt_content = '') {
		$pluginInfo = $this->json_error;
		$update_dismissed = get_site_option($this->dismiss_upgrade);
		$ver_option_key = 'puvererr_' . basename( $this->pluginFile );
		$msg = '';

		$is_dismissed = !empty($update_dismissed) && in_array($pluginInfo->version, $update_dismissed) ? true : false;

		//add in pue_verification_error option for when the api_key is blank
		if ( empty( $this->api_secret_key ) ) {
			update_site_option( $ver_option_key, __('No API key is present', $this->lang_domain) );
		}

		if ( $pluginInfo->api_invalid ) {
			$msg = str_replace('%plugin_name%', $this->pluginName, $pluginInfo->api_invalid_message);
			$msg = str_replace('%version%', $pluginInfo->version, $msg);
		}

		//let's add an option for plugin developers to display some sort of verification message on their options page.
		update_site_option( $ver_option_key, $msg );

		if ($is_dismissed)
			return;

		//only display messages if there is a new version of the plugin.
		if ( version_compare($pluginInfo->version, $this->_installed_version, '>') || $ignore_version_check ) {

			//Dismiss code idea below is obtained from the Gravity Forms Plugin by rocketgenius.com
			ob_start();
			?>
				<div class="updated" style="padding:15px; position:relative;" id="pu_dashboard_message"><?php echo $this->_sanitize_notices( $msg ); ?>
				<a class="button-secondary" href="javascript:void(0);" onclick="PUDismissUpgrade();" style='float:right;'><?php _e("Dismiss") ?></a>
				<div style="clear:both;"></div>
            </div>
            <script type="text/javascript">
                function PUDismissUpgrade(){
                    jQuery("#pu_dashboard_message").slideUp();
                    jQuery.post(ajaxurl, {action:"<?php echo $this->dismiss_upgrade; ?>", version:"<?php echo $pluginInfo->version; ?>", cookie: encodeURIComponent(document.cookie)});
                }
            </script>
			<?php
			$content = ob_get_contents();
			ob_end_clean();
			if ( $echo !== FALSE )
				echo $content;
			else
				return $content;
		}
	}


	/**
	 * This just receives a content string and uses wp_kses to sanitize the incoming string so it only allows a small
	 * subset of tags.
	 *
	 * @param string $content Content to sanitize
	 * @return string
	 */
	protected function _sanitize_notices( $content ) {
		$allowed_tags = array(
			'a' => array(
				'href' => array(),
				'title' => array()
			),
			'br' => array(),
			'em' => array(),
			'strong' => array(),
			'abbr' => array(),
			'acronym' => array(),
			'b' => array(),
			'blockquote' => array(),
			'cite' => array(),
			'code' => array(),
			'strike' => array(),
			'ol' => array(),
			'ul' => array(),
			'li' => array(),
			'p' => array()
		);

		return wp_kses( $content, $allowed_tags );
	}



	/**
	 * This admin_notice shows a message immediately to users who have successfully entered a valid api_key and allows them to click a button to get the premium version.
	 * Note: we'll alternatively display any json errors that may be present from the returned package.
	 *
	 * @access  public
	 * @return string html
	 */
	public function show_premium_upgrade() {
		global $current_screen;
		$ver_option_key = 'puvererr_' . basename( $this->pluginFile );
		if ( empty( $current_screen ) )
			set_current_screen();

		//check if we're on the wp update page.  If so get out
		if ( $current_screen->id == 'update' )
			return;

		$update_dismissed = get_site_option($this->dismiss_upgrade);
		$is_dismissed = !empty($update_dismissed) && !empty( $this->json_error ) && in_array( $this->json_error->version, $update_dismissed ) ? true : false;

		//first any json errors?
		if ( !empty( $this->json_error ) && isset($this->json_error->api_invalid) ) {
				if ( $is_dismissed )
					return;
				$msg = str_replace('%plugin_name%', $this->pluginName, $this->json_error->api_invalid_message);
				$msg = str_replace('%version%', $this->json_error->version, $msg);
				$msg = sprintf( __('It appears you\'ve tried entering an api key to upgrade to the premium version of %s, however, the key does not appear to be valid.  This is the message received back from the server:', $this->lang_domain ), $this->pluginName ) . '</p><p>' . $msg;
				//let's add an option for plugin developers to display some sort of verification message on their options page.
				update_site_option( $ver_option_key, $msg );

		} else {
			$msg = sprintf( __('Congratulations!  You have entered in a valid api key for the premium version of %s.  You can click the button below to upgrade to this version immediately.', $this->lang_domain), $this->pluginName );
			delete_site_option( $ver_option_key );
		}

		//todo add in upgrade button in here.
		$button_link = wp_nonce_url( self_admin_url('update.php?action=upgrade-plugin&plugin=') . $this->pluginFile, 'upgrade-plugin_' . $this->pluginFile );
		$button = '<a href="' . $button_link . '" class="button-secondary pue-upgrade-now-button" value="no">' . __('Upgrade Now', $this->lang_domain) . '</a>';

		$content = '<div class="updated" style="padding:15px; position:relative;" id="pue_update_now_container"><p>' . $msg . '</p>';
		$content .= empty($this->json_error) ? $button : '';
		$content .= '<a class="button-secondary" href="javascript:void(0);" onclick="PUDismissUpgrade();" style="float:right;">' . __("Dismiss") . '</a>';
		$content .= '<div style="clear:both;"></div></div>';
		$content .= '<script type="text/javascript">
			function PUDismissUpgrade(){
				jQuery("#pue_update_now_container").slideUp();
				jQuery.post( ajaxurl, {action:"' . $this->dismiss_upgrade .'", version:"' . $this->json_error->version . '", cookie: encodeURIComponent(document.cookie)});
			}
			</script>';

		echo $content;
	}




	function dashboard_dismiss_upgrade() {
		$os_ary = get_site_option($this->dismiss_upgrade);
		if (!is_array($os_ary))
			$os_ary = array();

		$os_ary[] = $_POST['version'];
		update_site_option($this->dismiss_upgrade, $os_ary);
	}

	/**
	 * Get the currently installed version of the plugin.
	 *
	 * @return string Version number.
	 */
	function getInstalledVersion(){
		if ( function_exists('get_plugin_data') ) {
			$plugin_data = get_plugin_data( WP_PLUGIN_DIR . DIRECTORY_SEPARATOR . $this->pluginFile);
		} else {
			require_once(ABSPATH.'wp-admin/includes/plugin.php');
			$plugin_data = get_plugin_data( WP_PLUGIN_DIR . DIRECTORY_SEPARATOR . $this->pluginFile);
		}
		if ( !empty($plugin_data) ) {
			$this->pluginName = $plugin_data['Name'];
			$this->lang_domain = empty( $this->lang_domain ) && !empty($plugin_data['TextDomain']) ? $plugin_data['TextDomain'] : $this->lang_domain;
			return $plugin_data['Version'];
		}
		return FALSE; //this should never happen
	}

	/**
	 * Check for plugin updates.
	 * The results are stored in the DB option specified in $optionName.
	 *
	 * @return void
	 */
	function checkForUpdates(){
		$state = get_site_option($this->optionName);

		if ( empty($state) ){
			$state = new StdClass;
			$state->lastCheck = 0;
			$state->checkedVersion = '';
			$state->update = null;
		}

		$state->lastCheck = time();
		$state->checkedVersion = $this->_installed_version;
		update_site_option($this->optionName, $state); //Save before checking in case something goes wrong

		$state->update = $this->requestUpdate();
		update_site_option($this->optionName, $state);
	}

	/**
	 * Check for updates only if the configured check interval has already elapsed.
	 *
	 * @return void
	 */
	function maybeCheckForUpdates(){
		if ( !is_admin() ) return;

		if ( empty($this->checkPeriod) ){
			return;
		}

		$state = get_site_option($this->optionName);

		$shouldCheck =
			empty($state) ||
			!isset($state->lastCheck) ||
			( (time() - $state->lastCheck) >= $this->checkPeriod*3600 );
		//$shouldCheck = true;

		if ( $shouldCheck ){
			$this->checkForUpdates();
		}
	}

	/**
	 * Intercept plugins_api() calls that request information about our plugin and
	 * use the configured API endpoint to satisfy them.
	 *
	 * @see plugins_api()
	 *
	 * @param mixed $result
	 * @param string $action
	 * @param array|object $args
	 * @return mixed
	 */
	function injectInfo($result, $action = null, $args = null){
		$updates = FALSE;
		$relevant = ($action == 'plugin_information') && isset($args->slug) && ($args->slug == $this->slug);
		if ( !$relevant ){
			return $result;
		}
		$state = get_site_option($this->optionName);
		if( !empty($state) && isset($state->update) ) {
			$state->update->name = $this->pluginName;
			$result = PU_PluginInfo::fromJson($state->update,true);;
			$updates = $result->toWpFormat();
		}

		if ( $updates )
			return $updates;
		else
			return $result;
	}

	/**
	 * Insert the latest update (if any) into the update list maintained by WP.
	 * We do two things in here:
	 * 1. insert OUR update if there is an update available (and replace any existing WP one)
	 * 2. remove the existing WP one if it exists even if we dont' have an update. This covers the cases where there may be a ping from WP before EE and we've got a premium plugin installed that MATCHES one in the WP db.
	 *
	 * @param array $updates Update list created by WordPress.
	 * @return array Modified update list.
	 */
	function injectUpdate( $updates ){

		$state = get_site_option($this->optionName);

		//first remove any existing WP update message that might have snuck in before we have any return from our plugin server.
		if ( isset( $updates->response[$this->pluginFile] ) )
			unset( $updates->response[$this->pluginFile] );

		//Is there an update to insert?
		if ( !empty($state) && isset($state->update) && !empty($state->update) ){
			//Only insert updates that are actually newer than the currently installed version.
			if ( version_compare($state->update->version, $this->_installed_version, '>') ){
				$updated = $state->update->toWPFormat();
				$updated->plugin = $this->pluginFile;
				$updates->response[$this->pluginFile] = $updated;
			}
		}

		add_action('after_plugin_row_'.$this->pluginFile, array($this, 'in_plugin_update_message'));

		if ( $this->json_error )
			remove_action('after_plugin_row_'.$this->pluginFile, 'wp_plugin_update_row', 10, 2);

		return $updates;
	}


	/**
	 * Register a callback for filtering query arguments.
	 *
	 * The callback function should take one argument - an associative array of query arguments.
	 * It should return a modified array of query arguments.
	 *
	 * @uses add_filter() This method is a convenience wrapper for add_filter().
	 *
	 * @param callback $callback
	 * @return void
	 */
	function addQueryArgFilter($callback){
		add_filter('puc_request_info_query_args-'.$this->slug, $callback);
	}

	/**
	 * Register a callback for filtering arguments passed to wp_remote_get().
	 *
	 * The callback function should take one argument - an associative array of arguments -
	 * and return a modified array or arguments. See the WP documentation on wp_remote_get()
	 * for details on what arguments are available and how they work.
	 *
	 * @uses add_filter() This method is a convenience wrapper for add_filter().
	 *
	 * @param callback $callback
	 * @return void
	 */
	function addHttpRequestArgFilter($callback){
		add_filter('puc_request_info_options-'.$this->slug, $callback);
	}

	/**
	 * Register a callback for filtering the plugin info retrieved from the external API.
	 *
	 * The callback function should take two arguments. If the plugin info was retrieved
	 * successfully, the first argument passed will be an instance of  PU_PluginInfo. Otherwise,
	 * it will be NULL. The second argument will be the corresponding return value of
	 * wp_remote_get (see WP docs for details).
	 *
	 * The callback function should return a new or modified instance of PU_PluginInfo or NULL.
	 *
	 * @uses add_filter() This method is a convenience wrapper for add_filter().
	 *
	 * @param callback $callback
	 * @return void
	 */
	function addResultFilter($callback){
		add_filter('puc_request_info_result-'.$this->slug, $callback, 10, 2);
	}
}

endif;

if ( !class_exists('PU_PluginInfo') ):

/**
 * A container class for holding and transforming various plugin metadata.
 * @version 1.1
 * @access public
 */
class PU_PluginInfo {
	//Most fields map directly to the contents of the plugin's info.json file.

	public $name;
	public $slug;
	public $version;
	public $homepage;
	public $sections;
	public $download_url;

	public $author;
	public $author_homepage;

	public $requires;
	public $tested;
	public $upgrade_notice;

	public $rating;
	public $num_ratings;
	public $downloaded;
	public $last_updated;
	public $render_pass;

	public $id = 0; //The native WP.org API returns numeric plugin IDs, but they're not used for anything.

	/**
	 * Create a new instance of PU_PluginInfo from JSON-encoded plugin info
	 * returned by an external update API.
	 *
	 * @param string $json Valid JSON string representing plugin info.
	 * @return PU_PluginInfo New instance of PU_PluginInfo, or NULL on error.
	 */
	public static function fromJson($json, $object = false){
		$apiResponse = (!$object) ? json_decode($json) : $json;
		if ( empty($apiResponse) || !is_object($apiResponse) ){
			return null;
		}

		//Very, very basic validation.
		$valid = (isset($apiResponse->name) && !empty($apiResponse->name) && isset($apiResponse->version) && !empty($apiResponse->version)) || (isset($apiResponse->api_invalid) || isset($apiResponse->no_api));
		if ( !$valid ){
			return null;
		}

		$info = new PU_PluginInfo();

		foreach(get_object_vars($apiResponse) as $key => $value){
			$key = str_replace('plugin_', '', $key); //let's strip out the "plugin_" prefix we've added in plugin-updater-classes.
			$info->{$key} = $value;
		}

		return $info;
	}

	/**
	 * Transform plugin info into the format used by the native WordPress.org API
	 *
	 * @return object
	 */
	public function toWpFormat(){
		$info = new StdClass;

		//The custom update API is built so that many fields have the same name and format
		//as those returned by the native WordPress.org API. These can be assigned directly.

		$sameFormat = array(
			'name', 'slug', 'version', 'requires', 'tested', 'rating', 'upgrade_notice',
			'num_ratings', 'downloaded', 'homepage', 'last_updated',
		);
		foreach($sameFormat as $field){
			if ( isset($this->{$field}) ) {
				$info->{$field} = $this->{$field};
			}
		}

		//Other fields need to be renamed and/or transformed.
		$info->download_link = $this->download_url;

		if ( !empty($this->author_homepage) ){
			$info->author = sprintf('<a href="%s">%s</a>', $this->author_homepage, $this->author);
		} else {
			$info->author = $this->author;
		}

		if ( is_object($this->sections) ){
			$info->sections = get_object_vars($this->sections);
		} elseif ( is_array($this->sections) ) {

			$info->sections = $this->sections;

		} else {
			$info->sections = array('description' => '');
		}

		$this->slug = ! empty( $this->slug ) ? $this->slug : '';

		return $info;
	}
}

endif;

if ( !class_exists('PluginUpdateUtility') ):

/**
 * A simple container class for holding information about an available update.
 *
 * @version 1.1
 * @access public
 */
class PluginUpdateUtility {
	public $id = 0;
	public $slug;
	public $version;
	public $homepage;
	public $download_url;
	public $sections = array();
	public $upgrade_notice;

	/**
	 * Create a new instance of PluginUpdateUtility from its JSON-encoded representation.
	 *
	 * @param string $json
	 * @return PluginUpdateUtility
	 */
	public static function fromJson($json){
		//Since update-related information is simply a subset of the full plugin info,
		//we can parse the update JSON as if it was a plugin info string, then copy over
		//the parts that we care about.
		$pluginInfo = PU_PluginInfo::fromJson($json);
		if ( $pluginInfo != null ) {
			return PluginUpdateUtility::fromPluginInfo($pluginInfo);
		} else {
			return null;
		}
	}

	/**
	 * Create a new instance of PluginUpdateUtility based on an instance of PU_PluginInfo.
	 * Basically, this just copies a subset of fields from one object to another.
	 *
	 * @param PU_PluginInfo $info
	 * @return PluginUpdateUtility
	 */
	public static function fromPluginInfo($info){
		$update = new PluginUpdateUtility();
		$copyFields = array('id', 'slug', 'version', 'homepage', 'download_url', 'upgrade_notice', 'sections');
		foreach($copyFields as $field){
			$update->{$field} = $info->{$field};
		}
		return $update;
	}

	/**
	 * Transform the update into the format used by WordPress native plugin API.
	 *
	 * @return object
	 */
	public function toWpFormat(){
		$update = new StdClass;

		$update->id = $this->id;
		$update->slug = $this->slug;
		$update->new_version = $this->version;
		$update->url = $this->homepage;
		$update->package = $this->download_url;
		if ( !empty($this->upgrade_notice) ){
			$update->upgrade_notice = $this->upgrade_notice;
		}

		return $update;
	}
}

endif;
