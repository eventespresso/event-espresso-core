<?php

namespace EventEspresso\core\domain\services\contexts;

use EventEspresso\core\domain\entities\contexts\RequestTypeContext;
use EventEspresso\core\services\context\ContextChecker;

/**
 * Class RequestTypeContextChecker
 * Service class that provides useful methods for evaluating the current request type
 *
 * @package EventEspresso\core\domain\services\contexts
 * @author  Brent Christensen
 * @since   4.9.59.p
 */
class RequestTypeContextChecker extends ContextChecker implements RequestTypeContextCheckerInterface
{

    /**
     * @var RequestTypeContext $request_type
     */
    private $request_type;


    /**
     * RequestTypeContextChecker constructor.
     *
     * @param RequestTypeContext $request_type
     */
    public function __construct(RequestTypeContext $request_type)
    {
        $this->request_type = $request_type;
        parent::__construct(
            'RequestTypeContextChecker',
            $this->request_type->validRequestTypes()
        );
    }


    /**
     * true if the current request involves some form of activation
     *
     * @return bool
     */
    public function isActivation()
    {
        return $this->request_type->isActivation();
    }


    /**
     * @param $is_activation
     * @return bool
     */
    public function setIsActivation($is_activation)
    {
        return $this->request_type->setIsActivation($is_activation);
    }


    /**
     * true if the current request is for the admin and is not being made via AJAX
     *
     * @return bool
     */
    public function isAdmin()
    {
        return $this->request_type->slug() === RequestTypeContext::ADMIN;
    }


    /**
     * true if the current request is for the admin AND is being made via AJAX
     *
     * @return bool
     */
    public function isAdminAjax()
    {
        return $this->request_type->slug() === RequestTypeContext::AJAX_ADMIN;
    }


    /**
     * true if the current request is being made via AJAX... any AJAX
     *
     * @return bool
     */
    public function isAjax()
    {
        return $this->isEeAjax() || $this->isOtherAjax();
    }


    /**
     * true if the current request is for either the EE admin or EE frontend AND is being made via AJAX
     *
     * @return bool
     */
    public function isEeAjax()
    {
        return $this->isAdminAjax() || $this->isFrontAjax();
    }


    /**
     * true if the current request is being made via AJAX but is NOT for EE related logic
     *
     * @return bool
     */
    public function isOtherAjax()
    {
        return $this->request_type->slug() === RequestTypeContext::AJAX_OTHER;
    }

    /**
     * true if the current request is for the EE REST API
     *
     * @return bool
     */
    public function isApi()
    {
        return $this->request_type->slug() === RequestTypeContext::API;
    }


    /**
     * true if the current request is from the command line
     *
     * @return bool
     */
    public function isCli()
    {
        return $this->request_type->slug() === RequestTypeContext::CLI;
    }


    /**
     * true if the current request is for a WP_Cron
     *
     * @return bool
     */
    public function isCron()
    {
        return $this->request_type->slug() === RequestTypeContext::CRON;
    }


    /**
     * true if the current request is for a feed (ie: RSS)
     *
     * @return bool
     */
    public function isFeed()
    {
        return $this->request_type->slug() === RequestTypeContext::FEED;
    }


    /**
     * true if the current request is for the frontend and is not being made via AJAX
     *
     * @return bool
     */
    public function isFrontend()
    {
        return $this->request_type->slug() === RequestTypeContext::FRONTEND;
    }


    /**
     * true if the current request is for the frontend AND is being made via AJAX
     *
     * @return bool
     */
    public function isFrontAjax()
    {
        return $this->request_type->slug() === RequestTypeContext::AJAX_FRONT;
    }


    /**
     * true if the current request is for content that is to be displayed within an iframe
     *
     * @return bool
     */
    public function isIframe()
    {
        return $this->request_type->slug() === RequestTypeContext::IFRAME;
    }


    /**
     * true if the current request is for the WP REST API
     *
     * @return bool
     */
    public function isWordPressApi()
    {
        return $this->request_type->slug() === RequestTypeContext::WP_API;
    }


    /**
     * true if the current request is being made via AJAX for the WP Heartbeat
     *
     * @return bool
     */
    public function isWordPressHeartbeat()
    {
        return $this->request_type->slug() === RequestTypeContext::AJAX_HEARTBEAT;
    }


    /**
     * true if the current request is a loopback sent from WP core to test for errors
     *
     * @return bool
     */
    public function isWordPressScrape()
    {
        return $this->request_type->slug() === RequestTypeContext::WP_SCRAPE;
    }


    /**
     * @return string
     */
    public function slug()
    {
        return $this->request_type->slug();
    }
}
