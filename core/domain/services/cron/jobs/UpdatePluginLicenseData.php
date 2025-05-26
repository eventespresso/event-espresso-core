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
 * @since       $VID:$
 */
class UpdatePluginLicenseData extends CronJob
{
    public const HOOK = 'AHEE_EventEspresso_core_domain_services_cron_jobs_UpdatePluginLicenseData';


    public function setHooks(): void
    {
        add_action(UpdatePluginLicenseData::HOOK, [$this, 'checkCoreLicenseOnShutdown']);
        if (! wp_next_scheduled(UpdatePluginLicenseData::HOOK) && ! wp_installing()) {
            $one_am = strtotime('1:00') + (int) ((float) get_option('gmt_offset', 0) * HOUR_IN_SECONDS);
            wp_schedule_event($one_am, 'daily', UpdatePluginLicenseData::HOOK);
        }
    }


    public function checkCoreLicenseOnShutdown(): void
    {
        // run license check on shutdown so it doesn't interfere with the rest of the request
        add_action('shutdown', [$this, 'checkCoreLicense']);
    }


    public function checkCoreLicense(): void
    {
        EE_Dependency_Map::instance()->registerDependencies(
            LicenseManager::class,
            [
                LicenseAPI::class              => EE_Dependency_Map::load_from_cache,
                LicenseKeyData::class          => EE_Dependency_Map::load_from_cache,
                PluginLicenseCollection::class => EE_Dependency_Map::load_from_cache,
            ]
        );
        /** @var PluginLicense $core_license */
        $core_license = $this->loader->getShared(PluginLicense::class);
        /** @var LicenseManager $licence_manager */
        $licence_manager = $this->loader->getShared(LicenseManager::class);
        $licence_manager->checkLicense(
            $core_license->licenseKey(),
            $core_license->itemID(),
            $core_license->itemName(),
            $core_license->pluginSlug(),
            $core_license->version(),
            $core_license->minCoreVersion(),
            $core_license->status()
        );
    }
}
