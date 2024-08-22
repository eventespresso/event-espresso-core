<?php
/**
 * This file should be bundled with the main plugin.  Any addons to your main plugin can include this file from the
 * main plugin folder.  This contains the library for handling all the automatic upgrade stuff on the clients end. You
 * also have to make sure you call this class in any addons/plugins you want to be added to the update checker.  Here's
 * what you do: if ( file_exists(WP_PLUGIN_DIR . '/location_of_file/pue-client.php') ) { //include the file require(
 * WP_PLUGIN_DIR . '/location_of_file/pue-client.php' );
 *    $host_server_url = 'http://updateserver.com'; //this needs to be the host server where plugin update engine is
 *    installed.  note: if you leave this blank then it is assumed wordpress.org is going to be checked and we will
 *    just gracefully exit this class.
 *    $plugin_slug = 'plugin-slug'; //this needs to be the slug of the plugin/addon that you want updated (and that
 *    pue-client.php is included with).  This slug should match what you've set as the value for plugin-slug when
 *    adding the plugin to the plugin list via plugin-update-engine on your server.  Note: IF this is a string then it
 *    is assumed the plugin slug will be for a premium version (requiring a license key).  If it is an array, then PUE
 *    will look for the "free" and "premium" indexes and then depending on whether there is a valid key or not what
 *    version we download for upgrade.
 *    //$options needs to be an array with the included keys as listed.
 *    $options = array(
 *        'optionName' => '', //(optional) - used as the reference for saving update information in the clients options
 *        table.  Will be automatically set if left blank.
 *        'apikey' => $api_key, //(required), you will need to obtain the apikey that the client gets from your site
 *        and then saves in their sites options table (see 'getting an api-key' below)
 *        'lang_domain' => '', //(optional) - put here whatever reference you are using for the localization of your
 *        plugin (if it's localized).  That way strings in this file will be included in the translation for your
 *        plugin.
 *        'checkPeriod' => '', //(optional) - use this parameter to indicate how often you want the client's install to
 *        ping your server for update checks.  The integer indicates hours.  If you don't include this parameter it
 *        will default to 12 hours.
 *        'version_params' => array( 'free' => 'something', 'premium' => 'something' ) //(required if $slug is an
 *        array).  IF $plugin_slug is an array then you must set in this option what the params are for each version as
 *        that allows PUE to know whether the installed version is your free plugin or the premium upgrade.
 *    );
 *    $check_for_updates = new PluginUpdateEngineChecker($host_server_url, $plugin_slug, $options); //initiate the
 *    class and start the plugin update engine!
 * }
 */

use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\core\services\request\sanitizers\AllowedTags;
use EventEspresso\PaymentMethods\Manager;
use EventEspresso\core\domain\services\capabilities\FeatureFlag;

if (! class_exists('PluginUpdateEngineChecker')):
    /**
     * A custom plugin update checker.
     *
     * @original author (c) Janis Elsts
     * @heavily  modified by Darren Ethier
     * @license  GPL2 or greater.
     * @version  1.1
     * @access   public
     */
    class PluginUpdateEngineChecker
    {

        /**
         * The URL of the plugin's metadata file.
         *
         * @var string
         */
        public string $metadataUrl = '';

        /**
         * plugin_basename (used internally by WP updates).
         *
         * @var string
         */
        public string $pluginFile = '';

        /**
         * variable used to hold the pluginName as set by the constructor.
         *
         * @var string
         */
        public string $pluginName = '';


        /**
         * How often to check for updates (in hours).
         *
         * @var int
         */
        public int $checkPeriod = 12;


        /**
         * Where to store the update info.
         *
         * @var string
         */
        public string $optionName = '';


        /**
         * this is what is used to reference the api_key in your plugin options.  PUE uses this to trigger updating
         * your information message whenever this option_key is modified.
         *
         * @var string
         */
        public string $option_key = '';


        /**
         * this is the slug of the options page for your plugin where the site-licence(api) key is set by your user.
         * This is required in order to do an update check immediately when the options page is set so api messages
         * update immediately.
         *
         * @var string
         */
        public string $options_page_slug = '';


        /**
         * for storing any json_error data that get's returned so we can display an admin notice.
         *
         * @var string|PU_PluginInfo
         */
        public $json_error;


        /**
         * used to hold the user API.  If not set then nothing will work!
         *
         * @var string
         */
        public string $api_secret_key = '';


        /**
         * used to hold the install_key if set (included here for addons that will extend PUE to use install key checks)
         *
         * @var string
         */
        public string $install_key = '';

        /**
         * holds the installation key array from the database.
         *
         * @var array
         */
        public array $install_key_arr = [];


        /**
         * used to hold the query variables for download checks;
         *
         * @var array
         */
        public array $download_query = [];


        /**
         * used to hold the localization domain for translations .
         *
         * @var string
         */
        public string $lang_domain = '';


        /**
         * for setting the dismiss upgrade option (per plugin).
         *
         * @var string
         */
        public string $dismiss_upgrade;

        /**
         * we'll customize this later so each plugin can have it's own install key!
         *
         * @var string
         */
        public string $pue_install_key;

        /**
         * will hold the slug that is being used to check for updates.
         *
         * @var string|null
         */
        public ?string $slug = '';


        /**
         * holds what the current domain is that is pinging for updates
         *
         * @var string
         */
        public string $current_domain;


        /**
         * The closure should return an array of key/value pairs that will get sent along with the stats package.
         *
         * @var Closure|null
         */
        public ?Closure $extra_stats = null;


        /**
         * used to flag that renewal notices/critical notices are attached to version updates of this plugin.
         *
         * @var bool
         */
        public bool $turn_on_notice_saves = false;


        /**
         * this will just hold what installed version we have of the plugin right now.
         *
         * @var string
         */
        private string $_installed_version = '';


        /**
         * this is a flag used for setting whether the premium version is installed or not.
         *
         * @var bool
         */
        private bool $_is_premium = false;

        /**
         * optional, this flag is used to indicate whether this is a pre-release version or not.
         *
         * @var bool
         */
        private bool $_is_prerelease = false;

        /**
         * this is used to indicate whether this is a free release or not.
         *
         * @var bool
         */
        private bool $_is_freerelease = false;

        /**
         * @var string
         */
        private string $_plugin_basename = '';

        /**
         * flag for indicating if free downloads are updated from wp or not.
         *
         * @var bool
         */
        private bool $_use_wp_update = false;

        /**
         * @var array
         */
        private $_incoming_slug = [];

        /**
         * flag for indicating if we want to give the user the option to upgrade to premium from a free version
         * immediately.
         *
         * @var bool
         */
        private bool $_force_premium_upgrade = false;


        /**
         * This is just a container for any pue errors that get generated (and possibly used to display via an admin
         * notice)
         *
         * @var array
         */
        private array $_pue_errors = [];


        /**
         * @var string
         */
        private string $_error_msg = '';


        /**
         * PluginUpdateEngineChecker constructor.
         *
         * @param string $metadataUrl The URL of the plugin's metadata file.
         * @param string $slug        The plugin's 'slug'.
         * @param array  $options     Will contain any options that need to be set in the class initialization for
         *                            construct.  These are the keys:
         * @key integer $checkPeriod How often to check for updates (in hours). Defaults to checking every 12
         *                            hours. Set to 0 to disable automatic update checks.
         * @key string $optionName Where to store book-keeping info about update checks. Defaults to
         *                            'external_updates-$slug'.
         * @key string $apikey used to authorize download updates from developer server
         * @key string $lang_domain If the plugin file pue-client.php is included with is localized you can put the
         *                            domain reference string here so any strings in this file get included in the
         *                            localization.
         * @return void|bool
         */
        public function __construct($metadataUrl = '', $slug = [], $options = [])
        {
            $this->metadataUrl = $metadataUrl;
            if (empty($this->metadataUrl)) {
                return;
            }

            $this->_incoming_slug = $slug;

            $options_verified = $this->_verify_options($options);

            if (! $options_verified) {
                //get out because we don't have verified options (and the admin_notice should display);
                return;
            }

            $verify_slug = $this->_set_slug_and_slug_props($slug, $options_verified);

            if (! $verify_slug) {
                //get out because the slug isn't valid.  An admin notice should show.
                return;
            }

            $this->current_domain       = str_replace(['http://', 'https://'], '', site_url());
            $this->current_domain       = urlencode($this->current_domain);
            $this->optionName           = 'external_updates-' . $this->slug;
            $this->checkPeriod          = (int) $options_verified['checkPeriod'];
            $this->api_secret_key       = trim($options_verified['apikey']);
            $this->option_key           = $options_verified['option_key'];
            $this->options_page_slug    = $options_verified['options_page_slug'];
            $this->_use_wp_update       = $this->_is_premium || $this->_is_prerelease
                ? false
                : $options_verified['use_wp_update'];
            $this->extra_stats          = $options_verified['extra_stats'];
            $this->turn_on_notice_saves = isset($options_verified['turn_on_notices_saved'])
                ? $options_verified['turn_on_notices_saved']
                : false;

            //set hooks
            $this->installHooks();
        }


        /**
         * This checks to see if there is a forced upgrade option saved from a previous saved options page trigger.
         * If there is then we change the slug accordingly and setup for premium update.
         * This function will also take care of deleting any previous force_update options IF our current installed
         * plugin IS premium.
         *
         * @return void
         * @throws EE_Error
         * @deprecated 4.10.37.p
         * @access     private
         */
        private function _check_for_forced_upgrade()
        {
            EE_Error::doing_it_wrong(
                __METHOD__,
                esc_html__(
                    'This method is no longer in use. There is no replacement for it. The method was used to check and setup for a premium upgrade via 1-click which is no longer available from within WP admin.',
                    'event_espresso'
                ),
                '4.10.37.p'
            );

            /**
             * We ONLY execute this check if the incoming plugin being checked has a free option.
             * If there is no free option, then no forced upgrade will be happening.
             */
            if (! isset($this->_incoming_slug['free'])) {
                return;
            }

            //is this premium?  let's delete any saved options for free
            if ($this->_is_premium) {
                delete_site_option(
                    'pue_force_upgrade_' . $this->_incoming_slug['free'][ key($this->_incoming_slug['free']) ]
                );
            } else {
                $force_upgrade = get_site_option('pue_force_upgrade_' . $this->slug, '');
                $this->_force_premium_upgrade = ! empty($force_upgrade);
                $this->_is_premium = ! empty($force_upgrade);
                $this->slug = ! empty($force_upgrade) ? $force_upgrade : $this->slug;
                $this->pue_install_key = 'pue_install_key_' . $this->slug;
                $this->optionName = 'external_updates-' . $this->slug;
                $this->_use_wp_update = ! empty($force_upgrade) ? false : $this->_use_wp_update;
            }
        }


        /**
         * This simply goes through the sent options array and make sure it has all the REQUIRED info.  If it doesn't
         * then we'll set an admin notice with an error message for the user.
         *
         * @access  private
         * @return  false|array
         */
        private function _verify_options($options)
        {
            $this->lang_domain = isset($options['lang_domain']) ? $options['lang_domain'] : '';
            $required          = [
                'options_page_slug',
                'plugin_basename',
            ];
            $defaults          = [
                'apikey'          => null,
                'checkPeriod'     => 12,
                'option_key'      => 'pue_site_license_key',
                'use_wp_download' => false,
                //expected to be a closure that returns an array of key/value pairs for sending as a part of the stats
                //package
                'extra_stats'     => null,
            ];

            //let's first make sure requireds are present
            foreach ($required as $key) {
                if (! isset($options[ $key ])) {
                    $this->_pue_errors[] = $key;
                }
            }

            if (empty($this->_pue_errors)) {
                $options = array_merge($defaults, $options);
                return $options;
            }
            $this->_display_errors('options');
            return false;
        }


        /**
         * All this does is verify that if $slug is an array that we have a key in the $options field for
         * 'version_params' that help us determine whether the plugin installed is the premium or freemium version.
         * Then we set the _installed_version property and the _is_premium property
         *
         * @param mixed(array|string) $slug    if array then we have premium and free options for this plugin
         * @return bool (false for fail, true for success)
         */
        private function _verify_and_set_installed_version($slug)
        {
            if (is_array($slug)) {
                //We require at LEAST 'premium' index to be present if this is an array
                if (! isset($slug['premium'])) {
                    $this->_display_errors('slug_array_invalid');
                    return false;
                }
            } else {
                $this->_display_errors('slug_not_array');
                return false;
            }

            $this->_installed_version = $this->getInstalledVersion();

            if (! $this->_installed_version) {
                $this->_display_errors('no_version_present');
                return false;
            }
            return true;
        }


        /**
         * Handles generating the display of errors for a given type
         *
         * @param string $type
         */
        private function _display_errors($type)
        {
            $msg = '';
            if (defined('WP_DEBUG') && WP_DEBUG) {
                switch ($type) {
                    case 'options':
                        $msg .= sprintf(
                                    esc_html__(
                                        'Plugin Update Engine is unable to setup correctly for the plugin with the slug "%s" because there are the following keys missing from the options array sent to the PluginUpdateEngineChecker class when it is instantiated:',
                                        $this->lang_domain
                                    ),
                                    print_r($this->_incoming_slug, true)
                                ) . '</p><p>';
                        $msg .= '<ul>';
                        foreach ($this->_pue_errors as $error) {
                            $msg .= '<li>' . $error . '</li>';
                        }
                        $msg .= '</ul>';
                        break;

                    case 'slug_array_invalid':
                        $msg .= esc_html__(
                            'An array was sent to the PluginUpdateEngineChecker class as the value for the $plugin_slug property, however the array is missing the "premium" index.',
                            $this->lang_domain
                        );
                        break;

                    case 'slug_string_invalid':
                        $msg .= esc_html__(
                            'A string was sent to the PluginUpdateEngineChecker class as the value for the $plugin_slug property, however the string is empty',
                            $this->lang_domain
                        );
                        break;

                    case 'no_version_present':
                        $msg .= esc_html__(
                            'For some reason PUE is unable to determine the current version of the plugin. It is possible that the incorrect value was sent for the "plugin_basename" key in the <strong>$options</strong> array.',
                            $this->lang_domain
                        );
                        break;

                    case 'slug_not_array' :
                        //Old method for plugin name is just to use the slug and manipulate
                        $pluginname = ucwords(str_replace('-', ' ', $this->_incoming_slug));
                        $msg        .= sprintf(
                            esc_html__(
                                'The following plugin needs to be updated in order to work with this version of our plugin update script: <strong>%s</strong></p><p>You will have to update this manually.  Contact support for further instructions',
                                $this->lang_domain
                            ),
                            $pluginname
                        );
                        break;
                }
            } else {
                $slug = $this->slug;
                if (empty($this->slug)) {
                    $msg .= sprintf(
                                esc_html__(
                                    'Automatic updates cannot be setup for an EE addon because of an error in the file.  Please contact support, and include a list of EE addons recently installed/updated.',
                                    $this->lang_domain
                                )
                            ) . '</p><p>';
                } else {
                    $msg .= sprintf(
                                esc_html__(
                                    'Unable to setup automatic updates for the plugin with the slug "%s" because of an error with the code. Please contact EE support and give them this error message.',
                                    $this->lang_domain
                                ),
                                $slug
                            ) . '</p><p>';
                }
            }

            $this->_error_msg = apply_filters(
                'PUE__display_errors',
                '<p>' . $msg . '</p>',
                $type,
                $this->_pue_errors,
                $this->_incoming_slug
            );
            add_action('admin_notices', [$this, 'show_pue_client_errors'], 10);
        }


        /**
         * display any pue_client errors
         */
        public function show_pue_client_errors()
        {
            ?>
            <div class="error" style="padding:15px; position:relative;" id="pue_option_error">
                <?php
                echo wp_kses($this->_error_msg, AllowedTags::getAllowedTags()); ?>
            </div>
            <?php
        }


        /**
         * Takes care of setting the slug property and the related other properties dependent on the incoming slug var.
         * If $slug is an array then we are expecting the array in the following format:
         * array(
         *    //what is sent in the update package to check on the PUE server for the free product
         *    'free' => 'slug_for_free'
         *    //what is send in the update package to check on the PUE server for the premium product
         *    'premium' => 'slug_for_premium'
         * )
         *
         * @param array|string $slug
         * @param array $options
         * @return bool
         */
        private function _set_slug_and_slug_props($slug, $options)
        {
            $this->pluginFile  = $options['plugin_basename'];
            $this->lang_domain = isset($options['lang_domain']) && ! empty($options['lang_domain'])
                ? $options['lang_domain']
                : '';

            //we need to set installed version and set flags for version
            $verify_version = $this->_verify_and_set_installed_version($slug);

            if (! $verify_version) {
                return false;
            }

            //set other properties related to version
            //is_premium?
            $premium_search_ref = is_array($slug) ? key($slug['premium']) : '';

            //case insensitive search in version
            $this->_is_premium = ! empty($premium_search_ref)
                                 && stripos($this->_installed_version, $premium_search_ref) !== false;

            //wait... if slug is_string() then we'll assume this is a premium install by default
            $this->_is_premium = ! $this->_is_premium && ! is_array($slug) ? true : $this->_is_premium;

            //set pre-release flag
            $pr_search_ref = is_array($slug) && isset($slug['prerelease']) ? key($slug['prerelease']) : '';
            $this->_is_prerelease = ! empty($pr_search_ref)
                                    && stripos($this->_installed_version, $pr_search_ref) !== false;

            //free_release?
            $fr_search_ref         = is_array($slug) && isset($slug['free']) ? key($slug['free']) : '';
            $this->_is_freerelease = ! empty($fr_search_ref)
                                     && stripos($this->_installed_version, $fr_search_ref) !== false;

            //we handle differently depending on whether the slug is an array or not.
            if (is_array($slug)) {
                //let's go through the conditions on what we use for the slug
                $set_slug = $this->_is_premium ? $slug['premium'][key($slug['premium'])] : '';
                $set_slug = empty($set_slug) && $this->_is_prerelease
                    ? $slug['prerelease'][ key($slug['prerelease']) ]
                    : $set_slug;
                $set_slug = empty($set_slug) && isset($slug['free'])
                    ? $slug['free'][ key($slug['free']) ]
                    : $set_slug;
            } else {
                //first verify that $slug is not empty!
                if (empty($slug)) {
                    $this->_display_errors('slug_string_invalid');
                    return false;
                }
                $set_slug = $slug;
            }

            $this->slug = (string) $set_slug;  //now we've got the slug for the package to get set.

            //now let's setup other properties based on the slug OR the 'plugin_basename' option.

            $this->dismiss_upgrade = 'pu_dismissed_upgrade_' . $this->slug;
            $this->pue_install_key = 'pue_install_key_' . $this->slug;
            return true;
        }


        /**
         * gets the api from the options table if present
         *
         * @param string $new_api
         */
        private function set_api($new_api = '')
        {
            //download query flag
            $this->download_query['pu_get_download'] = 1;
            //include current version
            $this->download_query['pue_active_version'] = $this->_installed_version;
            $this->download_query['site_domain']        = $this->current_domain;


            //the following is for install key inclusion (will apply later with PUE addons.)
            $this->install_key_arr = get_site_option($this->pue_install_key, []);
            if (isset($this->install_key_arr['key'])) {
                $this->install_key = $this->install_key_arr['key'];

                $this->download_query['pue_install_key'] = $this->install_key;
            } else {
                $this->download_query['pue_install_key'] = '';
            }

            if (! empty($new_api)) {
                $this->api_secret_key                  = $new_api;
                $this->download_query['pu_plugin_api'] = $this->api_secret_key;
                return;
            }

            if (empty($new_api)) {
                $this->download_query['pu_plugin_api'] = $this->api_secret_key;
                return;
            }
        }


        /**
         * Install the hooks required to run periodic update checks and inject update info into WP data structures.
         * Also other hooks related to the automatic updates (such as checking against API and what not (@from Darren)
         *
         * @return void
         */
        private function installHooks()
        {
            //Set up the periodic update checks
            $cronHook = 'check_plugin_updates-' . $this->slug;

            if ($this->checkPeriod > 0) {
                //Trigger the check via Cron
                if (! defined('WP_INSTALLING') && ! wp_next_scheduled($cronHook)) {
                    wp_schedule_event(time(), 'daily', $cronHook);
                }
                add_action($cronHook, [$this, 'checkForUpdates']);

                //In case Cron is disabled or unreliable, we also manually trigger
                //the periodic checks while the user is browsing the Dashboard.
                add_action('init', [$this, 'hook_into_wp_update_api'], 0);
            } else {
                //Periodic checks are disabled.
                wp_clear_scheduled_hook($cronHook);
            }

            if (! $this->_use_wp_update) {
                add_filter('upgrader_pre_install', [$this, 'pre_upgrade_setup'], 10, 2);
                add_filter('upgrader_post_install', [$this, 'tidy_up_after_upgrade'], 10, 3);
            }

            //dashboard message "dismiss upgrade" link
            add_action('wp_ajax_' . $this->dismiss_upgrade, [$this, 'dashboard_dismiss_upgrade']);

            if (! has_action('wp_ajax_pue_dismiss_persistent_notice')) {
                add_action('wp_ajax_pue_dismiss_persistent_notice', [$this, 'dismiss_persistent_notice']);
            }
        }


        /**
         * This is where we'll hook in to set filters for handling bulk and regular updates (i.e. making sure directory
         * names are set up properly etc.)
         *
         * @param boolean $continue   return true or WP aborts current upgrade process.
         * @param array   $hook_extra This will contain the plugin basename in a 'plugin' key
         * @return boolean             We always make sure to return true otherwise wp aborts.
         */
        public function pre_upgrade_setup($continue, $hook_extra)
        {
            if (! empty($hook_extra['plugin']) && $hook_extra['plugin'] === $this->pluginFile) {
                //we need to make sure that the new directory is named correctly
                add_filter('upgrader_source_selection', [$this, 'fixDirName'], 10, 3);
            }
            return true;
        }


        /**
         * Tidy's up our plugin upgrade stuff after update is complete so other plugins aren't affected.
         *
         * @param boolean $continue        return true so wp doesn't abort.
         * @param array   $hook_extra      contains the plugin_basename with the 'plugin'
         *                                 index which we can use to indicate if this is
         *                                 where we want our stuff run
         * @param array   $install_result  WP sends off all the things that have been done in
         *                                 an array (post install)
         * @return boolean                   if wp_error object is returned then wp aborts.
         * @uses
         */
        public function tidy_up_after_upgrade($continue, $hook_extra, $install_result)
        {
            if (! empty($hook_extra['plugin']) && $hook_extra['plugin'] === $this->pluginFile) {
                //gotta make sure bulk updates for other files don't get messed up!!
                remove_filter('upgrader_source_selection', [$this, 'fixDirName'], 10);
                //maybe clean up any leftover files from upgrades
                $this->maybe_cleanup_upgrade();
            }
            return true;
        }


        /**
         * This basically is set to fix the directories for our plugins.
         * Take incoming remote_source file and rename it to match what it should be.
         *
         * @param string              $source        This is usually the same as $remote_source but *may* be something
         *                                           else if this has already been filtered
         * @param string              $remote_source What WP has set as the source (ee plugins coming from beta.eventespresso.com
         *                                           will be beta.tmp)
         * @param Plugin_Upgrader     $wppu
         * @return string|WP_Error renamed file and path
         * @global WP_Filesystem_Base $wp_filesystem
         */
        public function fixDirName($source, $remote_source, $wppu)
        {
            /**
             * @var WP_Filesystem_Base
             */
            global $wp_filesystem;

            //get out early if this doesn't have a plugin upgrader object.
            if (! $wppu instanceof Plugin_Upgrader) {
                return $source;
            }

            //if this is a bulk update then we need an alternate method to verify this is an update we need to modify.
            if ($wppu->bulk) {
                $url_to_check = $wppu->skin->options['url'];
                $is_good      = strpos($url_to_check, urlencode($this->pluginFile)) !== false;
            } else {
                $is_good = isset($wppu->skin->plugin) && $wppu->skin->plugin === $this->pluginFile;
            }

            if ($is_good && $wp_filesystem instanceof WP_Filesystem_Base) {
                $new_dir = $wp_filesystem->wp_content_dir() . 'upgrade/' . $this->slug . '/';

                //make new directory if needed.
                if ($wp_filesystem->exists($new_dir)) {
                    //delete the existing dir first because we want to make sure clean install
                    $wp_filesystem->delete($new_dir, false, 'd');
                }

                //now make sure that we DON'T have the directory and we'll create a new one for this.
                if (! $wp_filesystem->exists($new_dir) && ! $wp_filesystem->mkdir($new_dir, FS_CHMOD_DIR)) {
                    return new WP_Error('mkdir_failed_destination', $wppu->strings['mkdir_failed'], $new_dir);
                }

                //copy original $source into new source
                $result = copy_dir($source, $new_dir);
                if (is_wp_error($result)) {
                    //something went wrong let's just return the original $source as a fallback.
                    return $source;
                }

                //everything went okay... new source = new dir
                $source = $new_dir;
            }
            return $source;
        }


        /**
         * Callback on init hook that sets up hooks for integration with wp_update api.
         */
        public function hook_into_wp_update_api()
        {
            $this->set_api();
            $this->maybeCheckForUpdates();
            $ver_option_key = 'puvererr_' . basename($this->pluginFile);

            //possible update checks on an option page save that is setting the license key.
            //Note we're not actually using the response yet for this triggered update check but we might at some later
            //date.
            $this->trigger_update_check();


            //this injects info into the returned Plugin info popup but we ONLY inject if we're not doing wp_updates
            $this->json_error = $this->get_json_error_string();
            if (! $this->_use_wp_update) {
                add_filter('plugins_api', [$this, 'injectInfo'], 10, 3);

                //Insert our update info into the update array maintained by WP
                add_filter('site_transient_update_plugins', [$this, 'injectUpdate']);
            }


            add_action('admin_notices', [$this, 'maybe_display_extra_notices']);


            if (! $this->_use_wp_update) {
                if (! empty($this->json_error) && ! $this->_force_premium_upgrade) {
                    add_action('admin_notices', [$this, 'display_json_error'], 10, 3);
                } elseif (empty($this->json_error)) {
                    //no errors so let's get rid of any error option if present BUT ONLY if there are no json_errors!
                    delete_site_option($ver_option_key);
                }
            }
        }


        /**
         * Return any cached json_errors from pue responses.
         *
         * @return string
         */
        private function get_json_error_string()
        {
            $option_name = substr('pue_json_error_' . $this->pluginFile, 0, 40);
            return get_site_option($option_name);
        }


        /**
         * Cache json errors from pue responses.
         *
         * @param string $error_message
         */
        private function set_json_error_string($error_message)
        {
            $option_name = substr('pue_json_error_' . $this->pluginFile, 0, 40);
            update_site_option($option_name, $error_message);
        }


        /**
         * Delete cached json errors from pue responses.
         */
        private function delete_json_error_string()
        {
            $option_name = substr('pue_json_error_' . $this->pluginFile, 0, 40);
            delete_site_option($option_name);
        }


        /**
         * Ensures any transient upgrade files are cleaned up after upgrade.
         */
        private function maybe_cleanup_upgrade()
        {
            global $wp_filesystem;

            $chk_file = WP_CONTENT_DIR . '/upgrade/' . $this->slug . '/';

            if (is_readable($chk_file)) {
                if (! $wp_filesystem instanceof WP_Filesystem_Base) {
                    require_once ABSPATH . '/wp-admin/includes/file.php';
                    WP_Filesystem();
                }
                $wp_filesystem->delete($chk_file, false, 'd');
            }
        }


        /**
         * Manually trigger an update check.
         *
         * @return bool
         */
        private function trigger_update_check()
        {
            // we're just using this to trigger a PUE ping
            // whenever an option matching the given $this->option_key is saved..

            if (
                (defined('DOING_WP_CRON') && DOING_WP_CRON)
                || (defined('DOING_AJAX') && DOING_AJAX)
            ) {
                return false;
            }

            /** @var RequestInterface $request */
            $request     = LoaderFactory::getLoader()->getShared(RequestInterface::class);
            $post_params = $request->postParams();

            $has_triggered = false;
            if (! empty($post_params) && ! empty($this->option_key)) {
                foreach ($post_params as $key => $value) {
                    $triggered     = $this->maybe_trigger_update($value, $key, $this->option_key);
                    $has_triggered = $triggered && ! $has_triggered ? true : $has_triggered;
                }
            }
            return $has_triggered;
        }


        /**
         * Conditionally manually trigger an update check.
         *
         * @param mixed  $value
         * @param string $key
         * @param string $site_key_search_string
         * @return bool
         */
        private function maybe_trigger_update($value, $key, $site_key_search_string)
        {
            if (
                $key === $site_key_search_string
                || (is_array($value) && isset($value[ $site_key_search_string ]))
            ) {
                //if $site_key_search_string exists but the actual key field is empty...let's reset the install key as
                // well.
                if (
                    empty($value)
                    || (! is_array($value) && $value !== $this->api_secret_key)
                    || (is_array($value) && (
                            empty($value[ $site_key_search_string ])
                            || $value[ $site_key_search_string ] !== $this->api_secret_key
                        ))
                ) {
                    delete_site_option($this->pue_install_key);
                }
                $this->api_secret_key = $value;
                $this->set_api($this->api_secret_key);

                // Reset force_upgrade flag (but only if there's a free slug key).
                // There are no force upgrades anymore.
                if (! empty($this->_incoming_slug['free'])) {
                    delete_site_option(
                        'pue_force_upgrade_' . $this->_incoming_slug['free'][ key($this->_incoming_slug['free']) ]
                    );
                }

                $this->checkForUpdates();
                return true;
            }
            return false;
        }


        /**
         * Retrieve plugin info from the configured API endpoint.
         *
         * @param array $queryArgs Additional query arguments to append to the request. Optional.
         * @return PU_PluginInfo
         * @uses   wp_remote_get()
         */
        private function requestInfo(array $queryArgs = [])
        {
            //Query args to append to the URL. Plugins can add their own by using a filter callback
            //(see addQueryArgFilter()).
            $queryArgs['pu_request_plugin'] = $this->slug;

            if (! empty($this->api_secret_key)) {
                $queryArgs['pu_plugin_api'] = $this->api_secret_key;
            }

            if (! empty($this->install_key) && $this->_is_premium) {
                $queryArgs['pue_install_key'] = $this->install_key;
            }

            //todo: this can be removed in a later version of PUE when majority of EE users are using more
            //recent versions.
            $queryArgs['new_pue_chk'] = 1;

            //include version info
            $queryArgs['pue_active_version'] = $this->_installed_version;

            //include domain info
            $queryArgs['site_domain'] = $this->current_domain;

            $queryArgs = apply_filters('puc_request_info_query_args-' . $this->slug, $queryArgs);

            //Various options for the wp_remote_get() call. Plugins can filter these, too.
            $options = [
                'timeout' => 10, //seconds
                'headers' => [
                    'Accept' => 'application/json',
                ],
            ];
            $options = apply_filters('puc_request_info_options-' . $this->slug, $options);

            $url = $this->metadataUrl;

            if (! empty($queryArgs)) {
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
            if (! is_wp_error($result) && isset($result['body'])) {
                $response = json_decode($result['body']);
                if (isset($response->extra_notices)) {
                    $this->add_persistent_notice($response->extra_notices);
                }

                // Toggle EDD Licensing feature flag only if 'update_ready' value is correctly.
                if (isset($response->extra_data)) {
                    if(isset($response->extra_data->update_ready)){
                        if($response->extra_data->update_ready === 'espressoUpdate') {
                            $feature_flags = LoaderFactory::getLoader()->getShared('EventEspresso\core\domain\services\capabilities\FeatureFlagsConfig');
                            $feature_flags->enableFeatureFlag(FeatureFlag::USE_EDD_PLUGIN_LICENSING);
                        }
                    }
                }

                // This instance is for EE Core, we have a response from PUE so lets check if it contains PUE Plugin data.
                if (
                    stripos((string) $this->slug, 'event-espresso-core') !== false
                    && isset($response->extra_data)
                    && ! empty($response->extra_data->plugins)
                ) {
                    // Pull PUE plugin data from 'extra_data'.
                    $plugins_array = json_decode($result['body'], true);
                    $plugins       = $plugins_array['extra_data']['plugins'];
                    // Pull all of the add-ons EE has active and update the local latestVersion value of each of them.
                    foreach (EE_Registry::instance()->addons as $addon) {
                        $addon_slug = $addon->getPueSlug();
                        if (isset($response->extra_data->plugins->{$addon_slug})) {
                            $addon_state = get_option('external_updates-' . $addon_slug);
                            // If we don't have an addon state, get out we'll update it next time.
                            if (empty($addon_state)) {
                                continue;
                            }
                            // Have an addon state? Set the latestVersion value!
                            $addon_state->latestVersion = $response->extra_data->plugins->{$addon_slug}->version;
                            update_option('external_updates-' . $addon_slug, $addon_state);
                        }
                    }
                }
            }


            if (
                ! is_wp_error($result)
                && ! empty($result['body'])
                && isset($result['response']['code'])
                && ($result['response']['code'] === 200)
            ) {
                $pluginInfo = PU_PluginInfo::fromJson($result['body']);
            }

            $pluginInfo = apply_filters('puc_request_info_result-' . $this->slug, $pluginInfo, $result);

            return $pluginInfo;
        }


        /**
         * Utility method for adding a persistent notice to users admin.
         *
         * @param array $message     Expect an array of ['error'], ['attention'], ['success'] notices to add to the
         *                           persistent array.
         * @param bool  $overwrite   Whether to force overwriting existing notices or just append to any existing
         *                           notices (default).
         */
        protected function add_persistent_notice($message, $overwrite = false)
        {
            //renewal notices are only saved ONCE per version update and we only do this for plugins that have
            //"turned on" notice saves (typically the main plugin).
            if (! $this->turn_on_notice_saves) {
                return;
            }

            //get existing notices
            $notice_prefix = 'pue_special_notices_';
            $notice_ref    = $notice_prefix . $this->_installed_version;

            $existing_notices = get_option($notice_ref, []);

            //if we don't have existing notices for the current plugin version then let's just make sure all older
            // notices are removed from the db.
            if (empty($existing_notices)) {
                global $wpdb;
                $wpdb->query(
                    $wpdb->prepare(
                        "DELETE FROM $wpdb->options WHERE option_name LIKE '%s'",
                        '%' . $notice_prefix . '%'
                    )
                );
            }

            $existing_notices = is_array($existing_notices) ? $existing_notices : [];

            //k make sure there are no existing notices matching the incoming notices and only append new notices
            //(unless overwrite is set to true).
            foreach ((array) $message as $notice_type => $notices) {
                if (! $overwrite && isset($existing_notices[ $notice_type ])) {
                    foreach ((array) $notices as $notice_id => $notice) {
                        if (
                            empty($notice)
                            || (isset($existing_notices[ $notice_type ][ $notice_id ])
                                && ! $existing_notices[ $notice_type ][ $notice_id ]['active']
                            )
                        ) {
                            //first let's check the message (if not empty) and if it matches what's already present
                            //then we continue, otherwise we replace and make active.
                            if (
                                ! empty($notice)
                                && $existing_notices[ $notice_type ][ $notice_id ]['msg']
                                && $existing_notices[ $notice_type ][ $notice_id ]['msg'] !== $notice
                            ) {
                                $existing_notices[ $notice_type ][ $notice_id ]['msg']    = $notice;
                                $existing_notices[ $notice_type ][ $notice_id ]['active'] = 1;
                            }
                            continue;
                        }
                        $existing_notices[ $notice_type ][ $notice_id ]['msg']    = $notice;
                        $existing_notices[ $notice_type ][ $notice_id ]['active'] = 1;
                    }
                } else {
                    foreach ((array) $notices as $notice_id => $notice) {
                        if (! empty($notice)) {
                            $existing_notices[ $notice_type ][ $notice_id ]['msg']    = $notice;
                            $existing_notices[ $notice_type ][ $notice_id ]['active'] = 1;
                        }
                    }
                }
            }
            //update notices option
            update_option($notice_ref, $existing_notices);
        }


        /**
         * This basically dismisses all persistent notices of a given type (note this only dismisses the notice for the
         * duration of the current plugins version
         */
        public function dismiss_persistent_notice()
        {
            /** @var EE_Capabilities $capabilities */
            $capabilities = LoaderFactory::getLoader()->getShared(EE_Capabilities::class);
            if (! $capabilities->current_user_can('manage_options', 'dismiss-pue-notice')) {
                wp_die(esc_html__('You do not have the required privileges to perform this action', 'event_espresso'));
            }

            /** @var RequestInterface $request */
            $request = LoaderFactory::getLoader()->getShared(RequestInterface::class);
            $type    = $request->getRequestParam('type');
            //if no $type in the request then exit
            if (empty($type)) {
                return;
            }

            $notice_ref       = 'pue_special_notices_' . $this->_installed_version;
            $existing_notices = get_option($notice_ref, []);

            if (isset($existing_notices[ $type ])) {
                foreach ((array) $existing_notices[ $type ] as $notice_id => $details) {
                    $existing_notices[ $type ][ $notice_id ]['active'] = 0;
                }
            }
            update_option($notice_ref, $existing_notices);
        }


        /**
         * This method determines whether or not to display extra notices that might have come back from the request.
         */
        public function maybe_display_extra_notices()
        {
            //nothing should happen if this plugin doesn't save extra notices
            if (! $this->turn_on_notice_saves || ! is_main_site()) {
                echo '';
            }

            //okay let's get any extra notices
            $notices = get_option('pue_special_notices_' . $this->_installed_version, []);
            $notices = is_array($notices) ? $notices : [];

            //setup the message content for each notice;
            $errors = $attentions = $successes = '';
            foreach ($notices as $type => $notes) {
                switch ($type) {
                    case 'error':
                        foreach ((array) $notes as $noteref) {
                            if (! $noteref['active'] || empty($noteref['msg'])) {
                                continue;
                            }
                            // remove the Event Espresso once a year sales notice
                            if (
                                is_multisite()
                                && strpos($noteref['msg'], 'is having their ONLY sale of the year') !== false
                            ) {
                                continue;
                            }
                            $errors .= '<p>' . trim(stripslashes($noteref['msg'])) . '</p>';
                        }
                        break;
                    case 'attention':
                        foreach ((array) $notes as $noteref) {
                            if (! $noteref['active'] || empty($noteref['msg'])) {
                                continue;
                            }
                            $attentions .= '<p>' . trim(stripslashes($noteref['msg'])) . '</p>';
                        }
                        break;
                    case 'success':
                        foreach ((array) $notes as $noteref) {
                            if (! $noteref['active'] || empty($noteref['msg'])) {
                                continue;
                            }
                            $successes .= '<p>' . trim(stripslashes($noteref['msg'])) . '</p>';
                        }
                        break;
                }
            }

            //now let's setup the containers but only if we HAVE message to use :)
            if (empty($errors) && empty($attentions) && empty($successes)) {
                echo '';
            }

            $content = '';
            if (! empty($errors)) {
                ob_start();
                ?>
                <div class="error" id="pue_error_notices">
                    <?php
                    echo wp_kses($errors, AllowedTags::getAllowedTags()); ?>
                    <a class="button button--secondary" href="javascript:void(0);"
                       onclick="PUEDismissNotice( 'error' );"
                       style="float:right; margin-bottom: 10px;">
                        <?php
                        esc_html_e('Dismiss'); ?>
                    </a>
                    <div style="clear:both"></div>
                </div>
                <?php
                $content .= ob_get_contents();
                ob_end_clean();
            }

            if (! empty($attentions)) {
                ob_start();
                ?>
                <div class="notice notice-info" id="pue_attention_notices">
                    <?php
                    echo wp_kses($attentions, AllowedTags::getAllowedTags()); ?>
                    <a class="button button--secondary" href="javascript:void(0);"
                       onclick="PUEDismissNotice( 'attention' );"
                       style="float:right; margin-bottom: 10px;">
                        <?php
                        esc_html_e('Dismiss'); ?>
                    </a>
                    <div style="clear:both"></div>
                </div>
                <?php
                $content .= ob_get_contents();
                ob_end_clean();
            }

            if (! empty($successes)) {
                ob_start();
                ?>
                <div class="success" id="pue_success_notices">
                    <?php
                    echo wp_kses($successes, AllowedTags::getAllowedTags()); ?>
                    <a class="button button--secondary" href="javascript:void(0);"
                       onclick="PUEDismissNotice( 'success' );"
                       style="float:right; margin-bottom: 10px;">
                        <?php
                        esc_html_e('Dismiss'); ?>
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
                function PUEDismissNotice(type) {
                    jQuery("#pue_" + type + "_notices").slideUp();
                    jQuery.post(ajaxurl, {
                        action: "pue_dismiss_persistent_notice",
                        type: type,
                        cookie: encodeURIComponent(document.cookie)
                    });
                }
            </script>
            <?php
            $content .= ob_get_contents();
            ob_end_clean();
            echo($content);
        }


        /**
         * Takes care of sending extra stats to the pue server.
         */
        private function _send_extra_stats()
        {
            //first if we don't have a stats array then lets just get out.
            if (empty($this->extra_stats) || ! $this->extra_stats instanceof Closure) {
                return;
            }

            $extra_stats         = $this->extra_stats;
            $extra_stats_to_send = $extra_stats();
            if (! is_array($extra_stats_to_send)) {
                return;
            }

            //set up args sent in body
            $body = [
                'extra_stats'        => $extra_stats_to_send,
                'user_api_key'       => $this->api_secret_key,
                'pue_stats_request'  => 1,
                'domain'             => $this->current_domain,
                'pue_plugin_slug'    => $this->slug,
                'pue_plugin_version' => $this->getInstalledVersion(),
            ];

            //setup up post args
            $args = [
                'timeout'    => 10,
                'blocking'   => true,
                'user-agent' => 'PUE-stats-carrier',
                'body'       => $body,
                'sslverify'  => Manager::verifySSL(),
            ];

            wp_remote_post($this->metadataUrl, $args);
        }


        /**
         * Retrieve the latest update (if any) from the configured API endpoint.
         *
         * @return PluginUpdateUtility|string|null An instance of PluginUpdateUtility, or NULL when no updates are
         *                                         available.
         * @uses PluginUpdateEngineChecker::requestInfo()
         */
        private function requestUpdate()
        {
            //For the sake of simplicity, this function just calls requestInfo()
            //and transforms the result accordingly.
            /**
             * @var PU_PluginInfo
             */
            $pluginInfo = $this->requestInfo(['pu_checking_for_updates' => '1']);
            $this->delete_json_error_string();
            if (! $pluginInfo instanceof PU_PluginInfo) {
                return null;
            }


            //admin display for if the update check reveals that there is a new version but the API key isn't valid.
            if (! empty($pluginInfo->api_invalid)) {
                //we have json_error returned let's display a message
                $this->json_error = $pluginInfo;
                $this->set_json_error_string($this->json_error);
                return $this->json_error;
            }


            if (! empty($pluginInfo->new_install_key)) {
                $this->install_key_arr['key'] = $pluginInfo->new_install_key;
                update_site_option($this->pue_install_key, $this->install_key_arr);
            }

            //need to correct the download url so it contains the custom user data (i.e. api and any other parameters)
            //oh let's generate the download_url otherwise it will be old news...

            if (! empty($this->download_query)) {
                $d_install_key                           =
                    isset($this->install_key_arr['key']) ? $this->install_key_arr['key'] : null;
                $this->download_query['pue_install_key'] = $d_install_key;
                $this->download_query['new_pue_check']   = 1;
                $pluginInfo->download_url                =
                    add_query_arg($this->download_query, $pluginInfo->download_url);
            }

            return PluginUpdateUtility::fromPluginInfo($pluginInfo);
        }


        /**
         * @param $plugin_data
         */
        public function in_plugin_update_message($plugin_data)
        {
            $plugininfo = $this->json_error;

            //only display messages if there is a new version of the plugin.
            if (is_object($plugininfo)) {
                if (
                    version_compare($plugininfo->version, $this->_installed_version, '>')
                    && $plugininfo->api_invalid
                ) {
                    $msg = str_replace(
                        '%plugin_name%',
                        $this->pluginName,
                        $plugininfo->api_inline_invalid_message
                    );
                    $msg = str_replace('%version%', $plugininfo->version, $msg);
                    $msg = str_replace(
                        '%changelog%',
                        '<a class="thickbox" title="'
                        . $this->pluginName
                        . '" href="plugin-install.php?tab=plugin-information&plugin='
                        . $this->slug . '&TB_iframe=true&width=640&height=808">What\'s New</a>',
                        $msg
                    );
                    echo '</tr><tr class="plugin-update-tr"><td colspan="3" class="plugin-update">'
                         . '<div class="update-message">'
                         . $this->_sanitize_notices($msg)
                         . '</div></td>';
                }
            }
        }


        public function display_changelog()
        {
            //todo (at some point in the future!) contents of changelog display page when api-key is invalid or missing.
            //It will ONLY show the changelog (hook into existing thickbox?)
        }


        /**
         * @param bool   $echo
         * @param bool   $ignore_version_check
         * @param string $alt_content
         * @return string
         */
        public function display_json_error($echo = true, $ignore_version_check = false, $alt_content = '')
        {
            $pluginInfo       = $this->json_error;
            $update_dismissed = get_site_option($this->dismiss_upgrade);
            $ver_option_key   = 'puvererr_' . basename($this->pluginFile);
            $msg              = '';

            $is_dismissed = ! empty($update_dismissed)
                            && in_array($pluginInfo->version, $update_dismissed);

            //add in pue_verification_error option for when the api_key is blank
            if (empty($this->api_secret_key)) {
                update_site_option($ver_option_key, esc_html__('No API key is present', $this->lang_domain));
            }

            if ($pluginInfo->api_invalid) {
                $msg = str_replace(
                    '%plugin_name%',
                    $this->pluginName,
                    $pluginInfo->api_invalid_message
                );
                $msg = str_replace(
                    '%version%',
                    $pluginInfo->version,
                    $msg
                );
            }

            //let's add an option for plugin developers to display some sort of verification message on their options
            //page.
            update_site_option($ver_option_key, $msg);

            if ($is_dismissed) {
                return '';
            }

            //only display messages if there is a new version of the plugin.
            if (
                version_compare($pluginInfo->version, $this->_installed_version, '>')
                || $ignore_version_check
            ) {
                //Dismiss code idea below is obtained from the Gravity Forms Plugin by rocketgenius.com
                ob_start();
                ?>
                <div class="updated" style="padding:15px; position:relative;"
                     id="pu_dashboard_message"><?php
                    echo wp_kses($msg, AllowedTags::getAllowedTags()); ?>
                    <a class="button button--secondary" href="javascript:void(0);" onclick="PUDismissUpgrade();"
                       style='float:right;'><?php
                        esc_html_e("Dismiss") ?></a>
                    <div style="clear:both;"></div>
                </div>
                <script type="text/javascript">
                    function PUDismissUpgrade() {
                        jQuery("#pu_dashboard_message").slideUp();
                        jQuery.post(ajaxurl, {
                            action: "<?php echo esc_js($this->dismiss_upgrade); ?>",
                            version: "<?php echo esc_js($pluginInfo->version); ?>",
                            cookie: encodeURIComponent(document.cookie)
                        });
                    }
                </script>
                <?php
                $content = ob_get_contents();
                ob_end_clean();
                if ($echo !== false) {
                    echo($content);
                } else {
                    return $content;
                }
            }
            return '';
        }


        /**
         * This just receives a content string and uses wp_kses to sanitize the incoming string so it only allows a
         * small subset of tags.
         *
         * @param string $content Content to sanitize
         * @return string
         */
        protected function _sanitize_notices($content)
        {
            $allowed_tags = [
                'a'          => [
                    'href'  => [],
                    'title' => [],
                ],
                'br'         => [],
                'em'         => [],
                'strong'     => [],
                'abbr'       => [],
                'acronym'    => [],
                'b'          => [],
                'blockquote' => [],
                'cite'       => [],
                'code'       => [],
                'strike'     => [],
                'ol'         => [],
                'ul'         => [],
                'li'         => [],
                'p'          => [],
            ];

            return wp_kses($content, $allowed_tags);
        }


        /**
         * This admin_notice shows a message immediately to users who have successfully entered a valid api_key and
         * allows them to click a button to get the premium version.
         * Note: we'll alternatively display any json errors that may be present from the returned package.
         *
         * @return string html
         * @throws EE_Error
         * @deprecated 4.10.37.p
         * @access     public
         */
        public function show_premium_upgrade()
        {
            EE_Error::doing_it_wrong(
                __METHOD__,
                esc_html__(
                    'This method is no longer in use. There is no replacement for it. The method was used to show an admin notice for a 1-click premium upgrade which is no longer available from within WP admin.',
                    'event_espresso'
                ),
                '4.10.37.p'
            );

            global $current_screen;
            $ver_option_key = 'puvererr_' . basename($this->pluginFile);
            if (empty($current_screen)) {
                set_current_screen();
            }

            //check if we're on the wp update page.  If so get out
            if ($current_screen->id === 'update') {
                return;
            }

            $update_dismissed      = get_site_option($this->dismiss_upgrade);
            $is_dismissed          = ! empty($update_dismissed)
                                     && ! empty($this->json_error)
                                     && in_array($this->json_error->version, $update_dismissed);
            $show_dismissal_button = false;

            //first any json errors?
            if (! empty($this->json_error) && isset($this->json_error->api_invalid)) {
                if ($is_dismissed) {
                    return;
                }
                $msg = str_replace('%plugin_name%', $this->pluginName, $this->json_error->api_invalid_message);
                $msg = str_replace('%version%', $this->json_error->version, $msg);
                $msg = sprintf(
                           esc_html__(
                               'It appears you\'ve tried entering an api key to upgrade to the premium version of %s, however, the key does not appear to be valid.  This is the message received back from the server:',
                               $this->lang_domain
                           ),
                           $this->pluginName
                       ) . '</p><p>' . $msg;
                //let's add an option for plugin developers to display some sort of verification message on their
                // options page.
                update_site_option($ver_option_key, $msg);
                $show_dismissal_button = true;
            } else {
                $msg = sprintf(
                    esc_html__(
                        'Congratulations!  You have entered in a valid api key for the premium version of %s.  You can click the button below to upgrade to this version immediately.',
                        $this->lang_domain
                    ),
                    $this->pluginName
                );
                delete_site_option($ver_option_key);
            }

            $button_link = wp_nonce_url(
                self_admin_url('update.php?action=upgrade-plugin&plugin=')
                . $this->pluginFile,
                'upgrade-plugin_' . $this->pluginFile
            );
            $button      = '<a href="' . $button_link . '" class="button--secondary pue-upgrade-now-button" value="no">'
                           . esc_html__('Upgrade Now', $this->lang_domain)
                           . '</a>';

            $content = '<div class="updated" style="padding:15px; position:relative;" id="pue_update_now_container"><p>'
                       . $msg . '</p>';
            $content .= empty($this->json_error) ? $button : '';
            $content .= $show_dismissal_button
                ? '<a class="button--secondary" href="javascript:void(0);" onclick="PUDismissUpgrade();" '
                  . 'style="float:right;">' . esc_html__("Dismiss") . '</a>'
                : '';
            $content .= '<div style="clear:both;"></div></div>';
            $content .= $show_dismissal_button
                ? '<script type="text/javascript">
                function PUDismissUpgrade(){
                    jQuery("#pue_update_now_container").slideUp();
                    jQuery.post( ajaxurl, {action:"'
                  . $this->dismiss_upgrade . '", version:"' . $this->json_error->version
                  . '", cookie: encodeURIComponent(document.cookie)});
                }
                </script>'
                : '';

            echo($content);
        }


        /**
         * Callback for ajax action.
         */
        public function dashboard_dismiss_upgrade()
        {
            /** @var EE_Capabilities $capabilities */
            $capabilities = LoaderFactory::getLoader()->getShared(EE_Capabilities::class);
            if (! $capabilities->current_user_can('manage_options', 'dismiss-pue-upgrade')) {
                wp_die(esc_html__('You do not have the required privileges to perform this action', 'event_espresso'));
            }

            $os_ary = get_site_option($this->dismiss_upgrade);
            if (! is_array($os_ary)) {
                $os_ary = [];
            }

            /** @var RequestInterface $request */
            $request  = LoaderFactory::getLoader()->getShared(RequestInterface::class);
            $os_ary[] = $request->getRequestParam('version');
            update_site_option($this->dismiss_upgrade, $os_ary);
        }


        /**
         * Get the currently installed version of the plugin.
         *
         * @return string Version number.
         */
        private function getInstalledVersion()
        {
            if (function_exists('get_plugin_data')) {
                $plugin_data = get_plugin_data(WP_PLUGIN_DIR . DIRECTORY_SEPARATOR . $this->pluginFile);
            } else {
                require_once(ABSPATH . 'wp-admin/includes/plugin.php');
                $plugin_data = get_plugin_data(WP_PLUGIN_DIR . DIRECTORY_SEPARATOR . $this->pluginFile);
            }
            if (! empty($plugin_data)) {
                $this->pluginName  = $plugin_data['Name'];
                $this->lang_domain = empty($this->lang_domain)
                                     && ! empty($plugin_data['TextDomain'])
                    ? $plugin_data['TextDomain']
                    : $this->lang_domain;
                return $plugin_data['Version'];
            }
            return false; //this should never happen
        }


        /**
         * Check for plugin updates.
         * The results are stored in the DB option specified in $optionName.
         *
         * @return void
         */
        public function checkForUpdates()
        {
            $state = get_site_option($this->optionName);

            // If this is an add-on, only call home if there is an update available for it.
            if ($this->slug !== 'event-espresso-core-reg' && ! empty($state->latestVersion)) {
                if (version_compare($this->_installed_version, $state->latestVersion, '>=')) {
                    return;
                }
            }

            if (empty($state) || ! is_object($state)) {
                $state                 = new StdClass;
                $state->checkedVersion = '';
                $state->update         = null;
            }

            $state->lastCheck      = time();
            $state->checkedVersion = $this->_installed_version;
            //Save before checking in case something goes wrong
            update_site_option($this->optionName, $state);

            $state->update = $this->requestUpdate();
            update_site_option($this->optionName, $state);
        }


        /**
         * Check for updates only if the configured check interval has already elapsed.
         *
         * @return void
         */
        private function maybeCheckForUpdates()
        {
            if (! is_admin()) {
                return;
            }

            if (empty($this->checkPeriod)) {
                return;
            }

            $state = get_site_option($this->optionName);

            $shouldCheck =
                empty($state) ||
                ! isset($state->lastCheck) ||
                ((time() - $state->lastCheck) >= $this->checkPeriod * 3600);
            //$shouldCheck = true;

            if ($shouldCheck) {
                $this->checkForUpdates();
            }
        }


        /**
         * Intercept plugins_api() calls that request information about our plugin and
         * use the configured API endpoint to satisfy them.
         *
         * @param mixed        $result
         * @param string       $action
         * @param array|object $args
         * @return mixed
         * @see plugins_api()
         */
        public function injectInfo($result, $action = null, $args = null)
        {
            $updates  = false;
            $relevant = ($action === 'plugin_information') && isset($args->slug) && ($args->slug === $this->slug);
            if (! $relevant) {
                return $result;
            }
            $state = get_site_option($this->optionName);
            if (! empty($state) && isset($state->update)) {
                $state->update->name = $this->pluginName;
                $result              = PU_PluginInfo::fromJson($state->update, true);
                $updates             = $result->toWpFormat();
            }

            if ($updates) {
                return $updates;
            }
            return $result;
        }


        /**
         * Insert the latest update (if any) into the update list maintained by WP.
         * We do two things in here:
         * 1. insert OUR update if there is an update available (and replace any existing WP one)
         * 2. remove the existing WP one if it exists even if we dont' have an update. This covers the cases where
         *    there may be a ping from WP before EE and we've got a premium plugin installed that MATCHES one in the
         *    WP db.
         *
         * @param array $updates Update list created by WordPress.
         * @return array Modified update list.
         */
        public function injectUpdate($updates)
        {
            // Fix for update_plugins returning false
            if (! is_object($updates)) {
                $updates = new stdClass();
            }

            $state = get_site_option($this->optionName);

            //first remove any existing WP update message that might have snuck in before we have any return from our
            // plugin server.
            if (isset($updates->response[ $this->pluginFile ])) {
                unset($updates->response[ $this->pluginFile ]);
            }

            //Is there an update to insert?
            if (
                ! empty($state)
                && isset($state->update)
                && ! empty($state->update)
                && version_compare($state->update->version, $this->_installed_version, '>')
            ) {
                $updated                                = $state->update->toWPFormat();
                $updated->plugin                        = $this->pluginFile;
                $updates->response[ $this->pluginFile ] = $updated;
            }

            add_action('after_plugin_row_' . $this->pluginFile, [$this, 'in_plugin_update_message']);

            if ($this->json_error) {
                remove_action('after_plugin_row_' . $this->pluginFile, 'wp_plugin_update_row', 10, 2);
            }

            return $updates;
        }


        /**
         * Register a callback for filtering query arguments.
         * The callback function should take one argument - an associative array of query arguments.
         * It should return a modified array of query arguments.
         *
         * @param callback $callback
         * @return void
         * @uses add_filter() This method is a convenience wrapper for add_filter().
         */
        public function addQueryArgFilter($callback)
        {
            add_filter('puc_request_info_query_args-' . $this->slug, $callback);
        }


        /**
         * Register a callback for filtering arguments passed to wp_remote_get().
         * The callback function should take one argument - an associative array of arguments -
         * and return a modified array or arguments. See the WP documentation on wp_remote_get()
         * for details on what arguments are available and how they work.
         *
         * @param callback $callback
         * @return void
         * @uses add_filter() This method is a convenience wrapper for add_filter().
         */
        public function addHttpRequestArgFilter($callback)
        {
            add_filter('puc_request_info_options-' . $this->slug, $callback);
        }


        /**
         * Register a callback for filtering the plugin info retrieved from the external API.
         * The callback function should take two arguments. If the plugin info was retrieved
         * successfully, the first argument passed will be an instance of  PU_PluginInfo. Otherwise,
         * it will be NULL. The second argument will be the corresponding return value of
         * wp_remote_get (see WP docs for details).
         * The callback function should return a new or modified instance of PU_PluginInfo or NULL.
         *
         * @param callback $callback
         * @return void
         * @uses add_filter() This method is a convenience wrapper for add_filter().
         */
        public function addResultFilter($callback)
        {
            add_filter('puc_request_info_result-' . $this->slug, $callback, 10, 2);
        }
    }

endif;

if (! class_exists('PU_PluginInfo')) :

    /**
     * A container class for holding and transforming various plugin metadata.
     *
     * @version 1.1
     * @access  public
     */
    class PU_PluginInfo
    {

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

        public $api_invalid;

        public $new_install_key;

        public $id = 0; //The native WP.org API returns numeric plugin IDs, but they're not used for anything.

        public $api_invalid_message;

        public $api_inline_invalid_message;

        public $pre_release;

        public $stable_release_connect;

        public $is_free_plugin;

        public $file_prefix;

        public $documentation;

        public $in_versions;

        public $extra_notices;

        public $extra_data;

        /**
         * Create a new instance of PU_PluginInfo from JSON-encoded plugin info
         * returned by an external update API.
         *
         * @param string $json Valid JSON string representing plugin info.
         * @return PU_PluginInfo New instance of PU_PluginInfo, or NULL on error.
         */
        public static function fromJson($json, $object = false)
        {
            $apiResponse = (! $object) ? json_decode($json) : $json;
            if (empty($apiResponse) || ! is_object($apiResponse)) {
                return null;
            }

            //Very, very basic validation.
            $valid = (isset($apiResponse->name)
                      && ! empty($apiResponse->name)
                      && isset($apiResponse->version)
                      && ! empty($apiResponse->version)
                     )
                     || (isset($apiResponse->api_invalid) || isset($apiResponse->no_api));
            if (! $valid) {
                return null;
            }

            $info = new self();

            foreach (get_object_vars($apiResponse) as $key => $value) {
                //let's strip out the "plugin_" prefix we've added in plugin-updater-classes.
                $key          = str_replace(
                    'plugin_',
                    '',
                    $key
                );
                $info->{$key} = $value;
            }

            return $info;
        }


        /**
         * Transform plugin info into the format used by the native WordPress.org API
         *
         * @return stdClass
         */
        public function toWpFormat()
        {
            $info = new StdClass;

            //The custom update API is built so that many fields have the same name and format
            //as those returned by the native WordPress.org API. These can be assigned directly.
            $sameFormat = [
                'name',
                'slug',
                'version',
                'requires',
                'tested',
                'rating',
                'upgrade_notice',
                'num_ratings',
                'downloaded',
                'homepage',
                'last_updated',
            ];
            foreach ($sameFormat as $field) {
                if (isset($this->{$field})) {
                    $info->{$field} = $this->{$field};
                } else {
                    $info->{$field} = '';
                }
            }

            //Other fields need to be renamed and/or transformed.
            $info->download_link = $this->download_url;

            if (! empty($this->author_homepage)) {
                $info->author = sprintf('<a href="%s">%s</a>', $this->author_homepage, $this->author);
            } else {
                $info->author = $this->author;
            }

            if (is_object($this->sections)) {
                $info->sections = get_object_vars($this->sections);
            } elseif (is_array($this->sections)) {
                $info->sections = $this->sections;
            } else {
                $info->sections = ['description' => ''];
            }

            $this->slug = ! empty($this->slug) ? $this->slug : '';

            return $info;
        }
    }

endif;

if (! class_exists('PluginUpdateUtility')) :

    /**
     * A simple container class for holding information about an available update.
     *
     * @version 1.1
     * @access  public
     */
    class PluginUpdateUtility
    {

        public $id = 0;

        public $slug;

        public $version;

        public $homepage;

        public $download_url;

        public $sections = [];

        public $upgrade_notice;


        /**
         * Create a new instance of PluginUpdateUtility from its JSON-encoded representation.
         *
         * @param string $json
         * @return PluginUpdateUtility
         */
        public static function fromJson($json)
        {
            //Since update-related information is simply a subset of the full plugin info,
            //we can parse the update JSON as if it was a plugin info string, then copy over
            //the parts that we care about.
            $pluginInfo = PU_PluginInfo::fromJson($json);
            if ($pluginInfo !== null) {
                return self::fromPluginInfo($pluginInfo);
            }
            return null;
        }


        /**
         * Create a new instance of PluginUpdateUtility based on an instance of PU_PluginInfo.
         * Basically, this just copies a subset of fields from one object to another.
         *
         * @param PU_PluginInfo $info
         * @return PluginUpdateUtility
         */
        public static function fromPluginInfo($info)
        {
            $update     = new self();
            $copyFields = ['id', 'slug', 'version', 'homepage', 'download_url', 'upgrade_notice', 'sections'];
            foreach ($copyFields as $field) {
                $update->{$field} = $info->{$field};
            }
            return $update;
        }


        /**
         * Transform the update into the format used by WordPress native plugin API.
         *
         * @return stdClass
         */
        public function toWpFormat()
        {
            $update = new StdClass;

            $update->id          = $this->id;
            $update->slug        = $this->slug;
            $update->new_version = $this->version;
            $update->url         = $this->homepage;
            $update->package     = $this->download_url;
            if (! empty($this->upgrade_notice)) {
                $update->upgrade_notice = $this->upgrade_notice;
            }

            return $update;
        }
    }

endif;
