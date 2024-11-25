<?php

namespace EventEspresso\core\services\addon;

use EE_Dependency_Map;
use EE_Error;
use EEH_Autoloader;
use EventEspresso\core\exceptions\ExceptionStackTraceDisplay;
use EventEspresso\core\services\addon\api\AddonApiVersion;
use EventEspresso\core\services\addon\api\IncompatibleAddonHandler;
use EventEspresso\core\services\addon\api\ThirdPartyPluginHandler;
use EventEspresso\core\services\addon\api\v1\AddonApi as AddonApiV1;
use EventEspresso\core\services\addon\api\v1\RegisterAddon as RegisterV1Addon;
use Exception;
use ReflectionException;
use Throwable;

/**
 * Class AddonManager
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\services\addon
 * @since   5.0.0.p
 */
class AddonManager
{
    private AddonCollection $addons;

    private EE_Dependency_Map $dependency_map;

    private IncompatibleAddonHandler $incompatible_addon_handler;

    private RegisterV1Addon $register_v1_addon;

    private ThirdPartyPluginHandler $third_party_plugin_handler;


    /**
     * AddonManager constructor.
     *
     * @param AddonCollection          $addons
     * @param EE_Dependency_Map        $dependency_map
     * @param IncompatibleAddonHandler $incompatible_addon_handler
     * @param RegisterV1Addon          $register_v1_addon
     * @param ThirdPartyPluginHandler  $third_party_plugin_handler
     */
    public function __construct(
        AddonCollection $addons,
        EE_Dependency_Map $dependency_map,
        IncompatibleAddonHandler $incompatible_addon_handler,
        RegisterV1Addon $register_v1_addon,
        ThirdPartyPluginHandler $third_party_plugin_handler
    ) {
        $this->addons                     = $addons;
        $this->dependency_map             = $dependency_map;
        $this->incompatible_addon_handler = $incompatible_addon_handler;
        $this->register_v1_addon          = $register_v1_addon;
        $this->third_party_plugin_handler = $third_party_plugin_handler;
    }


    /**
     * @throws Exception
     */
    public function initialize()
    {
        // set autoloaders for all the classes implementing the legacy EEI_Plugin_API
        // which provide helpers for EE plugin authors to more easily register certain components with EE.
        EEH_Autoloader::register_autoloaders_for_each_file_in_folder(EE_LIBRARIES . 'plugin_api');
        $this->dependency_map->registerDependencies(
            AddonApiVersion::class,
            [
                'EventEspresso\core\services\addon\api\AddonRoutes'        => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\addon\api\DependencyHandlers' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\Psr4Autoloader'                        => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\services\addon\api\v1\AddonApi',
            [
                'EventEspresso\core\services\addon\api\AddonRoutes'         => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\addon\api\DependencyHandlers'  => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\Psr4Autoloader'                         => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\addon\api\v1\DataMigrationApi' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\addon\api\v1\LegacyModelApi'   => EE_Dependency_Map::load_from_cache,
            ]
        );
    }


    /**
     * @throws Exception
     * @throws Throwable
     */
    public function loadAddons()
    {
        try {
            $this->incompatible_addon_handler->deactivateIncompatibleAddons();
            // legacy add-on API
            do_action('AHEE__EE_System__load_espresso_addons');
            // new add-on API that uses versioning
            do_action('AHEE__EventEspresso_core_services_addon_AddonManager__loadAddons');
            // addons are responsible for loading their AddonApiVersion into the AddonCollection
            foreach ($this->addons as $addon) {
                if ($addon instanceof AddonApiVersion) {
                    $this->registerAddon($addon);
                }
            }
            $this->third_party_plugin_handler->loadPlugins();
            do_action('AHEE__EE_System__load_espresso_addons__complete');
        } catch (Exception $exception) {
            new ExceptionStackTraceDisplay($exception);
        }
    }


    /**
     * @param AddonApiVersion $addon
     * @throws EE_Error
     */
    private function registerAddon(AddonApiVersion $addon)
    {
        $addon->initialize();
        // now register each addon based on it's API version
        if ($addon instanceof AddonApiV1) {
            $this->register_v1_addon->register($addon);
        }
    }
}
