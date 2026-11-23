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
        $this->request  = $request;
        $this->response = $response;
        $crawler_detect = $this->loader->getShared(CrawlerDetect::class);
        if ($crawler_detect instanceof CrawlerDetect) {
            // Check and record the user agent of the current 'visitor'
            $this->request->setIsBot($crawler_detect->isCrawler());
            // getUserAgent() is absent from older CrawlerDetect versions a third-party plugin may load first
            if (method_exists($crawler_detect, 'getUserAgent')) {
                $this->request->setUserAgent($crawler_detect->getUserAgent());
            }
        }
        $this->response = $this->processRequestStack($this->request, $this->response);
        return $this->response;
    }
}
