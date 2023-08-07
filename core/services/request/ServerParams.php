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
     * sanitized $_SERVER parameters
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
     * @param array $server
     * @return array
     */
    private function cleanServerParams(array $server): array
    {
        $cleaned = [];
        foreach ($server as $key => $value) {
            $cleaned[ $key ] = $this->sanitizer->clean($key, $value);
        }
        return $cleaned;
    }


    /**
     * @return array
     */
    public function getAllServerParams(): array
    {
        return $this->server;
    }


    /**
     * @param string     $key
     * @param mixed|null $default
     * @return array|int|float|string
     */
    public function getServerParam(string $key, $default = null)
    {
        return $this->serverParamIsSet($key) ? $this->server[ $key ] : $default;
    }


    /**
     * @param string                 $key
     * @param array|int|float|string $value
     * @param bool                   $set_global_too
     * @return void
     */
    public function setServerParam(string $key, $value, bool $set_global_too = false)
    {
        $value                = $this->sanitizer->clean($key, $value);
        $this->server[ $key ] = $value;
        if ($set_global_too) {
            $_SERVER[ $key ] = $value;
        }
    }


    /**
     * @param string $key
     * @param bool   $unset_from_global_too
     * @return void
     */
    public function unSetServerParam(string $key, bool $unset_from_global_too = false)
    {
        // because unset may not actually remove var
        $this->server[ $key ] = null;
        unset($this->server[ $key ]);
        if ($unset_from_global_too) {
            unset($_SERVER[ $key ]);
        }
    }


    /**
     * @param string $key
     * @return bool
     */
    public function serverParamIsSet(string $key): bool
    {
        return isset($this->server[ $key ]);
    }


    /**
     * @return string
     */
    public function ipAddress(): string
    {
        return (string) $this->ip_address;
    }


    /**
     * attempt to get IP address of current visitor from server
     * plz see: http://stackoverflow.com/a/2031935/1475279
     *
     * @return string
     */
    private function setVisitorIp(): string
    {
        $visitor_ip  = '0.0.0.0';
        $server_keys = [
            'HTTP_CLIENT_IP',
            'HTTP_FORWARDED',
            'HTTP_FORWARDED_FOR',
            'HTTP_X_CLUSTER_CLIENT_IP',
            'HTTP_X_FORWARDED',
            'HTTP_X_FORWARDED_FOR',
            'REMOTE_ADDR',
        ];
        foreach ($server_keys as $key) {
            if (isset($this->server[ $key ])) {
                $potential_ip = array_map('trim', explode(',', $this->server[ $key ]));
                foreach ($potential_ip as $ip) {
                    if ($ip === '127.0.0.1' || filter_var($ip, FILTER_VALIDATE_IP) !== false) {
                        $visitor_ip = $ip;
                    }
                }
            }
        }
        return (string) $visitor_ip;
    }


    /**
     * Gets the request's literal URI. Related to `requestUriAfterSiteHomeUri`, see its description for a comparison.
     *
     * @param boolean $relativeToWpRoot If home_url() is "http://mysite.com/wp/", and a request comes to
     *                                  "http://mysite.com/wp/wp-json", setting $relativeToWpRoot=true will return
     *                                  "/wp-json", whereas $relativeToWpRoot=false will return "/wp/wp-json/".
     * @return string
     */
    public function requestUri(bool $relativeToWpRoot = false): string
    {
        if ($relativeToWpRoot) {
            $home_path = parse_url(home_url(), PHP_URL_PATH);
            $home_path = trim((string) $home_path, '/');
            $home_path = ! empty($home_path)
                ? trailingslashit($home_path)
                : $home_path;
            return str_replace($home_path, '', (string) ($this->server['REQUEST_URI'] ?? ''));
        }
        return $this->server['REQUEST_URI'];
    }


    /**
     * @return string
     */
    public function userAgent(): string
    {
        if (empty($this->user_agent)) {
            $this->setUserAgent();
        }
        return (string) $this->user_agent;
    }


    /**
     * @param string|null $user_agent
     */
    public function setUserAgent(?string $user_agent = '')
    {
        $this->user_agent = $user_agent === '' || ! is_string($user_agent)
            ? (string) $this->getServerParam('HTTP_USER_AGENT', 'unknown')
            : (string) esc_attr($user_agent);
    }
}
