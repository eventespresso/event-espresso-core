<?php

namespace EventEspresso\core\domain\services\cron;

use EE_Dependency_Map;
use EE_Messages_Scheduler;
use EventEspresso\core\domain\services\cron\jobs\ExpiredTransactionCheck;
use EventEspresso\core\domain\services\cron\jobs\GarbageCollection;
use EventEspresso\core\domain\services\cron\jobs\UpdateTransactionsWithPayment;
use EventEspresso\core\services\loaders\LoaderInterface;

class CronManager
{
    protected LoaderInterface $loader;


    public function __construct(LoaderInterface $loader)
    {
        $this->loader = $loader;
        $this->registerDependencies();
    }


    public function registerDependencies()
    {
        $cron_jobs = [
            ExpiredTransactionCheck::class,
            GarbageCollection::class,
            UpdateTransactionsWithPayment::class,
        ];
        foreach ($cron_jobs as $cronJob) {
            EE_Dependency_Map::register_dependencies(
                $cronJob,
                [LoaderInterface::class => EE_Dependency_Map::load_from_cache]
            );
        }
    }


    public function loadCronJobs()
    {
        $this->loadExpiredTransactionCheck();
        $this->loadGarbageCollection();
        $this->loadUpdateTransactionsWithPayment();
        $this->loadMessagesScheduler();
    }


    private function loadExpiredTransactionCheck()
    {
        /** @var ExpiredTransactionCheck $cron_job */
        $cron_job = $this->loader->getShared(ExpiredTransactionCheck::class);
        $cron_job->setHooks();
    }


    private function loadGarbageCollection()
    {
        /** @var GarbageCollection $cron_job */
        $cron_job = $this->loader->getShared(GarbageCollection::class);
        $cron_job->setHooks();
    }


    private function loadUpdateTransactionsWithPayment()
    {
        /** @var UpdateTransactionsWithPayment $cron_job */
        $cron_job = $this->loader->getShared(UpdateTransactionsWithPayment::class);
        $cron_job->setHooks();
    }


    private function loadMessagesScheduler()
    {
        /** @var EE_Messages_Scheduler $cron_job */
        $cron_job = $this->loader->getShared(EE_Messages_Scheduler::class);
        $cron_job->setHooks();
    }
}
