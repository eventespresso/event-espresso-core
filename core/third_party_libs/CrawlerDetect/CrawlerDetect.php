<?php
/*
 * This file is part of Crawler Detect - the web crawler detection library.
 *
 * (c) Mark Beech <m@rkbee.ch>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace EventEspressoVendor\CrawlerDetect;

use EventEspressoVendor\CrawlerDetect\Fixtures\Headers;
use EventEspressoVendor\CrawlerDetect\Fixtures\Crawlers;
use EventEspressoVendor\CrawlerDetect\Fixtures\Exclusions;

/**
 * Class CrawlerDetect
 *
 * @package Jaybizzle\CrawlerDetect
 * @author  Mark Beech <m@rkbee.ch>
 */
class CrawlerDetect
{

    /**
     * The user agent.
     *
     * @var null
     */
    protected $userAgent;

    /**
     * Headers that contain a user agent.
     *
     * @var array
     */
    protected $httpHeaders = array();

    /**
     * Store regex matches.
     *
     * @var array
     */
    protected $matches = array();

    /**
     * Crawlers object.
     *
     * @var Crawlers
     */
    protected $crawlers;

    /**
     * Exclusions object.
     *
     * @var Exclusions
     */
    protected $exclusions;

    /**
     * Headers object.
     *
     * @var Headers
     */
    protected $uaHttpHeaders;

    /**
     * The compiled regex string.
     *
     * @var string
     */
    protected $compiledRegex;

    /**
     * The compiled exclusions regex string.
     *
     * @var string
     */
    protected $compiledExclusions;


    /**
     * Class constructor.
     *
     * @param array  $headers
     * @param string $userAgent
     */
    public function __construct(array $headers = array(), $userAgent = '')
    {
        $this->crawlers      = new Crawlers();
        $this->exclusions    = new Exclusions();
        $this->uaHttpHeaders = new Headers();
        $this->compiledRegex      = $this->compileRegex($this->crawlers->getAll());
        $this->compiledExclusions = $this->compileRegex($this->exclusions->getAll());
        $this->setHttpHeaders($headers);
        $this->userAgent = $this->setUserAgent($userAgent);
    }


    /**
     * Compile the regex patterns into one regex string.
     *
     * @param array
     * @return string
     */
    public function compileRegex(array $patterns)
    {
        return '(' . implode('|', $patterns) . ')';
    }


    /**
     * Set HTTP headers.
     *
     * @param array $httpHeaders
     */
    public function setHttpHeaders(array $httpHeaders = array())
    {
        // Use global _SERVER if $httpHeaders aren't defined.
        $httpHeaders = is_array($httpHeaders) && count($httpHeaders) ? $httpHeaders : $_SERVER;
        // Clear existing headers.
        $this->httpHeaders = array();
        // Only save HTTP headers. In PHP land, that means
        // only _SERVER vars that start with HTTP_.
        foreach ($httpHeaders as $key => $value) {
            if (strpos($key, 'HTTP_') === 0) {
                $this->httpHeaders[ $key ] = $value;
            }
        }
    }


    /**
     * Return user agent headers.
     *
     * @return array
     */
    public function getUaHttpHeaders()
    {
        return $this->uaHttpHeaders->getAll();
    }


    /**
     * Set the user agent.
     *
     * @param string $userAgent
     */
    public function setUserAgent($userAgent)
    {
        if ($userAgent === null) {
            foreach ($this->getUaHttpHeaders() as $altHeader) {
                if (isset($this->httpHeaders[ $altHeader ])) {
                    $userAgent .= $this->httpHeaders[ $altHeader ] . ' ';
                }
            }
        }
        $this->userAgent = $userAgent;
    }


    /**
     * Check user agent string against the regex.
     *
     * @param string|null $userAgent
     * @return bool
     */
    public function isCrawler($userAgent = null)
    {
        $this->setUserAgent($userAgent);
        $agent = $this->userAgent();
        $agent = preg_replace('/' . $this->compiledExclusions . '/i', '', $agent);
        if (trim($agent) === '') {
            return false;
        }
        $result = preg_match('/' . $this->compiledRegex . '/i', trim($agent), $matches);
        if ($matches) {
            $this->matches = $matches;
        }
        return (bool) $result;
    }


    /**
     * Return the matches.
     *
     * @return string|null
     */
    public function getMatches()
    {
        return isset($this->matches[0]) ? $this->matches[0] : null;
    }


    /**
     * @return null
     */
    public function userAgent()
    {
        return $this->userAgent;
    }


}
