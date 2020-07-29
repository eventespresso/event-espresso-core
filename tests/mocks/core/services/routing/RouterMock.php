<?php

namespace EventEspresso\tests\mocks\core\services\routing;

use EventEspresso\core\services\routing\Router;
use Exception;

class RouterMock extends Router
{
    /**
     * @param string $fqcn   Fully Qualified Class Name for Route
     * @param bool   $handle if true [default] will immediately call RouteInterface::handleRequest() after adding
     * @throws Exception
     * @since $VID:$
     */
    public function addRoute($fqcn, $handle = true)
    {
        $this->route_handler->addRoute($fqcn, $handle);
    }


    /**
     * calls RouteInterface::handleRequest() on all Routes that
     *      - match current request
     *      - have yet to be handled
     *
     * @return void
     */
    public function handleRoutesForCurrentRequest()
    {
        $this->route_handler->handleRoutesForCurrentRequest();
    }
}
