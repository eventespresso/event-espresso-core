<?php

namespace EventEspresso\core\services\graphql;

use EventEspresso\core\services\collections\CollectionDetailsException;
use EventEspresso\core\services\collections\CollectionLoaderException;
use EventEspresso\core\services\graphql\connections\ConnectionCollection;
use EventEspresso\core\services\graphql\connections\ConnectionInterface;

/**
 * Class ConnectionsManager
 * Loads and registers custom GraphQL Connections
 *
 * @package EventEspresso\core\services\graphql
 * @author  Brent Christensen
 * @since   $VID:$
 */
class ConnectionsManager
{

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
     * @since $VID:$
     */
    public function init()
    {
        $this->connections->loadConnections();
        add_action('graphql_register_types', [$this, 'registerConnections'], 20);
    }


    public function registerConnections()
    {
        // loop through the collection of types and register their fields
        foreach ($this->connections as $connection) {
            register_graphql_connection($connection->config());
        }
    }
}