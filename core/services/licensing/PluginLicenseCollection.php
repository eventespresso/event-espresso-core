<?php

namespace EventEspresso\core\services\licensing;

use EventEspresso\core\services\collections\Collection;
use EventEspresso\core\third_party_libs\easy_digital_downloads\PluginUpdater;

class PluginLicenseCollection extends Collection
{
    const COLLECTION_NAME = 'plugin licenses';


    public function __construct()
    {
        parent::__construct(PluginLicense::class, PluginLicenseCollection::COLLECTION_NAME);
        add_action('init', [$this, 'loadPluginLicenses'], 99);
    }


    public function loadPluginLicenses()
    {
        do_action(
            'AHEE__EventEspresso_core_services_licensing_PluginLicenseCollection__loadPluginLicenses',
            $this
        );
    }


    /**
     * Builds the `products` array for an EDD batch get_version request.
     * EDD reads each product on its own and ignores top-level values,
     * so every product carries the same keys as a single get_version request,
     * including those added by the edd_sl_plugin_updater_api_params filter.
     *
     * @return array Keyed by pluginSlug().
     * @since  5.0.61
     */
    public function productsVersionInfo(): array
    {
        // send the site home URL as the activation url
        $site_data = [
            'php_version' => phpversion(),
            'url'         => home_url(),
            'wp_version'  => get_bloginfo('version'),
        ];
        $products  = [];
        foreach ($this as $plugin_license) {
            if (! $plugin_license instanceof PluginLicense) {
                continue;
            }
            $products[ $plugin_license->pluginSlug() ] = apply_filters(
                'edd_sl_plugin_updater_api_params',
                [
                    'beta'      => $plugin_license->isBeta(),
                    'item_id'   => $plugin_license->itemID(),
                    'item_name' => $plugin_license->itemName(),
                    'license'   => $plugin_license->licenseKey(),
                    'slug'      => PluginUpdater::derivePluginSlug($plugin_license->mainfile()),
                    'version'   => $plugin_license->version(),
                ] + $site_data,
                $plugin_license->updaterApiData(),
                $plugin_license->mainfile()
            );
        }
        return $products;
    }
}
