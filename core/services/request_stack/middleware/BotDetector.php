<?php

namespace EventEspresso\core\services\request_stack\middleware;

use EE_Request;
use EE_Response;
use EventEspressoVendor\Jaybizzle\CrawlerDetect\CrawlerDetect;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class BotDetector
 * attempts to determine if current user is a bot
 *
 * @package EventEspresso\core\services\request_stack\middleware
 * @author  Brent Christensen
 * @since   4.9.52
 */
class BotDetector extends Middleware
{

    /**
     * converts a Request to a Response
     *
     * @param    EE_Request  $request
     * @param    EE_Response $response
     * @return    EE_Response
     */
    public function handle_request(EE_Request $request, EE_Response $response)
    {
        $this->request  = $request;
        $this->response = $response;
        $CrawlerDetect = new CrawlerDetect;
        // Check the user agent of the current 'visitor'
        $this->request->setIsBot($CrawlerDetect->isCrawler());
        $this->response = $this->process_request_stack($this->request, $this->response);
        return $this->response;
    }

}
// Location: BotDetector.php
