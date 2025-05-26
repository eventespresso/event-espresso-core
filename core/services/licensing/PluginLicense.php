<?php

namespace EventEspresso\core\services\licensing;

use EE_Network_Config;
use EventEspresso\core\domain\Domain;
use EventEspresso\core\domain\services\licensing\LicenseKeyFormInput;
use EventEspresso\core\domain\services\licensing\LicenseStatus;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\third_party_libs\easy_digital_downloads\PluginUpdater;
use stdClass;

/**
 * class PluginLicense
 *
 * @since 5.0.20.p
 */
class PluginLicense
{
    private ?LicenseKeyData $license_key_data = null;

    private ?PluginUpdater $updater = null;

    private string $license_key = '';

    private string $mainfile;

    private string $min_core_version;

    private string $plugin_id;

    private string $plugin_name;

    private string $plugin_slug;

    private string $status = '';

    private string $version;

    private bool $beta;

    private bool $initialized = false;

    private bool $wp_override;

    private static array $slug_prefixes = ['ee-', 'eea-', 'eep-', 'espresso-', 'ee_', 'eea_', 'eep_', 'espresso_'];


    public function __construct(
        string $mainfile,
        string $plugin_id,
        string $plugin_name,
        string $plugin_slug,
        string $version,
        bool $beta = false,
        bool $wp_override = false,
        string $min_core_version = ''
    ) {
        $this->mainfile         = $mainfile;
        $this->plugin_id        = $plugin_id;
        $this->plugin_name      = $plugin_name;
        $this->version          = $version;
        $this->beta             = $beta;
        $this->wp_override      = $wp_override;
        $this->plugin_slug      = $this->removePluginSlugPrefixes($plugin_slug);
        $this->min_core_version = $min_core_version;
    }


    public function setHooks(): void
    {
        // only set hooks ONCE!
        if ($this->initialized) {
            return;
        }
        add_action('init', [$this, 'loadPluginUpdater']);
        add_action('admin_init', [$this, 'refreshPluginLicenseData'], 99);
        add_action(
            'AHEE__EventEspresso_core_services_licensing_PluginLicenseCollection__loadPluginLicenses',
            [$this, 'loadPluginLicense']
        );
        add_filter(
            'FHEE__LicenseKeysAdminForm__generate__form_subsections',
            [$this, 'addLicenseKeyFormSection']
        );
        add_filter(
            'edd_sl_plugin_updater_api_params',
            [$this, 'addCustomApiParams'],
            10,
            2
        );
        $this->initialized = true;
    }


    /**
     * removes unnecessary prefixes from plugin slugs
     *
     * @param string $plugin_slug
     * @return string
     */
    private function removePluginSlugPrefixes(string $plugin_slug): string
    {
        foreach (self::$slug_prefixes as $slug_prefix) {
            if (strpos($plugin_slug, $slug_prefix) === 0) {
                $plugin_slug = str_replace($slug_prefix, '', $plugin_slug);
            }
        }
        return $plugin_slug;
    }


    /**
     * @return PluginUpdater|null
     */
    public function updater(): ?PluginUpdater
    {
        return $this->updater;
    }


    /**
     * @return string
     */
    public function itemID(): string
    {
        return $this->plugin_id;
    }


    /**
     * @return string
     */
    public function itemName(): string
    {
        return $this->plugin_name;
    }


    private function getLicenseKeyData(): stdClass
    {
        if (! $this->license_key_data instanceof LicenseKeyData) {
            $this->license_key_data = LoaderFactory::getShared(LicenseKeyData::class);
        }
        return $this->license_key_data->getLicenseDataForPlugin($this->pluginSlug());
    }


    /**
     * @return bool
     */
    public function hasLicenseKey(): bool
    {
        return ! empty($this->license_key);
    }


    /**
     * @return bool
     */
    public function isMissingLicenseKey(): bool
    {
        return empty($this->license_key);
    }


    /**
     * @return string
     */
    public function licenseKey(): string
    {
        return $this->license_key;
    }


    /**
     * !!! IMPORTANT !!!
     * This method only sets the license key for this plugin,
     * it does not persist the change to the database.
     * To persist the change, use LicenseKeyData::updateLicenseDataForPlugin(),
     * or call one of the methods on LicenseManager
     * which will also send the change to EDD on the server.
     *
     * @param string $license_key
     */
    public function setLicenseKey(string $license_key): void
    {
        $this->license_key = sanitize_text_field($license_key);
    }


    /**
     * @return string
     */
    public function mainfile(): string
    {
        return $this->mainfile;
    }


    /**
     * @return string
     * @since 5.0.20.p
     */
    public function minCoreVersion(): string
    {
        return $this->min_core_version;
    }


    /**
     * @return string
     */
    public function pluginSlug(): string
    {
        return $this->plugin_slug;
    }


    public function status(): string
    {
        return $this->status;
    }


    public function setStatus(string $status): void
    {
        $this->status = $status;
    }


    /**
     * @return string
     */
    public function version(): string
    {
        return $this->version;
    }


    /**
     * @return bool
     */
    public function isBeta(): bool
    {
        return $this->beta;
    }


    /**
     * @return bool
     */
    public function isWpOverride(): bool
    {
        return $this->wp_override;
    }


    public function loadPluginUpdater()
    {
        // To support auto-updates, this needs to run during the wp_version_check cron job for privileged users.
        if (! current_user_can('manage_options') && ! (defined('DOING_CRON') && DOING_CRON)) {
            return;
        }

        $license_data = $this->getLicenseKeyData();
        $license_key  = $license_data->license_key ?? '';
        if ($license_key && $this->isMissingLicenseKey()) {
            $this->setLicenseKey($license_key);
        }

        $this->updater = new PluginUpdater(
            LicenseAPI::url(),
            $this->mainfile(),
            [
                'author'      => LicenseAPI::AUTHOR,
                'beta'        => $this->isBeta(),
                'item_id'     => $this->itemID(),
                'item_name'   => $this->itemName(),
                'license'     => $this->licenseKey(),
                'version'     => $this->version(),
                'wp_override' => $this->isWpOverride(),
            ]
        );
    }


    public function loadPluginLicense(PluginLicenseCollection $plugin_license_collection)
    {
        $plugin_license_collection->add($this, $this->pluginSlug());
    }


    public function addLicenseKeyFormSection(array $license_keys_form_subsections): array
    {
        if (is_main_site()) {
            $license_keys_form_subsections[ $this->pluginSlug() ] = LoaderFactory::getNew(
                LicenseKeyFormInput::class,
                [$this]
            );
        }
        return $license_keys_form_subsections;
    }


    public function addCustomApiParams($api_params, $api_data)
    {
        if ($api_data['item_name'] === $this->itemName()) {
            $api_params['event_espresso_core_version'] = EVENT_ESPRESSO_VERSION;
            $core_license                              =
                $this->license_key_data->getLicenseDataForPlugin(Domain::LICENSE_PLUGIN_SLUG);
            if (! empty($core_license->license_key)) {
                $api_params['event_espresso_core_license'] = $core_license->license_key;
            }
        }
        return $api_params;
    }


    /**
     * updates the license key and status for this plugin
     * using the license data previously saved in the database
     *
     * @return void
     * @since $VID:$
     */
    public function refreshPluginLicenseData()
    {
        $license_data = $this->getLicenseKeyData();
        $update       = ! isset($license_data->license) || $license_data->license === 'none';
        $license_key  = $license_data->license_key ?? '';
        if ($this->isMissingLicenseKey()) {
            if (! $license_key) {
                $core_license = $this->license_key_data->getLicenseDataForPlugin(Domain::LICENSE_PLUGIN_SLUG);
                if ($core_license->license_key && $core_license->license === LicenseStatus::VALID) {
                    $license_key = $core_license->license_key;
                    $update      = true;
                } else {
                    $network_config = $this->getNetworkConfig();
                    if (! empty($network_config->core->site_license_key)) {
                        $license_key = $network_config->core->site_license_key;
                        $update      = true;
                    }
                }
            }
            if ($license_key) {
                $this->setLicenseKey($license_key);
            }
        }
        $license_status = $license_data->license ?? '';
        if ($license_status && empty($this->status)) {
            $this->setStatus($license_status);
        }
        if ($update && $this->hasLicenseKey()) {
            $licence_manager = $this->getLicenseManager();
            $licence_manager->checkLicense(
                $this->licenseKey(),
                $this->itemID(),
                $this->itemName(),
                $this->pluginSlug(),
                $this->version(),
                $this->minCoreVersion(),
                $this->status()
            );
        }
    }


    private function getNetworkConfig(): EE_Network_Config
    {
        static $network_config = null;
        if (! $network_config instanceof EE_Network_Config) {
            $network_config = LoaderFactory::getShared(EE_Network_Config::class);
        }
        return $network_config;
    }


    private function getLicenseManager(): LicenseManager
    {
        static $licence_manager = null;
        if (! $licence_manager instanceof LicenseManager) {
            $licence_manager = LoaderFactory::getShared(LicenseManager::class);
        }
        return $licence_manager;
    }
}
