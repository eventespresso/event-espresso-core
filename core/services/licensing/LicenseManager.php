<?php

namespace EventEspresso\core\services\licensing;

use stdClass;

class LicenseManager
{
    private LicenseAPI $license_api;

    private LicenseKeyData $license_key_data;

    private PluginLicenseCollection $plugin_license_collection;


    public function __construct(
        LicenseAPI $license_api,
        LicenseKeyData $license_key_data,
        PluginLicenseCollection $plugin_license_collection
    ) {
        $this->license_api               = $license_api;
        $this->license_key_data          = $license_key_data;
        $this->plugin_license_collection = $plugin_license_collection;
    }


    public function activateLicense(
        string $license_key,
        string $item_id,
        string $item_name,
        string $plugin_slug,
        string $plugin_version,
        string $min_core_version = ''
    ): stdClass {
        $license_data = $this->license_api->postRequest(
            LicenseAPI::ACTION_ACTIVATE,
            $license_key,
            $item_id,
            $item_name,
            $plugin_version,
            $min_core_version
        );
        return $this->updateLicenseData(
            $plugin_slug,
            $license_key,
            $license_data
        );
    }


    public function deactivateLicense(
        string $license_key,
        string $item_id,
        string $item_name,
        string $plugin_slug,
        string $plugin_version,
        string $min_core_version = ''
    ): stdClass {
        $license_data = $this->license_api->postRequest(
            LicenseAPI::ACTION_DEACTIVATE,
            $license_key,
            $item_id,
            $item_name,
            $plugin_version,
            $min_core_version
        );
        // if $license_data was updated successfully, then save those chagnes
        if ($license_data->success ?? false) {
            return $this->updateLicenseData($plugin_slug, $license_key, $license_data);
        }
        return $license_data;
    }


    public function resetLicenseKey(string $plugin_slug): stdClass
    {
        $license_data              = $this->getLicenseData($plugin_slug);
        $license_data->license_key = '';
        $this->updateLicenseData($plugin_slug, '', $license_data, true);
        return $license_data;
    }


    public function checkLicense(
        string $license_key,
        string $item_id,
        string $item_name,
        string $plugin_slug,
        string $plugin_version,
        string $min_core_version = '',
        bool $skip_cache = false
    ): stdClass {
        $stored = $this->getLicenseData($plugin_slug);
        if (! $skip_cache) {
            $last_checked = $stored->last_checked ?? 0;
            if ($last_checked && (time() - $last_checked) < DAY_IN_SECONDS) {
                return $stored;
            }
        }
        $license_data = $this->license_api->postRequest(
            LicenseAPI::ACTION_CHECK,
            $license_key,
            $item_id,
            $item_name,
            $plugin_version,
            $min_core_version
        );

        // if $license_data was updated successfully, then save those chagnes
        if ($license_data->success ?? false) {
            return $this->updateLicenseData($plugin_slug, $license_key, $license_data);
        }
        // uh-oh... the API call failed...
        // we still need to update the last_checked timestamp
        // to prevent repeated API calls on every admin request
        // so let's resave the previously stored data after adding the success flag
        $stored->success = true;
        return $this->updateLicenseData($plugin_slug, $license_key, $stored);
    }


    public function getLicenseData(string $plugin_slug): stdClass
    {
        return $this->license_key_data->getLicenseDataForPlugin($plugin_slug);
    }


    public function getVersionInfo(): stdClass
    {
        $products = [];
        foreach ($this->plugin_license_collection as $plugin_license) {
            if (! $plugin_license instanceof PluginLicense) {
                continue;
            }
            $products[ $plugin_license->pluginSlug() ] = [
                'item_id' => $plugin_license->itemId(),
                'license' => $plugin_license->licenseKey(),
                'url'     => LicenseAPI::url(),
            ];
        }
        return $this->license_api->getProductVersions($products);
    }


    /**
     * @param string   $plugin_slug
     * @param string   $license_key
     * @param stdClass $license_data
     * @param bool     $force_update
     * @return stdClass
     * @since 5.0.40.p
     */
    private function updateLicenseData(
        string $plugin_slug,
        string $license_key,
        stdClass $license_data,
        bool $force_update = false
    ): stdClass {
        if (! isset($license_data->license_key)) {
            $license_data->license_key = $license_key;
        }
        $license_data->last_checked = time();
        $this->license_key_data->updateLicenseDataForPlugin($license_data, $plugin_slug, $force_update);
        return $license_data;
    }
}
