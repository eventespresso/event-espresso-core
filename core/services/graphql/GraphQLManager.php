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
 * Class GraphQLManager
 * Loads and initializes all of the components required for integrating EE with GraphQL
 *
 * @package EventEspresso\core\services\graphql
 * @author  Brent Christensen
 * @since   $VID:$
 */
class GraphQLManager
{

    /**
     * @var TypesManager $types_manager
     */
    protected $types_manager;

    /**
     * @var ConnectionsManager $connections_manager
     */
    protected $connections_manager;


    /**
     * GraphQLManager constructor.
     *
     * @param TypesManager $types_manager
     * @param ConnectionsManager $connections_manager
     */
    public function __construct(TypesManager $types_manager, ConnectionsManager $connections_manager)
    {
        $this->types_manager = $types_manager;
        $this->connections_manager = $connections_manager;
    }


    /**
     * @throws CollectionDetailsException
     * @throws CollectionLoaderException
     * @since $VID:$
     */
    public function init()
    {
        $this->types_manager->init();
        $this->connections_manager->init();
    }

}