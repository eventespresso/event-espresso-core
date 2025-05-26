<?php

namespace EventEspresso\core\domain\services\cron;

use EventEspresso\core\services\loaders\LoaderInterface;

abstract class CronJob
{
    /**
     * WordPress doesn't allow duplicate crons within 10 minutes of the original,
     * so we'll set our retry time for just over 10 minutes to avoid that
     */
    public const RESCHEDULE_TIMEOUT = 605;


    protected LoaderInterface $loader;


    /**
     * @param LoaderInterface $loader
     */
    public function __construct(LoaderInterface $loader)
    {
        $this->loader = $loader;
    }


    abstract public function setHooks(): void;
}
