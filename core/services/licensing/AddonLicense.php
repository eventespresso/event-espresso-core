<?php

namespace EventEspresso\core\services\licensing;

use EventEspresso\core\domain\services\capabilities\FeatureFlags;
use EventEspresso\core\domain\services\licensing\AddonEddData;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * Class AddonLicense
 *
 * Generates PluginLicense objects for add-ons.
 * Retrieves the plugin name from its main file path if needed.
 *
 * @package EventEspresso\core\services\licensing
 * @author  Brent Christensen  Tony Warwick
 * @since   5.0.20.p
 */
class AddonLicense
{
    public static function register(string $addon_name, array $license_data)
    {
        if (! $addon_name || ! $license_data) {
            return;
        }
        // also bail if the feature flag is not enabled
        $feature = LoaderFactory::getShared(FeatureFlags::class);
        if (! $feature->allowed('use_edd_plugin_licensing')) {
            return;
        }
        $main_file_path = $license_data['main_file_path'] ?? '';
        $main_file_slug = AddonLicense::derivePluginSlugFromMainFile($main_file_path);
        // use values from addon IF SET
        $plugin_slug = $license_data['plugin_slug'] ?? '';
        $plugin_id   =  $license_data['plugin_id'] ?? 0;
        $plugin_name =  $license_data['plugin_name'] ?? '';

        // if the plugin ID has been set to ZERO, then we are using a pre-EDD plugin,
        // so use the plugin slug derived from the main file path.
        // also try to derive the plugin ID and name from the plugin slug.
        // set the plugin name first else we can't check if plugin id is 0 !!!
        $plugin_slug = $plugin_id && $plugin_slug ? $plugin_slug : $main_file_slug;
        $plugin_name = $plugin_id && $plugin_name ? $plugin_name : AddonEddData::getPluginItemName($main_file_slug);
        $plugin_id   = $plugin_id ?: AddonEddData::getPluginItemID($main_file_slug);

        // ensure defaults are set
        $license_data = [
            'beta'             => false,
            'main_file_path'   => $license_data['main_file_path'] ?? '',
            'min_core_version' => $license_data['min_core_version'] ?? '',
            'plugin_id'        => $plugin_id,
            'plugin_name'      => $plugin_name,
            'plugin_slug'      => $plugin_slug,
            'version'          => $license_data['version'],
            'wp_override'      => false,
        ];

        // Bail if we still don't have a plugin ID.
        if (empty($license_data['plugin_id'])) {
            return;
        }

        $addon_license = new PluginLicense(
            $license_data['main_file_path'],
            $license_data['plugin_id'],
            $license_data['plugin_name'],
            $license_data['plugin_slug'],
            $license_data['version'],
            $license_data['beta'],
            $license_data['wp_override'],
            $license_data['min_core_version']
        );
        $addon_license->setHooks();
    }


    private static function derivePluginSlugFromMainFile(string $main_file_path): string
    {
        return wp_basename($main_file_path, '.php');
    }
}
