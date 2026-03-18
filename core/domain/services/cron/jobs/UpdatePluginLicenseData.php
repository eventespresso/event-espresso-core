<?php

namespace EventEspresso\core\domain\services\cron\jobs;

use EE_Dependency_Map;
use EventEspresso\core\domain\services\cron\CronJob;
use EventEspresso\core\services\licensing\LicenseAPI;
use EventEspresso\core\services\licensing\LicenseKeyData;
use EventEspresso\core\services\licensing\LicenseManager;
use EventEspresso\core\services\licensing\PluginLicense;
use EventEspresso\core\services\licensing\PluginLicenseCollection;

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
        add_action(UpdatePluginLicenseData::HOOK, [$this, 'checkPluginLicensesOnShutdown']);
        if (! wp_next_scheduled(UpdatePluginLicenseData::HOOK) && ! wp_installing()) {
            $one_am = strtotime('1:00') + (int) ((float) get_option('gmt_offset', 0) * HOUR_IN_SECONDS);
            wp_schedule_event($one_am, 'daily', UpdatePluginLicenseData::HOOK);
        }
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
        /** @var LicenseManager $licence_manager */
        $licence_manager = $this->loader->getShared(LicenseManager::class);
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
            if (empty($stored_data->license_key)) {
                continue;
            }
            $licence_manager->checkLicense(
                $stored_data->license_key,
                $plugin_license->itemID(),
                $plugin_license->itemName(),
                $plugin_license->pluginSlug(),
                $plugin_license->version(),
                $plugin_license->minCoreVersion(),
                true
            );
        }
    }
}
