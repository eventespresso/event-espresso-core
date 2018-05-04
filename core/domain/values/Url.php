<?php

namespace EventEspresso\core\domain\values;

use InvalidArgumentException;

/**
 * Class Url
 * Immutable Value Object representing a URL
 * But just a really simple representation
 * ie: does not fully support FTP or authority (username, password, port)
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
     * @var string $query
     */
    private $query;

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
        if (! filter_var(
            $url,
            FILTER_VALIDATE_URL,
            array(FILTER_FLAG_SCHEME_REQUIRED, FILTER_FLAG_HOST_REQUIRED)
        )) {
            throw new InvalidArgumentException(
                esc_html__(
                    'Invalid URL. Both the "Scheme" and "Host" are required.',
                    'event_espresso'
                )
            );
        }
        $url = parse_url($url);
        $this->setScheme($url);
        $this->setHost($url);
        $this->setPath($url);
        $this->setQuery($url);
        $this->setFragment($url);
    }


    /**
     * For a URL like: abc://username:password@example.com:123/path/data?key=value#id
     * will return a string like: 'abc://'
     *
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
        $this->scheme = $url['scheme'] . '://';
    }


    /**
     * For a URL like: abc://username:password@example.com:123/path/data?key=value#id
     * will return a string like: 'example.com'
     *
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
     * For a URL like: abc://username:password@example.com:123/path/data?key=value#id
     * will return a string like: '/path/data'
     *
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
     * For a URL like: abc://username:password@example.com:123/path/data?key=value#id
     * will return a string like: '?key=value'
     *
     * @return string
     */
    public function queryString()
    {
        return $this->query !== '' ? '?' . $this->query : '';
    }


    /**
     * For a URL like: abc://username:password@example.com:123/path/data?key=value#id
     * will return an array like: array('key' => 'value')
     *
     * @return array
     */
    public function queryParams()
    {
        return wp_parse_args($this->query);
    }


    /**
     * @param array $url
     */
    private function setQuery($url)
    {
        $this->query = isset($url['query']) ? $url['query'] : '';
    }


    /**
     * For a URL like: abc://username:password@example.com:123/path/data?key=value#id
     * will return a string like: '#id'
     *
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
     * For a URL like: abc://username:password@example.com:123/path/data?key=value#id
     * will return a string like: 'abc://example.com/path/data?key=value#id'
     *
     * @return string
     */
    public function getFullUrl()
    {
        return $this->scheme() . $this->host() . $this->path() . $this->queryString() . $this->fragment();
    }


    /**
     * For a URL like: abc://username:password@example.com:123/path/data?key=value#id
     * will return a string like: 'abc://example.com/path/data?key=value#id'
     *
     * @return string
     */
    public function __toString()
    {
        return $this->getFullUrl();
    }
}
