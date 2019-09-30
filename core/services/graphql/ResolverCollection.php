<?php

namespace EventEspresso\core\services\graphql;

use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\collections\Collection;

/**
 * Class ResolverCollection
 * SplObjectStorage Collection of EventEspresso\core\services\graphql\ResolverInterface objects
 *
 * @package EventEspresso\core\services\graphql
 * @author  Brent Christensen
 * @since   $VID:$
 */
class ResolverCollection extends Collection
{

    const COLLECTION_NAME = 'espresso_graphql_resolvers';


    /**
     * ResolverCollection constructor
     *
     * @throws InvalidInterfaceException
     */
    public function __construct()
    {
        parent::__construct(
            'EventEspresso\core\services\graphql\ResolverInterface',
            ResolverCollection::COLLECTION_NAME
        );
    }


    /**
     * getIdentifier
     * Overrides EventEspresso\core\services\collections\Collection::getIdentifier()
     * If no $identifier is supplied, then the  fully qualified class name is used
     *
     * @param        $object
     * @param mixed  $identifier
     * @return bool
     */
    public function getIdentifier($object, $identifier = null)
    {
        return ! empty($identifier)
            ? $identifier
            : get_class($object);
    }
}