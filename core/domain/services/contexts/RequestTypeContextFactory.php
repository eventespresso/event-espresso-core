<?php

namespace EventEspresso\core\domain\services\contexts;

use EventEspresso\core\domain\entities\contexts\RequestTypeContext;
use EventEspresso\core\services\loaders\LoaderInterface;

/**
 * Class RequestTypeContextFactory
 * Factory class for generating RequestTypeContext objects
 * and ensuring they are available everywhere via the Loader
 *
 * @package EventEspresso\core\domain\services\contexts
 * @author  Brent Christensen
 * @since   4.9.51
 */
class RequestTypeContextFactory implements RequestTypeContextFactoryInterface
{
    private LoaderInterface $loader;


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
     * @return RequestTypeContext
     */
    public function create(string $slug): RequestTypeContext
    {
        switch ($slug) {
            case RequestTypeContext::ACTIVATION:
                $description = 'The current request is for some form of activation';
                break;
            case RequestTypeContext::API:
                $description = 'The current request is for the EE REST API';
                break;
            case RequestTypeContext::AJAX_FRONT:
                $description = 'The current request is for the frontend via AJAX';
                break;
            case RequestTypeContext::AJAX_ADMIN:
                $description = 'The current request is for the admin via AJAX';
                break;
            case RequestTypeContext::AJAX_HEARTBEAT:
                $description = 'The current request is for the WP Heartbeat';
                break;
            case RequestTypeContext::AJAX_OTHER:
                $description = 'The current request is for non-EE related code via AJAX';
                break;
            case RequestTypeContext::CRON:
                $description = 'The current request is for a WP_Cron';
                break;
            case RequestTypeContext::CLI:
                $description = 'The current request is from the command line';
                break;
            case RequestTypeContext::ADMIN:
                $description = 'The current request is for the admin';
                break;
            case RequestTypeContext::IFRAME:
                $description = 'The current request is for an iframe';
                break;
            case RequestTypeContext::FEED:
                $description = 'The current request is for a feed (ie: RSS)';
                break;
            case RequestTypeContext::GQL:
                $description = 'The current request is for the EE GraphQL Manager';
                break;
            case RequestTypeContext::WP_API:
                $description = 'The current request is for the WordPress REST API';
                break;
            case RequestTypeContext::WP_SCRAPE:
                $description = 'The current request is for a WordPress loopback scrape';
                break;
            case RequestTypeContext::FRONTEND:
            default:
                $description = 'The current request is for the frontend';
                break;
        }
        // we're using the Loader with sharing turned on,
        // so that the generated RequestTypeContext object is accessible anywhere
        // by simply requesting it again from the loader
        return $this->loader->getShared(
            'EventEspresso\core\domain\entities\contexts\RequestTypeContext',
            array($slug, $description)
        );
    }
}
