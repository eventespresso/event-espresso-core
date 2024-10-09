<?php

namespace EventEspresso\core\services\service_changes;

use DateTime;
use EE_Dependency_Map;
use EventEspresso\core\domain\services\service_changes\PaymentMethodDeprecations2025;
use EventEspresso\core\services\loaders\LoaderInterface;

/**
 * ServiceChangeNotificationsManager
 *
 * @package     Event Espresso
 * @subpackage  EventEspresso\core\services\notifications
 * @author      Brent Christensen
 * @since       5.0.28.p
 */
class ServiceChangesManager
{
    private EE_Dependency_Map $dependency_map;

    private LoaderInterface $loader;


    /**
     * @param EE_Dependency_Map $dependency_map
     * @param LoaderInterface   $loader
     */
    public function __construct(EE_Dependency_Map $dependency_map, LoaderInterface $loader)
    {
        $this->dependency_map = $dependency_map;
        $this->loader         = $loader;
        $this->registerDependencies();
        $this->loadServiceChangeNotifications();
    }


    /**
     * @return void
     */
    private function registerDependencies()
    {
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\service_changes\PaymentMethodDeprecations2025',
            [
                'EEM_Payment_Method' => EE_Dependency_Map::load_from_cache,
            ]
        );
    }


    public function loadServiceChangeNotifications()
    {
        /** @var PaymentMethodDeprecations2025 $pm_deps */
        $pm_deps = $this->loader->getShared(PaymentMethodDeprecations2025::class);
        $pm_deps->setHooks();
    }
}
