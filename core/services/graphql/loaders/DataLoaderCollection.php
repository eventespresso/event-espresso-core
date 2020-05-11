<?php

namespace EventEspresso\core\services\graphql\loaders;

use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\collections\Collection;
use EventEspresso\core\services\collections\CollectionDetails;
use EventEspresso\core\services\collections\CollectionDetailsException;
use EventEspresso\core\services\collections\CollectionInterface;
use EventEspresso\core\services\collections\CollectionLoader;
use EventEspresso\core\services\collections\CollectionLoaderException;

/**
 * Class DataLoaderCollection
 * SplObjectStorage Collection of EventEspresso\core\services\graphql\GQLDataDomainInterface objects
 *
 * @package EventEspresso\core\services\graphql
 * @author  Brent Christensen
 * @since   $VID:$
 */
class DataLoaderCollection extends Collection
{

    const NAME = 'espresso_graphql_data_loaders';

    const INTERFACE = 'EventEspresso\core\services\graphql\loaders\GQLDataDomainInterface';

    /**
     * @var CollectionLoader $loader
     */
    protected $loader;


    /**
     * DataLoaderCollection constructor
     *
     * @throws InvalidInterfaceException
     */
    public function __construct()
    {
        parent::__construct(
            DataLoaderCollection::INTERFACE,
            DataLoaderCollection::NAME
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
                    DataLoaderCollection::NAME,
                    // collection interface
                    DataLoaderCollection::INTERFACE,
                    // FQCNs for classes to add (all classes within each namespace will be loaded)
                    apply_filters(
                        'FHEE__EventEspresso_core_services_graphql_DataLoaderCollection__loadCollection__collection_FQCNs',
                        ['EventEspresso\core\domain\services\graphql\data\domains']
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
    public function getDataLoaders()
    {
        $this->loadCollection();
        return $this->loader->getCollection();
    }
}
