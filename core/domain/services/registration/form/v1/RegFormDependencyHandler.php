<?php

namespace EventEspresso\core\domain\services\registration\form\v1;

use EE_Dependency_Map;
use EventEspresso\core\services\dependencies\DependencyHandler;

class RegFormDependencyHandler extends DependencyHandler
{
    /**
     * @return void
     */
    public function registerDependencies()
    {
        $reg_form_dependencies = [
            'EventEspresso\core\domain\services\registration\form\v1\RegForm'                => [
                null,
                'EE_Registration_Config' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\domain\services\registration\form\v1\RegistrantForm'         => [
                null,
                null,
                null,
                null,
                null,
                'EEM_Event_Question_Group' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\domain\services\registration\form\v1\RegFormQuestionFactory' => [
                null,
                'EEM_Answer' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\domain\services\registration\form\v1\RegFormQuestionGroup'   => [
                null,
                null,
                null,
                'EventEspresso\core\domain\services\registration\form\v1\RegFormQuestionFactory' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\domain\services\registration\form\v1\CountryOptions'         => [
                null,
                'EEM_Answer'  => EE_Dependency_Map::load_from_cache,
                'EEM_Country' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\domain\services\registration\form\v1\StateOptions'           => [
                null,
                'EEM_State' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\domain\services\registration\form\v1\RegFormHandler'         => [
                null,
                'EventEspresso\core\domain\services\registration\form\v1\RegistrantData'         => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\services\registration\form\v1\RegFormAttendeeFactory' => EE_Dependency_Map::load_from_cache,
                'EE_Registration_Processor'                                                      => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\domain\services\registration\form\v1\RegFormInputHandler'    => [
                null,
                null,
                'EEM_Attendee'                                                           => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\services\registration\form\v1\RegistrantData' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\domain\services\registration\form\v1\RegFormAttendeeFactory' => [
                'EventEspresso\core\services\commands\CommandBus'                        => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\services\registration\form\v1\RegistrantData' => EE_Dependency_Map::load_from_cache,
            ],
        ];
        foreach ($reg_form_dependencies as $class => $dependencies) {
            $this->dependency_map->registerDependencies($class, $dependencies);
        }
    }
}
