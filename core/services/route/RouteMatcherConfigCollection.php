<?php
namespace EventEspresso\core\services\route;

use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\collections\Collection;

class RouteMatcherConfigCollection extends Collection
{
    /**
     * RouteMatcherConfigCollection constructor.
     *
     * @throws InvalidInterfaceException
     */
    public function __construct()
    {
        parent::__construct('EventEspresso\core\services\route\RouteMatcherConfig');
    }
}
