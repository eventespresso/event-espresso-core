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

use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\collections\Collection;
use EventEspresso\core\services\collections\CollectionDetails;
use EventEspresso\core\services\collections\CollectionDetailsException;
use EventEspresso\core\services\collections\CollectionInterface;
use EventEspresso\core\services\collections\CollectionLoader;
use EventEspresso\core\services\collections\CollectionLoaderException;

/**
 * Class ConnectionCollection
 * SplObjectStorage Collection of EventEspresso\core\services\graphql\ConnectionInterface objects
 *
 * @package EventEspresso\core\services\graphql
 * @author  Brent Christensen
 * @since   $VID:$
 */
class ConnectionCollection extends Collection
{

    const COLLECTION_NAME = 'espresso_graphql_connections';

    /**
     * @var CollectionLoader $loader
     */
    protected $loader;

    /**
     * ConnectionCollection constructor
     *
     * @throws InvalidInterfaceException
     */
    public function __construct()
    {
        parent::__construct(
            'EventEspresso\core\services\graphql\ConnectionInterface',
            ConnectionCollection::COLLECTION_NAME
        );
    }


    /**
     * @throws CollectionDetailsException
     * @throws CollectionLoaderException
     * @since $VID:$
     */
    private function loadCollection()
    {
        if (! $this->loader instanceof CollectionLoader) {
            $this->loader = new CollectionLoader(
                new CollectionDetails(
                // collection name
                    ConnectionCollection::COLLECTION_NAME,
                    // collection interface
                    'EventEspresso\core\services\graphql\ConnectionInterface',
                    // FQCNs for classes to add (all classes within each namespace will be loaded)
                    apply_filters(
                        'FHEE__EventEspresso_core_services_graphql_ConnectionCollection__loadCollection__collection_FQCNs',
                        ['EventEspresso\core\domain\services\graphql\connections']
                    ),
                    // filepaths to classes to add
                    array(),
                    // file mask to use if parsing folder for files to add
                    '',
                    // what to use as identifier for collection entities
                    // using CLASS NAME prevents duplicates (works like a singleton)
                    CollectionDetails::ID_CLASS_NAME
                ),
                $this
            );
        }
    }


    /**
     * @return CollectionInterface
     * @throws CollectionDetailsException
     * @throws CollectionLoaderException
     * @since $VID:$
     */
    public function loadConnections()
    {
        $this->loadCollection();
        return $this->loader->getCollection();
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