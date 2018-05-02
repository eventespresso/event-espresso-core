<?php

namespace EventEspresso\core\services\licensing;

use EventEspresso\core\domain\services\pue\Stats;
use EventEspresso\core\domain\services\pue\Config;
use PluginUpdateEngineChecker;

/**
 * LicenseService
 *
 * @package EventEspresso\core\services\licensing
 * @author  Darren Ethier
 * @since   4.9.59.p
 */
class LicenseService
{
    /**
     * @var Config
     */
    private $config;


    /**
     * @var Stats
     */
    private $stats_collection;

    public function __construct(Stats $stats_collection, Config $config)
    {
        $this->config = $config;
        $this->stats_collection = $stats_collection;
        $this->loadPueClient();
    }

    private function loadPueClient()
    {
        // PUE Auto Upgrades stuff
        if (is_readable(EE_THIRD_PARTY . 'pue/pue-client.php')) { // include the file
            require_once(EE_THIRD_PARTY . 'pue/pue-client.php');

            // $options needs to be an array with the included keys as listed.
            $options = array(
                // 'optionName' => '', //(optional) - used as the reference for saving update information in the
                // clients options table.  Will be automatically set if left blank.
                'apikey'                => $this->config->siteLicenseKey(),
                // (required), you will need to obtain the apikey that the client gets from your site and
                // then saves in their sites options table (see 'getting an api-key' below)
                'lang_domain'           => $this->config->i18nDomain(),
                // (optional) - put here whatever reference you are using for the localization of your plugin (if it's
                // localized).  That way strings in this file will be included in the translation for your plugin.
                'checkPeriod'           => $this->config->checkPeriod(),
                // (optional) - use this parameter to indicate how often you want the client's install to ping your
                // server for update checks.  The integer indicates hours.  If you don't include this parameter it will
                // default to 12 hours.
                'option_key'            => $this->config->optionKey(),
                // this is what is used to reference the api_key in your plugin options.  PUE uses this to trigger
                // updating your information message whenever this option_key is modified.
                'options_page_slug'     => $this->config->optionsPageSlug(),
                'plugin_basename'       => EE_PLUGIN_BASENAME,
                'use_wp_update'         => true,
                // if TRUE then you want FREE versions of the plugin to be updated from WP
                'extra_stats'           => $this->stats_collection->statsCallback(),
                'turn_on_notices_saved' => true,
            );
            // initiate the class and start the plugin update engine!
            new PluginUpdateEngineChecker(
                $this->config->hostServerUrl(),
                $this->config->pluginSlug(),
                $options
            );
        }
    }


    /**
     * This is a handy helper method for retrieving whether there is an update available for the given plugin.
     *
     * @param  string $basename Use the equivalent result from plugin_basename() for this param as WP uses that to
     *                          identify plugins. Defaults to core update
     * @return boolean           True if update available, false if not.
     */
    public static function isUpdateAvailable($basename = '')
    {
        $basename = ! empty($basename) ? $basename : EE_PLUGIN_BASENAME;

        $update = false;

        // should take "event-espresso-core/espresso.php" and change to "/event-espresso-core"
        $folder = DS . dirname($basename);

        $plugins = get_plugins($folder);
        $current = get_site_transient('update_plugins');

        foreach ((array) $plugins as $plugin_file => $plugin_data) {
            if (isset($current->response['plugin_file'])) {
                $update = true;
            }
        }

        // it's possible that there is an update but an invalid site-license-key is in use
        if (get_site_option('pue_json_error_' . $basename)) {
            $update = true;
        }

        return $update;
    }
}
