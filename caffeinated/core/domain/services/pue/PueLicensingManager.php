<?php

namespace EventEspresso\caffeinated\core\domain\services\pue;

use EE_Dependency_Map;
use EE_Error;
use EE_Form_Section_Proper;
use EventEspresso\caffeinated\core\services\licensing\LicenseService;
use EventEspresso\caffeinated\core\services\licensing\UserExperienceForm;
use EventEspresso\core\services\loaders\LoaderInterface;

class PueLicensingManager
{
    /**
     * @var EE_Dependency_Map
     */
    protected $dependency_map;

    /**
     * @var LoaderInterface
     */
    protected $loader;


    /**
     * @param EE_Dependency_Map $dependency_map
     * @param LoaderInterface   $loader
     */
    public function __construct(EE_Dependency_Map $dependency_map, LoaderInterface $loader)
    {
        $this->dependency_map = $dependency_map;
        $this->loader         = $loader;
    }


    public function registerDependencies()
    {
        $pue_dependencies = [
            'EventEspresso\caffeinated\core\services\licensing\LicenseService'     => [
                'EventEspresso\caffeinated\core\domain\services\pue\Stats'  => EE_Dependency_Map::load_from_cache,
                'EventEspresso\caffeinated\core\domain\services\pue\Config' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\caffeinated\core\domain\services\pue\Stats'             => [
                'EventEspresso\caffeinated\core\domain\services\pue\Config'        => EE_Dependency_Map::load_from_cache,
                'EE_Maintenance_Mode'                                              => EE_Dependency_Map::load_from_cache,
                'EventEspresso\caffeinated\core\domain\services\pue\StatsGatherer' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\caffeinated\core\domain\services\pue\Config'            => [
                'EE_Network_Config' => EE_Dependency_Map::load_from_cache,
                'EE_Config'         => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\caffeinated\core\domain\services\pue\StatsGatherer'     => [
                'EEM_Payment_Method' => EE_Dependency_Map::load_from_cache,
                'EEM_Event'          => EE_Dependency_Map::load_from_cache,
                'EEM_Datetime'       => EE_Dependency_Map::load_from_cache,
                'EEM_Ticket'         => EE_Dependency_Map::load_from_cache,
                'EEM_Registration'   => EE_Dependency_Map::load_from_cache,
                'EEM_Transaction'    => EE_Dependency_Map::load_from_cache,
                'EE_Config'          => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\caffeinated\core\services\licensing\UserExperienceForm' => [
                'EE_Core_Config'         => EE_Dependency_Map::load_from_cache,
                'EE_Network_Core_Config' => EE_Dependency_Map::load_from_cache,
            ],
        ];
        foreach ($pue_dependencies as $class => $dependencies) {
            $this->dependency_map->registerDependencies($class, $dependencies);
        }
    }


    public function registerHooks()
    {
        add_filter(
            'FHEE__EE_Register_Addon__register',
            [RegisterAddonPUE::class, 'registerPUE'],
            10,
            4
        );
        add_action(
            'AHEE__EE_Register_Addon___load_and_init_addon_class',
            [RegisterAddonPUE::class, 'setAddonPueSlug'],
            10,
            2
        );
        if (is_admin() && apply_filters('FHEE__EE_System__brew_espresso__load_pue', true)) {
            add_action('AHEE__EE_System__brew_espresso__complete', [$this, 'loadLicenseService']);
        }
        add_filter(
            'FHEE__EventEspresso_admin_pages_general_settings_OrganizationSettings__generate__form',
            [$this, 'loadUserExperienceForm']
        );

    }


    public function loadLicenseService()
    {
        /** @var LicenseService $license_service */
        $license_service = $this->loader->getShared(LicenseService::class );
        $license_service->loadPueClient();
    }


    /**
     * @throws EE_Error
     */
    public function loadUserExperienceForm(EE_Form_Section_Proper $org_settings_form): EE_Form_Section_Proper
    {
        /** @var UserExperienceForm $uxip_form */
        $uxip_form = $this->loader->getShared(UserExperienceForm::class);
        return $uxip_form->uxipFormSections($org_settings_form);
    }
}
