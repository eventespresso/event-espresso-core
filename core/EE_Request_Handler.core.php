<?php

use EventEspresso\core\interfaces\InterminableInterface;

/**
 * class EE_Request_Handler
 *
 * @package     Event Espresso
 * @subpackage  /core/
 * @author      Brent Christensen
 */
final class EE_Request_Handler implements InterminableInterface
{

    /**
     * @var EE_Request $request
     */
    private $request;

    /**
     * @var array $_notice
     */
    private $_notice = array();

    /**
     * rendered output to be returned to WP
     *
     * @var string $_output
     */
    private $_output = '';

    /**
     * whether current request is via AJAX
     *
     * @var boolean $ajax
     */
    public $ajax = false;

    /**
     * whether current request is via AJAX from the frontend of the site
     *
     * @var boolean $front_ajax
     */
    public $front_ajax = false;


    /**
     * @param  EE_Request $request
     */
    public function __construct(EE_Request $request)
    {
        $this->request = $request;
        $this->ajax = $this->request->ajax;
        $this->front_ajax = $this->request->front_ajax;
        do_action('AHEE__EE_Request_Handler__construct__complete');
    }


    /**
     * @param WP $wp
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function parse_request($wp = null)
    {
        // if somebody forgot to provide us with WP, that's ok because its global
        if (! $wp instanceof WP) {
            global $wp;
        }
        $this->set_request_vars($wp);
    }


    /**
     * @param WP $wp
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_request_vars($wp = null)
    {
        if (! is_admin()) {
            // set request post_id
            $this->request->set('post_id', $this->get_post_id_from_request($wp));
            // set request post name
            $this->request->set('post_name', $this->get_post_name_from_request($wp));
            // set request post_type
            $this->request->set('post_type', $this->get_post_type_from_request($wp));
            // true or false ? is this page being used by EE ?
            $this->set_espresso_page();
        }
    }


    /**
     * @param WP $wp
     * @return int
     */
    public function get_post_id_from_request($wp = null)
    {
        if (! $wp instanceof WP) {
            global $wp;
        }
        $post_id = null;
        if (isset($wp->query_vars['p'])) {
            $post_id = $wp->query_vars['p'];
        }
        if (! $post_id && isset($wp->query_vars['page_id'])) {
            $post_id = $wp->query_vars['page_id'];
        }
        if (! $post_id && $wp->request !== null && is_numeric(basename($wp->request))) {
            $post_id = basename($wp->request);
        }
        return $post_id;
    }


    /**
     * @param WP $wp
     * @return string
     */
    public function get_post_name_from_request($wp = null)
    {
        if (! $wp instanceof WP) {
            global $wp;
        }
        $post_name = null;
        if (isset($wp->query_vars['name']) && ! empty($wp->query_vars['name'])) {
            $post_name = $wp->query_vars['name'];
        }
        if (! $post_name && isset($wp->query_vars['pagename']) && ! empty($wp->query_vars['pagename'])) {
            $post_name = $wp->query_vars['pagename'];
        }
        if (! $post_name && $wp->request !== null && ! empty($wp->request)) {
            $possible_post_name = basename($wp->request);
            if (! is_numeric($possible_post_name)) {
                /** @type WPDB $wpdb */
                global $wpdb;
                $SQL =
                    "SELECT ID from {$wpdb->posts} WHERE post_status NOT IN ('auto-draft', 'inherit', 'trash') AND post_name=%s";
                $possible_post_name = $wpdb->get_var($wpdb->prepare($SQL, $possible_post_name));
                if ($possible_post_name) {
                    $post_name = $possible_post_name;
                }
            }
        }
        if (! $post_name && $this->get('post_id')) {
            /** @type WPDB $wpdb */
            global $wpdb;
            $SQL =
                "SELECT post_name from {$wpdb->posts} WHERE post_status NOT IN ('auto-draft', 'inherit', 'trash') AND ID=%d";
            $possible_post_name = $wpdb->get_var($wpdb->prepare($SQL, $this->get('post_id')));
            if ($possible_post_name) {
                $post_name = $possible_post_name;
            }
        }
        return $post_name;
    }


    /**
     * @param WP $wp
     * @return mixed
     */
    public function get_post_type_from_request($wp = null)
    {
        if (! $wp instanceof WP) {
            global $wp;
        }
        return isset($wp->query_vars['post_type'])
            ? $wp->query_vars['post_type']
            : null;
    }


    /**
     * Just a helper method for getting the url for the displayed page.
     *
     * @param  WP $wp
     * @return string
     */
    public function get_current_page_permalink($wp = null)
    {
        $post_id = $this->get_post_id_from_request($wp);
        if ($post_id) {
            $current_page_permalink = get_permalink($post_id);
        } else {
            if (! $wp instanceof WP) {
                global $wp;
            }
            if ($wp->request) {
                $current_page_permalink = site_url($wp->request);
            } else {
                $current_page_permalink = esc_url(site_url($_SERVER['REQUEST_URI']));
            }
        }
        return $current_page_permalink;
    }


    /**
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function test_for_espresso_page()
    {
        global $wp;
        /** @type EE_CPT_Strategy $EE_CPT_Strategy */
        $EE_CPT_Strategy = EE_Registry::instance()->load_core('CPT_Strategy');
        $espresso_CPT_taxonomies = $EE_CPT_Strategy->get_CPT_taxonomies();
        if (is_array($espresso_CPT_taxonomies)) {
            foreach ($espresso_CPT_taxonomies as $espresso_CPT_taxonomy => $details) {
                if (isset($wp->query_vars, $wp->query_vars[ $espresso_CPT_taxonomy ])) {
                    return true;
                }
            }
        }
        // load espresso CPT endpoints
        $espresso_CPT_endpoints = $EE_CPT_Strategy->get_CPT_endpoints();
        $post_type_CPT_endpoints = array_flip($espresso_CPT_endpoints);
        $post_types = (array) $this->get('post_type');
        foreach ($post_types as $post_type) {
            // was a post name passed ?
            if (isset($post_type_CPT_endpoints[ $post_type ])) {
                // kk we know this is an espresso page, but is it a specific post ?
                if (! $this->get('post_name')) {
                    // there's no specific post name set, so maybe it's one of our endpoints like www.domain.com/events
                    $post_name = isset($post_type_CPT_endpoints[ $this->get('post_type') ])
                        ? $post_type_CPT_endpoints[ $this->get('post_type') ]
                        : '';
                    // if the post type matches on of our then set the endpoint
                    if ($post_name) {
                        $this->set('post_name', $post_name);
                    }
                }
                return true;
            }
        }
        return false;
    }

    /**
     * @param $key
     * @param $value
     * @return    void
     */
    public function set_notice($key, $value)
    {
        $this->_notice[ $key ] = $value;
    }


    /**
     * @param $key
     * @return    mixed
     */
    public function get_notice($key)
    {
        return isset($this->_notice[ $key ])
            ? $this->_notice[ $key ]
            : null;
    }


    /**
     * @param $string
     * @return void
     */
    public function add_output($string)
    {
        $this->_output .= $string;
    }


    /**
     * @return string
     */
    public function get_output()
    {
        return $this->_output;
    }


    /**
     * @param $item
     * @param $key
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
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_espresso_page($value = null)
    {
        $this->request->set(
            'is_espresso_page',
            ! empty($value)
                ? $value
                : $this->test_for_espresso_page()
        );
    }


    /**
     * @return    mixed
     */
    public function is_espresso_page()
    {
        return $this->request->is_set('is_espresso_page');
    }


    /**
     * returns contents of $_REQUEST
     *
     * @return array
     */
    public function params()
    {
        return $this->request->params();
    }


    /**
     * @param      $key
     * @param      $value
     * @param bool $override_ee
     * @return    void
     */
    public function set($key, $value, $override_ee = false)
    {
        $this->request->set($key, $value, $override_ee);
    }


    /**
     * @param      $key
     * @param null $default
     * @return    mixed
     */
    public function get($key, $default = null)
    {
        return $this->request->get($key, $default);
    }


    /**
     * check if param exists
     *
     * @param $key
     * @return    boolean
     */
    public function is_set($key)
    {
        return $this->request->is_set($key);
    }


    /**
     * remove param
     *
     * @param $key
     * @return    void
     */
    public function un_set($key)
    {
        $this->request->un_set($key);
    }
}
