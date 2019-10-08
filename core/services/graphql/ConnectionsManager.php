<?php
/**
 *     Event Espresso
 *     Manage events, sell tickets, and receive payments from your WordPress website.
 *     Copyright (c) 2008-2019 Event Espresso  All Rights Reserved.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

namespace EventEspresso\core\services\graphql;

use EventEspresso\core\services\collections\CollectionDetailsException;
use EventEspresso\core\services\collections\CollectionLoaderException;

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
        add_action('graphql_register_types', [$this, 'registerTypes'], 20);
    }


    public function registerTypes()
    {
        // loop through the collection of types and register their fields
        foreach ($this->connections as $connection) {
            register_graphql_connection($connection->config());
        }
    }
}