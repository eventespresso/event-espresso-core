<?php

use EventEspresso\core\interfaces\InterminableInterface;
use EventEspresso\core\services\request\CurrentPage;
use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\core\services\request\ResponseInterface;

/**
 * class EE_Request_Handler
 *
 * @package     Event Espresso
 * @subpackage  /core/
 * @author      Brent Christensen
 * @deprecated  $VID:$
 */
final class EE_Request_Handler implements InterminableInterface
{

    /**
     * @var CurrentPage
     */
    private $current_page;

    /**
     * @var RequestInterface
     */
    private $request;

    /**
     * @var ResponseInterface
     */
    private $response;

    /**
     * whether current request is via AJAX
     *
     * @var boolean
     */
    public $ajax = false;

    /**
     * whether current request is via AJAX from the frontend of the site
     *
     * @var boolean
     */
    public $front_ajax = false;


    /**
     * @param CurrentPage       $current_page
     * @param RequestInterface  $request
     * @param ResponseInterface $response
     */
    public function __construct(CurrentPage $current_page, RequestInterface $request, ResponseInterface $response)
    {
        $this->current_page = $current_page;
        $this->request      = $request;
        $this->response     = $response;
        $this->ajax         = $this->request->isAjax();
        $this->front_ajax   = $this->request->isFrontAjax();
        do_action('AHEE__EE_Request_Handler__construct__complete');
    }


    /**
     * @param WP $WP
     * @return void
     * @deprecated  $VID:$
     */
    public function parse_request($WP = null)
    {
    }


    /**
     * @param WP $WP
     * @return void
     * @deprecated  $VID:$
     */
    public function set_request_vars($WP = null)
    {
        $this->current_page->parseQueryVars($WP);
    }


    /**
     * @param WP $WP
     * @return int
     * @deprecated  $VID:$
     */
    public function get_post_id_from_request($WP = null)
    {
        return $this->current_page->postId();
    }


    /**
     * @param WP $WP
     * @return string
     * @deprecated  $VID:$
     */
    public function get_post_name_from_request($WP = null)
    {
        return $this->current_page->postName();
    }


    /**
     * @param WP $WP
     * @return array
     * @deprecated  $VID:$
     */
    public function get_post_type_from_request($WP = null)
    {
        return $this->current_page->postType();
    }


    /**
     * Just a helper method for getting the url for the displayed page.
     *
     * @param WP $WP
     * @return string
     * @deprecated  $VID:$
     */
    public function get_current_page_permalink($WP = null)
    {
        return $this->current_page->getPermalink($WP);
    }


    /**
     * @return bool
     * @deprecated  $VID:$
     */
    public function test_for_espresso_page()
    {
        return $this->current_page->isEspressoPage();
    }


    /**
     * @param $key
     * @param $value
     * @return void
     * @deprecated  $VID:$
     */
    public function set_notice($key, $value)
    {
        $this->response->setNotice($key, $value);
    }


    /**
     * @param $key
     * @return mixed
     * @deprecated  $VID:$
     */
    public function get_notice($key)
    {
        return $this->response->getNotice($key);
    }


    /**
     * @param $string
     * @return void
     * @deprecated  $VID:$
     */
    public function add_output($string)
    {
        $this->response->addOutput($string);
    }


    /**
     * @return string
     * @deprecated  $VID:$
     */
    public function get_output()
    {
        return $this->response->getOutput();
    }


    /**
     * @param $item
     * @param $key
     * @deprecated  $VID:$
     */
    public function sanitize_text_field_for_array_walk(&$item, &$key)
    {
        $item = strpos($item, 'email') !== false
            ? sanitize_email($item)
            : sanitize_text_field($item);
    }


    /**
     * @param null|bool $value
     * @return void
     * @deprecated  $VID:$
     */
    public function set_espresso_page($value = null)
    {
        $this->current_page->setEspressoPage($value);
    }


    /**
     * @return bool
     * @deprecated  $VID:$
     */
    public function is_espresso_page()
    {
        return $this->current_page->isEspressoPage();
    }


    /**
     * returns sanitized contents of $_REQUEST
     *
     * @return array
     * @deprecated  $VID:$
     */
    public function params()
    {
        return $this->request->requestParams();
    }


    /**
     * @param      $key
     * @param      $value
     * @param bool $override_ee
     * @return    void
     * @deprecated  $VID:$
     */
    public function set($key, $value, $override_ee = false)
    {
        $this->request->setRequestParam($key, $value, $override_ee);
    }


    /**
     * @param      $key
     * @param null $default
     * @return    mixed
     * @deprecated  $VID:$
     */
    public function get($key, $default = null)
    {
        return $this->request->getRequestParam($key, $default);
    }


    /**
     * check if param exists
     *
     * @param $key
     * @return    boolean
     * @deprecated  $VID:$
     */
    public function is_set($key)
    {
        return $this->request->requestParamIsSet($key);
    }


    /**
     * remove param
     *
     * @param $key
     * @return    void
     * @deprecated  $VID:$
     */
    public function un_set($key)
    {
        $this->request->unSetRequestParam($key);
    }
}
