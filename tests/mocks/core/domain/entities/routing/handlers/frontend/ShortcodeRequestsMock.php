<?php

namespace EventEspresso\tests\mocks\core\domain\entities\routing\handlers\frontend;

use EE_Dependency_Map;
use EventEspresso\core\domain\entities\routing\handlers\frontend\ShortcodeRequests;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * Class ShortcodeRequestsMock
 * Description
 *
 * @package EventEspresso\tests\mocks\core\domain\entities\routing\handlers\frontend
 * @author  Brent Christensen
 * @since   \$VID:$
 */
class ShortcodeRequestsMock extends ShortcodeRequests
{

    public static function register()
    {
        EE_Dependency_Map::instance()->registerDependencies(
            ShortcodeRequestsMock::class,
            [
                'EE_Dependency_Map'                           => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\loaders\Loader'  => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\request\Request' => EE_Dependency_Map::load_from_cache,
            ]
        );
        $self = LoaderFactory::getLoader()->getShared(ShortcodeRequestsMock::class);
        $self->registerDependencies();
    }
    public function registerDependencies() {
        parent::registerDependencies();
    }

    public function requestHandler() {
        parent::requestHandler();
    }
}