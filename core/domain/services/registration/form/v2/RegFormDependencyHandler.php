<?php

namespace EventEspresso\core\domain\services\registration\form\v2;

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
            'EventEspresso\core\domain\services\registration\form\v2\RegForm'                  => [
                null,
                'FormSubmissionHandler'  => EE_Dependency_Map::load_from_cache,
                'EE_Registration_Config' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\domain\services\registration\form\v2\RegistrantForm'           => [
                null,
                null,
                null,
                null,
                'EEM_Form_Element' => EE_Dependency_Map::load_from_cache,
                'EEM_Form_Section' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\domain\services\registration\form\v2\RegistrantFormSection'    => [
                null,
                null,
                null,
                'EventEspresso\core\domain\services\registration\form\v2\RegistrantFormInput' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\domain\services\registration\form\base\CountryOptions'         => [
                null,
                'EEM_Answer'  => EE_Dependency_Map::load_from_cache,
                'EEM_Country' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\domain\services\registration\form\base\StateOptions'           => [
                null,
                'EEM_State' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\domain\services\registration\form\v2\RegFormHandler'           => [
                null,
                'EventEspresso\core\domain\services\registration\form\base\RegistrantData'         => EE_Dependency_Map::load_from_cache,
                'EE_Form_Section_Proper'                                                           => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\services\registration\form\base\RegFormAttendeeFactory' => EE_Dependency_Map::load_from_cache,
                'EE_Registration_Processor'                                                        => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\domain\services\registration\form\v2\RegFormInputHandler'      => [
                null,
                null,
                'EEM_Attendee'                                                                  => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\services\registration\form\base\RegistrantData'      => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\services\registration\form\v2\SystemInputFieldNames' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\domain\services\registration\form\base\RegFormAttendeeFactory' => [
                'EventEspresso\core\services\commands\CommandBus'                          => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\services\registration\form\base\RegistrantData' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\domain\services\registration\form\v2\RegistrantFormInput'      => [
                null,
                null,
                'EventEspresso\core\domain\services\registration\form\v2\SystemInputFieldNames' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\domain\services\registration\form\v2\FormSubmissionHandler'    => [
                'EventEspresso\core\services\request\RequestInterface' => EE_Dependency_Map::load_from_cache,
            ],
        ];
        foreach ($reg_form_dependencies as $class => $dependencies) {
            $this->dependency_map->registerDependencies($class, $dependencies);
        }
    }
}
