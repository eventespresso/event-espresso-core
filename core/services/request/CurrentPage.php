<?php

namespace EventEspresso\core\services\request;

use EE_CPT_Strategy;
use WP;

/**
 * Class CurrentPage
 *
 * Primarily an extraction of logic from the legacy EE_Request_Handler class
 * pertaining to details about the current WordPress page/post such as:
 * - post ID
 * - post name
 * - post type
 * and most importantly:
 * - whether the current page/post is for an EE CPT or has EE content in it
 * this is important when deciding whether to run additional EE logic and/or load EE assets
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\services\request
 * @since   $VID:$
 */
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
        if ($WP instanceof WP && $WP->request) {
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
     * pokes and prods the WP object query_vars in an attempt to shake out a page/post ID
     *
     * @param WP $WP
     * @return int
     */
    private function getPostId(WP $WP = null)
    {
        $post_id = null;
        // look for the post ID in the aptly named 'p' query var
        if (isset($WP->query_vars['p'])) {
            $post_id = $WP->query_vars['p'];
        }
        // not a post? what about a page?
        if (! $post_id && isset($WP->query_vars['page_id'])) {
            $post_id = $WP->query_vars['page_id'];
        }
        // ok... maybe pretty permalinks are off and the ID is set in the raw request...
        // but hasn't been processed yet ie: this method is being called too early :\
        if (! $post_id && $WP instanceof WP && $WP->request !== null && is_numeric(basename($WP->request))) {
            $post_id = basename($WP->request);
        }
        // none of the above? ok what about an explicit "post_id" URL parameter?
        if (! $post_id && $this->request->requestParamIsSet('post_id')) {
            $post_id = $this->request->getRequestParam('post_id');
        }
        return $post_id;
    }


    /**
     * similar to getPostId() above but attempts to obtain the "name" for the current page/post
     *
     * @param WP $WP
     * @return string
     */
    private function getPostName(WP $WP = null)
    {
        global $wpdb;
        $post_name = null;
        // if this is a post, then is the post name set?
        if (isset($WP->query_vars['name']) && ! empty($WP->query_vars['name'])) {
            $post_name = $WP->query_vars['name'];
        }
        // what about the page name?
        if (! $post_name && isset($WP->query_vars['pagename']) && ! empty($WP->query_vars['pagename'])) {
            $post_name = $WP->query_vars['pagename'];
        }
        // this stinks but let's run a query to try and get the post name from the URL
        // (assuming pretty permalinks are on)
        if (! $post_name && $WP instanceof WP && $WP->request !== null && ! empty($WP->request)) {
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
        // ug... ok... nothing yet... but do we have a post ID?
        // if so then... sigh... run a query to get the post name :\
        if (! $post_name && $this->post_id) {
            $SQL                = "SELECT post_name from {$wpdb->posts}";
            $SQL                .= " WHERE post_status NOT IN ('auto-draft', 'inherit', 'trash')";
            $SQL                .= ' AND ID=%d';
            $possible_post_name = $wpdb->get_var($wpdb->prepare($SQL, $this->post_id));
            if ($possible_post_name) {
                $post_name = $possible_post_name;
            }
        }
        // still nothing? ok what about an explicit 'post_name' URL parameter?
        if (! $post_name && $this->request->requestParamIsSet('post_name')) {
            $post_name = $this->request->getRequestParam('post_name');
        }
        return $post_name;
    }


    /**
     * also similar to getPostId() and getPostName() above but not as insane
     *
     * @param WP $WP
     * @return array
     */
    private function getPostType(WP $WP = null)
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
     * if TRUE, then the current page is somehow utilizing EE logic
     *
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
     * for manually indicating the current page will utilize EE logic
     *
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
     * attempts to determine if the current page/post is an EE related page/post
     * because it utilizes one of our CPT taxonomies, endpoints, or post types
     *
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
