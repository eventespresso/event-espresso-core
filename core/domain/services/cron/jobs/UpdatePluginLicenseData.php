<?php

namespace EventEspresso\core\domain\services\cron\jobs;

use EE_Dependency_Map;
use EE_Network_Config;
use EventEspresso\core\domain\Domain;
use EventEspresso\core\domain\DomainFactory;
use EventEspresso\core\domain\services\cron\CronJob;
use EventEspresso\core\domain\services\licensing\LicenseStatus;
use EventEspresso\core\services\licensing\LicenseAPI;
use EventEspresso\core\services\licensing\LicenseKeyData;
use EventEspresso\core\services\licensing\LicenseManager;
use EventEspresso\core\services\licensing\PluginLicense;
use EventEspresso\core\services\licensing\PluginLicenseCollection;
use stdClass;

/**
 * UpdatePluginLicenseData
 *
 * @package     Event Espresso
 * @subpackage  EventEspresso\core\domain\services\cron\jobs
 * @author      Brent Christensen
 * @since       5.0.40.p
 */
class UpdatePluginLicenseData extends CronJob
{
    public const HOOK = 'AHEE_EventEspresso_core_domain_services_cron_jobs_UpdatePluginLicenseData';


    public function setHooks(): void
    {
        $domain = DomainFactory::getEventEspressoCoreDomain();
        if ($domain->isCaffeinated()) {
            add_action(UpdatePluginLicenseData::HOOK, [$this, 'checkPluginLicensesOnShutdown']);
            if (! wp_next_scheduled(UpdatePluginLicenseData::HOOK) && ! wp_installing()) {
                wp_schedule_event($this->randomizedTimestamp(), 'daily', UpdatePluginLicenseData::HOOK);
            }
        }
    }


    /**
     * randomizes the cron time so that sites don't all hit the server at the same time
     *
     * @return int
     * @since 5.0.57
     */
    private function randomizedTimestamp(): int
    {
        // Generate a (kinda) random value between 3600 (1 hour) and 86399 (hair short of a day) seconds.
        $seconds = rand(HOUR_IN_SECONDS, DAY_IN_SECONDS - 1);
        // derive hour between 0 and 23 from total seconds
        $hours   = intdiv($seconds, HOUR_IN_SECONDS);
        // derive minutes between 0 and 59 from remainder seconds within the hour
        $minutes = intdiv($seconds % HOUR_IN_SECONDS, MINUTE_IN_SECONDS);
        $timestamp = (int) strtotime(sprintf('%02d:%02d:00', $hours, $minutes));
        $timestamp -= (int) ((float) get_option('gmt_offset', 0) * HOUR_IN_SECONDS);
        return $timestamp <= time() ? $timestamp + DAY_IN_SECONDS : $timestamp;
    }


    public function checkPluginLicensesOnShutdown(): void
    {
        // run license checks on shutdown so they don't interfere with the rest of the request
        add_action('shutdown', [$this, 'checkPluginLicenses']);
    }


    /**
     * Checks the license status for all registered EDD-licensed plugins (core + add-ons).
     * Runs daily via cron on shutdown so sequential API calls don't block user requests.
     *
     * @since 5.0.56
     */
    public function checkPluginLicenses(): void
    {
        EE_Dependency_Map::instance()->registerDependencies(
            LicenseManager::class,
            [
                LicenseAPI::class              => EE_Dependency_Map::load_from_cache,
                LicenseKeyData::class          => EE_Dependency_Map::load_from_cache,
                PluginLicenseCollection::class => EE_Dependency_Map::load_from_cache,
            ]
        );
        /** @var LicenseManager $license_manager */
        $license_manager = $this->loader->getShared(LicenseManager::class);
        /** @var LicenseKeyData $license_key_data */
        $license_key_data = $this->loader->getShared(LicenseKeyData::class);
        /** @var PluginLicenseCollection $plugin_license_collection */
        $plugin_license_collection = $this->loader->getShared(PluginLicenseCollection::class);

        foreach ($plugin_license_collection as $plugin_license) {
            if (! $plugin_license instanceof PluginLicense) {
                continue;
            }
            // get stored license key from DB since it may not be loaded on the object during cron
            $stored_data = $license_key_data->getLicenseDataForPlugin($plugin_license->pluginSlug());
            $license_key = $this->refreshPluginLicenseData($license_key_data, $plugin_license, $stored_data);
            if (empty($license_key)) {
                continue;
            }
            $license_manager->checkLicense(
                $license_key,
                $plugin_license->itemID(),
                $plugin_license->itemName(),
                $plugin_license->pluginSlug(),
                $plugin_license->version(),
                $plugin_license->minCoreVersion(),
                true
            );
        }
    }


    /**
     * updates the license key and status for this plugin
     * using the license data previously saved in the database
     *
     * @param LicenseKeyData $license_key_data
     * @param PluginLicense  $plugin_license
     * @param stdClass       $stored_data
     * @return string
     * @since 5.0.57
     */
    private function refreshPluginLicenseData(
        LicenseKeyData $license_key_data,
        PluginLicense $plugin_license,
        stdClass $stored_data
    ): string {
        $license_key = $stored_data->license_key ?: $plugin_license->licenseKey();
        $update      = ! isset($stored_data->license) || $stored_data->license === 'none';
        if (! $license_key) {
            $license_key = $this->getCoreLicenseKey($license_key_data);
            $update      = $update || $license_key !== '';
            if ($license_key) {
                $plugin_license->setLicenseKey($license_key);
            }
        }
        $license_status = $stored_data->license ?? '';
        if ($license_status && empty($plugin_license->status())) {
            $plugin_license->setStatus($license_status);
        }
        return $update && $plugin_license->hasLicenseKey() ? $license_key : '';
    }


    /**
     * @param LicenseKeyData $license_key_data
     * @return string
     * @since 5.0.57
     */
    private function getCoreLicenseKey(LicenseKeyData $license_key_data): string
    {
        static $core_license_key = null;
        if ($core_license_key === null) {
            $network_config = $this->loader->getShared(EE_Network_Config::class);
            $core_license   = $license_key_data->getLicenseDataForPlugin(Domain::LICENSE_PLUGIN_SLUG);
            if (
                isset($core_license->license_key) && $core_license->license === LicenseStatus::VALID
            ) {
                $core_license_key = $core_license->license_key;
            } elseif (! empty($network_config->core->site_license_key)) {
                $core_license_key = $network_config->core->site_license_key;
            } else {
                $core_license_key = '';
            }
        }
        return (string) $core_license_key;
    }
}
