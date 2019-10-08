<?php

namespace EventEspresso\core\services\graphql;

use EventEspresso\core\services\collections\CollectionDetailsException;
use EventEspresso\core\services\collections\CollectionInterface;
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
     * @throws CollectionDetailsException
     * @throws CollectionLoaderException
     * @since $VID:$
     */
    public function init()
    {
        // Register GQL resolvers by first loading all ResolverInterface objects
        // in EventEspresso\core\domain\services\graphql\resolvers.
        // Other folders can be added to that list by addons
        // simply by using the collection FQCNs filter in that method.
        // Alternately, an addon could load a shared instance of the collection
        // and manually add/remove/replace resolvers as needed
        $this->resolvers->loadResolvers();
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