<?php

namespace EventEspresso\core\services\request;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Interface RequestStackCoreApp
 *
 * @package EventEspresso\core\services\request
 * @author  Brent Christensen
 * @since   4.9.59.p
 */
interface RequestStackCoreAppInterface
{

    /**
     * gives the core app a chance to handle the response after the request stack has fully processed
     *
     * @param RequestInterface $request
     * @param ResponseInterface      $response
     */
    public function handleResponse(RequestInterface $request, ResponseInterface $response);

}
// Location: RequestStackCoreApp.php
