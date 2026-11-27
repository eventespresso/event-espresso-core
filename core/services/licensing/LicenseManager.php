<?php

namespace EventEspresso\core\services\licensing;

use EventEspresso\core\domain\services\licensing\LicenseStatus;
use EventEspresso\core\services\database\WordPressOption;
use stdClass;
use WP_Upgrader;

class LicenseManager
{
    /**
     * Filter: false stops subsite activation, for networks that license subsites another way (Event Smart).
     */
    public const ACTIVATE_SUBSITE_LICENSES_FILTER = 'FHEE__EventEspresso_core_services_licensing_LicenseManager__activateSubsiteLicenses__activate';

    /**
     * Per-subsite option with the key fingerprint and time of the last activation attempt for each plugin.
     * Also the name of the lock that keeps runs apart.
     */
    public const SUBSITE_ACTIVATIONS_OPTION = 'ee_subsite_license_activations';

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

        if (! empty($stored->network_managed) && $stored->license_key === $license_key) {
            $current = $this->getLicenseData($plugin_slug);
            if (empty($current->network_managed) || $current->license_key !== $license_key) {
                return $current;
            }
            $license_data->network_managed = true;
        }
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


    /**
     * Activates this subsite's domain on the license key the main site stores for each plugin.
     * EDD links the domain when the key has a free activation and denies it otherwise.
     * The saved answer, a denial included, sets the subsite's license status.
     * Attempts are recorded apart from the license data: a key that is not active is retried about once a day.
     * After an unanswered request the run sends no more requests, but still removes licenses.
     * When the main site has no key for a plugin, the license data this method saved is removed.
     * Runs take a lock, so a late answer can't restore a license that an overlapping run removed.
     *
     * @since 5.0.62
     */
    public function activateSubsiteLicenses(): void
    {
        if (! apply_filters(LicenseManager::ACTIVATE_SUBSITE_LICENSES_FILTER, true)) {
            return;
        }
        require_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';
        if (! WP_Upgrader::create_lock(LicenseManager::SUBSITE_ACTIVATIONS_OPTION, 10 * MINUTE_IN_SECONDS)) {
            return;
        }
        try {
            $network  = $this->license_key_data->mainSiteLicenses();
            $attempts = (array) get_option(LicenseManager::SUBSITE_ACTIVATIONS_OPTION, []);
            $answers  = $this->requestSubsiteActivations($network, $attempts);
            if ($answers) {
                // A network administrator can change keys while EDD is answering.
                $network = $this->license_key_data->mainSiteLicenses();
            }
            foreach ($answers as $slug => $answer) {
                if (($network[ $slug ]->license_key ?? '') === $answer->license_key) {
                    $answer->network_managed = true;
                    $this->updateLicenseData($slug, $answer->license_key, $answer, true);
                }
            }
            $this->removeWithdrawnLicenses($network, $attempts);
        } finally {
            WP_Upgrader::release_lock(LicenseManager::SUBSITE_ACTIVATIONS_OPTION);
        }
    }


    private function requestSubsiteActivations(array $network, array &$attempts): array
    {
        $stored  = $this->license_key_data->getAllLicenses();
        $answers = [];
        foreach ($this->plugin_license_collection as $plugin) {
            if (! $plugin instanceof PluginLicense) {
                continue;
            }
            $slug = $plugin->pluginSlug();
            $key  = $network[ $slug ]->license_key ?? '';
            if (! $key) {
                continue;
            }
            $record = (object) ($stored[ $slug ] ?? []);
            $active = ($record->license_key ?? '') === $key && ($record->license ?? '') === LicenseStatus::VALID;
            $last   = $attempts[ $slug ] ?? [];
            $hash   = hash('sha256', $key);
            // An hour short of a day, so the run that the next daily admin visit queues is not skipped.
            $recent = time() - ($last['time'] ?? 0) < DAY_IN_SECONDS - HOUR_IN_SECONDS;
            if ($active || (($last['key_hash'] ?? '') === $hash && $recent)) {
                continue;
            }
            $attempts[ $slug ] = ['key_hash' => $hash, 'time' => time()];
            update_option(LicenseManager::SUBSITE_ACTIVATIONS_OPTION, $attempts, false);
            $answer = $this->license_api->postRequest(
                LicenseAPI::ACTION_ACTIVATE,
                $key,
                $plugin->itemID(),
                $plugin->itemName(),
                $plugin->version(),
                $plugin->minCoreVersion()
            );
            if (! isset($answer->license)) {
                break;
            }
            $answer->license_key = $key;
            $answers[ $slug ]    = $answer;
        }
        return $answers;
    }


    private function removeWithdrawnLicenses(array $network, array $attempts): void
    {
        $remaining = $attempts;
        $licenses  = $this->license_key_data->getAllLicenses();
        foreach (array_unique(array_merge(array_keys($licenses), array_keys($attempts))) as $slug) {
            if (! empty($network[ $slug ]->license_key)) {
                continue;
            }
            $record = (object) ($licenses[ $slug ] ?? []);
            if (
                ! empty($record->network_managed)
                && $this->license_key_data->removeLicenseDataForPlugin($slug) === WordPressOption::UPDATE_ERROR
            ) {
                continue;
            }
            unset($remaining[ $slug ]);
        }
        if ($remaining !== $attempts) {
            update_option(LicenseManager::SUBSITE_ACTIVATIONS_OPTION, $remaining, false);
        }
    }


    public function getLicenseData(string $plugin_slug): stdClass
    {
        return $this->license_key_data->getLicenseDataForPlugin($plugin_slug);
    }


    public function getVersionInfo(): stdClass
    {
        return $this->license_api->getProductVersions(
            $this->plugin_license_collection->productsVersionInfo()
        );
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
