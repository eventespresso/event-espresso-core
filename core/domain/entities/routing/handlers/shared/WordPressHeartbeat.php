<?php

namespace EventEspresso\core\domain\entities\routing\handlers\shared;

use EE_Dependency_Map;
use EventEspresso\core\services\routing\Route;

/**
 * Class WordPressHeartbeat
 * registers dependencies and loads resources for handling WordPress Heartbeat requests
 *
 * @package \EventEspresso\core\domain\entities\routing\handlers\shared
 * @author  Brent Christensen
 * @since   5.0.0.p
 */
class WordPressHeartbeat extends Route
{
    /**
     * returns true if the current request matches this route
     *
     * @return bool
     * @since   5.0.0.p
     */
    public function matchesCurrentRequest(): bool
    {
        return $this->request->isWordPressHeartbeat();
    }


    /**
     * @since 5.0.0.p
     */
    protected function registerDependencies()
    {
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\admin\ajax\WordpressHeartbeat',
            [
                'EventEspresso\core\services\loaders\Loader'  => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\request\Request' => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\admin\ajax\EventEditorHeartbeat',
            [
                'EventEspresso\core\domain\Domain' => EE_Dependency_Map::load_from_cache,
                'EE_Environment_Config'            => EE_Dependency_Map::load_from_cache,
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
        $this->loader->getShared('EventEspresso\core\domain\services\admin\ajax\WordpressHeartbeat');
        return true;
    }
}
