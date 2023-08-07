<?php

namespace EventEspresso\caffeinated\core\domain\entities\routing\handlers\admin;

use EE_Dependency_Map;
use EE_Error;
use EE_Form_Section_Proper;
use EventEspresso\caffeinated\core\domain\services\pue\RegisterAddonPUE;
use EventEspresso\caffeinated\core\services\licensing\LicenseService;
use EventEspresso\caffeinated\core\services\licensing\UserExperienceForm;
use EventEspresso\core\services\routing\Route;

/**
 * Class PueRequests
 * loads resources for PUE
 *
 * @package EventEspresso\core\domain\entities\routing\handlers\admin
 * @author  Brent Christensen
 * @since   5.0.0.p
 */
class PueRequests extends Route
{
    /**
     * @var   bool
     * @since 5.0.0.p
     */
    private bool $load_pue = true;


    /**
     * returns true if the current request matches this route
     *
     * @return bool
     * @since   5.0.0.p
     */
    public function matchesCurrentRequest(): bool
    {
        // route may match, but PUE loading is still conditional based on this filter
        $this->load_pue = (bool) apply_filters('FHEE__EE_System__brew_espresso__load_pue', true);
        return $this->request->isAdmin() || $this->request->isAjax() || $this->request->isActivation();
    }


    /**
     * @since 5.0.0.p
     */
    protected function registerDependencies()
    {
        if ($this->load_pue) {
            $this->dependency_map->registerDependencies(
                'EventEspresso\caffeinated\core\services\licensing\LicenseService',
                [
                    'EventEspresso\caffeinated\core\domain\services\pue\Stats'  => EE_Dependency_Map::load_from_cache,
                    'EventEspresso\caffeinated\core\domain\services\pue\Config' => EE_Dependency_Map::load_from_cache,
                ]
            );
            $this->dependency_map->registerDependencies(
                'EventEspresso\caffeinated\core\domain\services\pue\Stats',
                [
                    'EventEspresso\caffeinated\core\domain\services\pue\Config'        => EE_Dependency_Map::load_from_cache,
                    'EE_Maintenance_Mode'                                              => EE_Dependency_Map::load_from_cache,
                    'EventEspresso\caffeinated\core\domain\services\pue\StatsGatherer' => EE_Dependency_Map::load_from_cache,
                ]
            );
            $this->dependency_map->registerDependencies(
                'EventEspresso\caffeinated\core\domain\services\pue\Config',
                [
                    'EE_Network_Config' => EE_Dependency_Map::load_from_cache,
                    'EE_Config'         => EE_Dependency_Map::load_from_cache,
                ]
            );
            $this->dependency_map->registerDependencies(
                'EventEspresso\caffeinated\core\domain\services\pue\StatsGatherer',
                [
                    'EEM_Payment_Method' => EE_Dependency_Map::load_from_cache,
                    'EEM_Event'          => EE_Dependency_Map::load_from_cache,
                    'EEM_Datetime'       => EE_Dependency_Map::load_from_cache,
                    'EEM_Ticket'         => EE_Dependency_Map::load_from_cache,
                    'EEM_Registration'   => EE_Dependency_Map::load_from_cache,
                    'EEM_Transaction'    => EE_Dependency_Map::load_from_cache,
                    'EE_Config'          => EE_Dependency_Map::load_from_cache,
                ]
            );
            $this->dependency_map->registerDependencies(
                'EventEspresso\caffeinated\core\services\licensing\UserExperienceForm',
                [
                    'EE_Core_Config'         => EE_Dependency_Map::load_from_cache,
                    'EE_Network_Core_Config' => EE_Dependency_Map::load_from_cache,
                ]
            );
        }
    }


    /**
     * implements logic required to run during request
     *
     * @return bool
     * @since   5.0.0.p
     */
    protected function requestHandler(): bool
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
        if ($this->load_pue) {
            add_action('AHEE__EE_System__brew_espresso__complete', [$this, 'loadLicenseService']);
            add_filter(
                'FHEE__EventEspresso_admin_pages_general_settings_OrganizationSettings__generate__form',
                [$this, 'loadUserExperienceForm']
            );
        }

        return true;
    }


    public function loadLicenseService()
    {
        /** @var LicenseService $license_service */
        $license_service = $this->loader->getShared(LicenseService::class);
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
