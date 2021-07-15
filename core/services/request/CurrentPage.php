<?php

namespace EventEspresso\core\services\request;

use EE_CPT_Strategy;
use WP;

class CurrentPage
{
    /**
     * @var EE_CPT_Strategy
     */
    private $cpt_strategy;

    /**
     * @var bool
     */
    private $initialized;

    /**
     * @var bool
     */
    private $is_espresso_page = false;

    /**
     * @var int
     */
    private $post_id = 0;

    /**
     * @var string
     */
    private $post_name = '';

    /**
     * @var array
     */
    private $post_type = [];

    /**
     * @var RequestInterface $request
     */
    private $request;


    /**
     * CurrentPage constructor.
     *
     * @param EE_CPT_Strategy  $cpt_strategy
     * @param RequestInterface $request
     */
    public function __construct(EE_CPT_Strategy $cpt_strategy, RequestInterface $request)
    {
        $this->cpt_strategy = $cpt_strategy;
        $this->request      = $request;
        $this->initialized  = is_admin();
        // analyse the incoming WP request
        add_action('parse_request', [$this, 'parseQueryVars'], 2, 1);
    }


    /**
     * @param WP $WP
     * @return void
     */
    public function parseQueryVars(WP $WP = null)
    {
        if ($this->initialized) {
            return;
        }
        // if somebody forgot to provide us with WP, that's ok because its global
        if (! $WP instanceof WP) {
            global $WP;
        }
        $this->post_id   = $this->getPostId($WP);
        $this->post_name = $this->getPostName($WP);
        $this->post_type = $this->getPostType($WP);
        // true or false ? is this page being used by EE ?
        $this->setEspressoPage();
        remove_action('parse_request', [$this, 'parseRequest'], 2);
        $this->initialized   = true;
    }


    /**
     * Just a helper method for getting the url for the displayed page.
     *
     * @param WP|null $WP
     * @return string
     */
    public function getPermalink(WP $WP = null)
    {
        $post_id = $this->post_id ?: $this->getPostId($WP);
        if ($post_id) {
            return get_permalink($post_id);
        }
        if (! $WP instanceof WP) {
            global $WP;
        }
        if ($WP->request) {
            return site_url($WP->request);
        }
        return esc_url_raw(site_url($_SERVER['REQUEST_URI']));
    }


    /**
     * @return array
     */
    public function espressoPostType()
    {
        return array_filter(
            $this->post_type,
            function ($post_type) {
                return strpos($post_type, 'espresso_') === 0;
            }
        );
    }


    /**
     * @param WP $WP
     * @return int
     */
    private function getPostId(WP $WP)
    {
        $post_id = null;
        if (isset($WP->query_vars['p'])) {
            $post_id = $WP->query_vars['p'];
        }
        if (! $post_id && isset($WP->query_vars['page_id'])) {
            $post_id = $WP->query_vars['page_id'];
        }
        if (! $post_id && $WP->request !== null && is_numeric(basename($WP->request))) {
            $post_id = basename($WP->request);
        }
        if (! $post_id && $this->request->requestParamIsSet('post_id')) {
            $post_id = $this->request->getRequestParam('post_id');
        }
        return $post_id;
    }


    /**
     * @param WP $WP
     * @return string
     */
    private function getPostName(WP $WP)
    {
        global $wpdb;
        $post_name = null;
        if (isset($WP->query_vars['name']) && ! empty($WP->query_vars['name'])) {
            $post_name = $WP->query_vars['name'];
        }
        if (! $post_name && isset($WP->query_vars['pagename']) && ! empty($WP->query_vars['pagename'])) {
            $post_name = $WP->query_vars['pagename'];
        }
        if (! $post_name && $WP->request !== null && ! empty($WP->request)) {
            $possible_post_name = basename($WP->request);
            if (! is_numeric($possible_post_name)) {
                $SQL                = "SELECT ID from {$wpdb->posts}";
                $SQL                .= " WHERE post_status NOT IN ('auto-draft', 'inherit', 'trash')";
                $SQL                .= ' AND post_name=%s';
                $possible_post_name = $wpdb->get_var($wpdb->prepare($SQL, $possible_post_name));
                if ($possible_post_name) {
                    $post_name = $possible_post_name;
                }
            }
        }
        if (! $post_name && $this->post_id) {
            $SQL                = "SELECT post_name from {$wpdb->posts}";
            $SQL                .= " WHERE post_status NOT IN ('auto-draft', 'inherit', 'trash')";
            $SQL                .= ' AND ID=%d';
            $possible_post_name = $wpdb->get_var($wpdb->prepare($SQL, $this->post_id));
            if ($possible_post_name) {
                $post_name = $possible_post_name;
            }
        }
        if (! $post_name && $this->request->requestParamIsSet('post_name')) {
            $post_name = $this->request->getRequestParam('post_name');
        }
        return $post_name;
    }


    /**
     * @param WP $WP
     * @return array
     */
    private function getPostType(WP $WP)
    {
        $post_types = isset($WP->query_vars['post_type'])
            ? (array) $WP->query_vars['post_type']
            : [];
        if (empty($post_types) && $this->request->requestParamIsSet('post_type')) {
            $post_types = $this->request->getRequestParam('post_type');
        }
        return (array) $post_types;
    }


    /**
     * @return bool
     */
    public function isEspressoPage()
    {
        return $this->is_espresso_page;
    }


    /**
     * @return int
     */
    public function postId()
    {
        return $this->post_id;
    }


    /**
     * @return string
     */
    public function postName()
    {
        return $this->post_name;
    }


    /**
     * @return array
     */
    public function postType()
    {
        return $this->post_type;
    }


    /**
     * @param null|bool $value
     * @return void
     */
    public function setEspressoPage($value = null)
    {
        $this->is_espresso_page = $value !== null
            ? filter_var($value, FILTER_VALIDATE_BOOLEAN)
            : $this->testForEspressoPage();
    }


    /**
     * @return bool
     */
    private function testForEspressoPage()
    {
        // in case it has already been set
        if ($this->is_espresso_page) {
            return true;
        }
        global $WP;
        $espresso_CPT_taxonomies = $this->cpt_strategy->get_CPT_taxonomies();
        if (is_array($espresso_CPT_taxonomies)) {
            foreach ($espresso_CPT_taxonomies as $espresso_CPT_taxonomy => $details) {
                if (isset($WP->query_vars, $WP->query_vars[ $espresso_CPT_taxonomy ])) {
                    return true;
                }
            }
        }
        // load espresso CPT endpoints
        $espresso_CPT_endpoints  = $this->cpt_strategy->get_CPT_endpoints();
        $post_type_CPT_endpoints = array_flip($espresso_CPT_endpoints);
        foreach ($this->post_type as $post_type) {
            // was a post name passed ?
            if (isset($post_type_CPT_endpoints[ $post_type ])) {
                // kk we know this is an espresso page, but is it a specific post ?
                if (! $this->post_name) {
                    $espresso_post_type = $this->request->getRequestParam('post_type');
                    // there's no specific post name set, so maybe it's one of our endpoints like www.domain.com/events
                    // this essentially sets the post_name to "events" (or whatever EE CPT)
                    $post_name = isset($post_type_CPT_endpoints[ $espresso_post_type ])
                        ? $post_type_CPT_endpoints[ $espresso_post_type ]
                        : '';
                    // if the post type matches one of ours then set the post name to the endpoint
                    if ($post_name) {
                        $this->post_name = $post_name;
                    }
                }
                return true;
            }
        }
        return false;
    }
}
