<?php

namespace EventEspresso\core\domain\services\contexts;

use EventEspresso\core\domain\entities\contexts\RequestTypeContext;
use EventEspresso\core\services\loaders\LoaderInterface;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class RequestTypeContextFactory
 * Factory class for generating RequestTypeContext objects
 * and ensuring they are available everywhere via the Loader
 *
 * @package EventEspresso\core\domain\services\contexts
 * @author  Brent Christensen
 * @since   4.9.51
 */
class RequestTypeContextFactory
{

    /**
     * @var LoaderInterface $loader
     */
    private $loader;


    /**
     * RequestTypeContextFactory constructor.
     *
     * @param LoaderInterface $loader
     */
    public function __construct(LoaderInterface $loader)
    {
        $this->loader = $loader;
    }


    /**
     * @param string $slug
     * @param string $description
     * @return RequestTypeContext
     */
    public function createRequestTypeContext($slug, $description)
    {
        // we're using the Loader with sharing turned on,
        // so that the generated RequestTypeContext object is accessible anywhere
        // by simply requesting it again from the loader
        return $this->loader->getShared(
            'EventEspresso\core\domain\entities\contexts\RequestTypeContext',
            array($slug, $description)
        );
    }


}
// Location: RequestTypeContextFactory.php
