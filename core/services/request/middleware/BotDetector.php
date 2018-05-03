<?php

namespace EventEspresso\core\services\request\middleware;

use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\core\services\request\ResponseInterface;
use EventEspressoVendor\Jaybizzle\CrawlerDetect\CrawlerDetect;

/**
 * Class BotDetector
 * attempts to determine if current user is a bot
 *
 * @package EventEspresso\core\services\request\middleware
 * @author  Brent Christensen
 * @since   4.9.52
 */
class BotDetector extends Middleware
{

    /**
     * converts a Request to a Response
     *
     * @param RequestInterface  $request
     * @param ResponseInterface $response
     * @return ResponseInterface
     */
    public function handleRequest(RequestInterface $request, ResponseInterface $response)
    {
        $this->request = $request;
        $this->response = $response;
        /** @var CrawlerDetect $CrawlerDetect */
        $CrawlerDetect = $this->loader->getShared('EventEspressoVendor\Jaybizzle\CrawlerDetect\CrawlerDetect');
        // Check and record the user agent of the current 'visitor'
        $this->request->setIsBot($CrawlerDetect->isCrawler());
        $this->request->setUserAgent($CrawlerDetect->userAgent());
        $this->response = $this->processRequestStack($this->request, $this->response);
        return $this->response;
    }
}
