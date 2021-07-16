<?php

namespace EventEspresso\core\services\request;

use EventEspresso\core\services\request\sanitizers\ServerSanitizer;

class ServerParams
{

    /**
     * IP address for request
     *
     * @var string
     */
    protected $ip_address;


    /**
     * @var ServerSanitizer
     */
    protected $sanitizer;

    /**
     * $_SERVER parameters
     *
     * @var array
     */
    protected $server;

    /**
     * @var string
     */
    protected $request_uri;

    /**
     * @var string
     */
    protected $user_agent;


    /**
     * ServerParams constructor.
     *
     * @param ServerSanitizer $sanitizer
     * @param array           $server
     */
    public function __construct(ServerSanitizer $sanitizer, array $server = [])
    {
        $this->sanitizer  = $sanitizer;
        $this->server     = $this->cleanServerParams($server);
        $this->ip_address = $this->setVisitorIp();
    }


    /**
     * @return array
     */
    private function cleanServerParams(array $server)
    {
        $cleaned = [];
        $server  = ! empty($server) ? $server : $_SERVER;
        foreach (array_keys($server) as $key) {
            $cleaned[ $key ] = $this->sanitizer->clean($key);
        }
        return $cleaned;
    }


    /**
     * @return array
     */
    public function getAllServerParams()
    {
        return $this->server;
    }


    /**
     * @return array
     */
    public function getServerParam($key)
    {
        return isset($this->server[ $key ]) ? $this->server[ $key ] : null;
    }


    /**
     * @return string
     */
    public function ipAddress()
    {
        return $this->ip_address;
    }


    /**
     * attempt to get IP address of current visitor from server
     * plz see: http://stackoverflow.com/a/2031935/1475279
     *
     * @access public
     * @return string
     */
    private function setVisitorIp()
    {
        $visitor_ip  = '0.0.0.0';
        $server_keys = [
            'HTTP_CLIENT_IP',
            'HTTP_X_FORWARDED_FOR',
            'HTTP_X_FORWARDED',
            'HTTP_X_CLUSTER_CLIENT_IP',
            'HTTP_FORWARDED_FOR',
            'HTTP_FORWARDED',
            'REMOTE_ADDR',
        ];
        foreach ($server_keys as $key) {
            if (isset($this->server[ $key ])) {
                foreach (array_map('trim', explode(',', $this->server[ $key ])) as $ip) {
                    if ($ip === '127.0.0.1' || filter_var($ip, FILTER_VALIDATE_IP) !== false) {
                        $visitor_ip = $ip;
                    }
                }
            }
        }
        return $visitor_ip;
    }


    /**
     * Gets the request's literal URI. Related to `requestUriAfterSiteHomeUri`, see its description for a comparison.
     *
     * @param boolean $relativeToWpRoot If home_url() is "http://mysite.com/wp/", and a request comes to
     *                                  "http://mysite.com/wp/wp-json", setting $relativeToWpRoot=true will return
     *                                  "/wp-json", whereas $relativeToWpRoot=false will return "/wp/wp-json/".
     * @return string
     */
    public function requestUri($relativeToWpRoot = false)
    {
        if (empty($this->request_uri)) {
            $this->setRequestUri();
        }
        if ($relativeToWpRoot) {
            $home_path = untrailingslashit(parse_url(home_url(), PHP_URL_PATH));
            return str_replace($home_path, '', $this->request_uri);
        }
        return $this->request_uri;
    }


    /**
     * Gets the request's literal URI. Related to `requestUriAfterSiteHomeUri`, see its description for a comparison.
     *
     * @return void
     */
    public function setRequestUri()
    {
        $this->request_uri = filter_input(
            INPUT_SERVER,
            'REQUEST_URI',
            FILTER_SANITIZE_URL,
            FILTER_NULL_ON_FAILURE
        );
        if (empty($this->request_uri) && isset($this->server['REQUEST_URI'])) {
            // fallback sanitization if the above fails
            $this->request_uri = wp_sanitize_redirect($this->server['REQUEST_URI']);
        }
        if (empty($this->server['REQUEST_URI'])) {
            $this->server['REQUEST_URI'] = $this->request_uri;
        }
    }


    /**
     * @return string
     */
    public function userAgent()
    {
        if (empty($this->user_agent)) {
            $this->setUserAgent();
        }
        return $this->user_agent;
    }


    /**
     * @param string $user_agent
     */
    public function setUserAgent($user_agent = '')
    {
        $this->user_agent = $user_agent === '' || ! is_string($user_agent)
            ? $this->server['HTTP_USER_AGENT']
            : esc_attr($user_agent);
    }
}
