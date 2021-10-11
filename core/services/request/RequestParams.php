<?php

namespace EventEspresso\core\services\request;

use EventEspresso\core\services\request\sanitizers\RequestSanitizer;

/**
 * Class RequestParams
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\services\request
 * @since   4.10.14.p
 */
class RequestParams
{

    /**
     * $_GET parameters
     *
     * @var array
     */
    protected $get;

    /**
     * $_POST parameters
     *
     * @var array
     */
    protected $post;

    /**
     * $_REQUEST parameters
     *
     * @var array
     */
    protected $request;

    /**
     * @var RequestSanitizer
     */
    protected $sanitizer;


    /**
     * RequestParams constructor.
     *
     * @param RequestSanitizer $sanitizer
     * @param array            $get
     * @param array            $post
     */
    public function __construct(RequestSanitizer $sanitizer, array $get = [], array $post = [])
    {
        $this->sanitizer = $sanitizer;
        $this->get       = ! empty($get) ? $get : (array) filter_input_array(INPUT_GET, FILTER_SANITIZE_STRING);
        $this->post      = ! empty($post) ? $post : (array) filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
        $this->request   = array_merge($this->get, $this->post);
    }


    /**
     * @return array
     */
    public function getParams()
    {
        return $this->get;
    }


    /**
     * @return array
     */
    public function postParams()
    {
        return $this->post;
    }


    /**
     * returns contents of $_REQUEST
     *
     * @return array
     */
    public function requestParams()
    {
        return $this->request;
    }


    /**
     * @param string     $key
     * @param mixed|null $value
     * @param bool       $override_ee
     * @return    void
     */
    public function setRequestParam($key, $value, $override_ee = false)
    {
        // don't allow "ee" to be overwritten unless explicitly instructed to do so
        if ($override_ee || $key !== 'ee' || empty($this->request['ee'])) {
            $this->request[ $key ] = $value;
        }
    }


    /**
     * returns   the value for a request param if the given key exists
     *
     * @param string     $key
     * @param mixed|null $default
     * @param string     $type      the expected data type for the parameter's value, ie: string, int, bool, etc
     * @param bool       $is_array  if true, then parameter value will be treated as an array of $type
     * @param string     $delimiter for CSV type strings that should be returned as an array
     * @return array|bool|float|int|string
     */
    public function getRequestParam($key, $default = null, $type = 'string', $is_array = false, $delimiter = '')
    {
        return $this->sanitizer->clean(
            $this->parameterDrillDown($key, $default, 'get'),
            $type,
            $is_array,
            $delimiter
        );
    }


    /**
     * check if param exists
     *
     * @param string $key
     * @return bool
     */
    public function requestParamIsSet($key)
    {
        return (bool) $this->parameterDrillDown($key);
    }


    /**
     * check if a request parameter exists whose key that matches the supplied wildcard pattern
     * and return the value for the first match found
     * wildcards can be either of the following:
     *      ? to represent a single character of any type
     *      * to represent one or more characters of any type
     *
     * @param string     $pattern
     * @param mixed|null $default
     * @param string     $type      the expected data type for the parameter's value, ie: string, int, bool, etc
     * @param bool       $is_array  if true, then parameter value will be treated as an array of $type
     * @param string     $delimiter for CSV type strings that should be returned as an array
     * @return array|bool|float|int|string
     */
    public function getMatch($pattern, $default = null, $type = 'string', $is_array = false, $delimiter = '')
    {
        return $this->sanitizer->clean(
            $this->parameterDrillDown($pattern, $default, 'match'),
            $type,
            $is_array,
            $delimiter
        );
    }


    /**
     * check if a request parameter exists whose key matches the supplied wildcard pattern
     * wildcards can be either of the following:
     *      ? to represent a single character of any type
     *      * to represent one or more characters of any type
     * returns true if a match is found or false if not
     *
     * @param string $pattern
     * @return bool
     */
    public function matches($pattern)
    {
        return (bool) $this->parameterDrillDown($pattern, false, 'match', 'bool');
    }


    /**
     * @see https://stackoverflow.com/questions/6163055/php-string-matching-with-wildcard
     * @param string $pattern               A string including wildcards to be converted to a regex pattern
     *                                      and used to search through the current request's parameter keys
     * @param array  $request_params        The array of request parameters to search through
     * @param mixed  $default               [optional] The value to be returned if no match is found.
     *                                      Default is null
     * @param string $return                [optional] Controls what kind of value is returned.
     *                                      Options are:
     *                                      'bool' will return true or false if match is found or not
     *                                      'key' will return the first key found that matches the supplied pattern
     *                                      'value' will return the value for the first request parameter
     *                                      whose key matches the supplied pattern
     *                                      Default is 'value'
     * @return boolean|string
     */
    private function match($pattern, array $request_params, $default = null, $return = 'value')
    {
        $return = in_array($return, ['bool', 'key', 'value'], true)
            ? $return
            : 'is_set';
        // replace wildcard chars with regex chars
        $pattern = str_replace(
            ['\*', '\?'],
            ['.*', '.'],
            preg_quote($pattern, '/')
        );
        foreach ($request_params as $key => $request_param) {
            if (preg_match('/^' . $pattern . '$/is', $key)) {
                // return value for request param
                if ($return === 'value') {
                    return $request_param;
                }
                // or actual key or true just to indicate it was found
                return $return === 'key' ? $key : true;
            }
        }
        // match not found so return default value or false
        return $return === 'value' ? $default : false;
    }


    /**
     * the supplied key can be a simple string to represent a "top-level" request parameter
     * or represent a key for a request parameter that is nested deeper within the request parameter array,
     * by using square brackets to surround keys for deeper array elements.
     * For example :
     * if the supplied $key was: "first[second][third]"
     * then this will attempt to drill down into the request parameter array to find a value.
     * Given the following request parameters:
     *  array(
     *      'first' => array(
     *          'second' => array(
     *              'third' => 'has a value'
     *          )
     *      )
     *  )
     * would return true if default parameters were set
     *
     * @param string $callback
     * @param        $key
     * @param null   $default
     * @param string $return
     * @param mixed  $request_params
     * @return bool|mixed|null
     */
    private function parameterDrillDown(
        $key,
        $default = null,
        $callback = 'is_set',
        $return = 'value',
        $request_params = []
    ) {
        $callback       = in_array($callback, ['is_set', 'get', 'match'], true)
            ? $callback
            : 'is_set';
        $request_params = ! empty($request_params)
            ? $request_params
            : $this->request;
        // does incoming key represent an array like 'first[second][third]'  ?
        if (strpos($key, '[') !== false) {
            // turn it into an actual array
            $key  = str_replace(']', '', $key);
            $keys = explode('[', $key);
            $key  = array_shift($keys);
            if ($callback === 'match') {
                $real_key = $this->match($key, $request_params, $default, 'key');
                $key      = $real_key ?: $key;
            }
            // check if top level key exists
            if (isset($request_params[ $key ])) {
                // build a new key to pass along like: 'second[third]'
                // or just 'second' depending on depth of keys
                $key_string = array_shift($keys);
                if (! empty($keys)) {
                    $key_string .= '[' . implode('][', $keys) . ']';
                }
                return $this->parameterDrillDown(
                    $key_string,
                    $default,
                    $callback,
                    $return,
                    $request_params[ $key ]
                );
            }
        }
        if ($callback === 'is_set') {
            return isset($request_params[ $key ]);
        }
        if ($callback === 'match') {
            return $this->match($key, $request_params, $default, $return);
        }
        return isset($request_params[ $key ])
            ? $request_params[ $key ]
            : $default;
    }


    /**
     * remove param
     *
     * @param      $key
     * @param bool $unset_from_global_too
     */
    public function unSetRequestParam($key, $unset_from_global_too = false)
    {
        // because unset may not actually remove var
        $this->get[ $key ]     = null;
        $this->post[ $key ]    = null;
        $this->request[ $key ] = null;
        unset($this->get[ $key ], $this->post[ $key ], $this->request[ $key ]);
        if ($unset_from_global_too) {
            unset($_GET[ $key ], $_POST[ $key ], $_REQUEST[ $key ]);
        }
    }


    /**
     * remove params
     *
     * @param array $keys
     * @param bool  $unset_from_global_too
     */
    public function unSetRequestParams(array $keys, $unset_from_global_too = false)
    {
        foreach ($keys as $key) {
            $this->unSetRequestParam($key, $unset_from_global_too);
        }
    }
}
