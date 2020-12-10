<?php

namespace EventEspresso\tests\mocks\core\domain\entities\routing\handlers\shared;

use EE_Dependency_Map;
use EventEspresso\core\domain\entities\routing\handlers\shared\GQLRequests;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * GQLRequestsMock
 *
 * @package EventEspresso\tests\mocks\core\domain\entities\routing\handlers\frontend
 * @author  Brent Christensen
 * @since   \$VID:$
 */
class GQLRequestsMock extends GQLRequests
{

    public static function register()
    {
        EE_Dependency_Map::instance()->registerDependencies(
            GQLRequestsMock::class,
            [
                'EE_Dependency_Map'                                       => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\loaders\Loader'              => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\request\Request'             => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\assets\AssetManifestFactory' => EE_Dependency_Map::load_from_cache,
            ]
        );
        $self = LoaderFactory::getLoader()->getShared(GQLRequestsMock::class);
        $self->registerDependencies();
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
