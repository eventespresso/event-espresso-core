<?php

namespace EventEspresso\core\domain\entities\contexts;

use InvalidArgumentException;

/**
 * Class RequestTypeContext
 * A Context DTO dedicated solely to identifying the current request type.
 * Intended to be used with a corresponding RequestTypeContextChecker class
 *
 * @package EventEspresso\core\domain\entities\contexts
 * @author  Brent Christensen
 * @since   4.9.51
 */
class RequestTypeContext extends Context
{

    /**
     * indicates that the current request involves some form of activation
     */
    const ACTIVATION = 'activation-request';

    /**
     * indicates that the current request is for the admin but is not being made via AJAX
     */
    const ADMIN = 'non-ajax-admin-request';

    /**
     * indicates that the current request is for the admin AND is being made via AJAX
     */
    const AJAX_ADMIN = 'admin-ajax-request';

    /**
     * indicates that the current request is for the frontend AND is being made via AJAX
     */
    const AJAX_FRONT = 'frontend-ajax-request';

    /**
     * indicates that the current request is for the WP Heartbeat
     */
    const AJAX_HEARTBEAT = 'admin-ajax-heartbeat';

    /**
     * indicates that the current request is being made via AJAX, but is NOT for EE
     */
    const AJAX_OTHER = 'other-ajax-request';

    /**
     * indicates that the current request is for the EE REST API
     */
    const API = 'rest-api';

    /**
     * indicates that the current request is from the command line
     */
    const CLI = 'command-line';

    /**
     * indicates that the current request is for a WP_Cron
     */
    const CRON = 'wp-cron';

    /**
     * indicates that the current request is for a feed (ie: RSS)
     */
    const FEED = 'feed-request';

    /**
     * indicates that the current request is for the frontend but is not being made via AJAX
     */
    const FRONTEND = 'non-ajax-frontend-request';

    /**
     * indicates that the current request is for content that is to be displayed within an iframe
     */
    const IFRAME = 'iframe-request';

    /**
     * indicates that the current request is for the WP REST API
     */
    const WP_API = 'wp-rest-api';

    /**
     * indicates that the current request is a loopback sent from WP core to test for errors
     */
    const WP_SCRAPE = 'wordpress-scrape';

    /**
     * @var boolean $is_activation
     */
    private $is_activation = false;

    /**
     * @var array $valid_request_types
     */
    private $valid_request_types = array();


    /**
     * RequestTypeContext constructor.
     *
     * @param string $slug
     * @param string $description
     * @throws InvalidArgumentException
     */
    public function __construct($slug, $description)
    {
        parent::__construct($slug, $description);
        if (! in_array($this->slug(), $this->validRequestTypes(), true)) {
            throw new InvalidArgumentException(
                sprintf(
                    esc_html__(
                        'The RequestTypeContext slug must be one of the following values: %1$s %2$s',
                        'event_espresso'
                    ),
                    var_export($this->validRequestTypes(), true)
                )
            );
        }
    }


    /**
     * @return array
     */
    public function validRequestTypes()
    {
        if (empty($this->valid_request_types)) {
            $this->valid_request_types = apply_filters(
                'FHEE__EventEspresso_core_domain_entities_contexts_RequestTypeContext__validRequestTypes',
                array(
                    RequestTypeContext::ACTIVATION,
                    RequestTypeContext::ADMIN,
                    RequestTypeContext::AJAX_ADMIN,
                    RequestTypeContext::AJAX_FRONT,
                    RequestTypeContext::AJAX_HEARTBEAT,
                    RequestTypeContext::AJAX_OTHER,
                    RequestTypeContext::API,
                    RequestTypeContext::CLI,
                    RequestTypeContext::CRON,
                    RequestTypeContext::FEED,
                    RequestTypeContext::FRONTEND,
                    RequestTypeContext::IFRAME,
                    RequestTypeContext::WP_API,
                    RequestTypeContext::WP_SCRAPE,
                )
            );
        }
        return $this->valid_request_types;
    }


    /**
     * @return bool
     */
    public function isActivation()
    {
        return $this->is_activation;
    }


    /**
     * @param bool $is_activation
     */
    public function setIsActivation($is_activation)
    {
        $this->is_activation = filter_var($is_activation, FILTER_VALIDATE_BOOLEAN);
    }
}
