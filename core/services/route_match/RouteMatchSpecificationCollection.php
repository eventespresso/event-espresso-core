<?php

namespace EventEspresso\core\services\route_match;

use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\collections\Collection;

/**
 * Class RouteMatchSpecificationCollection
 * SplObjectStorage Collection of EventEspresso\core\domain\entities\route_match\RouteMatchSpecificationInterface objects
 *
 * @package EventEspresso\core\services\route_match
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class RouteMatchSpecificationCollection extends Collection
{

    const COLLECTION_NAME = 'route_match_specifications';


    /**
     * RouteMatchSpecificationCollection constructor
     *
     * @throws InvalidInterfaceException
     */
    public function __construct()
    {
        parent::__construct(
            'EventEspresso\core\domain\entities\route_match\RouteMatchSpecificationInterface',
            RouteMatchSpecificationCollection::COLLECTION_NAME
        );
    }


    /**
     * getIdentifier
     * Overrides EventEspresso\core\services\collections\Collection::getIdentifier()
     * If no $identifier is supplied, then the  fully qualified class name is used
     *
     * @param        $object
     * @param  mixed $identifier
     * @return bool
     */
    public function getIdentifier($object, $identifier = null)
    {
        return ! empty($identifier)
            ? $identifier
            : get_class($object);
    }
}
