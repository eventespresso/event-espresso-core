<?php

namespace EventEspresso\core\services\graphql;

use EventEspresso\core\services\collections\CollectionDetailsException;
use EventEspresso\core\services\collections\CollectionLoaderException;
use EventEspresso\core\services\graphql\connections\ConnectionCollection;
use EventEspresso\core\services\graphql\connections\ConnectionInterface;
use Exception;

/**
 * Class ConnectionsManager
 * Loads and registers custom GraphQL Connections
 *
 * @package EventEspresso\core\services\graphql
 * @author  Brent Christensen
 * @since   5.0.0.p
 */
class ConnectionsManager implements GQLManagerInterface
{
    const MAX_AMOUNT_REQUESTED = 250;

    const MAX_QUERY_AMOUNT = 250;


    /**
     * @var ConnectionCollection|ConnectionInterface[] $connections
     */
    private $connections;


    /**
     * ConnectionsManager constructor.
     *
     * @param ConnectionCollection|ConnectionInterface[] $connections
     */
    public function __construct(ConnectionCollection $connections)
    {
        $this->connections = $connections;
    }


    /**
     * @throws CollectionDetailsException
     * @throws CollectionLoaderException
     * @since 5.0.0.p
     */
    public function init()
    {
        $this->connections->loadConnections();
        add_action('graphql_register_types', [$this, 'registerConnections'], 20);
        add_filter('graphql_connection_amount_requested', [$this, 'setMaxAmountRequested']);
        add_filter('graphql_connection_max_query_amount', [$this, 'setMaxQueryAmount']);
    }


    /**
     * @throws Exception
     */
    public function registerConnections()
    {
        // loop through the collection of types and register their fields
        foreach ($this->connections as $connection) {
            register_graphql_connection($connection->config());
        }
    }


    public function setMaxAmountRequested(): int
    {
        return ConnectionsManager::MAX_AMOUNT_REQUESTED;
    }

    public function setMaxQueryAmount(): int
    {
        return ConnectionsManager::MAX_QUERY_AMOUNT;
    }
}
