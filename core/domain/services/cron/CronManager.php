<?php

namespace EventEspresso\core\domain\services\cron;

use EE_Dependency_Map;
use EE_Messages_Scheduler;
use EventEspresso\core\domain\services\cron\jobs\ExpiredTransactionCheck;
use EventEspresso\core\domain\services\cron\jobs\GarbageCollection;
use EventEspresso\core\domain\services\cron\jobs\UpdatePluginLicenseData;
use EventEspresso\core\domain\services\cron\jobs\UpdateTransactionsWithPayment;
use EventEspresso\core\services\loaders\LoaderInterface;
use RuntimeException;

class CronManager
{
    protected LoaderInterface $loader;

    private static array $cron_jobs = [
        // ExpiredTransactionCheck::class,
        // GarbageCollection::class,
        UpdatePluginLicenseData::class,
        // UpdateTransactionsWithPayment::class,
    ];


    public function __construct(LoaderInterface $loader)
    {
        $this->loader = $loader;

    }

    public function initialize(): void
    {
        $this->registerDependencies();
        $this->loadCronJobs();
        add_action(
            'AHEE__EE_System__load_core_configuration__complete',
            [CronUtilities::class, 'updateMessagesOnSameRequest']
        );
    }


    public function registerDependencies()
    {
        foreach (CronManager::$cron_jobs as $cron_class) {
            EE_Dependency_Map::register_dependencies(
                $cron_class,
                [LoaderInterface::class => EE_Dependency_Map::load_from_cache]
            );
        }
    }


    public function loadCronJobs()
    {
        foreach (CronManager::$cron_jobs as $cron_class) {
            $cron_job = $this->loader->getShared($cron_class);
            if (! $cron_job instanceof CronJob) {
                throw new RuntimeException(
                    sprintf(
                        esc_html__('Class %s must be an instance of %s', 'event_espresso'),
                        $cron_class,
                        CronJob::class
                    )
                );
            }
            $cron_job->setHooks();
        }
        // will also need to load EE_Messages_Scheduler::class separately, because it's "special"
    }
}
