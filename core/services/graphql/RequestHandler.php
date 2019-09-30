<?php

namespace EventEspresso\core\services\graphql;

use EventEspresso\core\services\collections\CollectionDetails;
use EventEspresso\core\services\collections\CollectionDetailsException;
use EventEspresso\core\services\collections\CollectionInterface;
use EventEspresso\core\services\collections\CollectionLoader;
use EventEspresso\core\services\collections\CollectionLoaderException;
use EventEspresso\core\services\loaders\LoaderInterface;
use EventEspresso\core\services\request\RequestInterface;

/**
 * Class RequestHandler
 * Description
 *
 * @package EventEspresso\core\services\graphql
 * @author  Brent Christensen
 * @since   $VID:$
 */
class RequestHandler
{

    /**
     * @var LoaderInterface $loader
     */
    protected $loader;

    /**
     * @var RequestInterface $request
     */
    protected $request;

    /**
     * @var CollectionInterface|ResolverInterface[] $resolvers
     */
    private $resolvers;


    /**
     * RequestHandler constructor.
     *
     * @param ResolverCollection $resolvers
     * @param RequestInterface $request
     * @param LoaderInterface $loader
     */
    public function __construct(ResolverCollection $resolvers, RequestInterface $request, LoaderInterface $loader)
    {
        $this->resolvers = $resolvers;
        $this->request = $request;
        $this->loader = $loader;
    }


    /**
     * @return CollectionInterface|ResolverInterface[]
     * @throws CollectionLoaderException
     * @throws CollectionDetailsException
     * @since 4.9.71.p
     */
    private function populateResolverCollection()
    {
        $loader = new CollectionLoader(
            new CollectionDetails(
            // collection name
                ResolverCollection::COLLECTION_NAME,
                // collection interface
                'EventEspresso\core\services\graphql\ResolverInterface',
                // FQCNs for classes to add (all classes within each namespace will be loaded)
                apply_filters(
                    'FHEE__EventEspresso_core_services_graphql_RequestHandler__populateResolverCollection__collection_FQCNs',
                    ['EventEspresso\core\domain\services\graphql\resolvers']
                ),
                // filepaths to classes to add
                array(),
                // file mask to use if parsing folder for files to add
                '',
                // what to use as identifier for collection entities
                // using CLASS NAME prevents duplicates (works like a singleton)
                CollectionDetails::ID_CLASS_NAME
            ),
            $this->resolvers
        );
        return $loader->getCollection();
    }


    /**
     * @throws CollectionDetailsException
     * @throws CollectionLoaderException
     * @since $VID:$
     */
    public function init()
    {
        // getting data from current request ( $_GET, $_POST, $_REQUEST, etc )
        // retrieve ALL params from $_REQUEST
        $all = $this->request->getParams();
        // retrieve a single param from $_REQUEST
        $one = $this->request->getRequestParam( 'key', 'default value if not found' );
        // retrieve params matching a pattern from $_REQUEST using regex
        $matches = $this->request->getMatch( '/regex-pattern-with-?-or-*-wildcards/', 'default value if not found' );

        $query_data = new \stdClass();
        $query_data->eventId = 1;

        // loading classes

        // get shared instance (works like a singleton)
        $sharedClass = $this->loader->getShared(
            'EventEspresso\core\domain\services\graphql\mutators\QueryMutator',
            [ $query_data ]
        );
        // get NON-shared unique instance (creates new instance every call)
        $uniqueClass = $this->loader->getNew(
            'EventEspresso\core\domain\services\graphql\mutators\QueryMutator',
            [ $query_data ]
        );

        // Register GQL resolvers by first loading all ResolverInterface objects
        // in EventEspresso\core\domain\services\graphql\resolvers.
        // Other folders can be added to that list by addons
        // simply by using the collection FQCNs filter in that method.
        // Alternately, an addon could load a shared instance of the collection
        // and manually add/remove/replace resolvers as needed
        $this->populateResolverCollection();
        add_action('graphql_register_types', [$this, 'registerResolvers']);
    }


    public function registerResolvers()
    {
        // loop through the collection of resolvers and register them.
        // We're taking care of calling register_graphql_field() from here,
        // which centralizes where everything happens, allowing for more control
        // and making the resolver classes easier to unit test because
        // they are decoupled from the third party api
        foreach ($this->resolvers as $resolver) {
            /** @var ResolverInterface $resolver */
             register_graphql_field(
                $resolver->query(),
                $resolver->field(),
                [
                    'type'    => $resolver->type(),
                    'resolve' => [$resolver, 'resolve']
                ]
            );

        }
    }

}