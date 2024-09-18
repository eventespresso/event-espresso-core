<?php

namespace EventEspresso\core\domain\services\cron;

use EventEspresso\core\services\loaders\LoaderInterface;

abstract class CronJob
{
    protected LoaderInterface $loader;


    /**
     * @param LoaderInterface $loader
     */
    public function __construct(LoaderInterface $loader)
    {
        $this->loader = $loader;
    }
}
