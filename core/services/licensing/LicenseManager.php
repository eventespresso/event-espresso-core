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
    ): stdCLass {
        $license_data              = $this->license_api->postRequest(
            LicenseAPI::ACTION_ACTIVATE,
            $license_key,
            $item_id,
            $item_name,
            $plugin_version,
            $min_core_version
        );
        $license_data->license_key = $license_data->license === 'valid' ? $license_key : '';
        $this->license_key_data->updateLicenseDataForPlugin($license_data, $plugin_slug);
        return $license_data;
    }


    public function deactivateLicense(
        string $license_key,
        string $item_id,
        string $item_name,
        string $plugin_slug,
        string $plugin_version,
        string $min_core_version = ''
    ): stdCLass {
        $license_data = $this->license_api->postRequest(
            LicenseAPI::ACTION_DEACTIVATE,
            $license_key,
            $item_id,
            $item_name,
            $plugin_version,
            $min_core_version
        );
        $this->license_key_data->removeLicenseDataForPlugin($plugin_slug);
        return $license_data;
    }


    public function resetLicenseKey(string $plugin_slug): stdCLass
    {
        $license_data              = $this->getLicenseData($plugin_slug);
        $license_data->license_key = '';
        $this->license_key_data->updateLicenseDataForPlugin($license_data, $plugin_slug, true);
        return $license_data;
    }


    public function checkLicense(
        string $license_key,
        string $item_id,
        string $item_name,
        string $plugin_slug,
        string $plugin_version,
        string $min_core_version = ''
    ): stdCLass {
        $existing_license_data = $this->getLicenseData($plugin_slug);
        $license_data          = $this->license_api->postRequest(
            LicenseAPI::ACTION_CHECK,
            $license_key,
            $item_id,
            $item_name,
            $plugin_version,
            $min_core_version
        );
        $license_data          = (array) $license_data + (array) $existing_license_data;
        return (object) $license_data;
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
}
