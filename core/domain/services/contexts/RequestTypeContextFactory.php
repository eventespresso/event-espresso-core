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
     * @return RequestTypeContext
     */
    public function create($slug)
    {
        switch ($slug) {
            case RequestTypeContext::ACTIVATION:
                $description = esc_html__(
                    'The current request is for some form of activation',
                    'event_espresso'
                );
                break;
            case RequestTypeContext::API:
                $description = esc_html__(
                    'The current request is for the EE REST API',
                    'event_espresso'
                );
                break;
            case RequestTypeContext::AJAX_FRONT:
                $description = esc_html__(
                    'The current request is for the frontend via AJAX',
                    'event_espresso'
                );
                break;
            case RequestTypeContext::AJAX_ADMIN:
                $description = esc_html__(
                    'The current request is for the admin via AJAX',
                    'event_espresso'
                );
                break;
            case RequestTypeContext::AJAX_HEARTBEAT:
                $description = esc_html__(
                    'The current request is for the WP Heartbeat',
                    'event_espresso'
                );
                break;
            case RequestTypeContext::AJAX_OTHER:
                $description = esc_html__(
                    'The current request is for non-EE related code via AJAX',
                    'event_espresso'
                );
                break;
            case RequestTypeContext::CRON:
                $description = esc_html__(
                    'The current request is for a WP_Cron',
                    'event_espresso'
                );
                break;
            case RequestTypeContext::CLI:
                $description = esc_html__(
                    'The current request is from the command line',
                    'event_espresso'
                );
                break;
            case RequestTypeContext::ADMIN:
                $description = esc_html__(
                    'The current request is for the admin',
                    'event_espresso'
                );
                break;
            case RequestTypeContext::IFRAME:
                $description = esc_html__(
                    'The current request is for an iframe',
                    'event_espresso'
                );
                break;
            case RequestTypeContext::FEED:
                $description = esc_html__(
                    'The current request is for a feed (ie: RSS)',
                    'event_espresso'
                );
                break;
            case RequestTypeContext::WP_API:
                $description = esc_html__(
                    'The current request is for the WordPress REST API',
                    'event_espresso'
                );
                break;
            case RequestTypeContext::WP_SCRAPE:
                $description = esc_html__(
                    'The current request is for a WordPress loopback scrape',
                    'event_espresso'
                );
                break;
            case RequestTypeContext::FRONTEND:
            default:
                $description = esc_html__(
                    'The current request is for the frontend',
                    'event_espresso'
                );
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
