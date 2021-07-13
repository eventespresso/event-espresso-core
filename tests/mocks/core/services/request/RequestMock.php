<?php

namespace EventEspresso\tests\mocks\core\services\request;

use EventEspresso\core\domain\services\contexts\RequestTypeContextCheckerInterface;
use EventEspresso\core\services\request\Request;

/**
 * Class RequestMock
 * Description
 *
 * @package EventEspresso\tests\mocks\core\services\request
 * @author  Brent Christensen
 * @since   4.9.70.p
 */
class RequestMock extends Request
{

	public function __construct(
        array $get,
        array $post,
        array $cookie,
        array $server,
        array $files = [],
        $ip_address = '0.0.0.0'
    ) {
        $this->resetRequestParams($get, $post, $cookie, $server, $files, $ip_address);
        parent::__construct($get, $post, $cookie, $server);
    }


	public function resetRequestParams(
        array $get = [],
        array $post = [],
        array $cookie = [],
        array $server = [],
        array $files = [],
        $ip_address = '0.0.0.0'
    ) {
        $this->get        = $get;
        $this->post       = $post;
        $this->cookie     = $cookie;
        $this->server     = $server;
        $this->files      = $files;
        $this->request    = array_merge($this->get, $this->post);
        $this->ip_address = $this->visitorIp($ip_address);
    }


	/**
     * @param string $visitor_ip
     * @return string
     */
    public function visitorIp($visitor_ip = '0.0.0.0')
    {
        return $visitor_ip;
    }
}
