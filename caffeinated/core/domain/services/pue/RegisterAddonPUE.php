<?php

namespace EventEspresso\caffeinated\core\domain\services\pue;

use EE_Addon;
use EE_Network_Config;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use InvalidArgumentException;
use PluginUpdateEngineChecker;

class RegisterAddonPUE
{
    /**
     * @var array
     */
    private static $addon_api_settings;


    public static function registerPUE(
        array $addon_api_settings,
        string $addon_name,
        string $class_name,
        array $addon_args
    ): array {
        if (! empty($addon_args['pue_options'])) {
            $addon_api_settings[ $addon_name ]['pue_options'] = [
                'pue_plugin_slug' => isset($addon_args['pue_options']['pue_plugin_slug'])
                    ? (string) $addon_args['pue_options']['pue_plugin_slug']
                    : 'espresso_' . strtolower($class_name),
                'plugin_basename' => isset($addon_args['pue_options']['plugin_basename'])
                    ? (string) $addon_args['pue_options']['plugin_basename']
                    : plugin_basename($addon_args['main_file_path']),
                'checkPeriod'     => isset($addon_args['pue_options']['checkPeriod'])
                    ? (string) $addon_args['pue_options']['checkPeriod']
                    : '24',
                'use_wp_update'   => isset($addon_args['pue_options']['use_wp_update'])
                    ? (string) $addon_args['pue_options']['use_wp_update']
                    : false,
            ];
            add_action(
                'AHEE__EE_System__brew_espresso__after_pue_init',
                [RegisterAddonPUE::class, 'loadPueUpdate']
            );
        }
        RegisterAddonPUE::$addon_api_settings = $addon_api_settings;
        return $addon_api_settings;
    }


    public static function setAddonPueSlug(EE_Addon $addon, string $addon_name)
    {
        // setup the add-on's pue_slug if we have one.
        if (! empty($addon_api_settings[ $addon_name ]['pue_options']['pue_plugin_slug'])) {
            $addon->setPueSlug($addon_api_settings[ $addon_name ]['pue_options']['pue_plugin_slug']);
        }
    }


    /**
     *    load_pue_update - Update notifications
     *
     * @return void
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function loadPueUpdate()
    {
        // PUE client existence
        if (! is_readable(EE_THIRD_PARTY . 'pue/pue-client.php')) {
            return;
        }

        /** @var EE_Network_Config $network_config */
        $network_config = LoaderFactory::getLoader()->getShared('EE_Network_Config');
        // load PUE client
        require_once EE_THIRD_PARTY . 'pue/pue-client.php';
        $license_server = defined('PUE_UPDATES_ENDPOINT') ? PUE_UPDATES_ENDPOINT : 'https://eventespresso.com';
        // cycle thru settings
        foreach (RegisterAddonPUE::$addon_api_settings as $settings) {
            if (empty($settings['pue_options'])) {
                continue;
            }
            // initiate the class and start the plugin update engine!
            new PluginUpdateEngineChecker(
            // host file URL
                $license_server,
                // plugin slug(s)
                [
                    'premium'    => ['p' => $settings['pue_options']['pue_plugin_slug']],
                    'prerelease' => ['beta' => $settings['pue_options']['pue_plugin_slug'] . '-pr'],
                ],
                // options
                [
                    'apikey'            => $network_config->core->site_license_key,
                    'lang_domain'       => 'event_espresso',
                    'checkPeriod'       => $settings['pue_options']['checkPeriod'],
                    'option_key'        => 'ee_site_license_key',
                    'options_page_slug' => 'event_espresso',
                    'plugin_basename'   => $settings['pue_options']['plugin_basename'],
                    // if use_wp_update is TRUE it means you want FREE versions of the plugin to be updated from WP
                    'use_wp_update'     => $settings['pue_options']['use_wp_update'],
                ]
            );
        }
    }
}
