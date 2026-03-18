<?php

namespace EventEspresso\core\services\licensing;

use stdClass;

/**
 * Consolidates per-plugin update checks into a single batch request.
 *
 * Hooks `pre_set_site_transient_update_plugins` at priority 1 (before individual
 * PluginUpdater instances at priority 10) to make one HTTP POST with a `products`
 * array to the EDD license server, then populates each PluginUpdater's per-plugin
 * cache so they read locally instead of calling home individually.
 *
 * @package    Event Espresso
 * @subpackage Licensing
 * @since      5.0.56
 */
class BatchPluginUpdateChecker
{
    private const FAILED_REQUEST_OPTION = 'ee_batch_update_failed_http';

    private LicenseAPI $license_api;

    private PluginLicenseCollection $plugin_license_collection;


    /**
     * @param LicenseAPI              $license_api
     * @param PluginLicenseCollection $plugin_license_collection
     */
    public function __construct(
        LicenseAPI $license_api,
        PluginLicenseCollection $plugin_license_collection
    ) {
        $this->license_api               = $license_api;
        $this->plugin_license_collection = $plugin_license_collection;
    }


    /**
     * Registers the batch update check filter at priority 1,
     * before individual PluginUpdater::checkUpdate() at default priority 10.
     *
     * @return void
     */
    public function setHooks(): void
    {
        add_filter('pre_set_site_transient_update_plugins', [$this, 'checkForUpdates'], 1);
    }


    /**
     * Makes a single batch request for all EDD-licensed plugins and populates
     * each PluginUpdater's per-plugin cache from the response.
     *
     * @param array|stdClass $transient_data Update array built by WordPress.
     * @return array|stdClass The transient data, passed through unchanged.
     */
    public function checkForUpdates($transient_data)
    {
        // if all per-plugin caches are still valid, skip the batch request
        if ($this->allCachesValid()) {
            return $transient_data;
        }

        // check for recent failed request backoff
        if ($this->requestRecentlyFailed()) {
            return $transient_data;
        }

        // build the products array from the collection
        $products = $this->buildProductsArray();
        if (empty($products)) {
            return $transient_data;
        }

        // make the batch request
        $response = $this->license_api->getProductVersions($products);

        // detect failure: getProductVersions() returns an empty stdClass on error
        if (empty(get_object_vars($response))) {
            $this->logFailedRequest();
            return $transient_data;
        }

        // populate each plugin's per-plugin cache from the batch response
        $this->populatePluginCaches($response);

        return $transient_data;
    }


    /**
     * Checks if all per-plugin caches are still valid.
     *
     * @return bool True if all caches are valid, false if any need refreshing.
     */
    private function allCachesValid(): bool
    {
        foreach ($this->plugin_license_collection as $plugin_license) {
            if (! $plugin_license instanceof PluginLicense) {
                continue;
            }
            $updater = $plugin_license->updater();
            // skip plugins with no updater (non-admin, non-cron)
            if (! $updater) {
                continue;
            }
            if ($updater->getCachedVersionInfo() === false) {
                return false;
            }
        }
        return true;
    }


    /**
     * Checks if a batch request has recently failed (1-hour backoff).
     *
     * @return bool
     */
    private function requestRecentlyFailed(): bool
    {
        $failed_timestamp = get_option(self::FAILED_REQUEST_OPTION);
        if (empty($failed_timestamp) || ! is_numeric($failed_timestamp)) {
            return false;
        }
        // backoff expired, allow retry
        if (time() > $failed_timestamp) {
            delete_option(self::FAILED_REQUEST_OPTION);
            return false;
        }
        return true;
    }


    /**
     * Logs a failed batch request with a 1-hour backoff.
     *
     * @return void
     */
    private function logFailedRequest(): void
    {
        update_option(self::FAILED_REQUEST_OPTION, strtotime('+1 hour'));
    }


    /**
     * Builds the products array from the PluginLicenseCollection.
     *
     * @return array Keyed by pluginSlug(), with item_id, license, url values.
     */
    private function buildProductsArray(): array
    {
        $products = [];
        foreach ($this->plugin_license_collection as $plugin_license) {
            if (! $plugin_license instanceof PluginLicense) {
                continue;
            }
            $products[ $plugin_license->pluginSlug() ] = [
                'item_id' => $plugin_license->itemID(),
                'license' => $plugin_license->licenseKey(),
                'url'     => home_url(),
            ];
        }
        return $products;
    }


    /**
     * Populates each PluginUpdater's per-plugin cache from the batch response.
     *
     * Matches response keys (plugin slugs) to PluginLicense instances in the
     * collection, then calls setVersionInfoCache() on each updater.
     *
     * @param stdClass $response The batch response keyed by plugin slug.
     * @return void
     */
    private function populatePluginCaches(stdClass $response): void
    {
        foreach ($this->plugin_license_collection as $plugin_license) {
            if (! $plugin_license instanceof PluginLicense) {
                continue;
            }
            $slug = $plugin_license->pluginSlug();
            // skip if the response doesn't include this plugin
            if (! isset($response->$slug)) {
                continue;
            }
            $updater = $plugin_license->updater();
            // skip plugins with no updater
            if (! $updater) {
                continue;
            }
            $version_info = $response->$slug;
            // process the response data to match getVersionFromRemote() output format
            $version_info = $this->processVersionInfo($version_info, $plugin_license);
            if (! $version_info instanceof stdClass) {
                continue;
            }
            $updater->setVersionInfoCache($version_info);
        }
    }


    /**
     * Processes a single plugin's version info from the batch response
     * to match the format produced by PluginUpdater::getVersionFromRemote().
     *
     * Unserializes sections/banners/icons, spreads section values as top-level
     * properties, and sets plugin/id fields for WordPress auto-update support.
     *
     * @param stdClass      $version_info   The raw version info from the batch response.
     * @param PluginLicense $plugin_license The plugin license for context.
     * @return stdClass|null The processed version info, or false if sections are missing.
     */
    private function processVersionInfo(stdClass $version_info, PluginLicense $plugin_license): ?stdClass
    {
        // if sections are missing, skip this plugin (matches getVersionFromRemote() lines 561-565)
        if (! isset($version_info->sections)) {
            return null;
        }

        $version_info->sections = maybe_unserialize($version_info->sections);

        if (isset($version_info->banners)) {
            $version_info->banners = maybe_unserialize($version_info->banners);
        }

        if (isset($version_info->icons)) {
            $version_info->icons = maybe_unserialize($version_info->icons);
        }

        // spread section values as top-level properties (matches getVersionFromRemote() lines 575-578)
        if (! empty($version_info->sections)) {
            foreach ($version_info->sections as $key => $section) {
                $version_info->$key = (array) $section;
            }
        }

        // override the server's slug with the one PluginUpdater derives from the mainfile,
        // so that PluginUpdater::pluginsApiFilter() can match on $args->slug === $this->slug
        $version_info->slug     = basename($plugin_license->mainfile(), '.php');
        $version_info->plugin   = plugin_basename($plugin_license->mainfile());
        return $version_info;
    }
}
