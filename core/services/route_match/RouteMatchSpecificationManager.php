<?php

namespace EventEspresso\core\services\route_match;

use EventEspresso\core\domain\entities\route_match\RouteMatchSpecificationInterface;
use EventEspresso\core\exceptions\InvalidClassException;
use EventEspresso\core\services\collections\CollectionDetails;
use EventEspresso\core\services\collections\CollectionDetailsException;
use EventEspresso\core\services\collections\CollectionInterface;
use EventEspresso\core\services\collections\CollectionLoader;
use EventEspresso\core\services\collections\CollectionLoaderException;

/**
 * Class RouteMatchSpecificationManager
 * Manages setup of the RouteMatchSpecificationsCollection
 * and compares specifications in it via the currentRequestMatches() method.
 * Folders containing RouteMatchSpecification classes can be added to the collection using the
 * FHEE__EventEspresso_core_services_route_match_RouteMatchSpecificationManager__populateSpecificationCollection__collection_FQCNs
 * filter prior to the AHEE__EE_System__initialize hookpoint
 *
 *
 * @package EventEspresso\core\services\route_match
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class RouteMatchSpecificationManager
{
    /**
     * @var CollectionInterface[]|RouteMatchSpecificationInterface[] $specifications
     */
    private $specifications;

    /**
     * @var RouteMatchSpecificationFactory $specifications_factory
     */
    private $specifications_factory;


    /**
     * RouteMatchSpecificationManager constructor.
     *
     * @param RouteMatchSpecificationCollection $specifications
     * @param RouteMatchSpecificationFactory    $specifications_factory
     */
    public function __construct(
        RouteMatchSpecificationCollection $specifications,
        RouteMatchSpecificationFactory $specifications_factory
    ) {
        $this->specifications = $specifications;
        $this->specifications_factory = $specifications_factory;
        add_action('AHEE__EE_System__loadRouteMatchSpecifications', array($this, 'initialize'));
    }


    /**
     * Perform any early setup required for block editors to functions
     *
     * @return void
     * @throws CollectionLoaderException
     * @throws CollectionDetailsException
     */
    public function initialize()
    {
        $this->populateSpecificationCollection();
    }


    /**
     * @return CollectionInterface|RouteMatchSpecificationInterface[]
     * @throws CollectionLoaderException
     * @throws CollectionDetailsException
     * @since 4.9.71.p
     */
    private function populateSpecificationCollection()
    {
        $loader = new CollectionLoader(
            new CollectionDetails(
                // collection name
                RouteMatchSpecificationCollection::COLLECTION_NAME,
                // collection interface
                'EventEspresso\core\domain\entities\route_match\RouteMatchSpecificationInterface',
                // FQCNs for classes to add (all classes within each namespace will be loaded)
                apply_filters(
                    'FHEE__EventEspresso_core_services_route_match_RouteMatchSpecificationManager__populateSpecificationCollection__collection_FQCNs',
                    array(
                        'EventEspresso\core\domain\entities\route_match\specifications\admin',
                        'EventEspresso\core\domain\entities\route_match\specifications\frontend',
                    )
                ),
                // filepaths to classes to add
                array(),
                // file mask to use if parsing folder for files to add
                '',
                // what to use as identifier for collection entities
                // using CLASS NAME prevents duplicates (works like a singleton)
                CollectionDetails::ID_CLASS_NAME
            ),
            $this->specifications,
            null,
            $this->specifications_factory
        );
        return $loader->getCollection();
    }


    /**
     * Given the FQCN for a RouteMatchSpecification, will return true if the current request matches
     *
     * @param string $routeMatchSpecificationFqcn fully qualified class name
     * @return bool
     * @throws InvalidClassException
     * @since 4.9.71.p
     */
    public function routeMatchesCurrentRequest($routeMatchSpecificationFqcn)
    {
        /** @var RouteMatchSpecificationInterface $specification */
        $specification = $this->specifications->get($routeMatchSpecificationFqcn);
        if (! $specification instanceof $routeMatchSpecificationFqcn) {
            throw new InvalidClassException($routeMatchSpecificationFqcn);
        }
        return $specification->isMatchingRoute();
    }


    /**
     * Handy method for development that returns
     * a list of existing RouteMatchSpecification classes
     * matching the current request that can be used to identify it.
     * If no matches are returned (or nothing acceptable)
     * then create a new one that better matches your requirements.
     *
     * @return array
     * @since 4.9.71.p
     */
    public function findRouteMatchSpecificationsMatchingCurrentRequest()
    {
        $matches = array();
        foreach ($this->specifications as $specification) {
            /** @var RouteMatchSpecificationInterface $specification */
            if ($specification->isMatchingRoute()) {
                $matches[] = get_class($specification);
            }
        }
        return $matches;
    }
}
