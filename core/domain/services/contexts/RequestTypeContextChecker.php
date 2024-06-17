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
    private RequestTypeContext $request_type;


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
    public function isActivation(): bool
    {
        return ($this->request_type->slug() === RequestTypeContext::ACTIVATION || $this->request_type->isActivation())
            && ! $this->request_type->isUnitTesting();
    }


    /**
     * @param $is_activation
     */
    public function setIsActivation($is_activation)
    {
        $this->request_type->setIsActivation($is_activation);
    }


    /**
     * true if the current request is for the admin and is not being made via AJAX
     *
     * @return bool
     */
    public function isAdmin(): bool
    {
        return $this->request_type->slug() === RequestTypeContext::ADMIN && ! $this->isActivation();
    }


    /**
     * true if the current request is for the admin AND is being made via AJAX
     *
     * @return bool
     */
    public function isAdminAjax(): bool
    {
        return $this->request_type->slug() === RequestTypeContext::AJAX_ADMIN && ! $this->isActivation();
    }


    /**
     * true if the current request is being made via AJAX... any AJAX
     *
     * @return bool
     */
    public function isAjax(): bool
    {
        return $this->isEeAjax() || $this->isOtherAjax();
    }


    /**
     * true if the current request is for either the EE admin or EE frontend AND is being made via AJAX
     *
     * @return bool
     */
    public function isEeAjax(): bool
    {
        return $this->isAdminAjax() || $this->isFrontAjax();
    }


    /**
     * true if the current request is being made via AJAX but is NOT for EE related logic
     *
     * @return bool
     */
    public function isOtherAjax(): bool
    {
        return $this->request_type->slug() === RequestTypeContext::AJAX_OTHER && ! $this->isActivation();
    }

    /**
     * true if the current request is for the EE REST API
     *
     * @return bool
     */
    public function isApi(): bool
    {
        return $this->request_type->slug() === RequestTypeContext::API && ! $this->isActivation();
    }


    /**
     * true if the current request is from the command line
     *
     * @return bool
     */
    public function isCli(): bool
    {
        return $this->request_type->slug() === RequestTypeContext::CLI && ! $this->isActivation();
    }


    /**
     * true if the current request is for a WP_Cron
     *
     * @return bool
     */
    public function isCron(): bool
    {
        return $this->request_type->slug() === RequestTypeContext::CRON && ! $this->isActivation();
    }


    /**
     * true if the current request is for a feed (ie: RSS)
     *
     * @return bool
     */
    public function isFeed(): bool
    {
        return $this->request_type->slug() === RequestTypeContext::FEED && ! $this->isActivation();
    }


    /**
     * true if the current request is for the frontend and is not being made via AJAX
     *
     * @return bool
     */
    public function isFrontend(): bool
    {
        return $this->request_type->slug() === RequestTypeContext::FRONTEND && ! $this->isActivation();
    }


    /**
     * true if the current request is for the frontend AND is being made via AJAX
     *
     * @return bool
     */
    public function isFrontAjax(): bool
    {
        return $this->request_type->slug() === RequestTypeContext::AJAX_FRONT && ! $this->isActivation();
    }


    /**
     * true if the current request is for the EE GraphQL manager
     *
     * @return bool
     */
    public function isGQL(): bool
    {
        return $this->request_type->slug() === RequestTypeContext::GQL && ! $this->isActivation();
    }


    /**
     * true if the current request is for content that is to be displayed within an iframe
     *
     * @return bool
     */
    public function isIframe(): bool
    {
        return $this->request_type->slug() === RequestTypeContext::IFRAME && ! $this->isActivation();
    }


    /**
     * true if the current request is occurring while unit testing
     *
     * @return bool
     */
    public function isUnitTesting(): bool
    {
        return $this->request_type->isUnitTesting() && ! $this->request_type->isActivation();
    }


    /**
     * true if the current request is for the WP REST API
     *
     * @return bool
     */
    public function isWordPressApi(): bool
    {
        return $this->request_type->slug() === RequestTypeContext::WP_API && ! $this->isActivation();
    }


    /**
     * true if the current request is being made via AJAX for the WP Heartbeat
     *
     * @return bool
     */
    public function isWordPressHeartbeat(): bool
    {
        return $this->request_type->slug() === RequestTypeContext::AJAX_HEARTBEAT && ! $this->isActivation();
    }


    /**
     * true if the current request is a loopback sent from WP core to test for errors
     *
     * @return bool
     */
    public function isWordPressScrape(): bool
    {
        return $this->request_type->slug() === RequestTypeContext::WP_SCRAPE;
    }


    /**
     * @return string
     */
    public function slug(): string
    {
        return $this->request_type->slug();
    }
}
