<?php

namespace EventEspresso\core\services\graphql;

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
     * RequestHandler constructor.
     *
     * @param LoaderInterface $loader
     * @param RequestInterface $request
     */
    public function __construct(LoaderInterface $loader, RequestInterface $request)
    {
        $this->loader = $loader;
        $this->request = $request;
    }


    /**
     * @since $VID:$
     */
    public function init()
    {
        \EEH_Debug_Tools::printr(__FUNCTION__, __CLASS__, __FILE__, __LINE__, 2);
        // getting data from current request ($_GET, $_POST, $_REQUEST, etc
        //)
        // retrieve ALL params from $_REQUEST
        $all = $this->request->getParams();
        // retrieve a single param from $_REQUEST
        $one = $this->request->getRequestParam( 'key', 'default value if not found' );
        // retrieve params matching a pattern from $_REQUEST using regex
        $matches = $this->request->getMatch( '/regex-pattern-with-?-or-*-wildcards/', 'default value if not found' );

        $query_data = new \stdClass();
        $query_data->eventId = $one;

        // loading classes

        // get shared instance (works like a singleton)
        $resolver = $this->loader->getShared(
            'EventEspresso\core\domain\services\graphql\resolvers\EventEditorEntities',
            [ $query_data ]
        );
        // get NON-shared unique instance (creates new instance every call)
        $mutator = $this->loader->getNew(
            'EventEspresso\core\domain\services\graphql\mutators\QueryMutator',
            [ $query_data ]
        );
    }

}