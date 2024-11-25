<?php

namespace EventEspresso\core\services\service_changes;

use EE_Dependency_Map;
use EE_Error;
use EventEspresso\core\domain\services\database\DbStatus;
use EventEspresso\core\domain\services\service_changes\PaymentMethodDeprecations2025;
use EventEspresso\core\services\loaders\LoaderInterface;
use ReflectionException;

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
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function __construct(EE_Dependency_Map $dependency_map, LoaderInterface $loader)
    {
        $this->dependency_map = $dependency_map;
        $this->loader         = $loader;
        if (DbStatus::isOnline()) {
            $this->registerDependencies();
            $this->loadServiceChangeNotifications();
        }
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


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function loadServiceChangeNotifications()
    {
        if (
            apply_filters(
                'FHEE__EventEspresso_core_services_service_changes_ServiceChangesManager__loadServiceChangeNotifications__loadPaymentMethodDeprecations2025',
                true
            )
        ) {
            /** @var PaymentMethodDeprecations2025 $pm_deps */
            $pm_deps = $this->loader->getShared(PaymentMethodDeprecations2025::class);
            $pm_deps->setHooks();
        }
    }
}
