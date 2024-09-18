<?php

namespace EventEspresso\core\services\licensing;

use EventEspresso\core\services\collections\Collection;

class PluginLicenseCollection extends Collection
{
    const COLLECTION_NAME = 'plugin licenses';


    public function __construct()
    {
        parent::__construct(PluginLicense::class, PluginLicenseCollection::COLLECTION_NAME);
        add_action('init', [$this, 'loadPluginLicenses'], 99);
    }


    public function loadPluginLicenses()
    {
        do_action(
            'AHEE__EventEspresso_core_services_licensing_PluginLicenseCollection__loadPluginLicenses',
            $this
        );
    }
}
