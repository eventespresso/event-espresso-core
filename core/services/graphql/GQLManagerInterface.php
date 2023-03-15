<?php

namespace EventEspresso\core\services\graphql;

use EventEspresso\core\services\collections\CollectionDetailsException;
use EventEspresso\core\services\collections\CollectionLoaderException;

/**
 * Class GraphQLManager
 * Loads and initializes all of the components required for integrating EE with GraphQL
 *
 * @package EventEspresso\core\services\graphql
 * @author  Brent Christensen
 * @since   5.0.0.p
 */
interface GQLManagerInterface
{
    /**
     * @throws CollectionDetailsException
     * @throws CollectionLoaderException
     * @since 5.0.0.p
     */
    public function init();
}
