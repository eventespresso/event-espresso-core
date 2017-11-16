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
     * @return RequestTypeContext
     */
    public function create($slug)
    {
        switch ($slug) {
            case RequestTypeContext::ACTIVATION :
                $description = esc_html__(
                    'The current request is for some form of activation',
                    'event_espresso'
                );
                break;
            case RequestTypeContext::API :
                $description = esc_html__(
                    'The current request is for the REST API',
                    'event_espresso'
                );
                break;
            case RequestTypeContext::FRONT_AJAX :
                $description = esc_html__(
                    'The current request is for the frontend via AJAX',
                    'event_espresso'
                );
                break;
            case RequestTypeContext::ADMIN_AJAX :
                $description = esc_html__(
                    'The current request is for the admin via AJAX',
                    'event_espresso'
                );
                break;
            case RequestTypeContext::CRON :
                $description = esc_html__(
                    'The current request is for a WP_Cron',
                    'event_espresso'
                );
                break;
            case RequestTypeContext::CLI :
                $description = esc_html__(
                    'The current request is from the command line',
                    'event_espresso'
                );
                break;
            case RequestTypeContext::ADMIN :
                $description = esc_html__(
                    'The current request is for the admin',
                    'event_espresso'
                );
                break;
            case RequestTypeContext::IFRAME :
                $description = esc_html__(
                    'The current request is for an iframe',
                    'event_espresso'
                );
                break;
            case RequestTypeContext::FEED :
                $description = esc_html__(
                    'The current request is for a feed (ie: RSS)',
                    'event_espresso'
                );
                break;
            case RequestTypeContext::FRONTEND :
            default :
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
// Location: RequestTypeContextFactory.php
