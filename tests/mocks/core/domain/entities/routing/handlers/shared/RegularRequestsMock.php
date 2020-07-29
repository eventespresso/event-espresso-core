<?php

namespace EventEspresso\tests\mocks\core\domain\entities\routing\handlers\shared;

use EE_Dependency_Map;
use EventEspresso\core\domain\entities\routing\handlers\shared\RegularRequests;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * Class ShortcodeRequestsMock
 * Description
 *
 * @package EventEspresso\tests\mocks\core\domain\entities\routing\handlers\frontend
 * @author  Brent Christensen
 * @since   \$VID:$
 */
class RegularRequestsMock extends RegularRequests
{

    public static function register()
    {
        EE_Dependency_Map::instance()->registerDependencies(
			RegularRequestsMock::class,
			[
                'EE_Dependency_Map'                                                                          => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\loaders\Loader'                                                 => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\request\Request'                                                => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\entities\routing\specifications\RouteMatchSpecificationInterface' => EE_Dependency_Map::load_from_cache,
            ]
        );
        $self = LoaderFactory::getLoader()->getShared(RegularRequestsMock::class);
        $self->registerDependencies();
    }

    public function registerDependencies() {
        parent::registerDependencies();
    }

    public function requestHandler() {
        parent::requestHandler();
    }
}