<?php

namespace EventEspresso\core\domain\services\cron\jobs;

use EventEspresso\core\domain\DomainFactory;
use EventEspresso\core\domain\services\cron\CronJob;
use EventEspresso\core\services\licensing\LicenseKeyData;
use EventEspresso\core\services\licensing\LicenseManager;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * ActivateSubsiteLicenses
 * Runs a multisite subsite's license activations in a background cron request.
 *
 * @package     Event Espresso
 * @subpackage  EventEspresso\core\domain\services\cron\jobs
 * @since       5.0.62
 */
class ActivateSubsiteLicenses extends CronJob
{
    public const HOOK = 'AHEE_EventEspresso_core_domain_services_cron_jobs_ActivateSubsiteLicenses';


    public function setHooks(): void
    {
        add_action(ActivateSubsiteLicenses::HOOK, [$this, 'activateSubsiteLicenses']);
    }


    /**
     * Queues an activation run on a caffeinated subsite at most once a day, unless the filter turns activation off.
     * Waits until the main site has a license key, so a visit before then does not delay activation for a day.
     */
    public static function schedule(): void
    {
        if (
            is_multisite()
            && ! is_main_site()
            && DomainFactory::getEventEspressoCoreDomain()->isCaffeinated()
            && apply_filters(LicenseManager::ACTIVATE_SUBSITE_LICENSES_FILTER, true)
            && ! get_transient(ActivateSubsiteLicenses::HOOK)
            && array_filter(
                array_column(LoaderFactory::getShared(LicenseKeyData::class)->mainSiteLicenses(), 'license_key')
            )
            && (
                wp_next_scheduled(ActivateSubsiteLicenses::HOOK)
                || wp_schedule_single_event(time(), ActivateSubsiteLicenses::HOOK)
            )
        ) {
            set_transient(ActivateSubsiteLicenses::HOOK, time(), DAY_IN_SECONDS);
        }
    }


    public function activateSubsiteLicenses(): void
    {
        /** @var LicenseManager $license_manager */
        $license_manager = $this->loader->getShared(LicenseManager::class);
        $license_manager->activateSubsiteLicenses();
    }
}
