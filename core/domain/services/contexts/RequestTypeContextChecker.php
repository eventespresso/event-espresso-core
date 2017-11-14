<?php

namespace EventEspresso\core\domain\services\contexts;

use EventEspresso\core\domain\entities\contexts\RequestTypeContext;
use EventEspresso\core\services\context\ContextChecker;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class RequestTypeContextChecker
 * Service class that provides useful methods for evaluating the current request type
 *
 * @package EventEspresso\core\domain\services\contexts
 * @author  Brent Christensen
 * @since   $VID:$
 */
class RequestTypeContextChecker extends ContextChecker
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
     * @return bool
     */
    public function isActivation()
    {
        return $this->request_type->slug() === RequestTypeContext::ACTIVATION;
    }


    /**
     * @return bool
     */
    public function isAdmin()
    {
        return $this->request_type->slug() === RequestTypeContext::ADMIN;
    }


    /**
     * @return bool
     */
    public function isAdminAjax()
    {
        return $this->request_type->slug() === RequestTypeContext::ADMIN_AJAX;
    }


    /**
     * @return bool
     */
    public function isApi()
    {
        return $this->request_type->slug() === RequestTypeContext::API;
    }


    /**
     * @return mixed
     */
    public function isFeed()
    {
        return $this->request_type->slug() === RequestTypeContext::FEED;
    }


    /**
     * @return mixed
     */
    public function isFrontend()
    {
        return $this->request_type->slug() === RequestTypeContext::FRONTEND;
    }


    /**
     * @return mixed
     */
    public function isFrontAjax()
    {
        return $this->request_type->slug() === RequestTypeContext::FRONT_AJAX;
    }


    /**
     * @return mixed
     */
    public function isIframe()
    {
        return $this->request_type->slug() === RequestTypeContext::IFRAME;
    }

}
// Location: RequestTypeContextChecker.php
