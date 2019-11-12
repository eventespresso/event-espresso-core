<?php

namespace EventEspresso\core\services\graphql\inputs;

use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\collections\Collection;
use EventEspresso\core\services\collections\CollectionDetails;
use EventEspresso\core\services\collections\CollectionDetailsException;
use EventEspresso\core\services\collections\CollectionInterface;
use EventEspresso\core\services\collections\CollectionLoader;
use EventEspresso\core\services\collections\CollectionLoaderException;

/**
 * Class InputCollection
 * SplObjectStorage Collection of EventEspresso\core\services\graphql\InputInterface objects
 *
 * @package EventEspresso\core\services\graphql
 * @author  Manzoor Wani
 * @since   $VID:$
 */
class InputCollection extends Collection
{

    const COLLECTION_NAME = 'espresso_graphql_inputs';

    /**
     * @var CollectionLoader $loader
     */
    protected $loader;

    /**
     * InputCollection constructor
     *
     * @throws InvalidInterfaceException
     */
    public function __construct()
    {
        parent::__construct(
            'EventEspresso\core\services\graphql\inputs\InputInterface',
            InputCollection::COLLECTION_NAME
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
                    InputCollection::COLLECTION_NAME,
                    // collection interface
                    'EventEspresso\core\services\graphql\inputs\InputInterface',
                    // FQCNs for classes to add (all classes within each namespace will be loaded)
                    apply_filters(
                        'FHEE__EventEspresso_core_services_graphql_InputCollection__loadCollection__collection_FQCNs',
                        ['EventEspresso\core\domain\services\graphql\inputs']
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
    public function loadInputs()
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