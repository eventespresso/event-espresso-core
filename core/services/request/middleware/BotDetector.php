<?php

namespace EventEspresso\core\services\request\middleware;

use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\core\services\request\ResponseInterface;
use Jaybizzle\CrawlerDetect\CrawlerDetect;

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
    public function handleRequest(RequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $this->request = $request;
        $this->response = $response;
        $CrawlerDetect = $this->loader->getShared(CrawlerDetect::class);
        if ($CrawlerDetect instanceof CrawlerDetect) {
            // Check and record the user agent of the current 'visitor'
            $this->request->setIsBot($CrawlerDetect->isCrawler());
            $this->request->setUserAgent($CrawlerDetect->getUserAgent());
        }
        $this->response = $this->processRequestStack($this->request, $this->response);
        return $this->response;
    }
}
