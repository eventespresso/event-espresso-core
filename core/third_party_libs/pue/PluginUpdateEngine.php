<?php

namespace PluginUpdateEngine;

use Closure;
use EE_Error;
use EE_Registry;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\core\services\request\sanitizers\AllowedTags;
use Plugin_Upgrader;
use stdClass;
use WP_Error;
use WP_Filesystem_Base;
use WP_Upgrader;

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
 *    $check_for_updates = new PluginUpdateEngine($host_server_url, $plugin_slug, $options); //initiate the
 *    class and start the plugin update engine!
 * }
 *
 * @original author (c) Janis Elsts
 * @heavily  modified by Darren Ethier
 * @license  GPL2 or greater.
 * @version  1.1
 */
class PluginUpdateEngine
{
    /**
     * The URL of the plugin's metadata file.
     *
     * @var string
     */
    public $metadataUrl = '';

    /**
     * plugin_basename (used internally by WP updates).
     *
     * @var string
     */
    public $pluginFile = '';

    /**
     * variable used to hold the pluginName as set by the constructor.
     *
     * @var string
     */
    public $pluginName = '';

    /**
     * @var PluginInfo
     */
    private $plugin_info;

    /**
     * How often to check for updates (in hours).
     *
     * @var int
     */
    public $checkPeriod = 12;

    /**
     * Where to store the update info.
     *
     * @var string
     */
    public $optionName = '';

    /**
     * this is what is used to reference the api_key in your plugin options.  PUE uses this to trigger updating
     * your information message whenever this option_key is modified.
     *
     * @var string
     */
    public $option_key = '';

    /**
     * this is the slug of the options page for your plugin where the site-licence(api) key is set by your user.
     * This is required in order to do an update check immediately when the options page is set so api messages
     * update immediately.
     *
     * @var string
     */
    public $options_page_slug = '';

    /**
     * for storing any json_error data that gets returned so we can display an admin notice.
     *
     * @var string
     */
    public $json_error = '';

    /**
     * used to hold the user API.  If not set then nothing will work!
     *
     * @var string
     */
    public $api_secret_key = '';

    /**
     * used to hold the install_key if set (included here for addons that will extend PUE to use install key checks)
     *
     * @var string
     */
    public $install_key = '';

    /**
     * holds the install key array from the database.
     *
     * @var array
     */
    public $install_key_arr = [];

    /**
     * used to hold the query variables for download checks;
     *
     * @var array
     */
    public $download_query = [];

    /**
     * used to hold the localization domain for translations .
     *
     * @var string
     */
    public $lang_domain = 'event_espresso';

    /**
     * for setting the dismiss upgrade option (per plugin).
     *
     * @var string
     */
    public $dismiss_upgrade;

    /**
     * we'll customize this later so each plugin can have it's own install key!
     *
     * @var string
     */
    public $pue_install_key;

    /**
     * will hold the slug that is being used to check for updates.
     *
     * @var string
     */
    public $slug;

    /**
     * holds what the current domain is that is pinging for updates
     *
     * @var string
     */
    public $current_domain;

    /**
     * The closure should return an array of key/value pairs that will get sent along with the stats package.
     *
     * @var Closure
     */
    public $extra_stats;

    /**
     * used to flag that renewal notices/critical notices are attached to version updates of this plugin.
     *
     * @var bool
     */
    public $turn_on_notice_saves = false;

    /**
     * this will just hold what installed version we have of the plugin right now.
     *
     * @var string
     */
    private $installed_version = '';

    /**
     * this is a flag used for setting whether the premium version is installed or not.
     *
     * @var bool
     */
    private $is_premium = false;

    /**
     * optional, this flag is used to indicate whether this is a pre-release version or not.
     *
     * @var bool
     */
    private $is_prerelease = false;

    /**
     * this is used to indicate whether this is a free release or not.
     *
     * @var bool
     */
    private $is_free_release = false;

    /**
     * @var string
     */
    private $plugin_basename = '';

    /**
     * flag for indicating if free downloads are updated from wp or not.
     *
     * @var bool
     */
    private $use_wp_update = false;

    /**
     * @var array
     */
    private $incoming_slug = [];

    /**
     * flag for indicating if we want to give the user the option to upgrade to premium from a free version
     * immediately.
     *
     * @var bool
     */
    private $force_premium_upgrade = false;

    /**
     * This is just a container for any pue errors that get generated (and possibly used to display via an admin
     * notice)
     *
     * @var array
     */
    private $pue_errors = [];

    /**
     * @var string
     */
    private $error_msg = '';

    /**
     * @var RequestInterface
     */
    private $request;


    /**
     * PluginUpdateEngine constructor.
     *
     * @param string       $metadataUrl The URL of the plugin's metadata file.
     * @param array|string $slug        The plugin's 'slug'.
     * @param array        $options     Will contain any options that need to be set in the class initialization for
     *                                  construct.  These are the keys:
     * @key integer $checkPeriod   How often to check for updates (in hours).
     *                                  Defaults to checking every 12 hours.
     *                                  Set to 0 to disable automatic update checks.
     * @key string $optionName     Where to store book-keeping info about update checks.
     *                                  Defaults to 'external_updates-$slug'.
     * @key string $apikey         used to authorize download updates from developer server
     * @key string $lang_domain    If the plugin file pue-client.php is included with is localized
     *                                  you can put the domain reference string here so any strings in this file
     *                                  get included in the localization.
     * @return void
     */
    public function __construct(string $metadataUrl = '', $slug = [], array $options = [])
    {
        $this->metadataUrl = $metadataUrl;
        if (empty($this->metadataUrl)) {
            return;
        }
        $this->request = LoaderFactory::getLoader()->getShared(RequestInterface::class);

        $this->incoming_slug = $slug;

        $options_verified = $this->_verify_options($options);

        if (! $options_verified) {
            //get out because we don't have verified options (and the admin_notice should display);
            return;
        }

        $verify_slug = $this->setSlugAndSlugProps($slug, $options_verified);

        if (! $verify_slug) {
            //get out because the slug isn't valid.  An admin notice should show.
            return;
        }

        $this->current_domain       = urlencode(str_replace(['http://', 'https://'], '', site_url()));
        $this->setOptionName();
        $this->checkPeriod          = (int) $options_verified['checkPeriod'];
        $this->api_secret_key       = trim($options_verified['apikey']);
        $this->option_key           = $options_verified['option_key'];
        $this->options_page_slug    = $options_verified['options_page_slug'];
        $this->use_wp_update        = ! $this->is_premium && ! $this->is_prerelease
            ? $options_verified['use_wp_update']
            : false;
        $this->extra_stats          = $options_verified['extra_stats'];
        $this->turn_on_notice_saves = $options_verified['turn_on_notices_saved'] ?? false;

        //set hooks
        $this->installHooks();
    }


    /**
     * This checks to see if there is a forced upgrade option saved from a previous saved options page trigger.
     * If there is then we change the slug accordingly and setup for premium update.
     * This function will also take care of deleting any previous force_update options IF our current installed
     * plugin IS premium.
     *
     * @deprecated 4.10.37.p
     * @return void
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
        if (! isset($this->incoming_slug['free'])) {
            return;
        }

        // is this premium?  let's delete any saved options for free
        if ($this->is_premium) {
            delete_site_option(
                'pue_force_upgrade_' . $this->incoming_slug['free'][ key($this->incoming_slug['free']) ]
            );
            return;
        }
        $upgrade_slug                = get_site_option('pue_force_upgrade_' . $this->slug);
        $this->force_premium_upgrade = ! empty($upgrade_slug);
        $this->is_premium            = $this->force_premium_upgrade;
        $this->slug                  = $this->force_premium_upgrade ? $upgrade_slug : $this->slug;
        $this->use_wp_update         = ! $this->force_premium_upgrade ? $this->use_wp_update : false;
        $this->setPueInstallKey();
    }


    /**
     * This simply goes through the sent options array and make sure it has all the REQUIRED info.  If it doesn't
     * then we'll set an admin notice with an error message for the user.
     *
     * @return  false|array
     */
    private function _verify_options($options)
    {
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

        // let's first make sure required values are present
        foreach ($required as $key) {
            if (! isset($options[ $key ])) {
                $this->pue_errors[] = $key;
            }
        }

        if (empty($this->pue_errors)) {
            return array_merge($defaults, $options);
        }
        $this->_display_errors('options');
        return false;
    }


    /**
     * All this does is verify that if $slug is an array that we have a key in the $options field for
     * 'version_params' that help us determine whether the plugin installed is the premium or freemium version.
     * Then we set the installed_version property and the is_premium property
     *
     * @param mixed(array|string) $slug    if array then we have premium and free options for this plugin
     * @return bool (false for fail, true for success)
     */
    private function verifyAndSetInstalledVersion($slug): bool
    {
        if (! is_array($slug)) {
            $this->_display_errors('slug_not_array');
            return false;
        }

        // We require at LEAST 'premium' index to be present if this is an array
        if (! isset($slug['premium'])) {
            $this->_display_errors('slug_array_invalid');
            return false;
        }

        $this->installed_version = $this->getInstalledVersion();
        if (! $this->installed_version) {
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
    private function _display_errors(string $type)
    {
        $msg = '';
        if (defined('WP_DEBUG') && WP_DEBUG) {
            switch ($type) {
                case 'options':
                    $msg .= sprintf(
                                esc_html__(
                                    'Plugin Update Engine is unable to setup correctly for the plugin with the slug "%s" because there are the following keys missing from the options array sent to the PluginUpdateEngine class when it is instantiated:',
                                    'event_espresso'
                                ),
                                print_r($this->incoming_slug, true)
                            );
                    $msg .= '</p><ul>';
                    foreach ($this->pue_errors as $error) {
                        $msg .= '<li>' . $error . '</li>';
                    }
                    $msg .= '</ul><p>';
                    break;

                case 'slug_array_invalid':
                    $msg .= esc_html__(
                        'An array was sent to the PluginUpdateEngine class as the value for the $plugin_slug property, however the array is missing the "premium" index.',
                        'event_espresso'
                    );
                    break;

                case 'slug_string_invalid':
                    $msg .= esc_html__(
                        'A string was sent to the PluginUpdateEngine class as the value for the $plugin_slug property, however the string is empty',
                        'event_espresso'
                    );
                    break;

                case 'no_version_present':
                    $msg .= sprintf(
                        esc_html__(
                            'For some reason PUE is unable to determine the current version of the plugin. It is possible that the incorrect value was sent for the "plugin_basename" key in the %s$1$options%s$2 array.',
                            'event_espresso'
                        ),
                        '<strong>',
                        '</strong>'
                    );
                    break;

                case 'slug_not_array' :
                    $msg .= sprintf(
                        esc_html__(
                            'The following plugin needs to be updated in order to work with this version of our plugin update script: %s$1You will have to update this manually.  Contact support for further instructions',
                            'event_espresso'
                        ),
                        // old method for plugin name is just to use the slug and manipulate
                        '<strong>' . ucwords(str_replace('-', ' ', $this->incoming_slug)) . '</strong></p><p>'
                    );
                    break;
            }
        } else {
            if (empty($this->slug)) {
                $msg .= esc_html__(
                    'Automatic updates cannot be setup for an EE addon because of an error in the file.  Please contact support, and include a list of EE addons recently installed/updated.',
                    'event_espresso'
                );
            } else {
                $msg .= sprintf(
                    esc_html__(
                        'Unable to setup automatic updates for the plugin with the slug "%s" because of an error with the code. Please contact EE support and give them this error message.',
                        'event_espresso'
                    ),
                    $this->slug
                );
            }
            $msg .= '</p><p>';
        }

        $this->error_msg = apply_filters(
            'PUE__display_errors',
            '<p>' . $msg . '</p>',
            $type,
            $this->pue_errors,
            $this->incoming_slug
        );
        add_action('admin_notices', [$this, 'show_pue_client_errors'], 10);
    }


    /**
     * display any pue_client errors
     *
     */
    public function show_pue_client_errors()
    {
        echo "
            <div class='error' style='padding:15px; position:relative;' id='pue_option_error'>
                " . wp_kses($this->error_msg, AllowedTags::getAllowedTags()) . '
            </div>';
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
     * @param array        $options
     * @return bool
     */
    private function setSlugAndSlugProps($slug, array $options): bool
    {
        $this->pluginFile  = $options['plugin_basename'];
        //we need to set installed version and set flags for version
        $verify_version = $this->verifyAndSetInstalledVersion($slug);

        if (! $verify_version) {
            return false;
        }

        //set other properties related to version
        //is_premium?
        $premium_search_ref = is_array($slug) ? key($slug['premium']) : null;
        //case insensitive search in version
        $this->is_premium = ! empty($premium_search_ref)
                            && stripos($this->installed_version, $premium_search_ref) !== false;

        //wait... if slug is_string() then we'll assume this is a premium install by default
        $this->is_premium = ! $this->is_premium && ! is_array($slug) ? true : $this->is_premium;

        //set pre-release flag
        $pr_search_ref       = is_array($slug) && isset($slug['prerelease']) ? key($slug['prerelease']) : null;
        $this->is_prerelease = ! empty($pr_search_ref)
                               && stripos($this->installed_version, $pr_search_ref) !== false;

        //free_release?
        $fr_search_ref         = is_array($slug) && isset($slug['free']) ? key($slug['free']) : null;
        $this->is_free_release = ! empty($fr_search_ref)
                                 && stripos($this->installed_version, $fr_search_ref) !== false;

        //set slug we use
        $this->slug = $this->is_premium && is_array($slug) ? $slug['premium'][ key($slug['premium']) ] : null;


        //we handle differently depending on whether the slug is an array or not.
        if (is_array($slug)) {
            //let's go through the conditions on what we use for the slug
            $set_slug = $this->is_premium ? $slug['premium'][ key($slug['premium']) ] : null;
            $set_slug = empty($set_slug) && $this->is_prerelease
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

        $this->slug = $set_slug;  //now we've got the slug for the package to get set.

        //now let's setup other properties based on the slug OR the 'plugin_basename' option.
        $this->dismiss_upgrade = 'pu_dismissed_upgrade_' . $this->slug;
        $this->setPueInstallKey();
        return true;
    }


    /**
     * gets the api from the options table if present
     *
     * @param string $api_secret_key
     */
    private function set_api(string $api_secret_key = '')
    {
        if (! empty($api_secret_key)) {
            $this->api_secret_key = $api_secret_key;
        }
        //download query flag
        $this->download_query['pu_get_download'] = 1;
        //include current version
        $this->download_query['pue_active_version'] = $this->installed_version;
        $this->download_query['site_domain']        = $this->current_domain;


        //the following is for install key inclusion (will apply later with PUE addons.)
        $this->install_key_arr = get_site_option($this->pue_install_key, []);
        if (isset($this->install_key_arr['key'])) {
            $this->install_key = $this->install_key_arr['key'];
            $this->download_query['pue_install_key'] = $this->install_key;
        } else {
            $this->download_query['pue_install_key'] = '';
        }

        $this->download_query['pu_plugin_api'] = $this->api_secret_key;
    }


    /**
     * Install the hooks required to run periodic update checks
     * and inject update info into WP data structures.
     * Also other hooks related to the automatic updates (such as checking again API and what not (@from Darren)
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
        //dashboard message "dismiss upgrade" link
        add_action('wp_ajax_' . $this->dismiss_upgrade, [$this, 'dashboard_dismiss_upgrade']);

        if (! has_action('wp_ajax_pue_dismiss_persistent_notice')) {
            add_action('wp_ajax_pue_dismiss_persistent_notice', [$this, 'dismiss_persistent_notice']);
        }

        if (! $this->use_wp_update) {
            add_filter('upgrader_pre_install', [$this, 'pre_upgrade_setup'], 10, 2);
            add_filter('upgrader_post_install', [$this, 'tidy_up_after_upgrade'], 10, 2);
        }
    }


    /**
     * This is where we'll hook in to set filters for handling bulk and regular updates (i.e. making sure directory
     * names are setup properly etc.)
     *
     * @param bool  $continue   return true or WP aborts current upgrade process.
     * @param array $hook_extra This will contain the plugin basename in a 'plugin' key
     * @return boolean          We always make sure to return true otherwise wp aborts.
     */
    public function pre_upgrade_setup(bool $continue, array $hook_extra): bool
    {
        if (! empty($hook_extra['plugin']) && $hook_extra['plugin'] === $this->pluginFile) {
            //we need to make sure that the new directory is named correctly
            add_filter('upgrader_source_selection', [$this, 'fixDirName'], 10, 3);
        }
        return $continue;
    }


    /**
     * Tidy's up our plugin upgrade stuff after update is complete so other plugins aren't affected.
     *
     * @param bool  $continue   return true so wp doesn't abort.
     * @param array $hook_extra contains the plugin_basename with the 'plugin' index
     *                          which we can used to indicate if this is where we want our stuff run
     * @return boolean          if wp_error object is returned then wp aborts.
     * @uses
     */
    public function tidy_up_after_upgrade(bool $continue, array $hook_extra): bool
    {
        if (! empty($hook_extra['plugin']) && $hook_extra['plugin'] === $this->pluginFile) {
            //gotta make sure bulk updates for other files don't get messed up!!
            remove_filter('upgrader_source_selection', [$this, 'fixDirName']);
            //maybe clean up any leftover files from upgrades
            $this->maybe_cleanup_upgrade();
        }
        return $continue;
    }


    /**
     * This basically is set to fix the directories for our plugins.
     * Take incoming remote_source file and rename it to match what it should be.
     *
     * @param string                      $source        This is usually the same as $remote_source but *may* be something
     *                                                   else if this has already been filtered
     * @param string                      $remote_source What WP has set as the source (ee plugins coming from beta.eventespresso.com
     *                                                   will be beta.tmp)
     * @param Plugin_Upgrader|WP_Upgrader $wppu
     * @return string|WP_Error renamed file and path
     * @global WP_Filesystem_Base         $wp_filesystem
     */
    public function fixDirName(string $source, string $remote_source, $wppu)
    {
        // get out early if this doesn't have a plugin upgrader object.
        if (! $wppu instanceof Plugin_Upgrader) {
            return $source;
        }

        // if this is a bulk update then we need an alternate method to verify this is an update we need to modify.
        $is_good = $wppu->bulk
            ? strpos($wppu->skin->options['url'], urlencode($this->pluginFile)) !== false
            : isset($wppu->skin->plugin) && $wppu->skin->plugin === $this->pluginFile;

        /**
         * @var WP_Filesystem_Base
         */
        global $wp_filesystem;
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

        // possible update checks on an option page save that is setting the license key.
        // Note we're not actually using the response yet for this triggered update check
        // but we might at some later date.
        $this->trigger_update_check();

        add_action('admin_notices', [$this, 'maybe_display_extra_notices']);

        // this injects info into the returned Plugin info popup but we ONLY inject if we're not doing wp_updates
        if (! $this->use_wp_update) {
            add_filter('plugins_api', [$this, 'injectInfo'], 10, 3);
            //Insert our update info into the update array maintained by WP
            add_filter('site_transient_update_plugins', [$this, 'injectUpdate']);

            $this->plugin_info = $this->getPluginInfo();
            if (empty($this->plugin_info)) {
                // no errors so let's get rid of any error option if present BUT ONLY if there are no json_errors!
                delete_site_option($this->getVersionOptionName());
            } elseif (! $this->force_premium_upgrade) {
                add_action('admin_notices', [$this, 'display_json_error']);
            }
        }
    }


    private function getPluginInfoOptionName(): string
    {
        return substr('pue_json_error_' . $this->pluginFile, 0, 40);
    }


    /**
     * Return any cached json_errors from pue responses.
     *
     * @return PluginInfo|false
     */
    private function getPluginInfo()
    {
        $plugin_info = get_site_option($this->getPluginInfoOptionName());
        // previous code would save this to the json_error prop despite that being a string ¯\_(ツ)_/¯
        $this->json_error = $plugin_info;
        return $plugin_info;
    }


    /**
     * Cache json errors from pue responses.
     *
     * @param PluginInfo $plugin_info
     */
    private function setPluginInfo(PluginInfo $plugin_info)
    {
        update_site_option($this->getPluginInfoOptionName(), $plugin_info);
        // previous code would save this to the json_error prop despite that being a string ¯\_(ツ)_/¯
        $this->json_error = $plugin_info;
    }


    /**
     * Delete cached json errors from pue responses.
     */
    private function deletePluginInfo()
    {
        delete_site_option($this->getPluginInfoOptionName());
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
     * @return void
     */
    private function trigger_update_check()
    {
        // we're just using this to trigger a PUE ping
        // whenever an option matching the given $this->option_key is saved..
        if ($this->request->isCron() || $this->request->isAjax()) {
            return;
        }
        $post_params = $this->request->postParams();
        if (! empty($post_params) && ! empty($this->option_key)) {
            foreach ($post_params as $key => $value) {
                $this->maybe_trigger_update($value, $key, $this->option_key);
            }
        }
    }


    /**
     * Conditionally manually trigger an update check.
     *
     * @param mixed  $value
     * @param string $key
     * @param string $site_key_search_string
     * @return void
     */
    private function maybe_trigger_update($value, string $key, string $site_key_search_string)
    {
        if (
            $key === $site_key_search_string
            || (is_array($value) && isset($value[ $site_key_search_string ]))
        ) {
            // if $site_key_search_string exists but the actual key field is empty...
            // let's reset the install key as well.
            if (
                empty($value)
                || (! is_array($value) && $value !== $this->api_secret_key)
                || (is_array($value)
                    && (
                        empty($value[ $site_key_search_string ])
                        || $value[ $site_key_search_string ] !== $this->api_secret_key
                    ))
            ) {
                delete_site_option($this->pue_install_key);
            }
            $this->set_api($value);

            // Reset force_upgrade flag (but only if there's a free slug key).
            // There are no force upgrades anymore.
            if (! empty($this->incoming_slug['free'])) {
                delete_site_option(
                    'pue_force_upgrade_' . $this->incoming_slug['free'][ key($this->incoming_slug['free']) ]
                );
            }

            $this->checkForUpdates();
        }
    }


    /**
     * Retrieve plugin info from the configured API endpoint.
     *
     * @param array $queryArgs Additional query arguments to append to the request. Optional.
     * @return PluginInfo|null
     * @uses   wp_remote_get()
     */
    private function requestInfo(array $queryArgs = []): ?PluginInfo
    {
        //Query args to append to the URL. Plugins can add their own by using a filter callback
        //(see addQueryArgFilter()).
        $queryArgs['pu_request_plugin'] = $this->slug;

        if (! empty($this->api_secret_key)) {
            $queryArgs['pu_plugin_api'] = $this->api_secret_key;
        }

        if (! empty($this->install_key) && $this->is_premium) {
            $queryArgs['pue_install_key'] = $this->install_key;
        }

        //todo: this can be removed in a later version of PUE when majority of EE users are using more
        //recent versions.
        $queryArgs['new_pue_chk'] = 1;

        //include version info
        $queryArgs['pue_active_version'] = $this->installed_version;

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
        $result = wp_remote_get($url, $options);

        $this->_send_extra_stats(); //we'll trigger an extra stats update here.


        //any special notices in the return package?
        if (! is_wp_error($result) && isset($result['body'])) {
            $response = json_decode($result['body']);
            if (isset($response->extra_notices)) {
                $this->add_persistent_notice($response->extra_notices);
            }
            // This instance is for EE Core, we have a response from PUE so lets check if it contains PUE Plugin data.
            if (
                stripos($this->slug, 'event-espresso-core') !== false
                && isset($response->extra_data)
                && ! empty($response->extra_data->plugins)
            ) {
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

        //Try to parse the response
        $pluginInfo = ! is_wp_error($result)
                      && ! empty($result['body'])
                      && isset($result['response']['code'])
                      && ($result['response']['code'] === 200)
            ? PluginInfo::fromJson($result['body'])
            : null;

        return apply_filters('puc_request_info_result-' . $this->slug, $pluginInfo, $result);
    }


    /**
     * Utility method for adding a persistent notice to users admin.
     *
     * @param array|null $message   Expect an array of ['error'], ['attention'], ['success'] notices
     *                              to add to the persistent array.
     * @param bool       $overwrite Whether to force overwriting existing notices
     *                              or just append to any existing notices (default).
     */
    protected function add_persistent_notice(?array $message, bool $overwrite = false)
    {
        //renewal notices are only saved ONCE per version update and we only do this for plugins that have
        //"turned on" notice saves (typically the main plugin).
        if (! $this->turn_on_notice_saves) {
            return;
        }

        //get existing notices
        $notice_prefix = 'pue_special_notices_';
        $notice_ref    = $notice_prefix . $this->installed_version;

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
        $type    = $this->request->getRequestParam('type');
        //if no $type in the request then exit
        if (empty($type)) {
            return;
        }

        $notice_ref       = 'pue_special_notices_' . $this->installed_version;
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
        $notices = get_option('pue_special_notices_' . $this->installed_version, []);
        $notices = is_array($notices) ? $notices : [];

        //setup the message content for each notice;
        $errors = $attentions = $successes = '';
        foreach ($notices as $type => $notes) {
            switch ($type) {
                case 'error':
                    foreach ((array) $notes as $note) {
                        if (! $note['active'] || empty($note['msg'])) {
                            continue;
                        }
                        $errors .= '<p>' . trim(stripslashes($note['msg'])) . '</p>';
                    }
                    break;
                case 'attention':
                    foreach ((array) $notes as $note) {
                        if (! $note['active'] || empty($note['msg'])) {
                            continue;
                        }
                        $attentions .= '<p>' . trim(stripslashes($note['msg'])) . '</p>';
                    }
                    break;
                case 'success':
                    foreach ((array) $notes as $note) {
                        if (! $note['active'] || empty($note['msg'])) {
                            continue;
                        }
                        $successes .= '<p>' . trim(stripslashes($note['msg'])) . '</p>';
                    }
                    break;
            }
        }

        //now let's setup the containers but only if we HAVE message to use :)
        if (empty($errors) && empty($attentions) && empty($successes)) {
            echo '';
        }

        ob_start();
        if (! empty($errors)) {
            ?>
            <div class="error" id="pue_error_notices">
                <?php echo wp_kses($errors, AllowedTags::getAllowedTags()); ?>
                <a class="button button--secondary"
                   href="javascript:void(0);"
                   onclick="PUEDismissNotice( 'error' );"
                   style="float:right; margin-bottom: 10px;"
                >
                    <?php esc_html_e('Dismiss'); ?>
                </a>
                <div style="clear:both"></div>
            </div>
            <?php
        }

        if (! empty($attentions)) {
            ?>
            <div class="notice notice-info" id="pue_attention_notices">
                <?php echo wp_kses($attentions, AllowedTags::getAllowedTags()); ?>
                <a class="button button--secondary"
                   href="javascript:void(0);"
                   onclick="PUEDismissNotice( 'attention' );"
                   style="float:right; margin-bottom: 10px;"
                >
                    <?php esc_html_e('Dismiss'); ?>
                </a>
                <div style="clear:both"></div>
            </div>
            <?php
        }

        if (! empty($successes)) {
            ?>
            <div class="success" id="pue_success_notices">
                <?php echo wp_kses($successes, AllowedTags::getAllowedTags()); ?>
                <a class="button button--secondary"
                   href="javascript:void(0);"
                   onclick="PUEDismissNotice( 'success' );"
                   style="float:right; margin-bottom: 10px;"
                >
                    <?php esc_html_e('Dismiss'); ?>
                </a>
                <div style="clear:both"></div>
            </div>
            <?php
        }

        //add inline script for dismissing notice
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
        echo ob_get_clean();
    }


    /**
     * Takes care of sending extra stats to the pue server.
     */
    private function _send_extra_stats()
    {
        // first if we don't have a stats callback then lets just get out.
        if (! $this->extra_stats instanceof Closure) {
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
            'sslverify'  => false,
        ];

        wp_remote_post($this->metadataUrl, $args);
    }


    /**
     * Retrieve the latest update (if any) from the configured API endpoint.
     *
     * @return PluginInfo|PluginUpdateUtility|null   An instance of PluginInfo,
     *                                                  or PluginUpdateUtility,
     *                                                  or NULL when no updates are available.
     * @uses PluginUpdateEngine::requestInfo()
     */
    private function requestUpdate()
    {
        //For the sake of simplicity, this function just calls requestInfo()
        //and transforms the result accordingly.
        $this->plugin_info = $this->requestInfo(['pu_checking_for_updates' => '1']);
        $this->deletePluginInfo();
        if (! $this->plugin_info instanceof PluginInfo) {
            return null;
        }


        //admin display for if the update check reveals that there is a new version but the API key isn't valid.
        if (! empty($pluginInfo->api_invalid)) { //we have json_error returned let's display a message
            $this->setPluginInfo($this->plugin_info);
            return $this->plugin_info;
        }


        if (! empty($pluginInfo->new_install_key)) {
            $this->install_key_arr['key'] = $pluginInfo->new_install_key;
            update_site_option($this->pue_install_key, $this->install_key_arr);
        }

        //need to correct the download url so it contains the custom user data (i.e. api and any other parameters)
        //oh let's generate the download_url otherwise it will be old news...

        if (! empty($this->download_query && isset($this->install_key_arr['key']))) {
            $d_install_key                           = $this->install_key_arr['key'];
            $this->download_query['pue_install_key'] = $d_install_key;
            $this->download_query['new_pue_check']   = 1;
            $this->plugin_info->download_url         = add_query_arg(
                $this->download_query,
                $this->plugin_info->download_url
            );
        }

        return PluginUpdateUtility::fromPluginInfo($this->plugin_info);
    }


    public function in_plugin_update_message()
    {
        // only display messages if there is a new version of the plugin.
        if (is_object($this->plugin_info)) {
            if (
                version_compare($this->plugin_info->version, $this->installed_version, '>')
                && $this->plugin_info->api_invalid
            ) {
                $msg = str_replace(
                    '%plugin_name%',
                    $this->pluginName,
                    $this->plugin_info->api_invalid_message
                );
                $msg = str_replace('%version%', $this->plugin_info->version, $msg);
                $msg = str_replace(
                    '%changelog%',
                    "
                        <a class='thickbox'
                           title='$this->pluginName'
                           href='plugin-install.php?tab=plugin-information&plugin=$this->slug&TB_iframe=true&width=640&height=808'
                        >
                           What's New
                        </a>",
                    $msg
                );
                echo '
                    </tr>
                    <tr class="plugin-update-tr">
                        <td colspan="3" class="plugin-update">
                            <div class="update-message">
                                ' . wp_kses($msg, AllowedTags::getAllowedTags()) . '
                            </div>
                        </td>';
            }
        }
    }


    public function display_changelog()
    {
        //todo (at some point in the future!) contents of changelog display page when api-key is invalid or missing.
        //It will ONLY show the changelog (hook into existing thickbox?)
    }


    public function display_json_error()
    {
        $update_dismissed = get_site_option($this->dismiss_upgrade);
        $msg              = '';

        $is_dismissed = ! empty($update_dismissed)
                        && in_array($this->plugin_info->version, $update_dismissed);

        //add in pue_verification_error option for when the api_key is blank
        if (empty($this->api_secret_key)) {
            update_site_option(
                $this->getVersionOptionName(),
                esc_html__('No API key is present', 'event_espresso')
            );
        }

        if ($this->plugin_info->api_invalid) {
            $msg = str_replace(
                '%plugin_name%',
                $this->pluginName,
                $this->plugin_info->api_invalid_message
            );
            $msg = str_replace(
                '%version%',
                $this->plugin_info->version,
                $msg
            );
        }

        //let's add an option for plugin developers to display some sort of verification message on their options
        //page.
        update_site_option($this->getVersionOptionName(), $msg);

        if ($is_dismissed) {
            return;
        }

        //only display messages if there is a new version of the plugin.
        if (version_compare($this->plugin_info->version, $this->installed_version, '>')) {
            //Dismiss code idea below is obtained from the Gravity Forms Plugin by rocketgenius.com
            ob_start();
            ?>
            <div class="updated" style="padding:15px; position:relative;" id="pu_dashboard_message">
                <?php echo wp_kses($msg, AllowedTags::getAllowedTags()); ?>
                <a class="button button--secondary"
                   href="javascript:void(0);"
                   onclick="PUDismissUpgrade();"
                   style='float:right;'
                >
                    <?php esc_html_e('Dismiss') ?>
                </a>
                <div style="clear:both;"></div>
            </div>
            <script type="text/javascript">
                function PUDismissUpgrade() {
                    jQuery("#pu_dashboard_message").slideUp();
                    jQuery.post(ajaxurl, {
                        action: "<?php echo esc_js($this->dismiss_upgrade); ?>",
                        version: "<?php echo esc_js($this->plugin_info->version); ?>",
                        cookie: encodeURIComponent(document.cookie)
                    });
                }
            </script>
            <?php
            echo ob_get_clean();
        }
    }


    /**
     * This admin_notice shows a message immediately to users who have successfully entered a valid api_key and
     * allows them to click a button to get the premium version.
     * Note: we'll alternatively display any json errors that may be present from the returned package.
     *
     * @deprecated 4.10.37.p
     * @return void
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
        if (empty($current_screen)) {
            set_current_screen();
        }

        //check if we're on the wp update page.  If so get out
        if ($current_screen->id === 'update') {
            return;
        }

        $update_dismissed      = get_site_option($this->dismiss_upgrade);
        $is_dismissed          = ! empty($update_dismissed)
                                 && ! empty($this->plugin_info)
                                 && in_array($this->plugin_info->version, $update_dismissed);
        $show_dismissal_button = false;

        //first any json errors?
        if (! empty($this->plugin_info) && isset($this->plugin_info->api_invalid)) {
            if ($is_dismissed) {
                return;
            }
            $msg = str_replace('%plugin_name%', $this->pluginName, $this->plugin_info->api_invalid_message);
            $msg = str_replace('%version%', $this->plugin_info->version, $msg);
            $msg = sprintf(
                       esc_html__(
                           'It appears you\'ve tried entering an api key to upgrade to the premium version of %s, however, the key does not appear to be valid.  This is the message received back from the server:',
                           'event_espresso'
                       ),
                       $this->pluginName
                   ) . '</p><p>' . $msg;
            //let's add an option for plugin developers to display some sort of verification message on their
            // options page.
            update_site_option($this->getVersionOptionName(), $msg);
            $show_dismissal_button = true;
        } else {
            $msg = sprintf(
                esc_html__(
                    'Congratulations!  You have entered in a valid api key for the premium version of %s.  You can click the button below to upgrade to this version immediately.',
                    'event_espresso'
                ),
                $this->pluginName
            );
            delete_site_option($this->getVersionOptionName());
        }

        $button_link = wp_nonce_url(
            self_admin_url('update.php?action=upgrade-plugin&plugin=')
            . $this->pluginFile,
            'upgrade-plugin_' . $this->pluginFile
        );
        $button      =
            '<a href="' . $button_link . '" class="button button--secondary pue-upgrade-now-button" value="no">'
            . esc_html__('Upgrade Now', 'event_espresso')
            . '</a>';

        $content = '<div class="updated" style="padding:15px; position:relative;" id="pue_update_now_container"><p>'
                   . $msg . '</p>';
        $content .= empty($this->plugin_info) ? $button : '';
        $content .= $show_dismissal_button
            ? '<a class="button button--secondary" href="javascript:void(0);" onclick="PUDismissUpgrade();" '
              . 'style="float:right;">' . esc_html__('Dismiss') . '</a>'
            : '';
        $content .= '<div style="clear:both;"></div></div>';
        $content .= $show_dismissal_button
            ? '<script type="text/javascript">
                function PUDismissUpgrade(){
                    jQuery("#pue_update_now_container").slideUp();
                    jQuery.post( ajaxurl, {action:"'
              . $this->dismiss_upgrade . '", version:"' . $this->plugin_info->version
              . '", cookie: encodeURIComponent(document.cookie)});
                }
                </script>'
            : '';

        echo ($content);
    }


    /**
     * Callback for ajax action.
     */
    public function dashboard_dismiss_upgrade()
    {
        $os_ary = get_site_option($this->dismiss_upgrade, []);
        if (! is_array($os_ary)) {
            $os_ary = [];
        }
        $os_ary[] = $this->request->getRequestParam('version');
        update_site_option($this->dismiss_upgrade, $os_ary);
    }


    /**
     * Get the currently installed version of the plugin.
     *
     * @return string Version number.
     */
    private function getInstalledVersion()
    {
        if (! function_exists('get_plugin_data')) {
            require_once(ABSPATH . 'wp-admin/includes/plugin.php');
        }
        $plugin_data = get_plugin_data(WP_PLUGIN_DIR . DIRECTORY_SEPARATOR . $this->pluginFile);
        if (! empty($plugin_data)) {
            $this->pluginName  = $plugin_data['Name'];
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
            if (version_compare($this->installed_version, $state->latestVersion, '>=')) {
                return;
            }
        }

        if (empty($state) || ! is_object($state)) {
            $state         = new StdClass();
            $state->update = null;
        }

        $state->lastCheck      = time();
        $state->checkedVersion = $this->installed_version;
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

        // should we checkForUpdates?
        if (
            empty($state)
            || ! isset($state->lastCheck)
            || ((time() - $state->lastCheck) >= $this->checkPeriod * 3600)
        ) {
            $this->checkForUpdates();
        }
    }


    /**
     * Intercept plugins_api() calls that request information about our plugin and
     * use the configured API endpoint to satisfy them.
     *
     * @param mixed  $result
     * @param string $action
     * @param object $args
     * @return mixed
     * @see plugins_api()
     */
    public function injectInfo($result, string $action, $args)
    {
        // ensure the current action and slug are relevant
        if ($action === 'plugin_information' && isset($args->slug) && $args->slug === $this->slug) {
            $state = get_site_option($this->optionName);
            if (isset($state->update)) {
                $state->update->name = $this->pluginName;
                $result              = PluginInfo::fromJson($state->update, true);
                return $result->toWpFormat();
            }
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
     * @param object $updates Update list created by WordPress.
     * @return object Modified update list.
     */
    public function injectUpdate($updates)
    {
        // Fix for update_plugins returning false
        if (! is_object($updates)) {
            $updates = new stdClass();
        }

        $state = get_site_option($this->optionName);

        // first remove any existing WP update message that might have snuck in
        // before we have any return from our plugin server.
        if (isset($updates->response[ $this->pluginFile ])) {
            unset($updates->response[ $this->pluginFile ]);
        }

        //Is there an update to insert?
        if (
            ! empty($state)
            && isset($state->update)
            && ! empty($state->update)
            && version_compare($state->update->version, $this->installed_version, '>')
        ) {
            $updated                                = $state->update->toWPFormat();
            $updated->plugin                        = $this->pluginFile;
            $updates->response[ $this->pluginFile ] = $updated;
        }

        add_action('after_plugin_row_' . $this->pluginFile, [$this, 'in_plugin_update_message']);

        if ($this->plugin_info) {
            remove_action('after_plugin_row_' . $this->pluginFile, 'wp_plugin_update_row');
        }

        return $updates;
    }


    /**
     * Register a callback for filtering query arguments.
     * The callback function should take one argument - an associative array of query arguments.
     * It should return a modified array of query arguments.
     *
     * @param callable $callback
     * @return void
     * @uses add_filter() This method is a convenience wrapper for add_filter().
     */
    public function addQueryArgFilter(callable $callback)
    {
        add_filter('puc_request_info_query_args-' . $this->slug, $callback);
    }


    /**
     * Register a callback for filtering arguments passed to wp_remote_get().
     * The callback function should take one argument - an associative array of arguments -
     * and return a modified array or arguments. See the WP documentation on wp_remote_get()
     * for details on what arguments are available and how they work.
     *
     * @param callable $callback
     * @return void
     * @uses add_filter() This method is a convenience wrapper for add_filter().
     */
    public function addHttpRequestArgFilter(callable $callback)
    {
        add_filter('puc_request_info_options-' . $this->slug, $callback);
    }


    /**
     * Register a callback for filtering the plugin info retrieved from the external API.
     * The callback function should take two arguments. If the plugin info was retrieved
     * successfully, the first argument passed will be an instance of  PluginInfo. Otherwise,
     * it will be NULL. The second argument will be the corresponding return value of
     * wp_remote_get (see WP docs for details).
     * The callback function should return a new or modified instance of PluginInfo or NULL.
     *
     * @param callable $callback
     * @return void
     * @uses add_filter() This method is a convenience wrapper for add_filter().
     */
    public function addResultFilter(callable $callback)
    {
        add_filter('puc_request_info_result-' . $this->slug, $callback, 10, 2);
    }


    private function getVersionOptionName(): string
    {
        return 'puvererr_' . basename($this->pluginFile);
    }


    private function setPueInstallKey()
    {
        $this->pue_install_key = 'pue_install_key_' . $this->slug;
    }

    private function setOptionName()
    {
        $this->optionName = 'external_updates-' . $this->slug;
    }
}
