<?php

use EventEspresso\core\interfaces\InterminableInterface;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\CurrentPage;
use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\core\services\request\ResponseInterface;

/**
 * class EE_Request_Handler
 *
 * @package     Event Espresso
 * @subpackage  /core/
 * @author      Brent Christensen
 * @deprecated  4.10.14.p
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
     * @param RequestInterface  $request
     * @param ResponseInterface $response
     */
    public function __construct(RequestInterface $request, ResponseInterface $response)
    {
        $this->request      = $request;
        $this->response     = $response;
        $this->ajax         = $this->request->isAjax();
        $this->front_ajax   = $this->request->isFrontAjax();
        do_action('AHEE__EE_Request_Handler__construct__complete');
    }


    /**
     * @param WP $WP
     * @return void
     * @deprecated  4.10.14.p
     */
    public function parse_request($WP = null)
    {
    }


    private function getCurrentPage()
    {
        if (! $this->current_page instanceof CurrentPage) {
            $this->current_page = LoaderFactory::getLoader()->getShared(CurrentPage::class);
        }
        return $this->current_page;
    }


    /**
     * @param WP $WP
     * @return void
     * @deprecated  4.10.14.p
     */
    public function set_request_vars($WP = null)
    {
        $this->getCurrentPage()->parseQueryVars($WP);
    }


    /**
     * @param WP $WP
     * @return int
     * @deprecated  4.10.14.p
     */
    public function get_post_id_from_request($WP = null)
    {
        return $this->getCurrentPage()->postId();
    }


    /**
     * @param WP $WP
     * @return string
     * @deprecated  4.10.14.p
     */
    public function get_post_name_from_request($WP = null)
    {
        return $this->getCurrentPage()->postName();
    }


    /**
     * @param WP $WP
     * @return array
     * @deprecated  4.10.14.p
     */
    public function get_post_type_from_request($WP = null)
    {
        return $this->getCurrentPage()->postType();
    }


    /**
     * Just a helper method for getting the url for the displayed page.
     *
     * @param WP $WP
     * @return string
     * @deprecated  4.10.14.p
     */
    public function get_current_page_permalink($WP = null)
    {
        return $this->getCurrentPage()->getPermalink($WP);
    }


    /**
     * @return bool
     * @deprecated  4.10.14.p
     */
    public function test_for_espresso_page()
    {
        return $this->getCurrentPage()->isEspressoPage();
    }


    /**
     * @param $key
     * @param $value
     * @return void
     * @deprecated  4.10.14.p
     */
    public function set_notice($key, $value)
    {
        $this->response->setNotice($key, $value);
    }


    /**
     * @param $key
     * @return mixed
     * @deprecated  4.10.14.p
     */
    public function get_notice($key)
    {
        return $this->response->getNotice($key);
    }


    /**
     * @param $string
     * @return void
     * @deprecated  4.10.14.p
     */
    public function add_output($string)
    {
        $this->response->addOutput($string);
    }


    /**
     * @return string
     * @deprecated  4.10.14.p
     */
    public function get_output()
    {
        return $this->response->getOutput();
    }


    /**
     * @param $item
     * @param $key
     * @deprecated  4.10.14.p
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
     * @deprecated  4.10.14.p
     */
    public function set_espresso_page($value = null)
    {
        $this->getCurrentPage()->setEspressoPage($value);
    }


    /**
     * @return bool
     * @deprecated  4.10.14.p
     */
    public function is_espresso_page()
    {
        return $this->getCurrentPage()->isEspressoPage();
    }


    /**
     * returns sanitized contents of $_REQUEST
     *
     * @return array
     * @deprecated  4.10.14.p
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
     * @deprecated  4.10.14.p
     */
    public function set($key, $value, $override_ee = false)
    {
        $this->request->setRequestParam($key, $value, $override_ee);
    }


    /**
     * @param      $key
     * @param null $default
     * @return    mixed
     * @deprecated  4.10.14.p
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
     * @deprecated  4.10.14.p
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
     * @deprecated  4.10.14.p
     */
    public function un_set($key)
    {
        $this->request->unSetRequestParam($key);
    }
}
