<?php

namespace EventEspresso\core\domain\values;

use InvalidArgumentException;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class Url
 * Immutable Value Object representing a URL (really simple representation)
 *
 * @package EventEspresso\core\domain\values
 * @author  Brent Christensen
 * @since   4.9.54
 */
class Url
{

    /**
     * @var string $scheme
     */
    private $scheme;

    /**
     * @var string $host
     */
    private $host;

    /**
     * @var string $path
     */
    private $path;

    /**
     * @var string $query_string
     */
    private $query_string;

    /**
     * @var string $fragment
     */
    private $fragment;


    /**
     * Url constructor.
     *
     * @param $url
     * @throws InvalidArgumentException
     */
    public function __construct($url)
    {
        if (! filter_var($url, FILTER_VALIDATE_URL, FILTER_FLAG_HOST_REQUIRED)) {
            throw new InvalidArgumentException(esc_html__('Invalid URL', 'event_espresso'));
        }
        $url = parse_url($url);
        $this->setScheme($url);
        $this->setHost($url);
        $this->setPath($url);
        $this->setQueryString($url);
        $this->setFragment($url);
    }


    /**
     * @return string
     */
    public function scheme()
    {
        return $this->scheme;
    }


    /**
     * @param array $url
     */
    private function setScheme($url)
    {
        if (isset($url['scheme'])) {
            $this->scheme = $url['scheme'] . '://';
            return;
        }
        $this->scheme = is_ssl() ? 'https://' : 'http://';
    }


    /**
     * @return string
     */
    public function host()
    {
        return $this->host;
    }


    /**
     * @param array $url
     */
    private function setHost($url)
    {
        $this->host = $url['host'];
    }


    /**
     * @return string
     */
    public function path()
    {
        return $this->path;
    }


    /**
     * @param array $url
     */
    private function setPath($url)
    {
        $this->path = isset($url['path']) ? $url['path'] : '';
    }


    /**
     * @return string
     */
    public function queryString()
    {
        return $this->query_string !== '' ? '?' . $this->query_string : '';
    }


    /**
     * @param array $url
     */
    private function setQueryString($url)
    {
        $this->query_string = isset($url['query']) ? $url['query'] : '';
    }


    /**
     * @return string
     */
    public function fragment()
    {
        return $this->fragment !== '' ? '#' . $this->fragment : '';
    }


    /**
     * @param array $url
     */
    private function setFragment($url)
    {
        $this->fragment = isset($url['fragment']) ? $url['fragment'] : '';
    }


    /**
     * @return string
     */
    public function getFullUrl()
    {
        return $this->scheme() . $this->host() . $this->path() . $this->queryString() . $this->fragment();
    }


    /**
     * @return string
     */
    public function __toString()
    {
        return $this->getFullUrl();
    }
}
