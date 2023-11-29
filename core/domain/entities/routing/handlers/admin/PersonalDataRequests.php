<?php

namespace EventEspresso\core\domain\entities\routing\handlers\admin;

use EE_Dependency_Map;
use EventEspresso\core\domain\entities\routing\handlers\frontend\PublicRoute;
use EventEspresso\core\domain\services\database\DbStatus;

/**
 * Class PersonalDataRequests
 * loads resources and dependencies required for user privacy related logic
 *
 * @package EventEspresso\core\domain\entities\routing\handlers\admin
 * @author  Brent Christensen
 * @since   5.0.0.p
 */
class PersonalDataRequests extends PublicRoute
{
    /**
     * returns true if the current request matches this route
     *
     * @return bool
     * @since   5.0.0.p
     */
    public function matchesCurrentRequest(): bool
    {
        return ($this->request->isAdmin() || $this->request->isAjax()) && DbStatus::isOnline();
    }


    /**
     * @since 5.0.0.p
     */
    protected function registerDependencies()
    {
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\admin\privacy\policy\PrivacyPolicy',
            [
                'EEM_Payment_Method'                                       => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\values\session\SessionLifespan' => EE_Dependency_Map::load_from_cache
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\admin\privacy\export\ExportAttendee',
            ['EEM_Attendee' => EE_Dependency_Map::load_from_cache]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\admin\privacy\export\ExportAttendeeBillingData',
            [
                'EEM_Attendee'       => EE_Dependency_Map::load_from_cache,
                'EEM_Payment_Method' => EE_Dependency_Map::load_from_cache
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\admin\privacy\export\ExportCheckins',
            ['EEM_Checkin' => EE_Dependency_Map::load_from_cache]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\admin\privacy\export\ExportRegistration',
            ['EEM_Registration' => EE_Dependency_Map::load_from_cache]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\admin\privacy\export\ExportTransaction',
            ['EEM_Transaction' => EE_Dependency_Map::load_from_cache]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\admin\privacy\erasure\EraseAttendeeData',
            ['EEM_Attendee' => EE_Dependency_Map::load_from_cache]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\admin\privacy\erasure\EraseAnswers',
            [
                'EEM_Answer'   => EE_Dependency_Map::load_from_cache,
                'EEM_Question' => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\admin\privacy\forms\PrivacySettingsFormHandler',
            [
                'EE_Registry' => EE_Dependency_Map::load_from_cache,
                'EE_Config'   => EE_Dependency_Map::load_from_cache
            ]
        );
    }


    /**
     * implements logic required to run during request
     *
     * @return bool
     * @since   5.0.0.p
     */
    protected function requestHandler(): bool
    {
        $this->loader->getShared('EventEspresso\core\services\privacy\erasure\PersonalDataEraserManager');
        $this->loader->getShared('EventEspresso\core\services\privacy\export\PersonalDataExporterManager');
        return true;
    }
}
