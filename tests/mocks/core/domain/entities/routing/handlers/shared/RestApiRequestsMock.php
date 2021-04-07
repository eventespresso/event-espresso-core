<?php

namespace EventEspresso\tests\mocks\core\domain\entities\routing\handlers\shared;

use EE_Dependency_Map;
use EventEspresso\core\domain\entities\routing\handlers\shared\RestApiRequests;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * RestApiRequestsMock
 *
 * @package EventEspresso\tests\mocks\core\domain\entities\routing\handlers\frontend
 * @author  Brent Christensen
 * @since   \$VID:$
 */
class RestApiRequestsMock extends RestApiRequests
{

    public static function register()
    {
        EE_Dependency_Map::instance()->registerDependencies(
            RestApiRequestsMock::class,
            [
                'EE_Dependency_Map'                                                                          => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\loaders\Loader'                                                 => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\request\Request'                                                => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\entities\routing\specifications\RouteMatchSpecificationInterface' => EE_Dependency_Map::load_from_cache,
            ]
        );
        /** @var RestApiRequestsMock $self */
        $self = LoaderFactory::getLoader()->getShared(RestApiRequestsMock::class);
        $self->registerDependencies();
        $self->requestHandler();
    }


    public function registerDependencies()
    {
        parent::registerDependencies();
    }


    public function requestHandler(): bool
    {
        return parent::requestHandler();
    }
}
