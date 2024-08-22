<?php

namespace EventEspresso\core\services\graphql\interfaces;

use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\collections\Collection;
use EventEspresso\core\services\collections\CollectionDetails;
use EventEspresso\core\services\collections\CollectionDetailsException;
use EventEspresso\core\services\collections\CollectionInterface;
use EventEspresso\core\services\collections\CollectionLoader;
use EventEspresso\core\services\collections\CollectionLoaderException;

class InterfaceCollection extends Collection
{
    const COLLECTION_NAME = 'espresso_graphql_interface_files';

    protected ?CollectionLoader $loader = null;


    /**
     * InputCollection constructor
     *
     * @throws InvalidInterfaceException
     */
    public function __construct()
    {
        parent::__construct(
            GraphQLInterfaceInterface::class,
            InterfaceCollection::COLLECTION_NAME
        );
    }


    /**
     * @throws CollectionDetailsException
     * @throws CollectionLoaderException
     * @since 5.0.0.p
     */
    private function loadCollection()
    {
        if (! $this->loader instanceof CollectionLoader) {
            $this->loader = new CollectionLoader(
                new CollectionDetails(
                    // collection name
                    InterfaceCollection::COLLECTION_NAME,
                    // collection interface
                    GraphQLInterfaceInterface::class,
                    // FQCNs for classes to add (all classes within each namespace will be loaded)
                    apply_filters(
                        'FHEE__EventEspresso_core_services_graphql_interfaces_InterfaceCollection__loadCollection__collection_FQCNs',
                        ['EventEspresso\core\domain\services\graphql\interfaces']
                    ),
                    // filepaths to classes to add
                    [],
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
     * @return array|Collection|CollectionInterface
     * @throws CollectionDetailsException
     * @throws CollectionLoaderException
     * @since 5.0.0.p
     */
    public function loadInterfaces()
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
     * @return string
     */
    public function getIdentifier($object, $identifier = null)
    {
        return ! empty($identifier)
            ? $identifier
            : get_class($object);
    }
}
